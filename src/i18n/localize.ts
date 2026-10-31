import { ConflictEvent, Source } from '../types';
import { events as baseEvents } from '../data/events';

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

// ── Lazy Icelandic overlay ──
// The overlay is a quarter of the event data and most visitors never need it,
// so it ships as its own chunk. Callers must `await loadIcelandic()` before
// switching to 'is' — main.tsx does it before first render when Icelandic is
// the starting language, and the provider does it on a switch.
let translations: Record<string, EventTranslation> | null = null;
let pending: Promise<void> | null = null;

export function loadIcelandic(): Promise<void> {
  if (translations) return Promise.resolve();
  pending ??= import('../data/events.is').then((m) => {
    translations = m.eventTranslations;
  });
  return pending;
}

// One localized array per language, built lazily and reused — components can
// call this from anywhere and object identity stays stable within a language.
const cache = new Map<Lang, ConflictEvent[]>();

export function localizeEvents(lang: Lang): ConflictEvent[] {
  // Until the overlay arrives, Icelandic falls back to the English base —
  // the same graceful degradation as a missing translation.
  if (lang === 'en' || !translations) return baseEvents;
  let list = cache.get(lang);
  if (!list) {
    const tr = translations;
    list = baseEvents.map((e) => localizeEvent(e, tr[e.id]));
    cache.set(lang, list);
  }
  return list;
}
