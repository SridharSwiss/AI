import { requireUser } from "@/lib/auth/require-auth";

export const dynamic = "force-dynamic";

export default async function ComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser("/compliance");
  return <>{children}</>;
}
