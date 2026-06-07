"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, ChevronDown } from "lucide-react";
import { caseStudies, caseStudyIndustries } from "@/data/case-studies";
import { cn } from "@/lib/utils";

const industryColors: Record<string, "blue" | "green" | "amber" | "purple" | "pink"> = {
  Finance: "green", Healthcare: "blue", FinTech: "amber", EdTech: "purple",
  Manufacturing: "pink", Education: "blue", Software: "blue", Media: "purple",
  Retail: "amber", Technology: "blue", Pharma: "green",
  "Enterprise Software": "amber", Insurance: "blue", Reinsurance: "purple",
};

// Unique AI tools used across case studies for second filter
const allTools = ["All", ...Array.from(new Set(caseStudies.flatMap((cs) => cs.tags))).sort()];

export function CaseStudiesList() {
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [activeTool, setActiveTool]         = useState("All");

  const filtered = caseStudies.filter((cs) => {
    const indMatch  = activeIndustry === "All" || cs.industry === activeIndustry;
    const toolMatch = activeTool === "All" || cs.tags.includes(activeTool);
    return indMatch && toolMatch;
  });

  const isFiltered = activeIndustry !== "All" || activeTool !== "All";

  return (
    <div>
      {/* Dropdown filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative">
          <select
            value={activeIndustry}
            onChange={(e) => setActiveIndustry(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark] hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors cursor-pointer"
          >
            {caseStudyIndustries.map((i) => (
              <option key={i} value={i}>{i === "All" ? "All Industries" : i}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={activeTool}
            onChange={(e) => setActiveTool(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark] hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors cursor-pointer"
          >
            {allTools.map((t) => (
              <option key={t} value={t}>{t === "All" ? "All AI Tools" : t}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {isFiltered && (
          <button
            onClick={() => { setActiveIndustry("All"); setActiveTool("All"); }}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
        <span className="ml-auto text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> of {caseStudies.length} case studies
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold mb-1">No case studies found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[40px_180px_1fr_200px_160px_120px] gap-4 items-center px-5 py-2 bg-muted/40 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <div />
            <div>Company</div>
            <div>Case Study</div>
            <div>Key Outcome</div>
            <div>Tags</div>
            <div>Industry</div>
          </div>
          {filtered.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_180px_1fr_200px_160px_120px] gap-3 md:gap-4 items-center px-4 md:px-5 py-3.5 bg-card hover:bg-accent/40 transition-colors duration-150 border-l-[3px] border-l-emerald-500/30 hover:border-l-emerald-500"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors truncate">{cs.company}</span>
                  {cs.featured && <Badge variant="purple" className="text-[10px] py-0 flex-shrink-0 hidden sm:inline-flex">Featured</Badge>}
                </div>
                <p className="text-xs text-muted-foreground truncate">{cs.industry}</p>
              </div>

              {/* Always-visible industry badge + outcome on mobile */}
              <div className="flex flex-col items-end gap-1 md:hidden">
                <Badge variant={industryColors[cs.industry] ?? "blue"} className="text-[10px]">{cs.industry}</Badge>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 text-right line-clamp-1 max-w-[110px]">{cs.metrics[0]}</span>
              </div>

              <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 min-w-0">{cs.title}</p>

              <p className="hidden md:block text-sm font-semibold text-emerald-600 dark:text-emerald-400 line-clamp-2 min-w-0">
                {cs.metrics[0]}
              </p>

              <div className="hidden md:flex flex-wrap gap-1 min-w-0">
                {cs.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium whitespace-nowrap">{tag}</span>
                ))}
              </div>

              <div className="hidden md:block">
                <Badge variant={industryColors[cs.industry] ?? "blue"}>{cs.industry}</Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
