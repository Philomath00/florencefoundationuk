import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Session-aware Supabase client for Server Components, Server Actions and
 * Route Handlers under /admin. Reads/writes the auth session via cookies,
 * so RLS policies see the signed-in user (and therefore `is_admin()`).
 */
export async function createRscSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component with no response to attach
            // cookies to — fine as long as middleware also refreshes the
            // session on navigation.
          }
        },
      },
    },
  );
}
