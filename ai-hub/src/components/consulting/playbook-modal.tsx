"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  CheckSquare, X, CheckCircle, FileText,
  ClipboardList, FlaskConical, TrendingUp, Shield, ScanSearch,
  ChevronDown, ChevronUp, Sparkles,
} from "lucide-react";
import { phases } from "@/data/playbooks";
import type { Playbook, ChecklistItem, Phase } from "@/data/playbooks";
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

/* ── Template panel (inside modal) ──────────────────────── */

function TemplatePanel({ item }: { item: ChecklistItem }) {
  return (
    <div className="mt-3 ml-9 rounded-xl overflow-hidden border border-violet-500/20 bg-violet-500/5 dark:border-violet-400/20 dark:bg-violet-500/8">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-violet-500/15 bg-violet-500/8 dark:bg-violet-500/12">
        <FileText className="w-4 h-4 text-violet-500 dark:text-violet-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">{item.templateTitle}</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0 bg-violet-500/15 text-violet-600 dark:text-violet-300">
          {item.templateType}
        </span>
      </div>
      <div className="px-4 py-3 border-b border-border/50">
        <p className="text-xs text-muted-foreground leading-relaxed">{item.instructions}</p>
      </div>
      <div className="px-4 py-3 space-y-4">
        {item.sections.map((section, si) => (
          <div key={si}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500/70 dark:text-violet-400/80 mb-2">{section.heading}</p>
            <ul className="space-y-1.5">
              {section.items.map((q, qi) => (
                <li key={qi} className="flex gap-2.5 text-xs">
                  <span className="w-4 h-4 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-300 flex items-center justify-center font-bold text-[9px] flex-shrink-0 mt-0.5">{qi + 1}</span>
                  <span className="leading-relaxed text-muted-foreground">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Playbook modal ──────────────────────────────────────── */

function PlaybookModal({ playbook, onClose }: { playbook: Playbook; onClose: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const toggleChecked = (i: number) => setChecked((prev) => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });
  const toggleExpanded = (i: number, e: React.MouseEvent) => { e.stopPropagation(); setExpanded((prev) => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; }); };

  const total = playbook.checklist.length;
  const done = checked.size;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 dark:bg-black/65 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="playbook-modal-title"
        className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden glass-card shadow-[0_32px_80px_rgba(109,40,217,0.22)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="relative flex-shrink-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-5 border-b border-border/60 bg-gradient-to-br from-violet-500/8 to-pink-500/5">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-t-2xl" />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={levelColor[playbook.level] ?? "blue"}>{playbook.level}</Badge>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-violet-500" />Playbook
                </span>
              </div>
              <h2 id="playbook-modal-title" className="text-lg sm:text-xl font-bold leading-tight tracking-tight text-foreground">{playbook.title}</h2>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{playbook.desc}</p>
            </div>
            <button onClick={onClose} className="p-2.5 -mr-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Close playbook">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex-1">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-violet-500 to-pink-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-sm font-bold tabular-nums text-foreground">{done}</span>
              <span className="text-xs text-muted-foreground">/ {total} done</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed">{playbook.guidance}</p>
          </div>
          <div className="px-4 sm:px-6 py-4 sm:py-5 pb-safe">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">Checklist &amp; Templates</p>
              <span className="text-[11px] font-semibold text-muted-foreground">{done}/{total} completed</span>
            </div>
            <div className="space-y-2">
              {playbook.checklist.map((item, i) => (
                <div key={i} className={cn(
                  "rounded-xl border transition-all duration-200",
                  checked.has(i)
                    ? "border-emerald-500/30 bg-emerald-500/6"
                    : "border-border/60 bg-card/40 hover:bg-card/80"
                )}>
                  <div className="flex items-center gap-3 px-3 sm:px-4 py-3 min-h-[52px]">
                    <button className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-full p-1 -ml-1 min-w-[36px] min-h-[36px] flex items-center justify-center" onClick={() => toggleChecked(i)} aria-label={checked.has(i) ? "Mark incomplete" : "Mark complete"}>
                      <CheckCircle className={cn("w-5 h-5 transition-all duration-200", checked.has(i) ? "text-emerald-500 scale-110" : "text-muted-foreground/30 hover:text-muted-foreground/60")} />
                    </button>
                    <span className={cn("flex-1 text-sm leading-snug transition-colors cursor-pointer select-none", checked.has(i) ? "line-through text-muted-foreground/40" : "text-foreground")} onClick={() => toggleChecked(i)}>
                      {item.item}
                    </span>
                    {item.sections.length > 0 && (
                      <button
                        className={cn("inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 border transition-all duration-150 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                          expanded.has(i)
                            ? "bg-violet-500 border-violet-500 text-white shadow-sm"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-violet-500/40 hover:bg-violet-500/8"
                        )}
                        onClick={(e) => toggleExpanded(i, e)}
                        aria-expanded={expanded.has(i)}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Template</span>
                        {expanded.has(i) ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                  {expanded.has(i) && <div className="px-4 pb-4"><TemplatePanel item={item} /></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Playbook card (grid view) ────────────────────────────── */

function PlaybookCard({ pb, phase, onOpen }: { pb: Playbook; phase: Phase; onOpen: () => void }) {
  const Icon = phaseIconMap[phase.phase] ?? ClipboardList;
  return (
    <button
      onClick={onOpen}
      className="group text-left p-5 rounded-2xl glass-card border-border/60 hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(109,40,217,0.15)] transition-all duration-200 w-full animate-fade-up"
    >
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-4", phaseIconColor[phase.phase] ?? "bg-muted text-muted-foreground")}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant={levelColor[pb.level] ?? "blue"} className="text-[10px]">{pb.level}</Badge>
        <Badge variant={phaseBadgeVariant[phase.phase] ?? "blue"} className="text-[10px]">{phase.label}</Badge>
      </div>
      <h3 className="font-semibold text-sm mb-1.5 text-foreground group-hover:text-primary transition-colors line-clamp-2">{pb.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{pb.desc}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <CheckSquare className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        <span>{pb.checklist.length} items</span>
        <span className="ml-auto text-[10px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Open →
        </span>
      </div>
    </button>
  );
}

/* ── Inner client component ──────────────────────────────── */

function ConsultingToolkitInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawTab = searchParams?.get("tab") ?? "all";
  const activePhase = paramToPhase[rawTab] ?? rawTab;
  const [activePlaybook, setActivePlaybook] = useState<{ pb: Playbook; phase: Phase } | null>(null);

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
      {activePlaybook && (
        <PlaybookModal playbook={activePlaybook.pb} onClose={() => setActivePlaybook(null)} />
      )}

      {/* Horizontal tab bar — scrollable on mobile, no wrap */}
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
            <PlaybookCard pb={pb} phase={phase} onOpen={() => setActivePlaybook({ pb, phase })} />
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
