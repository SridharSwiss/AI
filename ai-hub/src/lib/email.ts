import "server-only";

/** Normalize a "Name <email>" from-address; repair a missing closing bracket. */
export function normalizeFrom(raw?: string): string {
  const v = (raw || "").trim();
  if (!v) return "AIHub <onboarding@resend.dev>";
  if (v.includes("<") && !v.includes(">")) return `${v}>`;
  return v;
}

const DEFAULT_FROM = normalizeFrom(process.env.CONTRIBUTE_FROM_EMAIL);
export const ADMIN_EMAIL = "info@ai-hub.host";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sends an email via the Resend REST API. Returns { ok, error }.
 * Never throws — callers can fire-and-forget without breaking their request.
 */
export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  from?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY not configured" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: opts.from ?? DEFAULT_FROM,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("[email] Resend error", res.status, detail);
      return { ok: false, error: `Resend ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    console.error("[email] exception", e);
    return { ok: false, error: "network" };
  }
}

/** Minimal branded HTML shell. */
export function emailShell(heading: string, bodyHtml: string): string {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto">
    <div style="background:linear-gradient(135deg,#e11d48,#db2777);padding:20px 24px;border-radius:12px 12px 0 0">
      <h2 style="margin:0;color:#fff;font-size:18px">${escapeHtml(heading)}</h2>
      <p style="margin:4px 0 0;color:#fce7f3;font-size:12px">AI Hub Switzerland</p>
    </div>
    <div style="border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;padding:20px 24px;color:#111;font-size:14px;line-height:1.6">
      ${bodyHtml}
    </div>
  </div>`;
}
