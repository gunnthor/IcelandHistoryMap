# Sagas of Blood & Fire

*(formerly Battle Map of Iceland)*

An interactive map of Iceland's messiest historical conflicts — history for people with low patience for history.

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Project structure

The interface is a full-bleed map with everything else floating over it. The
design system and the contract between regions are documented in
[`docs/DESIGN.md`](docs/DESIGN.md).

```
src/
├── components/
│   ├── map/        # Leaflet stage: event seals, clusters, camera, layers, clan seats, route lines
│   ├── story/      # The event story: desktop folio, landscape side sheet, mobile bottom sheet
│   ├── timeline/   # Time dock: eras, ordinal rail with range brush, autoplay, mobile scrubber
│   ├── chrome/     # Command bar, search, filters, story routes, about, welcome card
│   ├── ui/         # Primitives: Button, IconButton, SegmentedControl, Popover, Dialog
│   └── icons/      # SVG icon set + the event-type glyphs (shared by React and Leaflet)
├── state/          # The explorer store (useExplorer), layout insets, Escape stack, people index
├── styles/         # Design tokens, base styles, self-hosted fonts
├── i18n/           # EN/ÍS: one strings file per area under strings/, event overlay loader
├── data/
│   ├── events.ts   # ← Add new events here
│   └── events.is.ts # Icelandic text for each event (loaded lazily)
├── types/          # ConflictEvent and FilterState types
└── utils/
    └── eventConfig.ts # Type pigments, confidence steps, eras
```

## Adding a new event

Open `src/data/events.ts` and add a new object to the `events` array following the `ConflictEvent` type:

```ts
{
  id: 'unique-id',           // kebab-case, lowercase
  name: 'English Name',
  icelandicName: 'Íslenskt nafn',   // optional
  year: 1400,
  dateText: 'Summer 1400',          // optional, shown instead of bare year
  period: 'Describe the era',
  type: 'battle',                   // see EventType in src/types/index.ts
  locationName: 'Place name, Region',
  coordinates: [65.0, -18.5],       // [latitude, longitude]
  factions: ['Side A', 'Side B'],
  keyPeople: ['Person One', 'Person Two'],
  winner: 'Side A',                 // optional
  casualtyEstimate: '~50 killed',   // optional
  summary: 'One paragraph, plain language.',
  eli12: 'Explain like I\'m 12.',
  whyItHappened: 'Root causes.',
  whyItMatters: 'Historical significance.',
  confidence: 'high',               // 'high' | 'medium' | 'low'
  sources: [
    { title: 'Source name', url: 'https://...' },
  ],
},
```

## Correcting coordinates

Each event has a `coordinates: [lat, lng]` field. To find coordinates:

1. Open [Google Maps](https://maps.google.com) or [OpenStreetMap](https://openstreetmap.org)
2. Right-click the location → copy coordinates
3. Update the `coordinates` field in `src/data/events.ts`
4. If accuracy is uncertain, set `confidence: 'low'` or `'medium'`

Saga-era events often have uncertain exact locations. Use the closest known modern place as a placeholder and note it in `locationName`.

> The timeline range and year sliders are derived automatically from the data
> (`getYearBounds` in `src/utils/eventConfig.ts`), so adding an event outside the
> current range just works — no constants to update.

## Event types

Each type has a pigment (`EVENT_CONFIG` in `src/utils/eventConfig.ts`, mirrored as
`--type-*` in `src/styles/tokens.css`) and an SVG glyph (`TYPE_GLYPHS` in
`src/components/icons/paths.ts`). A new type needs both, plus a label in
`src/i18n/strings/common.ts` in both languages.

| Type         | Glyph           | Use for                                          |
|--------------|-----------------|--------------------------------------------------|
| `battle`     | crossed swords  | Organized land battles                           |
| `sea_battle` | sailboat        | Naval / fjord / bay engagements                  |
| `raid`       | double chevron  | Raids, abductions, guerrilla attacks             |
| `burning`    | flame           | Arson attacks on farms or buildings              |
| `massacre`   | struck tally    | Mass killings                                    |
| `killing`    | sword           | A targeted slaying (víg)                         |
| `feud`       | axe             | Long-running kin or clan conflicts               |
| `execution`  | gallows         | Judicial or political executions                 |
| `political`  | scales          | Conversions, oaths, riots, trade wars            |
| `occupation` | planted flag    | Sieges, occupations, takeovers                   |
| `eruption`   | volcano         | Volcanic eruptions                               |
| `plague`     | skull           | Epidemics                                        |
| `disaster`   | hazard triangle | Man-made catastrophes: poisonings, wrecks        |

## Confidence levels

- **high** — well-documented in primary sources (sagas, chronicles, annals)
- **medium** — documented but some details (location, date, casualties) uncertain
- **low** — mentioned in sources but needs further verification; use for placeholder events

## Keyboard shortcuts

- **/** — search
- **← / →** — previous / next stop on a story route, otherwise the earlier / later event
- **Esc** — step back one layer: close a popover, clear the search, pause autoplay,
  leave a route (the current stop stays open), close the story
- **Tab** reaches the map markers and the timeline as single stops; arrow keys move
  within them and **Enter** opens an event

Every event has a shareable URL, `/event/<id>` (legacy `#event=<id>` links still work).

## Suggested next features

- **Share cards** — a per-event Open Graph image for link previews
- **Clickable place names** — place names in a story fly the map there
- **Animated routes** — the corsair fleet's path for Tyrkjaránið, drawn on the map
- **Photo/illustration** — an optional, properly licensed `image` field on `ConflictEvent`

## Deployment

The app is a static Vite SPA, so any static host works. It's deployed on
**Vercel** (zero-config: framework `Vite`, build `npm run build`, output `dist`)
and served at **https://map.gunnthor.is**. Pushing to `main` triggers a new
production deploy when the GitHub integration is connected.

If the site ever moves domains again, change `SITE_URL` in `vite.config.ts` —
it's the only place the origin is baked in (canonical tags, OG URLs, and
`sitemap.xml`).

## License

MIT — see [LICENSE](LICENSE). Historical content is compiled from public
sources (linked per event); please verify details before reuse.
- **Nearby events** — show "also in this region" list in the event panel
- **Export** — let users download event data as CSV or JSON
- **Translations** — add Icelandic UI translation (i18n)
