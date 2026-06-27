import { ClanId } from '../types';

// Which conflict events each clan took part in, by event id. This drives the
// seat→battle connection lines on the clan layer. It's relationship (graph)
// data, so it lives in one place rather than being scattered across the 34
// event records. Ids must match entries in data/events.ts; unknown ids are
// skipped at render time.
export const CLAN_BATTLES: Record<ClanId, string[]> = {
  sturlungar: [
    'helgastadir-1220',
    'grimseyjarfor-1222',
    'saudafellsfor-1229',
    'baejarbardagi-1237',
    'apavatnsfor-1238',
    'orlygsstadir-1238',
    'snorri-sturluson-1241',
    'skalholtsbardagi-1242',
    'hunafloi-1244',
    'haugsnes-1246',
  ],
  asbirningar: [
    'vidines-1208',
    'helgastadir-1220',
    'orlygsstadir-1238',
    'hunafloi-1244',
    'haugsnes-1246',
  ],
  haukdaelir: [
    'apavatnsfor-1238',
    'orlygsstadir-1238',
    'snorri-sturluson-1241',
    'skalholtsbardagi-1242',
    'flugumyrarbrenna-1253',
  ],
  oddaverjar: [],
  svinfellingar: ['njalsbrenna-1011', 'thverarfundur-1255'],
  vatnsfirdingar: ['hrafn-sveinbjarnarson-1213'],
};
