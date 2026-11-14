/* Персонажи журнала. Обновляет Claude по armory; дата снимка в поле snapshot.date. */
window.CHARS = [
  {
    id: "radi-vas",
    first: "Radi", last: "Vas", owner: "Влад",
    cls: "paladin", race: "undead", region: "eu", rules: "PvP",
    level: 30, spec: "ret", professions: ["Горное дело"],
    armory: "https://wow-classic-premium.com/en/forever/character/eu/radi/vas",
    snapshot: {
      date: "14.11.2026", gs: 244, ilvl: 26,
      stats: { hp: 1186, str: 98, agi: 47, sta: 100, int: 38, spi: 72, armor: 1119, ap: 272, crit: "10.89%", dps: 50.0 },
      gear: [
        ["head", "Hooded Cowl", 30], ["neck", "Roadwatcher's Confidence", 20], ["shoulder", "Bronzed Shoulderguards", 27],
        ["back", "Sporid Cape", 22], ["chest", "Mutant Scale Breastplate", 23], ["wrist", "Death Bindings", 21],
        ["hands", "Algae Fists", 28], ["waist", "Stormbringer Belt", 20], ["legs", "Mercenary Leggings", 30],
        ["feet", "Treacherous Treads", 28], ["finger1", "Seal of Sylvanas", 29], ["finger2", "Band of the Fist", 28],
        ["trinket1", "Transformative Cocoon", 30], ["trinket2", null, null],
        ["mainhand", "Combatant Claymore", 33]
      ],
      talents: { tree: "paladin", points: { holy: null, prot: null, ret: 20 },
        ranks: { "Benediction": 5, "Improved Judgement": 2, "Conviction": 3, "Sanctified Judgement": 3, "Seal of Command": 1,
                 "Pursuit of Justice": 2, "Sacred Arbiter": 1, "Two-Handed Weapon Specialization": 3 } }
    }
  },
  {
    id: "rygal-hurmoy",
    first: "Рыгал", last: "Хурмой", owner: "Влад",
    cls: "druid", race: "windshaper", region: "eu", rules: "PvP",
    level: 13, spec: "feral", professions: [],
    armory: null,
    snapshot: null
  }
];
