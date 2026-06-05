import { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { companies } from "@/data/companies";
import { caseStudies } from "@/data/case-studies";
import { complianceFrameworks } from "@/data/compliance";
import { learnResources } from "@/data/learn";

const BASE_URL = "https://sridhar-ai.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/tools`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/companies`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/case-studies`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/compliance`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/learn`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/news`, priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE_URL}/consulting-toolkit`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/resource-library`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${BASE_URL}/search`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/about`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contribute`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/privacy`, priority: 0.4, changeFrequency: "yearly" },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${BASE_URL}/tools/${t.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const companyRoutes: MetadataRoute.Sitemap = companies.map((c) => ({
    url: `${BASE_URL}/companies/${c.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const complianceRoutes: MetadataRoute.Sitemap = complianceFrameworks.map((f) => ({
    url: `${BASE_URL}/compliance/${f.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const learnRoutes: MetadataRoute.Sitemap = learnResources.map((r) => ({
    url: `${BASE_URL}/learn/${r.slug}`,
    priority: 0.5,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...companyRoutes,
    ...caseStudyRoutes,
    ...complianceRoutes,
    ...learnRoutes,
  ];
}
