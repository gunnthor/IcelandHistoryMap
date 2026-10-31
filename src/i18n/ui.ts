import { common, CommonStrings, CategoryStrings } from './strings/common';
import { tours, ToursStrings } from './strings/tours';
import { chrome, ChromeStrings } from './strings/chrome';
import { story, StoryStrings } from './strings/story';
import { timeline, TimelineStrings } from './strings/timeline';
import { map, MapStrings } from './strings/map';

// ── UI chrome strings ──
// Everything the interface says that isn't event content, composed from one
// file per area under ./strings so each area owns its copy. Every string
// exists in full for both languages (TypeScript enforces it), except
// `tours.content`, which overlays the English titles in src/data/tours.ts.
//
// Event content (summaries, names, sources…) is NOT here — see
// src/data/events.is.ts for that overlay.
//
// Imported by scripts/validate-events.ts under Node, so this file and
// everything it imports must stay free of JSX, DOM and import.meta.

export interface UIStrings extends CommonStrings, CategoryStrings {
  tours: ToursStrings;
  chrome: ChromeStrings;
  story: StoryStrings;
  timeline: TimelineStrings;
  map: MapStrings;
}

export const UI: Record<'en' | 'is', UIStrings> = {
  en: {
    ...common.en,
    tours: tours.en,
    chrome: chrome.en,
    story: story.en,
    timeline: timeline.en,
    map: map.en,
  },
  is: {
    ...common.is,
    tours: tours.is,
    chrome: chrome.is,
    story: story.is,
    timeline: timeline.is,
    map: map.is,
  },
};
