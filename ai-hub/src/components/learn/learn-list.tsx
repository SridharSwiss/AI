"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilterBar, ToggleChip } from "@/components/shared/filter-bar";
import { BookOpen, Play, Award, Clock, ExternalLink, Book, GraduationCap } from "lucide-react";
import { learnResources, resourceTypes, resourceLevels } from "@/data/learn";
import { cn } from "@/lib/utils";

const typeIcon: Record<string, React.ElementType> = {
  course: GraduationCap, youtube: Play, certification: Award, book: Book, tutorial: BookOpen,
};

const typeBg: Record<string, string> = {
  course: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  youtube: "bg-red-500/10 text-red-600 dark:text-red-400",
  certification: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  book: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  tutorial: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

const typeColor: Record<string, "blue" | "pink" | "amber" | "purple" | "green"> = {
  course: "blue", youtube: "pink", certification: "amber", book: "purple", tutorial: "green",
};

const levelColor: Record<string, "green" | "blue" | "purple"> = {
  beginner: "green", intermediate: "blue", advanced: "purple",
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <BookOpen className="w-6 h-6 text-muted-foreground" />
      </div>
      <p className="text-base font-semibold mb-1.5">No resources match these filters</p>
      <p className="text-sm text-muted-foreground max-w-xs">Try adjusting your filters or toggling off "Free Only".</p>
    </div>
  );
}

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
      <div className="space-y-3 mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">Type</p>
          <FilterBar options={resourceTypes} active={activeType} onChange={setActiveType} size="sm" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">Level</p>
          <FilterBar options={resourceLevels} active={activeLevel} onChange={setActiveLevel} size="sm" />
        </div>
        <ToggleChip label="Free only" active={freeOnly} onChange={setFreeOnly} />
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> of {learnResources.length} resources
        </p>
        {isFiltered && (
          <button onClick={() => { setActiveType("All"); setActiveLevel("All"); setFreeOnly(false); }} className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors">Clear filters</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => {
            const TypeIcon = typeIcon[r.type] ?? BookOpen;
            return (
              <Card key={r.slug} className="group hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-border/80">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", typeBg[r.type] ?? "bg-muted text-muted-foreground")}>
                      <TypeIcon className="w-4.5 h-4.5" />
                    </div>
                    {r.free && <Badge variant="green" className="flex-shrink-0">Free</Badge>}
                  </div>
                  <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">{r.title}</CardTitle>
                  <CardDescription className="text-xs mt-0.5">{r.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{r.description}</p>
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <Badge variant={typeColor[r.type] ?? "blue"}>{r.type}</Badge>
                    <Badge variant={levelColor[r.level] ?? "blue"}>{r.level}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                      <Clock className="w-3 h-3" />
                      ~{r.readTime}h
                    </span>
                  </div>
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    Open resource
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
