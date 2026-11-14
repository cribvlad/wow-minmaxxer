/* План подземелий Влада и пати: Раскопки → Даларан → Лабиринты Иглошкурых → Монастырь (Кладбище). */
window.PLAN = {
  title: "Раскопки → Даларан → Иглошкурые → Кладбище",
  intro: "Порядок совпадает с уровнями: Раскопки 26–33, Даларан 28–33, Лабиринты Иглошкурых 29–38, Кладбище Монастыря 30–38. И с цепочками: квест на Кладбище «Hearts of Zeal» открывается только после «Going, Going, Guano!» из Лабиринтов.",
  pickup: [
    ["Оргриммар, Аллея (The Drag), 57.3 53.3","Borstan the Meat Vendor","Changing Tastes","Раскопки"],
    ["Нагорье Арати, Хаммерфолл, 74.4 35.6","Zaruk","Dragonmaw Rumors → в Болотине 51.4 59.2 у Deathstalker Agent берешь Open the Maw","Раскопки"],
    ["Предгорья Хилсбрада, Таррен Милл, 61.5 20.9","Magus Wordeen Voidglare","Цепочка на ключ Даларана (с 30 уровня)","Даларан"],
    ["Предгорья Хилсбрада, Таррен Милл, 62.6 20.6","Melisara","The Grave Knight","Даларан"],
    ["Подгород, Аптекарий, 46.4 74.3","Doctor Martin Felben","Source of Power","Даларан"],
    ["Подгород, Аптекарий","Master Apothecary Faranell","Going, Going, Guano! (с 30)","Иглошкурые"],
    ["Громовой Утес, Нижний ярус","Auld Stonespire","A Vengeful Fate (с 29)","Иглошкурые"],
    ["Степи, Кабестан","Mebok Mizzyrix","Blueleaf Tubers: возьми рядом ящик, палку и инструкцию","Иглошкурые"]
  ],
  steps: [
    {
      key: "es", name: "Раскопки (Excavation Site: Wetlands)", lvl: "26–33",
      where: "Болотина, тропа к югу от пещеры Thelgen Rock, недалеко от входа в Dun Algaz. Орда добирается через Хаммерфолл в Нагорье Арати.",
      bosses: "Saltspine, Shadetooth, Relic Guardian (Highland Horror — квестовый босс Альянса)",
      quests: [
        ["Changing Tastes","Borstan, Оргриммар","4 Thicket Raptor Meat с ящеров в Stalker's Thicket, за первым боссом","Serrated Raptor Claw (кинжал, паладину не нужен)"],
        ["Open the Maw","Deathstalker Agent, Болотина (после Dragonmaw Rumors)","Убить 2 Dragonmaw Saboteur и 4 Dragonmaw Warder, забрать Dragonmaw Dispatch с Dragonmaw Thaumaturgist","Кожа и ткань на запястья; ради опыта"],
        ["Elder Knowledge → Earthen Echo","Titan Relic с Relic Guardian → Bashana Runetotem, Громовой Утес 70.8 33.7 → Muln Earthfury, Плато Небесного Дозора 33.4 22.5","Отнести реликвию","Furs of the Earthen Ring или двуручный Heavehammer: +32 к силе атаки, хороший вариант для паладина"]
      ],
      loot: [
        ["Saltscale Girdle","Saltspine","Кольчужный пояс +9 Сила: закрывает самый слабый слот (Stormbringer Belt, 20)"],
        ["Raptorclaw Greaves","Shadetooth","Ботинки +7 Сила +7 Выносливость; сравни с Treacherous Treads"],
        ["Reliquary Mantle","Relic Guardian","Плечи для танка: Выносливость и меткость"],
        ["Heavehammer","Квест Earthen Echo","Двуручный молот с +32 к силе атаки: урон как у Combatant Claymore, но статы под Воздаяние"]
      ],
      tips: "Опаснее всего Shadetooth: неподготовленная пати на нем ложится. Saltspine можно оглушать и замедлять."
    },
    {
      key: "dal", name: "Город Даларан (City of Dalaran)", lvl: "28–33",
      where: "Альтеракские горы, вход через канализацию на северо-западной стороне города. Координаты в гайдах расходятся; у входа стоит Image of Archmage Modera.",
      bosses: "Atrexis the Grave Knight, Arcane Anomaly, Arcanic Enigma, Unstable Sentinel, Fel Ancient, Mana Devourer, Shade of the Archmage; тайный Lyn the Ignored",
      attune: [
        "Key to the City: в лагере Lordamere Internment Camp собрать 4 куска Bloodstone с нейтральных NPC (Dermot, Alina, Ricter, Kegan Darkmar) и Grimy Key из сундука Warden's Footlocker в доме Kegan",
        "Dalaran Patrols: 6 Dalaran Summoner и 8 Elemental Slave в руинах старого Даларана",
        "Blood in the Streets: поговорить с Image of Archmage Modera у входа в канализацию",
        "Heart of Disruption: дает Dalaran Sewer Key. Хватит одного ключа на пати"
      ],
      quests: [
        ["Source of Power","Doctor Martin Felben, Подгород","6 Cracked Sentry Core с големов Fragmented Sentry на улицах","Construct Cloak или жезл Unstable Power Core"],
        ["The Grave Knight","Melisara, Таррен Милл","Убить первого босса Atrexis в канализации","Undead Knight's Bracers (кольчуга) или Gravewalker Boots"],
        ["Opportunistic Education","Rexxie Copperclutch, внутри справа от входа","Найти книгу The Founding of Dalaran в Atrium of Fortune","Solid Gold Band или Larcenist's Belt"],
        ["Heart of Disruption","Image of Archmage Modera","Arcane Mote с последнего босса Shade of the Archmage; портал открывает Archmage Modera у Аметистовой цитадели","Battle Spaulders (кольчуга), Enchanted Sandals или Striking Staff"]
      ],
      loot: [
        ["Guardian's Dualblade","Unstable Sentinel","Двуручный топор; характеристик в открытых источниках пока нет"],
        ["Mana-Warped Chain Shirt","Arcane Anomaly","Кольчужная грудь; у тебя сейчас слабая Mutant Scale Breastplate (23)"],
        ["Drape of Shifting Energy","Arcanic Enigma","Плащ вместо Sporid Cape (22)"],
        ["Refractory Scaleguards","Unstable Sentinel","Кольчужные штаны"],
        ["Manascale Treads","Mana Devourer","Кольчужные ботинки"],
        ["Runemender's Seal","Arcane Anomaly","Кольцо"]
      ],
      tips: "Fel Ancient активируется разговором с Grindle Firespark. Орду в открытом Даларане атакуют стражники, на подземелье это не влияет. Тайный Lyn the Ignored вызывается книгой Tome of Dalaran (цепочка через Black Tome из Крепости Темного Клыка); с него щит Bonepile Gaze."
    },
    {
      key: "rfk", name: "Лабиринты Иглошкурых (Razorfen Kraul)", lvl: "29–38",
      where: "Юг Степей, около 43 90, западный из двух входов Иглошкурых.",
      bosses: "Roogug, Aggem Thorncurse, Death Speaker Jargba, Overlord Ramtusk, Agathelos the Raging, Charlga Razorflank; редкие Blind Hunter и Earthcaller Halmgar",
      quests: [
        ["A Vengeful Fate","Auld Stonespire, Громовой Утес","Сердце Charlga Razorflank","Награды гайд не указывает"],
        ["Going, Going, Guano!","Master Apothecary Faranell, Подгород","Kraul Guano с летучих мышей после Overlord Ramtusk (мыши накладывают немоту)","Открывает Hearts of Zeal для Монастыря"],
        ["Blueleaf Tubers","Mebok Mizzyrix, Кабестан","Призвать суслика из ящика и с палкой собрать 6 Blueleaf Tuber","Опыт"],
        ["Willix the Importer","Willix, в палатке у Charlga","Вывести его из подземелья, держаться рядом","Кольцо на выбор: Boar Signet, Monkey Ring, Snake Hoop, Tiger Band"],
        ["An Unholy Alliance","Small Scroll с Charlga Razorflank","Отнести Varimathras в Подгород","Каждый берет свиток сам"]
      ],
      loot: [
        ["Corpsemaker","Overlord Ramtusk","Двуручный топор +15 Сила +8 Выносливость, с 29"],
        ["Tusken Helm","Overlord Ramtusk","Кольчужный шлем +13 Сила"],
        ["Quillord Mail Leggings","Overlord Ramtusk","Кольчужные штаны"],
        ["Heart of Agamaggan","Charlga Razorflank","Щит для танкования"],
        ["Pronged Reaver","Charlga Razorflank","Одноручный топор для танкования"]
      ],
      tips: "Не забудьте летучих мышей в конце: без гуано не будет квеста на Кладбище."
    },
    {
      key: "gy", name: "Монастырь Алого ордена: Кладбище", lvl: "30–38",
      where: "Северо-восток Тирисфальских лесов. В главном здании крайний левый портал; Алый ключ не нужен.",
      bosses: "Interrogator Vishas и Bloodmage Thalnos всегда; редкие Ironspine, Azshir the Sleepless, Fallen Champion",
      quests: [
        ["Vorrel's Revenge","Vorrel Sengutz, на дыбе в комнате Vishas","Кольцо Vorrel'а у элитной Nancy Vishas (33) на Misty Shore в Альтеракских горах, сдать Monika Sengutz в Таррен Милле","Grimsteel Cape, Mantle of Woe или Vorrel's Boots"],
        ["Hearts of Zeal","Master Apothecary Faranell, Подгород (после гуано)","20 Heart of Zeal с мобов в Монастыре и вокруг","Нельзя разделить с пати"]
      ],
      loot: [
        ["Ghostshard Talisman","Azshir the Sleepless (редкий)","Шея +9 Выносливость +14 к силе атаки вместо Roadwatcher's Confidence (20)"],
        ["Ironspine's Ribcage","Ironspine (редкий)","Кольчужная грудь +6 Сила +17 Выносливость"],
        ["Morbid Dawn","Fallen Champion (редкий)","Двуручный меч +10 Сила +15 Выносливость"],
        ["Polished Skullcap","Bloodmage Thalnos","Кольчужный шлем +7 Сила +8 Выносливость"],
        ["Scarlet Belt","Мобы Монастыря (BoE)","Кольчужный пояс +12 Сила +10 Выносливость, с 32"],
        ["Scarlet Wristguards","Мобы Монастыря (BoE)","Кольчужные запястья +11 Выносливость, с 31"],
        ["Scarlet Gauntlets","Мобы Монастыря (BoE)","+12 Сила +10 Ловкость, с 33"]
      ],
      tips: "Кладбище короткое, его часто гоняют несколько раз ради редких боссов. Предметы комплекта Scarlet продаются на аукционе."
    }
  ]
};
