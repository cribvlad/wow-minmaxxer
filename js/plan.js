/* План подземелий пати. Разметка: {{Name}} — место/NPC, [[ID]] — предмет. */
window.PLAN = {
  title: "Excavation Site → Dalaran → Razorfen Kraul → Graveyard",
  intro: "Порядок совпадает с уровнями: Excavation Site 26–33, {{City of Dalaran}} 28–33, {{Razorfen Kraul}} 29–38, Graveyard в {{Scarlet Monastery}} 30–38. И с цепочками: квест Hearts of Zeal на Graveyard открывается только после Going, Going, Guano! из {{Razorfen Kraul}}.",
  pickup: [
    ["{{Orgrimmar}}, The Drag 57.3 53.3", "Borstan the Meat Vendor", "Changing Tastes", "es"],
    ["{{Arathi Highlands}}, {{Hammerfall}} 74.4 35.6", "Zaruk", "Dragonmaw Rumors → в {{Wetlands}} 51.4 59.2 у Deathstalker Agent берешь Open the Maw", "es"],
    ["{{Hillsbrad Foothills}}, {{Tarren Mill}} 61.5 20.9", "Magus Wordeen Voidglare", "Цепочка на ключ от {{City of Dalaran}} (с 30 уровня)", "dal"],
    ["{{Hillsbrad Foothills}}, {{Tarren Mill}} 62.6 20.6", "Melisara", "The Grave Knight", "dal"],
    ["{{Undercity}}, The Apothecarium 46.4 74.3", "Doctor Martin Felben", "Source of Power", "dal"],
    ["{{Undercity}}, The Apothecarium", "{{Master Apothecary Faranell}}", "Going, Going, Guano! (с 30)", "rfk"],
    ["{{Thunder Bluff}}, Lower Rise", "Auld Stonespire", "A Vengeful Fate (с 29)", "rfk"],
    ["{{The Barrens}}, {{Ratchet}}", "Mebok Mizzyrix", "Blueleaf Tubers: рядом возьми ящик, палку и инструкцию", "rfk"]
  ],
  steps: [
    {
      key: "es", name: "Excavation Site: Wetlands", min: 26, max: 33,
      where: "{{Wetlands}}, тропа к югу от Thelgen Rock, рядом со входом в {{Dun Algaz}}. Орда добирается через {{Hammerfall}}.",
      bosses: "Saltspine, Shadetooth, Relic Guardian (Highland Horror — квестовый босс Альянса)",
      quests: [
        ["Changing Tastes", "Borstan, {{Orgrimmar}}", "4 Thicket Raptor Meat с ящеров за первым боссом", "[[280805]] (кинжал)"],
        ["Open the Maw", "Deathstalker Agent, {{Wetlands}}", "2 Dragonmaw Saboteur, 4 Dragonmaw Warder и Dragonmaw Dispatch с Dragonmaw Thaumaturgist", "Кожа и ткань на запястья; ради опыта"],
        ["Elder Knowledge → Earthen Echo", "Titan Relic с Relic Guardian → Bashana Runetotem, {{Elder Rise}} 70.8 33.7 → Muln Earthfury, Skywatcher Plateau 33.4 22.5", "Отнести реликвию", "[[271719]] или [[271766]]"]
      ],
      loot: [
        [271766, "Квест Earthen Echo", "+32 к силе атаки, урон как у твоего Combatant Claymore"],
        [273023, "Saltspine", "Кольчужный пояс +9 Сила: закрывает самый слабый слот"],
        [273025, "Shadetooth", "Ботинки +7 Сила +7 Выносливость"],
        [273028, "Relic Guardian", "Плечи для танка"]
      ],
      tips: "Опаснее всего Shadetooth: неподготовленная пати на нем ложится. Saltspine можно оглушать и замедлять."
    },
    {
      key: "dal", name: "City of Dalaran", min: 28, max: 33,
      where: "{{Alterac Mountains}}, вход через канализацию на северо-западе города; у входа стоит Image of Archmage Modera. Координаты в гайдах расходятся.",
      bosses: "Atrexis the Grave Knight, Arcane Anomaly, Arcanic Enigma, Unstable Sentinel, Fel Ancient, Mana Devourer, Shade of the Archmage; тайный Lyn the Ignored",
      attune: [
        "Key to the City: в Lordamere Internment Camp собрать 4 куска Bloodstone у нейтральных NPC и Grimy Key из Warden's Footlocker",
        "Dalaran Patrols: 6 Dalaran Summoner и 8 Elemental Slave в руинах",
        "Blood in the Streets: поговорить с Image of Archmage Modera у канализации",
        "Heart of Disruption: дает Dalaran Sewer Key, одного на пати хватит"
      ],
      quests: [
        ["Source of Power", "Doctor Martin Felben, {{Undercity}}", "6 Cracked Sentry Core с големов Fragmented Sentry", "Construct Cloak или жезл"],
        ["The Grave Knight", "Melisara, {{Tarren Mill}}", "Убить Atrexis в канализации", "Undead Knight's Bracers (кольчуга) или Gravewalker Boots"],
        ["Opportunistic Education", "Rexxie Copperclutch, внутри справа", "Книга The Founding of Dalaran в Atrium of Fortune", "Solid Gold Band или Larcenist's Belt"],
        ["Heart of Disruption", "Image of Archmage Modera", "Arcane Mote с Shade of the Archmage", "Battle Spaulders (кольчуга), Enchanted Sandals или Striking Staff"]
      ],
      loot: [
        [273035, "Arcane Anomaly", "Кольчужная грудь +12 Сила +8 Выносливость"],
        [273045, "Arcanic Enigma", "Плащ +12 к силе атаки"],
        [null, "Unstable Sentinel", "Guardian's Dualblade — двуручный топор, характеристик пока нет"],
        [273031, "Arcane Anomaly", "Кольцо для лекаря"]
      ],
      tips: "Fel Ancient активируется разговором с Grindle Firespark. Орду в открытом {{Dalaran}} атакуют стражники, на подземелье это не влияет. Тайного Lyn the Ignored вызывает Tome of Dalaran (цепочка через Black Tome из {{Shadowfang Keep}})."
    },
    {
      key: "rfk", name: "Razorfen Kraul", min: 29, max: 38,
      where: "Юг {{The Barrens}}, около 43 90, западный из двух входов.",
      bosses: "Roogug, Aggem Thorncurse, Death Speaker Jargba, Overlord Ramtusk, Agathelos the Raging, Charlga Razorflank; редкие Blind Hunter и Earthcaller Halmgar",
      quests: [
        ["A Vengeful Fate", "Auld Stonespire, {{Thunder Bluff}}", "Сердце Charlga Razorflank", "Награды гайды не указывают"],
        ["Going, Going, Guano!", "{{Master Apothecary Faranell}}, {{Undercity}}", "Kraul Guano с летучих мышей после Overlord Ramtusk", "Открывает Hearts of Zeal"],
        ["Blueleaf Tubers", "Mebok Mizzyrix, {{Ratchet}}", "Суслик из ящика собирает 6 Blueleaf Tuber", "Опыт"],
        ["Willix the Importer", "Willix, в палатке у Charlga", "Вывести его из подземелья", "Кольцо: [[274078]], [[6748]], [[6750]] или [[6749]]"],
        ["An Unholy Alliance", "Small Scroll с Charlga Razorflank", "Отнести {{Varimathras}} в {{Undercity}}", "Каждый берет свиток сам"]
      ],
      loot: [
        [6687, "Overlord Ramtusk", "+15 Сила, 28.95 урона в секунду"],
        [6686, "Overlord Ramtusk", "Кольчужный шлем +13 Сила"],
        [274161, "Overlord Ramtusk", "Кольчужные штаны для танка"],
        [6694, "Charlga Razorflank", "Щит для танка"],
        [6692, "Charlga Razorflank", "Одноручный топор для танка"]
      ],
      tips: "Не забудьте летучих мышей в конце: без гуано не будет квеста на Graveyard."
    },
    {
      key: "gy", name: "Scarlet Monastery: Graveyard", min: 30, max: 38,
      where: "Северо-восток {{Tirisfal Glades}}, крайний левый портал в главном здании; ключ не нужен.",
      bosses: "Interrogator Vishas и Bloodmage Thalnos всегда; редкие Ironspine, Azshir the Sleepless, Fallen Champion",
      quests: [
        ["Vorrel's Revenge", "Vorrel Sengutz, на дыбе у Interrogator Vishas", "Кольцо у элитной Nancy Vishas (33) на Misty Shore, {{Alterac Mountains}}; сдать Monika Sengutz в {{Tarren Mill}}", "[[4643]], Mantle of Woe или [[7751]]"],
        ["Hearts of Zeal", "{{Master Apothecary Faranell}} (после гуано)", "20 Heart of Zeal с мобов {{Scarlet Monastery}}", "Нельзя разделить с пати"]
      ],
      loot: [
        [7689, "Fallen Champion (редкий)", "Самый высокий урон в секунду из доступных: 30.17"],
        [7731, "Azshir the Sleepless (редкий)", "Шея +14 к силе атаки"],
        [7688, "Ironspine (редкий)", "Кольчужная грудь +17 Выносливость"],
        [274291, "Bloodmage Thalnos", "Кольчужный шлем"],
        [10329, "мобы (BoE)", "Пояс +12 Сила +10 Выносливость"],
        [10333, "мобы (BoE)", "Запястья +11 Выносливость"]
      ],
      tips: "Graveyard короткий, его гоняют несколько раз ради редких боссов. Комплект Scarlet продается на аукционе."
    }
  ]
};
