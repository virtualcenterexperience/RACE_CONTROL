VCE ESPORT / TEAM OPERATIONS V13
================================

INSTALLATION GITHUB PAGES
- Copier team.html, vce-team.js, vce-team.css, vce-team-config.js,
  vce-training-diagnostics.js, vce-v11-nav.js et entrainement.html
  avec tous les autres fichiers existants.
- La rubrique TEAM apparaît dans le menu commun des pages.

FONCTIONNEMENT
- STAFF (mot de passe de l'interface existante) : créer, modifier, supprimer une course ; sélectionner les pilotes.
- Tous les profils connectés : voir le calendrier, les lineups, les overlays et copier une annonce.
- Les courses sont triées par date. « Aujourd'hui », « À venir » et « Terminée » s'ajustent à la date française.
- Overlay LINEUP : composition de la course sélectionnée.
- Overlay CALENDRIER : sept prochaines courses. Export PNG 1920 x 1080.
- Export/import JSON pour transférer les données d'un navigateur à l'autre.
- Entraînements : nouveau volet dépliant Diagnostics, recherche dans solutions_5000.json.

DISCORD
Le webhook Discord est un secret : ne pas le publier dans GitHub Pages.
1. Régénérer le webhook envoyé dans la conversation, car son URL a été divulguée.
2. Déployer le code du dossier team-worker dans Cloudflare Workers.
3. Dans les secrets du Worker, créer DISCORD_WEBHOOK_URL avec le NOUVEAU webhook.
4. Protéger l'URL du Worker par Cloudflare Access (authentification des responsables).
5. Renseigner l'URL publique HTTPS du Worker dans vce-team-config.js.
6. Depuis TEAM en mode STAFF, choisir la course puis ENVOYER SUR DISCORD.
7. En attendant le relais, COPIER L'ANNONCE fonctionne sans configuration.

ATTENTION SECURITE / SYNCHRONISATION
Le mot de passe STAFF 'train' et les contrôles JavaScript côté navigateur ne sont PAS
une sécurité suffisante pour des modifications sensibles. Les courses, les points et
les lineups sont enregistrés dans localStorage, PAS synchronisés entre appareils.
Pour une équipe multi-appareils et des permissions réelles, il faut un backend avec
connexion staff et une base partagée. Un simple filtre Origin/CORS ne sécurise pas
un webhook : protéger le Worker par une authentification serveur.

Les dates de course ne sont pas inventées : le Staff les saisit dans le formulaire.
