import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { NewsClient } from "@/components/news/news-client";

export const metadata: Metadata = {
  title: "AI News",
  description:
    "Latest AI news across tech, research, government, medical, financial, and quantum computing.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI News"
        title="Latest AI News"
        description="Real-time news aggregated from 20+ sources across tech, research, government, medical, financial, and quantum computing. Updates automatically every 6 hours."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <NewsClient />
      </div>
    </>
  );
}
