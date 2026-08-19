"use client";

import { useMemo, useState } from "react";
import {
  UserCheck, Clock, ShieldCheck, XCircle, Search, Bot, MapPin, Building2,
  Mail, ExternalLink, ChevronDown, ChevronRight, Loader2, Check, X,
} from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";

export type Membership = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  organization: string | null;
  job_title: string | null;
  membership_category: string | null;
  seniority: string | null;
  country: string | null;
  city: string | null;
  linkedin_url: string | null;
  website: string | null;
  areas_of_interest: string[] | null;
  bio: string | null;
  status: string;
  ai_recommendation: string | null;
  ai_score: number | null;
  review_notes: string | null;
};

const STATUS_TABS = ["pending", "approved", "rejected", "all"] as const;
type Tab = (typeof STATUS_TABS)[number];

function fmt(s: string) {
  return new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function MembershipsDashboard({
  applications,
  adminKey,
}: {
  applications: Membership[];
  adminKey: string;
}) {
  const [rows, setRows] = useState(applications);
  const [tab, setTab] = useState<Tab>("pending");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const counts = useMemo(() => ({
    pending: rows.filter((r) => r.status === "pending").length,
    approved: rows.filter((r) => r.status === "approved").length,
    rejected: rows.filter((r) => r.status === "rejected").length,
    all: rows.length,
  }), [rows]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows
      .filter((r) => tab === "all" || r.status === tab)
      .filter((r) => !term || r.full_name.toLowerCase().includes(term) || r.email.toLowerCase().includes(term) || (r.organization ?? "").toLowerCase().includes(term))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [rows, tab, q]);

  async function act(id: string, status: "approved" | "rejected" | "pending") {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/memberships", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: adminKey, id, status }),
      });
      if (res.ok) setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="min-h-screen text-white" style={{ background: "hsl(222 47% 6%)" }}>
      <div className="border-b border-white/8 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center">
          <UserCheck className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold">Membership Applications</h1>
          <p className="text-xs text-white/40">AI Hub Switzerland · {counts.pending} pending review</p>
        </div>
      </div>

      <AdminNav active="memberships" adminKey={adminKey} />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            {STATUS_TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3 h-8 rounded-lg text-xs font-semibold capitalize transition-colors ${tab === t ? "bg-rose-600 text-white" : "text-white/45 hover:text-white hover:bg-white/8"}`}>
                {t} <span className="opacity-60">{counts[t]}</span>
              </button>
            ))}
          </div>
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, organization…"
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-white/15 bg-white/5 text-sm focus:outline-none focus:border-rose-500" />
          </div>
        </div>

        {visible.length === 0 && <p className="text-center text-white/30 text-sm py-12">No applications in this view.</p>}

        {/* List */}
        <div className="space-y-3">
          {visible.map((m) => {
            const isOpen = open === m.id;
            const rec = m.ai_recommendation;
            return (
              <div key={m.id} className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="p-4 flex items-center gap-4">
                  <button onClick={() => setOpen(isOpen ? null : m.id)} className="flex items-center gap-3 flex-1 min-w-0 text-left">
                    {isOpen ? <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-white/40 flex-shrink-0" />}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {m.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{m.full_name}
                        <span className="text-white/40 font-normal ml-2 text-xs">{m.membership_category}</span>
                      </div>
                      <div className="text-xs text-white/45 truncate">{m.job_title ? `${m.job_title} · ` : ""}{m.organization ?? m.email}</div>
                    </div>
                  </button>

                  {/* Agent recommendation */}
                  {rec && (
                    <span className={`hidden sm:inline-flex items-center gap-1 text-[10px] rounded-full px-2 py-1 ${rec === "approve" ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"}`}>
                      <Bot className="w-3 h-3" /> {rec} · {m.ai_score ?? 0}
                    </span>
                  )}

                  {/* Status / actions */}
                  {m.status === "pending" ? (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button onClick={() => act(m.id, "approved")} disabled={busy === m.id}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold disabled:opacity-40">
                        {busy === m.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />} Approve
                      </button>
                      <button onClick={() => act(m.id, "rejected")} disabled={busy === m.id}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-white/15 hover:bg-white/5 text-xs font-semibold disabled:opacity-40">
                        <X className="w-3 h-3" /> Reject
                      </button>
                    </div>
                  ) : (
                    <StatusBadge status={m.status} />
                  )}
                </div>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 grid grid-cols-1 lg:grid-cols-2 gap-5 border-t border-white/5">
                    <div className="space-y-2 text-xs pt-4">
                      <Row icon={Mail} label="Email" value={m.email} />
                      <Row icon={Building2} label="Organization" value={m.organization ?? "—"} />
                      <Row icon={MapPin} label="Location" value={[m.city, m.country].filter(Boolean).join(", ") || "—"} />
                      <Row icon={UserCheck} label="Seniority" value={m.seniority ?? "—"} />
                      {m.linkedin_url && <LinkRow label="LinkedIn" href={m.linkedin_url} />}
                      {m.website && <LinkRow label="Website" href={m.website} />}
                      <div className="text-white/30 pt-1">Applied {fmt(m.created_at)}</div>
                    </div>
                    <div className="pt-4">
                      {m.areas_of_interest && m.areas_of_interest.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {m.areas_of_interest.map((a) => <span key={a} className="text-[10px] rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-white/60">{a}</span>)}
                        </div>
                      )}
                      {m.bio && <p className="text-xs text-white/60 leading-relaxed mb-3">{m.bio}</p>}
                      {m.review_notes && (
                        <p className="text-[11px] text-amber-300/80 flex items-start gap-1.5">
                          <Bot className="w-3 h-3 mt-0.5 flex-shrink-0" /> {m.review_notes}
                        </p>
                      )}
                      {m.status !== "pending" && (
                        <button onClick={() => act(m.id, "pending")} className="text-[11px] text-white/40 hover:text-white mt-3 underline">
                          Reset to pending
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-white/25">
          The <Bot className="inline w-3 h-3" /> agent recommendation scores each application on completeness and
          profile quality (free, rule-based). LLM-based fit review is available with an API key.
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const m = {
    approved: { icon: ShieldCheck, cls: "text-emerald-300 bg-emerald-500/10" },
    rejected: { icon: XCircle, cls: "text-rose-300 bg-rose-500/10" },
    pending: { icon: Clock, cls: "text-amber-300 bg-amber-500/10" },
  }[status] ?? { icon: Clock, cls: "text-white/50 bg-white/5" };
  const Icon = m.icon;
  return <span className={`inline-flex items-center gap-1 text-[10px] rounded-full px-2.5 py-1 capitalize ${m.cls}`}><Icon className="w-3 h-3" /> {status}</span>;
}

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/40 flex items-center gap-1.5"><Icon className="w-3 h-3" />{label}</span>
      <span className="text-white/80 text-right truncate max-w-[220px]">{value}</span>
    </div>
  );
}

function LinkRow({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/40">{label}</span>
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-rose-300 hover:underline inline-flex items-center gap-1 truncate max-w-[220px]">
        {href.replace(/^https?:\/\//, "")} <ExternalLink className="w-3 h-3 flex-shrink-0" />
      </a>
    </div>
  );
}
