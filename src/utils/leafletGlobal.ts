import L from 'leaflet';

// OverlappingMarkerSpiderfier (v0.2.x) is an old global-style plugin: its IIFE
// only installs `window.OverlappingMarkerSpiderfier` if `window.L` exists when
// it runs. Importing this module *before* the plugin makes Leaflet global so
// the plugin can attach. See utils/oms.ts for how the two are ordered.
window.L = L;

export {};
