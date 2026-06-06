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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const featuredTools = [
  {
    name: "ChatGPT",
    vendor: "OpenAI",
    category: "Language Models",
    description: "Conversational AI for writing, analysis, coding, and problem-solving.",
    tags: ["NLP", "Productivity", "Coding"],
    pricing: "freemium",
    href: "/tools/chatgpt",
    emoji: "💬",
  },
  {
    name: "Claude",
    vendor: "Anthropic",
    category: "Language Models",
    description: "Safety-focused AI assistant with strong reasoning and document analysis.",
    tags: ["NLP", "Safety", "Analysis"],
    pricing: "freemium",
    href: "/tools/claude",
    emoji: "🤖",
  },
  {
    name: "Midjourney",
    vendor: "Midjourney",
    category: "Image Generation",
    description: "High-quality AI image generation from text prompts.",
    tags: ["Image", "Creative", "Design"],
    pricing: "paid",
    href: "/tools/midjourney",
    emoji: "🎨",
  },
  {
    name: "GitHub Copilot",
    vendor: "GitHub / OpenAI",
    category: "Code Assistance",
    description: "AI pair programmer that suggests code completions in your IDE.",
    tags: ["Coding", "IDE", "Productivity"],
    pricing: "paid",
    href: "/tools/github-copilot",
    emoji: "⚡",
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
  { icon: Wrench,    label: "AI Tools",          desc: "82+ tools compared",    href: "/tools",              color: "text-violet-500",  bg: "bg-violet-500/8 dark:bg-violet-500/12" },
  { icon: Building2, label: "Companies",          desc: "AI vendors & startups", href: "/companies",          color: "text-blue-500",    bg: "bg-blue-500/8 dark:bg-blue-500/12" },
  { icon: BookOpen,  label: "Learn",              desc: "Guides for all levels", href: "/learn",              color: "text-emerald-500", bg: "bg-emerald-500/8 dark:bg-emerald-500/12" },
  { icon: BarChart3, label: "Case Studies",       desc: "Real-world results",    href: "/case-studies",       color: "text-amber-500",   bg: "bg-amber-500/8 dark:bg-amber-500/12" },
  { icon: Shield,    label: "Compliance",         desc: "Regulatory guidance",   href: "/compliance",         color: "text-rose-500",    bg: "bg-rose-500/8 dark:bg-rose-500/12" },
  { icon: Briefcase, label: "Consulting Toolkit", desc: "Playbooks & templates", href: "/consulting-toolkit", color: "text-pink-500",    bg: "bg-pink-500/8 dark:bg-pink-500/12" },
];

const pricingVariant: Record<string, "green" | "blue" | "amber" | "purple"> = {
  free:          "green",
  freemium:      "blue",
  paid:          "amber",
  enterprise:    "purple",
  "open-source": "green",
};

function SectionHeading({
  eyebrow,
  eyebrowColor = "text-primary",
  eyebrowIcon: Icon,
  title,
  viewAllHref,
  viewAllLabel,
}: {
  eyebrow: string;
  eyebrowColor?: string;
  eyebrowIcon: React.ElementType;
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
}) {
  return (
    <div className="flex items-end justify-between mb-10 gap-4">
      <div>
        <div className={`flex items-center gap-2 mb-2 text-sm font-semibold ${eyebrowColor}`}>
          <Icon className="w-4 h-4" />
          {eyebrow}
        </div>
        <h2 className="text-headline">{title}</h2>
      </div>
      <Link
        href={viewAllHref}
        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0 group"
      >
        {viewAllLabel}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

export function FeaturedSection() {
  return (
    <div className="container-site section-gap space-y-24">

      {/* ── Section navigation grid ─────────────────── */}
      <ScrollReveal>
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Everything in one place
          </p>
          <h2 className="text-headline mb-10">Your complete AI knowledge base</h2>
        </div>
        <ScrollReveal stagger>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {sectionNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center text-center p-5 rounded-2xl border border-border/50 bg-card hover:border-border hover:-translate-y-1 hover:shadow-[var(--shadow-md)] transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="font-semibold text-sm mb-0.5">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </ScrollReveal>

      {/* ── Featured tools ──────────────────────────── */}
      <ScrollReveal>
        <SectionHeading
          eyebrow="Featured Tools"
          eyebrowIcon={Sparkles}
          title="Popular AI tools right now"
          viewAllHref="/tools"
          viewAllLabel="View all 82+ tools"
        />
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTools.map((tool) => (
              <Link key={tool.name} href={tool.href} className="group block">
                <Card className="h-full group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-card-hover)] group-hover:border-border/80">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/15 flex items-center justify-center text-xl">
                        {tool.emoji}
                      </div>
                      <Badge variant={pricingVariant[tool.pricing]}>
                        {tool.pricing}
                      </Badge>
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors duration-200">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {tool.vendor} · {tool.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </ScrollReveal>

      {/* ── Case studies ────────────────────────────── */}
      <ScrollReveal>
        <SectionHeading
          eyebrow="Real Results"
          eyebrowColor="text-emerald-600 dark:text-emerald-400"
          eyebrowIcon={BarChart3}
          title="AI delivering measurable outcomes"
          viewAllHref="/case-studies"
          viewAllLabel="All case studies"
        />
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredCaseStudies.map((cs) => (
              <Link key={cs.company} href={cs.href} className="group block">
                <Card className="h-full border-l-[3px] border-l-emerald-500/40 group-hover:border-l-emerald-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-card-hover)]">
                  <CardHeader>
                    <Badge variant="green" className="w-fit mb-3">
                      {cs.industry}
                    </Badge>
                    <CardTitle className="text-base group-hover:text-primary transition-colors duration-200">
                      {cs.company}
                    </CardTitle>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {cs.outcome}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cs.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </ScrollReveal>

      {/* ── What's new banner ───────────────────────── */}
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl noise">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-700 to-pink-700" />
          {/* Atmospheric glows */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/8 rounded-full blur-2xl" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative px-8 py-12 md:px-14 md:py-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white/90 text-xs font-semibold mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              What&apos;s New · June 2025
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
              EU AI Act enters force.
              <br />
              <span className="text-white/80">Are you ready?</span>
            </h2>
            <p className="text-white/75 text-lg mb-8 leading-relaxed">
              The world&apos;s first comprehensive AI regulation is now in effect.
              Explore our compliance guide to understand what it means for your organization.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compliance/eu-ai-act"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-700 font-semibold rounded-xl hover:bg-white/92 active:scale-[0.98] transition-all duration-150 shadow-lg"
              >
                Read the EU AI Act guide
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/compliance"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium rounded-xl hover:bg-white/12 active:scale-[0.98] transition-all duration-150 backdrop-blur-sm"
              >
                All compliance topics
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}
