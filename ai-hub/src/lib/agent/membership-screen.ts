/**
 * Agentic membership screening — rule-based (free). Scores an application for
 * completeness and quality and recommends an action, so a human reviewer can
 * approve high-quality applications at a glance. (LLM-based screening — reading
 * the bio for fit and cross-checking the person — is the paid API tier.)
 */

export type MembershipInput = {
  full_name?: string | null;
  email?: string | null;
  organization?: string | null;
  job_title?: string | null;
  membership_category?: string | null;
  seniority?: string | null;
  country?: string | null;
  city?: string | null;
  linkedin_url?: string | null;
  website?: string | null;
  areas_of_interest?: string[] | null;
  bio?: string | null;
};

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com",
  "proton.me", "protonmail.com", "aol.com", "gmx.com", "live.com", "mail.com",
]);

export type Screening = {
  score: number;
  recommendation: "approve" | "review";
  reasons: string[];
};

export function screenMembership(a: MembershipInput): Screening {
  let score = 0;
  const reasons: string[] = [];

  if (a.organization?.trim()) { score += 15; } else { reasons.push("No organization provided"); }
  if (a.job_title?.trim()) { score += 10; } else { reasons.push("No job title"); }

  const li = (a.linkedin_url ?? "").toLowerCase();
  if (/linkedin\.com\/(in|company)\//.test(li)) { score += 22; } else { reasons.push("No valid LinkedIn profile"); }

  if (a.country?.trim()) score += 8;
  if (a.city?.trim()) score += 4;

  const bioLen = (a.bio ?? "").trim().length;
  if (bioLen >= 120) { score += 20; } else if (bioLen >= 40) { score += 10; reasons.push("Short motivation statement"); } else { reasons.push("Missing/very short motivation"); }

  if ((a.areas_of_interest?.length ?? 0) >= 1) { score += 8; } else { reasons.push("No areas of interest selected"); }
  if (a.membership_category?.trim()) score += 5;

  const domain = (a.email ?? "").split("@")[1]?.toLowerCase() ?? "";
  if (domain && !FREE_EMAIL_DOMAINS.has(domain)) { score += 8; reasons.push("Professional email domain"); }
  else if (domain) { reasons.push("Personal email domain"); }

  score = Math.max(0, Math.min(100, score));
  const recommendation: Screening["recommendation"] = score >= 70 ? "approve" : "review";

  return { score, recommendation, reasons };
}
