"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilterBar } from "@/components/shared/filter-bar";
import { BookOpen, Play, Award, Clock, ExternalLink, Book } from "lucide-react";
import { learnResources, resourceTypes, resourceLevels } from "@/data/learn";

const typeIcon: Record<string, React.ElementType> = {
  course: BookOpen,
  youtube: Play,
  certification: Award,
  book: Book,
  tutorial: BookOpen,
};

const typeColor: Record<string, "blue" | "pink" | "amber" | "purple" | "green"> = {
  course: "blue",
  youtube: "pink",
  certification: "amber",
  book: "purple",
  tutorial: "green",
};

const levelColor: Record<string, "green" | "blue" | "purple"> = {
  beginner: "green",
  intermediate: "blue",
  advanced: "purple",
};

export function LearnList() {
  const [activeType, setActiveType] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = learnResources.filter((r) => {
    const typeMatch = activeType === "All" || r.type === activeType;
    const levelMatch = activeLevel === "All" || r.level === activeLevel;
    const freeMatch = !freeOnly || r.free;
    return typeMatch && levelMatch && freeMatch;
  });

  return (
    <div>
      <FilterBar options={resourceTypes} active={activeType} onChange={setActiveType} className="mb-3" />
      <FilterBar options={resourceLevels} active={activeLevel} onChange={setActiveLevel} className="mb-3" />
      <div className="mb-6">
        <button
          onClick={() => setFreeOnly(!freeOnly)}
          className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${
            freeOnly
              ? "bg-emerald-600 text-white border-transparent"
              : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          Free Only
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Showing {filtered.length} of {learnResources.length} resources
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((r) => {
          const TypeIcon = typeIcon[r.type] ?? BookOpen;
          return (
            <Card key={r.slug} className="group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={typeColor[r.type] ?? "blue"}>{r.type}</Badge>
                    <Badge variant={levelColor[r.level] ?? "blue"}>{r.level}</Badge>
                  </div>
                  {r.free && <Badge variant="green">Free</Badge>}
                </div>
                <CardTitle className="text-base group-hover:text-primary transition-colors leading-snug">{r.title}</CardTitle>
                <CardDescription>{r.provider}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{r.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    ~{r.readTime}h
                  </div>
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                    <ExternalLink className="w-3 h-3" /> Open resource
                  </a>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No resources found</p>
          <p className="text-sm">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

