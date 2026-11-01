# VCE ESPORT V22 — Diagnostic guidé (sans Cloud)

## Ce qui est nouveau

Le Coach de `entrainement.html` contient un parcours interactif en **quatre questions** :
1. Circuit, virage et symptôme principal.
2. Phase exacte (freinage, entrée, milieu, sortie, transition ou inconnue).
3. Moment par rapport à la remise des gaz.
4. Un seul changement de pilotage, trois passages comparables, observations et chronos facultatifs.

Le résultat propose une conclusion **indicative**, recommande de revenir en arrière en cas de dégradation, et permet de tester une autre hypothèse sans modifier plusieurs variables à la fois. Les résultats peuvent être transmis au Coach local / moteur des 5 000 fiches, ajoutés au bilan et conservés localement.

## Fonctionnement

- Déployer **tous les fichiers** du ZIP à la racine du dépôt GitHub Pages.
- Ouvrir `entrainement.html`, choisir le mode Coach et renseigner les quatre étapes.
- Le champ de virage se nourrit des 51 circuits / 735 entrées de V21 quand les JSON sont chargés.
- Les observations et chronos sont facultatifs à l'exception des **trois observations** pour valider un essai.
- Les données sont conservées dans `localStorage` de l'appareil, et exportables/importables en JSON.

## Précautions

Les conseils sont des **hypothèses**, pas des causes démontrées. Les vitesses relatives et numéros de virages du référentiel peuvent varier selon le tracé du simulateur. Le système ne lit pas de télémétrie en direct. Les chronos ne prouvent pas seuls une amélioration de la stabilité. La validation humaine reste nécessaire.

## Fichiers ajoutés

- `vce-diagnostic-guide-v22.js` : assistant, logique, essais, chronos, stockage, export/import, intégration Coach.
- `vce-diagnostic-guide-v22.css` : interface, animations, responsive et accessibilité.
- `entrainement.html` : chargement des deux nouveaux fichiers.

Aucun Cloud, compte externe ou API requis. Pour les données JSON, ouvrir via GitHub Pages ou un serveur HTTP local.
