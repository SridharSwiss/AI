import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AlertCircle } from "lucide-react";
import { ComplianceList } from "@/components/compliance/compliance-list";

export const metadata: Metadata = {
  title: "AI Compliance & Governance",
  description: "Regulatory frameworks, compliance guidance, and governance for AI systems.",
};

export default function CompliancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Compliance & Governance"
        title="AI Regulatory Landscape"
        description="Navigate AI regulations, governance frameworks, and compliance requirements. Explained for every audience level."
      >
        <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-sm text-amber-800 dark:text-amber-300 max-w-2xl">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          This is educational guidance. Always consult legal counsel for compliance decisions.
        </div>
      </PageHeader>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ComplianceList />
      </div>
    </>
  );
}
