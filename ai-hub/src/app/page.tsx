import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { PersonaSelector } from "@/components/home/persona-selector";
import { FeaturedSection } from "@/components/home/featured-section";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  // Question-based title for GEO/AIO eligibility
  title: "AIHub — Compare 107+ AI Tools, Companies & EU AI Act Compliance (2026)",
  description:
    "AIHub is the world's most complete AI reference platform. Compare ChatGPT, Claude, Gemini and 107+ AI tools side-by-side. Explore 40 AI companies with funding data. Navigate EU AI Act compliance. Updated June 2026.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "AIHub — Compare 107+ AI Tools, Companies & EU AI Act Compliance (2026)",
    description:
      "Compare ChatGPT, Claude, Gemini and 107+ AI tools. Explore 40 AI companies with funding data. Navigate EU AI Act compliance. Updated June 2026.",
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
      name: "What is the best AI tool in 2026?",
      acceptedAnswer: { "@type": "Answer", text: "The best AI tools in 2026 include ChatGPT (1B weekly users, GPT-5.5), Claude (Opus 4.8, $45B ARR), and Gemini 3.5 Flash (750M MAU). The right choice depends on your use case: ChatGPT for general use, Claude for coding and long documents, Gemini for Google Workspace integration." },
    },
    {
      "@type": "Question",
      name: "What is the EU AI Act and who does it apply to?",
      acceptedAnswer: { "@type": "Answer", text: "The EU AI Act is the world's first comprehensive AI regulation, in force from August 2024. It applies to any company deploying AI systems affecting EU citizens, regardless of where the company is based. It classifies AI systems into risk tiers: unacceptable risk (banned), high risk (strict requirements), limited risk (transparency obligations), and minimal risk (no requirements)." },
    },
    {
      "@type": "Question",
      name: "How much does ChatGPT cost per month?",
      acceptedAnswer: { "@type": "Answer", text: "ChatGPT pricing in 2026: Free ($0/mo with ads), Go ($8/mo), Plus ($20/mo with GPT-5.5), Business ($20/seat/mo), Pro ($200/mo unlimited), and Enterprise (custom pricing). The free tier now includes GPT-5.3 Instant but shows ads." },
    },
    {
      "@type": "Question",
      name: "What are the best alternatives to ChatGPT?",
      acceptedAnswer: { "@type": "Answer", text: "The top ChatGPT alternatives in 2026 are: Claude by Anthropic (best for coding and long documents), Gemini by Google (best for Workspace integration), Grok by xAI (best for real-time X/Twitter data), Perplexity (best for cited research), and Llama 5 (best open-source option)." },
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
