import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ConflictEvent } from '../types';
import { EVENT_CONFIG } from '../utils/eventConfig';

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
        center={[65.0, -18.5]}
        zoom={6}
        minZoom={5}
        maxZoom={14}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        <MapController event={selectedEvent} />
        <EventMarkers
          events={events}
          selectedId={selectedEvent?.id ?? null}
          onSelect={onSelectEvent}
        />
      </MapContainer>

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
