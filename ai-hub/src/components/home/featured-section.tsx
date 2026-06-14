import React from "react";
import Link from "next/link";
import { ArrowRight, Wrench, BookOpen, Shield, Briefcase, BarChart3, Building2, Sparkles, MessageSquare, Code2, Image, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const TOOL_ICONS: Record<string, React.ElementType> = {
  "Language Models": MessageSquare,
  "Code Assistance": Code2,
  "Image Generation": Image,
};

const TOOL_COLORS: Record<string, string> = {
  "Language Models": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "Code Assistance": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Image Generation": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
};

const featuredTools = [
  { name: "ChatGPT",       vendor: "OpenAI",         category: "Language Models", description: "Conversational AI for writing, analysis, coding, and problem-solving.",          tags: ["NLP", "Productivity", "Coding"], pricing: "freemium", href: "/tools/chatgpt" },
  { name: "Claude",        vendor: "Anthropic",      category: "Language Models", description: "Safety-focused AI assistant with strong reasoning and document analysis.",       tags: ["NLP", "Safety", "Analysis"],    pricing: "freemium", href: "/tools/claude" },
  { name: "Midjourney",    vendor: "Midjourney",     category: "Image Generation",description: "High-quality AI image generation from text prompts.",                          tags: ["Image", "Creative", "Design"],  pricing: "paid",     href: "/tools/midjourney" },
  { name: "GitHub Copilot",vendor: "GitHub / OpenAI",category: "Code Assistance", description: "AI pair programmer that suggests code completions in your IDE.",                tags: ["Coding", "IDE", "Productivity"],pricing: "paid",     href: "/tools/github-copilot" },
];

const featuredCaseStudies = [
  { company: "Mayo Clinic",    industry: "Healthcare", outcome: "30% reduction in diagnostic time", description: "Using AI-powered imaging analysis to assist radiologists.",                         href: "/case-studies/mayo-clinic-imaging" },
  { company: "JPMorgan Chase", industry: "Finance",    outcome: "$150M saved annually",            description: "AI contract analysis and legal document review automation.",                       href: "/case-studies/jpmorgan-coin" },
  { company: "Duolingo",       industry: "EdTech",     outcome: "40% faster content creation",      description: "GPT-4 powered adaptive lesson generation for 100+ languages.",                    href: "/case-studies/duolingo-gpt4" },
];

const sectionNav = [
  {
    icon: Wrench,    label: "AI Tools",          href: "/tools",
    iconCls: "bg-violet-500/10 dark:bg-violet-500/[0.18] text-violet-500",
    desc: "Every major AI tool, side by side.",
    body: "Filter by category, pricing model, and use case. Freemium to enterprise — 107 tools across 15 categories with verified specs.",
    stat: "107 tools · 15 categories",
  },
  {
    icon: Building2, label: "Companies",          href: "/companies",
    iconCls: "bg-blue-500/10 dark:bg-blue-500/[0.18] text-blue-500",
    desc: "40 vendors profiled.",
    body: "From OpenAI and Anthropic to niche specialists — funding stage, focus area, and key products in one view.",
    stat: "40 companies",
  },
  {
    icon: BarChart3, label: "Case Studies",       href: "/case-studies",
    iconCls: "bg-amber-500/10 dark:bg-amber-500/[0.18] text-amber-500",
    desc: "ROI data, not press releases.",
    body: "36 real deployments with measured outcomes — cost saved, time reduced, accuracy gained — across healthcare, finance, and more.",
    stat: "36 case studies",
  },
  {
    icon: BookOpen,  label: "Learn",              href: "/learn",
    iconCls: "bg-emerald-500/10 dark:bg-emerald-500/[0.18] text-emerald-500",
    desc: "Structured paths from zero to production.",
    body: "Courses, certifications, video guides, and books — curated for beginners through ML engineers. Updated as the field moves.",
    stat: "72 resources · all levels",
  },
  {
    icon: Shield,    label: "Compliance",         href: "/compliance",
    iconCls: "bg-rose-500/10 dark:bg-rose-500/[0.18] text-rose-500",
    desc: "18 frameworks. Deadlines tracked.",
    body: "EU AI Act, GDPR, NIST RMF, ISO 42001 and more — obligations mapped, enforcement dates flagged.",
    stat: "18 frameworks",
  },
  {
    icon: Briefcase, label: "Consulting Toolkit", href: "/consulting-toolkit",
    iconCls: "bg-pink-500/10 dark:bg-pink-500/[0.18] text-pink-500",
    desc: "Playbooks built for practitioners.",
    body: "Assessment templates, implementation checklists, and pilot frameworks drawn from Big4 and MBB methodology — ready to deploy.",
    stat: "4 phase playbook",
  },
];

const personas = [
  { role: "Builder", icon: Code2, desc: "Compare APIs, pricing, and capabilities across 107 tools.", href: "/tools", color: "border-violet-500", barColor: "bg-violet-500" },
  { role: "Executive", icon: BarChart3, desc: "ROI evidence and vendor comparison from 36 case studies.", href: "/case-studies", color: "border-blue-500", barColor: "bg-blue-500" },
  { role: "Compliance Officer", icon: Shield, desc: "18 frameworks mapped. Deadlines tracked.", href: "/compliance", color: "border-amber-500", barColor: "bg-amber-500" },
  { role: "Learner", icon: GraduationCap, desc: "72 resources from beginner to production ML.", href: "/learn", color: "border-emerald-500", barColor: "bg-emerald-500" },
];

const pricingVariant: Record<string, "green" | "blue" | "amber" | "purple"> = {
  free: "green", freemium: "blue", paid: "amber", enterprise: "purple", "open-source": "green",
};

function SectionHeading({ eyebrow, eyebrowColor = "text-primary", eyebrowIcon: Icon, title, viewAllHref, viewAllLabel }: {
  eyebrow: string; eyebrowColor?: string; eyebrowIcon: React.ElementType;
  title: string; viewAllHref: string; viewAllLabel: string;
}) {
  return (
    <div className="flex items-end justify-between mb-10 gap-4">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-border" />
          <div className={`flex items-center gap-2 text-eyebrow ${eyebrowColor}`}>
            <Icon className="w-3.5 h-3.5" />{eyebrow}
          </div>
          <div className="h-px w-8 bg-border" />
        </div>
        <h2 className="text-headline">{title}</h2>
      </div>
      <Link href={viewAllHref} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0 group">
        {viewAllLabel}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

export function FeaturedSection() {
  return (
    <div className="container-site section-gap space-y-24">

      <ScrollReveal>
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-border/60" />
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70 px-1">
              <Sparkles className="w-3 h-3" />
              Everything in one place
            </span>
            <div className="h-px w-8 bg-border/60" />
          </div>
          <h2 className="text-headline">Your complete AI knowledge base</h2>
        </div>
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectionNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-2xl glass-card min-h-[200px] transition-all duration-200 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
              >
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110 group-hover:shadow-md ${item.iconCls}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-white/10 dark:bg-white/8 text-muted-foreground border border-white/10">
                      {item.stat}
                    </span>
                  </div>
                  <p className="text-base font-bold tracking-tight mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">{item.desc}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.body}</p>
                  <div className="flex items-center gap-1 mt-5 text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-200">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </ScrollReveal>

      <ScrollReveal>
        <SectionHeading eyebrow="Featured Tools" eyebrowIcon={Sparkles} title="Popular AI tools right now" viewAllHref="/tools" viewAllLabel="View all 107+ tools" />
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTools.map((tool) => (
              <Link key={tool.name} href={tool.href} className="group block">
                <Card className="h-full glass-card group-hover:-translate-y-1.5 group-hover:border-white/25 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${TOOL_COLORS[tool.category] ?? "bg-muted text-muted-foreground"}`}>
                        {React.createElement(TOOL_ICONS[tool.category] ?? MessageSquare, { className: "w-5 h-5" })}
                      </div>
                      <Badge variant={pricingVariant[tool.pricing]}>{tool.pricing}</Badge>
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors duration-200">{tool.name}</CardTitle>
                    <CardDescription className="text-xs">{tool.vendor} · {tool.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{tool.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (<span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{tag}</span>))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </ScrollReveal>

      <ScrollReveal>
        <SectionHeading eyebrow="Real Results" eyebrowColor="text-emerald-600 dark:text-emerald-400" eyebrowIcon={BarChart3} title="AI delivering measurable outcomes" viewAllHref="/case-studies" viewAllLabel="All case studies" />
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {featuredCaseStudies.map((cs) => (
              <Link key={cs.company} href={cs.href} className="group block">
                <Card className="h-full glass-card border-l-[3px] border-l-emerald-500/50 group-hover:border-l-emerald-400 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
                  <CardHeader>
                    <Badge variant="green" className="w-fit mb-3">{cs.industry}</Badge>
                    <CardTitle className="text-base group-hover:text-primary transition-colors duration-200">{cs.company}</CardTitle>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{cs.outcome}</p>
                  </CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{cs.description}</p></CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 bg-border" />
            <p className="text-eyebrow text-muted-foreground">Find your path</p>
            <div className="h-px w-8 bg-border" />
          </div>
          <h2 className="text-headline mb-10">Built for every AI role</h2>
        </div>
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {personas.map((persona) => (
              <Link key={persona.role} href={persona.href} className={`relative overflow-hidden rounded-xl glass-card border-2 p-6 group cursor-pointer hover:-translate-y-1.5 transition-all duration-200 hover:${persona.color} hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]`}>
                <div className="mb-4">
                  <persona.icon className="w-7 h-7 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                </div>
                <div className="text-base font-bold mb-2">{persona.role}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{persona.desc}</div>
                <div className={`absolute bottom-0 left-0 h-[3px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${persona.barColor}`} />
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </ScrollReveal>

      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl ring-gradient">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-purple-700 to-pink-700" />
          <div className="absolute inset-0 mesh-gradient opacity-60" />
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="relative px-5 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white/90 text-xs font-semibold mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              What&apos;s New · 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight tracking-tight">
              EU AI Act enters force.<br /><span className="text-white/80">Are you ready?</span>
            </h2>
            <p className="text-white/75 text-base mb-8 leading-relaxed">
              The world&apos;s first comprehensive AI regulation is now in effect. Explore our compliance guide to understand what it means for your organization.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/compliance/eu-ai-act" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-700 font-semibold rounded-xl hover:bg-white/92 active:scale-[0.98] transition-all duration-150 shadow-lg">
                Read the EU AI Act guide
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/compliance" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium rounded-xl hover:bg-white/12 active:scale-[0.98] transition-all duration-150 backdrop-blur-sm">
                All compliance topics
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}
