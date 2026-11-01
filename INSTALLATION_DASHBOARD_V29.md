# VCE ESPORT — Dashboard V29

## Installation GitHub Pages
Décompresse le ZIP, puis glisse **le contenu** à la racine du dépôt RACE_CONTROL (pas le dossier englobant). `index.html` et `dashboard.html` doivent être au même niveau. Publie par Commit/Push, puis recharge avec Ctrl+F5.

## Dashboard
Interface inspirée des références fournies : menu latéral, barre supérieure, KPI, graphique de progression, séances et missions Coach IRL. Couleurs VCE rouge/bleu/nuit.

### Sources des chiffres
- Score : +2 par journée d'entraînement validée, -1 par journée d'absence enregistrée, +10 par distinction d'endurance ; calcul identique à l'ancien module d'entraînement.
- Kilomètres : somme des distances déclarées dans les séances validées du profil.
- Tours : somme des tours déclarés dans les séances validées.
- Graphique : distance des séances validées par jour sur 7 jours.
- Missions : stockage local `vce_coach_irl_assignments_v23`.
- Aucun chiffre de télémétrie n'est inventé ; si les données sont vides, les valeurs seront à zéro.

### Limites
Le dashboard utilise le localStorage existant. Les données ne sont pas synchronisées entre appareils. Le score n'est pas une note automatique de pilotage. Aucun accès réel à Assetto Corsa/LMU n'est ajouté.

## Tests
Syntaxe JS vérifiée ; vérification des fichiers liés et archive ZIP. Tester visuellement et fonctionnellement après déploiement GitHub Pages.
