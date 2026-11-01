# VCE ESPORT — CLEAN V31

## Nouvelle base (repart de zéro)
Ce pack est une **nouvelle application** : il n'embarque pas les anciens scripts V19 à V30. Cinq pages HTML seulement :
- `index.html` : accueil, sélection profil Pilote/Groupe/Staff, navigation.
- `entrainement.html` : création de séance, tours chronométrés, comparaison, secteurs, télémétrie CSV, tracé GPS si disponible, indicateurs et missions.
- `team.html` : effectif, attribution Coach IRL, suivi, validation Staff.
- `strategie.html` : calculateur simplifié endurance/sprint, carburant et relais.
- `dashboard.html` : score (100 points par mission validée), km, tours, séances et historique.

## Arborescence
```
index.html
entrainement.html
team.html
strategie.html
dashboard.html
css/styles.css
js/core.js
js/home.js
js/dashboard.js
js/training.js
js/telemetry.js
js/team.js
js/strategy.js
data/circuits.json
README_INSTALLATION.md
```

## Publication sur GitHub Pages
1. Sauvegarder les données de l'ancien site AVANT de supprimer ses fichiers (exports JSON éventuels).
2. Dans `virtualcenterexperience/RACE_CONTROL`, remplacer les anciens fichiers du site par **le contenu du ZIP**, et non par le dossier contenant le ZIP.
3. Vérifier que `index.html` est directement à la racine du dépôt.
4. Effectuer Commit et Push. Vérifier la publication dans Settings > Pages.
5. Actualiser avec Ctrl+F5.

**Important** : la V31 utilise un nouveau format de stockage local (`vce_clean_v31`). Elle ne reprend pas automatiquement les anciennes séances et missions V30. Les anciens JSON ne sont pas importables directement dans le nouveau format. Il faut conserver les sauvegardes de l'ancienne version si elles comptent.

## Import de télémétrie
Le modèle CSV est téléchargeable depuis Entraînement. Colonnes obligatoires : `lap,time_s`. Colonnes facultatives : `distance_m,speed_kmh,throttle_pct,brake_pct,steering_deg,gear,sector,lat,lon`. Chaque ligne représente une mesure à un instant dans un tour. `time_s` est le temps en secondes dans le tour; `distance_m` est la distance parcourue dans ce tour. Les CSV à séparateur `;` ou `,` sont acceptés (sans prise en charge avancée des guillemets échappés).

Les graphes n'apparaissent que si les canaux sont présents. Le tracé nécessite des coordonnées GPS réelles. Les secteurs sont estimés à partir des échantillons par secteur, et peuvent nécessiter des données plus précises pour une analyse de compétition. Les scores techniques affichés dans Entraînement sont des mesures, pas des notes de pilotage.

## Données et accès
- Application statique sans serveur, compatible GitHub Pages.
- Données sauvegardées **dans le navigateur utilisé** (`localStorage`).
- Export et import JSON V31 depuis le menu de gauche pour transférer/sauvegarder les données.
- **Pas de synchronisation automatique entre le Staff et les pilotes sur différents appareils.**
- Les rôles Pilote/Groupe/Staff sont des modes d'interface, **pas une authentification sécurisée**. Ne pas utiliser cette version pour contrôler des droits sensibles ou héberger des données confidentielles.
- Le score Dashboard correspond à 100 points par exercice validé, pas à une évaluation automatique de compétence.
- La distance est calculée à partir des données de distance par tour ou de la longueur de circuit renseignée, jamais estimée arbitrairement.

## Vérifications
- Syntaxe des scripts JavaScript (`node --check`) : OK.
- Références CSS/JS des pages HTML : OK.
- IDs HTML uniques : OK.
- Données circuits : 51 noms de circuits.
- L'environnement bloque les essais de navigation Chromium locaux. Les parcours interactifs sont à vérifier après publication.
