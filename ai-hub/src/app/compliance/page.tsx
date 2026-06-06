import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AlertCircle } from "lucide-react";
import { ComplianceList } from "@/components/compliance/compliance-list";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Compliance & Governance",
  description: "Navigate AI regulations worldwide: EU AI Act, GDPR, NIST AI RMF, UK AI Safety, FDA AI/ML SaMD, and 15+ more frameworks.",
  alternates: { canonical: `${BASE_URL}/compliance` },
  openGraph: { title: "AI Compliance & Governance | AIHub", description: "EU AI Act, GDPR, NIST AI RMF, and 15+ frameworks explained - risk tiers, compliance roadmaps, guardrails, and enforcement cases.", url: `${BASE_URL}/compliance`, type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "CollectionPage",
  name: "AI Compliance & Regulatory Frameworks", description: "Comprehensive guides to 16 AI regulatory frameworks.",
  url: `${BASE_URL}/compliance`,
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "AI Compliance", item: `${BASE_URL}/compliance` },
  ]},
};

export default function CompliancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader accent="rose" eyebrow="Compliance & Governance" title="AI Regulatory Landscape" description="Navigate AI regulations, governance frameworks, and compliance requirements across 16 jurisdictions.">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-sm text-amber-800 dark:text-amber-300 max-w-2xl">
          <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          This is educational guidance. Always consult legal counsel for compliance decisions.
        </div>
      </PageHeader>
      <div className="container-site py-10"><ComplianceList /></div>
    </>
  );
}
