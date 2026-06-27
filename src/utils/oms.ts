import './leafletGlobal'; // side-effect: window.L = L — MUST evaluate before the plugin
import 'overlapping-marker-spiderfier-leaflet'; // side-effect: sets window.OverlappingMarkerSpiderfier
import type { Map as LeafletMap, Marker } from 'leaflet';

// Minimal typing for the bits of the OMS API we use.
export interface OMSInstance {
  addMarker(marker: Marker): void;
  removeMarker(marker: Marker): void;
  clearMarkers(): void;
  addListener(
    event: 'click' | 'spiderfy' | 'unspiderfy',
    handler: (marker: Marker, ...rest: unknown[]) => void,
  ): void;
}

export type OMSConstructor = new (
  map: LeafletMap,
  options?: Record<string, unknown>,
) => OMSInstance;

const Ctor = window.OverlappingMarkerSpiderfier as OMSConstructor | undefined;

/**
 * Create an OverlappingMarkerSpiderfier for the map, or `null` if the (old,
 * global-style) plugin failed to attach to `window`. Callers degrade to plain
 * markers so a shim failure never takes down the whole map.
 */
export function createSpiderfier(
  map: LeafletMap,
  options?: Record<string, unknown>,
): OMSInstance | null {
  if (!Ctor) {
    console.warn('OverlappingMarkerSpiderfier did not load; overlap fan-out is disabled.');
    return null;
  }
  return new Ctor(map, options);
}
