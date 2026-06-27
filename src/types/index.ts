export type EventType =
  | 'battle'
  | 'sea_battle'
  | 'raid'
  | 'burning'
  | 'occupation'
  | 'execution'
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
