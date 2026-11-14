#!/usr/bin/env python3
"""Сборщик данных WoW Minmaxxer.

Что делает:
  1. Обрабатывает заявку из GitHub issue (добавить / удалить / обновить), если workflow запущен по issue.
  2. Для каждого персонажа из data/roster.json читает его страницу на wow-classic-premium.com
     (страницы персонажей разрешены в robots.txt; служебный lookup/refresh — запрещен, его не трогаем).
  3. Сохраняет снимок в data/characters/<id>.json и ведет историю изменений.
  4. Догружает карточки предметов (английское и русское название, строки подсказки) с nether.wowhead.com
     в data/items.json для надетых вещей и вещей из рекомендаций (data/item_ids.json).

Запуск локально: python scripts/update.py [--only ID] [--no-items]
"""
import json, os, re, sys, time, html, datetime, urllib.parse
from pathlib import Path

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
UA = "wow-minmaxxer/0.3 (+https://cribvlad.github.io/wow-minmaxxer/; party journal, low volume)"
ARMORY = "https://wow-classic-premium.com/en/forever/character/{region}/{name}/{surname}"
WOWHEAD = "https://nether.wowhead.com/forever/tooltip/item/{id}"
S = requests.Session()
S.headers.update({"User-Agent": UA, "Accept-Language": "en"})
NOW = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
QUALITY = {"POOR": 0, "COMMON": 1, "UNCOMMON": 2, "RARE": 3, "EPIC": 4, "LEGENDARY": 5}
SLOT_KEYS = {"HEAD": "head", "NECK": "neck", "SHOULDER": "shoulder", "BACK": "back", "CHEST": "chest", "SHIRT": "shirt",
             "TABARD": "tabard", "WRIST": "wrist", "HANDS": "hands", "WAIST": "waist", "LEGS": "legs", "FEET": "feet",
             "FINGER_1": "finger1", "FINGER_2": "finger2", "TRINKET_1": "trinket1", "TRINKET_2": "trinket2",
             "MAIN_HAND": "mainhand", "OFF_HAND": "offhand", "RANGED": "ranged"}


def load(p, default):
    try:
        return json.loads(Path(p).read_text("utf-8"))
    except Exception:
        return default


def save(p, obj):
    Path(p).parent.mkdir(parents=True, exist_ok=True)
    Path(p).write_text(json.dumps(obj, ensure_ascii=False, indent=1) + "\n", "utf-8")


def slug(s):
    return re.sub(r"[^0-9a-zа-яё\-]+", "", s.strip().lower().replace(" ", "-"))


def num(s):
    s = (s or "").replace(",", "").replace("%", "").strip()
    try:
        return float(s) if "." in s else int(s)
    except ValueError:
        return None


# ---------------------------------------------------------------- armory
def fetch_character(entry):
    url = ARMORY.format(region=entry["region"], name=urllib.parse.quote(entry["name"].lower()),
                        surname=urllib.parse.quote(entry["surname"].lower()))
    r = S.get(url, timeout=30)
    if r.status_code == 404:
        return {"status": "not_found", "url": url}
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")
    out = {"status": "ok", "url": url, "fetched": NOW}

    h1 = soup.select_one("#fv-character-name")
    out["fullName"] = h1.get_text(strip=True) if h1 else f'{entry["name"]} {entry["surname"]}'
    line = h1.find_next("p").get_text(" ", strip=True) if h1 else ""
    m = re.match(r"Level (\d+) · (.+?) · (.+?) · (Horde|Alliance)", line)
    if m:
        out.update(level=int(m.group(1)), race=m.group(2), cls=m.group(3), faction=m.group(4))
    rs = soup.select_one(".fv-ruleset")
    out["ruleset"] = rs.get_text(strip=True) if rs else None
    t = soup.select("time[datetime]")
    out["checked"] = t[1]["datetime"] if len(t) > 1 else (t[0]["datetime"] if t else None)

    tot = soup.select_one("dl.paper-totals")
    if tot:
        for d in tot.select("div"):
            k, v = d.find("dt"), d.find("dd")
            if k and v:
                if "GearScore" in k.text: out["gs"] = num(v.text)
                if "item level" in k.text: out["ilvl"] = num(v.text)

    gear = []
    for li in soup.select("li.paper-slot"):
        slot = SLOT_KEYS.get(li.get("data-slot", ""), li.get("data-slot", "").lower())
        det = li.select_one("details.item")
        if not det:
            gear.append({"slot": slot, "id": None})
            continue
        img = det.select_one("img[data-forever-item]")
        q = re.search(r"quality-(\w+)", " ".join(det.get("class", [])))
        name = det.select_one(".item-identity strong")
        il = det.select_one(".item-score-ilvl strong")
        body = det.select_one(".item-body")
        lines = []
        if body:
            for p in body.select("p, li"):
                txt = p.get_text(" ", strip=True)
                if txt and not re.search(r"GearScore|Durability|Item details", txt):
                    lines.append(txt)
        gear.append({"slot": slot, "id": int(img["data-forever-item"]) if img else None,
                     "name": name.get_text(strip=True) if name else None,
                     "q": QUALITY.get(q.group(1).upper()) if q else None,
                     "ilvl": num(il.text) if il else None, "lines": lines[1:] if lines else []})
    out["gear"] = [g for g in gear if g["slot"] not in ("shirt", "tabard")]

    stats = {}
    sec = soup.select_one("#statistics")
    if sec:
        for d in sec.select("dl > div"):
            k, v = d.find("dt"), d.find("dd")
            if k and v:
                stats[k.get_text(strip=True)] = v.get_text("", strip=True)
    out["stats"] = stats

    trees = []
    for tr in soup.select("section.talent-tree"):
        head = tr.select_one(".talent-tree-heading")
        tname = head.find("h3").get_text(strip=True) if head and head.find("h3") else "?"
        pts = head.find("span").get_text(strip=True) if head and head.find("span") else ""
        pm = re.match(r"(\d+)", pts)
        nodes = []
        for n in tr.select("details.talent-node"):
            rank = n.select_one(".talent-rank")
            th = n.select_one(".talent-tooltip-heading")
            nm = th.find(string=True, recursive=False) if th else None
            if th and not nm:
                nm = th.get_text(" ", strip=True).split("?")[0]
            ds = n.select_one(".talent-tooltip-description")
            rk = rank.get_text(strip=True) if rank else "?/?"
            have, mx = (rk.split("/") + ["?"])[:2]
            nodes.append({"r": int(n.get("data-row", 0)), "c": int(n.get("data-col", 0)),
                          "rank": None if have == "?" else int(have), "max": num(mx),
                          "name": (nm or "").strip(), "desc": ds.get_text(" ", strip=True) if ds else ""})
        trees.append({"name": tname, "points": int(pm.group(1)) if pm else None, "nodes": nodes})
    out["talents"] = trees
    return out


def merge_history(prev, cur):
    hist = (prev or {}).get("history", [])
    snap = {"date": cur.get("checked") or NOW, "level": cur.get("level"), "gs": cur.get("gs"),
            "gear": sorted(g["id"] for g in cur.get("gear", []) if g.get("id"))}
    if not hist or any(hist[-1].get(k) != snap[k] for k in ("level", "gs", "gear")):
        hist.append(snap)
    cur["history"] = hist[-20:]
    return cur


# ---------------------------------------------------------------- items
TAGS_BREAK = re.compile(r"<br\s*/?>|</tr>|<table[^>]*>|</table>|</div>", re.I)


def tooltip_lines(tip):
    """Wowhead tooltip HTML -> [{t: текст, c: класс цвета}] без названия предмета."""
    tip = re.sub(r"<!--.*?-->", "", tip or "", flags=re.S)
    tip = re.sub(r"</td>\s*<th[^>]*>", " · ", tip, flags=re.I)
    out = []
    for chunk in TAGS_BREAK.split(tip):
        cls = None
        mm = re.search(r'class="(q\d|q)"', chunk)
        if mm: cls = mm.group(1)
        txt = html.unescape(re.sub(r"<[^>]+>", " ", chunk))
        txt = re.sub(r"\s+", " ", txt).strip(" ·")
        if txt and not re.match(r"^(Sell Price|Durability|Max Stack)", txt):
            out.append({"t": txt, "c": cls})
    return out[1:] if out else out  # первая строка — название


def fetch_item(iid):
    res = {}
    for loc, key in ((None, "en"), (7, "ru")):
        url = WOWHEAD.format(id=iid) + (f"?locale={loc}" if loc else "")
        r = S.get(url, timeout=30)
        if r.status_code != 200:
            continue
        try:
            j = r.json()
        except ValueError:
            continue
        res[key] = j.get("name")
        if key == "en":
            res["q"] = j.get("quality")
            res["lines"] = tooltip_lines(j.get("tooltip", ""))
        time.sleep(0.4)
    return res if res.get("en") else None


# ---------------------------------------------------------------- issues
def gh(method, path, **kw):
    tok = os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPOSITORY")
    if not tok or not repo:
        return None
    return requests.request(method, f"https://api.github.com/repos/{repo}{path}",
                            headers={"Authorization": f"Bearer {tok}", "Accept": "application/vnd.github+json"}, timeout=30, **kw)


def form_fields(body):
    fields, cur = {}, None
    for line in (body or "").splitlines():
        if line.startswith("### "):
            cur = line[4:].strip().lower()
            fields[cur] = ""
        elif cur is not None and line.strip() and line.strip() != "_No response_":
            fields[cur] = (fields[cur] + " " + line.strip()).strip()
    return fields


def handle_issue(roster, members):
    path = os.environ.get("GITHUB_EVENT_PATH")
    if not path or os.environ.get("GITHUB_EVENT_NAME") != "issues":
        return None
    ev = load(path, {})
    issue = ev.get("issue") or {}
    user = (issue.get("user") or {}).get("login", "")
    title = issue.get("title", "")
    f = form_fields(issue.get("body", ""))
    num_ = issue.get("number")
    if user.lower() not in [m.lower() for m in members]:
        return num_, f"@{user}, менять список могут только участники из data/members.json. Попроси владельца журнала добавить тебя.", False
    if title.startswith("[refresh]"):
        return num_, "Обновляю статусы всех персонажей.", True
    if title.startswith("[add]"):
        name, surname = f.get("имя", ""), f.get("фамилия", "")
        region = (f.get("регион", "eu") or "eu").lower()
        if not name:
            return num_, "Не вижу имени персонажа в заявке.", False
        cid = slug(f"{name}-{surname}") or f"c{int(time.time())}"
        if any(c["id"] == cid for c in roster):
            return num_, f"{name} {surname} уже в журнале.", True
        roster.append({"id": cid, "name": name, "surname": surname, "region": region,
                       "owner": f.get("игрок", "") or user, "added": NOW[:10],
                       "manual": {"cls": f.get("класс") or None, "level": num(f.get("уровень", "")) or None}})
        return num_, f"Добавил {name} {surname} ({region.upper()}). Данные из armory появятся после обновления сайта, обычно в течение пары минут.", True
    if title.startswith("[remove]"):
        cid = slug(f.get("персонаж", ""))
        before = len(roster)
        roster[:] = [c for c in roster if c["id"] != cid and slug(f'{c["name"]}-{c["surname"]}') != cid]
        if len(roster) == before:
            return num_, f"Не нашел персонажа «{f.get('персонаж', '')}» в журнале.", False
        try:
            (DATA / "characters" / f"{cid}.json").unlink()
        except FileNotFoundError:
            pass
        return num_, f"Удалил «{f.get('персонаж', '')}» из журнала.", True
    return num_, "Не понял заявку: заголовок должен начинаться с [add], [remove] или [refresh].", False


# ---------------------------------------------------------------- main
def main():
    only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
    roster = load(DATA / "roster.json", [])
    members = load(DATA / "members.json", [])
    reply = handle_issue(roster, members)
    if reply:
        save(DATA / "roster.json", roster)

    report = []
    for entry in roster:
        if only and entry["id"] != only:
            continue
        p = DATA / "characters" / f'{entry["id"]}.json'
        prev = load(p, None)
        try:
            cur = fetch_character(entry)
        except Exception as e:  # сеть или разметка: оставляем прошлый снимок
            report.append(f'{entry["id"]}: ошибка {e}')
            if prev:
                prev["lastError"] = f"{NOW}: {e}"
                save(p, prev)
            continue
        if cur["status"] == "not_found":
            keep = prev or {}
            keep.update(status="not_found", url=cur["url"], fetched=NOW)
            save(p, keep)
            report.append(f'{entry["id"]}: нет в armory')
        else:
            save(p, merge_history(prev, cur))
            report.append(f'{entry["id"]}: {cur.get("level")} ур., GS {cur.get("gs")}')
        time.sleep(1.5)

    if "--no-items" not in sys.argv:
        items = load(DATA / "items.json", {})
        want = set(load(DATA / "item_ids.json", []))
        for f in (DATA / "characters").glob("*.json"):
            for g in load(f, {}).get("gear", []):
                if g.get("id"): want.add(g["id"])
        for iid in sorted(want):
            k = str(iid)
            if k in items and items[k].get("ru") and items[k].get("lines"):
                continue
            try:
                it = fetch_item(iid)
            except Exception as e:
                report.append(f"item {iid}: {e}")
                continue
            if it:
                items[k] = {**items.get(k, {}), **it}
        save(DATA / "items.json", items)

    meta = load(DATA / "meta.json", {})
    meta["updated"] = NOW
    save(DATA / "meta.json", meta)
    print("\n".join(report))

    if reply:
        num_, text, ok = reply
        gh("POST", f"/issues/{num_}/comments", json={"body": text + "\n\n" + "\n".join("- " + r for r in report)})
        gh("PATCH", f"/issues/{num_}", json={"state": "closed", "state_reason": "completed" if ok else "not_planned"})


if __name__ == "__main__":
    main()
