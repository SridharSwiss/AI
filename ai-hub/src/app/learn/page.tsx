import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { LearnList } from "@/components/learn/learn-list";

export const metadata: Metadata = {
  title: "Learn AI",
  description: "Courses, guides, YouTube playlists, and certifications for all levels.",
};

export default function LearnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learn AI"
        title="Learning Resources for Every Level"
        description="Curated courses, YouTube playlists, and certifications — from total beginner to ML engineer."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <LearnList />
      </div>
    </>
  );
}

