import { ClanId } from '../types';

export interface ClanConfig {
  label: string; // display name
  crest: string; // short glyph shown on the marker
  color: string; // marker + legend colour
  blurb: string; // one-line "who they were"
}

// Visual identity + a sentence of context for each chieftain family.
// Colours are picked to stay distinct from the EVENT_CONFIG marker palette so
// the two layers don't read as the same thing on the map.
export const CLAN_CONFIG: Record<ClanId, ClanConfig> = {
  sturlungar: {
    label: 'Sturlungar',
    crest: 'S',
    color: '#2c3e7a',
    blurb:
      "The dominant kin-group of the age — Snorri Sturluson's family — sprawling from the Dalir to Borgarfjörður and Eyjafjörður.",
  },
  asbirningar: {
    label: 'Ásbirningar',
    crest: 'Á',
    color: '#b9770e',
    blurb:
      'Rulers of Skagafjörður; the rivals who broke the Sturlungar at Örlygsstaðir but fell at Haugsnes.',
  },
  haukdaelir: {
    label: 'Haukdælir',
    crest: 'H',
    color: '#1e7a4a',
    blurb:
      "Southern power-family of Gissur Þorvaldsson, who ended up the king's earl over all Iceland.",
  },
  oddaverjar: {
    label: 'Oddaverjar',
    crest: 'O',
    color: '#1a7a7a',
    blurb:
      "Learned southern dynasty of Oddi — Sæmundr fróði's line — who fostered the young Snorri Sturluson.",
  },
  svinfellingar: {
    label: 'Svínfellingar',
    crest: 'Sv',
    color: '#6a3d9a',
    blurb: 'Chieftains of the southeast, seated at Svínafell in Öræfi.',
  },
  vatnsfirdingar: {
    label: 'Vatnsfirðingar',
    crest: 'V',
    color: '#9a2d3d',
    blurb: 'Westfjords chieftains at Ísafjarðardjúp, led by Þorvaldur Snorrason.',
  },
};

// Stable display order for the legend.
export const CLAN_ORDER: ClanId[] = [
  'sturlungar',
  'asbirningar',
  'haukdaelir',
  'oddaverjar',
  'svinfellingar',
  'vatnsfirdingar',
];
