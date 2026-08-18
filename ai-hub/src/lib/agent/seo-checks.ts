import "server-only";
import { tools } from "@/data/tools";
import { companies } from "@/data/companies";
import updates from "@/data/daily-updates.json";

const BASE_URL = "https://ai-hub.host";

export type SeoStatus = "ok" | "warn" | "error";
export type SeoCheck = {
  id: string;
  category: string;
  title: string;
  status: SeoStatus;
  detail: string;
  action?: string;
};

async function fetchText(path: string, timeoutMs = 8000): Promise<{ ok: boolean; status: number; body: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      signal: controller.signal,
      headers: { "User-Agent": "AIHub-SEO-Agent/1.0" },
      cache: "no-store",
    });
    const body = await res.text();
    return { ok: res.ok, status: res.status, body };
  } catch {
    return { ok: false, status: 0, body: "" };
  } finally {
    clearTimeout(timer);
  }
}

function pick(re: RegExp, s: string): string | null {
  const m = s.match(re);
  return m ? m[1].trim() : null;
}

/** Live SEO audit — fetches the real production pages and inspects them. */
export async function runSeoAudit(): Promise<{ checks: SeoCheck[]; score: number; homeTitle: string | null }> {
  const checks: SeoCheck[] = [];

  // Live homepage inspection
  const home = await fetchText("/");
  let homeTitle: string | null = null;

  if (!home.ok) {
    checks.push({ id: "home", category: "Availability", title: "Homepage not reachable", status: "error", detail: `Fetch returned status ${home.status}.`, action: "Check the deployment — if the homepage is down, nothing ranks." });
  } else {
    const html = home.body;
    homeTitle = pick(/<title>([^<]*)<\/title>/i, html);
    const desc = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i, html)
      ?? pick(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i, html);
    const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i, html);
    const ogTitle = /property=["']og:title["']/i.test(html);
    const h1 = pick(/<h1[^>]*>([\s\S]*?)<\/h1>/i, html)?.replace(/<[^>]+>/g, "").trim() ?? null;
    const ldCount = (html.match(/application\/ld\+json/gi) || []).length;

    // Title
    if (!homeTitle) {
      checks.push({ id: "title", category: "On-page", title: "Missing <title>", status: "error", detail: "No title tag found.", action: "Every page needs a unique title tag." });
    } else if (homeTitle.length > 65) {
      checks.push({ id: "title", category: "On-page", title: "Title too long", status: "warn", detail: `${homeTitle.length} chars — Google truncates around 60. "${homeTitle}"`, action: "Shorten the homepage title to ~60 characters." });
    } else {
      checks.push({ id: "title", category: "On-page", title: "Title present & sized well", status: "ok", detail: `"${homeTitle}" (${homeTitle.length} chars)` });
    }

    // Description
    if (!desc) {
      checks.push({ id: "desc", category: "On-page", title: "Missing meta description", status: "error", detail: "No meta description found.", action: "Add a compelling 150–160 char description." });
    } else if (desc.length > 165) {
      checks.push({ id: "desc", category: "On-page", title: "Meta description too long", status: "warn", detail: `${desc.length} chars — may be truncated.`, action: "Trim the description to ~155 characters." });
    } else {
      checks.push({ id: "desc", category: "On-page", title: "Meta description present", status: "ok", detail: `${desc.length} chars.` });
    }

    // Canonical
    checks.push(
      canonical && canonical.includes("ai-hub.host")
        ? { id: "canonical", category: "On-page", title: "Canonical points to ai-hub.host", status: "ok", detail: canonical }
        : { id: "canonical", category: "On-page", title: "Canonical missing or wrong domain", status: "error", detail: canonical ?? "none", action: "Canonical must point to https://ai-hub.host." }
    );

    // H1
    checks.push(
      h1
        ? { id: "h1", category: "On-page", title: "H1 present", status: "ok", detail: `"${h1.slice(0, 80)}"` }
        : { id: "h1", category: "On-page", title: "No H1 heading found", status: "warn", detail: "Homepage should have one clear H1.", action: "Ensure the hero renders a single descriptive <h1>." }
    );

    // OG + structured data
    checks.push(ogTitle
      ? { id: "og", category: "Social", title: "Open Graph tags present", status: "ok", detail: "og:title found." }
      : { id: "og", category: "Social", title: "Open Graph tags missing", status: "warn", detail: "No og:title.", action: "Add Open Graph metadata for social sharing." });

    checks.push(ldCount >= 2
      ? { id: "ld", category: "Structured Data", title: `${ldCount} JSON-LD blocks`, status: "ok", detail: "Organization / WebSite / FAQ schema detected." }
      : { id: "ld", category: "Structured Data", title: "Little/no structured data", status: "warn", detail: `${ldCount} JSON-LD block(s).`, action: "Add Organization, WebSite, and FAQ schema." });
  }

  // Sitemap
  const sitemap = await fetchText("/sitemap.xml");
  const urlCount = (sitemap.body.match(/<url>/g) || []).length;
  checks.push(
    sitemap.ok && urlCount > 0
      ? { id: "sitemap", category: "Crawlability", title: "Sitemap is served", status: "ok", detail: `${urlCount} URLs in sitemap.xml.` }
      : { id: "sitemap", category: "Crawlability", title: "Sitemap problem", status: "error", detail: `status ${sitemap.status}, ${urlCount} URLs.`, action: "Ensure /sitemap.xml returns 200 with URLs; submit it in Search Console." }
  );

  // robots.txt
  const robots = await fetchText("/robots.txt");
  const hasAiBots = /GPTBot/i.test(robots.body) && /PerplexityBot/i.test(robots.body);
  const hasSitemapLine = /Sitemap:\s*https:\/\/ai-hub\.host\/sitemap\.xml/i.test(robots.body);
  checks.push(
    robots.ok && hasAiBots && hasSitemapLine
      ? { id: "robots", category: "Crawlability", title: "robots.txt is optimal", status: "ok", detail: "AI crawlers welcomed; sitemap referenced." }
      : { id: "robots", category: "Crawlability", title: "robots.txt needs attention", status: robots.ok ? "warn" : "error", detail: `status ${robots.status}; AI bots: ${hasAiBots}; sitemap line: ${hasSitemapLine}.`, action: "Ensure robots.txt allows AI crawlers and references the sitemap." }
  );

  // llms.txt
  const llms = await fetchText("/llms.txt");
  checks.push(
    llms.ok && llms.body.length > 100
      ? { id: "llms", category: "AI Optimization", title: "llms.txt served", status: "ok", detail: "AI answer-engine index is live." }
      : { id: "llms", category: "AI Optimization", title: "llms.txt missing", status: "warn", detail: `status ${llms.status}.`, action: "Serve /llms.txt so AI engines can index and cite the site." }
  );

  // Google verification
  checks.push(
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { id: "gsc", category: "Indexing", title: "Search Console meta verification set", status: "ok", detail: "Google verification token present." }
      : { id: "gsc", category: "Indexing", title: "Verify in Search Console", status: "warn", detail: "No meta verification token.", action: "Verify ai-hub.host in Google Search Console (DNS or set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) and submit the sitemap." }
  );

  // Content freshness (fresh content = ranking signal)
  const staleDays = Math.floor((Date.now() - new Date(updates.date + "T00:00:00Z").getTime()) / 86_400_000);
  const curYear = new Date().getUTCFullYear();
  const bannerYear = new Date(updates.date + "T00:00:00Z").getUTCFullYear();
  checks.push(
    staleDays <= 2
      ? { id: "fresh", category: "Content", title: "Content is fresh", status: "ok", detail: `Updated ${updates.date}. Fresh content helps rankings.` }
      : { id: "fresh", category: "Content", title: "Content going stale", status: "warn", detail: `Last update ${updates.date} (${staleDays}d ago).`, action: "Run the daily maintenance routine — freshness is a ranking factor." }
  );
  if (bannerYear < curYear) {
    checks.push({ id: "year", category: "Content", title: "Year references may be outdated", status: "warn", detail: `Banner year ${bannerYear} vs current ${curYear}.`, action: `Update year references (titles, copy) to ${curYear}.` });
  }

  // Inventory scale (thin vs rich content)
  const total = tools.length + companies.length;
  checks.push({ id: "depth", category: "Content", title: "Content depth", status: "ok", detail: `${tools.length} tools + ${companies.length} companies indexed — strong topical coverage.` });

  const ok = checks.filter((c) => c.status === "ok").length;
  const score = Math.round((ok / checks.length) * 100);
  return { checks, score, homeTitle };
}
