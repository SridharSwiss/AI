import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ToolsList } from "@/components/tools/tools-list";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "Discover and compare 30+ AI tools across every category.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Tools Directory"
        title="Discover & Compare AI Tools"
        description="30+ AI tools curated across every category. Filter by use case and pricing to find the right tool for your needs."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ToolsList />
      </div>
    </>
  );
}
