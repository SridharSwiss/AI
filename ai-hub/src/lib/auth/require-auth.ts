import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth/server";

/**
 * Server-side gate for protected route segments. Redirects to /login when
 * there is no authenticated user. Fails open only if auth is not configured
 * (env vars absent) so a misconfiguration cannot lock the whole site.
 */
export async function requireUser(redirectTo: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return; // auth not configured yet — do not gate

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`);
  }
}
