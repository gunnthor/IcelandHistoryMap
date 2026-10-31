import { ConflictEvent, Source, UncertaintyFlag } from '../../types';
import { FLAG_CONFIG, FLAG_PRIORITY } from '../../utils/eventConfig';
import { TOURS, Tour } from '../../data/tours';

// ── Presentation helpers for the story area ──
// Everything here is a deterministic reading of fields the data already has;
// nothing is synthesised. `year` is a sort key, `dateText` is the date written
// for people, so short dates come from dateText whenever it holds a range.

const RANGE = /(\d{3,4})\s*[–-]\s*(\d{3,4})/;

/** The span an event covers, when its dateText states one that contains its
 *  year ("1958–1976 (three confrontations)" → [1958, 1976]). */
export function yearRange(e: ConflictEvent): [number, number] | null {
  const m = e.dateText?.match(RANGE);
  if (!m) return null;
  const from = Number(m[1]);
  const to = Number(m[2]);
  return from < to && from <= e.year && e.year <= to ? [from, to] : null;
}

/** The end of a span the way it's set beside a big start year: the last two
 *  digits when the century matches ("1958–76"), else in full ("999–1000"). */
export function rangeEnd([from, to]: [number, number]): string {
  const a = String(from);
  const b = String(to);
  return a.length === 4 && b.length === 4 && a.slice(0, 2) === b.slice(0, 2) ? b.slice(2) : b;
}

/** "1958–1976" for spans, else the year. Never adds "c." on its own. */
export function shortDate(e: ConflictEvent): string {
  const r = yearRange(e);
  return r ? `${r[0]}–${r[1]}` : String(e.year);
}

/** "en.wikipedia.org" — the secondary line under a source title. */
export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/** Split a trailing parenthetical so it can be set lighter:
 *  "Sturlungar (Sturla Sighvatsson)" → ["Sturlungar", "Sturla Sighvatsson"].
 *  Strings that don't end in one come back whole. */
export function splitParen(s: string): [string, string | null] {
  const m = s.match(/^(.*\S)\s*\(([^()]+)\)\s*$/);
  return m ? [m[1], m[2]] : [s, null];
}

/** The one caveat worth putting in the certainty line: the most serious
 *  open question that isn't already said elsewhere in the masthead/lede —
 *  `legendary` has its own strip and `location_uncertain` its own tag on the
 *  dateline. */
export function headlineCaveat(e: ConflictEvent): UncertaintyFlag | null {
  const flags = e.uncertaintyFlags ?? [];
  return FLAG_PRIORITY.find((f) => f !== 'legendary' && f !== 'location_uncertain' && flags.includes(f)) ?? null;
}

export function splitFlags(e: ConflictEvent): { established: UncertaintyFlag[]; open: UncertaintyFlag[] } {
  const flags = e.uncertaintyFlags ?? [];
  return {
    established: flags.filter((f) => FLAG_CONFIG[f].positive),
    open: FLAG_PRIORITY.filter((f) => flags.includes(f)),
  };
}

/** Real citations vs. url-less notes (marker placement, caveats) that only
 *  look like citations in the data. */
export function splitSources(sources: Source[]): { cited: Source[]; notes: Source[] } {
  return {
    cited: sources.filter((s) => s.url.trim() !== ''),
    notes: sources.filter((s) => s.url.trim() === ''),
  };
}

/** "See also", minus anything the chain of events already links to. */
export function seeAlso(e: ConflictEvent, byId: Map<string, ConflictEvent>): ConflictEvent[] {
  const skip = new Set([e.id, e.before?.eventId, e.after?.eventId]);
  const seen = new Set<string>();
  const out: ConflictEvent[] = [];
  for (const id of e.relatedIds ?? []) {
    if (skip.has(id) || seen.has(id)) continue;
    const target = byId.get(id);
    if (!target) continue;
    seen.add(id);
    out.push(target);
  }
  return out;
}

export function eventUrl(id: string): string {
  return `${window.location.origin}${import.meta.env.BASE_URL}event/${id}`;
}

const ISSUES = 'https://github.com/gunnthor/IcelandHistoryMap/issues/new';

export function correctionUrl(title: string, body: string): string {
  return `${ISSUES}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

/** Routes to suggest after finishing one: the two that share the fewest
 *  stops with it (ties keep list order), so "where next" is somewhere new. */
export function suggestTours(finishedStopIds: string[], excludeId?: string, n = 2): Tour[] {
  const done = new Set(finishedStopIds);
  return TOURS.map((tour, i) => ({ tour, i, overlap: tour.eventIds.filter((id) => done.has(id)).length }))
    .filter((c) => c.tour.id !== excludeId && c.tour.eventIds.length > 0)
    .sort((a, b) => a.overlap - b.overlap || a.i - b.i)
    .slice(0, n)
    .map((c) => c.tour);
}
