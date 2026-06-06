"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  CheckSquare, X, CheckCircle, FileText,
  ClipboardList, FlaskConical, TrendingUp, Shield, ScanSearch,
  ChevronDown, ChevronUp, Sparkles,
} from "lucide-react";
import { phases } from "@/data/playbooks";
import type { Playbook, ChecklistItem, Phase } from "@/data/playbooks";

const tabConfig: { id: string; label: string; icon: React.ElementType; phaseKey: string | null }[] = [
  { id: "all",    label: "All Phases",  icon: ClipboardList, phaseKey: null },
  { id: "assess", label: "Assess",      icon: ScanSearch,    phaseKey: "assess" },
  { id: "pilot",  label: "Pilot",       icon: FlaskConical,  phaseKey: "pilot" },
  { id: "scale",  label: "Scale",       icon: TrendingUp,    phaseKey: "scale" },
  { id: "govern", label: "Govern",      icon: Shield,        phaseKey: "govern" },
];

const paramToTab: Record<string, string> = {
  playbooks:  "all",
  assessment: "assess",
  pilot:      "pilot",
  scale:      "scale",
  govern:     "govern",
};

const phaseIcons: Record<string, React.ElementType> = {
  assess: ClipboardList,
  pilot:  FlaskConical,
  scale:  TrendingUp,
  govern: Shield,
};

const phaseAccent: Record<string, { border: string; icon: string }> = {
  assess: { border: "border-blue-200 dark:border-blue-800/60",     icon: "text-blue-600 dark:text-blue-400" },
  pilot:  { border: "border-violet-200 dark:border-violet-800/60", icon: "text-violet-600 dark:text-violet-400" },
  scale:  { border: "border-emerald-200 dark:border-emerald-800/60", icon: "text-emerald-600 dark:text-emerald-400" },
  govern: { border: "border-rose-200 dark:border-rose-800/60",     icon: "text-rose-600 dark:text-rose-400" },
};

const levelColor: Record<string, "blue" | "green" | "purple" | "amber"> = {
  beginner:     "green",
  practitioner: "blue",
  manager:      "purple",
  executive:    "amber",
};

const templateTypeBadge: Record<string, string> = {
  survey:        "bg-blue-100    dark:bg-blue-900/50    text-blue-700    dark:text-blue-300",
  questionnaire: "bg-violet-100  dark:bg-violet-900/50  text-violet-700  dark:text-violet-300",
  template:      "bg-slate-100   dark:bg-slate-800      text-slate-700   dark:text-slate-300",
  scorecard:     "bg-amber-100   dark:bg-amber-900/50   text-amber-700   dark:text-amber-300",
  matrix:        "bg-rose-100    dark:bg-rose-900/50    text-rose-700    dark:text-rose-300",
  worksheet:     "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
  framework:     "bg-cyan-100    dark:bg-cyan-900/50    text-cyan-700    dark:text-cyan-300",
};

function TemplatePanel({ item }: { item: ChecklistItem }) {
  return (
    <div className="mt-3 ml-9 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(139,92,246,0.25)", background: "rgba(139,92,246,0.06)" }}>
      {/* template header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ background: "rgba(139,92,246,0.12)", borderColor: "rgba(139,92,246,0.2)" }}>
        <FileText className="w-4 h-4 text-violet-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-tight">{item.templateTitle}</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0 bg-violet-500/20 text-violet-300">
          {item.templateType}
        </span>
      </div>
      {/* instructions */}
      <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p className="text-xs text-white/55 leading-relaxed">{item.instructions}</p>
      </div>
      {/* sections */}
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

  const toggleChecked = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const toggleExpanded = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const total = playbook.checklist.length;
  const done = checked.size;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="playbook-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{ background: "hsl(222 47% 9%)", color: "#fff" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Rich header ─────────────────────────────── */}
        <div className="relative flex-shrink-0 px-6 pt-6 pb-5 border-b border-white/10"
          style={{ background: "linear-gradient(135deg, hsl(222 47% 13%) 0%, hsl(222 47% 10%) 100%)" }}>
          {/* decorative accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-violet-400 to-pink-500 rounded-t-2xl" />

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={levelColor[playbook.level] ?? "blue"}>{playbook.level}</Badge>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  Playbook
                </span>
              </div>
              <h2 id="playbook-modal-title" className="text-xl font-bold leading-tight tracking-tight text-white">{playbook.title}</h2>
              <p className="text-sm text-white/55 mt-1.5 leading-relaxed">{playbook.desc}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Close playbook"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* progress row */}
          <div className="mt-5 flex items-center gap-4">
            <div className="flex-1">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-violet-500 to-pink-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-sm font-bold tabular-nums text-white">{done}</span>
              <span className="text-xs text-white/45">/ {total} done</span>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ──────────────────────────── */}
        <div className="flex-1 overflow-y-auto" style={{ background: "hsl(222 47% 9%)" }}>
          {/* guidance */}
          <div className="px-6 py-5 border-b border-white/8">
            <p className="text-sm text-white/65 leading-relaxed">{playbook.guidance}</p>
          </div>

          {/* checklist */}
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Checklist &amp; Templates</p>
              <span className="text-[11px] font-semibold text-white/40">{done}/{total} completed</span>
            </div>

            <div className="space-y-2">
              {playbook.checklist.map((item, i) => (
                <div key={i} className="rounded-xl border transition-all duration-200"
                  style={{
                    borderColor: checked.has(i) ? "rgba(16,185,129,0.35)" : "rgba(255,255,255,0.08)",
                    background: checked.has(i) ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)",
                  }}>
                  <div className="flex items-center gap-3 px-4 py-3">
                    {/* check toggle */}
                    <button
                      className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full"
                      onClick={() => toggleChecked(i)}
                      aria-label={checked.has(i) ? "Mark incomplete" : "Mark complete"}
                    >
                      <CheckCircle
                        className={`w-5 h-5 transition-all duration-200 ${
                          checked.has(i) ? "text-emerald-400 scale-110" : "text-white/20 hover:text-white/40"
                        }`}
                      />
                    </button>

                    {/* label */}
                    <span
                      className={`flex-1 text-sm leading-snug transition-colors cursor-pointer select-none ${
                        checked.has(i) ? "line-through text-white/30" : "text-white/85"
                      }`}
                      onClick={() => toggleChecked(i)}
                    >
                      {item.item}
                    </span>

                    {/* template toggle */}
                    {item.sections.length > 0 && (
                      <button
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 border transition-all duration-150 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${
                          expanded.has(i)
                            ? "bg-violet-600 border-violet-500 text-white shadow-sm"
                            : "border-white/15 text-white/55 hover:text-white hover:border-white/30 hover:bg-white/8"
                        }`}
                        onClick={(e) => toggleExpanded(i, e)}
                        aria-expanded={expanded.has(i)}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Template
                        {expanded.has(i) ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>

                  {expanded.has(i) && (
                    <div className="px-4 pb-4">
                      <TemplatePanel item={item} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseSection({ phase }: { phase: Phase }) {
  const [activePlaybook, setActivePlaybook] = useState<Playbook | null>(null);
  const accent = phaseAccent[phase.phase] ?? phaseAccent.assess;
  const Icon = phaseIcons[phase.phase] ?? ClipboardList;

  return (
    <div>
      {activePlaybook && (
        <PlaybookModal playbook={activePlaybook} onClose={() => setActivePlaybook(null)} />
      )}
      <div className="flex items-center gap-2.5 mb-4">
        <Icon className={`w-5 h-5 ${accent.icon}`} />
        <h2 className="text-lg font-bold">{phase.label}</h2>
        <span className="text-sm text-muted-foreground">{phase.description}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phase.playbooks.map((pb) => (
          <Card
            key={pb.title}
            className={`group cursor-pointer border border-border rounded-xl bg-card p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all ${accent.border}`}
            onClick={() => setActivePlaybook(pb)}
          >
            <CardHeader className="p-0 pb-3">
              <Badge variant={levelColor[pb.level] ?? "blue"} className="w-fit mb-2">{pb.level}</Badge>
              <CardTitle className="text-base group-hover:text-primary transition-colors">{pb.title}</CardTitle>
              <CardDescription>{pb.desc}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <CheckSquare className="w-4 h-4 text-primary" />
                {pb.checklist.length} checklist items with templates
              </div>
              <span className="text-xs text-primary font-medium group-hover:underline">Open playbook →</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ConsultingToolkitInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawTab = searchParams?.get("tab") ?? "all";
  const activeTab = paramToTab[rawTab] ?? rawTab;

  const setTab = (tabId: string) => {
    const params = new URLSearchParams(Array.from(searchParams?.entries() ?? []));
    if (tabId === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tabId);
    }
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "/consulting-toolkit", { scroll: false });
  };

  const visiblePhases = activeTab === "all"
    ? phases
    : phases.filter((p) => p.phase === activeTab);

  return (
    <div>
      <div className="sticky top-24 z-30 bg-background/95 border-b border-border backdrop-blur-sm -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-8">
        <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
          {tabConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = (tab.id === "all" && activeTab === "all") || tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-12">
        {visiblePhases.map((phase) => (
          <PhaseSection key={phase.phase} phase={phase} />
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
