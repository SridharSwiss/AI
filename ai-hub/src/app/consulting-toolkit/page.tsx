import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ConsultingToolkitClient } from "@/components/consulting/playbook-modal";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Consulting Toolkit",
  description:
    "Practical AI implementation playbooks, assessment frameworks, checklists, and templates for every stage of the AI project lifecycle — assess, pilot, scale, and govern. For consultants, managers, and executives.",
  alternates: { canonical: `${BASE_URL}/consulting-toolkit` },
  openGraph: {
    title: "AI Consulting Toolkit — Playbooks & Templates | AIHub",
    description:
      "Implementation playbooks, checklists, and templates for every AI project phase: assess, pilot, scale, and govern. For consultants and enterprise teams.",
    url: `${BASE_URL}/consulting-toolkit`,
    type: "website",
  },
  keywords: [
    "AI consulting", "AI implementation playbook", "AI project checklist",
    "AI readiness assessment", "AI governance framework",
    "enterprise AI strategy", "AI pilot", "AI ROI", "AI consulting toolkit",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Consulting Toolkit",
  description: "Practical AI implementation playbooks, checklists, and templates for consultants and enterprise teams.",
  url: `${BASE_URL}/consulting-toolkit`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Consulting Toolkit", item: `${BASE_URL}/consulting-toolkit` },
    ],
  },
};

export default function ConsultingToolkitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="Consulting Toolkit"
        title="AI Implementation Playbooks"
        description="Practical frameworks, checklists, and templates for every stage of the AI project lifecycle. Click any playbook to see the full checklist."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ConsultingToolkitClient />
      </div>
    </>
  );
}
