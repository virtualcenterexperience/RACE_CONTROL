# VCE Race Control V5 – GitHub Pages

## Installation
1. Créer un dépôt GitHub public, puis envoyer `index.html` et le dossier `sauvegardes/` **à la racine** du dépôt (le dossier contient `course1.json`, `course2.json`, `course3.json`).
2. Activer Settings > Pages > Deploy from a branch > main > /(root).
3. Sur le site, renseigner le propriétaire GitHub, le dépôt et la branche. Les visiteurs peuvent lire les courses publiées sans se connecter.
4. Pour enregistrer, chaque personne qui doit modifier le fichier doit avoir l'autorisation GitHub **Contents: Read and Write** sur ce dépôt. Créer un **fine-grained personal access token** limité à ce seul dépôt. Ne jamais mettre le token dans le code ou les fichiers GitHub. Entrer le token dans le champ de la page (il n'est pas mémorisé). Cliquer **Enregistrer COURSE active**.
5. Les visiteurs peuvent cliquer Charger, ou attendre la vérification toutes les 30 secondes. La lecture automatique ne remplace pas les champs pendant la saisie.

## Important
- Le mot de passe `vce` dans un fichier HTML public ne peut pas autoriser une écriture sur GitHub. Il faut une authentification GitHub ou un service serveur distinct.
- GitHub Pages est un hébergement statique, non une base temps réel. Les modifications ne sont visibles qu'après commit de données dans le dépôt.
- Les sauvegardes sont des JSON **publics** : ne jamais y mettre de secrets, de données personnelles sensibles ou de jetons.
- Le système ne fusionne pas des changements simultanés. En cas de conflit de version, recharger puis recommencer pour éviter l'écrasement.
- L'API Github a des quotas : 30 secondes est un compromis. Les comptes publics anonymes n'ont pas de garantie de synchronisation rapide.
- Les simulations restent prévisionnelles : valider avant les courses les règles LMU et les temps de pit.
- Les macros VBA du fichier XLSM ne sont pas exécutées dans le navigateur. Les modules inspirés du classeur ont été recréés en JavaScript, avec des modèles simplifiés.
