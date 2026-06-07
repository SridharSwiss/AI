"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink, Building2, ChevronDown,
  Brain, Sparkles, Code2, FlaskConical, Bot, Palette, ShieldCheck, Cpu, Globe,
} from "lucide-react";
import { companies, companyStages } from "@/data/companies";
import { cn } from "@/lib/utils";

const stageVariant: Record<string, "blue" | "green" | "amber" | "purple" | "outline"> = {
  Private: "blue", Public: "green", Nonprofit: "purple", "Research Lab": "amber",
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

// Get unique focus areas for dropdown
const focusAreas = ["All", ...Array.from(new Set(companies.map((c) => c.focus))).sort()];

export function CompaniesList() {
  const [activeStage, setActiveStage] = useState("All");
  const [activeFocus, setActiveFocus] = useState("All");

  const filtered = companies.filter((c) => {
    const stageMatch = activeStage === "All" || c.stage === activeStage;
    const focusMatch = activeFocus === "All" || c.focus === activeFocus;
    return stageMatch && focusMatch;
  });

  const isFiltered = activeStage !== "All" || activeFocus !== "All";

  return (
    <div>
      {/* Dropdown filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Stage dropdown */}
        <div className="relative">
          <select
            value={activeStage}
            onChange={(e) => setActiveStage(e.target.value)}
            className="appearance-none w-full pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark] hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors cursor-pointer"
          >
            <option value="All">All Types</option>
            {companyStages.filter((s) => s !== "All").map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Focus dropdown */}
        <div className="relative">
          <select
            value={activeFocus}
            onChange={(e) => setActiveFocus(e.target.value)}
            className="appearance-none w-full pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark] hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors cursor-pointer"
          >
            {focusAreas.map((f) => (
              <option key={f} value={f}>{f === "All" ? "All Focus Areas" : f}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {isFiltered && (
          <button
            onClick={() => { setActiveStage("All"); setActiveFocus("All"); }}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
        <span className="ml-auto text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> of {companies.length} companies
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-lg border border-border bg-muted flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold mb-1">No companies found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[40px_180px_1fr_180px_130px_32px] gap-4 items-center px-5 py-2 bg-muted/40 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <div />
            <div>Company</div>
            <div>Description</div>
            <div>Products</div>
            <div>Type</div>
            <div />
          </div>
          {filtered.map((company) => (
            <Link
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_180px_1fr_180px_130px_32px] gap-3 md:gap-4 items-center px-4 md:px-5 py-3.5 bg-card hover:bg-accent/40 transition-colors duration-150"
            >
              <CompanyIcon focus={company.focus} />

              <div className="min-w-0">
                <span className="text-sm font-semibold group-hover:text-primary transition-colors truncate block">{company.name}</span>
                <p className="text-xs text-muted-foreground truncate">{company.focus} · {company.founded}</p>
              </div>

              {/* Always-visible stage badge */}
              <div className="flex items-center gap-2 md:hidden">
                <Badge variant={stageVariant[company.stage] ?? "outline"} className="text-[10px]">{company.stage}</Badge>
              </div>

              <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 min-w-0">{company.description}</p>

              <div className="hidden md:flex flex-wrap gap-1 min-w-0">
                {company.products.slice(0, 2).map((p) => (
                  <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium whitespace-nowrap">{p}</span>
                ))}
              </div>

              <div className="hidden md:block">
                <Badge variant={stageVariant[company.stage] ?? "outline"}>{company.stage}</Badge>
              </div>

              <a
                href={company.website}
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
