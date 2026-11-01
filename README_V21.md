# VCE ESPORT V21 — Circuit Intelligence (100 % local)

## Contenu
- `vce-circuits-complets.json` : 51 circuits, 735 entrées de virages, catégories, descriptions, avertissements de fiabilité.
- `vce-lexique.json` : termes techniques classés, issus du bloc-notes fourni.
- `references_coach/` : copies des 6 fichiers continentaux et du bloc-notes d’origine.
- `vce-circuit-coach-v21.js` / `.css` : sélection du circuit, virage, météo, lexique et contexte intégré au coach.
- `vce-coach-5000.js` : enrichissement du retour des 5 000 fiches par le contexte de circuit sélectionné.

## Utilisation
1. Ouvrir `entrainement.html` via GitHub Pages ou un serveur HTTP local (pas `file://`, car fetch JSON).
2. Choisir une voiture, un circuit, un virage, puis éventuellement les conditions.
3. Cliquer « Utiliser ce contexte dans le coach », compléter le symptôme et envoyer.
4. Le coach présente la fiche de diagnostic et les caractéristiques du virage sans prétendre identifier la cause exacte.

## Limites
- Les numéros/noms de certains virages sont indicatifs et doivent être vérifiés pour le tracé exact du jeu.
- Les classes de vitesse sont relatives ; aucune vitesse en km/h n’est inférée.
- Pas de modèle IA externe ni télémétrie live. Réponses déterministes fondées sur les 5 000 fiches existantes.
- Le lexique sert à composer les questions et retrouver les termes, pas à établir automatiquement une cause.
- Aucune synchronisation cloud.
