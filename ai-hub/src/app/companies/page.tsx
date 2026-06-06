import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CompaniesList } from "@/components/companies/companies-list";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Companies",
  description: "In-depth profiles of the leading AI companies - OpenAI, Anthropic, Google DeepMind, Meta AI, Mistral, and more.",
  alternates: { canonical: `${BASE_URL}/companies` },
  openGraph: { title: "AI Companies | AIHub", description: "Profiles of OpenAI, Anthropic, Google DeepMind, Meta AI, xAI, Mistral and 20+ more.", url: `${BASE_URL}/companies`, type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "CollectionPage",
  name: "AI Companies Directory", description: "Profiles of the leading AI companies, research labs, and startups.",
  url: `${BASE_URL}/companies`,
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "AI Companies", item: `${BASE_URL}/companies` },
  ]},
};

export default function CompaniesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader accent="blue" eyebrow="AI Companies" title="Who's Building AI?" description="Profiles of the companies, research labs, and startups shaping the AI landscape - with models, benchmarks, financials, and funding rounds." />
      <div className="container-site py-10"><CompaniesList /></div>
    </>
  );
}
