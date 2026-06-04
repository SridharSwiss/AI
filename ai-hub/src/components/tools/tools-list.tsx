"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilterBar } from "@/components/shared/filter-bar";
import { ExternalLink } from "lucide-react";
import { tools, toolCategories, pricingOptions, type ToolData } from "@/data/tools";

const pricingBadge: Record<string, "green" | "blue" | "amber" | "purple"> = {
  Free: "green",
  Freemium: "blue",
  Paid: "amber",
  Enterprise: "purple",
};

export function ToolsList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePricing, setActivePricing] = useState("All");

  const filtered = tools.filter((tool) => {
    const catMatch = activeCategory === "All" || tool.category === activeCategory;
    const priceMatch = activePricing === "All" || tool.pricing === activePricing;
    return catMatch && priceMatch;
  });

  return (
    <div>
      <FilterBar options={toolCategories} active={activeCategory} onChange={setActiveCategory} className="mb-3" />
      <FilterBar options={pricingOptions} active={activePricing} onChange={setActivePricing} className="mb-6" />

      <p className="text-sm text-muted-foreground mb-6">
        Showing {filtered.length} of {tools.length} tools
        {activeCategory !== "All" && <span> in <strong>{activeCategory}</strong></span>}
        {activePricing !== "All" && <span> · <strong>{activePricing}</strong></span>}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`}>
            <Card className="group h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20 flex items-center justify-center font-bold text-violet-600 flex-shrink-0">
                    {tool.name[0]}
                  </div>
                  <Badge variant={pricingBadge[tool.pricing] ?? "blue"}>{tool.pricing}</Badge>
                </div>
                <CardTitle className="text-base group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                <CardDescription className="text-xs">{tool.vendor} · {tool.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tool.tagline}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                  ))}
                </div>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" /> Visit website
                </a>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No tools found</p>
          <p className="text-sm">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

