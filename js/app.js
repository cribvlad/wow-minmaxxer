/* Походный журнал WoW Forever: статичная версия для GitHub Pages. */
(function () {
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ls = {
    get(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const SLOT_RU = { head: "Голова", neck: "Шея", shoulder: "Плечи", back: "Спина", chest: "Грудь", wrist: "Запястья",
    hands: "Кисти", waist: "Пояс", legs: "Ноги", feet: "Ступни", finger1: "Кольцо", finger2: "Кольцо",
    trinket1: "Аксессуар", trinket2: "Аксессуар", mainhand: "Оружие", offhand: "Левая рука" };

  /* ---------- предметы: свои карточки ---------- */
  const DB = window.ITEMDB || {};
  function item(name) {
    if (!name) return '<span class="empty-slot">пусто</span>';
    const d = DB[name];
    if (!d) return '<span class="itm-plain">' + esc(name) + "</span>";
    return '<button type="button" class="itm q' + (d.q || 0) + '" data-iname="' + esc(name) + '">' + esc(name) + "</button>";
  }
  const NAMES = Object.keys(DB).sort((a, b) => b.length - a.length);
  function linkify(text) {
    let out = esc(text);
    NAMES.forEach(n => {
      const en = esc(n);
      if (out.includes(en)) out = out.split(en).join("\u0000" + n + "\u0001");
    });
    return out.replace(/\u0000([^\u0001]+)\u0001/g, (m, n) => item(n));
  }
  function refreshTooltips() {}
  const QN = { 1: "Обычный", 2: "Необычный", 3: "Редкий", 4: "Эпический" };
  function itemTip(name) {
    const d = DB[name] || {};
    let h = '<div class="tt-name q' + (d.q || 0) + '">' + esc(name) + "</div>";
    if (d.bind) h += '<div class="tt-line">' + esc(d.bind) + "</div>";
    h += '<div class="tt-row"><span>' + esc(d.slot || "") + "</span><span>" + esc(d.type || "") + "</span></div>";
    if (d.dmg) h += '<div class="tt-row"><span>Урон ' + esc(d.dmg) + "</span><span>Скорость " + esc(d.speed) + '</span></div><div class="tt-line">(' + esc(d.dps) + " урона в секунду)</div>";
    if (d.armor) h += '<div class="tt-line">Броня: ' + d.armor + "</div>";
    if (d.block) h += '<div class="tt-line">Блок: ' + d.block + "</div>";
    (d.stats || []).forEach(x => h += '<div class="tt-line">' + esc(x) + "</div>");
    (d.fx || []).forEach(x => h += '<div class="tt-fx">' + esc(x) + "</div>");
    if (d.set) h += '<div class="tt-set">Комплект Scarlet: бонусы за 2–6 предметов (сопротивление тьме, сила атаки против нежити, меткость, щит при низком здоровье)</div>';
    if (d.req) h += '<div class="tt-line">Требуется уровень: ' + d.req + "</div>";
    if (d.ilvl) h += '<div class="tt-dim">Уровень предмета ' + d.ilvl + "</div>";
    if (d.nodata) h += '<div class="tt-dim">Подробных характеристик пока нет в открытых источниках.</div>';
    else if (!d.q) h += '<div class="tt-dim">Качество не подтверждено.</div>';
    return h;
  }

  /* ---------- свои карточки талантов ---------- */
  const tip = document.createElement("div");
  tip.className = "tt"; tip.setAttribute("role", "tooltip"); tip.hidden = true;
  document.body.appendChild(tip);
  function showTip(el) {
    tip.innerHTML = el.dataset.iname ? itemTip(el.dataset.iname) : '<div class="tt-name">' + esc(el.dataset.name) + '</div><div class="tt-rank">' + esc(el.dataset.rank) +
      '</div><div class="tt-desc">' + esc(el.dataset.desc) + "</div>";
    tip.hidden = false;
    const r = el.getBoundingClientRect(), w = Math.min(300, innerWidth - 24);
    tip.style.width = w + "px";
    let x = r.left + r.width / 2 - w / 2; x = Math.max(12, Math.min(innerWidth - w - 12, x));
    let y = r.bottom + 8; const h = tip.offsetHeight;
    if (y + h > innerHeight - 8) y = Math.max(8, r.top - h - 8);
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  function hideTip() { tip.hidden = true; }
  document.addEventListener("mouseover", e => { const t = e.target.closest(".tnode,.itm"); if (t) showTip(t); });
  document.addEventListener("mouseout", e => { if (e.target.closest(".tnode,.itm")) hideTip(); });
  document.addEventListener("focusin", e => { const t = e.target.closest(".tnode,.itm"); if (t) showTip(t); });
  document.addEventListener("focusout", e => { if (e.target.closest(".tnode,.itm")) hideTip(); });
  document.addEventListener("click", e => {
    const t = e.target.closest(".tnode,.itm");
    if (t) { e.preventDefault(); showTip(t); } else hideTip();
  });
  addEventListener("scroll", hideTip, { passive: true });

  function talentTrees(c) {
    const T = c.snapshot && c.snapshot.talents, trees = T && window.TREES[T.tree];
    if (!trees) return "";
    const ranks = T.ranks || {};
    const best = trees.slice().sort((a, b) => (T.points[b.key] || 0) - (T.points[a.key] || 0))[0].key;
    const sel = ls.get("wowj.tree." + c.id) || best;
    const tabs = '<div class="tabs">' + trees.map(tr => '<button data-tree="' + tr.key + '" data-c="' + c.id + '" aria-pressed="' + (tr.key === sel) + '">' +
      esc(tr.name) + " " + (T.points[tr.key] != null ? T.points[tr.key] : "?") + "</button>").join("") + "</div>";
    const html = tabs + trees.filter(tr => tr.key === sel).map(tr => {
      const known = T.points[tr.key] != null;
      const nodes = tr.nodes.map(n => {
        const [r, col, max, name, desc] = n;
        const have = ranks[name] || 0;
        const label = known ? have + "/" + max : "?/" + max;
        const cls = known ? (have >= max ? "full" : have > 0 ? "part" : "none") : "unk";
        return '<button type="button" class="tnode ' + cls + '" style="grid-row:' + (r + 1) + ";grid-column:" + (col + 1) +
          '" data-name="' + esc(name) + '" data-rank="Ранг ' + esc(label) + '" data-desc="' + esc(desc) + '" aria-label="' +
          esc(name + ", " + label) + '"><span class="tglyph">' + esc(name.split(/\s+/).map(w => w[0]).join("").slice(0, 2)) +
          '</span><span class="trank">' + esc(label) + "</span></button>";
      }).join("");
      return '<div class="ttree"><div class="ttree-h">' + esc(tr.name) + ' <span class="sub">' +
        (known ? T.points[tr.key] + " очков" : "не подтверждено") + '</span></div><div class="tgrid">' + nodes + "</div></div>";
    }).join("");
    return '<details class="talents" open><summary>Таланты</summary><div class="ttrees">' + html +
      '</div><p class="sub">Наведи или нажми на талант. Описания на английском, как в игре.</p></details>';
  }

  /* ---------- расчеты (из базы знаний kb.js) ---------- */
  const faction = c => (RACES[c.race] && RACES[c.race].f) || "H";
  function zonesFor(c) {
    const L = c.level, f = faction(c);
    return ZONES.filter(z => (z[3] === "*" || z[3] === f) && L >= z[1] && L <= z[2]).map(z => {
      const pos = (L - z[1]) / (z[2] - z[1]);
      let name = z[0]; if (name.startsWith("Стартовая") && RACES[c.race]) name = RACES[c.race].start + " (стартовая зона)";
      return { name, min: z[1], max: z[2], hint: pos < 0.34 ? "самое время заходить" : pos < 0.75 ? "основная зона" : "добивать желтые квесты" };
    }).sort((a, b) => b.min - a.min);
  }
  const dungeonsFor = c => DUNGEONS.filter(d => c.level >= d[1] - 1 && c.level <= d[2]);
  const milesFor = c => { const f = faction(c); return MILES.filter(m => (!m[2] || m[2] === c.cls) && (!m[3] || m[3] === f)).sort((a, b) => a[1] - b[1]); };
  const doneKey = c => "wowj.done." + c.id;

  function assess(c) {
    const checks = [], s = c.snapshot;
    if (s) {
      const d = s.ilvl - c.level;
      checks.push({ k: d >= -4 ? "good" : d >= -8 ? "warn" : "bad", t: "Средний уровень предметов " + s.ilvl + " при " + c.level + " уровне" });
      const weak = s.gear.filter(g => g[1] && g[2] && g[2] <= c.level - 8).map(g => SLOT_RU[g[0]].toLowerCase());
      if (weak.length) checks.push({ k: "warn", t: "Отстают: " + weak.join(", ") });
      const empty = s.gear.filter(g => !g[1]).map(g => SLOT_RU[g[0]].toLowerCase());
      if (empty.length) checks.push({ k: "bad", t: "Пусто: " + empty.join(", ") });
      const T = s.talents;
      if (T) { const sum = Object.values(T.points).reduce((a, b) => a + (b || 0), 0), exp = Math.max(0, c.level - 9);
        if (sum < exp && Object.values(T.points).every(v => v != null)) checks.push({ k: "warn", t: "Не потрачено талантов: " + (exp - sum) });
        else if (sum < exp) checks.push({ k: "warn", t: "Таланты: видно " + sum + " из " + exp + ", проверь в игре" }); }
    }
    const pn = (c.professions || []).filter(p => (window.PRIMARY || []).includes(p)).length;
    if (c.level >= 5 && pn < 2) checks.push({ k: "warn", t: pn ? "Свободен слот второй основной профессии" : "Основные профессии не указаны" });
    const done = ls.get(doneKey(c)) || {}, ms = milesFor(c).filter(m => m[1] <= c.level), n = ms.filter(m => done[m[0]]).length;
    return { checks, n, total: ms.length, pct: ms.length ? Math.round(n / ms.length * 100) : 0 };
  }

  /* ---------- разделы ---------- */
  function headerCard(c) {
    const cl = CLASSES[c.cls] || { ru: c.cls, color: "#888" }, s = c.snapshot;
    let h = '<section class="panel"><div class="head"><div><div class="name">' + ico(c.cls, cl.color, "big") + "<span>" +
      esc(c.first + " " + c.last) + '<div class="sub" style="font-family:var(--body)">игрок: ' + esc(c.owner) + "</div></span></div>" +
      '<div class="row" style="margin-top:8px"><span class="tag" style="border-color:' + cl.color + ';color:var(--ink)">' + esc(cl.ru) + "</span>" +
      '<span class="tag">' + esc((RACES[c.race] || {}).ru || "") + '</span><span class="tag">' + esc(c.region.toUpperCase() + " · " + c.rules) + "</span></div></div>" +
      '<div class="lvl"><b>' + c.level + "</b></div></div>";
    h += s ? '<p class="sub">Снимок armory от ' + esc(s.date) + " · GearScore " + s.gs + " · средний уровень предметов " + s.ilvl +
      (c.armory ? ' · <a href="' + esc(c.armory) + '" target="_blank" rel="noopener">armory</a>' : "") + "</p>"
      : '<p class="sub">Снимка armory пока нет: профиль появляется с 10 уровня после выхода из игры, данные журнала вписаны вручную.</p>';
    return h + "</section>";
  }
  function gearCard(c) {
    const s = c.snapshot; if (!s) return "";
    const rows = s.gear.map(g => '<li class="slot"><span class="slot-n">' + SLOT_RU[g[0]] + "</span>" + item(g[1]) +
      (g[2] ? '<span class="rng">' + g[2] + "</span>" : "") + "</li>").join("");
    const st = s.stats, stat = (l, v) => '<div class="stat"><span>' + l + "</span><b>" + v + "</b></div>";
    return '<section class="panel"><h2>' + sic("gear") + 'Экипировка</h2><ul class="gear-list">' + rows + "</ul>" +
      '<div class="stats">' + stat("Здоровье", st.hp) + stat("Сила", st.str) + stat("Ловкость", st.agi) + stat("Выносливость", st.sta) +
      stat("Интеллект", st.int) + stat("Дух", st.spi) + stat("Броня", st.armor) + stat("Сила атаки", st.ap) +
      (st.crit ? stat("Крит", st.crit) : "") + (st.dps ? stat("Урон в сек.", st.dps) : "") + "</div>" + talentTrees(c) + "</section>";
  }
  function assessCard(c) {
    const a = assess(c);
    return '<section class="panel"><h2>' + sic("assess") + 'Оценка состояния</h2><div class="row"><span class="score">' + a.n + " из " + a.total +
      '</span><span class="sub">вех к ' + c.level + ' уровню отмечено</span></div><div class="meter"><i style="width:' + a.pct + '%"></i></div>' +
      (a.checks.length ? '<div class="row">' + a.checks.map(x => '<span class="tag ' + x.k + '">' + esc(x.t) + "</span>").join("") + "</div>" : "") +
      '<p class="sub">Отметки вех хранятся только в твоем браузере.</p></section>';
  }
  function targetsCard(c) {
    const t = (window.TARGETS || []).filter(x => x[0] === c.cls && c.level >= x[1] - 2 && c.level <= x[2]);
    if (!t.length) return "";
    const worn = new Set(((c.snapshot && c.snapshot.gear) || []).map(g => g[1]));
    return '<section class="panel"><h2>' + sic("build") + 'Что добыть сейчас</h2><ul class="list">' + t.map(x =>
      '<li><span><span class="sub">' + esc(x[3]) + "</span><br>" + item(x[4]) + (worn.has(x[4]) ? ' <span class="tag good">надето</span>' : "") +
      '<br><span class="sub">' + esc(x[5]) + '</span></span><span class="rng">' + x[1] + "–" + x[2] + "</span></li>").join("") + "</ul></section>";
  }
  function whereCard(c) {
    const zs = zonesFor(c), ds = dungeonsFor(c);
    return '<section class="panel"><h2>' + sic("map") + "Где качаться на " + c.level + '</h2><ul class="list">' +
      zs.map(z => "<li><span><b>" + esc(z.name) + '</b><br><span class="sub">' + esc(z.hint) + '</span></span><span class="rng">' + z.min + "–" + z.max + "</span></li>").join("") +
      "</ul><h3>Подземелья</h3>" + (ds.length ? '<ul class="list">' + ds.map(d => "<li><span>" + esc(d[0]) + '<br><span class="sub">' + esc(d[3]) +
      '</span></span><span class="rng">' + d[1] + "–" + d[2] + "</span></li>").join("") + "</ul>" : '<p class="sub">Первое подземелье с 13 уровня.</p>') + "</section>";
  }
  function milesCard(c) {
    const all = milesFor(c), done = ls.get(doneKey(c)) || {};
    const now = all.filter(m => m[1] <= c.level), next = all.filter(m => m[1] > c.level).slice(0, 3);
    return '<section class="panel"><h2>' + sic("quest") + "Квесты и вехи</h2>" +
      now.map(m => '<label class="chk"><input type="checkbox" data-ms="' + m[0] + '" data-c="' + c.id + '" id="ms_' + c.id + "_" + m[0] + '" ' + (done[m[0]] ? "checked" : "") +
        '><span class="' + (done[m[0]] ? "done" : "") + '">' + linkify(m[4]) + ' <span class="rng">с ' + m[1] + "</span></span></label>").join("") +
      (next.length ? '<h3>Дальше</h3><ul class="list">' + next.map(m => "<li><span>" + linkify(m[4]) + '</span><span class="rng">с ' + m[1] + "</span></li>").join("") + "</ul>" : "") + "</section>";
  }
  function buildCard(c) {
    const B = BUILDS[c.cls];
    if (!B) return '<section class="panel"><h2>Билд</h2><p class="note">Гайд по этому классу еще не собран.</p></section>';
    const keys = Object.keys(B.specs || {}), sp = (ls.get("wowj.spec." + c.id)) || (B.specs[c.spec] ? c.spec : keys[0]);
    let h = '<section class="panel"><h2>' + sic("build") + "Билд</h2><p>" + linkify(B.intro) + "</p>";
    if (keys.length) {
      const S = B.specs[sp] || B.specs[keys[0]];
      h += '<div class="tabs">' + keys.map(k => '<button data-spec="' + k + '" data-c="' + c.id + '" aria-pressed="' + (k === sp) + '">' + esc(B.specs[k].name) + "</button>").join("") + "</div>" +
        '<ul class="list">' + S.steps.map(st => { const cur = c.level >= st[0] && c.level <= st[1];
          return '<li class="' + (cur ? "cur" : "") + '"><span>' + esc(st[2]) + '</span><span class="rng">' + (st[0] === st[1] ? st[0] : st[0] + "–" + st[1]) + "</span></li>"; }).join("") +
        '</ul><p class="sub">Итог к 60: ' + esc(S.final) + ".</p>";
    }
    h += "<h3>Как играть</h3><p>" + linkify(B.play) + "</p></section>";
    h += '<section class="panel"><h2>' + sic("gear") + 'Экипировка по уровням</h2><ul class="list">' + B.gear.map(g => { const cur = c.level >= g[0] && c.level <= g[1];
      return '<li class="' + (cur ? "cur" : "") + '"><span>' + linkify(g[2]) + '</span><span class="rng">' + g[0] + "–" + g[1] + "</span></li>"; }).join("") + "</ul></section>";
    return h;
  }

  function charView(c) {
    return headerCard(c) + assessCard(c) + gearCard(c) + targetsCard(c) + whereCard(c) + milesCard(c) + buildCard(c) +
      (window.profSection ? window.profSection(c) : "");
  }

  function planView() {
    const P = window.PLAN;
    let h = '<section class="panel"><h2>' + sic("map") + esc(P.title) + "</h2><p>" + esc(P.intro) + "</p>" +
      '<h3>Собрать квесты перед выходом</h3><ul class="list">' + P.pickup.map(p => "<li><span><b>" + esc(p[2]) + '</b><br><span class="sub">' +
        esc(p[1] + " · " + p[0]) + '</span></span><span class="tag">' + esc(p[3]) + "</span></li>").join("") + "</ul></section>";
    P.steps.forEach((s, i) => {
      h += '<section class="panel" id="plan-' + s.key + '"><h2><span class="stepn">' + (i + 1) + "</span>" + esc(s.name) + '</h2><div class="row"><span class="tag">' + esc(s.lvl) + "</span></div>" +
        "<p>" + esc(s.where) + '</p><p class="sub">Боссы: ' + esc(s.bosses) + "</p>";
      if (s.attune) h += '<h3>Доступ: ключ канализации</h3><ol class="steps">' + s.attune.map(a => "<li>" + esc(a) + "</li>").join("") + "</ol>";
      h += '<h3>Квесты</h3><ul class="list">' + s.quests.map(q => "<li><span><b>" + esc(q[0]) + '</b> <span class="sub">· ' + esc(q[1]) +
        "</span><br>" + esc(q[2]) + '<br><span class="sub">Награда: ' + linkify(q[3]) + "</span></span></li>").join("") + "</ul>";
      h += '<h3>Что выбить паладину</h3><ul class="list">' + s.loot.map(l => "<li><span>" + item(l[0]) + ' <span class="sub">· ' + esc(l[1]) +
        "</span><br>" + linkify(l[2]) + "</span></li>").join("") + "</ul>";
      if (s.tips) h += '<p class="note">' + linkify(s.tips) + "</p>";
      h += "</section>";
    });
    return h;
  }

  /* ---------- навигация ---------- */
  function route() {
    const hash = location.hash.replace("#", "");
    const chars = window.CHARS;
    const cur = hash === "plan" ? "plan" : (chars.find(c => "c-" + c.id === hash) ? hash : "c-" + chars[0].id);
    const nav = chars.map(c => { const k = CLASSES[c.cls] || { color: "#888" };
      return '<a class="chip" href="#c-' + c.id + '" aria-current="' + ("c-" + c.id === cur) + '">' + ico(c.cls, k.color) + esc(c.first + " " + c.last) +
        ' <span class="sub">' + c.level + "</span></a>"; }).join("") +
      '<a class="chip" href="#plan" aria-current="' + (cur === "plan") + '">' + sic("map") + "План подземелий</a>";
    $("#nav").innerHTML = nav;
    const c = chars.find(x => "c-" + x.id === cur);
    $("#app").innerHTML = cur === "plan" ? planView() : charView(c);
    refreshTooltips();
  }
  document.addEventListener("change", e => {
    const t = e.target;
    if (t.dataset && t.dataset.ms) { const c = window.CHARS.find(x => x.id === t.dataset.c), d = ls.get(doneKey(c)) || {};
      if (t.checked) d[t.dataset.ms] = true; else delete d[t.dataset.ms]; ls.set(doneKey(c), d); route(); }
  });
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-spec]");
    if (b) { ls.set("wowj.spec." + b.dataset.c, b.dataset.spec); route(); }
    const tb = e.target.closest("[data-tree]");
    if (tb) { ls.set("wowj.tree." + tb.dataset.c, tb.dataset.tree); route(); }
  });
  addEventListener("hashchange", () => { route(); scrollTo({ top: 0 }); });

  const srcs = (typeof SOURCES !== "undefined" ? SOURCES : []).concat([["timesaver.gg: вещи по уровням", "https://timesaver.gg/tools/wow-forever/leveling-gear"],
    ["Warcraft Tavern: квесты подземелий", "https://www.warcrafttavern.com/forever/guides/dungeons/"], ["Method: гайды подземелий", "https://www.method.gg/wow-forever/dungeons/city-of-dalaran"]]);
  $("#foot").innerHTML = "<span>Источники: " + srcs.map(s => '<a href="' + s[1] + '" target="_blank" rel="noopener">' + esc(s[0]) + "</a>").join(" · ") + "</span>" +
    '<span>Характеристики предметов — armory wow-classic-premium.com и подсказки Wowhead. Деревья и описания талантов — WoW Forever (CC BY 4.0) через <a href="https://wow-classic-premium.com/en/forever/armory" target="_blank" rel="noopener">wow-classic-premium.com</a>.</span>' +
    "<span>Фан-страница, не связана с Blizzard Entertainment. Обновлено 14.11.2026.</span>";
  route();
})();
