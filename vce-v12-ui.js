(()=>{'use strict';
function init(){
 const chat=document.getElementById('chat');if(!chat)return;
 const heading=document.querySelector('.vce-kb-heading p');if(heading)heading.textContent='Décris le symptôme, la phase du virage et les conditions. Le coach compare 5 000 situations techniques et présente plusieurs hypothèses vérifiables.';
 const examples=document.querySelector('.vce-kb-examples');if(examples){examples.innerHTML='';[
 ['Arrière + vibreur','Je perds l’arrière sur un vibreur'],['Sous-virage','Je sous-vire en entrée de virage'],['Patinage','Je patine en sortie à l’accélération'],['Pneus','Mes pneus arrière chauffent trop'],['Freinage','Ma distance de freinage est trop longue'],['Régularité','Je manque de régularité dans mes chronos']
 ].forEach(([label,query])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>window.sendMessage?.(query));examples.append(b)})}
 const think=document.createElement('div');think.id='vce5000Thinking';think.hidden=true;think.setAttribute('role','status');think.className='vce5000-thinking';think.innerHTML='<span class="vce5000-spinner"></span><span>Analyse en cours…</span>';chat.after(think);
 const tools=document.createElement('div');tools.className='vce5000-tools';tools.innerHTML=`<div class="vce5000-tools-title">AFFINER LE DIAGNOSTIC <small>Facultatif · les paramètres enrichissent la recherche</small></div><div class="vce5000-controls"><label>Phase<select id="vce5000Phase"><option value="">À déterminer</option><option value="entrée">Entrée</option><option value="freinage">Freinage</option><option value="milieu">Milieu de virage</option><option value="sortie">Sortie</option><option value="transition">Transition</option><option value="virage rapide">Virage rapide</option><option value="virage lent">Virage lent</option></select></label><label>Conditions<select id="vce5000Condition"><option value="">Non précisé</option><option value="piste sèche">Piste sèche</option><option value="pluie">Pluie / humide</option><option value="pneus froids">Pneus froids</option><option value="pneus chauds">Pneus chauds</option></select></label><label>Moment<select id="vce5000Moment"><option value="">Non précisé</option><option value="à l'accélération">Accélération</option><option value="au freinage">Freinage</option><option value="en roue libre">Roue libre</option><option value="au changement d'appui">Changement d'appui</option></select></label></div><div class="vce5000-note">La recherche est locale, sans API. Les 5 secondes correspondent à une animation d'analyse, pas à une vérification de télémétrie. Les réglages restent à tester sur plusieurs passages.</div>`;
 examples?.after(tools);
 // Les trois filtres sont ajoutés à la requête sans modifier le texte affiché dans l'input.
 const original=window.sendMessage;
 if(typeof original==='function'){
  window.sendMessage=function(raw){const input=document.getElementById('message');const originalText=String(raw??input?.value??'').trim();if(!originalText)return;
   const low=originalText.toLowerCase();const meta=[document.getElementById('vce5000Phase')?.value,document.getElementById('vce5000Condition')?.value,document.getElementById('vce5000Moment')?.value].filter(Boolean);
   const feedback=/^(ca|ça|c')|toujours pareil|aucun changement|deja|déjà|ajouter au bilan|nouveau probleme/i.test(low);
   if(meta.length&&!feedback){const enriched=originalText+' ; '+meta.join(' ; ');return original(enriched)}return original(raw);
  };
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
