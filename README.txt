VCE ESPORT / PERFORMANCE HUB V6 — GRIS & VERT

INSTALLATION
Décompresser l’intégralité du ZIP à la racine du dépôt GitHub Pages (ne pas supprimer les données existantes).

ACCUEIL
- Trois profils : INDIVIDUEL, GROUPE, ACCÈS COACHS.
- ACCÈS COACHS : mot de passe défini à la demande du responsable.
- Classement public visible avant la sélection d’un profil.
- Le mode Groupe conserve Race Control mais ne peut plus valider ou modifier les scores.
- Seul l’écran Accès Coachs propose la validation des séances, la planification et les absences.
- Les imports pilotes sont systématiquement en attente, ils ne peuvent pas injecter des points validés.

DESIGN
- Palette gris graphite et vert inspirée du circuit transmis.
- Menu commun VCE Esport sur les pages secondaires.
- Circuits stylisés animés en rotation : Spa, Monza, Suzuka, Le Mans, Bathurst.
- Schémas illustratifs et non tracés officiels précis.

LIMITATION IMPORTANTE
Le mot de passe est vérifié dans le navigateur (hachage SHA-256), sans serveur. Il protège l’accès par l’interface mais ne constitue PAS une véritable sécurité : le code et localStorage restent accessibles à un utilisateur technique. Il n’y a pas de synchronisation entre appareils, et les temps/tours restent déclaratifs. Pour empêcher réellement la triche, il faut une authentification serveur, une base de données centralisée et une télémétrie authentifiée du jeu.
