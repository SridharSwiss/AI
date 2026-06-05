import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { LearnList } from "@/components/learn/learn-list";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "Learn AI",
  description:
    "Curated AI learning resources for every level: beginner guides, deep learning courses, LLM engineering tutorials, YouTube playlists, and professional certifications from Coursera, DeepLearning.AI, fast.ai, and more.",
  alternates: { canonical: `${BASE_URL}/learn` },
  openGraph: {
    title: "Learn AI — Courses, Guides & Certifications | AIHub",
    description:
      "Curated AI courses, tutorials, YouTube playlists, and certifications — from complete beginner to ML engineer. Free and paid options.",
    url: `${BASE_URL}/learn`,
    type: "website",
  },
  keywords: [
    "learn AI", "AI courses", "machine learning course", "deep learning tutorial",
    "LLM engineering", "AI certification", "DeepLearning.AI", "fast.ai",
    "Coursera AI", "free AI course", "AI for beginners", "prompt engineering",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Learning Resources",
  description: "Curated courses, YouTube playlists, and certifications for learning AI at every level.",
  url: `${BASE_URL}/learn`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Learn AI", item: `${BASE_URL}/learn` },
    ],
  },
};

export default function LearnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="Learn AI"
        title="Learning Resources for Every Level"
        description="Curated courses, YouTube playlists, and certifications — from total beginner to ML engineer. Free and paid options across every AI discipline."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <LearnList />
      </div>
    </>
  );
}
