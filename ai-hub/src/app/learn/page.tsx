import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { LearnList } from "@/components/learn/learn-list";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "Learn AI",
  description: "Curated AI learning resources for every level: beginner guides, deep learning courses, LLM engineering tutorials, YouTube playlists, and professional certifications.",
  alternates: { canonical: `${BASE_URL}/learn` },
  openGraph: { title: "Learn AI - Courses, Guides & Certifications | AIHub", description: "Curated AI courses, tutorials, YouTube playlists, and certifications - from complete beginner to ML engineer.", url: `${BASE_URL}/learn`, type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "CollectionPage",
  name: "AI Learning Resources", description: "Curated courses, YouTube playlists, and certifications for learning AI at every level.",
  url: `${BASE_URL}/learn`,
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Learn AI", item: `${BASE_URL}/learn` },
  ]},
};

export default function LearnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader accent="emerald" eyebrow="Learn AI" title="Learning Resources for Every Level" description="Curated courses, YouTube playlists, and certifications - from total beginner to ML engineer. Free and paid options across every AI discipline." />
      <div className="container-site py-10"><LearnList /></div>
    </>
  );
}
