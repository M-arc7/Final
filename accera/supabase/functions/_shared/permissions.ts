import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { forbidden } from './errors.ts';

export async function requireOrganisationPermission(token: string, organisationId: string, permission: string) {
  const url = Deno.env.get('SUPABASE_URL'); const key = Deno.env.get('SUPABASE_ANON_KEY');
  if (!url || !key) throw new Error('Supabase runtime configuration is missing.');
  const client = createClient(url, key, { global: { headers: { Authorization: token } }, auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.rpc('has_organisation_permission', { target_organisation_id: organisationId, required_permission: permission });
  if (error || data !== true) throw forbidden();
}
