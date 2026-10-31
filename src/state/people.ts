import { ConflictEvent } from '../types';
import { events as baseEvents } from '../data/events';

// ── Person index: "follow this person" through the events ──
// keyPeople is free text, so identity comes from the ENGLISH base data and
// is matched by exact normalized name — never by first names or fragments:
// Gissur hvíti and Gissur Þorvaldsson, Kolbeinn Tumason and Kolbeinn ungi,
// Snorri Sturluson and Snorri Þorvaldsson are all different people. The
// Icelandic overlay keeps keyPeople in the same order and length, so the
// localized name for a person is the entry at the same position.

// The only spelling variant in the data (gunnar-hlidarendi-990 vs
// kristnitakan-1000). Keys are post-normalization.
const ALIASES: Record<string, string> = {
  'gizur hvíti': 'gissur hvíti',
};

// Groups that appear in keyPeople but aren't people. Only names in 2+
// events become followable, which already drops these — the guard keeps a
// future data addition from turning "Alþingi" into a person.
const NOT_PEOPLE = new Set(['alþingi', 'royal navy', 'royal marines', 'icelandic coast guard']);

/** Display form: the name without parenthetical descriptions. */
export function cleanPersonName(raw: string): string {
  return raw.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
}

/** Identity key for a keyPeople entry. */
export function personKey(raw: string): string {
  const k = cleanPersonName(raw.normalize('NFC'))
    .replace(/^King\s+/i, '')
    .toLowerCase();
  return ALIASES[k] ?? k;
}

export interface Person {
  key: string;
  /** Events this person appears in, oldest first (ties keep data order). */
  eventIds: string[];
}

const order = new Map(baseEvents.map((e, i) => [e.id, i]));
const byYear = (a: ConflictEvent, b: ConflictEvent) =>
  a.year - b.year || (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0);

function buildIndex(): Map<string, Person> {
  const hits = new Map<string, ConflictEvent[]>();
  for (const ev of baseEvents) {
    for (const raw of ev.keyPeople) {
      const key = personKey(raw);
      if (!key || NOT_PEOPLE.has(key)) continue;
      const list = hits.get(key) ?? [];
      if (!list.includes(ev)) list.push(ev);
      hits.set(key, list);
    }
  }
  const index = new Map<string, Person>();
  for (const [key, evs] of hits) {
    if (evs.length < 2) continue; // following someone through one event is not a journey
    index.set(key, { key, eventIds: [...evs].sort(byYear).map((e) => e.id) });
  }
  return index;
}

/** Everyone who appears in at least two events. */
export const PEOPLE: Map<string, Person> = buildIndex();

/** The followable person behind a keyPeople entry of the ENGLISH base event,
 *  or null. Use `followableAt` when you only have a localized event. */
export function followable(raw: string): Person | null {
  return PEOPLE.get(personKey(raw)) ?? null;
}

const baseById = new Map(baseEvents.map((e) => [e.id, e]));

/** The followable person at position `i` of an event's keyPeople — works for
 *  localized events because identity is read from the English base. */
export function followableAt(eventId: string, i: number): Person | null {
  const raw = baseById.get(eventId)?.keyPeople[i];
  return raw ? followable(raw) : null;
}

/** A person's display name in the active language: their entry in the first
 *  localized event that names them, cleaned of parentheticals. */
export function personDisplayName(person: Person, localized: ConflictEvent[]): string {
  const byId = new Map(localized.map((e) => [e.id, e]));
  for (const id of person.eventIds) {
    const base = baseById.get(id);
    const loc = byId.get(id);
    if (!base || !loc) continue;
    const i = base.keyPeople.findIndex((raw) => personKey(raw) === person.key);
    if (i >= 0) return cleanPersonName(loc.keyPeople[i] ?? base.keyPeople[i]);
  }
  return person.key;
}
