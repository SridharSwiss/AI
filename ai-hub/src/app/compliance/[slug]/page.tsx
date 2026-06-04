import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { complianceFrameworks } from "@/data/compliance";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Shield, CheckCircle, ExternalLink, AlertCircle, ArrowRight } from "lucide-react";

const statusColor: Record<string, "green" | "blue" | "amber"> = {
  "In Force": "green",
  Published: "blue",
  Active: "blue",
  Proposed: "amber",
  Draft: "amber",
};

const riskColor: Record<string, "green" | "blue" | "amber" | "destructive"> = {
  low: "green",
  medium: "blue",
  high: "amber",
  critical: "destructive",
};

const riskBg: Record<string, string> = {
  low: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300",
  medium: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50 text-blue-800 dark:text-blue-300",
  high: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300",
  critical: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50 text-rose-800 dark:text-rose-300",
};

export async function generateStaticParams() {
  return complianceFrameworks.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const framework = complianceFrameworks.find((f) => f.slug === slug);
  if (!framework) return { title: "Framework Not Found" };
  return {
    title: `${framework.name} — AI Compliance`,
    description: framework.description.slice(0, 160),
  };
}

export default async function ComplianceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const framework = complianceFrameworks.find((f) => f.slug === slug);
  if (!framework) notFound();

  const relatedFrameworks = framework.relatedFrameworks
    ? complianceFrameworks.filter((f) => framework.relatedFrameworks!.includes(f.slug))
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb
        items={[
          { label: "Compliance", href: "/compliance" },
          { label: framework.shortName },
        ]}
        className="mb-8"
      />

      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Shield className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1 className="text-3xl font-bold">{framework.name}</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <Badge variant={statusColor[framework.status] ?? "blue"}>{framework.status}</Badge>
            <Badge variant={riskColor[framework.riskLevel] ?? "blue"} className="capitalize">{framework.riskLevel} risk</Badge>
            <span className="text-sm text-muted-foreground">{framework.jurisdiction}</span>
          </div>
          <p className="text-sm text-muted-foreground">{framework.enforcementDate}</p>
        </div>
        <a
          href={framework.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          Official Text
        </a>
      </div>

      {/* Risk level alert */}
      <div className={`flex items-start gap-3 p-4 rounded-xl border mb-8 ${riskBg[framework.riskLevel]}`}>
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold capitalize">{framework.riskLevel} risk framework</p>
          <p className="text-sm mt-0.5">{framework.affectedOrgs}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{framework.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {framework.keyRequirements.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {framework.implementationGuidance && (
            <Card>
              <CardHeader>
                <CardTitle>Implementation Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {framework.implementationGuidance.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}

          {framework.penalties && (
            <Card className="border-rose-200 dark:border-rose-800/50">
              <CardHeader>
                <CardTitle className="text-rose-700 dark:text-rose-400">Penalties for Non-Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{framework.penalties}</p>
              </CardContent>
            </Card>
          )}

          {/* Related frameworks */}
          {relatedFrameworks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Frameworks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedFrameworks.map((rf) => (
                    <Link
                      key={rf.slug}
                      href={`/compliance/${rf.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">{rf.name}</p>
                          <p className="text-xs text-muted-foreground">{rf.jurisdiction}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Framework Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Short Name</p>
                <p className="text-sm font-medium">{framework.shortName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Jurisdiction</p>
                <p className="text-sm">{framework.jurisdiction}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Status</p>
                <Badge variant={statusColor[framework.status] ?? "blue"}>{framework.status}</Badge>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Risk Level</p>
                <Badge variant={riskColor[framework.riskLevel] ?? "blue"} className="capitalize">{framework.riskLevel}</Badge>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Enforcement Date</p>
                <p className="text-sm">{framework.enforcementDate}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Affected Organizations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{framework.affectedOrgs}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {framework.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
            <p className="text-xs text-amber-800 dark:text-amber-300">
              This is educational guidance only. Always consult qualified legal counsel for compliance decisions affecting your organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

