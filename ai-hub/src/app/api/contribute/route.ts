import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TO_EMAIL = "info@ai-hub.host";
// Verify your domain in Resend, then set CONTRIBUTE_FROM_EMAIL=noreply@ai-hub.host.
// Falls back to Resend's shared onboarding sender for initial testing.
const FROM_EMAIL = process.env.CONTRIBUTE_FROM_EMAIL || "AIHub Contribute <onboarding@resend.dev>";

const TYPE_LABELS: Record<string, string> = {
  tool: "AI Tool",
  company: "AI Company",
  "case-study": "Case Study",
  compliance: "Compliance Framework",
  learning: "Learning Resource",
  research: "Research Document",
  feedback: "General Feedback / Bug Report",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  let body: {
    type?: string;
    name?: string;
    email?: string;
    affiliated?: boolean;
    fields?: Record<string, string>;
    website?: string; // honeypot
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; humans never see it.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const { type, name, email, affiliated, fields } = body;

  if (!type || !TYPE_LABELS[type]) {
    return NextResponse.json({ error: "Please choose a submission type." }, { status: 400 });
  }
  if (!name || !email || !email.includes("@")) {
    return NextResponse.json({ error: "Your name and a valid email are required." }, { status: 400 });
  }
  if (!fields || Object.values(fields).every((v) => !v?.trim())) {
    return NextResponse.json({ error: "Please fill in the submission details." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Submissions are not available yet — email delivery is being configured." },
      { status: 503 }
    );
  }

  const label = TYPE_LABELS[type];
  const headline = fields.name || fields.title || fields.company || "New submission";

  const fieldRows = Object.entries(fields)
    .filter(([, v]) => v?.trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top;color:#6d28d9;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 12px;color:#111">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  const textBody = [
    `New AIHub contribution: ${label}`,
    ``,
    `From: ${name} <${email}>`,
    `Affiliated/works for this: ${affiliated ? "Yes" : "No"}`,
    ``,
    ...Object.entries(fields)
      .filter(([, v]) => v?.trim())
      .map(([k, v]) => `${k}: ${v}`),
  ].join("\n");

  const htmlBody = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:20px 24px;border-radius:12px 12px 0 0">
        <h2 style="margin:0;color:#fff;font-size:18px">New Contribution: ${escapeHtml(label)}</h2>
        <p style="margin:4px 0 0;color:#f3e8ff;font-size:13px">${escapeHtml(headline)}</p>
      </div>
      <div style="border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;padding:16px 12px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">${fieldRows}</table>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
        <p style="font-size:13px;color:#444;margin:0">
          <b>Submitted by:</b> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;<br>
          <b>Affiliated / works for this:</b> ${affiliated ? "Yes" : "No"}
        </p>
      </div>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `[AIHub] ${label}: ${headline}`,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contribute] Resend error", res.status, detail);
      return NextResponse.json({ error: "Could not send your submission. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contribute] exception", e);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
