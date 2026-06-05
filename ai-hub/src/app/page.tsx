import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { PersonaSelector } from "@/components/home/persona-selector";
import { FeaturedSection } from "@/components/home/featured-section";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AIHub — The AI Knowledge Platform",
  description:
    "Your all-in-one AI knowledge hub: discover 80+ AI tools, explore leading AI companies, navigate compliance frameworks like the EU AI Act and GDPR, and access curated learning resources for every level.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "AIHub — The AI Knowledge Platform",
    description:
      "Discover 80+ AI tools, explore AI companies, navigate compliance (EU AI Act, GDPR), and access curated learning for every level.",
    url: BASE_URL,
    type: "website",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Hero />
      <section
        aria-label="Explore by role"
        className="border-y border-border/50 bg-muted/30 py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <PersonaSelector />
        </div>
      </section>
      <FeaturedSection />
    </>
  );
}
