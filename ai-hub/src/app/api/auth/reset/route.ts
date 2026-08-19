import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendEmail, emailShell, escapeHtml } from "@/lib/email";

export const dynamic = "force-dynamic";

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

/**
 * Password reset: emails a one-click recovery link (via our verified domain)
 * that lands on /auth/set-password. Always returns ok — never reveals whether
 * an account exists.
 */
export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  const email = (body.email ?? "").trim();
  if (!email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  try {
    const user = await findUserByEmail(email);
    if (user) {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: "recovery",
        email,
        options: { redirectTo: "https://ai-hub.host/auth/set-password" },
      });
      const link = error ? null : (data?.properties?.action_link as string) ?? null;
      if (link) {
        await sendEmail({
          to: email,
          subject: "Reset your AIHub password",
          html: emailShell(
            "Reset your password",
            `<p>Hi,</p>
             <p>We received a request to reset the password for <b>${escapeHtml(email)}</b>.</p>
             <p style="margin:16px 0"><a href="${link}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:600">Set a new password</a></p>
             <p style="font-size:12px;color:#666">If you didn't request this, you can safely ignore this email. The link expires for your security.</p>`
          ),
          text: `Reset your AIHub password for ${email}:\n${link}\n\nIf you didn't request this, ignore this email.`,
        });
      }
    }
  } catch (e) {
    console.error("[auth/reset]", e);
    // Still return ok to avoid leaking account existence.
  }

  return NextResponse.json({ ok: true });
}
