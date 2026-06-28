import { EventType, Confidence } from '../types';

export interface TypeConfig {
  label: string;
  symbol: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const EVENT_CONFIG: Record<EventType, TypeConfig> = {
  battle: {
    label: 'Battle',
    symbol: '⚔',
    color: '#8b1a1a',
    bgColor: '#f8d7da',
    borderColor: '#c0392b',
  },
  sea_battle: {
    label: 'Sea Battle',
    symbol: '⚓',
    color: '#1a4a7a',
    bgColor: '#d1ecf1',
    borderColor: '#2980b9',
  },
  raid: {
    label: 'Raid',
    symbol: '⚡',
    color: '#7a3a00',
    bgColor: '#fdebd0',
    borderColor: '#e67e22',
  },
  burning: {
    label: 'Burning',
    symbol: '🔥',
    color: '#7a1a00',
    bgColor: '#fce4e4',
    borderColor: '#c0392b',
  },
  massacre: {
    label: 'Massacre',
    symbol: '✕',
    color: '#5f1111',
    bgColor: '#f4cccc',
    borderColor: '#8a1f1f',
  },
  execution: {
    label: 'Execution',
    symbol: '☩',
    color: '#4a1a7a',
    bgColor: '#e8daef',
    borderColor: '#8e44ad',
  },
  occupation: {
    label: 'Occupation',
    symbol: '⚑',
    color: '#1a4a2a',
    bgColor: '#d5f5e3',
    borderColor: '#27ae60',
  },
  eruption: {
    label: 'Eruption',
    symbol: '🌋',
    color: '#a8341a',
    bgColor: '#fbe0d3',
    borderColor: '#c0560f',
  },
  plague: {
    label: 'Plague',
    symbol: '🦠',
    color: '#4a5d23',
    bgColor: '#e7edd6',
    borderColor: '#6b8e23',
  },
  other: {
    label: 'Other',
    symbol: '?',
    color: '#4a4a4a',
    bgColor: '#eeeeee',
    borderColor: '#7f8c8d',
  },
};

export const CONFIDENCE_CONFIG: Record<Confidence, {
  label: string;
  description: string;
  color: string;
  bgColor: string;
}> = {
  high: {
    label: 'High',
    description: 'Well-documented in primary sources',
    color: '#1e6b40',
    bgColor: '#d4edda',
  },
  medium: {
    label: 'Medium',
    description: 'Documented but some details uncertain',
    color: '#856404',
    bgColor: '#fff3cd',
  },
  low: {
    label: 'Low',
    description: 'Needs more source verification',
    color: '#721c24',
    bgColor: '#f8d7da',
  },
};

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
// the clan-seats layer (and leaving it hides them again).
export interface Era {
  id: string;
  label: string;
  range: [number, number]; // inclusive [from, to]; clamped to data bounds
  showClans?: boolean; // reveal the clan-seats layer while this era is active
  hint: string; // tooltip
}

export const ERAS: Era[] = [
  {
    id: 'saga',
    label: 'Saga Age',
    range: [870, 1130],
    hint: 'Settlement and the classic saga feuds (c. 870–1130)',
  },
  {
    id: 'sturlung',
    label: 'Sturlung Age',
    range: [1200, 1264],
    showClans: true,
    hint: 'Civil war of the great chieftain families (c. 1220–1264) — clan seats shown',
  },
  {
    id: 'late-medieval',
    label: 'Late Medieval',
    range: [1264, 1540],
    hint: 'Norwegian and early Danish rule (1264–1540)',
  },
  {
    id: 'danish',
    label: 'Danish Rule',
    range: [1540, 1918],
    hint: 'Reformation to sovereignty (1540–1918)',
  },
  {
    id: 'modern',
    label: 'Modern',
    range: [1918, 2100],
    hint: 'Republic and the World Wars (1918 onward)',
  },
];

/** Clamp an era's range to the available data bounds. */
export function clampRange(
  range: [number, number],
  min: number,
  max: number,
): [number, number] {
  return [Math.max(range[0], min), Math.min(range[1], max)];
}
