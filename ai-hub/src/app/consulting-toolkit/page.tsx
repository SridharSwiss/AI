import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ConsultingToolkitClient } from "@/components/consulting/playbook-modal";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Consulting Toolkit",
  description: "Practical AI implementation playbooks, assessment frameworks, checklists, and templates for every stage of the AI project lifecycle.",
  alternates: { canonical: `${BASE_URL}/consulting-toolkit` },
  openGraph: { title: "AI Consulting Toolkit - Playbooks & Templates | AIHub", description: "Implementation playbooks, checklists, and templates for every AI project phase.", url: `${BASE_URL}/consulting-toolkit`, type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "CollectionPage",
  name: "AI Consulting Toolkit", description: "Practical AI implementation playbooks, checklists, and templates.",
  url: `${BASE_URL}/consulting-toolkit`,
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Consulting Toolkit", item: `${BASE_URL}/consulting-toolkit` },
  ]},
};

export default function ConsultingToolkitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader accent="pink" eyebrow="Consulting Toolkit" title="AI Implementation Playbooks" className="animate-fade-up" description="Practical frameworks, checklists, and templates for every stage of the AI project lifecycle. Click any playbook to see the full checklist." />
      <div className="container-site py-10"><ConsultingToolkitClient /></div>
    </>
  );
}
