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
  Scale, Minus,
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

/* Build every high-value pair: each tool's own alternatives list */
export async function generateStaticParams() {
  const pairs = new Set<string>();
  for (const tool of tools) {
    if (!tool.alternatives) continue;
    for (const altSlug of tool.alternatives) {
      const alt = tools.find((t) => t.slug === altSlug);
      if (!alt) continue;
      // Canonical order: alphabetical by slug
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
    title,
    description: desc,
    alternates: { canonical: `${BASE_URL}/compare/${slug}` },
    openGraph: {
      title: `${toolA.name} vs ${toolB.name} — Full Comparison | AIHub`,
      description: desc,
      url: `${BASE_URL}/compare/${slug}`,
      type: "website",
    },
    keywords: [
      `${toolA.name} vs ${toolB.name}`, `${toolA.name} alternative`,
      `${toolB.name} alternative`, `compare ${toolA.name} ${toolB.name}`,
      `${toolA.name} review`, `${toolB.name} review`,
      `best ${toolA.category} tools`,
    ],
  };
}

function CompareCell({ value, highlight }: { value: string; highlight?: boolean }) {
  return (
    <td className={cn(
      "px-4 py-3 text-sm align-top",
      highlight ? "text-foreground font-medium" : "text-muted-foreground"
    )}>
      {value || <span className="text-muted-foreground/40 text-xs italic">—</span>}
    </td>
  );
}

function FeatureRow({ label, a, b, winner }: { label: string; a: string; b: string; winner?: "a" | "b" | "tie" }) {
  return (
    <tr className="border-b border-border/40 hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide w-36">{label}</td>
      <CompareCell value={a} highlight={winner === "a"} />
      <td className="px-2 py-3 text-center w-10">
        {winner === "a" ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /> :
         winner === "b" ? <XCircle className="w-4 h-4 text-rose-400 mx-auto" /> :
         <Minus className="w-3 h-3 text-muted-foreground/30 mx-auto" />}
      </td>
      <CompareCell value={b} highlight={winner === "b"} />
    </tr>
  );
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

  // Simple verdict heuristics
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

  // Pros/cons winner count
  const prosWinner =
    (toolA.pros?.length ?? 0) > (toolB.pros?.length ?? 0) ? "a" :
    (toolA.pros?.length ?? 0) < (toolB.pros?.length ?? 0) ? "b" : "tie";

  const aWins = [priceWinner, apiWinner, platformWinner, integrationWinner, prosWinner].filter(w => w === "a").length;
  const bWins = [priceWinner, apiWinner, platformWinner, integrationWinner, prosWinner].filter(w => w === "b").length;
  const overallWinner = aWins > bWins ? toolA : bWins > aWins ? toolB : null;

  // JSON-LD: SoftwareApplication comparison + BreadcrumbList
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
        description: `Side-by-side comparison of ${toolA.name} and ${toolB.name}`,
        itemListElement: [toolA, toolB].map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareApplication",
            name: t.name,
            description: t.description,
            applicationCategory: t.category,
            operatingSystem: t.platforms?.join(", ") ?? "Web",
            url: `${BASE_URL}/tools/${t.slug}`,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/OnlineOnly" },
            creator: { "@type": "Organization", name: t.vendor },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What is the difference between ${toolA.name} and ${toolB.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${toolA.name} is ${toolA.tagline.toLowerCase()}, while ${toolB.name} is ${toolB.tagline.toLowerCase()}. ${toolA.name} is categorized as ${toolA.category} and priced as ${toolA.pricing}; ${toolB.name} is ${toolB.category} and ${toolB.pricing}.`,
            },
          },
          {
            "@type": "Question",
            name: `Is ${toolA.name} better than ${toolB.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: overallWinner
                ? `Based on pricing accessibility, API availability, platform reach, and integrations, ${overallWinner.name} edges ahead. However, the best choice depends on your specific use case.`
                : `${toolA.name} and ${toolB.name} are evenly matched across key criteria. Your choice should depend on specific workflow needs.`,
            },
          },
          ...(toolA.pricing === "Free" || toolA.pricing === "Freemium" ? [{
            "@type": "Question",
            name: `Is ${toolA.name} free?`,
            acceptedAnswer: { "@type": "Answer", text: `${toolA.name} offers a ${toolA.pricing} tier. ${toolA.pricingTiers?.[0] ? `The free plan includes: ${toolA.pricingTiers[0].features.slice(0, 3).join(", ")}.` : ""}` },
          }] : []),
        ],
      },
    ],
  };

  // Related comparisons (same-category tools)
  const relatedCompares = tools
    .filter((t) => t.category === toolA.category && t.slug !== toolA.slug && t.slug !== toolB.slug)
    .slice(0, 4)
    .map((t) => {
      const [a2, b2] = [toolA.slug, t.slug].sort();
      return { slug: `${a2}-vs-${b2}`, name: `${toolA.name} vs ${t.name}` };
    });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-site py-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
          { label: `${toolA.name} vs ${toolB.name}` },
        ]} />

        {/* Hero */}
        <div className="mt-6 mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-5">
            <Scale className="w-3.5 h-3.5" />
            Head-to-Head Comparison · 2026
          </div>
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6">
            <div className="flex flex-col items-center gap-3">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", CATEGORY_COLORS[toolA.category] ?? "bg-muted text-muted-foreground")}>
                <IconA className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{toolA.name}</h2>
                <p className="text-xs text-muted-foreground">{toolA.vendor}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black text-muted-foreground/30">vs</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", CATEGORY_COLORS[toolB.category] ?? "bg-muted text-muted-foreground")}>
                <IconB className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{toolB.name}</h2>
                <p className="text-xs text-muted-foreground">{toolB.vendor}</p>
              </div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {toolA.name} vs {toolB.name}: Full Comparison (2026)
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {toolA.name} is {toolA.tagline.toLowerCase()}. {toolB.name} is {toolB.tagline.toLowerCase()}.
            {" "}Here&apos;s everything you need to make the right choice.
          </p>
        </div>

        {/* Verdict banner */}
        {overallWinner && (
          <div data-speakable className="mb-8 p-5 rounded-2xl glass-card border-primary/20 bg-primary/5">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Our Verdict</p>
            <p className="font-semibold text-foreground">
              <span className="text-primary">{overallWinner.name}</span> wins on more criteria ({overallWinner === toolA ? aWins : bWins}/{[priceWinner, apiWinner, platformWinner, integrationWinner, prosWinner].length}).
              {" "}{overallWinner.name} is better for: {overallWinner.idealFor?.slice(0, 3).join(", ") || overallWinner.category}.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              That said, {overallWinner === toolA ? toolB.name : toolA.name} may be a better fit depending on your use case — read the full breakdown below.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main comparison */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick-glance table */}
            <section className="glass-card rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border/50 bg-muted/30">
                <h2 className="font-bold text-base">Quick Comparison</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-36">Criteria</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">{toolA.name}</th>
                      <th className="w-10" />
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">{toolB.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <FeatureRow label="Category"    a={toolA.category}  b={toolB.category} />
                    <FeatureRow label="Pricing"     a={toolA.pricing}   b={toolB.pricing}   winner={priceWinner} />
                    <FeatureRow label="Vendor"      a={toolA.vendor}    b={toolB.vendor} />
                    <FeatureRow label="API"
                      a={toolA.apiAvailable ? "Available" : "No"}
                      b={toolB.apiAvailable ? "Available" : "No"}
                      winner={apiWinner}
                    />
                    <FeatureRow label="Platforms"
                      a={(toolA.platforms ?? []).join(", ") || "Web"}
                      b={(toolB.platforms ?? []).join(", ") || "Web"}
                      winner={platformWinner}
                    />
                    <FeatureRow label="Launch"
                      a={toolA.launchDate ?? "—"}
                      b={toolB.launchDate ?? "—"}
                    />
                    {toolA.underlyingModel && toolB.underlyingModel && (
                      <FeatureRow label="Models"
                        a={toolA.underlyingModel.slice(0, 2).join(", ")}
                        b={toolB.underlyingModel.slice(0, 2).join(", ")}
                      />
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* About each tool */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ tool: toolA, letter: "A" }, { tool: toolB, letter: "B" }].map(({ tool, letter }) => (
                <div key={tool.slug} className="glass-card rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">About {tool.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.description}</p>
                  {tool.useCases && (
                    <>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Best For</p>
                      <ul className="space-y-1">
                        {tool.useCases.slice(0, 4).map((uc) => (
                          <li key={uc} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />{uc}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <Link href={`/tools/${tool.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                    Full {tool.name} review <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </section>

            {/* Pros & Cons side-by-side */}
            {(toolA.pros || toolB.pros) && (
              <section className="glass-card rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border/50 bg-muted/30">
                  <h2 className="font-bold text-base">Pros &amp; Cons</h2>
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
              <h2 className="font-bold text-base border-b border-border/40 pb-3">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-sm mb-1">What is the difference between {toolA.name} and {toolB.name}?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {toolA.name} is {toolA.tagline.toLowerCase()}, while {toolB.name} is {toolB.tagline.toLowerCase()}.
                    {" "}{toolA.name} targets {toolA.idealFor?.slice(0, 2).join(", ")} whereas {toolB.name} is built for {toolB.idealFor?.slice(0, 2).join(", ")}.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">Which is cheaper: {toolA.name} or {toolB.name}?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {PRICING_RANK[toolA.pricing]! <= PRICING_RANK[toolB.pricing]!
                      ? `${toolA.name} is more affordable (${toolA.pricing})`
                      : `${toolB.name} is more affordable (${toolB.pricing})`}.
                    {" "}{toolA.pricingTiers?.[0] && `${toolA.name}'s entry tier starts at ${toolA.pricingTiers[0].price}.`}
                    {" "}{toolB.pricingTiers?.[0] && `${toolB.name}'s entry tier starts at ${toolB.pricingTiers[0].price}.`}
                  </p>
                </div>
                {(toolA.integrations || toolB.integrations) && (
                  <div>
                    <p className="font-semibold text-sm mb-1">What integrations does each tool offer?</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {toolA.name} integrates with {toolA.integrations?.slice(0, 3).join(", ") || "various tools"}.
                      {" "}{toolB.name} integrates with {toolB.integrations?.slice(0, 3).join(", ") || "various tools"}.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Verdict card */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-4">Score Summary</p>
              <div className="space-y-3">
                {[
                  { label: "Price", winner: priceWinner },
                  { label: "API Access", winner: apiWinner },
                  { label: "Platforms", winner: platformWinner },
                  { label: "Integrations", winner: integrationWinner },
                  { label: "Pros Count", winner: prosWinner },
                ].map(({ label, winner }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <span className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                      winner === "a" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                    )}>
                      {winner === "a" ? "✓" : winner === "tie" ? "=" : ""}
                    </span>
                    <span className="flex-1 text-muted-foreground">{label}</span>
                    <span className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                      winner === "b" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                    )}>
                      {winner === "b" ? "✓" : winner === "tie" ? "=" : ""}
                    </span>
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t border-border/40 grid grid-cols-3 text-center">
                  <div>
                    <p className="text-lg font-black text-primary">{aWins}</p>
                    <p className="text-[10px] text-muted-foreground">{toolA.name}</p>
                  </div>
                  <div><p className="text-xs text-muted-foreground/40 mt-2">vs</p></div>
                  <div>
                    <p className="text-lg font-black text-primary">{bWins}</p>
                    <p className="text-[10px] text-muted-foreground">{toolB.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="glass-card rounded-2xl p-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">Learn More</p>
              <Link href={`/tools/${toolA.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm font-medium group">
                Full {toolA.name} review
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
              <Link href={`/tools/${toolB.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm font-medium group">
                Full {toolB.name} review
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
              {toolA.website && (
                <a href={toolA.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors text-sm font-medium text-primary group">
                  Visit {toolA.name}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Related comparisons */}
            {relatedCompares.length > 0 && (
              <div className="glass-card rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">Related Comparisons</p>
                <div className="space-y-2">
                  {relatedCompares.map((rc) => (
                    <Link key={rc.slug} href={`/compare/${rc.slug}`} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors text-sm text-muted-foreground hover:text-foreground group">
                      {rc.name}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">Related Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {[...new Set([...(toolA.tags ?? []), ...(toolB.tags ?? [])])].slice(0, 10).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
