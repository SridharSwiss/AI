import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { PersonaSelector } from "@/components/home/persona-selector";
import { FeaturedSection } from "@/components/home/featured-section";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const BASE_URL = "https://ai-hub.host";

export const metadata: Metadata = {
  // Brand-first, ~55 chars — full and untruncated in Google results
  title: "AIHub — Compare 136+ AI Tools, Companies & Compliance",
  description:
    "Compare 136+ AI tools side by side, explore 76 AI companies, and navigate EU AI Act compliance — one independent, daily-updated AI platform.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "AIHub — Compare 136+ AI Tools, Companies & Compliance",
    description:
      "Compare 136+ AI tools, explore 76 AI companies, and navigate EU AI Act compliance — one independent, daily-updated AI platform.",
    url: BASE_URL,
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "AIHub - The AI Knowledge Platform" }],
  },
  keywords: [
    "best AI tools 2026", "AI tools comparison", "ChatGPT alternatives",
    "EU AI Act compliance guide", "AI companies database", "Claude vs ChatGPT",
    "Gemini vs GPT-4", "AI tools for business", "generative AI tools",
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }],
};

// Homepage FAQ schema — targets high-volume AI search queries
const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best AI tool?",
      acceptedAnswer: { "@type": "Answer", text: "There is no single best AI tool — the right choice depends on your use case. ChatGPT (OpenAI) is a strong all-round assistant, Claude (Anthropic) excels at coding and long-document analysis, Gemini (Google) integrates deeply with Google Workspace, and Perplexity is built for cited web research. AIHub lets you compare AI tools side by side by category, pricing, and use case to find the best fit." },
    },
    {
      "@type": "Question",
      name: "What is the EU AI Act and who does it apply to?",
      acceptedAnswer: { "@type": "Answer", text: "The EU AI Act is the world's first comprehensive AI regulation, in force from August 2024. It applies to any organization that develops, deploys, or distributes AI systems affecting people in the EU, regardless of where the organization is based. It classifies AI systems into risk tiers: unacceptable risk (banned), high risk (strict requirements), limited risk (transparency obligations), and minimal risk (no requirements)." },
    },
    {
      "@type": "Question",
      name: "How do I choose between ChatGPT, Claude, and Gemini?",
      acceptedAnswer: { "@type": "Answer", text: "Choose based on your primary task. ChatGPT is a versatile general assistant with a broad plugin and app ecosystem. Claude is often preferred for software development, reasoning, and analyzing long documents. Gemini is the natural choice if you work heavily in Google Workspace (Docs, Gmail, Sheets). All three offer free tiers and paid plans — AIHub compares their capabilities, pricing, and best-fit use cases." },
    },
    {
      "@type": "Question",
      name: "What are the best alternatives to ChatGPT?",
      acceptedAnswer: { "@type": "Answer", text: "Popular ChatGPT alternatives include Claude by Anthropic (coding and long documents), Gemini by Google (Workspace integration), Perplexity (cited web research), Grok by xAI (real-time social data), and open-weight models like Meta's Llama for self-hosting. The best alternative depends on your needs — AIHub provides side-by-side comparisons to help you decide." },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }} />
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
