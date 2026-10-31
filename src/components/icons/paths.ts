import { EventType, UncertaintyFlag } from '../../types';

// ── Icon markup, as SVG inner-markup strings ──
// Strings (not JSX) so the same source renders in React (<Icon>) and inside
// Leaflet's divIcon HTML (markers), which can't host React elements.
//
// UI icons: 24×24 grid, drawn with stroke="currentColor" at 1.5, round caps
// and joins, no fill. Most paths are from Lucide (https://lucide.dev),
// ISC License — Copyright (c) for portions of Lucide are held by Cole
// Bemis 2013-2022 as part of Feather (MIT); all other copyright (c) for
// Lucide are held by Lucide Contributors 2022.

export const UI_ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.6-4.6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-up': '<path d="m18 15-6-6-6 6"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  play: '<path d="M7 4.5v15a.8.8 0 0 0 1.2.7l12-7.5a.8.8 0 0 0 0-1.4l-12-7.5A.8.8 0 0 0 7 4.5Z" fill="currentColor" stroke="none"/>',
  pause:
    '<rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  info: '<circle cx="12" cy="12" r="9.5"/><path d="M12 16v-4.5"/><path d="M12 8h.01"/>',
  layers:
    '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  fit: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/><circle cx="12" cy="12" r="2.5"/>',
  route:
    '<circle cx="6" cy="19" r="2.5"/><path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5"/><circle cx="18" cy="5" r="2.5"/>',
  pin: '<path d="M19.5 10c0 4.7-5.2 9.6-6.9 11.1a.9.9 0 0 1-1.2 0C9.7 19.6 4.5 14.7 4.5 10a7.5 7.5 0 0 1 15 0"/><circle cx="12" cy="10" r="2.75"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  external:
    '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  sliders:
    '<path d="M21 4h-7"/><path d="M10 4H3"/><path d="M21 12h-9"/><path d="M8 12H3"/><path d="M21 20h-5"/><path d="M12 20H3"/><path d="M14 2v4"/><path d="M8 10v4"/><path d="M16 18v4"/>',
  reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  shuffle:
    '<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.97a4 4 0 0 0 3.3-1.7l5.45-7.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.97a4 4 0 0 1 3.6 2.2"/><path d="M22 18h-6.04a4 4 0 0 1-3.3-1.8l-.36-.45"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  github:
    '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  pencil:
    '<path d="M12 20h9"/><path d="M16.38 3.62a1 1 0 0 1 3 3L7.37 18.64a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.86z"/>',
  minimize:
    '<path d="M4 14h6v6"/><path d="M20 10h-6V4"/><path d="m14 10 7-7"/><path d="m3 21 7-7"/>',
  maximize:
    '<path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  share:
    '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',
  'skip-forward':
    '<path d="M5 4.5v15a.8.8 0 0 0 1.2.7l10-7.5a.8.8 0 0 0 0-1.4l-10-7.5A.8.8 0 0 0 5 4.5Z" fill="currentColor" stroke="none"/><path d="M19 5v14"/>',
  help: '<circle cx="12" cy="12" r="9.5"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  alert:
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  // Uncertainty flags (24-grid, same stroke): sealed check, quill, pin,
  // calendar, and a four-point "myth" star.
  'flag-likely':
    '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
  'flag-saga':
    '<path d="M12.67 19a2 2 0 0 0 1.42-.59l6.15-6.17a6 6 0 0 0-8.49-8.49L5.59 9.91A2 2 0 0 0 5 11.33V18a1 1 0 0 0 1 1z"/><path d="M16 8 2 22"/><path d="M17.5 15H9"/>',
  'flag-date':
    '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>',
  'flag-legend': '<path d="M12 3l1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6-5.6-1.9 5.6-1.9z"/><path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  shield: '<path d="M4 3.5h16V11c0 5-3.6 8.5-8 10-4.4-1.5-8-5-8-10z"/>',
} as const;

export type IconName = keyof typeof UI_ICONS;

export const FLAG_ICONS: Record<UncertaintyFlag, IconName> = {
  event_likely: 'flag-likely',
  saga_dramatized: 'flag-saga',
  location_uncertain: 'pin',
  date_uncertain: 'flag-date',
  legendary: 'flag-legend',
};

// ── Event-type glyphs ──
// 16×16 grid, stroke 1.75, round caps/joins, few strokes so they stay
// legible at 14px inside a 28px marker. Most are drawn for this project;
// four are Lucide shapes (ISC, see above) scaled from the 24-grid with the
// stroke compensated so they match the rest.
const lucide = (inner: string) => `<g transform="scale(.6667)" stroke-width="2.625">${inner}</g>`;

export const TYPE_GLYPHS: Record<EventType, string> = {
  // crossed swords: two blades with guards near the hilts
  battle: '<path d="M3 3l10 10"/><path d="M13 3 3 13"/><path d="M9.3 12.3l3-3"/><path d="M3.7 9.3l3 3"/>',
  // sailboat (Lucide)
  sea_battle: lucide('<path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z"/><path d="M21 14 10 2 3 14h18Z"/><path d="M10 2v16"/>'),
  // raid: double chevron, moving fast
  raid: '<path d="M3 3.5 7.5 8 3 12.5"/><path d="M8.5 3.5 13 8l-4.5 4.5"/>',
  // flame
  burning:
    '<path d="M8 14.2c-2.7 0-4.6-1.8-4.6-4.3 0-2.6 2-3.9 2.8-6.1.7 1.4 1.4 2 2.3 2.4.4-1.9 1.1-3.3 2-4.2.5 2.6 2.7 4.5 2.7 7.7 0 2.6-2.1 4.5-5.2 4.5z"/>',
  // struck tally: three bars, one stroke through them
  massacre: '<path d="M4.5 3v10"/><path d="M8 3v10"/><path d="M11.5 3v10"/><path d="M2.5 11.5l11-7"/>',
  // a single sword (Lucide)
  killing: lucide('<path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6-6"/><path d="m16 16 4 4"/><path d="m19 21 2-2"/>'),
  // axe (Lucide)
  feud: lucide('<path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z"/>'),
  // gallows with noose
  execution: '<path d="M2.5 14.2h6"/><path d="M4.5 14.2V2.2h7.5v2.3"/><path d="M4.5 5 7 2.2"/><circle cx="12" cy="6.4" r="1.7"/>',
  // scales of law (Lucide)
  political: lucide('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>'),
  // planted flag
  occupation: '<path d="M4 14.5V1.8"/><path d="M4 2.5h8.5L10.3 5.3l2.2 2.7H4"/>',
  // volcanic cone with a plume
  eruption: '<path d="M1.8 14l4.4-7.2h3.6L14.2 14"/><path d="M8 4.6V1.8"/><path d="M5.6 4.4 4.6 2.8"/><path d="m10.4 4.4 1-1.6"/>',
  // skull
  plague:
    '<path d="M5.2 13.8v-2.1C3.8 11 3 9.8 3 8.2 3 5.2 5.2 2.5 8 2.5s5 2.7 5 5.7c0 1.6-.8 2.8-2.2 3.5v2.1z"/><circle cx="6.2" cy="8.2" r="1"/><circle cx="9.8" cy="8.2" r="1"/>',
};

const UI_ATTRS =
  'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
const GLYPH_ATTRS =
  'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';

/** A complete <svg> string for an event-type glyph — for Leaflet HTML. */
export function glyphSvg(type: EventType, size = 16): string {
  return `<svg viewBox="0 0 16 16" width="${size}" height="${size}" ${GLYPH_ATTRS} aria-hidden="true" focusable="false">${TYPE_GLYPHS[type]}</svg>`;
}

/** A complete <svg> string for a UI icon — for Leaflet HTML. */
export function iconSvg(name: IconName, size = 20): string {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" ${UI_ATTRS} aria-hidden="true" focusable="false">${UI_ICONS[name]}</svg>`;
}
