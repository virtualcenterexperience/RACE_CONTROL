# VCE ESPORT V23 — Coach IRL et nouvel accueil

## Nouveautés

La page `entrainement.html` propose désormais **trois modes distincts** :

1. **Coach interactif** : diagnostic guidé, contexte circuit/virage, recherche dans les 5 000 fiches.
2. **Entraînement autonome** : ateliers techniques, suivi du temps et de la progression.
3. **Coach IRL** : un responsable attribue une consigne à un pilote, reçoit son compte rendu et valide ou demande de refaire.

Les diagnostics techniques restent disponibles dans le menu, mais ne prennent plus la place du troisième mode.

### Coach IRL — parcours

- Le responsable ouvre l'accueil `index.html`, choisit **Coach / Responsable**, s'authentifie avec le mécanisme local existant, puis va dans **Entraînements → Coach IRL**.
- Il renseigne le nom du coach, le pilote destinataire, l'exercice (bibliothèque ou personnalisé), le jeu, le circuit, la voiture, le virage, le nombre de tours, l'objectif et les consignes.
- Le pilote choisit son profil et ouvre **Coach IRL**. Il voit ses exercices, note son ressenti et ses chronos facultatifs, puis envoie le compte rendu.
- Le responsable peut valider, demander une correction ou commenter le travail.
- Les statuts sont **À réaliser → En cours → À valider → Validé**, avec la possibilité **À refaire**.
- L'export/import JSON permet de déplacer les consignes entre deux appareils. À l'import, les identifiants déjà présents sont mis à jour.

**Important :** sur un même navigateur, les exercices sont visibles après un simple changement de profil. Sur deux ordinateurs distincts, il faut **exporter et importer** les données : il n'existe aucune synchronisation automatique.

## Nettoyage de l'interface

- Accueil principal `index.html` refait avec accès direct aux trois modes, puis aux outils Race Control, TEAM, télémétrie, diagnostics et ressources.
- Trois cartes d'entraînement plus claires, cohérentes avec les couleurs VCE rouge/bleu.
- Ancien grand portail d'entraînement masqué par les styles V20 existants.
- Les outils détaillés de profil, chronomètre et validation sont maintenant regroupés dans un panneau dépliable, pour réduire l'encombrement.
- Nouveaux styles adaptatifs et animations avec prise en charge de `prefers-reduced-motion`.

## Installation GitHub Pages

1. Décompresser l'archive et remplacer les fichiers du dépôt par **tous** les fichiers du dossier V23.
2. Conserver les noms de fichiers à la racine du dépôt (y compris les JSON et sous-dossiers).
3. Ouvrir `index.html` puis choisir le profil et l'un des trois modes.
4. Avant toute modification importante, exporter les données de Coach IRL et les autres sauvegardes existantes.

## Fichiers principaux modifiés / ajoutés

- `index.html` : nouvelle page principale.
- `entrainement.html` : trois modes, formulaire d'attribution, liste et compte rendu.
- `vce-home-v23.css`, `vce-home-v23.js` : nouvelle identité de l'accueil.
- `vce-v23.css` : interface et animations du Coach IRL et du sélecteur de modes.
- `vce-coach-irl-v23.js` : gestion des exercices, rôles locaux, statuts, historique, export/import.
- `vce-training-v20.js` : prise en charge du troisième mode, conservation du coach interactif et de l'autonomie.

## Limites de sécurité et de suivi

- L'accès responsable repose sur le système local existant, **ce n'est pas une authentification serveur**. Les données locales et fichiers JSON peuvent être modifiés par une personne ayant accès au navigateur.
- Les validations IRL n'ajoutent **pas automatiquement** de points de classement : elles restent distinctes de la validation d'une séance de roulage.
- Les consignes ne sont pas envoyées automatiquement sur Discord et aucune connexion Cloud n'est incluse.
- Les fichiers JSON et les référentiels de circuits doivent être servis depuis GitHub Pages ou un serveur HTTP pour le chargement via `fetch`.

## Vérifications

Syntaxe JavaScript, liens vers les ressources locales et intégrité de l'archive vérifiés. Un test d'exécution navigateur n'a pas pu aboutir car l'environnement bloque les navigations Chromium ; il faut valider les parcours après publication.
