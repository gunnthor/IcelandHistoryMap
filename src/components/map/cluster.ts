// ── Overlap handling, in pixel space ──
// Recomputed whenever the zoom (or what's on the map) changes. Three rules:
//   1. Pinned markers (the selection, route stops) never merge. If several
//      pinned markers would sit on top of each other they fan out around the
//      most important one, each keeping a leader line to its true spot.
//   2. Unpinned markers hiding under a pinned one become its "satellites":
//      a small "+n" pill on the pinned seal, so nothing silently disappears.
//   3. Other markers closer than ~0.8× their size merge into a count badge.
// Pure maths, no Leaflet — easy to reason about, cheap at a few hundred points.

export interface LayoutPoint {
  id: string;
  /** Absolute pixel position at the zoom being laid out. */
  x: number;
  y: number;
  pinned: boolean;
}

export interface LayoutGroup {
  ids: string[];
  x: number;
  y: number;
}

export interface LayoutResult {
  /** Unpinned ids drawn as their own marker. */
  singles: string[];
  /** Count badges. */
  groups: LayoutGroup[];
  /** Pinned id → unpinned ids hidden beneath it. */
  satellites: Map<string, string[]>;
  /** Pinned markers moved off a crowded spot, in pixels. */
  offsets: Map<string, { dx: number; dy: number }>;
}

export const SEAL = 28;
const MERGE = 0.8;

/** Rendered diameter of a count badge for n events. */
export const badgeSize = (n: number) => Math.min(44, Math.round(32 + 4 * Math.sqrt(Math.max(0, n - 2))));

const d = (ax: number, ay: number, bx: number, by: number) => Math.hypot(ax - bx, ay - by);

export function layoutMarkers(points: LayoutPoint[], primaryOf: (ids: string[]) => string): LayoutResult {
  const pinned = points.filter((p) => p.pinned);
  const free = points.filter((p) => !p.pinned);
  const offsets = new Map<string, { dx: number; dy: number }>();
  const satellites = new Map<string, string[]>();
  const near = SEAL * MERGE;

  // ── 1. Fan out pinned markers that collide ──
  const parent = new Map(pinned.map((p) => [p.id, p.id]));
  const find = (id: string): string => {
    let r = id;
    while (parent.get(r) !== r) r = parent.get(r)!;
    return r;
  };
  for (let i = 0; i < pinned.length; i++)
    for (let j = i + 1; j < pinned.length; j++)
      if (d(pinned[i].x, pinned[i].y, pinned[j].x, pinned[j].y) < near) parent.set(find(pinned[i].id), find(pinned[j].id));
  const crowds = new Map<string, LayoutPoint[]>();
  for (const p of pinned) {
    const r = find(p.id);
    crowds.set(r, [...(crowds.get(r) ?? []), p]);
  }
  const effective = new Map(pinned.map((p) => [p.id, { x: p.x, y: p.y }]));
  for (const crowd of crowds.values()) {
    if (crowd.length < 2) continue;
    const primaryId = primaryOf(crowd.map((p) => p.id));
    const primary = crowd.find((p) => p.id === primaryId) ?? crowd[0];
    const others = crowd.filter((p) => p !== primary);
    // Spacing keeps neighbouring seals (scaled up when selected) apart.
    const radius = Math.max(34, (others.length * 34) / (2 * Math.PI));
    others.forEach((p, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / others.length + (others.length > 1 ? Math.PI / others.length : Math.PI / 4);
      const tx = primary.x + radius * Math.cos(a);
      const ty = primary.y + radius * Math.sin(a);
      offsets.set(p.id, { dx: tx - p.x, dy: ty - p.y });
      effective.set(p.id, { x: tx, y: ty });
    });
  }

  const nearestPinned = (x: number, y: number, reach: number): string | null => {
    let best: string | null = null;
    let bestD = reach;
    for (const [id, e] of effective) {
      const dd = d(x, y, e.x, e.y);
      if (dd < bestD) {
        bestD = dd;
        best = id;
      }
    }
    return best;
  };
  const addSatellites = (pin: string, ids: string[]) => satellites.set(pin, [...(satellites.get(pin) ?? []), ...ids]);

  // ── 2. Unpinned markers under a pinned seal ──
  const rest: LayoutPoint[] = [];
  for (const p of free) {
    const pin = nearestPinned(p.x, p.y, near * 1.15);
    if (pin) addSatellites(pin, [p.id]);
    else rest.push(p);
  }

  // ── 3. Greedy clustering of the rest, then merge passes ──
  // Deterministic order (top-to-bottom, left-to-right) so the same view
  // always clusters the same way.
  rest.sort((a, b) => a.y - b.y || a.x - b.x);
  type Item = { ids: string[]; x: number; y: number };
  let items: Item[] = [];
  const used = new Set<string>();
  for (const p of rest) {
    if (used.has(p.id)) continue;
    used.add(p.id);
    const members = [p];
    for (const q of rest) {
      if (used.has(q.id)) continue;
      if (d(p.x, p.y, q.x, q.y) < near) {
        used.add(q.id);
        members.push(q);
      }
    }
    items.push({
      ids: members.map((m) => m.id),
      x: members.reduce((s, m) => s + m.x, 0) / members.length,
      y: members.reduce((s, m) => s + m.y, 0) / members.length,
    });
  }

  // A badge is bigger than a seal, so it can land on a neighbour: merge
  // until nothing overlaps (by rendered radius). Each pass merges one pair,
  // so this ends after at most n passes.
  const radiusOf = (it: Item) => (it.ids.length > 1 ? badgeSize(it.ids.length) : SEAL) / 2;
  for (let pass = 0; pass < points.length; pass++) {
    let merged = false;
    outer: for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        if (d(a.x, a.y, b.x, b.y) < (radiusOf(a) + radiusOf(b)) * MERGE) {
          const n = a.ids.length + b.ids.length;
          items[i] = {
            ids: [...a.ids, ...b.ids],
            x: (a.x * a.ids.length + b.x * b.ids.length) / n,
            y: (a.y * a.ids.length + b.y * b.ids.length) / n,
          };
          items.splice(j, 1);
          merged = true;
          break outer;
        }
      }
    }
    if (!merged) break;
  }

  // A badge that drifted onto a pinned seal joins that seal's satellites.
  items = items.filter((it) => {
    const pin = nearestPinned(it.x, it.y, (radiusOf(it) + (SEAL * 1.25) / 2) * MERGE);
    if (!pin) return true;
    addSatellites(pin, it.ids);
    return false;
  });

  return {
    singles: items.filter((it) => it.ids.length === 1).map((it) => it.ids[0]),
    groups: items.filter((it) => it.ids.length > 1),
    satellites,
    offsets,
  };
}

/** Would these points all stand apart (no badges at all)? */
export function allSeparate(points: { id: string; x: number; y: number }[]): boolean {
  return layoutMarkers(points.map((p) => ({ ...p, pinned: false })), (ids) => ids[0]).groups.length === 0;
}

/** Would these points still form a single badge? */
export function stillOneGroup(points: { id: string; x: number; y: number }[]): boolean {
  const r = layoutMarkers(points.map((p) => ({ ...p, pinned: false })), (ids) => ids[0]);
  return r.singles.length === 0 && r.groups.length === 1;
}
