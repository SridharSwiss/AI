"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilterBar } from "@/components/shared/filter-bar";
import { ExternalLink } from "lucide-react";
import { resources, resourceCategories } from "@/data/resources";

const categoryColor: Record<string, "blue" | "green" | "purple" | "amber" | "pink"> = {
  "Research Paper": "purple",
  "Annual Report": "blue",
  "Industry Report": "blue",
  "Government Document": "green",
  "Regulation": "amber",
  "Whitepaper": "pink",
};

export function ResourcesList() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = resources.filter((r) =>
    activeCategory === "All" || r.category === activeCategory
  );

  return (
    <div>
      <FilterBar options={resourceCategories} active={activeCategory} onChange={setActiveCategory} className="mb-6" />

      <p className="text-sm text-muted-foreground mb-6">
        {filtered.length} curated documents
        {activeCategory !== "All" && <span> in <strong>{activeCategory}</strong></span>}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((r) => (
          <Card key={r.slug} className="group hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_16px_48px_rgba(0,0,0,0.32)] transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant={categoryColor[r.category] ?? "blue"}>{r.category}</Badge>
                <span className="text-xs text-muted-foreground">{r.year}</span>
              </div>
              <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">{r.title}</CardTitle>
              <CardDescription>{r.source}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{r.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {r.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                ))}
              </div>
              <a href={r.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                <ExternalLink className="w-3 h-3" /> Access document
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No documents found</p>
          <p className="text-sm">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

