# VCE ESPORT V30 — Training Analytics

## Installation GitHub Pages
Décompresser le ZIP puis copier **tout son contenu** directement à la racine de `RACE_CONTROL` (pas un dossier parent supplémentaire). `index.html` reste à la racine. Commit + Push, puis Ctrl+F5.

## Modifications
- `entrainement.html` : nouvelle interface d'analyse inspirée des captures de référence, avec couleurs VCE.
- `vce-training-analytics-v30.css` : styles dédiés, responsive, sans conflits avec les anciens CSS.
- `vce-training-analytics-v30.js` : séances, chronos, secteurs, comparaison de tours, télémétrie CSV, graphiques, statistiques techniques et GPS si fourni.
- `entrainement_avance.html` : **ancien entraînement complet conservé** pour les modes Coach interactif et Coach IRL. Les liens `entrainement.html?mode=coach` et `?mode=irl` redirigent vers cette page.
- Dashboard V29, profil, Team et Stratégie préservés.

## Données réelles uniquement
Le nouveau module n'invente ni carte de circuit, ni mesures de freinage, ni scores de trajectoire. Pour un vrai tracé, importer des points `lat` et `lon` dans un CSV. Pour comparer des secteurs, importer `sector`. Les indicateurs techniques affichent des mesures descriptives (moyenne pédale, maximum vitesse, maximum angle volant), pas des scores de compétence.

## CSV de télémétrie
En-tête : `lap,time_s,distance_m,speed_kmh,throttle_pct,brake_pct,steering_deg,gear,sector,lat,lon`.
`lap` commence à 1 ; `time_s` est le temps écoulé depuis le début du tour ; `distance_m` la distance parcourue depuis le début du tour ; les champs optionnels peuvent rester vides. Délimiteur virgule ou point-virgule. Import de 40 000 lignes maximum / fichier et 8 Mo.

Si le CSV ne contient pas de coordonnées GPS, la carte affiche une indication d'absence au lieu d'inventer une géométrie.

## Sauvegarde
Données stockées dans `localStorage` sous `vce_training_analytics_v30` par profil local. Boutons Exporter/Importer JSON. Pas de synchronisation entre appareils, pas d'import natif automatique Assetto Corsa. Les tours importés ne sont pas automatiquement validés par le Staff dans le dashboard V29.
