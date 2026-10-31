import L from 'leaflet';
import { ImageOverlay, TileLayer } from 'react-leaflet';
import { MapStyle } from '../../state/explorer';
import { ORTELIUS_BOUNDS } from './geo';

// ── The four basemaps ──
// Satellite (default) is the literal July view and the best ground for the
// seals. Summer layers Esri's hypsometric physical map under multiplied
// shaded relief: green lowlands, brown highlands. Parchment is the same
// stack, sepia-toned into an old relief chart. 1590 swaps the world for
// Ortelius' hand-coloured Islandia engraving, shown as a plate on the
// basalt wall. Per-style colour treatments live in map.css.
//
// The relief is Esri's World Hillshade (elevation-derived, crisp to z13 over
// Iceland). The older World Shaded Relief it replaced is a blur of blocks
// past z7 here and has no tiles at all past ~z10.

const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services';
export const TILE_URL = {
  imagery: `${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`,
  physical: `${ESRI}/World_Physical_Map/MapServer/tile/{z}/{y}/{x}`,
  relief: `${ESRI}/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}`,
};
export const ORTELIUS_URL = `${import.meta.env.BASE_URL}ortelius-islandia.webp`;

export const STYLE_MAX_ZOOM: Record<MapStyle, number> = {
  satellite: 14,
  summer: 11,
  parchment: 11,
  ortelius: 9,
};

/** Map panes, bottom to top. Leaflet's own: tiles 200, overlays 400,
 *  markers 600, tooltips 650, popups 700. */
const PANES: [string, number][] = [
  ['glaciers', 380],
  ['glacierLabels', 390],
  ['route', 420],
  ['trace', 430],
  ['seats', 560],
  ['events', 610],
];

export function ensurePanes(map: L.Map): void {
  for (const [name, z] of PANES) {
    if (map.getPane(name)) continue;
    map.createPane(name).style.zIndex = String(z);
  }
  // Decorative layers never take the pointer.
  map.getPane('glaciers')!.style.pointerEvents = 'none';
  map.getPane('glacierLabels')!.style.pointerEvents = 'none';
  map.getPane('route')!.style.pointerEvents = 'none';
}

export function Basemap({ style }: { style: MapStyle }) {
  if (style === 'satellite')
    return <TileLayer key="satellite" url={TILE_URL.imagery} maxNativeZoom={17} maxZoom={STYLE_MAX_ZOOM.satellite} />;
  if (style === 'ortelius')
    return <ImageOverlay key="ortelius" url={ORTELIUS_URL} bounds={ORTELIUS_BOUNDS} className="map-plate" />;
  // Summer and Parchment: colour base + multiplied relief. The physical map
  // has no useful detail past z8, so it upsamples into a soft colour wash
  // while the relief keeps the terrain crisp.
  return (
    <>
      <TileLayer key={`${style}-colour`} url={TILE_URL.physical} maxNativeZoom={8} maxZoom={STYLE_MAX_ZOOM[style]} className="map-tiles-colour" />
      <TileLayer key={`${style}-relief`} url={TILE_URL.relief} maxNativeZoom={13} maxZoom={STYLE_MAX_ZOOM[style]} className="map-tiles-relief" />
    </>
  );
}
