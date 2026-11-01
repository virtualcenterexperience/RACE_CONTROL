# VCE ESPORT — Structure V27

## Organisation

- `index.html` : point d’entrée GitHub Pages, redirection automatique vers `HTML/index.html`.
- `HTML/` : 9 pages HTML, dont la vraie page d’accueil.
- `CSS/` : tous les styles.
- `JS/` : tous les scripts.
- `DATA/` : les bases de données JSON, circuits et diagnostics.
- `ASSETS/` : images et fonds.
- `medias/` : médias utilisateur d’origine.
- `discord-worker/` : code Cloudflare Worker d’origine.
- `DOCS/` : guides des anciennes versions et rapport d’audit.

## Installation GitHub Pages

Décompressez **tout** le ZIP dans la racine du dépôt `RACE_CONTROL`. Ne téléversez pas seulement HTML, CSS ou JS séparément : les liens dépendent de cette arborescence. Ne supprimez pas le dossier caché `.git` si vous travaillez depuis un clone Git.

Le lien public existant se termine toujours par `/RACE_CONTROL/index.html` et redirige vers `/RACE_CONTROL/HTML/index.html`. Les autres pages se trouvent désormais dans `HTML/`.

Les sauvegardes localStorage restent sur le même domaine GitHub Pages ; exportez toutefois vos données avant remplacement. Le Coach IRL reste local : pas de synchronisation automatique entre appareils.

## Contrôles

Consultez `DOCS/AUDIT_V27.json`. Les contrôles automatiques vérifient la présence des ressources HTML, les références de données JSON chargées par fetch et la syntaxe des scripts. Un test visuel navigateur reste nécessaire après publication.
