// Normalize text for search matching: lowercase, strip accents (a-acute,
// o-umlaut, e-acute...) via Unicode decomposition, then transliterate the
// Icelandic letters that don't decompose (eth, thorn, ae). Applied to both
// the query and the haystack, so "orlygsstadir" finds "Orlygsstadir" with
// Icelandic spelling, "thingvellir" finds Thingvellir forms, and
// "haugsnes" finds Haugsnesbardagi.
export function normalizeForSearch(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // combining diacritical marks left by NFD
    .replace(/\u00f0/g, 'd') // eth
    .replace(/\u00fe/g, 'th') // thorn
    .replace(/\u00e6/g, 'ae'); // ae ligature
}

// Generate a kebab-case event id from a name: "Battle of \u00d6rlygssta\u00f0ir" \u2192
// "battle-of-orlygsstadir". Used by the validator to suggest ids and to keep
// new-event slugs consistent with the existing ones.
export function slugify(s: string): string {
  return normalizeForSearch(s)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}