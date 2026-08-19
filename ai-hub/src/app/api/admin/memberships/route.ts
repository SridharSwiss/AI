import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendEmail, emailShell, escapeHtml } from "@/lib/email";

export const dynamic = "force-dynamic";

function authed(key: string | null | undefined) {
  return key === process.env.ANALYTICS_ADMIN_KEY;
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

  const { data, error } = await supabaseAdmin
    .from("switzerland_memberships")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      ...(notes !== undefined ? { review_notes: notes } : {}),
    })
    .eq("id", id)
    .select("full_name, email")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Mandatory decision email to the applicant (best-effort).
  if (data?.email && (status === "approved" || status === "rejected")) {
    const first = (data.full_name ?? "there").split(" ")[0];
    if (status === "approved") {
      await sendEmail({
        to: data.email,
        subject: "Welcome to AI Hub Switzerland — membership approved",
        html: emailShell(
          "Membership approved",
          `<p>Hi ${escapeHtml(first)},</p>
           <p>Great news — your application to <b>AI Hub Switzerland</b> has been <b style="color:#059669">approved</b>. Welcome to the network!</p>
           <p>You now have member access to working groups, events, and the community. Sign in any time at
           <a href="https://ai-hub.host/switzerland" style="color:#e11d48">ai-hub.host/switzerland</a>.</p>
           <p>We look forward to building responsible AI together.</p>
           <p style="color:#666">— The AI Hub Switzerland Team</p>`
        ),
        text: `Hi ${first},\n\nYour application to AI Hub Switzerland has been approved. Welcome to the network!\n\nAccess members area: https://ai-hub.host/switzerland\n\n— The AI Hub Switzerland Team`,
      });
    } else {
      await sendEmail({
        to: data.email,
        subject: "Your AI Hub Switzerland application",
        html: emailShell(
          "Application update",
          `<p>Hi ${escapeHtml(first)},</p>
           <p>Thank you for your interest in <b>AI Hub Switzerland</b>. After review, we are not able to approve your membership at this time.</p>
           <p>We appreciate your engagement and welcome you to re-apply in the future as the community grows.</p>
           <p style="color:#666">— The AI Hub Switzerland Team</p>`
        ),
        text: `Hi ${first},\n\nThank you for your interest in AI Hub Switzerland. After review, we are not able to approve your membership at this time. You are welcome to re-apply in the future.\n\n— The AI Hub Switzerland Team`,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
