"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldAlert, Search, Trash2, Loader2, CheckCircle2, AlertCircle, UserX } from "lucide-react";

type LookupResult =
  | { found: false; email: string }
  | {
      found: true;
      email: string;
      userId: string;
      createdAt: string;
      lastSignInAt: string | null;
      provider: string;
    };

function GdprInner() {
  const params = useSearchParams();
  const adminKey = params.get("key") ?? "";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function call(action: "lookup" | "delete") {
    setLoading(true);
    setError("");
    if (action === "lookup") { setResult(null); setDeleted(false); }
    try {
      const res = await fetch("/api/admin/gdpr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: adminKey, email, action }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Request failed"); return; }

      if (action === "lookup") {
        setResult(data);
      } else if (action === "delete") {
        setDeleted(true);
        setResult(null);
        setConfirming(false);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  if (!adminKey) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" style={{ background: "hsl(222 47% 6%)" }}>
        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">Access restricted — append <code className="text-violet-400">?key=YOUR_ADMIN_KEY</code> to the URL</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ background: "hsl(222 47% 6%)" }}>
      <div className="border-b border-white/8 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center">
          <ShieldAlert className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold">GDPR Data Management</h1>
          <p className="text-xs text-white/40">Right to access &amp; erasure (Art. 15 &amp; 17)</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="rounded-2xl border border-white/10 p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
          <label className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-2 block">
            Data subject email
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setResult(null); setDeleted(false); setError(""); }}
              placeholder="person@example.com"
              className="flex-1 h-11 px-4 rounded-xl border border-white/15 bg-white/5 text-white text-sm focus:outline-none focus:border-violet-500"
            />
            <button
              onClick={() => call("lookup")}
              disabled={loading || !email.includes("@")}
              className="px-4 h-11 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Look up
            </button>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 text-xs text-rose-400 bg-rose-500/10 rounded-lg p-3">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> {error}
            </div>
          )}

          {result && result.found === false && (
            <div className="mt-4 flex items-start gap-2 text-xs text-white/60 bg-white/5 rounded-lg p-3">
              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-400" />
              No account or stored personal data found for <b className="text-white ml-1">{result.email}</b>. Nothing to erase.
            </div>
          )}

          {result && result.found === true && (
            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-white/10 p-4 bg-white/[0.02] text-sm space-y-1.5">
                <Row label="Email" value={result.email} />
                <Row label="User ID" value={result.userId} mono />
                <Row label="Provider" value={result.provider} />
                <Row label="Created" value={new Date(result.createdAt).toLocaleString()} />
                <Row label="Last sign-in" value={result.lastSignInAt ? new Date(result.lastSignInAt).toLocaleString() : "—"} />
              </div>

              {!confirming ? (
                <button
                  onClick={() => setConfirming(true)}
                  className="w-full h-11 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Erase all data for this person
                </button>
              ) : (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
                  <p className="text-xs text-rose-200 mb-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    This permanently deletes the account and all identity data tied to <b>{result.email}</b>. This cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => call("delete")}
                      disabled={loading}
                      className="flex-1 h-10 rounded-lg bg-rose-600 hover:bg-rose-500 text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-40"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserX className="w-4 h-4" />}
                      Yes, permanently erase
                    </button>
                    <button
                      onClick={() => setConfirming(false)}
                      className="px-4 h-10 rounded-lg border border-white/15 text-sm hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {deleted && (
            <div className="mt-4 flex items-start gap-2 text-xs text-emerald-300 bg-emerald-500/10 rounded-lg p-3">
              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              Erased. The account and all associated identity data for <b className="mx-1">{email}</b> have been permanently deleted.
            </div>
          )}
        </div>

        <p className="text-[11px] text-white/30 mt-6 leading-relaxed">
          Note: website analytics are collected anonymously (no name or email is stored against page views),
          so erasing an account removes all personal data held for that individual. Deletions are logged in
          Supabase&apos;s audit trail.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-white/40 text-xs">{label}</span>
      <span className={`text-white/90 text-xs ${mono ? "font-mono" : ""} truncate`}>{value}</span>
    </div>
  );
}

export default function GdprPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "hsl(222 47% 6%)" }} />}>
      <GdprInner />
    </Suspense>
  );
}
