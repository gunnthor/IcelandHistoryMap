import { ConflictEvent, Source } from '../types';
import { events as baseEvents } from '../data/events';
import { eventTranslations } from '../data/events.is';

export type Lang = 'en' | 'is';

// ── Per-event translation overlay ──
// Every field optional: anything missing falls back to the English base, so a
// half-translated event degrades to mixed language instead of breaking. Ids,
// years, coordinates, types, confidence and story-link targets are structural
// and never translated — only the words.
export interface EventTranslation {
  name?: string;
  dateText?: string;
  period?: string;
  locationName?: string;
  factions?: string[];
  keyPeople?: string[];
  winner?: string;
  casualtyEstimate?: string;
  summary?: string;
  eli12?: string;
  whyItHappened?: string;
  whyItMatters?: string;
  /** Text only — the eventId link is inherited from the English base. */
  before?: string;
  after?: string;
  humanDrama?: string;
  modernTranslation?: string;
  confidenceNote?: string;
  /** Full replacement: use Icelandic-language sources where they exist. */
  sources?: Source[];
}

export function localizeEvent(base: ConflictEvent, tr: EventTranslation | undefined): ConflictEvent {
  if (!tr) return base;
  const { before, after, name, ...rest } = tr;
  return {
    ...base,
    ...rest,
    name: name ?? base.name,
    // The panel's secondary name line: in Icelandic mode it shows the English
    // title (the pairing inverts), so the field means "the other language's name".
    icelandicName: name && name !== base.name ? base.name : base.icelandicName,
    before: base.before && before ? { ...base.before, text: before } : base.before,
    after: base.after && after ? { ...base.after, text: after } : base.after,
  };
}

// One localized array per language, built lazily and reused — components can
// call this from anywhere and object identity stays stable within a language.
const cache = new Map<Lang, ConflictEvent[]>();

export function localizeEvents(lang: Lang): ConflictEvent[] {
  if (lang === 'en') return baseEvents;
  let list = cache.get(lang);
  if (!list) {
    list = baseEvents.map((e) => localizeEvent(e, eventTranslations[e.id]));
    cache.set(lang, list);
  }
  return list;
}
