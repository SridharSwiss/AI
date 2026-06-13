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
            className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark] hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors cursor-pointer"
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
            className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark] hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors cursor-pointer"
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
        <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[40px_200px_1fr_260px_120px] gap-4 items-center px-5 py-2 bg-white/[0.03] text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <div />
            <div>Framework</div>
            <div>Description</div>
            <div>Key Requirements</div>
            <div>Risk Level</div>
          </div>
          {filtered.map((f) => (
            <Link
              key={f.slug}
              href={`/compliance/${f.slug}`}
              className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_200px_1fr_260px_120px] gap-3 md:gap-4 items-center px-4 md:px-5 py-3.5 hover:bg-white/[0.04] transition-colors duration-150"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors truncate">{f.name}</span>
                  <Badge variant={statusColor[f.status] ?? "blue"} className="text-[10px] flex-shrink-0 hidden sm:inline-flex">{f.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{f.jurisdiction} · {f.enforcementDate}</p>
              </div>

              {/* Always-visible risk badge */}
              <div className="flex flex-col items-end gap-1 md:hidden">
                <Badge variant={riskColor[f.riskLevel] ?? "blue"} className="capitalize text-[10px]">{f.riskLevel}</Badge>
                <Badge variant={statusColor[f.status] ?? "blue"} className="text-[10px] sm:hidden">{f.status}</Badge>
              </div>

              <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 min-w-0">{f.description}</p>

              <div className="hidden md:flex flex-col gap-1 min-w-0">
                {f.keyRequirements.slice(0, 2).map((req) => (
                  <div key={req} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground line-clamp-1">{req}</span>
                  </div>
                ))}
              </div>

              <div className="hidden md:block">
                <Badge variant={riskColor[f.riskLevel] ?? "blue"} className="capitalize">
                  {f.riskLevel} risk
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
