/* V20 visual refresh: enhancement only; never modifies training/session data. */
(()=>{'use strict';
 const start=()=>{
  document.body.classList.add('vce-refresh');
  const top=document.createElement('div');top.className='vce-refresh-topline';top.setAttribute('aria-hidden','true');document.body.prepend(top);
  if(document.querySelector('#v20-training')){
   const portal=document.getElementById('vce-training-portal');
   if(portal){
    const box=document.createElement('div');box.className='vce-extra-switch';
    const b=document.createElement('button');b.type='button';b.setAttribute('aria-controls','vce-training-portal');b.setAttribute('aria-expanded','false');
    b.innerHTML='<span>▤</span><span>Outils complémentaires <small>— afficher les anciens ateliers et ressources</small></span>';
    box.append(b);portal.parentNode.insertBefore(box,portal);
    document.body.classList.add('vce-extras-collapsed');
    b.addEventListener('click',()=>{const collapsed=document.body.classList.toggle('vce-extras-collapsed');b.setAttribute('aria-expanded',String(!collapsed));b.querySelector('span:last-child').innerHTML=collapsed?'Outils complémentaires <small>— afficher les anciens ateliers et ressources</small>':'Masquer les outils complémentaires';});
   }
  }
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
