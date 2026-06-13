import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { PageHeader } from "@/components/shared/page-header";
import { ArrowRight, Scale } from "lucide-react";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Tool Comparisons — Side-by-Side Feature & Pricing Reviews",
  description: "Compare AI tools head-to-head: features, pricing, integrations, and use cases. Find the best AI tool for your team with our detailed 2026 comparison guides.",
  alternates: { canonical: `${BASE_URL}/compare` },
  openGraph: {
    title: "AI Tool Comparisons | AIHub",
    description: "Compare AI tools head-to-head across pricing, features, and integrations.",
    url: `${BASE_URL}/compare`,
    type: "website",
  },
};

function getComparisonPairs() {
  const pairs: { slug: string; nameA: string; nameB: string; category: string }[] = [];
  const seen = new Set<string>();
  for (const tool of tools) {
    if (!tool.alternatives) continue;
    for (const altSlug of tool.alternatives) {
      const alt = tools.find((t) => t.slug === altSlug);
      if (!alt) continue;
      const [a, b] = [tool.slug, alt.slug].sort();
      const key = `${a}-vs-${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const toolA = tools.find((t) => t.slug === a)!;
      const toolB = tools.find((t) => t.slug === b)!;
      pairs.push({ slug: key, nameA: toolA.name, nameB: toolB.name, category: toolA.category });
    }
  }
  return pairs;
}

export default function ComparePage() {
  const pairs = getComparisonPairs();

  // Group by category
  const byCategory: Record<string, typeof pairs> = {};
  for (const p of pairs) {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category].push(p);
  }

  return (
    <>
      <PageHeader
        eyebrow="Tool Comparisons"
        title="AI Tool Head-to-Head Comparisons"
        description={`${pairs.length} side-by-side comparisons across pricing, features, integrations, and use cases.`}
        accent="violet"
      />
      <div className="container-site py-10 space-y-12">
        {Object.entries(byCategory).map(([category, catPairs]) => (
          <section key={category}>
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <Scale className="w-4 h-4 text-primary" />
              {category}
              <span className="text-xs font-normal text-muted-foreground">({catPairs.length} comparisons)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {catPairs.map((pair) => (
                <Link
                  key={pair.slug}
                  href={`/compare/${pair.slug}`}
                  className="group flex items-center justify-between p-4 rounded-xl glass-card hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-150"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{pair.nameA} vs {pair.nameB}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Pricing · Features · Verdict</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-3 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
