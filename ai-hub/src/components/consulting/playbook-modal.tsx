"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckSquare, ArrowRight, Briefcase, X, CheckCircle, ChevronDown, ChevronRight, FileText } from "lucide-react";
import { phases } from "@/data/playbooks";
import type { Playbook, ChecklistItem } from "@/data/playbooks";

const levelColor: Record<string, "blue" | "green" | "purple" | "amber"> = {
  beginner: "green",
  practitioner: "blue",
  manager: "purple",
  executive: "amber",
};

const templateTypeBadge: Record<string, string> = {
  survey: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  questionnaire: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  template: "bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300",
  scorecard: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  matrix: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  worksheet: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  framework: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
};

function TemplatePanel({ item }: { item: ChecklistItem }) {
  return (
    <div className="mt-3 ml-8 p-4 rounded-xl border border-border bg-muted/40 space-y-4">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
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
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent transition-colors flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Guidance */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">{playbook.guidance}</p>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Progress</p>
              <p className="text-sm text-muted-foreground">{checked.size} / {playbook.checklist.length} ({progress}%)</p>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Checklist with expandable templates */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Checklist & Templates</p>
            <ul className="space-y-1">
              {playbook.checklist.map((item, i) => (
                <li key={i}>
                  <div
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      checked.has(i)
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50"
                        : "border-border hover:bg-accent"
                    }`}
                    onClick={() => toggleChecked(i)}
                  >
                    <CheckCircle
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors ${checked.has(i) ? "text-emerald-500" : "text-muted-foreground/30"}`}
                    />
                    <span className={`text-sm flex-1 transition-colors ${checked.has(i) ? "line-through text-muted-foreground" : ""}`}>
                      {item.item}
                    </span>
                    <button
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors flex-shrink-0 ml-2 px-2 py-0.5 rounded border border-primary/20 hover:bg-primary/5"
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

      {/* Phase overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {phases.map((p) => (
          <div key={p.phase} className={`p-4 rounded-xl border ${p.bg}`}>
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center mb-2`}>
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <p className="font-semibold text-sm">{p.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
          </div>
        ))}
      </div>

      {/* Playbooks by phase */}
      <div className="space-y-12">
        {phases.map((p) => (
          <div key={p.phase}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className={`w-6 h-6 rounded bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
              {p.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {p.playbooks.map((pb) => (
                <Card
                  key={pb.title}
                  className="group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
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
        ))}
      </div>
    </>
  );
}
