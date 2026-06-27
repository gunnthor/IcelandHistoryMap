import { PowerCenter } from '../types';

// Seats and strongholds of the great chieftain families of the Commonwealth /
// Sturlung Age. Coordinates verified against gazetteers where possible; the
// ones marked `approximate: true` use the right farm/district but were not
// pinned to a precise survey point.
export const powerCenters: PowerCenter[] = [
  // ── Sturlungar ──
  {
    id: 'hvammur-dalir',
    name: 'Hvammur í Dölum',
    clan: 'sturlungar',
    coordinates: [65.217, -21.767],
    role: 'Ancestral seat',
    description:
      'Cradle of the Sturlungar and home of Hvamm-Sturla Þórðarson, father of Snorri, Sighvatur and Þórður. Earlier still, the landnám farm of Auður djúpúðga.',
    sources: [
      { title: 'Wikipedia: Sturlungar', url: 'https://is.wikipedia.org/wiki/Sturlungar' },
      { title: 'Áfangar: Hvammur í Dölum', url: 'https://afangar.com/fornsogur/hvammur/' },
    ],
  },
  {
    id: 'reykholt-sturlungar',
    name: 'Reykholt',
    clan: 'sturlungar',
    coordinates: [64.6631, -21.2928],
    role: "Snorri's estate",
    description:
      "Snorri Sturluson's farm and writing-place, where he composed much of his work — and where Gissur Þorvaldsson's men killed him in 1241.",
    sources: [
      {
        title: 'Wikipedia: Snorri Sturluson',
        url: 'https://en.wikipedia.org/wiki/Snorri_Sturluson',
      },
    ],
  },
  {
    id: 'saudafell-sturlungar',
    name: 'Sauðafell',
    clan: 'sturlungar',
    coordinates: [65.06, -21.68],
    role: "Sighvatur's Dalir seat",
    description:
      "Sighvatur Sturluson's stronghold in the Dalir before he moved north; raided in the 1229 Sauðafellsför.",
    sources: [
      {
        title: 'Wikipedia: Sturla Sighvatsson',
        url: 'https://en.wikipedia.org/wiki/Sturla_Sighvatsson',
      },
    ],
  },
  {
    id: 'grund-sturlungar',
    name: 'Grund í Eyjafirði',
    clan: 'sturlungar',
    coordinates: [65.52, -18.15],
    role: 'Northern outpost',
    approximate: true,
    description:
      "Sighvatur Sturluson's seat after he moved north — the springboard for Sturlungar power across Eyjafjörður and Skagafjörður, and why so many battles were fought up there.",
    sources: [
      { title: 'Wikipedia: Sturlungar', url: 'https://is.wikipedia.org/wiki/Sturlungar' },
    ],
  },
  // ── Ásbirningar ──
  {
    id: 'as-hegranes',
    name: 'Ás í Hegranesi',
    clan: 'asbirningar',
    coordinates: [65.72, -19.48],
    role: 'Chief seat',
    approximate: true,
    description:
      'Principal residence of the Ásbirningar in Skagafjörður and home of Kolbeinn ungi, the family\'s last great chieftain.',
    sources: [
      { title: 'Wikipedia: Ásbirningar', url: 'https://is.wikipedia.org/wiki/%C3%81sbirningar' },
    ],
  },
  // ── Haukdælir ──
  {
    id: 'haukadalur',
    name: 'Haukadalur',
    clan: 'haukdaelir',
    coordinates: [64.33, -20.27],
    role: 'Family seat',
    approximate: true,
    description:
      'Old power base of the Haukdælir, the family of Gissur Þorvaldsson — the man who became the Norwegian king\'s earl over Iceland.',
    sources: [
      { title: 'Wikipedia: Haukdælir', url: 'https://is.wikipedia.org/wiki/Haukd%C3%A6lir' },
    ],
  },
  // ── Oddaverjar ──
  {
    id: 'oddi-rangarvellir',
    name: 'Oddi',
    clan: 'oddaverjar',
    coordinates: [63.79, -20.41],
    role: 'Family seat',
    approximate: true,
    description:
      'Seat of the Oddaverjar on the Rangárvellir — a centre of learning, home of Sæmundr fróði\'s line and Jón Loftsson, where the young Snorri Sturluson was fostered.',
    sources: [
      { title: 'Wikipedia: Oddaverjar', url: 'https://is.wikipedia.org/wiki/Oddaverjar' },
    ],
  },
  // ── Svínfellingar ──
  {
    id: 'svinafell-oraefi',
    name: 'Svínafell',
    clan: 'svinfellingar',
    coordinates: [63.979, -16.891],
    role: 'Family seat',
    description:
      'Seat of the Svínfellingar in Öræfi, among the greatest estates of the southeast — earlier the home of Flosi Þórðarson, the burner of Njáll.',
    sources: [
      { title: 'Wikipedia: Svínfellingar', url: 'https://is.wikipedia.org/wiki/Sv%C3%ADnfellingar' },
    ],
  },
  // ── Vatnsfirðingar ──
  {
    id: 'vatnsfjordur-djup',
    name: 'Vatnsfjörður',
    clan: 'vatnsfirdingar',
    coordinates: [65.947, -22.483],
    role: 'Family seat',
    description:
      'Stronghold of the Vatnsfirðingar on Ísafjarðardjúp, led by Þorvaldur Snorrason — the chieftain who had Hrafn Sveinbjarnarson beheaded in 1213.',
    sources: [
      {
        title: 'Wikipedia: Vatnsfirðingar',
        url: 'https://is.wikipedia.org/wiki/Vatnsfir%C3%B0ingar',
      },
    ],
  },
];
