(()=>{'use strict';
const db=JSON.parse(document.getElementById('cars-data').textContent),cars=db.categories||[];
const $=id=>document.getElementById(id),norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const families=['Toutes',...new Set(cars.map(c=>c.famille||'Autres'))];let family='Toutes',selected=cars[0]?.id||'';
const node=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const details=(car)=>{
 const box=$('cars-detail');box.replaceChildren();if(!car){box.append(node('h2','', 'Aucun résultat'),node('p','vc-muted','Essaie une autre recherche.'));return}
 box.append(node('div','vc-kicker',car.famille||'CATÉGORIE'),node('h2','',car.nom),node('p','vc-car-sub','Fiche technique indicative — les réglages varient selon les voitures et simulateurs.'));
 const facts=node('div','vc-car-facts');for(const [key,value] of [['ABS',car.abs],['TRACTION CONTROL',car.tc],['TRANSMISSION',car.transmission],['AÉRODYNAMIQUE',car.aero]]){const fact=node('div','vc-car-fact');fact.append(node('span','',key),node('strong','',value||'Non précisé'));facts.append(fact)}box.append(facts);
 const content=String(car.contenu||'');const lines=content.split(/\r?\n/);const bullets=lines.filter(s=>/^\s*[-•]\s+/.test(s)).map(s=>s.replace(/^\s*[-•]\s+/,''));
 if(bullets.length){box.append(node('h3','', 'CARACTÉRISTIQUES & PILOTAGE'));const ul=node('ul');for(const s of bullets)ul.append(node('li','',s));box.append(ul)}
 const tableLines=lines.filter(s=>/^\s*\|/.test(s));const rows=tableLines.map(s=>s.split('|').slice(1,-1).map(t=>t.trim())).filter(row=>row.length>=3&&!row.every(x=>/^[-:\s]+$/.test(x)));
 if(rows.length>1){box.append(node('h3','', 'PROBLÈMES FRÉQUENTS ET CORRECTIONS'));const table=node('table','vc-car-table');const head=node('thead'),tr=node('tr');for(const v of rows[0].slice(0,3))tr.append(node('th','',v));head.append(tr);table.append(head);const tbody=node('tbody');for(const row of rows.slice(1)){const r=node('tr');for(const v of row.slice(0,3))r.append(node('td','',v));tbody.append(r)}table.append(tbody);box.append(table)}
 const extra=lines.filter(s=>s.trim()&&!/^\s*[-•|]/.test(s)&&!/^ABS\s*:/i.test(s)&&!/^Problèmes et solutions\s*:/i.test(s));if(extra.length){box.append(node('h3','', 'CONSEILS & INFORMATIONS'));box.append(node('p','vc-raw',extra.join('\n').trim()))}
 const a=node('a','vc-link','UTILISER EN ENTRAÎNEMENT ↗');a.href='entrainement.html?categorie='+encodeURIComponent(car.nom);box.append(a)
};
function render(){const q=norm($('cars-search').value);const filtered=cars.filter(c=>(family==='Toutes'||c.famille===family)&&norm([c.nom,c.famille,c.abs,c.tc,c.transmission,c.aero,c.contenu].join(' ')).includes(q));$('cars-count').textContent=filtered.length+' catégorie(s) affichée(s)';$('cars-total').textContent=cars.length+' CATÉGORIES';if(!filtered.some(c=>c.id===selected))selected=filtered[0]?.id||'';
 const list=$('cars-list');list.replaceChildren();for(const c of filtered){const b=node('button','vc-car-item',c.nom);b.type='button';b.setAttribute('role','option');b.setAttribute('aria-selected',String(c.id===selected));b.append(node('small','',c.famille||''));b.addEventListener('click',()=>{selected=c.id;render();if(innerWidth<800)$('cars-detail').scrollIntoView({behavior:'smooth',block:'start'})});list.append(b)}details(filtered.find(c=>c.id===selected));document.querySelectorAll('.vc-chip').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.family===family)))}
for(const f of families){const b=node('button','vc-chip',f);b.type='button';b.dataset.family=f;b.addEventListener('click',()=>{family=f;render()});$('cars-families').append(b)}$('cars-search').addEventListener('input',render);render();
})();
