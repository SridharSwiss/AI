import { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { TrendingUp, CheckCircle, Target, Lightbulb } from "lucide-react";

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
};

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: `${cs.company} — Case Study`,
    description: cs.title,
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb
        items={[
          { label: "Case Studies", href: "/case-studies" },
          { label: cs.company },
        ]}
        className="mb-8"
      />

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge variant={industryColors[cs.industry] ?? "blue"}>{cs.industry}</Badge>
          {cs.featured && <Badge variant="purple">Featured</Badge>}
        </div>
        <h1 className="text-3xl font-bold mb-2">{cs.company}</h1>
        <p className="text-xl text-muted-foreground mb-6">{cs.title}</p>

        {/* Metrics banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cs.metrics.map((metric) => (
            <div
              key={metric}
              className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50"
            >
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{metric}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-500" />
              The Problem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{cs.problem}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              The Solution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{cs.solution}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              The Outcome
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-6">{cs.outcome}</p>
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
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {cs.tags.map((tag) => (
            <span key={tag} className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

