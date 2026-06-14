import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Users, Globe, Zap, Shield, BookOpen, TrendingUp } from "lucide-react";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "About AIHub",
  description: "AIHub is the independent, curated AI knowledge platform - covering 107+ tools, 40+ companies, 18 compliance frameworks, and 25+ case studies.",
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: { title: "About AIHub - The AI Knowledge Platform", description: "AIHub is the independent, curated AI knowledge platform - 107+ tools, 40+ companies, 18 compliance frameworks, and 25+ case studies.", url: `${BASE_URL}/about`, type: "website" },
};

const values = [
  { icon: Target,  title: "Curated, Not Crawled",    description: "Every tool, company, and resource is hand-selected and verified. We prioritize quality and accuracy over volume." },
  { icon: Users,  title: "For Every Audience",        description: "Whether you're a curious beginner, a practitioner building AI systems, a manager evaluating vendors, or a C-suite executive setting strategy - AIHub has content for you." },
  { icon: Shield, title: "Independent & Unbiased",    description: "We are not affiliated with any AI company or vendor. Our goal is to give you honest, balanced information to make informed decisions." },
  { icon: Globe,  title: "Global Coverage",           description: "AI is happening everywhere. We track developments across the US, EU, UK, China, and beyond - including regulatory frameworks from every major jurisdiction." },
];

const sections = [
  { icon: Zap,        label: "AI Tools Directory", href: "/tools",        description: "107+ tools across every category" },
  { icon: TrendingUp, label: "Case Studies",        href: "/case-studies", description: "26 real-world implementations with measured outcomes" },
  { icon: Shield,     label: "Compliance",          href: "/compliance",   description: "17 regulatory frameworks explained clearly" },
  { icon: BookOpen,   label: "Learn AI",             href: "/learn",        description: "20+ curated courses, videos, and certifications" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader accent="violet" eyebrow="About" title="The All-in-One AI Knowledge Platform" description="AIHub brings together everything you need to understand, evaluate, and navigate the AI landscape - from tools and companies to compliance, learning, and real-world case studies." />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section className="animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">Artificial intelligence is transforming every industry, government, and profession at an unprecedented pace. But the information landscape is fragmented, jargon-heavy, and often biased toward selling products rather than building understanding.</p>
            <p className="text-muted-foreground leading-relaxed mt-4">AIHub was built to change that. We aggregate, curate, and explain the AI landscape in one place - covering the tools practitioners use, the companies building the technology, the regulations shaping its deployment, the research driving progress, and the real-world case studies proving business value.</p>
            <p className="text-muted-foreground leading-relaxed mt-4">Our content is designed for four audiences: beginners who want to understand AI without a computer science degree, practitioners who are building AI-powered products, managers who need to evaluate AI investments, and executives who are setting AI strategy for their organizations.</p>
          </div>
        </section>
        <section className="animate-fade-up delay-100">
          <h2 className="text-2xl font-bold mb-6">What’s Inside</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map((s) => (
              <Link key={s.href} href={s.href}>
                <Card className="glass-card rounded-2xl group hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_16px_48px_rgba(0,0,0,0.32)] transition-all duration-200 cursor-pointer h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <s.icon className="w-4 h-4 text-primary" />
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">{s.label}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{s.description}</p></CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        <section className="animate-fade-up delay-150">
          <h2 className="text-2xl font-bold mb-6">Our Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="glass-card p-6 rounded-2xl">
          <h2 className="font-semibold mb-3">Content Disclaimer</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">AIHub content is curated for educational and informational purposes. Tool descriptions, company profiles, and compliance summaries are based on publicly available information and may not reflect the most recent changes. Always verify information with official sources before making business, legal, or compliance decisions. We are not affiliated with any of the companies or products listed.</p>
        </section>
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-3">Help Us <span className="gradient-text-vivid">Improve</span></h2>
          <p className="text-muted-foreground mb-6">Found an error? Know a tool we’re missing? Want to contribute a case study?</p>
          <Link href="/contribute" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium glow-primary-sm hover:bg-primary/90 transition-colors">Contribute to AIHub</Link>
        </section>
      </div>
    </>
  );
}
