import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ConsultingToolkitClient } from "@/components/consulting/playbook-modal";

export const metadata: Metadata = {
  title: "AI Consulting Toolkit",
  description: "Implementation playbooks, assessment frameworks, and templates for AI projects.",
};

export default function ConsultingToolkitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Consulting Toolkit"
        title="AI Implementation Playbooks"
        description="Practical frameworks, checklists, and templates for every stage of the AI project lifecycle. Click any playbook to see the full checklist."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ConsultingToolkitClient />
      </div>
    </>
  );
}

