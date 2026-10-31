import { enPick, isPick } from './plural';

// The map stage: styles, layers, clan strongholds, clusters, controls.
// Owned by the map area.

export interface MapStrings {
  aria: string;
  /** The focusable Leaflet canvas itself. */
  canvasAria: string;
  /** The markers' group: one tab stop, arrows walk through time. */
  markersAria: (n: number) => string;
  styles: Record<'satellite' | 'summer' | 'parchment' | 'ortelius', { label: string; hint: string }>;
  layers: string;
  mapStyle: string;
  clans: string;
  clansHint: string;
  legendHint: string;
  noBattles: (clan: string) => string;
  trace: (clan: string) => string;
  tracing: (clan: string) => string;
  stopTracing: string;
  /** Count on a clan legend row. */
  conflicts: (n: number) => string;
  zoomIn: string;
  zoomOut: string;
  fit: string;
  cluster: (n: number) => string;
  /** Accessible name of a count badge: "4 events here, 1000–1749". */
  clusterSpan: (n: number, from: number, to: number) => string;
  /** "+3 more" — the pill on a selected seal with others beneath it. */
  more: (n: number) => string;
  placeCard: string;
  approx: string;
  sources: string;
  credits: string;
  creditImagery: string;
  creditRelief: string;
  creditOrtelius: string;
  creditGlaciers: string;
  emptyTitle: string;
  emptyBody: string;
  resetBtn: string;
}

const en: MapStrings = {
  aria: 'Map of Iceland with historical events',
  canvasAria: 'Map of Iceland. Arrow keys pan, plus and minus zoom.',
  markersAria: (n) => `${n} ${enPick(n, 'event', 'events')} on the map. Arrow keys move between them in time order.`,
  styles: {
    satellite: { label: 'Satellite', hint: 'The real thing, from orbit' },
    summer: { label: 'Summer', hint: 'Late-July Iceland: green lowlands, brown highlands' },
    parchment: { label: 'Parchment', hint: 'An aged relief chart' },
    ortelius: { label: '1590 map', hint: 'Ortelius’ Islandia engraving — sea monsters included' },
  },
  layers: 'Layers',
  mapStyle: 'Map style',
  clans: 'Clan strongholds (1200s)',
  clansHint: 'Seats of the great chieftain families in the Sturlung Age',
  legendHint: 'Pick a family to trace its fights',
  noBattles: (clan) => `${clan}: no battles in this dataset`,
  trace: (clan) => `Trace ${clan} conflicts`,
  tracing: (clan) => `Tracing ${clan}`,
  stopTracing: 'Stop tracing',
  conflicts: (n) => `${n} ${enPick(n, 'conflict', 'conflicts')}`,
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  fit: 'Show all of Iceland',
  cluster: (n) => `${n} ${enPick(n, 'event', 'events')} here`,
  clusterSpan: (n, from, to) =>
    `${n} ${enPick(n, 'event', 'events')} here, ${from === to ? from : `${from}–${to}`}`,
  more: (n) => `+${n} more`,
  placeCard: 'Events at this place',
  approx: 'Location approximate',
  sources: 'Sources',
  credits: 'Map credits',
  creditImagery: 'Imagery © Esri — Esri, Maxar, Earthstar Geographics',
  creditRelief: 'Tiles © Esri — Esri, USGS, NOAA, NASA, CGIAR and the GIS user community',
  creditOrtelius: '“Islandia”, Abraham Ortelius (c. 1590) — public domain, via Wikimedia Commons',
  creditGlaciers: 'Glaciers © OpenStreetMap contributors',
  emptyTitle: 'Nothing matches',
  emptyBody: 'Widen the years or clear the filters.',
  resetBtn: 'Clear filters',
};

const is: MapStrings = {
  aria: 'Kort af Íslandi með sögulegum atburðum',
  canvasAria: 'Íslandskort. Örvalyklar færa kortið, plús og mínus þysja.',
  markersAria: (n) =>
    `${n} ${isPick(n, 'atburður', 'atburðir')} á kortinu. Örvalyklar fara á milli þeirra í tímaröð.`,
  styles: {
    satellite: { label: 'Gervitungl', hint: 'Ísland eins og það er, séð úr geimnum' },
    summer: { label: 'Sumar', hint: 'Ísland í hásumri: grænt láglendi, brún öræfi' },
    parchment: { label: 'Bókfell', hint: 'Gamalt hæðakort' },
    ortelius: { label: 'Kort frá 1590', hint: 'Íslandskort Orteliusar — með sjóskrímslum og öllu' },
  },
  layers: 'Kortalög',
  mapStyle: 'Kortastíll',
  clans: 'Höfuðból ætta (13. öld)',
  clansHint: 'Setur höfðingjaætta á Sturlungaöld',
  legendHint: 'Veldu ætt til að rekja átök hennar',
  noBattles: (clan) => `${clan}: engir bardagar í gagnasafninu`,
  trace: (clan) => `Rekja átök: ${clan}`,
  tracing: (clan) => `Rakin átök: ${clan}`,
  stopTracing: 'Hætta að rekja',
  conflicts: (n) => `${n} átök`,
  zoomIn: 'Þysja inn',
  zoomOut: 'Þysja út',
  fit: 'Sýna allt Ísland',
  cluster: (n) => `${n} ${isPick(n, 'atburður', 'atburðir')} hér`,
  clusterSpan: (n, from, to) =>
    `${n} ${isPick(n, 'atburður', 'atburðir')} hér, ${from === to ? from : `${from}–${to}`}`,
  more: (n) => `+${n} til viðbótar`,
  placeCard: 'Atburðir á þessum stað',
  approx: 'Staðsetning áætluð',
  sources: 'Heimildir',
  credits: 'Kortaheimildir',
  creditImagery: 'Myndefni © Esri — Esri, Maxar, Earthstar Geographics',
  creditRelief: 'Kortagrunnur © Esri — Esri, USGS, NOAA, NASA, CGIAR og GIS-samfélagið',
  creditOrtelius: '„Islandia“, Abraham Ortelius (um 1590) — almenningseign, af Wikimedia Commons',
  creditGlaciers: 'Jöklar © OpenStreetMap-framlagsaðilar',
  emptyTitle: 'Ekkert passar',
  emptyBody: 'Víkkaðu ártalsbilið eða hreinsaðu síurnar.',
  resetBtn: 'Hreinsa síur',
};

export const map = { en, is };
