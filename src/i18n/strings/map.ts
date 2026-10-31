import { enPick, isPick } from './plural';

// The map stage: styles, layers, clan strongholds, clusters, controls.
// Owned by the map area.

export interface MapStrings {
  aria: string;
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
  zoomIn: string;
  zoomOut: string;
  fit: string;
  cluster: (n: number) => string;
  placeCard: string;
  approx: string;
  credits: string;
  emptyTitle: string;
  emptyBody: string;
  resetBtn: string;
}

const en: MapStrings = {
  aria: 'Map of Iceland with historical events',
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
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  fit: 'Show all of Iceland',
  cluster: (n) => `${n} ${enPick(n, 'event', 'events')} here`,
  placeCard: 'Events at this place',
  approx: 'Location approximate',
  credits: 'Map credits',
  emptyTitle: 'Nothing matches',
  emptyBody: 'Widen the years or clear the filters.',
  resetBtn: 'Clear filters',
};

const is: MapStrings = {
  aria: 'Kort af Íslandi með sögulegum atburðum',
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
  zoomIn: 'Þysja inn',
  zoomOut: 'Þysja út',
  fit: 'Sýna allt Ísland',
  cluster: (n) => `${n} ${isPick(n, 'atburður', 'atburðir')} hér`,
  placeCard: 'Atburðir á þessum stað',
  approx: 'Staðsetning áætluð',
  credits: 'Kortaheimildir',
  emptyTitle: 'Ekkert passar',
  emptyBody: 'Víkkaðu ártalsbilið eða hreinsaðu síurnar.',
  resetBtn: 'Hreinsa síur',
};

export const map = { en, is };
