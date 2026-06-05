import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Building2, TrendingUp, Shield, BookOpen, Library, FileText, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contribute to AIHub",
  description: "Help us grow the most comprehensive AI knowledge platform. Submit tools, companies, case studies, and more.",
};

const contributionTypes = [
  {
    icon: Wrench,
    title: "AI Tool",
    description: "Know an AI tool that should be listed? Submit its name, category, pricing, and a brief description.",
    fields: ["Tool name & website", "Category (Code, Image, Voice, etc.)", "Pricing model", "Key use cases", "Pros & cons"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Building2,
    title: "AI Company",
    description: "A company building meaningful AI products or research that isn't yet in our directory.",
    fields: ["Company name, HQ & founded year", "Focus area & stage (Public/Private/Research Lab)", "Key products & models", "Funding (if public)", "Brief history"],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Case Study",
    description: "A real-world AI implementation with verifiable outcomes — from any industry.",
    fields: ["Company & industry", "Problem statement", "AI solution used", "Measurable outcomes & metrics", "Source / public reference"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Compliance Framework",
    description: "An AI regulation, standard, or governance framework we haven't covered yet.",
    fields: ["Framework name & jurisdiction", "Status (in force / proposed)", "Key requirements summary", "Affected organizations", "Official source link"],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: BookOpen,
    title: "Learning Resource",
    description: "A high-quality course, YouTube series, certification, or tutorial on AI.",
    fields: ["Title & provider", "Type (course / video / certification)", "Level (beginner / intermediate / advanced)", "Free or paid", "Link"],
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Library,
    title: "Research Document",
    description: "A research paper, whitepaper, government report, or industry study on AI.",
    fields: ["Title & source organization", "Year published", "Category (Research Paper, Industry Report, etc.)", "Brief summary", "Public link"],
    color: "from-indigo-500 to-blue-500",
  },
];

export default function ContributePage() {
  return (
    <>
      <PageHeader
        eyebrow="Contribute"
        title="Help Build the Best AI Knowledge Hub"
        description="AIHub is a community effort. If you know something we've missed — a tool, company, case study, or framework — we want to hear from you."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* How it works */}
        <section>
          <h2 className="text-2xl font-bold mb-6">How to Contribute</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Find a Gap", desc: "Browse the directory and find something missing — a tool, company, case study, or resource." },
              { step: "2", title: "Gather Details", desc: "Collect the key facts using the field guides below. Public sources only — no proprietary info." },
              { step: "3", title: "Submit via GitHub", desc: "Open an issue or pull request on our GitHub repository with your proposed addition." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contribution types */}
        <section>
          <h2 className="text-2xl font-bold mb-6">What You Can Submit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {contributionTypes.map((ct) => (
              <Card key={ct.title} className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${ct.color} flex items-center justify-center`}>
                      <ct.icon className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-base">{ct.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{ct.description}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Required fields</p>
                  <ul className="space-y-1">
                    {ct.fields.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Guidelines */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Contribution Guidelines</h2>
          <div className="space-y-3">
            {[
              "All submissions must be based on publicly available information with verifiable sources.",
              "No self-promotion — if you work for a company, disclose this in your submission.",
              "Content must be accurate, neutral in tone, and free of marketing language.",
              "Case studies require at least one verifiable metric from a public source (press release, earnings call, research paper, etc.).",
              "Compliance entries must reference official government or standards body sources.",
              "We reserve the right to edit submissions for clarity, tone, and accuracy before publishing.",
            ].map((g, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{g}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Notice */}
        <section className="flex items-start gap-4 p-5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Submission Process Coming Soon</p>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              A formal submission form is under development. In the meantime, you can open an issue on our GitHub repository describing your proposed addition using the field guides above.
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
