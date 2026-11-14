# WoW Minmaxxer

Журнал пати в WoW Forever: персонажи из armory, экипировка с карточками предметов, таланты, где качаться, план подземелий и рекомендации по добыче.

Сайт: https://cribvlad.github.io/wow-minmaxxer/

## Как пользоваться

- **Добавить персонажа** — вкладка «Состав» на сайте или [заявка на GitHub](../../issues/new?template=add.yml). Бот найдет персонажа в armory и обновит сайт за пару минут.
- **Удалить** — кнопка у персонажа во вкладке «Состав» ([шаблон заявки](../../issues/new?template=remove.yml)).
- **Обновить статусы** — кнопка на сводке ([заявка](../../issues/new?template=refresh.yml)); без нее бот обновляет данные каждые 6 часов.
- Заявки принимаются от логинов GitHub из `data/members.json`.

## Устройство

| Путь | Что там |
| --- | --- |
| `index.html`, `css/`, `js/` | статичный сайт без сборки |
| `js/kb.js`, `js/plan.js` | база знаний: зоны, подземелья, вехи, билды, цели по вещам, план |
| `js/names.js` | словарь официальных русских названий |
| `data/roster.json` | состав пати |
| `data/characters/*.json` | снимки armory с историей изменений |
| `data/items.json` | карточки предметов (en/ru) |
| `scripts/update.py` | бот: armory, Wowhead, заявки |
| `.github/workflows/update.yml` | запуск бота по расписанию, кнопке и заявкам |

Правила проекта — [PROJECT_RULES.md](PROJECT_RULES.md), история версий — [CHANGELOG.md](CHANGELOG.md).

Фан-проект, не связан с Blizzard Entertainment.
