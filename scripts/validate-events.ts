// Content validation for src/data/events.ts — run via `npm run validate-events`.
// Also runs as the first step of `npm run build`, so bad data fails the build.
//
// Errors (exit 1): schema violations, duplicate/malformed ids, broken event
// references (before/after/relatedIds/tours), missing sources.
// Warnings (exit 0): duplicate coordinates, events with no linkable source
// URL, coordinates outside Iceland's bounding box.

import { z } from 'zod';
import { events } from '../src/data/events';
import { TOURS } from '../src/data/tours';
import { slugify } from '../src/utils/text';
import { eventTranslations } from '../src/data/events.is';
import { powerCenterTranslations } from '../src/data/powerCenters.is';
import { powerCenters } from '../src/data/powerCenters';
import { UI } from '../src/i18n/ui';
import { ERAS } from '../src/utils/eventConfig';

const EVENT_TYPES = [
  'battle',
  'sea_battle',
  'raid',
  'burning',
  'massacre',
  'killing',
  'feud',
  'occupation',
  'execution',
  'political',
  'eruption',
  'plague',
] as const;

const UNCERTAINTY_FLAGS = [
  'event_likely',
  'saga_dramatized',
  'location_uncertain',
  'date_uncertain',
  'legendary',
] as const;

const storyLink = z
  .object({ text: z.string().min(1), eventId: z.string().optional() })
  .strict();

const source = z.object({ title: z.string().min(1), url: z.string() }).strict();

// .strict() everywhere: an unknown key is almost always a typo'd field name,
// which would otherwise silently never render.
const eventSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be a kebab-case slug'),
    name: z.string().min(1),
    icelandicName: z.string().min(1).optional(),
    aliases: z.array(z.string().min(1)).optional(),
    year: z.number().int().min(800).max(2100),
    dateText: z.string().min(1).optional(),
    period: z.string().min(1),
    type: z.enum(EVENT_TYPES),
    locationName: z.string().min(1),
    coordinates: z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)]),
    factions: z.array(z.string().min(1)).min(1),
    keyPeople: z.array(z.string().min(1)),
    winner: z.string().min(1).optional(),
    casualtyEstimate: z.string().min(1).optional(),
    summary: z.string().min(1),
    eli12: z.string().min(1),
    whyItHappened: z.string().min(1),
    whyItMatters: z.string().min(1),
    before: storyLink.optional(),
    after: storyLink.optional(),
    relatedIds: z.array(z.string()).optional(),
    humanDrama: z.string().min(1).optional(),
    modernTranslation: z.string().min(1).optional(),
    confidenceNote: z.string().min(1).optional(),
    uncertaintyFlags: z.array(z.enum(UNCERTAINTY_FLAGS)).min(1).optional(),
    confidence: z.enum(['high', 'medium', 'low']),
    sources: z.array(source).min(1, 'every event needs at least one source'),
  })
  .strict();

// Generous bounding box around Iceland and its waters.
const ICELAND = { latMin: 62.5, latMax: 67.5, lngMin: -25.5, lngMax: -12.5 };

const errors: string[] = [];
const warnings: string[] = [];

// ── Per-event schema validation ──
for (const ev of events) {
  const result = eventSchema.safeParse(ev);
  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push(`${ev.id ?? '<no id>'}: ${issue.path.join('.') || '(root)'} — ${issue.message}`);
    }
    // If the id itself is malformed, suggest a slug derived from the name.
    if (ev.id && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(ev.id) && ev.name) {
      errors.push(`${ev.id}: suggested id — "${slugify(ev.name)}"`);
    }
  }
}

// ── Unique ids ──
const seen = new Map<string, number>();
for (const ev of events) seen.set(ev.id, (seen.get(ev.id) ?? 0) + 1);
for (const [id, n] of seen) if (n > 1) errors.push(`duplicate id "${id}" (${n} events)`);

// ── Referential integrity: story links and tours ──
const ids = new Set(events.map((e) => e.id));
for (const ev of events) {
  for (const [field, ref] of [
    ['before.eventId', ev.before?.eventId],
    ['after.eventId', ev.after?.eventId],
  ] as const) {
    if (ref && !ids.has(ref)) errors.push(`${ev.id}: ${field} → unknown event "${ref}"`);
  }
  for (const ref of ev.relatedIds ?? []) {
    if (!ids.has(ref)) errors.push(`${ev.id}: relatedIds → unknown event "${ref}"`);
  }
  if (ev.relatedIds?.includes(ev.id)) warnings.push(`${ev.id}: relatedIds includes itself`);
}
for (const tour of TOURS) {
  for (const ref of tour.eventIds) {
    if (!ids.has(ref)) errors.push(`tour "${tour.id}": unknown event "${ref}"`);
  }
}

// ── Duplicate coordinates (warning: legit for same-site events, worth eyes) ──
const byCoord = new Map<string, string[]>();
for (const ev of events) {
  const key = ev.coordinates.join(',');
  byCoord.set(key, [...(byCoord.get(key) ?? []), ev.id]);
}
for (const [coord, dupes] of byCoord) {
  if (dupes.length > 1) warnings.push(`identical coordinates [${coord}]: ${dupes.join(', ')}`);
}

// ── Coordinates outside Iceland (warning) ──
for (const ev of events) {
  const [lat, lng] = ev.coordinates;
  if (lat < ICELAND.latMin || lat > ICELAND.latMax || lng < ICELAND.lngMin || lng > ICELAND.lngMax) {
    warnings.push(`${ev.id}: coordinates [${lat}, ${lng}] are outside Iceland's bounding box`);
  }
}

// ── Missing linkable sources (warning: note-only sources have url: '') ──
for (const ev of events) {
  const linkable = ev.sources.filter((s) => s.url.trim() !== '');
  if (linkable.length === 0) {
    warnings.push(`${ev.id}: no source has a URL (${ev.sources.length} note-only source(s))`);
  }
}

// ── Icelandic translations (events.is.ts + tour/era/power-center overlays) ──
// Orphaned keys are errors (they silently do nothing); missing translations
// are warnings (the UI falls back to English by design).
const trSchema = z
  .object({
    name: z.string().min(1).optional(),
    dateText: z.string().min(1).optional(),
    period: z.string().min(1).optional(),
    locationName: z.string().min(1).optional(),
    factions: z.array(z.string().min(1)).min(1).optional(),
    keyPeople: z.array(z.string().min(1)).optional(),
    winner: z.string().min(1).optional(),
    casualtyEstimate: z.string().min(1).optional(),
    summary: z.string().min(1).optional(),
    eli12: z.string().min(1).optional(),
    whyItHappened: z.string().min(1).optional(),
    whyItMatters: z.string().min(1).optional(),
    before: z.string().min(1).optional(),
    after: z.string().min(1).optional(),
    humanDrama: z.string().min(1).optional(),
    modernTranslation: z.string().min(1).optional(),
    confidenceNote: z.string().min(1).optional(),
    sources: z.array(source).min(1).optional(),
  })
  .strict();

const eventsById = new Map(events.map((e) => [e.id, e]));
for (const [id, tr] of Object.entries(eventTranslations)) {
  if (!ids.has(id)) {
    errors.push(`events.is: translation for unknown event "${id}"`);
    continue;
  }
  const result = trSchema.safeParse(tr);
  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push(`events.is/${id}: ${issue.path.join('.') || '(root)'} — ${issue.message}`);
    }
  }
  const base = eventsById.get(id)!;
  // before/after text only renders when the English base has the story link.
  if (tr.before && !base.before) errors.push(`events.is/${id}: has "before" but the base event doesn't`);
  if (tr.after && !base.after) errors.push(`events.is/${id}: has "after" but the base event doesn't`);
  // A faction list must keep its shape — the panel renders "A gegn B" pairs.
  if (tr.factions && tr.factions.length !== base.factions.length) {
    errors.push(`events.is/${id}: factions count ${tr.factions.length} ≠ base ${base.factions.length}`);
  }
}
const untranslated = events.filter((e) => !(e.id in eventTranslations)).map((e) => e.id);
if (untranslated.length > 0) {
  warnings.push(`events.is: ${untranslated.length} event(s) without Icelandic text: ${untranslated.join(', ')}`);
}

for (const tourId of Object.keys(UI.is.tours.content)) {
  if (!TOURS.some((t) => t.id === tourId)) {
    errors.push(`ui.is: tour translation for unknown tour "${tourId}"`);
  }
}
for (const tour of TOURS) {
  if (!(tour.id in UI.is.tours.content)) warnings.push(`ui.is: tour "${tour.id}" has no Icelandic title/tagline`);
}

for (const eraId of Object.keys(UI.is.eras)) {
  if (!ERAS.some((e) => e.id === eraId)) errors.push(`ui.is: era translation for unknown era "${eraId}"`);
}
for (const era of ERAS) {
  if (!(era.id in UI.is.eras)) warnings.push(`ui.is: era "${era.id}" has no Icelandic label/hint`);
}

const pcIds = new Set(powerCenters.map((p) => p.id));
for (const pcId of Object.keys(powerCenterTranslations)) {
  if (!pcIds.has(pcId)) errors.push(`powerCenters.is: translation for unknown power center "${pcId}"`);
}
for (const pc of powerCenters) {
  if (!(pc.id in powerCenterTranslations)) warnings.push(`powerCenters.is: "${pc.id}" has no Icelandic text`);
}

const translatedCount = events.length - untranslated.length;

// ── Report ──
for (const w of warnings) console.warn(`⚠ ${w}`);
for (const e of errors) console.error(`✖ ${e}`);
console.log(
  `\n${events.length} events checked (${translatedCount} with Icelandic text): ${errors.length} error(s), ${warnings.length} warning(s)`,
);
if (errors.length > 0) process.exit(1);
