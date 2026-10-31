// The story folio (desktop) and story sheet (mobile). Owned by the story
// area. Labels follow docs/DESIGN.md §Story; no emoji in labels.

export interface StoryStrings {
  close: string;
  closeAria: string;
  minimize: string;
  expand: string;
  readFull: string;
  showOnMap: string;
  share: string;
  shareAria: string;
  linkCopied: string;
  locationApprox: string;
  eli12: string;
  eli12Back: string;
  atAGlance: string;
  sides: string;
  vs: string;
  struggle: string;
  outcome: string;
  humanCost: string;
  keyPeople: string;
  humanStory: string;
  whyHappened: string;
  whyMatters: string;
  modernTitle: string;
  modernNote: string;
  chain: string;
  before: string;
  after: string;
  thisEvent: string;
  seeAlso: string;
  howSure: string;
  established: string;
  openQuestions: string;
  notes: string;
  sources: string;
  earlier: string;
  later: string;
  spotError: string;
  suggestCorrection: string;
  confidenceAria: (label: string) => string;
}

const en: StoryStrings = {
  close: 'Close',
  closeAria: 'Close the story',
  minimize: 'Minimize',
  expand: 'Expand',
  readFull: 'Read the full story',
  showOnMap: 'Show on map',
  share: 'Share',
  shareAria: 'Share a link to this event',
  linkCopied: 'Link copied',
  locationApprox: 'Location approximate',
  eli12: "Explain like I'm 12",
  eli12Back: 'Back to the full version',
  atAGlance: 'At a glance',
  sides: 'Sides',
  vs: 'vs',
  struggle: 'The struggle',
  outcome: 'Outcome',
  humanCost: 'Human cost',
  keyPeople: 'Key people',
  humanStory: 'The human story',
  whyHappened: 'Why it happened',
  whyMatters: 'Why it matters',
  modernTitle: 'If this happened today',
  modernNote: 'A modern analogy',
  chain: 'The chain of events',
  before: 'Before this',
  after: 'After this',
  thisEvent: 'This event',
  seeAlso: 'See also',
  howSure: 'How sure are we?',
  established: 'Well established',
  openQuestions: 'Open questions',
  notes: 'Notes on this entry',
  sources: 'Sources',
  earlier: 'Earlier',
  later: 'Later',
  spotError: 'Spot an error in this entry?',
  suggestCorrection: 'Suggest a correction',
  confidenceAria: (label) => `Confidence: ${label}`,
};

const is: StoryStrings = {
  close: 'Loka',
  closeAria: 'Loka sögunni',
  minimize: 'Minnka',
  expand: 'Stækka',
  readFull: 'Lesa alla söguna',
  showOnMap: 'Sýna á korti',
  share: 'Deila',
  shareAria: 'Deila hlekk á þennan atburð',
  linkCopied: 'Hlekkur afritaður',
  locationApprox: 'Staðsetning áætluð',
  eli12: 'Útskýrt fyrir 12 ára',
  eli12Back: 'Aftur í fulla útgáfu',
  atAGlance: 'Í stuttu máli',
  sides: 'Fylkingar',
  vs: 'gegn',
  struggle: 'Viðureignin',
  outcome: 'Úrslit',
  humanCost: 'Mannfall',
  keyPeople: 'Lykilfólk',
  humanStory: 'Mannlegi þátturinn',
  whyHappened: 'Af hverju gerðist þetta?',
  whyMatters: 'Af hverju það skiptir máli',
  modernTitle: 'Ef þetta gerðist í dag',
  modernNote: 'Samlíking úr nútímanum',
  chain: 'Atburðarásin',
  before: 'Á undan',
  after: 'Á eftir',
  thisEvent: 'Þessi atburður',
  seeAlso: 'Sjá einnig',
  howSure: 'Hversu viss erum við?',
  established: 'Vel staðfest',
  openQuestions: 'Óvissuþættir',
  notes: 'Athugasemdir um færsluna',
  sources: 'Heimildir',
  earlier: 'Fyrr',
  later: 'Síðar',
  spotError: 'Sástu villu í þessari færslu?',
  suggestCorrection: 'Senda leiðréttingu',
  confidenceAria: (label) => `Áreiðanleiki: ${label}`,
};

export const story = { en, is };
