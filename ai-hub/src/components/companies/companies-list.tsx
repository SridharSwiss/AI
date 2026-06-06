"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/shared/filter-bar";
import {
  ExternalLink, Building2,
  Brain, Sparkles, Code2, FlaskConical, Bot, Palette, ShieldCheck, Cpu, Globe,
} from "lucide-react";
import { companies, companyStages } from "@/data/companies";
import { cn } from "@/lib/utils";

const stageVariant: Record<string, "blue" | "green" | "amber" | "purple" | "outline"> = {
  Private: "blue",
  Public: "green",
  Nonprofit: "purple",
  "Research Lab": "amber",
};

const FOCUS_ICONS: Record<string, React.ElementType> = {
  "Foundation Models":  Brain,
  "AI Applications":    Sparkles,
  "Developer Tools":    Code2,
  "Research":           FlaskConical,
  "AI Research":        FlaskConical,
  "Enterprise AI":      Building2,
  "Autonomous Systems": Bot,
  "Creative AI":        Palette,
  "AI Safety":          ShieldCheck,
  "Hardware":           Cpu,
  "Cloud AI":           Globe,
};

const FOCUS_COLORS: Record<string, string> = {
  "Foundation Models":  "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "AI Applications":    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Developer Tools":    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Research":           "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "AI Research":        "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "Enterprise AI":      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Autonomous Systems": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "Creative AI":        "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  "AI Safety":          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Hardware":           "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "Cloud AI":           "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
};

function CompanyIcon({ focus }: { focus: string }) {
  const Icon = FOCUS_ICONS[focus] ?? Brain;
  const colorClass = FOCUS_COLORS[focus] ?? "bg-muted text-muted-foreground";
  return (
    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", colorClass)}>
      <Icon className="w-5 h-5" />
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
              "border border-border/80 bg-card",
              "shadow-[var(--shadow-sm)]",
              "transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
              "hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-border"
            )}>
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <CompanyIcon focus={company.focus} />
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
                    <span key={p} className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">{p}</span>
                  ))}
                  {company.products.length > 4 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">+{company.products.length - 4}</span>
                  )}
                </div>
              </div>

              {/* Tags + link */}
              <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-border/60">
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
          <div className="w-14 h-14 rounded-lg border border-border bg-muted flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold mb-1">No companies found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
