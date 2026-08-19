"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/auth/client";
import { Lock, LogIn, UserPlus, Loader2 } from "lucide-react";

/**
 * Soft sign-in gate. Renders children only for authenticated users; otherwise
 * shows a sign-in wall. The gate resolves after the initial page load (client
 * side), so the public content above it is always indexable. Fails open if
 * Supabase auth is not configured, so a misconfiguration never hides content.
 */
export function AuthGate({
  title = "Sign in to continue",
  description = "This section is available to members. Sign in or create a free account to access it.",
  redirect = "/switzerland",
  children,
}: {
  title?: string;
  description?: string;
  redirect?: string;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<"loading" | "in" | "out">("loading");

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setState("in"); // auth not configured — do not hide content
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setState(data.user ? "in" : "out"));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setState(session?.user ? "in" : "out")
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  if (state === "loading") {
    return (
      <div className="min-h-[220px] flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (state === "in") return <>{children}</>;

  const loginHref = `/login?redirect=${encodeURIComponent(redirect)}`;

  return (
    <div className="relative">
      {/* Blurred preview of what's behind the gate */}
      <div aria-hidden className="pointer-events-none select-none blur-[6px] opacity-40 max-h-[280px] overflow-hidden">
        {children}
      </div>

      {/* Sign-in wall */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center ring-gradient">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={loginHref}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white text-sm font-medium shadow-md shadow-violet-500/30 hover:brightness-110 transition w-full sm:w-auto"
            >
              <LogIn className="w-4 h-4" /> Sign in
            </Link>
            <Link
              href={loginHref}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition w-full sm:w-auto"
            >
              <UserPlus className="w-4 h-4" /> Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
