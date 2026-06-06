"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilterBar } from "@/components/shared/filter-bar";
import {
  ExternalLink, SlidersHorizontal,
  MessageSquare, Code2, Image, Video, Mic2, SearchCheck,
  Server, Layers, LayoutGrid, Zap, Rocket, Pen, BarChart2, Headphones, Bot,
} from "lucide-react";
import { tools, toolCategories, pricingOptions, type ToolData } from "@/data/tools";
import { cn } from "@/lib/utils";

const pricingBadge: Record<string, "green" | "blue" | "amber" | "purple"> = {
  Free: "green", Freemium: "blue", Paid: "amber", Enterprise: "purple",
};

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
  "Infrastructure":    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "Frameworks":        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "Platforms":         "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  "APIs":              "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Productivity":      "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Design":            "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  "Data & Analytics":  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Customer Service":  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Autonomous Agents": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

function ToolIcon({ tool }: { tool: ToolData }) {
  const Icon = CATEGORY_ICONS[tool.category] ?? Bot;
  const colorClass = CATEGORY_COLORS[tool.category] ?? "bg-muted text-muted-foreground";
  return (
    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", colorClass)}>
      <Icon className="w-5 h-5" />
    </div>
  );
}

function EmptyState({ category }: { category: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-lg border border-border bg-muted flex items-center justify-center mb-4">
        <SlidersHorizontal className="w-6 h-6 text-muted-foreground" />
      </div>
      <p className="text-base font-semibold mb-1.5">No tools match these filters</p>
      <p className="text-sm text-muted-foreground max-w-xs">
        {category !== "All" ? `Remove the "${category}" filter or try a different pricing tier.` : "Try a different pricing tier."}
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
          <span className="font-semibold text-foreground">{filtered.length}</span> of {tools.length} tools
          {activeCategory !== "All" && <> in <span className="font-medium text-foreground">{activeCategory}</span></>}
        </p>
        {isFiltered && (
          <button
            onClick={() => { setActiveCategory("All"); setActivePricing("All"); }}
            className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState category={activeCategory} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group block">
              <Card className="h-full group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-card-hover)] group-hover:border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <ToolIcon tool={tool} />
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
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
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
