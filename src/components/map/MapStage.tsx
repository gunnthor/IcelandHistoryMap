import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import { useExplorer } from '../../state/explorer';

// STUB — replaced by the map area (see docs/DESIGN.md §Map).
export function MapStage() {
  const x = useExplorer();
  return (
    <main id="map" className="map-stage" style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <MapContainer center={[64.96, -18.9]} zoom={6} style={{ width: '100%', height: '100%' }} zoomControl={false}>
        <TileLayer
          attribution="Imagery &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {x.mapEvents.map((e) => (
          <CircleMarker
            key={e.id}
            center={e.coordinates}
            radius={8}
            eventHandlers={{ click: () => x.select(e.id, 'map') }}
          />
        ))}
      </MapContainer>
    </main>
  );
}
