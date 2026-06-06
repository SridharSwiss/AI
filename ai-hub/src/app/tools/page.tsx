import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ToolsList } from "@/components/tools/tools-list";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "Discover and compare 80+ AI tools across every category - language models, code assistants, image generation, video, voice, and more. Filter by pricing, category, and use case.",
  alternates: { canonical: `${BASE_URL}/tools` },
  openGraph: { title: "AI Tools Directory | AIHub", description: "Compare 80+ AI tools: ChatGPT, Claude, Gemini, Cursor, Midjourney, and more.", url: `${BASE_URL}/tools`, type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "CollectionPage",
  name: "AI Tools Directory", description: "A curated directory of 80+ AI tools across every category.",
  url: `${BASE_URL}/tools`,
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "AI Tools", item: `${BASE_URL}/tools` },
  ]},
};

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader eyebrow="AI Tools Directory" accent="violet" title="Discover & Compare AI Tools" description="80+ AI tools curated across every category. Filter by use case and pricing to find the right tool for your needs." />
      <div className="container-site pt-6 pb-12"><ToolsList /></div>
    </>
  );
}
