import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { MembershipForm } from "@/components/switzerland/membership-form";
import { ArrowLeft } from "lucide-react";

const BASE_URL = "https://ai-hub.host";

export const metadata: Metadata = {
  title: "Join AI Hub Switzerland — Membership Application",
  description:
    "Apply for free membership of AI Hub Switzerland, the global network for responsible AI. Applications are reviewed by our team.",
  alternates: { canonical: `${BASE_URL}/switzerland/join` },
  openGraph: {
    title: "Join AI Hub Switzerland — Membership Application",
    description: "Apply for free membership of AI Hub Switzerland.",
    url: `${BASE_URL}/switzerland/join`,
    type: "website",
  },
};

export default function JoinPage() {
  return (
    <>
      <PageHeader
        accent="rose"
        eyebrow="AI Hub Switzerland"
        title="Join the network"
        description="Membership is free and open to researchers, technology experts, entrepreneurs, and policymakers worldwide. Every application is personally reviewed by our team."
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/switzerland" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to AI Hub Switzerland
        </Link>
        <MembershipForm />
      </div>
    </>
  );
}
