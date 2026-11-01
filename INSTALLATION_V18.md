# VCE ESPORT — V18 Control Center

## 1. Installation immédiate (sans base de données)

1. Sauvegarder le dépôt actuel et les exports JSON des pilotes, courses et résultats.
2. Décompresser cette archive à la racine du dépôt `RACE_CONTROL` sur GitHub Pages.
3. Publier les fichiers, puis ouvrir `index.html`, `dashboard.html`, `team.html` et `profil.html`.
4. Le site fonctionne en **mode local de démonstration** : les données existantes restent sur l'appareil et ne sont pas partagées entre navigateurs.
5. Le mot de passe `train` permet toujours de gérer TEAM **en local uniquement**. Il ne protège pas réellement les données.

## 2. Activer la synchronisation Supabase (nécessite votre propre projet)

1. Créer un projet Supabase et activer l'authentification Email / Password.
2. Exécuter **une seule fois** le fichier `backend/supabase_schema.sql` dans le SQL Editor du projet.
3. Dans `vce-cloud-config.js`, saisir **uniquement** l'URL du projet et la clé **anon / publishable**. Ces deux éléments sont publics. Ne jamais placer une clé `service_role` dans le site.
4. Publier `vce-cloud-config.js` avec le site. Le badge du Tableau de bord doit afficher **CLOUD · DONNÉES PARTAGÉES**.
5. Créer un compte pilote depuis `dashboard.html`, confirmer l'email si requis, puis se connecter.
6. Pour promouvoir un manager, exécuter dans le SQL Editor :

```sql
update public.member_profiles set role='manager'
where id=(select id from auth.users where email='adresse-du-manager@exemple.fr');
```

7. Se reconnecter pour actualiser les droits. Seul un compte manager / coach / admin peut modifier les données partagées.
8. Dans TEAM, le Manager peut cliquer sur **Importer mes anciennes courses / résultats vers le cloud**. Les sauvegardes locales sont conservées automatiquement au premier chargement cloud. Vérifier les données avant import.

### Synchronisation effective

- Courses et résultats TEAM : lecture publique, modification Manager, synchronisation au chargement et toutes les 25 secondes environ quand la page est visible.
- Disponibilités : un pilote connecté peut répondre pour lui-même ; les responsables voient les réponses.
- Annonces : le Manager publie, les membres consultent.
- Entraînements : une séance terminée dans le chrono historique est soumise au cloud en attente **si** le compte connecté correspond au nom du pilote sélectionné. Le Staff valide depuis le Tableau de bord. Les séances déjà archivées localement ne sont **pas** migrées automatiquement.
- Points cloud : +2 par **journée** avec au moins une séance vérifiée, sans cumul des séances du même jour. Les pénalités d'absence et les bonus d'endurance du module historique ne sont **pas** encore transférés au calcul cloud.
- Profils : les comptes cloud sont distincts des anciens profils locaux. Pour rattacher un ancien résultat, utiliser exactement le nom du pilote dans `profil.html`.

### Limites et sécurité

- Les données anciennes restent sur le navigateur d'origine tant qu'elles ne sont pas importées.
- L'ancien code du site utilise encore plusieurs générations de CSS/JS. La V18 ajoute une charte graphique cohérente et de nouveaux modules, **mais ne réécrit pas entièrement tous les modules historiques**.
- Le verrouillage `train` ne donne **aucun** droit cloud. La protection réelle est appliquée par les politiques RLS dans Supabase.
- Les résultats sont associés aux pilotes **par nom**, pas encore par identifiant immuable ; des homonymes peuvent être confondus.
- Le chronomètre mesure du temps écoulé et ne prouve pas une activité de pilotage ; la validation Staff reste obligatoire.
- Le site inclut `telemetrie.html`, un analyseur CSV local (tours et secteurs), mais **pas** de capture de télémétrie automatique Assetto Corsa / LMU. Les indicateurs de course reposent sur les résultats saisis par le Staff.
- Un hébergement GitHub Pages seul ne peut pas conserver des secrets ni garantir des accès Staff.

## 3. Annonces Discord sécurisées

L'ancien webhook Discord était publié dans le code source et a été retiré de cette version. **Régénérer le webhook dans Discord** : l'ancien jeton doit être considéré comme compromis.

Option avec Supabase Edge Functions :

1. Déployer `backend/discord_edge_function.ts` sous le nom `vce-discord`, en gardant la vérification JWT activée.
2. Ajouter les secrets serveur `DISCORD_WEBHOOK_URL` (nouveau webhook) et `SITE_ORIGIN` (`https://virtualcenterexperience.github.io`).
3. Se connecter avec un compte manager dans le site.
4. Utiliser **Envoyer sur Discord** depuis TEAM, ou activer l'option d'annonces automatiques pour les nouvelles courses/résultats.

L'Edge Function vérifie le jeton d'authentification et le rôle du compte côté serveur avant d'envoyer le message.

## 4. Affiche Race Result

Ouvrir `team.html` → tout en bas, **STUDIO GRAPHIQUE V18**. Choisir un résultat et cliquer sur **TÉLÉCHARGER LE PNG 1920 × 1080**. L'affiche est dessinée sur un `<canvas>` 1920 × 1080, sans dépendance externe ni chargement de police ou image distante.

## 5. Tests recommandés avant mise en production

- Sur un navigateur vierge : ouvrir le site sans compte, vérifier la consultation publique de TEAM.
- Créer un compte pilote et confirmer qu'il ne peut ni modifier ni supprimer les courses.
- Créer un compte manager (rôle attribué via SQL), créer une course et vérifier qu'elle apparaît sur un autre appareil après synchronisation.
- Confirmer une disponibilité depuis le compte pilote, puis vérifier la réponse côté manager.
- Soumettre deux entraînements le même jour, valider les deux et confirmer que le total reste +2 points.
- Créer un résultat, générer l'affiche 1920 × 1080, vérifier ses dimensions et le fichier téléchargé.
- Tester l'envoi Discord après avoir déployé l'Edge Function.
- Vérifier le parcours Accueil → Profil → Entraînement / Stratégie / TEAM sur mobile.

**Aucune base Supabase ni Edge Function n'a été créée ou déployée par cette archive.**
