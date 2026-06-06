"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  CheckSquare, X, CheckCircle, ChevronDown, ChevronRight, FileText,
  ClipboardList, FlaskConical, TrendingUp, Shield,
} from "lucide-react";
import { phases } from "@/data/playbooks";
import type { Playbook, ChecklistItem, Phase } from "@/data/playbooks";

const tabConfig: { id: string; label: string; icon: React.ElementType; phaseKey: string | null }[] = [
  { id: "all",    label: "All Phases",  icon: ClipboardList, phaseKey: null },
  { id: "assess", label: "Assess",      icon: ClipboardList, phaseKey: "assess" },
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

const phaseAccent: Record<string, { border: string; icon: string; dot: string }> = {
  assess: { border: "border-blue-200 dark:border-blue-800/60",    icon: "text-blue-600 dark:text-blue-400",    dot: "bg-blue-500" },
  pilot:  { border: "border-violet-200 dark:border-violet-800/60",icon: "text-violet-600 dark:text-violet-400",dot: "bg-violet-500" },
  scale:  { border: "border-emerald-200 dark:border-emerald-800/60",icon: "text-emerald-600 dark:text-emerald-400",dot: "bg-emerald-500" },
  govern: { border: "border-rose-200 dark:border-rose-800/60",    icon: "text-rose-600 dark:text-rose-400",    dot: "bg-rose-500" },
};

const levelColor: Record<string, "blue" | "green" | "purple" | "amber"> = {
  beginner: "green",
  practitioner: "blue",
  manager: "purple",
  executive: "amber",
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

  const toggleChecked = (i: number) => {
    const next = new Set(checked);
    if (next.has(i)) next.delete(i); else next.add(i);
    setChecked(next);
  };

  const toggleExpanded = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(expanded);
    if (next.has(i)) next.delete(i); else next.add(i);
    setExpanded(next);
  };

  const progress = Math.round((checked.size / playbook.checklist.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-background rounded-2xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-start justify-between gap-4 rounded-t-2xl z-10">
          <div>
            <Badge variant={levelColor[playbook.level] ?? "blue"} className="mb-2">{playbook.level}</Badge>
            <h2 className="text-xl font-bold">{playbook.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{playbook.desc}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent transition-colors flex-shrink-0 text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm text-foreground/80">{playbook.guidance}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Progress</p>
              <p className="text-sm text-muted-foreground">{checked.size} / {playbook.checklist.length} ({progress}%)</p>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Checklist & Templates</p>
            <ul className="space-y-1">
              {playbook.checklist.map((item, i) => (
                <li key={i}>
                  <div
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      checked.has(i)
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60"
                        : "bg-card border-border hover:bg-accent/40"
                    }`}
                    onClick={() => toggleChecked(i)}
                  >
                    <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors ${checked.has(i) ? "text-emerald-500" : "text-muted-foreground/30"}`} />
                    <span className={`text-sm flex-1 transition-colors ${checked.has(i) ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {item.item}
                    </span>
                    <button
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors flex-shrink-0 ml-2 px-2 py-0.5 rounded border border-primary/30 hover:bg-primary/5"
                      onClick={(e) => toggleExpanded(i, e)}
                      title="View template"
                    >
                      <FileText className="w-3 h-3" />
                      <span className="hidden sm:inline">Template</span>
                      {expanded.has(i) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </button>
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
      {activePlaybook && <PlaybookModal playbook={activePlaybook} onClose={() => setActivePlaybook(null)} />}
      <div className="flex items-center gap-2.5 mb-4">
        <Icon className={`w-5 h-5 ${accent.icon}`} />
        <h2 className="text-lg font-bold">{phase.label}</h2>
        <span className="text-sm text-muted-foreground">{phase.description}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phase.playbooks.map((pb) => (
          <Card
            key={pb.title}
            className={`group cursor-pointer border border-border rounded-xl bg-card shadow-sm hover:-translate-y-1 hover:shadow-md transition-all ${accent.border}`}
            onClick={() => setActivePlaybook(pb)}
          >
            <CardHeader className="pb-3">
              <Badge variant={levelColor[pb.level] ?? "blue"} className="w-fit mb-2">{pb.level}</Badge>
              <CardTitle className="text-base group-hover:text-primary transition-colors">{pb.title}</CardTitle>
              <CardDescription>{pb.desc}</CardDescription>
            </CardHeader>
            <CardContent>
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
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  };

  const visiblePhases = activeTab === "all"
    ? phases
    : phases.filter((p) => p.phase === activeTab);

  return (
    <div>
      <div className="sticky top-16 z-30 bg-background/95 border-b border-border backdrop-blur-sm -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-8">
        <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
          {tabConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = (tab.id === "all" && activeTab === "all") || tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
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
