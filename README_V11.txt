VCE ESPORT V11 – NAVIGATION + AVATARS + DISCORD

- Un menu identique sur les cinq pages (vce-v11-nav.js, vce-v11.css).
- Avatar rond, ajout de photo UNIQUEMENT sur la page d’accueil après sélection d’un pilote. Stockage local navigateur.
- Suppression des commandes photo de la barre d’entraînement.
- Notification Discord lors de la fin d’une séance chronométrée, avant validation Staff.
- Déploiement du relais Cloudflare Worker requis : voir discord-worker/README.txt.
- IMPORTANT : le webhook Discord doit être régénéré et conservé dans les secrets du Worker.
- Les données pilotes et avatars restent locales, non synchronisées entre appareils.
- Les données chronométrées côté navigateur ne constituent pas une preuve anti-triche.
