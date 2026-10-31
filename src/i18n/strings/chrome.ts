import { enPick, isPick } from './plural';

// The command surfaces: top bar, search, filters, welcome card, about,
// mobile menu. Owned by the chrome area.

export interface ChromeStrings {
  header: {
    routes: string;
    about: string;
    aboutTitle: string;
    menu: string;
    search: string;
    /** Announced (in the new language) after a language switch. */
    langChanged: string;
  };
  search: {
    placeholder: string;
    /** Phones: the field is narrower. */
    placeholderShort: string;
    aria: string;
    clear: string;
    close: string;
    /** Title on the "/" hint chip. */
    shortcutHint: string;
    resultsLabel: string;
    results: (n: number) => string;
    noResults: (q: string) => string;
    noResultsHint: string;
    showAllOnMap: (n: number) => string;
    /** Results hidden by the year range: "3 more outside 1180–1264". */
    outsideYears: (n: number, range: string) => string;
    allYears: string;
    tryLabel: string;
    /** Tappable example queries for the empty phone search view. Each must
     *  match something in both languages (search ignores accents). */
    suggestions: string[];
    otherName: string;
    matched: { person: string; place: string; side: string; alias: string; period: string; type: string };
  };
  filters: {
    button: string;
    /** Visually hidden after the badge: "Filters, 2 active". */
    activeCount: (n: number) => string;
    title: string;
    type: string;
    allTypes: string;
    confidence: string;
    any: string;
    years: string;
    yearsHint: string;
    allYears: string;
    showing: (shown: number, total: number) => string;
    show: (n: number) => string;
    done: string;
    remove: (label: string) => string;
    tokensLabel: string;
  };
  welcome: {
    regionLabel: string;
    title: string;
    body: (n: number) => string;
    startHere: string;
    play: string;
    /** Phones: the same action, shorter. */
    playShort: string;
    surprise: string;
    explore: string;
    orClick: string;
    dismiss: string;
    linkedIntro: (n: number) => string;
    seeWholeMap: string;
    showAgain: string;
  };
  about: {
    title: string;
    tagline: string;
    /** Body renders as {bodyStart}<button>{bodyRoute}</button>{bodyEnd}. */
    bodyStart: string;
    bodyRoute: string;
    bodyEnd: string;
    disclaimer: string;
    authorLabel: string;
    feedback: string;
    reportBtn: string;
    sourceBtn: string;
    shortcutsTitle: string;
    /** Keys are split on spaces, one key cap each. */
    shortcuts: [keys: string, what: string][];
    flagsTitle: string;
    /** name = the flag's Icelandic name (always shown in Icelandic);
     *  gloss = what it is, in the UI language. */
    flags: Record<string, { name: string; gloss: string; years: string }>;
  };
  menu: {
    title: string;
    language: string;
    mapAndLayers: string;
    correction: string;
    github: string;
  };
}

const en: ChromeStrings = {
  header: {
    routes: 'Story routes',
    about: 'About',
    aboutTitle: 'About this map',
    menu: 'Menu',
    search: 'Search',
    langChanged: 'English selected',
  },
  search: {
    placeholder: 'Search events, people, places',
    placeholderShort: 'Search people, places',
    aria: 'Search events',
    clear: 'Clear search',
    close: 'Close search',
    shortcutHint: 'Press / to search',
    resultsLabel: 'Search results',
    results: (n) => `${n} ${enPick(n, 'result', 'results')}`,
    noResults: (q) => `No match for “${q}”.`,
    noResultsHint:
      'Try a person (Gissur), a place (Þingvellir) or a word like “burning”. Icelandic letters are optional: “thingvellir” works.',
    showAllOnMap: (n) => (n === 1 ? 'Show it on the map' : `Show all ${n} on the map`),
    outsideYears: (n, range) => `${n} more outside ${range}`,
    allYears: 'Search all years',
    tryLabel: 'Try',
    suggestions: ['Gissur', 'Þingvellir', 'Snorri', 'Skagafjörður', 'Hekla'],
    otherName: 'Also called',
    matched: { person: 'Person', place: 'Place', side: 'Side', alias: 'Also known as', period: 'Period', type: 'Type' },
  },
  filters: {
    button: 'Filters',
    activeCount: (n) => `${n} active`,
    title: 'Filter the map',
    type: 'Type of event',
    allTypes: 'All types',
    confidence: 'How sure we are',
    any: 'Any',
    years: 'Years',
    yearsHint: 'Drag the handles on the timeline to narrow the years.',
    allYears: 'All years',
    showing: (shown, total) => `Showing ${shown} of ${total} events`,
    show: (n) => `Show ${n} ${enPick(n, 'event', 'events')}`,
    done: 'Done',
    remove: (label) => `Remove filter: ${label}`,
    tokensLabel: 'Active filters',
  },
  welcome: {
    regionLabel: 'Welcome',
    title: 'A thousand years of feuds, fire and bad decisions',
    body: (n) =>
      `${n} stories from Iceland's bloodiest history, pinned where they happened — each with how sure historians are.`,
    startHere: 'Start here',
    play: 'Play everything, oldest first',
    playShort: 'Play all',
    surprise: 'Surprise me',
    explore: 'Explore on my own',
    orClick: 'or just click any marker',
    dismiss: 'Dismiss',
    linkedIntro: (n) => `One of ${n} stories on a map of Iceland's violent history.`,
    seeWholeMap: 'See the whole map',
    showAgain: 'Show the welcome card again',
  },
  about: {
    title: 'Sagas of Blood & Fire',
    tagline: "An interactive map of Iceland's violent history.",
    bodyStart:
      "Iceland's messiest historical conflicts — battles, raids, burnings and feuds from the Saga Age through the Sturlung civil war and into modern times. Each marker carries a plain-language summary, why it happened, why it matters, a confidence rating and its sources. Use the eras and the timeline to travel through the centuries, or pick a ",
    bodyRoute: 'story route',
    bodyEnd: ' for a guided tour.',
    disclaimer:
      'History is messy and the sources often disagree. Some saga-era locations and casualty numbers are approximate, which is why every event shows how sure we are and links to its sources.',
    authorLabel: 'Made by',
    feedback: "Spotted a mistake, or have an event or a source to suggest? I'd love to hear it.",
    reportBtn: 'Report a correction',
    sourceBtn: 'Source code on GitHub',
    shortcutsTitle: 'Keyboard shortcuts',
    shortcuts: [
      ['/', 'Search'],
      ['← →', 'Earlier or later event — or the next stop on a route'],
      ['Esc', 'Step back: close, pause, leave a route'],
      ['Tab', 'Reach the map markers or the timeline, then ← → to move between events'],
      ['Enter', 'Open the focused event'],
    ],
    flagsTitle: "Iceland's flags through history",
    flags: {
      stockfish: { name: 'Þorskmerkið', gloss: 'The crowned stockfish, old arms of Iceland', years: 'to 1903' },
      hvitblainn: { name: 'Hvítbláinn', gloss: 'The white-and-blue', years: '1897' },
      falcon: { name: 'Fálkafáninn', gloss: 'The white falcon', years: '1903–1918' },
      modern: { name: 'Þjóðfáninn', gloss: 'The national flag today', years: 'since 1915' },
    },
  },
  menu: {
    title: 'Menu',
    language: 'Language',
    mapAndLayers: 'Map style and layers',
    correction: 'Suggest a correction',
    github: 'Source code on GitHub',
  },
};

const is: ChromeStrings = {
  header: {
    routes: 'Söguleiðir',
    about: 'Um vefinn',
    aboutTitle: 'Um þetta kort',
    menu: 'Valmynd',
    search: 'Leita',
    langChanged: 'Íslenska valin',
  },
  search: {
    placeholder: 'Leita að atburðum, fólki, stöðum',
    placeholderShort: 'Leita að fólki, stöðum',
    aria: 'Leita í atburðum',
    clear: 'Hreinsa leit',
    close: 'Loka leit',
    shortcutHint: 'Ýttu á / til að leita',
    resultsLabel: 'Leitarniðurstöður',
    results: (n) => `${n} ${isPick(n, 'niðurstaða', 'niðurstöður')}`,
    noResults: (q) => `Ekkert fannst fyrir „${q}“.`,
    noResultsHint:
      'Prófaðu manneskju (Gissur), stað (Þingvellir) eða orð eins og „brenna“. Íslenskir stafir eru valfrjálsir: „thingvellir“ virkar líka.',
    showAllOnMap: (n) => (n === 1 ? 'Sýna á kortinu' : `Sýna alla ${n} á kortinu`),
    outsideYears: (n, range) => `${n} til viðbótar utan tímabilsins ${range}`,
    allYears: 'Leita á öllu tímabilinu',
    tryLabel: 'Prófaðu',
    suggestions: ['Gissur', 'Þingvellir', 'Snorri', 'Hekla', 'brenna'],
    otherName: 'Einnig nefnt',
    matched: { person: 'Persóna', place: 'Staður', side: 'Fylking', alias: 'Einnig nefnt', period: 'Tímabil', type: 'Tegund' },
  },
  filters: {
    button: 'Síur',
    activeCount: (n) => `${n} ${isPick(n, 'virk', 'virkar')}`,
    title: 'Sía kortið',
    type: 'Tegund atburðar',
    allTypes: 'Allar tegundir',
    confidence: 'Hversu viss við erum',
    any: 'Allt',
    years: 'Ártöl',
    yearsHint: 'Dragðu handföngin á tímalínunni til að þrengja tímabilið.',
    allYears: 'Öll ár',
    showing: (shown, total) => `Sýni ${shown} af ${total} atburðum`,
    show: (n) => `Sýna ${n} ${isPick(n, 'atburð', 'atburði')}`,
    done: 'Lokið',
    remove: (label) => `Fjarlægja síu: ${label}`,
    tokensLabel: 'Virkar síur',
  },
  welcome: {
    regionLabel: 'Velkomin',
    title: 'Þúsund ár af deilum, eldi og slæmum ákvörðunum',
    body: (n) =>
      `${n} ${isPick(n, 'saga', 'sögur')} úr blóðugustu köflum Íslandssögunnar, ${isPick(n, 'merkt', 'merktar')} á kortið þar sem þær gerðust — ásamt mati á því hversu vissir sagnfræðingar eru.`,
    startHere: 'Byrjaðu hér',
    play: 'Spila allt, elst fyrst',
    playShort: 'Spila allt',
    surprise: 'Komdu mér á óvart',
    explore: 'Skoða á eigin vegum',
    orClick: 'eða smelltu bara á eitthvert merki',
    dismiss: 'Loka',
    linkedIntro: (n) => `Ein af ${n} sögum á korti af blóðugri sögu Íslands.`,
    seeWholeMap: 'Sjá allt kortið',
    showAgain: 'Sýna kynninguna aftur',
  },
  about: {
    title: 'Sögur af blóði og eldi',
    tagline: 'Gagnvirkt kort af blóðugri sögu Íslands.',
    bodyStart:
      'Róstusömustu kaflar Íslandssögunnar — bardagar, rán, brennur og ættardeilur frá söguöld gegnum Sturlungaöld og fram á okkar daga. Hverju merki fylgir stutt samantekt á mannamáli, skýring á orsökum og afleiðingum, áreiðanleikamat og heimildir. Notaðu tímabilin og tímalínuna til að ferðast milli alda, eða veldu ',
    bodyRoute: 'söguleið',
    bodyEnd: ' og láttu leiða þig.',
    disclaimer:
      'Sagan er flókin og heimildum ber ekki alltaf saman. Sumar staðsetningar og mannfallstölur frá söguöld eru áætlaðar, og þess vegna fylgir hverjum atburði mat á því hversu viss við erum, ásamt heimildum.',
    authorLabel: 'Höfundur',
    feedback: 'Sástu villu, eða viltu benda á atburð eða heimild? Ábendingar eru vel þegnar.',
    reportBtn: 'Senda leiðréttingu',
    sourceBtn: 'Frumkóði á GitHub',
    shortcutsTitle: 'Flýtilyklar',
    shortcuts: [
      ['/', 'Leit'],
      ['← →', 'Fyrri eða síðari atburður — eða næsta stopp á söguleið'],
      ['Esc', 'Til baka: loka, gera hlé, hætta í leið'],
      ['Tab', 'Fara í kortamerkin eða tímalínuna, svo ← → á milli atburða'],
      ['Enter', 'Opna valinn atburð'],
    ],
    flagsTitle: 'Fánar Íslands í aldanna rás',
    flags: {
      stockfish: { name: 'Þorskmerkið', gloss: 'Krýndur, flattur þorskur — eldra merki Íslands', years: 'til 1903' },
      hvitblainn: { name: 'Hvítbláinn', gloss: 'Hvíti og blái fáninn', years: '1897' },
      falcon: { name: 'Fálkafáninn', gloss: 'Hvíti fálkinn', years: '1903–1918' },
      modern: { name: 'Þjóðfáninn', gloss: 'Fáni Íslands í dag', years: 'frá 1915' },
    },
  },
  menu: {
    title: 'Valmynd',
    language: 'Tungumál',
    mapAndLayers: 'Kortastíll og lög',
    correction: 'Senda leiðréttingu',
    github: 'Frumkóði á GitHub',
  },
};

export const chrome = { en, is };
