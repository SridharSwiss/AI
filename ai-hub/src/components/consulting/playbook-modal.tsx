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

const SELECT_CLS = "appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-white/10 bg-white/[0.04] text-foreground dark:[color-scheme:dark] hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors cursor-pointer";

/* ── Template panel (inside modal) ──────────────────────── */

function TemplatePanel({ item }: { item: ChecklistItem }) {
  return (
    <div className="mt-3 ml-9 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(139,92,246,0.25)", background: "rgba(139,92,246,0.06)" }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ background: "rgba(139,92,246,0.12)", borderColor: "rgba(139,92,246,0.2)" }}>
        <FileText className="w-4 h-4 text-violet-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-tight">{item.templateTitle}</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0 bg-violet-500/20 text-violet-300">
          {item.templateType}
        </span>
      </div>
      <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p className="text-xs text-white/55 leading-relaxed">{item.instructions}</p>
      </div>
      <div className="px-4 py-3 space-y-4">
        {item.sections.map((section, si) => (
          <div key={si}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-violet-400/80 mb-2">{section.heading}</p>
            <ul className="space-y-1.5">
              {section.items.map((q, qi) => (
                <li key={qi} className="flex gap-2.5 text-xs">
                  <span className="w-4 h-4 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-[9px] flex-shrink-0 mt-0.5">{qi + 1}</span>
                  <span className="leading-relaxed text-white/70">{q}</span>
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
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="playbook-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{ background: "hsl(222 47% 9%)", color: "#fff" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex-shrink-0 px-5 sm:px-6 pt-6 pb-5 border-b border-white/10"
          style={{ background: "linear-gradient(135deg, hsl(222 47% 13%) 0%, hsl(222 47% 10%) 100%)" }}>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-violet-400 to-pink-500 rounded-t-2xl" />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={levelColor[playbook.level] ?? "blue"}>{playbook.level}</Badge>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-violet-400" />Playbook
                </span>
              </div>
              <h2 id="playbook-modal-title" className="text-lg sm:text-xl font-bold leading-tight tracking-tight text-white">{playbook.title}</h2>
              <p className="text-sm text-white/55 mt-1.5 leading-relaxed">{playbook.desc}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30" aria-label="Close playbook">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex-1">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-violet-500 to-pink-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-sm font-bold tabular-nums text-white">{done}</span>
              <span className="text-xs text-white/45">/ {total} done</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto" style={{ background: "hsl(222 47% 9%)" }}>
          <div className="px-5 sm:px-6 py-5 border-b border-white/[0.06]">
            <p className="text-sm text-white/65 leading-relaxed">{playbook.guidance}</p>
          </div>
          <div className="px-5 sm:px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Checklist &amp; Templates</p>
              <span className="text-[11px] font-semibold text-white/40">{done}/{total} completed</span>
            </div>
            <div className="space-y-2">
              {playbook.checklist.map((item, i) => (
                <div key={i} className="rounded-xl border transition-all duration-200"
                  style={{ borderColor: checked.has(i) ? "rgba(16,185,129,0.35)" : "rgba(255,255,255,0.08)", background: checked.has(i) ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <button className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full" onClick={() => toggleChecked(i)} aria-label={checked.has(i) ? "Mark incomplete" : "Mark complete"}>
                      <CheckCircle className={cn("w-5 h-5 transition-all duration-200", checked.has(i) ? "text-emerald-400 scale-110" : "text-white/20 hover:text-white/40")} />
                    </button>
                    <span className={cn("flex-1 text-sm leading-snug transition-colors cursor-pointer select-none", checked.has(i) ? "line-through text-white/30" : "text-white/85")} onClick={() => toggleChecked(i)}>
                      {item.item}
                    </span>
                    {item.sections.length > 0 && (
                      <button
                        className={cn("inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 border transition-all duration-150 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                          expanded.has(i) ? "bg-violet-600 border-violet-500 text-white shadow-sm" : "border-white/15 text-white/55 hover:text-white hover:border-white/30 hover:bg-white/8"
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

/* ── Flat list layout ────────────────────────────────────── */

function PlaybookRow({ pb, phase, onOpen }: { pb: Playbook; phase: Phase; onOpen: () => void }) {
  const Icon = phaseIconMap[phase.phase] ?? ClipboardList;
  return (
    <button
      onClick={onOpen}
      className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_220px_1fr_160px_140px_120px] gap-3 md:gap-4 items-center px-4 md:px-5 py-3.5 bg-white/[0.02] hover:bg-white/[0.06] transition-colors duration-150 w-full text-left"
    >
      {/* Icon */}
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", phaseIconColor[phase.phase] ?? "bg-muted text-muted-foreground")}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Title + level */}
      <div className="min-w-0">
        <span className="text-sm font-semibold group-hover:text-primary transition-colors truncate block">{pb.title}</span>
        <p className="text-xs text-muted-foreground truncate">{phase.label}</p>
      </div>

      {/* Mobile: level + checklist count */}
      <div className="flex flex-col items-end gap-1 md:hidden">
        <Badge variant={levelColor[pb.level] ?? "blue"} className="text-[10px]">{pb.level}</Badge>
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{pb.checklist.length} items</span>
      </div>

      {/* Description */}
      <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 min-w-0 text-left">{pb.desc}</p>

      {/* Level badge */}
      <div className="hidden md:flex">
        <Badge variant={levelColor[pb.level] ?? "blue"}>{pb.level}</Badge>
      </div>

      {/* Phase badge */}
      <div className="hidden md:flex">
        <Badge variant={phaseBadgeVariant[phase.phase] ?? "blue"}>{phase.label}</Badge>
      </div>

      {/* Checklist count + CTA */}
      <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
        <CheckSquare className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        {pb.checklist.length} items
        <span className="ml-auto text-[10px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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

  return (
    <div>
      {activePlaybook && (
        <PlaybookModal playbook={activePlaybook.pb} onClose={() => setActivePlaybook(null)} />
      )}

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative">
          <select value={activePhase} onChange={(e) => setPhase(e.target.value)} className={SELECT_CLS}>
            {phaseOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <span className="ml-auto text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{allPlaybooks.length}</span> of {phases.flatMap((p) => p.playbooks).length} playbooks
        </span>
      </div>

      {/* List */}
      <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[40px_220px_1fr_160px_140px_120px] gap-4 items-center px-5 py-2 bg-white/[0.04] text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <div />
          <div>Playbook</div>
          <div>Description</div>
          <div>Level</div>
          <div>Phase</div>
          <div>Items</div>
        </div>

        {allPlaybooks.map(({ pb, phase }) => (
          <PlaybookRow key={`${phase.phase}-${pb.title}`} pb={pb} phase={phase} onOpen={() => setActivePlaybook({ pb, phase })} />
        ))}
      </div>
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
