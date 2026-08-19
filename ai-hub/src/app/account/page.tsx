"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/auth/client";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Lock, Loader2, CheckCircle2, AlertCircle, Mail, LogIn } from "lucide-react";

export default function AccountPage() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setReady(true);
    });
  }, []);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setDone(false);
    if (password.length < 8) return setError("Use at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) return setError(error.message);
      setDone(true);
      setPassword(""); setConfirm("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader accent="violet" eyebrow="Account" title="Your account" description="Manage your AIHub account and password." />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!ready ? (
          <div className="flex justify-center py-12"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
        ) : !email ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <LogIn className="w-8 h-8 text-violet-500 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-5">You need to be signed in to manage your account.</p>
            <Link href="/login?redirect=/account"><Button variant="gradient" size="lg" className="w-full">Sign in</Button></Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Identity */}
            <div className="glass-card rounded-2xl p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-white font-bold">
                {email.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground flex items-center gap-1.5"><Mail className="w-3 h-3" /> Signed in as</div>
                <div className="text-sm font-medium truncate">{email}</div>
              </div>
            </div>

            {/* Change password */}
            <form onSubmit={changePassword} className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold mb-1">Change password</h2>
              <p className="text-xs text-muted-foreground mb-5">Set a new password for your account.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">New password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                      className="w-full h-11 pl-9 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Confirm password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••"
                      className="w-full h-11 pl-9 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-xs text-rose-500 bg-rose-500/10 rounded-lg p-3">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> {error}
                  </div>
                )}
                {done && (
                  <div className="flex items-start gap-2 text-xs text-emerald-500 bg-emerald-500/10 rounded-lg p-3">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> Password updated successfully.
                  </div>
                )}

                <Button type="submit" variant="gradient" size="lg" className="w-full gap-2" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Update password
                </Button>
              </div>
            </form>

            <form action="/auth/signout" method="post" className="text-center">
              <button type="submit" className="text-sm text-muted-foreground hover:text-foreground underline">Sign out</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
