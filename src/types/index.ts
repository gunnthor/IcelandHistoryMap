export type EventType =
  | 'battle'
  | 'sea_battle'
  | 'raid'
  | 'burning'
  | 'massacre'
  | 'killing' // a targeted slaying or assassination (víg), as opposed to a judicial execution
  | 'feud' // a long-running kin/clan conflict rather than one dated clash
  | 'occupation'
  | 'execution' // state or church putting someone to death with legal cover
  | 'political' // conversions, oaths, riots, trade wars — conflict without (much) blood
  | 'eruption'
  | 'plague';

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
  /** The betrayal / greed / stupidity / revenge angle — the human hook. */
  humanDrama?: string;
  /** "What this would be like today" — a modern-day analogy. */
  modernTranslation?: string;
  /** Why historians are sure or unsure it happened this way. */
  confidenceNote?: string;
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
