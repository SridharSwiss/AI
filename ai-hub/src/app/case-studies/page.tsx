import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CaseStudiesList } from "@/components/case-studies/case-studies-list";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Case Studies",
  description: "Real-world AI implementations with measurable business outcomes - healthcare, finance, retail, manufacturing, and more.",
  alternates: { canonical: `${BASE_URL}/case-studies` },
  openGraph: { title: "AI Case Studies - Real Business Results | AIHub", description: "25+ verified AI case studies with measured ROI, deployment timelines, and lessons learned.", url: `${BASE_URL}/case-studies`, type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "CollectionPage",
  name: "AI Case Studies", description: "Real-world AI implementations with measured outcomes across industries.",
  url: `${BASE_URL}/case-studies`,
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Case Studies", item: `${BASE_URL}/case-studies` },
  ]},
};

export default function CaseStudiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader accent="amber" eyebrow="Case Studies" title="AI Delivering Real Business Value" description="Verified implementations with measured outcomes across industries - including ROI, deployment timelines, and lessons learned." />
      <div className="container-site py-10"><CaseStudiesList /></div>
    </>
  );
}
