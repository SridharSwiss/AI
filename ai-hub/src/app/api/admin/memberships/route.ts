import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { sendEmail, emailShell, escapeHtml } from "@/lib/email";

export const dynamic = "force-dynamic";

function authed(key: string | null | undefined) {
  return key === process.env.ANALYTICS_ADMIN_KEY;
}

/** Find an auth user by email (paginated admin lookup). */
async function findUserByEmail(email: string) {
  const target = email.trim().toLowerCase();
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(error.message);
    const match = data.users.find((u) => (u.email ?? "").toLowerCase() === target);
    if (match) return match;
    if (data.users.length < 200) break;
  }
  return null;
}

/** Readable strong temporary password. */
function genPassword() {
  return "AIH-" + randomBytes(9).toString("base64url");
}

/**
 * Provision (or link) an auth account for an approved member.
 * - No account yet  → create one with a generated password (no duplicate sign-up)
 * - Already signed up → reuse it (no duplicate)
 * Returns whether a new account was created and the temp password if so.
 */
async function provisionAccount(email: string, full_name: string) {
  const existing = await findUserByEmail(email);
  if (existing) return { userId: existing.id, created: false, password: null as string | null };

  const password = genPassword();
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, aihub_switzerland_member: true },
  });
  if (error || !data.user) throw new Error(error?.message ?? "createUser failed");
  return { userId: data.user.id, created: true, password };
}

/** PATCH — approve/reject a membership application. */
export async function PATCH(req: NextRequest) {
  let body: { key?: string; id?: string; status?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  if (!authed(body.key)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id, status, notes } = body;
  if (!id || !status || !["approved", "rejected", "pending"].includes(status)) {
    return NextResponse.json({ error: "id and valid status required" }, { status: 400 });
  }

  // Load the application first (need email/name for provisioning + email).
  const { data: app, error: loadErr } = await supabaseAdmin
    .from("switzerland_memberships")
    .select("id, full_name, email, user_id")
    .eq("id", id)
    .maybeSingle();
  if (loadErr || !app) {
    return NextResponse.json({ error: "application not found" }, { status: 404 });
  }

  let provisioned: { created: boolean; password: string | null; userId: string | null } = {
    created: false, password: null, userId: app.user_id ?? null,
  };

  // On approval, ensure the member has an account (no duplicate sign-up).
  if (status === "approved") {
    try {
      const r = await provisionAccount(app.email, app.full_name ?? "");
      provisioned = { created: r.created, password: r.password, userId: r.userId };
    } catch (e) {
      console.error("[memberships approve] provisioning failed", e);
      return NextResponse.json(
        { error: "Could not provision the member account. Check the service role key and try again." },
        { status: 500 }
      );
    }
  }

  const { error: updErr } = await supabaseAdmin
    .from("switzerland_memberships")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      ...(provisioned.userId ? { user_id: provisioned.userId } : {}),
      ...(notes !== undefined ? { review_notes: notes } : {}),
    })
    .eq("id", id);
  if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

  // Decision emails (best-effort).
  const first = (app.full_name ?? "there").split(" ")[0];
  if (status === "approved") {
    const credentialsBlock = provisioned.created && provisioned.password
      ? `<div style="margin:16px 0;padding:14px 16px;background:#fdf2f8;border:1px solid #fbcfe8;border-radius:10px">
           <p style="margin:0 0 6px"><b>Your login credentials</b></p>
           <p style="margin:0">Email: <b>${escapeHtml(app.email)}</b><br>Temporary password: <b>${escapeHtml(provisioned.password)}</b></p>
           <p style="margin:8px 0 0;font-size:12px;color:#9d174d">Please sign in and change your password. You can also sign in with Google using this email.</p>
         </div>`
      : `<p>You can access the members area using your existing account (<b>${escapeHtml(app.email)}</b>).</p>`;

    await sendEmail({
      to: app.email,
      subject: "Welcome to AI Hub Switzerland — membership approved",
      html: emailShell(
        "Membership approved",
        `<p>Hi ${escapeHtml(first)},</p>
         <p>Your application to <b>AI Hub Switzerland</b> has been <b style="color:#059669">approved</b>. Welcome to the network!</p>
         ${credentialsBlock}
         <p><a href="https://ai-hub.host/login?redirect=/switzerland/network" style="color:#e11d48">Sign in to the members area →</a></p>
         <p style="color:#666">— The AI Hub Switzerland Team</p>`
      ),
      text:
        `Hi ${first},\n\nYour application to AI Hub Switzerland has been approved. Welcome!\n\n` +
        (provisioned.created && provisioned.password
          ? `Login email: ${app.email}\nTemporary password: ${provisioned.password}\n(Please change it after signing in.)\n\n`
          : `Sign in with your existing account (${app.email}).\n\n`) +
        `Members area: https://ai-hub.host/login?redirect=/switzerland/network\n\n— The AI Hub Switzerland Team`,
    });
  } else if (status === "rejected") {
    await sendEmail({
      to: app.email,
      subject: "Your AI Hub Switzerland application",
      html: emailShell(
        "Application update",
        `<p>Hi ${escapeHtml(first)},</p>
         <p>Thank you for your interest in <b>AI Hub Switzerland</b>. After review, we are not able to approve your membership at this time.</p>
         <p>You are welcome to re-apply as the community grows.</p>
         <p style="color:#666">— The AI Hub Switzerland Team</p>`
      ),
      text: `Hi ${first},\n\nThank you for your interest in AI Hub Switzerland. After review, we are not able to approve your membership at this time.\n\n— The AI Hub Switzerland Team`,
    });
  }

  return NextResponse.json({ ok: true, provisioned: provisioned.created });
}
