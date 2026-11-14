/* Original glyphs for classes and sections (no game art). */
(function(){
  const S='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
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
    assess:'<path d="M12 2.500l8 3v6c0 5-3.500 8.800-8 10.500-4.500-1.700-8-5.500-8-10.500v-6z" '+S+'/><path d="M8.300 12.200l2.700 2.700 4.800-5.600" '+S+'/>',
    map:'<path d="M3 6.500l6-2.500 6 2.500 6-2.500v13.500l-6 2.500-6-2.500-6 2.500zM9 4v13.500M15 6.500V20" '+S+'/>',
    quest:'<path d="M10.200 2.500h3.600l-.8 12h-2z" fill="currentColor"/><circle cx="12" cy="19.300" r="2.200" fill="currentColor"/>',
    build:'<path d="M12 2.500l2.900 6.200 6.600.8-4.900 4.600 1.300 6.600L12 17.400l-5.900 3.300 1.300-6.600-4.900-4.600 6.600-.8z" '+S+'/>',
    gear:'<path d="M5 12a7 7 0 0 1 14 0v8.500h-4.500V15h-5v5.500H5z" '+S+'/><path d="M12 5v6" '+S+'/>'
  };
  window.ico=function(cls,color,size){
    return '<span class="cico '+(size||"")+'" style="--c:'+(color||"#888")+'" aria-hidden="true"><svg viewBox="0 0 24 24">'+(CI[cls]||CI.def)+'</svg></span>';
  };
  window.sic=function(k){return '<svg class="sico" viewBox="0 0 24 24" aria-hidden="true">'+(SI[k]||"")+'</svg>'};
})();
