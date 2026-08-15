"use client";

import { useMemo, useState } from "react";
import {
  Users, UserPlus, Activity, Globe, Mail, Search, Clock, Eye, Layers,
  ChevronDown, ChevronRight, Monitor, MapPin, ArrowUpDown,
} from "lucide-react";

export type AreaCount = { area: string; views: number };
export type UserRow = {
  id: string;
  email: string;
  provider: string;
  createdAt: string;
  lastSignInAt: string | null;
  sessions: number;
  pageViews: number;
  timeSpentSecs: number;
  lastActive: string | null;
  topAreas: AreaCount[];
  devices: string[];
  countries: string[];
};
export type Summary = {
  totalUsers: number;
  newThisWeek: number;
  active30d: number;
  googleCount: number;
  emailCount: number;
  linkedSessions: number;
  totalPageViews: number;
};

type SortKey = "lastActive" | "sessions" | "timeSpent" | "created";

function fmtTime(secs: number) {
  if (!secs) return "0s";
  if (secs < 60) return `${secs}s`;
  const m = Math.floor(secs / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}
function fmtDate(s: string | null) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
function fmtDateTime(s: string | null) {
  if (!s) return "—";
  return new Date(s).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function Stat({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-violet-400" />
        <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </div>
  );
}

export function UsersDashboard({
  users,
  summary,
  migrationReady,
}: {
  users: UserRow[];
  summary: Summary;
  migrationReady: boolean;
}) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("lastActive");
  const [expanded, setExpanded] = useState<string | null>(null);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = users;
    if (term) {
      list = users.filter(
        (u) => u.email.toLowerCase().includes(term) || u.id.toLowerCase().includes(term)
      );
    }
    const sorted = [...list].sort((a, b) => {
      switch (sort) {
        case "sessions": return b.sessions - a.sessions;
        case "timeSpent": return b.timeSpentSecs - a.timeSpentSecs;
        case "created": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "lastActive":
        default:
          return new Date(b.lastActive ?? b.lastSignInAt ?? 0).getTime() - new Date(a.lastActive ?? a.lastSignInAt ?? 0).getTime();
      }
    });
    return sorted;
  }, [users, q, sort]);

  const maxAreaViews = Math.max(1, ...users.flatMap((u) => u.topAreas.map((a) => a.views)));

  return (
    <div className="min-h-screen text-white" style={{ background: "hsl(222 47% 6%)" }}>
      {/* header */}
      <div className="border-b border-white/8 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold">User Analytics</h1>
            <p className="text-xs text-white/40">{summary.totalUsers} registered users</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <AdminLink label="Site Analytics" href="analytics" />
          <AdminLink label="GDPR" href="gdpr" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {!migrationReady && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
            Per-user session data isn&apos;t available yet. Run the migration
            <code className="mx-1 px-1.5 py-0.5 rounded bg-black/30 text-amber-100">supabase/migrations/002_user_linked_analytics.sql</code>
            in Supabase → SQL Editor to enable sessions, accessed areas, and time spent per user.
          </div>
        )}

        {/* summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={Users} label="Total Users" value={summary.totalUsers.toLocaleString()} />
          <Stat icon={UserPlus} label="New This Week" value={summary.newThisWeek.toLocaleString()} sub="last 7 days" />
          <Stat icon={Activity} label="Active" value={summary.active30d.toLocaleString()} sub="signed in last 30 days" />
          <Stat icon={Globe} label="Google / Email" value={`${summary.googleCount} / ${summary.emailCount}`} sub="sign-in method" />
        </div>

        {/* controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by email or user ID…"
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-white/15 bg-white/5 text-sm focus:outline-none focus:border-violet-500"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-white/40" />
            {([
              ["lastActive", "Last active"],
              ["sessions", "Sessions"],
              ["timeSpent", "Time spent"],
              ["created", "Newest"],
            ] as [SortKey, string][]).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setSort(k)}
                className={`px-3 h-8 rounded-lg text-xs font-semibold transition-colors ${
                  sort === k ? "bg-violet-600 text-white" : "text-white/40 hover:text-white hover:bg-white/8"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="grid grid-cols-12 gap-2 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/40 border-b border-white/8">
            <div className="col-span-4">User</div>
            <div className="col-span-2 text-center">Sessions</div>
            <div className="col-span-2 text-center">Page views</div>
            <div className="col-span-2 text-center">Time spent</div>
            <div className="col-span-2 text-right">Last active</div>
          </div>

          {rows.length === 0 && (
            <div className="px-5 py-10 text-center text-white/30 text-sm">No users match your search.</div>
          )}

          {rows.map((u) => {
            const open = expanded === u.id;
            return (
              <div key={u.id} className="border-b border-white/5 last:border-0">
                <button
                  onClick={() => setExpanded(open ? null : u.id)}
                  className="w-full grid grid-cols-12 gap-2 px-5 py-3.5 items-center hover:bg-white/[0.03] transition-colors text-left"
                >
                  <div className="col-span-4 flex items-center gap-3 min-w-0">
                    {open ? <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-white/40 flex-shrink-0" />}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {u.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{u.email}</div>
                      <div className="text-[11px] text-white/35 flex items-center gap-1.5">
                        {u.provider === "google" ? <Globe className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                        {u.provider}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-sm font-semibold">{u.sessions}</div>
                  <div className="col-span-2 text-center text-sm">{u.pageViews}</div>
                  <div className="col-span-2 text-center text-sm">{fmtTime(u.timeSpentSecs)}</div>
                  <div className="col-span-2 text-right text-xs text-white/50">{fmtDateTime(u.lastActive ?? u.lastSignInAt)}</div>
                </button>

                {open && (
                  <div className="px-5 pb-5 pt-1 grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* accessed areas */}
                    <div className="lg:col-span-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-2 flex items-center gap-1.5">
                        <Layers className="w-3 h-3" /> Accessed areas
                      </p>
                      {u.topAreas.length === 0 && <p className="text-xs text-white/30">No page views recorded.</p>}
                      <div className="space-y-1.5">
                        {u.topAreas.map((a) => (
                          <div key={a.area} className="flex items-center gap-3">
                            <span className="text-xs text-white/70 w-36 truncate">{a.area}</span>
                            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-violet-500 to-pink-500" style={{ width: `${(a.views / maxAreaViews) * 100}%` }} />
                            </div>
                            <span className="text-xs text-white/40 w-8 text-right">{a.views}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* meta */}
                    <div className="space-y-3 text-xs">
                      <Meta icon={Clock} label="Joined" value={fmtDate(u.createdAt)} />
                      <Meta icon={Activity} label="Last sign-in" value={fmtDateTime(u.lastSignInAt)} />
                      <Meta icon={Eye} label="Total page views" value={String(u.pageViews)} />
                      <Meta icon={Monitor} label="Devices" value={u.devices.join(", ") || "—"} />
                      <Meta icon={MapPin} label="Locations" value={u.countries.join(", ") || "—"} />
                      <div className="pt-1 text-[10px] text-white/25 font-mono break-all">{u.id}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Meta({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/40 flex items-center gap-1.5"><Icon className="w-3 h-3" />{label}</span>
      <span className="text-white/80 text-right">{value}</span>
    </div>
  );
}

function AdminLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={`/admin/${href}${typeof window !== "undefined" ? window.location.search : ""}`}
      className="px-3 h-8 inline-flex items-center rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-colors"
    >
      {label}
    </a>
  );
}
