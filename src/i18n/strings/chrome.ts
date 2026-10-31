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
  };
  search: {
    placeholder: string;
    aria: string;
    clear: string;
    results: (n: number) => string;
    noResults: (q: string) => string;
    noResultsHint: string;
    showAllOnMap: (n: number) => string;
    matched: { person: string; place: string; side: string; alias: string; period: string };
  };
  filters: {
    button: string;
    title: string;
    type: string;
    allTypes: string;
    confidence: string;
    any: string;
    years: string;
    showing: (shown: number, total: number) => string;
    show: (n: number) => string;
    done: string;
    remove: (label: string) => string;
  };
  welcome: {
    title: string;
    body: (n: number) => string;
    startHere: string;
    play: string;
    surprise: string;
    explore: string;
    orClick: string;
    linkedIntro: (n: number) => string;
    seeWholeMap: string;
    showAgain: string;
  };
  about: {
    title: string;
    tagline: string;
    /** Body renders as {bodyStart}<strong>{bodyRoute}</strong>{bodyEnd}. */
    bodyStart: string;
    bodyRoute: string;
    bodyEnd: string;
    disclaimer: string;
    authorLabel: string;
    note: string;
    reportBtn: string;
    sourceBtn: string;
    shortcutsTitle: string;
    shortcuts: [keys: string, what: string][];
    flagsTitle: string;
    flagsAria: string;
    flags: Record<string, { name: string; years: string }>;
  };
  menu: { language: string; mapAndLayers: string };
}

const en: ChromeStrings = {
  header: {
    routes: 'Story routes',
    about: 'About',
    aboutTitle: 'About this map',
    menu: 'Menu',
    search: 'Search',
  },
  search: {
    placeholder: 'Search events, people, places',
    aria: 'Search events',
    clear: 'Clear search',
    results: (n) => `${n} ${enPick(n, 'result', 'results')}`,
    noResults: (q) => `No match for “${q}”.`,
    noResultsHint:
      'Try a person (Gissur), a place (Þingvellir) or a type (burning). Icelandic letters optional: “thingvellir” works.',
    showAllOnMap: (n) => `Show all ${n} on the map`,
    matched: { person: 'Person', place: 'Place', side: 'Side', alias: 'Also known as', period: 'Period' },
  },
  filters: {
    button: 'Filters',
    title: 'Filter the map',
    type: 'Type of event',
    allTypes: 'All types',
    confidence: 'How sure we are',
    any: 'Any',
    years: 'Years',
    showing: (shown, total) => `Showing ${shown} of ${total} events`,
    show: (n) => `Show ${n} ${enPick(n, 'event', 'events')}`,
    done: 'Done',
    remove: (label) => `Remove filter: ${label}`,
  },
  welcome: {
    title: 'A thousand years of feuds, fire and bad decisions',
    body: (n) =>
      `${n} stories from Iceland's bloodiest history, pinned where they happened — each with how sure historians are.`,
    startHere: 'Start here',
    play: 'Play everything, oldest first',
    surprise: 'Surprise me',
    explore: 'Explore on my own',
    orClick: 'or just click any marker',
    linkedIntro: (n) => `One of ${n} stories on a map of Iceland's violent history.`,
    seeWholeMap: 'See the whole map',
    showAgain: 'Show the welcome card again',
  },
  about: {
    title: 'Sagas of Blood & Fire',
    tagline: "An interactive map of Iceland's violent history.",
    bodyStart:
      "An interactive map of Iceland's messiest historical conflicts — battles, raids, burnings and feuds from the Saga Age through the Sturlung civil war and into modern times. Each marker carries a plain-language summary, why it happened, why it matters, a confidence rating and its sources. Use the eras and timeline to travel through the centuries, or pick a ",
    bodyRoute: 'story route',
    bodyEnd: ' for a guided tour.',
    disclaimer:
      'Some saga-era locations and casualty numbers are approximate. Every event shows a confidence rating and its sources.',
    authorLabel: 'Author',
    note: "History is messy and the sources often disagree — some saga-era locations and casualty numbers are approximate, which is why every event shows a confidence level and links to its sources. Spotted a mistake or have an event to suggest? I'd love to hear it.",
    reportBtn: 'Report a correction or suggest a source',
    sourceBtn: 'Source code on GitHub',
    shortcutsTitle: 'Keyboard shortcuts',
    shortcuts: [
      ['/', 'Search'],
      ['← →', 'Earlier or later event — or the next stop on a route'],
      ['Esc', 'Step back: close, pause, leave a route'],
      ['Enter', 'Open the focused event'],
    ],
    flagsTitle: "Iceland's flags through history",
    flagsAria: 'Historic banners of Iceland',
    flags: {
      stockfish: { name: 'Þorskmerkið — the crowned stockfish (old arms of Iceland)', years: 'to 1903' },
      hvitblainn: { name: 'Hvítbláinn — the white-and-blue', years: '1897' },
      falcon: { name: 'Fálkafáninn — the white falcon', years: '1903–1918' },
      modern: { name: 'The current flag of Iceland', years: 'since 1915' },
    },
  },
  menu: { language: 'Language', mapAndLayers: 'Map style and layers' },
};

const is: ChromeStrings = {
  header: {
    routes: 'Söguleiðir',
    about: 'Um vefinn',
    aboutTitle: 'Um þetta kort',
    menu: 'Valmynd',
    search: 'Leita',
  },
  search: {
    placeholder: 'Leita að atburðum, fólki, stöðum',
    aria: 'Leita í atburðum',
    clear: 'Hreinsa leit',
    results: (n) => `${n} ${isPick(n, 'niðurstaða', 'niðurstöður')}`,
    noResults: (q) => `Ekkert fannst fyrir „${q}“.`,
    noResultsHint:
      'Prófaðu manneskju (Gissur), stað (Þingvellir) eða tegund (brenna). Íslenskir stafir eru valfrjálsir: „thingvellir“ virkar líka.',
    showAllOnMap: (n) => `Sýna alla ${n} á kortinu`,
    matched: { person: 'Persóna', place: 'Staður', side: 'Fylking', alias: 'Einnig nefnt', period: 'Tímabil' },
  },
  filters: {
    button: 'Síur',
    title: 'Sía kortið',
    type: 'Tegund atburðar',
    allTypes: 'Allar tegundir',
    confidence: 'Áreiðanleiki',
    any: 'Allt',
    years: 'Ártöl',
    showing: (shown, total) => `Sýni ${shown} af ${total} atburðum`,
    show: (n) => `Sýna ${n} ${isPick(n, 'atburð', 'atburði')}`,
    done: 'Lokið',
    remove: (label) => `Fjarlægja síu: ${label}`,
  },
  welcome: {
    title: 'Þúsund ár af deilum, eldi og slæmum ákvörðunum',
    body: (n) =>
      `${n} ${isPick(n, 'saga', 'sögur')} úr blóðugustu köflum Íslandssögunnar, ${isPick(n, 'merkt', 'merktar')} á kortið þar sem þær gerðust — ásamt mati á því hversu vissir sagnfræðingar eru.`,
    startHere: 'Byrjaðu hér',
    play: 'Spila allt, elst fyrst',
    surprise: 'Komdu mér á óvart',
    explore: 'Skoða á eigin vegum',
    orClick: 'eða smelltu bara á eitthvert merki',
    linkedIntro: (n) => `Ein af ${n} sögum á korti af blóðugri sögu Íslands.`,
    seeWholeMap: 'Sjá allt kortið',
    showAgain: 'Sýna kynninguna aftur',
  },
  about: {
    title: 'Sögur af blóði og eldi',
    tagline: 'Gagnvirkt kort af blóðugri sögu Íslands.',
    bodyStart:
      'Gagnvirkt kort af róstusamustu köflum Íslandssögunnar — bardögum, ránum, brennum og ættardeilum frá söguöld gegnum Sturlungaöld og fram á okkar daga. Hverju merki fylgir stutt samantekt á mannamáli, skýring á orsökum og afleiðingum, áreiðanleikamat og heimildir. Notaðu tímabilin og tímalínuna til að ferðast milli alda, eða veldu ',
    bodyRoute: 'söguleið',
    bodyEnd: ' og láttu leiða þig.',
    disclaimer:
      'Sumar staðsetningar og mannfallstölur frá söguöld eru áætlaðar. Hverjum atburði fylgir áreiðanleikamat og heimildir.',
    authorLabel: 'Höfundur',
    note: 'Sagan er flókin og heimildum ber ekki alltaf saman — sumar staðsetningar og mannfallstölur frá söguöld eru áætlaðar, og þess vegna fylgir hverjum atburði áreiðanleikamat og heimildatenglar. Sástu villu eða viltu stinga upp á atburði? Ábendingar eru vel þegnar.',
    reportBtn: 'Senda leiðréttingu eða benda á heimild',
    sourceBtn: 'Frumkóði á GitHub',
    shortcutsTitle: 'Flýtilyklar',
    shortcuts: [
      ['/', 'Leit'],
      ['← →', 'Fyrri eða síðari atburður — eða næsta stopp á söguleið'],
      ['Esc', 'Til baka: loka, gera hlé, hætta í leið'],
      ['Enter', 'Opna valinn atburð'],
    ],
    flagsTitle: 'Fánar Íslands',
    flagsAria: 'Sögulegir fánar Íslands',
    flags: {
      stockfish: { name: 'Þorskmerkið — krýndur flattur þorskur (eldra merki Íslands)', years: 'til 1903' },
      hvitblainn: { name: 'Hvítbláinn — hvíti og blái fáninn', years: '1897' },
      falcon: { name: 'Fálkafáninn — hvíti fálkinn', years: '1903–1918' },
      modern: { name: 'Núverandi fáni Íslands', years: 'frá 1915' },
    },
  },
  menu: { language: 'Tungumál', mapAndLayers: 'Kortastíll og lög' },
};

export const chrome = { en, is };
