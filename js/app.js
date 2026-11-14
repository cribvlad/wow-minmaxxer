/* WoW Minmaxxer — журнал пати в WoW Forever. Статичный сайт на GitHub Pages, данные в /data обновляет бот. */
(function () {
  const VERSION = "0.3.0";
  const REPO = "https://github.com/cribvlad/wow-minmaxxer";
  const KB = window.KB, PLAN = window.PLAN;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ls = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const st = { roster: [], chars: {}, items: {}, meta: {}, loaded: false, error: null };
  const SLOT_RU = { head: "Голова", neck: "Шея", shoulder: "Плечи", back: "Спина", chest: "Грудь", wrist: "Запястья", hands: "Кисти",
    waist: "Пояс", legs: "Ноги", feet: "Ступни", finger1: "Кольцо", finger2: "Кольцо", finger: "Кольцо", trinket1: "Аксессуар",
    trinket2: "Аксессуар", mainhand: "Оружие", offhand: "Левая рука", ranged: "Дальний бой" };
  const date = iso => { if (!iso) return "—"; const d = new Date(iso); return isNaN(d) ? iso : d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }) + ", " + d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }); };

  /* ---------- названия и предметы ---------- */
  const ruOf = it => it && it.ru && !/^\[/.test(it.ru) && it.ru !== it.en ? it.ru : null;
  function itemChip(id, fallbackName) {
    const it = st.items[id];
    if (!it) return '<span class="itm-plain">' + esc(fallbackName || "предмет #" + id) + "</span>";
    const ru = ruOf(it);
    return '<button type="button" class="itm q' + (it.q ?? 0) + '" data-iid="' + id + '">' + esc(it.en) +
      (ru ? ' <span class="ru">(' + esc(ru) + ")</span>" : "") + "</button>";
  }
  function fmt(text) {
    return esc(text).replace(/\{\{([^}]+)\}\}/g, (m, n) => esc(window.w(n.replace(/&#39;/g, "'").replace(/&amp;/g, "&"))))
      .replace(/\[\[(\d+)\]\]/g, (m, id) => itemChip(+id));
  }
  function itemLines(id) { const it = st.items[id]; return it ? it.lines || [] : []; }
  function itemIlvl(id) { const l = itemLines(id).find(x => /^Item Level \d+/.test(x.t)); return l ? +l.t.match(/\d+/)[0] : null; }

  /* ---------- всплывающие карточки ---------- */
  const tip = document.createElement("div");
  tip.className = "tt"; tip.setAttribute("role", "tooltip"); tip.hidden = true; document.body.appendChild(tip);
  function tipHtml(el) {
    if (el.dataset.iid) {
      const it = st.items[el.dataset.iid] || {};
      return '<div class="tt-name q' + (it.q ?? 0) + '">' + esc(it.en) + "</div>" + (ruOf(it) ? '<div class="tt-ru">' + esc(ruOf(it)) + "</div>" : "") +
        (it.lines || []).map(l => '<div class="' + (l.c === "q2" ? "tt-fx" : /^(Dropped by|Drop Chance|Item Level)/.test(l.t) ? "tt-dim" : "tt-line") + '">' + esc(l.t) + "</div>").join("");
    }
    return '<div class="tt-name">' + esc(el.dataset.name) + '</div><div class="tt-dim">' + esc(el.dataset.rank) + '</div><div class="tt-desc">' + esc(el.dataset.desc) + "</div>";
  }
  function showTip(el) {
    tip.innerHTML = tipHtml(el); tip.hidden = false;
    const r = el.getBoundingClientRect(), w = Math.min(300, innerWidth - 24);
    tip.style.width = w + "px";
    let x = Math.max(12, Math.min(innerWidth - w - 12, r.left + r.width / 2 - w / 2)), y = r.bottom + 8;
    if (y + tip.offsetHeight > innerHeight - 8) y = Math.max(8, r.top - tip.offsetHeight - 8);
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  const hideTip = () => { tip.hidden = true; };
  const tipTarget = e => e.target.closest && e.target.closest(".tnode,.itm");
  document.addEventListener("mouseover", e => { const t = tipTarget(e); if (t) showTip(t); });
  document.addEventListener("mouseout", e => { if (tipTarget(e)) hideTip(); });
  document.addEventListener("focusin", e => { const t = tipTarget(e); if (t) showTip(t); });
  document.addEventListener("focusout", e => { if (tipTarget(e)) hideTip(); });
  document.addEventListener("click", e => { const t = tipTarget(e); if (t) { e.preventDefault(); showTip(t); } else hideTip(); });
  addEventListener("scroll", hideTip, { passive: true });

  /* ---------- модель персонажа ---------- */
  function model(entry) {
    const c = st.chars[entry.id] || {}, m = entry.manual || {};
    const clsEn = c.cls || m.cls || "";
    const key = Object.keys(KB.CLASSES).find(k => KB.CLASSES[k].en === clsEn) || "";
    return { id: entry.id, entry, data: c, name: c.fullName || (entry.name + " " + entry.surname).trim(), owner: entry.owner,
      level: c.level || m.level || null, clsEn, cls: key, race: c.race || m.race || "", faction: c.faction || "Horde",
      found: c.status === "ok", spec: m.spec, gear: c.gear || [], talents: c.talents || [], stats: c.stats || {}, history: c.history || [] };
  }
  const party = () => st.roster.map(model);

  function changes(ch) {
    const h = ch.history; if (h.length < 2) return [];
    const a = h[h.length - 2], b = h[h.length - 1], out = [];
    if (a.level && b.level && b.level !== a.level) out.push("уровень " + a.level + " → " + b.level);
    if (a.gs && b.gs && b.gs !== a.gs) out.push("GearScore " + a.gs + " → " + b.gs);
    if (a.gear && a.gear.length) {
      const neu = (b.gear || []).filter(id => !a.gear.includes(id));
      if (neu.length) out.push("новое: " + neu.map(id => itemChip(id, (ch.gear.find(g => g.id === id) || {}).name)).join(", "));
    }
    return out;
  }

  /* ---------- рекомендации ---------- */
  function zonesFor(level, faction) {
    const f = faction === "Alliance" ? "A" : "H";
    return KB.ZONES.filter(z => (z[3] === "*" || z[3] === f) && level >= z[1] && level <= z[2]);
  }
  function isTwoHander(ch) {
    const mh = ch.gear.find(g => g.slot === "mainhand");
    return !!(mh && mh.id && itemLines(mh.id).some(l => /Two-Hand/.test(l.t)));
  }
  function upgradesFor(ch, limit) {
    const worn = new Set(ch.gear.map(g => g.id)), slotIl = {}, twoH = isTwoHander(ch);
    ch.gear.forEach(g => { slotIl[g.slot] = g.ilvl || 0; });
    const cur = s => s === "finger" ? Math.min(slotIl.finger1 || 0, slotIl.finger2 || 0) : (slotIl[s] || 0);
    return KB.TARGETS.filter(t => t[0] === ch.cls && ch.level && ch.level >= t[1] - 2 && ch.level <= t[2] && !worn.has(t[4]) && !(twoH && t[3] === "offhand"))
      .map(t => {
        const il = itemIlvl(t[4]) || 0, delta = ch.found ? il - cur(t[3]) : null;
        const score = ch.found ? delta + (t[3] === "mainhand" ? 30 : 0) + (cur(t[3]) && cur(t[3]) <= ch.level - 8 ? 8 : 0) : -Math.abs(t[1] - ch.level);
        return { slot: t[3], id: t[4], where: t[5], delta, score };
      })
      .filter(u => !ch.found || u.delta > 0 || u.slot === "mainhand")
      .sort((a, b) => b.score - a.score).slice(0, limit || 99);
  }
  function nextDungeon(levels) {
    const max = Math.max(...levels), done = ls.get("wmm.plan.done", {});
    return PLAN.steps.find(s => !done[s.key] && max >= s.min - 1) || null;
  }

  /* ---------- общие куски ---------- */
  const card = (title, icon, body, extra) => '<section class="card' + (extra ? " " + extra : "") + '">' + (title ? "<h2>" + (icon ? sic(icon) : "") + esc(title) + "</h2>" : "") + body + "</section>";
  const refreshUrl = REPO + "/issues/new?template=refresh.yml&title=" + encodeURIComponent("[refresh] статусы");
  function refreshBlock() {
    return '<div class="refresh"><span class="sub">Данные обновлены ' + esc(date(st.meta.updated)) + '. Бот перечитывает armory каждые 6 часов.</span>' +
      '<a class="btn primary" href="' + refreshUrl + '" target="_blank" rel="noopener">' + sic("refresh") + "Обновить статусы</a></div>";
  }
  function charBadge(ch) {
    const k = KB.CLASSES[ch.cls] || { color: "#777" };
    return ico(ch.cls, k.color);
  }

  /* ---------- главная: сводка ---------- */
  function homeView() {
    const P = party();
    if (!P.length) return card("Пати пуста", "users", '<p>Добавь первого персонажа во вкладке «Состав».</p>');
    const levels = P.filter(c => c.level).map(c => c.level);
    let h = refreshBlock();
    h += '<div class="party">' + P.map(ch => {
      const ch2 = changes(ch), k = KB.CLASSES[ch.cls] || {};
      return '<a class="pcard" href="#c/' + ch.id + '">' + charBadge(ch) + '<div class="pmain"><div class="pname">' + esc(ch.name) +
        '</div><div class="sub">' + esc(window.w(ch.clsEn || "?")) + " · " + esc(ch.owner || "") + '</div></div><div class="plevel">' + (ch.level || "?") + "</div>" +
        '<div class="pfoot">' + (ch.found ? "GS " + (ch.data.gs ?? "—") + " · проверено " + esc(date(ch.data.checked)) : '<span class="warn">нет в armory, уровень вписан вручную</span>') +
        (ch2.length ? '<div class="pchg">' + ch2.join(" · ") + "</div>" : "") + "</div></a>";
    }).join("") + "</div>";

    if (levels.length) {
      const lo = Math.min(...levels), hi = Math.max(...levels), gap = hi - lo;
      let zh;
      if (gap <= 8) {
        const zs = KB.ZONES.filter(z => z[3] !== "A" && z[0] !== "Starting zone" && z[1] <= lo + 2 && z[2] >= hi - 1);
        zh = zs.length ? '<ul class="rows">' + zs.map(z => '<li><b>' + esc(window.w(z[0])) + '</b><span class="rng">' + z[1] + "–" + z[2] + "</span></li>").join("") + "</ul>"
          : '<p class="sub">Общей зоны под весь разброс уровней нет.</p>';
      } else {
        zh = '<p class="note">Разрыв ' + gap + " уровней: качаться вместе выйдет только в подземельях. По отдельности:</p>" +
          '<ul class="rows">' + P.filter(c => c.level).map(c => { const z = zonesFor(c.level, c.faction).filter(x => x[0] !== "Starting zone").slice(-2);
            return "<li><span>" + esc(c.name) + '</span><span class="sub">' + esc(z.map(x => window.w(x[0])).join(", ") || "стартовая зона") + "</span></li>"; }).join("") + "</ul>";
      }
      const nd = nextDungeon(levels);
      const fits = nd ? P.filter(c => c.level && c.level >= nd.min - 2 && c.level <= nd.max) : [];
      const ndh = nd ? '<p><b>' + esc(nd.name) + '</b> <span class="rng">' + nd.min + "–" + nd.max + '</span></p><p class="sub">' + fmt(nd.where) + "</p>" +
        '<p class="sub">Подходит: ' + (fits.map(c => esc(c.name)).join(", ") || "пока никому по уровню") + '. <a href="#plan/' + nd.key + '">Квесты и добыча →</a></p>'
        : '<p class="sub">План подземелий пройден или пати пока слишком низкого уровня.</p>';
      const rows = P.flatMap(ch => upgradesFor(ch, 3).map(u => ({ ch, u })));
      const ih = rows.length ? '<ul class="loot">' + rows.map(({ ch, u }) =>
        "<li>" + slotIco(u.slot, (st.items[u.id] || {}).q) + '<div class="lmain">' + itemChip(u.id) + '<div class="sub">' + esc(SLOT_RU[u.slot] || u.slot) +
        (u.delta > 0 ? " · +" + u.delta + " к уровню предмета" : "") + '</div></div><div class="lwho">' + charBadge(ch) + esc(ch.name.split(" ")[0]) +
        '</div><div class="lwhere sub">' + fmt(u.where) + "</div></li>").join("") + "</ul>"
        : '<p class="sub">Для текущих уровней целей пока нет.</p>';
      h += '<div class="grid2">' + card("Где качаться", "map", zh) + card("Следующее подземелье", "quest", ndh) + "</div>";
      h += card("Самое полезное из добычи", "gear", ih);
    }
    return h;
  }

  /* ---------- персонаж ---------- */
  const TABS = [["overview", "Обзор"], ["gear", "Экипировка"], ["talents", "Таланты"], ["level", "Кач"], ["build", "Билд"], ["prof", "Профессии"]];
  function selector(cur) {
    const P = party();
    return '<div class="selector"><label for="charSel" class="sr">Персонаж</label><select id="charSel">' +
      P.map(c => '<option value="' + c.id + '"' + (c.id === cur ? " selected" : "") + ">" + esc(c.name + " · " + (c.level || "?") + " · " + window.w(c.clsEn || "?")) + "</option>").join("") +
      '</select><div class="chips">' + P.map(c => '<a class="chip" href="#c/' + c.id + '" aria-current="' + (c.id === cur) + '">' + charBadge(c) + esc(c.name.split(" ")[0]) + "</a>").join("") + "</div></div>";
  }
  function assess(ch) {
    const out = [];
    if (ch.found) {
      if (ch.data.ilvl) { const d = ch.data.ilvl - ch.level; out.push([d >= -4 ? "good" : d >= -8 ? "warn" : "bad", "Средний уровень предметов " + ch.data.ilvl]); }
      const weak = ch.gear.filter(g => g.id && g.ilvl && g.ilvl <= ch.level - 8).map(g => SLOT_RU[g.slot].toLowerCase());
      if (weak.length) out.push(["warn", "Отстают: " + weak.join(", ")]);
      const empty = ch.gear.filter(g => !g.id && !["offhand", "ranged"].includes(g.slot)).map(g => SLOT_RU[g.slot].toLowerCase());
      if (empty.length) out.push(["bad", "Пусто: " + empty.join(", ")]);
      const known = ch.talents.filter(t => t.points != null).reduce((a, t) => a + t.points, 0), exp = Math.max(0, ch.level - 9);
      if (ch.talents.length && known < exp) out.push(["warn", "Таланты: видно " + known + " из " + exp]);
    } else out.push(["warn", "Персонажа пока нет в armory: профиль появляется с 10 уровня после выхода из игры"]);
    return out;
  }
  function tabOverview(ch) {
    const k = KB.CLASSES[ch.cls] || { color: "#777" };
    let h = card(null, null, '<div class="chead">' + ico(ch.cls, k.color, "big") + '<div><div class="cname">' + esc(ch.name) + '</div><div class="sub">' +
      esc([window.w(ch.clsEn || "?"), window.w(ch.race), window.w(ch.faction), (ch.entry.region || "").toUpperCase(), "игрок: " + (ch.owner || "—")].filter(Boolean).join(" · ")) +
      '</div></div><div class="lvl">' + (ch.level || "?") + "</div></div>" +
      '<div class="tags">' + assess(ch).map(a => '<span class="tag ' + a[0] + '">' + esc(a[1]) + "</span>").join("") + "</div>" +
      '<p class="sub">' + (ch.found ? "Armory проверен " + esc(date(ch.data.checked)) + ' · <a href="' + esc(ch.data.url) + '" target="_blank" rel="noopener">открыть armory</a>' : "Последняя проверка " + esc(date(ch.data.fetched))) +
      (changes(ch).length ? "<br>Изменения: " + changes(ch).join(" · ") : "") + "</p>");
    const ups = upgradesFor(ch, 8);
    h += card("Что добыть сейчас", "build", ups.length ? '<ul class="loot">' + ups.map(u => "<li>" + slotIco(u.slot, (st.items[u.id] || {}).q) + '<div class="lmain">' + itemChip(u.id) +
      '<div class="sub">' + esc(SLOT_RU[u.slot] || u.slot) + (u.delta > 0 ? " · +" + u.delta + " к уровню предмета" : "") + '</div></div><div class="lwhere sub">' + fmt(u.where) + "</div></li>").join("") + "</ul>"
      : '<p class="sub">Для этого уровня и класса целей пока нет.</p>');
    return h;
  }
  function tabGear(ch) {
    if (!ch.found) return card("Экипировка", "gear", '<p class="sub">Появится, когда персонаж будет в armory.</p>');
    const twoH = isTwoHander(ch);
    const rows = ch.gear.filter(g => g.id || !(g.slot === "ranged" || (g.slot === "offhand" && twoH))).map(g => '<li class="slot">' + slotIco(g.slot, g.q) + '<span class="slot-n">' + esc(SLOT_RU[g.slot] || g.slot) + "</span>" +
      (g.id ? itemChip(g.id, g.name) : '<span class="empty">пусто</span>') + (g.ilvl ? '<span class="rng">' + g.ilvl + "</span>" : "") + "</li>").join("");
    const S = ch.stats, keys = [["Health", "Здоровье"], ["Strength", "Сила"], ["Agility", "Ловкость"], ["Stamina", "Выносливость"], ["Intellect", "Интеллект"],
      ["Spirit", "Дух"], ["Armor", "Броня"], ["Attack power", "Сила атаки"], ["Melee critical strike", "Крит"], ["Main-hand DPS", "Урон в сек."]];
    return card("Экипировка", "gear", '<ul class="gear">' + rows + "</ul>") +
      card("Характеристики", null, '<div class="stats">' + keys.filter(k => S[k[0]]).map(k => '<div class="stat"><span>' + k[1] + "</span><b>" + esc(S[k[0]]) + "</b></div>").join("") + "</div>");
  }
  function tabTalents(ch) {
    if (!ch.talents.length) return card("Таланты", "build", '<p class="sub">Дерево появится вместе с данными из armory.</p>');
    const best = ch.talents.slice().sort((a, b) => (b.points || 0) - (a.points || 0))[0].name;
    const sel = ls.get("wmm.tree." + ch.id, best), tr = ch.talents.find(t => t.name === sel) || ch.talents[0];
    const nodes = tr.nodes.map(n => { const known = n.rank != null, label = (known ? n.rank : "?") + "/" + n.max;
      const cls = !known ? "unk" : n.rank >= n.max ? "full" : n.rank > 0 ? "part" : "none";
      return '<button type="button" class="tnode ' + cls + '" style="grid-row:' + (n.r + 1) + ";grid-column:" + (n.c + 1) + '" data-name="' + esc(n.name) +
        '" data-rank="Ранг ' + esc(label) + '" data-desc="' + esc(n.desc) + '" aria-label="' + esc(n.name + ", " + label) + '"><span class="tglyph">' +
        esc(n.name.split(/\s+/).map(x => x[0]).join("").slice(0, 2)) + '</span><span class="trank">' + esc(label) + "</span></button>"; }).join("");
    return card("Таланты", "build", '<div class="seg">' + ch.talents.map(t => '<button data-tree="' + esc(t.name) + '" data-c="' + ch.id + '" aria-pressed="' + (t === tr) + '">' +
      esc(window.w(t.name)) + " · " + (t.points ?? "?") + "</button>").join("") + '</div><div class="tgrid">' + nodes +
      '</div><p class="sub">Нажми на талант, чтобы прочитать описание. Описания — на английском, как в игре; распределение «?» armory не подтверждает.</p>');
  }
  function tabLevel(ch) {
    if (!ch.level) return card("Кач", "map", '<p class="sub">Уровень неизвестен.</p>');
    const zs = zonesFor(ch.level, ch.faction).map(z => z[0] === "Starting zone" ? [KB.STARTS[ch.race] || "Starting zone", z[1], z[2]] : z);
    const ds = KB.DUNGEONS.filter(d => ch.level >= d[1] - 1 && ch.level <= d[2]);
    const done = ls.get("wmm.done." + ch.id, {});
    const miles = KB.MILES.filter(m => (!m[2] || m[2] === ch.cls) && (!m[3] || m[3] === (ch.faction === "Alliance" ? "A" : "H"))).sort((a, b) => a[1] - b[1]);
    const now = miles.filter(m => m[1] <= ch.level), next = miles.filter(m => m[1] > ch.level).slice(0, 3);
    return '<div class="grid2">' + card("Зоны", "map", '<ul class="rows">' + zs.map(z => "<li><b>" + esc(window.w(z[0])) + '</b><span class="rng">' + z[1] + "–" + z[2] + "</span></li>").join("") + "</ul>") +
      card("Подземелья", "quest", ds.length ? '<ul class="rows">' + ds.map(d => "<li><span><b>" + esc(window.w(d[0])) + '</b><br><span class="sub">' + esc(window.w(d[3])) + '</span></span><span class="rng">' + d[1] + "–" + d[2] + "</span></li>").join("") + "</ul>" : '<p class="sub">Первое подземелье с 13 уровня.</p>') + "</div>" +
      card("Вехи", "quest", now.map(m => '<label class="chk"><input type="checkbox" data-ms="' + m[0] + '" data-c="' + ch.id + '"' + (done[m[0]] ? " checked" : "") + '><span class="' + (done[m[0]] ? "done" : "") + '">' + fmt(m[4]) + ' <span class="rng">' + m[1] + "</span></span></label>").join("") +
        (next.length ? '<h3>Дальше</h3><ul class="rows">' + next.map(m => "<li><span>" + fmt(m[4]) + '</span><span class="rng">' + m[1] + "</span></li>").join("") + "</ul>" : "") +
        '<p class="sub">Отметки хранятся только в твоем браузере.</p>');
  }
  function tabBuild(ch) {
    const B = KB.BUILDS[ch.cls];
    if (!B) return card("Билд", "build", '<p class="note">Гайд для этого класса еще не собран. Напиши Claude в чате проекта, он добавит.</p>');
    const keys = Object.keys(B.specs), sp = ls.get("wmm.spec." + ch.id, B.specs[ch.spec] ? ch.spec : keys[0]), S = B.specs[sp] || B.specs[keys[0]];
    return card("Билд", "build", "<p>" + fmt(B.intro) + '</p><div class="seg">' + keys.map(k => '<button data-spec="' + k + '" data-c="' + ch.id + '" aria-pressed="' + (B.specs[k] === S) + '">' + esc(window.w(B.specs[k].name)) + "</button>").join("") + "</div>" +
      '<ul class="rows">' + S.steps.map(s => '<li class="' + (ch.level >= s[0] && ch.level <= s[1] ? "cur" : "") + '"><span>' + fmt(s[2]) + '</span><span class="rng">' + (s[0] === s[1] ? s[0] : s[0] + "–" + s[1]) + "</span></li>").join("") + "</ul>" +
      '<p class="sub">К 60: ' + esc(S.final) + "</p>") + card("Как играть", null, "<p>" + fmt(B.play) + "</p>");
  }
  function tabProf(ch) {
    const B = KB.BUILDS[ch.cls], have = ch.entry.professions || [];
    return card("Профессии", null, (B ? "<p>" + fmt(B.prof) + "</p>" : "") +
      "<h3>Основные (две)</h3>" + '<ul class="rows">' + KB.PROF.primary.map(p => '<li class="' + (have.includes(p) ? "cur" : "") + '"><span><b>' + esc(window.w(p)) + '</b><br><span class="sub">' + esc(KB.PROF.info[p]) + "</span></span></li>").join("") + "</ul>" +
      "<h3>Вторичные (все три)</h3>" + '<ul class="rows">' + KB.PROF.secondary.map(p => "<li><span><b>" + esc(window.w(p)) + '</b><br><span class="sub">' + esc(KB.PROF.info[p]) + "</span></span></li>").join("") + "</ul>");
  }
  function charView(id, tab) {
    const entry = st.roster.find(r => r.id === id) || st.roster[0];
    if (!entry) return card("Нет персонажей", "users", "<p>Добавь персонажа во вкладке «Состав».</p>");
    const ch = model(entry), t = TABS.find(x => x[0] === tab) ? tab : "overview";
    const body = { overview: tabOverview, gear: tabGear, talents: tabTalents, level: tabLevel, build: tabBuild, prof: tabProf }[t](ch);
    return selector(ch.id) + '<nav class="tabs" aria-label="Разделы">' + TABS.map(x => '<a href="#c/' + ch.id + "/" + x[0] + '" aria-current="' + (x[0] === t) + '">' + x[1] + "</a>").join("") + "</nav>" + body;
  }

  /* ---------- план ---------- */
  function planView(open) {
    const done = ls.get("wmm.plan.done", {});
    let h = card(PLAN.title, "map", "<p>" + fmt(PLAN.intro) + "</p>");
    h += '<details class="card fold"' + (open ? "" : " open") + "><summary>Собрать квесты перед выходом</summary>" + '<ul class="rows">' + PLAN.pickup.map(p => "<li><span><b>" + fmt(p[2]) + '</b><br><span class="sub">' + fmt(p[1]) + " · " + fmt(p[0]) + "</span></span></li>").join("") + "</ul></details>";
    PLAN.steps.forEach((s, i) => {
      h += '<details class="card fold" id="plan-' + s.key + '"' + (open === s.key ? " open" : "") + '><summary><span class="stepn">' + (i + 1) + "</span>" + esc(s.name) + ' <span class="rng">' + s.min + "–" + s.max + "</span>" + (done[s.key] ? ' <span class="tag good">пройдено</span>' : "") + "</summary>" +
        "<p>" + fmt(s.where) + '</p><p class="sub">Боссы: ' + esc(s.bosses) + "</p>" +
        (s.attune ? "<h3>Доступ: ключ канализации</h3><ol>" + s.attune.map(a => "<li>" + fmt(a) + "</li>").join("") + "</ol>" : "") +
        '<h3>Квесты</h3><ul class="rows">' + s.quests.map(q => "<li><span><b>" + esc(q[0]) + '</b> <span class="sub">· ' + fmt(q[1]) + "</span><br>" + fmt(q[2]) + '<br><span class="sub">Награда: ' + fmt(q[3]) + "</span></span></li>").join("") + "</ul>" +
        '<h3>Что выбить</h3><ul class="loot">' + s.loot.map(l => "<li>" + (l[0] ? slotIco((st.items[l[0]] || {}).lines ? guessSlot(l[0]) : "trinket", (st.items[l[0]] || {}).q) : slotIco("trinket", 0)) + '<div class="lmain">' + (l[0] ? itemChip(l[0]) : "") + '<div class="sub">' + esc(l[1]) + '</div></div><div class="lwhere sub">' + fmt(l[2]) + "</div></li>").join("") + "</ul>" +
        (s.tips ? '<p class="note">' + fmt(s.tips) + "</p>" : "") +
        '<label class="chk"><input type="checkbox" data-plan="' + s.key + '"' + (done[s.key] ? " checked" : "") + "><span>Пройдено (отметка только в твоем браузере)</span></label></details>";
    });
    return h;
  }
  function guessSlot(id) {
    const l = itemLines(id).map(x => x.t).join(" | ");
    const map = [["Two-Hand", "mainhand"], ["One-Hand", "mainhand"], ["Main Hand", "mainhand"], ["Off Hand", "offhand"], ["Shield", "offhand"], ["Head", "head"], ["Neck", "neck"], ["Shoulder", "shoulder"],
      ["Back", "back"], ["Chest", "chest"], ["Wrist", "wrist"], ["Hands", "hands"], ["Waist", "waist"], ["Legs", "legs"], ["Feet", "feet"], ["Finger", "finger"], ["Trinket", "trinket"]];
    const f = map.find(m => l.includes(m[0])); return f ? f[1] : "trinket";
  }

  /* ---------- состав ---------- */
  function manageView() {
    const P = party();
    const issue = (tpl, params) => REPO + "/issues/new?template=" + tpl + "&" + Object.entries(params).map(([k, v]) => k + "=" + encodeURIComponent(v)).join("&");
    let h = refreshBlock();
    h += card("Состав пати", "users", '<ul class="rows">' + P.map(c => "<li><span>" + charBadge(c) + "<b>" + esc(c.name) + '</b> <span class="sub">' + esc(window.w(c.clsEn || "?")) + " · " + (c.level || "?") + " · " + esc(c.owner || "") + "</span></span>" +
      '<a class="btn" href="' + issue("remove.yml", { title: "[remove] " + c.name, who: c.name }) + '" target="_blank" rel="noopener">Удалить</a></li>').join("") + "</ul>");
    h += card("Добавить персонажа", null, '<form id="addForm" class="form"><label>Имя<input id="fName" required autocomplete="off"></label><label>Фамилия<input id="fSurname" autocomplete="off"></label>' +
      '<label>Регион<select id="fRegion"><option>eu</option><option>us</option></select></label><label>Игрок<input id="fOwner" autocomplete="off" placeholder="чей персонаж"></label>' +
      '<label>Класс <span class="sub">если персонажа нет в armory</span><select id="fCls"><option value="">—</option>' + Object.values(KB.CLASSES).map(c => "<option>" + c.en + "</option>").join("") + "</select></label>" +
      '<label>Уровень <span class="sub">если нет в armory</span><input id="fLevel" type="number" min="1" max="60"></label><button class="btn primary" type="submit">Добавить</button></form>' +
      '<p class="sub">Кнопка откроет заявку на GitHub — останется нажать Create. Бот найдет персонажа в armory, добавит его и обновит сайт за пару минут. ' +
      "Заявки принимаются от участников из списка data/members.json; чтобы друг мог добавлять сам, впиши туда его логин GitHub (или попроси Claude).</p>");
    return h;
  }

  /* ---------- маршрутизация ---------- */
  function render() {
    const parts = location.hash.replace(/^#/, "").split("/");
    const page = parts[0] || "home";
    const nav = [["home", "Сводка", "home"], ["c", "Персонажи", "users"], ["plan", "План подземелий", "map"], ["manage", "Состав", "build"]];
    $("#nav").innerHTML = nav.map(n => '<a href="#' + n[0] + '" aria-current="' + (page === n[0]) + '">' + sic(n[2]) + "<span>" + n[1] + "</span></a>").join("");
    let html;
    if (!st.loaded) html = st.error ? card("Не удалось загрузить данные", null, '<p class="note">' + esc(st.error) + "</p>") : '<p class="sub">Загружаю журнал…</p>';
    else if (page === "c") html = charView(parts[1], parts[2]);
    else if (page === "plan") html = planView(parts[1]);
    else if (page === "manage") html = manageView();
    else html = homeView();
    $("#app").innerHTML = html;
    if (page === "plan" && parts[1]) { const el = document.getElementById("plan-" + parts[1]); el && el.scrollIntoView(); }
  }
  addEventListener("hashchange", () => { render(); if (!/^#plan\//.test(location.hash)) scrollTo({ top: 0 }); });
  document.addEventListener("change", e => {
    const t = e.target;
    if (t.id === "charSel") location.hash = "#c/" + t.value + "/" + ((location.hash.split("/")[2]) || "overview");
    if (t.dataset.ms) { const k = "wmm.done." + t.dataset.c, d = ls.get(k, {}); t.checked ? d[t.dataset.ms] = 1 : delete d[t.dataset.ms]; ls.set(k, d); render(); }
    if (t.dataset.plan) { const d = ls.get("wmm.plan.done", {}); t.checked ? d[t.dataset.plan] = 1 : delete d[t.dataset.plan]; ls.set("wmm.plan.done", d); render(); }
  });
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("[data-spec],[data-tree]");
    if (!b) return;
    if (b.dataset.spec) ls.set("wmm.spec." + b.dataset.c, b.dataset.spec);
    if (b.dataset.tree) ls.set("wmm.tree." + b.dataset.c, b.dataset.tree);
    render();
  });
  document.addEventListener("submit", e => {
    if (e.target.id !== "addForm") return;
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    const p = { title: "[add] " + v("fName") + " " + v("fSurname"), name: v("fName"), surname: v("fSurname"), region: v("fRegion"), owner: v("fOwner"), cls: v("fCls"), level: v("fLevel") };
    const url = REPO + "/issues/new?template=add.yml&" + Object.entries(p).filter(([k, x]) => x).map(([k, x]) => k + "=" + encodeURIComponent(x)).join("&");
    const a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove();
  });

  /* ---------- загрузка ---------- */
  const get = (p, v) => fetch(p + "?v=" + encodeURIComponent(v), { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(p + ": " + r.status); return r.json(); });
  $("#foot").innerHTML = "<span>WoW Minmaxxer v" + VERSION + ' · <a href="' + REPO + '" target="_blank" rel="noopener">GitHub</a> · <a href="' + REPO + '/blob/main/CHANGELOG.md" target="_blank" rel="noopener">что нового</a></span>' +
    "<span>Источники: " + KB.SOURCES.map(s => '<a href="' + s[1] + '" target="_blank" rel="noopener">' + esc(s[0]) + "</a>").join(" · ") + "</span>" +
    "<span>Предметы — подсказки Wowhead (en/ru), персонажи и описания талантов — armory wow-classic-premium.com (WoW Forever, CC BY 4.0). Фан-проект, не связан с Blizzard Entertainment.</span>";
  render();
  (async () => {
    try {
      st.meta = await get("data/meta.json", Date.now());
      const v = st.meta.updated || Date.now();
      [st.roster, st.items] = await Promise.all([get("data/roster.json", v), get("data/items.json", v)]);
      const chars = await Promise.all(st.roster.map(r => get("data/characters/" + r.id + ".json", v).catch(() => ({}))));
      st.roster.forEach((r, i) => { st.chars[r.id] = chars[i]; });
      st.loaded = true;
    } catch (e) { st.error = "Проверь соединение и обнови страницу. " + e.message; }
    render();
  })();
})();
