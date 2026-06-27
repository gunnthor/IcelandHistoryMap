import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ConflictEvent } from '../types';
import { EVENT_CONFIG } from '../utils/eventConfig';

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
      </MapContainer>

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
