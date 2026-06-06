"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilterBar } from "@/components/shared/filter-bar";
import { ExternalLink, SlidersHorizontal } from "lucide-react";
import { tools, toolCategories, pricingOptions, type ToolData } from "@/data/tools";
import { cn } from "@/lib/utils";

const pricingBadge: Record<string, "green" | "blue" | "amber" | "purple"> = {
  Free: "green", Freemium: "blue", Paid: "amber", Enterprise: "purple",
};

const categoryGradient: Record<string, string> = {
  "Language Models":   "from-violet-500/15 to-purple-500/15 border-violet-500/20 text-violet-700 dark:text-violet-300",
  "Code Assistance":   "from-blue-500/15 to-cyan-500/15 border-blue-500/20 text-blue-700 dark:text-blue-300",
  "Image Generation":  "from-pink-500/15 to-rose-500/15 border-pink-500/20 text-pink-700 dark:text-pink-300",
  "Video Generation":  "from-orange-500/15 to-red-500/15 border-orange-500/20 text-orange-700 dark:text-orange-300",
  "Audio & Voice":     "from-green-500/15 to-teal-500/15 border-green-500/20 text-green-700 dark:text-green-300",
  "Data & Analytics":  "from-amber-500/15 to-yellow-500/15 border-amber-500/20 text-amber-700 dark:text-amber-300",
  "Search & Research": "from-sky-500/15 to-blue-500/15 border-sky-500/20 text-sky-700 dark:text-sky-300",
  "Productivity":      "from-indigo-500/15 to-violet-500/15 border-indigo-500/20 text-indigo-700 dark:text-indigo-300",
  "Customer Service":  "from-emerald-500/15 to-green-500/15 border-emerald-500/20 text-emerald-700 dark:text-emerald-300",
};

const defaultGradient = "from-violet-500/10 to-blue-500/10 border-violet-500/15 text-violet-700 dark:text-violet-300";

function ToolAvatar({ tool }: { tool: ToolData }) {
  const gradientClass = categoryGradient[tool.category] ?? defaultGradient;
  return (
    <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br border flex items-center justify-center flex-shrink-0", "text-base font-bold select-none", gradientClass)}>
      {tool.name[0]}
    </div>
  );
}

function EmptyState({ category, pricing }: { category: string; pricing: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <SlidersHorizontal className="w-6 h-6 text-muted-foreground" />
      </div>
      <p className="text-base font-semibold mb-1.5">No tools match these filters</p>
      <p className="text-sm text-muted-foreground max-w-xs">
        Try broadening your search -{" "}
        {category !== "All" ? `remove the "${category}" filter` : "try a different pricing tier"}.
      </p>
    </div>
  );
}

export function ToolsList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePricing, setActivePricing]   = useState("All");

  const filtered = tools.filter((tool) => {
    const catMatch   = activeCategory === "All" || tool.category === activeCategory;
    const priceMatch = activePricing  === "All" || tool.pricing  === activePricing;
    return catMatch && priceMatch;
  });

  const isFiltered = activeCategory !== "All" || activePricing !== "All";

  return (
    <div>
      <div className="space-y-3 mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">Category</p>
          <FilterBar options={toolCategories} active={activeCategory} onChange={setActiveCategory} size="sm" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">Pricing</p>
          <FilterBar options={pricingOptions} active={activePricing} onChange={setActivePricing} size="sm" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}of {tools.length} tools
          {activeCategory !== "All" && (<> in <span className="font-medium text-foreground">{activeCategory}</span></>)}
        </p>
        {isFiltered && (
          <button onClick={() => { setActiveCategory("All"); setActivePricing("All"); }} className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors">Clear filters</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState category={activeCategory} pricing={activePricing} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group block">
              <Card className="h-full group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-card-hover)] group-hover:border-border/80">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <ToolAvatar tool={tool} />
                    <Badge variant={pricingBadge[tool.pricing] ?? "blue"}>{tool.pricing}</Badge>
                  </div>
                  <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">{tool.name}</CardTitle>
                  <CardDescription className="text-xs mt-0.5">{tool.vendor} · {tool.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{tool.tagline}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{tag}</span>
                    ))}
                  </div>
                  <a href={tool.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <ExternalLink className="w-3 h-3" />
                    Visit website
                  </a>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
