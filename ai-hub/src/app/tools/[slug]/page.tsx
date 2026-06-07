import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "@/data/tools";
import type { PricingTier } from "@/data/tools";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  ExternalLink, CheckCircle, XCircle, ArrowRight,
  DollarSign, Users, TrendingUp, Cpu, Globe, Layers,
  Calendar, Zap, Star,
  MessageSquare, Code2, Image, Video, Mic2, SearchCheck,
  Server, LayoutGrid, Rocket, Pen, BarChart2, Headphones, Bot,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Language Models":   MessageSquare,
  "Code Assistance":   Code2,
  "Image Generation":  Image,
  "Video Generation":  Video,
  "Voice & Audio":     Mic2,
  "Search & Research": SearchCheck,
  "Infrastructure":    Server,
  "Frameworks":        Layers,
  "Platforms":         LayoutGrid,
  "APIs":              Zap,
  "Productivity":      Rocket,
  "Design":            Pen,
  "Data & Analytics":  BarChart2,
  "Customer Service":  Headphones,
  "Autonomous Agents": Bot,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Language Models":   "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "Code Assistance":   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Image Generation":  "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "Video Generation":  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "Voice & Audio":     "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Search & Research": "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  "Platforms":         "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  "APIs":              "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Productivity":      "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Design":            "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  "Data & Analytics":  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Customer Service":  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
};

const pricingBadge: Record<string, "green" | "blue" | "amber" | "purple"> = {
  Free: "green",
  Freemium: "blue",
  Paid: "amber",
  Enterprise: "purple",
};

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-bold text-sm">{tier.name}</p>
        <p className="text-sm font-semibold text-primary">{tier.price}</p>
      </div>
      <ul className="space-y-1.5">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

const BASE_URL = "https://sridhar-ai.ch";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return { title: "Tool Not Found" };
  // Answer-first meta description for GEO/AIO eligibility
  const priceSummary = tool.pricingTiers
    ? `Pricing from ${tool.pricingTiers[0]?.price ?? "varies"}.`
    : `${tool.pricing} tool.`;
  const desc = `${tool.name} is ${tool.tagline.toLowerCase()}. ${priceSummary} ${tool.description.slice(0, 80)}...`;
  return {
    title: `What is ${tool.name}? Pricing, Features & Review (Jun 2026)`,
    description: desc.slice(0, 160),
    alternates: { canonical: `${BASE_URL}/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.name} Review — Pricing, Features & Alternatives | AIHub`,
      description: desc.slice(0, 160),
      url: `${BASE_URL}/tools/${tool.slug}`,
      type: "website",
    },
    keywords: [
      tool.name,
      `what is ${tool.name}`,
      `${tool.name} pricing`,
      `${tool.name} alternatives`,
      `${tool.name} review 2026`,
      ...(tool.tags ?? []),
      "AI tool", tool.vendor,
    ],
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const alternatives = tool.alternatives
    ? tools.filter((t) => tool.alternatives!.includes(t.slug))
    : [];

  const m = tool.metrics;

  // Build FAQ pairs for schema — directly answerable questions AI engines can cite
  const faqItems = [
    tool.pricingTiers && {
      q: `How much does ${tool.name} cost?`,
      a: `${tool.name} pricing: ${tool.pricingTiers.map((t) => `${t.name} at ${t.price}`).join("; ")}.`,
    },
    {
      q: `Is ${tool.name} free?`,
      a: tool.pricing === "Free"
        ? `Yes, ${tool.name} is fully free and open source.`
        : tool.pricing === "Freemium"
        ? `${tool.name} offers a free tier with limited usage. Paid plans unlock additional features.`
        : `${tool.name} is a ${tool.pricing.toLowerCase()} product with no permanent free tier.`,
    },
    tool.useCases && {
      q: `What is ${tool.name} used for?`,
      a: `${tool.name} is used for: ${tool.useCases.join(", ")}.`,
    },
    alternatives.length > 0 && {
      q: `What are the best alternatives to ${tool.name}?`,
      a: `Top alternatives to ${tool.name} include ${alternatives.map((a) => a.name).join(", ")}.`,
    },
    tool.platforms && {
      q: `What platforms does ${tool.name} support?`,
      a: `${tool.name} is available on: ${tool.platforms.join(", ")}.`,
    },
  ].filter(Boolean) as { q: string; a: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    operatingSystem: (tool.platforms ?? []).join(", "),
    url: tool.website,
    dateModified: "2026-06-07",
    offers: tool.pricingTiers
      ? tool.pricingTiers.map((t) => ({
          "@type": "Offer",
          name: t.name,
          price: t.price,
          priceCurrency: "USD",
        }))
      : undefined,
    creator: { "@type": "Organization", name: tool.vendor },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "AI Tools", item: `${BASE_URL}/tools` },
        { "@type": "ListItem", position: 3, name: tool.name, item: `${BASE_URL}/tools/${tool.slug}` },
      ],
    },
  };

  // FAQ schema — enables AI Overview / People Also Ask rich results
  const faqJsonLd = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  } : null;

  // Speakable — signals which blocks are suitable for voice / AI Overview citation
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${tool.name} Review`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable]"],
    },
    url: `${BASE_URL}/tools/${tool.slug}`,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      <Breadcrumb
        items={[
          { label: "AI Tools", href: "/tools" },
          { label: tool.name },
        ]}
        className="mb-8"
      />

      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${CATEGORY_COLORS[tool.category] ?? "bg-muted text-muted-foreground"}`}>
          {(() => { const Icon = CATEGORY_ICONS[tool.category] ?? Bot; return <Icon className="w-8 h-8" />; })()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <Badge variant={pricingBadge[tool.pricing] ?? "blue"}>{tool.pricing}</Badge>
            {tool.featured && <Badge variant="purple">Featured</Badge>}
            {tool.apiAvailable && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-medium">API Available</span>
            )}
          </div>
          <p className="text-lg text-muted-foreground mb-1">{tool.tagline}</p>
          <p className="text-sm text-muted-foreground">{tool.vendor} · {tool.category}</p>
          {tool.launchDate && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Launched {tool.launchDate}
            </p>
          )}
        </div>
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          Visit Website
        </a>
      </div>

      {/* GEO: Answer block — front-loaded direct answer for AI Overview extraction */}
      <div data-speakable className="mb-6 p-4 rounded-xl border border-border bg-muted/40">
        <p className="text-sm font-semibold text-foreground mb-1">Quick Answer</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>{tool.name}</strong> is {tool.tagline.toLowerCase()}, made by <strong>{tool.vendor}</strong>.{" "}
          {tool.pricing === "Free" ? "It is free and open source." : tool.pricing === "Freemium" ? "It offers a free tier with paid upgrades." : `It is a ${tool.pricing.toLowerCase()} product.`}{" "}
          {tool.useCases && `Key uses: ${tool.useCases.slice(0, 3).join(", ")}.`}
        </p>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Last updated: <time dateTime="2026-06-07">June 7, 2026</time>
        </p>
      </div>

      {/* Key metrics bar */}
      {m && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {m.users && (
            <div className="p-3 rounded-xl border border-border bg-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center justify-center gap-1"><Users className="w-3 h-3" />Users</p>
              <p className="text-xs font-bold">{m.users}</p>
            </div>
          )}
          {m.dau && (
            <div className="p-3 rounded-xl border border-border bg-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">DAU</p>
              <p className="text-sm font-bold text-violet-600">{m.dau}</p>
            </div>
          )}
          {m.arr && (
            <div className="p-3 rounded-xl border border-border bg-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center justify-center gap-1"><DollarSign className="w-3 h-3" />Revenue</p>
              <p className="text-xs font-bold text-emerald-600">{m.arr}</p>
            </div>
          )}
          {m.valuation && (
            <div className="p-3 rounded-xl border border-border bg-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Valuation</p>
              <p className="text-xs font-bold text-blue-600">{m.valuation}</p>
            </div>
          )}
          {m.growth && (
            <div className="p-3 rounded-xl border border-border bg-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center justify-center gap-1"><TrendingUp className="w-3 h-3" />Growth</p>
              <p className="text-xs font-bold text-orange-600">{m.growth}</p>
            </div>
          )}
          {m.employees && (
            <div className="p-3 rounded-xl border border-border bg-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Employees</p>
              <p className="text-sm font-bold">{m.employees}</p>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card>
            <CardHeader><CardTitle as="h2">What is {tool.name}?</CardTitle></CardHeader>
            <CardContent>
              <p data-speakable className="text-muted-foreground leading-relaxed">{tool.description}</p>
            </CardContent>
          </Card>

          {/* History */}
          {tool.history && (
            <Card>
              <CardHeader><CardTitle as="h2" className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" />How did {tool.name} get started?</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-sm">{tool.history}</p>
              </CardContent>
            </Card>
          )}

          {/* Latest Update */}
          {tool.latestUpdate && (
            <Card>
              <CardHeader><CardTitle as="h2" className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500" />What&apos;s new in {tool.name} in 2026?</CardTitle></CardHeader>
              <CardContent>
                <p data-speakable className="text-sm text-muted-foreground">{tool.latestUpdate}</p>
              </CardContent>
            </Card>
          )}

          {/* Pricing Tiers */}
          {tool.pricingTiers && tool.pricingTiers.length > 0 && (
            <Card>
              <CardHeader><CardTitle as="h2" className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-500" />How much does {tool.name} cost?</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tool.pricingTiers.map((tier) => (
                    <PricingCard key={tier.name} tier={tier} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Use cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <Card>
              <CardHeader><CardTitle as="h2">What can you do with {tool.name}?</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Pros and Cons */}
          {(tool.pros || tool.cons) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.pros && (
                <Card>
                  <CardHeader><CardTitle className="text-base text-emerald-700 dark:text-emerald-400">Pros</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tool.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {tool.cons && (
                <Card>
                  <CardHeader><CardTitle className="text-base text-rose-700 dark:text-rose-400">Cons</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tool.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <XCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <Card>
              <CardHeader><CardTitle as="h2">What are the best alternatives to {tool.name}?</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {alternatives.map((alt) => (
                    <Link
                      key={alt.slug}
                      href={`/tools/${alt.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${CATEGORY_COLORS[alt.category] ?? "bg-muted text-muted-foreground"}`}>
                        {(() => { const Icon = CATEGORY_ICONS[alt.category] ?? Bot; return <Icon className="w-4 h-4" />; })()}
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{alt.name}</p>
                        <p className="text-xs text-muted-foreground">{alt.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* GEO: Visible FAQ section — mirrors FAQ schema for AI citation eligibility */}
          {faqItems.length > 0 && (
            <Card>
              <CardHeader><CardTitle as="h2">Frequently Asked Questions about {tool.name}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map(({ q, a }) => (
                  <div key={q}>
                    <p className="text-sm font-semibold mb-1">{q}</p>
                    <p data-speakable className="text-sm text-muted-foreground">{a}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Details */}
          <Card>
            <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Vendor</p>
                <p className="text-sm">{tool.vendor}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Category</p>
                <p className="text-sm">{tool.category}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Pricing Model</p>
                <Badge variant={pricingBadge[tool.pricing] ?? "blue"}>{tool.pricing}</Badge>
              </div>
              {tool.launchDate && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Launched</p>
                  <p className="text-sm">{tool.launchDate}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Website</p>
                <a href={tool.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />{tool.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Underlying Models */}
          {tool.underlyingModel && tool.underlyingModel.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Cpu className="w-4 h-4 text-violet-500" />Underlying Models</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {tool.underlyingModel.map((m) => (
                    <span key={m} className="text-xs px-2 py-1 rounded-lg bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800/50 text-violet-700 dark:text-violet-300">
                      {m}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Platforms */}
          {tool.platforms && tool.platforms.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" />Platforms</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {tool.platforms.map((p) => (
                    <span key={p} className="text-xs px-2 py-1 rounded-lg bg-muted border border-border text-muted-foreground">{p}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Integrations */}
          {tool.integrations && tool.integrations.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Layers className="w-4 h-4 text-cyan-500" />Integrations</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {tool.integrations.map((intg) => (
                    <span key={intg} className="text-xs px-2 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-300">
                      {intg}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ideal For */}
          {tool.idealFor && tool.idealFor.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base">Ideal For</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {tool.idealFor.map((role) => (
                    <li key={role} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {role}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          <Card>
            <CardHeader><CardTitle className="text-base">Tags</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{tag}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
