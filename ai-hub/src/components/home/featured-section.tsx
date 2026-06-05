import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  BookOpen,
  Shield,
  Briefcase,
  BarChart3,
  Building2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const featuredTools = [
  {
    name: "ChatGPT",
    vendor: "OpenAI",
    category: "Language Models",
    description: "Conversational AI for writing, analysis, coding, and problem-solving.",
    tags: ["NLP", "Productivity", "Coding"],
    pricing: "freemium",
    href: "/tools/chatgpt",
  },
  {
    name: "Claude",
    vendor: "Anthropic",
    category: "Language Models",
    description: "Safety-focused AI assistant with strong reasoning and document analysis.",
    tags: ["NLP", "Safety", "Analysis"],
    pricing: "freemium",
    href: "/tools/claude",
  },
  {
    name: "Midjourney",
    vendor: "Midjourney",
    category: "Image Generation",
    description: "High-quality AI image generation from text prompts.",
    tags: ["Image", "Creative", "Design"],
    pricing: "paid",
    href: "/tools/midjourney",
  },
  {
    name: "GitHub Copilot",
    vendor: "GitHub / OpenAI",
    category: "Code Assistance",
    description: "AI pair programmer that suggests code completions in your IDE.",
    tags: ["Coding", "IDE", "Productivity"],
    pricing: "paid",
    href: "/tools/github-copilot",
  },
];

const featuredCaseStudies = [
  {
    company: "Mayo Clinic",
    industry: "Healthcare",
    outcome: "30% reduction in diagnostic time",
    description: "Using AI-powered imaging analysis to assist radiologists.",
    href: "/case-studies/mayo-clinic-imaging",
  },
  {
    company: "JPMorgan Chase",
    industry: "Finance",
    outcome: "$150M saved annually",
    description: "AI contract analysis and legal document review automation.",
    href: "/case-studies/jpmorgan-coin",
  },
  {
    company: "Duolingo",
    industry: "EdTech",
    outcome: "40% faster content creation",
    description: "GPT-4 powered adaptive lesson generation for 100+ languages.",
    href: "/case-studies/duolingo-gpt4",
  },
];

const sectionNav = [
  { icon: Wrench, label: "AI Tools", desc: "60+ tools compared", href: "/tools", color: "text-violet-500" },
  { icon: Building2, label: "Companies", desc: "AI vendors & startups", href: "/companies", color: "text-blue-500" },
  { icon: BookOpen, label: "Learn", desc: "Guides for all levels", href: "/learn", color: "text-emerald-500" },
  { icon: BarChart3, label: "Case Studies", desc: "Real-world results", href: "/case-studies", color: "text-amber-500" },
  { icon: Shield, label: "Compliance", desc: "Regulatory guidance", href: "/compliance", color: "text-rose-500" },
  { icon: Briefcase, label: "Consulting Toolkit", desc: "Playbooks & templates", href: "/consulting-toolkit", color: "text-pink-500" },
];

const pricingColor: Record<string, string> = {
  free: "green",
  freemium: "blue",
  paid: "amber",
  enterprise: "purple",
  "open-source": "green",
};

export function FeaturedSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      {/* Section navigation */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Everything in one place</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {sectionNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col items-center text-center p-5 rounded-xl border border-border/60 bg-card hover:bg-accent hover:border-border transition-all duration-200 hover:shadow-sm"
            >
              <item.icon className={`w-6 h-6 mb-2 ${item.color} group-hover:scale-110 transition-transform`} />
              <span className="font-semibold text-sm">{item.label}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured tools */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Featured Tools</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Popular AI tools right now</h2>
          </div>
          <Link
            href="/tools"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View all tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <Card className="h-full group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20 flex items-center justify-center text-lg font-bold text-violet-600">
                      {tool.name[0]}
                    </div>
                    <Badge variant={pricingColor[tool.pricing] as "green" | "blue" | "amber"}>
                      {tool.pricing}
                    </Badge>
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {tool.name}
                  </CardTitle>
                  <CardDescription className="text-xs">{tool.vendor} · {tool.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured case studies */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Real Results</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">AI delivering measurable outcomes</h2>
          </div>
          <Link
            href="/case-studies"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            All case studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCaseStudies.map((cs) => (
            <Link key={cs.company} href={cs.href}>
              <Card className="h-full group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-l-4 border-l-emerald-500/50 hover:border-l-emerald-500">
                <CardHeader>
                  <Badge variant="green" className="w-fit mb-2">{cs.industry}</Badge>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {cs.company}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {cs.outcome}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{cs.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* What's new banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-pink-700 p-8 md:p-12 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            What&apos;s New · June 2025
          </div>
          <h2 className="text-3xl font-bold mb-3">
            EU AI Act enters force. Are you ready?
          </h2>
          <p className="text-white/80 text-lg mb-6">
            The world&apos;s first comprehensive AI regulation is now in effect.
            Explore our compliance guide to understand what it means for your organization.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/compliance/eu-ai-act"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-violet-700 font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              Read the EU AI Act guide
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/compliance"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/40 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              All compliance topics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
