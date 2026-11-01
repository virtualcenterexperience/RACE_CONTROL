/* Connects finished legacy timer sessions to the V18 approval queue (pending only).
   The timer itself is not proof of driving. Staff approves server-side. */
(()=>{'use strict';
function status(t){let el=document.getElementById('v18-training-cloud-state');if(!el){el=document.createElement('div');el.id='v18-training-cloud-state';el.className='v18-cloud-bar';const target=document.getElementById('vce-training-dashboard')||document.querySelector('main')||document.body;target.parentElement?.insertBefore(el,target)}el.textContent=t}
async function submit(e){const c=window.VCECloud;if(!c?.enabled)return;const p=e.detail?.pilot,s=e.detail?.session;if(!p||!s)return;
 if(!c.user){status('Séance enregistrée localement. Connecte-toi sur le Tableau de bord pour envoyer tes prochaines séances au Staff cloud.');return}
 try{const pp=await c.table('member_profiles','select=display_name&id=eq.'+c.user.id);const cloudName=String(pp[0]?.display_name||'').trim().toLocaleLowerCase('fr');const localName=String(p.name||'').trim().toLocaleLowerCase('fr');
 if(cloudName!==localName){status('Séance enregistrée localement, non envoyée au cloud : le nom du compte connecté ne correspond pas au pilote sélectionné.');return}
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(s.endedAt||Date.now()));const get=k=>parts.find(x=>x.type===k)?.value;const date=get('year')+'-'+get('month')+'-'+get('day');
 await c.call('/rest/v1/training_logs',{method:'POST',body:{user_id:c.user.id,session_date:date,minutes:Math.max(1,Math.ceil(Number(s.seconds||0)/60)),track:String(s.track||'').slice(0,120),exercise:String(s.exercise||'').slice(0,120),evidence:'Chronomètre navigateur : '+String(s.id).slice(0,80),status:'pending'}});
 status('Séance transmise au Staff cloud pour validation. Les points seront attribués une seule fois par journée validée.');
 }catch(err){status('Séance locale conservée. Envoi cloud impossible : '+err.message)}
}
function init(){const c=window.VCECloud;status(c?.enabled?(c.user?'Compte connecté : les séances terminées pourront être soumises au Staff cloud.':'Connecte-toi via le Tableau de bord pour synchroniser les séances.'):'Mode local : chronomètre et validations conservés dans ce navigateur.');window.addEventListener('vce:session-finished',submit);window.addEventListener('vce:cloud-auth',()=>status(c.enabled?(c.user?'Compte cloud connecté.':'Connecte-toi via le Tableau de bord pour synchroniser les séances.'):'Mode local : données sur cet appareil.'))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
