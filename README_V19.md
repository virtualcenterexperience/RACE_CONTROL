# VCE ESPORT — V19 Race Control local

## Installation
Décompresser **tous** les fichiers à la racine du dépôt `RACE_CONTROL` sur GitHub Pages, puis actualiser la page (Ctrl+F5). Aucune clé Supabase, base de données ni Cloudflare Worker n'est nécessaire.

## Changements
- Suppression des scripts Supabase, des formulaires de connexion cloud et du relais cloud.
- Dashboard et profil en lecture des données **localStorage** (courses/résultats), sans promesse de synchronisation entre appareils.
- TEAM conserve les commandes de création, édition, suppression, affiches et export/import JSON locales.
- Stratégie : nouvelle interface cockpit, six indicateurs techniques, calculateur d'essence, trois scénarios indicatifs, alertes d'ingénierie, export/import JSON des trois courses.
- CSS responsive rouge/bleu/blanc, arrière-plan automobile, animations légères, focus clavier, prise en charge `prefers-reduced-motion`.
- Les modules historiques de stratégie (relais, pitstop, débrief, scénarios, carte circuit) sont conservés.

## Données et sauvegardes
Les données sont stockées dans le navigateur. Les pilotes utilisant d'autres appareils ne voient pas automatiquement les modifications. Pour déplacer les stratégies : `STRATÉGIE → EXPORTER LES 3 COURSES`, puis `IMPORTER JSON` sur l'autre appareil. Pour TEAM, utiliser son propre export/import JSON.

## Limites importantes
- Le mot de passe `train` dans une page statique n'est **pas une sécurité forte** : il verrouille l'interface, pas les données du navigateur.
- Le calcul de stratégie est une **estimation** basée sur les valeurs renseignées, pas un modèle de simulation complet : vérifier l'autonomie, les règles de l'épreuve et les pertes de temps réelles.
- Les scénarios V19 sont des comparaisons rapides, pas une optimisation exacte : le tableau principal de relais reste la référence opérationnelle.
- L'envoi Discord direct depuis un navigateur ne garantit pas la réception et peut exposer le webhook. Préférer la copie manuelle de l'annonce si la confidentialité est prioritaire.
- L'export JSON ne synchronise pas automatiquement les données TEAM et Entraînements avec les stratégies.

## Contrôles effectués
- Syntaxe JavaScript des nouveaux modules vérifiée avec `node --check`.
- Vérification des références aux scripts dans toutes les pages HTML.
- Archive ZIP vérifiée.
- Un test navigateur automatisé n'a pas pu être exécuté : le binaire Chromium n'est pas installé dans l'environnement.
