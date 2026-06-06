import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ResourcesList } from "@/components/resources/resources-list";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Resource Library",
  description: "Curated collection of AI whitepapers, research reports, government publications, and official documents.",
  alternates: { canonical: `${BASE_URL}/resource-library` },
  openGraph: { title: "AI Resource Library — Whitepapers & Research | AIHub", description: "AI whitepapers, research reports, and official documents.", url: `${BASE_URL}/resource-library`, type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "CollectionPage",
  name: "AI Resource Library", description: "Curated whitepapers, research reports, and public documents on AI.",
  url: `${BASE_URL}/resource-library`,
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Resource Library", item: `${BASE_URL}/resource-library` },
  ]},
};

export default function ResourceLibraryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader accent="violet" eyebrow="Resource Library" title="Whitepapers & Public Documents" description="Curated collection of research papers, reports, and official documents. All publicly available with attribution." />
      <div className="container-site py-10"><ResourcesList /></div>
    </>
  );
}
