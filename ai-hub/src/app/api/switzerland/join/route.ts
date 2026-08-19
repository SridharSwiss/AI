import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createClient } from "@/lib/auth/server";
import { screenMembership } from "@/lib/agent/membership-screen";

export const dynamic = "force-dynamic";

const CATEGORIES = ["Researcher", "Technology Expert", "Entrepreneur", "Policymaker", "Student", "Other"];

/** GET — return the signed-in user's existing application status (if any). */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ application: null });

  const { data, error } = await supabaseAdmin
    .from("switzerland_memberships")
    .select("status, created_at, membership_category")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) return NextResponse.json({ application: null });
  return NextResponse.json({ application: data ?? null });
}

/** POST — submit a membership application (pending approval). */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot
  if (body.website_hp) return NextResponse.json({ ok: true });

  const full_name = String(body.full_name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const consent = body.consent === true;

  if (!full_name || !email.includes("@")) {
    return NextResponse.json({ error: "Full name and a valid email are required." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: "Please accept the privacy terms to apply." }, { status: 400 });
  }

  const category = String(body.membership_category ?? "");
  const application = {
    full_name,
    email,
    organization: String(body.organization ?? "").trim() || null,
    job_title: String(body.job_title ?? "").trim() || null,
    membership_category: CATEGORIES.includes(category) ? category : "Other",
    seniority: String(body.seniority ?? "").trim() || null,
    country: String(body.country ?? "").trim() || null,
    city: String(body.city ?? "").trim() || null,
    linkedin_url: String(body.linkedin_url ?? "").trim() || null,
    website: String(body.website ?? "").trim() || null,
    areas_of_interest: Array.isArray(body.areas_of_interest)
      ? (body.areas_of_interest as unknown[]).map(String).slice(0, 12)
      : [],
    bio: String(body.bio ?? "").trim() || null,
    consent: true,
    status: "pending" as const,
  };

  // Link to the signed-in user, if any
  let user_id: string | null = null;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    user_id = user?.id ?? null;
  } catch { /* anonymous application allowed */ }

  // Agentic screening
  const screen = screenMembership({
    ...application,
    areas_of_interest: application.areas_of_interest,
  });

  const row = {
    ...application,
    user_id,
    ai_recommendation: screen.recommendation,
    ai_score: screen.score,
    review_notes: screen.reasons.length ? `Agent: ${screen.reasons.join("; ")}` : null,
  };

  const { error } = await supabaseAdmin.from("switzerland_memberships").insert(row);

  if (error) {
    // Duplicate application for the same user
    if (/duplicate key|unique/i.test(error.message)) {
      return NextResponse.json({ error: "You have already applied. Your application is under review." }, { status: 409 });
    }
    if (/relation .*switzerland_memberships.* does not exist|could not find the table/i.test(error.message)) {
      return NextResponse.json({ error: "Membership applications are not available yet — setup in progress." }, { status: 503 });
    }
    console.error("[switzerland/join]", error.message);
    return NextResponse.json({ error: "Could not submit your application. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, recommendation: screen.recommendation });
}
