/** Icelandic number agreement: numbers ending in 1 (except 11) take the
 *  singular — "21 atburður", "11 atburðir". Pass both forms. */
export function isPick(n: number, singular: string, plural: string): string {
  return n % 10 === 1 && n % 100 !== 11 ? singular : plural;
}

/** English: 1 → singular, anything else → plural. */
export function enPick(n: number, singular: string, plural: string): string {
  return n === 1 ? singular : plural;
}
