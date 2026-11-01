# VCE ESPORT — PACK GITHUB V28 (restauration fonctionnelle)

Cette version restaure l’arborescence à plat de V26. La V27 avait déplacé les fichiers dans HTML/CSS/JS et cassé des chemins utilisés par les scripts.

## Installation dans github.dev (navigateur)
1. Sauvegardez/exportez les données locales depuis les modules avant remplacement.
2. Ouvrez le dépôt RACE_CONTROL sur GitHub et appuyez sur `.` pour ouvrir github.dev.
3. Supprimez les anciens fichiers et dossiers du dépôt à remplacer, en conservant `.github`, `CNAME` ou d’autres configurations personnalisées si vous en utilisez. Ne supprimez pas le dépôt.
4. Décompressez le ZIP **sur votre ordinateur**, puis glissez **tout le contenu extrait** dans la racine du dépôt, sans dossier V28 intermédiaire.
5. Vérifiez que `index.html`, `entrainement.html`, `dashboard.html`, les fichiers `.css` et `.js` sont directement à la racine. Conservez les sous-dossiers `medias/`, `discord-worker/`, `references_coach/`.
6. Dans Source Control, faites Commit puis Push/Sync. Attendez le déploiement GitHub Pages et actualisez avec Ctrl+F5.

Le site reste local : les missions Coach IRL ne se synchronisent pas entre navigateurs ou appareils. La sélection de rôle Staff n’est pas une authentification serveur.

## Tests
Voir `AUDIT_V28.json`. Les tests statiques ne garantissent pas l’absence de tous les problèmes interactifs.
