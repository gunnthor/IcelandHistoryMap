import { EventType, Confidence, UncertaintyFlag } from '../types';

// Imported under Node by the validator and the vite config — keep this file
// free of JSX, DOM and import.meta. Display names live in src/i18n (both
// languages); glyphs live in src/components/icons.

export interface TypeConfig {
  /** English name — the build-time fallback; the UI reads t.types. */
  label: string;
  /** Mineral pigment, mirrored as --type-<id> in styles/tokens.css. Every one
   *  carries a bone (#f6f1e7) glyph at ≥ 4.5:1. */
  color: string;
}

export const EVENT_CONFIG: Record<EventType, TypeConfig> = {
  battle: { label: 'Battle', color: '#9a2b30' },
  sea_battle: { label: 'Sea battle', color: '#2a5c92' },
  raid: { label: 'Raid', color: '#8f6418' },
  burning: { label: 'Burning', color: '#b84e1c' },
  massacre: { label: 'Massacre', color: '#4e1a1e' },
  killing: { label: 'Killing', color: '#842a57' },
  feud: { label: 'Feud', color: '#6b5a43' },
  execution: { label: 'Execution', color: '#5b3a78' },
  political: { label: 'Political', color: '#6a6670' },
  occupation: { label: 'Occupation', color: '#2f6247' },
  eruption: { label: 'Eruption', color: '#332f2e' },
  plague: { label: 'Plague', color: '#5e6a28' },
  disaster: { label: 'Disaster', color: '#17666e' },
};

/** Display order for filters and legends: violence first, then the state,
 *  then man-made catastrophe, then nature. */
export const EVENT_TYPES: EventType[] = [
  'battle',
  'sea_battle',
  'raid',
  'burning',
  'massacre',
  'killing',
  'feud',
  'execution',
  'political',
  'occupation',
  'disaster',
  'eruption',
  'plague',
];

export const CONFIDENCE_LEVELS: Confidence[] = ['high', 'medium', 'low'];

// "Solidity = certainty": the same three steps everywhere — a solid,
// segmented or dotted marker rim; a solid, half or hollow timeline tick;
// three, two or one filled pip. Never opacity, which washes out on imagery.
export const CONFIDENCE_CONFIG: Record<Confidence, { pips: 1 | 2 | 3 }> = {
  high: { pips: 3 },
  medium: { pips: 2 },
  low: { pips: 1 },
};

// Source-quality flags. `positive` flags are reassurance ("well
// established"); the rest are open questions. Uncertainty is part of the
// fun — say exactly what is and isn't known.
export const FLAG_CONFIG: Record<UncertaintyFlag, { positive: boolean }> = {
  event_likely: { positive: true },
  saga_dramatized: { positive: false },
  location_uncertain: { positive: false },
  date_uncertain: { positive: false },
  legendary: { positive: false },
};

/** The one caveat worth surfacing next to the title, most serious first. */
export const FLAG_PRIORITY: UncertaintyFlag[] = [
  'legendary',
  'saga_dramatized',
  'date_uncertain',
  'location_uncertain',
];

/**
 * Compute the [min, max] year across a set of events.
 * Derived from the data so the timeline + slider auto-extend when you add
 * events outside the current range. Falls back to a sane default if empty.
 */
export function getYearBounds(events: { year: number }[]): [number, number] {
  if (events.length === 0) return [1000, 2000];
  const years = events.map((e) => e.year);
  return [Math.min(...years), Math.max(...years)];
}

// ── Historical eras ──
// One-click presets that snap the timeline to a period. The Sturlung Age is the
// only era for which the clan power-centres existed, so picking it auto-shows
// the clan-seats layer (and leaving it hides them again). Labels and hints
// live in src/i18n/strings/common.ts. Ranges are contiguous where events
// exist, so every event belongs to exactly one era.
export interface Era {
  id: string;
  range: [number, number]; // inclusive [from, to]; clamped to data bounds
  showClans?: boolean; // reveal the clan-seats layer while this era is active
}

export const ERAS: Era[] = [
  { id: 'saga', range: [870, 1130] },
  // Starts before the conventional 1220 so the run-up feuds of the 1190s–1200s
  // (Önundarbrenna, Víðines) belong to an era instead of falling in a gap.
  { id: 'sturlung', range: [1180, 1264], showClans: true },
  { id: 'late-medieval', range: [1265, 1540] },
  { id: 'danish', range: [1541, 1918] },
  { id: 'modern', range: [1919, 2100] },
];

/** Clamp an era's range to the available data bounds. */
export function clampRange(
  range: [number, number],
  min: number,
  max: number,
): [number, number] {
  return [Math.max(range[0], min), Math.min(range[1], max)];
}

/** The era an event year belongs to. */
export function eraOf(year: number): Era | undefined {
  return ERAS.find((e) => year >= e.range[0] && year <= e.range[1]);
}
