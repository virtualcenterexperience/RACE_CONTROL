VCE ESPORT — COACH INTERACTION MOTS-CLÉS — V9

INSTALLATION
Décompresser TOUS les fichiers à la racine du dépôt GitHub Pages RACE_CONTROL.
Les nouveaux fichiers sont :
- solutions_1000.json (1000 solutions fournies par l'utilisateur)
- vce-knowledge.js (moteur de recherche de mots-clés et de contexte)
- vce-knowledge.css (design de la fenêtre de discussion)
- entrainement.html (fenêtre Interaction enrichie)

UTILISATION
1. Ouvrir la page Entraînements, puis Interaction / Coach Pilote.
2. Choisir sa catégorie de voiture dans le formulaire d'entraînement.
3. Décrire un problème avec des mots-clés ou cliquer sur un exemple.
4. Le coach renvoie correction, exercice, variable à analyser, question de suivi.
5. Répondre « Ça s'améliore », « Toujours pareil » ou « C'est pire ».
6. Cliquer « Ajouter au bilan » pour reporter la correction dans les notes.

EXEMPLES
- Je bloque les roues avant au freinage
- Je sous-vire en entrée de virage
- Mes pneus arrière chauffent trop
- Je ne suis pas régulier dans mes chronos
- Je perds du temps en sortie de virage
- Je freine trop tard en Porsche Cup

FONCTIONNEMENT
Recherche locale par mots-clés, synonymes et contexte. Aucun abonnement ni API.
Le JSON est chargé par fetch depuis la même origine : utiliser GitHub Pages
ou un serveur HTTP local. L'ouverture directe en file:// peut empêcher le
chargement du JSON. En cas d'échec, le coach conversationnel précédent reste actif.
Ce système est une base de règles et ne lit pas la télémétrie réelle.
Les conseils restent indicatifs et demandent confirmation selon le modèle et le jeu.

TESTS
- 1000 entrées JSON contrôlées
- syntaxe JavaScript contrôlée avec Node.js
- 7 recherches représentatives vérifiées en exécution JS
- test navigateur HTTP bloqué par les restrictions de l'environnement
