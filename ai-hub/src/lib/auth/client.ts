"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client for authentication.
 * Uses NEXT_PUBLIC_ env vars so the anon key is available in the browser.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
