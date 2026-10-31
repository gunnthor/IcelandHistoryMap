import { MutableRefObject, useEffect, useRef } from 'react';
import L from 'leaflet';
import { ClanId, ConflictEvent, PowerCenter } from '../../types';
import { glaciers } from '../../data/glaciers';
import { powerCenters } from '../../data/powerCenters';
import { CLAN_BATTLES } from '../../data/clanBattles';
import { CLAN_CONFIG } from '../../utils/clanConfig';
import { arc, dist2 } from './geo';
import { esc } from './markers';

type Circle = { x: number; y: number; r: number };
/** Re-place labels/seats so they never sit under an event marker. */
export type Dodge = (occupied: Circle[]) => void;

const hitsAny = (r: { left: number; top: number; right: number; bottom: number }, circles: Circle[]) =>
  circles.some((c) => {
    const nx = Math.max(r.left, Math.min(c.x, r.right));
    const ny = Math.max(r.top, Math.min(c.y, r.bottom));
    return Math.hypot(c.x - nx, c.y - ny) < c.r;
  });

// ── Glaciers ──
// Iceland's ice caps (real OSM outlines) as quiet "white realms". Faded on
// satellite, where the real ice shows through; hidden on the 1590 plate,
// which draws its own. Labels are Cormorant italic, appear from z7 (the
// small caps from z8 so neighbours don't collide), and step aside for
// event markers.
const LABEL_MIN_ZOOM: Record<string, number> = {
  Eyjafjallajökull: 8,
  Snæfellsjökull: 8,
  Drangajökull: 8,
};

export function useGlaciers(map: L.Map | null, dodgeRef: MutableRefObject<Dodge | null>): void {
  useEffect(() => {
    if (!map) return;
    const layers: L.Layer[] = [];
    const labels: { el: HTMLElement; minZoom: number }[] = [];
    map.getPane('glacierLabels')?.setAttribute('aria-hidden', 'true');
    for (const g of glaciers) {
      for (const ring of g.rings)
        layers.push(
          L.polygon(ring, { pane: 'glaciers', interactive: false, className: 'map-glacier', weight: 1 }).addTo(map),
        );
      if (!g.label) continue;
      const m = L.marker(g.label, {
        pane: 'glacierLabels',
        interactive: false,
        keyboard: false,
        icon: L.divIcon({
          className: 'map-glacier-label',
          html: `<span lang="is">${esc(g.name)}</span>`,
          iconSize: [0, 0],
        }),
      }).addTo(map);
      layers.push(m);
      const el = m.getElement();
      if (el) labels.push({ el, minZoom: LABEL_MIN_ZOOM[g.name] ?? 7 });
    }
    dodgeRef.current = (occupied) => {
      const z = map.getZoom();
      const box = map.getContainer().getBoundingClientRect();
      for (const l of labels) {
        let hide = z < l.minZoom;
        if (!hide) {
          l.el.classList.remove('is-hidden');
          const r = (l.el.firstElementChild as HTMLElement).getBoundingClientRect();
          hide = hitsAny(
            { left: r.left - box.left, top: r.top - box.top, right: r.right - box.left, bottom: r.bottom - box.top },
            occupied,
          );
        }
        l.el.classList.toggle('is-hidden', hide);
      }
    };
    return () => {
      dodgeRef.current = null;
      layers.forEach((l) => l.remove());
    };
  }, [map, dodgeRef]);
}

// ── Route line ──
// While a route runs, a brass line with a dark casing joins the stops in
// order: solid where you've been, dashed ahead. Gentle arcs read as a
// journey rather than a border.
export function useRouteLine(map: L.Map | null, stops: ConflictEvent[] | null, cursor: number): void {
  // Coordinates are data, so a stable string key avoids redrawing when a
  // language switch hands us new (identical) objects.
  const key = stops ? stops.map((s) => s.id).join('|') : '';
  const stopsRef = useRef(stops);
  stopsRef.current = stops;
  useEffect(() => {
    const s = stopsRef.current;
    if (!map || !s || s.length < 2) return;
    const legs = s.slice(1).map((b, i) => arc(s[i].coordinates, b.coordinates, 0.12));
    const join = (parts: [number, number][][]) => parts.flatMap((p, i) => (i ? p.slice(1) : p));
    const done = join(legs.slice(0, cursor));
    const ahead = join(legs.slice(cursor));
    const opts = { pane: 'route', interactive: false, lineCap: 'round', lineJoin: 'round' } as const;
    const layers: L.Layer[] = [];
    if (done.length) {
      layers.push(L.polyline(done, { ...opts, weight: 6, className: 'map-route-casing' }));
      layers.push(L.polyline(done, { ...opts, weight: 2.5, className: 'map-route' }));
    }
    if (ahead.length) {
      layers.push(L.polyline(ahead, { ...opts, weight: 5, className: 'map-route-casing map-route-casing--ahead' }));
      layers.push(L.polyline(ahead, { ...opts, weight: 2, dashArray: '6 7', className: 'map-route map-route--ahead' }));
    }
    layers.forEach((l) => l.addTo(map));
    return () => layers.forEach((l) => l.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, key, cursor]);
}

// ── Clan strongholds ──
// Shield-shaped seats below the event markers. A trace draws arcs from a
// family's nearest seat to every fight it took part in, in the family's
// colour over a vellum casing; dash pattern follows the fight's certainty
// (solid / dashed / dotted), same rule as everywhere else.
const SHIELD = 'M3 2.5h18v11.2c0 6.1-4.2 10-9 11.8-4.8-1.8-9-5.7-9-11.8z';

export function shieldSvg(clan: ClanId, size = 24): string {
  const cfg = CLAN_CONFIG[clan];
  const crest = esc(cfg.crest);
  return (
    `<svg class="seat-shield" viewBox="0 0 24 28" width="${size}" height="${Math.round((size * 28) / 24)}" aria-hidden="true" focusable="false">` +
    `<path d="${SHIELD}" fill="${cfg.color}"/>` +
    `<text x="12" y="${crest.length > 1 ? 15 : 15.5}" text-anchor="middle" class="${crest.length > 1 ? 'is-pair' : ''}">${crest}</text>` +
    '</svg>'
  );
}

interface ClanLayerOptions {
  show: boolean;
  tracing: ClanId | null;
  byId: Map<string, ConflictEvent>;
  /** Ids currently drawn as event markers; other fights get an end dot. */
  onMap: Set<string>;
  seatName: (pc: PowerCenter) => string;
  openSeat: (pc: PowerCenter, el: HTMLElement) => void;
  select: (id: string) => void;
}

export function useClanLayer(map: L.Map | null, o: ClanLayerOptions, dodgeRef: MutableRefObject<Dodge | null>): void {
  const live = useRef(o);
  live.current = o;
  const seatsRef = useRef<{ pc: PowerCenter; el: HTMLElement; m: L.Marker }[]>([]);

  // Seats exist while the layer is on.
  useEffect(() => {
    if (!map || !o.show) return;
    const seats = powerCenters.map((pc) => {
      const m = L.marker(pc.coordinates, {
        pane: 'seats',
        keyboard: false,
        autoPanOnFocus: false,
        bubblingMouseEvents: false,
        icon: L.divIcon({
          className: `seat-marker seat--${pc.clan}`,
          html:
            '<span class="seat-leader" aria-hidden="true"></span>' +
            shieldSvg(pc.clan) +
            '<span class="map-label" aria-hidden="true"></span>',
          iconSize: [24, 28],
          iconAnchor: [12, 26],
        }),
      }).addTo(map);
      const el = m.getElement()!;
      el.setAttribute('role', 'button');
      el.setAttribute('aria-haspopup', 'dialog');
      el.tabIndex = 0;
      m.on('click', () => live.current.openSeat(pc, el));
      el.addEventListener('keydown', (ev) => {
        if (ev.key !== 'Enter' && ev.key !== ' ') return;
        ev.preventDefault();
        ev.stopPropagation();
        live.current.openSeat(pc, el);
      });
      return { pc, el, m };
    });
    seatsRef.current = seats;
    dodgeRef.current = (occupied) => {
      for (const s of seats) {
        const p = map.latLngToContainerPoint(s.pc.coordinates);
        // The shield's body sits above its tip; nudge it up and right off
        // an event seal, with a hairline back to the true spot.
        const crowded = occupied.some((c) => Math.hypot(c.x - p.x, c.y - (p.y - 12)) < c.r + 10);
        s.el.style.marginLeft = `${crowded ? 8 : -12}px`;
        s.el.style.marginTop = `${crowded ? -36 : -26}px`;
        s.el.classList.toggle('is-nudged', crowded);
      }
    };
    return () => {
      dodgeRef.current = null;
      seats.forEach((s) => s.m.remove());
      seatsRef.current = [];
    };
  }, [map, o.show, dodgeRef]);

  // Names follow the language; other families fade while one is traced.
  const { seatName, tracing } = o;
  useEffect(() => {
    for (const s of seatsRef.current) {
      const cfg = CLAN_CONFIG[s.pc.clan];
      s.el.setAttribute('aria-label', seatName(s.pc));
      const lab = s.el.querySelector('.map-label');
      if (lab) lab.innerHTML = `<b lang="is">${esc(s.pc.name)}</b><span class="map-label__year">${esc(cfg.label)}</span>`;
      s.el.classList.toggle('is-dim', !!tracing && s.pc.clan !== tracing);
    }
  }, [seatName, tracing, o.show]);

  // The trace itself.
  const onMapKey = [...o.onMap].sort().join('|');
  useEffect(() => {
    const { byId, onMap, show } = live.current;
    if (!map || !show || !tracing) return;
    const seats = powerCenters.filter((pc) => pc.clan === tracing);
    if (!seats.length) return;
    const colour = CLAN_CONFIG[tracing].color;
    const layers: L.Layer[] = [];
    const ends: L.Layer[] = [];
    for (const id of CLAN_BATTLES[tracing] ?? []) {
      const e = byId.get(id);
      if (!e) continue;
      const seat = seats.reduce((a, b) => (dist2(b.coordinates, e.coordinates) < dist2(a.coordinates, e.coordinates) ? b : a));
      const pts = arc(seat.coordinates, e.coordinates, 0.18);
      const dash = e.confidence === 'high' ? undefined : e.confidence === 'medium' ? '9 6' : '0.5 6';
      layers.push(
        L.polyline(pts, { pane: 'trace', interactive: false, weight: 6, lineCap: 'round', className: 'map-trace-casing' }),
        L.polyline(pts, {
          pane: 'trace',
          interactive: false,
          weight: 2.75,
          color: colour,
          opacity: 1,
          dashArray: dash,
          lineCap: 'round',
          className: 'map-trace',
        }),
      );
      if (!onMap.has(id)) {
        // The fight is filtered off the map: a small end ring still names it.
        const end = L.circleMarker(e.coordinates, {
          pane: 'trace',
          radius: 5,
          weight: 2,
          color: colour,
          className: 'map-trace-end',
          bubblingMouseEvents: false,
        });
        end.bindTooltip(`${esc(e.name)} · ${e.year}`, { className: 'map-tip', direction: 'top', offset: [0, -6] });
        end.on('click', () => live.current.select(id));
        ends.push(end);
      }
    }
    [...layers, ...ends].forEach((l) => l.addTo(map));
    return () => [...layers, ...ends].forEach((l) => l.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, o.show, tracing, onMapKey, o.byId]);
}

/** Bounds of a family's seats plus every fight it took part in. */
export function traceBounds(clan: ClanId, byId: Map<string, ConflictEvent>): L.LatLngBounds | null {
  const pts: [number, number][] = powerCenters.filter((pc) => pc.clan === clan).map((pc) => pc.coordinates);
  for (const id of CLAN_BATTLES[clan] ?? []) {
    const e = byId.get(id);
    if (e) pts.push(e.coordinates);
  }
  const b = pts.length ? L.latLngBounds(pts) : null;
  return b?.isValid() ? b : null;
}
