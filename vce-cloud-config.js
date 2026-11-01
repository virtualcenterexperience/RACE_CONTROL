/* VCE V18 — Configuration publique Supabase. L'anon key est publique par conception.
   Ne JAMAIS placer de service_role key, webhook Discord ou mot de passe dans ce fichier. */
window.VCE_CLOUD_CONFIG = {
  url: '',       // Exemple: https://votre-projet.supabase.co
  anonKey: ''    // Clé publique anon / publishable
};
window.VCE_DISCORD_ENDPOINT = ''; // URL d'une fonction serveur sécurisée, PAS du webhook Discord.
