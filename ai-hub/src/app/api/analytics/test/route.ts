import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== process.env.ANALYTICS_ADMIN_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const checks: Record<string, string> = {};

  // Check env vars are present
  checks.SUPABASE_URL = process.env.SUPABASE_URL ? "✓ set" : "✗ MISSING";
  checks.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ? "✓ set" : "✗ MISSING";
  checks.ANALYTICS_ADMIN_KEY = process.env.ANALYTICS_ADMIN_KEY ? "✓ set" : "✗ MISSING";

  // Test Supabase connection — sessions table
  const { data: sessions, error: sessErr } = await supabase
    .from("analytics_sessions")
    .select("id", { count: "exact", head: true });

  checks.sessions_table = sessErr ? `✗ ${sessErr.message}` : "✓ reachable";

  // Test Supabase connection — pageviews table
  const { error: pvErr } = await supabase
    .from("analytics_pageviews")
    .select("id", { count: "exact", head: true });

  checks.pageviews_table = pvErr ? `✗ ${pvErr.message}` : "✓ reachable";

  // Test insert (then delete)
  const testId = "00000000-0000-0000-0000-000000000001";
  const { error: insertErr } = await supabase.from("analytics_sessions").upsert({
    id: testId,
    device_type: "test",
    referrer_source: "test",
  });
  checks.insert_test = insertErr ? `✗ ${insertErr.message}` : "✓ insert works";

  if (!insertErr) {
    await supabase.from("analytics_sessions").delete().eq("id", testId);
  }

  const allOk = Object.values(checks).every((v) => v.startsWith("✓"));

  return NextResponse.json({ ok: allOk, checks }, { status: allOk ? 200 : 500 });
}
