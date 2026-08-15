import { requireUser } from "@/lib/auth/require-auth";

export const dynamic = "force-dynamic";

export default async function CaseStudyDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser("/case-studies");
  return <>{children}</>;
}
