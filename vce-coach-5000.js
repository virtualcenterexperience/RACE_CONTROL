/* VCE ESPORT / V12 — moteur déterministe contextuel, 5 000 fiches. Aucun service IA externe. */
(()=>{'use strict';
const STATE={records:[],ready:false,loading:true,busy:false,last:null,tried:new Set(),lastQuery:'',timer:null};
const $=id=>document.getElementById(id);
const N=s=>String(s??'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/['’]/g,' ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
const has=(s,patterns)=>patterns.some(p=>p.test(s));
const TYPES={
 vibreur:[/\bvibreur/,/\bkerb/,/\bbordure/,/\bbosse/,/\bsaute sur/,/\bchicane.*saut/],
 survirage:[/\bsurvir/,/\barriere.*(part|decroch|gliss|chass|perd|instab|s echapp|tourne)/,/\bperd.*\barriere/,/\btete a queue/,/\bqueue.*part/,/\bspin\b/],
 sousvirage:[/\bsous vir/,/\bavant.*(gliss|part|decroch|accroch|perd)/,/\btout droit/,/\bne tourne pas/,/\bpas de rotation/],
 freinage:[/\bfrein/,/\bblocage/,/\bbloqu.*roue/,/\block up/,/\bpedale de frein/],
 motricite:[/\bpatin/,/\bmotric/,/\baccel.*(gliss|perd|patin)/,/\btraction/],
 pneus:[/\bpneu/,/\btemperature/,/\bsurchauff/,/\busure/,/\bpression/],
 regularite:[/\bregul/,/\birregul/,/\bconstant/,/\bchrono.*vari/,/\btour.*different/],
 trajectoire:[/\btraject/,/\bcorde/,/\bapex/,/\bpoint de braquage/],
 pluie:[/\bpluie/,/\bmouille/,/\baquaplan/,/\bwet\b/],
 aero:[/\baero/,/\bappui/,/\baileron/,/\bdrs/],
 depart:[/\bdepart/,/\bstart/],
 mental:[/\bstress/,/\bconcentr/,/\bpression mental/,/\bpanique/],
 course:[/\bdepasse/,/\bdefen/,/\btrafic/,/\bstand/,/\bpit stop/],
 performance:[/\bperd.*temps/,/\blent/,/\bmanque de vitesse/,/\bdelta/],
 stabilite:[/\binstab/,/\brebond/,/\boscill/,/\bflott/,/\btalonn/]
};
const PHASES={
 'entrée':[/\bentree/,/\bavant le virage/,/\binscription/,/\bturn in/],
 'freinage':[/\bfreinage/,/\bau frein/,/\bfreinant/,/\bfreine/,/\bbraking/],
 'milieu':[/\bmilieu/,/\bcorde/,/\bapex/],
 'sortie':[/\bsortie/,/\breaccel/,/\bacceleration/,/\bremise des gaz/,/\bplein gaz/],
 'transition':[/\btransition/,/\bchangement d appui/,/\benchainement/],
 'ligne droite':[/\bligne droite/,/\bdroit/,/\bpleine vitesse/],
 'virage rapide':[/\bvirage rapide/,/\bcourbe rapide/,/\bhaute vitesse/],
 'virage lent':[/\bvirage lent/,/\bepingle/,/\bbasse vitesse/]
};
const CATS=[
 ['Porsche Cup 992',/\bporsche.*\bcup\b|\b992.*cup|\bcup 992/],['Hypercar LMDh',/\blmdh/],['Hypercar LMH',/\blmh/],['LMGT3',/\blmgt3/],['GT3',/\bgt3/],['GT4',/\bgt4/],['LMP2',/\blmp2/],['LMP3',/\blmp3/],['F1 moderne',/\bf1\b|\bformula 1\b/],['F2',/\bf2\b/],['F3',/\bf3\b/],['F4',/\bf4\b/],['IndyCar',/\bindy/],['TCR',/\btcr|\bwtcr/],['Super Trofeo',/\bsuper trofeo/],['Formula Ford',/\bformula ford/],['Ferrari Challenge',/\bferrari challenge/],['GTE',/\bgte/]
];
const aliasDomain={regularite:'régularité',stabilite:'stabilité',motricite:'motricité',aero:'aéro'};
function classify(q){const s=N(q);const matches=Object.entries(TYPES).filter(([k,v])=>has(s,v)).map(([k])=>k);
 const phase=Object.entries(PHASES).find(([k,v])=>has(s,v))?.[0]||null;
 const explicitCat=CATS.find(([k,re])=>re.test(s))?.[0]||null;
 const selected=N(($('category')?.value||'')+' '+($('car')?.value||''));
 const selectedCat=CATS.find(([k,re])=>re.test(selected))?.[0]||null;
 let primary=matches[0]||null;
 // On combine la perte de l'arrière avec le vibreur : le vibreur reste la cause contextuelle principale.
 if(matches.includes('vibreur'))primary='vibreur';
 else if(matches.includes('survirage'))primary='survirage';
 else if(matches.includes('sousvirage'))primary='sousvirage';
 else if(matches.includes('freinage')&&/\bbloqu|\bfrein/.test(s))primary='freinage';
 return {s,matches,phase,category:explicitCat||selectedCat,explicitCat,primary, rear:matches.includes('survirage'),front:matches.includes('sousvirage'),wet:matches.includes('pluie')};
}
function rank(q){const c=classify(q);if(!STATE.ready)return {context:c,results:[]};
 const tokens=c.s.split(' ').filter(w=>w.length>=4&&!['dans','avec','pour','mais','quand','voiture','cette','celle','plus','trop','suis','perds','perd','j ai','arriere'].includes(w));
 const ranked=[];
 for(const r of STATE.records){
  const domain=N(r.domaine),category=N(r.categorie),phase=N(r.phase);
  let score=0;
  if(c.category)score+=category===N(c.category)?80:-70;
  if(c.primary){if(domain===N(c.primary))score+=105;else if(c.primary==='vibreur'&&domain==='stabilite')score+=12;else score-=42;}
  if(c.phase)score+=phase===N(c.phase)?28:-5;
  if(c.wet&&domain==='pluie')score+=16;
  const keywords=N([r.probleme,...(r.mots_cles||[])].join(' '));
  for(const t of tokens){if(keywords.split(' ').includes(t))score+=3;}
  if(c.rear&&domain==='survirage'&&c.primary!=='vibreur')score+=15;
  if(c.front&&domain==='sousvirage'&&c.primary!=='vibreur')score+=15;
  if(score>0)ranked.push({r,score});
 }
 ranked.sort((a,b)=>b.score-a.score||a.r.id.localeCompare(b.r.id));
 return {context:c,results:ranked.slice(0,12)};
}
function chat(message,buttons=[]){if(typeof window.appendChat==='function')window.appendChat('COACH VCE',message,buttons);else console.info('[VCE coach]',message);}
function setStatus(msg,error=false){const e=$('vceKbStatus');if(e){e.textContent=msg;e.classList.toggle('error',error)}const s=$('vce5000Status');if(s){s.textContent=msg;s.classList.toggle('error',error)}}
function cleanHyp(h,rec){let action=h.action||'';
 // Ne pas recommander de régler des aides absentes de la catégorie.
 if(rec.abs_natif===false&&/regler l abs|augmenter l abs|reduire l abs/i.test(N(action)))return null;
 if(rec.tc_natif===false&&/regler le tc|augmenter le tc|reduire le tc/i.test(N(action)))return null;
 return {name:h.hypothese||'Hypothèse',action,validation:h.validation||'Comparer plusieurs passages similaires.'};
}
function hypotheses(rec){return (rec.hypotheses_et_solutions||[]).map(h=>cleanHyp(h,rec)).filter(Boolean)}
function describe(rec,c){const h=hypotheses(rec),tags=[rec.categorie,rec.phase,rec.domaine].join(' · ');
 let head=`🔎 ANALYSE CONTEXTUELLE — ${tags}\nFiche : ${rec.id} · Hypothèses à vérifier, pas diagnostic certain.`;
 if(c.primary==='vibreur'&&c.rear)head+='\n\nTu décris une perte de l’arrière AU PASSAGE D’UN VIBREUR. Je privilégie les causes liées au contact avec le vibreur, à la charge sur les roues et à la trajectoire — pas un problème de blocage au freinage sans indice.';
 else if(c.primary==='vibreur')head+='\n\nLe problème survient sur un vibreur : il faut isoler le passage, le volant et la réaction de la suspension.';
 else if(c.primary==='survirage')head+='\n\nTu signales un décrochage arrière : je cherche des causes de survirage plutôt que de blocage des roues.';
 else if(c.primary==='sousvirage')head+='\n\nTu signales un manque de rotation à l’avant : je privilégie les hypothèses de sous-virage.';
 const lines=h.map((x,i)=>`${i+1}. ${x.name}\n   → ${x.action}`).join('\n\n');
 const extras=[];
 if(rec.abs_natif===false)extras.push('ABS natif : non');else if(rec.abs_natif===true)extras.push('ABS natif : oui');
 if(rec.tc_natif===false)extras.push('TC natif : non');else if(rec.tc_natif===true)extras.push('TC natif : oui');
 if(c.wet&&rec.domaine!=='pluie')extras.push('Piste humide signalée : vérifier adhérence et conditions');
 const question=c.primary==='vibreur'&&c.rear?'Le décrochage survient-il en montant sur le vibreur, pendant le contact ou en redescendant ? Et es-tu sur les gaz, au frein ou en roue libre ?':rec.question_suivi;
 const variables=(rec.variables_a_relever||[]).slice(0,6).join(', ');
 const text=[head,`\n🧩 CAUSES POSSIBLES (CUMULABLES)\n${lines}`,`\n🧪 EXERCICE DE VALIDATION\n${h[0]?.validation||'Comparer trois passages dans les mêmes conditions.'}\nNe modifier qu’une variable à la fois.`,`\n📊 À RELEVER\n${variables}`,`\n❓ POUR AFFINER\n${question}`,extras.length?'\n⚙️ '+extras.join(' · '):''].join('\n');
 return {text,question,summary:`${rec.id} · ${rec.probleme}\n${h.map((x,i)=>`${i+1}. ${x.name} : ${x.action}`).join('\n')}\nValidation : ${h[0]?.validation||''}`,hypotheses:h};
}
function show(rec,c){STATE.last={rec,c,index:0};STATE.tried=new Set();const d=describe(rec,c);STATE.last.detail=d;
 try{if(window.dialogue){window.dialogue.summary=d.summary;window.dialogue.issue=rec.probleme;window.dialogue.pending='vce5000'}}catch(e){}
 chat(d.text,['J’ai déjà testé','Ça s’améliore','Toujours pareil','C’est pire','Ajouter au bilan']);setStatus('5 000 fiches · diagnostic '+rec.id+' affiché');}
function followUp(raw){if(!STATE.last)return false;const s=N(raw);
 if(/ajouter au bilan/.test(s))return false;
 const {rec,c,detail}=STATE.last;
 if(/deja test|deja fait|toujours pareil|aucun changement|c est pire|ca empire|pire qu avant/.test(s)){
  const h=detail.hypotheses;const idx=STATE.last.index;
  STATE.tried.add(idx);STATE.last.index=idx+1;
  const next=h[STATE.last.index];
  if(!next){chat('Les principales hypothèses de cette fiche ont été parcourues. Je ne vais pas inventer une autre cause. Reviens au réglage précédent si le comportement s’est dégradé, puis donne-moi la phase précise, les commandes et les données de télémétrie.');return true}
  chat(`${/pire|empire/.test(s)?'↩️ Reviens au réglage précédent avant le prochain test.\n\n':''}🔧 HYPOTHÈSE ${STATE.last.index+1} / ${h.length} : ${next.name}\n→ ${next.action}\n\n🧪 ${next.validation}\n\n${detail.question}`,['Ça s’améliore','Toujours pareil','C’est pire','Ajouter au bilan']);return true;
 }
 if(/ca s ameliore|c est mieux|ca va mieux|amelioration/.test(s)){chat('C’est encourageant, mais pas encore une preuve. Refais au moins 3 passages comparables, compare les chronos et la stabilité, puis garde la correction uniquement si le résultat se répète.',['Ajouter au bilan','Nouveau problème']);return true}
 return false;
}
function handle(raw){const q=String(raw||'').trim();if(!q)return false;
 if(followUp(q))return true;
 if(!STATE.ready){chat('La base technique des 5 000 situations se charge. Attends un instant puis réessaie.');return true}
 if(STATE.busy){chat('Une analyse est déjà en cours. Attends le résultat avant d’envoyer une nouvelle question.');return true}
 const {context,results}=rank(q);
 if(!context.primary){chat('Je ne peux pas identifier suffisamment précisément le problème sans risquer une réponse hors sujet. Précise ce qui se passe (arrière qui glisse, sous-virage, freinage, vibreur, pneus…), à quel moment du virage et dans quelle voiture.',['Je perds l’arrière sur un vibreur','Je sous-vire en entrée','Je patine en sortie']);return true}
 if(!results.length||results[0].score<50){chat('Je n’ai pas trouvé de correspondance fiable dans les 5 000 fiches pour cette combinaison. Précise la catégorie de voiture, la phase du virage et le symptôme. Je préfère demander plutôt qu’inventer une cause.');return true}
 STATE.busy=true;STATE.lastQuery=q;setStatus('Analyse en cours : rapprochement des mots-clés, de la voiture et de la phase…');
 const typing=$('vce5000Thinking');if(typing){typing.hidden=false;typing.textContent='Recherche parmi 5 000 situations · analyse du contexte…'}
 // Le délai de 4,8 s est une animation UX demandée, pas le temps de calcul réel.
 STATE.timer=setTimeout(()=>{STATE.busy=false;if(typing)typing.hidden=true;show(results[0].r,context)},4800);
 return true;
}
window.VCEKnowledge={handle,rank, classify, get ready(){return STATE.ready},get records(){return STATE.records},get busy(){return STATE.busy},getSummary(){return STATE.last?.detail?.summary||''}};
fetch('solutions_5000.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(rows=>{
 if(!Array.isArray(rows)||rows.length!==5000||new Set(rows.map(x=>x.id)).size!==5000||!rows.every(x=>x.id&&x.categorie&&x.domaine&&Array.isArray(x.hypotheses_et_solutions)))throw Error('Base de 5000 fiches invalide');
 STATE.records=rows;STATE.ready=true;STATE.loading=false;setStatus('5 000 situations prêtes · recherche contextuelle active');
}).catch(err=>{STATE.loading=false;setStatus('Impossible de charger les 5 000 fiches. Ouvre le site via GitHub Pages ou un serveur HTTP.',true);console.error('[VCE5000]',err)});
})();
