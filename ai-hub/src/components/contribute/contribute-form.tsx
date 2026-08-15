"use client";

import { useState } from "react";
import {
  Wrench, Building2, TrendingUp, Shield, BookOpen, Library, MessageSquare,
  Loader2, CheckCircle2, AlertCircle, Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FieldDef = { key: string; label: string; placeholder?: string; textarea?: boolean };

type TypeDef = {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  fields: FieldDef[];
};

const TYPES: TypeDef[] = [
  {
    id: "tool", title: "AI Tool", icon: Wrench, color: "from-blue-500 to-cyan-500",
    fields: [
      { key: "Tool name", label: "Tool name" },
      { key: "Website", label: "Website URL", placeholder: "https://" },
      { key: "Category", label: "Category", placeholder: "Code, Image, Voice, etc." },
      { key: "Pricing model", label: "Pricing model", placeholder: "Free / Freemium / Paid / Enterprise" },
      { key: "Key use cases", label: "Key use cases", textarea: true },
      { key: "Pros & cons", label: "Pros & cons", textarea: true },
    ],
  },
  {
    id: "company", title: "AI Company", icon: Building2, color: "from-violet-500 to-purple-500",
    fields: [
      { key: "Company name", label: "Company name" },
      { key: "HQ & founded year", label: "HQ & founded year", placeholder: "San Francisco, CA · 2021" },
      { key: "Focus area & stage", label: "Focus area & stage", placeholder: "Foundation models · Private" },
      { key: "Key products & models", label: "Key products & models", textarea: true },
      { key: "Funding", label: "Funding (if public)", placeholder: "$X raised, valuation" },
      { key: "Brief history", label: "Brief history", textarea: true },
    ],
  },
  {
    id: "case-study", title: "Case Study", icon: TrendingUp, color: "from-emerald-500 to-teal-500",
    fields: [
      { key: "Company & industry", label: "Company & industry" },
      { key: "Problem statement", label: "Problem statement", textarea: true },
      { key: "AI solution used", label: "AI solution used", textarea: true },
      { key: "Measurable outcomes & metrics", label: "Measurable outcomes & metrics", textarea: true },
      { key: "Source / public reference", label: "Source / public reference", placeholder: "https://" },
    ],
  },
  {
    id: "compliance", title: "Compliance Framework", icon: Shield, color: "from-amber-500 to-orange-500",
    fields: [
      { key: "Framework name & jurisdiction", label: "Framework name & jurisdiction" },
      { key: "Status", label: "Status", placeholder: "In force / Proposed" },
      { key: "Key requirements summary", label: "Key requirements summary", textarea: true },
      { key: "Affected organizations", label: "Affected organizations", textarea: true },
      { key: "Official source link", label: "Official source link", placeholder: "https://" },
    ],
  },
  {
    id: "learning", title: "Learning Resource", icon: BookOpen, color: "from-pink-500 to-rose-500",
    fields: [
      { key: "Title & provider", label: "Title & provider" },
      { key: "Type", label: "Type", placeholder: "Course / Video / Certification / Book" },
      { key: "Level", label: "Level", placeholder: "Beginner / Intermediate / Advanced" },
      { key: "Free or paid", label: "Free or paid" },
      { key: "Link", label: "Link", placeholder: "https://" },
    ],
  },
  {
    id: "research", title: "Research Document", icon: Library, color: "from-indigo-500 to-blue-500",
    fields: [
      { key: "Title & source organization", label: "Title & source organization" },
      { key: "Year published", label: "Year published" },
      { key: "Category", label: "Category", placeholder: "Research Paper, Industry Report, etc." },
      { key: "Brief summary", label: "Brief summary", textarea: true },
      { key: "Public link", label: "Public link", placeholder: "https://" },
    ],
  },
  {
    id: "feedback", title: "General Feedback", icon: MessageSquare, color: "from-slate-500 to-zinc-500",
    fields: [
      { key: "Subject", label: "Subject", placeholder: "Bug report, suggestion, correction…" },
      { key: "Message", label: "Message", textarea: true },
      { key: "Related page (optional)", label: "Related page (optional)", placeholder: "https://ai-hub.host/…" },
    ],
  },
];

export function ContributeForm() {
  const [typeId, setTypeId] = useState<string>("tool");
  const [values, setValues] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliated, setAffiliated] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const type = TYPES.find((t) => t.id === typeId)!;

  function setField(key: string, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function selectType(id: string) {
    setTypeId(id);
    setValues({});
    setError("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: typeId, name, email, affiliated, fields: values, website: honeypot }),
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

  if (done) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Thank you!</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Your submission has been sent to our team. We review every contribution and will follow up
          at <b>{email}</b> if we need more detail.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => { setDone(false); setValues({}); setName(""); setEmail(""); setAffiliated(false); }}
        >
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-card rounded-2xl p-6 sm:p-8">
      {/* Type selector */}
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 block">
        What are you submitting?
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => selectType(t.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all duration-150",
              typeId === t.id
                ? "border-primary bg-primary/10"
                : "border-border/60 hover:border-border hover:bg-accent/50"
            )}
          >
            <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center", t.color)}>
              <t.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-medium leading-tight">{t.title}</span>
          </button>
        ))}
      </div>

      {/* Dynamic fields */}
      <div className="space-y-4 mb-6">
        {type.fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{f.label}</label>
            {f.textarea ? (
              <textarea
                value={values[f.key] ?? ""}
                onChange={(e) => setField(f.key, e.target.value)}
                placeholder={f.placeholder}
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
            ) : (
              <input
                type="text"
                value={values[f.key] ?? ""}
                onChange={(e) => setField(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full h-11 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
            )}
          </div>
        ))}
      </div>

      {/* Submitter details */}
      <div className="border-t border-border/60 pt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your name</label>
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer">
          <input
            type="checkbox" checked={affiliated} onChange={(e) => setAffiliated(e.target.checked)}
            className="mt-0.5 accent-violet-600"
          />
          I work for or am affiliated with the tool / company / resource in this submission (disclosure).
        </label>

        {/* Honeypot — hidden from humans */}
        <input
          type="text" tabIndex={-1} autoComplete="off" value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute -left-[9999px] w-px h-px" aria-hidden="true"
        />

        {error && (
          <div className="flex items-start gap-2 text-xs text-rose-500 bg-rose-500/10 rounded-lg p-3">
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> {error}
          </div>
        )}

        <Button type="submit" variant="gradient" size="lg" className="w-full gap-2" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Send submission
        </Button>
        <p className="text-[11px] text-muted-foreground text-center">
          Goes straight to our team. We only use your email to follow up on this submission.
        </p>
      </div>
    </form>
  );
}
