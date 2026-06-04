import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Case Studies",
  description: "Real-world AI implementations with measured outcomes.",
};

const caseStudies = [
  { company: "Mayo Clinic", industry: "Healthcare", problem: "Radiologists facing overwhelming scan volumes with fatigue-related error risk.", solution: "AI-powered imaging analysis assistant integrated with PACS workflow.", outcome: "30% reduction in diagnostic time, 15% improvement in early detection rates.", tags: ["Healthcare", "Computer Vision", "Workflow"], level: "manager" },
  { company: "JPMorgan Chase", industry: "Finance", problem: "500,000+ commercial loan agreements requiring manual legal review — 360,000 hours/year.", solution: "Contract Intelligence (COIN) platform using NLP to review documents.", outcome: "$150M+ saved annually; 360,000 hours of lawyer time freed per year.", tags: ["Finance", "NLP", "Legal", "Automation"], level: "executive" },
  { company: "Duolingo", industry: "EdTech", problem: "Content creation bottleneck: needed 100+ language course updates monthly.", solution: "GPT-4 powered lesson generation with human review pipeline.", outcome: "40% faster content creation; launched 7 new language courses in 6 months.", tags: ["EdTech", "LLM", "Content Generation"], level: "manager" },
  { company: "Klarna", industry: "FinTech", problem: "Customer service handling 10M+ contacts across 35 languages.", solution: "AI assistant (powered by OpenAI) handling full customer service interactions.", outcome: "2/3 of all chats now AI-handled; $40M annual savings; 82% customer satisfaction.", tags: ["FinTech", "Customer Service", "Automation"], level: "executive" },
  { company: "Airbus", industry: "Manufacturing", problem: "Aircraft wiring harness design taking 6+ months, error-prone.", solution: "Generative AI design assistant trained on 50 years of engineering docs.", outcome: "Design time reduced from 6 months to 2 weeks; 90% fewer errors.", tags: ["Manufacturing", "Design", "Engineering"], level: "executive" },
  { company: "Khan Academy", industry: "Education", problem: "Students lack personalized 1-on-1 tutoring due to access and cost.", solution: "Khanmigo AI tutor using GPT-4 with Socratic teaching methodology.", outcome: "1M+ students using AI tutoring; measurable learning gains vs. passive video.", tags: ["Education", "Tutoring", "LLM"], level: "beginner" },
];

const industryColors: Record<string, "blue" | "green" | "amber" | "purple" | "pink"> = {
  Healthcare: "blue", Finance: "green", EdTech: "purple", FinTech: "amber",
  Manufacturing: "pink", Education: "blue",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="AI Delivering Real Business Value"
        description="Verified implementations with measured outcomes across industries."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {["All Industries", "Healthcare", "Finance", "EdTech", "Manufacturing", "Retail", "Government"].map((f) => (
            <button key={f} className="px-4 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-accent transition-colors first:bg-primary first:text-primary-foreground first:border-transparent">
              {f}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {caseStudies.length} case studies · <span className="text-amber-600 dark:text-amber-400">⚠ Sample data — needs ongoing curation with sources</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs) => (
            <Card key={cs.company} className="group hover:shadow-md transition-all duration-200 border-l-4 border-l-emerald-500/40 hover:border-l-emerald-500">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={industryColors[cs.industry] ?? "blue"}>{cs.industry}</Badge>
                  <Badge variant="outline" className="text-xs">{cs.level}</Badge>
                </div>
                <CardTitle className="text-lg">{cs.company}</CardTitle>
                <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-4 h-4 flex-shrink-0" />
                  {cs.outcome}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Problem</p>
                  <p className="text-sm text-muted-foreground">{cs.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Solution</p>
                  <p className="text-sm text-muted-foreground">{cs.solution}</p>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
