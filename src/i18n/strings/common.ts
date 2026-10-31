import { EventType, Confidence, UncertaintyFlag } from '../../types';
import { enPick, isPick } from './plural';

// Shared vocabulary: brand, generic actions, document title, language,
// and the names of the data's own categories (types, confidence, flags,
// eras). Owned by the lead — area-specific copy lives in its area's file.

export interface CommonStrings {
  brand: {
    /** The wordmark renders as {a} <em>{amp}</em> {b}. */
    a: string;
    amp: string;
    b: string;
    full: string;
    tagline: string;
  };
  close: string;
  back: string;
  clearAll: string;
  showAllIceland: string;
  opensNewTab: string;
  eventCount: (n: number) => string;
  /** "15 of 53 events" */
  shownOf: (shown: number, total: number) => string;
  missingEvent: string;
  doc: { siteTitle: string; eventTitle: (name: string) => string };
  lang: { groupAria: string; en: string; is: string; shortEn: string; shortIs: string };
  skip: { map: string; story: string; timeline: string };
  announce: {
    results: (shown: number, total: number) => string;
    opened: (name: string, year: number) => string;
  };
}

export interface CategoryStrings {
  types: Record<EventType, string>;
  /** label = filter/badge text; description = what the rating means. */
  confidence: Record<Confidence, { label: string; description: string }>;
  flags: Record<UncertaintyFlag, { label: string; description: string }>;
  /** Keyed by era id (see ERAS in utils/eventConfig). The validator checks
   *  the Icelandic keys against ERAS, so keep ids in sync. */
  eras: Record<string, { label: string; hint: string }>;
}

const en: CommonStrings & CategoryStrings = {
  brand: {
    a: 'Sagas of Blood',
    amp: '&',
    b: 'Fire',
    full: 'Sagas of Blood & Fire',
    tagline: "Iceland's violent history, mapped",
  },
  close: 'Close',
  back: 'Back',
  clearAll: 'Clear all',
  showAllIceland: 'Show all of Iceland',
  opensNewTab: '(opens in a new tab)',
  eventCount: (n) => `${n} ${enPick(n, 'event', 'events')}`,
  shownOf: (shown, total) => `${shown} of ${total} ${enPick(total, 'event', 'events')}`,
  missingEvent: "We couldn't find that event, so here's the whole map.",
  doc: {
    siteTitle: "Sagas of Blood & Fire — Iceland's violent history, mapped",
    eventTitle: (name) => `${name} — Sagas of Blood & Fire`,
  },
  lang: { groupAria: 'Language', en: 'English', is: 'Íslenska', shortEn: 'EN', shortIs: 'ÍS' },
  skip: { map: 'Skip to the map', story: 'Skip to the story', timeline: 'Skip to the timeline' },
  announce: {
    results: (shown, total) => `Showing ${shown} of ${total} events`,
    opened: (name, year) => `${name}, ${year}`,
  },
  types: {
    battle: 'Battle',
    sea_battle: 'Sea battle',
    raid: 'Raid',
    burning: 'Burning',
    massacre: 'Massacre',
    killing: 'Killing',
    feud: 'Feud',
    execution: 'Execution',
    political: 'Political',
    occupation: 'Occupation',
    eruption: 'Eruption',
    plague: 'Plague',
  },
  confidence: {
    high: { label: 'Well documented', description: 'Well documented in primary sources' },
    medium: { label: 'Some doubt', description: 'Documented, but some details are uncertain' },
    low: { label: 'Uncertain', description: 'Thin sources — needs more verification' },
  },
  flags: {
    event_likely: {
      label: 'Event likely happened',
      description: 'The core event is accepted as historical, even if the details are debated.',
    },
    saga_dramatized: {
      label: 'Saga account dramatized',
      description: 'Known mainly through saga literature, which polishes, compresses and dramatizes.',
    },
    location_uncertain: {
      label: 'Location approximate',
      description: 'The map marker is a best guess — the exact site is unverified or representative.',
    },
    date_uncertain: {
      label: 'Date uncertain',
      description: 'The year is traditional, approximate, or debated between sources.',
    },
    legendary: {
      label: 'Legend or folklore',
      description: 'The story may be legend more than history — real places, unverifiable plot.',
    },
  },
  eras: {
    saga: { label: 'Saga Age', hint: 'Settlement and the classic saga feuds (c. 870–1130)' },
    sturlung: {
      label: 'Sturlung Age',
      hint: 'Civil war of the great chieftain families (c. 1220–1264) — clan seats shown',
    },
    'late-medieval': { label: 'Late Medieval', hint: 'Norwegian and early Danish rule (1264–1540)' },
    danish: { label: 'Danish Rule', hint: 'Reformation to sovereignty (1540–1918)' },
    modern: { label: 'Modern', hint: 'Republic and the World Wars (1918 onward)' },
  },
};

const is: CommonStrings & CategoryStrings = {
  brand: {
    a: 'Sögur af blóði',
    amp: 'og',
    b: 'eldi',
    full: 'Sögur af blóði og eldi',
    tagline: 'Blóðug saga Íslands á korti',
  },
  close: 'Loka',
  back: 'Til baka',
  clearAll: 'Hreinsa allt',
  showAllIceland: 'Sýna allt Ísland',
  opensNewTab: '(opnast í nýjum flipa)',
  eventCount: (n) => `${n} ${isPick(n, 'atburður', 'atburðir')}`,
  shownOf: (shown, total) => `${shown} af ${total}`,
  missingEvent: 'Atburðurinn fannst ekki — hér er allt kortið.',
  doc: {
    siteTitle: 'Sögur af blóði og eldi — blóðug saga Íslands á korti',
    eventTitle: (name) => `${name} — Sögur af blóði og eldi`,
  },
  lang: { groupAria: 'Tungumál', en: 'English', is: 'Íslenska', shortEn: 'EN', shortIs: 'ÍS' },
  skip: { map: 'Fara í kortið', story: 'Fara í söguna', timeline: 'Fara í tímalínuna' },
  announce: {
    results: (shown, total) => `Sýni ${shown} af ${total} atburðum`,
    opened: (name, year) => `${name}, ${year}`,
  },
  types: {
    battle: 'Bardagi',
    sea_battle: 'Sjóorrusta',
    raid: 'Árás',
    burning: 'Brenna',
    massacre: 'Fjöldavíg',
    killing: 'Víg',
    feud: 'Ættardeilur',
    execution: 'Aftaka',
    political: 'Stjórnmál',
    occupation: 'Hernám',
    eruption: 'Eldgos',
    plague: 'Farsótt',
  },
  confidence: {
    high: { label: 'Vel skjalfest', description: 'Vel skjalfest í frumheimildum' },
    medium: { label: 'Nokkur óvissa', description: 'Skjalfest en sum atriði óviss' },
    low: { label: 'Óvisst', description: 'Rýrar heimildir — þarfnast frekari heimildarýni' },
  },
  flags: {
    event_likely: {
      label: 'Atburðurinn líklega sannur',
      description: 'Kjarnaatburðurinn er almennt talinn sögulegur þótt deilt sé um einstök atriði.',
    },
    saga_dramatized: {
      label: 'Fært í stílinn í sögu',
      description: 'Þekkt einkum úr sagnaritum, sem fegra, þjappa og færa í stílinn.',
    },
    location_uncertain: {
      label: 'Staðsetning áætluð',
      description: 'Merkið er besta ágiskun — nákvæmur staður er óstaðfestur eða táknrænn.',
    },
    date_uncertain: {
      label: 'Ártal óvisst',
      description: 'Ártalið er hefðbundið, áætlað eða heimildum ber ekki saman.',
    },
    legendary: {
      label: 'Þjóðsaga / munnmæli',
      description:
        'Frásögnin kann að vera þjóðsaga fremur en sagnfræði — staðirnir eru til, atburðarásin er ósannreynanleg.',
    },
  },
  eras: {
    saga: { label: 'Söguöld', hint: 'Landnámið og frægustu deilur Íslendingasagna (um 870–1130)' },
    sturlung: {
      label: 'Sturlungaöld',
      hint: 'Borgarastyrjöld höfðingjaættanna (um 1220–1264) — ættarsetur sýnd',
    },
    'late-medieval': { label: 'Síðmiðaldir', hint: 'Norsk og síðar dönsk yfirráð (1264–1540)' },
    danish: { label: 'Dönsk yfirráð', hint: 'Frá siðaskiptum til fullveldis (1540–1918)' },
    modern: { label: 'Nútími', hint: 'Lýðveldið og heimsstyrjaldirnar (frá 1918)' },
  },
};

export const common = { en, is };
