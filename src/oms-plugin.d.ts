// Ambient declarations for the old global-style OverlappingMarkerSpiderfier
// plugin, which ships no types and attaches itself to `window`.
declare module 'overlapping-marker-spiderfier-leaflet';

interface Window {
  L?: typeof import('leaflet');
  OverlappingMarkerSpiderfier?: unknown;
}
