import "server-only";
import { supabaseAdmin } from "@/lib/supabase";
import { tools } from "@/data/tools";
import { companies } from "@/data/companies";
import { caseStudies } from "@/data/case-studies";
import { complianceFrameworks } from "@/data/compliance";
import { learnResources } from "@/data/learn";
import { newsSources } from "@/data/news-sources";
import updates from "@/data/daily-updates.json";

export type CheckStatus = "ok" | "warn" | "error";
export type Check = {
  id: string;
  category: string;
  title: string;
  status: CheckStatus;
  detail: string;
  action?: string;
};

function findDuplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) dupes.add(id);
    seen.add(id);
  }
  return [...dupes];
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor(Math.abs(a.getTime() - b.getTime()) / 86_400_000);
}

/** Runs the full battery of rule-based site-management checks. */
export async function runHealthChecks(): Promise<{
  checks: Check[];
  counts: Record<string, number>;
  score: number;
}> {
  const checks: Check[] = [];

  const datasets: [string, { id: string }[]][] = [
    ["Tools", tools],
    ["Companies", companies],
    ["Case Studies", caseStudies],
    ["Compliance", complianceFrameworks],
    ["Learn", learnResources],
    ["News", newsSources],
  ];

  const counts: Record<string, number> = {};
  for (const [name, arr] of datasets) counts[name] = arr.length;

  // 1. Data integrity — duplicate IDs
  for (const [name, arr] of datasets) {
    const dupes = findDuplicates(arr.map((x) => x.id));
    checks.push(
      dupes.length === 0
        ? { id: `dup-${name}`, category: "Data Integrity", title: `${name}: no duplicate IDs`, status: "ok", detail: `${arr.length} unique entries.` }
        : { id: `dup-${name}`, category: "Data Integrity", title: `${name}: duplicate IDs found`, status: "error", detail: `Duplicates: ${dupes.join(", ")}`, action: `Remove the duplicate ${name} entries so counts and pages stay correct.` }
    );
  }

  // 2. Content freshness — daily-updates.json date
  const today = new Date();
  const updateDate = new Date(updates.date + "T00:00:00Z");
  const staleDays = daysBetween(today, updateDate);
  checks.push(
    staleDays <= 1
      ? { id: "freshness", category: "Content", title: "Daily updates are current", status: "ok", detail: `Last update: ${updates.date}.` }
      : staleDays <= 3
        ? { id: "freshness", category: "Content", title: "Daily updates slightly behind", status: "warn", detail: `Last update ${updates.date} (${staleDays} days ago).`, action: "Run the daily maintenance routine to refresh content and the what's-new banner." }
        : { id: "freshness", category: "Content", title: "Daily updates are stale", status: "error", detail: `Last update ${updates.date} (${staleDays} days ago).`, action: "The daily routine may have stopped. Run it and check the GitHub Actions workflow." }
  );

  // 3. Auth configuration (gating active)
  const authConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  checks.push(
    authConfigured
      ? { id: "auth", category: "Access Control", title: "Authentication configured", status: "ok", detail: "Sign-in and gated sections are active." }
      : { id: "auth", category: "Access Control", title: "Authentication not configured", status: "error", detail: "NEXT_PUBLIC_SUPABASE_URL / ANON_KEY missing.", action: "Add the NEXT_PUBLIC_ Supabase env vars in Vercel and redeploy — gating and login are inactive without them." }
  );

  // 4. Contribute email delivery
  const hasResend = !!process.env.RESEND_API_KEY;
  const hasFrom = !!process.env.CONTRIBUTE_FROM_EMAIL;
  checks.push(
    !hasResend
      ? { id: "email", category: "Contribute", title: "Email delivery not configured", status: "warn", detail: "RESEND_API_KEY is not set.", action: "Add RESEND_API_KEY in Vercel to enable contribute-form emails, or switch submissions to database storage." }
      : !hasFrom
        ? { id: "email", category: "Contribute", title: "Sender domain likely unverified", status: "warn", detail: "Using onboarding@resend.dev (test sender) — only delivers to your Resend account email.", action: "Verify ai-hub.host in Resend and set CONTRIBUTE_FROM_EMAIL to noreply@ai-hub.host, then redeploy." }
        : { id: "email", category: "Contribute", title: "Email delivery configured", status: "ok", detail: `Sending from ${process.env.CONTRIBUTE_FROM_EMAIL}.` }
  );

  // 5. SEO config
  checks.push({
    id: "seo-verify",
    category: "SEO",
    title: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? "Google verification present" : "Google verification via DNS",
    status: "ok",
    detail: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? "Search Console meta verification is set."
      : "No meta token set — verify via DNS in Search Console (recommended).",
  });

  // 6–8. Live Supabase signals (analytics tracking + users)
  try {
    const since = new Date(Date.now() - 24 * 3600_000).toISOString();
    const [{ count: sess24 }, { count: totalSess }] = await Promise.all([
      supabaseAdmin.from("analytics_sessions").select("id", { count: "exact", head: true }).gte("created_at", since),
      supabaseAdmin.from("analytics_sessions").select("id", { count: "exact", head: true }),
    ]);

    checks.push(
      (sess24 ?? 0) > 0
        ? { id: "tracking", category: "Analytics", title: "Analytics tracking is live", status: "ok", detail: `${sess24} sessions in the last 24h (${totalSess ?? 0} total).` }
        : { id: "tracking", category: "Analytics", title: "No sessions in last 24h", status: "warn", detail: `0 sessions in 24h (${totalSess ?? 0} total). Could be low traffic or a tracking issue.`, action: "Verify the analytics tracker and cookie consent are working on the live site." }
    );

    try {
      let userCount = 0;
      const { data } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
      // total is not returned directly; approximate via aud listing fallback
      userCount = (data as { total?: number }).total ?? data.users.length;
      checks.push({ id: "users", category: "Users", title: "User accounts", status: "ok", detail: `${userCount === 1 && data.users.length === 1 ? "at least 1" : userCount} registered user(s).` });
    } catch {
      /* non-fatal */
    }
  } catch {
    checks.push({ id: "supabase", category: "Analytics", title: "Could not reach analytics store", status: "warn", detail: "Supabase query failed.", action: "Check SUPABASE_SERVICE_ROLE_KEY and that the analytics tables exist." });
  }

  const okCount = checks.filter((c) => c.status === "ok").length;
  const score = Math.round((okCount / checks.length) * 100);

  return { checks, counts, score };
}
