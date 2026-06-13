import { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { companies } from "@/data/companies";
import { caseStudies } from "@/data/case-studies";
import { complianceFrameworks } from "@/data/compliance";

const BASE_URL = "https://sridhar-ai.ch";
const NOW = new Date().toISOString();

/** Build every canonical comparison pair derived from the alternatives lists */
function getComparisonSlugs(): string[] {
  const seen = new Set<string>();
  for (const tool of tools) {
    if (!tool.alternatives) continue;
    for (const altSlug of tool.alternatives) {
      if (!tools.find((t) => t.slug === altSlug)) continue;
      const [a, b] = [tool.slug, altSlug].sort();
      seen.add(`${a}-vs-${b}`);
    }
  }
  return Array.from(seen);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                         lastModified: NOW, priority: 1.0, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/tools`,              lastModified: NOW, priority: 0.9, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/companies`,          lastModified: NOW, priority: 0.9, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/case-studies`,       lastModified: NOW, priority: 0.9, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/compliance`,         lastModified: NOW, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/compare`,            lastModified: NOW, priority: 0.9, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/news`,               lastModified: NOW, priority: 0.8, changeFrequency: "daily"   },
    { url: `${BASE_URL}/learn`,              lastModified: NOW, priority: 0.8, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/resource-library`,   lastModified: NOW, priority: 0.7, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/consulting-toolkit`, lastModified: NOW, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/search`,             lastModified: NOW, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/about`,              lastModified: NOW, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contribute`,         lastModified: NOW, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/privacy`,            lastModified: NOW, priority: 0.4, changeFrequency: "yearly"  },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${BASE_URL}/tools/${t.slug}`,
    lastModified: NOW,
    priority: t.featured ? 0.8 : 0.7,
    changeFrequency: "monthly" as const,
  }));

  const companyRoutes: MetadataRoute.Sitemap = companies.map((c) => ({
    url: `${BASE_URL}/companies/${c.slug}`,
    lastModified: NOW,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    lastModified: NOW,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const complianceRoutes: MetadataRoute.Sitemap = complianceFrameworks.map((f) => ({
    url: `${BASE_URL}/compliance/${f.slug}`,
    lastModified: NOW,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  // Comparison pages — bottom-of-funnel, high purchase-intent traffic (priority 0.8)
  const compareRoutes: MetadataRoute.Sitemap = getComparisonSlugs().map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: NOW,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...companyRoutes,
    ...caseStudyRoutes,
    ...complianceRoutes,
    ...compareRoutes,
  ];
}
