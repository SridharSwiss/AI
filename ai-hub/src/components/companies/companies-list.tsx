"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilterBar } from "@/components/shared/filter-bar";
import { ExternalLink } from "lucide-react";
import { companies, companyFocusAreas, companyStages } from "@/data/companies";

export function CompaniesList() {
  const [activeFocus, setActiveFocus] = useState("All");
  const [activeStage, setActiveStage] = useState("All");

  const filtered = companies.filter((c) => {
    const focusMatch = activeFocus === "All" || c.focus === activeFocus;
    const stageMatch = activeStage === "All" || c.stage === activeStage;
    return focusMatch && stageMatch;
  });

  return (
    <div>
      <FilterBar options={companyStages} active={activeStage} onChange={setActiveStage} className="mb-3" />

      <p className="text-sm text-muted-foreground mb-6">
        Showing {filtered.length} of {companies.length} companies
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((company) => (
          <Link key={company.slug} href={`/companies/${company.slug}`}>
            <Card className="group h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{company.name}</CardTitle>
                    <CardDescription>{company.focus} · Founded {company.founded}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs flex-shrink-0">{company.stage}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
                <div>
                  <p className="text-xs font-medium mb-1.5 text-muted-foreground uppercase tracking-wide">Key Products</p>
                  <div className="flex flex-wrap gap-1">
                    {company.products.slice(0, 4).map((p) => (
                      <span key={p} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{p}</span>
                    ))}
                    {company.products.length > 4 && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">+{company.products.length - 4}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {company.tags.map((tag) => (
                    <Badge key={tag} variant="purple" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" /> {company.website.replace("https://", "")}
                </a>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No companies found</p>
          <p className="text-sm">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

