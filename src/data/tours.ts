import { ConflictEvent } from '../types';
import { events } from './events';

// A story route: a curated, ordered path through the events for people who
// would rather be led somewhere than browse data. Event ids that don't
// resolve are skipped at runtime (see resolveTourEvents) so a renamed event
// degrades gracefully instead of crashing a tour.
export interface Tour {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  eventIds: string[];
}

// All events rated low confidence, oldest first — kept dynamic so newly
// added legends join the route automatically.
const LOW_CONFIDENCE_IDS = events
  .filter((e) => e.confidence === 'low')
  .sort((a, b) => a.year - b.year)
  .map((e) => e.id);

export const TOURS: Tour[] = [
  {
    id: 'start-here',
    emoji: '🧭',
    title: 'Start Here: 7 events that explain Iceland',
    tagline:
      'The whole national story in seven stops — conversion, civil war, colonial misery, and the fish that won.',
    eventIds: [
      'kristnitakan-1000',
      'njalsbrenna-1011',
      'orlygsstadir-1238',
      'reformation-1550',
      'tyrkjaranid-1627',
      'modunhardindin-laki-1783',
      'cod-wars',
    ],
  },
  {
    id: 'saga-revenge',
    emoji: '🗡️',
    title: 'Saga Age Revenge Tour',
    tagline:
      'Honor, insults, and escalation: how a horse ride or a killed thrall became a generational feud.',
    eventIds: [
      'ingolfur-vestmannaeyjar-thralls',
      'hrafnkell-einar-freyfaxi',
      'vopnfirdinga-feud',
      'gunnar-hlidarendi-990',
      'mahlidingavig',
      'droplaugarsona-feud',
      'kjartan-bolli-1003',
      'njalsbrenna-1011',
      'grettir-drangey-1031',
    ],
  },
  {
    id: 'sturlung-speedrun',
    emoji: '⚔️',
    title: 'Sturlung Civil War Speedrun',
    tagline:
      'Iceland tears itself apart in 50 years — betrayals, burnings, and the fatal mercy that decided everything.',
    eventIds: [
      'vidines-1208',
      'grimseyjarfor-1222',
      'apavatnsfor-1238',
      'orlygsstadir-1238',
      'snorri-sturluson-1241',
      'hunafloi-1244',
      'haugsnes-1246',
      'flugumyrarbrenna-1253',
      'thverarfundur-1255',
      'gamli-sattmali-1262',
    ],
  },
  {
    id: 'disasters',
    emoji: '🌋',
    title: 'Pirates, Plague & Lava',
    tagline:
      'A thousand years of catastrophe: lava floods, a vanished district, plague ships, pirate fleets, and the eruption that starved a nation.',
    eventIds: [
      'eldgja-939',
      'hekla-1104',
      'oraefajokull-1362',
      'svartidaudi-1402',
      'tyrkjaranid-1627',
      'storabola-1707',
      'modunhardindin-laki-1783',
    ],
  },
  {
    id: 'most-brutal',
    emoji: '💀',
    title: 'Most Brutal Events',
    tagline:
      'The absolute worst of it — massacres, family burnings, and the state drowning its own people. Not a feel-good route.',
    eventIds: [
      'ingolfur-vestmannaeyjar-thralls',
      'njalsbrenna-1011',
      'haugsnes-1246',
      'flugumyrarbrenna-1253',
      'spanverjavigin-1615',
      'tyrkjaranid-1627',
      'drekkingarhylur-storidomur',
    ],
  },
  {
    id: 'near-reykjavik',
    emoji: '📍',
    title: 'Events Near Reykjavík',
    tagline:
      'Visiting the capital? A thousand years of drama within day-trip range — Þingvellir included.',
    eventIds: [
      'kristnitakan-1000',
      'lenhardur-1502',
      'kopavogur-1662',
      'drekkingarhylur-storidomur',
      'skuli-innrettingar-monopoly',
      'jorgensen-1809',
      'guttoslagurinn-1932',
      'operation-fork-1940',
      'austurvollur-1949',
    ],
  },
  {
    id: 'probably-legends',
    emoji: '🤔',
    title: 'Probably Legends',
    tagline:
      'Every event historians side-eye: low-confidence stories where the places are real but the plot might not be.',
    eventIds: LOW_CONFIDENCE_IDS,
  },
];

// Resolve a tour's event ids to actual events, preserving order and
// silently dropping ids that no longer exist in the dataset.
export function resolveTourEvents(tour: Tour): ConflictEvent[] {
  return tour.eventIds
    .map((id) => events.find((e) => e.id === id))
    .filter((e): e is ConflictEvent => !!e);
}
