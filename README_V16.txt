VCE ESPORT — V16 / PARCOURS GUIDÉ

Nouveau parcours :
1. Bienvenue au centre de contrôle VCE ESPORT : bouton ENTRÉE.
2. Choix du mode PILOTE / GROUPE / STAFF (conserve le système V15 et les profils).
3. Choix de l'espace ENTRAÎNEMENT / STRATÉGIE / TEAM selon les droits existants.
4. ENTRAÎNEMENT : AVEC COACH / SANS COACH ; TEAM : CALENDRIER / LINEUP / RÉSULTATS ; STRATÉGIE : ouvre la page actuelle.

Les titres principaux affichent une aide contextuelle au survol, au clic ou au focus clavier.
Le bouton ENTRÉE est montré une fois par session d'onglet : revenir à l'accueil conserve l'étape de sélection.
Le bouton CHANGER DE PROFIL revient à la sélection des modes.

Déploiement : publier l'ensemble des fichiers à la racine du dépôt GitHub Pages, notamment :
- index.html
- entrainement.html, strategie.html, team.html, interactions.html, ressources_voitures.html
- vce-journey-v16.css
- vce-journey-v16.js

Les données des pilotes, le chronomètre et les modules TEAM sont conservés.
Les restrictions Staff et les données restent locales au navigateur, sans authentification serveur.
Le webhook Discord déjà présent dans la version précédente est conservé dans le code public : risque de compromission, régénérer et protéger ce secret.
