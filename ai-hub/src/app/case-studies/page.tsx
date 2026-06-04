import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CaseStudiesList } from "@/components/case-studies/case-studies-list";

export const metadata: Metadata = {
  title: "AI Case Studies",
  description: "Real-world AI implementations with measured outcomes.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="AI Delivering Real Business Value"
        description="Verified implementations with measured outcomes across industries."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CaseStudiesList />
      </div>
    </>
  );
}

