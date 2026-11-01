(()=>{'use strict';
const DB_SELECTION='vce_esport_v5_selection';const COACH_SESSION='vce_coach_v6';
function selection(){try{return JSON.parse(localStorage.getItem(DB_SELECTION)||'null')}catch{return null}}
function logout(){const s=selection();if(s?.mode==='coach')sessionStorage.removeItem(COACH_SESSION);localStorage.removeItem(DB_SELECTION);location.assign('index.html#choix')}
function addNav(){const s=selection();if(!s)return;const nav=document.getElementById('vce-shared-nav')||document.querySelector('header.top');if(!nav||nav.querySelector('.vce-v7-logout'))return;
const pill=document.createElement('span');pill.id='vce-v7-profile-pill';pill.textContent=s.mode==='coach'?'COACH CONNECTÉ':s.mode==='group'?'GROUPE VCE':(window.VCEV5?.getProfile?.()?.name||'PILOTE CONNECTÉ');pill.title='Profil actif';
const b=document.createElement('button');b.type='button';b.className='vce-v7-logout';b.textContent='↪ DÉCONNEXION';b.title='Quitter ce profil (les statistiques restent enregistrées sur cet appareil)';b.addEventListener('click',logout);
if(nav.id==='vce-shared-nav'){(nav.querySelector('.vce-nav-actions')||nav).append(pill,b)}else{const status=nav.querySelector('.top-status');if(status)status.replaceWith(pill);nav.append(b)}
const old=document.getElementById('v5-entry-change');if(old){old.textContent='CHANGER DE PROFIL';old.title='Choisir un autre espace sans effacer les données'}
}
function enhanceTraining(){const dashboard=document.getElementById('vce-training-dashboard');if(!dashboard)return;const observer=new MutationObserver(()=>{const box=document.getElementById('v5-clock');if(!box||document.getElementById('v7-week-control'))return;const parent=box.closest('.v5-box');if(!parent)return;
const control=document.createElement('div');control.id='v7-week-control';control.className='v7-week-control';control.innerHTML='<label for="v7-week-goal">OBJECTIF PERSONNEL DE ROULAGE <output id="v7-week-value">50 min</output></label><input type="range" id="v7-week-goal" min="50" max="240" step="10" value="50"><small>Le minimum VCE reste fixé à 50 minutes. Ce curseur sert à personnaliser ton objectif.</small>';
const stopwatch=parent.querySelector('.v5-stopwatch');if(stopwatch)stopwatch.before(control);else parent.append(control);
const slider=control.querySelector('input'),value=control.querySelector('output');let saved=50;try{saved=Number(localStorage.getItem('vce_week_target')||50)}catch{}slider.value=Math.min(240,Math.max(50,saved));value.textContent=slider.value+' min';slider.addEventListener('input',()=>{value.textContent=slider.value+' min';try{localStorage.setItem('vce_week_target',slider.value)}catch{}});
});observer.observe(dashboard,{childList:true,subtree:true});}
function init(){addNav();window.addEventListener('vce:profile-selected',()=>setTimeout(addNav,0));enhanceTraining();if(document.getElementById('vce-profiles')){const root=document.getElementById('vce-profiles');const ob=new MutationObserver(addNav);ob.observe(root,{subtree:true,childList:true});}window.addEventListener('storage',e=>{if(e.key===DB_SELECTION)location.reload()})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
