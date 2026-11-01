# VCE ESPORT — V20 STABLE · Design Track Titan × VCE Racing

Cette version repart du pack V20, sans intégrer les interfaces V21–V31. Elle préserve les scripts métier et les fichiers JSON existants.

## Pages actualisées
- **index.html** : une seule barre de navigation, accès Entraînement / TEAM / Stratégie / Dashboard, classement public limité à cinq lignes avec bouton pour tout voir. CARS et Diagnostics restent accessibles.
- **entrainement.html** : modes Coach et Autonomie préservés, nouveau volet Coach IRL local. Le Staff peut attribuer un exercice à un profil, le pilote renseigne un bilan, le Staff valide ou demande de recommencer. Export/import JSON des missions.
- **team.html** : calendrier pleine largeur, onglets Calendrier / Lineup / Affiches / Résultats, formulaires Staff et annonces dans un volet dépliable. Les moteurs existants de calendrier, d'overlay et de résultats sont conservés.
- **ressources_voitures.html** : nouvelle bibliothèque CARS avec recherche, filtre par famille, une fiche à la fois et tableau de corrections lisible. Les 51 catégories du fichier original sont conservées sans réécriture des caractéristiques. Le fichier `vce-cars-database-v20.json` contient une copie lisible des données.
- **strategie.html** et **dashboard.html** : design partagé, fonctionnement existant conservé. Le Dashboard affiche aussi les missions Coach IRL du profil local.

## Installation GitHub Pages
1. Sauvegardez vos données locales via les exports JSON du site et téléchargez une copie du dépôt GitHub actuel.
2. Décompressez le ZIP.
3. Remplacez les anciens fichiers de votre dépôt `RACE_CONTROL` par **le contenu** du ZIP. `index.html` doit être à la racine du dépôt.
4. Publiez les changements sur la branche `main` et patientez pendant le déploiement GitHub Pages.
5. Rechargez la page avec Ctrl + F5.

**Ne déposez pas le dossier parent à la place de son contenu.** Les fichiers CSS/JS sont volontairement conservés à la racine pour éviter les problèmes de chemins des versions précédentes.

## Limitations
- Le Coach IRL est **local au navigateur** ; l'envoi automatique de missions à d'autres ordinateurs nécessite une base de données et une authentification sécurisée. Le statut Staff de la V20 ne constitue pas une authentification serveur.
- Les kilomètres, scores et télémétries ne sont pas inventés : seules les données réellement enregistrées sont affichées.
- La page CARS n'invente pas de caractéristiques absentes du référentiel fourni.
- Les tests automatisés de structure, de syntaxe JavaScript et d'intégrité du ZIP ont été exécutés ; un test visuel interactif en Chromium n'a pas pu être finalisé dans l'environnement de création.
