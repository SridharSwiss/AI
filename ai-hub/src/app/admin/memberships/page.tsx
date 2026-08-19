import { supabaseAdmin } from "@/lib/supabase";
import { MembershipsDashboard, type Membership } from "./memberships-dashboard";
import { AdminNav } from "@/components/admin/admin-nav";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function requireAuth(key: string | undefined) {
  return key === process.env.ANALYTICS_ADMIN_KEY;
}

export default async function MembershipsPage({
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

  let applications: Membership[] = [];
  let tableMissing = false;
  try {
    const { data, error } = await supabaseAdmin
      .from("switzerland_memberships")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    applications = (data ?? []) as Membership[];
  } catch {
    tableMissing = true;
  }

  if (tableMissing) {
    return (
      <div className="min-h-screen text-white" style={{ background: "hsl(222 47% 6%)" }}>
        <div className="border-b border-white/8 px-6 py-4">
          <h1 className="text-base font-bold">Membership Applications</h1>
        </div>
        <AdminNav active="memberships" adminKey={params.key ?? ""} />
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-200">
            The <code className="mx-1 px-1.5 py-0.5 rounded bg-black/30">switzerland_memberships</code> table
            doesn&apos;t exist yet. Run the migration
            <code className="mx-1 px-1.5 py-0.5 rounded bg-black/30">supabase/migrations/003_switzerland_memberships.sql</code>
            in Supabase → SQL Editor to enable membership applications.
          </div>
        </div>
      </div>
    );
  }

  return <MembershipsDashboard applications={applications} adminKey={params.key ?? ""} />;
}
