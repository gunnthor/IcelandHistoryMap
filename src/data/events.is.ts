import { EventTranslation } from '../i18n/localize';

// ── Íslenskur texti atburðanna ──
// Yfirlag ofan á events.ts, lyklað á atburða-id. Enski textinn er grunnurinn;
// hér er íslenska útgáfan — ekki bein þýðing heldur endursögn á íslensku með
// orðfæri heimildanna sjálfra (víg, brenna, för, fundur, sátt...). Reglur:
//   - Nöfn atburða fylgja íslenskri sagnaritunarhefð (Örlygsstaðabardagi,
//     Flóabardagi, Víg Gunnars á Hlíðarenda...).
//   - Heimildir vísa á íslenskar útgáfur þar sem þær eru til: íslensku
//     Wikipediu (tilvist greina staðfest júlí 2026), íslenska sagnatexta á
//     SagaDB/Netútgáfunni. Enskar heimildir halda sér merktar „(á ensku)“.
//   - before/after erfa eventId-tengla frá enska grunninum; hér er aðeins texti.
// Vantar eitthvað svið? Það fellur sjálfkrafa aftur á enskuna — sjá localize.ts.
export const eventTranslations: Record<string, EventTranslation> = {
  'ingolfur-vestmannaeyjar-thralls': {
    name: 'Víg Vestmanna í Eyjum',
    dateText: 'Landnámsöld — hefðbundin tímasetning (um 875)',
    period: 'Landnámsöld',
    locationName: 'Heimaklettur í Heimaey, Vestmannaeyjum (hefðarstaðurinn Dufþekja)',
    factions: [
      'Ingólfur Arnarson, fyrsti landnámsmaður Íslands',
      'Írskir þrælar Hjörleifs undir forystu Dufþaks',
    ],
    winner: 'Ingólfur — allir þrælarnir vegnir eða hröktust fyrir björg',
    casualtyEstimate: 'Hjörleifur og menn hans vegnir fyrst; síðan allur þrælahópurinn',
    summary:
      'Samkvæmt Landnámabók vógu írskir þrælar Hjörleifs hann við Hjörleifshöfða og flýðu með konurnar út í eyjarnar undan landi. Ingólfur fóstbróðir hans elti þá uppi og drap þá alla — Dufþakur hljóp fyrir björg þar sem síðan heitir Dufþekja. Eyjarnar fengu nafnið Vestmannaeyjar eftir þrælunum, sem kallaðir voru Vestmenn.',
    eli12:
      'Fóstbróðir fyrsta landnámsmannsins átti írska þræla sem drápu hann og flúðu út í eyjar. Ingólfur elti þá uppi og drap þá alla. Eyjarnar heita enn Vestmannaeyjar eftir þessum þrælum.',
    whyItHappened:
      'Þrælar Hjörleifs voru írskir hertökumenn sem þráðu frelsi; þeir sviðsettu dauða hans og flúðu. Í samfélagi sem hvíldi á frændsemi og hefndarskyldu átti Ingólfur ekki annars úrkosti en að hefna fóstbróður síns.',
    whyItMatters:
      'Þetta er upprunasagan á bak við nafn Vestmannaeyja og áminning um að landnám norrænna manna hvíldi meðal annars á írsku þrælahaldi. Sagan er úr Landnámabók og ber að taka henni sem arfsögn fremur en skjalfestri staðreynd.',
    before:
      'Ísland var mannlaust. Ingólfur og Hjörleifur voru nýkomnir sem fyrstu landnámsmennirnir — þetta er ár eitt í allri sögunni.',
    after:
      'Landnámið tók kipp; innan sextíu ára var landið albyggt, og deilumenningin sem landnámsmenn fluttu með sér fór að skrifa Íslendingasögurnar.',
    humanDrama:
      'Upprunasaga Íslands er blóðug. Þrælarnir voru engin illmenni — þeir voru menn hnepptir í ánauð að freista frelsis, og foringi þeirra valdi bjargbrúnina fremur en að láta taka sig. Dómur Ingólfs yfir fóstbróður sínum látnum segir sitt: „lítið lagðist hér fyrir góðan dreng, er þrælar skyldu að bana verða“ — og hann bætti við að svo færi hverjum þeim er eigi vildi blóta. Jafnvel hefndin kom með siðaprédikun.',
    confidenceNote:
      'Lítill áreiðanleiki. Eina heimildin er Landnámabók, skráð um 250 árum eftir atburðina af mönnum sem höfðu hag af snyrtilegum upprunasögum. Örnefnin eru til; hvort sagan á bak við þau er sönn getur enginn sagt.',
    sources: [
      {
        title: 'Wikipedia: Vestmannaeyjar',
        url: 'https://is.wikipedia.org/wiki/Vestmannaeyjar',
      },
      {
        title: 'Landnámabók (Sturlubók) — heildartexti á Netútgáfunni',
        url: 'https://www.snerpa.is/net/snorri/landnama.htm',
      },
      {
        title: 'Arfsögn — merkið stendur á Heimakletti, þar sem brekkan Dufþekja ber nafn þrælaforingjans',
        url: '',
      },
    ],
  },
  'eldgja-939': {
    name: 'Eldgjárgosið',
    dateText: 'um 937–940 (aldursgreint úr ískjörnum, meginhrina um 939–940)',
    period: 'Landnámsöld',
    locationName: 'Eldgjá, milli Mýrdalsjökuls og Vatnajökuls',
    factions: ['Nýnumið Ísland gegn mesta hraunflóði sögulegs tíma'],
    winner: 'Eldstöðin — en byggðin lifði af',
    casualtyEstimate: 'Óþekkt — engar ritheimildir voru enn til; unga byggðin þraukaði þó greinilega',
    summary:
      'Aðeins um sextíu árum eftir að landnám hófst rifnaði Eldgjá upp og út flæddi mesta hraunflóð síðasta árþúsunds — stærra en Skaftáreldar. Ískjarnar um allt norðurhvel geyma brennisteininn; íslenskar heimildir þegja, því enginn á landinu kunni enn að skrifa.',
    eli12:
      'Rétt eftir að fólk flutti til Íslands opnaðist risastór sprunga í jörðinni og flæddi meira hraun yfir Suðurland en nokkurt gos á jörðinni hefur skilað í þúsund ár. Enginn skrifaði það niður — ritöld var ekki hafin — en ísinn á Grænlandi man enn reykinn.',
    whyItHappened:
      'Eldgjá tilheyrir eldstöðvakerfi Kötlu, og Ísland situr á Atlantshafshryggnum: sprungugos af þessari stærð eru einfaldlega hvernig landið varð til. Landnámsmenn höfðu numið land á lifandi verkstæði án þess að vita það.',
    whyItMatters:
      'Fyrstu stórhamfarir Íslandssögunnar — og hugsanlega áhrifavaldur á hugarfar kristnitökualdar: sumir fræðimenn lesa myndir Völuspár af brennandi, myrkvuðum heimi sem minningu um Eldgjá, kveðnar meðan eldarnir voru enn í manna minnum.',
    before:
      'Landnámsmenn höfðu helgað sér land í tvær kynslóðir án þess að vita hvað jörðin undir túnunum gat gert.',
    after:
      'Næsta risasprungugos, 850 árum síðar, yrði skjalfest í kvalafullum smáatriðum — og felldi fimmtung þjóðarinnar.',
    humanDrama:
      'Kynslóð frumbyggja sigldi yfir haf til óbyggðrar eyju — og áður en börn þeirra voru öll gekk sjóndeildarhringurinn í ljósum logum. Ef Völuspárkenningin stenst rataði minningin um Eldgjá inn í frægasta kvæði norrænna manna: sól tér sortna, leikur hár hiti við himin sjálfan.',
    confidenceNote:
      'Mikill áreiðanleiki um gosið sjálft — ískjarnar og gjóskurannsóknir tímasetja það um 937–940 og mæla stærð þess nákvæmlega. Hvað Íslendingar upplifðu er ályktun: ritheimildir hefjast tveimur öldum síðar, og Völuspártengingin er túlkun, ekki staðreynd.',
    sources: [
      { title: 'Wikipedia: Eldgjá', url: 'https://is.wikipedia.org/wiki/Eldgj%C3%A1' },
      {
        title: 'Oppenheimer o.fl.: Eldgjárgosið — tímasetning, áhrif og kristnitakan (á ensku)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6560931/',
      },
      {
        title: 'AGU: Eldgjárgosið greint í háupplausnarískjörnum (á ensku)',
        url: 'https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2023JD040142',
      },
    ],
  },
  'hrafnkell-einar-freyfaxi': {
    name: 'Víg Einars Þorbjarnarsonar',
    dateText: 'Söguöld — ártal óvíst',
    period: 'Söguöld / Austurland',
    locationName: 'Aðalból í Hrafnkelsdal',
    factions: ['Hrafnkell Freysgoði á Aðalbóli', 'Einar Þorbjarnarson og frændgarður hans'],
    winner: 'Hrafnkell Freysgoði fyrst um sinn; Sámur knésetur hann síðar',
    casualtyEstimate: 'Einar veginn; hefnd og lagaleg niðurlæging fylgdu í kjölfarið',
    summary:
      'Hinn frægi neisti Hrafnkels sögu. Hrafnkell hafði heitið því að engum héldist uppi að ríða hestinum Freyfaxa, sem hann hafði helgað Frey. Einar smalamaður gerði það samt, og Hrafnkell vó hann fyrir vikið. Eitt hestlán varð að valdakreppu á Austurlandi öllu.',
    eli12:
      'Voldugur goði átti hest sem hann fór með eins og heilaga skepnu. Vinnumaður reið honum þótt það væri bannað. Hrafnkell drap hann — og þá kom fjölskylda hins látna og krafðist réttlætis.',
    whyItHappened:
      'Sagan gerir persónulega reglu að prófsteini á vald. Hrafnkell telur stöðu sína og eið vega þyngra en líf Einars; fjölskylda Einars neitar að kyngja því þegjandi.',
    whyItMatters:
      'Þetta setur sterkt sögualdarmerki á Austurland. Hér er ekki skjalfestur vígvöllur, heldur sýnikennsla í því hvernig heiður, átrúnaður, eignarréttur og lög gátu öll rekist á í einu vígi.',
    before:
      'Á söguöld voru til lög en hvorki lögregla né konungur — heiður og frændgarður voru eina framkvæmdavaldið, svo persónulegt heit gat haft þunga laga.',
    after:
      'Sama heiðurslógík hélt áfram að vinda upp á sig: frá einum vegnum smalamanni upp í deilur sem gleyptu heil héruð.',
    humanDrama:
      'Maður dó fyrir að ríða hesti. Hrafnkell hafði svarið Frey þess eið að vega hvern þann sem riði Freyfaxa — svo þegar smalamaður gerði það til að ná saman týndu fé vó Hrafnkell hann nánast afsakandi, fangi eigin heits. Beiski broddurinn í sögunni: eiðurinn, goðið og hesturinn reyndust allir einskis virði á endanum.',
    modernTranslation:
      'Yfirmaðurinn tilkynnir öllum: „sá sem snertir bílinn minn er búinn að vera.“ Dag einn þarftu bílinn í raunverulegu neyðartilviki í vinnunni. Hann rekur þig á staðnum — ekki af því að hann sé reiður, heldur af því að hann sagðist mundu gera það, og í þessum heimi kostar meira að éta ofan í sig orðin en mannslíf.',
    confidenceNote:
      'Lítill áreiðanleiki. Hrafnkels saga er svo haganlega fléttuð að margir fræðimenn telja hana nær miðaldaskáldsögu en annál — hún kann að vera nánast hreinn skáldskapur hengdur á raunverulega staði og nöfn.',
    sources: [
      {
        title: 'Wikipedia: Hrafnkels saga Freysgoða',
        url: 'https://is.wikipedia.org/wiki/Hrafnkels_saga_Freysgo%C3%B0a',
      },
      {
        title: 'Hrafnkels saga Freysgoða — íslenskur texti (SagaDB)',
        url: 'https://sagadb.org/hrafnkels_saga_freysgoda',
      },
      {
        title: 'Merkið stendur við Aðalból í Hrafnkelsdal; atburðir sögunnar verða ekki sannreyndir',
        url: '',
      },
    ],
  },
  'vopnfirdinga-feud': {
    name: 'Deilur Vopnfirðinga',
    dateText: 'Söguöld — ártal óvíst',
    period: 'Söguöld / Austurland',
    locationName: 'Vopnafjörður (merkið er táknrænt)',
    factions: ['Brodd-Helgi og hans menn', 'Geitir Lýtingsson og bandamenn hans'],
    winner: 'Enginn hreinn sigurvegari; deilurnar veltast milli kynslóða',
    casualtyEstimate: 'Nokkur víg í deilunum; tölum ber ekki saman milli sagnahefða',
    summary:
      'Hörð héraðadeila úr Vopnafirði, full af metingi, vígum og hefndum — ekki ein afmörkuð orrusta heldur austfirskur suðupottur sem kraumaði kynslóðum saman.',
    eli12:
      'Tvær valdamiklar fjölskyldur í sama firði lenda sífellt saman. Einhver er drepinn, ættingjarnir heimta hefnd og næsta kynslóð erfir ósættið.',
    whyItHappened:
      'Vopnfirðinga saga snýst um heiður, frændsemi, móðganir og yfirráð í héraði. Í samfélagi án ríkisvalds gat ættardeila orðið helsta pólitíska veðurkerfi heils fjarðar.',
    whyItMatters:
      'Hér fær kortið almennilega austfirska sagnadeilu. Hún sýnir að sögualdarofbeldið var ekki bundið við Suður- og Vesturland.',
    before:
      'Austfirðir bjuggu við sama suðupott og landið allt: stoltar ættir, takmörkuð gæði og ekkert yfirvald ofan við héraðsgoðann.',
    after:
      'Deilur á borð við þessa voru smækkuð æfing fyrir það sem landið allt gerði sjálfu sér á Sturlungaöld.',
    humanDrama:
      'Brodd-Helgi og Geitir byrjuðu sem mágar og aldavinir — og eyddu svo árunum í að brjóta hvor annan niður vegna fjár, metorða og stolts. Báðir féllu að lokum fyrir liði hins, og synir þeirra erfðu deiluna eins og ættargrip sem enginn gat afþakkað.',
    confidenceNote:
      'Lítill áreiðanleiki. Sagan var skráð öldum eftir atburðina sem hún þykist lýsa. Ættirnar og fjörðurinn eru raunveruleg; atburðarásin í smáatriðum er bókmenntir.',
    sources: [
      {
        title: 'Wikipedia: Vopnfirðinga saga',
        url: 'https://is.wikipedia.org/wiki/Vopnfir%C3%B0inga_saga',
      },
      {
        title: 'Vopnfirðinga saga — íslenskur texti (SagaDB)',
        url: 'https://sagadb.org/vapnfirdinga_saga',
      },
      {
        title: 'Táknrænt merki í Vopnafirði — nákvæmir sögustaðir þarfnast staðfestingar',
        url: '',
      },
    ],
  },
  'gunnar-hlidarendi-990': {
    name: 'Víg Gunnars á Hlíðarenda',
    dateText: 'Söguöld — um 990, hefðbundið ártal',
    period: 'Söguöld / Þjóðveldið',
    locationName: 'Hlíðarendi í Fljótshlíð',
    factions: [
      'Gunnar Hámundarson, einn á bæ sínum',
      'Flokkur uppsafnaðra óvina undir forystu Gissurar hvíta',
    ],
    winner: 'Aðfararmennirnir — eftir viðureign sem sagan lætur þá hálfskammast sín fyrir',
    casualtyEstimate: 'Gunnar veginn; sagan eignar honum tvo fallna og marga særða úr aðfararliðinu',
    summary:
      'Gullni kappi Njálu, dæmdur til þriggja ára utanfarar, reið til skips — leit þá um öxl upp í hlíðina og gat ekki farið. Sekur fyrir að sitja heima var hann umsetinn á bæ sínum og varðist einn með boga þar til strengurinn brast. Hallgerður kona hans neitaði honum um tvo lokka úr hári sínu í nýjan streng og galt þar löðrung frá fyrri tíð. Þeir urðu að rjúfa þakið til að fella hann.',
    eli12:
      'Gunnar var mesti bardagamaður Íslands en dómur sagði honum að fara úr landi í þrjú ár. Hann sneri við af því að heimahagarnir voru of fallegir til að yfirgefa þá. Óvinirnir umkringdu húsið; bogastrengurinn slitnaði; konan hans neitaði að gefa honum hár í nýjan — af því að hann hafði einu sinni löðrungað hana, mörgum árum fyrr. Svo drápu þeir hann.',
    whyItHappened:
      'Áralangar deilur — margar kyntar af Hallgerði — hlóðu upp óvinum og málaferlum þar til utanferð varð sáttin. Með því að fara hvergi varð Gunnar skógarmaður sem hver sem var mátti vega án lagalegra afleiðinga.',
    whyItMatters:
      'Frægasta dauðasena íslenskra bókmennta og skarpasta mynd sagnanna af klemmu hins seka: lögin gátu aðeins varið þann sem hlýddi þeim. „Fögur er hlíðin“ er enn íslenskt tákn þess að unna heimahögum meira en lífinu.',
    before:
      'Vinátta Gunnars við lögvitringinn Njál hafði haldið deilum hans lífvænlegum árum saman — en jafnvel Njáll átti ekkert svar við útlegðardómi sem var virtur að vettugi.',
    after:
      'Deiluvélin sem felldi Gunnar malaði áfram í tvo áratugi til viðbótar, uns hún náði bæ Njáls sjálfs — með eldi.',
    humanDrama:
      'Allt hangir á einum löðrungi. Árum fyrr hafði Gunnar slegið Hallgerði; við dauðans dyr bað hann hana um tvo lokka úr hári hennar í bogastreng. „Þá skal eg nú muna þér kinnhestinn,“ svaraði hún og neitaði. Hann svaraði að hver hefði sinn hátt á að afla sér frægðar — og féll svo einn gegn öllum.',
    modernTranslation:
      'Héraðshetja fær dómsátt: þrjú ár erlendis og allir halda áfram með líf sitt. Hann keyrir áleiðis á flugvöllinn, sér dalinn sinn í baksýnisspeglinum og snýr við — vitandi að það ógildir alla hans réttarvernd. Óvinirnir mæta innan árstíðar, og hjónabandið velur nákvæmlega þá stund til að leggja fram lokareikninginn.',
    confidenceNote:
      'Lítill áreiðanleiki. Þetta er Njála upp á sitt bókmenntalegasta, rituð um 250 árum síðar — Gunnar var til í arfsögn og Hlíðarendi er raunverulegt býli, en bogastrengssenan er frásagnarlist, ekki skjalfesting.',
    sources: [
      {
        title: 'Brennu-Njáls saga (víg Gunnars) — íslenskur texti (SagaDB)',
        url: 'https://sagadb.org/brennu-njals_saga',
      },
      {
        title: 'Wikipedia: Gunnar Hámundarson',
        url: 'https://is.wikipedia.org/wiki/Gunnar_H%C3%A1mundarson',
      },
      {
        title: 'Hurstwic: Gunnar Hámundarson (á ensku)',
        url: 'https://www.hurstwic.org/library/heroes/text/gunnar.htm',
      },
    ],
  },
  'kristnitakan-1000': {
    name: 'Kristnitakan',
    dateText: 'um 999–1000, á Alþingi',
    period: 'Söguöld / Þjóðveldið',
    locationName: 'Þingvellir (Lögberg), Alþingi',
    factions: [
      'Kristnir höfðingjar (með stuðningi Noregskonungs)',
      'Heiðnir höfðingjar og gömlu goðin',
    ],
    winner: 'Friðsamleg málamiðlun — Ísland tekur kristni',
    casualtyEstimate: 'Ekkert mannfall á þinginu — tilgangurinn var einmitt að afstýra borgarastyrjöld',
    summary:
      'Ísland skipti um trú án orrustu. Þegar kristnir og heiðnir vígbjuggust í tvær fylkingar á Alþingi var lögsögumaðurinn Þorgeir Ljósvetningagoði — sjálfur heiðinn — fenginn til að skera úr fyrir alla. Hann lá undir feldi dag og nótt og kvað svo upp: Ísland skyldi kristið, með nokkrum hljóðlátum tilslökunum við gamla siðinn.',
    eli12:
      'Ísland var að klofna í tvennt út af trúarbrögðum: kristnir gegn þeim sem trúðu á gömlu norrænu goðin. Í stað þess að berjast létu menn einn mann sem allir treystu ákveða fyrir alla. Hann valdi kristnina — en leyfði fólki að halda sumum gömlu siðunum í kyrrþey. Borgarastyrjöld afstýrt.',
    whyItHappened:
      'Ólafur Tryggvason Noregskonungur þrýsti fast á Ísland að taka kristni og hélt meira að segja Íslendingum í gíslingu. Heima höfðu trúboðar klofið landið, og báðar fylkingar mættu til Alþingis reiðubúnar að segja sig úr lögum hvor við aðra — sem hefði þýtt stríð.',
    whyItMatters:
      'Ein frægasta friðsamlega lausn miðaldasögunnar. Hún hélt landinu í einu lagi, umbylti menningu þess og lögum, og er enn sögð sem þjóðarsaga um að velja málamiðlun fremur en blóð.',
    before:
      'Trúboðar höfðu skipt landinu í vopnaðar fylkingar og Noregskonungur hélt íslenskum gíslum til að knýja málið fram.',
    after:
      'Kirkjan óx og varð sjálf að veldi — tveimur öldum síðar gerðu biskupar og höfðingjar upp ágreining sinn með vopnum.',
    humanDrama:
      'Trúarbrögð heillar þjóðar réðust af einum manni liggjandi undir feldi dag og nótt. Þorgeir var heiðinn goði — og dæmdi gegn eigin goðum, því hann hafði komist að því að ein lög skiptu meira máli en hvaða guð þau nefndu. Svo fór hann heim og steypti goðalíkneskjunum í fossinn — að minnsta kosti segir sagan það.',
    modernTranslation:
      'Land á barmi borgarastyrjaldar um tilvistarlegt menningarmál samþykkir bindandi gerðardóm — og felur dómaranum úr tapliðinu úrskurðinn. Hann dæmir gegn eigin fylkingu til að halda landinu saman, með nokkrum hljóðlátum undanþágum svo hinir geti lifað við niðurstöðuna.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Kjarnafrásögnin er úr Íslendingabók Ara fróða, ritaðri um 120 árum síðar eftir nafngreindum heimildarmönnum — óvenjugóð heimildafærsla fyrir þennan tíma. Feldurinn og goðasteypan eru þau atriði sem líklegast hafa slípast í meðförum.',
    sources: [
      { title: 'Wikipedia: Kristnitakan', url: 'https://is.wikipedia.org/wiki/Kristnitakan' },
      {
        title: 'Wikipedia: Christianization of Iceland (á ensku)',
        url: 'https://en.wikipedia.org/wiki/Christianization_of_Iceland',
      },
    ],
  },
  mahlidingavig: {
    name: 'Máhlíðingavíg',
    dateText: 'Söguöld — ártal óvíst',
    period: 'Söguöld / Þjóðveldið',
    locationName: 'Mávahlíð á Snæfellsnesi (undir Búlandshöfða)',
    factions: ['Þórarinn svarti og hans menn', 'Þorbjörn digri og hans menn'],
    winner: 'Lið Þórarins svarta',
    casualtyEstimate: 'Þorbjörn digri og fleiri vegnir; smáatriðum ber ekki saman milli heimilda',
    summary:
      'Héraðadeila úr sagnahefðinni sem varð mannskæð við Mávahlíð á Snæfellsnesi. Þórarni svarta og Þorbirni digra laust saman, og viðureignin varð ein af þessum íslensku smádeilum sem undu upp á sig í blóðsúthellingar.',
    eli12:
      'Þetta eru nágrannaerjur sögualdar. Tveir valdahópar í héraði áttu í deilum, menn mættu vopnaðir og Þorbjörn digri lá eftir. Svona saga þar sem persónuleg móðgun getur orðið að héraðskreppu.',
    whyItHappened:
      'Sagnahefðin stillir þessu upp sem deilu um heiður, bandalög og völd í héraði. Á fyrstu öldum Íslands var hvorki konungur né lögregla til að skera úr, svo ættir og fylgdarlið gerðu það gjarnan með vopnum.',
    whyItMatters:
      'Sýnir smærra ofbeldið sem gerði sögualdarsamfélagið svo óstöðugt. Ekki voru öll átök stórorrustur; margar voru héraðadeilur sem mótuðu samt málaferli, bandalög og ættarminni kynslóðum saman.',
    confidenceNote:
      'Lítill áreiðanleiki. Atvikið er úr Eyrbyggju, ritaðri um 250 árum síðar. Taktu því sem dæmi um það sem gerðist fremur en skjalfestu atviki.',
    sources: [
      {
        title: 'Wikipedia: Eyrbyggja saga',
        url: 'https://is.wikipedia.org/wiki/Eyrbyggja_saga',
      },
      {
        title: 'Eyrbyggja saga — íslenskur texti (SagaDB)',
        url: 'https://sagadb.org/eyrbyggja_saga',
      },
      {
        title: 'Merkið stendur við Mávahlíð undir Búlandshöfða',
        url: '',
      },
    ],
  },
  'droplaugarsona-feud': {
    name: 'Deilur Droplaugarsona',
    dateText: 'Söguöld — ártal óvíst',
    period: 'Söguöld / Austurland',
    locationName: 'Fljótsdalur við Lagarfljót (merkið er táknrænt)',
    factions: [
      'Helgi og Grímur Droplaugarsynir',
      'Helgi Ásbjarnarson og keppinautar í héraði',
    ],
    winner: 'Enginn einfaldur sigurvegari; hefnd og gagnhefnd knýja söguna',
    casualtyEstimate: 'Nokkur víg í sögunni; nákvæm tala óviss',
    summary:
      'Knöpp austfirsk deilusaga úr Fljótsdal og af Lagarfljótsslóðum. Synir Droplaugar dragast inn í héraðsríg, ofbeldi og hefndir þar til deilan sjálf er orðin þungamiðja sögunnar.',
    eli12:
      'Enn ein sagnadeilan: tveir bræður, óvinir í héraði, drjúgur skammtur af stolti — og ofbeldi sem svarar alltaf ofbeldi.',
    whyItHappened:
      'Söguheimurinn gengur fyrir frændsemi og mannorði. Þegar önnur hliðin hefur verið svívirt eða sköðuð lítur undanhald út eins og veikleiki, svo deilan nærir sig sjálf.',
    whyItMatters:
      'Droplaugarsona saga gefur kortinu raunverulega Fljótsdalsdeilu — ekki bara frægu orrusturnar að norðan og vestan.',
    confidenceNote:
      'Lítill áreiðanleiki. Eins og flestar Íslendingasögur var þessi skráð öldum eftir atburðina. Raunverulegt hérað, raunveruleg ættarnöfn, ósannreynanleg atburðarás.',
    sources: [
      {
        title: 'Droplaugarsona saga — íslenskur texti (SagaDB)',
        url: 'https://sagadb.org/droplaugarsona_saga',
      },
      {
        title: 'Wikipedia: Fljótsdæla saga (á ensku)',
        url: 'https://en.wikipedia.org/wiki/Flj%C3%B3tsd%C3%A6la_saga',
      },
      {
        title: 'Táknrænt merki — nákvæmir sögustaðir þarfnast staðfestingar við söguna og örnefnin',
        url: '',
      },
    ],
  },
  'kjartan-bolli-1003': {
    name: 'Víg Kjartans Ólafssonar',
    dateText: 'Söguöld — um 1003, ártal áætlað',
    period: 'Söguöld / Vesturland',
    locationName: 'Hafragil í Svínadal, Dölum (staður áætlaður)',
    factions: [
      'Kjartan Ólafsson, á ferð um dalinn við þriðja mann',
      'Bolli Þorleiksson og Ósvífurssynir í launsátri',
    ],
    keyPeople: ['Kjartan Ólafsson', 'Bolli Þorleiksson', 'Guðrún Ósvífursdóttir'],
    winner: 'Launsátursmennirnir — og sagan fer með það sem stundina þegar allir töpuðu',
    casualtyEstimate: 'Kjartan veginn; Bolli veginn í hefndarskyni fáum árum síðar',
    summary:
      'Hápunktur ástarþríhyrnings Laxdælu. Kjartan og Bolli voru fóstbræður og bestu vinir; báðir unnu Guðrúnu Ósvífursdóttur. Guðrún, gift Bolla eftir að Kjartan dvaldist of lengi í Noregi, eggjaði mann sinn í launsátrið í Hafragili — þar sem Kjartan kastaði frá sér vopnunum fremur en að berjast við fóstbróður sinn. Bolli vó hann, settist svo og hélt undir höfuð honum meðan hann dó.',
    eli12:
      'Tveir bestu vinir elskuðu sömu konuna. Hún giftist öðrum þeirra, hálfpartinn í þrjósku, og móðganir hlóðust upp árum saman þar til hún ýtti manninum sínum í að sitja fyrir besta vini sínum. Þegar vinurinn sá hverjir voru komnir að drepa hann neitaði hann að verja sig. Bolli drap hann samt — og sá eftir því samstundis og að eilífu.',
    whyItHappened:
      'Sært stolt á alla þrjá vegu, brýnt af slúðri, gjöfum sem fóru úrskeiðis og stolnu sverði og motri — Laxdæla byggir launsátrið úr áratug af smásárum sem ekkert þeirra þriggja vildi kannast við.',
    whyItMatters:
      'Mesti harmleikur söguheimsins um ást og heiður — sönnun þess að deilumenningin gleypti jafnvel þá sem sáu hana koma. Banaleguorð Guðrúnar eru frægasta setning Íslendingasagna: „Þeim var eg verst er eg unni mest.“',
    before:
      'Deilur uxu venjulega af móðgunum og sauðfé. Þessi óx af slitinni trúlofun — Kjartan sat of lengi við hirð Noregskonungs og Guðrún beið ekki.',
    after:
      'Bræður Kjartans eltu Bolla uppi fáum árum síðar, og Guðrún lifði langa ævi og alla þá sem deilan tók.',
    humanDrama:
      'Bolli baðst undan þar til konan hans dró karlmennsku hans í efa. Kjartan, með sigurinn vísan, kastaði vopnunum — hann kvaðst heldur vilja þiggja banann af frænda sínum en veita honum hann. Bolli hjó, greip deyjandi fóstbróður sinn í fangið, og sagan leyfir honum aldrei að leggja þá stund frá sér.',
    modernTranslation:
      'Tveir óaðskiljanlegir vinir; eitt fjarsamband sem trosnar; hinn vinurinn giftist henni. Áratug af vandlega ræktaðri gremju síðar sviðsetur hún uppgjör og gerir hlutleysi ómögulegt. Annar neitar að lyfta hendi; hinn þarf að lifa með því sem gerist næst.',
    confidenceNote:
      'Lítill áreiðanleiki. Laxdæla var rituð um 250 árum síðar og er byggð eins og skáldsaga — fólkið er líklega sögulegt, sviðsetning launsátursins er bókmenntir.',
    sources: [
      {
        title: 'Laxdæla saga (víg Kjartans) — íslenskur texti (SagaDB)',
        url: 'https://sagadb.org/laxdaela_saga',
      },
      {
        title: 'Wikipedia: Laxdæla saga',
        url: 'https://is.wikipedia.org/wiki/Laxd%C3%A6la_saga',
      },
    ],
  },
  'njalsbrenna-1011': {
    name: 'Njálsbrenna',
    dateText: 'um 1011 samkvæmt Njálu',
    period: 'Söguöld / Þjóðveldið',
    locationName: 'Bergþórshvoll í Vestur-Landeyjum',
    factions: [
      'Flosi Þórðarson á Svínafelli og brennumenn',
      'Heimilisfólk Njáls Þorgeirssonar',
    ],
    winner: 'Brennumenn — þótt sagan fari með sigurinn sem siðferðilega bölvun',
    casualtyEstimate: 'Um 11 fórust í brennunni, eftir því hvaða hefð er fylgt',
    summary:
      'Frægasta brenna íslenskra bókmennta. Flosi Þórðarson og bandamenn hans umkringdu Bergþórshvol og brenndu Njál, Bergþóru og heimilisfólk þeirra inni. Kári slapp — og þar með var sögunni hvergi nærri lokið.',
    eli12:
      'Hópur óvina króaði fjölskyldu inni í bænum hennar og kveikti í. Hinn vitri gamli Njáll varð eftir inni með konu sinni. Einn maður slapp — og sá var með hefnd í huga.',
    whyItHappened:
      'Njála byggir upp að brennunni gegnum áralangar móðganir, málaferli, hefndarvíg og brostnar sættir. Þegar Flosi lætur til skarar skríða er deilan orðin of eitruð fyrir venjuleg lög.',
    whyItMatters:
      'Jafnvel þótt þetta séu bókmenntir fremur en hrein heimildasaga er Njálsbrenna ein af skilgreinandi átakasögum Íslands. Hún sýnir hvernig deilumenning gat breytt lagaþrasi og ættarheiðri í stórslys.',
    before:
      'Áratugir af móðgunum, vígum og brostnum sáttum höfðu eitrað deiluna út fyrir það sem lög gátu læknað — lagasnilld Njáls keypti tíma, ekki frið.',
    after:
      'Kári elti brennumenn árum saman, og brennan varð eilíf viðvörun Íslendinga um deilumenninguna — viðvörun sem enginn hlustaði á þegar sama lógík sneri aftur í landsstærð.',
    humanDrama:
      'Njáll var mesti lögvitringur sinnar aldar — og brann inni af því að lögin þraut að lokum. Brennumenn buðu konum, börnum og gamalmenninu að ganga út. Njáll neitaði: of gamall til að hefna sona sinna, of stoltur til að lifa við skömmina. Hann lagðist undir uxahúð með konu sinni og beið. Skarphéðinn sonur hans dó standandi, skorðaður við vegginn.',
    modernTranslation:
      'Ímyndaðu þér áratugalanga lagadeilu tveggja fjölskyldna — málsóknir, sættir, leigumorð, fleiri sættir — þar til önnur gefst upp á dómstólum og kveikir í húsi hinnar. Eini eftirlifandinn ver árum í að elta brennuvargana um þrjú lönd. Og allir viðstaddir kunna nákvæma verðskrá hvers vígs.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Njála var rituð um 250 árum eftir atburðina og er bókmenntir af hæsta tagi — sem sker á báða vegu. En brenna á Bergþórshvoli er talin staðreynd í öðrum miðaldaheimildum, og við uppgröft þar hafa fundist brunalög af nokkurn veginn réttum aldri.',
    sources: [
      {
        title: 'Wikipedia: Njálsbrenna',
        url: 'https://is.wikipedia.org/wiki/Nj%C3%A1lsbrenna',
      },
      {
        title: 'Brennu-Njáls saga — íslenskur texti (SagaDB)',
        url: 'https://sagadb.org/brennu-njals_saga',
      },
      {
        title: 'Merkið stendur við Bergþórshvol í Vestur-Landeyjum',
        url: '',
      },
    ],
  },
  'grettir-drangey-1031': {
    name: 'Dauði Grettis í Drangey',
    dateText: 'um 1030 — tímatal sögunnar',
    period: 'Söguöld / Þjóðveldið',
    locationName: 'Drangey á Skagafirði',
    factions: [
      'Grettir Ásmundarson, Illugi bróðir hans og einn þræll, uppi á þverhníptri eyju',
      'Þorbjörn öngull og leigumenn, með fulltingi galdrakerlingar að sögn sögunnar',
    ],
    winner: 'Þorbjörn öngull — gegn manni sem var þegar hálfdauður',
    casualtyEstimate: 'Grettir og Illugi drepnir; að sögn sögunnar þurfti banvænt galdrasár á undan',
    summary:
      'Frægasti útlagi Íslands varði síðustu árin í Drangey, náttúruvirki með þverhnípt björg á alla vegu, þar sem aðeins varð komist upp eftir stigum. Eftir nær tuttugu ára sekt — lengur bar enginn maður sekt, segir sagan — náðu óvinir hans honum ekki með vopnum. Að sögn sögunnar dugði ekkert minna en gerningar: seiðrúnir á rekatré gáfu honum öxarsár í fótinn sem grasseraði, og menn Þorbjarnar önguls klifu eyna til að drepa mann sem lá fyrir dauðanum. Illugi, ungi bróðir hans, neitaði að kaupa sér líf með þögn og var höggvinn við hlið hans.',
    eli12:
      'Grettir var rammur að afli en bölvanlega óheppinn, og hann var sekur skógarmaður í næstum tuttugu ár — hver sem var mátti drepa hann. Hann faldi sig á eyju með svo bröttum björgum að menn þurftu stiga til að komast upp. Óvinirnir náðu honum ekki fyrr en hann lá fyrir dauðanum með sýkt sár sem sagan kennir göldrum um. Litli bróðir hans kaus að deyja með honum frekar en að svíkja hann.',
    whyItHappened:
      'Grettir var dæmdur sekur fyrir brennu sem hann olli líklega ekki, og íslensk lög áttu engan miskunnartakka: skógarmaður var réttdræpur uns sektin rann út. Óvinir hans vildu féð sem lá við höfði hans — og eftir nítján ár var sektin næstum úti, sem gerði drápið aðkallandi.',
    whyItMatters:
      'Grettis saga er mikla íslenska hugleiðingin um afl án gæfu, og Drangey var fullkomið svið — eyjan blasir enn við af öllum firðinum. Drápið þótti svo ódrengilegt (deyjandi maður, galdrahjálp, myrtur unglingur) að sagan lætur bróður Grettis fá bætur á Alþingi og hefnd suður í Miklagarði.',
    before:
      'Nær tveggja áratuga sekt hafði gert Gretti að þjóðsögu og verðlaunafé — og skilið hann eftir án nokkurs öruggs náttstaðar á fastalandinu.',
    after:
      'Banamaður hans uppskar fyrirlitningu í stað frægðar: sjálfur dæmdur sekur, og að sögn sögunnar elti hefnandi bróðir Grettis hann alla leið til Miklagarðs.',
    humanDrama:
      'Nítján ár í sekt, myrkfælinn eftir glímu við afturgöngu — sterkasti maður Íslands, bugaður af einsemd og fúnandi fæti. Þegar banamennirnir loks komust að honum gat hann ekki lyft sverðinu; þeir urðu að höggva af honum höndina til að losa það úr greipinni. Og Illugi, sautján ára, var boðið líf gegn loforði um að hefna ekki — hann svaraði að það loforð gæfi hann ekki, og dó fyrir svarið.',
    confidenceNote:
      'Lítill áreiðanleiki. Grettis saga var rituð um 300 árum síðar og er opinskátt yfirnáttúruleg (draugar, gerningar, tröll). Frægur útlagi að nafni Grettir var líklega til og Drangey er nákvæmlega eins og henni er lýst — afgangurinn er besta ævintýrasaga Íslands.',
    sources: [
      {
        title: 'Wikipedia: Grettir Ásmundarson',
        url: 'https://is.wikipedia.org/wiki/Grettir_%C3%81smundarson',
      },
      {
        title: 'Grettis saga — íslenskur texti (SagaDB)',
        url: 'https://sagadb.org/grettis_saga',
      },
      { title: 'Wikipedia: Drangey', url: 'https://is.wikipedia.org/wiki/Drangey' },
    ],
  },
  'hekla-1104': {
    name: 'Heklugosið 1104',
    dateText: '1104 (fyrsta skráða Heklugosið)',
    period: 'Þjóðveldisöld',
    locationName: 'Hekla; gjóskufallið yfir Þjórsárdal',
    factions: ['Byggðin í Þjórsárdal gegn fyrsta skráða gosi Heklu'],
    winner: 'Hekla — blómaskeiði byggðar í dalnum lauk',
    casualtyEstimate: 'Óþekkt; bæir dalsins, þar á meðal Stöng, grófust undir gjósku',
    summary:
      'Fyrsta Heklugos ritaldar var ferlíki: þeytigos sem rigndi gjósku yfir hálft landið og gróf blómlega innsveit Þjórsárdals. Bærinn Stöng, sem grafinn var upp aftur — „Pompei Íslands“ — varðveitir þjóðveldisbæ undir vikrinum. Fornleifar benda til að einhver byggð hafi tórt í dalnum eftir 1104, en blómaskeið hans endaði hér.',
    eli12:
      'Frægasta eldfjall Íslands kynnti sig með því að kaffæra heilan dal af bæjum í vikri. Einn bærinn, Stöng, var grafinn upp 800 árum síðar næstum heill — eins og tímahylki frá þjóðveldisöld. Evrópubúum þótti Hekla svo mögnuð að þeir ákváðu að hún væri fordyri helvítis.',
    whyItHappened:
      'Hekla hafði haldið kyrru fyrir allt landnámsskeiðið — nógu lengi til að bændur fylltu frjósaman dal í skugga hennar. Gosið 1104 var óvenju sprengivirkt og Þjórsárdalur lá beint undir gjóskugeiranum.',
    whyItMatters:
      'Hér hófst evrópskur frægðarferill Heklu sem „Gátt heljar“, og Ísland eignaðist sinn best varðveitta þjóðveldisbæ. Endurgerð Stangar, Þjóðveldisbærinn, er ástæða þess að við vitum hvernig skáli þjóðveldisaldar leit út í raun og veru.',
    before:
      'Tveggja alda kyrrð hafði lokkað bændur langt inn í eldvirka innsveit — Þjórsárdalur var frjósamur einmitt vegna gamallar gjósku.',
    after:
      'Hekla hefur gosið yfir tuttugu sinnum síðan, en stærsta einstaka sprengigos Íslands átti enn eftir að koma, austar.',
    confidenceNote:
      'Mikill áreiðanleiki. Gosið er tímasett í annálum og gjóskulögum, og Stöng var grafin upp 1939. Eina álitamálið er hversu skyndilega og algerlega dalurinn fór í eyði — einhver byggð hélt áfram eftir 1104.',
    sources: [
      { title: 'Wikipedia: Hekla', url: 'https://is.wikipedia.org/wiki/Hekla' },
      {
        title: 'Wikipedia: Þjóðveldisbærinn',
        url: 'https://is.wikipedia.org/wiki/%C3%9Ej%C3%B3%C3%B0veldisb%C3%A6rinn',
      },
      {
        title: 'HÍ: Eyðibýli, gosáhrif og skógarnytjar — Þjórsárdalur endurskoðaður (á ensku)',
        url: 'https://iris.hi.is/en/publications/abandoned-farms-volcanic-impacts-and-woodland-management-revisiti/',
      },
    ],
  },
  'thorgils-haflidi-1121': {
    name: 'Deilur Þorgils og Hafliða',
    dateText: '1117–1121, hámark á Alþingi 1121',
    period: 'Þjóðveldisöld / aðdragandi Sturlungaaldar',
    locationName: 'Þingvellir (Alþingi); deilan átti rætur í norðvestursveitum',
    factions: [
      'Þorgils Oddason á Staðarhóli með hundruð fylgdarmanna',
      'Hafliði Másson á Breiðabólstað með hundruð fylgdarmanna',
    ],
    winner: 'Sáttasemjararnir — sæst á þinginu án orrustu',
    casualtyEstimate: 'Engin orrusta; Hafliði missti fingur fyrir öxarhögg fyrr í deilunni',
    summary:
      'Hættulegasta hjásneiðing þjóðveldisins. Tveir af voldugustu höfðingjum landsins stigmögnuðu deilu þar til báðir riðu til Alþingis 1121 með smáheri — að sögn sögunnar stóðu yfir þúsund manns gráir fyrir járnum á þingstaðnum. Sáttamenn með kirkjunnar menn í broddi fylkingar töluðu þá niður; Þorgils gekkst undir svo háar bætur að þær urðu að orðtaki, og gangverk þjóðveldisins hélt. Naumlega.',
    eli12:
      'Tveir höfðingjar hötuðust svo mjög að hvor um sig mætti með einkaher á þjóðþing Íslendinga. Í nokkra daga lá allt kerfið við að hrynja í stríð á helgasta stað þess. Friðflytjendur náðu þeim með herkjum niður — og sá sem tapaði fékk hæstu bætur sem sögur fóru af.',
    whyItHappened:
      'Keðja málaferla, móðgana og einn afhöggvinn fingur stigmagnaðist milli tveggja manna sem voru of voldugir fyrir venjulega dómstóla. Þegar báðir gátu kvatt út heri var Alþingi sjálft orðið að vígvelli í bið.',
    whyItMatters:
      'Hér sannaðist að höfðingjar gátu safnað herjum — og völdu í þetta sinn að beita þeim ekki. Þegar Hafliði var spurður hvað hann tæki fyrir höndina lamaða varð svarið að orðtaki: „Dýr mundi Hafliði allur.“ Öld síðar hættu höfðingjar með sams konar heri að velja friðinn.',
    before:
      'Kristnitakan hafði gefið Íslandi öld af tiltölulegri kyrrð — nógu langa til að fáeinar ættir yrðu hættulega stórar.',
    after:
      'Stillingin frá 1121 lifði ekki næstu öld af: sama stigmögnunarlógík, með stærri herjum og minni þolinmæði, varð að Sturlungaöld.',
    modernTranslation:
      'Tveir auðjöfrar takast á í málaferlum þar til báðir mæta á landsfundinn með einkaöryggissveitir. Kerfið heldur niðri í sér andanum; öldungar semja um metsátt — og allir þykjast ekki hafa tekið eftir því að ríkið á sjálft engan her.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Þorgils saga og Hafliða er hluti Sturlungusafnsins, rituð fáum kynslóðum eftir atburðina — óvenju nálægt fyrir þennan tíma, þótt liðstölurnar og tilsvörin beri svip sagnalistar.',
    sources: [
      {
        title: 'Wikipedia: Sturlunga saga',
        url: 'https://is.wikipedia.org/wiki/Sturlunga_saga',
      },
      {
        title: 'Wikipedia: Þorgils saga ok Hafliða (á ensku)',
        url: 'https://en.wikipedia.org/wiki/%C3%9Eorgils_saga_ok_Hafli%C3%B0a',
      },
    ],
  },
  'onundarbrenna-1197': {
    name: 'Önundarbrenna',
    dateText: '7. maí 1197',
    period: 'Aðdragandi Sturlungaaldar / norðlenskar deilur',
    locationName: 'Lönguhlíð (nú Langahlíð) í Hörgárdal, vestan Eyjafjarðar',
    factions: [
      'Guðmundur dýri og bandamenn hans með fjölmennt aðfararlið',
      'Önundur Þorkelsson og heimilisfólk hans í Lönguhlíð',
    ],
    winner: 'Guðmundur dýri — fyrir verk sem Ísland gleymdi ekki',
    casualtyEstimate: 'Önundur og nokkrir heimilismanna brunnu inni eða voru vegnir; tölum ber ekki saman',
    summary:
      'Kynslóð á undan eiginlegri Sturlungaöld umkringdi höfðinginn Guðmundur dýri bæ keppinautar síns Önundar Þorkelssonar í Lönguhlíð að næturlagi og brenndi hann inni með heimilisfólkinu. Þetta var generalprufa Norðurlands fyrir brennuöldina fram undan — og Guðmundur sjálfur lagði síðar frá sér goðorðið og dó munkur.',
    eli12:
      'Höfðingi útkljáði deilu með því að kveikja í bæ óvinar síns með fjölskylduna inni. Fólki var brugðið — að brenna mann inni var línan sem ekki mátti fara yfir, jafnvel á ofbeldisöld. Árum síðar gaf brennumaðurinn allt frá sér og gerðist munkur.',
    whyItHappened:
      'Norðlensk valdadeila um yfirráð, móðganir og fylgdarmenn hafði stigmagnast út fyrir seilingu laga og sáttaumleitana. Eldur var úrslitavopnið sem höfðingi gat beitt gegn keppinaut sem var of sterkur í beinni atlögu.',
    whyItMatters:
      'Fyrsta stórbrenna sögulegs tíma á Íslandi — aðferð Njálsbrennu stígur út úr bókmenntunum og inn í skjalfesta sögu. Hún setti fordæmið sem Sturlungaöldin fylgdi hálfri öld síðar á Flugumýri.',
    before:
      'Höfðingjaættir Norðurlands höfðu eytt tíunda áratug 12. aldar í að kanna hve mikið ofbeldi skipan eftirkristnitökualdar þyldi.',
    after:
      'Áratug síðar logaði Norðurland í stríði um biskup sinn, og öld stillingarinnar var formlega úti.',
    humanDrama:
      'Sagnahefðin man endalok Guðmundar dýra sem furðulegasta hluta sögunnar: maðurinn sem brenndi heimili í kaf gekk frá völdunum, settist í klaustrið á Þingeyrum og dó munkur — miðaldaútgáfa af stríðsglæpamanni sem iðrast um síðir. Hvort það var samviska eða pólitík segja heimildirnar ekki.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Skráð í Guðmundar sögu dýra innan Sturlungusafnsins, ritaðri nálægt atburðunum; dagsetningin er að hefð 7. maí 1197, en mannfallstölur eru á reiki.',
    sources: [
      {
        title: 'Wikipedia: Önundarbrenna',
        url: 'https://is.wikipedia.org/wiki/%C3%96nundarbrenna',
      },
      {
        title: 'Wikipedia: Sturlunga saga',
        url: 'https://is.wikipedia.org/wiki/Sturlunga_saga',
      },
    ],
  },
  'vidines-1208': {
    name: 'Víðinesbardagi',
    dateText: '1208',
    period: 'Öndverð Sturlungaöld / kirkja gegn höfðingjum',
    locationName: 'Víðines við Hóla í Hjaltadal, Skagafirði',
    factions: [
      'Veraldlegir höfðingjar: Kolbeinn Tumason, Arnór Tumason og Ásbirningar, með stuðningi Svínfellinga',
      'Guðmundur Arason biskup og fylgismenn hans',
    ],
    winner: 'Lið Guðmundar biskups',
    casualtyEstimate: 'Um 10 féllu, þar á meðal Kolbeinn Tumason',
    summary:
      'Snörp og snemmbær viðureign kirkjuvalds og höfðingjavalds. Kolbeinn Tumason fór með lið gegn Guðmundi Arasyni biskupi við Hóla, en biskupsmenn héldu velli og Kolbeinn féll.',
    eli12:
      'Voldugur höfðingi ætlaði að beygja þrjóskan biskup undir sig. Það fór illa. Kolbeinn Tumason dó, og lið biskupsins vann óvæntan sigur.',
    whyItHappened:
      'Guðmundur Arason barðist fyrir sjálfstæði kirkjunnar og skjóli fátækra fylgismanna sinna. Íslenskir höfðingjar sáu þar ógn við yfirráð sín yfir fólki, dómum og fé. Við Víðines breyttist það þras í vopn.',
    whyItMatters:
      'Við Kolbein Tumason er kenndur sálmurinn „Heyr, himna smiður“, svo bardaginn stendur á einkennilegum krossgötum stjórnmála, ofbeldis og eins ástsælasta trúarkvæðis Íslendinga.',
    before:
      'Tveimur öldum eftir friðsamlega kristnitöku var kirkjan orðin rík og kröfuhörð — og Guðmundur biskup neitaði að lúta höfðingjunum sem töldu sig eiga hana.',
    after:
      'Fall Kolbeins leysti ekkert: deilan um Guðmund dró Norðurland inn í áratug umsátra og herhlaupa.',
    humanDrama:
      'Kolbeinn fór með her gegn biskupi — og orti að hefðinni „Heyr, himna smiður“, eina hjartfólgnustu bæn tungunnar, rétt fyrir bardagann við kirkjuna sem hann bað til. Hann féll fyrir grjóthöggi í höfuðið. Sálmur hans er enn sunginn við íslenskar jarðarfarir.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Bardaginn og fall Kolbeins eru traustlega skráð í heimildum Sturlungualdar; sögnin að hann hafi ort sálminn í aðdraganda bardagans er hefð, þótt eignunin sé gömul og almennt viðtekin.',
    sources: [
      {
        title: 'Wikipedia: Víðinesbardagi',
        url: 'https://is.wikipedia.org/wiki/V%C3%AD%C3%B0inesbardagi',
      },
      {
        title: 'Wikipedia: Kolbeinn Tumason',
        url: 'https://is.wikipedia.org/wiki/Kolbeinn_Tumason',
      },
      {
        title: 'Merkið stendur við Víðines, norðvestan Hóla',
        url: '',
      },
    ],
  },
  'hrafn-sveinbjarnarson-1213': {
    name: 'Víg Hrafns Sveinbjarnarsonar',
    dateText: '4. mars 1213',
    period: 'Öndverð Sturlungaöld / deilur á Vestfjörðum',
    locationName: 'Eyri við Arnarfjörð (síðar Hrafnseyri)',
    factions: [
      'Þorvaldur Snorrason Vatnsfirðingur og menn hans',
      'Hrafn Sveinbjarnarson og net Seldæla',
    ],
    winner: 'Þorvaldur Snorrason Vatnsfirðingur',
    casualtyEstimate: 'Hrafn tekinn höndum og hálshöggvinn; deilan hélt áfram',
    summary:
      'Hrafn Sveinbjarnarson var goðorðsmaður, læknir og einhver víðförlasti Íslendingur sinnar tíðar. Deilu hans við Þorvald Snorrason lauk með því að Hrafn var tekinn höndum og hálshöggvinn — dimmur fyrirboði Sturlungaaldar.',
    eli12:
      'Hrafn var eins konar læknahöfðingi: voldugur, virtur og gagnlegur. En hann átti hættulegan óvin. Sá náði honum að lokum og lét drepa hann — og þá varð deilan enn grimmari.',
    whyItHappened:
      'Hrafn og Þorvaldur voru læstir í vestfirskri valdadeilu. Heiður, héraðsvöld, hefndir og gamlar væringar hlóðust upp þar til venjulegar sættir hættu að virka.',
    whyItMatters:
      'Þetta sýnir að Sturlungaöldin hófst ekki sem eitt stórt borgarastríð á einni nóttu. Hún óx upp úr héraðadeilum eins og þessari, þar sem persónulegur rígur og héraðspólitík urðu banvæn.',
    before:
      'Vestfirðir áttu sína eigin langvinnu valdadeilu, persónulega fremur en landsmál — einmitt þess konar héraðskrit sem borgarastríðið fram undan nærðist á.',
    after:
      'Víg á borð við Hrafns kenndu höfðingjum landsins að keppinauta mátti einfaldlega fjarlægja. Innan kynslóðar var sú lexía orðin landsmál.',
    humanDrama:
      'Hrafn var það næsta sem miðalda-Ísland komst lækni — lærður erlendis, tók ekki gjald og læknaði að sögn jafnvel menn úr liði óvinarins. Hann hafði áður haft Þorvald á valdi sínu og gefið honum líf. Þorvaldur kom aftur um nótt með eld og menn, tók Hrafn höndum og lét höggva hann. Miskunnsemin, endurgoldin að fullu.',
    modernTranslation:
      'Ástsæli héraðslæknirinn á einn bitran keppinaut. Tvisvar hefur hann líf hans í hendi sér og hlífir honum, því þannig maður er hann. Keppinauturinn, óþyngdur af slíkum prinsippum, mætir að lokum með vopnaða menn og drepur hann. Að vera betri maðurinn er frábær grafskrift og hörmuleg lífsstefna.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Hrafns saga var rituð í lifandi minni atburðanna — en af manni eindregið í liði Hrafns, svo dýrlingsmynd læknisins ber að lesa með því í huga. Vígið sjálft er hafið yfir vafa.',
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
        title: 'Merkið stendur á Hrafnseyri — bænum sem síðar var nefndur eftir Hrafni sjálfum',
        url: '',
      },
    ],
  },
  'helgastadir-1220': {
    name: 'Helgastaðabardagi',
    dateText: '29.–30. ágúst 1220',
    period: 'Sturlungaöld',
    locationName: 'Helgastaðir í Reykjadal',
    factions: [
      'Fylgismenn Guðmundar Arasonar biskups',
      'Lið Sighvats Sturlusonar og Arnórs Tumasonar',
    ],
    winner: 'Lið veraldlegu höfðingjanna / samið um uppgjöf',
    casualtyEstimate: 'Óljóst; frásagnir snúast fremur um umsátrið og uppgjöfina en tölu fallinna',
    summary:
      'Lítið kirkjugarðsumsátur með stóra Sturlungaaldarorku. Fylgismenn Guðmundar biskups vörðust á Helgastöðum og hörfuðu loks inn í kirkjuna undan liði veraldlegra höfðingja.',
    eli12:
      'Ímyndaðu þér umsátur um sveitakirkju á miðöldum. Önnur hliðin ver kirkjugarðinn, hin sækir, og allir reyna að vinna án þess að breyta vígðum reit í stórslys.',
    whyItHappened:
      'Langvinna baráttan um vald Guðmundar Arasonar hélt áfram að draga Norðurland út í ofbeldi. Höfðingjar vildu leysa upp vopnað fylgdarlið biskupsins; biskupsmenn töldu sig verja helgan málstað.',
    whyItMatters:
      'Gerir átök kirkju og höfðingja áþreifanleg: ekki óhlutbundin pólitík heldur vopnaðir menn sem þrengja að sveitakirkju og knýja fram uppgjöf.',
    before:
      'Kolbeinn Tumason hafði þegar látið lífið við að beygja Guðmund biskup — og höfðingjarnir höfðu engu gleymt.',
    after:
      'Þrýstingurinn á biskupsmenn hélt áfram að magnast uns hann sprakk á eyju norður í hafi.',
    confidenceNote:
      'Lítill áreiðanleiki. Umsátrið kemur fyrir í Sturlunguefninu um Guðmund biskup, en smáatriðin eru rýr og bæði nákvæm staðsetning og mannfall óviss.',
    sources: [
      {
        title: 'Wikipedia: Helgastaðabardagi',
        url: 'https://is.wikipedia.org/wiki/Helgasta%C3%B0abardagi',
      },
      {
        title: 'Wikipedia: Guðmundur góði Arason',
        url: 'https://is.wikipedia.org/wiki/Gu%C3%B0mundur_g%C3%B3%C3%B0i_Arason',
      },
      {
        title: 'Merkið stendur við Helgastaði í Reykjadal',
        url: '',
      },
    ],
  },
  'grimseyjarfor-1222': {
    name: 'Grímseyjarför',
    dateText: '1222',
    period: 'Sturlungaöld',
    locationName: 'Grímsey',
    factions: [
      'Sighvatur Sturluson og Sturla Sighvatsson',
      'Fylgismenn Guðmundar Arasonar biskups',
    ],
    winner: 'Sighvatur og Sturla',
    casualtyEstimate: 'Um 12 biskupsmenn drepnir í eynni; yfir 30 úr aðfararliðinu drukknuðu á heimleið',
    summary:
      'Hefndarleiðangur til Grímseyjar sem breytti kirkjudeilu Guðmundar góða í blóðbað. Sighvatur Sturluson og Sturla sonur hans réðust á fylgismenn biskups úti í eynni; um tylft varðist til dauða — og á heimsiglingunni drukknuðu á fjórða tug sigurvegaranna.',
    eli12:
      'Menn biskupsins héldu til á eyju úti fyrir Norðurlandi. Óvinir þeirra sigldu út, réðust á þá og drápu marga. Þetta var ekki lengur kurteist pólitískt þras.',
    whyItHappened:
      'Eftir áralöng átök um Guðmund biskup litu höfðingjar á fylgdarlið hans sem hættulegan vopnaðan flokk. Sighvatur og Sturla ætluðu að uppræta vandann í eitt skipti fyrir öll.',
    whyItMatters:
      'Grímseyjarför sýnir hve hratt trúmálapólitík varð að ættarofbeldi — og er forsmekkur að stíl Sturlungaaldar: bandalög, hefndir, skyndiárásir og lítil miskunn.',
    before:
      'Vopnaðir fylgismenn biskupsins höfðu verið hraktir úr umsátri í umsátur uns fastalandið þraut.',
    after:
      'Þegar kirkjumálið hafði verið brotið á bak aftur með valdi sneru Sturlungar sömu orku gegn keppinautum sínum — og hver gegn öðrum.',
    humanDrama:
      'Aðfararliðið vann orrustuna og tapaði siglingunni: um tylft biskupsmanna dó í eynni, svo drukknuðu þrjátíu og fleiri sigurvegarar á heimleiðinni. Miðalda-Íslendingar þurftu engan siðapostula til að lesa í það. Hafið hélt betra bókhald en lögin.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Förin er vel skráð í Sturlungu, en mannfallstölur — einkum drukknanirnar — eru breytilegar milli frásagna.',
    sources: [
      {
        title: 'Wikipedia: Grímseyjarför',
        url: 'https://is.wikipedia.org/wiki/Gr%C3%ADmseyjarf%C3%B6r',
      },
      {
        title: 'Wikipedia: Sturla Sighvatsson',
        url: 'https://is.wikipedia.org/wiki/Sturla_Sighvatsson',
      },
    ],
  },
  'saudafellsfor-1229': {
    name: 'Sauðafellsför',
    dateText: '1229',
    period: 'Sturlungaöld',
    locationName: 'Sauðafell í Dölum',
    factions: [
      'Vatnsfirðingar — Þórður og Snorri Þorvaldssynir að hefna föður síns',
      'Heimilisfólk Sturlu Sighvatssonar á Sauðafelli (Sturla sjálfur fjarri)',
    ],
    keyPeople: ['Sturla Sighvatsson', 'Þórður Þorvaldsson', 'Snorri Þorvaldsson', 'Solveig Sæmundardóttir'],
    winner: 'Aðfararmennirnir komust undan; skömmin af förinni loddi við þá',
    casualtyEstimate: 'Nokkrir heimilismanna vegnir eða særðir; Solveig húsfreyja látin ósnert',
    summary:
      'Alræmdasta hefndarför Sturlungaaldar. Synir Þorvalds Vatnsfirðings — sem Sturla Sighvatsson hafði látið brenna inni árið áður — riðu að næturlagi á bæ Sturlu á Sauðafelli meðan hann var fjarri og vógu og særðu vinnufólk og heimamenn. Jafnvel samherjum ofbauð: aðför að sofandi heimili fór yfir línu sem ofbeldisöldin taldi sig sjálf virða.',
    eli12:
      'Tveir bræður vildu hefna föður síns á Sturlu. Þeir réðust á bæinn hans um nótt — en hann var ekki heima, svo þeir gengu í skrokk á heimilisfólkinu í staðinn. Jafnvel þeirra eigin menn skömmuðust sín.',
    whyItHappened:
      'Sturla hafði látið brenna Þorvald Vatnsfirðing inni 1228. Synir Þorvalds náðu ekki til Sturlu sjálfs og hjuggu því í það sem þeir náðu til: heimili hans.',
    whyItMatters:
      'Sauðafellsför varð samnefnari Sturlungaaldar fyrir níðingsverk — ofbeldi gegn heimilisfólki í stað óvinarins sjálfs. Hún sýnir deilur aldarinnar renna fram úr reglum heiðursmenningarinnar sjálfrar.',
    before:
      'Sturlungar höfðu varið þriðja áratugnum í að breyta deilum og mægðum í valdablokkir — og eignast banvæna óvini í leiðinni.',
    after:
      'Sturla elti aðfararmennina uppi, og hefndahjólið hélt áfram að snúast í átt að opnu stríði.',
    humanDrama:
      'Aðfararmennirnir hjuggu í alla sem fyrir urðu — vinnufólk, konur, gamalmenni — en Solveigu húsfreyju létu þeir ósnerta. Smáatriðið sem Ísland mundi: Sturla var ekki einu sinni heima. Hefnd sem hittir ekki skotmarkið hittir samt alltaf einhvern.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Förinni er lýst í smáatriðum í Íslendinga sögu í Sturlungu, ritaðri nálægt atburðunum af mönnum tengdum ættinni — vel upplýstum en aldrei hlutlausum.',
    sources: [
      {
        title: 'Wikipedia: Sauðafellsför',
        url: 'https://is.wikipedia.org/wiki/Sau%C3%B0afellsf%C3%B6r',
      },
      {
        title: 'Wikipedia: Sturla Sighvatsson',
        url: 'https://is.wikipedia.org/wiki/Sturla_Sighvatsson',
      },
    ],
  },
  'baejarbardagi-1237': {
    name: 'Bæjarbardagi',
    dateText: '28. apríl 1237',
    period: 'Sturlungaöld',
    locationName: 'Bær í Bæjarsveit, Borgarfirði',
    factions: [
      'Sturla Sighvatsson / Sturlungar',
      'Hagsmunir Snorra Sturlusonar: Þorleifur Þórðarson, Mýramenn og Garðamenn',
    ],
    winner: 'Sturla Sighvatsson / Sturlungar',
    casualtyEstimate: 'Yfir 30 féllu',
    summary:
      'Valdabarátta innan Sturlungaættarinnar sjálfrar. Sturla Sighvatsson réðst á lið tengt hagsmunum Snorra föðurbróður síns að Bæ í Borgarfirði og hafði betur.',
    eli12:
      'Fjölskylduerjur — nema með herjum. Sturla vildi meiri völd. Snorri var flæktur í málið pólitískt en stóð ekki sjálfur í víglínunni. Sturla vann og margir menn dóu.',
    whyItHappened:
      'Sturla þandi veldi Sturlunga út af hörku meðan net Snorra skipti enn máli vestanlands. Í ríg þeirra blandaðist ættarmetnaður, eignir, ítök í dómum og hrein ógnun.',
    whyItMatters:
      'Bæjarbardagi sýnir Sturlungaöldina éta eigið ættartré. Stríðið var ekki bara ætt gegn ætt; oft voru það frændur, mágar og fyrrum bandamenn sem snerust hver gegn öðrum.',
    before:
      'Sturla hafði árum saman þrengt að veldi Snorra föðurbróður síns með herhlaupum og hótunum — við Bæ varð þrýstingurinn að her.',
    after:
      'Með vestrið undirokað stóð einn keppinautur milli Sturlu og landsins alls — og Sturla lokkaði hann að vatni.',
    humanDrama:
      'Sturla og Snorri voru bróðursonur og föðurbróðir — báðir Sturlungar, báðir að nafninu til sömu megin í stórdeilu Íslands. Það skipti engu. Þrjátíu menn dóu svo að ein grein ættarinnar gæti kreist hina. Ljóti leyndardómur borgarastríðsins var að stærsta ættin eyddi hálfri orkunni í sjálfa sig.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Skráð í Sturlungusafninu, rituðu nálægt atburðunum af mönnum tengdum ættinni — vel upplýstum, aldrei hlutlausum.',
    sources: [
      {
        title: 'Wikipedia: Bæjarbardagi',
        url: 'https://is.wikipedia.org/wiki/B%C3%A6jarbardagi',
      },
      {
        title: 'Wikipedia: Snorri Sturluson',
        url: 'https://is.wikipedia.org/wiki/Snorri_Sturluson',
      },
      {
        title: 'Merkið stendur við Bæ í Bæjarsveit',
        url: '',
      },
    ],
  },
  'apavatnsfor-1238': {
    name: 'Apavatnsför',
    dateText: 'Vor 1238',
    period: 'Sturlungaöld',
    locationName: 'Apavatn (við bæina á vatnsbakkanum; nákvæmur fundarstaður óþekktur)',
    factions: ['Sturla Sighvatsson / Sturlungar', 'Gissur Þorvaldsson / Haukdælir'],
    winner: 'Sturla Sighvatsson — en áhættuspilið snerist í höndum hans',
    casualtyEstimate: 'Ekkert fjöldamannfall; Gissur handtekinn, afvopnaður og látinn sverja trúnaðareið',
    summary:
      'Sturla Sighvatsson lokkaði Gissur Þorvaldsson til fundar við Apavatn með um 400 menn gegn 40 manna liði Gissurar, lét svo handtaka hann, afvopna og knýja til trúnaðareiðs. Sturla viðurkenndi berum orðum að Gissur væri sá eini sem hann óttaðist — og gaf honum svo líf, sem reyndist banvæn skyssa.',
    eli12:
      'Sturla ætlaði sér að ráða öllu Íslandi og Gissur var keppinauturinn sem hann óttaðist mest. Hann plataði Gissur á fund, umkringdi hann og lét hann sverja sér hollustu. Svo sleppti hann honum — og Gissur sveik eiðinn samstundis og kom aftur til að hefna sín.',
    whyItHappened:
      'Sturla var í lokaatlögu sinni að yfirráðum yfir landinu öllu. Að knýja Gissur til undirgefni átti að fjarlægja síðasta alvöru keppinautinn án allsherjarorrustu.',
    whyItMatters:
      'Að hlífa Gissuri var glappaskotið sem gerði út af við Sturlunga. Innan fárra mánaða söfnuðu Gissur og Kolbeinn ungi her og gjörsigruðu þá á Örlygsstöðum, þar sem Sturla féll sjálfur.',
    before:
      'Nýbúinn að brjóta net föðurbróður síns á Bæ átti Sturla einn keppinaut eftir á leiðinni að Íslandi öllu.',
    after:
      'Gissur reif eiðinn um leið og hann var laus — og kom aftur með her fjórum mánuðum síðar.',
    humanDrama:
      'Sturla hafði allt: 400 menn, hættulegasti keppinauturinn afvopnaður og á kné, hollustueiður svarinn á staðnum. Og svo — af stolti, eða til að sýnast mildur — lét hann Gissur ganga. Gissur reið beint heim, reif eiðinn og byrjaði að safna hernum sem drap Sturlu og föður hans innan ársins. Dýrasta miskunnarverk Íslandssögunnar.',
    modernTranslation:
      'Þú krossfestir helsta keppinautinn ekki þegar þú getur: þú lætur hann skrifa undir hollustuyfirlýsingu fyrir framan alla — og sleppir honum svo til að líta stórmannlega út. Hann keyrir heim, rífur samninginn og ver næstu sex mánuðum í að smíða bandalagið sem klárar þig.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Atburðinum er lýst í Sturlungu og hann er almennt viðtekinn, en kringlóttu liðstölurnar (400 gegn 40) eru umgjörð sögunnar og ber að lesa sem dramatíska styttingu fremur en manntal.',
    sources: [
      { title: 'Wikipedia: Apavatnsför', url: 'https://is.wikipedia.org/wiki/Apavatnsf%C3%B6r' },
      {
        title: 'Wikipedia: Sturla Sighvatsson',
        url: 'https://is.wikipedia.org/wiki/Sturla_Sighvatsson',
      },
    ],
  },
  'orlygsstadir-1238': {
    name: 'Örlygsstaðabardagi',
    dateText: 'Ágúst 1238',
    period: 'Sturlungaöld',
    locationName: 'Örlygsstaðir í Blönduhlíð, Skagafirði',
    factions: [
      'Sturlungar (Sturla Sighvatsson)',
      'Ásbirningar og Haukdælir (Gissur Þorvaldsson, Kolbeinn ungi)',
    ],
    winner: 'Ásbirningar og Haukdælir',
    casualtyEstimate: 'Yfir 50 féllu, þar á meðal Sturla Sighvatsson og Sighvatur faðir hans',
    summary:
      'Fjölmennasta orrusta sem háð hefur verið á íslenskri grund. Sturla Sighvatsson leiddi Sturlunga gegn bandalagi keppinauta sinna — og beið afhroð. Hann féll sjálfur, og Sighvatur faðir hans einnig. Úrslitahögg í borgarastyrjöld Íslendinga.',
    eli12:
      'Voldugar ættir börðust um Ísland eins og stríðsherrar. Sturla var foringi Sturlunga og hélt að hann gæti sigrað alla. Hann gat það ekki. Hann tapaði og féll hér, og það breytti öllu.',
    whyItHappened:
      'Sturlungar höfðu sótt af offorsi að yfirráðum yfir landinu öllu. Keppinautaættirnar — Ásbirningar og Haukdælir — mynduðu bandalag til að stöðva þá. Spennan hafði hlaðist upp árum saman í deilum, mægðum og sviknum sáttmálum.',
    whyItMatters:
      'Orrustan lamaði Sturlunga og hraðaði upplausn Sturlungaaldar, sem endaði með því að Ísland gekk Noregskonungi á hönd 1262. Oftast talin fjölmennasta orrusta Íslandssögunnar.',
    before:
      'Fjórum mánuðum fyrr hafði Sturla látið handtaka og afvopna Gissur við Apavatn — og sleppt honum.',
    after:
      'Gissur átti völlinn, en stríðið hætti ekki — það sneri sér að eftirlifendunum, fyrst frægasta Sturlungnum af öllum.',
    humanDrama:
      'Hér kom reikningurinn frá Apavatni til innheimtu. Keppinauturinn sem Sturla hafði handsamað og sleppt mætti með bandalag og kom Sturlungum í opna skjöldu. Sturla og Sighvatur faðir hans — feðgar sem réðu hálfu landinu — féllu báðir á sama velli sama dag. Maðurinn sem allir sögðu honum að drepa var maðurinn sem stóð yfir honum í lokin.',
    modernTranslation:
      'Fjölskyldusamsteypa sem eyddi áratug í að gleypa alla keppinauta lendir í fyrirsát bandalags allra sem hún valtaði yfir. Stofnandinn og erfðaprinsinn þurrkast báðir út í einni fjandsamlegri yfirtöku — heilt veldi gert upp á einu síðdegi.',
    confidenceNote:
      'Mikill áreiðanleiki. Einn best skjalfesti atburður aldarinnar: Íslendinga saga í Sturlungu geymir nákvæma, nærsamtíða lýsingu, og um úrslitin og mikilvægið er ekki deilt. Aðeins nákvæm mannfallstala er áætlun.',
    sources: [
      {
        title: 'Wikipedia: Örlygsstaðabardagi',
        url: 'https://is.wikipedia.org/wiki/%C3%96rlygssta%C3%B0abardagi',
      },
      {
        title: 'Wikipedia: Sturlunga saga',
        url: 'https://is.wikipedia.org/wiki/Sturlunga_saga',
      },
    ],
  },
  'snorri-sturluson-1241': {
    name: 'Víg Snorra Sturlusonar',
    dateText: '23. september 1241',
    period: 'Sturlungaöld',
    locationName: 'Reykholt í Borgarfirði',
    factions: [
      'Gissur Þorvaldsson og menn í umboði konungs',
      'Snorri Sturluson og heimilisfólk hans',
    ],
    winner: 'Gissur Þorvaldsson / konungsarmurinn',
    casualtyEstimate: 'Snorri Sturluson veginn í kjallaranum; um mannfall heimilisfólks er óljóst',
    summary:
      'Snorri Sturluson, frægasti rithöfundur og stjórnmálamaður Íslandssögunnar, var veginn í Reykholti eftir að hafa fallið í ónáð hjá Noregskonungi. Menn Gissurar Þorvaldssonar fundu hann í kjallaranum og hjuggu hann.',
    eli12:
      'Snorri var snilldarpenni en líka pólitískur refur. Hann komst upp á kant við sér sterkari öfl. Vopnaðir menn komu á bæinn hans, fundu hann í felum og drápu hann.',
    whyItHappened:
      'Snorri var flæktur í norska hirðpólitík en hlýddi Hákoni konungi ekki nema þegar honum hentaði. Á Íslandi hafði Gissur Þorvaldsson bæði heimafengnar ástæður og leyfi konungs til að ryðja honum úr vegi.',
    whyItMatters:
      'Hér rekast bókmenntirnar og borgarastríðið á. Maðurinn á bak við Snorra-Eddu og Heimskringlu dó í sömu valdabaráttu og dró Ísland undir Noregskonung.',
    before:
      'Bróðir Snorra og bróðursonur féllu á Örlygsstöðum; hann sigldi samt heim frá Noregi, þvert gegn banni konungs.',
    after:
      'Órækja sonur hans reyndi hefnd innan fárra mánaða — og vígalistinn hélt stríðinu gangandi.',
    humanDrama:
      'Maðurinn sem varðveitti norræna goðafræði fyrir heiminn allan fannst í felum í eigin kjallara. Síðustu skráðu orð hans: „Eigi skal höggva!“ Þeir hjuggu. Mesti rithöfundur norrænna miðalda, veginn að undirlagi konungs sem hann hafði sjálfur þjónað, undir forystu manns sem eitt sinn var tengdasonur hans.',
    modernTranslation:
      'Ímyndaðu þér frægasta rithöfund landsins — sem er líka plottandi stjórnmálamaður með erlent bakland — falla í ónáð hjá stórveldinu sem styrkti hann. Stórveldið gefur þegjandi grænt ljós, og fyrrverandi tengdasonurinn leiðir aðfararsveitina heim til hans.',
    confidenceNote:
      'Mikill áreiðanleiki. Víginu lýsti Sturla Þórðarson — bróðursonur Snorra sjálfs — í lifandi minni atburðanna, og dagsetning, staður og fleygu lokaorðin eru föst í heimildunum.',
    sources: [
      {
        title: 'Wikipedia: Snorri Sturluson',
        url: 'https://is.wikipedia.org/wiki/Snorri_Sturluson',
      },
      {
        title: 'Wikipedia: Gissur Þorvaldsson',
        url: 'https://is.wikipedia.org/wiki/Gissur_%C3%9Eorvaldsson',
      },
    ],
  },
  'skalholtsbardagi-1242': {
    name: 'Skálholtsbardagi',
    dateText: 'Janúar 1242',
    period: 'Sturlungaöld',
    locationName: 'Skálholt',
    factions: ['Órækja Snorrason / Sturlungar', 'Gissur Þorvaldsson / Haukdælir'],
    winner: 'Gissur Þorvaldsson / Haukdælir',
    casualtyEstimate: 'Lítið; sumar frásagnir nefna aðeins einn fallinn þrátt fyrir fjölmennið',
    summary:
      'Furðufjölmenn viðureign í Skálholti, einni helstu trúar- og valdamiðstöð landsins. Órækja Snorrason og Gissur Þorvaldsson stilltu upp liði — en blóðsúthellingarnar urðu miklu minni en mannfjöldinn gaf til kynna.',
    eli12:
      'Fullt af vopnuðum mönnum safnaðist saman á einum helgasta stað Íslands. Það leit út fyrir stórslys, en miðað við aðra Sturlungaaldarbardaga dóu undarlega fáir.',
    whyItHappened:
      'Eftir víg Snorra Sturlusonar var heimur Sturlunga fullur af hefndarkröfum og valdagripum. Órækja Snorrason skoraði á Gissur Þorvaldsson — einn valdamesta mann landsins.',
    whyItMatters:
      'Skálholtsbardagi sýnir að jafnvel helgi- og stjórnsýslustaðir urðu að vopnuðum leiksviðum. Á Sturlungaöld stóð enginn mikilvægur staður örugglega utan deilukerfisins.',
    before:
      'Menn Gissurar höfðu vegið Snorra Sturluson í kjallara hans — og sonur Snorra vildi blóð fyrir.',
    after:
      'Næsti áskorandi Sturlunga kom að norðan á skipum — með miklu stærri harm að hefna.',
    humanDrama:
      'Órækja var að hefna föður síns — Snorra Sturlusonar — á Gissuri, manninum á bak við vígið. Hundruð vopnaðra manna stilltu sér upp á helgasta stað landsins... og eftir sumum frásögnum féll nákvæmlega einn maður. Biskupinn gekk á milli fylkinganna, og einu sinni á Sturlungaöld virkaði það í alvöru að ganga á milli.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Viðureignin er vel skráð í Sturlungu; undarlega lága mannfallstalan er það sem heimildirnar segja í raun, ekki gat í þeim.',
    sources: [
      {
        title: 'Wikipedia: Órækja Snorrason',
        url: 'https://is.wikipedia.org/wiki/%C3%93r%C3%A6kja_Snorrason',
      },
      {
        title: 'Wikipedia: Gissur Þorvaldsson',
        url: 'https://is.wikipedia.org/wiki/Gissur_%C3%9Eorvaldsson',
      },
    ],
  },
  'hunafloi-1244': {
    name: 'Flóabardagi',
    dateText: '1244',
    period: 'Sturlungaöld',
    locationName: 'Húnaflói',
    factions: ['Þórður kakali (Sturlungar)', 'Kolbeinn ungi (Ásbirningar)'],
    winner: 'Þórður kakali',
    casualtyEstimate: 'Óljóst — Kolbeinn ungi dó skömmu síðar, hugsanlega af sárum',
    summary:
      'Fátíð sjóorrusta á Húnaflóa — sú eina að heitið geti í Íslandssögunni. Þórður kakali, harðskeyttur foringi Sturlunga, mætti Kolbeini unga á sjó. Sjóorrustur voru nær óþekktar á Íslandi og því sker Flóabardagi sig úr í sögunum.',
    eli12:
      'Í stað þess að berjast á landi eins og venjulega börðust þessir á skipum úti á flóa. Það var mjög óvenjulegt á Íslandi. Kolbeinn ungi — stóróvinur Sturlunga — dó um svipað leyti, líklega af meiðslum.',
    whyItHappened:
      'Þórður kakali kom heim frá Noregi staðráðinn í að endurreisa veldi Sturlunga eftir áfallið á Örlygsstöðum. Kolbeinn ungi réð Norðurlandi og stóð í veginum.',
    whyItMatters:
      'Kolbeinn ungi var einn öflugasti andstæðingur Sturlunga. Fráfall hans ruddi stórri hindrun úr vegi og hjálpaði Þórði kakala að ná Norðurlandi undir sig — um sinn.',
    before:
      'Þórður kakali kom heim að ætt sinni brytjaðri niður á Örlygsstöðum og föðurbróður sínum vegnum í Reykholti.',
    after:
      'Með Kolbein fallinn frá kláraði Þórður verkið á landi tveimur árum síðar — í blóðugustu orrustu Íslandssögunnar.',
    humanDrama:
      'Þórður kakali kom heim frá Noregi og fann föður sinn og bræður fallna og ættina brotna. Svar hans var að mæta sterkasta stríðsherra Norðurlands með samtíningsflota — eina alvöru sjóorrusta Íslands, háð af manni sem átti engu að tapa gegn manni sem átti allt og var þegar að deyja.',
    confidenceNote:
      'Mikill áreiðanleiki. Þórðar saga kakala í Sturlungusafninu lýsir orrustunni ítarlega og nálægt atburðunum. Óvissan snýr að tengslum sára Kolbeins við andlát hans skömmu síðar.',
    sources: [
      { title: 'Wikipedia: Flóabardagi', url: 'https://is.wikipedia.org/wiki/Fl%C3%B3abardagi' },
      {
        title: 'Wikipedia: Þórður kakali Sighvatsson',
        url: 'https://is.wikipedia.org/wiki/%C3%9E%C3%B3r%C3%B0ur_kakali_Sighvatsson',
      },
    ],
  },
  'haugsnes-1246': {
    name: 'Haugsnesbardagi',
    dateText: '19. apríl 1246',
    period: 'Sturlungaöld',
    locationName: 'Haugsnes á Dalsáreyrum í Blönduhlíð, Skagafirði',
    factions: ['Sturlungar (Þórður kakali)', 'Ásbirningar (Brandur Kolbeinsson)'],
    winner: 'Þórður kakali / Sturlungar',
    casualtyEstimate: 'Um 110 féllu — mannskæðasta orrusta Íslandssögunnar',
    summary:
      'Almennt talin blóðugasta orrusta sem háð hefur verið á Íslandi. Sturlungar Þórðar kakala knésettu Ásbirninga og felldu um 110 menn — gríðarlegt mannfall í fámennu landi. Ásbirningar báru aldrei sitt barr eftir.',
    eli12:
      'Þetta var mannskæðasti bardagi Íslandssögunnar. Um 110 manns dóu, sem hljómar kannski lítið — en Íslendingar voru þá kannski 50–70 þúsund. Það er eins og heilt þorp þurrkist út á einu síðdegi.',
    whyItHappened:
      'Valdabarátta Sturlunga og Ásbirninga hafði malað árum saman. Þórður kakali vildi hefnd fyrir Örlygsstaði og full yfirráð nyrðra. Ásbirningar undir Brandi Kolbeinssyni neituðu að láta undan.',
    whyItMatters:
      'Orrustan gekk í raun frá veldi Ásbirninga. En ofboðslegt umfang ofbeldisins vakti líka athygli Noregskonungs, sem notaði upplausnina á Íslandi sem röksemd fyrir beinum yfirráðum. Ísland gekk konungi á hönd 1262.',
    before:
      'Þórður kakali hafði brotið flota Kolbeins unga á Húnaflóa; Brandur, nýr foringi Ásbirninga, neitaði að gefa Norðurland eftir.',
    after:
      'Ofbeldið hélt áfram að stigmagnast að grimmd ef ekki umfangi — næst kom fjöldamorð dagana eftir brúðkaupsveislu.',
    humanDrama:
      'Þórður kakali fékk loks hefnd sína fyrir Örlygsstaði — átta árum og um 110 líkum síðar. Brandur Kolbeinsson flúði af vellinum, var eltur uppi og veginn. Nöturlegi eftirmálinn: enginn vann í raun. Blóðtakan var svo hrikaleg að hún varð besta röksemd Noregskonungs fyrir því að Íslendingar gætu ekki stjórnað sér sjálfir.',
    modernTranslation:
      'Sett í hlutfall við fólksfjölda er þetta eins og land missi ígildi milljónar manna fyrir kvöldmat. Og helsti ávinningshafi voðaverksins var erlent stórveldi hinum megin hafsins, að taka minnispunkta fyrir yfirtökukynninguna: „Sjáið þá. Þeir þurfa greinilega fullorðinseftirlit.“',
    confidenceNote:
      'Mikill áreiðanleiki. Vel skjalfest í Sturlungusafninu, og orðspor orrustunnar sem þeirrar blóðugustu er viðtekið í fræðunum. Talan ~110 er hefðartala, ekki réttarmeinafræðileg niðurstaða.',
    sources: [
      {
        title: 'Wikipedia: Haugsnesbardagi',
        url: 'https://is.wikipedia.org/wiki/Haugsnesbardagi',
      },
      {
        title: 'Wikipedia: Þórður kakali Sighvatsson',
        url: 'https://is.wikipedia.org/wiki/%C3%9E%C3%B3r%C3%B0ur_kakali_Sighvatsson',
      },
    ],
  },
  'flugumyrarbrenna-1253': {
    name: 'Flugumýrarbrenna',
    dateText: '22. október 1253',
    period: 'Sturlungaöld',
    locationName: 'Flugumýri í Blönduhlíð, Skagafirði',
    factions: [
      'Brennumenn — óvinir Gissurar Þorvaldssonar',
      'Heimili Gissurar Þorvaldssonar',
    ],
    winner: 'Brennumenn',
    casualtyEstimate: 'Yfir 25 fórust í eldinum og áhlaupinu',
    summary:
      'Næturárás og íkveikja á höfuðbólinu Flugumýri. Óvinir Gissurar Þorvaldssonar báru eld að bænum meðan fólk svaf — dagana eftir brúðkaup sem átti að innsigla frið. Yfir 25 manns fórust. Jafnvel á mælikvarða Sturlungaaldar þótti verkið ódrengilegt með afbrigðum.',
    eli12:
      'Menn læddust að bæ um miðja nótt og kveiktu í meðan fólkið svaf. Yfir 25 manns brunnu inni eða féllu á flótta. Meira að segja miðaldafólki þótti þetta hræðilega illt verk.',
    whyItHappened:
      'Pólitískar væringar voru útkljáðar með ofbeldi á þessari öld. Gissur Þorvaldsson átti marga óvini sem vildu hann feigan. Brennan var hefnd — grimm, huglaus og áhrifarík.',
    whyItMatters:
      'Flugumýrarbrenna hneykslaði jafnvel forherta samtímamenn. Hún styrkti þá mynd að valdastétt Íslands hefði endanlega misst tökin — sem hjálpaði til við að réttlæta inngrip Noregskonungs og endalok þjóðveldisins.',
    before:
      'Eftir Haugsnes reyndi Gissur að enda stríðið á siðaðan hátt — með því að gifta son sinn Sturlungabrúði. Brúðkaupið var dögum fyrir brennuna.',
    after:
      'Brennumenn voru eltir uppi innan tveggja ára, og áratug síðar gekk úrvinda Ísland Noregskonungi á hönd.',
    humanDrama:
      'Tímasetningin er hnífstungan: árásin kom fáeinum dögum eftir brúðkaup sem átti að sætta stríðandi ættir. Óvinir Gissurar læddust að um nótt og báru eld að bænum — og Gissur lifði af með því einu að leggjast í sýruker meðan kona hans og synir brunnu inni. Hann skreið upp úr, búinn að missa nánast alla sína, og lifði það sem eftir var sem maðurinn sem lifði þetta af.',
    modernTranslation:
      'Tvær stríðandi fjölskyldur halda brúðkaup til að grafa stríðsöxina. Dögum síðar kveikir önnur í húsi hinnar um miðja nótt. Skotmarkið lifir af með því að fela sig í kjallaranum meðan fjölskyldan ferst uppi — og allir eru sammála um að hér hafi verið farið yfir línu sem jafnvel grimm öld fyrirgaf ekki.',
    confidenceNote:
      'Mikill áreiðanleiki. Flugumýrarbrennu er lýst í hárbeittum smáatriðum í Sturlungu og hún er meðal traustast skjalfestu atburða aldarinnar; dagsetningin og um 25 látnir standa vel, með smávægilegum mun milli frásagna.',
    sources: [
      {
        title: 'Wikipedia: Flugumýrarbrenna',
        url: 'https://is.wikipedia.org/wiki/Flugum%C3%BDrarbrenna',
      },
      {
        title: 'Wikipedia: Gissur Þorvaldsson',
        url: 'https://is.wikipedia.org/wiki/Gissur_%C3%9Eorvaldsson',
      },
    ],
  },
  'thverarfundur-1255': {
    name: 'Þverárfundur',
    dateText: '19. júlí 1255',
    period: 'Sturlungaöld',
    locationName: 'Þveráreyrar við Munkaþverá í Eyjafirði',
    factions: [
      'Eyjólfur ofsi Þorsteinsson og Hrafn Oddsson (fylking Flugumýrarbrennumanna)',
      'Þorvarður Þórarinsson og Þorgils skarði Böðvarsson (að hefna Odds Þórarinssonar)',
    ],
    winner: 'Þorvarður Þórarinsson og Þorgils skarði',
    casualtyEstimate: 'Um 15–17 féllu, þar á meðal Eyjólfur ofsi',
    summary:
      'Illvíg norðlensk orrusta í valdatóminu eftir að Gissur Þorvaldsson hélt til Noregs. Eyjólfur ofsi og bandamenn hans lentu í kvörn hefndarstjórnmálanna, og Eyjólfur féll.',
    eli12:
      'Stóri foringinn var farinn úr landi, svo hinir fóru að slást um afganginn. Tvær fylkingar mættust í Eyjafirði, bardaginn varð ljótur og einn helsti vandræðamaðurinn dó.',
    whyItHappened:
      'Sturlungaöldin var að hrynja saman í fylkingareikning: hver skuldaði hefnd, hver hafði skipt um lið, hver gat hrifsað völd áður en Gissur sneri aftur. Þverárfundur var einn slíkur reikningur, gerður upp með vopnum.',
    whyItMatters:
      'Sýnir hve óstöðugt Ísland var jafnvel eftir stærstu orrusturnar. Að fella einn valdamann leysti ekki kerfið; það bjó yfirleitt til næstu deilu.',
    before:
      'Eyjólfur ofsi hafði staðið að því að brenna fjölskyldu inni á Flugumýri — og á Sturlungaöld kom sá reikningur alltaf til innheimtu.',
    after:
      'Sjö árum síðar sór úrvinda Ísland Noregskonungi trúnað. Borgarastríðið var búið; sjálfstæðið líka — í 682 ár.',
    humanDrama:
      'Eyjólfur ofsi var einn brennumanna Flugumýrar tveimur árum fyrr, þar sem fjölskylda brann inni dögum eftir friðarbrúðkaup. Á Þveráreyrum náðu hefnendurnir honum. Á Sturlungaöld dóu brennuvargar sjaldan úr elli.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Orrustan og fall Eyjólfs eru skráð í Sturlunguefninu; mannfallsbil og sum fylkingaatriði eru breytileg milli heimilda.',
    sources: [
      {
        title: 'Wikipedia: Þverárfundur',
        url: 'https://is.wikipedia.org/wiki/%C3%9Ever%C3%A1rfundur',
      },
      {
        title: 'Wikipedia: Sturlunga saga',
        url: 'https://is.wikipedia.org/wiki/Sturlunga_saga',
      },
      {
        title: 'Merkið stendur á eyrunum (Þveráreyrum) neðan Munkaþverár',
        url: '',
      },
    ],
  },
  'gamli-sattmali-1262': {
    name: 'Gamli sáttmáli — endalok þjóðveldisins',
    dateText: '1262–1264 (svarinn landshluta fyrir landshluta)',
    period: 'Endalok þjóðveldisins',
    locationName: 'Alþingi á Þingvöllum, síðan héraðsþing',
    factions: [
      'Hákon gamli Noregskonungur, með Gissur Þorvaldsson sem jarl sinn',
      'Úrvinda höfðingjar og bændur Íslands',
    ],
    winner: 'Norska krúnan — Ísland hélt lögum sínum en lét sjálfstæðið',
    casualtyEstimate: 'Ekkert — mannfallið var þegar orðið; þetta var kvittunin',
    summary:
      'Eftir fjóra áratugi borgarastríðs sóru forystumenn Íslendinga Noregskonungi land, þegna og skatt, landshluta fyrir landshluta 1262–1264, gegn friði, lögum og tryggum siglingum. Milligöngumaðurinn var Gissur Þorvaldsson — sá sem lifði af Sturlungaöldina, nú jarl konungs. Þjóðveldið sem hafði stjórnað sér sjálft án konungs í 332 ár var úti. Nútímafræði leggja áherslu á að þetta hafi síður verið einn dramatískur sáttmáli en formleg endalok yfirtöku sem hafði staðið áratugum saman.',
    eli12:
      'Stóru ættirnar á Íslandi börðust þar til enginn gat unnið — nema Noregskonungur, sem hafði stutt ýmsar hliðar á víxl allan tímann. Uppgefnir samþykktu Íslendingar að gera hann að konungi sínum ef hann héldi frið og sendi skip með vörur. Ísland réð sér ekki sjálft aftur fyrr en 1944.',
    whyItHappened:
      'Sturlungastríðin höfðu brotið goðaveldið, og konungur hafði áratugum saman safnað að sér íslenskum goðorðum og hollustueiðum — margir helstu menn landsins voru þegar handgengnir honum. Þegar friðurinn fékk loks verðmiða gat aðeins konungur borgað hann.',
    whyItMatters:
      'Ás Íslandssögunnar: allt á undan er þjóðveldissagan, allt á eftir er langa leiðin til baka. Fyrir sjálfstæðisbaráttuna sex öldum síðar var Gamli sáttmáli hvort tveggja í senn, sárið og lagaröksemdin — sönnun þess að Ísland gekk konungi á hönd með samningi, ekki með landvinningum.',
    before:
      'Síðustu fjörbrot borgarastríðsins höfðu engu skilað nema því að Íslendingar gátu ekki lengur stjórnað sér án dómara.',
    after:
      'Konungsvaldið færði frið en líka erlenda embættismenn — og þolinmæði Íslendinga gagnvart þeim átti sín takmörk.',
    humanDrama:
      'Maðurinn sem afhenti konungi Ísland var Gissur Þorvaldsson — sá sem lifði af Flugumýrarbrennu, lét vega Snorra Sturluson og sveik eiðinn frá Apavatni. Allir keppinautarnir voru dauðir, og verðlaunin fyrir að vinna Sturlungaöldina reyndust þau að fá að jarðsyngja heiminn sem skóp hann. Hann fékk jarlstign; Ísland fékk 682 ár af erlendum yfirráðum.',
    modernTranslation:
      'Markaður í rúst eftir áratuga fyrirtækjastríð rennur loks saman: úrvinda leikendur selja erlenda risanum sem hafði fjármagnað allar hliðar. Kaupandinn lofar stöðugleika og aðfangakeðju, heldur staðarstjórninni — og kaupsamningurinn er endursaminn á verri kjörum með hverri kynslóð.',
    confidenceNote:
      'Mikill áreiðanleiki. Að landið gekk konungi á hönd 1262–64 er fastskjalfest. Blæbrigðin: varðveittu sáttmálatextarnir eru yngri uppskriftir, og sagnfræðingar lýsa innlimuninni sem ferli yfir áratugi (um 1220–1281) fremur en einni undirskriftarstund — dramatíska einnar-stundar útgáfan er að hluta síðari tíma þjóðminni.',
    sources: [
      {
        title: 'Wikipedia: Gamli sáttmáli',
        url: 'https://is.wikipedia.org/wiki/Gamli_s%C3%A1ttm%C3%A1li',
      },
      {
        title: 'Sverrir Jakobsson: All the King’s Men — innlimun Íslands í norska konungsríkið (á ensku)',
        url: 'https://iris.hi.is/en/publications/all-the-kings-men-the-incorporation-of-iceland-into-the-norwegian/',
      },
    ],
  },
  'oraefajokull-1362': {
    name: 'Öræfajökulsgosið 1362',
    dateText: 'Júní 1362',
    period: 'Norsk yfirráð',
    locationName: 'Öræfajökull; sveitin Litla-Hérað undir honum',
    factions: ['Bændabyggðin Litla-Hérað gegn stærsta sprengigosi Íslandssögunnar'],
    winner: 'Eldfjallið — sveitin þurrkaðist út og hlaut nýtt nafn: Öræfi',
    casualtyEstimate:
      'Óþekkt; annálar gefa í skyn að bæir sveitarinnar hafi eyðst, og síðari sagnir herma að fáir eða engir hafi komist undan á gossvæðinu',
    summary:
      'Stærsta sprengigos Íslands frá landnámi (VEI 6). Eldfjallið sem þá hét Knappafellsjökull sprakk í júní 1362 og gróf blómlegu sveitina Litla-Hérað — á þriðja tug býla — undir gjósku og jökulhlaupum. Svæðið byggðist ekki aftur fyrr en áratugum síðar, undir nýju nafni sem segir allt sem segja þarf: Öræfi.',
    eli12:
      'Risastórt eldfjall undir jökli sprakk og þurrkaði heila sveit út af kortinu — aska, flóð, allt farið. Þegar fólk flutti loks aftur var svæðið kallað „Öræfi“ — auðnin. Það heitir það enn: keyrirðu fram hjá Skaftafelli ertu í Öræfum.',
    whyItHappened:
      'Öræfajökull er gríðarstór eldkeila undir jökulhettu sem hafði sofið allt landnámsskeiðið. Þegar hún loks vaknaði áttu byggðirnar undir henni enga möguleika gegn samspili sprengigjósku og jökulhlaupa.',
    whyItMatters:
      'Pompei-stund Íslands í heilli sveit — skýrasta dæmið um eldfjall sem endurskrifar landakort og örnefni til frambúðar. Það sýnir líka hve rýrar heimildir 14. aldar eru: gos af þessari stærð fékk fáeinar annálalínur, því sveitin sem hefði getað skrifað meira var ekki lengur til.',
    before:
      'Öld inn í norsk yfirráð höfðu vandræði Íslands verið pólitísk — embættismenn, skattar, verslun. Náttúran hafði haldið sig tiltölulega til hlés frá Heklugosinu 1104.',
    after: '14. öldin var ekki búin: fjörutíu árum síðar rataði svartidauði loks til eyjarinnar.',
    confidenceNote:
      'Mikill áreiðanleiki. Gosið 1362 er tímasett í annálum og staðfest sem VEI 6 með gjóskurannsóknum — stærsta súra sprengigos Íslands frá landnámi. Mannfallið er óvissi hlutinn: annálarnir eru knappir og sveitin skildi engar eigin heimildir eftir.',
    sources: [
      {
        title: 'Wikipedia: Öræfajökull',
        url: 'https://is.wikipedia.org/wiki/%C3%96r%C3%A6faj%C3%B6kull',
      },
      {
        title: 'Sigurður Þórarinsson: The Öræfajökull eruption of 1362 (á ensku)',
        url: 'https://utgafa.natt.is/Acta-Naturalia-Islandica/Acta-Naturalia-Islandica-II-2.pdf',
      },
      {
        title: 'Frontiers in Earth Science: Gjóskufall úr Öræfajökli (á ensku)',
        url: 'https://www.frontiersin.org/journals/earth-science/articles/10.3389/feart.2018.00196/full',
      },
    ],
  },
  'grundarbardagi-1362': {
    name: 'Grundarbardagi',
    dateText: '8. júlí 1362',
    period: 'Norsk yfirráð',
    locationName: 'Grund í Eyjafirði',
    factions: ['Smiður Andrésson hirðstjóri og fylgdarlið hans', 'Eyfirðingar'],
    winner: 'Eyfirðingar',
    casualtyEstimate: 'Smiður Andrésson, Jón Guttormsson og fleiri drepnir',
    summary:
      'Sönnun þess að íslensk átök gufuðu ekki upp með þjóðveldinu. Á Grund í Eyjafirði risu heimamenn upp af hörku gegn Smiði Andréssyni hirðstjóra — og drápu hann.',
    eli12:
      'Ísland var komið undir Noreg en fólk barðist samt. Konunglegur embættismaður lenti upp á kant við heimamenn í Eyjafirði — og heimamenn unnu.',
    whyItHappened:
      'Konungsstjórnin lagði nýtt lag ofan á íslensk stjórnmál, en gamla héraðsvaldið hvarf ekki. Þegar embættismenn, héraðshöfðingjar og persónulegir óvinir skullu saman voru vopnin enn uppi á borðinu.',
    whyItMatters:
      'Grundarbardagi víkkar kortið út fyrir Sturlungaöldina. Norsk yfirráð breyttu pólitíska rammanum, en íslenskar valdastéttir gátu enn útkljáð deilur með valdi.',
    before:
      'Öld fyrr hafði Ísland skipt borgarastríðinu fyrir norsku krúnuna — og fengið erlenda embættismenn í kaupbæti.',
    after: 'Munstrið — óvinsælir erlendir embættismenn, stöku ofbeldisfull andsvör — gekk öldum saman.',
    humanDrama:
      'Smiður Andrésson var handrukkari krúnunnar á Íslandi og harðhentur eftir orðsporinu. Norðlendingar ákváðu að nóg væri komið, réðust á Grund um nótt og drápu hann ásamt lögmanninum við hlið hans. Viðbrögð konungs voru áberandi hófstillt — jafnvel krúnan virtist skilja þetta tiltekna mál.',
    modernTranslation:
      'Óvinsæll landstjóri sendur að utan gengur einu héraði of langt í yfirgangi. Heimamenn ráðast á bústað hans um nótt og drepa hann — og miðstjórnarvaldið les stöðuna og ákveður hljóðlega að gera ekki mál úr neinu.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Vígið er fært í íslenska annála með fastri dagsetningu, en annálafærslur eru knappar — aðdragandinn og hvatirnar eru að hluta endurgerð.',
    sources: [
      {
        title: 'Wikipedia: Grundarbardagi',
        url: 'https://is.wikipedia.org/wiki/Grundarbardagi',
      },
      {
        title: 'Merkið stendur við Grund í Eyjafirði',
        url: '',
      },
    ],
  },
  'svartidaudi-1402': {
    name: 'Svartidauði',
    dateText: '1402–1404',
    period: 'Norsk-dönsk yfirráð / plágur og hallæri',
    locationName: 'Barst með skipi í Hvalfjörð 1402 — síðan um land allt (komustaður áætlaður)',
    factions: ['Íslendingar gegn plágunni, hálfri öld eftir að hún brenndi yfir Evrópu'],
    keyPeople: ['Einar Herjólfsson (skip hans bar smitið, að hefð)'],
    winner: 'Enginn — oft áætlað að um þriðjungur þjóðarinnar hafi látist, jafnvel fleiri',
    casualtyEstimate:
      'Oft áætlað um þriðjungur Íslendinga; sumar áætlanir hærri — allar tölur eru endurgerðir',
    summary:
      'Svartidauði fór fram hjá Íslandi 1349 — svo breitt var hafið. Hann fann eyjuna 1402, að hefð með skipi Einars Herjólfssonar, og brann gegnum hverja sveit fram á öndvert ár 1404. Klaustur misstu nær alla; jarðir stóðu í eyði kynslóð fram; algeng áætlun um mannfall er um þriðjungur þjóðarinnar. Plágan síðari 1494–95 kláraði öldina á sama hátt.',
    eli12:
      'Frægi svartidauðinn sem lagðist á Evrópu 1349 var 53 ár í viðbót að ná til Íslands — svo einangrað var landið. Þegar hann loks kom með skipi dó kannski einn af hverjum þremur á tveimur árum. Heilu bæirnir og klaustrin tæmdust.',
    whyItHappened:
      'Einangrun Íslands tafði pláguna en gat ekki stöðvað siglingar að eilífu — og þjóð sem aldrei hafði mætt sjúkdómnum átti ekkert viðnám þegar hann steig á land.',
    whyItMatters:
      'Lýðfræðilegt stórslys á við stríð sem Ísland háði aldrei: það umturnaði jarðeignum, launum og auði kirkjunnar í heila öld, og stendur við hlið Stórubólu sem sönnun þess að skæðustu óvinir Íslands komu alltaf með skipum.',
    before:
      'Ísland hafði horft á plágu Evrópu yfir hafið í fimmtíu ár — einangrun sem óvart varð sóttkví.',
    after:
      'Þremur öldum síðar keyrði sama handrit aftur með bólusótt — annað skip, önnur kynslóð án ónæmis.',
    humanDrama:
      'Hefðin kennir komuna við eitt skip og einn mann, Einar Herjólfsson — miðaldaþörfin fyrir að gefa hamförum nafn og andlit. Knappar annálalínur fela áferðina: kaleikar án prests því allir prestarnir voru dánir, jarðir sem gengu í arf þrisvar á einum vetri.',
    confidenceNote:
      'Mikill áreiðanleiki um að farsóttin geisaði og hvenær — annálar tímasetja hana fast 1402–04. Mannfallið er mjúki hlutinn: oft áætlað um þriðjungur, stundum hærra, en miðalda-Ísland hélt ekkert manntal og hver tala er fræðileg endurgerð.',
    sources: [
      {
        title: 'Saga (Sögufélag): Plágurnar miklu á Íslandi',
        url: 'https://saga.sogufelag.is/saga-greinar/plagurnar-miklu-a-islandi/',
      },
      {
        title: 'Wikipedia: Svartidauði',
        url: 'https://is.wikipedia.org/wiki/Svartidau%C3%B0i',
      },
      {
        title: 'Callow & Evans: The mystery of plague in medieval Iceland (á ensku)',
        url: 'https://pure-oai.bham.ac.uk/ws/files/27974086/Callow_Evans_Plague_iceland_Journal_Medieval_History_Accepted.pdf',
      },
    ],
  },
  'jon-gerreksson-1433': {
    name: 'Dráp Jóns Gerrekssonar',
    dateText: 'Júlí 1433',
    period: 'Enska öldin',
    locationName: 'Tekinn í Skálholti, drekkt í Brúará hjá Spóastöðum (staður áætlaður)',
    factions: [
      'Íslenskir höfðingjar og vopnaðir bændur, undir forystu manna sem sveinar biskups höfðu níðst á',
      'Jón Gerreksson Skálholtsbiskup og leigusveinar hans',
    ],
    winner: 'Íslendingarnir — og merkilegt nokk var nánast enginn látinn svara til saka',
    casualtyEstimate: 'Biskupnum drekkt; sumir sveina hans drepnir eða hraktir burt',
    summary:
      'Jón Gerreksson kom til Skálholts sem biskup með fortíð (hann hafði þegar verið settur af sem erkibiskup í Uppsölum) og með einkasveit sveina sem rændu og brenndu um Suðurland — þar á meðal, að hefð, bæinn á Kirkjubóli eftir að vonbiðli var hafnað. Árið 1433 drógu vopnaðir Íslendingar biskupinn út úr eigin dómkirkju, tróðu honum í poka og drekktu honum í Brúará. Róm og Kaupmannahöfn létu sér fátt um finnast.',
    eli12:
      'Spilltur erlendur biskup mætti með gengi sem rændi bæi og brenndi hús ofan af fólki. Íslendingar fengu nóg: þeir drógu hann út úr kirkjunni — í miðri messu — settu hann í poka og hentu honum í á. Engum var í raun refsað, sem segir sitt um álit fólks á honum.',
    whyItHappened:
      'Sveinar biskupsins höfðu gert hann að hataðasta manni Suðurlands, og vald krúnunnar var fjarlægt og annars hugar — á ensku öldinni réð sá lögum sem mætti með vopnaða menn.',
    whyItMatters:
      'Stórbrotnasta sönnun aldarinnar fyrir því að erlent vald á Íslandi stóð og féll með samþykki heimamanna. Atburðurinn stendur í beinni röð brottnuminna óvinsælla embættismanna — frá Smiði Andréssyni á Grund til Lénharðs í Hrauni.',
    before:
      'Plágan hafði tæmt sveitir og veikt hverja stofnun — inn í tómið sigldu enskir kaupmenn, framagjarnir klerkar og menn eins og Jón Gerreksson.',
    after:
      'Sjötíu árum síðar fékk hataður konungsfógeti sömu meðferð — með sama skorti á eftirmálum.',
    humanDrama:
      'Þeir tóku hann í messu, í fullum skrúða, frá altari eigin dómkirkju — leikrænasta yfirlýsing íslenskra miðalda um að ekkert embætti verndar mann sem allir hafa ákveðið að losna við. Pokinn og áin gáfu þjóðsagnakenndan endapunkt: ekki aftaka, heldur förgun.',
    modernTranslation:
      'Forstjóri í ónáð fær nýja stöðu erlendis og tekur einkaöryggissveitina með sér, sem rekur fjárkúgun á heimafólki. Dag einn fjarlægir samfélagið hann einfaldlega — opinberlega, í miðjum fundi — og öll yfirvöld sem ættu að rannsaka málið finna sér brýnni verkefni.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Drekkingin 1433 er traustlega skráð í annálum; aðdragandinn — einkum Kirkjubólsbrennan og höfnunarsagan á bak við hana — blandar saman skjalfestingu og arfsögn, og enn er deilt um hver skipaði nákvæmlega hvað.',
    sources: [
      {
        title: 'Vísindavefurinn: Af hverju var Jón Gerreksson biskup drepinn?',
        url: 'https://www.visindavefur.is/svar.php?id=63596',
      },
      {
        title: 'Wikipedia: Jón Gerreksson',
        url: 'https://is.wikipedia.org/wiki/J%C3%B3n_Gerreksson',
      },
    ],
  },
  'lenhardur-1502': {
    name: 'Víg Lénharðs fógeta',
    dateText: '1502',
    period: 'Síðkaþólskur tími / danskir embættismenn',
    locationName: 'Hraun í Ölfusi',
    factions: [
      'Torfi Jónsson sýslumaður í Klofa og sveit hans',
      'Lénharður, erlendur konungsfógeti',
    ],
    winner: 'Torfi Jónsson',
    casualtyEstimate: 'Lénharður og að sögn einhverjir manna hans drepnir',
    summary:
      'Stórbokkinn Torfi Jónsson í Klofa elti uppi Lénharð, illræmdan erlendan fógeta sem sakaður var um rán og yfirgang, og lét drepa hann að Hrauni í Ölfusi. Biskupinn tók víginu nánast sem þjóðþrifaverki. Dys við Ölfusá er enn sögð geyma hann.',
    eli12:
      'Erlendur embættismaður óð uppi og stal af fólki. Harðsnúinn íslenskur höfðingi fékk nóg, elti hann uppi með flokk manna og drap hann. Honum var varla refsað — fólk var fegið að böðullinn væri farinn.',
    whyItHappened:
      'Erlendir konungsfógetar voru hataðir fyrir yfirgang gagnvart Íslendingum. Lénharður hafði eignast nógu marga óvini til að forystuhöfðingi teldi sér óhætt að taka lögin í eigin hendur.',
    whyItMatters:
      'Snemmbær blossi íslenskrar reiði gagnvart harðhentum erlendum embættismönnum — sami núningur og átti eftir að springa margfalt stærra í siðaskiptunum og gegnum langar aldir danskra yfirráða.',
    before:
      'Ísland hafði færst frá Noregi til Danmerkur, og konungsfógetar stýrðu sýslunum — sumir af sanngirni, aðrir eins og Lénharður.',
    after:
      'Innan hálfrar aldar hætti núningurinn milli erlendrar krúnu og íslensks valds að snúast um einstaka yfirgangsmenn — og fór að snúast um trúna sjálfa.',
    humanDrama:
      'Lénharður hafði rænt og kúgað sitt umdæmi þar til höfðingi ákvað einfaldlega að lögin væru það sem nógu fjölmenn sveit segði að þau væru. Eftir vígið sendi biskupinn nánast þakkarbréf. Þegar kirkjan bókfærir morðið á þér sem þjóðþrifaverk á arfleifðin þín í vanda.',
    modernTranslation:
      'Spilltur embættismaður með friðhelgi að ofan heldur áfram að féfletta heilt hérað. Á endanum leysir héraðshöfðingi málið varanlega, utan bókhalds — og saksóknarar, dómarar og klerkar finna sér allir brýn erindi annars staðar.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Vígið er hluti skjalfestrar sögu, en smáatriðin berast að hluta gegnum þjóðsögur — þar á meðal dysin sem enn er bent á við Ölfusá.',
    sources: [
      {
        title: 'Wikipedia: Torfi Jónsson í Klofa',
        url: 'https://is.wikipedia.org/wiki/Torfi_J%C3%B3nsson_%C3%AD_Klofa',
      },
      {
        title: 'Ferlir: Hraun í Ölfusi – dys Lénharðs fógeta',
        url: 'https://ferlir.is/hraun-i-olfusi-dys-lenhards-fogeta/',
      },
    ],
  },
  'sveinsstadir-1522': {
    name: 'Sveinsstaðafundur',
    dateText: '1522',
    period: 'Síðkaþólskur tími / aðdragandi siðaskipta',
    locationName: 'Sveinsstaðir við Þingeyrar, Húnaþingi',
    factions: [
      'Jón Arason, þá biskupsefni / norðlenska kirkjufylkingin',
      'Teitur ríki Þorleifsson og andstæð héraðsöfl',
    ],
    winner:
      'Óljóst / umdeilt — Teitur stóð betur skömmu síðar (kjörinn lögmaður og sýknaður á Alþingi)',
    casualtyEstimate: 'Óljóst; heimildir dvelja fremur við vopnaða fundinn en tölu fallinna',
    summary:
      'Valdaátök fyrir siðaskipti sem sýna að Jón Arason var pólitískur bardagamaður löngu fyrir lokauppgjörið við danskt lúterskt vald. Sveinsstaðafundur var kirkjupólitík með hestum, vopnum og hörðum mönnum.',
    eli12:
      'Áður en Jón Arason varð frægi síðasti kaþólski biskupinn stóð hann þegar í héraðsvaldabaráttu. Þetta var ein af stundunum þar sem kirkjuforysta leit út alveg eins og ættarpólitík.',
    whyItHappened:
      'Norðlensk kirkjuembætti voru verðmæt, pólitísk og samofin ættarvaldi. Jón Arason og Teitur Þorleifsson stóðu hvor sínum megin í þeirri baráttu.',
    whyItMatters:
      'Virkar sem aðdragandi siðaskiptaátakanna 1550. Jón Arason varð ekki skyndilega pólitískur undir ævilok; hann hafði siglt vopnaða íslenska valdapólitík áratugum saman.',
    before:
      'Kirkjuembættin voru feitustu bitarnir á Íslandi, og Jón Arason kleif í átt að Hólastóli með gamla laginu.',
    after:
      'Jón vann biskupsstólinn og hélt Norðurlandi áratugum saman — þar til Danmörk varð lútersk og heimtaði að hann fylgdi.',
    confidenceNote:
      'Lítill áreiðanleiki. Fundurinn er staðfestur í íslenskum heimildum en naumt — úrslit, mannfall og jafnvel nákvæmur vettvangur þarfnast staðfestingar í héraðssögum.',
    sources: [
      {
        title: 'Wikipedia: Sveinsstaðafundur',
        url: 'https://is.wikipedia.org/wiki/Sveinssta%C3%B0afundur',
      },
      {
        title: 'Wikipedia: Jón Arason',
        url: 'https://is.wikipedia.org/wiki/J%C3%B3n_Arason',
      },
      {
        title: 'Úrslit og mannfall þarfnast staðfestingar í héraðssögum; merkið stendur við Sveinsstaði',
        url: '',
      },
    ],
  },
  'grindavikurstridid-1532': {
    name: 'Grindavíkurstríðið',
    dateText: '10.–11. júní 1532',
    period: 'Enska öldin / dönsk yfirráð',
    locationName: 'Grindavík (enska virkið á Gerðavöllum við Járngerðarstaði)',
    factions: [
      'Enskir kaupmenn og sjómenn undir Jóhanni breiða, grafnir bak við virkisgarða',
      'Þýskir Hansakaupmenn, menn danska hirðstjórans og vopnaðir Íslendingar',
    ],
    keyPeople: ['Jóhann breiði (John the Broad)', 'Diðrik af Minden'],
    winner: 'Þýsk-dansk-íslenska bandalagið; tak Englendinga á Íslandi brast í raun',
    casualtyEstimate: 'Um 15 Englendingar drepnir, þar á meðal Jóhann breiði; hinir teknir eða flúðu',
    summary:
      'Ofbeldisfull endalok ensku aldarinnar. Enskir kaupmenn höfðu drottnað yfir — og oft kúgað — íslenskar hafnir í heila öld. Árið 1532, eftir að menn Jóhanns breiða tóku fisk ófrjálsri hendi og víggirtu búðir sínar í Grindavík, gerðu Hansakaupmenn, menn hirðstjórans og Íslendingar næturáhlaup á virkið, drápu um fimmtán Englendinga og gerðu allt upptækt. Sátt milli krúnanna 1533 staðfesti niðurstöðuna: Danmörk, ekki England, réði versluninni við Ísland.',
    eli12:
      'Í heila öld höguðu enskir fiskiflotar sér eins og þeir ættu Ísland. Árið 1532 gekk einn enskur skipstjóri of langt — stal fiski og byggði sér lítið virki. Þjóðverjar og Danir (með íslenskri hjálp) réðust á það um nótt og drápu hann og menn hans. Englendingar hættu að mestu að koma; Danir tóku yfir — algjörlega.',
    whyItHappened:
      'England, Hansaborgirnar og danska krúnan höfðu bitist um dýrmæta íslenska skreið áratugum saman, og Englendingar höguðu sér æ meir eins og vopnað vald í landi. Víggirt búð Jóhanns breiða gerði verslunarstríðið bókstaflegt.',
    whyItMatters:
      'Verslunardeila í pínulitlu sjávarplássi hjálpaði til við að ráða því hvaða krúna réði Íslandi næstu fjórar aldir — með afleiðingum (einokunarverslun, siðaskipti frá Kaupmannahöfn) langt umfram verðmæti fisksins. Hafnir Íslands héldu áfram að vera staðurinn þar sem heimspólitíkin steig á land.',
    before:
      'Enska öldin gekk fyrir veikleika krúnunnar — sama veikleika og hafði leyft að biskupi væri drekkt í á án eftirmála.',
    after:
      'Með Englendinga farna var höndin frá Kaupmannahöfn laus — og innan tveggja áratuga seildist hún í kirkju Íslands.',
    humanDrama:
      'Jóhann breiði dó að sögn við silfurkistu bak við virkisgarðana — Alamó fiskverkunarinnar, þar sem fjársjóðurinn var skreið. Dýpri kaldhæðnin: Íslendingar hjálpuðu til við að reka Englendinga út í þágu danskrar krúnu sem átti eftir að svelta barnabörn þeirra með einokun — og slagurinn um hver má veiða á Íslandsmiðum var enn í gangi 1976.',
    modernTranslation:
      'Útibú erlendrar stórsamsteypu venst refsileysinu svo vel að það byggir sér bókstaflega virki. Keppinauturinn og eftirlitsstofnunin gera sameiginlegt áhlaup, útibússtjórinn deyr við að verja lagerinn, og markaðurinn rennur hljóðlega saman undir uppáhaldi eftirlitsins — næstu 400 árin.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Vel skjalfest á mælikvarða síns tíma í dönskum, þýskum og enskum erindaskiptum (málið barst inn að hirð Hinriks VIII.), þótt lýsingin á áhlaupinu sjálfu komi einkum frá annarri hliðinni. Staðsetningin við Járngerðarstaði er hefð.',
    sources: [
      {
        title: 'Ferlir: Grindavíkurstríðið 1532',
        url: 'https://ferlir.is/grindavikurstridid-1532/',
      },
      {
        title: 'Saga-Book: Henry VIII and Iceland (á ensku)',
        url: 'https://www.jstor.org/stable/48612139',
      },
      {
        title: 'World Archaeology: Fornleifafræði fisk- og verslunarstaða á Íslandi (á ensku)',
        url: 'https://www.world-archaeology.com/features/iceland-archaeology-of-fishing-and-trading-sites/',
      },
    ],
  },
  'saudafell-1550': {
    name: 'Sauðafellsbardagi',
    dateText: 'Október 1550',
    period: 'Dönsk yfirráð / siðaskiptin',
    locationName: 'Sauðafell í Dölum',
    factions: [
      'Kaþólska andspyrnan: Jón Arason og synir hans',
      'Daði Guðmundsson í Snóksdal og konungshollir lúterskir Íslendingar',
    ],
    winner: 'Daði Guðmundsson / lúterska konungsfylkingin',
    casualtyEstimate:
      'Lítið eða óljóst; Jón Arason og synir hans handteknir og teknir af lífi í Skálholti vikum síðar',
    summary:
      'Síðasta vopnaða viðnám Jóns Arasonar brast á Sauðafelli. Daði Guðmundsson bar sigurorð af kaþólska biskupnum og sonum hans og handtók þá — og lagði þar með grunninn að aftöku þeirra í Skálholti fáum vikum síðar.',
    eli12:
      'Þetta er slagurinn rétt fyrir hálshöggið. Jón Arason reyndi að stöðva siðaskiptin með vopnum, tapaði, var handtekinn með sonum sínum og fluttur áleiðis í dauðann.',
    whyItHappened:
      'Danska krúnan þrýsti lúterskum sið í gegn á Íslandi, en Jón Arason varði kaþólskt vald, kirkjueignir og pólitískt sjálfstæði Norðurlands. Deilan var komin langt út fyrir predikunarstólana og í vopn.',
    whyItMatters:
      'Sauðafell er skrefið sem vantar milli trúarspennunnar og aftökunnar sem þegar er á kortinu. Án þessa ósigurs endar Jón Arason ekki varnarlaus í Skálholti.',
    before:
      'Danska krúnan hafði innleitt lúterskan sið og lagt undir sig suðurstólinn; Jón Arason, síðasti kaþólski biskupinn sem eftir stóð, svaraði með vopnaðri andspyrnu.',
    after:
      'Handtekinn ásamt sonum sínum var Jón fluttur suður í Skálholt. Þar fóru engin réttarhöld fram.',
    humanDrama:
      'Biskup á sjötugsaldri reið til orrustu með eigin syni sér við hlið — prestssyni, í kirkju sem opinberlega krafðist einlífis, sem segir sína sögu um Jón Arason. Daði Guðmundsson sigraði og handtók þá alla þrjá. Feðgarnir dóu saman vikum síðar, og Jón mætti tíðindunum að sögn með kveðskap.',
    confidenceNote:
      'Miðlungs áreiðanleiki. Handtakan á Sauðafelli er vel staðfest í siðaskiptaheimildunum; hernaðarlegu smáatriðin úr viðureigninni sjálfri eru rýrari og að hluta endurgerð.',
    sources: [
      {
        title: 'Wikipedia: Jón Arason',
        url: 'https://is.wikipedia.org/wiki/J%C3%B3n_Arason',
      },
      {
        title: 'Wikipedia: Daði Guðmundsson',
        url: 'https://is.wikipedia.org/wiki/Da%C3%B0i_Gu%C3%B0mundsson',
      },
      {
        title: 'Merkið stendur við Sauðafell; mannfallstölum ber ekki saman milli heimilda',
        url: '',
      },
    ],
  },
  'reformation-1550': {
    name: 'Aftaka Jóns Arasonar',
    dateText: '7. nóvember 1550',
    period: 'Dönsk yfirráð / siðaskiptin',
    locationName: 'Skálholt',
    factions: [
      'Danska krúnan og lúterskir siðbótarmenn',
      'Kaþólska andspyrnan (Jón Arason og synir)',
    ],
    winner: 'Danskir lúterskir siðbótarmenn',
    casualtyEstimate:
      'Jón Arason og tveir synir hans teknir af lífi; víðari vopnuð átök kostuðu fleiri',
    summary:
      'Síðasti kaþólski biskup Íslands, Jón Arason, neitaði að beygja sig undir siðaskiptin sem danska krúnan þröngvaði upp á landið. Hann greip til vopna, var handtekinn og hálshöggvinn án dóms og laga ásamt tveimur sonum sínum. Þar með lauk vopnaðri kaþólskri andspyrnu á Íslandi.',
    eli12:
      'Danmörk ákvað að Ísland skyldi skipta úr kaþólskri trú í lúterska. Flestir létu sig hafa það, en einn harðjaxl af biskupi, Jón Arason, sagði nei og barðist á móti í alvöru. Hann var handtekinn og hálshöggvinn án réttarhalda.',
    whyItHappened:
      'Siðbótin gekk yfir Evrópu og Danakonungur skipaði Íslandi að fylgja. Jón Arason Hólabiskup var pólitískt stórveldi sem sá í þessu hvort tveggja: svik við trúna og aðför að íslensku sjálfræði.',
    whyItMatters:
      'Síðasta vopnaða andófi Íslands gegn siðaskiptunum lauk hér. Kirkjueignir voru gerðar upptækar, íslenskt menningarlíf raskaðist og tak dönsku krúnunnar var steypt fast. Jón Arason er enn þjóðhetja í margra augum.',
    before:
      'Vikum fyrr hafði síðasta vígi Jóns Arasonar fallið á Sauðafelli — hann kom til Skálholts sem fangi.',
    after:
      'Með kirkjuna brotna átti danska krúnan Ísland með húð og hári — tak sem hún formfesti öld síðar með eiði í Kópavogi.',
    humanDrama:
      'Engin réttarhöld — föngurunum þótti öruggara að höggva strax en að hætta á dómsmál, því bandamenn Jóns gætu bjargað honum með vorinu. Hann var tekinn af lífi með tveimur sonum sínum á sama höggstokki, gamli biskupinn síðastur. Innan árs höfðu norðlenskir vermenn elt uppi og drepið mennina sem báru ábyrgðina. Ísland tók siðaskiptin — en enginn kallaði það samþykki.',
    modernTranslation:
      'Erlent stórveldi skiptir um stjórnkerfi í landinu og einn aldraður héraðsleiðtogi neitar að beygja sig og safnar einkaher. Handsamaður er hann tekinn af lífi án dóms, því það er of pólitískt áhættusamt að geyma hann. Ríkið vinnur; hann fær píslarvættið og stytturnar.',
    confidenceNote:
      'Aftakan sjálf er graníttraust — dagsetning, staður og fórnarlömb eru fastskjalfest. „Óvisst“-einkunnin hér vísar til smáatriða umgjarðarinnar og nákvæmrar staðsetningar, ekki nokkurs vafa um að þetta gerðist.',
    sources: [
      {
        title: 'Wikipedia: Jón Arason',
        url: 'https://is.wikipedia.org/wiki/J%C3%B3n_Arason',
      },
      {
        title: 'Merkið stendur í Skálholti, þar sem Jón Arason og synir hans voru hálshöggnir',
        url: '',
      },
    ],
  },
  'spanverjavigin-1615': {
    name: 'Spánverjavígin',
    dateText: 'Haust 1615',
    period: 'Dönsk yfirráð',
    locationName: 'Vestfirðir — Ísafjarðardjúp (merki í Æðey; víg einnig á Sandeyri og víðar)',
    factions: [
      'Baskneskir hvalveiðimenn í skipbroti',
      'Íslensk héraðsyfirvöld og vopnaðir heimamenn undir Ara Magnússyni í Ögri',
    ],
    winner: 'Íslensku héraðsyfirvöldin',
    casualtyEstimate: 'Um 31–32 Baskar drepnir',
    summary:
      'Einn myrkasti og undarlegasti atburður Íslandssögunnar. Baskneskir hvalveiðimenn urðu strandaglópar á Vestfjörðum þegar skip þeirra brotnuðu, lífsbaráttan leiddi til árekstra við heimamenn, og íslensk yfirvöld fyrirskipuðu víg um allt Ísafjarðardjúp.',
    eli12:
      'Erlendir hvalveiðimenn strönduðu þegar skipin þeirra brotnuðu. Spennan við heimamenn óx, og í stað þess að leysa málið friðsamlega eltu vopnaðir heimamenn þá uppi og drápu tugi þeirra.',
    whyItHappened:
      'Baskarnir voru langt að heiman, úrræðalausir og að reyna að lifa af eftir skipbrot. Héraðsyfirvöld sáu í þeim hættulega útlendinga og notuðu harða lagaheimild til að réttlæta ofbeldið.',
    whyItMatters:
      'Spánverjavígin eru meðal annars í minnum höfð af því að Jón lærði Guðmundsson fordæmdi þau. Þau eru grimm áminning um að ótti, hungur og embættisvald geta breytt óláni í fjöldamorð.',
    before:
      'Einokunarverslunin danska (frá 1602) hafði gert alla leyfislausa útlendinga tortryggilega — og Vestfirðir voru fullir af erlendum hvalveiðiskipum.',
    after: 'Tólf árum síðar komu erlend skip aftur að Íslandi — í það sinn sem rándýrin.',
    humanDrama:
      'Þetta voru skipbrotsmenn að reyna að lifa veturinn af, dæmdir réttdræpir með héraðssamþykkt — og skipstjóri þeirra, Martín de Villafranca, var að sumra sögn felldur í miðri uppgjöf. Einn Íslendingur, Jón lærði, hætti eigin hálsi til að skrifa að landar hans hefðu myrt saklausa menn. Það var ekki fyrr en 2015 sem samþykktin var formlega felld úr gildi.',
    modernTranslation:
      'Hópur strandaðra erlendra verkamanna lendir upp á kant við heimamenn út af mat og eigum. Í stað sáttamiðlunar gefur sýslan út tilskipun um að þá megi drepa hvar sem til þeirra næst — og vopnaðar sveitir ganga hús úr húsi. Einn uppljóstrari skráir allt og borgar fyrir það ævilangt.',
    confidenceNote:
      'Mikill áreiðanleiki. Skjalfest frá báðum hliðum — íslenskar frásagnir, þar á meðal samtímafordæming Jóns lærða, og baskneskar heimildir um týnda leiðangurinn. Nákvæmar tölur og vettvangar flökta lítillega, en fjöldamorðin sjálf eru hafin yfir vafa.',
    sources: [
      {
        title: 'Wikipedia: Spánverjavígin',
        url: 'https://is.wikipedia.org/wiki/Sp%C3%A1nverjav%C3%ADgin',
      },
      {
        title: 'Wikipedia: Jón lærði Guðmundsson',
        url: 'https://is.wikipedia.org/wiki/J%C3%B3n_l%C3%A6r%C3%B0i_Gu%C3%B0mundsson',
      },
      {
        title: 'Merkið er táknrænt — vígin urðu á mörgum stöðum við Djúp',
        url: '',
      },
    ],
  },
  'tyrkjaranid-austfirdir-1627': {
    name: 'Tyrkjaránið á Austfjörðum',
    dateText: '5.–13. júlí 1627',
    period: 'Dönsk yfirráð',
    locationName: 'Berufjörður og Breiðdalur (táknrænt merki við Djúpavog)',
    factions: [
      'Sjóræningjar frá Barbaríinu í strandhöggi á Austfjörðum',
      'Íslenskar strandbyggðir í Berufirði og Breiðdal',
    ],
    keyPeople: ['Sjóræningjar frá Barbaríinu', 'Strandbyggðir Austurlands'],
    winner: 'Sjóræningjarnir',
    casualtyEstimate: 'Um 110 manns numin á brott af Austfjörðum; mannfall heima fyrir á reiki',
    summary:
      'Á undan frægara ráninu í Vestmannaeyjum réðust ræningjarnir á Austfirði. Þeir fóru ránshendi um Berufjörð og Breiðdal og námu á brott um 110 manns úr smáum strandbyggðum.',
    eli12:
      'Sjóræningjarnir réðust ekki bara á Vestmannaeyjar. Þeir komu fyrst til Austfjarða, hrifsuðu fólk af bæjum og úr þorpum við firðina og sigldu burt með það.',
    whyItHappened:
      'Ræningjarnir herjuðu á strendur Evrópu eftir fólki til að selja í þrældóm. Austurland var afskekkt, nær óvarið og berskjaldað fyrir skipum á siglingu með ströndinni.',
    whyItMatters:
      'Hér fá Austfirðir sitt eigið merki í stað þess að hverfa inn í almenna Tyrkjaránsatburðinn. Áfallið var þjóðarinnar allrar, en fyrsta höggið lenti þungt á austfirskum byggðum.',
    before:
      'Ísland átti engan flota, engin virki og danskan verndara upptekinn annars staðar — ræningjarnir vissu það.',
    after: 'Dögum síðar réðst sami floti á Vestmannaeyjar, þar sem ránið varð að þjóðarharmleik.',
    humanDrama:
      'Heilu heimilin hurfu af fjarðabæjunum á einni viku — foreldrar teknir, börn tekin, nágrannar að velja milli þess að fela sig til fjalla eða horfa á. Fyrir austfirðina var „Tyrkjaránið“ ekki þjóðarsaga; það var tiltekin horfin fjölskylda á næsta bæ.',
    confidenceNote:
      'Mikill áreiðanleiki. Austfjarðaránin eru skjalfest í samtímafrásögnum og kirkjubókum; talan ~110 numin á brott er viðtekin fræðileg áætlun.',
    sources: [
      {
        title: 'Wikipedia: Tyrkjaránið',
        url: 'https://is.wikipedia.org/wiki/Tyrkjar%C3%A1ni%C3%B0',
      },
      {
        title: 'Wikipedia: Turkish Abductions (á ensku)',
        url: 'https://en.wikipedia.org/wiki/Turkish_Abductions',
      },
      {
        title: 'Táknrænt merki við Djúpavog — ránin snertu marga staði á Austfjörðum',
        url: '',
      },
    ],
  },
  'tyrkjaranid-1627': {
    name: 'Tyrkjaránið',
    dateText: 'Júlí–ágúst 1627',
    period: 'Dönsk yfirráð',
    locationName: 'Vestmannaeyjar og austurströndin',
    factions: [
      'Sjóræningjar frá Barbaríinu (alsírskir ræningjar undir stjórn Murat Reis)',
      'Íslenskar strandbyggðir',
    ],
    winner: 'Sjóræningjarnir',
    casualtyEstimate: 'Um 400 numin á brott, yfir 50 drepnir. Aðeins um 37 komu nokkurn tíma heim.',
    summary:
      'Sumarið 1627 réðust sjóræningjar frá Norður-Afríku á Ísland á mörgum stöðum. Þeir drápu tugi manna og námu á brott um 400 til að selja í ánauð. Þetta er einn mesti áfallaatburður Íslandssögunnar — kallaður „Tyrkjaránið“ þótt ræningjarnir væru flestir alsírskir og hollenskir.',
    eli12:
      'Sjóræningjar frá Norður-Afríku — versta sortin — sigldu alla leið til Íslands og hrifsuðu um 400 manns til að selja sem þræla. Þeir brenndu hús og drápu þá sem veittu mótspyrnu. Flestir sem voru teknir komu aldrei heim.',
    whyItHappened:
      'Ræningjarnir herjuðu reglulega á evrópskar strendur eftir fólki fyrir þrælamarkaði Norður-Afríku. Afskekkt lega Íslands og nær algjört varnarleysi gerðu landið að auðveldu skotmarki. Ránin voru samhæfð og fagmannlega framkvæmd.',
    whyItMatters:
      'Tyrkjaránið skildi eftir djúpt ör í íslensku þjóðarminni. Það afhjúpaði hve óvarið Ísland var undir danskri stjórn, og vanræksla konungs við að verja þegna sína ól á langvarandi gremju. Frásagnir þeirra sem sneru heim eru enn lesnar.',
    before: 'Ræningjarnir höfðu þegar sópað Austfirðina vikuna á undan — Vestmannaeyjar áttu aldrei möguleika.',
    after:
      'Vanræksla Danmerkur við að verja — eða leysa út — þegna sína kraumaði kynslóðum saman, um leið og takið á Íslandi harðnaði.',
    humanDrama:
      'Af um 400 numdum á brott komu aðeins um 37 heim. Ein þeirra var Guðríður Símonardóttir, leyst út eftir nær áratug í ánauð í Alsír — og á heimleiðinni felldi hún hug til kennarans sem átti að rifja upp með henni kristindóminn, ungs skálds að nafni Hallgrímur Pétursson. Hann varð mesta sálmaskáld Íslands; stærsta kirkja Reykjavíkur ber nafn hans. Ástsælasti helgikveðskapur þjóðarinnar er til vegna sjóræningjaráns.',
    modernTranslation:
      'Atvinnuræningjar ráðast á varnarlaust land, ræna 400 borgurum og bjóða þá svo opinskátt til lausnargjalds áratugum saman. Nýlenduveldið sem átti að sjá um varnirnar gerir nánast ekkert — lausnargjaldið endar sem almenn samskot. Enginn gleymdi hvaða stjórnvald lét sig vanta.',
    confidenceNote:
      'Mikill áreiðanleiki. Meðal best skjalfestu atburða árnýaldar á Íslandi: bréf hinna herteknu, lausnarskrár og ítarlegar samtímafrásagnir margra fanga eru varðveittar og enn í prentun.',
    sources: [
      {
        title: 'Wikipedia: Tyrkjaránið',
        url: 'https://is.wikipedia.org/wiki/Tyrkjar%C3%A1ni%C3%B0',
      },
      {
        title: 'Wikipedia: Murat Reis yngri (á ensku)',
        url: 'https://en.wikipedia.org/wiki/Murat_Reis_the_Younger',
      },
    ],
  },
  'kopavogur-1662': {
    name: 'Kópavogsfundurinn',
    dateText: '28. júlí 1662',
    period: 'Dönsk yfirráð / einveldið',
    locationName: 'Kópavogsþingstaður (Þinghóll), Kópavogi (staðsetning áætluð)',
    factions: [
      'Danska krúnan (Friðrik III.) gegnum Henrik Bjelke höfuðsmann',
      'Íslenskir embættismenn, klerkar og lögmenn',
    ],
    winner: 'Danska krúnan',
    casualtyEstimate: 'Ekkert — pólitísk undirgefni knúin fram, ekki orrusta',
    summary:
      'Forystumenn Íslendinga komu saman í Kópavogi og sóru Friðriki III. erfðahyllingu sem einvaldskonungi. Fræg síðari tíma sögn segir að Bjelke hafi haft hermenn til taks og að hinn aldni lögmaður Árni Oddsson hafi undirritað grátandi — þótt samtímaheimildir staðfesti hótunina reyndar ekki.',
    eli12:
      'Danakonungur vildi algjört, arfgengt vald yfir Íslandi. Íslenskir forystumenn voru boðaðir í Kópavog og látnir skrifa undir. Sagan segir að hermenn hafi staðið hjá og gamall dómari grátið við undirskriftina — en við getum ekki verið viss um að sá hluti sé sannur.',
    whyItHappened:
      'Eftir dýrkeypt stríð gerði Friðrik III. Danmörku að einveldi og lét lönd sín handan hafsins, Ísland meðtalið, sverja sér formlega. Bréf árið 1662 buðu íslenskum fulltrúum að mæta og vinna nýja eiðinn.',
    whyItMatters:
      'Fundurinn læsti Ísland inni í dönsku einveldi í nær tvær aldir og varð máttugt tákn í sjálfstæðisbaráttunni síðar — stundin þegar Íslendingar áttu að hafa skrifað frelsið frá sér undir hótunum.',
    before:
      'Siðaskiptin höfðu þegar fært dönsku krúnunni auð og vald kirkjunnar; einveldið var lokafrágangurinn.',
    after: 'Það sem fylgdi var harðasta öld Íslandssögunnar: einokunarverslun, bólusótt og hungur.',
    humanDrama:
      'Myndin sem festist: hinn aldni Árni Oddsson lögmaður — sem hafði varið ferlinum í að verja íslensk lög — undirritar afsal síðustu réttinda lands síns í tárum, með danska hermenn til taks. Hvort tárin og hermennirnir eru staðreynd eða síðari tíma helgisögn: Íslendingar endursögðu atriðið í tvær aldir. Stundum skiptir sagan sem þjóð segir um skjal meira máli en skjalið sjálft.',
    modernTranslation:
      'Höfuðstöðvarnar boða alla svæðisstjóra á skyldufund til að „árétta hollustu“ við nýjan samning sem afnemur öll réttindi þeirra. Mæting er ekki valkvæð, öryggisgæslan er sýnileg og allir skrifa undir. Opinberlega var þetta sjálfviljugt.',
    confidenceNote:
      'Mikill áreiðanleiki um atburðinn — eiðurinn, dagsetningin og undirritendur eru fastskjalfest. Dramatísku atriðin (hermenn til taks, tár Árna) koma úr síðari hefð og eru ekki staðfest í samtímaheimildum.',
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
  'storabola-1707': {
    name: 'Stórabóla',
    dateText: '1707–1709',
    period: 'Dönsk yfirráð / plágur og hallæri',
    locationName: 'Barst á land á Eyrarbakka 2. júní 1707 — síðan um land allt',
    factions: ['Íslendingar gegn bólusóttarfaraldrinum mikla (Stórubólu)'],
    winner: 'Enginn — um fjórðungur til þriðjungur allra Íslendinga lést',
    casualtyEstimate:
      'Áætluð 12.000–18.000 látin — um fjórðungur til þriðjungur af ~50.000 manna þjóð',
    summary:
      'Smitið kom á land í verslunarstaðnum Eyrarbakka 2. júní 1707. Að hefð barst það í fatakistu Gísla Bjarnasonar, sem hafði dáið úr bólu í Kaupmannahöfn; systir hans opnaði kistuna, veiktist, og sóttin breiddist um land án nokkurs ónæmis — og felldi á tveimur árum kannski fjórðung til þriðjung allra Íslendinga.',
    eli12:
      'Veikin kom í land á Eyrarbakka 1707, að sögn falin í fatakistu látins manns sem send var heim frá Kaupmannahöfn. Íslendingar höfðu aldrei kynnst bólusótt og áttu enga vörn, og um það bil einn af hverjum þremur til fjórum dó á tveimur árum.',
    whyItHappened:
      'Ísland var einangrað, svo fólk kynntist bólusótt sjaldan og byggði upp ekkert ónæmi. Þegar sýktu fötin komu á land 1707 breiddist veiran óheft um þjóð án viðnáms og án eiginlegra lækninga.',
    whyItMatters:
      'Þetta er ekki orrusta, en það mótaði landið meira en nokkurt stríð hefði getað — vinnuaflið hrundi, jarðir tæmdust, og fátæktin og ósjálfstæðið sem einkenndu 18. öldina undir dönskum yfirráðum dýpkuðu.',
    before:
      'Ísland gekk inn í 18. öldina þegar fátækt og einangrað undir dönsku einokunarversluninni — með ekkert ónæmi fyrir því sem var á leiðinni.',
    after: 'Eftirlifendur byggðu upp í tvær kynslóðir — og þá snerist jörðin sjálf gegn þeim.',
    humanDrama:
      'Að hefð kom heimsendirinn í kassa: fatakista manns sem dó úr bólu í Kaupmannahöfn, send heim til fjölskyldunnar. Systir hans opnaði hana, veiktist, og innan tveggja ára var fjórðungur til þriðjungur allra á Íslandi látinn. Sorgin drap landið — í bókstaflegasta skilningi sem hugsast getur.',
    modernTranslation:
      'Þjóð með ekkert ónæmi mætir veiru sem umheimurinn var þegar búinn að ganga í gegnum. Engin bóluefni, ekkert sóttvarnakerfi, engin lyf — ímyndaðu þér heimsfaraldur þar sem einn af hverjum þremur til fjórum sem þú þekkir deyr innan tveggja ára, rakinn til einnar sendingar að utan.',
    confidenceNote:
      'Mikill áreiðanleiki um faraldurinn — koman, útbreiðslan og hörmulegt mannfallið eru vel skjalfest. Kistusagan um upprunann er hefð: trúleg, ósannanleg og of góð til að annálarnir slepptu henni.',
    sources: [
      {
        title: 'Wikipedia: Stórabóla',
        url: 'https://is.wikipedia.org/wiki/St%C3%B3rab%C3%B3la',
      },
      {
        title: 'Wikipedia: 1707–08 Iceland smallpox epidemic (á ensku)',
        url: 'https://en.wikipedia.org/wiki/1707%E2%80%9308_Iceland_smallpox_epidemic',
      },
      {
        title: 'Merkið stendur á Eyrarbakka, skjalfestum komustað sóttarinnar',
        url: '',
      },
    ],
  },
  'drekkingarhylur-storidomur': {
    name: 'Drekkingarhylur og Stóridómur',
    dateText: '1618–1749 (síðasta drekkingin 1749)',
    period: 'Dönsk yfirráð / Stóridómur',
    locationName: 'Drekkingarhylur í Öxará á Þingvöllum',
    factions: [
      'Siðferðislöggjöfin Stóridómur og dómsvald kirkju og krúnu',
      'Konur og karlar dæmd fyrir „siðferðisbrot“',
    ],
    casualtyEstimate:
      'Að minnsta kosti 18 konum drekkt hér milli 1618 og 1749; karlar voru hálshöggnir fyrir sömu brot',
    summary:
      'Samkvæmt hinni hörðu siðferðislöggjöf Stóradómi gátu Íslendingar sem fundnir voru sekir um hórdóm, sifjaspell eða barneignir utan hjónabands verið teknir af lífi. Konum var drekkt: þær voru settar í poka og þeim haldið undir vatni í þessum hyl í Öxará; karlar voru hálshöggnir. Síðustu konunni var drekkt hér 1749.',
    eli12:
      'Lengi vel hafði Ísland grimmilega ströng lög um kynlíf og fjölskyldu. Fólk sem braut þau gat verið tekið af lífi — konum var drekkt í þessum hyl á Þingvöllum og karlar hálshöggnir. Síðasta drekkingin var 1749.',
    whyItHappened:
      'Eftir siðaskiptin héldu kirkja og krúna siðferðinu uppi með Stóradómi frá 1564. Kynlíf utan hjónabands og einkum sifjaspell voru meðhöndluð sem dauðasakir, og Þingvellir — gamli þingstaðurinn — urðu aftökustaðurinn.',
    whyItMatters:
      'Þetta er hljóðláta, kerfisbundna blóðtaka 18. aldar: ekki stríð heldur ríkið sjálft að taka eigin þegna af lífi fyrir einkalíf þeirra. Drekkingarhylur er í dag einn af döprustu stöðum Þingvalla.',
    before:
      'Siðaskiptin skiptu kaþólskri yfirbót út fyrir lúterskan ríkisaga — Stóridómur frá 1564 gerði einkasyndir að dauðasökum.',
    after:
      'Síðasta drekkingin var 1749; löggjöf upplýsingaraldar lagði aftökurnar smám saman af, og hylurinn varð minningarstaður.',
    humanDrama:
      'Hér er engin orrusta — bara ríkið, kerfisbundið, í 130 ár. Konur settar í poka og þeim haldið undir á helgasta stað þjóðarinnar, flestar dæmdar fyrir barneignir utan hjónabands, sumar fórnarlömb mannanna sem deildu með þeim dómnum. Hylurinn er í göngufæri frá staðnum þar sem Ísland tók kristni með friðsamlegri málamiðlun. Hvort tveggja er satt um sama staðinn.',
    modernTranslation:
      'Ímyndaðu þér ríkisvald sem tekur fólk af lífi fyrir einkalíf sitt — opinberlega, á þjóðarhelgistaðnum, með fullum þunga dómstóla og kirkju. Ekki múgæsing, ekki hneyksli: stefna, endurnýjuð árlega í meira en öld.',
    confidenceNote:
      'Mikill áreiðanleiki. Stóridómur og aftökurnar eru mál dómsskjala, með nöfnum og ártölum; talan um að minnsta kosti 18 konur drekktar í hylnum byggir á skráðum málum.',
    sources: [
      {
        title: 'Wikipedia: Stóridómur',
        url: 'https://is.wikipedia.org/wiki/St%C3%B3rid%C3%B3mur',
      },
      {
        title: 'Wikipedia: Drekkingarhylur',
        url: 'https://is.wikipedia.org/wiki/Drekkingarhylur',
      },
    ],
  },
  'skuli-innrettingar-monopoly': {
    name: 'Skúli fógeti gegn einokunarversluninni',
    dateText: 'Um 1750 (Innréttingarnar stofnaðar 1752)',
    period: 'Dönsk yfirráð / einokunarverslunin',
    locationName: 'Reykjavík (Aðalstræti — verksmiðjur Innréttinganna)',
    factions: [
      'Skúli Magnússon og Innréttingarnar',
      'Danska einokunarverslunin og kaupmenn hennar',
    ],
    keyPeople: ['Skúli Magnússon', 'Friðrik V. konungur'],
    winner: 'Jafntefli um hans daga — einokunin stóð til 1787, en Reykjavík fæddist',
    casualtyEstimate: 'Ekkert blóð — efnahags- og lagastríð, háð í réttarsölum og bókhaldi',
    summary:
      'Skúli Magnússon, fyrsti íslenski landfógetinn, sagði spilltri dönsku einokunarversluninni stríð á hendur — stefndi kaupmönnum fyrir að selja maðkað mjöl og ónýtt járn yfir lögverði. Til að brjóta tak þeirra stofnaði hann Innréttingarnar, ullar- og útgerðarfyrirtæki í Reykjavík, sem óx í bæinn sjálfan.',
    eli12:
      'Danmörk neyddi Íslendinga til að versla aðeins við tiltekna kaupmenn, sem svindluðu á þeim með skemmdum mat og okurverði. Skúli Magnússon barðist á móti — hann dró kaupmennina fyrir dóm og stofnaði fyrsta stóra fyrirtæki Íslands. Það fyrirtæki er ástæðan fyrir því að Reykjavík varð að bæ.',
    whyItHappened:
      'Danska einokunin (frá 1602) skildi Íslendinga eftir upp á náð örfárra leyfishafa. Skúli, sem hafði séð svindlið innan frá sem ungur skrifari, notaði embætti sitt til að skora það á hólm og byggja innlendan valkost.',
    whyItMatters:
      'Átök háð með málsóknum og vefstólum í stað sverða — og þau stofnuðu Reykjavík. Skúli fógeti varð þjóðhetja: maðurinn sem hóf langa klifur Íslands upp úr einokunarfjötrunum.',
    before:
      'Öld af einveldi og einokunarverslun hafði mulið Ísland niður; Stórabóla ein hafði fellt fjórðung þjóðarinnar.',
    after:
      'Einokunin féll 1787, og verkstæði Skúla uxu í Reykjavík — leiksvið hvers íslensks drama síðan.',
    humanDrama:
      'Skúli hafði unnið hjá einokunarkaupmönnunum sem ungur skrifari — hann vigtaði sekkina og hélt bækurnar, svo hann vissi upp á hár hvernig svindlið virkaði. Svo varði hann áratugum í að beita þeirri innherjaþekkingu gegn þeim, með málsóknum um maðkað mjöl og falsaðar vogir. Kaupmennirnir áttu peningana; Skúli átti kvittanirnar.',
    modernTranslation:
      'Fyrrverandi starfsmaður okurfyrirtækis með einkaleyfi verður eftirlitsmaður, lögsækir gamla vinnuveitandann með innherjagögnum og stofnar sprotafyrirtæki sem keppir við hann. Athafnasvæði sprotans verður að höfuðborg landsins.',
    confidenceNote:
      'Mikill áreiðanleiki. Málsóknir Skúla, stofnun Innréttinganna 1752 og hlutur þeirra í vexti Reykjavíkur eru fastskjalfest í stjórnsýslugögnum.',
    sources: [
      {
        title: 'Wikipedia: Skúli Magnússon',
        url: 'https://is.wikipedia.org/wiki/Sk%C3%BAli_Magn%C3%BAsson',
      },
      {
        title: 'Wikipedia: Innréttingarnar',
        url: 'https://is.wikipedia.org/wiki/Innr%C3%A9ttingarnar',
      },
    ],
  },
  'modunhardindin-laki-1783': {
    name: 'Skaftáreldar og Móðuharðindin',
    dateText: '1783–1785',
    period: 'Dönsk yfirráð / plágur og hallæri',
    locationName: 'Lakagígar á Síðumannaafrétti',
    factions: ['Byggðir og búpeningur Íslands gegn Skaftáreldum og hungursneyðinni sem fylgdi'],
    keyPeople: ['Jón Steingrímsson'],
    winner: 'Enginn — um fimmtungur allra Íslendinga lést',
    casualtyEstimate:
      'Um 9.000–10.000 látin (~20% þjóðarinnar); meirihluti búfjár drapst úr flúoreitrun',
    summary:
      'Í júní 1783 rifnaði Lakagígaröðin upp og gaus í átta mánuði, og eitruð móða lagðist yfir landið. Flúor og brennisteinn drápu mestallan búpening, og hungursneyðin sem fylgdi — Móðuharðindin — felldi um fimmtung þjóðarinnar. Á Kirkjubæjarklaustri flutti séra Jón Steingrímsson hina frægu eldmessu meðan hraunið nálgaðist.',
    eli12:
      'Löng sprunga í jörðinni gaus mánuðum saman og eitraði loftið, grasið og skepnurnar. Svo margar kindur, kýr og hestar drápust að fólk svalt, og um einn af hverjum fimm Íslendingum dó. Hugrakkur prestur hélt messu meðan hraunið nálgaðist — og það stöðvaðist rétt hjá kirkjunni hans.',
    whyItHappened:
      'Lakagígar losuðu gríðarlegt magn af flúori og brennisteinsdíoxíði. Flúorinn eitraði grasið og skepnurnar sem átu það, og í landbúnaðarlandi án varasjóða þýddi búfjármissirinn fjöldahungur næstu tvo vetur.',
    whyItMatters:
      'Skilgreinandi hamfarir 18. aldar á Íslandi — svo altækar að í Kaupmannahöfn var um hríð rætt um að flytja alla þjóðina burt. Móðan kældi og svelti líka stóran hluta Evrópu, svo hamfarirnar náðu um heim allan.',
    before:
      'Ísland var enn að rétta úr kútnum eftir Stórubólu tveimur kynslóðum fyrr þegar Lakagígar opnuðust.',
    after:
      'Eymdin herti röksemdina um að dönsk yfirráð væru að bregðast Íslandi — röksemd sem sjálfstæðisbaráttan hamraði á næstu öld.',
    humanDrama:
      'Þegar hraunið nálgaðist Kirkjubæjarklaustur safnaði séra Jón Steingrímsson skelfdum sóknarbörnum sínum í kirkjuna og predikaði meðan jörðin brann í áttina að þeim — eldmessan fræga. Hraunið stöðvaðist skammt frá kirkjunni. Jón varði svo hungurárunum í að jarða sóknarbörn sín, þar á meðal konu sína, og skrifa allt niður með nákvæmni vísindamanns og sorg eftirlifandans.',
    modernTranslation:
      'Einn jarðfræðilegur atburður eitrar matvælakerfi heils lands í tvö ár — fimmtungur þjóðarinnar deyr og stjórnvöld erlendis ræða í alvöru að rýma landið allt. Öskumóðan skemmir svo uppskeru um heila heimsálfu. Sumir sagnfræðingar rekja hluta af hungrinu á undan frönsku byltingunni til þessarar einu íslensku sprungu.',
    confidenceNote:
      'Mikill áreiðanleiki. Skjalfest af sjónarvotti í sérflokki — eigin frásögn Jóns Steingrímssonar — auk danskra stjórnsýslugagna og nútímaeldfjallafræði sem staðfestir umfang gossins og heimsáhrif þess.',
    sources: [
      {
        title: 'Wikipedia: Skaftáreldar',
        url: 'https://is.wikipedia.org/wiki/Skaft%C3%A1reldar',
      },
      {
        title: 'Wikipedia: Móðuharðindin',
        url: 'https://is.wikipedia.org/wiki/M%C3%B3%C3%B0uhar%C3%B0indin',
      },
    ],
  },
  'jorgensen-1809': {
    name: 'Jörundur hundadagakonungur',
    dateText: 'Júní–ágúst 1809',
    period: 'Dönsk yfirráð / Napóleonsstríðin',
    locationName: 'Reykjavík (táknrænt merki)',
    factions: [
      'Jörgen Jörgensen og breskir kaupsýslubandamenn',
      'Dönsk stjórnsýsla á Íslandi',
    ],
    keyPeople: ['Jörgen Jörgensen (Jörundur)', 'Frederik Trampe greifi', 'Samuel Phelps'],
    winner: 'Jörundur um stund; svo var danskt vald endurreist',
    casualtyEstimate: 'Ekkert eiginlegt mannfall; valdarán fremur en stríð',
    summary:
      'Í fáeinar sturlaðar vikur sumarið 1809 handtók danski ævintýramaðurinn Jörgen Jörgensen stiftamtmanninn og lýsti Ísland sjálfstætt undir eigin vernd. Djarft, fáránlegt og mjög tímabundið.',
    eli12:
      'Danskur ævintýramaður mætti með breskt bakland, handtók landstjórann og sagði í raun: „Ísland er frjálst núna, og ég ræð.“ Svo lokaði Bretland sjálft á allt saman.',
    whyItHappened:
      'Napóleonsstríðin röskuðu Danmörku, Bretlandi, versluninni og allri Norður-Atlantshafspólitík. Ísland var einangrað og berskjaldað, og Jörgensen notaði glundroðann til valdaráns.',
    whyItMatters:
      'Ekki hefðbundin orrusta, en eitt undarlegasta pólitíska uppgjör Íslandssögunnar. Það sýnir hvernig heimsstyrjöld gat skyndilega náð til Reykjavíkur og hrist danskt vald — þó ekki væri nema í nokkrar vikur.',
    before:
      'Napóleonsstríðin höfðu skorið Danmörku frá nýlendunum í Norður-Atlantshafi — Reykjavík, varla orðin bær, var ein á báti.',
    after:
      'Danskt vald var endurreist á vikum, en atvikið sýndi hve þunnt það var orðið. Næsta erlenda valdataka í Reykjavík, 1940, tolldi.',
    humanDrama:
      'Jörgensen var danskur fyrrum kaparaskipstjóri á breskri kaupskútu sem handtók danska stiftamtmanninn á sunnudegi og lýsti sig „verndara alls Íslands“ — lofaði sjálfstæði, fána og þingi. Íslendingar ypptu flestir öxlum og biðu. Tveimur mánuðum síðar batt breskur flotaforingi enda á ævintýrið, og líf Jörundar hélt sínu striki: fangaprammar, njósnir, spilaskuldir og að lokum fanganýlendan Tasmanía. Íslendingar kalla valdatíð hans enn „hundadagana“ — eftir árstíðinni, og kannski stemningunni.',
    modernTranslation:
      'Sjarmerandi erlendur lukkuriddari með fyrirtækjabakland gengur inn í valdatóm, handtekur stjórnsýsluna og lýsir yfir nýju landi með sjálfan sig „tímabundið“ við stjórnvölinn. Stórveldin taka tvo mánuði að taka eftir þessu — og eyða svo öllu saman.',
    confidenceNote:
      'Mikill áreiðanleiki. Rækilega skjalfest í breskum, dönskum og íslenskum gögnum — Jörgensen var of litríkur til að fara fram hjá nokkrum, og skrifaði þar að auki manna mest um sjálfan sig.',
    sources: [
      {
        title: 'Wikipedia: Jörundur hundadagakonungur',
        url: 'https://is.wikipedia.org/wiki/J%C3%B6rundur_hundadagakonungur',
      },
      {
        title: 'Wikipedia: Jørgen Jørgensen (á ensku)',
        url: 'https://en.wikipedia.org/wiki/J%C3%B8rgen_J%C3%B8rgensen',
      },
    ],
  },
  'thristapar-1830': {
    name: 'Síðasta aftakan á Íslandi',
    dateText: '12. janúar 1830',
    period: 'Dönsk yfirráð / endalok dauðarefsinga',
    locationName: 'Þrístapar í Vatnsdalshólum, Húnavatnssýslu (við þjóðveg 1)',
    factions: [
      'Dansk-íslenska dómsvaldið, með bændur héraðsins skikkaða til að horfa á',
      'Agnes Magnúsdóttir og Friðrik Sigurðsson, dæmd fyrir Illugastaðamorðin',
    ],
    keyPeople: [
      'Agnes Magnúsdóttir',
      'Friðrik Sigurðsson',
      'Natan Ketilsson',
      'Guðmundur Ketilsson (böðull, bróðir Natans)',
      'Sigríður Guðmundsdóttir',
    ],
    casualtyEstimate:
      'Agnes og Friðrik hálshöggvin; tvö myrt á Illugastöðum 1828 (Natan Ketilsson og Pétur Jónsson)',
    summary:
      'Janúarmorgun 1830 voru Agnes Magnúsdóttir og Friðrik Sigurðsson hálshöggvin á Þrístöpum, þremur hólum við veginn gegnum Vatnsdalshóla — síðasta aftaka sem framkvæmd hefur verið á Íslandi. Þau höfðu verið dæmd fyrir morðin á Natani Ketilssyni og Pétri Jónssyni á Illugastöðum á Vatnsnesi 1828: stungnir sofandi og bærinn brenndur ofan af þeim. Bændum héraðsins var skipað að mæta sem vitni, og höfuðin voru sett á stangir við veginn.',
    eli12:
      'Tvö myrtu bónda og gest hans og kveiktu svo í bænum til að fela verkið. Tveimur árum síðar voru þau hálshöggvin fyrir framan fólk sem var skikkað til að mæta og horfa á — og enginn hefur verið tekinn af lífi á Íslandi síðan. Konan, Agnes, varð svo fræg að enn eru skrifaðar bækur og gerðar bíómyndir um hana.',
    whyItHappened:
      'Natan Ketilsson — grasalæknir, skáld og að flestra sögn harðstjóri innan eigin veggja — var veginn af vinnumanni sínum og vinnukonu eftir mánuði af harðræði og flóknum ástarmálum. Morðin skelfdu héraðið og yfirvöld vildu láta sem harðast víti til varnaðar.',
    whyItMatters:
      'Ríkið tók aldrei aftur mann af lífi á Íslandi: dauðarefsingin féll úr notkun og var formlega afnumin 1928. Agnes sjálf varð margendursagðasta kona Íslandssögunnar — skáldsögur, kvikmyndir og spurningin sem aldrei sleppir: var hún forsprakkinn, vitorðsmaður eða fórnarlamb?',
    before:
      'Aftökum Stóradómsaldar hafði fækkað gegnum 18. öldina — drekkingunum lauk á Þingvöllum 1749 — en öxin stóð áfram í lögum.',
    after:
      'Dauðarefsingunni var aldrei beitt aftur og hún var formlega afnumin 1928; árið 1934 voru jarðneskar leifar þeirra tveggja fluttar í vígða mold að Tjörn á Vatnsnesi.',
    humanDrama:
      'Öxinni sveiflaði Guðmundur Ketilsson — bróðir hins myrta, skipaður til verksins af yfirvöldum. Agnes sat síðasta veturinn í varðhaldi á venjulegum sveitabæ, því landið átti ekkert fangelsi; heimilisfólkið á að hafa grátið þegar hún var sótt. Hvort hún var arkitekt ráðabruggsins eða misnotuð vinnukona Natans fer eftir því hvaða öld segir söguna.',
    modernTranslation:
      'Tvöfalt morð verður glæpur aldarinnar; ríkið sviðsetur aftökuna sem opinbert leikhús og skikkar nágrannana á sýninguna. Tvö hundruð árum síðar hafa skáld og kvikmyndagerðarfólk endurupptekið málið svo oft að hin dæmda er orðin samúðarfyllri persóna en fórnarlambið.',
    confidenceNote:
      'Mikill áreiðanleiki. Dómskjöl, kirkjubækur og samtímafrásagnir skjalfesta morðin, réttarhöldin og aftökuna í smáatriðum — dagsetning, staður og þátttakendur eru vís. Það sem enn er deilt um er túlkunin: hlutur Agnesar og hvatir hennar, ekki staðreyndirnar.',
    sources: [
      {
        title: 'Wikipedia: Agnes Magnúsdóttir',
        url: 'https://is.wikipedia.org/wiki/Agnes_Magn%C3%BAsd%C3%B3ttir',
      },
      {
        title: 'Upplifðu Norðurland: Þrístapar — vettvangur síðustu aftökunnar',
        url: 'https://www.northiceland.is/is/stadur/thristapar',
      },
      {
        title: 'Húnabyggð: Þrístapar',
        url: 'https://www.hunabyggd.is/is/mannlif/ahugaverdir-stadir/thristapar',
      },
    ],
  },
  'dyrafjordur-royalist-1899': {
    name: 'Hannes Hafstein og togarinn Royalist',
    dateText: '10. október 1899',
    period: 'Dönsk yfirráð / togaradeilur',
    locationName: 'Dýrafjörður (á firðinum út af Haukadal)',
    factions: [
      'Hannes Hafstein, sýslumaður Ísfirðinga, og bátsverjar hans',
      'Áhöfn breska togarans Royalist',
    ],
    keyPeople: ['Hannes Hafstein', 'Áhöfn togarans Royalist'],
    winner: 'Togarinn slapp; þrír af mönnum sýslumanns drukknuðu',
    casualtyEstimate:
      'Þrír Íslendingar drukknuðu (Jóhannes, Jón Þórðarson og Guðmundur Jónsson); Royalist komst undan',
    summary:
      'Hannes Hafstein sýslumaður reri út til að taka breska togarann Royalist fyrir ólöglegar veiðar inni á Dýrafirði. Togarinn streittist á móti og keyrði burt, opni báturinn fylltist í kjölsoginu og þrír menn hans drukknuðu. Sjálfur komst Hannes naumlega af.',
    eli12:
      'Sýslumaður reyndi að stöðva breskt togskip sem var að stela fiski of nálægt landi. Skipið neitaði að stoppa, litli báturinn fór á hvolf og þrír menn drukknuðu. Sýslumaðurinn slapp naumlega sjálfur.',
    whyItHappened:
      'Breskir gufutogarar skófu firðina hraðar en Íslendingar gátu fiskað, oft innan landhelginnar. Danmörk gætti Íslands aðeins með varðskipi á sumrin, svo þegar það fór höfðu embættismenn eins og Hannes nánast engin úrræði.',
    whyItMatters:
      'Slysið varð þjóðartákn um varnarleysi Íslands í eigin landhelgi. Það ýtti á heilsársgæslu við ströndina og er snemmbær kafli í löngu baráttunni um fiskveiðilögsöguna sem síðar varð að þorskastríðunum.',
    before:
      'Breskir gufutogarar höfðu skafið íslenska firði frá því um 1890, og eina danska varðskipið gat ekki verið alls staðar.',
    after:
      'Ísland fékk strandgæsluna sína — og varði næstu 77 árum í að færa út lögsöguna þar til baráttunni lauk með fullnaðarsigri.',
    humanDrama:
      'Sýslumaður á árabáti að reyna að stöðva gufuknúið verksmiðjuskip — allt valdaójafnvægi nýlendutímans í einni mynd. Togarinn dró bátinn niður og þrír drukknuðu; Hannes Hafstein synti naumlega í land. Fimm árum síðar varð þessi hálfdrukknaði sýslumaður fyrsti ráðherra Íslands. Þjóðin mundi hver hafði í alvöru farið út á sjóinn.',
    modernTranslation:
      'Lögregluþjónn á árabát reynir að stöðva verksmiðjuskip fyrir veiðiþjófnað. Skipið... heldur bara áfram, og fólk deyr í kjölfarinu. Enginn er dreginn til ábyrgðar, því land veiðiþjófanna er stórt og þitt er lítið — svo atvikið verður þjóðarröksemdin fyrir því að eignast landhelgisgæslu.',
    confidenceNote:
      'Mikill áreiðanleiki. Vel skjalfestur nútímaviðburður: samtímafréttir, opinber gögn og nöfn hinna drukknuðu öll á skrá.',
    sources: [
      {
        title: 'Wikipedia: Hannes Hafstein',
        url: 'https://is.wikipedia.org/wiki/Hannes_Hafstein',
      },
      {
        title: 'Stjórnarráðið: Fyrsti ráðherrann (Hannes Hafstein)',
        url: 'https://www.stjornarradid.is/rikisstjorn/sogulegt-efni/heimastjorn-1904-1918/fyrsti-radherrann/',
      },
      {
        title: 'Merkið er á firðinum út af Haukadal, þaðan sem báti Hannesar var róið',
        url: '',
      },
    ],
  },
  'guttoslagurinn-1932': {
    name: 'Gúttóslagurinn',
    dateText: '9. nóvember 1932',
    period: 'Konungsríkið Ísland / kreppuárin',
    locationName: 'Góðtemplarahúsið (Gúttó) við Templarasund hjá Tjörninni, Reykjavík',
    factions: ['Verkafólk og atvinnulausir í Reykjavík', 'Lögreglan í Reykjavík'],
    keyPeople: ['Hermann Jónasson (lögreglustjóri)', 'Verkalýðshreyfingin í Reykjavík'],
    winner: 'Verkafólkið — kauplækkunin var dregin til baka',
    casualtyEstimate: 'Engin dauðsföll; 20 af 28 lögregluþjónum slasaðir auk bæjarbúa',
    summary:
      'Í dýpstu kreppunni ætlaði bæjarstjórnin að lækka kaupið í atvinnubótavinnunni. Æstur mannfjöldi fyllti Gúttó, slagsmálin flæddu út á göturnar og lögreglan var borin ofurliði — nær hver einasti lögregluþjónn slasaðist. Bæjarstjórnin bakkaði og nefndi lækkunina aldrei aftur.',
    eli12:
      'Í hræðilegri efnahagskreppu ætlaði bærinn að borga atvinnulausu fólki enn minna fyrir neyðarvinnu. Fólk varð svo reitt að það slóst við lögregluna fyrir utan fundarhúsið og vann. Bærinn hætti við launalækkunina.',
    whyItHappened:
      'Fjöldaatvinnuleysi kreppunnar gerði atvinnubótakaupið að líflínu. Að skera það niður var árás á fólk sem stóð þegar á brúninni, og vaxandi verkalýðshreyfing Reykjavíkur var tilbúin að svara fyrir sig.',
    whyItMatters:
      'Stærsti árekstur íslenskrar verkalýðsbaráttu — stund þar sem venjulegt verkafólk hafði yfirvöld undir í beinum átökum. Hann ýtti Íslandi í að byggja upp alvöru skipulagða lögreglu og dýpkaði gjána milli hægri og vinstri.',
    before:
      'Kreppan mikla hafði skollið á Íslandi af fullum þunga: fjöldaatvinnuleysi, og atvinnubótavinna bæjarins sem síðasta líflínan.',
    after:
      'Gjáin milli hægri og vinstri sem hann dýpkaði lá gegnum alla öldina — og gaus aftur upp út af NATO.',
    humanDrama:
      'Svar bæjarins við sveltandi mönnum var að lækka atvinnubótakaupið — svo sveltandi mennirnir svöruðu með hnefum og borðfótum, og unnu. Tuttugu af tuttugu og átta lögregluþjónum Reykjavíkur slösuðust; í einn dag var höfuðborgin í raun án starfhæfrar lögreglu. Kauplækkunin var aldrei nefnd aftur.',
    modernTranslation:
      'Í miðri kreppu samþykkir borgarstjórn að lækka laun lægst launuðu neyðarstarfsmanna sinna. Fundurinn er stormaður, lögreglan tapar götuslagnum og lækkunin er dregin hljóðlega til baka. Aðhald, kynntu þér afleiðingarnar.',
    confidenceNote:
      'Mikill áreiðanleiki. Atburður 20. aldar með blaðaumfjöllun, lögregluskýrslum og lifandi minni á bak við sig — tölurnar um slasaða koma beint úr samtímagögnum.',
    sources: [
      {
        title: 'Wikipedia: Gúttóslagurinn',
        url: 'https://is.wikipedia.org/wiki/G%C3%BAtt%C3%B3slagurinn',
      },
    ],
  },
  'operation-fork-1940': {
    name: 'Hernám Breta',
    dateText: '10. maí 1940',
    period: 'Seinni heimsstyrjöldin',
    locationName: 'Reykjavíkurhöfn og lykilstaðir um land allt',
    factions: [
      'Bretland / breskir landgönguliðar',
      'Hlutlaust Ísland í konungssambandi við Danmörku',
    ],
    keyPeople: ['Breskir landgönguliðar', 'Ríkisstjórn Íslands', 'Bresk stjórnvöld'],
    winner: 'Breska hernámsliðið',
    casualtyEstimate: 'Ekkert mannfall í átökum; Ísland var herlaust og varðist ekki',
    summary:
      'Breskt herlið gekk á land í Reykjavík 1940 til að koma í veg fyrir að Ísland lenti í höndum Þjóðverja eftir fall Danmerkur. Ísland var hlutlaust og herlaust, svo innrásin var spennuþrungin en nær blóðlaus.',
    eli12:
      'Bretar óttuðust að Þýskaland nasismans myndi nota Ísland sem herstöð í Norður-Atlantshafi. Svo breskir hermenn mættu og tóku lykilstaði — og Ísland gat í raun ekkert gert.',
    whyItHappened:
      'Þýskaland hafði hernumið Danmörku í apríl 1940 og skilið Ísland eftir berskjaldað í hernaðarlegu tilliti. Bretland vildi ná höfnum, flugvöllum og legu landsins áður en Þýskaland hreyfði sig.',
    whyItMatters:
      'Hernámið dró Ísland beint inn í hernaðaráætlanir seinni heimsstyrjaldarinnar. Það leiddi líka til varnarsamstarfs við Bandaríkin síðar og ýtti undir fullt sjálfstæði frá Danmörku 1944.',
    before:
      'Þýskaland hafði hernumið Danmörku mánuði fyrr og skilið Ísland eftir munaðarlaust í miðju Atlantshafsstríði.',
    after:
      'Hernámsárin umbyltu efnahagnum, sjálfstæðið kom 1944 — og spurningin um erlendan her klauf unga lýðveldið.',
    humanDrama:
      'Innrásarliðið dreifði flugmiðum á bjagaðri íslensku og bað alla að halda ró sinni. Ríkisstjórnin mótmælti formlega — og bað svo fólk að koma fram við hernámsliðið „eins og gesti“. Lögregluþjónn á að hafa hjálpað landgönguliða að kveikja sér í sígarettu fyrir utan þýsku ræðismannsskrifstofuna meðan ræðismaðurinn brenndi skjölin sín. Sem hernám var þetta ákaflega kurteist, og stríðsgróðinn sem fylgdi umbylti landinu.',
    modernTranslation:
      'Hlutlaust land án hers vaknar við bandamannahermenn í höfninni — ekki vegna nokkurs sem það gerði, heldur vegna þess hvar það liggur á kortinu. Formlega svarið er harðort bréf; praktíska svarið er að selja hernámsliðinu fisk og taka byggingarvinnuna.',
    confidenceNote:
      'Mikill áreiðanleiki. Ein best skjalfesta stund Íslandssögunnar — opinber gögn beggja vegna, ljósmyndir og blaðaumfjöllun frá fyrsta degi.',
    sources: [
      {
        title: 'Wikipedia: Hernám Íslands',
        url: 'https://is.wikipedia.org/wiki/Hern%C3%A1m_%C3%8Dslands',
      },
      {
        title: 'Wikipedia: British invasion of Iceland (á ensku)',
        url: 'https://en.wikipedia.org/wiki/British_invasion_of_Iceland',
      },
    ],
  },
  'austurvollur-1949': {
    name: 'Óeirðirnar á Austurvelli 1949',
    dateText: '30. mars 1949',
    period: 'Lýðveldið Ísland / kalda stríðið',
    locationName: 'Austurvöllur, fyrir framan Alþingishúsið',
    factions: ['Andstæðingar NATO-aðildar', 'Lögregla, varalið og stuðningsmenn aðildar'],
    keyPeople: ['Alþingi', 'Mótmælendur gegn NATO-aðild'],
    winner: 'Ríkisstjórnin — aðildin að NATO var samþykkt',
    casualtyEstimate: 'Engin dauðsföll; margir slasaðir af grjóti og kylfum; táragasi beitt',
    summary:
      'Meðan Alþingi greiddi atkvæði um NATO-aðild söfnuðust þúsundir á Austurvöll. Sumir grýttu þinghúsið með steinum og eggjum; lögregla og sjálfboðaliðar úr röðum aðildarsinna svöruðu með kylfum og táragasi. Þetta urðu mestu óeirðir Íslandssögunnar — og Ísland gekk samt í NATO.',
    eli12:
      'Ísland var að ákveða hvort það gengi í hernaðarbandalagið NATO. Mörgum fannst það hræðileg hugmynd og mótmæltu fyrir utan þingið, sumir með grjótkasti. Lögreglan svaraði með táragasi. Þetta varð mjög ofbeldisfullt — en þingið sagði samt já.',
    whyItHappened:
      'Mörgum Íslendingum hraus hugur við að ganga í hernaðarbandalag — herlaus þjóð með sterka hefð fyrir hlutleysi og öfluga vinstrihreyfingu. Atkvæðagreiðslan ýtti ágreiningnum út á göturnar.',
    whyItMatters:
      'Óeirðirnar afhjúpuðu djúpa og varanlega gjá í afstöðu Íslendinga til vestrænna hernaðartengsla, erlendra herstöðva og hlutleysis — deilu sem gekk gegnum allt kalda stríðið.',
    before:
      'Hernámsárin höfðu gert erlenda hermenn á íslenskri grund að vana; að ganga í hernaðarbandalag sem vopnlaust lýðveldi fannst mörgum vera að festa það ástand í sessi.',
    after:
      'Ísland sat áfram í NATO — og innleysti þá stöðu tveimur áratugum síðar til að vinna stríð um fisk.',
    humanDrama:
      'Þjóð sem stærði sig af þúsund árum af því að útkljá mál með orðum horfði á grjót brjóta rúður eigin þinghúss — með þingmennina inni, í miðri atkvæðagreiðslu. Lögreglan beitti táragasi á Íslendinga í fyrsta sinn. Atkvæðagreiðslan fór samt í gegn, og fjölskyldur og vinabönd klofnuðu um þennan dag heila kynslóð fram.',
    modernTranslation:
      'Þingið kýs um aðild að hernaðarbandalagi meðan æstur mannfjöldi fyrir utan grýtir bygginguna og lögreglan svarar með kylfum og táragasi. Sáttmálinn er samþykktur; rifrildið um hvort það hafi verið rétt hættir ekki í fjörutíu ár.',
    confidenceNote:
      'Mikill áreiðanleiki. Ítarlega skjalfest í fjölmiðlum, ljósmyndum og þingskjölum; þetta eru mest rannsökuðu óeirðir Íslandssögunnar.',
    sources: [
      {
        title: 'Wikipedia: Óeirðirnar á Austurvelli 1949',
        url: 'https://is.wikipedia.org/wiki/%C3%93eir%C3%B0irnar_%C3%A1_Austurvelli_1949',
      },
      {
        title: 'Wikipedia: 1949 anti-NATO riot in Iceland (á ensku)',
        url: 'https://en.wikipedia.org/wiki/1949_anti-NATO_riot_in_Iceland',
      },
    ],
  },
  'cod-wars': {
    name: 'Þorskastríðin',
    dateText: '1958–1976 (þrjár rimmur)',
    period: 'Nútíminn / Lýðveldið Ísland',
    locationName: 'Fiskimiðin umhverfis Ísland (merkið er táknrænt — opið haf)',
    factions: ['Ísland (Landhelgisgæslan)', 'Bretland (Konunglegi flotinn og togaraflotarnir)'],
    keyPeople: ['Landhelgisgæslan', 'Konunglegi flotinn'],
    winner: 'Ísland',
    casualtyEstimate:
      'Nær ekkert — einn íslenskur vélstjóri lést í slysi (1973). „Vopnin“ voru togvíraklippur og ásiglingar.',
    summary:
      'Þrjár rimmur milli Íslands og Bretlands um fiskveiðiréttindi eftir því sem Ísland færði lögsöguna út aftur og aftur (á endanum í 200 sjómílur). Þrátt fyrir nafnið slasaðist varla nokkur: helstu vopnin voru togvíraklippur íslensku varðskipanna og ásiglingar á báða bóga.',
    eli12:
      'Ísland og Bretland háðu „stríð“ um fisk. Ísland helgaði sér sífellt meira haf, og Bretum líkaði það illa því breskir togarar veiddu þar. Í stað þess að skjóta klipptu Íslendingar veiðarfærin aftan úr bresku togurunum og allir sigldu hver á annan. Ísland vann.',
    whyItHappened:
      'Sjávarútvegurinn er burðarás íslensks efnahagslífs. Þegar þrengdi að fiskistofnunum færði Ísland lögsöguna út (4 → 12 → 50 → 200 mílur). Bretland neitaði að viðurkenna nýju mörkin og sendi flotann til að verja togarana sína.',
    whyItMatters:
      'Ísland vann hverja einustu lotu. Það hótaði meira að segja að ganga úr NATO og loka hernaðarlega ómissandi bandarískri herstöð — vogarafl sem neyddi Bretland til að láta undan. 200 mílna efnahagslögsagan sem Ísland barðist fyrir varð síðar alþjóðleg meginregla í hafrétti.',
    before:
      'Slagurinn um íslensk mið hafði staðið frá því breskir togarar skófu fyrst firðina — og drekktu bátsverjum sýslumanns — 1899.',
    after:
      '200 mílurnar urðu alþjóðalög, fiskveiðihagkerfi Íslands var tryggt, og herlaus þjóð hafði haft betur gegn Konunglega flotanum þrisvar í röð. Sögulok — hingað til.',
    humanDrama:
      'Tvö hundruð þúsund manna þjóð án hers mætti Konunglega flotanum þrisvar og vann allar loturnar. Leynivopnið var ekki vopn: það voru togvíraklippur, þrjóska og trúverðug hótun um að reka mikilvægustu ratsjárstöð NATO úr landi. Bretar sendu freigátur; Ísland sendi örfá varðskip og eitt landfræðipólitískt úrslitakostabréf. Freigáturnar fóru heim.',
    modernTranslation:
      'Örfyrirtæki vinnur risann í þremur deilum í röð — ekki með því að eyða meira, heldur með því að eiga eina eign sem stærsti samstarfsaðili risans getur ekki lifað án, og sýna sig reiðubúið að fórna henni. Vogarafl vinnur stærð, þrisvar í röð.',
    confidenceNote:
      'Mikill áreiðanleiki. Nýlegt, tæmandi skjalfest á báða bóga og mikið rannsakað af sagnfræðingum og þjóðréttarfræðingum — um rimmurnar, aðferðirnar og úrslitin er ekki deilt.',
    sources: [
      {
        title: 'Wikipedia: Þorskastríðin',
        url: 'https://is.wikipedia.org/wiki/%C3%9Eorskastr%C3%AD%C3%B0in',
      },
      {
        title: 'Wikipedia: Cod Wars (á ensku)',
        url: 'https://en.wikipedia.org/wiki/Cod_Wars',
      },
    ],
  },
};
