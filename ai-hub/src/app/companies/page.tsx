import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CompaniesList } from "@/components/companies/companies-list";

export const metadata: Metadata = {
  title: "AI Companies",
  description: "Profiles of the leading AI companies shaping the industry.",
};

export default function CompaniesPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Companies"
        title="Who's Building AI?"
        description="Profiles of the companies, research labs, and startups shaping the AI landscape."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CompaniesList />
      </div>
    </>
  );
}

