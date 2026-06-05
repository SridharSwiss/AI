"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckSquare, ArrowRight, Briefcase, X, CheckCircle, ChevronDown, ChevronRight, FileText } from "lucide-react";
import { phases } from "@/data/playbooks";
import type { Playbook, ChecklistItem } from "@/data/playbooks";

// Phase index → hard-coded dark-mode-safe classes (Tailwind can't scan data files)
const phaseStyles: Record<string, {
  card: string;
  iconGradient: string;
  sectionDot: string;
}> = {
  assess: {
    card: "bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60",
    iconGradient: "from-blue-500 to-cyan-500",
    sectionDot: "from-blue-500 to-cyan-500",
  },
  pilot: {
    card: "bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/60",
    iconGradient: "from-violet-500 to-purple-500",
    sectionDot: "from-violet-500 to-purple-500",
  },
  scale: {
    card: "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60",
    iconGradient: "from-emerald-500 to-teal-500",
    sectionDot: "from-emerald-500 to-teal-500",
  },
  govern: {
    card: "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60",
    iconGradient: "from-rose-500 to-pink-500",
    sectionDot: "from-rose-500 to-pink-500",
  },
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
    <div className="mt-2 ml-8 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/70 space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${templateTypeBadge[item.templateType] ?? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}`}>
          {item.templateType}
        </span>
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.templateTitle}</span>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.instructions}</p>
      <div className="space-y-3">
        {item.sections.map((section, si) => (
          <div key={si}>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-2">{section.heading}</p>
            <ul className="space-y-1.5">
              {section.items.map((q, qi) => (
                <li key={qi} className="text-xs text-zinc-700 dark:text-zinc-300 flex gap-2">
                  <span className="text-zinc-400 dark:text-zinc-500 flex-shrink-0">{qi + 1}.</span>
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

interface PlaybookModalProps {
  playbook: Playbook;
  onClose: () => void;
}

function PlaybookModal({ playbook, onClose }: PlaybookModalProps) {
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-6 flex items-start justify-between gap-4 rounded-t-2xl z-10">
          <div>
            <Badge variant={levelColor[playbook.level] ?? "blue"} className="mb-2">{playbook.level}</Badge>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{playbook.title}</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{playbook.desc}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-shrink-0 text-zinc-500 dark:text-zinc-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Guidance */}
          <div className="p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{playbook.guidance}</p>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Progress</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{checked.size} / {playbook.checklist.length} ({progress}%)</p>
            </div>
            <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Checklist */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-3">Checklist & Templates</p>
            <ul className="space-y-1">
              {playbook.checklist.map((item, i) => (
                <li key={i}>
                  <div
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      checked.has(i)
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60"
                        : "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                    onClick={() => toggleChecked(i)}
                  >
                    <CheckCircle
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors ${
                        checked.has(i) ? "text-emerald-500" : "text-zinc-300 dark:text-zinc-600"
                      }`}
                    />
                    <span className={`text-sm flex-1 transition-colors ${
                      checked.has(i)
                        ? "line-through text-zinc-400 dark:text-zinc-500"
                        : "text-zinc-800 dark:text-zinc-200"
                    }`}>
                      {item.item}
                    </span>
                    <button
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors flex-shrink-0 ml-2 px-2 py-0.5 rounded border border-primary/30 dark:border-primary/40 hover:bg-primary/5 dark:hover:bg-primary/10"
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

export function ConsultingToolkitClient() {
  const [activePlaybook, setActivePlaybook] = useState<Playbook | null>(null);

  return (
    <>
      {activePlaybook && (
        <PlaybookModal playbook={activePlaybook} onClose={() => setActivePlaybook(null)} />
      )}

      {/* Phase overview cards — hardcoded dark-mode classes so Tailwind picks them up */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {phases.map((p) => {
          const s = phaseStyles[p.phase] ?? phaseStyles.assess;
          return (
            <div key={p.phase} className={`p-4 rounded-xl ${s.card}`}>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.iconGradient} flex items-center justify-center mb-2`}>
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{p.label}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{p.description}</p>
            </div>
          );
        })}
      </div>

      {/* Playbooks by phase */}
      <div className="space-y-12">
        {phases.map((p) => {
          const s = phaseStyles[p.phase] ?? phaseStyles.assess;
          return (
            <div key={p.phase}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <span className={`w-6 h-6 rounded bg-gradient-to-br ${s.sectionDot} flex items-center justify-center`}>
                  <ArrowRight className="w-3 h-3 text-white" />
                </span>
                {p.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {p.playbooks.map((pb) => (
                  <Card
                    key={pb.title}
                    className="group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
                    onClick={() => setActivePlaybook(pb)}
                  >
                    <CardHeader className="pb-3">
                      <Badge variant={levelColor[pb.level] ?? "blue"} className="w-fit mb-2">{pb.level}</Badge>
                      <CardTitle className="text-base group-hover:text-primary transition-colors text-zinc-900 dark:text-zinc-100">
                        {pb.title}
                      </CardTitle>
                      <CardDescription className="text-zinc-500 dark:text-zinc-400">{pb.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
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
        })}
      </div>
    </>
  );
}
