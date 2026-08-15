"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Brain, Mail, Lock, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

type Mode = "login" | "signup";

function LoginInner() {
  const params = useSearchParams();
  const router = useRouter();
  const redirect = params.get("redirect") ?? "/";
  const initialError = params.get("error") ? "Authentication failed. Please try again." : "";

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [notice, setNotice] = useState("");

  const authConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient();

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!authConfigured) {
      setError("Sign-in is not available yet — it is being configured. Please check back soon.");
      return;
    }
    setLoading(true);
    setError("");
    setNotice("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
        },
      });
      setLoading(false);
      if (error) return setError(error.message);
      setNotice("Check your email to confirm your account, then sign in.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    router.push(redirect);
    router.refresh();
  }

  async function handleOAuth(provider: "google") {
    if (!authConfigured) {
      setError("Sign-in is not available yet — it is being configured. Please check back soon.");
      return;
    }
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
      },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">AIHub</span>
          </div>
          <h1 className="text-2xl font-bold mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to access the Consulting Toolkit and Case Studies."
              : "Sign up to unlock the Consulting Toolkit and Case Studies."}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* OAuth buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuth("google")}
              className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-border bg-background hover:bg-accent transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or with email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Email + password */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-xs text-rose-500 bg-rose-500/10 rounded-lg p-3">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}
            {notice && (
              <div className="flex items-start gap-2 text-xs text-emerald-500 bg-emerald-500/10 rounded-lg p-3">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                {notice}
              </div>
            )}

            <Button type="submit" variant="gradient" size="lg" className="w-full gap-2" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setNotice(""); }}
              className="font-medium text-violet-500 hover:text-violet-400"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Public content stays free.{" "}
          <Link href="/" className="underline hover:text-foreground">Back to home</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh]" />}>
      <LoginInner />
    </Suspense>
  );
}
