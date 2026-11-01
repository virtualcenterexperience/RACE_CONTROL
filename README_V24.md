# VCE ESPORT V24 — Portail trois étapes + dashboard Coach IRL

## Installation GitHub Pages
1. Sauvegarder les JSON de vos données dans les anciennes pages avant toute modification.
2. Remplacer le contenu du dépôt GitHub Pages par le **contenu** de ce ZIP. Garder `index.html` à la racine.
3. Attendre le déploiement GitHub Pages, puis actualiser le navigateur avec Ctrl+F5.
4. Tester les profils PILOTE, GROUPE et STAFF et les trois modes d'entraînement.

## Parcours
- Étape 1 : PILOTE (choix du nom), GROUPE, STAFF (nom du coach et mot de passe existant).
- Étape 2 : ENTRAÎNEMENT, TEAM, STRATÉGIE.
- Étape 3 (entraînement) : AVEC COACH, SANS COACH, COACH IRL.
- Le STAFF attribue via `entrainement.html?mode=irl` ; le PILOTE consulte et renseigne son bilan sur `dashboard.html`.
- Le STAFF valide ou renvoie l'exercice depuis `dashboard.html`.
- Les anciennes fonctionnalités de stratégie, TEAM, diagnostics, fiches circuits et coaching sont conservées.

## Limites importantes
- Les exercices IRL sont stockés sous `vce_coach_irl_assignments_v23` dans `localStorage`, compatibles avec V23.
- **Sans cloud ni serveur, une attribution faite sur l'ordinateur du staff ne peut PAS apparaître automatiquement sur l'ordinateur du pilote.** Utiliser Export JSON / Import JSON dans les dashboards (ou l'interface IRL existante). Une synchronisation automatique nécessiterait un service centralisé.
- Le mot de passe STAFF existant est vérifié dans le navigateur et **ne constitue pas une authentification sécurisée** ; ne pas utiliser pour des données sensibles.
- Les droits de validation sont appliqués dans le navigateur uniquement. Les données peuvent être modifiées localement.
- Le tableau de bord V24 remplace l'ancien tableau de bord local. Les données de course restent dans les pages TEAM.
- Tester les parcours sur GitHub Pages HTTPS ; le contrôle de mot de passe STAFF nécessite `crypto.subtle` (contexte sécurisé).

## Fichiers principaux modifiés
`index.html`, `dashboard.html`, `entrainement.html`, `vce-v5.js`, `vce-portal-v24.css/js`, `vce-dashboard-v24.css/js`, `vce-training-v24.css/js`.
