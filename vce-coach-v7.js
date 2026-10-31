(()=>{'use strict';
const $=id=>document.getElementById(id);if(!$('chat')||!$('diagnose')||!Array.isArray(window.DATA)){
 // DATA is declared in a classic script as a top-level lexical binding, not a window property.
 if(!$('chat')||!$('diagnose'))return;
}
const list=typeof DATA!=='undefined'?DATA:[];if(!list.length)return;
const root=$('v7-diagnostic');if(!root)return;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const tokens=s=>norm(s).split(/[^a-z0-9]+/).filter(w=>w.length>3);
const synonyms=[['frein','freinage','bloque','blocage','deceleration'],['sousvirage','sous-vire','tout droit','avant','tourne pas'],['survirage','arriere','tete a queue','glisse'],['gaz','acceleration','patine','motricite','traction'],['pneu','temperature','surchauffe','usure'],['corde','trajectoire','apex','vibreur'],['rythme','regulier','regularite','constance']];
const state={last:null,turns:0,history:[],experiment:null};
const text=(id)=>$(id)?.value||'';
function bubble(role,content){const e=document.createElement('div');e.className='bubble'+(role==='Pilote'?' me':'');e.textContent=role+' : '+content;$('chat').append(e);$('chat').scrollTop=$('chat').scrollHeight;}
function score(x,q){const qn=norm(q),t=norm(x.probleme),full=norm([x.probleme,x.diagnostic,x.correction,x.phase,x.categorie].join(' '));let n=0;for(const w of tokens(qn)){if(t.includes(w))n+=10;else if(full.includes(w))n+=2}for(const g of synonyms)if(g.some(w=>qn.includes(w))&&g.some(w=>t.includes(w)))n+=11;if(text('problem')!=='Tous'&&x.probleme===text('problem'))n+=17;if(text('phase')!=='Tous'&&x.phase===text('phase'))n+=11;if(text('cat')!=='Tous'&&x.categorie===text('cat'))n+=10;return n}
function pick(q){let a=list.filter(x=>(text('cat')==='Tous'||x.categorie===text('cat'))&&(text('phase')==='Tous'||x.phase===text('phase'))&&(text('problem')==='Tous'||x.probleme===text('problem')));if(!a.length)a=list;return a.map(x=>({x,s:score(x,q)})).sort((a,b)=>b.s-a.s).slice(0,3)}
function setSteps(x){const steps=$('v7-steps');if(!steps)return;steps.replaceChildren();for(const [tag,body] of [['01 · HYPOTHÈSE',x.diagnostic],['02 · CORRECTION',x.correction],['03 · EXERCICE',x.exercice]]){const item=document.createElement('div');item.className='v7-step';const b=document.createElement('b');b.textContent=tag;const p=document.createElement('p');p.textContent=body;item.append(b,p);steps.append(item)}}
function assess(q,origin='message'){const raw=q.trim();if(!raw){bubble('Coach VCE','Décris un symptôme précis : à quel virage, pendant quelle phase, et comment réagit la voiture ?');return}state.turns++;const ranked=pick(raw);const best=ranked[0],x=best.x;state.last=x;state.history.push({q:raw,id:x.id,at:new Date().toISOString()});state.history=state.history.slice(-30);state.experiment=x;
const severity=Number(text('v7-severity')||5),frequency=Number(text('v7-frequency')||5),grip=Number(text('v7-grip')||5);
const confidence=best.s>=35?'correspondance assez forte':best.s>=16?'correspondance moyenne':'correspondance faible';
const phase=text('phase')==='Tous'?'phase non précisée':text('phase');
const car=typeof chosenCar==='function'?chosenCar():null;
let carAdvice='';if(car&&typeof carFact==='function')carAdvice='\n\nVéhicule sélectionné : '+carFact()+'\nLes aides électroniques dépendent de la version et du simulateur.';
const msg=['ANALYSE CONTEXTUELLE · '+x.id+' · '+confidence,'Symptôme retenu : '+x.probleme+' ('+phase+').','Intensité '+severity+'/10 · fréquence '+frequency+'/10 · adhérence estimée '+grip+'/10.','',
'Hypothèse : '+x.diagnostic,'','À tester en premier : '+x.correction,'','Adaptation : '+x.adaptation,'','Exercice ciblé : '+x.exercice,'','Contrôle : '+x.validation,'',
'Question pour affiner : '+x.question];
if(severity>=8)msg.push('','Priorité : réduire le rythme et retrouver des passages propres avant de rechercher le chrono.');
if(grip<=3)msg.push('','Adhérence faible : retarder les sollicitations et lisser frein, volant et accélérateur.');
if(frequency>=8)msg.push('','Problème fréquent : répéter 3 passages avec une seule correction pour isoler la cause.');
if(best.s<16)msg.push('','⚠️ Le ressenti est encore peu précis : le diagnostic reste une hypothèse, pas une mesure de télémétrie.');
if(carAdvice)msg.push(carAdvice);
if(origin==='message')bubble('Pilote',raw);
bubble('Coach VCE',msg.join('\n'));
setSteps(x);
try{if(typeof diagnose==='function')diagnose(raw)}catch{}
$('v7-coach-status').textContent='Analyse '+state.turns+' · '+confidence;
}
function followup(outcome){if(!state.experiment){bubble('Coach VCE','Commence par décrire ton problème pour recevoir un exercice.');return}const x=state.experiment;
const prompt=outcome==='better'?'Ça s’améliore':outcome==='same'?'Pas de changement':'C’est pire';bubble('Pilote',prompt);
let reply='';if(outcome==='better')reply='Bien. Garde exactement ce réglage ou ce geste pendant 3 passages supplémentaires. Compare tes chronos, ton point de freinage et la stabilité de la voiture. '+x.validation+'\n\nNouvelle question : '+x.question;
else if(outcome==='same')reply='Ne change pas plusieurs paramètres à la fois. Vérifie d’abord si le problème survient au même endroit et dans la même phase. '+x.question+'\n\nSi oui, décris ce que tu fais juste avant que le symptôme apparaisse.';
else reply='Reviens à ton geste précédent et réduis le rythme. La correction testée n’est peut-être pas adaptée. Vérifie les conditions de piste et le modèle de voiture. '+x.question+'\n\nDécris ce qui s’est aggravé pour recalculer une hypothèse.';
bubble('Coach VCE',reply)}
root.addEventListener('input',e=>{if(e.target.matches('input[type="range"]')){const o=root.querySelector('output[for="'+e.target.id+'"]');if(o)o.textContent=e.target.value+'/10'}});
root.addEventListener('click',e=>{const b=e.target.closest('[data-v7-action]');if(!b)return;const action=b.dataset.v7Action;if(action==='reset'){state.history=[];state.turns=0;state.last=null;state.experiment=null;$('chat').replaceChildren();$('v7-steps').replaceChildren();$('v7-coach-status').textContent='Prêt à analyser';bubble('Coach VCE','Nouvelle séance de diagnostic. Décris ton ressenti et indique la phase du virage.');return}if(action==='better'||action==='same'||action==='worse')followup(action);});
$('diagnose').onclick=()=>assess(text('free')||(text('problem')==='Tous'?'':text('problem')),'selector');
$('send').onclick=()=>{const msg=$('msg');const q=msg.value.trim();if(!q)return;msg.value='';assess(q)};
$('msg').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('send').click()}};
})();
