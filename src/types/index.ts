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

// Structured source-quality flags: what exactly is (un)certain about an event.
// Orthogonal to the overall confidence rating — a medium-confidence saga event
// can be "event likely happened" AND "location uncertain" at the same time.
export type UncertaintyFlag =
  | 'event_likely' // the core event is accepted as historical, even if details wobble
  | 'saga_dramatized' // known through saga literature, which polishes and dramatizes
  | 'location_uncertain' // the marker is a best guess; exact site unverified
  | 'date_uncertain' // the year is traditional, approximate, or debated
  | 'legendary'; // may be legend or folklore more than history

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
  /** Structured source-quality chips shown in the card header. */
  uncertaintyFlags?: UncertaintyFlag[];
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
