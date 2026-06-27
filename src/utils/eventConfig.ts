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
