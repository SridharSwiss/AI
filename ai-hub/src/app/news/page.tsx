import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { NewsClient } from "@/components/news/news-client";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI News",
  description: "Latest AI news aggregated from 20+ trusted sources — tech, research, government, healthcare, finance, and quantum computing. Updated every 6 hours.",
  alternates: { canonical: `${BASE_URL}/news` },
  openGraph: { title: "AI News — Real-Time Updates | AIHub", description: "Latest AI news from 20+ sources — tech, research, government, healthcare, and finance.", url: `${BASE_URL}/news`, type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "CollectionPage",
  name: "AI News", description: "Real-time AI news aggregated from 20+ sources.",
  url: `${BASE_URL}/news`,
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "AI News", item: `${BASE_URL}/news` },
  ]},
};

export default function NewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader accent="sky" eyebrow="AI News" title="Latest AI News" description="Real-time news aggregated from 20+ sources across tech, research, government, medical, financial, and quantum computing. Updates automatically every 6 hours." />
      <div className="container-site py-10"><NewsClient /></div>
    </>
  );
}
