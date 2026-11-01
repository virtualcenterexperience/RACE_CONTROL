(()=>{"use strict";
const path=location.pathname.split("/").pop()||"index.html";
const pages=[["index.html","ACCUEIL"],["entrainement.html","ENTRAÎNEMENTS"],["strategie.html","STRATÉGIES"],["ressources_voitures.html","CARS"],["interactions.html","DIAGNOSTICS"]];
const n=document.createElement("nav");n.id="vce-shared-nav";n.setAttribute("aria-label","Navigation principale VCE Esport");
n.innerHTML='<a class="vce-identity" href="index.html" aria-label="VCE Esport - Accueil"><span class="vce-identity-mark">V<b>C</b>E</span><span class="vce-brand-text"><strong>VCE ESPORT</strong><small>PERFORMANCE CENTER</small></span></a><button type="button" id="vce-mobile-toggle" aria-expanded="false" aria-controls="vce-nav-menu" aria-label="Ouvrir le menu"><span></span><span></span><span></span></button><div class="vce-links" id="vce-nav-menu">'+pages.map(([href,label])=>'<a href="'+href+'"'+(path===href?' aria-current="page"':'')+'>'+label+'</a>').join("")+'</div><div class="vce-nav-actions"><span class="vce-nav-live"><i></i> PERFORMANCE HUB</span></div>';
document.body.insertBefore(n,document.body.firstChild);
const toggle=n.querySelector("#vce-mobile-toggle");toggle.addEventListener("click",()=>{const expanded=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!expanded));n.classList.toggle("vce-open",!expanded)});
n.querySelectorAll(".vce-links a").forEach(a=>a.addEventListener("click",()=>{n.classList.remove("vce-open");toggle.setAttribute("aria-expanded","false")}));
})();