(()=>{'use strict';
const page=location.pathname.split('/').pop()||'index.html';
const add=()=>{
  if(page!=='index.html'){
    const target=document.querySelector('nav,.vce-nav,.v11-nav,.top .nav,.v5-top-nav,.vce-v11-nav');
    if(target&&!target.querySelector('[href="dashboard.html"]')){
      const a=document.createElement('a');a.href='dashboard.html';a.textContent='TABLEAU DE BORD';a.className='v18-nav-link';target.append(a);const profile=document.createElement('a');profile.href='profil.html';profile.textContent='MON PROFIL';profile.className='v18-nav-link';target.append(profile);
    }
  }
  if(page==='index.html'){
    const wrap=document.getElementById('v16-hub-extras')||document.querySelector('.hero-cta');
    if(wrap&&!wrap.querySelector('[href="dashboard.html"]')){const a=document.createElement('a');a.href='dashboard.html';a.className='v18-home-cta';a.textContent='◉ TABLEAU DE BORD V18 →';wrap.append(a)}
  }
  const progress=document.createElement('div');progress.className='v18-progress-scroll';document.body.append(progress);
  const update=()=>{const d=document.documentElement;progress.style.transform='scaleX('+Math.max(0,Math.min(1,scrollY/Math.max(1,d.scrollHeight-innerHeight)))+')'};
  window.addEventListener('scroll',update,{passive:true});update();
  document.querySelectorAll('button,a').forEach(el=>{if(el.hasAttribute('title'))el.setAttribute('aria-label',el.getAttribute('aria-label')||el.getAttribute('title'))});
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add();
})();
