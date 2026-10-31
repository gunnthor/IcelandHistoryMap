---
name: verify
description: Build, serve, and drive the Iceland history map to verify changes end-to-end with Playwright screenshots.
---

# Verifying changes to the Iceland history map

Vite + React + Leaflet SPA. No test suite — verification is driving the real app in a browser.
Design contract and region ownership: `docs/DESIGN.md`.

## Build & serve

```powershell
npm run build          # runs validate-events + tsc + vite build; also generates the event pages + sitemap
npm run preview        # serves the build at http://localhost:4173 (run in background)
```

`npm run dev` also works (port 5173) but preview exercises the production build including the
generated event pages and the lazy Icelandic chunk.

## Drive with Playwright

Playwright is NOT a project dependency — install it in the scratchpad (`npm init -y && npm i playwright`,
then `npx playwright install chromium` once) and run scripts from there.

Seed localStorage with `addInitScript`: `iceland-map-lang` ('en' | 'is'), `sagas-welcomed` ('1' hides
the first-visit card), `battlemap-style` ('satellite' | 'summer' | 'parchment' | 'ortelius').

Selectors by region:
- **Map** — event markers `.ev-marker.leaflet-interactive[data-key="<event-id>"]` (`aria-pressed`,
  `.is-selected`; clustered members stay in the DOM with `.is-hidden`). Cluster badges `.cl-marker`.
  Controls: `button[aria-label="Show all of Iceland"|"Zoom in"|"Zoom out"|"Layers"]`; style cards
  `.map-style-card[role=radio]`; clan switch `.map-layers__switch[role=switch]`; legend rows
  `.map-legend__row`; place/seat cards `.map-card`; clan seats `.seat-marker`; 1590 plate
  `.leaflet-image-layer`.
- **Story** — `aside.story` (`.story--folio` | `.story--side` | `.story--sheet[data-snap=peek|half|full]`),
  title `#story-title`, Earlier/Later `.story-chrono__btn--prev|--next`, route stepper `.stepper__prev`,
  `.stepper__next` (becomes Finish), `.stepper__pos`, ribbon `.story-ribbon`, sheet handle `.sheet-handle`,
  "Read the full story" `.story-peek-more`, follow buttons `.people__follow`.
- **Timeline** — play `.tl-play` (`aria-pressed`), status `.tl-status`, era tabs `.tl-era` (wide) /
  `.tl-chip` (compact), ticks `[role=listbox] [role=option]`, brush `.tl-handle--start|--end`,
  scrubber `.tl-scrub`, expand `.tl-expand`, sheet `#tl-sheet`.
- **Chrome** — search `.chrome-search__input`, results `.sr-row`, filters `.chrome-filters-btn`,
  type rows `.flt-check`, tokens `.chrome-token`, routes `.chrome-cluster__routes` (wide) /
  `.chrome-compact [aria-label="Story routes"]`, route cards `.route-card`, about `.chrome-cluster__about`,
  language `.chrome-lang [role=radio][lang=is]`, welcome `.chrome-welcome__start`, toast `.chrome-toast`.

Markers: Playwright's `.click()` often fails on them because Leaflet positions them with
transforms; use `boundingBox()` + `page.mouse.click(cx, cy)` (or `touchscreen.tap` on mobile) and
filter to boxes inside the visible map.

Escape peels one layer at a time: popover/dialog → search text → expanded sheet → autoplay → route
(keeps the stop open) → story.

## Gotchas

- Wait ~2.5–3 s after load / style switch / event select: tiles stream in and flights take up to 1.6 s.
- Map tiles come from Esri's public servers — network required; markers render even if tiles fail.
- Non-interactive `.leaflet-marker-icon` elements exist too (glacier labels) — filter on `.ev-marker`.
- Layouts: "wide" (desktop, tablet landscape, landscape phones) vs "compact" (< 700px, or portrait
  < 1024px). Test 1440×900, 1920×1080, 768×1024, 390×844, 320×568 and 844×390.
