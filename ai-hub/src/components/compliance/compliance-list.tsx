"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, ChevronDown } from "lucide-react";
import { complianceFrameworks, complianceRiskLevels, complianceJurisdictions } from "@/data/compliance";
import { cn } from "@/lib/utils";

const statusColor: Record<string, "green" | "blue" | "amber"> = {
  "In Force": "green", Published: "blue", Active: "blue", Proposed: "amber", Draft: "amber",
};

const riskColor: Record<string, "green" | "blue" | "amber" | "destructive"> = {
  low: "green", medium: "blue", high: "amber", critical: "destructive",
};

export function ComplianceList() {
  const [activeRisk, setActiveRisk]             = useState("All");
  const [activeJurisdiction, setActiveJurisdiction] = useState("All");

  const filtered = complianceFrameworks.filter((f) => {
    const riskMatch = activeRisk === "All" || f.riskLevel === activeRisk;
    const jurMatch  = activeJurisdiction === "All" || f.jurisdiction === activeJurisdiction;
    return riskMatch && jurMatch;
  });

  const isFiltered = activeRisk !== "All" || activeJurisdiction !== "All";

  return (
    <div>
      {/* Dropdown filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative">
          <select
            value={activeJurisdiction}
            onChange={(e) => setActiveJurisdiction(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors cursor-pointer"
          >
            {complianceJurisdictions.map((j) => (
              <option key={j} value={j}>{j === "All" ? "All Jurisdictions" : j}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={activeRisk}
            onChange={(e) => setActiveRisk(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors cursor-pointer"
          >
            {complianceRiskLevels.map((r) => (
              <option key={r} value={r}>{r === "All" ? "All Risk Levels" : `${r.charAt(0).toUpperCase() + r.slice(1)} risk`}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {isFiltered && (
          <button
            onClick={() => { setActiveRisk("All"); setActiveJurisdiction("All"); }}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
        <span className="ml-auto text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> of {complianceFrameworks.length} frameworks
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No frameworks found</p>
          <p className="text-sm">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
          {filtered.map((f) => (
            <Link
              key={f.slug}
              href={`/compliance/${f.slug}`}
              className="group flex items-start gap-4 px-5 py-4 bg-card hover:bg-accent/40 transition-colors duration-150"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-primary" />
              </div>

              {/* Main info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors">{f.name}</span>
                  <Badge variant={statusColor[f.status] ?? "blue"} className="text-[10px]">{f.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{f.jurisdiction} · {f.enforcementDate}</p>
                <p className="hidden sm:block text-sm text-muted-foreground line-clamp-1">{f.description}</p>
              </div>

              {/* Requirements preview */}
              <div className="hidden lg:flex flex-col gap-1 min-w-0 max-w-xs">
                {f.keyRequirements.slice(0, 2).map((req) => (
                  <div key={req} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground line-clamp-1">{req}</span>
                  </div>
                ))}
              </div>

              {/* Risk badge */}
              <Badge variant={riskColor[f.riskLevel] ?? "blue"} className={cn("flex-shrink-0 capitalize self-center")}>
                {f.riskLevel} risk
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
