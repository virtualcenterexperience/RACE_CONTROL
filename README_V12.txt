VCE ESPORT — PERFORMANCE HUB V12
================================

MISE À JOUR
- Moteur contextuel de diagnostic dans entrainement.html.
- Base solutions_5000.json : 5 000 fiches uniques, 25 catégories.
- Mots-clés + phase du virage + catégorie de voiture + conditions.
- Recherche sur les causes cumulables et affichage de 3 hypothèses testables.
- Suivi : Déjà testé / Ça s'améliore / Toujours pareil / C'est pire.
- Animation de recherche de 4,8 secondes. Le moteur calcule localement ; ce délai est visuel.
- Import d'une photo Discord depuis un lien direct CDN, uniquement sur l'accueil.
- Import d'une image locale toujours disponible ; photo stockée dans le navigateur.
- Les modules et les notifications Discord de la V11.1 sont conservés.

INSTALLATION
1. Décompresser l'intégralité du ZIP à la racine du dépôt GitHub Pages.
2. Conserver ensemble entrainement.html, solutions_5000.json, vce-coach-5000.js,
   vce-v12-ui.js et vce-v12.css.
3. Tester depuis le site publié en HTTPS : ouvrir directement un fichier HTML en
   file:// empêche souvent le chargement JSON par fetch.
4. Sur l'accueil, sélectionner un pilote, puis utiliser « PHOTO DISCORD » pour
   coller l'URL directe d'une image Discord (cdn.discordapp.com).

IMPORTANT
- Il ne s'agit pas d'une IA générative : le moteur ne consulte pas Internet ni
  la télémétrie du simulateur. Les causes restent des hypothèses à vérifier.
- Certaines fiches ont des hypothèses génériques et peuvent nécessiter un contrôle
  humain. Ne pas appliquer plusieurs modifications de setup simultanément.
- Le site ne peut pas modifier la photo de profil de votre COMPTE Discord ; il
  peut utiliser une image Discord comme avatar sur le site.
- L'avatar et les statistiques restent stockés localement, sans synchronisation.
- La V11.1 inclut un webhook Discord exposé côté client : régénérez ce webhook
  et privilégiez un relais sécurisé pour un usage public.

TESTS
- 5 000 fiches et identifiants uniques validés.
- 5 cas de diagnostic testés avec le moteur JS, y compris « arrière sur vibreur ».
- Test Chromium avec injection de la page et de la base : moteur chargé, exemples
  affichés, diagnostic rendu, aucune erreur JavaScript dans ce scénario.
- La navigation HTTP locale est bloquée par l'environnement de test : vérifier
  après publication les chargements de fichiers et les notifications Discord.
