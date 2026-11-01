VCE ESPORT TEAM V13.1 — WEBHOOK DIRECT
Le webhook est intégré directement dans team.html.
L'annonce utilise un POST multipart/form-data avec payload_json vers Discord.
Le navigateur effectue un envoi no-cors : impossible de lire la réponse de Discord et donc de confirmer la livraison.
Si le salon ne reçoit rien, vérifier les permissions du webhook et les restrictions réseau.
ATTENTION : l'URL contient un jeton SECRET accessible à toute personne qui lit le code du site GitHub Pages.
Un tiers peut envoyer des messages dans le salon via ce webhook. Régénérer le webhook si compromis.
Pour une sécurité réelle, utiliser un relais serveur avec authentification.
