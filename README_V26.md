# VCE ESPORT V26 — AUDIT ET CENTRAGE

## Correctifs
- Audit des **9 pages HTML** du site et de leurs références CSS/JS locales.
- Accueil : le portail d'identification et les 3 choix sont désormais **centrés sur ordinateur**, avec un affichage en une colonne sur mobile.
- Entraînement : alignement des blocs Coach, Sans Coach, Coach IRL, diagnostic et tableau de bord sur un même conteneur.
- Dashboard, TEAM, Stratégie, Profil, Télémétrie, Interactions et Ressources : conteneurs centrés et marges latérales cohérentes.
- CSS : ajout de `vce-layout-v26.css` avec des règles **scopées** (`v26-page`) pour éviter de casser les anciens moteurs.
- HTML : sur `entrainement.html`, déplacement des liens de styles qui se trouvaient après `</head>` dans l'en-tête, et placement de la couche V25 après les styles historiques.
- JavaScript : conservation des scripts et des clés de stockage (pas de migration destructive). Vérification syntaxique de tous les fichiers JS.
- Les fichiers JSON, profils, stratégies, Coach IRL et moteurs 5 000 fiches sont conservés.

## Installer sur GitHub (navigateur)
1. Exporter les données locales importantes (missions Coach IRL, stratégies, profils).
2. Décompresser l'archive V26 et copier **son contenu** à la racine de `RACE_CONTROL`.
3. Remplacer les fichiers existants, puis enregistrer les modifications (commit).
4. Sur GitHub Pages, recharger avec **Ctrl + F5**.
5. Tester à 100 %, 125 % de zoom et sur mobile : accueil, Coach IRL, Coach, Sans Coach, Dashboard, TEAM, Stratégie.

## Limites
- Audit statique HTML/CSS/JS effectué ; **le test de rendu Chromium est bloqué par l'environnement**. Les positions exactes à l'écran doivent être validées dans un navigateur après publication.
- Les données sont toujours locales au navigateur, sans synchronisation entre appareils.
- Le mot de passe Staff côté navigateur n'est pas une authentification sécurisée.
