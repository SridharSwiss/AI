import { AdminNav } from "@/components/admin/admin-nav";
import { runHealthChecks, type Check } from "@/lib/agent/health-checks";
import {
  Bot, CheckCircle2, AlertTriangle, XCircle, Sparkles, TrendingUp,
  FileSearch, MessageSquare, Lock,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function requireAuth(key: string | undefined) {
  return key === process.env.ANALYTICS_ADMIN_KEY;
}

const STATUS_META = {
  ok: { icon: CheckCircle2, cls: "text-emerald-400", ring: "border-emerald-500/20 bg-emerald-500/5" },
  warn: { icon: AlertTriangle, cls: "text-amber-400", ring: "border-amber-500/20 bg-amber-500/5" },
  error: { icon: XCircle, cls: "text-rose-400", ring: "border-rose-500/20 bg-rose-500/5" },
} as const;

function CheckRow({ check }: { check: Check }) {
  const m = STATUS_META[check.status];
  const Icon = m.icon;
  return (
    <div className={`rounded-xl border p-4 ${m.ring}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${m.cls}`} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-white">{check.title}</span>
            <span className="text-[10px] uppercase tracking-wider text-white/30">{check.category}</span>
          </div>
          <p className="text-xs text-white/55 mt-1">{check.detail}</p>
          {check.action && (
            <p className="text-xs text-violet-300 mt-2 flex items-start gap-1.5">
              <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
              {check.action}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const FUTURE_AGENTS = [
  { icon: TrendingUp, title: "Content Growth Agent", desc: "Auto-researches and drafts new tools, companies, and news daily — fully autonomous on a schedule.", tag: "Needs LLM API" },
  { icon: FileSearch, title: "Contribution Triage Agent", desc: "Reviews Contribute submissions, validates facts, and prepares ready-to-merge entries for your approval.", tag: "Needs LLM API" },
  { icon: MessageSquare, title: "Visitor Assistant", desc: "On-site chatbot answering questions from your tools, compliance, and case-study data.", tag: "Needs LLM API" },
];

export default async function AgentPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const params = await searchParams;
  if (!requireAuth(params.key)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(222 47% 6%)" }}>
        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">Access restricted</p>
          <form method="GET">
            <input name="key" type="password" placeholder="Enter admin key"
              className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm w-64 focus:outline-none focus:border-violet-500"
              autoComplete="current-password" />
            <button type="submit" className="ml-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors">Enter</button>
          </form>
        </div>
      </div>
    );
  }

  const { checks, counts, score } = await runHealthChecks();
  const errors = checks.filter((c) => c.status === "error");
  const warnings = checks.filter((c) => c.status === "warn");
  const oks = checks.filter((c) => c.status === "ok");
  const ordered = [...errors, ...warnings, ...oks];

  const scoreColor = score >= 90 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-rose-400";

  return (
    <div className="min-h-screen text-white" style={{ background: "hsl(222 47% 6%)" }}>
      <div className="border-b border-white/8 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold">AI Management Agent</h1>
          <p className="text-xs text-white/40">Autonomous site health &amp; operations monitor</p>
        </div>
      </div>

      <AdminNav active="agent" adminKey={params.key ?? ""} />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Health score + summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className={`text-5xl font-black ${scoreColor}`}>{score}</div>
            <div className="text-xs text-white/40 mt-1 uppercase tracking-widest">Health score</div>
          </div>
          <Summary label="Passing" value={oks.length} cls="text-emerald-400" />
          <Summary label="Warnings" value={warnings.length} cls="text-amber-400" />
          <Summary label="Errors" value={errors.length} cls="text-rose-400" />
        </div>

        {/* Content snapshot */}
        <div className="rounded-2xl border border-white/10 p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Content inventory</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {Object.entries(counts).map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="text-2xl font-bold">{v}</div>
                <div className="text-[10px] text-white/40">{k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Checks */}
        <div>
          <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" /> Agent findings &amp; recommended actions
          </h2>
          <div className="space-y-2.5">
            {ordered.map((c) => <CheckRow key={c.id} check={c} />)}
          </div>
        </div>

        {/* Roadmap: paid autonomous agents */}
        <div>
          <h2 className="text-sm font-bold mb-1 flex items-center gap-2">
            <Bot className="w-4 h-4 text-violet-400" /> Autonomous agents (available with an LLM API key)
          </h2>
          <p className="text-xs text-white/40 mb-3">
            The monitor above runs free. These add true LLM autonomy — enable them by provisioning an API key.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FUTURE_AGENTS.map((a) => (
              <div key={a.title} className="rounded-xl border border-white/10 p-4 relative" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3">
                  <a.icon className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{a.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed mb-3">{a.desc}</p>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-300/80 bg-amber-500/10 rounded-full px-2 py-0.5">
                  <Lock className="w-2.5 h-2.5" /> {a.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-white/25">
          The monitor re-runs on every page load. Refresh to re-scan. All checks are rule-based and run server-side — no external AI calls, no cost.
        </p>
      </div>
    </div>
  );
}

function Summary({ label, value, cls }: { label: string; value: number; cls: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className={`text-4xl font-bold ${cls}`}>{value}</div>
      <div className="text-xs text-white/40 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}
