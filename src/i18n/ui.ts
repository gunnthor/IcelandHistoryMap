import { EventType, Confidence, UncertaintyFlag } from '../types';

// ── UI chrome strings ──
// Everything the interface says that isn't event content. Two philosophies at
// work: strings the components used to hardcode live here in full for both
// languages; strings that already have an English home in a config object
// (EVENT_CONFIG labels, ERAS, MAP_STYLE_META, TOURS) are *overlays* here —
// empty for English, full for Icelandic — and components fall back to the
// config when the overlay has no entry. That keeps English canonical in one
// place and Icelandic canonical in another, never duplicated.
//
// Event content (summaries, names, sources…) is NOT here — see
// src/data/events.is.ts for that overlay.

export interface UIStrings {
  header: {
    title: string;
    subtitle: string;
    /** The collapsible first word of the routes button (hidden on narrow screens). */
    routesOptional: string;
    routesRest: string;
    aboutWord: string;
    aboutTitle: string;
  };
  search: { placeholder: string; aria: string; clear: string };
  filters: {
    era: string;
    type: string;
    allTypes: string;
    confidence: string;
    all: string;
    reset: string;
    resetTitle: string;
    events: (n: number) => string;
  };
  /** Overlay over ERAS (utils/eventConfig); keyed by era id. */
  eras: Record<string, { label: string; hint: string }>;
  /** Overlay over EVENT_CONFIG labels. */
  types: Partial<Record<EventType, string>>;
  /** Overlay over CONFIDENCE_CONFIG; `badge` is the full card-badge text. */
  confidence: Partial<Record<Confidence, { label: string; badge: string; description: string }>>;
  /** Overlay over FLAG_CONFIG. */
  flags: Partial<Record<UncertaintyFlag, { label: string; description: string }>>;
  panel: {
    placeholderTitle: string;
    placeholderBody: string;
    share: string;
    copied: string;
    shareTitle: string;
    shareAria: string;
    close: string;
    closeAria: string;
    year: string;
    period: string;
    location: string;
    whatHappened: string;
    eli12: string;
    drama: string;
    whoFought: string;
    vs: string;
    whyHappened: string;
    modern: string;
    winner: string;
    casualties: string;
    whyMatters: string;
    context: string;
    before: string;
    after: string;
    related: string;
    confNote: string;
    keyPeople: string;
    sources: string;
  };
  timeline: {
    idle: string;
    playTitle: string;
    pauseTitle: string;
    playAria: string;
    pauseAria: string;
    playing: (year: number, name: string, pos: number, total: number) => string;
    startYear: string;
    endYear: string;
  };
  map: {
    clanToggle: string;
    clanToggleTitle: string;
    legendHint: string;
    noBattles: (clan: string) => string;
    trace: (clan: string) => string;
    emptyTitle: string;
    emptyBody: string;
    resetBtn: string;
    disclaimer: string;
    styleAria: string;
    /** Overlay over MAP_STYLE_META; keyed by style id. */
    styles: Record<string, { label: string; hint: string }>;
    approx: string;
  };
  tours: {
    pickerTitle: string;
    pickerTagline: string;
    stops: (n: number) => string;
    prev: string;
    next: string;
    exit: string;
    exitTitle: string;
    /** Overlay over TOURS titles/taglines; keyed by tour id. */
    content: Record<string, { title: string; tagline: string }>;
  };
  about: {
    title: string;
    tagline: string;
    /** Body renders as {bodyStart}<strong>{bodyRoute}</strong>{bodyEnd}. */
    bodyStart: string;
    bodyRoute: string;
    bodyEnd: string;
    authorLabel: string;
    note: string;
    reportBtn: string;
    sourceBtn: string;
    flagsAria: string;
    /** Overlay over the FLAGS cartouche defs; keyed by flag id. */
    flags: Record<string, { name: string; years: string }>;
  };
  doc: {
    siteTitle: string;
    eventTitle: (name: string) => string;
  };
  lang: { groupAria: string; enTitle: string; isTitle: string };
}

const en: UIStrings = {
  header: {
    title: '⚔ Sagas of Blood & Fire',
    subtitle: "An interactive map of Iceland's violent history.",
    routesOptional: 'Story ',
    routesRest: 'Routes',
    aboutWord: ' About',
    aboutTitle: 'About this site',
  },
  search: {
    placeholder: 'Search events, people, places…',
    aria: 'Search events',
    clear: 'Clear search',
  },
  filters: {
    era: 'Era',
    type: 'Type',
    allTypes: 'All types',
    confidence: 'Confidence',
    all: 'All',
    reset: '↺ Reset',
    resetTitle: 'Clear all filters',
    events: (n) => `${n} event${n !== 1 ? 's' : ''}`,
  },
  eras: {},
  types: {},
  confidence: {},
  flags: {},
  panel: {
    placeholderTitle: 'Select an event',
    placeholderBody: 'Click any marker on the map to read about a battle, raid, or other conflict.',
    share: '🔗 Share',
    copied: '✓ Copied',
    shareTitle: 'Copy link to this event',
    shareAria: 'Share this event',
    close: 'Close',
    closeAria: 'Close panel',
    year: 'Year',
    period: 'Period',
    location: 'Location',
    whatHappened: 'What happened',
    eli12: "🧒 Explain like I'm 12",
    drama: '🎭 The drama',
    whoFought: 'Who fought who',
    vs: 'vs',
    whyHappened: 'Why it happened',
    modern: '📱 If this happened today',
    winner: 'Winner:',
    casualties: 'Casualties:',
    whyMatters: 'Why it matters',
    context: '📖 The story around it',
    before: 'Before this',
    after: 'After this',
    related: 'Related',
    confNote: '🎯 How sure are we?',
    keyPeople: 'Key people',
    sources: 'Sources',
  },
  timeline: {
    idle: 'Timeline — click an event to jump to it, or press play',
    playTitle: 'Play through every event, oldest to newest',
    pauseTitle: 'Pause',
    playAria: 'Play through every event in order',
    pauseAria: 'Pause the history autoplay',
    playing: (year, name, pos, total) =>
      `Playing — ${year}: ${name}${pos > 0 ? ` (${pos} of ${total})` : ''}`,
    startYear: 'Start year',
    endYear: 'End year',
  },
  map: {
    clanToggle: '⚑ Clan seats',
    clanToggleTitle: 'Show the seats of the great chieftain families',
    legendHint: 'Click a family to trace its wars',
    noBattles: (clan) => `${clan}: no battles in this dataset`,
    trace: (clan) => `Trace ${clan} conflicts`,
    emptyTitle: 'No events match your filters',
    emptyBody: 'Try widening the year range or clearing the filters.',
    resetBtn: 'Reset filters',
    disclaimer:
      '⚠️ Some saga-era locations and casualty numbers are approximate. This app shows confidence levels and sources for each event.',
    styleAria: 'Map style',
    styles: {},
    approx: '⚠ Location approximate',
  },
  tours: {
    pickerTitle: '🧭 Story Routes',
    pickerTagline: "Don't browse — be led. Pick a route and we'll walk you through it, stop by stop.",
    stops: (n) => `${n} stops`,
    prev: '← Prev',
    next: 'Next →',
    exit: '✕ Exit',
    exitTitle: 'Exit route',
    content: {},
  },
  about: {
    title: '⚔ Sagas of Blood & Fire',
    tagline: "An interactive map of Iceland's violent history.",
    bodyStart:
      "An interactive map of Iceland's messiest historical conflicts — battles, raids, burnings and feuds from the Saga Age through the Sturlung civil war and into modern times. Each marker carries a plain-language summary, why it happened, why it matters, a confidence rating and its sources. Use the era presets and timeline to travel through the centuries, or pick a ",
    bodyRoute: 'Story Route',
    bodyEnd: ' for a guided tour.',
    authorLabel: 'Author',
    note:
      "History is messy and the sources often disagree — some saga-era locations and casualty numbers are approximate, which is why every event shows a confidence level and links to its sources. Spotted a mistake or have an event to suggest? I'd love to hear it.",
    reportBtn: '✎ Report correction / suggest source',
    sourceBtn: '⌥ Source on GitHub',
    flagsAria: 'Historic banners of Iceland',
    flags: {},
  },
  doc: {
    siteTitle: "Sagas of Blood & Fire — Iceland's violent history, mapped",
    eventTitle: (name) => `${name} — Sagas of Blood & Fire`,
  },
  lang: { groupAria: 'Language', enTitle: 'English', isTitle: 'Íslenska' },
};

const is: UIStrings = {
  header: {
    title: '⚔ Sögur af blóði og eldi',
    subtitle: 'Gagnvirkt kort af blóðugri sögu Íslands.',
    // Unsplit: the header button's flex gap would cleave the compound word.
    routesOptional: '',
    routesRest: 'Söguleiðir',
    aboutWord: ' Um vefinn',
    aboutTitle: 'Um þennan vef',
  },
  search: {
    placeholder: 'Leita að atburðum, fólki, stöðum…',
    aria: 'Leita í atburðum',
    clear: 'Hreinsa leit',
  },
  filters: {
    era: 'Tímabil',
    type: 'Tegund',
    allTypes: 'Allar tegundir',
    confidence: 'Áreiðanleiki',
    all: 'Allt',
    reset: '↺ Núllstilla',
    resetTitle: 'Hreinsa allar síur',
    // Icelandic plural: numbers ending in 1 (except 11) take the singular.
    events: (n) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'atburður' : 'atburðir'}`,
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
    high: {
      label: 'Traust',
      badge: 'Traustar heimildir',
      description: 'Vel skjalfest í frumheimildum',
    },
    medium: {
      label: 'Miðlungs',
      badge: 'Heimildir í meðallagi',
      description: 'Skjalfest en sum atriði óviss',
    },
    low: {
      label: 'Óvisst',
      badge: 'Óvissar heimildir',
      description: 'Þarfnast frekari heimildarýni',
    },
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
      description: 'Frásögnin kann að vera þjóðsaga fremur en sagnfræði — staðirnir eru til, atburðarásin er ósannreynanleg.',
    },
  },
  panel: {
    placeholderTitle: 'Veldu atburð',
    placeholderBody: 'Smelltu á merki á kortinu til að lesa um bardaga, rán eða önnur átök.',
    share: '🔗 Deila',
    copied: '✓ Afritað',
    shareTitle: 'Afrita hlekk á þennan atburð',
    shareAria: 'Deila þessum atburði',
    close: 'Loka',
    closeAria: 'Loka spjaldinu',
    year: 'Ártal',
    period: 'Tímabil',
    location: 'Staður',
    whatHappened: 'Hvað gerðist',
    eli12: '🧒 Útskýrt fyrir 12 ára',
    drama: '🎭 Dramað',
    whoFought: 'Hverjir börðust',
    vs: 'gegn',
    whyHappened: 'Af hverju gerðist þetta',
    modern: '📱 Ef þetta gerðist í dag',
    winner: 'Sigurvegari:',
    casualties: 'Mannfall:',
    whyMatters: 'Af hverju það skiptir máli',
    context: '📖 Sagan í kring',
    before: 'Á undan',
    after: 'Á eftir',
    related: 'Tengt',
    confNote: '🎯 Hversu viss erum við?',
    keyPeople: 'Lykilfólk',
    sources: 'Heimildir',
  },
  timeline: {
    idle: 'Tímalína — smelltu á atburð til að hoppa á hann, eða ýttu á spilun',
    playTitle: 'Spila alla atburði, frá þeim elsta til hins yngsta',
    pauseTitle: 'Gera hlé',
    playAria: 'Spila alla atburði í tímaröð',
    pauseAria: 'Stöðva sjálfvirka spilun',
    playing: (year, name, pos, total) =>
      `Í spilun — ${year}: ${name}${pos > 0 ? ` (${pos} af ${total})` : ''}`,
    startYear: 'Upphafsár',
    endYear: 'Lokaár',
  },
  map: {
    clanToggle: '⚑ Ættarsetur',
    clanToggleTitle: 'Sýna höfuðból helstu höfðingjaætta',
    legendHint: 'Smelltu á ætt til að rekja átök hennar',
    noBattles: (clan) => `${clan}: engir bardagar í gagnasafninu`,
    trace: (clan) => `Rekja átök: ${clan}`,
    emptyTitle: 'Engir atburðir passa við síurnar',
    emptyBody: 'Prófaðu að víkka ártalsbilið eða hreinsa síurnar.',
    resetBtn: 'Núllstilla síur',
    disclaimer:
      '⚠️ Sumar staðsetningar og mannfallstölur frá söguöld eru áætlaðar. Vefurinn sýnir áreiðanleikamat og heimildir fyrir hvern atburð.',
    styleAria: 'Kortastíll',
    styles: {
      parchment: { label: 'Bókfell', hint: 'Gamla ævintýrakortið' },
      summer: { label: 'Sumar', hint: 'Ísland í hásumri: grænt láglendi, brún öræfi' },
      satellite: { label: 'Gervitungl', hint: 'Ísland eins og það er, séð úr geimnum' },
      ortelius: { label: '1590', hint: 'Íslandskort Orteliusar — með sjóskrímslum og öllu' },
    },
    approx: '⚠ Staðsetning áætluð',
  },
  tours: {
    pickerTitle: '🧭 Söguleiðir',
    pickerTagline:
      'Slepptu því að vafra — láttu leiða þig. Veldu leið og við göngum hana með þér, stopp fyrir stopp.',
    stops: (n) => `${n} stopp`,
    prev: '← Til baka',
    next: 'Áfram →',
    exit: '✕ Hætta',
    exitTitle: 'Hætta í leiðinni',
    content: {
      'start-here': {
        title: 'Byrjaðu hér: 7 atburðir sem útskýra Ísland',
        tagline:
          'Þjóðarsagan öll í sjö stoppum — kristnitaka, borgarastyrjöld, einokun og fiskurinn sem vann.',
      },
      'saga-revenge': {
        title: 'Hefndarleið sögualdar',
        tagline:
          'Heiður, móðganir og stigmögnun: hvernig eitt óleyfilegt hestlán eða veginn þræll varð að ættardeilum heilla kynslóða.',
      },
      'sturlung-speedrun': {
        title: 'Sturlungaöld á hraðferð',
        tagline:
          'Ísland rífur sig í sundur á hálfri öld — svik, brennur og örlagarík miskunnsemi sem réð úrslitum.',
      },
      disasters: {
        title: 'Sjóræningjar, plágur og hraun',
        tagline:
          'Þúsund ár af hamförum: hraunflóð, horfin sveit, pláguskip, ránsflotar og gosið sem svelti þjóðina.',
      },
      'most-brutal': {
        title: 'Grimmustu atburðirnir',
        tagline:
          'Það allra versta — fjöldavíg, húsbrennur og ríkisvald sem drekkti eigin þegnum. Ekki leið fyrir viðkvæma.',
      },
      'near-reykjavik': {
        title: 'Atburðir nálægt Reykjavík',
        tagline:
          'Á leið í höfuðborgina? Þúsund ára drama í dagsferðafjarlægð — Þingvellir meðtaldir.',
      },
      'probably-legends': {
        title: 'Líklega þjóðsögur',
        tagline:
          'Atburðirnir sem sagnfræðingar taka með fyrirvara: óvissar sögur þar sem staðirnir eru til en atburðarásin kannski ekki.',
      },
    },
  },
  about: {
    title: '⚔ Sögur af blóði og eldi',
    tagline: 'Gagnvirkt kort af blóðugri sögu Íslands.',
    bodyStart:
      'Gagnvirkt kort af róstusamustu köflum Íslandssögunnar — bardögum, ránum, brennum og ættardeilum frá söguöld gegnum Sturlungaöld og fram á okkar daga. Hverju merki fylgir stutt samantekt á mannamáli, skýring á orsökum og afleiðingum, áreiðanleikamat og heimildir. Notaðu tímabilin og tímalínuna til að ferðast milli alda, eða veldu ',
    bodyRoute: 'Söguleið',
    bodyEnd: ' og láttu leiða þig.',
    authorLabel: 'Höfundur',
    note:
      'Sagan er flókin og heimildum ber ekki alltaf saman — sumar staðsetningar og mannfallstölur frá söguöld eru áætlaðar, og þess vegna fylgir hverjum atburði áreiðanleikamat og heimildatenglar. Sástu villu eða viltu stinga upp á atburði? Ábendingar eru vel þegnar.',
    reportBtn: '✎ Senda leiðréttingu / benda á heimild',
    sourceBtn: '⌥ Frumkóði á GitHub',
    flagsAria: 'Sögulegir fánar Íslands',
    flags: {
      stockfish: {
        name: 'Þorskmerkið — krýndur flattur þorskur (eldra merki Íslands)',
        years: 'til 1903',
      },
      hvitblainn: { name: 'Hvítbláinn — hvíti og blái fáninn', years: '1897' },
      falcon: { name: 'Fálkafáninn — hvíti fálkinn', years: '1903–1918' },
      modern: { name: 'Núverandi fáni Íslands', years: 'frá 1915' },
    },
  },
  doc: {
    siteTitle: 'Sögur af blóði og eldi — blóðug saga Íslands á korti',
    eventTitle: (name) => `${name} — Sögur af blóði og eldi`,
  },
  lang: { groupAria: 'Tungumál', enTitle: 'English', isTitle: 'Íslenska' },
};

export const UI: Record<'en' | 'is', UIStrings> = { en, is };
