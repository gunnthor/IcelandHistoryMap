import { ConflictEvent } from '../../types';
import { MatchField } from '../../state/explorer';
import { normalizeForSearch } from '../../utils/text';

// Search results for the command bar and the phone search view. The store
// already filters the map by the query; this only ranks the same matches and
// works out *why* each one matched, so a hit on "gissur" can say
// "Person · Gissur Þorvaldsson" instead of leaving the visitor guessing.

/** 'other' = the event's name in the other language (icelandicName). */
export type HitField = MatchField | 'other';

export interface SearchHit {
  event: ConflictEvent;
  field: HitField;
  /** The text that matched (a person, a place, the other-language name…). */
  value: string;
}

const RANK: Record<HitField, number> = { name: 0, other: 1, alias: 2, person: 3, side: 4, place: 5, period: 6, type: 7 };

/** `pool` is expected in chronological order; ties keep it. `match` is the
 *  store's matchQuery; `typeName` names a type hit in the active language. */
export function findHits(
  pool: ConflictEvent[],
  query: string,
  match: (e: ConflictEvent, normalizedQuery: string) => MatchField | null,
  typeName: (e: ConflictEvent) => string,
): SearchHit[] {
  const q = normalizeForSearch(query.trim());
  if (!q) return [];
  const has = (s: string) => normalizeForSearch(s).includes(q);
  const hits: SearchHit[] = [];
  for (const e of pool) {
    const field = match(e, q);
    if (!field) continue;
    let hit: SearchHit;
    switch (field) {
      case 'name':
        hit = has(e.name) ? { event: e, field, value: e.name } : { event: e, field: 'other', value: e.icelandicName ?? '' };
        break;
      case 'alias':
        hit = { event: e, field, value: e.aliases?.find(has) ?? '' };
        break;
      case 'person':
        hit = { event: e, field, value: e.keyPeople.find(has) ?? '' };
        break;
      case 'side':
        hit = { event: e, field, value: e.factions.find(has) ?? '' };
        break;
      case 'place':
        hit = { event: e, field, value: e.locationName };
        break;
      case 'period':
        hit = { event: e, field, value: e.period };
        break;
      case 'type':
        hit = { event: e, field, value: typeName(e) };
        break;
    }
    hits.push(hit);
  }
  // Array.prototype.sort is stable, so chronology survives within a rank.
  return hits.sort((a, b) => RANK[a.field] - RANK[b.field]);
}

/**
 * Split `text` around the first accent-insensitive match of `query`, so the
 * matched letters can be emphasised in the original spelling ("orlygs" lights
 * up "Örlygs"). normalizeForSearch can turn one letter into two (þ → th), so
 * we keep a map from each normalized character back to its source index.
 */
export function splitMatch(text: string, query: string): [string, string, string] | null {
  const q = normalizeForSearch(query.trim());
  if (!q) return null;
  let norm = '';
  const back: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const n = normalizeForSearch(text[i]);
    norm += n;
    for (let k = 0; k < n.length; k++) back.push(i);
  }
  const at = norm.indexOf(q);
  if (at < 0) return null;
  const start = back[at];
  const end = back[at + q.length - 1] + 1;
  return [text.slice(0, start), text.slice(start, end), text.slice(end)];
}
