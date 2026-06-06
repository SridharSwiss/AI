import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import type { CaseStudyData } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  TrendingUp, CheckCircle, Target, Lightbulb, Code2, DollarSign,
  GitBranch, AlertTriangle, Shield, BookOpen, ExternalLink, Star,
  Users, Clock, Layers, Lock, FileText,
} from "lucide-react";

const BASE_URL = "https://sridhar-ai.ch";

const industryColors: Record<string, "blue" | "green" | "amber" | "purple" | "pink"> = {
  Finance: "green",
  Healthcare: "blue",
  FinTech: "amber",
  EdTech: "purple",
  Manufacturing: "pink",
  Education: "blue",
  Software: "blue",
  Media: "purple",
  Retail: "amber",
  Technology: "blue",
  Pharma: "green",
  "Enterprise Software": "amber",
  Logistics: "amber",
  "Real Estate": "green",
  "Creative Technology": "purple",
  Science: "blue",
  Automotive: "pink",
  Industrial: "amber",
};

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study Not Found" };
  const description = cs.businessContext
    ? `${cs.businessContext.slice(0, 120).replace(/\.$/, "")}. ${cs.outcome.slice(0, 80)}`
    : cs.outcome.slice(0, 200);
  return {
    title: `${cs.company} AI Case Study - ${cs.title}`,
    description: description.slice(0, 200),
    alternates: { canonical: `${BASE_URL}/case-studies/${cs.slug}` },
    openGraph: {
      title: `${cs.company} | AIHub Case Study`,
      description: description.slice(0, 200),
      url: `${BASE_URL}/case-studies/${cs.slug}`,
      type: "article",
    },
    keywords: [cs.company, cs.industry, ...cs.tags, "AI case study", "AI ROI", "enterprise AI"],
  };
}

function SectionCard({ icon, title, children, className }: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function BulletList({ items, iconClass = "text-primary" }: { items: string[]; iconClass?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-current ${iconClass}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs: CaseStudyData | undefined = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb
        items={[
          { label: "Case Studies", href: "/case-studies" },
          { label: cs.company },
        ]}
        className="mb-8"
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge variant={industryColors[cs.industry] ?? "blue"}>{cs.industry}</Badge>
          {cs.featured && <Badge variant="purple">Featured</Badge>}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{cs.company}</h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6">{cs.title}</p>

        {/* Metrics banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cs.metrics.map((metric) => (
            <div
              key={metric}
              className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{metric}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Business Context */}
          {(cs.businessContext || cs.strategicDrivers) && (
            <SectionCard icon={<Layers className="w-5 h-5 text-violet-500" />} title="Business Context & Strategic Drivers">
              {cs.businessContext && (
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">{cs.businessContext}</p>
              )}
              {cs.strategicDrivers && cs.strategicDrivers.length > 0 && (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Strategic Drivers</p>
                  <BulletList items={cs.strategicDrivers} iconClass="text-violet-500" />
                </>
              )}
            </SectionCard>
          )}

          {/* Problem */}
          <SectionCard icon={<Target className="w-5 h-5 text-rose-500" />} title="The Problem">
            <p className="text-muted-foreground leading-relaxed text-sm">{cs.problem}</p>
          </SectionCard>

          {/* Solution */}
          <SectionCard icon={<Lightbulb className="w-5 h-5 text-amber-500" />} title="The Solution">
            <p className="text-muted-foreground leading-relaxed text-sm">{cs.solution}</p>
          </SectionCard>

          {/* Technical Architecture */}
          {(cs.techStack || cs.architecture || cs.dataRequirements) && (
            <SectionCard icon={<Code2 className="w-5 h-5 text-blue-500" />} title="Technical Architecture">
              {cs.techStack && cs.techStack.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {cs.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {cs.architecture && (
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Architecture Overview</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.architecture}</p>
                </div>
              )}
              {cs.dataRequirements && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Data Requirements</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.dataRequirements}</p>
                </div>
              )}
            </SectionCard>
          )}

          {/* ROI & Financial Analysis */}
          {(cs.investmentEstimate || cs.annualReturn || cs.roiBreakdown) && (
            <SectionCard icon={<DollarSign className="w-5 h-5 text-emerald-500" />} title="ROI & Financial Analysis">
              {/* Stats bar */}
              {(cs.investmentEstimate || cs.annualReturn || cs.paybackPeriod || cs.roiMultiple) && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {cs.investmentEstimate && (
                    <div className="bg-zinc-50 dark:bg-zinc-800/60 border border-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Investment</p>
                      <p className="text-xs font-semibold leading-tight">{cs.investmentEstimate}</p>
                    </div>
                  )}
                  {cs.annualReturn && (
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 mb-1">Annual Return</p>
                      <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 leading-tight">{cs.annualReturn}</p>
                    </div>
                  )}
                  {cs.paybackPeriod && (
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-blue-700 dark:text-blue-400 mb-1">Payback</p>
                      <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 leading-tight">{cs.paybackPeriod}</p>
                    </div>
                  )}
                  {cs.roiMultiple && (
                    <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-violet-700 dark:text-violet-400 mb-1">ROI Multiple</p>
                      <p className="text-xs font-semibold text-violet-800 dark:text-violet-300 leading-tight">{cs.roiMultiple}</p>
                    </div>
                  )}
                </div>
              )}
              {/* ROI Breakdown table */}
              {cs.roiBreakdown && cs.roiBreakdown.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">ROI Breakdown</p>
                  <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
                    {cs.roiBreakdown.map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-3 bg-white dark:bg-zinc-900">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.category}</p>
                          {item.note && <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>}
                        </div>
                        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex-shrink-0">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>
          )}

          {/* Implementation Journey */}
          {(cs.implementationPhases || cs.implementationTimeline) && (
            <SectionCard icon={<GitBranch className="w-5 h-5 text-amber-500" />} title="Implementation Journey">
              {cs.implementationTimeline && (
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium">Total timeline:</span> {cs.implementationTimeline}
                </p>
              )}
              {cs.implementationPhases && cs.implementationPhases.length > 0 && (
                <div className="space-y-4">
                  {cs.implementationPhases.map((phase, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </div>
                        {i < (cs.implementationPhases?.length ?? 0) - 1 && (
                          <div className="flex-1 w-px border-l border-dashed border-border mt-1" />
                        )}
                      </div>
                      <div className="pb-4 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="text-sm font-semibold">{phase.phase}</p>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{phase.duration}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">{phase.description}</p>
                        {phase.keyOutputs && phase.keyOutputs.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {phase.keyOutputs.map((output) => (
                              <span
                                key={output}
                                className="text-xs px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50"
                              >
                                {output}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          )}

          {/* Challenges */}
          {cs.challenges && cs.challenges.length > 0 && (
            <SectionCard
              icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
              title="Challenges Overcome"
              className="border-amber-200 dark:border-amber-800/50"
            >
              <ul className="space-y-3">
                {cs.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {/* Governance & Oversight */}
          {(cs.governanceFramework || cs.dataPrivacy || cs.humanOversight || cs.regulatoryConsiderations) && (
            <SectionCard icon={<Shield className="w-5 h-5 text-blue-500" />} title="Governance & Oversight">
              {cs.governanceFramework && cs.governanceFramework.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Governance Controls</p>
                  <CheckList items={cs.governanceFramework} />
                </div>
              )}
              {cs.dataPrivacy && cs.dataPrivacy.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Data Privacy Measures</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <CheckList items={cs.dataPrivacy} />
                </div>
              )}
              {cs.humanOversight && (
                <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400 mb-1">Human-in-the-Loop</p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">{cs.humanOversight}</p>
                </div>
              )}
              {cs.regulatoryConsiderations && cs.regulatoryConsiderations.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Regulatory Considerations</p>
                  <BulletList items={cs.regulatoryConsiderations} />
                </div>
              )}
            </SectionCard>
          )}

          {/* Lessons Learned */}
          {(cs.lessonsLearned || cs.whatWorkedWell) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <BookOpen className="w-5 h-5 text-violet-500" />
                  Lessons Learned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {cs.lessonsLearned && cs.lessonsLearned.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Key Lessons</p>
                      <ul className="space-y-2">
                        {cs.lessonsLearned.map((lesson, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-violet-500" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {cs.whatWorkedWell && cs.whatWorkedWell.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">What Worked Well</p>
                      <ul className="space-y-2">
                        {cs.whatWorkedWell.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Outcome */}
          <SectionCard icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} title="The Outcome">
            <p className="text-muted-foreground leading-relaxed text-sm mb-4">{cs.outcome}</p>
            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Key Metrics</p>
              <ul className="space-y-2">
                {cs.metrics.map((metric) => (
                  <li key={metric} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>

          {/* Open Source Resources */}
          {cs.openSourceRepos && cs.openSourceRepos.length > 0 && (
            <SectionCard icon={<Code2 className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />} title="Open Source & Code Resources">
              <div className="space-y-3">
                {cs.openSourceRepos.map((repo) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
                  >
                    <Code2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-primary transition-colors" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{repo.name}</p>
                        {repo.stars && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="w-3 h-3" />{repo.stars}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{repo.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </SectionCard>
          )}

          {/* References */}
          {cs.references && cs.references.length > 0 && (
            <SectionCard icon={<FileText className="w-5 h-5 text-muted-foreground" />} title="References & Further Reading">
              <div className="space-y-2">
                {cs.references.map((ref) => (
                  <a
                    key={ref.url}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors group text-sm"
                  >
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                    <span className="group-hover:text-primary transition-colors">{ref.label}</span>
                  </a>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {cs.tags.map((tag) => (
              <span key={tag} className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick stats */}
          <Card>
            <CardHeader><CardTitle className="text-base">Quick Stats</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Company</p>
                <p className="text-sm font-medium">{cs.company}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Industry</p>
                <Badge variant={industryColors[cs.industry] ?? "blue"}>{cs.industry}</Badge>
              </div>
              {cs.teamSize && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Team Size</p>
                  <div className="flex items-start gap-1.5">
                    <Users className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{cs.teamSize}</p>
                  </div>
                </div>
              )}
              {cs.implementationTimeline && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Timeline</p>
                  <div className="flex items-start gap-1.5">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{cs.implementationTimeline}</p>
                  </div>
                </div>
              )}
              {cs.investmentEstimate && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Investment</p>
                  <p className="text-sm text-muted-foreground">{cs.investmentEstimate}</p>
                </div>
              )}
              {cs.annualReturn && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Annual Return</p>
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{cs.annualReturn}</p>
                </div>
              )}
              {cs.paybackPeriod && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Payback Period</p>
                  <p className="text-sm text-muted-foreground">{cs.paybackPeriod}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Key metrics */}
          <Card>
            <CardHeader><CardTitle className="text-base">Key Metrics</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {cs.metrics.map((metric) => (
                  <li key={metric} className="flex items-start gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{metric}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tech stack sidebar */}
          {cs.techStack && cs.techStack.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base">Tech Stack</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {cs.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Open source links */}
          {cs.openSourceRepos && cs.openSourceRepos.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base">Code Resources</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cs.openSourceRepos.map((repo) => (
                    <Link
                      key={repo.url}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors group"
                    >
                      <Code2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      <span className="group-hover:underline truncate">{repo.name}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
            <p className="text-xs text-amber-800 dark:text-amber-300">
              ROI figures and metrics are based on publicly available data, company disclosures, and reasonable estimates. Always conduct your own due diligence for strategic decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
