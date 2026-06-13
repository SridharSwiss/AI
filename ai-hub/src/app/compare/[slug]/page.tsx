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
  Scale, Minus, Trophy,
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

const PRICING_RANK: Record<string, number> = { Free: 1, Freemium: 2, Paid: 3, Enterprise: 4 };

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
  const title = `${toolA.name} vs ${toolB.name} (2026): Features, Pricing & Verdict`;
  const desc = `${toolA.name} vs ${toolB.name}: detailed comparison of pricing, features, use cases, and integrations. Find out which AI tool is the best fit for your team in 2026.`;
  return {
    title, description: desc,
    alternates: { canonical: `${BASE_URL}/compare/${slug}` },
    openGraph: { title: `${toolA.name} vs ${toolB.name} — Full Comparison | AIHub`, description: desc, url: `${BASE_URL}/compare/${slug}`, type: "website" },
    keywords: [`${toolA.name} vs ${toolB.name}`, `${toolA.name} alternative`, `${toolB.name} alternative`, `compare ${toolA.name} ${toolB.name}`, `best ${toolA.category} tools`],
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

  const priceWinner = PRICING_RANK[toolA.pricing]! < PRICING_RANK[toolB.pricing]! ? "a"
    : PRICING_RANK[toolA.pricing]! > PRICING_RANK[toolB.pricing]! ? "b" : "tie";
  const apiWinner = toolA.apiAvailable && !toolB.apiAvailable ? "a"
    : !toolA.apiAvailable && toolB.apiAvailable ? "b" : "tie";
  const platformWinner =
    (toolA.platforms?.length ?? 0) > (toolB.platforms?.length ?? 0) ? "a" :
    (toolA.platforms?.length ?? 0) < (toolB.platforms?.length ?? 0) ? "b" : "tie";
  const integrationWinner =
    (toolA.integrations?.length ?? 0) > (toolB.integrations?.length ?? 0) ? "a" :
    (toolA.integrations?.length ?? 0) < (toolB.integrations?.length ?? 0) ? "b" : "tie";
  const prosWinner =
    (toolA.pros?.length ?? 0) > (toolB.pros?.length ?? 0) ? "a" :
    (toolA.pros?.length ?? 0) < (toolB.pros?.length ?? 0) ? "b" : "tie";

  const criteria = [priceWinner, apiWinner, platformWinner, integrationWinner, prosWinner];
  const aWins = criteria.filter(w => w === "a").length;
  const bWins = criteria.filter(w => w === "b").length;
  const overallWinner = aWins > bWins ? toolA : bWins > aWins ? toolB : null;

  const criteriaRows = [
    { label: "Price",        winner: priceWinner },
    { label: "API Access",   winner: apiWinner },
    { label: "Platforms",    winner: platformWinner },
    { label: "Integrations", winner: integrationWinner },
    { label: "Pros Count",   winner: prosWinner },
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
          item: { "@type": "SoftwareApplication", name: t.name, description: t.description, applicationCategory: t.category, operatingSystem: t.platforms?.join(", ") ?? "Web", url: `${BASE_URL}/tools/${t.slug}`, creator: { "@type": "Organization", name: t.vendor } },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `What is the difference between ${toolA.name} and ${toolB.name}?`, acceptedAnswer: { "@type": "Answer", text: `${toolA.name} is ${toolA.tagline.toLowerCase()}, while ${toolB.name} is ${toolB.tagline.toLowerCase()}.` } },
          { "@type": "Question", name: `Is ${toolA.name} better than ${toolB.name}?`, acceptedAnswer: { "@type": "Answer", text: overallWinner ? `Based on pricing, API availability, platform reach, and integrations, ${overallWinner.name} edges ahead.` : `${toolA.name} and ${toolB.name} are evenly matched across key criteria.` } },
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
          {/* Tool duel banner */}
          <div className="glass-card rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--primary)/0.10)]">
            <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
            <div className="p-5 sm:p-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <Scale className="w-3 h-3" />Head-to-Head · 2026
                </span>
              </div>

              {/* Duel layout */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4 sm:gap-8 mb-6">
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
                  {overallWinner === toolA && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      <Trophy className="w-3 h-3" /> Our Pick
                    </div>
                  )}
                </div>

                {/* VS divider */}
                <div className="flex flex-col items-center gap-2 pt-4">
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
                  {overallWinner === toolB && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      <Trophy className="w-3 h-3" /> Our Pick
                    </div>
                  )}
                </div>
              </div>

              {/* Score bars */}
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-border/40">
                <ScoreBar wins={aWins} total={criteria.length} label={toolA.name} />
                <ScoreBar wins={bWins} total={criteria.length} label={toolB.name} />
              </div>
            </div>
          </div>

          {/* Title + description below card */}
          <div className="text-center mt-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              {toolA.name} vs {toolB.name}: Full Comparison (2026)
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              {toolA.name} is {toolA.tagline.toLowerCase()}. {toolB.name} is {toolB.tagline.toLowerCase()}.
              {" "}Here&apos;s everything you need to make the right choice.
            </p>
          </div>
        </div>

        {/* ── Verdict banner ────────────────────────────────────── */}
        {overallWinner && (
          <div data-speakable className="mb-8 p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/8 to-orange-500/5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1">Our Verdict</p>
                <p className="font-semibold text-foreground text-sm">
                  <span className="text-primary">{overallWinner.name}</span> wins on {overallWinner === toolA ? aWins : bWins} of {criteria.length} criteria:{" "}
                  {overallWinner.idealFor?.slice(0, 3).join(", ") || overallWinner.category}.
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  That said, {overallWinner === toolA ? toolB.name : toolA.name} may be a better fit depending on your specific workflow needs — read the full breakdown below.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main content ─────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick comparison table */}
            <section className="glass-card rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border/50 bg-muted/30 flex items-center gap-2">
                <Scale className="w-4 h-4 text-primary" />
                <h2 className="font-bold text-sm">Quick Comparison</h2>
              </div>
              {/* Mobile: stacked cards */}
              <div className="sm:hidden divide-y divide-border/40">
                {[
                  { label: "Category",   a: toolA.category,               b: toolB.category,               winner: undefined },
                  { label: "Pricing",    a: toolA.pricing,                b: toolB.pricing,                winner: priceWinner },
                  { label: "Vendor",     a: toolA.vendor,                 b: toolB.vendor,                 winner: undefined },
                  { label: "API",        a: toolA.apiAvailable ? "✓ Yes" : "✗ No", b: toolB.apiAvailable ? "✓ Yes" : "✗ No", winner: apiWinner },
                  { label: "Platforms",  a: (toolA.platforms ?? []).join(", ") || "Web", b: (toolB.platforms ?? []).join(", ") || "Web", winner: platformWinner },
                  { label: "Launch",     a: toolA.launchDate ?? "—",      b: toolB.launchDate ?? "—",      winner: undefined },
                ].map(({ label, a, b, winner }) => (
                  <div key={label} className="px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">{label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={cn("text-xs p-2 rounded-lg", winner === "a" ? "bg-emerald-500/8 text-foreground font-medium ring-1 ring-emerald-500/20" : "text-muted-foreground")}>
                        <p className="text-[10px] text-muted-foreground/60 mb-0.5">{toolA.name}</p>
                        {a}
                      </div>
                      <div className={cn("text-xs p-2 rounded-lg", winner === "b" ? "bg-emerald-500/8 text-foreground font-medium ring-1 ring-emerald-500/20" : "text-muted-foreground")}>
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
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-32">Criteria</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">{toolA.name}</th>
                      <th className="w-8" />
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">{toolB.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Category",  a: toolA.category,    b: toolB.category,    winner: undefined },
                      { label: "Pricing",   a: toolA.pricing,     b: toolB.pricing,     winner: priceWinner },
                      { label: "Vendor",    a: toolA.vendor,      b: toolB.vendor,      winner: undefined },
                      { label: "API",       a: toolA.apiAvailable ? "Available" : "No", b: toolB.apiAvailable ? "Available" : "No", winner: apiWinner },
                      { label: "Platforms", a: (toolA.platforms ?? []).join(", ") || "Web", b: (toolB.platforms ?? []).join(", ") || "Web", winner: platformWinner },
                      { label: "Launch",    a: toolA.launchDate ?? "—", b: toolB.launchDate ?? "—", winner: undefined },
                      ...(toolA.underlyingModel && toolB.underlyingModel ? [{ label: "Models", a: toolA.underlyingModel.slice(0, 2).join(", "), b: toolB.underlyingModel.slice(0, 2).join(", "), winner: undefined }] : []),
                    ].map(({ label, a, b, winner }) => (
                      <tr key={label} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</td>
                        <td className={cn("px-4 py-3 text-sm", winner === "a" ? "text-foreground font-medium" : "text-muted-foreground")}>{a}</td>
                        <td className="px-2 py-3 text-center w-8">
                          {winner === "a" ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /> :
                           winner === "b" ? <XCircle className="w-4 h-4 text-rose-400 mx-auto" /> :
                           winner === "tie" ? <Minus className="w-3 h-3 text-muted-foreground/30 mx-auto" /> : null}
                        </td>
                        <td className={cn("px-4 py-3 text-sm", winner === "b" ? "text-foreground font-medium" : "text-muted-foreground")}>{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* About cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[toolA, toolB].map((tool) => (
                <div key={tool.slug} className="glass-card rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">About {tool.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.description}</p>
                  {tool.useCases && (
                    <>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Best For</p>
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
                    Full {tool.name} review <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </section>

            {/* Pros & Cons */}
            {(toolA.pros || toolB.pros) && (
              <section className="glass-card rounded-2xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border/50 bg-muted/30 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <h2 className="font-bold text-sm">Pros &amp; Cons</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
                  {[toolA, toolB].map((tool) => (
                    <div key={tool.slug} className="p-5 space-y-4">
                      <p className="font-semibold text-sm">{tool.name}</p>
                      {tool.pros && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Pros</p>
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
                          <p className="text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-2">Cons</p>
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

            {/* FAQ */}
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
                    {" "}{toolA.name} targets {toolA.idealFor?.slice(0, 2).join(", ") ?? toolA.category} whereas {toolB.name} is built for {toolB.idealFor?.slice(0, 2).join(", ") ?? toolB.category}.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1.5">Which is cheaper: {toolA.name} or {toolB.name}?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {PRICING_RANK[toolA.pricing]! <= PRICING_RANK[toolB.pricing]!
                      ? `${toolA.name} is more affordable (${toolA.pricing})`
                      : `${toolB.name} is more affordable (${toolB.pricing})`}.
                    {toolA.pricingTiers?.[0] && ` ${toolA.name}'s entry tier starts at ${toolA.pricingTiers[0].price}.`}
                    {toolB.pricingTiers?.[0] && ` ${toolB.name}'s entry tier starts at ${toolB.pricingTiers[0].price}.`}
                  </p>
                </div>
                {(toolA.integrations || toolB.integrations) && (
                  <div>
                    <p className="font-semibold text-sm mb-1.5">What integrations does each tool offer?</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {toolA.name} integrates with {toolA.integrations?.slice(0, 3).join(", ") || "various tools"}.
                      {" "}{toolB.name} integrates with {toolB.integrations?.slice(0, 3).join(", ") || "various tools"}.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Score summary */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-4">Score Summary</p>
              <div className="space-y-2.5 mb-4">
                {criteriaRows.map(({ label, winner }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0",
                      winner === "a" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted/60 text-transparent"
                    )}>✓</span>
                    <span className="flex-1 text-xs text-muted-foreground">{label}</span>
                    <span className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0",
                      winner === "b" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : winner === "tie" ? "bg-muted/60 text-muted-foreground" : "bg-muted/60 text-transparent"
                    )}>{winner === "tie" ? "=" : "✓"}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 text-center pt-4 border-t border-border/40">
                <div>
                  <p className="text-2xl font-black text-primary">{aWins}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{toolA.name}</p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-xs text-muted-foreground/40 font-bold">vs</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-primary">{bWins}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{toolB.name}</p>
                </div>
              </div>
              {overallWinner && (
                <div className="mt-3 pt-3 border-t border-border/40 text-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <Trophy className="w-3.5 h-3.5" />{overallWinner.name} wins
                  </span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="glass-card rounded-2xl p-5 space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">Learn More</p>
              <Link href={`/tools/${toolA.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm font-medium group">
                Full {toolA.name} review
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
              <Link href={`/tools/${toolB.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm font-medium group">
                Full {toolB.name} review
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
              {toolA.website && (
                <a href={toolA.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors text-sm font-medium text-primary">
                  Visit {toolA.name}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {toolB.website && (
                <a href={toolB.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors text-sm font-medium text-primary">
                  Visit {toolB.name}
                  <ExternalLink className="w-3.5 h-3.5" />
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

            {/* Back to compare */}
            <Link
              href="/compare"
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              <Scale className="w-4 h-4" />
              Browse all comparisons
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function ScoreBar({ wins, total, label }: { wins: number; total: number; label: string }) {
  const pct = Math.round((wins / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
        <span className="font-semibold text-foreground truncate mr-2">{label}</span>
        <span className="flex-shrink-0">{wins}/{total}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
