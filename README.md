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

```
src/
├── components/
│   ├── BattleMap.tsx     # Leaflet map + markers
│   ├── EventPanel.tsx    # Desktop sidebar + mobile bottom drawer
│   ├── FilterBar.tsx     # Type/confidence filter chips
│   ├── Timeline.tsx      # Horizontal timeline + year-range sliders
│   ├── SearchBar.tsx     # Name/person/location search
│   └── TourBanner.tsx    # "Start Here" guided tour banner
├── data/
│   └── events.ts         # ← Add new events here
├── types/
│   └── index.ts          # ConflictEvent and FilterState types
├── utils/
│   └── eventConfig.ts    # Icon symbols, colors per event type
└── App.tsx               # State, layout, filter logic
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

| Type         | Symbol | Use for                                     |
|--------------|--------|---------------------------------------------|
| `battle`     | ⚔      | Organized land battles                      |
| `sea_battle` | ⚓      | Naval / fjord / bay engagements             |
| `raid`       | ⚡      | Raids, abductions, guerrilla attacks        |
| `burning`    | 🔥      | Arson attacks on farms or buildings         |
| `execution`  | ☩      | Political or judicial killings              |
| `occupation` | ⚑      | Sieges, occupations, takeovers              |
| `other`      | ?      | Anything that doesn't fit the above         |

## Confidence levels

- **high** — well-documented in primary sources (sagas, chronicles, annals)
- **medium** — documented but some details (location, date, casualties) uncertain
- **low** — mentioned in sources but needs further verification; use for placeholder events

## Keyboard shortcuts

- **Esc** — close the event panel, or exit the "Start Here" tour
- **← / →** — step backward/forward while the tour is active
- **Tab + Enter/Space** — focus and open map markers and timeline events
- Selecting an event updates the URL hash (`#event=<id>`) so you can share a
  direct link to any event.

## Suggested next features

- **Wikipedia integration** — auto-fetch a summary when a Wikipedia URL is in sources
- **More events** — Commonwealth-era feuds and 13th-century raids
- **Photo/illustration** — add an optional `imageUrl` field to `ConflictEvent`
- **Cluster markers** — use Leaflet.markercluster for when many events overlap

## Deployment

The app is a static Vite SPA, so any static host works. It's deployed on
**Vercel** (zero-config: framework `Vite`, build `npm run build`, output `dist`).
Pushing to `main` triggers a new production deploy when the GitHub integration
is connected.

## License

MIT — see [LICENSE](LICENSE). Historical content is compiled from public
sources (linked per event); please verify details before reuse.
- **Nearby events** — show "also in this region" list in the event panel
- **Export** — let users download event data as CSV or JSON
- **Translations** — add Icelandic UI translation (i18n)
