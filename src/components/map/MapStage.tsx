import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer } from 'react-leaflet';
import { ClanId, PowerCenter } from '../../types';
import { useExplorer } from '../../state/explorer';
import { prefersReducedMotion, useInsets, useLayoutMode } from '../../state/layout';
import { useI18n } from '../../i18n';
import { CLAN_BATTLES } from '../../data/clanBattles';
import { CLAN_CONFIG } from '../../utils/clanConfig';
import { Button } from '../ui';
import { Icon } from '../icons/Icon';
import { Basemap, ensurePanes } from './Basemap';
import { useCamera } from './camera';
import { PlaceCard, SeatCard } from './Cards';
import { ICELAND_LAND, MAX_BOUNDS } from './geo';
import { MapControls } from './MapControls';
import { EventLayer, MarkerState, MarkerText } from './markers';
import { Dodge, traceBounds, useClanLayer, useGlaciers, useRouteLine } from './overlays';
import './map.css';

// ════════════════════════════════════════════════════════════════
// The map stage: the full-bleed vitrine everything else floats over.
// React owns the controls, cards and empty state; the markers and
// overlays are imperative Leaflet layers fed from the explorer store
// (see markers.ts / overlays.ts), and camera.ts frames everything in the
// part of the map the panels leave visible.
// ════════════════════════════════════════════════════════════════

export function MapStage() {
  const { t } = useI18n();
  const x = useExplorer();
  const mode = useLayoutMode();
  const insets = useInsets();
  const [map, setMap] = useState<L.Map | null>(null);
  const [tracing, setTracing] = useState<ClanId | null>(null);
  const [place, setPlace] = useState<string[] | null>(null);
  const [seat, setSeat] = useState<PowerCenter | null>(null);
  const placeAnchor = useRef<HTMLElement | null>(null);
  const seatAnchor = useRef<HTMLElement | null>(null);
  const layerRef = useRef<EventLayer | null>(null);
  const glacierDodge = useRef<Dodge | null>(null);
  const seatDodge = useRef<Dodge | null>(null);
  // Leaflet reads its animation options once, at creation.
  const [reduced] = useState(prefersReducedMotion);
  const style = x.state.mapStyle;
  const { showClans } = x.state;

  useLayoutEffect(() => {
    if (!map) return;
    ensurePanes(map);
    const c = map.getContainer();
    c.setAttribute('role', 'region');
  }, [map]);
  useEffect(() => {
    map?.getContainer().setAttribute('aria-label', t.map.canvasAria);
  }, [map, t]);

  const camera = useCamera(map, x);
  const cameraRef = useRef(camera);
  cameraRef.current = camera;

  // ── Event markers ──
  const text = useMemo<MarkerText>(
    () => ({
      typeName: (type) => t.types[type],
      stopOf: t.tours.stopOf,
      cluster: t.map.clusterSpan,
      more: t.map.more,
      group: t.map.markersAria,
    }),
    [t],
  );
  const textRef = useRef(text);
  textRef.current = text;
  const live = useRef(x);
  live.current = x;

  useEffect(() => {
    if (!map) return;
    ensurePanes(map);
    const layer = new EventLayer(
      map,
      {
        select: (id) => live.current.select(id, 'map'),
        hover: (id) => live.current.setHovered(id),
        openPlace: (ids, anchor) => {
          placeAnchor.current = anchor;
          setPlace(ids);
        },
        frame: (center, zoom) => cameraRef.current.goTo(center, zoom),
        reveal: (latlng) => cameraRef.current.reveal(latlng),
        laidOut: () => {
          const occupied = layer.occupied();
          glacierDodge.current?.(occupied);
          seatDodge.current?.(occupied);
        },
      },
      textRef.current,
    );
    layerRef.current = layer;
    return () => {
      layer.destroy();
      layerRef.current = null;
    };
  }, [map]);

  useEffect(() => layerRef.current?.setText(text), [text, map]);
  useEffect(() => layerRef.current?.setEvents(x.mapEvents), [x.mapEvents, map]);

  const lit = useMemo(() => (tracing ? new Set(CLAN_BATTLES[tracing] ?? []) : null), [tracing]);
  const stopIds = useMemo(() => x.route?.stops.map((e) => e.id) ?? [], [x.route]);
  useEffect(() => {
    const st: MarkerState = {
      selectedId: x.state.selectedId,
      hoveredId: x.state.hoveredId,
      stops: stopIds,
      cursor: x.state.routeCursor,
      lit,
    };
    layerRef.current?.setState(st);
  }, [map, x.state.selectedId, x.state.hoveredId, x.state.routeCursor, stopIds, lit]);

  // ── Overlays ──
  useGlaciers(map, glacierDodge);
  useRouteLine(map, x.route?.stops ?? null, x.state.routeCursor);
  const onMap = useMemo(() => new Set(x.mapEvents.map((e) => e.id)), [x.mapEvents]);
  const seatName = useCallback((pc: PowerCenter) => `${pc.name}, ${CLAN_CONFIG[pc.clan].label}`, []);
  useClanLayer(
    map,
    {
      show: showClans,
      tracing,
      byId: x.byId,
      onMap,
      seatName,
      openSeat: (pc, el) => {
        seatAnchor.current = el;
        setSeat(pc);
      },
      select: (id) => x.select(id, 'map'),
    },
    seatDodge,
  );
  // Glacier labels and seats are created after the markers' first layout:
  // dodge once they exist.
  useEffect(() => {
    const occupied = layerRef.current?.occupied();
    if (!occupied) return;
    glacierDodge.current?.(occupied);
    if (showClans) seatDodge.current?.(occupied);
  }, [showClans, map]);

  // The trace dies with the layer (manual toggle, leaving the Sturlung era,
  // a route starting).
  useEffect(() => {
    if (!showClans) {
      setTracing(null);
      setSeat(null);
    }
  }, [showClans]);

  const trace = useCallback(
    (clan: ClanId | null) => {
      setTracing(clan);
      if (!clan) return;
      const b = traceBounds(clan, live.current.byId);
      if (b) cameraRef.current.frameBounds(b, 9);
    },
    [],
  );

  // The thing a card hangs off says so (and drops its hover label).
  useEffect(() => {
    const el = placeAnchor.current;
    if (!place || !el) return;
    el.setAttribute('aria-expanded', 'true');
    return () => {
      el.removeAttribute('aria-expanded');
      live.current.setHovered(null);
    };
  }, [place]);
  useEffect(() => {
    const el = seatAnchor.current;
    if (!seat || !el) return;
    el.setAttribute('aria-expanded', 'true');
    return () => el.setAttribute('aria-expanded', 'false');
  }, [seat]);

  // Cards anchored to the map close as soon as the map moves.
  useEffect(() => {
    if (!map) return;
    const close = () => {
      setPlace(null);
      setSeat(null);
    };
    map.on('zoomstart', close);
    map.on('dragstart', close);
    return () => {
      map.off('zoomstart', close);
      map.off('dragstart', close);
    };
  }, [map]);

  // Compact: controls and credits step aside once the sheet is above peek.
  const sheetHigh = mode === 'compact' && insets.bottom > window.innerHeight * 0.45;
  const empty = x.filtered.length === 0;

  return (
    <main id="map" className="map-stage" data-style={style} aria-label={t.map.aria}>
      <MapContainer
        ref={setMap}
        className="map-canvas"
        bounds={ICELAND_LAND}
        maxBounds={MAX_BOUNDS}
        maxBoundsViscosity={1}
        zoomSnap={0.25}
        zoomDelta={0.5}
        wheelPxPerZoomLevel={120}
        minZoom={4}
        maxZoom={14}
        zoomControl={false}
        attributionControl={false}
        zoomAnimation={!reduced}
        fadeAnimation={!reduced}
        markerZoomAnimation={!reduced}
        inertia={!reduced}
      >
        <Basemap style={style} />
      </MapContainer>

      <MapControls map={map} tracing={tracing} onTrace={trace} hidden={sheetHigh} />

      <Credits style={style} hidden={sheetHigh} compact={mode === 'compact'} />

      {empty && (
        <div className="map-empty">
          <div className="map-empty__card on-vellum" role="status">
            <p className="map-empty__title">{t.map.emptyTitle}</p>
            <p className="map-empty__body">{t.map.emptyBody}</p>
            <Button variant="primary" size="sm" icon="reset" onClick={x.resetFilters}>
              {t.map.resetBtn}
            </Button>
          </div>
        </div>
      )}

      <PlaceCard ids={place} anchorRef={placeAnchor} onClose={() => setPlace(null)} />
      <SeatCard seat={seat} anchorRef={seatAnchor} onClose={() => setSeat(null)} />
    </main>
  );
}

// ── Credits ──
// Esri's terms and OSM's licence both require visible attribution; the
// 1590 plate is public domain but credited all the same. Wide: one quiet
// line. Compact: an (i) that opens the line, so it never sits on the dock.
function Credits({ style, hidden, compact }: { style: string; hidden: boolean; compact: boolean }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const parts =
    style === 'ortelius'
      ? [t.map.creditOrtelius]
      : [style === 'satellite' ? t.map.creditImagery : t.map.creditRelief, t.map.creditGlaciers];
  const line = (
    <>
      <a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">
        Leaflet
      </a>
      {parts.map((p) => (
        <span key={p}> · {p}</span>
      ))}
    </>
  );
  return (
    <div className="map-credits" data-hidden={hidden || undefined} data-compact={compact || undefined}>
      {compact ? (
        <>
          {open && (
            <p className="map-credits__line" id="map-credits-line">
              {line}
            </p>
          )}
          <button
            type="button"
            className="map-credits__toggle"
            aria-expanded={open}
            aria-controls="map-credits-line"
            aria-label={t.map.credits}
            title={t.map.credits}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name="info" size={16} />
          </button>
        </>
      ) : (
        <p className="map-credits__line">{line}</p>
      )}
    </div>
  );
}
