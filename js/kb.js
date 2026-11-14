/* База знаний WoW Minmaxxer: зоны, подземелья, вехи, билды, профессии, цели по вещам.
   Разметка в текстах: {{Name}} — название из мира WoW (выводится как "English (Русское)"),
   [[12345]] — предмет по ID (карточка из data/items.json). Источники — в SOURCES и PROJECT_RULES.md. */
window.KB = {
  CLASSES: {
    paladin: { en: "Paladin", color: "#F48CBA" }, druid: { en: "Druid", color: "#FF7C0A" }, warrior: { en: "Warrior", color: "#C69B6D" },
    hunter: { en: "Hunter", color: "#AAD372" }, rogue: { en: "Rogue", color: "#FFF468" }, priest: { en: "Priest", color: "#E6E6E6" },
    shaman: { en: "Shaman", color: "#2F7FE0" }, mage: { en: "Mage", color: "#3FC7EB" }, warlock: { en: "Warlock", color: "#8788EE" }
  },
  STARTS: { Undead: "Tirisfal Glades", Orc: "Durotar", Troll: "Durotar", Tauren: "Mulgore", "Skyborne (Windshaper)": "Zephras Isle" },
  ZONES: [
    ["Starting zone", 1, 12, "*"],
    ["The Barrens", 10, 25, "H"], ["Silverpine Forest", 10, 20, "H"],
    ["Stonetalon Mountains", 15, 27, "*"], ["Ashenvale", 18, 30, "*"], ["Hillsbrad Foothills", 20, 31, "*"],
    ["Thousand Needles", 25, 35, "*"], ["Alterac Mountains", 27, 39, "*"], ["Arathi Highlands", 30, 40, "*"],
    ["Desolace", 30, 40, "*"], ["Stranglethorn Vale", 30, 45, "*"], ["Dustwallow Marsh", 35, 45, "*"],
    ["Badlands", 35, 45, "*"], ["Swamp of Sorrows", 35, 45, "*"], ["Riverglades", 36, 45, "*"],
    ["Tanaris", 40, 50, "*"], ["Feralas", 40, 50, "*"], ["The Hinterlands", 40, 50, "*"],
    ["Azshara", 45, 55, "*"], ["Felwood", 48, 55, "*"], ["Un'Goro Crater", 48, 55, "*"],
    ["Burning Steppes", 50, 58, "*"], ["Western Plaguelands", 51, 58, "*"],
    ["Eastern Plaguelands", 53, 60, "*"], ["Winterspring", 53, 60, "*"], ["Silithus", 53, 60, "*"]
  ],
  DUNGEONS: [
    ["Ragefire Chasm", 13, 18, "Orgrimmar"], ["Ruins of Lordaeron", 15, 20, "Undercity"], ["Wailing Caverns", 15, 24, "The Barrens"],
    ["Shadowfang Keep", 20, 30, "Silverpine Forest"], ["Blackfathom Deeps", 22, 28, "Ashenvale"],
    ["Excavation Site: Wetlands", 26, 33, "Wetlands"], ["Razorfen Kraul", 29, 38, "The Barrens"],
    ["City of Dalaran", 28, 33, "Alterac Mountains"], ["Scarlet Monastery", 30, 38, "Tirisfal Glades"],
    ["The Drowned City", 35, 40, "Stranglethorn Vale"], ["Razorfen Downs", 36, 42, "The Barrens"],
    ["Krol'dok Stronghold", 40, 45, "Riverglades"], ["Uldaman", 42, 48, "Badlands"], ["Alcaz Prison", 48, 53, "Dustwallow Marsh"],
    ["Blackrock Depths", 52, 60, "Burning Steppes"], ["Blackmaw Hold", 55, 60, "Felwood"],
    ["Stratholme", 58, 60, "Eastern Plaguelands"], ["Blackrock Spire", 58, 60, "Burning Steppes"], ["Shaper's Terrace", 58, 60, "Un'Goro Crater"]
  ],
  /* вехи: [id, уровень, класс|null, фракция|null, текст] */
  MILES: [
    ["bag", 3, null, null, "Квест на бесплатную сумку в стартовой зоне"],
    ["sec", 5, null, null, "Выучить вторичные профессии: {{Cooking}}, {{First Aid}}, {{Fishing}}"],
    ["gather", 5, null, null, "Собирательная профессия у младшего тренера в стартовой зоне"],
    ["tal10", 10, null, null, "Первое очко талантов"],
    ["camp", 10, null, null, "Профессия до 20 ради первого предмета лагеря; костер дает {{Cooking}}"],
    ["bagchain", 14, null, null, "Цепочка на Cozy Sleeping Bag"],
    ["rol", 15, null, "H", "{{Ruins of Lordaeron}}: опыт в Forever дают квесты подземелий, бери их все"],
    ["dal", 30, null, "H", "Ключ от {{City of Dalaran}}: цепочка у Magus Wordeen Voidglare в {{Tarren Mill}}"],
    ["dual", 40, null, null, "Двойная специализация"],
    ["hyjal", 60, null, null, "{{Mount Hyjal}} и подготовка к рейдам"],
    ["dr_buff", 1, "druid", null, "Держать {{Mark of the Wild}} и {{Thorns}}, до 10 бить {{Wrath}} и {{Moonfire}}"],
    ["dr_bear", 10, "druid", null, "Классовый квест на {{Bear Form}}"],
    ["dr_cat", 20, "druid", null, "Классовый квест на {{Cat Form}}; скайборны делают его в {{Moonglade}}"],
    ["dr_travel", 30, "druid", null, "{{Travel Form}} у тренера"],
    ["pal_q", 5, "paladin", "H", "Цепочка паладинов-нежити в {{Tirisfal Glades}}"],
    ["pal_wolf", 25, "paladin", null, "Двуручник [[267369]] за квест Old Fire-Eye"],
    ["pal_plate", 40, "paladin", null, "Переход с кольчуги на латы"]
  ],
  BUILDS: {
    paladin: {
      intro: "Качаться быстрее в {{Retribution}}. Для танкования нужна {{Protection}}: щит, блок и {{Consecration}} держат пачку мобов.",
      play: "Сила дает урон, Интеллект через таланты усиливает святые удары, Выносливость нужна всегда. Двуручник с Силой важнее брони.",
      specs: {
        ret: { name: "Retribution", final: "0/0/51", steps: [[10, 14, "Benediction 5/5"], [15, 19, "Improved Judgement 2/2, Conviction 3/3"], [20, 24, "Sanctified Judgement, Seal of Command, Pursuit of Justice"], [25, 29, "Sacred Arbiter, Two-Handed Weapon Specialization 3/3"], [30, 39, "Vengeance 3/3, Champion of the Light"], [40, 40, "Unsealed Wrath"]] },
        prot: { name: "Protection", final: "0/51/0", steps: [[10, 19, "Redoubt, Precision, Guardian's Favor"], [20, 29, "Templar's Bulwark, Shield Specialization, Toughness"], [30, 39, "Anticipation, Holy Shield, Reckoning"], [40, 40, "Shieldsworn"]] }
      },
      prof: "{{Mining}} + {{Blacksmithing}}: кузнец делает латы и двуручники, а {{Mining}} дает +5% здоровья."
    },
    druid: {
      intro: "Для кача гайды советуют {{Feral}}: кошка для квестов, медведь для пачек и танкования. Старт медленный, каждая форма ускоряет кач.",
      play: "До 10 — {{Wrath}} и {{Moonfire}}. С 10 по 19 — медведь: {{Maul}} и {{Swipe}}. С 20 — кошка: {{Prowl}}, {{Faerie Fire}}, комбо и {{Ferocious Bite}}. Лечишься между боями {{Rejuvenation}} и {{Regrowth}}. Урон в формах зависит от оружия.",
      specs: {
        feral: { name: "Feral", final: "0/35/16", steps: [[10, 14, "Ferocity 5/5"], [15, 19, "Feral Swiftness 2/2, Feral Instinct 3/3"], [20, 29, "Sharpened Claws, Savage Fury, Feral Charge, Predatory Strikes, Furor"], [30, 39, "Lacerate, Leader of the Pack, Natural Instinct, Rend and Tear"], [40, 40, "Primal Bite"], [41, 60, "Остаток в {{Restoration}}"]] },
        bear: { name: "Bear (tank)", final: "0/46/5", steps: [[10, 19, "Ferocity 5/5, Thick Hide 3/3"], [20, 39, "Feral Charge, Lacerate, Leader of the Pack"], [40, 40, "Primal Bite"]] }
      },
      prof: "{{Leatherworking}} + {{Skinning}}: кожаная броня и персональные комплекты. Для золота — {{Herbalism}}."
    }
  },
  /* цели по вещам: [класс, уровень от, до, слот, ID предмета, откуда] */
  TARGETS: [
    ["paladin", 28, 35, "mainhand", 271766, "Квест Earthen Echo после {{Excavation Site: Wetlands}}"],
    ["paladin", 28, 35, "mainhand", 6687, "{{Razorfen Kraul}}, Overlord Ramtusk"],
    ["paladin", 30, 38, "mainhand", 7689, "{{Scarlet Monastery}}: Graveyard, редкий Fallen Champion"],
    ["paladin", 28, 34, "waist", 273023, "{{Excavation Site: Wetlands}}, Saltspine"],
    ["paladin", 32, 40, "waist", 10329, "{{Scarlet Monastery}}, мобы (BoE)"],
    ["paladin", 28, 36, "neck", 7731, "{{Scarlet Monastery}}: Graveyard, редкий Azshir the Sleepless"],
    ["paladin", 28, 36, "chest", 273035, "{{City of Dalaran}}, Arcane Anomaly"],
    ["paladin", 30, 38, "chest", 7688, "{{Scarlet Monastery}}: Graveyard, редкий Ironspine"],
    ["paladin", 31, 40, "wrist", 10333, "{{Scarlet Monastery}}, мобы (BoE)"],
    ["paladin", 28, 36, "back", 273045, "{{City of Dalaran}}, Arcanic Enigma"],
    ["paladin", 28, 36, "head", 6686, "{{Razorfen Kraul}}, Overlord Ramtusk"],
    ["paladin", 28, 36, "feet", 273025, "{{Excavation Site: Wetlands}}, Shadetooth"],
    ["paladin", 28, 36, "hands", 16978, "Квест Warsong Supplies, {{Ashenvale}}"],
    ["paladin", 28, 36, "finger", 6321, "{{Shadowfang Keep}}, Baron Silverlaine"],
    ["paladin", 28, 36, "offhand", 6694, "{{Razorfen Kraul}}, Charlga Razorflank (для танка)"],
    ["druid", 10, 14, "mainhand", 257345, "Квест Return to Valanaar, Zephras Isle"],
    ["druid", 10, 16, "back", 257943, "Квест WANTED: Vulgara the Insatiable, Zephras Isle"],
    ["druid", 13, 18, "back", 14149, "{{Ragefire Chasm}}, Taragaman the Hungerer"],
    ["druid", 13, 18, "feet", 273007, "{{Ragefire Chasm}}, Bazzalan"],
    ["druid", 14, 20, "hands", 263306, "Квест Mercy Falls on Deaf Ears, Zephras Isle"],
    ["druid", 15, 20, "mainhand", 271203, "{{Ruins of Lordaeron}}, Witherfang"],
    ["druid", 15, 22, "wrist", 271202, "{{Ruins of Lordaeron}}, Witherfang"],
    ["druid", 15, 22, "legs", 6480, "Квест Deviate Hides, {{Wailing Caverns}}"],
    ["druid", 18, 24, "chest", 271212, "{{Ruins of Lordaeron}}, Viktor the Vile"],
    ["druid", 18, 24, "waist", 10412, "{{Wailing Caverns}}, Lady Anacondra"],
    ["druid", 20, 25, "mainhand", 270018, "Квест Leaders of the Fang, {{Wailing Caverns}}"],
    ["druid", 25, 30, "mainhand", 273841, "{{Blackfathom Deeps}}, Lorgus Jett"],
    ["druid", 30, 35, "mainhand", 271766, "Квест Earthen Echo"]
  ],
  PROF: {
    primary: ["Alchemy", "Blacksmithing", "Enchanting", "Engineering", "Herbalism", "Leatherworking", "Mining", "Skinning", "Tailoring"],
    secondary: ["Cooking", "First Aid", "Fishing"],
    info: {
      "Alchemy": "Зелья, эликсиры, фляги; в лагере — источник маны.",
      "Blacksmithing": "Кольчуга, латы, оружие, персональные комплекты; в лагере — бафф Силы.",
      "Enchanting": "Чары и крафт колец, ожерелий, жезлов, посохов, реликвий.",
      "Engineering": "Гранаты и гаджеты, сильнее всего в PvP; в лагере — починка.",
      "Herbalism": "Травы для зелий; пассивно — сопротивление магии.",
      "Leatherworking": "Кожа и кольчуга, персональные комплекты; в лагере — палатка с отдыхом.",
      "Mining": "Руда; пассивно +5% здоровья.",
      "Skinning": "Кожа; пассивно — урон по животным.",
      "Tailoring": "Ткань и сумки, восемь новых сумок для реагентов.",
      "Cooking": "Костер для лагеря; блюда дают +5% опыта за убийства.",
      "First Aid": "Бинты и лечебные зелья; в лагере — Выносливость.",
      "Fishing": "Рыба для кулинарии и алхимии; в лагере — +8% к характеристикам."
    }
  },
  SOURCES: [
    ["Method: гайды классов и подземелий", "https://www.method.gg/wow-forever/dungeons/razorfen-kraul"],
    ["ConquestCapped: прокачка и таланты", "https://conquestcapped.com/guides/wow-forever/wow-forever-druid-leveling/"],
    ["Warcraft Tavern: квесты подземелий", "https://www.warcrafttavern.com/forever/guides/dungeons/"],
    ["timesaver.gg: вещи по уровням", "https://timesaver.gg/tools/wow-forever/leveling-gear"],
    ["wowforeverinfo: маршрут Орды", "https://wowforeverinfo.com/guides/leveling-horde/"],
    ["Armory: wow-classic-premium.com", "https://wow-classic-premium.com/en/forever/armory"]
  ]
};
