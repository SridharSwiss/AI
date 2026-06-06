import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Monitor, Smartphone, Tablet, Globe, Clock, MousePointer, TrendingUp, Users, FileText, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ── auth ────────────────────────────────────────── */
function requireAuth(key: string | undefined) {
  return key === process.env.ANALYTICS_ADMIN_KEY;
}

/* ── data helpers ────────────────────────────────── */
async function fetchStats(days: number) {
  const since = new Date(Date.now() - days * 86400_000).toISOString();

  const [sessions, pageviews] = await Promise.all([
    supabase.from("analytics_sessions").select("*").gte("created_at", since).order("created_at", { ascending: false }),
    supabase.from("analytics_pageviews").select("*").gte("created_at", since),
  ]);

  return { sessions: sessions.data ?? [], pageviews: pageviews.data ?? [] };
}

function fmt(secs: number) {
  if (secs < 60) return `${secs}s`;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
}

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key] ?? "Unknown");
    (acc[k] = acc[k] ?? []).push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

function topN<T>(obj: Record<string, T[]>, n = 8) {
  return Object.entries(obj)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, n);
}

/* ── sub-components ──────────────────────────────── */
function StatCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-5" style={{ background: "rgba(255,255,255,0.04)" }}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-violet-400" />
        <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </div>
  );
}

function BarRow({ label, count, max, color = "bg-violet-500" }: { label: string; count: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="text-sm text-white/70 w-36 truncate flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-semibold text-white w-8 text-right">{count}</span>
    </div>
  );
}

function DeviceIcon({ type }: { type: string }) {
  if (type === "mobile") return <Smartphone className="w-3.5 h-3.5" />;
  if (type === "tablet") return <Tablet className="w-3.5 h-3.5" />;
  return <Monitor className="w-3.5 h-3.5" />;
}

const SOURCE_COLORS: Record<string, string> = {
  Direct: "bg-violet-500", Google: "bg-blue-500", LinkedIn: "bg-sky-500",
  "Twitter/X": "bg-cyan-500", Facebook: "bg-indigo-500", GitHub: "bg-slate-400",
  Referral: "bg-pink-500", Bing: "bg-emerald-500", DuckDuckGo: "bg-amber-500",
};

/* ── page ────────────────────────────────────────── */
export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; days?: string }>;
}) {
  const params = await searchParams;
  if (!requireAuth(params.key)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(222 47% 6%)" }}>
        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">Access restricted</p>
          <form method="GET">
            <input
              name="key"
              type="password"
              placeholder="Enter admin key"
              className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm w-64 focus:outline-none focus:border-violet-500"
              autoComplete="current-password"
            />
            <button type="submit" className="ml-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors">
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  const days = parseInt(params.days ?? "30", 10);
  const { sessions, pageviews } = await fetchStats(days);

  const totalSessions = sessions.length;
  const avgDuration = totalSessions > 0
    ? Math.round(sessions.reduce((s, r) => s + (r.session_duration_secs ?? 0), 0) / totalSessions)
    : 0;
  const avgPages = totalSessions > 0
    ? (sessions.reduce((s, r) => s + (r.page_count ?? 0), 0) / totalSessions).toFixed(1)
    : "0";
  const totalPageviews = pageviews.length;

  const bySource = groupBy(sessions, "referrer_source");
  const byDevice = groupBy(sessions, "device_type");
  const byBrowser = groupBy(sessions, "browser");
  const byPage = groupBy(pageviews, "page_path");

  const topPages = topN(byPage, 10).map(([path, views]) => ({
    path,
    views: views.length,
    avgTime: Math.round(views.reduce((s, v) => s + (v.time_spent_secs ?? 0), 0) / views.length),
  }));

  const topSources = topN(bySource, 8);
  const maxSource = topSources[0]?.[1].length ?? 1;

  const dayOptions = [7, 14, 30, 90];
  const key = params.key;

  return (
    <div className="min-h-screen text-white" style={{ background: "hsl(222 47% 6%)" }}>
      {/* header */}
      <div className="border-b border-white/8 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">AIHub Analytics</h1>
            <p className="text-xs text-white/40">Private dashboard · {totalSessions} sessions logged</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {dayOptions.map((d) => (
            <a
              key={d}
              href={`?key=${key}&days=${d}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                days === d ? "bg-violet-600 text-white" : "text-white/40 hover:text-white hover:bg-white/8"
              }`}
            >
              {d}d
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Sessions" value={totalSessions.toLocaleString()} sub={`last ${days} days`} />
          <StatCard icon={FileText} label="Page Views" value={totalPageviews.toLocaleString()} sub="total across sessions" />
          <StatCard icon={Clock} label="Avg Duration" value={fmt(avgDuration)} sub="per session" />
          <StatCard icon={MousePointer} label="Avg Pages" value={String(avgPages)} sub="per session" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* traffic sources */}
          <div className="lg:col-span-1 rounded-2xl border border-white/10 p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-violet-400" /> Traffic Sources
            </h2>
            <div className="space-y-1">
              {topSources.map(([source, rows]) => (
                <BarRow
                  key={source}
                  label={source}
                  count={rows.length}
                  max={maxSource}
                  color={SOURCE_COLORS[source] ?? "bg-violet-500"}
                />
              ))}
              {topSources.length === 0 && <p className="text-xs text-white/30 py-4 text-center">No data yet</p>}
            </div>
          </div>

          {/* top pages */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-violet-400" /> Top Pages
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="text-xs text-white/30 font-semibold pb-3">Page</th>
                  <th className="text-xs text-white/30 font-semibold pb-3 text-right">Views</th>
                  <th className="text-xs text-white/30 font-semibold pb-3 text-right">Avg time</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((p) => (
                  <tr key={p.path} className="border-t border-white/5">
                    <td className="py-2.5 text-white/80 font-mono text-xs truncate max-w-[220px]">{p.path}</td>
                    <td className="py-2.5 text-white font-semibold text-right">{p.views}</td>
                    <td className="py-2.5 text-white/50 text-right text-xs">{fmt(p.avgTime)}</td>
                  </tr>
                ))}
                {topPages.length === 0 && (
                  <tr><td colSpan={3} className="py-8 text-center text-xs text-white/30">No page view data yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* device + browser */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <h2 className="text-sm font-bold text-white mb-4">Devices</h2>
            <div className="flex gap-4 flex-wrap">
              {Object.entries(byDevice).map(([type, rows]) => (
                <div key={type} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8">
                  <DeviceIcon type={type} />
                  <span className="text-xs text-white/70 capitalize">{type}</span>
                  <span className="text-sm font-bold text-white">{rows.length}</span>
                </div>
              ))}
              {Object.keys(byDevice).length === 0 && <p className="text-xs text-white/30">No data yet</p>}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <h2 className="text-sm font-bold text-white mb-4">Browsers</h2>
            <div className="flex gap-3 flex-wrap">
              {topN(byBrowser, 6).map(([browser, rows]) => (
                <div key={browser} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8">
                  <span className="text-xs text-white/70">{browser}</span>
                  <span className="text-sm font-bold text-white">{rows.length}</span>
                </div>
              ))}
              {Object.keys(byBrowser).length === 0 && <p className="text-xs text-white/30">No data yet</p>}
            </div>
          </div>
        </div>

        {/* raw sessions table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">All Sessions</h2>
            <span className="text-xs text-white/30">{sessions.length} rows</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/8 text-left">
                  {["Date / Time","Device","OS","Browser","Source","Pages","Duration","Referrer URL"].map(h => (
                    <th key={h} className="px-4 py-3 text-white/35 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessions.slice(0, 100).map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3 text-white/60 whitespace-nowrap">
                      {new Date(s.created_at).toLocaleString("en-CH", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-white/70 capitalize">
                        <DeviceIcon type={s.device_type ?? "desktop"} />
                        {s.device_type ?? "—"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/60">{s.os ?? "—"}</td>
                    <td className="px-4 py-3 text-white/60">{s.browser ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/20 text-violet-300">
                        {s.referrer_source ?? "Direct"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white font-semibold">{s.page_count ?? 0}</td>
                    <td className="px-4 py-3 text-white/60">{s.session_duration_secs ? fmt(s.session_duration_secs) : "—"}</td>
                    <td className="px-4 py-3 text-white/40 max-w-[200px] truncate">{s.referrer_url ?? "—"}</td>
                  </tr>
                ))}
                {sessions.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-12 text-center text-white/25">No sessions recorded yet — analytics will appear once visitors consent</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {sessions.length > 100 && (
            <div className="px-5 py-3 border-t border-white/8 text-xs text-white/30">
              Showing 100 of {sessions.length} sessions. Export full dataset from your Supabase dashboard.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
