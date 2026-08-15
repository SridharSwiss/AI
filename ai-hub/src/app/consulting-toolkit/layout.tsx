import { requireUser } from "@/lib/auth/require-auth";

export const dynamic = "force-dynamic";

export default async function ConsultingToolkitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser("/consulting-toolkit");
  return <>{children}</>;
}
