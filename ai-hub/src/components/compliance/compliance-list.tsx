"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilterBar } from "@/components/shared/filter-bar";
import { Shield, CheckCircle } from "lucide-react";
import { complianceFrameworks, complianceRiskLevels, complianceJurisdictions } from "@/data/compliance";

const statusColor: Record<string, "green" | "blue" | "amber"> = {
  "In Force": "green",
  Published: "blue",
  Active: "blue",
  Proposed: "amber",
  Draft: "amber",
};

const riskColor: Record<string, "green" | "blue" | "amber" | "destructive"> = {
  low: "green",
  medium: "blue",
  high: "amber",
  critical: "destructive",
};

export function ComplianceList() {
  const [activeRisk, setActiveRisk] = useState("All");
  const [activeJurisdiction, setActiveJurisdiction] = useState("All");

  const filtered = complianceFrameworks.filter((f) => {
    const riskMatch = activeRisk === "All" || f.riskLevel === activeRisk;
    const jurMatch = activeJurisdiction === "All" || f.jurisdiction === activeJurisdiction;
    return riskMatch && jurMatch;
  });

  return (
    <div>
      <FilterBar options={complianceJurisdictions} active={activeJurisdiction} onChange={setActiveJurisdiction} className="mb-3" />
      <FilterBar options={complianceRiskLevels} active={activeRisk} onChange={setActiveRisk} className="mb-6" />

      <p className="text-sm text-muted-foreground mb-6">
        Showing {filtered.length} of {complianceFrameworks.length} frameworks
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((f) => (
          <Link key={f.slug} href={`/compliance/${f.slug}`}>
            <Card className="h-full group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusColor[f.status] ?? "blue"}>{f.status}</Badge>
                    <Badge variant={riskColor[f.riskLevel] ?? "blue"} className="capitalize">{f.riskLevel} risk</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{f.jurisdiction}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{f.name}</CardTitle>
                </div>
                <CardDescription className="text-xs font-medium">{f.enforcementDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{f.description}</p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Key Requirements</p>
                  <ul className="space-y-1">
                    {f.keyRequirements.slice(0, 3).map((req) => (
                      <li key={req} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                    {f.keyRequirements.length > 3 && (
                      <li className="text-xs text-muted-foreground pl-5">+{f.keyRequirements.length - 3} more requirements</li>
                    )}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-1">
                  {f.tags.map((tag) => (
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
          <p className="text-lg font-medium mb-2">No frameworks found</p>
          <p className="text-sm">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

