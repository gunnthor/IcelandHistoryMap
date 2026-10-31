// Place names for the map: a light layer of regions and towns so a newcomer
// can tell the Westfjords from the East, on basemaps that carry no labels.
// Every anchor is from OpenStreetMap (October 2026): towns are their
// place=city|town nodes; regions are the centre of the peninsula / bay /
// island relation, or the named place node. Areas without a clean OSM anchor
// (the East Fjords, the South) are deliberately left out rather than guessed.

export interface Place {
  id: string;
  kind: 'region' | 'town';
  /** [lat, lng] */
  coordinates: [number, number];
  name: { en: string; is: string };
  /** Shown from this zoom up. */
  minZoom: number;
}

export const places: Place[] = [
  // Regions: peninsulas, bays, islands
  { id: 'vestfirdir', kind: 'region', coordinates: [65.908, -22.904], name: { en: 'Westfjords', is: 'Vestfirðir' }, minZoom: 6 },
  { id: 'snaefellsnes', kind: 'region', coordinates: [64.903, -22.926], name: { en: 'Snæfellsnes', is: 'Snæfellsnes' }, minZoom: 6.5 },
  { id: 'reykjanes', kind: 'region', coordinates: [63.941, -22.254], name: { en: 'Reykjanes', is: 'Reykjanesskagi' }, minZoom: 6.5 },
  { id: 'hunafloi', kind: 'region', coordinates: [65.757, -20.852], name: { en: 'Húnaflói', is: 'Húnaflói' }, minZoom: 6.5 },
  { id: 'skagafjordur', kind: 'region', coordinates: [65.909, -19.702], name: { en: 'Skagafjörður', is: 'Skagafjörður' }, minZoom: 6.5 },
  { id: 'eyjafjordur', kind: 'region', coordinates: [65.922, -18.367], name: { en: 'Eyjafjörður', is: 'Eyjafjörður' }, minZoom: 6.5 },
  { id: 'borgarfjordur', kind: 'region', coordinates: [64.58, -21.602], name: { en: 'Borgarfjörður', is: 'Borgarfjörður' }, minZoom: 7 },
  { id: 'vestmannaeyjar', kind: 'region', coordinates: [63.427, -20.271], name: { en: 'Westman Islands', is: 'Vestmannaeyjar' }, minZoom: 7 },
  // Towns
  { id: 'reykjavik', kind: 'town', coordinates: [64.146, -21.9422], name: { en: 'Reykjavík', is: 'Reykjavík' }, minZoom: 6 },
  { id: 'akureyri', kind: 'town', coordinates: [65.6826, -18.0913], name: { en: 'Akureyri', is: 'Akureyri' }, minZoom: 6.5 },
  { id: 'isafjordur', kind: 'town', coordinates: [66.0727, -23.1194], name: { en: 'Ísafjörður', is: 'Ísafjörður' }, minZoom: 7 },
  { id: 'egilsstadir', kind: 'town', coordinates: [65.262, -14.4035], name: { en: 'Egilsstaðir', is: 'Egilsstaðir' }, minZoom: 6.5 },
  { id: 'hofn', kind: 'town', coordinates: [64.2533, -15.208], name: { en: 'Höfn', is: 'Höfn' }, minZoom: 6.5 },
  { id: 'husavik', kind: 'town', coordinates: [66.0433, -17.341], name: { en: 'Húsavík', is: 'Húsavík' }, minZoom: 6.5 },
];
