"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { BookOpen, PlayCircle, Award, ExternalLink, BookMarked, GraduationCap, Code2, Clock, ChevronDown } from "lucide-react";
import { learnResources, resourceTypes, resourceLevels } from "@/data/learn";
import { cn } from "@/lib/utils";

const typeIcon: Record<string, React.ElementType> = {
  course: GraduationCap, youtube: PlayCircle, certification: Award, book: BookMarked, tutorial: Code2,
};

const typeBg: Record<string, string> = {
  course:        "bg-blue-500/10 dark:bg-blue-500/[0.18] text-blue-600 dark:text-blue-400",
  youtube:       "bg-red-500/10 dark:bg-red-500/[0.18] text-red-600 dark:text-red-400",
  certification: "bg-amber-500/10 dark:bg-amber-500/[0.18] text-amber-600 dark:text-amber-400",
  book:          "bg-purple-500/10 dark:bg-purple-500/[0.18] text-purple-600 dark:text-purple-400",
  tutorial:      "bg-emerald-500/10 dark:bg-emerald-500/[0.18] text-emerald-600 dark:text-emerald-400",
};

const typeColor: Record<string, "blue" | "pink" | "amber" | "purple" | "green"> = {
  course: "blue", youtube: "pink", certification: "amber", book: "purple", tutorial: "green",
};

const levelColor: Record<string, "green" | "blue" | "purple"> = {
  beginner: "green", intermediate: "blue", advanced: "purple",
};

const SELECT_CLS = "appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark] hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors cursor-pointer";

export function LearnList() {
  const [activeType, setActiveType]   = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");
  const [freeOnly, setFreeOnly]       = useState(false);

  const filtered = learnResources.filter((r) => {
    const typeMatch  = activeType  === "All" || r.type  === activeType;
    const levelMatch = activeLevel === "All" || r.level === activeLevel;
    const freeMatch  = !freeOnly || r.free;
    return typeMatch && levelMatch && freeMatch;
  });

  const isFiltered = activeType !== "All" || activeLevel !== "All" || freeOnly;

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Type dropdown */}
        <div className="relative">
          <select value={activeType} onChange={(e) => setActiveType(e.target.value)} className={SELECT_CLS}>
            <option value="All">All Types</option>
            {resourceTypes.filter((t) => t !== "All").map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Level dropdown */}
        <div className="relative">
          <select value={activeLevel} onChange={(e) => setActiveLevel(e.target.value)} className={SELECT_CLS}>
            <option value="All">All Levels</option>
            {resourceLevels.filter((l) => l !== "All").map((l) => (
              <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Free only toggle */}
        <button
          onClick={() => setFreeOnly(!freeOnly)}
          className={cn(
            "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
            freeOnly
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          Free only
        </button>

        {isFiltered && (
          <button
            onClick={() => { setActiveType("All"); setActiveLevel("All"); setFreeOnly(false); }}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            Clear filters
          </button>
        )}

        <span className="ml-auto text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> of {learnResources.length} resources
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold mb-1.5">No resources match these filters</p>
          <p className="text-sm text-muted-foreground max-w-xs">Try adjusting your filters or toggling off "Free Only".</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[40px_220px_1fr_140px_130px_80px] gap-4 items-center px-5 py-2 bg-muted/40 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <div />
            <div>Resource</div>
            <div>Description</div>
            <div>Tags</div>
            <div>Level / Type</div>
            <div>Duration</div>
          </div>

          {filtered.map((r) => {
            const TypeIcon = typeIcon[r.type] ?? GraduationCap;
            return (
              <a
                key={r.slug}
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[40px_1fr] md:grid-cols-[40px_220px_1fr_140px_130px_80px] gap-4 items-center px-5 py-3.5 bg-card hover:bg-accent/40 transition-colors duration-150"
              >
                {/* Icon */}
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", typeBg[r.type] ?? "bg-muted text-muted-foreground")}>
                  <TypeIcon className="w-5 h-5" />
                </div>

                {/* Title + provider */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-sm font-semibold group-hover:text-primary transition-colors truncate">{r.title}</span>
                    {r.free && <Badge variant="green" className="text-[10px] py-0 flex-shrink-0">Free</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{r.provider}</p>
                </div>

                {/* Description */}
                <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 min-w-0">{r.description}</p>

                {/* Tags */}
                <div className="hidden md:flex flex-wrap gap-1 min-w-0">
                  {r.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium whitespace-nowrap">{tag}</span>
                  ))}
                </div>

                {/* Level + type badges */}
                <div className="hidden md:flex flex-wrap gap-1">
                  <Badge variant={levelColor[r.level] ?? "blue"} className="text-[10px]">{r.level}</Badge>
                  <Badge variant={typeColor[r.type] ?? "blue"} className="text-[10px]">{r.type}</Badge>
                </div>

                {/* Duration */}
                <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  ~{r.readTime}h
                  <ExternalLink className="w-3 h-3 ml-auto text-muted-foreground/50 group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
