/* VCE ESPORT V16 — parcours de bienvenue et aide contextuelle. */
(()=>{'use strict';
 const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 const SEL='vce_esport_v5_selection',DB='vce_esport_v5',STAFF='vce_coach_v6',ENTERED='vce_v16_entered';
 const $=id=>document.getElementById(id);
 const get=(k,def=null)=>{try{return JSON.parse(localStorage.getItem(k))??def}catch{return def}};
 const valid=()=>{const s=get(SEL);if(!s)return false;if(s.mode==='coach')return sessionStorage.getItem(STAFF)==='ok';if(s.mode==='individual')return !!get(DB,{profiles:{}}).profiles?.[s.id];return s.mode==='group'};
 const selection=()=>get(SEL);
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const help={
  entrainement:'Commence par choisir AVEC COACH pour un débrief guidé, ou SANS COACH pour les ateliers autonomes. Choisis ton exercice, lance le chronomètre, puis termine la séance. Les points sont attribués après validation Staff.',
  strategie:'Renseigne le temps au tour, la consommation, le réservoir et la durée de course. Ajuste ensuite les relais, les arrêts, les pneus et les swaps. La stratégie est accessible au Groupe et au Staff.',
  lineup:'Dans TEAM, ouvre LINEUP. Le Staff crée ou modifie la course dans CALENDRIER et sélectionne les pilotes. Choisis ensuite la course pour voir ou exporter sa composition.',
  calendrier:'Dans TEAM, ouvre CALENDRIER pour voir les prochaines courses triées par date. En mode Staff, ajoute ou modifie une course et sa date depuis le formulaire de gestion.',
  resultats:'Dans TEAM, ouvre RACE RESULT. Le Staff saisit le pilote, la position, le championnat, la team, le jeu et la date. Sélectionne un résultat pour préparer son affiche.',
  team:'Dans TEAM, choisis Calendrier, Lineup ou Résultats. Le Staff peut modifier les courses, les compositions et les résultats ; les autres modes les consultent.',
  cars:'Consulte les catégories et caractéristiques des voitures. Utilise ces informations pour choisir un exercice adapté.',
  diagnostics:'Décris précisément le symptôme, le virage et la phase de pilotage. Compare plusieurs hypothèses avant de changer un réglage.'
 };
 function hint(el,key){if(!el||!key||el.classList.contains('v16-hint-target'))return;el.classList.add('v16-hint-target');el.dataset.v16Help=help[key];el.tabIndex=0;el.setAttribute('aria-label',(el.textContent||key).trim()+'. Aide : '+help[key]);el.addEventListener('click',()=>el.classList.toggle('v16-help-open'));el.addEventListener('blur',()=>el.classList.remove('v16-help-open'))}
 function guides(){
  const maps={
   'strategie.html':[['h1,h2,h3','strategie']],
   'team.html':[['.team-section-heading h2,.team-tabs [data-tab="calendar"]','calendrier'],['.team-tabs [data-tab="lineup"]','lineup'],['.team-tabs [data-tab="results"]','resultats']],
   'entrainement.html':[['#vce-training-portal h2,.vcep-section-head strong','entrainement']],
   'interactions.html':[['h1,h2','diagnostics']],
   'ressources_voitures.html':[['h1,h2','cars']]
  };
  if(page==='team.html'){
   document.querySelectorAll('.team-section-heading h2').forEach(el=>{const txt=el.textContent.toLowerCase();hint(el,txt.includes('lineup')?'lineup':txt.includes('résultat')||txt.includes('result')?'resultats':txt.includes('calendrier')?'calendrier':null)});
   document.querySelectorAll('.team-tabs [data-tab]').forEach(el=>{const key=({calendar:'calendrier',lineup:'lineup',results:'resultats'})[el.dataset.tab];if(key)hint(el,key)});
  }else if(page==='strategie.html')document.querySelectorAll('h1,h2,h3').forEach(el=>{if(/stratégi|race control|relais|carburant|pneus/i.test(el.textContent))hint(el,'strategie')});
  else if(page==='entrainement.html')document.querySelectorAll('#vce-training-portal h2,.vcep-section-head strong,#tabCoach,#tabSolo').forEach(el=>hint(el,'entrainement'));
  else if(page==='interactions.html')document.querySelectorAll('h1,h2').forEach(el=>hint(el,'diagnostics'));
  else if(page==='ressources_voitures.html')document.querySelectorAll('h1,h2').forEach(el=>hint(el,'cars'));
  document.querySelectorAll('.v16-hint-target').forEach(el=>{if(!el.dataset.v16Help)el.classList.remove('v16-hint-target')});
 }
 function training(){
  const requested=new URLSearchParams(location.search).get('mode')||location.hash.replace('#','');
  if(requested!=='coach'&&requested!=='solo')return;
  const target=requested==='coach'?'coachMode':'soloMode';
  if(typeof window.setMode==='function')window.setMode(requested);
  const node=$(target);if(node){setTimeout(()=>node.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}),180)}
 }
 function home(){
  const welcome=$('v16-welcome'),hub=$('v16-hub'),root=$('vce-profiles');if(!welcome||!hub||!root)return;
  const roleLabel=$('v16-hub-role'),title=$('v16-hub-title'),desc=$('v16-hub-description'),tiles=$('v16-tiles'),activity=$('v16-activity');
  const enter=()=>{sessionStorage.setItem(ENTERED,'1');render()};
  $('v16-enter').addEventListener('click',enter);
  $('v16-change-profile').addEventListener('click',()=>{const change=$('v5-entry-change');if(change)change.click();else{localStorage.removeItem(SEL)};render()});
  function render(){
   const entered=sessionStorage.getItem(ENTERED)==='1';const active=valid()&&document.body.classList.contains('v5-authenticated');
   const stage=!entered?'welcome':active?'hub':'select';
   document.body.classList.remove('v16-stage-welcome','v16-stage-select','v16-stage-hub');document.body.classList.add('v16-stage-'+stage,'v16-ready');
   welcome.hidden=stage!=='welcome';hub.hidden=stage!=='hub';
   if(stage==='select'){
    document.body.classList.add('v5-landing');document.body.classList.remove('v5-authenticated');
    root.querySelector('.v5-gate')?.classList.remove('v5-compact');
   }
   if(stage!=='hub'){activity.hidden=true;return;}
   const s=selection(),p=s.mode==='individual'?get(DB,{profiles:{}}).profiles?.[s.id]:null;
   const staff=s.mode==='coach',group=s.mode==='group';roleLabel.textContent=staff?'STAFF / RESPONSABLE':group?'GROUPE / ENDURANCE':'PILOTE / '+(p?.name||'');
   title.textContent=staff?'QUELLE MISSION AUJOURD’HUI ?':group?'PRÊT POUR LA COURSE ?':'BONJOUR '+(p?.name||'PILOTE').split(' ')[0]+' !';
   desc.textContent='Choisis ton espace. Les explications apparaissent en passant la souris sur les titres ou en les sélectionnant au clavier.';
   const entries=[
    {id:'entrainement',icon:'◉',name:'ENTRAÎNEMENT',desc:'Coaching, exercices, chronomètre, suivi des séances et validation Staff.',href:'entrainement.html',allowed:!group},
    {id:'strategie',icon:'⚑',name:'STRATÉGIE',desc:'Race Control : consommation, carburant, pneus, relais et arrêts aux stands.',href:'strategie.html',allowed:staff||group},
    {id:'team',icon:'▦',name:'TEAM',desc:'Calendrier, lineups et résultats de course, avec affiches et annonces.',href:'team.html',allowed:true}
   ];
   tiles.innerHTML=entries.map((e,i)=>`<a class="v16-tile${e.allowed?'':' is-disabled'}" href="${e.allowed?e.href:'#'}" ${e.allowed?'':'aria-disabled="true" tabindex="-1"'}><span class="v16-tile-num">ESPACE 0${i+1}</span><span class="v16-tile-icon" aria-hidden="true">${e.icon}</span><h3>${e.name}</h3><p>${e.desc}</p><strong>${e.allowed?'OUVRIR CET ESPACE ↗':group?'RÉSERVÉ AUX PILOTES ET AU STAFF':'RÉSERVÉ AU GROUPE ET AU STAFF'}</strong></a>`).join('');
   tiles.querySelectorAll('.is-disabled').forEach(el=>el.addEventListener('click',e=>e.preventDefault()));
   activity.hidden=true;
   tiles.querySelectorAll('.v16-tile:not(.is-disabled)').forEach(el=>{
    const route=el.getAttribute('href');
    if(route==='strategie.html')return;
    el.addEventListener('click',event=>{
     event.preventDefault();
     const isTraining=route==='entrainement.html';
     activity.hidden=false;
     activity.innerHTML=isTraining?`<div class="v16-activity-top"><div><span class="v16-kicker">ÉTAPE 04 / ENTRAÎNEMENT</span><h3>COMMENT VEUX-TU T’ENTRAÎNER ?</h3><p>Choisis le type d’accompagnement pour ouvrir directement la bonne section.</p></div><button type="button" class="v16-small-button" id="v16-activity-back">↶ RETOUR</button></div><div class="v16-activity-grid"><a href="entrainement.html?mode=coach" class="v16-activity-option"><span>🎧</span><strong>AVEC COACH</strong><small>Échange, diagnostic, débrief et comparaison des chronos.</small><em>OUVRIR LE COACH ↗</em></a><a href="entrainement.html?mode=solo" class="v16-activity-option"><span>🏎</span><strong>SANS COACH</strong><small>Ateliers autonomes, exercices guidés et bibliothèque technique.</small><em>OUVRIR LES ATELIERS ↗</em></a></div>`:`<div class="v16-activity-top"><div><span class="v16-kicker">ÉTAPE 04 / TEAM</span><h3>QUE VEUX-TU GÉRER ?</h3><p>Ouvre directement le calendrier, les lineups ou les résultats.</p></div><button type="button" class="v16-small-button" id="v16-activity-back">↶ RETOUR</button></div><div class="v16-activity-grid"><a href="team.html#calendar" class="v16-activity-option"><span>📅</span><strong>CALENDRIER</strong><small>Dates, prochaines courses et annonces.</small><em>OUVRIR ↗</em></a><a href="team.html#lineup" class="v16-activity-option"><span>👥</span><strong>LINEUP</strong><small>Composition des pilotes et affiche d’équipe.</small><em>OUVRIR ↗</em></a><a href="team.html#results" class="v16-activity-option"><span>🏆</span><strong>RÉSULTATS</strong><small>Classements, positions et affiches RACE RESULT.</small><em>OUVRIR ↗</em></a></div>`;
     activity.querySelector('#v16-activity-back').onclick=()=>{activity.hidden=true;el.focus()};
     activity.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
    });
   });
   tiles.querySelectorAll('.v16-tile h3').forEach(el=>hint(el,el.textContent.toLowerCase().includes('entraînement')?'entrainement':el.textContent.toLowerCase().includes('stratégi')?'strategie':'team'));
   const extra=$('v16-hub-extras');extra.innerHTML=`<div class="v16-team-quick"><a href="team.html#calendar">CALENDRIER <span>↗</span></a><a href="team.html#lineup">LINEUP <span>↗</span></a><a href="team.html#results">RÉSULTATS <span>↗</span></a></div>`;
   const note=$('v16-hub-note');note.textContent=p?'Profil actif : '+p.name+' · Retrouve tes points et ton suivi dans Entraînements.':staff?'Mode Staff : tu peux valider les séances et gérer les annonces TEAM.':'Mode Groupe : accès aux stratégies et à TEAM.';
  }
  // La sélection est gérée par vce-v5.js : on observe uniquement son état final.
  new MutationObserver(()=>{const stage=document.body.classList.contains('v5-authenticated');const current=document.body.classList.contains('v16-stage-hub');if(stage!==current)render()}).observe(document.body,{attributes:true,attributeFilter:['class']});
  window.addEventListener('storage',render);
  const gateHead=root.querySelector('.v5-gate-head');if(gateHead){gateHead.insertAdjacentHTML('afterbegin','<div class="v16-progress"><span class="done"><b>1</b> ENTRÉE</span> ─ <span class="current"><b>2</b> PROFIL</span> ─ <span><b>3</b> ESPACE</span> ─ <span><b>4</b> ACTIVITÉ</span></div>')}
  render();
 }
 function init(){if(page==='index.html')home();else{guides();if(page==='entrainement.html')training();}}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
