import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AlertCircle } from "lucide-react";
import { ComplianceList } from "@/components/compliance/compliance-list";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Compliance & Governance",
  description:
    "Navigate AI regulations worldwide: EU AI Act, GDPR, NIST AI RMF, UK AI Safety, FDA AI/ML SaMD, and 15+ more frameworks. Risk tiers, guardrails, penalties, enforcement cases — explained for every audience.",
  alternates: { canonical: `${BASE_URL}/compliance` },
  openGraph: {
    title: "AI Compliance & Governance | AIHub",
    description:
      "EU AI Act, GDPR, NIST AI RMF, and 15+ frameworks explained — risk tiers, compliance roadmaps, guardrails, and enforcement cases.",
    url: `${BASE_URL}/compliance`,
    type: "website",
  },
  keywords: [
    "AI compliance", "EU AI Act", "GDPR", "NIST AI RMF", "AI governance",
    "AI regulation", "UK AI Safety Institute", "FDA AI SaMD",
    "AI Act risk tiers", "AI compliance checklist", "AI regulatory framework",
    "responsible AI", "AI ethics", "AI Act penalties",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Compliance & Regulatory Frameworks",
  description: "Comprehensive guides to 16 AI regulatory frameworks including the EU AI Act, GDPR, NIST AI RMF, and more.",
  url: `${BASE_URL}/compliance`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "AI Compliance", item: `${BASE_URL}/compliance` },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the EU AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The EU AI Act is the world's first comprehensive AI regulatory framework. It uses a risk-based approach categorising AI systems into four tiers: unacceptable risk (banned), high risk (regulated), limited risk (transparency obligations), and minimal risk (voluntary codes).",
      },
    },
    {
      "@type": "Question",
      name: "Which AI regulations apply to my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your location and sector. EU-facing businesses must comply with the EU AI Act. GDPR applies to any AI processing EU personal data. US businesses may face FTC guidance, sector-specific rules (FDA for medical AI), and state laws. Use this directory to explore frameworks by jurisdiction.",
      },
    },
    {
      "@type": "Question",
      name: "What are the EU AI Act penalties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EU AI Act penalties: up to €35M or 7% of global annual turnover for prohibited AI uses; up to €15M or 3% for high-risk AI violations; up to €7.5M or 1.5% for providing incorrect information to authorities.",
      },
    },
  ],
};

export default function CompliancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        eyebrow="Compliance & Governance"
        title="AI Regulatory Landscape"
        description="Navigate AI regulations, governance frameworks, and compliance requirements across 16 jurisdictions. Explained for every audience level."
      >
        <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-sm text-amber-800 dark:text-amber-300 max-w-2xl">
          <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          This is educational guidance. Always consult legal counsel for compliance decisions.
        </div>
      </PageHeader>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ComplianceList />
      </div>
    </>
  );
}
