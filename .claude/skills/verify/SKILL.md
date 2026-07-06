---
name: verify
description: Build, serve, and drive the Iceland history map to verify changes end-to-end with Playwright screenshots.
---

# Verifying changes to the Iceland history map

Vite + React + Leaflet SPA. No test suite — verification is driving the real app in a browser.

## Build & serve

```powershell
npm run build          # runs validate-events + tsc + vite build; also generates 52 event pages + sitemap
npm run preview        # serves the build at http://localhost:4173 (run in background)
```

`npm run dev` also works (port 5173) but preview exercises the production build including the
generated event pages.

## Drive with Playwright

Playwright is NOT a project dependency — install it in the scratchpad (`npm init -y && npm i playwright`,
then `npx playwright install chromium` once) and run scripts from there.

Useful selectors:
- `.style-switch-btn` — map style switcher (Parchment / Summer / Satellite / 1590), `.active` marks current;
  choice persists in localStorage key `battlemap-style`
- `.leaflet-image-layer` — the Ortelius 1590 engraving overlay (only in 1590 mode)
- `.timeline-play` — autoplay button (`aria-pressed` reflects state); `.timeline-label` shows
  `Playing — <year>: <name> (n of 52)` while playing; dwell is 9 s per event
- `.leaflet-marker-icon.leaflet-interactive` — event markers. Playwright's `.click()` often fails on
  them ("outside of viewport") because Leaflet positions them with transforms; use `boundingBox()` +
  `page.mouse.click(cx, cy)` instead, and filter to boxes inside the viewport
- Escape pauses autoplay first, then exits a route, then closes the event panel

## Gotchas

- Wait ~2–2.5 s after load / style switch / event select: tiles stream in and `flyTo` animates for 1.2 s.
- Map tiles come from Esri's public servers — network required; markers render even if tiles fail.
- Non-interactive `.leaflet-marker-icon` elements exist too (glacier labels) — always filter on
  `.leaflet-interactive`.
