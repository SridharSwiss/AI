import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { PersonaSelector } from "@/components/home/persona-selector";
import { FeaturedSection } from "@/components/home/featured-section";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AIHub — The AI Knowledge Platform",
  description:
    "Your all-in-one AI knowledge hub: discover 82+ AI tools, explore leading AI companies, navigate compliance frameworks like the EU AI Act and GDPR, and access curated learning resources for every level.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "AIHub — The AI Knowledge Platform",
    description:
      "Discover 82+ AI tools, explore AI companies, navigate compliance (EU AI Act, GDPR), and access curated learning for every level.",
    url: BASE_URL,
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "AIHub — The AI Knowledge Platform" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Hero />
      <section aria-label="Explore by role" className="relative border-y border-border/40 bg-muted/25 dark:bg-muted/10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/4 blur-3xl" />
        </div>
        <div className="container-site section-gap relative">
          <ScrollReveal>
            <PersonaSelector />
          </ScrollReveal>
        </div>
      </section>
      <FeaturedSection />
    </>
  );
}
