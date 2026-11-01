VCE ESPORT — TEAM OPERATIONS V13.2

NOUVEAUTÉ : RACE RESULT
- Quatrième onglet dans team.html : CALENDRIER, LINEUP, OVERLAY, RACE RESULT.
- Les résultats affichent : prénom/pilote, position, championnat, team, jeu, date et circuit facultatif.
- Staff : création, correction, suppression. Les autres utilisateurs peuvent consulter les résultats.
- Reprise facultative d'une course existante pour préremplir date, championnat, jeu et circuit.
- Overlay RACE RESULT en PNG 1920 x 1080, plein écran, annonce texte Discord et copie.
- Export JSON des résultats.
- Conservation des fonctionnalités de V13.1 (calendrier, lineup, chrono, entraînements, coach).

INSTALLATION
Copier le ZIP complet à la racine du dépôt GitHub Pages. Si installation manuelle, remplacer team.html, vce-team.js et vce-team.css, et ajouter vce-team-results.js.

LIMITES
Les résultats sont stockés dans le navigateur via localStorage : non synchronisés entre appareils.
Le mot de passe Staff et le webhook Discord dans un site statique ne sont pas sécurisés côté serveur. Le webhook est visible publiquement et devrait être régénéré puis déplacé vers un relais protégé.
L'envoi Discord direct est en mode no-cors : la réception ne peut pas être confirmée par le navigateur.

TESTS
Syntaxe JavaScript vérifiée avec Node. Test Chromium avec contenu HTML chargé en mémoire : création d'un résultat Staff, affichage de la carte, activation de l'onglet, canvas 1920x1080, aucune erreur JS. Navigation de bout en bout via URL GitHub Pages non testée.
