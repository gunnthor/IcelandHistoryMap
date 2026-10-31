// The time dock: play, eras, the chronology rail and the year range.
// Owned by the timeline area.

export interface TimelineStrings {
  aria: string;
  play: string;
  pause: string;
  playTitle: string;
  playing: (pos: number, total: number) => string;
  allEras: string;
  erasAria: string;
  startYear: string;
  endYear: string;
  range: (from: number, to: number) => string;
  expand: string;
  collapse: string;
  listTitle: string;
  outOfRange: string;
}

const en: TimelineStrings = {
  aria: 'Timeline',
  play: 'Play',
  pause: 'Pause',
  playTitle: 'Fly through the events shown, oldest first',
  playing: (pos, total) => `Playing ${pos} of ${total}`,
  allEras: 'All eras',
  erasAria: 'Historical eras',
  startYear: 'Start year',
  endYear: 'End year',
  range: (from, to) => `${from}–${to}`,
  expand: 'Show the full timeline',
  collapse: 'Hide the full timeline',
  listTitle: 'Every event, in order',
  outOfRange: 'Outside the selected years',
};

const is: TimelineStrings = {
  aria: 'Tímalína',
  play: 'Spila',
  pause: 'Gera hlé',
  playTitle: 'Fljúga í gegnum atburðina sem eru sýndir, elsta fyrst',
  playing: (pos, total) => `Í spilun: ${pos} af ${total}`,
  allEras: 'Öll tímabil',
  erasAria: 'Söguleg tímabil',
  startYear: 'Upphafsár',
  endYear: 'Lokaár',
  range: (from, to) => `${from}–${to}`,
  expand: 'Sýna alla tímalínuna',
  collapse: 'Fela tímalínuna',
  listTitle: 'Allir atburðir í tímaröð',
  outOfRange: 'Utan valinna ára',
};

export const timeline = { en, is };
