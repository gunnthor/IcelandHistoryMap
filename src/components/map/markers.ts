import L from 'leaflet';
import { ConflictEvent, EventType } from '../../types';
import { EVENT_TYPES } from '../../utils/eventConfig';
import { glyphSvg } from '../icons/Icon';
import { allSeparate, badgeSize, layoutMarkers, SEAL, stillOneGroup } from './cluster';
import { DEEPEST_FLIGHT, clamp, comfortablyVisible, fitZoom, visibleRect } from './geo';

// ════════════════════════════════════════════════════════════════
// The event markers, managed imperatively. Leaflet markers are created
// once per event id and diffed when the set changes; selection, hover,
// route and trace states only toggle classes and attributes on the
// existing elements. Rebuilding on every change used to drop keyboard focus
// to <body> and made state transitions impossible to animate.
//
// The markers form one keyboard widget (role=group on their pane): a single
// tab stop, arrow keys walk the events in chronological order, Enter/Space
// opens one. Clustered markers stay in the DOM but hidden, so their
// elements (and focus) survive re-clustering.
// ════════════════════════════════════════════════════════════════

/** Escape text for Leaflet HTML strings. Every interpolated string goes
 *  through this — event names and places are data, never markup. */
export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export interface MarkerText {
  typeName: (type: EventType) => string;
  stopOf: (n: number, total: number) => string;
  cluster: (n: number, from: number, to: number) => string;
  more: (n: number) => string;
  group: (n: number) => string;
}

export interface MarkerState {
  selectedId: string | null;
  hoveredId: string | null;
  /** Route stop ids in order; empty when no route runs. */
  stops: string[];
  cursor: number;
  /** While a clan is traced, only these stay lit. */
  lit: Set<string> | null;
}

export interface EventLayerHooks {
  select: (id: string) => void;
  hover: (id: string | null) => void;
  /** A same-site group that never separates: list its events. */
  openPlace: (ids: string[], anchor: HTMLElement) => void;
  /** Camera moves go through the stage, which owns framing state. */
  frame: (center: L.LatLng, zoom: number) => void;
  reveal: (latlng: L.LatLng) => void;
  /** After every re-layout, so other layers can dodge the markers. */
  laidOut: () => void;
}

interface Entry {
  e: ConflictEvent;
  m: L.Marker;
  el: HTMLElement;
  z: number;
}

interface Badge {
  key: string;
  ids: string[];
  pin: string | null;
  m: L.Marker;
  el: HTMLElement;
}

const PANE = 'events';
const Z_SELECTED = 300000;
const Z_STOP = 200000;
const Z_BADGE = 100000;
const Z_DIM = -100000;

function sealHtml(type: EventType): string {
  return (
    '<span class="ev-leader" aria-hidden="true"></span>' +
    '<span class="ev-seal" aria-hidden="true">' +
    '<svg class="ev-rim" viewBox="0 0 28 28" focusable="false"><circle cx="14" cy="14" r="13" pathLength="100"/></svg>' +
    glyphSvg(type, 16) +
    '</span>' +
    '<span class="ev-num" aria-hidden="true"></span>' +
    '<span class="map-label" aria-hidden="true"></span>'
  );
}

const labelHtml = (e: ConflictEvent) => `<b>${esc(e.name)}</b><span class="map-label__year">${e.year}</span>`;

/** The badge ring: each member's pigment, in the canonical type order. */
function ringOf(events: ConflictEvent[]): string {
  const counts = new Map<EventType, number>();
  events.forEach((e) => counts.set(e.type, (counts.get(e.type) ?? 0) + 1));
  let at = 0;
  const stops: string[] = [];
  for (const t of EVENT_TYPES) {
    const n = counts.get(t);
    if (!n) continue;
    const from = (at / events.length) * 100;
    at += n;
    const to = (at / events.length) * 100;
    stops.push(`var(--type-${t}) ${from.toFixed(2)}% ${to.toFixed(2)}%`);
  }
  return `conic-gradient(${stops.join(', ')})`;
}

const byYearThenId = (a: ConflictEvent, b: ConflictEvent) => a.year - b.year || a.id.localeCompare(b.id);

/** Event ids behind a roving key: an event id, "g:a,b" or "s:pin:a,b". */
function idsOfKey(key: string): string[] {
  if (key.startsWith('g:')) return key.slice(2).split(',');
  if (key.startsWith('s:')) {
    const [pin, rest] = key.slice(2).split(':');
    return [pin, ...(rest ? rest.split(',') : [])];
  }
  return [key];
}

export class EventLayer {
  private entries = new Map<string, Entry>();
  private badges = new Map<string, Badge>();
  private st: MarkerState = { selectedId: null, hoveredId: null, stops: [], cursor: 0, lit: null };
  private order: string[] = [];
  private tabKey: string | null = null;
  private pendingFocus: string[] | null = null;
  private rippleTimer = 0;
  private pane: HTMLElement;

  constructor(
    private map: L.Map,
    private hooks: EventLayerHooks,
    private text: MarkerText,
  ) {
    this.pane = map.getPane(PANE)!;
    this.pane.setAttribute('role', 'group');
    this.pane.addEventListener('keydown', this.onKey);
    this.pane.addEventListener('focusin', this.onFocusIn);
    map.on('zoomend', this.relayout);
  }

  destroy(): void {
    this.map.off('zoomend', this.relayout);
    this.pane.removeEventListener('keydown', this.onKey);
    this.pane.removeEventListener('focusin', this.onFocusIn);
    window.clearTimeout(this.rippleTimer);
    this.entries.forEach((en) => en.m.remove());
    this.badges.forEach((b) => b.m.remove());
    this.entries.clear();
    this.badges.clear();
  }

  // ── Inputs ──

  setText(text: MarkerText): void {
    this.text = text;
    this.pane.setAttribute('aria-label', text.group(this.entries.size));
    this.entries.forEach((en) => this.label(en));
    this.badges.forEach((b) => this.labelBadge(b));
  }

  /** Diff by id: add what's new, remove what's gone, refresh the rest. */
  setEvents(events: ConflictEvent[]): void {
    const next = new Map(events.map((e) => [e.id, e]));
    let changed = false;
    for (const [id, en] of this.entries) {
      if (next.has(id)) continue;
      en.m.remove();
      this.entries.delete(id);
      changed = true;
    }
    for (const e of events) {
      const en = this.entries.get(e.id);
      if (en) {
        if (en.e !== e) {
          // A language switch swaps every object; only the words change.
          en.e = e;
          this.label(en);
        }
        continue;
      }
      this.entries.set(e.id, this.create(e));
      changed = true;
    }
    this.pane.setAttribute('aria-label', this.text.group(this.entries.size));
    if (changed) {
      this.applyState(false);
      this.relayout();
    }
  }

  setState(next: MarkerState): void {
    const prev = this.st;
    this.st = next;
    const selectionChanged = prev.selectedId !== next.selectedId;
    const pinsChanged =
      selectionChanged || prev.stops.length !== next.stops.length || prev.stops.some((id, i) => id !== next.stops[i]);
    // Moving through a route changes which crowded stop is in front.
    const fanChanged = prev.cursor !== next.cursor && next.stops.length > 0;
    if (selectionChanged && next.selectedId) this.tabKey = next.selectedId;
    // During a route the off-route events step back; their "+n" pills on
    // the numbered stops would only add noise (see map.css).
    this.map.getContainer().toggleAttribute('data-route', next.stops.length > 0);
    this.applyState(selectionChanged);
    if (pinsChanged) this.entries.forEach((en) => this.label(en)); // "stop n of m" in names
    if (pinsChanged || fanChanged) this.relayout();
    else this.applyBadgeState();
  }

  /** Visible marker/badge circles in container pixels, for layers that dodge them. */
  occupied(): { x: number; y: number; r: number }[] {
    const out: { x: number; y: number; r: number }[] = [];
    for (const en of this.entries.values()) {
      if (en.el.classList.contains('is-hidden')) continue;
      const p = this.map.latLngToContainerPoint(en.e.coordinates);
      const dx = parseFloat(en.el.style.marginLeft) + SEAL / 2;
      const dy = parseFloat(en.el.style.marginTop) + SEAL / 2;
      out.push({ x: p.x + (dx || 0), y: p.y + (dy || 0), r: SEAL / 2 + 2 });
    }
    for (const b of this.badges.values()) {
      if (b.pin) continue;
      const p = this.map.latLngToContainerPoint(b.m.getLatLng());
      out.push({ x: p.x, y: p.y, r: badgeSize(b.ids.length) / 2 + 2 });
    }
    return out;
  }

  /** Focus the marker for an event (or the badge hiding it). */
  focusEvent(id: string): boolean {
    const key = this.keyShowing(id);
    if (!key) return false;
    this.focusKey(key);
    return true;
  }

  // ── Building ──

  private create(e: ConflictEvent): Entry {
    const icon = L.divIcon({
      className: `ev-marker ev--${e.type} ev--${e.confidence}`,
      html: sealHtml(e.type),
      iconSize: [SEAL, SEAL],
      iconAnchor: [SEAL / 2, SEAL / 2],
    });
    const m = L.marker(e.coordinates, {
      icon,
      pane: PANE,
      keyboard: false, // our own button semantics + roving tabindex below
      autoPanOnFocus: false, // Leaflet's pan ignores the panels; we reveal instead
      bubblingMouseEvents: false,
    }).addTo(this.map);
    const el = m.getElement()!;
    el.dataset.key = e.id;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-pressed', 'false');
    el.tabIndex = -1;
    const en: Entry = { e, m, el, z: 0 };
    m.on('click', () => this.hooks.select(en.e.id));
    // A real mouse only: a tap fires mouseover too, and with no mouseout to
    // follow, the linked label and timeline halo would stick after a touch.
    el.addEventListener('pointerenter', (ev) => ev.pointerType === 'mouse' && this.hooks.hover(en.e.id));
    el.addEventListener('pointerleave', (ev) => ev.pointerType === 'mouse' && this.hooks.hover(null));
    this.label(en);
    return en;
  }

  private label(en: Entry): void {
    const { e } = en;
    const i = this.st.stops.indexOf(e.id);
    const stop = i >= 0 ? `, ${this.text.stopOf(i + 1, this.st.stops.length)}` : '';
    en.el.setAttribute('aria-label', `${e.name}, ${this.text.typeName(e.type)}, ${e.year}${stop}`);
    const lab = en.el.querySelector('.map-label');
    if (lab) lab.innerHTML = labelHtml(e);
  }

  private membersOf(b: Badge): ConflictEvent[] {
    const ids = b.pin ? [b.pin, ...b.ids] : b.ids;
    return ids.map((id) => this.entries.get(id)?.e).filter((e): e is ConflictEvent => !!e).sort(byYearThenId);
  }

  private labelBadge(b: Badge): void {
    const hidden = b.ids.map((id) => this.entries.get(id)!.e).sort(byYearThenId);
    const all = this.membersOf(b);
    const years = all.map((e) => e.year);
    b.el.setAttribute(
      'aria-label',
      b.pin
        ? `${this.text.more(hidden.length)} · ${this.text.cluster(all.length, Math.min(...years), Math.max(...years))}`
        : this.text.cluster(all.length, Math.min(...years), Math.max(...years)),
    );
    const list = hidden.slice(0, 5).map((e) => `<span class="map-label__row">${labelHtml(e)}</span>`);
    if (hidden.length > 5) list.push(`<span class="map-label__more">${esc(this.text.more(hidden.length - 5))}</span>`);
    const lab = b.el.querySelector('.map-label');
    if (lab) lab.innerHTML = list.join('');
  }

  // ── State → classes ──

  private dimmed(id: string): boolean {
    const { selectedId, stops, lit } = this.st;
    if (id === selectedId) return false;
    if (stops.length && !stops.includes(id)) return true;
    return !!lit && !lit.has(id);
  }

  private applyState(ripple: boolean): void {
    const { selectedId, hoveredId, stops, cursor } = this.st;
    for (const en of this.entries.values()) {
      const id = en.e.id;
      const sel = id === selectedId;
      const stopIdx = stops.indexOf(id);
      const dim = this.dimmed(id);
      const cl = en.el.classList;
      cl.toggle('is-selected', sel);
      cl.toggle('is-stop', stopIdx >= 0);
      cl.toggle('is-current', stopIdx >= 0 && stopIdx === cursor);
      cl.toggle('is-dim', dim);
      cl.toggle('is-linked', id === hoveredId);
      en.el.setAttribute('aria-pressed', String(sel));
      const num = en.el.querySelector('.ev-num');
      if (num) num.textContent = stopIdx >= 0 ? String(stopIdx + 1) : '';
      const z = sel ? Z_SELECTED : stopIdx >= 0 ? Z_STOP : dim ? Z_DIM : 0;
      if (z !== en.z) {
        en.z = z;
        en.m.setZIndexOffset(z);
      }
    }
    if (ripple && selectedId) {
      this.entries.forEach((en) => en.el.classList.remove('is-rippling'));
      const el = this.entries.get(selectedId)?.el;
      if (el) {
        // Restart the one-shot ripple even if the class was just removed.
        void el.offsetWidth;
        el.classList.add('is-rippling');
        window.clearTimeout(this.rippleTimer);
        this.rippleTimer = window.setTimeout(() => el.classList.remove('is-rippling'), 800);
      }
    }
  }

  private applyBadgeState(): void {
    const { hoveredId, selectedId } = this.st;
    for (const b of this.badges.values()) {
      const ids = b.pin ? [b.pin, ...b.ids] : b.ids;
      b.el.classList.toggle('is-linked', !!hoveredId && b.ids.includes(hoveredId));
      b.el.classList.toggle('is-dim', ids.every((id) => this.dimmed(id)));
      b.el.classList.toggle('is-on-selected', !!b.pin && b.pin === selectedId);
    }
  }

  // ── Layout: clusters, satellites, fans ──

  private primaryOf = (ids: string[]): string => {
    const { selectedId, stops, cursor } = this.st;
    if (selectedId && ids.includes(selectedId)) return selectedId;
    if (stops[cursor] && ids.includes(stops[cursor])) return stops[cursor];
    const inRoute = ids.filter((id) => stops.includes(id)).sort((a, b) => stops.indexOf(a) - stops.indexOf(b));
    return inRoute[0] ?? ids[0];
  };

  relayout = (): void => {
    const map = this.map;
    const z = map.getZoom();
    const pinned = new Set<string>();
    if (this.st.selectedId && this.entries.has(this.st.selectedId)) pinned.add(this.st.selectedId);
    this.st.stops.forEach((id) => this.entries.has(id) && pinned.add(id));

    const points = [...this.entries.values()].map((en) => {
      const p = map.project(en.e.coordinates, z);
      return { id: en.e.id, x: p.x, y: p.y, pinned: pinned.has(en.e.id) };
    });
    // Seals shrink at overview zooms: at whole-island scale a full-size seal
    // swallows its neighbours and most of Iceland turns into count badges.
    // CSS reads --seal-scale; the layout merges at the drawn size.
    const scale = z < 5.75 ? 0.6 : z < 6.5 ? 0.72 : z < 7.5 ? 0.86 : 1;
    map.getContainer().style.setProperty('--seal-scale', String(scale));
    // The relief styles' colour layer softens once it's being upscaled (map.css).
    map.getContainer().style.setProperty('--colour-blur', z <= 7.25 ? '0px' : z <= 8.25 ? '3px' : '6px');
    const res = layoutMarkers(points, this.primaryOf, SEAL * scale);

    const shown = new Set([...res.singles, ...pinned]);
    for (const en of this.entries.values()) {
      const id = en.e.id;
      en.el.classList.toggle('is-hidden', !shown.has(id));
      const o = res.offsets.get(id);
      en.el.style.marginLeft = `${-SEAL / 2 + (o?.dx ?? 0)}px`;
      en.el.style.marginTop = `${-SEAL / 2 + (o?.dy ?? 0)}px`;
      en.el.classList.toggle('is-fanned', !!o);
      const leader = en.el.querySelector('.ev-leader');
      if (leader)
        leader.innerHTML = o
          ? `<svg width="${SEAL}" height="${SEAL}" focusable="false"><line x1="14" y1="14" x2="${(14 - o.dx).toFixed(1)}" y2="${(14 - o.dy).toFixed(1)}"/><circle cx="${(14 - o.dx).toFixed(1)}" cy="${(14 - o.dy).toFixed(1)}" r="2.75"/></svg>`
          : '';
    }

    // Badges: keyed by membership, so an unchanged cluster keeps its element.
    const want = new Map<string, { ids: string[]; pin: string | null; at: L.LatLng }>();
    for (const g of res.groups) {
      const ids = [...g.ids].sort();
      want.set(`g:${ids.join(',')}`, { ids, pin: null, at: map.unproject([g.x, g.y], z) });
    }
    for (const [pin, idsRaw] of res.satellites) {
      const ids = [...idsRaw].sort();
      want.set(`s:${pin}:${ids.join(',')}`, { ids, pin, at: L.latLng(this.entries.get(pin)!.e.coordinates) });
    }
    for (const [key, b] of this.badges) {
      if (want.has(key)) continue;
      b.m.remove();
      this.badges.delete(key);
    }
    // Everything drawn, for choosing which side of its seal a "+n" pill sits.
    const at = new Map(points.map((p) => [p.id, p]));
    const obstacles: { x: number; y: number; r: number; pin?: string }[] = [];
    for (const id of res.singles) obstacles.push({ x: at.get(id)!.x, y: at.get(id)!.y, r: SEAL / 2 });
    for (const g of res.groups) obstacles.push({ x: g.x, y: g.y, r: badgeSize(g.ids.length) / 2 });
    for (const id of pinned) {
      const o = res.offsets.get(id);
      const x = at.get(id)!.x + (o?.dx ?? 0);
      const y = at.get(id)!.y + (o?.dy ?? 0);
      obstacles.push({ x, y, r: id === this.st.selectedId ? SEAL * 0.625 : SEAL / 2, pin: id });
      // A route stop's number badge sits on its upper right.
      if (this.st.stops.includes(id)) obstacles.push({ x: x + 15, y: y - 13, r: 9, pin: id });
    }
    const pillSide = (pin: string): { x: number; y: number } => {
      const o = res.offsets.get(pin);
      const px = at.get(pin)!.x + (o?.dx ?? 0);
      const py = at.get(pin)!.y + (o?.dy ?? 0);
      const k = pin === this.st.selectedId ? 1.15 : 1;
      const sides = [
        { x: 17 * k, y: 13 * k },
        { x: -17 * k, y: 13 * k },
        { x: 17 * k, y: -13 * k },
        { x: -17 * k, y: -13 * k },
      ];
      let best = sides[0];
      let bestScore = -Infinity;
      for (const s of sides) {
        const qx = px + s.x;
        const qy = py + s.y;
        let score = Infinity;
        for (const ob of obstacles) {
          if (ob.pin === pin && ob.r !== 9) continue; // its own seal
          score = Math.min(score, Math.hypot(qx - ob.x, qy - ob.y) - ob.r - 12);
        }
        if (score > bestScore + 0.5) {
          best = s;
          bestScore = score;
        }
        if (score >= 0 && s === sides[0]) break; // the usual corner is free
      }
      return best;
    };

    for (const [key, w] of want) {
      let b = this.badges.get(key);
      if (b) b.m.setLatLng(w.at);
      else {
        b = this.createBadge(key, w.ids, w.pin, w.at);
        this.badges.set(key, b);
      }
      if (w.pin) this.placePill(b, res.offsets.get(w.pin), pillSide(w.pin));
    }
    this.applyBadgeState();
    this.rebuildOrder();
    this.hooks.laidOut();

    if (this.pendingFocus) {
      const ids = this.pendingFocus;
      this.pendingFocus = null;
      const first = this.order.find((k) => ids.includes(k) || this.badges.get(k)?.ids.some((id) => ids.includes(id)));
      if (first) this.focusKey(first);
    }
  };

  private createBadge(key: string, ids: string[], pin: string | null, at: L.LatLng): Badge {
    const evs = ids.map((id) => this.entries.get(id)!.e);
    const size = badgeSize(ids.length);
    const icon = pin
      ? L.divIcon({
          className: 'cl-marker cl-marker--pill',
          html: `<span class="cl-pill">+${ids.length}</span><span class="map-label" aria-hidden="true"></span>`,
          iconSize: [28, 20],
        })
      : L.divIcon({
          className: 'cl-marker',
          html:
            `<span class="cl-disc" style="--ring:${ringOf(evs)}" aria-hidden="true"><span class="cl-count">${ids.length}</span></span>` +
            '<span class="map-label" aria-hidden="true"></span>',
          iconSize: [size, size],
        });
    const m = L.marker(at, {
      icon,
      pane: PANE,
      keyboard: false,
      autoPanOnFocus: false,
      bubblingMouseEvents: false,
      zIndexOffset: pin ? (pin === this.st.selectedId ? Z_SELECTED + 1 : Z_STOP + 1) : Z_BADGE,
    }).addTo(this.map);
    const el = m.getElement()!;
    el.dataset.key = key;
    el.setAttribute('role', 'button');
    el.tabIndex = -1;
    const b: Badge = { key, ids, pin, m, el };
    m.on('click', () => this.activateBadge(b, false));
    this.labelBadge(b);
    return b;
  }

  /** The "+n" pill sits on a corner of its pinned seal — lower right
   *  unless a neighbour is already there. */
  private placePill(b: Badge, offset: { dx: number; dy: number } | undefined, side: { x: number; y: number }): void {
    const dx = (offset?.dx ?? 0) + side.x;
    const dy = (offset?.dy ?? 0) + side.y;
    b.el.style.marginLeft = `${-14 + dx}px`;
    b.el.style.marginTop = `${-10 + dy}px`;
  }

  /**
   * A badge was clicked: fly in until its members stand apart (never deeper
   * than z11), or — if they're one site that never separates, like the
   * Alþingi at Þingvellir — open a place card listing them.
   */
  private activateBadge(b: Badge, viaKeyboard: boolean): void {
    const map = this.map;
    const members = this.membersOf(b);
    if (!members.length) return;
    const z = map.getZoom();
    const at = (zz: number) =>
      members.map((e) => {
        const p = map.project(e.coordinates, zz);
        return { id: e.id, x: p.x, y: p.y };
      });
    if (z >= DEEPEST_FLIGHT - 0.01 || stillOneGroup(at(DEEPEST_FLIGHT))) {
      this.hooks.openPlace(
        members.map((e) => e.id),
        b.el,
      );
      return;
    }
    // Zoom to where everyone stands apart; if part of the group is one site
    // that never does, stop where the group first breaks up — that site
    // then becomes its own badge, which opens a place card.
    let zSep = DEEPEST_FLIGHT;
    let zSplit = DEEPEST_FLIGHT;
    for (let zz = Math.ceil((z + 0.5) * 4) / 4; zz <= DEEPEST_FLIGHT; zz += 0.25) {
      const pts = at(zz);
      if (zSplit === DEEPEST_FLIGHT && !stillOneGroup(pts)) zSplit = zz;
      if (allSeparate(pts)) {
        zSep = zz;
        break;
      }
    }
    if (zSep === DEEPEST_FLIGHT && !allSeparate(at(DEEPEST_FLIGHT))) zSep = Math.min(zSplit + 0.5, DEEPEST_FLIGHT);
    const bounds = L.latLngBounds(members.map((e) => e.coordinates));
    const zFit = fitZoom(map, bounds, visibleRect(map), 56);
    const target = clamp(Math.min(zSep, zFit), Math.min(z + 1, DEEPEST_FLIGHT), DEEPEST_FLIGHT);
    const mid = map.unproject(
      map.project(bounds.getNorthWest(), target).add(map.project(bounds.getSouthEast(), target)).divideBy(2),
      target,
    );
    if (viaKeyboard) this.pendingFocus = members.map((e) => e.id);
    this.hooks.frame(mid, target);
  }

  // ── Keyboard: one tab stop, arrows walk the events in time ──

  private keyShowing(id: string): string | null {
    if (this.order.includes(id)) return id;
    for (const b of this.badges.values()) if (b.ids.includes(id)) return b.key;
    return null;
  }

  private elOf(key: string): HTMLElement | null {
    return this.entries.get(key)?.el ?? this.badges.get(key)?.el ?? null;
  }

  private latLngOf(key: string): L.LatLng | null {
    const en = this.entries.get(key);
    if (en) return L.latLng(en.e.coordinates);
    return this.badges.get(key)?.m.getLatLng() ?? null;
  }

  private rebuildOrder(): void {
    const items: { key: string; year: number }[] = [];
    for (const en of this.entries.values())
      if (!en.el.classList.contains('is-hidden')) items.push({ key: en.e.id, year: en.e.year });
    for (const b of this.badges.values())
      items.push({ key: b.key, year: Math.min(...b.ids.map((id) => this.entries.get(id)!.e.year)) });
    items.sort((a, b) => a.year - b.year || a.key.localeCompare(b.key));
    this.order = items.map((i) => i.key);

    // Keep the tab stop on the same events where possible: an event that
    // just got clustered hands it to its badge, a badge that just split
    // hands it to its first member.
    let tab = this.tabKey && this.order.includes(this.tabKey) ? this.tabKey : null;
    if (!tab && this.tabKey)
      for (const id of idsOfKey(this.tabKey)) {
        tab = this.keyShowing(id);
        if (tab) break;
      }
    if (!tab && this.st.selectedId) tab = this.keyShowing(this.st.selectedId);
    if (!tab) tab = this.order.find((k) => this.inView(k)) ?? this.order[0] ?? null;
    this.setTab(tab);
  }

  private inView(key: string): boolean {
    const ll = this.latLngOf(key);
    return !!ll && comfortablyVisible(this.map, ll, 0);
  }

  private setTab(key: string | null): void {
    if (this.tabKey && this.tabKey !== key) {
      const old = this.elOf(this.tabKey);
      if (old) old.tabIndex = -1;
    }
    this.tabKey = key;
    for (const en of this.entries.values()) en.el.tabIndex = en.e.id === key ? 0 : -1;
    for (const b of this.badges.values()) b.el.tabIndex = b.key === key ? 0 : -1;
  }

  private focusKey(key: string): void {
    const el = this.elOf(key);
    if (!el) return;
    this.setTab(key);
    el.focus({ preventScroll: true });
  }

  private onKey = (ev: KeyboardEvent): void => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    const el = (ev.target as HTMLElement).closest<HTMLElement>('[data-key]');
    const key = el?.dataset.key;
    if (!key) return;
    const i = this.order.indexOf(key);
    let next: string | undefined;
    switch (ev.key) {
      case 'Enter':
      case ' ': {
        ev.preventDefault();
        ev.stopPropagation();
        const b = this.badges.get(key);
        if (b) this.activateBadge(b, true);
        else this.hooks.select(key);
        return;
      }
      case 'ArrowRight':
      case 'ArrowDown':
        next = this.order[Math.min(i + 1, this.order.length - 1)];
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = this.order[Math.max(i - 1, 0)];
        break;
      case 'Home':
        next = this.order[0];
        break;
      case 'End':
        next = this.order[this.order.length - 1];
        break;
      default:
        return;
    }
    ev.preventDefault();
    ev.stopPropagation();
    if (next) this.focusKey(next);
  };

  private onFocusIn = (ev: FocusEvent): void => {
    const key = (ev.target as HTMLElement).closest<HTMLElement>('[data-key]')?.dataset.key;
    if (!key) return;
    if (key !== this.tabKey) this.setTab(key);
    // Browsers scroll the overflow:hidden map container to show a focused
    // element; Leaflet snaps that back. Reveal it properly instead — but only
    // when the visitor moved focus here (Tab, arrows: relatedTarget is the
    // element they came from). Focus handed back by a closing story arrives
    // from a removed element (relatedTarget null) and must not hijack the
    // camera's way back to the overview.
    if (!ev.relatedTarget) return;
    const ll = this.latLngOf(key);
    if (ll && !comfortablyVisible(this.map, ll, 0.04)) this.hooks.reveal(ll);
  };
}
