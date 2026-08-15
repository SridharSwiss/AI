"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/auth/client";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AuthButton() {
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return <div className="h-8 w-8" aria-hidden />;
  }

  if (!email) {
    return (
      <Link
        href="/login"
        className={cn(
          "hidden sm:inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm font-medium",
          "border border-border/60 bg-background/60 text-muted-foreground",
          "hover:bg-accent hover:text-foreground hover:border-border transition-all duration-150"
        )}
      >
        <LogIn className="w-3.5 h-3.5" />
        Sign in
      </Link>
    );
  }

  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((o) => !o)}
        onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
        className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-white text-sm font-bold"
        aria-label="Account menu"
      >
        {initial}
      </button>
      {menuOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden z-[200]">
          <div className="px-4 py-3 border-b border-border/60">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
              <UserIcon className="w-3 h-3" /> Signed in as
            </div>
            <div className="text-sm font-medium truncate">{email}</div>
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-accent transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
