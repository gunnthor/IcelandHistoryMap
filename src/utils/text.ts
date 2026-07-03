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