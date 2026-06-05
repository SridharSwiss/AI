import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ToolsList } from "@/components/tools/tools-list";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description:
    "Discover and compare 80+ AI tools across every category — language models, code assistants, image generation, video, voice, and more. Filter by pricing, category, and use case.",
  alternates: { canonical: `${BASE_URL}/tools` },
  openGraph: {
    title: "AI Tools Directory | AIHub",
    description:
      "Compare 80+ AI tools: ChatGPT, Claude, Gemini, Cursor, Midjourney, and more. Filter by category, pricing, and use case.",
    url: `${BASE_URL}/tools`,
    type: "website",
  },
  keywords: [
    "AI tools", "ChatGPT", "Claude", "Gemini", "Cursor", "Midjourney",
    "GitHub Copilot", "AI image generation", "AI writing tools",
    "large language models", "LLM comparison", "AI productivity tools",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Tools Directory",
  description: "A curated directory of 80+ AI tools across every category.",
  url: `${BASE_URL}/tools`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: `${BASE_URL}/tools` },
    ],
  },
};

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="AI Tools Directory"
        title="Discover & Compare AI Tools"
        description="80+ AI tools curated across every category. Filter by use case and pricing to find the right tool for your needs."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ToolsList />
      </div>
    </>
  );
}
