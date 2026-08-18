import { AdminNav } from "@/components/admin/admin-nav";
import { runSeoAudit, type SeoCheck } from "@/lib/agent/seo-checks";
import { Search, CheckCircle2, AlertTriangle, XCircle, Sparkles, Globe } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function requireAuth(key: string | undefined) {
  return key === process.env.ANALYTICS_ADMIN_KEY;
}

const META = {
  ok: { icon: CheckCircle2, cls: "text-emerald-400", ring: "border-emerald-500/20 bg-emerald-500/5" },
  warn: { icon: AlertTriangle, cls: "text-amber-400", ring: "border-amber-500/20 bg-amber-500/5" },
  error: { icon: XCircle, cls: "text-rose-400", ring: "border-rose-500/20 bg-rose-500/5" },
} as const;

function Row({ check }: { check: SeoCheck }) {
  const m = META[check.status];
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
          <p className="text-xs text-white/55 mt-1 break-words">{check.detail}</p>
          {check.action && (
            <p className="text-xs text-violet-300 mt-2 flex items-start gap-1.5">
              <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />{check.action}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function SeoAgentPage({
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

  const { checks, score } = await runSeoAudit();
  const errors = checks.filter((c) => c.status === "error");
  const warnings = checks.filter((c) => c.status === "warn");
  const oks = checks.filter((c) => c.status === "ok");
  const ordered = [...errors, ...warnings, ...oks];
  const scoreColor = score >= 90 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-rose-400";
  const grade = score >= 90 ? "Top class" : score >= 75 ? "Strong" : score >= 60 ? "Needs work" : "At risk";

  return (
    <div className="min-h-screen text-white" style={{ background: "hsl(222 47% 6%)" }}>
      <div className="border-b border-white/8 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
          <Search className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold">SEO Agent</h1>
          <p className="text-xs text-white/40">Live audit of the production site — re-runs on every load</p>
        </div>
      </div>

      <AdminNav active="seo" adminKey={params.key ?? ""} />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className={`text-5xl font-black ${scoreColor}`}>{score}</div>
            <div className="text-xs text-white/40 mt-1 uppercase tracking-widest">SEO score</div>
            <div className={`text-[11px] mt-1 font-semibold ${scoreColor}`}>{grade}</div>
          </div>
          <Stat label="Passing" value={oks.length} cls="text-emerald-400" />
          <Stat label="Warnings" value={warnings.length} cls="text-amber-400" />
          <Stat label="Errors" value={errors.length} cls="text-rose-400" />
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-start gap-3">
          <Globe className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-white/55">
            This agent fetches <span className="text-white/80">https://ai-hub.host</span> and its
            sitemap, robots.txt, and llms.txt live, then inspects titles, descriptions, canonical tags,
            headings, structured data, crawlability, and freshness. It catches any SEO regression the
            moment a deploy introduces it.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Audit findings &amp; fixes
          </h2>
          <div className="space-y-2.5">
            {ordered.map((c) => <Row key={c.id} check={c} />)}
          </div>
        </div>

        <p className="text-[11px] text-white/25">
          Findings with a violet action line are the exact changes to reach top-class SEO. Rule-based
          and free — no external AI calls. Autonomous code-fixing is available with an LLM API key.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, cls }: { label: string; value: number; cls: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className={`text-4xl font-bold ${cls}`}>{value}</div>
      <div className="text-xs text-white/40 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}
