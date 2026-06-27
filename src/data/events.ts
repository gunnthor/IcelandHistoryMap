import { ConflictEvent } from '../types';

export const events: ConflictEvent[] = [
  {
    id: 'orlygsstadir-1238',
    name: 'Battle of Örlygsstaðir',
    icelandicName: 'Örlygsstaðabardagi',
    year: 1238,
    dateText: 'August 1238',
    period: 'Age of the Sturlungs',
    type: 'battle',
    locationName: 'Örlygsstaðir, Skagafjörður',
    coordinates: [65.55, -19.55],
    factions: [
      'Sturlungar (Sturla Sighvatsson)',
      'Ásbirningar & Haukdælir (Gissur Þorvaldsson, Kolbeinn ungi)',
    ],
    keyPeople: ['Sturla Sighvatsson', 'Gissur Þorvaldsson', 'Kolbeinn ungi'],
    winner: 'Ásbirningar & Haukdælir',
    casualtyEstimate: '~50+ killed, including Sturla Sighvatsson',
    summary:
      'One of the largest battles ever fought on Icelandic soil. The powerful Sturla Sighvatsson led the Sturlungar clan against a coalition of rivals. He lost — badly — and was killed. A decisive blow in Iceland\'s civil war era.',
    eli12:
      'Iceland had powerful families fighting each other like warlords. Sturla was the boss of the Sturlungar family and thought he could beat everyone. He couldn\'t. He got defeated and killed here, which was a huge deal.',
    whyItHappened:
      'The Sturlungar had been pushing aggressively to dominate all of Iceland. Rival clans — the Ásbirningar and Haukdælir — formed a coalition to stop them. Tension had been building for years through feuds, marriages, and broken agreements.',
    whyItMatters:
      'It weakened the Sturlungar significantly and accelerated the chaos of the Sturlung Age, which eventually led to Iceland submitting to Norwegian rule in 1262. Often called the largest battle ever fought in Iceland.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Örlygsstaðabardagi',
        url: 'https://en.wikipedia.org/wiki/%C3%96rlygssta%C3%B0abardagi',
      },
      {
        title: 'Íslendinga saga (Sturlungasaga)',
        url: 'https://en.wikipedia.org/wiki/Sturlunga_saga',
      },
    ],
  },
  {
    id: 'hunafloi-1244',
    name: 'Battle of Húnaflói',
    icelandicName: 'Flóabardagi',
    year: 1244,
    dateText: '1244',
    period: 'Age of the Sturlungs',
    type: 'sea_battle',
    locationName: 'Húnaflói bay, northwest Iceland',
    coordinates: [65.65, -21.0],
    factions: [
      'Þórður kakali (Sturlungar)',
      'Kolbeinn ungi (Ásbirningar)',
    ],
    keyPeople: ['Þórður kakali', 'Kolbeinn ungi'],
    winner: 'Þórður kakali',
    casualtyEstimate: 'Unclear — Kolbeinn ungi died shortly after, possibly from wounds',
    summary:
      'A rare sea battle in the bay of Húnaflói. Þórður kakali, a fierce Sturlungar leader, clashed with Kolbeinn ungi on the water. Sea battles were deeply unusual in Iceland, making this one stand out in the sagas.',
    eli12:
      'Instead of fighting on land like normal, these guys fought on boats in a bay. That was pretty unusual for Iceland. Kolbeinn ungi — who had been a big deal enemy of the Sturlungar — died around this time, probably from injuries.',
    whyItHappened:
      'Þórður kakali had returned from Norway determined to reassert Sturlungar dominance after the disaster at Örlygsstaðir. Kolbeinn ungi controlled the north and stood in his way.',
    whyItMatters:
      'Kolbeinn ungi was one of the most powerful rivals to the Sturlungar. His death removed a major obstacle and helped Þórður kakali consolidate power in the north — at least temporarily.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Þórður kakali',
        url: 'https://en.wikipedia.org/wiki/%C3%9E%C3%B3r%C3%B0ur_kakali',
      },
    ],
  },
  {
    id: 'haugsnes-1246',
    name: 'Battle of Haugsnes',
    icelandicName: 'Haugsnesbardagi',
    year: 1246,
    dateText: 'April 19, 1246',
    period: 'Age of the Sturlungs',
    type: 'battle',
    locationName: 'Haugsnes, near Flugumýri, Skagafjörður',
    coordinates: [65.62, -19.48],
    factions: [
      'Sturlungar (Þórður kakali)',
      'Ásbirningar (Brandur Kolbeinsson)',
    ],
    keyPeople: ['Þórður kakali', 'Brandur Kolbeinsson'],
    winner: 'Þórður kakali / Sturlungar',
    casualtyEstimate: '~110 killed — the deadliest battle in Icelandic history',
    summary:
      'Widely regarded as the bloodiest battle ever fought in Iceland. Þórður kakali\'s Sturlungar crushed the Ásbirningar, killing around 110 men — an enormous number for Iceland\'s small population. The Ásbirningar never recovered.',
    eli12:
      'This was the most violent battle Iceland ever had. About 110 people died, which sounds small, but Iceland only had maybe 50,000–70,000 people total. That\'s like an entire village being wiped out in one afternoon.',
    whyItHappened:
      'The power struggle between the Sturlungar and Ásbirningar had been grinding on for years. Þórður kakali wanted revenge for Örlygsstaðir and total control of the north. The Ásbirningar under Brandur Kolbeinsson refused to give up.',
    whyItMatters:
      'This battle effectively ended Ásbirningar power. But the sheer scale of violence also alarmed the Norwegian king, who used Iceland\'s chaos as justification for taking direct control. Iceland submitted to Norway in 1262.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Battle of Haugsnes',
        url: 'https://en.wikipedia.org/wiki/Battle_of_Haugsnes',
      },
    ],
  },
  {
    id: 'flugumyrarbrenna-1253',
    name: 'Flugumýrarbrenna',
    icelandicName: 'Flugumýrarbrenna',
    year: 1253,
    dateText: 'October 22, 1253',
    period: 'Age of the Sturlungs',
    type: 'burning',
    locationName: 'Flugumýri, Skagafjörður',
    coordinates: [65.58, -19.6],
    factions: [
      'Attackers (enemies of Gissur Þorvaldsson)',
      'Gissur Þorvaldsson\'s household (defenders)',
    ],
    keyPeople: ['Gissur Þorvaldsson', 'Ingibjörg Sturludóttir'],
    winner: 'Attackers',
    casualtyEstimate: '25+ killed in the fire and fighting',
    summary:
      'A night attack and arson of the farmstead at Flugumýri. Enemies of Gissur Þorvaldsson set fire to the building while people slept. Over 25 people died. Even by Sturlung Age standards, this was considered a deeply dishonorable act.',
    eli12:
      'Someone snuck up to a farm in the middle of the night and set it on fire while people were sleeping. Over 25 people burned to death or were killed escaping. Even medieval Icelanders thought this was really, really evil.',
    whyItHappened:
      'Political vendettas were settled through violence in this era. Gissur Þorvaldsson had many enemies who wanted him dead. The burning was revenge — brutal, cowardly, and effective.',
    whyItMatters:
      'The Flugumýrarbrenna shocked even hardened contemporaries. It contributed to the perception that Iceland\'s ruling class had completely lost control, which helped justify Norwegian intervention and the end of the Icelandic Commonwealth.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Flugumýrarbrenna',
        url: 'https://en.wikipedia.org/wiki/Flugum%C3%BDrarbrenna',
      },
    ],
  },
  {
    id: 'reformation-1550',
    name: 'Reformation Conflict & Execution of Jón Arason',
    icelandicName: 'Siðaskiptin',
    year: 1550,
    dateText: 'November 7, 1550',
    period: 'Danish Rule / Reformation',
    type: 'execution',
    locationName: 'Skálholt (coordinates approximate — needs verification)',
    coordinates: [64.13, -20.52],
    factions: [
      'Danish Crown & Lutheran reformers',
      'Catholic resistance (Jón Arason and sons)',
    ],
    keyPeople: ['Jón Arason', 'Daði Guðmundsson'],
    winner: 'Danish Lutheran reformers',
    casualtyEstimate:
      'Jón Arason and 2 of his sons executed; broader armed conflict had additional casualties',
    summary:
      "Iceland's last Catholic bishop, Jón Arason, refused to accept the Protestant Reformation being forced on Iceland by the Danish crown. He raised arms, was captured, and executed without trial alongside two of his sons. This ended armed Catholic resistance in Iceland.",
    eli12:
      "Denmark decided Iceland had to switch from Catholic to Protestant Christianity. Most Icelanders went along with it, but one tough old bishop named Jón Arason said no and actually fought back. He got captured and beheaded without even a trial.",
    whyItHappened:
      "The Protestant Reformation was sweeping Europe and Denmark's king imposed it on Iceland. Jón Arason, bishop of Hólar, was a powerful political figure who saw this as both religious betrayal and a loss of Icelandic autonomy.",
    whyItMatters:
      "Iceland's last armed resistance to the Reformation ended here. Church properties were seized, Icelandic cultural heritage was disrupted, and Danish royal control was cemented. Jón Arason is still remembered as a national hero by some.",
    confidence: 'low',
    sources: [
      {
        title: 'Wikipedia: Jón Arason',
        url: 'https://en.wikipedia.org/wiki/J%C3%B3n_Arason',
      },
      {
        title: '⚠️ Coordinates are approximate — verify against historical sources',
        url: '',
      },
    ],
  },
  {
    id: 'tyrkjaranid-1627',
    name: 'Turkish Abductions',
    icelandicName: 'Tyrkjaránið',
    year: 1627,
    dateText: 'July–August 1627',
    period: 'Danish Rule',
    type: 'raid',
    locationName: 'Vestmannaeyjar (Westman Islands) + East Iceland coast',
    coordinates: [63.44, -20.27],
    factions: [
      'Barbary corsairs (Algerian pirates, led by Murat Reis)',
      'Icelandic coastal communities',
    ],
    keyPeople: ['Murat Reis (Jan Janszoon)', 'Guðríður Símonardóttir'],
    winner: 'Barbary corsairs',
    casualtyEstimate: '~400 abducted, ~50+ killed. Around 37 ever returned.',
    summary:
      "In 1627, Barbary pirates from North Africa raided Iceland across multiple locations. They killed dozens and abducted around 400 people to sell into slavery in North Africa. It's one of the most traumatic events in Icelandic history — called 'The Turkish Abductions' even though the raiders were mostly Algerian and Dutch.",
    eli12:
      'Pirates from North Africa — the worst kind of pirates — sailed all the way to Iceland and grabbed about 400 people to sell as slaves. They burned villages and killed anyone who resisted. Most people taken never came home.',
    whyItHappened:
      "Barbary corsairs regularly raided European coastlines for enslaved people to sell in North African markets. Iceland's remote location and near-total lack of coastal defenses made it an easy target. The raids were coordinated and professionally executed.",
    whyItMatters:
      "The Tyrkjaránið left a deep scar on Icelandic memory. It exposed how undefended Iceland was under Danish rule. The Danish king's failure to protect Icelanders fueled lasting resentment. Survivor accounts were written and are still read today.",
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Tyrkjaránið',
        url: 'https://en.wikipedia.org/wiki/Tyrkjar%C3%A1ni%C3%B0',
      },
      {
        title: 'Wikipedia: Murat Reis the Younger',
        url: 'https://en.wikipedia.org/wiki/Murat_Reis_the_Younger',
      },
    ],
  },
  {
    id: 'cod-wars',
    name: 'The Cod Wars',
    icelandicName: 'Þorskastríðin',
    year: 1976,
    dateText: '1958–1976 (three confrontations)',
    period: 'Modern era / Republic of Iceland',
    type: 'sea_battle',
    locationName: 'North Atlantic fishing grounds around Iceland (marker is illustrative — open sea)',
    coordinates: [66.2, -23.5],
    factions: [
      'Iceland (Coast Guard)',
      'United Kingdom (Royal Navy & trawler fleets)',
    ],
    keyPeople: ['Icelandic Coast Guard', 'Royal Navy'],
    winner: 'Iceland',
    casualtyEstimate:
      'Almost none — 1 Icelandic engineer died in an accident (1973). The "weapons" were net-cutters and ship-ramming.',
    summary:
      "A series of three standoffs between Iceland and the UK over fishing rights as Iceland repeatedly extended its exclusive zone (eventually to 200 nautical miles). Despite the name, almost nobody was hurt: the main tactics were Icelandic gunboats cutting British trawler nets and both sides ramming each other's ships.",
    eli12:
      "Iceland and Britain had a 'war' over fish. Iceland kept claiming more ocean for itself, and Britain didn't like it because British boats fished there. Instead of shooting, the Icelanders cut the British nets and everyone rammed each other's boats. Iceland won.",
    whyItHappened:
      "Fishing is the backbone of Iceland's economy. As fish stocks came under pressure, Iceland expanded its exclusive fishing zone (4 → 12 → 50 → 200 miles). Britain refused to recognise the new limits and sent the Royal Navy to protect its trawlers.",
    whyItMatters:
      "Iceland won every round. It even threatened to leave NATO and close a strategically vital US base — leverage that forced Britain to back down. The 200-mile exclusive economic zone Iceland fought for later became a global norm under international law.",
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Cod Wars',
        url: 'https://en.wikipedia.org/wiki/Cod_Wars',
      },
    ],
  },
];
