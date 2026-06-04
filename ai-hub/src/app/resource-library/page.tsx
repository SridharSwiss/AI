import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ResourcesList } from "@/components/resources/resources-list";

export const metadata: Metadata = {
  title: "Resource Library",
  description: "Curated whitepapers, research reports, and public documents on AI.",
};

export default function ResourceLibraryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resource Library"
        title="Whitepapers & Public Documents"
        description="Curated collection of research papers, reports, and official documents. All publicly available with attribution."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ResourcesList />
      </div>
    </>
  );
}

