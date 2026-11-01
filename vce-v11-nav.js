(()=>{'use strict';
const DB='vce_esport_v5',SEL='vce_esport_v5_selection',STAFF='vce_coach_v6';
const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const links=[['index.html','ACCUEIL'],['entrainement.html','ENTRAÎNEMENTS'],['strategie.html','STRATÉGIES'],['team.html','TEAM'],['ressources_voitures.html','CARS'],['interactions.html','DIAGNOSTICS']];
function get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}
function selection(){return get(SEL,null)}
function active(){const s=selection();if(!s)return false;if(s.mode==='coach')return sessionStorage.getItem(STAFF)==='ok';if(s.mode==='individual')return !!get(DB,{profiles:{}}).profiles?.[s.id];return s.mode==='group'}
function logout(){localStorage.removeItem(SEL);sessionStorage.removeItem(STAFF);location.assign('index.html')}
function render(){const n=document.getElementById('vce-unified-nav');if(!n)return;const s=selection(),on=active();n.hidden=!on;document.body.classList.toggle('v11-session-active',on);document.body.classList.toggle('v11-session-absent',!on);if(!on)return;
 const db=get(DB,{profiles:{}});const person=s.mode==='individual'?db.profiles[s.id]:null;
 const role=person?person.name:(s.mode==='coach'?'STAFF / COACHS':'GROUPE / ENDURANCE');
 n.querySelector('.v11-role-name').textContent=role;
 const av=n.querySelector('.v121-avatar-control'),img=n.querySelector('.v121-avatar-image'),initial=n.querySelector('.v121-avatar-initial');
 if(av){av.hidden=!person;if(person){const photo=localStorage.getItem('vce_photo_'+person.id);img.hidden=!photo;if(photo)img.src=photo;else img.removeAttribute('src');initial.hidden=!!photo;initial.textContent=person.name.split(/\s+/).slice(0,2).map(w=>w.charAt(0)).join('');av.title='Importer ou modifier la photo de profil de '+person.name;}}
 n.querySelectorAll('[data-v11-route]').forEach(a=>{const hidden=a.dataset.v11Route==='strategie.html'&&s.mode==='individual';a.hidden=hidden;a.setAttribute('aria-current',page===a.dataset.v11Route?'page':'false')});
 n.querySelector('.v11-nav-toggle').setAttribute('aria-expanded','false');n.classList.remove('v11-expanded');
}
function init(){document.getElementById('vce-shared-nav')?.remove();const n=document.createElement('header');n.id='vce-unified-nav';n.className='v11-header';n.hidden=true;n.innerHTML=`<div class="v11-nav-inner"><a class="v11-brand" href="index.html" aria-label="VCE ESPORT - Accueil"><span class="v11-brand-mark">VCE</span><span class="v11-brand-label"><strong>VCE ESPORT</strong><small>PERFORMANCE CENTER</small></span></a><button class="v11-nav-toggle" type="button" aria-controls="v11-nav-links" aria-expanded="false" aria-label="Afficher les rubriques"><span></span><span></span><span></span></button><nav class="v11-nav-links" id="v11-nav-links" aria-label="Navigation principale">${links.map(([href,label])=>`<a data-v11-route="${href}" href="${href}">${label}</a>`).join('')}</nav><div class="v11-account"><button class="v121-avatar-control" type="button" title="Importer une photo de profil" aria-label="Importer ou modifier ma photo de profil" hidden><span class="v121-avatar-initial">?</span><img class="v121-avatar-image" alt="" hidden><span class="v121-camera" aria-hidden="true">✎</span></button><input class="v121-avatar-input" type="file" accept="image/png,image/jpeg,image/webp" hidden><span class="v11-account-dot" aria-hidden="true"></span><span class="v11-role-name"></span><button type="button" class="v11-logout">DÉCONNEXION <span aria-hidden="true">↗</span></button></div></div>`;document.body.prepend(n);n.querySelector('.v11-nav-toggle').onclick=()=>{const isOpen=n.classList.toggle('v11-expanded');n.querySelector('.v11-nav-toggle').setAttribute('aria-expanded',String(isOpen))};n.querySelector('.v11-logout').onclick=logout;
 const avatarButton=n.querySelector('.v121-avatar-control'),fileInput=n.querySelector('.v121-avatar-input');
 avatarButton.onclick=()=>fileInput.click();
 fileInput.onchange=async()=>{const file=fileInput.files?.[0];fileInput.value='';if(!file)return;
 if(!['image/png','image/jpeg','image/webp'].includes(file.type)){alert('Choisis une image JPG, PNG ou WebP.');return}
 if(file.size>6*1024*1024){alert('La photo doit faire moins de 6 Mo.');return}
 const selected=selection();if(selected?.mode!=='individual')return;
 try{const bitmap=await createImageBitmap(file);const canvas=document.createElement('canvas');const ratio=Math.min(1,320/Math.max(bitmap.width,bitmap.height));canvas.width=Math.max(1,Math.round(bitmap.width*ratio));canvas.height=Math.max(1,Math.round(bitmap.height*ratio));canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close?.();
 localStorage.setItem('vce_photo_'+selected.id,canvas.toDataURL('image/webp',.8));render();window.dispatchEvent(new Event('vce:avatar-updated'));
 }catch(err){alert('Impossible d’enregistrer cette photo. Essaie une image plus petite.')}};n.querySelectorAll('.v11-nav-links a').forEach(a=>a.onclick=()=>n.classList.remove('v11-expanded'));
render();window.addEventListener('storage',render);window.addEventListener('vce:selection-changed',render);
// V10 modifies localStorage on login; observe the page's existing login controls without overriding their handlers.
if(page==='index.html'){const observer=new MutationObserver(()=>render());const gate=document.getElementById('v10-dashboard');if(gate)observer.observe(gate,{attributes:true,attributeFilter:['hidden']});}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();