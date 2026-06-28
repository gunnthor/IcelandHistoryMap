export type EventType =
  | 'battle'
  | 'sea_battle'
  | 'raid'
  | 'burning'
  | 'massacre'
  | 'occupation'
  | 'execution'
  | 'eruption'
  | 'plague'
  | 'other';

export type Confidence = 'high' | 'medium' | 'low';

export interface Source {
  title: string;
  url: string;
}

export interface ConflictEvent {
  id: string;
  name: string;
  icelandicName?: string;
  year: number;
  dateText?: string;
  period: string;
  type: EventType;
  locationName: string;
  coordinates: [number, number]; // [lat, lng]
  factions: string[];
  keyPeople: string[];
  winner?: string;
  casualtyEstimate?: string;
  summary: string;
  eli12: string;
  whyItHappened: string;
  whyItMatters: string;
  confidence: Confidence;
  sources: Source[];
}

export interface FilterState {
  type: EventType | 'all';
  confidence: Confidence | 'all';
  yearRange: [number, number];
}

// ── Clan power-centers layer ──
// The seats/strongholds of the major chieftain families. These are *places*,
// not dated events, so they live in their own dataset + map layer rather than
// in events[] (which is year-stamped and drives the timeline/filters).
export type ClanId =
  | 'sturlungar'
  | 'asbirningar'
  | 'haukdaelir'
  | 'oddaverjar'
  | 'svinfellingar'
  | 'vatnsfirdingar';

export interface PowerCenter {
  id: string;
  name: string;
  clan: ClanId;
  coordinates: [number, number]; // [lat, lng]
  role: string; // short tag, e.g. "Ancestral seat"
  description: string;
  approximate?: boolean; // coordinates not precisely verified
  sources?: Source[];
}
