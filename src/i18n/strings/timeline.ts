// The time dock: play, eras, the chronology rail and the year range.
// Owned by the timeline area.

export interface TimelineStrings {
  /** Region label (the dock is a landmark: "Skip to the timeline"). */
  aria: string;
  /** The play button's stable accessible name; aria-pressed says whether it runs. */
  play: string;
  /** Tooltip while playing. */
  pause: string;
  playTitle: string;
  /** "Playing 3 of 15" — also announced by the store on every autoplay step. */
  playing: (pos: number, total: number) => string;
  allEras: string;
  /** Tooltip on "All eras". */
  allErasTitle: (from: number, to: number) => string;
  erasAria: string;
  /** The tick strip (a listbox of every event on the axis). */
  eventsAria: string;
  startYear: string;
  endYear: string;
  /** aria-valuetext of a range handle / the scrubber: "1238, Battle of Örlygsstaðir". */
  valueText: (year: number, name: string) => string;
  yearsShown: string;
  range: (from: number, to: number) => string;
  /** An era's open-ended span: "from 1919". */
  rangeFrom: (from: number) => string;
  resetYears: string;
  /** The compact scrubber (a slider over the events in range). */
  scrubber: string;
  noSelection: string;
  expand: string;
  collapse: string;
  listTitle: string;
  outOfRange: string;
  empty: string;
}

const en: TimelineStrings = {
  aria: 'Timeline',
  play: 'Play',
  pause: 'Pause',
  playTitle: 'Fly through the events shown, oldest first',
  playing: (pos, total) => `Playing ${pos} of ${total}`,
  allEras: 'All eras',
  allErasTitle: (from, to) => `Every year on the map, ${from}–${to}`,
  erasAria: 'Historical eras',
  eventsAria: 'Events in time order',
  startYear: 'First year shown',
  endYear: 'Last year shown',
  valueText: (year, name) => `${year}, ${name}`,
  yearsShown: 'Years shown',
  range: (from, to) => `${from}–${to}`,
  rangeFrom: (from) => `from ${from}`,
  resetYears: 'All years',
  scrubber: 'Step through events',
  noSelection: 'No event selected',
  expand: 'Show the full timeline',
  collapse: 'Hide the full timeline',
  listTitle: 'Every event, in order',
  outOfRange: 'Outside the selected years',
  empty: 'No events match your filters',
};

const is: TimelineStrings = {
  aria: 'Tímalína',
  play: 'Spila',
  pause: 'Gera hlé',
  playTitle: 'Ferðast um atburðina sem eru sýndir, í tímaröð',
  playing: (pos, total) => `Í spilun: ${pos} af ${total}`,
  allEras: 'Öll tímabil',
  allErasTitle: (from, to) => `Öll árin á kortinu, ${from}–${to}`,
  erasAria: 'Söguleg tímabil',
  eventsAria: 'Atburðir í tímaröð',
  startYear: 'Fyrsta ár sem er sýnt',
  endYear: 'Síðasta ár sem er sýnt',
  valueText: (year, name) => `${year}, ${name}`,
  yearsShown: 'Árabil',
  range: (from, to) => `${from}–${to}`,
  rangeFrom: (from) => `frá ${from}`,
  resetYears: 'Öll ár',
  scrubber: 'Fletta milli atburða',
  noSelection: 'Enginn atburður valinn',
  expand: 'Sýna alla tímalínuna',
  collapse: 'Fela tímalínuna',
  listTitle: 'Allir atburðir í tímaröð',
  outOfRange: 'Utan valinna ára',
  empty: 'Enginn atburður passar við síurnar',
};

export const timeline = { en, is };
