import { useEffect, useState, useRef, useMemo } from 'react';
import { ImageOverlay, MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { ConflictEvent, PowerCenter, ClanId } from '../types';
import { EVENT_CONFIG } from '../utils/eventConfig';
import { CLAN_CONFIG, CLAN_ORDER } from '../utils/clanConfig';
import { powerCenters } from '../data/powerCenters';
import { powerCenterTranslations } from '../data/powerCenters.is';
import { CLAN_BATTLES } from '../data/clanBattles';
import { glaciers } from '../data/glaciers';
import { createSpiderfier, OMSInstance } from '../utils/oms';
import { useI18n } from '../i18n';

// Tag we stash on each Leaflet marker so the shared OMS click handler can map
// a clicked marker back to its event.
type TaggedMarker = L.Marker & { _event?: ConflictEvent };

// Squared lat/lng distance — fine for "which seat is nearest" at Iceland scale.
function dist2(a: [number, number], b: [number, number]): number {
  const dLat = a[0] - b[0];
  const dLng = a[1] - b[1];
  return dLat * dLat + dLng * dLng;
}

// Bounding box that keeps the map pinned to Iceland (SW corner, NE corner),
// with a little breathing room around the coastline.
const ICELAND_BOUNDS: L.LatLngBoundsExpression = [
  [62.7, -25.8],
  [67.2, -12.2],
];

// ── Map styles ──
// "parchment" is the original fantasy chart. "summer" layers Esri's physical
// map (hypsometric color: green lowlands, brown highlands) under the shaded
// relief with multiply blending, tuned toward Iceland's vivid late-July
// palette — historically apt, since at settlement birchwoods covered 25–40%
// of the island. "satellite" is the literal July view, and the default.
// "ortelius" swaps the world for Abraham Ortelius' hand-coloured Islandia
// engraving (c. 1590) — sea monsters included. Atmosphere, not navigation.
export type MapStyle = 'parchment' | 'summer' | 'satellite' | 'ortelius';

const MAP_STYLE_META: Record<MapStyle, { label: string; hint: string }> = {
  parchment: { label: 'Parchment', hint: 'The aged fantasy chart' },
  summer: { label: 'Summer', hint: 'Late-July Iceland: green lowlands, brown highlands' },
  satellite: { label: 'Satellite', hint: 'The real thing, from orbit' },
  ortelius: { label: '1590', hint: 'Ortelius’ Islandia engraving — sea monsters included' },
};

const MAP_STYLE_KEY = 'battlemap-style';

function loadMapStyle(): MapStyle {
  const v = localStorage.getItem(MAP_STYLE_KEY);
  return v === 'summer' || v === 'parchment' || v === 'ortelius' ? v : 'satellite';
}

// Bounds for the Ortelius engraving overlay: a least-squares fit of 23
// identifiable features on the chart (Hekla, Skálholt, Hólar, Papey,
// Kirkjubæjarklaustur…) against their real coordinates, with latitude fitted
// in Mercator-Y because Leaflet stretches image overlays linearly in
// projected space. The engraving's own distortion still leaves markers up to
// ~1° from their drawn features — that's the 16th century's problem, not a
// bug to fix here.
const ORTELIUS_BOUNDS: L.LatLngBoundsExpression = [
  [62.063, -27.303],
  [66.764, -13.695],
];

// Fly to the selected event whenever it changes. On the 1590 engraving we
// stay wider — it's a single ~2300px image, and past z8 it's all blur.
// Keyed by event id (not object identity): a language switch swaps the whole
// event array, and re-flying to the same spot on a dictionary change is noise.
function MapController({ event, mapStyle }: { event: ConflictEvent | null; mapStyle: MapStyle }) {
  const map = useMap();
  const lastFlown = useRef<string | null>(null);
  useEffect(() => {
    const key = event ? `${event.id}:${mapStyle}` : null;
    if (event && key !== lastFlown.current) {
      map.flyTo(event.coordinates, mapStyle === 'ortelius' ? 8 : 10, { duration: 1.2 });
    }
    lastFlown.current = key;
  }, [event, map, mapStyle]);
  return null;
}

// Glacier layer: Iceland's ice caps as snowy "white realms". Painted icy white
// with a soft glow so they pop against the warm parchment basemap. Purely
// decorative — non-interactive, and sits below the event/clan markers.
function GlacierLayer() {
  const map = useMap();

  useEffect(() => {
    const layers: L.Layer[] = [];

    glaciers.forEach((g) => {
      g.rings.forEach((ring) => {
        const poly = L.polygon(ring as L.LatLngExpression[], {
          interactive: false,
          className: 'glacier-shape',
          color: '#cfe6f2', // pale icy stroke
          weight: 1,
          fillColor: '#ffffff',
          fillOpacity: 0.88,
        });
        poly.addTo(map);
        layers.push(poly);
      });

      if (g.label) {
        const labelIcon = L.divIcon({
          html: `<span class="glacier-label">${g.name}</span>`,
          className: '',
          iconSize: [0, 0],
        });
        const labelMarker = L.marker(g.label as L.LatLngExpression, {
          icon: labelIcon,
          interactive: false,
          keyboard: false,
          zIndexOffset: -1000, // keep labels behind the event pins
        });
        labelMarker.addTo(map);
        layers.push(labelMarker);
      }
    });

    return () => {
      layers.forEach((l) => l.remove());
    };
  }, [map]);

  return null;
}

function EventMarkers({
  events,
  selectedId,
  onSelect,
}: {
  events: ConflictEvent[];
  selectedId: string | null;
  onSelect: (e: ConflictEvent) => void;
}) {
  const map = useMap();
  const { t } = useI18n();
  const omsRef = useRef<OMSInstance | null>(null);
  const omsInitRef = useRef(false);
  // Keep the latest onSelect in a ref so the single OMS click listener (added
  // once) always calls the current handler without being re-registered.
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    // Create the spiderfier once for this map. Clicking a spot where markers
    // overlap fans them out instead of firing a (random) marker's click. If the
    // plugin failed to load, oms is null and we fall back to plain clicks.
    if (!omsInitRef.current) {
      omsInitRef.current = true;
      const oms = createSpiderfier(map, { keepSpiderfied: true, nearbyDistance: 22 });
      omsRef.current = oms;
      if (oms) {
        oms.addListener('click', (marker) => {
          const ev = (marker as TaggedMarker)._event;
          if (ev) onSelectRef.current(ev);
        });
      }
    }
    const oms = omsRef.current;
    if (oms) oms.clearMarkers();

    const markers: L.Marker[] = [];

    events.forEach((event) => {
      const cfg = EVENT_CONFIG[event.type];
      const isSelected = event.id === selectedId;
      const ariaLabel = `${event.name}, ${t.types[event.type] ?? cfg.label}, ${event.year}`;

      const icon = L.divIcon({
        html: `<div class="marker-icon marker-${event.type} confidence-${event.confidence}${isSelected ? ' selected' : ''}" role="button" tabindex="0" aria-label="${ariaLabel}">${cfg.symbol}</div>`,
        className: '',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -20],
      });

      const marker = L.marker(event.coordinates as L.LatLngExpression, {
        icon,
        zIndexOffset: isSelected ? 1000 : 0,
        keyboard: false, // we wire our own keyboard handling on the inner element
      }) as TaggedMarker;
      marker._event = event;

      // Selection is routed through OMS's 'click' (see listener above) so that
      // overlapping markers spiderfy instead of selecting one at random.
      marker.bindTooltip(`${event.name} · ${event.year}`, {
        direction: 'top',
        offset: [0, -18],
        opacity: 0.95,
      });
      marker.addTo(map);
      if (oms) {
        oms.addMarker(marker);
      } else {
        // Fallback when the spiderfier isn't available: plain click-to-select.
        marker.on('click', () => onSelectRef.current(event));
      }

      // Make the marker keyboard-operable (Enter / Space).
      const el = marker.getElement();
      const inner = el ? (el.querySelector('.marker-icon') as HTMLElement | null) : null;
      if (inner) {
        inner.addEventListener('keydown', (ev: KeyboardEvent) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            onSelectRef.current(event);
          }
        });
      }

      markers.push(marker);
    });

    return () => {
      if (oms) oms.clearMarkers();
      markers.forEach((m) => m.remove());
    };
  }, [events, selectedId, map, t]);

  return null;
}

// Clan power-centers layer: the seats of the great chieftain families.
// These are informational markers (hover tooltip + click popup), kept separate
// from the event-selection flow so they don't hijack the EventPanel.
function ClanMarkers() {
  const map = useMap();
  const { t, lang } = useI18n();

  useEffect(() => {
    const markers: L.Marker[] = [];

    powerCenters.forEach((pc: PowerCenter) => {
      const cfg = CLAN_CONFIG[pc.clan];
      // role/description come from the Icelandic overlay when active.
      const l10n = lang === 'is' ? powerCenterTranslations[pc.id] : undefined;
      const role = l10n?.role ?? pc.role;
      const description = l10n?.description ?? pc.description;

      const icon = L.divIcon({
        html: `<div class="clan-marker" style="background:${cfg.color}" aria-label="${pc.name}, ${cfg.label}"><span class="clan-marker-crest">${cfg.crest}</span></div>`,
        className: '',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -16],
      });

      const sourcesHtml = (pc.sources ?? [])
        .filter((s) => s.url)
        .map(
          (s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a>`,
        )
        .join('');

      const popupHtml = `
        <div class="clan-popup">
          <div class="clan-popup-head">
            <span class="clan-popup-crest" style="background:${cfg.color}">${cfg.crest}</span>
            <div>
              <strong>${pc.name}</strong>
              <div class="clan-popup-clan" style="color:${cfg.color}">${cfg.label} · ${role}</div>
            </div>
          </div>
          <p class="clan-popup-desc">${description}</p>
          ${pc.approximate ? `<p class="clan-popup-approx">${t.map.approx}</p>` : ''}
          ${sourcesHtml ? `<div class="clan-popup-sources">${sourcesHtml}</div>` : ''}
        </div>`;

      const marker = L.marker(pc.coordinates as L.LatLngExpression, {
        icon,
        zIndexOffset: -200, // sit behind event markers when they overlap
      });

      marker.bindTooltip(`${pc.name} · ${cfg.label}`, {
        direction: 'top',
        offset: [0, -14],
        opacity: 0.95,
      });
      marker.bindPopup(popupHtml, { className: 'clan-popup-wrap', maxWidth: 260 });
      marker.addTo(map);
      markers.push(marker);
    });

    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [map, t, lang]);

  return null;
}

// Connection lines from a clan's seats to the battles it fought. Each battle is
// linked to that clan's *nearest* seat, so the lines stay readable and trace a
// sensible geography (e.g. the northern wars hang off the Eyjafjörður seat).
function ConnectionLines({ clan }: { clan: ClanId }) {
  const map = useMap();
  // Localized lookup of every event by id (the lines must reach events
  // regardless of the current year/type filters, hence not the events prop).
  const { events: allEvents } = useI18n();
  const eventsById = useMemo(() => new Map(allEvents.map((e) => [e.id, e])), [allEvents]);

  useEffect(() => {
    const seats = powerCenters.filter((pc) => pc.clan === clan);
    if (seats.length === 0) return;

    const cfg = CLAN_CONFIG[clan];
    const lines: L.Polyline[] = [];

    (CLAN_BATTLES[clan] ?? []).forEach((eventId) => {
      const ev = eventsById.get(eventId);
      if (!ev) return; // skip unknown ids defensively

      // pick this clan's seat nearest to the battle
      let nearest = seats[0];
      let best = dist2(nearest.coordinates, ev.coordinates);
      for (const s of seats) {
        const d = dist2(s.coordinates, ev.coordinates);
        if (d < best) {
          best = d;
          nearest = s;
        }
      }

      const line = L.polyline([nearest.coordinates, ev.coordinates], {
        color: cfg.color,
        weight: 2,
        opacity: 0.75,
        dashArray: '5,6',
      });
      line.bindTooltip(`${cfg.label} → ${ev.name}`, { sticky: true, opacity: 0.95 });
      line.addTo(map);
      lines.push(line);
    });

    return () => {
      lines.forEach((l) => l.remove());
    };
  }, [map, clan, eventsById]);

  return null;
}

interface BattleMapProps {
  events: ConflictEvent[];
  selectedEvent: ConflictEvent | null;
  onSelectEvent: (e: ConflictEvent) => void;
  onResetFilters: () => void;
  // Clan-seats layer is controlled by App so era presets can reveal it too.
  showClans: boolean;
  onShowClansChange: (show: boolean) => void;
}

export function BattleMap({
  events,
  selectedEvent,
  onSelectEvent,
  onResetFilters,
  showClans,
  onShowClansChange,
}: BattleMapProps) {
  const { t } = useI18n();
  const [highlightClan, setHighlightClan] = useState<ClanId | null>(null);
  const [mapStyle, setMapStyle] = useState<MapStyle>(loadMapStyle);

  const pickStyle = (s: MapStyle) => {
    setMapStyle(s);
    localStorage.setItem(MAP_STYLE_KEY, s);
  };

  // Whenever the layer goes away (manual toggle or leaving the Sturlung era),
  // drop any clan highlight so we don't draw lines for a hidden layer.
  useEffect(() => {
    if (!showClans) setHighlightClan(null);
  }, [showClans]);

  const toggleClanLayer = () => onShowClansChange(!showClans);

  return (
    <div className={`map-wrap map-style-${mapStyle}`}>
      <MapContainer
        center={[64.96, -18.9]}
        zoom={6}
        minZoom={6}
        maxZoom={14}
        // Hard-lock the view to Iceland: you can't pan or zoom out to the
        // rest of the world. Box has a little padding around the coastline.
        maxBounds={ICELAND_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        {mapStyle === 'parchment' && (
          <TileLayer
            key="parchment"
            attribution='Tiles &copy; <a href="https://www.esri.com">Esri</a> — Source: Esri, USGS, NOAA'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}"
            maxNativeZoom={13}
            maxZoom={14}
          />
        )}
        {mapStyle === 'summer' && (
          <>
            {/* Hypsometric color base: green lowlands, brown highlands. Low
                native zoom — past z8 it becomes a soft color wash while the
                relief overlay below keeps the terrain detail crisp. */}
            <TileLayer
              key="summer-color"
              attribution='Tiles &copy; <a href="https://www.esri.com">Esri</a> — Source: Esri, USGS, NOAA'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
              maxNativeZoom={8}
              maxZoom={14}
            />
            <TileLayer
              key="summer-relief"
              className="relief-multiply"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}"
              maxNativeZoom={13}
              maxZoom={14}
            />
          </>
        )}
        {mapStyle === 'satellite' && (
          <TileLayer
            key="satellite"
            attribution='Imagery &copy; <a href="https://www.esri.com">Esri</a> — Source: Esri, Maxar, Earthstar Geographics'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxNativeZoom={14}
            maxZoom={14}
          />
        )}
        {mapStyle === 'ortelius' && (
          <ImageOverlay
            key="ortelius"
            url={`${import.meta.env.BASE_URL}ortelius-islandia.jpg`}
            bounds={ORTELIUS_BOUNDS}
            attribution='&ldquo;Islandia&rdquo;, Abraham Ortelius (c. 1590) — public domain, via Wikimedia Commons'
          />
        )}
        <MapController event={selectedEvent} mapStyle={mapStyle} />
        <GlacierLayer />
        <EventMarkers
          events={events}
          selectedId={selectedEvent?.id ?? null}
          onSelect={onSelectEvent}
        />
        {showClans && <ClanMarkers />}
        {showClans && highlightClan && <ConnectionLines clan={highlightClan} />}
      </MapContainer>

      {/* Ornate map frame — fantasy-chart border flourish */}
      <div className="map-frame" aria-hidden="true" />

      {/* Clan power-centers layer: toggle + interactive colour legend */}
      <div className="clan-control">
        <button
          className={`clan-toggle${showClans ? ' active' : ''}`}
          onClick={toggleClanLayer}
          aria-pressed={showClans}
          title={t.map.clanToggleTitle}
        >
          {t.map.clanToggle}
        </button>
        {showClans && (
          <div className="clan-legend">
            <div className="clan-legend-hint">{t.map.legendHint}</div>
            {CLAN_ORDER.map((id) => {
              const c = CLAN_CONFIG[id];
              const count = (CLAN_BATTLES[id] ?? []).length;
              const active = highlightClan === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`clan-legend-row${active ? ' active' : ''}`}
                  disabled={count === 0}
                  aria-pressed={active}
                  title={count === 0 ? t.map.noBattles(c.label) : t.map.trace(c.label)}
                  onClick={() => setHighlightClan((cur) => (cur === id ? null : id))}
                >
                  <span className="clan-legend-swatch" style={{ background: c.color }}>
                    {c.crest}
                  </span>
                  <span className="clan-legend-label">{c.label}</span>
                  <span className="clan-legend-count">{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Decorative compass rose — pure flourish, hidden from a11y tree */}
      <div className="map-compass" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <circle className="compass-ring" cx="50" cy="50" r="47" />
          <circle className="compass-ring" cx="50" cy="50" r="39" />
          <line className="compass-tick" x1="50" y1="50" x2="73" y2="27" />
          <line className="compass-tick" x1="50" y1="50" x2="27" y2="27" />
          <line className="compass-tick" x1="50" y1="50" x2="27" y2="73" />
          <line className="compass-tick" x1="50" y1="50" x2="73" y2="73" />
          <polygon className="compass-rose compass-ew" points="9,50 50,56 91,50 50,44" />
          <polygon className="compass-rose compass-ns" points="50,9 56,50 50,91 44,50" />
          <circle className="compass-hub" cx="50" cy="50" r="3.4" />
          <text className="compass-n" x="50" y="22" textAnchor="middle">N</text>
        </svg>
      </div>

      {events.length === 0 && (
        <div className="map-empty-state">
          <div className="map-empty-icon">🔍</div>
          <h3>{t.map.emptyTitle}</h3>
          <p>{t.map.emptyBody}</p>
          <button className="btn btn-primary" onClick={onResetFilters}>
            {t.map.resetBtn}
          </button>
        </div>
      )}

      <div className="map-disclaimer">{t.map.disclaimer}</div>

      {/* Map style switcher */}
      <div className="style-switch" role="group" aria-label={t.map.styleAria}>
        {(Object.keys(MAP_STYLE_META) as MapStyle[]).map((s) => {
          const meta = t.map.styles[s] ?? MAP_STYLE_META[s];
          return (
            <button
              key={s}
              className={`style-switch-btn${mapStyle === s ? ' active' : ''}`}
              onClick={() => pickStyle(s)}
              aria-pressed={mapStyle === s}
              title={meta.hint}
            >
              {meta.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
