"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  CheckSquare,
  ClipboardList, FlaskConical, TrendingUp, Shield, ScanSearch,
} from "lucide-react";
import { phases, slugify } from "@/data/playbooks";
import type { Playbook, Phase } from "@/data/playbooks";
import { cn } from "@/lib/utils";

/* ── Constants ───────────────────────────────────────────── */

const phaseOptions = [
  { id: "all",    label: "All Phases", icon: ClipboardList },
  { id: "assess", label: "Assess",     icon: ScanSearch    },
  { id: "pilot",  label: "Pilot",      icon: FlaskConical  },
  { id: "scale",  label: "Scale",      icon: TrendingUp    },
  { id: "govern", label: "Govern",     icon: Shield        },
];

const paramToPhase: Record<string, string> = {
  playbooks: "all", assessment: "assess", pilot: "pilot", scale: "scale", govern: "govern",
};

const phaseIconMap: Record<string, React.ElementType> = {
  assess: ScanSearch, pilot: FlaskConical, scale: TrendingUp, govern: Shield,
};

const phaseIconColor: Record<string, string> = {
  assess: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  pilot:  "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  scale:  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  govern: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const phaseBadgeVariant: Record<string, "blue" | "purple" | "green" | "destructive"> = {
  assess: "blue", pilot: "purple", scale: "green", govern: "destructive",
};

const levelColor: Record<string, "blue" | "green" | "purple" | "amber"> = {
  beginner: "green", practitioner: "blue", manager: "purple", executive: "amber",
};

/* ── Playbook card (links to detail page) ────────────────── */

function PlaybookCard({ pb, phase }: { pb: Playbook; phase: Phase }) {
  const Icon = phaseIconMap[phase.phase] ?? ClipboardList;
  return (
    <Link
      href={`/consulting-toolkit/${slugify(pb.title)}`}
      className="group text-left p-5 rounded-2xl glass-card border-border/60 hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(109,40,217,0.15)] transition-all duration-200 w-full animate-fade-up flex flex-col"
    >
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0", phaseIconColor[phase.phase] ?? "bg-muted text-muted-foreground")}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant={levelColor[pb.level] ?? "blue"} className="text-[10px]">{pb.level}</Badge>
        <Badge variant={phaseBadgeVariant[phase.phase] ?? "blue"} className="text-[10px]">{phase.label}</Badge>
      </div>
      <h3 className="font-semibold text-sm mb-1.5 text-foreground group-hover:text-primary transition-colors line-clamp-2">{pb.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">{pb.desc}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <CheckSquare className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        <span>{pb.checklist.length} items</span>
        <span className="ml-auto text-[10px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Open →
        </span>
      </div>
    </Link>
  );
}

/* ── Inner client component ──────────────────────────────── */

function ConsultingToolkitInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawTab = searchParams?.get("tab") ?? "all";
  const activePhase = paramToPhase[rawTab] ?? rawTab;

  const setPhase = (phaseId: string) => {
    const params = new URLSearchParams(Array.from(searchParams?.entries() ?? []));
    if (phaseId === "all") { params.delete("tab"); } else { params.set("tab", phaseId); }
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "/consulting-toolkit", { scroll: false });
  };

  const visiblePhases = activePhase === "all" ? phases : phases.filter((p) => p.phase === activePhase);
  const allPlaybooks = visiblePhases.flatMap((phase) => phase.playbooks.map((pb) => ({ pb, phase })));
  const totalCount = phases.flatMap((p) => p.playbooks).length;

  return (
    <div>
      {/* Horizontal tab bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
          {phaseOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = activePhase === opt.id;
            const count = opt.id === "all"
              ? totalCount
              : phases.find(p => p.phase === opt.id)?.playbooks.length ?? 0;
            return (
              <button
                key={opt.id}
                onClick={() => setPhase(opt.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_4px_16px_hsl(var(--primary)/0.35)]"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{opt.label}</span>
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0",
                  isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                )}>{count}</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2 sm:hidden">
          <span className="font-semibold text-foreground">{allPlaybooks.length}</span> / {totalCount} playbooks
        </p>
        <p className="text-sm text-muted-foreground hidden sm:block mt-1">
          Showing <span className="font-semibold text-foreground">{allPlaybooks.length}</span> of {totalCount} playbooks
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allPlaybooks.map(({ pb, phase }, i) => (
          <div key={`${phase.phase}-${pb.title}`} style={{ animationDelay: `${i * 40}ms` }}>
            <PlaybookCard pb={pb} phase={phase} />
          </div>
        ))}
      </div>

      {allPlaybooks.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <ClipboardList className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No playbooks found for this phase.</p>
        </div>
      )}
    </div>
  );
}

export function ConsultingToolkitClient() {
  return (
    <Suspense fallback={<div className="h-12 animate-pulse bg-muted rounded-lg" />}>
      <ConsultingToolkitInner />
    </Suspense>
  );
}
