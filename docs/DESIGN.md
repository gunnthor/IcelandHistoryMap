# Design system & redesign spec — "Basalt & Vellum"

*October 2026. The contract every area of the app is built against. Audits behind these decisions
(UX, visual, cartography, mobile, storytelling, accessibility/performance, architecture) were run
against the pre-redesign build; the before screenshots are in the redesign PR.*

---

## 1. Direction

Three directions were developed and scored (originality, usability, atmosphere, legibility over all
four basemaps, professionalism, implementation risk):

| | A · Basalt & Vellum | B · Folio Atlas | C · Field Survey |
|---|---|---|---|
| Concept | Night museum: basalt gallery walls, the map as the vitrine, each story a lit vellum placard | Light editorial atlas: paper everywhere, neatline, magazine columns | Topographic instrument: stone chrome, contour motifs, mono type |
| Total /60 | **50** | 45 | 41 |
| Fatal flaw | — | Merges into the pale Parchment and 1590 maps | Cold, reads like a war game; grey chrome vanishes on Ortelius |

**A wins** because it is the only chrome legible on every basemap (bone on dark glass is 10.6:1
over Parchment and 13.3:1 over Satellite), long reading happens on paper (ink on vellum 15.6:1), and it
literally stages "museum exhibit meets exploration app".

**Colours have fixed meanings everywhere:** basalt = the museum (chrome), vellum = what you read
(stories, about, welcome), brass = "you are here" (selection, active state, focus), ember = "act"
(primary calls to action). Don't spend brass or ember on decoration.

**Type:** Cormorant Garamond (display: titles, years, the wordmark, Icelandic names in italic) +
Instrument Sans (everything else). Cormorant never below 18px and never in uppercase — eyebrows are
always Instrument Sans caps (Cormorant caps squash Þ into Ð). Self-hosted, see `src/styles/fonts.css`.

**The type seal is the shared mark:** pigment disc + bone glyph + confidence rim. The same seal is the
map marker, the timeline tick colour, the filter swatch, the search-result icon and the story header.
`<TypeSeal>` in `components/icons/Icon.tsx`; marker HTML uses `glyphSvg()` from the same source.

**Confidence = solidity, never opacity.** high / medium / low → solid / dashed / dotted rim;
solid / half / hollow timeline tick; ●●● / ●●○ / ●○○ pips (`<Pips>`).

**Removed:** compass rose, ornate frame, vignette, paper grain over satellite, emoji as UI, pastel
"fun boxes", card-in-card nesting, the permanent disclaimer box (moves to About + the story's trust
section).

## 2. Foundations (already built — use, don't fork)

| File | What |
|---|---|
| `src/styles/tokens.css` | Every colour, type size, space, radius, shadow, z-layer, duration, easing |
| `src/styles/base.css` | Reset, focus ring, `.t-*` type helpers, `.visually-hidden`, reduced-motion kill-switch |
| `src/components/ui/` | `Button`, `IconButton`, `SegmentedControl`, `Pips`, `Popover`, `Dialog` + `ui.css` (`.ui-glass`, `.on-vellum`, `.ui-chip`, `.ui-badge`, `.ui-switch`, `.ui-kbd`, `.seal`) |
| `src/components/icons/` | `Icon` (24-grid UI icons), `TypeGlyph`, `TypeSeal`, `glyphSvg()`/`iconSvg()` strings for Leaflet HTML, `FLAG_ICONS` |
| `src/state/explorer.tsx` | The store: `useExplorer()` — see §6 |
| `src/state/layout.ts` | `useLayoutMode()` ('wide' \| 'compact'), `useIsShort()`, `useReducedMotion()`, `prefersReducedMotion()`, insets store |
| `src/state/escape.ts` | `useEscape(handler, active)` — the one Escape stack |
| `src/state/people.ts` | Person index for "follow this person" |
| `src/i18n/strings/*.ts` | Copy, one file per area, both languages |

Rules: no hard-coded colours, sizes or z-indexes in area CSS — use tokens. No new button/chip
styles — compose the primitives. No `outline: none` without the token focus ring. Every animation
uses token durations (which collapse to 0 under reduced motion).

## 3. Layout

### Modes (`useLayoutMode`)
- **wide** — desktop, tablet landscape, and landscape phones (`useIsShort()` tightens these).
- **compact** — `width < 700` or portrait `< 1024`: phones and tablet portrait.

### Wide (≥ 1024 typical)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│ ╭ SAGAS OF BLOOD & FIRE │ Search events, people, places   / │ Filters ² ╮  Routes  About  EN|ÍS │  ← top row, 16px gutter, 48px tall
│ [Battle ×] [Well documented ×] Clear all                                         │  ← active-filter tokens (only when filtering)
│                                                          ╭───────────────────────╮│
│                                                    [⛶]  │ BATTLE · AGE OF THE…   ││
│                 MAP — full bleed                   [+]  │ Battle of             ││
│                                                    [−]  │ Örlygsstaðir   1238   ││  ← story folio, right, below
│                        ◉                           [≋]  │ …                     ││     the top row, 420/440px
│ ╭ welcome placard ╮                                      │                       ││
│ ╰─────────────────╯                                      │                       ││
│ ╭ ▶ │ All · Saga Age · Sturlung · Late Med. · Danish · Modern    15 of 53 ╮       ││
│ │ 875 ┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃ 1976          │  ← time dock, bottom-left,
│ ╰──────────────────────────────────────────────────────────────╯ ╰───────────────╯│     stops at the folio
└────────────────────────────────────────────────────────────────────────────────┘
```

- **Map**: `position: fixed; inset: 0`, isolated stacking context (`isolation: isolate`).
- **Top row** (chrome, z-chrome): left — command bar (wordmark, search, Filters); right — Story
  routes, About, EN|ÍS. Fixed; never moves when the folio opens.
- **Story folio** (z-folio): right, `top: 16 + 48 + 12 = 76px`, `bottom: 16px`, width `--folio-w`.
  Vellum. Can minimize to a title strip.
- **Time dock** (z-chrome): bottom-left; `left: 16px; right: calc(16px + folio width + 16px when
  open)`. Glass.
- **Map controls** (z-map-ui, inside the map area): right edge,
  `right: calc(var(--inset-right) + 16px)`, vertically centred in the visible map: Fit Iceland,
  zoom +/−, Layers. Attribution bottom-right of the visible map, above the dock.
- **Welcome placard**: bottom-left, above the dock, vellum, 360px. First visit only.
- Landscape phone (`short`): top row collapses into one 44px floating bar; dock is one 48px row;
  story becomes a side sheet `clamp(300px, 42vw, 400px)` full height.

### Compact (phones, tablet portrait)

```
 idle                         event at peek               event at full
┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│ Sagas…  [⌕][⇄][≡]    │   │ Sagas…  [⌕][⇄][≡]    │   │ ▬▬  [⌄] Örlygsstaðir ✕│ sticky head
│                 [⛶]  │   │                 [⛶]  │   │ BATTLE · 1238          │
│     MAP (fitted)[≋]  │   │      ◉ (centred in   │   │ …story scrolls…        │
│                      │   │        visible map)  │   │                        │
│                      │   │╭──── ▬▬ ────────────╮│   │                        │
│                      │   ││ ⚔ BATTLE · 1238 ‹ › ✕││   │                        │
│ⓘ                     │   ││ Battle of Örlygss…  ││   │                        │
│╭ ▶ All Saga Sturl… ›╮│   ││ One of the largest… ││   │                        │
││ ┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃ ││   │╰─────────────────────╯│   │╭ ‹ Stop 2 of 7 › ✕ ──╮│ route bar
│╰────────────────────╯│   │╭ ▶ ┃┃┃┃┃●┃┃┃┃┃┃┃┃┃ ╮│   │╰─────────────────────╯│
└──────────────────────┘   └──────────────────────┘   └──────────────────────┘
```

- **Top bar** 52px + safe-area: wordmark, Search (opens full-screen search), Story routes, Menu
  (language, about, map style & layers shortcut). Every control ≥ 44×44.
- **Dock** at the bottom (+ safe-area): play + era chips row, scrubber row. Collapses to the
  scrubber row only while a story is open.
- **Story sheet** above the dock: peek (`clamp(168px, 26%, 232px)`), half (52%), full (top inset +
  8px). Tablet portrait: max-width 640px, centred.
- Map controls on the right edge (Fit, Layers; no zoom buttons on coarse pointers — pinch).
  Controls and attribution track `--inset-bottom` and hide when the sheet is above peek.

### Insets contract (`state/layout.ts`)
Each floating region reports how much of a viewport edge it covers with
`useReportInset(owner, edge, element)` (or `setInset` for transform-driven sheets):
chrome → `top`; folio/side sheet → `right`; dock and bottom sheet → `bottom` (separate owners, they
add up). CSS reads `--inset-*`; the map reads `getInsets()` at flight time to centre targets in the
**visible** map, and re-frames when insets change. The dock also sets `--dock-h` so the sheet can
sit on top of it.

### Z-layers
map 0 (isolated — Leaflet's own z-indexes stay inside) · map-ui 10 · chrome 20 · folio/sheet 30 ·
popover 40 · scrim 50 · modal 60 (native `<dialog>` top layer) · toast 70.

## 4. Regions

### 4.1 Chrome — `components/chrome/` (+ `strings/chrome.ts`, `strings/tours.ts`)
- **Wordmark**: "Sagas of Blood *&* Fire" in Cormorant 600 22px, the `&`/`og` italic in
  `--ember-400`. Is the page `<h1>`.
- **Search**: `form role=search`, `type=search`, 16px font on touch (no iOS zoom), `/` focuses it
  (listen for `sagas:focus-search`). Typing filters the map live AND opens a results popover: up to
  8 rows (seal, name, year, "matched: Person · Gissur Þorvaldsson" via `matchEvent`), ↑/↓ + Enter,
  "Show all N on the map" fits the map to results (`requestFit`). Escape clears text first, then
  closes. Empty-result copy from strings. Compact: full-screen search view with the same list.
- **Filters**: button with count badge → popover (compact: modal sheet): Type (one row per event type, real
  checkboxes, seal swatch, "All types"), Confidence (`SegmentedControl`: Any / Well documented / Some
  doubt / Uncertain), Years (read-out + reset; the dock owns the brush), footer "Showing n of N" +
  Clear all. Active filters render as removable `.ui-chip--token`s under the command bar.
- **Story routes**: `Dialog` (dark): one card per tour — title (Cormorant), tagline, "n stops ·
  first–last year", and a tiny route sketch (stops as dots placed by real lat/lng in an
  Iceland-proportioned box, joined by a brass line). No emoji. Selecting starts the tour.
- **About**: `Dialog` (vellum): title, body, disclaimer, keyboard shortcuts, historic flags
  (`HistoricFlags`, title "Iceland's flags through history" in EN), author, correction + GitHub links,
  "Show the welcome card again".
- **Language**: `SegmentedControl` EN | ÍS with `lang` attributes.
- **Welcome placard** (first visit, `state.welcome`): vellum card, title + body (strings), primary
  "Start here" (starts tour `start-here`, subtitle from its title), secondary "Play everything" and
  "Surprise me", tertiary "Explore on my own". Never blocks the map; dismissed by any action
  (`setWelcome(false)` persists). Not shown on deep links.
- **Missing link toast** when `state.missingLinkId` is set.

### 4.2 Map — `components/map/` (+ `strings/map.ts`)
- **Markers**: one per `mapEvents` entry, **created once and diffed by id** — selection, hover,
  dimming toggle classes and `aria-pressed`, never rebuild. 28px seal (pigment fill `--type-*`, bone
  glyph via `glyphSvg`, 2px bone rim solid/dashed/dotted by confidence — use an SVG rim with
  `stroke-dasharray` for crisp segments), basalt halo. 44px invisible hit area on coarse pointers.
  States: hover/focus scale 1.12 + tooltip (name · year); selected scale 1.25 + brass ring + one
  700ms ember ripple; dimmed (off-route during a route) opacity .35 + desaturate; linked
  (`state.hoveredId`) brass halo. Route stops get a numbered brass badge.
- **Overlaps**: remove the spiderfier. Pixel-space clustering recomputed on `zoomend`: markers
  closer than ~0.8× their size merge into a count badge (ring tinted by member types). Click → fly to
  the bounds where members separate (cap z11); if they never separate (same site: Þingvellir,
  Reykjavík) open a place card listing them (year, name, seal). The selected event and route stops
  never cluster.
- **Fly-to**: `invalidateSize` via ResizeObserver. Centre the target in the visible rect from
  `getInsets()` (project/unproject offset). Zoom `clamp(current, 9, 11)`; 8 for
  `location_uncertain`; ≤ 8 on 1590. Target already visible → `panTo`. Duration
  `clamp(0.6 + km/500, 0.8, 1.6)`s. Reduced motion → `setView` without animation (and Leaflet
  `zoomAnimation/fadeAnimation/markerZoomAnimation` off). Respond to `fitRequest` (fit Iceland, or the
  route's stops while a route runs) and `focusRequest` (re-centre the selection).
- **Initial view**: fit Iceland land bounds to the visible rect (`zoomSnap: 0.25`), minZoom just
  below fit; widen maxBounds to `[[62.2,-28],[67.7,-10]]`.
- **Styles** (state.mapStyle): Satellite (default, `brightness(.92)`), Summer (drop the hue-rotate,
  `saturate(1.15) contrast(1.05)`, relief `maxNativeZoom: 10`), Parchment (sepia-tinted physical+relief,
  `maxNativeZoom: 10` — Esri has no Iceland relief tiles past ~z10), 1590 (Ortelius plate on
  `--basalt-950` with `--e3`, maxZoom 9). Glaciers: icy polygons as today (faded on satellite, hidden on
  1590); labels Cormorant italic 13px, from z7.
- **Controls**: right edge of the visible map — Fit Iceland, zoom ± (hidden on coarse pointers),
  Layers popover: map style as 4 thumbnail radio cards, "Clan strongholds (1200s)" switch, and when
  on, the clan legend (rows: shield swatch, name, battle count; click traces).
- **Clan layer**: seats as shield markers below events; traces draw arcs in clan colour over a
  vellum casing, fit to the trace, collapse the legend to "Tracing Sturlungar ✕". Sturlungar colour
  lightened (≈ `#3e5ba9`) to show over dark sea.
- **Route line**: while a route runs, a brass polyline (dark casing) joins the stops in order —
  solid up to the current stop, dashed ahead; stops numbered; other markers dimmed.
- **Empty state** when `filtered` is empty: small vellum card centred in the visible map with
  Clear filters.
- **Keyboard**: markers are focusable buttons (`role=button`, name "Name, Type, Year",
  `aria-pressed`); Enter/Space selects; focusing an off-screen marker pans to it. The Leaflet
  container gets `aria-label` = strings.map.aria.

### 4.3 Story — `components/story/` (+ `strings/story.ts`)
One component tree, two shells: **folio** (wide) and **bottom sheet** (compact; side sheet when
`short`). Only one is mounted. `aside` labelled by the title `h2`; sections are `h3`.

Order (skimmable in seconds, rewarding in depth):
1. **Masthead** — eyebrow `TYPE · period` (oxblood caps); title (Cormorant `--fs-title`); other-
   language name (Cormorant italic, `lang` set); a big year (`.t-year`) at the right; dateline
   `dateText · locationName` (+ "Location approximate" when flagged) — never `year` alone as "Year:";
   certainty line: `Pips` + confidence label + the one top caveat (`FLAG_PRIORITY`) — click scrolls to
   §6. A 3px rule in the type's pigment under the masthead.
2. **Lede** — legendary caveat strip when flagged; the full `summary` as the standfirst (16/26);
   an "Explain like I'm 12" toggle that swaps in `eli12` (not a separate box).
3. **At a glance** — a ledger, no box: Sides (two stacked with "vs"; one = "The struggle"),
   Outcome (`winner`), Human cost (`casualtyEstimate`), Key people (followable people are buttons:
   name + "Follow (n)" → `followPerson`).
4. **The story** — The human story (`humanDrama`, plain prose: no quote marks or attribution — the
   text sometimes contains real quotations), Why it happened, Why it matters, If this happened
   today (quiet aside, labelled "A modern analogy").
5. **Connections** — The chain of events: a vertical before → this → after mini-timeline with jump
   cards where `eventId` exists; See also (related, de-duplicated against before/after).
6. **How sure are we?** — pips + label + description, `confidenceNote`, flags split into
   Well established / Open questions with descriptions visible (not tooltips).
7. **Sources** — numbered, title + hostname, external-link icon; url-less entries go under "Notes on
   this entry".
8. **Footer** (sticky) — Earlier / Later (`earlier`/`later`, "← Name · year"); during a route it
   becomes the stepper: Previous stop · "Stop n of m" with clickable progress segments · Next stop;
   at the last stop "Finish route" → end card (recap, Start over, two suggested routes with least
   overlap). Share (navigator.share → clipboard + "Link copied" announced) and "Suggest a
   correction" (GitHub issue prefilled with the event id) live in the folio header/footer.
- **Route ribbon** at the top while a route runs: "Story route · {title}" or "Following · {name}",
  progress, ✕ End route.
- **Deep-link arrival** (`state.cameFromLink`): one line above the masthead — "One of 53 stories…
  See the whole map".
- Scroll resets to top on every new event. Opening by user action focuses the `h2` (`tabIndex=-1`);
  autoplay and routes never steal focus. Closing returns focus to the marker/tick that opened it.
- Folio: minimize to a title strip. Sheet: drag handle (button, `aria-expanded`), snap points,
  pointer-event drag with scroll hand-off at `scrollTop 0`, velocity fling, no scrim at peek/half,
  modal (`inert` behind) at full, closing during a route/autoplay collapses instead of exiting.
  Report the sheet's visible height with `setInset('sheet', 'bottom', px)`.
- Autoplay: shows the masthead + lede; doesn't steal focus.

### 4.4 Timeline — `components/timeline/` (+ `strings/timeline.ts`)
The instrument for travelling through time. One axis, never two scales.
- **Axis**: ordinal — every event in `timeline` gets an equal slot in chronological order (dense
  Sturlung decades get room; 875→1976 still reads left→right). Era bands (from `eras`) span the slots
  of their events, labelled with name + years; century marks where the century changes.
- **Ticks**: a tall thin tick per event in its pigment; solid/half/hollow by confidence; hover →
  tooltip (seal, name, year) + `setHovered`; selected → brass needle with year label above;
  out-of-range (year filter) ticks dimmed and `aria-disabled`.
- **Range brush**: two handles snapping to slot boundaries over the axis; dragging sets
  `setYearRange` (years of the first/last included events). `role=slider` with `aria-valuetext`.
- **Eras**: tabs "All eras · Saga Age · …" → `selectEra` (re-click = all years). Sturlung reveals
  clans (handled by the store).
- **Play**: round brass-ringed button (`aria-pressed`, stable name). While playing: "Playing 3 of 15"
  + a dwell progress line on the needle (static under reduced motion).
- **Keyboard**: the tick strip is one tab stop (`role=listbox`, roving tabindex): ←/→ move, Home/End,
  PgUp/PgDn by era, Enter selects.
- **Compact**: dock = [▶][era chips →] row + scrubber row; press-drag on the scrubber shows a bubble
  (seal, name, year) above the finger, release selects; tap selects nearest. Expand (⌃) opens a sheet
  with the year range and a chronological list (56px rows) — also the screen-reader-friendly path.
  Only the scrubber row while a story is open.
- Report `bottom` inset; set `--dock-h`.

## 5. Interaction rules
- **Escape** peels one layer (`useEscape`): popover/menu → modal → search text → expanded sheet →
  autoplay → route (keeps the stop open) → story.
- **Keys**: ←/→ = route stops, else Earlier/Later (handled by the store; widgets that own arrows add
  `data-own-arrows` or a listbox/slider role); `/` = search; Enter/Space on focused marker/tick.
- **Focus**: visible everywhere (token ring, dark halo over the map); never lost to `<body>`; use
  `aria-disabled` (not `disabled`) on controls that can hold focus.
- **Motion**: deliberate and short. Map flights per §4.2; panels slide 220–320ms `--ease-out`; one
  ripple on select; no loops, bounces or parallax. Everything collapses under reduced motion.
- **Announcements** (`announce()` / store): autoplay stops, route steps, result counts (store
  already does these), "Link copied", language change.
- **Touch**: ≥ 44×44 targets on coarse pointers; no horizontal page scroll at 320px.

## 6. The store (`useExplorer()`)
Data: `events`, `byId`, `filtered`, `timeline`, `mapEvents`, `selected`, `eras`, `activeEraId`,
`filtersActive`, `route` (`{title, tagline?, tour?, person?, stops}`), `routeIndex`, `playlist`,
`earlier`, `later`, `state` (`selectedId`, `selectSource`, `filters`, `search`, `showClans`,
`playing`, `dialog`, `mapStyle`, `fitRequest`, `focusRequest`, `hoveredId`, `welcome`,
`cameFromLink`, `missingLinkId`, `routeCursor`).

Actions: `select(id, source)`, `close`, `setTypes`, `toggleType`, `setConfidence`, `setYearRange`,
`setSearch`, `resetFilters`, `selectEra`, `setShowClans`, `startTour`, `followPerson`, `stepRoute`,
`goToStop`, `exitRoute`, `play`/`pause`/`togglePlay`, `stepChrono`, `surprise`, `openDialog`/
`closeDialog`, `setMapStyle`, `requestFit`, `requestFocus`, `setHovered`, `setWelcome`,
`dismissMissing`, `announce`. Helpers: `matchEvent`, `byYear`, `MIN_YEAR`/`MAX_YEAR`, `PLAY_DWELL_MS`.

## 7. Copy & i18n
- Every user-visible string lives in `src/i18n/strings/<area>.ts`, both languages, natural Icelandic.
- Icelandic declines names: never wrap a person's name in a phrase that needs a non-nominative case.
- Mark other-language fragments with `lang` (`lang="is"` on Icelandic names in English mode, etc.).
- Event content comes only from the data (`events`), never rewritten in components. No invented facts,
  quotations or images.

## 8. Ownership

| Area | Owns |
|---|---|
| Lead | `App.tsx`, `main.tsx`, `styles/*`, `components/ui/**`, `components/icons/**`, `state/**`, `i18n/{index,localize,ui}.ts`, `strings/common.ts`, `utils/**`, `types`, `data/**`, `vite.config.ts`, `index.html`, `package.json`, `docs/**`, `.claude/**` |
| Map | `components/map/**`, `strings/map.ts`, `src/oms-plugin.d.ts` + `utils/{oms,leafletGlobal}.ts` (delete when replaced) |
| Story | `components/story/**`, `strings/story.ts` |
| Timeline | `components/timeline/**`, `strings/timeline.ts` |
| Chrome | `components/chrome/**`, `strings/chrome.ts`, `strings/tours.ts` |

Need something outside your area (a new store action, a token, a primitive variant)? Report it to the
lead rather than editing.
