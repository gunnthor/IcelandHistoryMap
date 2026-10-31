import { useCallback, useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import { ConflictEvent } from '../../types';
import { Explorer } from '../../state/explorer';
import { getInsets, prefersReducedMotion, useInsets } from '../../state/layout';
import { STYLE_MAX_ZOOM } from './Basemap';
import {
  DEEPEST_FLIGHT,
  ICELAND_LAND,
  centreFor,
  clamp,
  comfortablyVisible,
  fitZoom,
  flightSeconds,
  frameFor,
} from './geo';

// ════════════════════════════════════════════════════════════════
// The camera. It remembers what the view is *for* — all of Iceland, a set
// of bounds, one event — so that when the panels move (the folio opens, the
// sheet is dragged, the window resizes) it can re-frame the same thing in
// the newly visible part of the map. Any hand on the map (drag, wheel,
// pinch, keys, zoom buttons) turns that off until the next request.
// ════════════════════════════════════════════════════════════════

type Intent =
  | { kind: 'iceland' }
  | { kind: 'bounds'; bounds: L.LatLngBounds; maxZoom: number }
  | { kind: 'event'; id: string }
  /** A remembered viewpoint (what the visitor was looking at before a story). */
  | { kind: 'view'; center: L.LatLng; zoom: number }
  | { kind: 'free' };

export interface Camera {
  /** Show these bounds in the visible map and keep them framed. */
  frameBounds: (bounds: L.LatLngBounds, maxZoom?: number) => void;
  /** Exploratory move (cluster zoom-in): centre `latlng` at `zoom`. */
  goTo: (latlng: L.LatLng, zoom: number) => void;
  /** Bring a point (a focused marker) into the visible map. */
  reveal: (latlng: L.LatLng) => void;
}

function hasFlag(e: ConflictEvent, f: string) {
  return e.uncertaintyFlags?.includes(f as never) ?? false;
}

export function useCamera(map: L.Map | null, x: Explorer): Camera {
  const intent = useRef<Intent>(x.selected ? { kind: 'event', id: x.selected.id } : { kind: 'iceland' });
  const auto = useRef(false);
  const readyAt = useRef(0);
  const framedInsets = useRef(getInsets());
  const lastSelected = useRef<string | null>(null);
  /** What the view was for before the current story opened — closing the
   *  story returns there, unless the visitor has since moved the map. */
  const beforeStory = useRef<Intent | null>(null);
  const live = useRef(x);
  live.current = x;
  const style = x.state.mapStyle;

  // ── Moving ──
  // Every programmatic move is flagged so movestart can tell it apart from
  // a visitor's hand. The first second after mount is instant: panels are
  // still reporting their insets and an animated settle looks like a glitch.
  const move = useCallback(
    (center: L.LatLng, zoom: number, opts: { animate?: boolean } = {}) => {
      if (!map) return;
      auto.current = true;
      const animate = opts.animate !== false && !prefersReducedMotion() && performance.now() > readyAt.current;
      if (!animate) {
        map.setView(center, zoom, { animate: false });
        auto.current = false;
        return;
      }
      if (Math.abs(map.getZoom() - zoom) < 0.01) map.panTo(center, { duration: 0.6, easeLinearity: 0.3 });
      else map.flyTo(center, zoom, { duration: flightSeconds(map, center) });
    },
    [map],
  );

  /** Zoom for showing one event: close enough to read the place, wider when
   *  the spot itself is a guess, never past what the 1590 plate can show. */
  const eventZoom = useCallback(
    (e: ConflictEvent) => {
      if (!map) return 9;
      let z = hasFlag(e, 'location_uncertain') ? 8 : clamp(map.getZoom(), 9, DEEPEST_FLIGHT);
      // The 1590 plate is one 2300px image: past z8 it's all blur.
      if (live.current.state.mapStyle === 'ortelius') z = Math.min(z, 8);
      return clamp(z, map.getMinZoom(), map.getMaxZoom());
    },
    [map],
  );

  const focusEvent = useCallback(
    (e: ConflictEvent, opts: { animate?: boolean } = {}) => {
      if (!map) return;
      intent.current = { kind: 'event', id: e.id };
      const zoom = eventZoom(e);
      move(centreFor(map, e.coordinates, zoom), zoom, opts);
    },
    [map, eventZoom, move],
  );

  const frame = useCallback(
    (bounds: L.LatLngBounds, maxZoom: number, opts: { animate?: boolean; padding?: number } = {}) => {
      // An empty selection (0 results, a trace with no fights) has no bounds.
      if (!map || !bounds.isValid()) return;
      const size = map.getSize();
      if (!size.x || !size.y) return;
      const cap = live.current.state.mapStyle === 'ortelius' ? Math.min(maxZoom, 8) : maxZoom;
      const { center, zoom } = frameFor(map, bounds, { maxZoom: cap, padding: opts.padding ?? 48 });
      move(center, zoom, opts);
    },
    [map, move],
  );

  const fitIceland = useCallback(
    (opts: { animate?: boolean } = {}) => {
      intent.current = { kind: 'iceland' };
      // The land bounds hug the coast already; a little room for coastal seals.
      frame(ICELAND_LAND, 8, { ...opts, padding: 20 });
    },
    [frame],
  );

  /** Re-apply whatever the view is for, in the current visible rect. */
  const reframe = useCallback(
    (opts: { animate?: boolean } = {}) => {
      if (!map) return;
      const i = intent.current;
      const sel = live.current.selected;
      if (i.kind === 'iceland') fitIceland(opts);
      else if (i.kind === 'bounds') frame(i.bounds, i.maxZoom, opts);
      else if (i.kind === 'event') {
        const e = live.current.byId.get(i.id);
        if (e) move(centreFor(map, e.coordinates, map.getZoom()), map.getZoom(), opts);
      } else if (sel && !comfortablyVisible(map, sel.coordinates)) {
        // The visitor moved the map themselves; only step in if a panel
        // now covers what they're reading.
        intent.current = { kind: 'event', id: sel.id };
        move(centreFor(map, sel.coordinates, map.getZoom()), map.getZoom(), opts);
      }
    },
    [map, fitIceland, frame, move],
  );

  // ── Setup: user-vs-programmatic, size tracking, min zoom ──
  useEffect(() => {
    if (!map) return;
    readyAt.current = performance.now() + 1000;
    const updateMinZoom = () => {
      const size = map.getSize();
      const full = L.bounds([0, 0], [size.x, size.y]);
      // Just below "Iceland fills the screen": enough room to fit it beside
      // an open panel, never so far out that it's a speck in the ocean.
      map.setMinZoom(Math.max(3, fitZoom(map, ICELAND_LAND, full, 0) - 1));
    };
    updateMinZoom();
    const onUser = () => {
      if (!auto.current) intent.current = { kind: 'free' };
    };
    const onEnd = () => {
      auto.current = false;
    };
    const onDrag = () => {
      auto.current = false;
      intent.current = { kind: 'free' };
    };
    map.on('movestart zoomstart', onUser);
    map.on('moveend', onEnd);
    map.on('dragstart', onDrag);

    // The container is the viewport today, but don't rely on it: any size
    // change re-measures Leaflet and re-frames.
    let t = 0;
    const ro = new ResizeObserver(() => {
      map.invalidateSize({ debounceMoveend: true });
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        updateMinZoom();
        framedInsets.current = getInsets();
        reframe({ animate: false });
      }, 120);
    });
    ro.observe(map.getContainer());

    // Initial view: a shared link opens on its event, otherwise Iceland.
    // Closing a story that arrived by link has nothing to go back to, so it
    // opens out onto the whole island.
    const sel = live.current.selected;
    if (sel) {
      lastSelected.current = sel.id;
      beforeStory.current = { kind: 'iceland' };
      focusEvent(sel, { animate: false });
    } else fitIceland({ animate: false });

    return () => {
      ro.disconnect();
      window.clearTimeout(t);
      map.off('movestart zoomstart', onUser);
      map.off('moveend', onEnd);
      map.off('dragstart', onDrag);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  // ── Panels moved: re-frame once they settle ──
  const insets = useInsets();
  useEffect(() => {
    if (!map) return;
    const prev = framedInsets.current;
    const big = (['top', 'right', 'bottom', 'left'] as const).some((k) => Math.abs(insets[k] - prev[k]) >= 24);
    if (!big) return;
    const t = window.setTimeout(() => {
      framedInsets.current = getInsets();
      reframe();
    }, 160);
    return () => window.clearTimeout(t);
  }, [map, insets, reframe]);

  // ── Selection ──
  const selId = x.selected?.id ?? null;
  const routeKey = x.state.route ? JSON.stringify(x.state.route) : null;
  const lastRoute = useRef<string | null>(routeKey);
  useEffect(() => {
    if (!map) return;
    // Track route changes even when the selection stays put (leaving a
    // route, or following someone from the event you're reading).
    const startedRoute = routeKey !== null && routeKey !== lastRoute.current;
    lastRoute.current = routeKey;
    // A route that has just started opens on the whole route — every stop
    // and the line between them — rather than diving straight into stop 1
    // (also when stop 1 is the event already open).
    const stops = live.current.route?.stops;
    // Remember what the view was for before a story first opens.
    if (selId && !lastSelected.current && !beforeStory.current) {
      const i = intent.current;
      beforeStory.current = i.kind === 'free' ? { kind: 'view', center: map.getCenter(), zoom: map.getZoom() } : i;
    }
    if (startedRoute && stops && stops.length > 1) {
      const bounds = L.latLngBounds(stops.map((s) => s.coordinates));
      if (bounds.isValid()) {
        lastSelected.current = selId;
        intent.current = { kind: 'bounds', bounds, maxZoom: 9 };
        frame(bounds, 9);
        return;
      }
    }
    if (selId === lastSelected.current) return;
    lastSelected.current = selId;
    const e = selId ? live.current.byId.get(selId) : null;
    if (!e) {
      // Closed. If the camera was still doing the story's framing (the
      // visitor hasn't taken the map), go back to what they were looking at.
      const back = beforeStory.current;
      beforeStory.current = null;
      const ours = intent.current.kind === 'event' || intent.current.kind === 'bounds';
      if (back && ours) {
        if (back.kind === 'iceland') fitIceland();
        else if (back.kind === 'bounds') {
          intent.current = back;
          frame(back.bounds, back.maxZoom);
        } else if (back.kind === 'view') {
          intent.current = { kind: 'free' };
          move(back.center, back.zoom);
        } else intent.current = { kind: 'free' };
      } else if (intent.current.kind === 'event') intent.current = { kind: 'free' };
      return;
    }
    // Picked on the map: it's already in front of you. Only move if it's
    // tucked under a panel or the edge.
    if (live.current.state.selectSource === 'map') {
      if (!comfortablyVisible(map, e.coordinates)) {
        intent.current = { kind: 'event', id: e.id };
        move(centreFor(map, e.coordinates, map.getZoom()), map.getZoom());
      } else {
        // Leave the view alone, but keep the pick in sight when a panel opens.
        intent.current = { kind: 'free' };
      }
      return;
    }
    focusEvent(e);
  }, [map, selId, routeKey, focusEvent, frame, fitIceland, move]);

  // ── Filters, search and eras: show what matches ──
  // Narrowing the map must never leave the visitor looking at an empty
  // valley. Once the set settles (typing is debounced), frame the matches —
  // or all of Iceland when nothing is filtered. While a story is open, only
  // step in if no match is in view; routes and autoplay drive the camera
  // themselves.
  const filterSig = x.filtered.map((e) => e.id).join(',');
  const firstFilter = useRef(true);
  useEffect(() => {
    if (!map) return;
    if (firstFilter.current) {
      firstFilter.current = false;
      return;
    }
    const t = window.setTimeout(() => {
      const L_ = live.current;
      if (L_.route || L_.state.playing || L_.filtered.length === 0) return;
      const all = L_.filtered.length === L_.events.length;
      if (L_.selected) {
        if (all || L_.filtered.some((e) => comfortablyVisible(map, e.coordinates, 0.04))) return;
      } else if (all) {
        fitIceland();
        return;
      }
      const pts = L_.filtered.map((e) => e.coordinates);
      if (L_.selected) pts.push(L_.selected.coordinates);
      const bounds = L.latLngBounds(pts);
      if (!bounds.isValid()) return;
      intent.current = { kind: 'bounds', bounds, maxZoom: 9 };
      frame(bounds, 9);
    }, 450);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, filterSig]);

  // ── Requests from elsewhere ──
  const { fitRequest, focusRequest } = x.state;
  useEffect(() => {
    if (!map || !fitRequest) return;
    const L_ = live.current;
    const asked = L_.state.fitIds
      ?.map((id) => L_.byId.get(id)?.coordinates)
      .filter((c): c is [number, number] => !!c);
    const pts = asked?.length
      ? asked
      : L_.route
        ? L_.route.stops.map((e) => e.coordinates)
        : L_.filtered.length > 0 && L_.filtered.length < L_.events.length
          ? L_.filtered.map((e) => e.coordinates)
          : null;
    const bounds = pts && pts.length ? L.latLngBounds(pts) : null;
    if (bounds?.isValid()) {
      intent.current = { kind: 'bounds', bounds, maxZoom: 10 };
      frame(bounds, 10);
    } else fitIceland();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, fitRequest]);

  useEffect(() => {
    if (!map || !focusRequest) return;
    const sel = live.current.selected;
    if (sel) focusEvent(sel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, focusRequest]);

  // ── Style: each basemap has its own depth; re-frame an event view so the
  // 1590 plate never sits past its sharpness ──
  useEffect(() => {
    if (!map) return;
    map.setMaxZoom(STYLE_MAX_ZOOM[style]);
    const i = intent.current;
    if (i.kind === 'event' && style === 'ortelius' && map.getZoom() > 8) {
      const e = live.current.byId.get(i.id);
      if (e) focusEvent(e);
    }
  }, [map, style, focusEvent]);

  return useMemo<Camera>(
    () => ({
      frameBounds: (bounds, maxZoom = 9) => {
        intent.current = { kind: 'bounds', bounds, maxZoom };
        frame(bounds, maxZoom);
      },
      goTo: (latlng, zoom) => {
        if (!map) return;
        intent.current = { kind: 'free' };
        move(centreFor(map, latlng, zoom), zoom);
      },
      reveal: (latlng) => {
        if (!map) return;
        intent.current = { kind: 'free' };
        move(centreFor(map, latlng, map.getZoom()), map.getZoom());
      },
    }),
    [map, frame, move],
  );
}
