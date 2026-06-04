import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Search } from "lucide-react";

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
        description="Find tools, companies, guides, case studies, and compliance resources."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Full-text search coming in Phase 3</h2>
        <p className="text-muted-foreground mb-8">
          Phase 3 will add instant full-text + faceted search powered by Fuse.js across all content types:
          tools, companies, articles, case studies, compliance items, and playbooks.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
          <span className="px-3 py-1 rounded-full bg-muted">Search by keyword</span>
          <span className="px-3 py-1 rounded-full bg-muted">Filter by type</span>
          <span className="px-3 py-1 rounded-full bg-muted">Filter by tag</span>
          <span className="px-3 py-1 rounded-full bg-muted">Filter by level</span>
          <span className="px-3 py-1 rounded-full bg-muted">Cross-content results</span>
        </div>
      </div>
    </>
  );
}
