import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ConflictEvent, PowerCenter, ClanId } from '../types';
import { EVENT_CONFIG } from '../utils/eventConfig';
import { CLAN_CONFIG, CLAN_ORDER } from '../utils/clanConfig';
import { powerCenters } from '../data/powerCenters';
import { events as allEvents } from '../data/events';
import { CLAN_BATTLES } from '../data/clanBattles';

// Lookup of every event by id (for the clan→battle connection lines, which
// must reach events regardless of the current year/type filters).
const EVENTS_BY_ID = new Map(allEvents.map((e) => [e.id, e]));

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

// Fly to the selected event whenever it changes.
function MapController({ event }: { event: ConflictEvent | null }) {
  const map = useMap();
  useEffect(() => {
    if (event) {
      map.flyTo(event.coordinates, 10, { duration: 1.2 });
    }
  }, [event, map]);
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

  useEffect(() => {
    const markers: L.Marker[] = [];

    events.forEach((event) => {
      const cfg = EVENT_CONFIG[event.type];
      const isSelected = event.id === selectedId;
      const ariaLabel = `${event.name}, ${cfg.label}, ${event.year}`;

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
      });

      marker.on('click', () => onSelect(event));
      marker.bindTooltip(`${event.name} · ${event.year}`, {
        direction: 'top',
        offset: [0, -18],
        opacity: 0.95,
      });
      marker.addTo(map);

      // Make the marker keyboard-operable (Enter / Space).
      const el = marker.getElement();
      const inner = el ? (el.querySelector('.marker-icon') as HTMLElement | null) : null;
      if (inner) {
        inner.addEventListener('keydown', (ev: KeyboardEvent) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            onSelect(event);
          }
        });
      }

      markers.push(marker);
    });

    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [events, selectedId, onSelect, map]);

  return null;
}

// Clan power-centers layer: the seats of the great chieftain families.
// These are informational markers (hover tooltip + click popup), kept separate
// from the event-selection flow so they don't hijack the EventPanel.
function ClanMarkers() {
  const map = useMap();

  useEffect(() => {
    const markers: L.Marker[] = [];

    powerCenters.forEach((pc: PowerCenter) => {
      const cfg = CLAN_CONFIG[pc.clan];

      const icon = L.divIcon({
        html: `<div class="clan-marker" style="background:${cfg.color}" aria-label="${pc.name}, ${cfg.label} seat"><span class="clan-marker-crest">${cfg.crest}</span></div>`,
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
              <div class="clan-popup-clan" style="color:${cfg.color}">${cfg.label} · ${pc.role}</div>
            </div>
          </div>
          <p class="clan-popup-desc">${pc.description}</p>
          ${pc.approximate ? '<p class="clan-popup-approx">⚠ Location approximate</p>' : ''}
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
  }, [map]);

  return null;
}

// Connection lines from a clan's seats to the battles it fought. Each battle is
// linked to that clan's *nearest* seat, so the lines stay readable and trace a
// sensible geography (e.g. the northern wars hang off the Eyjafjörður seat).
function ConnectionLines({ clan }: { clan: ClanId }) {
  const map = useMap();

  useEffect(() => {
    const seats = powerCenters.filter((pc) => pc.clan === clan);
    if (seats.length === 0) return;

    const cfg = CLAN_CONFIG[clan];
    const lines: L.Polyline[] = [];

    (CLAN_BATTLES[clan] ?? []).forEach((eventId) => {
      const ev = EVENTS_BY_ID.get(eventId);
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
  }, [map, clan]);

  return null;
}

interface BattleMapProps {
  events: ConflictEvent[];
  selectedEvent: ConflictEvent | null;
  onSelectEvent: (e: ConflictEvent) => void;
  onResetFilters: () => void;
}

export function BattleMap({
  events,
  selectedEvent,
  onSelectEvent,
  onResetFilters,
}: BattleMapProps) {
  const [showClans, setShowClans] = useState(false);
  const [highlightClan, setHighlightClan] = useState<ClanId | null>(null);

  const toggleClanLayer = () => {
    setShowClans((v) => {
      if (v) setHighlightClan(null); // turning the layer off clears any highlight
      return !v;
    });
  };

  return (
    <div className="map-wrap">
      <MapContainer
        center={[64.96, -18.9]}
        zoom={6}
        minZoom={6}
        maxZoom={12}
        // Hard-lock the view to Iceland: you can't pan or zoom out to the
        // rest of the world. Box has a little padding around the coastline.
        maxBounds={ICELAND_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='Tiles &copy; <a href="https://www.esri.com">Esri</a> — Source: Esri, USGS, NOAA'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}"
          maxNativeZoom={13}
          maxZoom={12}
        />
        <MapController event={selectedEvent} />
        <EventMarkers
          events={events}
          selectedId={selectedEvent?.id ?? null}
          onSelect={onSelectEvent}
        />
        {showClans && <ClanMarkers />}
        {showClans && highlightClan && <ConnectionLines clan={highlightClan} />}
      </MapContainer>

      {/* Clan power-centers layer: toggle + interactive colour legend */}
      <div className="clan-control">
        <button
          className={`clan-toggle${showClans ? ' active' : ''}`}
          onClick={toggleClanLayer}
          aria-pressed={showClans}
          title="Show the seats of the great chieftain families"
        >
          ⚑ Clan seats
        </button>
        {showClans && (
          <div className="clan-legend">
            <div className="clan-legend-hint">Click a family to trace its wars</div>
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
                  title={count === 0 ? `${c.label}: no battles in this dataset` : `Trace ${c.label} conflicts`}
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
          <h3>No events match your filters</h3>
          <p>Try widening the year range or clearing the filters.</p>
          <button className="btn btn-primary" onClick={onResetFilters}>
            Reset filters
          </button>
        </div>
      )}

      <div className="map-disclaimer">
        ⚠️ Some saga-era locations and casualty numbers are approximate.
        This app shows confidence levels and sources for each event.
      </div>
    </div>
  );
}
