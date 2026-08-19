"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, AlertCircle, Clock, ShieldCheck, XCircle } from "lucide-react";

const CATEGORIES = ["Researcher", "Technology Expert", "Entrepreneur", "Policymaker", "Student", "Other"];
const SENIORITY = ["Individual Contributor", "Manager", "Director", "Executive / C-level", "Founder"];
const INTERESTS = [
  "AI Governance", "Frontier Research", "Enterprise Adoption", "AI Safety",
  "Startups & Funding", "Policy & Regulation", "AI Literacy & Talent", "Healthcare AI",
  "FinTech AI", "Robotics", "Open Source",
];

type Existing = { status: string; created_at: string; membership_category: string | null } | null;

export function MembershipForm() {
  const [checking, setChecking] = useState(true);
  const [existing, setExisting] = useState<Existing>(null);

  const [form, setForm] = useState({
    full_name: "", email: "", organization: "", job_title: "",
    membership_category: "", seniority: "", country: "", city: "",
    linkedin_url: "", website: "", bio: "",
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      // Prefill name/email from the signed-in user
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setForm((f) => ({
            ...f,
            email: data.user!.email ?? "",
            full_name: (data.user!.user_metadata?.full_name as string) ?? f.full_name,
          }));
        }
      } catch { /* ignore */ }

      try {
        const res = await fetch("/api/switzerland/join");
        const data = await res.json();
        if (data.application) setExisting(data.application);
      } catch { /* ignore */ }
      setChecking(false);
    })();
  }, []);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function toggleInterest(i: string) {
    setInterests((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!consent) { setError("Please accept the privacy terms to apply."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/switzerland/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, areas_of_interest: interests, consent, website_hp: hp }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Submission failed."); return; }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return <div className="glass-card rounded-2xl p-8 flex items-center justify-center min-h-[160px]"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>;
  }

  // Already applied → show status
  if (existing || done) {
    const status = done ? "pending" : existing!.status;
    const meta = {
      pending: { icon: Clock, cls: "text-amber-500", ring: "border-amber-500/20 bg-amber-500/5", label: "Under review", text: "Your application has been received and is pending approval. We'll be in touch by email." },
      approved: { icon: ShieldCheck, cls: "text-emerald-500", ring: "border-emerald-500/20 bg-emerald-500/5", label: "Approved", text: "Welcome to AI Hub Switzerland! Your membership is active." },
      rejected: { icon: XCircle, cls: "text-rose-500", ring: "border-rose-500/20 bg-rose-500/5", label: "Not approved", text: "Thank you for your interest. Your application was not approved at this time." },
    }[status] ?? { icon: Clock, cls: "text-amber-500", ring: "border-amber-500/20 bg-amber-500/5", label: "Received", text: "Your application has been received." };
    const Icon = meta.icon;
    return (
      <div className={cn("rounded-2xl border p-8 text-center", meta.ring)}>
        <Icon className={cn("w-10 h-10 mx-auto mb-4", meta.cls)} />
        <h3 className="text-xl font-bold mb-1">Membership: {meta.label}</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">{meta.text}</p>
      </div>
    );
  }

  const input = "w-full h-11 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40";
  // Native <option> lists ignore parent bg; set explicit light/dark colors so
  // the dropdown items are visible in dark mode.
  const select = `${input} [color-scheme:light] dark:[color-scheme:dark] [&>option]:bg-white [&>option]:text-zinc-900 dark:[&>option]:bg-zinc-900 dark:[&>option]:text-white`;

  return (
    <form onSubmit={submit} className="glass-card rounded-2xl p-6 sm:p-8">
      <h3 className="text-lg font-bold mb-1">Apply for membership</h3>
      <p className="text-xs text-muted-foreground mb-6">Membership is free and subject to approval. Fields marked * are required.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name *"><input required className={input} value={form.full_name} onChange={(e) => set("full_name", e.target.value)} /></Field>
        <Field label="Email *"><input required type="email" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Organization"><input className={input} value={form.organization} onChange={(e) => set("organization", e.target.value)} placeholder="Company / University / Agency" /></Field>
        <Field label="Job title"><input className={input} value={form.job_title} onChange={(e) => set("job_title", e.target.value)} /></Field>
        <Field label="I am a *">
          <select required className={select} value={form.membership_category} onChange={(e) => set("membership_category", e.target.value)}>
            <option value="">Select…</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Seniority">
          <select className={select} value={form.seniority} onChange={(e) => set("seniority", e.target.value)}>
            <option value="">Select…</option>
            {SENIORITY.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Country"><input className={input} value={form.country} onChange={(e) => set("country", e.target.value)} /></Field>
        <Field label="City"><input className={input} value={form.city} onChange={(e) => set("city", e.target.value)} /></Field>
        <Field label="LinkedIn profile"><input className={input} value={form.linkedin_url} onChange={(e) => set("linkedin_url", e.target.value)} placeholder="https://www.linkedin.com/in/…" /></Field>
        <Field label="Website (optional)"><input className={input} value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://" /></Field>
      </div>

      <div className="mt-4">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Areas of interest</label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <button key={i} type="button" onClick={() => toggleInterest(i)}
              className={cn("px-3 py-1.5 rounded-full text-xs border transition-colors",
                interests.includes(i) ? "bg-rose-500 text-white border-rose-500" : "border-border/60 hover:border-border")}>
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Why do you want to join? How would you contribute?</label>
        <textarea rows={4} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          value={form.bio} onChange={(e) => set("bio", e.target.value)} placeholder="A few sentences about your background and goals…" />
      </div>

      {/* honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="absolute -left-[9999px] w-px h-px" aria-hidden="true" />

      <label className="flex items-start gap-2.5 text-xs text-muted-foreground mt-5 cursor-pointer">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-rose-600" />
        I agree that my details will be stored and processed to review my membership, in line with the Privacy Policy. *
      </label>

      {error && (
        <div className="flex items-start gap-2 text-xs text-rose-500 bg-rose-500/10 rounded-lg p-3 mt-4">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> {error}
        </div>
      )}

      <Button type="submit" variant="gradient" size="lg" className="w-full gap-2 mt-6" disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
        Submit application
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
