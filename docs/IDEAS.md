# Ideas from similar history-map projects

*Researched July 2026. A survey of interactive history maps built for other countries, filtered
through this project's core idea: **"Icelandic history for people who normally don't care about
Icelandic history."** Every idea below is judged by one question: does it lower the barrier for
someone who wouldn't otherwise engage?*

---

## The landscape — who else has built this

| Project | Country | What it is | The one thing it does best |
|---|---|---|---|
| [Icelandic Saga Map](https://sagamap.hi.is/en/) | Iceland | Academic map of every place named in the Íslendingasögur | Text ↔ map linking: hover a place name in the saga text, it lights up on the map |
| [Animated Battle Maps](https://www.battlefields.org/learn/maps/animated-battle-maps) (American Battlefield Trust) | USA | Narrated video + map animations of battles | Troop movements played out in phases with a narrator; 20M+ views |
| [Chronas](https://chronas.org/) | World | Wikipedia-linked world map with a year slider, 2000 years of borders | Drag the slider, watch realms grow and die |
| [American Panorama](https://dsl.richmond.edu/panorama/) | USA | Digital historical atlas (Stamen + U. Richmond) | "Maps made in the 21st century" — movement animated as flows, not dots |
| [SlaveVoyages](https://www.slavevoyages.org/blog/digital-mapping-and-slavevoyages) | Transatlantic | Database + animated map of slave-ship voyages | One dataset, presented with total gravity; animated ship paths |
| [Topotijdreis](https://www.topotijdreis.nl/) | Netherlands | 200 years of georeferenced topo maps on a year slider | Time travel as a toy — 13.5M tile requests/hour on launch day |
| [Ngā Tapuwae](https://ngatapuwae.govt.nz/) | New Zealand | WWI heritage trails with audio, personal stories | Designed for both on-the-ground walking *and* couch exploration |
| [Witches of Scotland map](https://www.ed.ac.uk/information-services/about/news/2019/interactive-witchcraft-map) | Scotland | 3,000+ accused witches mapped: residence, detention, execution | One dark dataset → international press (Smithsonian, Big Think). Built by a student intern in 3 months |
| [Bomb Sight](https://bombsight.org/) | UK | Every recorded Blitz bomb on a map of London | Density as shock — the map IS the argument |
| [Layers of London](https://www.layersoflondon.org/) | UK | Georeferenced historic map overlays + crowdsourced records | Sliding a 1945 bomb-damage map over today's streets |

---

## Ideas worth stealing

Grouped by theme. Each has a rough effort tag (S/M/L) and a note on how it lands here.

### 1. People as through-lines — "the Gissur filter" (S–M) ⭐

**Seen at:** SlaveVoyages (individual voyage records), Witches of Scotland (named people with fates).

The most engaging unit of history for a non-history-person is not an event — it's a person having
a terrible decade. We already store `keyPeople` on every event. Gissur Þorvaldsson alone threads
through six events (Apavatn → Örlygsstaðir → Snorri's cellar → Flugumýri → the earldom → Gamli
sáttmáli). Selecting a person could dim everything except their events and draw their path in
order. The Sturlung age becomes a followable soap opera: pick a character, watch their arc.
Mostly UI work — the data already exists.

### 2. A "play" button — autoplay through the centuries (S–M) ⭐

**Seen at:** Topotijdreis (play button through 200 years of maps), Chronas (year slider).

Topotijdreis became a national toy because you press play and *watch*. We have a timeline and
fly-to already; an autoplay mode that walks chronologically event-to-event (fly, linger with the
one-liner, move on) turns the whole site into a ~10-minute ambient documentary. Zero new content
required. Perfectly couch-friendly — the exact user we target does not want to click 52 times.

### 3. Animated routes for the events that MOVE (M) ⭐

**Seen at:** SlaveVoyages (animated ship paths), American Panorama (migration flows), Battlefield Trust (troop arrows).

Several of our events are journeys flattened into a single pin: the corsair fleet sweeping the
Eastfjords then falling on Heimaey (Tyrkjaránið), Þórður kakali's fishing-boat fleet at Flóabardagi,
Kári hunting the burners across countries, Ingólfur chasing the thralls to the islands. An animated
polyline drawing itself across the satellite map (with a ship glyph) would be the single most
shareable thing on the site. Build one generic "route player," then routes become data.

### 4. One historic map as an overlay — the 1590 Ortelius "Islandia" (M) ⭐

**Seen at:** Layers of London (bomb-damage overlay), Topotijdreis (era basemaps).

We already have parchment/summer/satellite styles. The Ortelius *Islandia* map (public domain,
crawling with sea monsters) is the most famous image of Iceland ever printed. As a fourth style —
or a semi-transparent "lens" over the modern map — it puts real 16th-century cartography behind
our real events. A distorted old map won't georeference cleanly; treat it as atmosphere (corner-pinned,
best-fit), not as navigation. The sea monsters are a hook for exactly the audience that "doesn't care
about history."

### 5. Text ↔ map linking inside event stories (S) 

**Seen at:** Icelandic Saga Map — its killer feature: place names in the text highlight on the map.

Our summaries mention Bergþórshvoll, Drangey, Skálholt… as dead text. Make place names in event
panels clickable → the map flies there. We did this for *events* (story-context links); extend it
to *places*. Small scope: a `places` lookup + a link component.

### 6. The "quiet horror" dataset page (M, content-heavy)

**Seen at:** Witches of Scotland, Bomb Sight.

Both prove that a single grim, well-bounded dataset — every accused witch, every bomb — earns
attention no essay can. Our equivalent already half-exists: Drekkingarhylur (18+ drowned women,
names in court records) and the Stóridómur executions generally. A layer or dedicated view that
plots *individually named* victims (name, year, "crime," fate) would be the most powerful thing
on the map — and the Witches map shows a lone builder can do it. Content research is the real
cost (fits the existing ChatGPT-research → Claude-writes workflow).

### 7. Road-trip mode (M)

**Seen at:** Ngā Tapuwae ("follow in their footsteps" — explicitly built for travellers *and*
armchair users).

Many of our markers are literal roadside stops: Þingvellir, Skálholt, Kakalaskáli's stone army at
Kringlumýri, Hlíðarendi's church, Drangey tours. A mode that orders visible events along a drive
(Ring Road / Golden Circle / Westfjords) with "20 min from Selfoss" hints reframes the site as a
travel companion. Lesson from Ngā Tapuwae's retired app: **stay a website** — apps die, URLs don't.

### 8. Phase-by-phase battle chapters (L)

**Seen at:** American Battlefield Trust (their whole format).

For the two or three events with enough documented detail (Örlygsstaðir, Flugumýrarbrenna), a
"chapters" mode inside the event: each chapter pans/zooms the satellite map and advances the story
(the camp, the ambush at dawn, Sturla's stand, the aftermath). It's scrollytelling without video
production. High effort — do at most one as a flagship, see if anyone uses it.

### 9. Share cards per event (S)

**Seen at:** Battlefield Trust (education packs), general growth practice.

Every event should unfurl beautifully when a link is pasted into a chat: OG image with the event
name, year, one-line hook ("The bloodiest battle Iceland ever saw — ~110 dead"). Cheap, and it's
how a site like this actually spreads.

### 10. Lightweight corrections channel (S)

**Seen at:** Layers of London / HistoryPin (full crowdsourcing — too heavy for us), Chronas (wiki editing — moderation nightmare).

Full crowdsourcing is an anti-fit for a solo project. The 10% version: a "spot an error?" link
(GitHub issue / mailto) in the About modal. Icelanders *will* email corrections about their home
valley. That's free fact-checking.

---

## Anti-patterns — what NOT to copy

- **Breadth over depth (Chronas):** 50 million data points and none of them tell a story. Our 52
  hand-written events are the moat. Growing the count matters less than keeping every entry readable.
- **Scholar-first UI (Icelandic Saga Map):** our direct academic cousin is comprehensive and — for
  a casual visitor — impenetrable. It validates the niche: nobody has built the *approachable* one
  for Iceland. Tone is the product.
- **Native apps (Ngā Tapuwae):** the app was retired and its content had to be rescued into a
  national archive. The web version outlived it.
- **Layer soup (Layers of London):** dozens of overlays, most toggled by almost nobody. Every new
  layer must earn its place in the UI.

---

## Shortlist — where the leverage is

Ranked by (fit to "people who don't care") × (effort):

1. **Person through-lines** — data exists; unlocks the Sturlung soap opera. (S–M)
2. **Autoplay / play button** — the site becomes a lean-back documentary. (S–M)
3. **Animated corsair route for Tyrkjaránið** — the shareable showpiece; generalize later. (M)
4. **Ortelius 1590 map style** — instant personality, on-brand with the fantasy-chart aesthetic. (M)
5. **Share cards + clickable place names** — small, compounding quality/reach wins. (S)

*Sources are linked inline in the table above. Compiled from web research: EADH project pages,
battlefields.org, chronas.org, dsl.richmond.edu, slavevoyages.org, topotijdreis.nl (via Esri/Kadaster
write-ups), ngatapuwae.govt.nz, ed.ac.uk (witches map), bombsight.org, layersoflondon.org.*
