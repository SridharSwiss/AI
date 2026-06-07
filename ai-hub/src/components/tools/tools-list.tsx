"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink, SlidersHorizontal, ChevronDown,
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

function FilterSelect({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "appearance-none w-full pl-3 pr-8 py-2 rounded-lg text-sm font-medium",
          "border border-border bg-card text-foreground dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark]",
          "hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/40",
          "transition-colors cursor-pointer"
        )}
      >
        <option value="All">All {label}s</option>
        {options.filter((o) => o !== "All").map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

function ToolIcon({ tool }: { tool: ToolData }) {
  const Icon = CATEGORY_ICONS[tool.category] ?? Bot;
  const colorClass = CATEGORY_COLORS[tool.category] ?? "bg-muted text-muted-foreground";
  return (
    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", colorClass)}>
      <Icon className="w-5 h-5" />
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
      {/* Dropdown filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <FilterSelect label="Category" value={activeCategory} options={toolCategories} onChange={setActiveCategory} />
        <FilterSelect label="Pricing"  value={activePricing}  options={pricingOptions}  onChange={setActivePricing} />
        {isFiltered && (
          <button
            onClick={() => { setActiveCategory("All"); setActivePricing("All"); }}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
        <span className="ml-auto text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> of {tools.length} tools
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-lg border border-border bg-muted flex items-center justify-center mb-4">
            <SlidersHorizontal className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold mb-1.5">No tools match these filters</p>
          <p className="text-sm text-muted-foreground max-w-xs">Try a different category or pricing tier.</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[40px_180px_1fr_180px_100px_32px] gap-4 items-center px-5 py-2 bg-muted/40 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <div />
            <div>Tool</div>
            <div>Description</div>
            <div>Tags</div>
            <div>Pricing</div>
            <div />
          </div>
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_180px_1fr_180px_100px_32px] gap-3 md:gap-4 items-center px-4 md:px-5 py-3.5 bg-card hover:bg-accent/40 transition-colors duration-150"
            >
              <ToolIcon tool={tool} />

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors truncate">{tool.name}</span>
                  {tool.featured && <Badge variant="purple" className="text-[10px] py-0 flex-shrink-0 hidden sm:inline-flex">Featured</Badge>}
                </div>
                <p className="text-xs text-muted-foreground truncate">{tool.vendor} · {tool.category}</p>
              </div>

              {/* Always-visible pricing badge */}
              <div className="flex items-center gap-2 md:hidden">
                <Badge variant={pricingBadge[tool.pricing] ?? "blue"} className="text-[10px]">{tool.pricing}</Badge>
              </div>

              <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 min-w-0">{tool.tagline}</p>

              <div className="hidden md:flex flex-wrap gap-1 min-w-0">
                {tool.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium whitespace-nowrap">{tag}</span>
                ))}
              </div>

              <div className="hidden md:block">
                <Badge variant={pricingBadge[tool.pricing] ?? "blue"}>{tool.pricing}</Badge>
              </div>

              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex text-muted-foreground hover:text-primary transition-colors justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
