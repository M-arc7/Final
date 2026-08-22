import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { unauthorized } from './errors.ts';
import type { AuthenticatedActor } from './types.ts';

export async function authenticate(request: Request): Promise<AuthenticatedActor> {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) throw unauthorized();
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_ANON_KEY');
  if (!url || !key) throw new Error('Supabase runtime configuration is missing.');
  const client = createClient(url, key, { global: { headers: { Authorization: authorization } }, auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) throw unauthorized();
  return { id: data.user.id, email: data.user.email };
}
