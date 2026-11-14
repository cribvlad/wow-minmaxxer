/* Профессии WoW Forever: данные и раздел журнала. */
(function(){
  const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const A="Алхимия",BS="Кузнечное дело",EN="Наложение чар",EG="Инженерное дело",HB="Травничество",LW="Кожевничество",MI="Горное дело",SK="Снятие шкур",TL="Портняжное дело";
  const CK="Кулинария",FA="Первая помощь",FI="Рыбная ловля";
  window.PRIMARY=[A,BS,EN,EG,HB,LW,MI,SK,TL];
  window.SECONDARY=[CK,FA,FI];
  const INFO={
    [A]:"Зелья, эликсиры, фляги. В лагере ставит Источник маны. Обычные лечебные зелья теперь делает Первая помощь.",
    [BS]:"Кольчуга, потом латы и оружие; есть персональные редкие комплекты. В лагере дает бафф Силы.",
    [EN]:"Чары на вещи, а в Forever еще и крафт колец, ожерелий, жезлов, посохов и реликвий. Не требует сбора.",
    [EG]:"Гранаты, гаджеты, прицелы; сильнее всего в PvP. В лагере ставит торговца с починкой.",
    [HB]:"Травы идут и в Алхимию, и в зелья Первой помощи, поэтому хорошо продаются. Пассивно дает сопротивление магии.",
    [LW]:"Кожаная и кольчужная броня, персональные редкие комплекты. В лагере ставит Палатку: отдых до 5% уровня.",
    [MI]:"Руда для Кузнечного и Инженерного дела. Пассивно +5% здоровья, в лагере с навыка 20 Lodestone на силу атаки.",
    [SK]:"Кожа для Кожевничества. Пассивно добавляет урон по животным.",
    [TL]:"Тканевая броня, сумки и восемь новых сумок для реагентов, персональные редкие комплекты. Ткань падает с гуманоидов, сбор не нужен.",
    [CK]:"С навыка 1 дает походный костер для лагеря. Многие блюда с эффектом сытости добавляют 5% опыта за убийства.",
    [FA]:"Бинты, противоядия и теперь лечебные зелья. В лагере с навыка 20 аптечка на Выносливость (не складывается со Словом силы: Стойкость).",
    [FI]:"Рыба для Кулинарии и Алхимии. В лагере с навыка 20 Аквариум: +8% ко всем характеристикам (не складывается с Благословением королей)."
  };
  const G={lvl:"Кач",gold:"Золото",raid:"Рейды",pvp:"PvP"};
  const gold=[SK,MI], pvp=[EG,A];
  const PAIRS={
    druid:{lvl:[LW,SK],gold,raid:[A,HB],pvp},
    paladin:{lvl:[BS,MI],gold,raid:[A,HB],pvp},
    hunter:{lvl:[LW,SK],gold,raid:[EG,A],pvp},
    mage:{lvl:[TL,EN],gold,raid:[TL,EN],pvp},
    warlock:{lvl:[TL,EN],raid:[TL,A]},
    priest:{lvl:[TL,EN]},
    warrior:{lvl:[BS,MI],pvp:[MI,EG]},
    rogue:{lvl:[LW,SK],pvp:[MI,EG]},
    shaman:{lvl:[LW,SK]}
  };
  const ICON='<svg class="sico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h11a4 4 0 0 0 4-3v3a4 4 0 0 1-4 3h-1v3h3v3H7v-3h3v-3H7a3 3 0 0 1-3-3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

  window.profSection=function(c){
    const have=Array.isArray(c.professions)?c.professions:[];
    const pri=have.filter(p=>window.PRIMARY.includes(p));
    const btn=(p,k)=>'<span class="tag'+(have.includes(p)?' good':'')+'">'+e(p)+'</span>';
    let h='<section class="panel"><h2>'+ICON+'Профессии</h2>';
    h+='<h3>Основные <span class="sub">'+pri.length+' из 2</span></h3><div class="row">'+window.PRIMARY.map(p=>btn(p,"p")).join("")+'</div>';
    h+='<h3>Вторичные <span class="sub">можно все три</span></h3><div class="row">'+window.SECONDARY.map(p=>btn(p,"s")).join("")+'</div>';
    if(have.length) h+='<ul class="list">'+have.filter(p=>INFO[p]).map(p=>'<li><span><b>'+e(p)+'.</b> '+e(INFO[p])+'</span></li>').join("")+'</ul>';
    else h+='<p class="sub">Профессии персонажа пока не указаны.</p>';
    const P=PAIRS[c.cls];
    if(P){
      h+='<h3>Что советуют классу</h3><ul class="list">'+Object.keys(G).filter(k=>P[k]).map(k=>{
        const ok=P[k].every(p=>have.includes(p));
        return '<li class="'+(ok?"cur":"")+'"><span>'+e(P[k].join(" + "))+'</span><span class="rng">'+G[k]+'</span></li>';
      }).join("")+'</ul>';
      if(pri.length===1){
        const mate=Object.keys(G).filter(k=>P[k]&&P[k].includes(pri[0])).map(k=>P[k].find(p=>p!==pri[0]));
        if(mate.length) h+='<p class="note">Второй слот свободен. К профессии «'+e(pri[0])+'» гайды ставят в пару: '+e([...new Set(mate)].join(" или "))+'.</p>';
      }
    }
    h+='<details><summary>Как устроены профессии в Forever</summary><ul class="list" style="margin-top:10px">'
      +'<li><span>Две основные плюс все три вторичные. Потолок навыка 300, ранги открывают 75, 150, 225 и 300.</span></li>'
      +'<li><span>Каждая профессия добавляет предмет в общий лагерь: первый с навыка 20, второй со 140. Костер ставит Кулинария.</span></li>'
      +'<li><span>Крафтовая броня теперь заменяет добычу из подземелий на каче, часть комплектов привязана к мастеру.</span></li>'
      +'<li><span>За навык 150, 225 и 300 дают очки Наследия.</span></li>'
      +'<li><span>Собирательные профессии дают пассивные боевые бонусы; при смене профессии новая начинается с 1.</span></li>'
      +'</ul></details></section>';
    return h;
  };
})();
