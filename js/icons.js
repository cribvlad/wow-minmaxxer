/* Original glyphs for classes and sections (no game art). */
(function(){
  const S='fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const CI={
    druid:'<circle cx="12" cy="15.5" r="4.2"/><circle cx="5.5" cy="10" r="2.1"/><circle cx="9.7" cy="6" r="2.1"/><circle cx="14.3" cy="6" r="2.1"/><circle cx="18.5" cy="10" r="2.1"/>',
    paladin:'<rect x="5" y="3.5" width="14" height="7" rx="1.2"/><rect x="10.8" y="10.5" width="2.4" height="10.5" rx="1"/>',
    warlock:'<path d="M12.5 2c.8 4.2 5 5.6 5 10.6a5.5 5.5 0 0 1-11 0c0-2.2 1-3.6 2.2-4.6 0 2 .8 3.2 2 3.4-.2-3.2-.6-5.6 1.8-9.4z"/>',
    warrior:'<path d="M12 2l2.4 3.4V15H9.6V5.4z"/><rect x="6.5" y="15" width="11" height="2.2" rx="1"/><rect x="10.8" y="17.2" width="2.4" height="4.8" rx="1"/>',
    hunter:'<path d="M6 3.5c9 2.5 9 14.500 0 17" '+S+'/><path d="M5 12h14m-3.500-3.500L19 12l-3.500 3.500" '+S+'/>',
    rogue:'<path d="M12 2l2.200 10.500H9.800z"/><rect x="7.500" y="12.500" width="9" height="2.200" rx="1"/><rect x="10.800" y="14.700" width="2.400" height="6.300" rx="1"/>',
    priest:'<circle cx="12" cy="12" r="4"/><path d="M12 2.500v3.500M12 18v3.500M2.500 12H6M18 12h3.500M5.300 5.300l2.400 2.400M16.300 16.300l2.400 2.400M18.700 5.300l-2.400 2.400M7.700 16.300l-2.400 2.400" '+S+'/>',
    shaman:'<path d="M13.500 2L5 13.200h5.200L9 22l8.500-12.200h-5.200z"/>',
    mage:'<path d="M12 2l2.600 7.400L22 12l-7.400 2.600L12 22l-2.600-7.400L2 12l7.400-2.600z"/>',
    def:'<circle cx="12" cy="12" r="6"/>'
  };
  const SI={
    home:'<path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z" '+S+'/>',
    users:'<circle cx="9" cy="8" r="3.5" '+S+'/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.8.8 3 2.6 3.5 5.2" '+S+'/>',
    refresh:'<path d="M20 11a8 8 0 0 0-14.5-4.5L3 9M4 13a8 8 0 0 0 14.5 4.5L21 15M3 4v5h5M21 20v-5h-5" '+S+'/>',
    assess:'<path d="M12 2.500l8 3v6c0 5-3.500 8.800-8 10.500-4.500-1.700-8-5.500-8-10.500v-6z" '+S+'/><path d="M8.300 12.200l2.700 2.700 4.800-5.600" '+S+'/>',
    map:'<path d="M3 6.500l6-2.500 6 2.500 6-2.500v13.500l-6 2.500-6-2.500-6 2.500zM9 4v13.500M15 6.500V20" '+S+'/>',
    quest:'<path d="M10.200 2.500h3.600l-.8 12h-2z" fill="currentColor"/><circle cx="12" cy="19.300" r="2.200" fill="currentColor"/>',
    build:'<path d="M12 2.500l2.900 6.200 6.600.8-4.900 4.600 1.300 6.600L12 17.400l-5.900 3.300 1.300-6.600-4.900-4.600 6.600-.8z" '+S+'/>',
    gear:'<path d="M5 12a7 7 0 0 1 14 0v8.500h-4.500V15h-5v5.500H5z" '+S+'/><path d="M12 5v6" '+S+'/>'
  };

  const SL={
    mainhand:'<path d="M14.5 3.5h6v6L10 20l-2-2-2 2-2-2 2-2-2-2z" '+S+'/>',
    offhand:'<path d="M12 3l7 2.5v5.5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V5.5z" '+S+'/>',
    head:'<path d="M5 14a7 7 0 0 1 14 0v4h-4v-3H9v3H5z" '+S+'/>',
    neck:'<path d="M6 4c0 5 3 8 6 8s6-3 6-8" '+S+'/><circle cx="12" cy="16" r="3" '+S+'/>',
    shoulder:'<path d="M3 13c2-5 6-7 9-7s7 2 9 7l-4 2-5-3-5 3z" '+S+'/>',
    back:'<path d="M7 4h10l2 16-7-3-7 3z" '+S+'/>',
    chest:'<path d="M8 4l4 2 4-2 4 4-3 2v10H7V10L4 8z" '+S+'/>',
    wrist:'<rect x="6" y="8" width="12" height="8" rx="2" '+S+'/>',
    hands:'<path d="M8 20v-8l-2-3 1-1 3 2V5h2v6V4h2v7V5h2v8l1-2h2l-2 5-2 4z" '+S+'/>',
    waist:'<rect x="3" y="9" width="18" height="6" rx="1" '+S+'/><rect x="10" y="9" width="4" height="6" '+S+'/>',
    legs:'<path d="M7 3h10l-1 18h-3l-1-11-1 11H8z" '+S+'/>',
    feet:'<path d="M7 3h5v11l7 3v3H5v-6z" '+S+'/>',
    finger:'<circle cx="12" cy="14" r="5.5" '+S+'/><path d="M10 6l2-3 2 3z" '+S+'/>',
    trinket:'<path d="M12 3l6 7-6 11-6-11z" '+S+'/>',
    ranged:'<path d="M6 3c8 3 8 15 0 18M6 3v18" '+S+'/>'
  };
  window.slotIco=function(slot,q){const k=/finger/.test(slot)?'finger':/trinket/.test(slot)?'trinket':slot;
    return '<span class="sglyph q'+(q||0)+'" aria-hidden="true"><svg viewBox="0 0 24 24">'+(SL[k]||SL.trinket)+'</svg></span>';};
  window.ico=function(cls,color,size){
    return '<span class="cico '+(size||"")+'" style="--c:'+(color||"#888")+'" aria-hidden="true"><svg viewBox="0 0 24 24">'+(CI[cls]||CI.def)+'</svg></span>';
  };
  window.sic=function(k){return '<svg class="sico" viewBox="0 0 24 24" aria-hidden="true">'+(SI[k]||"")+'</svg>'};
})();
