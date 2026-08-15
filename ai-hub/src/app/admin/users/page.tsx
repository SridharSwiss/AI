import { supabaseAdmin } from "@/lib/supabase";
import { UsersDashboard, type UserRow, type Summary } from "./users-dashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function requireAuth(key: string | undefined) {
  return key === process.env.ANALYTICS_ADMIN_KEY;
}

/** Map a page path to a human-readable site area. */
function areaFromPath(path: string): string {
  if (!path || path === "/") return "Home";
  const seg = path.split("/").filter(Boolean)[0] ?? "";
  const map: Record<string, string> = {
    tools: "Tools", companies: "Companies", "case-studies": "Case Studies",
    compliance: "Compliance", learn: "Learn", news: "News",
    "consulting-toolkit": "Consulting Toolkit", compare: "Compare", search: "Search",
    about: "About", team: "Our Team", switzerland: "AI Hub Switzerland",
    contribute: "Contribute", "resource-library": "Resource Library",
    login: "Login", privacy: "Privacy",
  };
  return map[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1);
}

type AuthUser = {
  id: string;
  email: string;
  provider: string;
  createdAt: string;
  lastSignInAt: string | null;
};

async function listAllUsers(): Promise<AuthUser[]> {
  const out: AuthUser[] = [];
  const perPage = 200;
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
    if (error) throw new Error(error.message);
    for (const u of data.users) {
      out.push({
        id: u.id,
        email: u.email ?? "(no email)",
        provider: (u.app_metadata?.provider as string) ?? "email",
        createdAt: u.created_at,
        lastSignInAt: u.last_sign_in_at ?? null,
      });
    }
    if (data.users.length < perPage) break;
  }
  return out;
}

type SessionRow = {
  id: string;
  user_id: string | null;
  session_duration_secs: number | null;
  device_type: string | null;
  country: string | null;
  created_at: string;
  last_seen_at: string | null;
};

export default async function AdminUsersPage({
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
            <input
              name="key" type="password" placeholder="Enter admin key"
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

  const authUsers = await listAllUsers();

  // Fetch user-linked sessions; if the migration hasn't run, this errors — degrade gracefully.
  let sessions: SessionRow[] = [];
  let migrationReady = true;
  try {
    const { data, error } = await supabaseAdmin
      .from("analytics_sessions")
      .select("id, user_id, session_duration_secs, device_type, country, created_at, last_seen_at")
      .not("user_id", "is", null);
    if (error) throw error;
    sessions = (data ?? []) as SessionRow[];
  } catch {
    migrationReady = false;
  }

  // Pageviews for the linked sessions (for accessed-areas + page-view counts).
  const sessionIds = sessions.map((s) => s.id);
  let pageviews: { session_id: string; page_path: string }[] = [];
  if (sessionIds.length > 0) {
    const chunkSize = 300;
    for (let i = 0; i < sessionIds.length; i += chunkSize) {
      const chunk = sessionIds.slice(i, i + chunkSize);
      const { data } = await supabaseAdmin
        .from("analytics_pageviews")
        .select("session_id, page_path")
        .in("session_id", chunk);
      if (data) pageviews.push(...data);
    }
  }

  // Index analytics by user.
  const sessionsByUser = new Map<string, SessionRow[]>();
  for (const s of sessions) {
    if (!s.user_id) continue;
    (sessionsByUser.get(s.user_id) ?? sessionsByUser.set(s.user_id, []).get(s.user_id)!).push(s);
  }
  const sessionToUser = new Map<string, string>();
  for (const s of sessions) if (s.user_id) sessionToUser.set(s.id, s.user_id);

  const areasByUser = new Map<string, Map<string, number>>();
  const pageViewsByUser = new Map<string, number>();
  for (const pv of pageviews) {
    const userId = sessionToUser.get(pv.session_id);
    if (!userId) continue;
    pageViewsByUser.set(userId, (pageViewsByUser.get(userId) ?? 0) + 1);
    const area = areaFromPath(pv.page_path);
    const m = areasByUser.get(userId) ?? new Map<string, number>();
    m.set(area, (m.get(area) ?? 0) + 1);
    areasByUser.set(userId, m);
  }

  const rows: UserRow[] = authUsers.map((u) => {
    const us = sessionsByUser.get(u.id) ?? [];
    const timeSpent = us.reduce((sum, s) => sum + (s.session_duration_secs ?? 0), 0);
    const lastActive = us.reduce<string | null>((max, s) => {
      const t = s.last_seen_at ?? s.created_at;
      return !max || new Date(t) > new Date(max) ? t : max;
    }, null);
    const areaMap = areasByUser.get(u.id) ?? new Map<string, number>();
    const topAreas = [...areaMap.entries()]
      .map(([area, views]) => ({ area, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);
    const devices = [...new Set(us.map((s) => s.device_type).filter(Boolean))] as string[];
    const countries = [...new Set(us.map((s) => s.country).filter(Boolean))].slice(0, 5) as string[];

    return {
      id: u.id,
      email: u.email,
      provider: u.provider,
      createdAt: u.createdAt,
      lastSignInAt: u.lastSignInAt,
      sessions: us.length,
      pageViews: pageViewsByUser.get(u.id) ?? 0,
      timeSpentSecs: timeSpent,
      lastActive,
      topAreas,
      devices,
      countries,
    };
  });

  const weekAgo = Date.now() - 7 * 86400_000;
  const monthAgo = Date.now() - 30 * 86400_000;
  const summary: Summary = {
    totalUsers: authUsers.length,
    newThisWeek: authUsers.filter((u) => new Date(u.createdAt).getTime() > weekAgo).length,
    active30d: authUsers.filter((u) => u.lastSignInAt && new Date(u.lastSignInAt).getTime() > monthAgo).length,
    googleCount: authUsers.filter((u) => u.provider === "google").length,
    emailCount: authUsers.filter((u) => u.provider === "email").length,
    linkedSessions: sessions.length,
    totalPageViews: pageviews.length,
  };

  return <UsersDashboard users={rows} summary={summary} migrationReady={migrationReady} />;
}
