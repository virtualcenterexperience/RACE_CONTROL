/* VCE ESPORT V21 — données circuits & lexique locaux. Aucun appel cloud. */
(()=>{'use strict';
const $=id=>document.getElementById(id),norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
let circuits=[],lexicon=[],selected=null;
const safe=s=>String(s||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function trackOf(s){const n=norm(s);if(!n)return null;return circuits.find(c=>[c.name,...(c.aliases||[])].some(a=>norm(a)===n))||circuits.find(c=>[c.name,...(c.aliases||[])].some(a=>norm(a).includes(n)&&n.length>3))||null}
function detectTrack(q){const n=norm(q);if(!n)return null;return circuits.find(c=>[c.name,...(c.aliases||[])].some(a=>norm(a).length>=4 && (' '+n+' ').includes(' '+norm(a)+' ')))||null}
function findTurn(c,q){if(!c)return null;const n=norm(q),list=c.virages||[];
 const number=n.match(/\b(?:virage|turn|corner|t)\s*([0-9]{1,3})\b/);
 if(number){const match=list.find(t=>Number(t.numero)===Number(number[1]));if(match)return match}
 const byName=list.filter(t=>t.nom&&norm(t.nom).length>=4&&(' '+n+' ').includes(' '+norm(t.nom)+' '));
 return byName.length===1?byName[0]:null;
}
function turnFromSelect(c){const n=Number($('v21-turn')?.value);return n>0?c?.virages?.find(t=>t.ordre_section===n):null}
function describe(c,t,weather){if(!c)return '';
 let parts=[`${c.name} (${c.country}) · ${c.layout||'tracé principal'} · ${(c.virages||[]).length} entrées de virages`];
 if(c.notes)parts.push('Note tracé : '+c.notes);
 if(t){parts.push(`${t.etiquette||t.nom||'Section'} · ${t.numero==null?'section':`T${t.numero}`} · ${t.vitesse_classe||'classe non précisée'} (classe relative, pas vitesse réelle)`);
 if(t.profil?.risques?.length)parts.push('Points de vigilance possibles : '+t.profil.risques.join(', '));
 if(t.profil?.priorite)parts.push('Objectif : '+t.profil.priorite);
 if(t.profil?.test)parts.push('Test indicatif : '+t.profil.test);
 }else parts.push('Précise un virage pour obtenir des points de vigilance ciblés.');
 if(weather)parts.push('Conditions déclarées : '+(weather==='pluie'?'humide / pluie':'piste sèche'));
 parts.push('Les risques sont indicatifs : la voiture, le jeu, le tracé et les données réelles restent nécessaires.');return parts.join('\n');}
function contextForQuestion(q){const c=detectTrack(q)||trackOf($('track')?.value)||selected;if(!c)return '';
 const explicit=detectTrack(q),t=findTurn(c,q)||(explicit?null:turnFromSelect(c));
 return describe(c,t,$('v21-weather')?.value||'');}
function update(){selected=trackOf($('track')?.value);const select=$('v21-turn');if(!select)return;const previous=select.value;
 select.replaceChildren(new Option('Circuit entier / virage non précisé',''));
 if(selected){(selected.virages||[]).forEach(t=>select.add(new Option(`${t.numero==null?'§':`T${t.numero}`} · ${t.etiquette||t.nom||'Section'} · ${t.vitesse_classe||'NC'}`,String(t.ordre_section))));
 if([...select.options].some(x=>x.value===previous))select.value=previous;
 }$('v21-track-summary').textContent=selected?describe(selected,turnFromSelect(selected),$('v21-weather').value):'Sélectionne un circuit dans le champ « Circuit » pour consulter les virages et les conseils associés.';
}
function addContext(){const c=selected||trackOf($('track')?.value);if(!c){$('v21-track-summary').textContent='Choisis d’abord un circuit reconnu.';return}
 const t=turnFromSelect(c);if(t&&$('corner'))$('corner').value=t.etiquette||t.nom||`T${t.numero}`;
 const box=$('message');if(!box)return;const prefix=`Sur ${c.name}${t?` au ${t.etiquette||t.nom||`virage ${t.numero}`}`:''}${$('v21-weather').value==='pluie'?', sous la pluie':$('v21-weather').value==='sec'?', sur piste sèche':''}, `;
 box.value=prefix+box.value.replace(/^\s*/, '');box.focus();box.scrollIntoView({behavior:'smooth',block:'center'});
}
function renderLexicon(){const q=norm($('v21-lexicon-query')?.value);const out=$('v21-lexicon-results');if(!out)return;out.replaceChildren();let count=0;
 for(const sec of lexicon){for(const term of sec.terms){if(q&&!norm(term).includes(q))continue;const b=document.createElement('button');b.type='button';b.className='v21-term';b.textContent=term;b.title=sec.title;b.addEventListener('click',()=>{const m=$('message');if(m){m.value+=(m.value?' ':'')+term;m.focus()}});out.appendChild(b);if(++count>=65)break}if(count>=65)break}
 if(!count)out.textContent='Aucun terme correspondant.';
}
window.VCECircuitCoach={contextForQuestion,trackOf,findTurn,get circuits(){return circuits}};
Promise.all([fetch('vce-circuits-complets.json').then(r=>{if(!r.ok)throw Error('Circuits '+r.status);return r.json()}),fetch('vce-lexique.json').then(r=>{if(!r.ok)throw Error('Lexique '+r.status);return r.json()})]).then(([data,lex])=>{
 circuits=Object.values(data.continents||{}).flat();lexicon=lex.sections||[];
 const loaded=$('v21-loaded');if(loaded)loaded.textContent=`${circuits.length} circuits · ${circuits.reduce((n,c)=>n+(c.virages||[]).length,0)} virages · ${lexicon.reduce((n,s)=>n+s.terms.length,0)} mots-clés`;
 const input=$('track');if(input){const list=$('trackNames');if(list){const known=new Set([...list.options].map(o=>norm(o.value)));circuits.forEach(c=>{if(!known.has(norm(c.name)))list.add(new Option(c.name,c.name))})}input.addEventListener('input',update);input.addEventListener('change',update)}
 $('v21-turn')?.addEventListener('change',update);$('v21-weather')?.addEventListener('change',update);
 $('v21-ask')?.addEventListener('click',addContext);
 $('v21-lexicon')?.addEventListener('click',()=>{$('v21-lexicon-details').open=!$('v21-lexicon-details').open;if($('v21-lexicon-details').open)$('v21-lexicon-query').focus()});
 $('v21-lexicon-query')?.addEventListener('input',renderLexicon);renderLexicon();update();
 }).catch(e=>{if($('v21-loaded'))$('v21-loaded').textContent='Référentiels indisponibles';console.error('[VCE V21]',e)});
})();
