import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { complianceFrameworks } from "@/data/compliance";
import type { RiskTier, IndustryImpact, ComplianceTimeline } from "@/data/compliance";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  Shield, CheckCircle, ExternalLink, AlertCircle, ArrowRight,
  XCircle, AlertTriangle, Clock, Building2, Users, Ban, Lock,
  BarChart3, MapPin, Calendar,
} from "lucide-react";

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

const tierStyles: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  prohibited: { bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-300 dark:border-red-700", text: "text-red-800 dark:text-red-300", badge: "bg-red-600 text-white" },
  high: { bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-300 dark:border-amber-700", text: "text-amber-800 dark:text-amber-300", badge: "bg-amber-500 text-white" },
  limited: { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-300 dark:border-blue-700", text: "text-blue-800 dark:text-blue-300", badge: "bg-blue-500 text-white" },
  minimal: { bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-300 dark:border-emerald-700", text: "text-emerald-800 dark:text-emerald-300", badge: "bg-emerald-500 text-white" },
  "n/a": { bg: "bg-zinc-50 dark:bg-zinc-900", border: "border-zinc-200 dark:border-zinc-700", text: "text-zinc-600 dark:text-zinc-400", badge: "bg-zinc-400 text-white" },
};

const impactStyles: Record<string, string> = {
  critical: "bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800",
  high: "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
  medium: "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  low: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700",
};

const timelineStyles: Record<string, { dot: string; line: string }> = {
  past: { dot: "bg-zinc-400 dark:bg-zinc-600", line: "border-zinc-300 dark:border-zinc-700" },
  current: { dot: "bg-blue-500", line: "border-blue-300 dark:border-blue-700" },
  upcoming: { dot: "bg-amber-400", line: "border-amber-200 dark:border-amber-800" },
};

function RiskTierCard({ tier }: { tier: RiskTier }) {
  const s = tierStyles[tier.level] ?? tierStyles["n/a"];
  return (
    <div className={`rounded-xl border p-4 ${s.bg} ${s.border}`}>
      <div className="flex items-center justify-between mb-2">
        <p className={`font-semibold text-sm ${s.text}`}>{tier.name}</p>
        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${s.badge}`}>
          {tier.level}
        </span>
      </div>
      <p className={`text-xs mb-3 ${s.text} opacity-90`}>{tier.description}</p>
      {tier.examples.length > 0 && (
        <div className="mb-2">
          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${s.text} opacity-70`}>Examples</p>
          <ul className="space-y-0.5">
            {tier.examples.map((ex) => (
              <li key={ex} className={`text-xs ${s.text} opacity-80`}>• {ex}</li>
            ))}
          </ul>
        </div>
      )}
      {tier.requirements && tier.requirements.length > 0 && (
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${s.text} opacity-70`}>Requirements</p>
          <ul className="space-y-0.5">
            {tier.requirements.map((r) => (
              <li key={r} className={`text-xs ${s.text} opacity-80`}>✓ {r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function IndustryImpactRow({ item }: { item: IndustryImpact }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0 border-border">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{item.sector}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.notes}</p>
      </div>
      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 capitalize ${impactStyles[item.impact]}`}>
        {item.impact}
      </span>
    </div>
  );
}

function TimelineMilestone({ item }: { item: ComplianceTimeline }) {
  const s = timelineStyles[item.type];
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${s.dot}`} />
        <div className={`flex-1 w-px border-l border-dashed mt-1 ${s.line}`} />
      </div>
      <div className="pb-4 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{item.date}</p>
        <p className="text-sm">{item.milestone}</p>
      </div>
    </div>
  );
}

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
          <h1 className="text-3xl font-bold mb-2">{framework.name}</h1>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Badge variant={statusColor[framework.status] ?? "blue"}>{framework.status}</Badge>
            <Badge variant={riskColor[framework.riskLevel] ?? "blue"} className="capitalize">{framework.riskLevel} risk</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />{framework.jurisdiction}
            </span>
          </div>
          {framework.enforcingAuthority && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />{framework.enforcingAuthority}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />{framework.enforcementDate}
          </p>
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

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { icon: <Shield className="w-4 h-4" />, label: "Status", value: framework.status },
          { icon: <AlertCircle className="w-4 h-4" />, label: "Risk Level", value: framework.riskLevel.charAt(0).toUpperCase() + framework.riskLevel.slice(1) },
          { icon: <MapPin className="w-4 h-4" />, label: "Jurisdiction", value: framework.jurisdiction },
          { icon: <Clock className="w-4 h-4" />, label: "Enforcement", value: framework.enforcementDate },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-zinc-900 border border-border rounded-xl p-3 text-center">
            <div className="flex justify-center text-muted-foreground mb-1">{s.icon}</div>
            <p className="text-xs text-muted-foreground mb-0.5">{s.label}</p>
            <p className="text-sm font-semibold leading-tight">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Risk alert */}
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
          {/* Overview */}
          <Card>
            <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{framework.description}</p>
              {framework.scope && (
                <div className="mt-4 p-3 rounded-lg bg-muted/60 border border-border">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Scope</p>
                  <p className="text-sm">{framework.scope}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Applicability */}
          {(framework.whoIsAffected || framework.whoIsExempt) && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" />Applicability</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {framework.whoIsAffected && (
                  <div>
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />Who Is Affected
                    </p>
                    <ul className="space-y-1.5">
                      {framework.whoIsAffected.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {framework.whoIsExempt && (
                  <div>
                    <p className="text-sm font-semibold text-zinc-500 mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />Who Is Exempt
                    </p>
                    <ul className="space-y-1.5">
                      {framework.whoIsExempt.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 flex-shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Key Prohibitions */}
          {framework.keyProhibitions && (
            <Card className="border-red-200 dark:border-red-800/50">
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                  <Ban className="w-5 h-5" />Key Prohibitions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {framework.keyProhibitions.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Risk Tiers */}
          {framework.riskTiers && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5" />Risk Tier Classification</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {framework.riskTiers.map((tier) => (
                    <RiskTierCard key={tier.name} tier={tier} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Key Requirements */}
          <Card>
            <CardHeader><CardTitle>Key Requirements</CardTitle></CardHeader>
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

          {/* Guardrails */}
          {framework.guardrails && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5" />Guardrails & Operational Controls</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {framework.guardrails.map((g) => (
                    <li key={g} className="flex items-start gap-3">
                      <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{g}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Technical Requirements */}
          {framework.technicalRequirements && (
            <Card>
              <CardHeader><CardTitle>Technical Requirements</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {framework.technicalRequirements.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{r}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Compliance Roadmap */}
          {framework.complianceRoadmap && (
            <Card>
              <CardHeader><CardTitle>Compliance Roadmap</CardTitle></CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {framework.complianceRoadmap.map((step, i) => (
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

          {/* Implementation Guidance */}
          {framework.implementationGuidance && (
            <Card>
              <CardHeader><CardTitle>Implementation Guidance</CardTitle></CardHeader>
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

          {/* Industry Impact */}
          {framework.industryImpact && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5" />Industry Impact</CardTitle></CardHeader>
              <CardContent>
                <div>
                  {framework.industryImpact.map((item) => (
                    <IndustryImpactRow key={item.sector} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          {framework.timeline && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" />Regulatory Timeline</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-3 text-xs text-muted-foreground">
                  {[
                    { type: "past", label: "Past" },
                    { type: "current", label: "Current" },
                    { type: "upcoming", label: "Upcoming" },
                  ].map(({ type, label }) => (
                    <span key={type} className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${timelineStyles[type].dot}`} />
                      {label}
                    </span>
                  ))}
                </div>
                <div>
                  {framework.timeline.map((item, i) => (
                    <TimelineMilestone key={i} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notable Enforcement Cases */}
          {framework.notableEnforcementCases && (
            <Card className="border-amber-200 dark:border-amber-800/50">
              <CardHeader>
                <CardTitle className="text-amber-700 dark:text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />Notable Enforcement Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {framework.notableEnforcementCases.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Penalties */}
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
              <CardHeader><CardTitle>Related Frameworks</CardTitle></CardHeader>
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
            <CardHeader><CardTitle className="text-base">Framework Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Short Name", value: framework.shortName },
                { label: "Jurisdiction", value: framework.jurisdiction },
                { label: "Enforcement Date", value: framework.enforcementDate },
                ...(framework.enforcingAuthority ? [{ label: "Enforcing Authority", value: framework.enforcingAuthority }] : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
                  <p className="text-sm">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Status</p>
                <Badge variant={statusColor[framework.status] ?? "blue"}>{framework.status}</Badge>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Risk Level</p>
                <Badge variant={riskColor[framework.riskLevel] ?? "blue"} className="capitalize">{framework.riskLevel}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Affected Organizations</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{framework.affectedOrgs}</p>
            </CardContent>
          </Card>

          {framework.exposureAreas && (
            <Card>
              <CardHeader><CardTitle className="text-base">Exposure Areas</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {framework.exposureAreas.map((area) => (
                    <li key={area} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />{area}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader><CardTitle className="text-base">Tags</CardTitle></CardHeader>
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
