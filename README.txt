VCE ESPORT PERFORMANCE HUB — VERSION 5
=====================================

INSTALLATION
- Déposer tous les fichiers du ZIP à la racine de votre site GitHub Pages.
- Conserver vos dossiers de sauvegardes déjà présents.
- index.html : écran d'entrée obligatoire Individuel / Groupe.
- entrainement.html : tableau de bord pilote, chronomètre, historique, validation et classement coach.
- strategie.html : accès uniquement après sélection Groupe (restriction d'interface, pas une sécurité serveur).
- ressources_voitures.html et interactions.html : ressources existantes.
- vce-v5.js et vce-v5.css : fonctions et design V5 indispensables.

RÈGLES DE POINTS
+2 points par séance validée par un coach.
-1 point par entraînement planifié, passé, et marqué absent par un coach.
0 point pour une séance en attente, refusée ou importée depuis l'ancienne version V4.
Objectif : 50 minutes d'entraînement VALIDÉES par semaine (du lundi au dimanche), avec exercice spécifique.

CALCULS
- Chronomètre : temps actif de la page, pause automatique quand l'onglet est masqué.
- Distance : nombre de tours déclaré x longueur du circuit référencée.
- Seules les séances validées sont comptabilisées dans les points, kilomètres et minutes hebdomadaires.
- Dates ISO et connexions individuelles enregistrées localement.

IMPORTANT : LIMITES ANTI-TRICHE ET SYNCHRONISATION
Le chronomètre JavaScript ne prouve PAS qu'un jeu tourne. Les tours et distances restent déclaratifs.
Le mode Groupe est accessible sans authentification et une sauvegarde JSON est modifiable.
Cette V5 ne constitue PAS une protection contre la triche ni une synchronisation entre appareils.
Pour une preuve fiable et des comptes partagés, prévoir un serveur (base de données + authentification coach)
ainsi qu'une collecte de télémétrie authentifiée depuis Assetto Corsa / LMU / autre simulateur.
En attendant, utiliser la validation humaine avec replay, télémétrie ou rapport de session vérifié.

Les données V4 présentes dans le même navigateur sont importées comme archives non validées.
Exporter les données avant de vider le cache du navigateur.
