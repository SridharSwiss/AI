import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TO_EMAIL = "info@ai-hub.host";
const FROM_EMAIL = process.env.CONTRIBUTE_FROM_EMAIL || "AIHub Contribute <onboarding@resend.dev>";

/**
 * Diagnostic for contribute email delivery. Admin-key gated.
 * GET /api/contribute/test?key=ADMIN_KEY[&send=1]
 *  - reports env configuration
 *  - with &send=1, sends a real test email and returns Resend's raw response
 */
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== process.env.ANALYTICS_ADMIN_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const checks: Record<string, string> = {
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "✓ set" : "✗ MISSING",
    CONTRIBUTE_FROM_EMAIL: process.env.CONTRIBUTE_FROM_EMAIL
      ? process.env.CONTRIBUTE_FROM_EMAIL
      : "✗ not set (using onboarding@resend.dev — only delivers to your Resend signup email)",
    to: TO_EMAIL,
    from: FROM_EMAIL,
  };

  const shouldSend = req.nextUrl.searchParams.get("send") === "1";
  if (!shouldSend) {
    return NextResponse.json({ ok: true, checks, hint: "Append &send=1 to send a real test email." });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: false, checks, error: "RESEND_API_KEY missing" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: "AIHub contribute — delivery test",
      text: "This is a delivery test from the AIHub contribute form. If you received this, email delivery works.",
    }),
  });

  const bodyText = await res.text();
  let resendBody: unknown = bodyText;
  try { resendBody = JSON.parse(bodyText); } catch { /* keep as text */ }

  return NextResponse.json({
    ok: res.ok,
    checks,
    resendStatus: res.status,
    resendBody,
    interpretation: res.ok
      ? "Resend accepted the email. If it did not arrive, check spam, then verify the ai-hub.host domain in Resend and set CONTRIBUTE_FROM_EMAIL to an address on that domain."
      : "Resend rejected the request — see resendBody for the exact reason (commonly: domain not verified, or test mode only allows your own signup email).",
  });
}
