"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/shared/filter-bar";
import { TrendingUp, BarChart3 } from "lucide-react";
import { caseStudies, caseStudyIndustries } from "@/data/case-studies";
import { cn } from "@/lib/utils";

const industryColors: Record<string, "blue" | "green" | "amber" | "purple" | "pink"> = {
  Finance: "green",
  Healthcare: "blue",
  FinTech: "amber",
  EdTech: "purple",
  Manufacturing: "pink",
  Education: "blue",
  Software: "blue",
  Media: "purple",
  Retail: "amber",
  Technology: "blue",
  Pharma: "green",
  "Enterprise Software": "amber",
  Insurance: "blue",
  Reinsurance: "purple",
};

export function CaseStudiesList() {
  const [activeIndustry, setActiveIndustry] = useState("All");

  const filtered = caseStudies.filter((cs) =>
    activeIndustry === "All" || cs.industry === activeIndustry
  );

  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">Industry</p>
        <FilterBar options={caseStudyIndustries} active={activeIndustry} onChange={setActiveIndustry} size="sm" />
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        <span className="font-semibold text-foreground">{filtered.length}</span> of {caseStudies.length} case studies
        {activeIndustry !== "All" && <> in <span className="font-medium text-foreground">{activeIndustry}</span></>}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cs) => (
          <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="group block">
            <div className={cn(
              "h-full flex flex-col gap-3 p-5 rounded-xl",
              "border-l-[3px] border border-border/60 bg-card",
              "border-l-emerald-500/40 group-hover:border-l-emerald-500",
              "shadow-[var(--shadow-sm)]",
              "transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
              "hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-border/80"
            )}>
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={industryColors[cs.industry] ?? "blue"}>{cs.industry}</Badge>
                {cs.featured && <Badge variant="purple">Featured</Badge>}
              </div>

              {/* Company + title */}
              <div>
                <p className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors duration-150 mb-0.5">{cs.company}</p>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{cs.title}</p>
              </div>

              {/* Key metric */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="line-clamp-1">{cs.metrics[0]}</span>
              </div>

              {/* Problem */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{cs.problem}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-2.5 border-t border-border/40">
                {cs.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold mb-1">No case studies found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
