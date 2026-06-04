import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SearchClient } from "@/components/search/search-client";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across all AI tools, companies, guides, case studies, and compliance frameworks.",
};

export default function SearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="Search the AI Landscape"
        description="Find tools, companies, guides, case studies, and compliance resources instantly."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SearchClient />
      </div>
    </>
  );
}

