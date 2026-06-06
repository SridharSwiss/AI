"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  CheckSquare, X, CheckCircle, FileText,
  ClipboardList, FlaskConical, TrendingUp, Shield, ScanSearch,
  ChevronDown, ChevronRight,
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
    <div className="mt-2 ml-8 p-4 rounded-xl border border-border bg-muted/40 space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${templateTypeBadge[item.templateType] ?? "bg-muted text-muted-foreground"}`}>
          {item.templateType}
        </span>
        <span className="text-sm font-semibold">{item.templateTitle}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.instructions}</p>
      <div className="space-y-3">
        {item.sections.map((section, si) => (
          <div key={si}>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">{section.heading}</p>
            <ul className="space-y-1.5">
              {section.items.map((q, qi) => (
                <li key={qi} className="text-xs text-foreground/80 flex gap-2">
                  <span className="text-muted-foreground flex-shrink-0">{qi + 1}.</span>
                  <span>{q}</span>
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
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="playbook-modal-title"
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-6 flex items-start justify-between gap-4 rounded-t-2xl z-10">
          <div className="min-w-0">
            <Badge variant={levelColor[playbook.level] ?? "blue"} className="mb-2">{playbook.level}</Badge>
            <h2 id="playbook-modal-title" className="text-xl font-bold leading-tight">{playbook.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{playbook.desc}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-shrink-0 text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close playbook"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-sm text-foreground/80 leading-relaxed">{playbook.guidance}</p>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Progress</p>
              <p className="text-sm tabular-nums text-muted-foreground">{done} / {total}</p>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Checklist &amp; Templates</p>
            <ul className="divide-y divide-border/40">
              {playbook.checklist.map((item, i) => (
                <li key={i} className="py-3 last:pb-0 first:pt-0">
                  <div className="flex items-center justify-between gap-4">
                    <button
                      className="flex items-center gap-3 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                      onClick={() => toggleChecked(i)}
                    >
                      <CheckCircle
                        className={`w-5 h-5 flex-shrink-0 transition-colors ${
                          checked.has(i) ? "text-emerald-500" : "text-muted-foreground/30"
                        }`}
                      />
                      <span
                        className={`text-sm transition-colors ${
                          checked.has(i) ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {item.item}
                      </span>
                    </button>
                    {item.sections.length > 0 && (
                      <button
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 border border-primary/20 rounded-md px-2.5 py-1 hover:bg-primary/5 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={(e) => toggleExpanded(i, e)}
                        aria-expanded={expanded.has(i)}
                      >
                        <FileText className="w-3 h-3" />
                        <span>Template</span>
                        {expanded.has(i) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                  {expanded.has(i) && <TemplatePanel item={item} />}
                </li>
              ))}
            </ul>
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
