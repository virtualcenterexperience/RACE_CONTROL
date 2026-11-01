# VCE ESPORT — PERFORMANCE PLATFORM V25

## Installation GitHub Pages

1. **Sauvegarder** les exports JSON de TEAM, Entraînements, Stratégie et Coach IRL avant de modifier le dépôt.
2. Décompresser le ZIP. Copier **le contenu du dossier** (pas le dossier lui-même) à la racine du dépôt `RACE_CONTROL`, en conservant `index.html` à la racine.
3. Faire un commit et un push, puis attendre le déploiement de GitHub Pages. Recharger avec Ctrl+F5.
4. Tester successivement : pilote > entraînement > avec coach / sans coach ; staff > entraînement > coach IRL ; pilote > dashboard > missions ; staff > dashboard > validation ; groupe > dashboard.

## Changements V25

- `index.html` : nouveau portail 3 étapes, mise en page plus épurée et responsive.
- `vce-design-v25.css` : identité graphique motorsport (bleu nuit, rouge, typographies condensées), transitions, états de focus et version mobile.
- `vce-portal-v25.js` : sélection du profil, accès aux espaces et modes d'entraînement. Conservation des clés de stockage V24.
- `entrainement.html` + `vce-training-v25.css/js` : nouveau bandeau TRAINING CONTROL, 3 modes très visibles, indicateurs conservés, anciens outils complémentaires repliés, moteurs V20/V22/V23 préservés.
- `dashboard.html` + `vce-dashboard-v25.css` : design des missions, recherche par mots-clés, filtre pilote pour le staff, barre de progression.
- `vce-dashboard-v24.js` : filtre de missions et vue GROUPE en lecture seule.
- Les exercices Coach IRL sont compatibles avec les données V23/V24 (`vce_coach_irl_assignments_v23`).
- Stratégie, TEAM, télémétrie et référentiels circuits conservés.

## IMPORTANT : limites et sécurité

- **Édition locale, sans cloud.** `localStorage` ne synchronise pas automatiquement les exercices entre les PC du staff et des pilotes. Utiliser les exports/imports JSON sur chaque appareil.
- Le contrôle STAFF repose sur du JavaScript côté client. **Ce n'est pas une authentification sécurisée** et les rôles ne sont pas imposés par un serveur. Ne pas utiliser pour des informations confidentielles ni comme preuve d'identité.
- Les modifications sont stockées dans le navigateur utilisé. Ne pas vider ses données sans exporter les sauvegardes.
- Les polices Google peuvent être chargées si une connexion Internet existe, avec repli sur des polices système en cas d'échec. Aucun backend n'est requis.
- L'intégrité des fichiers et la syntaxe JS sont vérifiées ; un test complet des interactions dans un navigateur réel est recommandé après publication.
