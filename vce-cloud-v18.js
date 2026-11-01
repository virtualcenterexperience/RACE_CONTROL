/* VCE V18 — Supabase REST, zero external JS dependencies. Authenticated writes enforced by RLS. */
(()=>{'use strict';
const cfg=window.VCE_CLOUD_CONFIG||{},url=String(cfg.url||'').replace(/\/$/,''),key=String(cfg.anonKey||'');
const enabled=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)&&key.length>20;
const SESSION='vce_v18_auth_session';let session=null,role='visitor';
try{session=JSON.parse(sessionStorage.getItem(SESSION)||'null')}catch{}
const emit=()=>window.dispatchEvent(new CustomEvent('vce:cloud-auth',{detail:{role,user:session?.user||null}}));
async function request(path,{method='GET',body,auth=true,headers={}}={}){
 if(!enabled)throw Error('Supabase non configuré');
 const h={apikey:key,Authorization:'Bearer '+(auth&&session?.access_token?session.access_token:key),...headers};
 if(body!==undefined)h['Content-Type']='application/json';
 const r=await fetch(url+path,{method,headers:h,body:body===undefined?undefined:JSON.stringify(body)});
 if(!r.ok){let message='HTTP '+r.status;try{const e=await r.json();message=e.message||e.error_description||e.error||message}catch{};throw Error(message)}
 if(r.status===204)return null;const text=await r.text();return text?JSON.parse(text):null;
}
async function refresh(){if(!session?.refresh_token)return false;try{const r=await request('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:session.refresh_token},auth:false});session=r;sessionStorage.setItem(SESSION,JSON.stringify(r));await getRole();return true}catch{session=null;role='visitor';sessionStorage.removeItem(SESSION);emit();return false}}
async function call(path,opts={}){try{return await request(path,opts)}catch(e){if(session?.refresh_token&&/JWT expired|invalid jwt|HTTP 401/i.test(e.message)&&await refresh())return request(path,opts);throw e}}
async function getRole(){if(!session?.user?.id){role='visitor';emit();return role}try{const rows=await call('/rest/v1/member_profiles?select=role,display_name&id=eq.'+encodeURIComponent(session.user.id));role=rows?.[0]?.role||'pilot'}catch{role='pilot'}emit();return role}
async function signIn(email,password){const data=await request('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password},auth:false});session=data;sessionStorage.setItem(SESSION,JSON.stringify(data));await getRole();return data}
async function signUp(email,password,name){const data=await request('/auth/v1/signup',{method:'POST',body:{email,password,data:{display_name:name}},auth:false});if(data.access_token){session=data;sessionStorage.setItem(SESSION,JSON.stringify(data));await getRole()}return data}
async function signOut(){try{await call('/auth/v1/logout',{method:'POST'})}catch{}session=null;role='visitor';sessionStorage.removeItem(SESSION);emit()}
async function table(name,params=''){return call('/rest/v1/'+name+(params?'?'+params:''))}
async function upsert(name,rows){return call('/rest/v1/'+name+'?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:rows})}
async function remove(name,id){return call('/rest/v1/'+name+'?id=eq.'+encodeURIComponent(id),{method:'DELETE'})}
const isManager=()=>['coach','manager','admin'].includes(role)&&!!session?.access_token;
window.VCECloud={enabled,call,table,upsert,remove,signIn,signUp,signOut,refresh,getRole,isManager,get role(){return role},get user(){return session?.user||null}};
if(enabled&&session)getRole();else emit();
})();
