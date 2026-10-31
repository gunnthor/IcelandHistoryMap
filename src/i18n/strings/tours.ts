import { enPick, isPick } from './plural';

// Story routes — curated tours and "follow this person" routes share one
// stepper, so they share their vocabulary too. Owned by the chrome area.
//
// `content` is an OVERLAY over the English titles/taglines in
// src/data/tours.ts: empty for English, full for Icelandic. The validator
// checks UI.is.tours.content against TOURS, so keep this key path.

export interface ToursStrings {
  pickerTitle: string;
  pickerTagline: string;
  stops: (n: number) => string;
  /** "Stop 2 of 7" */
  stopOf: (n: number, total: number) => string;
  start: string;
  next: string;
  prev: string;
  exit: string;
  finish: string;
  endTitle: string;
  endBody: string;
  startOver: string;
  tryAnother: string;
  routeLabel: string;
  /** Person routes. Names stay in the nominative: Icelandic declines names
   *  by case, so never wrap them in a phrase that needs another case. */
  follow: string;
  followAria: (name: string, n: number) => string;
  followingLabel: string;
  personEvents: (name: string, n: number) => string;
  content: Record<string, { title: string; tagline: string }>;
}

const en: ToursStrings = {
  pickerTitle: 'Story routes',
  pickerTagline: "Don't browse — be led. Pick a route and we'll walk you through it, stop by stop.",
  stops: (n) => `${n} ${enPick(n, 'stop', 'stops')}`,
  stopOf: (n, total) => `Stop ${n} of ${total}`,
  start: 'Start the route',
  next: 'Next stop',
  prev: 'Previous stop',
  exit: 'End route',
  finish: 'Finish route',
  endTitle: 'End of the route',
  endBody: 'Where next?',
  startOver: 'Start over',
  tryAnother: 'Try another route',
  routeLabel: 'Story route',
  follow: 'Follow',
  followAria: (name, n) => `Follow ${name} through ${n} events`,
  followingLabel: 'Following',
  personEvents: (name, n) => `${name} appears in ${n} ${enPick(n, 'event', 'events')}`,
  content: {},
};

const is: ToursStrings = {
  pickerTitle: 'Söguleiðir',
  pickerTagline:
    'Slepptu því að vafra — láttu leiða þig. Veldu leið og við göngum hana með þér, stopp fyrir stopp.',
  stops: (n) => `${n} stopp`,
  stopOf: (n, total) => `Stopp ${n} af ${total}`,
  start: 'Hefja leiðina',
  next: 'Næsta stopp',
  prev: 'Fyrra stopp',
  exit: 'Hætta í leiðinni',
  finish: 'Ljúka leiðinni',
  endTitle: 'Leiðarlok',
  endBody: 'Hvert næst?',
  startOver: 'Byrja aftur',
  tryAnother: 'Prófaðu aðra leið',
  routeLabel: 'Söguleið',
  follow: 'Rekja feril',
  followAria: (name, n) => `Rekja feril: ${name} (${n} ${isPick(n, 'atburður', 'atburðir')})`,
  followingLabel: 'Ferill',
  personEvents: (name, n) =>
    `${name} kemur við sögu í ${n} ${isPick(n, 'atburði', 'atburðum')}`,
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
};

export const tours = { en, is };
