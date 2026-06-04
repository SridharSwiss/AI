"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FilterBar } from "@/components/shared/filter-bar";
import { TrendingUp } from "lucide-react";
import { caseStudies, caseStudyIndustries } from "@/data/case-studies";

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
};

export function CaseStudiesList() {
  const [activeIndustry, setActiveIndustry] = useState("All");

  const filtered = caseStudies.filter((cs) =>
    activeIndustry === "All" || cs.industry === activeIndustry
  );

  return (
    <div>
      <FilterBar options={caseStudyIndustries} active={activeIndustry} onChange={setActiveIndustry} className="mb-6" />

      <p className="text-sm text-muted-foreground mb-6">
        Showing {filtered.length} of {caseStudies.length} case studies
        {activeIndustry !== "All" && <span> in <strong>{activeIndustry}</strong></span>}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((cs) => (
          <Link key={cs.slug} href={`/case-studies/${cs.slug}`}>
            <Card className="group h-full hover:shadow-md transition-all duration-200 border-l-4 border-l-emerald-500/40 hover:border-l-emerald-500 cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={industryColors[cs.industry] ?? "blue"}>{cs.industry}</Badge>
                  {cs.featured && <Badge variant="purple">Featured</Badge>}
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{cs.company}</CardTitle>
                <p className="text-sm text-muted-foreground">{cs.title}</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{cs.metrics[0]}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Problem</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{cs.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Solution</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{cs.solution}</p>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {cs.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No case studies found</p>
          <p className="text-sm">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

