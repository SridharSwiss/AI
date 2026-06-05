import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CaseStudiesList } from "@/components/case-studies/case-studies-list";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Case Studies",
  description:
    "Real-world AI implementations with measurable business outcomes — healthcare, finance, retail, manufacturing, and more. Learn ROI, deployment timelines, and lessons learned from 25+ verified case studies.",
  alternates: { canonical: `${BASE_URL}/case-studies` },
  openGraph: {
    title: "AI Case Studies — Real Business Results | AIHub",
    description:
      "25+ verified AI case studies with measured ROI, deployment timelines, and lessons learned across healthcare, finance, retail, and more.",
    url: `${BASE_URL}/case-studies`,
    type: "website",
  },
  keywords: [
    "AI case studies", "AI ROI", "AI implementation", "AI in healthcare",
    "AI in finance", "AI in retail", "enterprise AI", "AI business outcomes",
    "AI success stories", "AI transformation", "AI productivity gains",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Case Studies",
  description: "Real-world AI implementations with measured outcomes across industries.",
  url: `${BASE_URL}/case-studies`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${BASE_URL}/case-studies` },
    ],
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="Case Studies"
        title="AI Delivering Real Business Value"
        description="Verified implementations with measured outcomes across industries — including ROI, deployment timelines, and lessons learned."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CaseStudiesList />
      </div>
    </>
  );
}
