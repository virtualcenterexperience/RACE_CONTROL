/* VCE ESPORT — moteur de recherche conversationnelle locale, 1000 solutions */
(()=>{'use strict';
const KB={records:[],ready:false,last:null,loading:true};
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
const stop=new Set('je j ai suis mon ma mes le la les un une des du de d en a au aux sur dans avec pour et ou que qui quoi c est il elle me ne pas plus trop tres ca se ce cette cette comment pourquoi quand tout tous voiture virage probleme arrive faire fais fait avoir'.split(' '));
const tokens=s=>norm(s).split(' ').filter(x=>x.length>=3&&!stop.has(x));
const stem=s=>s.replace(/(ements|ement|ations|ation|euses|euse|eaux|aux|eurs|eur|euses|ants|ant|ent|es|s)$/,'');
const ALIASES={
 'regularite des chronos':['pas regulier','irregulier','chronos differents','temps au tour','manque de constance','pas constant','regularite','delta instable'],
 'freinage trop tardif':['freine trop tard','frein trop tard','rate le freinage','freinage tard','arrive trop vite'],
 'freinage trop precoce':['freine trop tot','frein trop tot','freinage trop tot','freine trop en avance'],
 'blocage avant':['bloque les roues avant','blocage des roues avant','roues avant bloquent','bloque avant','lock up avant','avant bloque'],
 'blocage arriere':['bloque les roues arriere','blocage des roues arriere','arriere bloque','lock up arriere'],
 'freinage instable':['freinage instable','instable au freinage','voiture bouge en freinant'],
 'freinage degressif difficile':['relacher le frein','trail braking','freinage degressif','dosage frein'],
 'abs trop actif':['abs se declenche','abs intervient','abs tout le temps','abs trop'],
 'distance de freinage excessive':['freinage trop long','distance de freinage','freine pas assez','ne freine pas'],
 'retrogradages rates':['retrogradage','descendre les rapports','mauvaise vitesse au freinage'],
 'sous virage entree':['sous vire en entree','sous virage entree','tout droit en entree','tourne pas en entree'],
 'sous virage milieu':['sous vire au milieu','sous virage milieu','tout droit au milieu','tourne pas a la corde'],
 'sous virage sortie':['sous vire en sortie','sous virage sortie','tout droit en sortie'],
 'survirage entree':['survire en entree','survirage entree','arriere glisse en entree','tete a queue en entree'],
 'survirage milieu':['survire au milieu','survirage milieu','arriere glisse au milieu'],
 'survirage sortie':['survire en sortie','survirage sortie','arriere part a la sortie','tete a queue en sortie'],
 'patinage':['patine','roues patinent','perte de motricite','patinage','patinage acceleration'],
 'vitesse de sortie faible':['lent en sortie','perds du temps en sortie','pas de vitesse en sortie','relance lente','accelere pas assez en sortie'],
 'vitesse de pointe faible':['vitesse de pointe','lent en ligne droite','manque de vitesse maxi','vmax'],
 'point de corde manque':['rate le point de corde','manque la corde','rate l apex','rate la trajectoire'],
 'rotation trop tot':['tourne trop tot','braque trop tot','rotation precoce'],
 'rotation trop tard':['tourne trop tard','braque trop tard','rotation tardive'],
 'corrections volant excessives':['corrige trop au volant','trop de corrections','volant instable','zigzag'],
 'virages lents difficiles':['virage lent','epingle difficile','virages lents'],
 'virages rapides difficiles':['virage rapide','courbe rapide','virages rapides'],
 'chicanes lentes':['chicane lente','chicanes lentes'],
 'vibreurs destabilisant':['vibreur','vibreurs','bordure','kerb','kerbs'],
 'pneus avant trop chauds':['pneus avant chauffent','surchauffe avant','temperature pneus avant','pneus avant chauds'],
 'pneus arriere trop chauds':['pneus arriere chauffent','surchauffe arriere','temperature pneus arriere','pneus arriere chauds'],
 'pneus trop froids':['pneus froids','pneus pas chauds','manque de temperature pneus'],
 'usure des pneus rapide':['pneus usent','usure pneus','pneus uses trop vite','degradation pneus'],
 'conduite sous pluie lente':['lent sous la pluie','pluie','piste mouillee'],
 'aquaplaning':['aquaplaning','perd contact avec piste humide','flotte sur eau'],
 'qualification irreguliere':['qualifications irregulieres','qualif','tour de qualification'],
 'debut de relais lent':['debut relais lent','lent debut relais','premiers tours lents'],
 'fin de relais lente':['fin relais lente','lent fin relais','derniers tours lents'],
 'consommation excessive':['consomme trop','consommation','trop essence','trop carburant'],
 'depassements difficiles':['depasser','depassement','difficile doubler','n arrive pas a doubler'],
 'defense inefficace':['defense','me fais depasser','defendre position'],
 'trafic stressant':['trafic','traffic','voitures autour','peloton'],
 'contacts frequents':['contact','accrochage','collision','touche les autres'],
 'concentration faible':['concentration','deconcentre','perd attention'],
 'stress au depart':['stress au depart','pression depart','nerveux depart'],
 'depart arrete rate':['rate mon depart','depart rate','cale au depart','mauvais depart'],
 'montees de rapport ratees':['monte les rapports','passage vitesse rate','upshift','montee de rapport'],
 'reglages incompris':['reglages','setup','comprends pas les reglages','suspension'],
 'voiture qui talonne':['talonne','touche le sol','fond plat touche','bottoming'],
 'voiture qui rebondit':['rebondit','saute','rebond','marsouinage'],
 'arrets aux stands lents':['arret au stand','pit stop','pitstop','stands lents'],
 'penalites limites piste':['limites piste','track limits','penalite piste','hors piste']
};
const phraseIndex=Object.entries(ALIASES).map(([key,phrases])=>({key,phrases:phrases.map(norm)}));
function category(){const v=norm(document.getElementById('category')?.value||'');const car=norm(document.getElementById('car')?.value||'');if(/porsche|pcup|cup 992/.test(v+' '+car))return 'pcup';if(/gt3/.test(v))return 'gt3';if(/gt4/.test(v))return 'gt4';if(/lmp2/.test(v))return 'lmp2';if(/lmp3/.test(v))return 'lmp3';if(/lmdh/.test(v))return 'lmdh';if(/lmh/.test(v))return 'lmh';if(/f1/.test(v))return 'f1';if(/f4/.test(v))return 'f4';if(/f3/.test(v))return 'f3';if(/indy/.test(v))return 'indy';if(/tcr|traction|wtcr/.test(v))return 'tcr';return 'general'}
function queryCategory(q){const v=norm(q);if(/porsche cup|992 cup|pcup/.test(v))return 'pcup';if(/\bgt3\b/.test(v))return 'gt3';if(/\bgt4\b/.test(v))return 'gt4';if(/\blmp2\b/.test(v))return 'lmp2';if(/\blmp3\b/.test(v))return 'lmp3';if(/\blmdh\b/.test(v))return 'lmdh';if(/\blmh\b/.test(v))return 'lmh';if(/\bf1\b/.test(v))return 'f1';if(/\bf4\b/.test(v))return 'f4';if(/\bf3\b/.test(v))return 'f3';if(/\btcr\b/.test(v))return 'tcr';return null}
function rank(q){const n=norm(q), ts=tokens(q), st=ts.map(stem), preferred=queryCategory(q)||category();const candidates=[];
for(const key of new Set(KB.records.map(r=>norm(r.probleme)))){
 let score=0;const kt=tokens(key).map(stem);const matched=st.filter(t=>kt.some(k=>k===t||k.startsWith(t)&&t.length>4||t.startsWith(k)&&k.length>4));score+=matched.length*5;
 if(n.includes(key))score+=35;
 const phrases=phraseIndex.find(x=>x.key===key)?.phrases||[];
 for(const p of phrases){if(n.includes(p))score+=26+p.split(' ').length*2;else if(p.length>9&&p.includes(n))score+=6}
 // Phrase spécifique : les mots "entrée", "milieu", "sortie" doivent guider le diagnostic.
 for(const zone of ['entree','milieu','sortie','avant','arriere']){if(n.includes(zone)){if(key.includes(zone))score+=8;else if(['entree','milieu','sortie'].some(z=>key.includes(z)))score-=5;else if(['avant','arriere'].some(z=>key.includes(z)))score-=5}}
 if(score>0)candidates.push({key,score});
}
candidates.sort((a,b)=>b.score-a.score);
return {preferred,results:candidates.filter(x=>x.score>=8).slice(0,5)};
}
function choose(key,preferred){return KB.records.find(r=>norm(r.probleme)===key&&r.contexte_id===preferred)||KB.records.find(r=>norm(r.probleme)===key&&r.contexte_id==='general')||KB.records.find(r=>norm(r.probleme)===key)}
function answer(rec,other){KB.last=rec;const where=document.getElementById('corner')?.value?.trim();const track=document.getElementById('track')?.value?.trim();const details=[rec.contexte,track,where].filter(Boolean).join(' · ');
const lines=[`🎯 DIAGNOSTIC : ${rec.probleme.toUpperCase()}`,`Catégorie / contexte : ${details||rec.contexte}`,`\n🔧 CORRECTION\n${rec.solution}`,`\n🏁 EXERCICE\n${rec.exercice}`,`\n📊 À MESURER\n${rec.variable_a_analyser}`,`\n❓ QUESTION POUR AFFINER\n${rec.question_suivi}`];
if(rec.verification)lines.push(`\n⚠️ ${rec.verification}`);
dialogue.summary=`${rec.probleme} (${rec.contexte})\nCorrection : ${rec.solution}\nExercice : ${rec.exercice}\nMesure : ${rec.variable_a_analyser}`;
dialogue.issue=rec.probleme;dialogue.pending='kb-feedback';
const buttons=['Ça s’améliore','Toujours pareil','C’est pire','Ajouter au bilan'];
if(other?.length)buttons.push(...other.slice(0,2).map(x=>'Autre piste : '+x));
window.appendChat('COACH VCE',lines.join('\n'),buttons);
}
function handle(raw){if(!KB.ready)return false;const q=norm(raw);
if(/^autre piste\s/.test(q)){const key=norm(raw.replace(/^autre piste\s*:\s*/i,''));const r=choose(key,category());if(r){answer(r);return true}}
if(KB.last&&(/ca s ameliore|c est mieux|ca va mieux|toujours pareil|aucun changement|c est pire|pire qu avant|je bloque encore/.test(q))){
 const better=/ameliore|mieux/.test(q),worse=/pire|bloque encore/.test(q);
 const t=better?'Bonne évolution ! Refais 5 tours dans les mêmes conditions et compare la dispersion des chronos. Garde cette correction si elle reste efficace.':worse?'La correction semble inadaptée. Reviens au réglage et au repère précédents, puis isole une seule variable.':'D’accord. Change un seul paramètre à la fois et note les chronos avant/après pour savoir ce qui fonctionne.';
 window.appendChat('COACH VCE',t+'\n\n'+KB.last.question_suivi,['Je bloque au freinage','Je sous-vire en entrée','Je perds du temps en sortie','Ajouter au bilan']);return true;
}
const {preferred,results}=rank(raw);
if(!results.length)return false;
const best=results[0];
if(best.score<13)return false;
const rec=choose(best.key,preferred);if(!rec)return false;
answer(rec,results.slice(1).filter(x=>x.score>=Math.max(12,best.score*.43)).map(x=>choose(x.key,preferred)?.probleme).filter(Boolean));return true;
}
function setStatus(t,error=false){const el=document.getElementById('vceKbStatus');if(el){el.textContent=t;el.classList.toggle('error',error)}}
window.VCEKnowledge={handle,rank,choose,category,get records(){return KB.records},get ready(){return KB.ready}};
document.querySelectorAll('[data-vce-example]').forEach(b=>b.addEventListener('click',()=>{const text=b.dataset.vceExample;const input=document.getElementById('message');if(input)input.value=text;if(typeof window.sendMessage==='function')window.sendMessage(text)}));
fetch('../DATA/solutions_1000.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(data=>{
 if(!Array.isArray(data)||!data.length||!data.every(r=>r.id&&r.probleme&&r.solution&&r.exercice))throw Error('Format JSON incorrect');
 KB.records=data;KB.ready=true;KB.loading=false;setStatus(data.length.toLocaleString('fr-FR')+' solutions disponibles');
}).catch(err=>{KB.loading=false;setStatus('Base non chargée — coach classique actif',true);console.warn('[VCE] Base solutions_1000.json non chargée :',err.message)});
})();
