import { ConflictEvent } from '../types';

export const events: ConflictEvent[] = [
  {
    id: 'hrafnkell-einar-freyfaxi',
    name: 'Hrafnkell Kills Einar',
    icelandicName: 'Vígs Einars í Hrafnkels sögu',
    year: 970,
    dateText: 'Saga Age — date uncertain',
    period: 'Saga Age / East Iceland',
    type: 'execution',
    locationName: 'Aðalból / Hrafnkelsdalur, East Iceland (coordinates approximate — verify)',
    coordinates: [65.08, -15.43],
    factions: [
      'Hrafnkell Freysgoði of Aðalból',
      'Einar Þorbjarnarson and his family network',
    ],
    keyPeople: ['Hrafnkell Freysgoði', 'Einar Þorbjarnarson', 'Sámur Bjarnason'],
    winner: 'Hrafnkell Freysgoði at first; Sámur later forces him down',
    casualtyEstimate: 'Einar killed; later revenge and legal humiliation follow',
    summary:
      'The famous spark of Hrafnkels saga. Hrafnkell warned that nobody should ride his sacred horse Freyfaxi. Einar did it anyway, and Hrafnkell killed him for it. One horse ride became an East Iceland power crisis.',
    eli12:
      'A powerful chieftain had a horse he treated like a holy animal. A worker rode it, even though he was told not to. Hrafnkell killed him, and then the dead man\'s family came for justice.',
    whyItHappened:
      'The saga turns a personal rule into a test of power. Hrafnkell thinks his status and oath matter more than Einar\'s life; Einar\'s family refuses to accept that quietly.',
    whyItMatters:
      'This gives the map a strong East Iceland saga marker. It is not a documented battlefield, but it shows how honor, religion, property, and law could all collide in one violent act.',
    confidence: 'low',
    sources: [
      {
        title: 'Wikipedia: Hrafnkels saga',
        url: 'https://en.wikipedia.org/wiki/Hrafnkels_saga',
      },
      {
        title: 'Icelandic Saga Database: Hrafnkels saga Freysgoða',
        url: 'https://sagadb.org/hrafnkels_saga_freysgoda',
      },
      {
        title: 'Coordinates are approximate — marker uses the Aðalból/Hrafnkelsdalur area',
        url: '',
      },
    ],
  },
  {
    id: 'vopnfirdinga-feud',
    name: 'Vápnfirðinga Feud',
    icelandicName: 'Vápnfirðinga saga',
    year: 980,
    dateText: 'Saga Age — date uncertain',
    period: 'Saga Age / East Iceland',
    type: 'other',
    locationName: 'Vopnafjörður, East Iceland (representative marker; coordinates approximate — verify)',
    coordinates: [65.75, -14.83],
    factions: [
      'Brodd-Helgi and his supporters',
      'Geitir Lýtingsson and allied families',
    ],
    keyPeople: ['Brodd-Helgi', 'Geitir Lýtingsson', 'Þorkell Geitisson'],
    winner: 'No clean winner; the feud rolls across generations',
    casualtyEstimate: 'Several killings across the feud; exact numbers vary by saga tradition',
    summary:
      'A hard local feud from Vopnafjörður, full of status fights, killings, and revenge. It is less one neat battle than a long East Iceland pressure cooker.',
    eli12:
      'Two powerful local families keep clashing. Someone gets killed, relatives demand revenge, and the next generation inherits the mess.',
    whyItHappened:
      'Vápnfirðinga saga is driven by honor, kinship, insult, and control of local power. In a society without a central state, a family feud could become the main political weather system of a fjord.',
    whyItMatters:
      'This adds a proper Austfirðir saga conflict to the map. It helps show that saga violence was not just a south-and-west Iceland thing.',
    confidence: 'low',
    sources: [
      {
        title: 'Wikipedia: Vápnfirðinga saga',
        url: 'https://en.wikipedia.org/wiki/V%C3%A1pnfir%C3%B0inga_saga',
      },
      {
        title: 'Icelandic Saga Database: Vápnfirðinga saga',
        url: 'https://sagadb.org/vapnfirdinga_saga',
      },
      {
        title: 'Representative Vopnafjörður marker — exact saga locations need local verification',
        url: '',
      },
    ],
  },
  {
    id: 'kristnitakan-1000',
    name: 'The Conversion of Iceland',
    icelandicName: 'Kristnitakan',
    year: 1000,
    dateText: 'c. 999–1000, at the Alþingi',
    period: 'Saga Age / Icelandic Commonwealth',
    type: 'other',
    locationName: 'Þingvellir (Lögberg), Alþingi',
    coordinates: [64.2559, -21.13],
    factions: [
      'Christian chieftains (with Norwegian royal backing)',
      'Pagan chieftains and the old gods',
    ],
    keyPeople: ['Þorgeir Ljósvetningagoði', 'Gizur hvíti', 'Hjalti Skeggjason', 'Síðu-Hallur'],
    winner: 'Peaceful compromise — Iceland adopts Christianity',
    casualtyEstimate: 'None at the assembly — the whole point was to avoid a civil war',
    summary:
      'Iceland switched religions without a battle. With Christians and pagans arming into two camps at the Alþingi, the law-speaker Þorgeir — himself a pagan — was asked to decide for everyone. He lay under a cloak for a day and a night, then ruled that Iceland would become Christian, with a few quiet concessions to the old ways.',
    eli12:
      'Iceland was about to split in two over religion: Christians versus people who believed in the old Norse gods. Instead of fighting, they let one trusted leader make the call for everybody. He picked Christianity — but let people keep some old customs quietly. Civil war avoided.',
    whyItHappened:
      'Norway\'s King Ólafur Tryggvason was pushing Iceland hard to convert, even holding Icelanders hostage. At home, missionaries had split the country, and both sides showed up to the Alþingi ready to declare separate laws — which would have meant war.',
    whyItMatters:
      'One of the most famous peaceful resolutions in medieval history. It kept Iceland in one piece, reshaped its culture and law, and is still told as a national origin story about choosing compromise over bloodshed.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: Christianization of Iceland',
        url: 'https://en.wikipedia.org/wiki/Christianization_of_Iceland',
      },
      { title: 'Wikipedia: Kristnitakan', url: 'https://is.wikipedia.org/wiki/Kristnitakan' },
    ],
  },
  {
    id: 'mahlidingavig',
    name: 'Máhlíðingavíg',
    icelandicName: 'Máhlíðingamál',
    year: 1000,
    dateText: 'Saga Age — date uncertain',
    period: 'Saga Age / Icelandic Commonwealth',
    type: 'battle',
    locationName: 'Mávahlíð, Snæfellsnes (below Búlandshöfði; coordinates approximate)',
    coordinates: [64.926, -23.501],
    factions: [
      'Þórarinn svarti and his supporters',
      'Þorbjörn digri and his supporters',
    ],
    keyPeople: ['Þórarinn svarti', 'Þorbjörn digri'],
    winner: 'Þórarinn svarti\'s side',
    casualtyEstimate: 'Þorbjörn digri and several others killed; details vary by saga source',
    summary:
      'A local feud from saga tradition that turned deadly around Mávahlíð on Snæfellsnes. Þórarinn svarti clashed with Þorbjörn digri, and the fight became one of those small-looking Icelandic disputes that spiraled into bloodshed.',
    eli12:
      'This is saga-age neighborhood violence. Two local power groups had a feud, people showed up armed, and Þorbjörn digri ended up dead. It is the kind of story where a personal insult can become a regional crisis.',
    whyItHappened:
      'The saga tradition presents it as a feud over honor, alliances, and local power. In early Iceland, there was no king or police force to settle these fights cleanly, so families and followers often settled them with weapons.',
    whyItMatters:
      'It shows the smaller-scale violence that made saga society so unstable. Not every conflict was a giant battle; many were local feuds that still shaped law cases, alliances, and family memory for generations.',
    confidence: 'low',
    sources: [
      {
        title: 'Wikipedia: Eyrbyggja saga',
        url: 'https://en.wikipedia.org/wiki/Eyrbyggja_saga',
      },
      {
        title: 'Coordinates are approximate — verify against local place-name sources for Mávahlíð',
        url: '',
      },
    ],
  },
  {
    id: 'droplaugarsona-feud',
    name: 'Droplaugarsons\' Feud',
    icelandicName: 'Droplaugarsona saga',
    year: 1000,
    dateText: 'Saga Age — date uncertain',
    period: 'Saga Age / East Iceland',
    type: 'other',
    locationName: 'Fljótsdalur / Lagarfljót area, East Iceland (representative marker; coordinates approximate — verify)',
    coordinates: [65.04, -14.95],
    factions: [
      'Helgi and Grímur Droplaugarsynir',
      'Helgi Ásbjarnarson and rival local powers',
    ],
    keyPeople: ['Helgi Droplaugarson', 'Grímur Droplaugarson', 'Helgi Ásbjarnarson'],
    winner: 'No simple winner; revenge and counter-revenge drive the story',
    casualtyEstimate: 'Several saga killings; exact count uncertain',
    summary:
      'A compact East Iceland feud around Fljótsdalur and Lagarfljót. The sons of Droplaug get pulled into local rivalry, violence, and revenge until the feud becomes the whole point of the story.',
    eli12:
      'This is another saga feud: two brothers, local enemies, a bunch of pride, and violence that keeps answering violence.',
    whyItHappened:
      'The saga world runs on kinship and reputation. Once one side is shamed or harmed, backing down can look like weakness, so the conflict keeps feeding itself.',
    whyItMatters:
      'Droplaugarsona saga is useful because it gives the map a real Fljótsdalur/Lagarfljót conflict, not just the famous battles from the north and west.',
    confidence: 'low',
    sources: [
      {
        title: 'Wikipedia: Droplaugarsona saga',
        url: 'https://en.wikipedia.org/wiki/Droplaugarsona_saga',
      },
      {
        title: 'Wikipedia: Fljótsdæla saga',
        url: 'https://en.wikipedia.org/wiki/Flj%C3%B3tsd%C3%A6la_saga',
      },
      {
        title: 'Representative marker only — exact episode coordinates need saga/place-name verification',
        url: '',
      },
    ],
  },
  {
    id: 'njalsbrenna-1011',
    name: 'Njálsbrenna',
    icelandicName: 'Burning of Bergþórshvoll',
    year: 1011,
    dateText: 'c. 1011 according to Njáls saga',
    period: 'Saga Age / Icelandic Commonwealth',
    type: 'burning',
    locationName: 'Bergþórshvoll, Vestur-Landeyjar',
    coordinates: [63.636, -20.33],
    factions: [
      'Flosi Þórðarson of Svínafell and the burners',
      'Njáll Þorgeirsson\'s household',
    ],
    keyPeople: [
      'Njáll Þorgeirsson',
      'Bergþóra',
      'Skarphéðinn Njálsson',
      'Kári Sölmundarson',
      'Flosi Þórðarson',
    ],
    winner: 'Attackers, though the saga treats the victory as morally cursed',
    casualtyEstimate: 'Around 11 killed in the burning, depending on source tradition',
    summary:
      'The most famous burning in Icelandic literature. Flosi Þórðarson and his allies surrounded Bergþórshvoll and burned Njáll, Bergþóra, and their household inside. Kári escaped, which meant the story was far from over.',
    eli12:
      'A group of enemies trapped a family inside their house and set it on fire. The wise old Njáll stayed inside with his wife. One survivor got away, and that survivor had revenge on his mind.',
    whyItHappened:
      'Njáls saga builds toward the burning through years of insults, lawsuits, revenge killings, and failed settlements. By the time Flosi acts, the feud has become too poisoned for normal law to calm it down.',
    whyItMatters:
      'Even if it is saga literature more than clean documentary history, Njálsbrenna is one of Iceland\'s defining conflict stories. It teaches how feud culture could turn legal arguments and family honor into catastrophe.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: Njáls saga',
        url: 'https://en.wikipedia.org/wiki/Nj%C3%A1ls_saga',
      },
      {
        title: 'Icelandic Saga Database: Brennu-Njáls saga',
        url: 'https://sagadb.org/brennu-njals_saga',
      },
      {
        title: 'Coordinates are approximate — Bergþórshvoll marker should be verified locally',
        url: '',
      },
    ],
  },
  {
    id: 'vidines-1208',
    name: 'Battle of Víðines',
    icelandicName: 'Víðinesbardagi',
    year: 1208,
    dateText: '1208',
    period: 'Early Sturlung Age / Church vs Chieftains',
    type: 'battle',
    locationName: 'Víðines near Hólar in Hjaltadalur, Skagafjörður (coordinates approximate — verify)',
    coordinates: [65.73, -19.11],
    factions: [
      'Secular chieftains: Kolbeinn Tumason, Arnór Tumason, Ásbirningar, with Svínfellingar support',
      'Bishop Guðmundur Arason and his followers',
    ],
    keyPeople: ['Kolbeinn Tumason', 'Guðmundur Arason', 'Arnór Tumason'],
    winner: 'Bishop Guðmundur\'s side / church followers',
    casualtyEstimate: 'Around 10 killed, including Kolbeinn Tumason',
    summary:
      'A sharp early clash between church authority and secular chieftain power. Kolbeinn Tumason marched against Bishop Guðmundur Arason near Hólar, but the bishop\'s followers held out and Kolbeinn was killed.',
    eli12:
      'A powerful chieftain tried to force a stubborn bishop back under control. It went badly. Kolbeinn Tumason died, and the bishop\'s side walked away with a shocking win.',
    whyItHappened:
      'Guðmundur Arason pushed hard for church independence and protection for poor followers. Icelandic chieftains saw that as a threat to their control over people, courts, and money. Víðines was that argument turning into blades.',
    whyItMatters:
      'Kolbeinn Tumason is traditionally linked with the hymn "Heyr, himna smiður," so this battle sits at the weird intersection of politics, violence, and one of Iceland\'s most beloved religious poems.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: Guðmundur Arason',
        url: 'https://en.wikipedia.org/wiki/Gu%C3%B0mundur_Arason',
      },
      {
        title: 'Wikipedia: Kolbeinn Tumason',
        url: 'https://en.wikipedia.org/wiki/Kolbeinn_Tumason',
      },
      {
        title: 'Coordinates are approximate — marker uses the Hólar/Víðines area',
        url: '',
      },
    ],
  },
  {
    id: 'hrafn-sveinbjarnarson-1213',
    name: 'Killing of Hrafn Sveinbjarnarson',
    icelandicName: 'Vígs Hrafns Sveinbjarnarsonar',
    year: 1213,
    dateText: 'March 4, 1213',
    period: 'Early Sturlung Age / Westfjords Feuds',
    type: 'execution',
    locationName: 'Eyri / Hrafnseyri, Arnarfjörður (coordinates approximate — verify)',
    coordinates: [65.75, -23.46],
    factions: [
      'Þorvaldur Snorrason Vatnsfirðingur and his men',
      'Hrafn Sveinbjarnarson and the Seldælir network',
    ],
    keyPeople: ['Hrafn Sveinbjarnarson', 'Þorvaldur Snorrason Vatnsfirðingur'],
    winner: 'Þorvaldur Snorrason Vatnsfirðingur',
    casualtyEstimate: 'Hrafn captured and beheaded; wider feud continued',
    summary:
      'Hrafn Sveinbjarnarson was a chieftain, healer, and unusually well-traveled Icelander. His feud with Þorvaldur Snorrason ended with Hrafn being captured and beheaded, a grim early warning sign for the Sturlung Age.',
    eli12:
      'Hrafn was basically a doctor-chieftain: powerful, respected, and useful. But he had a dangerous enemy. That enemy caught him and had him killed, which made the feud even nastier.',
    whyItHappened:
      'Hrafn and Þorvaldur were locked in a western Iceland power feud. Honor, local control, revenge, and old grudges all piled up until normal settlements stopped working.',
    whyItMatters:
      'This event shows that the Sturlung Age did not begin as one big civil war overnight. It grew out of local feuds like this, where personal rivalry and regional politics turned lethal.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: Hrafn Sveinbjarnarson',
        url: 'https://is.wikipedia.org/wiki/Hrafn_Sveinbjarnarson',
      },
      {
        title: 'Wikipedia: Hrafns saga Sveinbjarnarsonar',
        url: 'https://is.wikipedia.org/wiki/Hrafns_saga_Sveinbjarnarsonar',
      },
      {
        title: 'Coordinates are approximate — marker uses Hrafnseyri/Eyri in Arnarfjörður',
        url: '',
      },
    ],
  },
  {
    id: 'helgastadir-1220',
    name: 'Helgastaðabardagi',
    icelandicName: 'Helgastaðabardagi',
    year: 1220,
    dateText: 'August 29–30, 1220',
    period: 'Age of the Sturlungs',
    type: 'battle',
    locationName: 'Helgastaðir in Reykjadalur, Northeast Iceland (near Laugar; coordinates approximate)',
    coordinates: [65.767, -17.4],
    factions: [
      'Followers of Bishop Guðmundur Arason',
      'Forces of Sighvatur Sturluson and Arnór Tumason',
    ],
    keyPeople: ['Guðmundur Arason', 'Sighvatur Sturluson', 'Arnór Tumason'],
    winner: 'Secular chieftain forces / negotiated surrender',
    casualtyEstimate: 'Unclear; saga accounts focus more on the siege and surrender than a clean tally',
    summary:
      'A tiny churchyard siege with big Sturlung Age energy. Bishop Guðmundur\'s followers defended themselves at Helgastaðir, then fled into the church as the secular chieftain forces pressed them.',
    eli12:
      'Imagine a medieval standoff around a church. One side hides in the churchyard, the other side attacks, and everyone is trying to win without turning holy ground into a total disaster.',
    whyItHappened:
      'The long fight over Guðmundur Arason\'s authority kept dragging northern Iceland into violence. Chieftains wanted the bishop\'s armed followers broken up; the bishop\'s men saw themselves as defending a holy cause.',
    whyItMatters:
      'It is a great map event because it makes the church-versus-chieftain conflict feel physical: not abstract politics, but armed men crowding around a rural church and forcing a surrender.',
    confidence: 'low',
    sources: [
      {
        title: 'Wikipedia: Guðmundur Arason',
        url: 'https://en.wikipedia.org/wiki/Gu%C3%B0mundur_Arason',
      },
      {
        title: 'Sturlunga saga reference context',
        url: 'https://en.wikipedia.org/wiki/Sturlunga_saga',
      },
      {
        title: 'Coordinates are approximate — verify the Helgastaðir/Reykjadalur site',
        url: '',
      },
    ],
  },
  {
    id: 'grimseyjarfor-1222',
    name: 'Grímseyjarför',
    icelandicName: 'Grímseyjarför',
    year: 1222,
    dateText: '1222',
    period: 'Age of the Sturlungs',
    type: 'raid',
    locationName: 'Grímsey island, North Iceland',
    coordinates: [66.54, -18.0],
    factions: [
      'Sighvatur Sturluson and Sturla Sighvatsson',
      'Bishop Guðmundur Arason\'s followers',
    ],
    keyPeople: ['Sighvatur Sturluson', 'Sturla Sighvatsson', 'Guðmundur Arason'],
    winner: 'Sighvatur Sturluson and Sturla Sighvatsson',
    casualtyEstimate: '~12 of the bishop\'s men killed on the island; 30+ of the attackers drowned on the way back',
    summary:
      'A revenge expedition to Grímsey that turned Guðmundur the Good\'s church conflict into a bloodbath. Sighvatur Sturluson and his son Sturla attacked the bishop\'s followers on the island; about a dozen defenders were killed, and dozens more of the attackers drowned on the way home.',
    eli12:
      'The bishop\'s people were hiding out on an island. Their enemies sailed over, attacked them, and killed a lot of them. This was not a polite political disagreement anymore.',
    whyItHappened:
      'After years of conflict around Bishop Guðmundur, his followers were seen by chieftains as a dangerous armed faction. Sighvatur and Sturla wanted to crush that problem decisively.',
    whyItMatters:
      'Grímseyjarför shows how quickly religious politics became clan violence. It also foreshadows the brutal style of the Sturlung Age: alliances, revenge, sudden raids, and very little mercy.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: Guðmundur Arason',
        url: 'https://en.wikipedia.org/wiki/Gu%C3%B0mundur_Arason',
      },
      {
        title: 'Wikipedia: Sturla Sighvatsson',
        url: 'https://en.wikipedia.org/wiki/Sturla_Sighvatsson',
      },
    ],
  },
  {
    id: 'saudafellsfor-1229',
    name: 'Sauðafellsför',
    icelandicName: 'Sauðafellsför',
    year: 1229,
    dateText: '1229',
    period: 'Age of the Sturlungs',
    type: 'raid',
    locationName: 'Sauðafell in Dalir, West Iceland (coordinates approximate — verify)',
    coordinates: [65.06, -21.68],
    factions: [
      'Sturla Sighvatsson and Sturlungar supporters',
      'Snorri Sturluson and his household network',
    ],
    keyPeople: ['Sturla Sighvatsson', 'Snorri Sturluson', 'Sighvatur Sturluson'],
    winner: 'Sturla Sighvatsson / Sturlungar pressure campaign',
    casualtyEstimate: 'Unclear; remembered more as intimidation and humiliation than a mass killing',
    summary:
      'A Sturlung pressure raid against Snorri Sturluson\'s world in the west. Sturla Sighvatsson used force and fear to bend rivals toward his family\'s expanding power.',
    eli12:
      'This was not a clean battlefield moment. It was more like powerful relatives showing up with armed men to scare, punish, and squeeze another powerful relative.',
    whyItHappened:
      'The Sturlungar were trying to turn family prestige into real control across Iceland. Snorri had wealth, followers, and influence, so Sturla pushed into his sphere with violence and intimidation.',
    whyItMatters:
      'Sauðafellsför helps explain why the Sturlung Age feels so messy. The war was not just famous battles; it was raids, threats, humiliation, and constant pressure between ambitious kin groups.',
    confidence: 'low',
    sources: [
      {
        title: 'Wikipedia: Snorri Sturluson',
        url: 'https://en.wikipedia.org/wiki/Snorri_Sturluson',
      },
      {
        title: 'Wikipedia: Sturla Sighvatsson',
        url: 'https://en.wikipedia.org/wiki/Sturla_Sighvatsson',
      },
      {
        title: 'Coordinates and casualty details need verification against Sturlunga saga/local sources',
        url: '',
      },
    ],
  },
  {
    id: 'baejarbardagi-1237',
    name: 'Bæjarbardagi',
    icelandicName: 'Bæjarbardagi',
    year: 1237,
    dateText: 'April 28, 1237',
    period: 'Age of the Sturlungs',
    type: 'battle',
    locationName: 'Bær in Bæjarsveit, Borgarfjörður (coordinates approximate — verify)',
    coordinates: [64.6224, -21.5499],
    factions: [
      'Sturla Sighvatsson / Sturlungar',
      'Snorri Sturluson\'s interests, Þorleifur Þórðarson, Mýramenn and Garðamenn',
    ],
    keyPeople: ['Sturla Sighvatsson', 'Snorri Sturluson', 'Þorleifur Þórðarson'],
    winner: 'Sturla Sighvatsson / Sturlungar',
    casualtyEstimate: 'About 30+ killed',
    summary:
      'A Sturlung family power struggle with real "Game of Thrones Iceland" flavor. Sturla Sighvatsson attacked forces tied to Snorri Sturluson\'s interests at Bær and came out on top.',
    eli12:
      'This is a family power fight, but with armies. Sturla wanted more control. Snorri was politically involved but did not personally stand in the front line. Sturla won and a lot of men died.',
    whyItHappened:
      'Sturla was aggressively expanding Sturlung power, while Snorri\'s network still mattered in the west. Their rivalry mixed family ambition, property, law-court influence, and raw intimidation.',
    whyItMatters:
      'Bæjarbardagi shows the Sturlung Age eating its own family tree. The conflict was not just clan against clan; it was often relatives, in-laws, and former allies turning on each other.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: Sturla Sighvatsson',
        url: 'https://en.wikipedia.org/wiki/Sturla_Sighvatsson',
      },
      {
        title: 'Wikipedia: Snorri Sturluson',
        url: 'https://en.wikipedia.org/wiki/Snorri_Sturluson',
      },
      {
        title: 'Coordinates are approximate — marker uses Bær/Bæjarsveit area',
        url: '',
      },
    ],
  },
  {
    id: 'apavatnsfor-1238',
    name: 'Apavatnsför',
    icelandicName: 'Apavatnsför',
    year: 1238,
    dateText: 'Spring 1238',
    period: 'Age of the Sturlungs',
    type: 'raid',
    locationName: 'Apavatn, South Iceland (coordinates approximate)',
    coordinates: [64.16, -20.66],
    factions: ['Sturla Sighvatsson / Sturlungar', 'Gissur Þorvaldsson / Haukdælir'],
    keyPeople: ['Sturla Sighvatsson', 'Gissur Þorvaldsson'],
    winner: 'Sturla Sighvatsson — but the gamble backfired',
    casualtyEstimate: 'No mass killing; Gissur was seized, disarmed and forced to swear loyalty',
    summary:
      'Sturla Sighvatsson lured Gissur Þorvaldsson to a meeting at Apavatn with about 400 men against Gissur\'s 40, then had him captured, disarmed, and forced to swear loyalty. Sturla openly admitted Gissur was the one man he feared — and then let him live, which proved a fatal mistake.',
    eli12:
      'Sturla wanted to rule all of Iceland, and Gissur was the rival he feared most. He tricked Gissur into a meeting, surrounded him, and made him swear an oath of loyalty. Then he let him go — and Gissur immediately broke the oath and came back for revenge.',
    whyItHappened:
      'Sturla Sighvatsson was making his big push to dominate the whole country. Forcing Gissur to submit was meant to remove his last serious rival without a full battle.',
    whyItMatters:
      'Sparing Gissur was the blunder that doomed the Sturlungar. Within months Gissur and Kolbeinn ungi gathered an army and crushed them at Örlygsstaðir, where Sturla himself was killed.',
    confidence: 'medium',
    sources: [
      { title: 'Wikipedia: Apavatnsför', url: 'https://is.wikipedia.org/wiki/Apavatnsf%C3%B6r' },
      {
        title: 'Wikipedia: Sturla Sighvatsson',
        url: 'https://en.wikipedia.org/wiki/Sturla_Sighvatsson',
      },
    ],
  },
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
    id: 'snorri-sturluson-1241',
    name: 'Assassination of Snorri Sturluson',
    icelandicName: 'Snorri Sturluson drepinn',
    year: 1241,
    dateText: 'September 23, 1241',
    period: 'Age of the Sturlungs',
    type: 'execution',
    locationName: 'Reykholt, Borgarfjörður',
    coordinates: [64.6631, -21.2928],
    factions: [
      'Gissur Þorvaldsson and men acting with royal backing',
      'Snorri Sturluson and his household',
    ],
    keyPeople: ['Snorri Sturluson', 'Gissur Þorvaldsson', 'King Hákon Hákonarson'],
    winner: 'Gissur Þorvaldsson / Norwegian royal faction',
    casualtyEstimate: 'Snorri Sturluson killed in his cellar; household casualties unclear',
    summary:
      'Snorri Sturluson, the most famous writer-politician in Icelandic history, was killed at Reykholt after falling out with the Norwegian king. Gissur Þorvaldsson\'s men found him hiding and cut him down.',
    eli12:
      'Snorri was a brilliant writer, but also a political player. He got on the wrong side of bigger powers. Armed men came to his farm, found him hiding, and killed him.',
    whyItHappened:
      'Snorri had deep ties to Norwegian royal politics but did not reliably obey King Hákon. In Iceland, Gissur Þorvaldsson had both local reasons and royal permission to remove him.',
    whyItMatters:
      'This is where literature and civil war collide. The man tied to the Prose Edda and Heimskringla died as part of the same power struggle that was dragging Iceland toward Norwegian rule.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Snorri Sturluson',
        url: 'https://en.wikipedia.org/wiki/Snorri_Sturluson',
      },
      {
        title: 'Wikipedia: Gissur Þorvaldsson',
        url: 'https://en.wikipedia.org/wiki/Gissur_%C3%9Eorvaldsson',
      },
    ],
  },
  {
    id: 'skalholtsbardagi-1242',
    name: 'Skálholtsbardagi',
    icelandicName: 'Skálholtsbardagi',
    year: 1242,
    dateText: 'January 1242',
    period: 'Age of the Sturlungs',
    type: 'battle',
    locationName: 'Skálholt, South Iceland',
    coordinates: [64.1265, -20.5242],
    factions: [
      'Órækja Snorrason / Sturlungar',
      'Gissur Þorvaldsson / Haukdælir',
    ],
    keyPeople: ['Órækja Snorrason', 'Gissur Þorvaldsson'],
    winner: 'Gissur Þorvaldsson / Haukdælir',
    casualtyEstimate: 'Low; some accounts describe only 1 killed despite many armed men',
    summary:
      'A surprisingly large confrontation at Skálholt, one of Iceland\'s most important religious and political centers. Órækja Snorrason and Gissur Þorvaldsson faced off, but the bloodshed was much smaller than the crowd suggested.',
    eli12:
      'A lot of armed men gathered at one of Iceland\'s most important church centers. It looked like it could become a disaster, but compared with other Sturlung Age fights, the death toll stayed oddly low.',
    whyItHappened:
      'After Snorri Sturluson\'s death, the Sturlung world was full of revenge claims and power grabs. Órækja Snorrason challenged Gissur Þorvaldsson, who was one of the strongest men in the country.',
    whyItMatters:
      'Skálholtsbardagi shows how even holy and administrative centers could become armed political stages. In the Sturlung Age, nowhere important was safely outside the feud system.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: Órækja Snorrason',
        url: 'https://en.wikipedia.org/wiki/%C3%93r%C3%A6kja_Snorrason',
      },
      {
        title: 'Wikipedia: Gissur Þorvaldsson',
        url: 'https://en.wikipedia.org/wiki/Gissur_%C3%9Eorvaldsson',
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
    id: 'thverarfundur-1255',
    name: 'Þverárfundur',
    icelandicName: 'Þverárbardagi',
    year: 1255,
    dateText: 'July 19, 1255',
    period: 'Age of the Sturlungs',
    type: 'battle',
    locationName: 'Þveráreyrar by Munkaþverá in Eyjafjörður (coordinates approximate)',
    coordinates: [65.55, -18.09],
    factions: [
      'Eyjólfur ofsi Þorsteinsson and Hrafn Oddsson (the Flugumýri burners\' faction)',
      'Þorvarður Þórarinsson and Þorgils skarði Böðvarsson (avenging Oddi Þórarinsson)',
    ],
    keyPeople: [
      'Eyjólfur ofsi Þorsteinsson',
      'Hrafn Oddsson',
      'Þorvarður Þórarinsson',
      'Þorgils skarði Böðvarsson',
    ],
    winner: 'Þorvarður Þórarinsson and Þorgils skarði Böðvarsson',
    casualtyEstimate: 'Around 15–17 killed, including Eyjólfur ofsi',
    summary:
      'A nasty northern battle in the power vacuum after Gissur Þorvaldsson left for Norway. Eyjólfur ofsi and his allies were caught in the grinder of revenge politics, and Eyjólfur was killed.',
    eli12:
      'The big boss was away, so everyone else started fighting over the leftovers. Two factions met in Eyjafjörður, the fighting got ugly, and one of the major troublemakers died.',
    whyItHappened:
      'The Sturlung Age was collapsing into faction math: who owed revenge, who had switched sides, and who could grab power before Gissur returned. Þverárfundur was one of those calculations turning violent.',
    whyItMatters:
      'It shows how unstable Iceland remained even after the biggest battles. Killing one powerful man did not solve the system; it usually created the next feud.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: Sturlunga saga',
        url: 'https://en.wikipedia.org/wiki/Sturlunga_saga',
      },
      {
        title: 'Wikipedia: Hrafn Oddsson',
        url: 'https://en.wikipedia.org/wiki/Hrafn_Oddsson',
      },
      {
        title: 'Coordinates are approximate — verify Þveráreyrar in Eyjafjörður',
        url: '',
      },
    ],
  },
  {
    id: 'grundarbardagi-1362',
    name: 'Grundarbardagi',
    icelandicName: 'Grundarbardagi',
    year: 1362,
    dateText: 'July 8, 1362',
    period: 'Norwegian Rule / Post-Commonwealth Iceland',
    type: 'battle',
    locationName: 'Grund in Eyjafjörður (coordinates approximate — verify)',
    coordinates: [65.52, -18.15],
    factions: [
      'Smiður Andrésson, royal official / hirðstjóri',
      'Eyfirðingar / local Icelandic faction',
    ],
    keyPeople: ['Smiður Andrésson', 'Jón Guttormsson'],
    winner: 'Eyfirðingar',
    casualtyEstimate: 'Smiður Andrésson, Jón Guttormsson, and others killed',
    summary:
      'Proof that Icelandic conflict did not magically stop after the Commonwealth ended. At Grund in Eyjafjörður, local Icelandic power pushed violently back against Smiður Andrésson, a royal official.',
    eli12:
      'Iceland was under Norway now, but people still fought. A royal official got into a deadly clash with locals in Eyjafjörður, and the locals won.',
    whyItHappened:
      'Royal government added a new layer to Icelandic politics, but old local power did not vanish. When officials, local elites, and personal enemies collided, violence was still very much on the table.',
    whyItMatters:
      'Grundarbardagi widens the map beyond the Sturlung Age. It shows that Norwegian rule changed the political frame, but Icelandic elites could still settle disputes with force.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: History of Iceland',
        url: 'https://en.wikipedia.org/wiki/History_of_Iceland',
      },
      {
        title: 'Coordinates are approximate — verify the Grund/Eyjafjörður marker',
        url: '',
      },
    ],
  },
  {
    id: 'lenhardur-1502',
    name: 'Killing of Lénharður the Bailiff',
    icelandicName: 'Víg Lénharðs fógeta',
    year: 1502,
    dateText: '1502',
    period: 'Late Catholic Iceland / Danish officials',
    type: 'execution',
    locationName: 'Hraun í Ölfusi, South Iceland (coordinates approximate)',
    coordinates: [63.87, -21.05],
    factions: [
      'Torfi Jónsson í Klofa (sýslumaður) and his posse',
      'Lénharður, a foreign royal bailiff (fógeti)',
    ],
    keyPeople: ['Torfi Jónsson í Klofa', 'Lénharður fógeti'],
    winner: 'Torfi Jónsson',
    casualtyEstimate: 'Lénharður and reportedly some of his men killed',
    summary:
      'The powerful chieftain Torfi Jónsson í Klofa hunted down Lénharður, a much-hated foreign bailiff accused of robbery and abuse, and had him killed at Hraun í Ölfusi. The bishop treated the slaying almost as a public service. A burial mound by the Ölfusá is still said to be his.',
    eli12:
      'A foreign official was throwing his weight around and stealing from people. A tough Icelandic chieftain got fed up, chased him down with a posse, and killed him. Almost nobody punished him — people were glad the bully was gone.',
    whyItHappened:
      'Foreign royal officials were resented for abusing their power over Icelanders. Lénharður had made enough enemies that a leading chieftain felt safe taking the law into his own hands.',
    whyItMatters:
      'An early flashpoint of Icelandic anger at heavy-handed foreign officials — the same friction that would explode far bigger during the Reformation and the long centuries of Danish rule.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: Torfi Jónsson í Klofa',
        url: 'https://en.wikipedia.org/wiki/Torfi_J%C3%B3nsson_%C3%AD_Klofa',
      },
      {
        title: 'Ferlir: Hraun í Ölfusi – dys Lénharðs fógeta',
        url: 'https://ferlir.is/hraun-i-olfusi-dys-lenhards-fogeta/',
      },
    ],
  },
  {
    id: 'sveinsstadir-1522',
    name: 'Sveinsstaðafundur',
    icelandicName: 'Sveinsstaðareið',
    year: 1522,
    dateText: '1522',
    period: 'Late Catholic Iceland / Pre-Reformation',
    type: 'battle',
    locationName: 'Sveinsstaðir in Húnaþing (coordinates approximate — verify)',
    coordinates: [65.56, -20.33],
    factions: [
      'Jón Arason, then bishop-elect / northern church faction',
      'Teitur Þorleifsson ríki and opposing local powers',
    ],
    keyPeople: ['Jón Arason', 'Teitur Þorleifsson'],
    winner: 'Unclear / disputed — Teitur Þorleifsson came out ahead soon after (elected lawman and acquitted at the Alþingi)',
    casualtyEstimate: 'Unclear; source accounts emphasize the armed confrontation more than a casualty count',
    summary:
      'A pre-Reformation power clash that shows Jón Arason was already a political fighter long before his final showdown with Danish Lutheran power. Sveinsstaðir was church politics with horses, weapons, and hard men.',
    eli12:
      'Before Jón Arason became the famous last Catholic bishop, he was already fighting local power battles. This was one of the moments where church leadership looked a lot like clan politics.',
    whyItHappened:
      'Northern Icelandic church offices were valuable, political, and tied to family power. Jón Arason and Teitur Þorleifsson stood on opposite sides of that struggle.',
    whyItMatters:
      'It works as a lead-up to the 1550 Reformation conflict. Jón Arason did not suddenly become political at the end of his life; he had been navigating armed Icelandic power politics for decades.',
    confidence: 'low',
    sources: [
      {
        title: 'Wikipedia: Jón Arason',
        url: 'https://en.wikipedia.org/wiki/J%C3%B3n_Arason',
      },
      {
        title: 'Coordinates, winner, and casualty details need verification against Icelandic local histories',
        url: '',
      },
    ],
  },
  {
    id: 'saudafell-1550',
    name: 'Battle of Sauðafell',
    icelandicName: 'Sauðafellsbardagi',
    year: 1550,
    dateText: 'October 1550',
    period: 'Danish Rule / Reformation',
    type: 'battle',
    locationName: 'Sauðafell in Dalir, West Iceland (coordinates approximate — verify)',
    coordinates: [65.06, -21.68],
    factions: [
      'Catholic resistance: Jón Arason and his sons',
      'Daði Guðmundsson and Lutheran / royal-aligned Icelandic forces',
    ],
    keyPeople: ['Jón Arason', 'Björn Jónsson', 'Ari Jónsson', 'Daði Guðmundsson'],
    winner: 'Daði Guðmundsson / Lutheran royal-aligned faction',
    casualtyEstimate: 'Low or unclear; Jón Arason and his sons were captured, then executed later at Skálholt',
    summary:
      'Jón Arason\'s last armed stand collapsed at Sauðafell. Daði Guðmundsson defeated and captured the Catholic bishop and his sons, setting up their execution at Skálholt weeks later.',
    eli12:
      'This is the fight right before the beheading. Jón Arason tried to resist the Reformation with force, lost the battle, got captured with his sons, and was taken toward his death.',
    whyItHappened:
      'The Danish crown was forcing Lutheran reform through Iceland, while Jón Arason defended Catholic power, church property, and northern political independence. The argument had moved beyond sermons into armed force.',
    whyItMatters:
      'Sauðafell is the missing step between religious tension and the execution already on the map. Without this defeat, Jón Arason does not end up helpless at Skálholt.',
    confidence: 'medium',
    sources: [
      {
        title: 'Wikipedia: Jón Arason',
        url: 'https://en.wikipedia.org/wiki/J%C3%B3n_Arason',
      },
      {
        title: 'Wikipedia: Daði Guðmundsson',
        url: 'https://en.wikipedia.org/wiki/Da%C3%B0i_Gu%C3%B0mundsson',
      },
      {
        title: 'Coordinates and casualty details need verification against Icelandic Reformation sources',
        url: '',
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
    id: 'spanverjavigin-1615',
    name: 'Slaying of the Basques',
    icelandicName: 'Spánverjavígin',
    year: 1615,
    dateText: 'Autumn 1615',
    period: 'Danish Rule',
    type: 'massacre',
    locationName: 'Westfjords — Ísafjarðardjúp / Æðey / Sandeyri area (representative marker; coordinates approximate — verify)',
    coordinates: [66.09, -22.66],
    factions: [
      'Stranded Basque whalers',
      'Icelandic local authorities and armed locals under Ari Magnússon of Ögur',
    ],
    keyPeople: ['Ari Magnússon', 'Martín de Villafranca', 'Jón Guðmundsson lærði'],
    winner: 'Icelandic local authorities',
    casualtyEstimate: 'Around 31–32 Basques killed',
    summary:
      'One of the darkest and strangest events in Icelandic history. Basque whalers were shipwrecked in the Westfjords, survival turned into conflict with locals, and Icelandic authorities ordered killings across the Ísafjarðardjúp area.',
    eli12:
      'A group of foreign whalers got stranded after their ships were wrecked. Things got tense with local Icelanders, and instead of solving it peacefully, armed locals hunted and killed dozens of them.',
    whyItHappened:
      'The Basques were far from home, short on options, and trying to survive after shipwrecks. Local officials saw them as dangerous outsiders and used harsh legal authority to justify violence.',
    whyItMatters:
      'Spánverjavígin is remembered partly because Jón Guðmundsson lærði condemned the killings. It is a brutal warning that fear, hunger, and official power can turn a disaster into a massacre.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Slaying of the Basques',
        url: 'https://en.wikipedia.org/wiki/Slaying_of_the_Basques',
      },
      {
        title: 'Wikipedia: Jón Guðmundsson lærði',
        url: 'https://en.wikipedia.org/wiki/J%C3%B3n_Gu%C3%B0mundsson_l%C3%A6r%C3%B0i',
      },
      {
        title: 'Representative marker only — killings happened in multiple Westfjords locations',
        url: '',
      },
    ],
  },
  {
    id: 'tyrkjaranid-austfirdir-1627',
    name: 'Turkish Abductions on the Eastfjords',
    icelandicName: 'Tyrkjaránið á Austfjörðum',
    year: 1627,
    dateText: 'July 5–13, 1627',
    period: 'Danish Rule',
    type: 'raid',
    locationName: 'Berufjörður and Breiðdalur, East Iceland (representative marker near Djúpivogur)',
    coordinates: [64.66, -14.28],
    factions: [
      'Barbary corsairs raiding the Eastfjords',
      'Icelandic coastal communities in Berufjörður and Breiðdalur',
    ],
    keyPeople: ['Barbary corsairs', 'East Iceland coastal communities'],
    winner: 'Barbary corsairs',
    casualtyEstimate: 'Around 110 people taken from the Eastfjords; local casualty details vary',
    summary:
      'Before the better-known Vestmannaeyjar raid, corsairs hit the Eastfjords. They raided around Berufjörður and Breiðdalur, taking about 110 people from small coastal communities.',
    eli12:
      'Pirates did not only attack the Westman Islands. They also came to East Iceland first, grabbed people from fjord farms and villages, and sailed away with them.',
    whyItHappened:
      'The corsairs were raiding European coasts for captives to sell into slavery. East Iceland was remote, lightly defended, and exposed to ships moving along the coast.',
    whyItMatters:
      'This gives the Austfirðir their own marker instead of hiding them inside the general Tyrkjaránið event. The trauma was national, but the first shock hit eastern communities hard.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Turkish Abductions',
        url: 'https://en.wikipedia.org/wiki/Turkish_Abductions',
      },
      {
        title: 'Wikipedia: Tyrkjaránið',
        url: 'https://is.wikipedia.org/wiki/Tyrkjar%C3%A1ni%C3%B0',
      },
      {
        title: 'Representative marker near Djúpivogur — raids affected multiple Eastfjords locations',
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
    id: 'kopavogur-1662',
    name: 'The Kópavogur Oath',
    icelandicName: 'Kópavogsfundurinn / Erfðahyllingin',
    year: 1662,
    dateText: 'July 28, 1662',
    period: 'Danish Rule / Absolutism',
    type: 'occupation',
    locationName: 'Kópavogsþingstaður (Þinghóll), Kópavogur (coordinates approximate)',
    coordinates: [64.1057, -21.9118],
    factions: [
      'Danish Crown (Frederick III) via commissioner Henrik Bjelke',
      'Icelandic officials, clergy and lawmen',
    ],
    keyPeople: ['Henrik Bjelke', 'Árni Oddsson', 'Brynjólfur Sveinsson'],
    winner: 'Danish Crown',
    casualtyEstimate: 'None — a coerced political submission, not a battle',
    summary:
      'Iceland\'s leaders gathered at Kópavogur and swore an oath accepting Frederick III as hereditary and absolute monarch. A famous later tradition says Bjelke had soldiers on hand and that the aged lawman Árni Oddsson signed in tears — though contemporary sources do not actually confirm the threat.',
    eli12:
      'Denmark\'s king wanted total, inherited power over Iceland. Icelandic leaders were summoned to Kópavogur and made to sign their agreement. The legend says soldiers stood by and an old judge wept as he signed — but we can\'t be sure that part really happened.',
    whyItHappened:
      'After costly wars, Frederick III turned Denmark into an absolute monarchy and made his overseas lands, Iceland included, formally submit. Letters in 1662 ordered Icelandic representatives to come and pledge the new oath.',
    whyItMatters:
      'It locked Iceland into Danish absolutism for nearly two centuries and became a powerful symbol in the later independence struggle — the moment Icelanders were said to have signed away their freedom under threat.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Kópavogsfundurinn',
        url: 'https://is.wikipedia.org/wiki/K%C3%B3pavogsfundurinn',
      },
      {
        title: 'Vísindavefurinn: Kópavogsfundurinn',
        url: 'https://www.visindavefur.is/svar.php?id=61371',
      },
    ],
  },
  {
    id: 'jorgensen-1809',
    name: 'Jørgen Jørgensen\'s Revolution',
    icelandicName: 'Jörundarhundadagarnir',
    year: 1809,
    dateText: 'June–August 1809',
    period: 'Danish Rule / Napoleonic Era',
    type: 'occupation',
    locationName: 'Reykjavík (representative marker)',
    coordinates: [64.1466, -21.9426],
    factions: [
      'Jørgen Jørgensen and British merchant allies',
      'Danish colonial administration in Iceland',
    ],
    keyPeople: ['Jørgen Jørgensen', 'Frederik Trampe', 'Samuel Phelps'],
    winner: 'Jørgen Jørgensen temporarily, then Danish authority restored',
    casualtyEstimate: 'No major battle casualties; a political coup rather than a battlefield war',
    summary:
      'For a few wild weeks in 1809, Danish adventurer Jørgen Jørgensen arrested the Danish governor and declared Iceland independent under his own protection. It was bold, bizarre, and very temporary.',
    eli12:
      'A Danish adventurer showed up with British backing, grabbed the governor, and basically said, "Iceland is free now, and I am in charge." Then Britain shut the whole thing down.',
    whyItHappened:
      'The Napoleonic Wars disrupted Denmark, Britain, trade, and North Atlantic politics. Iceland was isolated and vulnerable, and Jørgensen used the chaos to stage a takeover.',
    whyItMatters:
      'It is not a normal battle, but it is one of Iceland\'s strangest political conflicts. It shows how global war could suddenly reach Reykjavík and shake Danish rule, even briefly.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: Jørgen Jørgensen',
        url: 'https://en.wikipedia.org/wiki/J%C3%B8rgen_J%C3%B8rgensen',
      },
      {
        title: 'Wikipedia: Jörundarhundadagarnir',
        url: 'https://is.wikipedia.org/wiki/J%C3%B6rundarhundadagarnir',
      },
    ],
  },
  {
    id: 'guttoslagurinn-1932',
    name: 'The Gúttó Riot',
    icelandicName: 'Gúttóslagurinn',
    year: 1932,
    dateText: 'November 9, 1932',
    period: 'Kingdom of Iceland / Great Depression',
    type: 'other',
    locationName: 'Góðtemplarahúsið (Gúttó), by Tjörnin, Reykjavík',
    coordinates: [64.1462, -21.942],
    factions: ['Reykjavík workers and the unemployed', 'Reykjavík police'],
    keyPeople: ['Hermann Jónasson (police chief)', 'Reykjavík labour movement'],
    winner: 'The workers — the wage cut was dropped',
    casualtyEstimate: 'No deaths; 20 of 28 police injured, plus injured townspeople',
    summary:
      'At the depth of the Great Depression, the city council tried to cut the wages of its unemployment-relief work. A furious crowd packed into Gúttó, the fighting spilled into the streets, and the police were overwhelmed — nearly every officer was hurt. The council backed down and never raised the cut again.',
    eli12:
      'During a terrible economic crisis, the city tried to pay jobless people even less for relief work. People were so angry they fought the police outside the meeting hall and won. The city got scared and cancelled the pay cut.',
    whyItHappened:
      'Mass unemployment in the Depression made the relief wage a lifeline. Cutting it felt like an attack on people already on the edge, and Reykjavík\'s growing labour movement was ready to fight back.',
    whyItMatters:
      'The biggest clash of Iceland\'s labour struggles — a moment when ordinary workers physically beat the authorities. It pushed Iceland to build a real organised police force and deepened the country\'s left-right divide.',
    confidence: 'high',
    sources: [
      { title: 'Wikipedia: Gúttóslagurinn', url: 'https://en.wikipedia.org/wiki/G%C3%BAtt%C3%B3slagurinn' },
    ],
  },
  {
    id: 'operation-fork-1940',
    name: 'British Invasion of Iceland',
    icelandicName: 'Hernám Breta',
    year: 1940,
    dateText: 'May 10, 1940',
    period: 'World War II',
    type: 'occupation',
    locationName: 'Reykjavík harbour and key sites around Iceland',
    coordinates: [64.1503, -21.9419],
    factions: [
      'United Kingdom / Royal Marines',
      'Neutral Iceland under Danish sovereignty',
    ],
    keyPeople: ['Royal Marines', 'Icelandic government', 'British government'],
    winner: 'United Kingdom occupation force',
    casualtyEstimate: 'No combat deaths; Iceland had no army and did not fight the landing',
    summary:
      'British forces landed in Reykjavík in 1940 to keep Iceland out of German hands after Denmark fell. Iceland was neutral and had no army, so the invasion was tense but nearly bloodless.',
    eli12:
      'Britain was afraid Nazi Germany might use Iceland as a North Atlantic base. So British troops showed up, took control of key places, and Iceland could not really stop them.',
    whyItHappened:
      'Germany had occupied Denmark in April 1940, leaving Iceland strategically exposed. Britain wanted control of the island\'s harbours, airfields, and North Atlantic position before Germany could move.',
    whyItMatters:
      'Operation Fork pulled Iceland directly into World War II strategy. It also led to later American defense arrangements and helped push Iceland toward full independence from Denmark in 1944.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: British invasion of Iceland',
        url: 'https://en.wikipedia.org/wiki/British_invasion_of_Iceland',
      },
      {
        title: 'Wikipedia: Iceland in World War II',
        url: 'https://en.wikipedia.org/wiki/Iceland_in_World_War_II',
      },
    ],
  },
  {
    id: 'austurvollur-1949',
    name: 'Anti-NATO Riot on Austurvöllur',
    icelandicName: 'Óeirðirnar á Austurvelli 1949',
    year: 1949,
    dateText: 'March 30, 1949',
    period: 'Republic of Iceland / Cold War',
    type: 'other',
    locationName: 'Austurvöllur, in front of the Alþingi, Reykjavík',
    coordinates: [64.1466, -21.9408],
    factions: [
      'Opponents of NATO membership',
      'Police, reinforcements and pro-NATO supporters',
    ],
    keyPeople: ['Alþingi', 'Anti-NATO demonstrators'],
    winner: 'The government — NATO membership was approved',
    casualtyEstimate: 'No deaths; many injured by stones and batons; tear gas used',
    summary:
      'As the Alþingi voted to join NATO, thousands gathered on Austurvöllur. Some pelted the parliament building with stones and eggs; police and pro-membership volunteers answered with batons and tear gas. It became the largest riot in Icelandic history — and Iceland joined NATO anyway.',
    eli12:
      'Iceland was deciding whether to join the military alliance NATO. Many people hated the idea and protested outside parliament, some throwing rocks. Police fought back with tear gas. It got really violent, but parliament voted yes anyway.',
    whyItHappened:
      'Joining a military alliance horrified many Icelanders — a country with no army and a strong neutralist and socialist tradition. The vote pushed the disagreement out into the streets.',
    whyItMatters:
      'It exposed a deep, lasting split in Iceland over Western military ties, foreign bases and neutrality — an argument that ran through the whole Cold War.',
    confidence: 'high',
    sources: [
      {
        title: 'Wikipedia: 1949 anti-NATO riot in Iceland',
        url: 'https://en.wikipedia.org/wiki/1949_anti-NATO_riot_in_Iceland',
      },
      {
        title: 'Wikipedia: Óeirðirnar á Austurvelli 1949',
        url: 'https://is.wikipedia.org/wiki/%C3%93eir%C3%B0irnar_%C3%A1_Austurvelli_1949',
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
