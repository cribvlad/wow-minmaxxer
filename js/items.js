/* ID предметов WoW Forever на Wowhead (по ссылкам timesaver.gg и armory wow-classic-premium.com).
   Предмет без ID показывается ссылкой на поиск Wowhead, без всплывающей карточки. */
window.ITEMS = {
  // Radi Vas, надето
  "Hooded Cowl":3732, "Roadwatcher's Confidence":281265, "Bronzed Shoulderguards":270024, "Sporid Cape":6629,
  "Mutant Scale Breastplate":6627, "Death Bindings":286981, "Algae Fists":6906, "Stormbringer Belt":12978,
  "Mercenary Leggings":3751, "Treacherous Treads":273842, "Seal of Sylvanas":6414, "Band of the Fist":17694,
  "Transformative Cocoon":276895, "Combatant Claymore":2877,
  // паладин, цели
  "Corpsemaker":6687, "Wolfsbane":267369, "Worgpelt Leggings":273647, "Raptorclaw Greaves":273025,
  "Warsong Gauntlets":16978, "Silverlaine's Family Seal":6321, "Drape of Shifting Energy":273045,
  "Snake Eye Kaleidoscope":273088, "Tanned Shoulderpads":270023, "Witherbite Bracers":271202,
  "Abandoned Ferocity":271801, "Hammerbone":270018, "Mana-Warped Chain Shirt":273035, "Atrophic Girdle":271201,
  "Runemender's Seal":273031, "Pronged Reaver":6692, "Heart of Agamaggan":6694, "Humbert's Helm":4724,
  "Reliquary Mantle":273028, "Senior Sergeant's Insignia":15200, "Sergeant's Cloak":18427,
  // Раскопки
  "Saltscale Girdle":273023, "Supple Bellyskin Leggings":273022, "Garb of Florid Feathers":273026,
  "Ring of Power Regulation":273030, "Furs of the Earthen Ring":271719, "Heavehammer":271766,
  "Serrated Raptor Claw":280805, "Dirt-Heavy Bracers":271732,
  // Лабиринты Иглошкурых
  "Tusken Helm":6686, "Quillord Mail Leggings":274161, "Agamaggan's Clutch":6693, "Thorncursed Grips":274159,
  "Ferine Leggings":6690, "Boar Signet":274078, "Monkey Ring":6748, "Tiger Band":6749, "Snake Hoop":6750,
  "Whisperwind Headdress":6688,
  // Монастырь, Кладбище
  "Ironspine's Ribcage":7688, "Ironspine's Eye":7686, "Ironspine's Fist":7687, "Morbid Dawn":7689, "Ebon Vise":7690,
  "Ghostshard Talisman":7731, "Polished Skullcap":274291, "Painwalker Buckler":274290, "Bloody Brass Knuckles":7683,
  "Grimsteel Cape":4643, "Vorrel's Boots":7751, "Scarlet Belt":10329, "Scarlet Wristguards":10333,
  "Scarlet Gauntlets":10331, "Scarlet Chestpiece":10328, "Scarlet Boots":10332, "Scarlet Leggings":10330,
  // друид
  "Novice's Quarterstaff":257282, "Honed Greathammer":257345, "Segmented Spider Leg":271203, "Twilight Maul":273841,
  "Hunter's Simple Cloak":257943, "Nightclaw Gloves":263306, "Subterranean Cape":14149, "Slick Deviate Leggings":6480,
  "Chasm Walkers":273007, "Belt of the Fang":10412, "Bloodied Chestwraps":271212, "Howlhide Vest":281284,
  "Bounty Hunter's Ring":5351, "Ring of Scorn":3235,
  // Даларан, ID пока не найдены
  "Guardian's Dualblade":0, "Refractory Scaleguards":0, "Manascale Treads":0, "Battle Spaulders":0,
  "Undead Knight's Bracers":0, "Construct Cloak":0, "Solid Gold Band":0, "Bonepile Gaze":0
};

/* Цели по вещам: [класс, уровень от, до, слот, предмет, откуда] */
window.TARGETS = [
  ["paladin",28,35,"Оружие","Corpsemaker","Лабиринты Иглошкурых, Overlord Ramtusk. Больше урона, чем у Combatant Claymore, и +15 Силы вместо Духа"],
  ["paladin",28,35,"Оружие","Heavehammer","Квест Earthen Echo после Раскопок: +32 к силе атаки"],
  ["paladin",28,35,"Оружие","Guardian's Dualblade","Даларан, Unstable Sentinel"],
  ["paladin",30,38,"Оружие","Morbid Dawn","Монастырь: Кладбище, редкий Fallen Champion. Самый высокий урон в секунду из доступных"],
  ["paladin",28,34,"Пояс","Saltscale Girdle","Раскопки, Saltspine"],
  ["paladin",32,40,"Пояс","Scarlet Belt","Монастырь, падает с мобов (BoE)"],
  ["paladin",28,36,"Шея","Ghostshard Talisman","Монастырь: Кладбище, редкий Azshir the Sleepless"],
  ["paladin",28,36,"Грудь","Mana-Warped Chain Shirt","Даларан, Arcane Anomaly"],
  ["paladin",30,38,"Грудь","Ironspine's Ribcage","Монастырь: Кладбище, редкий Ironspine"],
  ["paladin",28,36,"Запястья","Undead Knight's Bracers","Квест The Grave Knight (Даларан)"],
  ["paladin",31,40,"Запястья","Scarlet Wristguards","Монастырь, падает с мобов (BoE)"],
  ["paladin",28,36,"Спина","Drape of Shifting Energy","Даларан, Arcanic Enigma"],
  ["paladin",28,36,"Плечи","Battle Spaulders","Квест Heart of Disruption (Даларан)"],
  ["paladin",28,36,"Голова","Tusken Helm","Лабиринты Иглошкурых, Overlord Ramtusk"],
  ["paladin",28,36,"Голова","Polished Skullcap","Монастырь: Кладбище, Bloodmage Thalnos"],
  ["paladin",28,36,"Ступни","Raptorclaw Greaves","Раскопки, Shadetooth"],
  ["paladin",28,36,"Кисти","Warsong Gauntlets","Квест Warsong Supplies, Ясеневый лес"],
  ["paladin",28,36,"Кольцо","Silverlaine's Family Seal","Крепость Темного Клыка, Baron Silverlaine"],
  ["paladin",28,36,"Щит (танк)","Heart of Agamaggan","Лабиринты Иглошкурых, Charlga Razorflank"],
  ["paladin",28,36,"Оружие (танк)","Pronged Reaver","Лабиринты Иглошкурых, Charlga Razorflank"],
  ["druid",10,14,"Оружие","Honed Greathammer","Квест Return to Valanaar, остров Зефрас"],
  ["druid",10,16,"Спина","Hunter's Simple Cloak","Квест WANTED: Vulgara the Insatiable, остров Зефрас"],
  ["druid",13,18,"Спина","Subterranean Cape","Огненная пропасть, Taragaman the Hungerer"],
  ["druid",13,18,"Ступни","Chasm Walkers","Огненная пропасть, Bazzalan"],
  ["druid",14,20,"Кисти","Nightclaw Gloves","Квест Mercy Falls on Deaf Ears, остров Зефрас"],
  ["druid",15,20,"Оружие","Segmented Spider Leg","Ruins of Lordaeron, Witherfang"],
  ["druid",15,22,"Запястья","Witherbite Bracers","Ruins of Lordaeron, Witherfang"],
  ["druid",15,22,"Ноги","Slick Deviate Leggings","Квест Deviate Hides, Пещеры Стенаний"],
  ["druid",18,24,"Грудь","Bloodied Chestwraps","Ruins of Lordaeron, Viktor the Vile"],
  ["druid",18,24,"Пояс","Belt of the Fang","Пещеры Стенаний, Lady Anacondra"],
  ["druid",20,25,"Оружие","Hammerbone","Квест Leaders of the Fang, Пещеры Стенаний"],
  ["druid",25,30,"Оружие","Twilight Maul","Непроглядная Пучина, Lorgus Jett"],
  ["druid",30,35,"Оружие","Heavehammer","Квест Earthen Echo (после Раскопок)"]
];
