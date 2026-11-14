const CLASSES={
  warlock:{ru:"Чернокнижник",color:"#8788EE"}, paladin:{ru:"Паладин",color:"#F48CBA"},
  warrior:{ru:"Воин",color:"#C69B6D"}, hunter:{ru:"Охотник",color:"#AAD372"}, rogue:{ru:"Разбойник",color:"#E8D44D"},
  priest:{ru:"Жрец",color:"#B9BEC9"}, shaman:{ru:"Шаман",color:"#2F7FE0"}, mage:{ru:"Маг",color:"#3FC7EB"}, druid:{ru:"Друид",color:"#FF7C0A"}
};
const RACES={
  orc:{ru:"Орк",f:"H",start:"Дуротар"}, undead:{ru:"Нежить",f:"H",start:"Тирисфальские леса"},
  tauren:{ru:"Таурен",f:"H",start:"Мулгор"}, troll:{ru:"Тролль",f:"H",start:"Дуротар"},
  windshaper:{ru:"Скайборн (Windshaper)",f:"H",start:"остров Зефрас"},
  human:{ru:"Человек",f:"A",start:"Элвиннский лес"}, dwarf:{ru:"Дворф",f:"A",start:"Дун Морог"},
  nightelf:{ru:"Ночной эльф",f:"A",start:"Тельдрассил"}, gnome:{ru:"Гном",f:"A",start:"Дун Морог"},
  highorder:{ru:"Скайборн (High Order)",f:"A",start:"остров Зефрас"}
};
/* какие расы доступны классу; для жреца полного списка в источниках нет */
const COMBOS={
  warrior:["human","dwarf","nightelf","gnome","highorder","orc","undead","tauren","troll","windshaper"],
  hunter:["human","dwarf","nightelf","highorder","orc","tauren","troll","windshaper"],
  rogue:["human","dwarf","nightelf","gnome","highorder","orc","undead","troll","windshaper"],
  shaman:["dwarf","orc","tauren","troll","windshaper"],
  mage:["human","gnome","highorder","orc","undead","troll"],
  warlock:["human","gnome","orc","undead","troll"],
  druid:["nightelf","highorder","tauren","windshaper"],
  paladin:["human","dwarf","undead"], priest:null
};
const ZONES=[
 ["Стартовая зона расы",1,12,"*"],
 ["Степи (The Barrens)",10,25,"H"],["Серебряный бор (Silverpine)",10,20,"H"],
 ["Западный край (Westfall)",10,20,"A"],["Лок Модан",10,20,"A"],["Темные берега (Darkshore)",10,20,"A"],
 ["Красногорье (Redridge)",15,25,"A"],["Сумеречный лес (Duskwood)",18,30,"A"],["Болотина (Wetlands)",20,30,"A"],
 ["Когтистые горы (Stonetalon)",15,27,"*"],["Ясеневый лес (Ashenvale)",18,30,"*"],
 ["Предгорья Хилсбрада",20,31,"*"],["Тысяча Игл",25,35,"*"],["Альтеракские горы",27,39,"*"],
 ["Нагорье Арати",30,40,"*"],["Пустоши (Desolace)",30,40,"*"],["Тернистая долина (STV)",30,45,"*"],
 ["Пылевые топи (Dustwallow)",35,45,"*"],["Бесплодные земли (Badlands)",35,45,"*"],["Болото Печали",35,45,"*"],
 ["Riverglades (новая зона)",36,45,"*"],
 ["Танарис",40,50,"*"],["Фералас",40,50,"*"],["Внутренние земли (Hinterlands)",40,50,"*"],
 ["Азшара",45,55,"*"],["Оскверненный лес (Felwood)",48,55,"*"],["Кратер Ун'Горо",48,55,"*"],
 ["Пылающие степи",50,58,"*"],["Западные Чумные земли",51,58,"*"],
 ["Восточные Чумные земли",53,60,"*"],["Зимние Ключи",53,60,"*"],["Силитус",53,60,"*"]
];
const DUNGEONS=[
 ["Огненная пропасть (RFC)",13,18,"Оргриммар"],["Hall of Thanes (новое)",13,18,"по названию похоже на Стальгорн, место уточни"],
 ["Ruins of Lordaeron (новое)",15,20,"над Подгородом"],["Пещеры Стенаний (WC)",15,24,"Степи"],
 ["Крепость Темного Клыка (SFK)",20,30,"Серебряный бор"],["Непроглядная Пучина (BFD)",22,28,"Ясеневый лес"],
 ["Excavation Site (новое)",26,31,"Болотина"],["Лабиринты Иглошкурых (RFK)",27,33,"Степи"],
 ["City of Dalaran (новое)",28,33,"Альтерак, нужна аттюнка"],["Гномреган",28,35,"Дун Морог"],
 ["The Drowned City (новое)",35,40,"от Гром'гола, Тернистая долина"],["Курганы Иглошкурых (RFD)",36,42,"Степи"],
 ["Krol'dok Stronghold (новое)",40,45,"Riverglades"],["Alcaz Prison (новое)",48,53,"остров Алькац"],
 ["Глубины Черной горы (BRD)",52,60,"Черная гора"],["Blackmaw Hold (новое)",55,60,"Оскверненный лес"],
 ["Стратхольм / Некроситет",58,60,"Чумные земли"],["Пик Черной горы (LBRS/UBRS)",58,60,"Черная гора"],
 ["Shaper's Terrace (новое)",58,60,"Ун'Горо"]
];
/* вехи: [id, уровень, класс|null, фракция|null, текст] */
const MILES=[
 ["bag",3,null,null,"Сделать квест на бесплатную сумку в стартовой зоне"],
 ["gather",5,null,null,"Взять собирательную профессию у младшего тренера в стартовой зоне"],
 ["sec",5,null,null,"Выучить три вторичные профессии: Кулинария, Первая помощь, Рыбная ловля"],
 ["camp",10,null,null,"Поднять профессию до 20 ради первого предмета лагеря; костер дает Кулинария с навыка 1"],
 ["tal10",10,null,null,"Потратить первое очко талантов (таланты открываются с 10)"],
 ["bagchain",14,null,null,"Начать цепочку на Cozy Sleeping Bag (с 14)"],
 ["rol",15,null,"H","Сходить в Ruins of Lordaeron (15–20): опыт в Forever перенесли из мобов подземелий в квесты, бери все квесты в подземелье"],
 ["dal",28,null,"H","Взять аттюнку в Даларан в Таррен Милле: «Key to the City» и «Prison Break-In» у Magus Wordeen Voidglare"],
 ["river",36,null,null,"Открыть Riverglades и полетные точки фракции"],
 ["dual",40,null,null,"Купить двойную специализацию (с 40)"],
 ["hyjal",60,null,null,"Гора Хиджал и подготовка к рейдам (рейды с 9 декабря)"],
 ["wl_imm",1,"warlock",null,"Выучить Immolate 1 ранга, как только хватит денег; взять беса по классовому квесту"],
 ["wl_wand1",5,"warlock",null,"Купить Lesser Magic Wand"],
 ["wl_vw",10,"warlock",null,"Получить демона Бездны (Voidwalker) по классовому квесту"],
 ["wl_wand2",13,"warlock",null,"Обновить жезл до Greater Magic Wand"],
 ["wl_fh",30,"warlock",null,"Получить охотника Скверны (Felhunter), перейти на Drain Life как основной филлер"],
 ["wl_wrack",40,"warlock",null,"Взять 31-й талант ветки (Wrack в Колдовстве, Demonic Pact в Демонологии)"],
 ["pal_q",5,"paladin","H","Пройти цепочку паладинов-нежити в Тирисфале (Шепчущий лес, крепость Бандарион)"],
 ["pal_plate",40,"paladin",null,"Перейти с кольчуги на латы (доступны с 40)"],
 ["pal_set",52,"paladin",null,"Начать собирать Lightforge из подземелий (требует 52–58)"],
 ["dr_buff",1,"druid",null,"Держать на себе Mark of the Wild и Thorns, до 10 уровня бить Wrath и Moonfire"],
 ["dr_bear",10,"druid",null,"Получить облик медведя по классовому квесту"],
 ["dr_isle",12,"druid","H","Закончить остров Зефрас и уплыть на материк: причал Орды в Валанааре, дальше Мулгор и Громовой Утес"],
 ["dr_cat",20,"druid",null,"Получить облик кошки по классовому квесту (с 20), с этого момента кач заметно ускоряется"],
 ["dr_pb",40,"druid",null,"Взять Primal Bite, 31-й талант Силы зверя"]
];
const BUILDS={
 warlock:{
  intro:"Для соло-кача гайды сходятся на Колдовстве (Affliction): мгновенный Corruption, доты, Drain Life и Life Tap почти убирают простой между мобами. Демонология безопаснее, Разрушение дает взрывной урон.",
  play:"Corruption и Bane of Agony на цель, дальше Drain Life или жезл. Ману восполняй Life Tap, здоровье возвращай Drain Life. Держи несколько осколков душ в сумках.",
  specs:{
   aff:{name:"Колдовство",final:"40/11/0",steps:[
    [10,14,"Improved Corruption 5/5"],[15,17,"Suppression 3/5"],[18,19,"Grim Reach 2/2"],[20,22,"Improved Drains 3/3"],
    [23,25,"Pandemic 3/3"],[26,27,"Nightfall 2/2"],[28,29,"Malevolence (по пути к Siphon Life)"],[30,30,"Siphon Life"],
    [31,39,"Malevolence, Fel Concentration, Soul Siphon 3/3, Shadow Mastery 5/5"],[40,40,"Wrack"],
    [41,50,"Демонология: Unholy Power 5/5, Demonic Energies 2/2, Fel Vitality 3/3"],[51,60,"Добрать Колдовство: Improved Bane of Agony, остаток Suppression"]]},
   demo:{name:"Демонология",final:"31 в Демонологии + 20 в Колдовстве",steps:[
    [10,26,"Старт как в Колдовстве: Improved Corruption, Suppression, плюс Unholy Power и Demonic Energies"],
    [27,27,"Сброс талантов у тренера, все очки в Демонологию до Demonic Brand 3/3"],
    [28,39,"Fel Domination, Demonic Sacrifice, Soul Link, Demonic Knowledge, Master Demonologist"],
    [40,40,"Demonic Pact"],[41,60,"Остаток в Колдовство"]]},
   destro:{name:"Разрушение",final:"5/11/35",steps:[
    [10,19,"Bane 5/5, Cataclysm 3/3, Aftermath"],[20,29,"Shadowburn, Ruin, Conflagrate, Agonizing Flames"],
    [30,39,"Bane of Havoc, Ruin 5/5, Fire and Brimstone, Shadow and Flame"],[40,40,"Incinerate"],[41,60,"11 в Демонологию, 5 в Колдовство"]]}
  },
  gear:[
   [1,12,"Жезл важнее всего остального: Lesser Magic Wand сразу, Greater Magic Wand около 13. Ткань с Выносливостью и Интеллектом."],
   [13,29,"Выносливость и Интеллект, урон от темной магии где попадется. Вещи из новых квестов стартовых и вторых зон, синие награды из Ruins of Lordaeron и Пещер Стенаний."],
   [30,49,"Портняжное дело дает персональные (привязанные) тканевые вещи, для Колдовства это Filigreed Shadow Gown с уроном от тьмы. Обновляй жезл каждые 10–15 уровней."],
   [50,60,"Подземелья 55–60 (Blackmaw Hold, Shaper's Terrace, Стратхольм, Некроситет) как подготовка к Хиджалу."]],
  prof:"Чаще всего советуют Портняжное дело + Наложение чар.",
  race:"За Орду чернокнижником может быть орк, нежить или тролль. Орк сильнее в PvE (Command: +5% урона питомца, Blood Fury), нежить чаще берут для PvP. Скайборнам класс недоступен."
 },
 druid:{
  intro:"Для кача гайды единогласно советуют Силу зверя (Feral): кошка для квестов, медведь для пачек мобов и танкования подземелий. Старт медленный, каждая новая форма ускоряет кач.",
  play:"До 10 уровня Wrath и Moonfire. С 10 по 19 играешь медведем: Maul и Swipe. С 20 основная форма кошка: Rake, Claw, добивание Ferocious Bite; в медведя переходишь на пачках и когда тебя бьют игроки. Между боями лечишься сам, в походной форме уходишь от погони.",
  specs:{
   feral:{name:"Сила зверя (урон)",final:"0/35/16",steps:[
    [10,14,"Ferocity 5/5"],[15,19,"Feral Swiftness 2/2, Feral Instinct 3/3"],
    [20,29,"Sharpened Claws 2/2, Savage Fury 2/2, Feral Charge, Predatory Strikes 3/3, Predatory Discipline, Furor"],
    [30,39,"Lacerate, Leader of the Pack, Natural Instinct, Rend and Tear"],[40,40,"Primal Bite"],
    [41,60,"Остаток в Исцеление. Shredding Attacks и Shifting Power для кача пропусти"]]},
   bear:{name:"Медведь (танк)",final:"0/46/5",steps:[
    [10,19,"Ferocity 5/5, Thick Hide 3/3, Feral Instinct 2/3"],[20,39,"Feral Charge, Lacerate, Leader of the Pack и защитные таланты ветки"],
    [40,40,"Primal Bite"],[41,60,"Добрать Силу зверя до 46, 5 очков в Исцеление"]]}
  },
  gear:[
   [1,19,"Кожа с Выносливостью и Силой. В формах теперь важен урон оружия, так что обновляй оружие первым делом; друидам доступны древковые."],
   [20,39,"Кожа с Ловкостью и Силой для кошки. Держи в сумках комплект на Интеллект и Дух: с ним можно лечить подземелья без талантов в Исцеление."],
   [40,60,"Два набора под двойную специализацию: кошка или медведь плюс лекарь."]],
  prof:"Для сбора друид один из лучших: походная форма, невидимость мимо мобов и самолечение. Травничество или Снятие шкур с Кожевничеством ложатся естественно.",
  race:"За Орду друидом может быть таурен или скайборн Windshaper. У скайборна 2% скорости от Wind Blessed, планирование Walk on Air и ускорение Skysight."
 },
 paladin:{
  intro:"Качаться быстрее всего в Воздаянии (Retribution). Для танкования группы нужна Защита: Seal of Fury, блок щитом и Consecration держат пачку мобов.",
  play:"Сила дает физический урон, Интеллект через талант превращается в силу заклинаний и усиливает Holy Strike и Consecration. Выносливость нужна всегда.",
  specs:{},
  gear:[
   [1,24,"Кольчуга с Силой и Выносливостью; для танка одноручное оружие и щит, для кача двуручное."],
   [25,29,"Двуручник Wolfsbane за квест Old Fire-Eye: главное обновление оружия на этом отрезке."],
   [30,39,"Corpsemaker с Overlord Ramtusk в Лабиринтах Иглошкурых. Для танка там же у Charlga Razorflank одноручник Pronged Reaver и, похоже, щит Heart of Agamaggan. Из Крепости Темного Клыка: штаны Worgpelt Leggings (Wolf Master Nandos) и кольцо Silverlaine's Family Seal."],
   [40,51,"Переход на латы."],
   [52,60,"Комплект Lightforge из подземелий."]],
  prof:"Горное дело + Кузнечное дело хорошо ложатся на Защиту и Воздаяние.",
  race:"За Орду паладином может быть только нежить."
 }
};
const SOURCES=[
 ["Method: Warlock Leveling Guide","https://www.method.gg/wow-forever/wow-forever-warlock-leveling-guide-and-talents"],
 ["Warcraft Tavern: Warlock Leveling","https://www.warcrafttavern.com/forever/guides/warlock-leveling/"],
 ["Maxroll: Warlock Leveling","https://maxroll.gg/wow-forever/class-guides/warlock-leveling-guide"],
 ["ConquestCapped: таланты по уровням","https://conquestcapped.com/guides/wow-forever/wow-forever-warlock-leveling/"],
 ["Зоны по уровням","https://wowforeverguides.com/leveling/zones"],
 ["Маршрут Орды 1–60","https://wowforeverinfo.com/guides/leveling-horde/"],
 ["Расы и классы","https://timesaver.gg/blog/wow-forever-race-class-combos-skyborne"],
 ["ConquestCapped: Druid Leveling","https://conquestcapped.com/guides/wow-forever/wow-forever-druid-leveling/"],
 ["Method: Druid Leveling","https://www.method.gg/wow-forever/wow-forever-druid-leveling-guide-and-talents"],
 ["Armory aotc.gg","https://www.aotc.gg/forever"]
];

