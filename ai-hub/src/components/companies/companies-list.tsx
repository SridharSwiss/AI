"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/shared/filter-bar";
import { ExternalLink, Building2 } from "lucide-react";
import { companies, companyStages } from "@/data/companies";
import { cn } from "@/lib/utils";

const stageVariant: Record<string, "blue" | "green" | "amber" | "purple" | "outline"> = {
  Private: "blue",
  Public: "green",
  Nonprofit: "purple",
  "Research Lab": "amber",
};

const focusColors: Record<string, string> = {
  "Foundation Models":   "from-violet-500/15 to-purple-500/15 border-violet-500/20 text-violet-700 dark:text-violet-300",
  "Developer Tools":     "from-blue-500/15 to-cyan-500/15 border-blue-500/20 text-blue-700 dark:text-blue-300",
  "AI Applications":     "from-emerald-500/15 to-teal-500/15 border-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  "Research":            "from-pink-500/15 to-rose-500/15 border-pink-500/20 text-pink-700 dark:text-pink-300",
  "Enterprise AI":       "from-amber-500/15 to-orange-500/15 border-amber-500/20 text-amber-700 dark:text-amber-300",
  "Autonomous Systems":  "from-sky-500/15 to-blue-500/15 border-sky-500/20 text-sky-700 dark:text-sky-300",
  "Creative AI":         "from-fuchsia-500/15 to-pink-500/15 border-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-300",
};
const defaultFocusColor = "from-violet-500/10 to-blue-500/10 border-violet-500/15 text-violet-700 dark:text-violet-300";

function CompanyAvatar({ name, focus }: { name: string; focus: string }) {
  const color = focusColors[focus] ?? defaultFocusColor;
  return (
    <div className={cn(
      "w-11 h-11 rounded-xl bg-gradient-to-br border flex items-center justify-center flex-shrink-0",
      "text-base font-bold select-none",
      color
    )}>
      {name[0]}
    </div>
  );
}

export function CompaniesList() {
  const [activeStage, setActiveStage] = useState("All");

  const filtered = companies.filter((c) =>
    activeStage === "All" || c.stage === activeStage
  );

  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">Type</p>
        <FilterBar options={companyStages} active={activeStage} onChange={setActiveStage} size="sm" />
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        <span className="font-semibold text-foreground">{filtered.length}</span> of {companies.length} companies
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((company) => (
          <Link key={company.slug} href={`/companies/${company.slug}`} className="group block">
            <div className={cn(
              "h-full flex flex-col gap-4 p-5 rounded-xl",
              "border border-border/60 bg-card",
              "shadow-[var(--shadow-sm)]",
              "transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
              "hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-border/80"
            )}>
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <CompanyAvatar name={company.name} focus={company.focus} />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors duration-150 truncate">{company.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{company.focus} · {company.founded}</p>
                  </div>
                </div>
                <Badge variant={stageVariant[company.stage] ?? "outline"} className="flex-shrink-0">{company.stage}</Badge>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">{company.description}</p>

              {/* Products */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">Key Products</p>
                <div className="flex flex-wrap gap-1">
                  {company.products.slice(0, 4).map((p) => (
                    <span key={p} className="text-[11px] px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground font-medium">{p}</span>
                  ))}
                  {company.products.length > 4 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground font-medium">+{company.products.length - 4}</span>
                  )}
                </div>
              </div>

              {/* Tags + link */}
              <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-border/40">
                <div className="flex flex-wrap gap-1">
                  {company.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="purple" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold mb-1">No companies found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
