VCE ESPORT — V15 / RED BLUE WHITE
================================
Refonte des couleurs et animations à partir de V14.

Pages : index.html, entrainement.html, strategie.html, team.html,
ressources_voitures.html (CARS), interactions.html (DIAGNOSTICS).
Le profil pilote est inclus dans l'accueil et l'espace entraînement.

NOUVEAUX FICHIERS INDISPENSABLES
- vce-theme-v15.css : charte rouge, bleu et blanc, responsive, boutons,
  cartes, formulaires, navigation, TEAM et espaces personnels.
- vce-motion-v15.js : barre de progression du défilement, retour en haut,
  apparition progressive des panneaux, transitions entre pages.

Toutes les pages chargent la feuille V15 en dernier pour conserver les
fonctionnalités et écraser les anciens styles verts.
Les anciennes CSS et les scripts existants sont conservés pour compatibilité.
Les teintes vertes résiduelles des anciens fichiers CSS ont été harmonisées.

MISE EN LIGNE
Remplacer l'ensemble des fichiers sur GitHub Pages, y compris les deux
nouveaux fichiers ci-dessus. Ne pas oublier les sous-dossiers et les JSON.

ATTENTION WEBHOOK DISCORD
Le webhook de TEAM se trouve toujours dans team.html comme demandé dans
la version précédente. Sur un site GitHub Pages public, son jeton est
exposé : il est fortement recommandé de le révoquer et d'utiliser un
relais authentifié côté serveur.

ANIMATIONS
Les animations sont désactivées si le système demande une réduction des
mouvements (prefers-reduced-motion). Le chrono et les données de course
sont conservés. Le site est toujours statique (localStorage).
