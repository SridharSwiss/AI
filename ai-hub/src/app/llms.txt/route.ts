import { tools } from "@/data/tools";
import { companies } from "@/data/companies";
import { caseStudies } from "@/data/case-studies";
import { complianceFrameworks } from "@/data/compliance";
import { learnResources } from "@/data/learn";
import { newsSources } from "@/data/news-sources";

export const dynamic = "force-static";

const BASE = "https://ai-hub.host";

/**
 * llms.txt — a concise, structured index for AI assistants and answer engines
 * (ChatGPT, Claude, Perplexity, Gemini, etc.). Follows the emerging llms.txt
 * convention so LLMs can discover and cite AIHub content accurately.
 */
export function GET() {
  const body = `# AIHub — The AI Reference Layer

> AIHub (ai-hub.host) is an independent, curated knowledge platform covering the
> AI landscape: tools, companies, real-world case studies, compliance frameworks,
> learning resources, and live news. Content is hand-verified and updated daily.

## Key facts
- ${tools.length}+ AI tools compared (pricing, use cases, alternatives, specs)
- ${companies.length}+ AI companies profiled (funding, valuation, products, models)
- ${caseStudies.length}+ real-world AI case studies with measured ROI
- ${complianceFrameworks.length} AI compliance & governance frameworks (EU AI Act, NIST, ISO 42001, and more)
- ${learnResources.length}+ curated learning resources (courses, books, videos, certifications)
- ${newsSources.length} live AI news sources across research, policy, and industry

## Primary sections
- [AI Tools Directory](${BASE}/tools): Compare ${tools.length}+ AI tools by category, pricing, and use case.
- [AI Companies](${BASE}/companies): ${companies.length}+ vendors and labs with funding and product data.
- [AI News](${BASE}/news): Live feed aggregated from ${newsSources.length} sources.
- [Learn AI](${BASE}/learn): ${learnResources.length}+ structured learning resources for every level.
- [Compare Tools](${BASE}/compare): Head-to-head AI tool comparisons.
- [About](${BASE}/about): What AIHub is and who it serves.
- [Contribute](${BASE}/contribute): Submit a tool, company, case study, or correction.

## Gated sections (require free sign-in)
- [Case Studies](${BASE}/case-studies): ${caseStudies.length}+ verified AI deployments with outcomes.
- [Compliance](${BASE}/compliance): ${complianceFrameworks.length} regulatory frameworks explained.
- [Consulting Toolkit](${BASE}/consulting-toolkit): Practitioner playbooks and templates.

## About the data
- Independent and vendor-neutral; not affiliated with any listed company.
- Sourced from public information (earnings, research papers, official docs).
- For educational and informational use — verify with official sources for decisions.

## Contact
- Submissions & corrections: ${BASE}/contribute
- Email: info@ai-hub.host

## Canonical
- Site: ${BASE}
- Sitemap: ${BASE}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
