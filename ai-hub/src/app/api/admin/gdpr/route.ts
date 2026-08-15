import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * GDPR data-subject tooling (admin only). Supports:
 *  - action "lookup": report what personal data exists for an email
 *  - action "delete": erase the auth user (right to erasure, GDPR Art. 17)
 *
 * Protected by ANALYTICS_ADMIN_KEY. Uses the Supabase service-role client.
 */

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

/** Find an auth user by email by paging through the admin user list. */
async function findUserByEmail(email: string) {
  const target = email.trim().toLowerCase();
  const perPage = 200;
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
    if (error) throw new Error(error.message);
    const match = data.users.find((u) => (u.email ?? "").toLowerCase() === target);
    if (match) return match;
    if (data.users.length < perPage) break; // last page
  }
  return null;
}

export async function POST(req: NextRequest) {
  let body: { key?: string; email?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const { key, email, action } = body;

  if (key !== process.env.ANALYTICS_ADMIN_KEY) return unauthorized();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "valid email required" }, { status: 400 });
  }

  try {
    const user = await findUserByEmail(email);

    if (action === "lookup") {
      if (!user) {
        return NextResponse.json({ found: false, email });
      }
      return NextResponse.json({
        found: true,
        email: user.email,
        userId: user.id,
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at ?? null,
        provider: user.app_metadata?.provider ?? "email",
      });
    }

    if (action === "delete") {
      if (!user) {
        return NextResponse.json({ deleted: false, found: false, email });
      }
      const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({
        deleted: true,
        email: user.email,
        userId: user.id,
        message: "Auth account and associated identity data permanently erased.",
      });
    }

    return NextResponse.json({ error: "unknown action" }, { status: 400 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
