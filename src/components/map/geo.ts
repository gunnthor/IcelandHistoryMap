import L from 'leaflet';
import { getInsets } from '../../state/layout';

// ── Geography + camera maths shared by the map area ──
// Everything here works in the *visible* map: the viewport minus whatever
// the floating UI (command bar, folio, dock, sheet) covers, as reported in
// state/layout's insets. Leaflet thinks in whole-container terms, so each
// helper converts between the two.

/** Iceland's land, coast to coast — what "fit Iceland" frames. */
export const ICELAND_LAND = L.latLngBounds([63.3, -24.6], [66.6, -13.4]);

/** How far the view may wander: wide enough that an event near the coast can
 *  still be centred in the visible map while a panel covers one side. On a
 *  phone the story sheet covers half the screen, so at whole-island zoom the
 *  viewport is already taller than Iceland — the bounds need that much open
 *  sea to the south, or the pan that lifts a marker above the sheet is
 *  clamped to nothing. */
export const MAX_BOUNDS = L.latLngBounds([55.5, -33], [71, -5]);

/** Bounds for the Ortelius engraving: a least-squares fit of 23 identifiable
 *  features on the chart (Hekla, Skálholt, Hólar, Papey…) against their real
 *  coordinates, with latitude fitted in Mercator-Y because Leaflet stretches
 *  image overlays linearly in projected space. The engraving's own
 *  distortion still leaves markers up to ~1° from their drawn features;
 *  that's the 16th century's problem, not a bug to fix here. */
export const ORTELIUS_BOUNDS = L.latLngBounds([62.063, -27.303], [66.764, -13.695]);

/** Flights never go deeper than this; clusters that still overlap here are
 *  the same site and open a place card instead. */
export const DEEPEST_FLIGHT = 11;

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * The part of the map container not covered by floating UI, in container
 * pixels, shrunk by `margin`. Falls back to the whole container when the
 * panels leave almost nothing (a full-height sheet), so maths never divides
 * by a sliver.
 */
export function visibleRect(map: L.Map, margin = 0): L.Bounds {
  const size = map.getSize();
  const box = map.getContainer().getBoundingClientRect();
  const i = getInsets();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const minX = Math.max(0, i.left - box.left) + margin;
  const minY = Math.max(0, i.top - box.top) + margin;
  const maxX = Math.min(size.x, vw - i.right - box.left) - margin;
  const maxY = Math.min(size.y, vh - i.bottom - box.top) - margin;
  if (maxX - minX < 120 || maxY - minY < 120) return L.bounds([margin, margin], [size.x - margin, size.y - margin]);
  return L.bounds([minX, minY], [maxX, maxY]);
}

/** Map centre that puts `target` in the middle of the visible rect at `zoom`. */
export function centreFor(map: L.Map, target: L.LatLngExpression, zoom: number): L.LatLng {
  const rect = visibleRect(map);
  const offset = rect.getCenter().subtract(map.getSize().divideBy(2));
  return map.unproject(map.project(target, zoom).subtract(offset), zoom);
}

/** Is the point inside the visible rect with some breathing room? */
export function comfortablyVisible(map: L.Map, latlng: L.LatLngExpression, frac = 0.12): boolean {
  const r = visibleRect(map);
  const w = r.max!.x - r.min!.x;
  const h = r.max!.y - r.min!.y;
  const mx = Math.min(72, w * frac);
  const my = Math.min(72, h * frac);
  const p = map.latLngToContainerPoint(latlng);
  return p.x >= r.min!.x + mx && p.x <= r.max!.x - mx && p.y >= r.min!.y + my && p.y <= r.max!.y - my;
}

/** The zoom (snapped down, unclamped) at which `bounds` fits a rect. */
export function fitZoom(map: L.Map, bounds: L.LatLngBounds, rect: L.Bounds, padding = 24): number {
  const z = map.getZoom();
  const nw = map.project(bounds.getNorthWest(), z);
  const se = map.project(bounds.getSouthEast(), z);
  const bw = Math.max(1, se.x - nw.x);
  const bh = Math.max(1, se.y - nw.y);
  const aw = Math.max(40, rect.max!.x - rect.min!.x - 2 * padding);
  const ah = Math.max(40, rect.max!.y - rect.min!.y - 2 * padding);
  const raw = map.getScaleZoom(Math.min(aw / bw, ah / bh), z);
  const snap = map.options.zoomSnap || 1;
  return Math.floor(raw / snap + 1e-6) * snap;
}

/** Centre + zoom that frame `bounds` inside the visible rect. */
export function frameFor(
  map: L.Map,
  bounds: L.LatLngBounds,
  { maxZoom = DEEPEST_FLIGHT, padding = 32 }: { maxZoom?: number; padding?: number } = {},
): { center: L.LatLng; zoom: number } {
  const zoom = clamp(Math.min(fitZoom(map, bounds, visibleRect(map), padding), maxZoom), map.getMinZoom(), map.getMaxZoom());
  const mid = map.unproject(
    map.project(bounds.getNorthWest(), zoom).add(map.project(bounds.getSouthEast(), zoom)).divideBy(2),
    zoom,
  );
  return { center: centreFor(map, mid, zoom), zoom };
}

/** Flight length: short hops are quick, cross-country flights take longer. */
export function flightSeconds(map: L.Map, to: L.LatLng): number {
  const km = map.distance(map.getCenter(), to) / 1000;
  return clamp(0.6 + km / 500, 0.8, 1.6);
}

/**
 * A gently curved line from a to b (quadratic Bézier), as lat/lng points.
 * Curves read as "movement" rather than borders, and two arcs into the same
 * place stay distinguishable. Computed in a locally-scaled lat/lng plane,
 * which is plenty accurate at Iceland's size.
 */
export function arc(a: [number, number], b: [number, number], bulge = 0.16, steps = 18): [number, number][] {
  const k = Math.cos((((a[0] + b[0]) / 2) * Math.PI) / 180);
  const ax = a[1] * k;
  const bx = b[1] * k;
  const dx = bx - ax;
  const dy = b[0] - a[0];
  if (Math.abs(dx) + Math.abs(dy) < 1e-6) return [a, b];
  // Control point: the midpoint pushed sideways (always to the same side of
  // the direction of travel, so a route's arcs flow consistently).
  const cx = (ax + bx) / 2 - dy * bulge;
  const cy = (a[0] + b[0]) / 2 + dx * bulge;
  const out: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    const x = u * u * ax + 2 * u * t * cx + t * t * bx;
    const y = u * u * a[0] + 2 * u * t * cy + t * t * b[0];
    out.push([y, x / k]);
  }
  return out;
}

/** Squared distance in a locally-scaled lat/lng plane — for "nearest". */
export function dist2(a: [number, number], b: [number, number]): number {
  const k = Math.cos((a[0] * Math.PI) / 180);
  const dLat = a[0] - b[0];
  const dLng = (a[1] - b[1]) * k;
  return dLat * dLat + dLng * dLng;
}
