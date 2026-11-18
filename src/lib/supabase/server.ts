import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let anonClient: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the public anon/publishable key.
 * Access is governed entirely by Row Level Security policies — there is no
 * service-role bypass key in this app. Public writes (e.g. the contact
 * form) rely on a policy that grants the `anon` role insert-only access;
 * admin reads/writes rely on policies scoped to `authenticated` users via
 * Supabase Auth.
 */
export function getSupabaseServer(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (see .env.example).",
    );
  }
  if (!anonClient) {
    anonClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return anonClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
