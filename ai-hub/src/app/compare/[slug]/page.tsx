import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "@/data/tools";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  CheckCircle, XCircle, ArrowRight, ExternalLink,
  MessageSquare, Code2, Image, Video, Mic2, SearchCheck,
  Server, Layers, LayoutGrid, Zap, Rocket, Pen, BarChart2, Headphones, Bot,
  Scale, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BASE_URL = "https://sridhar-ai.ch";

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

const PRICING_COLOR: Record<string, string> = {
  Free:       "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Freemium:   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Paid:       "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Enterprise: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

export async function generateStaticParams() {
  const pairs = new Set<string>();
  for (const tool of tools) {
    if (!tool.alternatives) continue;
    for (const altSlug of tool.alternatives) {
      const alt = tools.find((t) => t.slug === altSlug);
      if (!alt) continue;
      const [a, b] = [tool.slug, alt.slug].sort();
      pairs.add(`${a}-vs-${b}`);
    }
  }
  return Array.from(pairs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return { title: "Comparison Not Found" };
  const [, rawA, rawB] = match;
  const toolA = tools.find((t) => t.slug === rawA);
  const toolB = tools.find((t) => t.slug === rawB);
  if (!toolA || !toolB) return { title: "Comparison Not Found" };
  const title = `${toolA.name} vs ${toolB.name} (2026): Features, Pricing & Side-by-Side Comparison`;
  const desc = `${toolA.name} vs ${toolB.name}: neutral side-by-side comparison of pricing, features, use cases, and integrations. All data sourced from official vendor documentation.`;
  return {
    title, description: desc,
    alternates: { canonical: `${BASE_URL}/compare/${slug}` },
    openGraph: { title: `${toolA.name} vs ${toolB.name} — Full Comparison | AIHub`, description: desc, url: `${BASE_URL}/compare/${slug}`, type: "website" },
    keywords: [`${toolA.name} vs ${toolB.name}`, `${toolA.name} alternative`, `${toolB.name} alternative`, `compare ${toolA.name} ${toolB.name}`, `${toolA.category} tools comparison`],
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) notFound();
  const [, rawA, rawB] = match;
  const toolA = tools.find((t) => t.slug === rawA);
  const toolB = tools.find((t) => t.slug === rawB);
  if (!toolA || !toolB) notFound();

  const IconA = CATEGORY_ICONS[toolA.category] ?? Bot;
  const IconB = CATEGORY_ICONS[toolB.category] ?? Bot;

  // Factual dimension counts — used for display only, no winner declared
  const dimensions = [
    { label: "Pricing Model",  a: toolA.pricing,  b: toolB.pricing },
    { label: "API Access",     a: toolA.apiAvailable ? "Available" : "Not available", b: toolB.apiAvailable ? "Available" : "Not available" },
    { label: "Platforms",      a: (toolA.platforms ?? []).join(", ") || "Web", b: (toolB.platforms ?? []).join(", ") || "Web" },
    { label: "Integrations",   a: toolA.integrations ? `${toolA.integrations.length} integrations` : "—", b: toolB.integrations ? `${toolB.integrations.length} integrations` : "—" },
    { label: "Vendor",         a: toolA.vendor,   b: toolB.vendor },
    { label: "Category",       a: toolA.category, b: toolB.category },
    { label: "Launch",         a: toolA.launchDate ?? "—", b: toolB.launchDate ?? "—" },
    ...(toolA.underlyingModel && toolB.underlyingModel
      ? [{ label: "Models", a: toolA.underlyingModel.slice(0, 2).join(", "), b: toolB.underlyingModel.slice(0, 2).join(", ") }]
      : []),
  ];

  const relatedCompares = tools
    .filter((t) => t.category === toolA.category && t.slug !== toolA.slug && t.slug !== toolB.slug)
    .slice(0, 4)
    .map((t) => {
      const [a2, b2] = [toolA.slug, t.slug].sort();
      return { slug: `${a2}-vs-${b2}`, name: `${toolA.name} vs ${t.name}` };
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",    item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Compare", item: `${BASE_URL}/compare` },
          { "@type": "ListItem", position: 3, name: `${toolA.name} vs ${toolB.name}`, item: `${BASE_URL}/compare/${slug}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${toolA.name} vs ${toolB.name} Comparison`,
        itemListElement: [toolA, toolB].map((t, i) => ({
          "@type": "ListItem", position: i + 1,
          item: {
            "@type": "SoftwareApplication", name: t.name, description: t.description,
            applicationCategory: t.category, operatingSystem: t.platforms?.join(", ") ?? "Web",
            url: `${BASE_URL}/tools/${t.slug}`, creator: { "@type": "Organization", name: t.vendor },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What is the difference between ${toolA.name} and ${toolB.name}?`,
            acceptedAnswer: { "@type": "Answer", text: `${toolA.name} is ${toolA.tagline.toLowerCase()}, while ${toolB.name} is ${toolB.tagline.toLowerCase()}. The right choice depends on your specific use case, team size, and technical requirements.` },
          },
          {
            "@type": "Question",
            name: `Which use cases suit ${toolA.name} vs ${toolB.name}?`,
            acceptedAnswer: { "@type": "Answer", text: `${toolA.name} is designed for: ${toolA.idealFor?.slice(0, 3).join(", ") || toolA.category}. ${toolB.name} is designed for: ${toolB.idealFor?.slice(0, 3).join(", ") || toolB.category}. We recommend evaluating both tools against your own requirements.` },
          },
          {
            "@type": "Question",
            name: `What are the pricing options for ${toolA.name} and ${toolB.name}?`,
            acceptedAnswer: { "@type": "Answer", text: `${toolA.name} uses a ${toolA.pricing} pricing model. ${toolB.name} uses a ${toolB.pricing} pricing model. Check each vendor's official website for current pricing details.` },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-site py-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
          { label: `${toolA.name} vs ${toolB.name}` },
        ]} />

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="mt-6 mb-8">
          <div className="glass-card rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--primary)/0.10)]">
            <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
            <div className="p-5 sm:p-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <Scale className="w-3 h-3" />Side-by-Side Comparison · 2026
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4 sm:gap-8">
                {/* Tool A */}
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={cn("w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg", CATEGORY_COLORS[toolA.category] ?? "bg-muted")}>
                    <IconA className="w-7 h-7 sm:w-10 sm:h-10" />
                  </div>
                  <div>
                    <p className="font-bold text-base sm:text-xl text-foreground">{toolA.name}</p>
                    <p className="text-xs text-muted-foreground">{toolA.vendor}</p>
                    <span className={cn("mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full", PRICING_COLOR[toolA.pricing] ?? "bg-muted text-muted-foreground")}>
                      {toolA.pricing}
                    </span>
                  </div>
                </div>

                {/* VS divider */}
                <div className="flex items-center justify-center pt-6">
                  <span className="text-xl sm:text-3xl font-black text-muted-foreground/25 leading-none">vs</span>
                </div>

                {/* Tool B */}
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={cn("w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg", CATEGORY_COLORS[toolB.category] ?? "bg-muted")}>
                    <IconB className="w-7 h-7 sm:w-10 sm:h-10" />
                  </div>
                  <div>
                    <p className="font-bold text-base sm:text-xl text-foreground">{toolB.name}</p>
                    <p className="text-xs text-muted-foreground">{toolB.vendor}</p>
                    <span className={cn("mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full", PRICING_COLOR[toolB.pricing] ?? "bg-muted text-muted-foreground")}>
                      {toolB.pricing}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mt-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              {toolA.name} vs {toolB.name}: Full Comparison (2026)
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              {toolA.name} is {toolA.tagline.toLowerCase()}. {toolB.name} is {toolB.tagline.toLowerCase()}.
              {" "}Use the breakdown below to find the right fit for your needs.
            </p>
          </div>
        </div>

        {/* ── Neutrality notice ─────────────────────────────────── */}
        <div className="mb-8 flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-muted/30 text-xs text-muted-foreground">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-muted-foreground/60" />
          <p>
            This page presents factual information sourced from publicly available vendor documentation and product pages.
            AIHub does not endorse either product. The right tool depends on your specific use case, team, and requirements —
            we recommend evaluating both tools directly before making a decision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main content ─────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Side-by-side comparison table */}
            <section className="glass-card rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border/50 bg-muted/30 flex items-center gap-2">
                <Scale className="w-4 h-4 text-primary" />
                <h2 className="font-bold text-sm">Side-by-Side Overview</h2>
              </div>

              {/* Mobile: stacked cards */}
              <div className="sm:hidden divide-y divide-border/40">
                {dimensions.map(({ label, a, b }) => (
                  <div key={label} className="px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">{label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-xs p-2 rounded-lg bg-muted/30 text-muted-foreground">
                        <p className="text-[10px] text-muted-foreground/60 mb-0.5">{toolA.name}</p>
                        {a}
                      </div>
                      <div className="text-xs p-2 rounded-lg bg-muted/30 text-muted-foreground">
                        <p className="text-[10px] text-muted-foreground/60 mb-0.5">{toolB.name}</p>
                        {b}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-36">Feature</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">{toolA.name}</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">{toolB.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dimensions.map(({ label, a, b }) => (
                      <tr key={label} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{a}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* About each tool */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[toolA, toolB].map((tool) => (
                <div key={tool.slug} className="glass-card rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">About {tool.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.description}</p>
                  {tool.useCases && (
                    <>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Designed For</p>
                      <ul className="space-y-1 mb-4">
                        {tool.useCases.slice(0, 4).map((uc) => (
                          <li key={uc} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />{uc}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <Link href={`/tools/${tool.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                    Full {tool.name} details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </section>

            {/* Pros & Cons — both presented equally, no comparative framing */}
            {(toolA.pros || toolB.pros) && (
              <section className="glass-card rounded-2xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border/50 bg-muted/30 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <h2 className="font-bold text-sm">Strengths &amp; Limitations</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
                  {[toolA, toolB].map((tool) => (
                    <div key={tool.slug} className="p-5 space-y-4">
                      <p className="font-semibold text-sm">{tool.name}</p>
                      {tool.pros && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Strengths</p>
                          <ul className="space-y-1.5">
                            {tool.pros.map((p) => (
                              <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />{p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {tool.cons && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-2">Limitations</p>
                          <ul className="space-y-1.5">
                            {tool.cons.map((c) => (
                              <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <XCircle className="w-3.5 h-3.5 text-rose-500 mt-0.5 flex-shrink-0" />{c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ — neutral, use-case framed */}
            <section className="glass-card rounded-2xl p-5 space-y-5">
              <h2 className="font-bold text-sm border-b border-border/40 pb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-sm mb-1.5">What is the difference between {toolA.name} and {toolB.name}?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {toolA.name} is {toolA.tagline.toLowerCase()}, while {toolB.name} is {toolB.tagline.toLowerCase()}.
                    {" "}{toolA.name} is designed for {toolA.idealFor?.slice(0, 2).join(", ") ?? toolA.category};
                    {" "}{toolB.name} is designed for {toolB.idealFor?.slice(0, 2).join(", ") ?? toolB.category}.
                    The right fit depends on your specific requirements.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1.5">How do the pricing models compare?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {toolA.name} is available under a <strong>{toolA.pricing}</strong> model.
                    {" "}{toolB.name} is available under a <strong>{toolB.pricing}</strong> model.
                    {toolA.pricingTiers?.[0] && ` ${toolA.name}'s entry tier starts at ${toolA.pricingTiers[0].price}.`}
                    {toolB.pricingTiers?.[0] && ` ${toolB.name}'s entry tier starts at ${toolB.pricingTiers[0].price}.`}
                    {" "}Always verify pricing on each vendor's official website as it may change.
                  </p>
                </div>
                {(toolA.integrations || toolB.integrations) && (
                  <div>
                    <p className="font-semibold text-sm mb-1.5">What integrations does each tool support?</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {toolA.name} integrates with {toolA.integrations?.slice(0, 4).join(", ") || "various tools"}.
                      {" "}{toolB.name} integrates with {toolB.integrations?.slice(0, 4).join(", ") || "various tools"}.
                      {" "}Check each vendor's documentation for the full and current list.
                    </p>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm mb-1.5">How do I choose between {toolA.name} and {toolB.name}?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Consider your team&apos;s technical requirements, budget, existing tooling, and use case before deciding.
                    We recommend signing up for free trials or demos of both tools where available, and consulting each vendor&apos;s documentation.
                    AIHub provides this comparison for informational purposes only.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Feature breakdown — neutral counts, no winner declared */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-4">Feature Snapshot</p>
              <div className="space-y-3">
                {[
                  { label: "API Access",     a: !!toolA.apiAvailable,                        b: !!toolB.apiAvailable },
                  { label: "Has Integrations", a: (toolA.integrations?.length ?? 0) > 0,    b: (toolB.integrations?.length ?? 0) > 0 },
                  { label: "Multi-platform", a: (toolA.platforms?.length ?? 0) > 1,          b: (toolB.platforms?.length ?? 0) > 1 },
                  { label: "Free Tier",      a: ["Free","Freemium"].includes(toolA.pricing), b: ["Free","Freemium"].includes(toolB.pricing) },
                  { label: "Enterprise Plan",a: ["Paid","Enterprise"].includes(toolA.pricing),b: ["Paid","Enterprise"].includes(toolB.pricing) },
                ].map(({ label, a, b }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <span className={cn("w-4 h-4 rounded flex items-center justify-center flex-shrink-0", a ? "bg-primary/10 text-primary" : "bg-muted/60 text-muted-foreground/30")}>
                      {a ? "✓" : "–"}
                    </span>
                    <span className="flex-1 text-muted-foreground">{label}</span>
                    <span className={cn("w-4 h-4 rounded flex items-center justify-center flex-shrink-0", b ? "bg-primary/10 text-primary" : "bg-muted/60 text-muted-foreground/30")}>
                      {b ? "✓" : "–"}
                    </span>
                  </div>
                ))}
                <div className="pt-2 flex justify-between text-[10px] text-muted-foreground/50 font-medium">
                  <span className="truncate mr-2">{toolA.name}</span>
                  <span className="truncate text-right">{toolB.name}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="glass-card rounded-2xl p-5 space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">Explore Further</p>
              <Link href={`/tools/${toolA.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm font-medium group">
                {toolA.name} full details
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
              <Link href={`/tools/${toolB.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm font-medium group">
                {toolB.name} full details
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
              {toolA.website && (
                <a href={toolA.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-border/60 hover:bg-muted/50 transition-colors text-sm font-medium text-foreground group">
                  {toolA.name} official site
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
              )}
              {toolB.website && (
                <a href={toolB.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-border/60 hover:bg-muted/50 transition-colors text-sm font-medium text-foreground group">
                  {toolB.name} official site
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
              )}
            </div>

            {/* Related comparisons */}
            {relatedCompares.length > 0 && (
              <div className="glass-card rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">Related Comparisons</p>
                <div className="space-y-1">
                  {relatedCompares.map((rc) => (
                    <Link key={rc.slug} href={`/compare/${rc.slug}`} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors text-xs text-muted-foreground hover:text-foreground group">
                      {rc.name}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {(toolA.tags?.length || toolB.tags?.length) ? (
              <div className="glass-card rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">Related Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {[...new Set([...(toolA.tags ?? []), ...(toolB.tags ?? [])])].slice(0, 10).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Back */}
            <Link href="/compare" className="flex items-center justify-center gap-2 p-3 rounded-xl border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
              <Scale className="w-4 h-4" />
              Browse all comparisons
            </Link>

            {/* Disclaimer */}
            <p className="text-[10px] text-muted-foreground/50 leading-relaxed px-1">
              Data sourced from public vendor documentation. Pricing, features, and availability may change. Always verify on official vendor websites before making purchasing decisions. AIHub is not affiliated with any of the listed vendors.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
