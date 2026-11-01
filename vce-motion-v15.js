/* VCE V15 — scroll progress, accessible reveals and smooth in-site transitions */
(()=>{'use strict';
 const ready=()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('v15-entering');
  const progress=document.createElement('div');progress.id='v15-scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  const top=document.createElement('button');top.type='button';top.id='v15-to-top';top.textContent='↑';top.setAttribute('aria-label','Retour en haut de la page');top.title='Retour en haut';document.body.append(top);
  top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced?'instant':'smooth'}));
  let pending=false;
  const scroll=()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{const d=document.documentElement;const range=Math.max(1,d.scrollHeight-d.clientHeight);progress.style.transform=`scaleX(${Math.min(1,Math.max(0,window.scrollY/range))})`;top.classList.toggle('v15-visible',window.scrollY>360);pending=false;});};
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll,{passive:true});scroll();
  const selector='.v14-panel,.v10-role,.v10-ranking,.v10-structure,.team-hero,.team-toolbar,.team-box,.team-panel,.v5-gate,.v5-dashboard,.vcep-hero,.v13-diagnostic';
  if(!reduced&&'IntersectionObserver' in window){
   const items=[...document.querySelectorAll(selector)].filter(el=>!el.closest('[hidden]')&&getComputedStyle(el).display!=='none');
   const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('v15-visible');observer.unobserve(entry.target)}}},{threshold:.06,rootMargin:'0px 0px 55px 0px'});
   for(const item of items){item.classList.add('v15-reveal');observer.observe(item)}
   document.body.classList.add('v15-loaded');
  }
  // The existing vce-transitions.js handles same-origin HTML links on pages where present.
  // This module only enhances the curtain, and leaves the native navigation unchanged.
  window.addEventListener('pageshow',()=>{document.documentElement.classList.remove('vce-navigating');document.body.classList.remove('v15-entering');scroll()});
  setTimeout(()=>document.body.classList.remove('v15-entering'),700);
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
