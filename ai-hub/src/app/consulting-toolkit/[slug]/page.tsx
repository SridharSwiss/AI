"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle, FileText, ChevronDown, ChevronUp, Sparkles,
  ArrowLeft, ClipboardList, ScanSearch, FlaskConical, TrendingUp, Shield,
} from "lucide-react";
import { getPlaybookBySlug, getAllPlaybookSlugs, slugify, phases } from "@/data/playbooks";
import type { ChecklistItem } from "@/data/playbooks";
import { cn } from "@/lib/utils";

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

export default function PlaybookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const result = getPlaybookBySlug(slug);
  if (!result) notFound();

  const { pb, phase } = result;
  const Icon = phaseIconMap[phase.phase] ?? ClipboardList;

  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggleChecked = (i: number) =>
    setChecked((prev) => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });
  const toggleExpanded = (i: number) =>
    setExpanded((prev) => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });

  const total = pb.checklist.length;
  const done = checked.size;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  // Related playbooks from same phase
  const related = phase.playbooks
    .filter((p) => p.title !== pb.title)
    .slice(0, 3);

  return (
    <div className="container-site py-8 sm:py-12 max-w-3xl">
      {/* Back */}
      <Link
        href="/consulting-toolkit"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Consulting Toolkit
      </Link>

      {/* Header card */}
      <div className="glass-card rounded-2xl overflow-hidden mb-6 shadow-[0_8px_40px_rgba(109,40,217,0.12)]">
        <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
        <div className="p-5 sm:p-8 bg-gradient-to-br from-violet-500/8 to-pink-500/5">
          <div className="flex items-start gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", phaseIconColor[phase.phase] ?? "bg-muted text-muted-foreground")}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant={levelColor[pb.level] ?? "blue"}>{pb.level}</Badge>
                <Badge variant={phaseBadgeVariant[phase.phase] ?? "blue"}>{phase.label}</Badge>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-violet-500" />Playbook
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight text-foreground mb-2">{pb.title}</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">{pb.desc}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1">
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-violet-500 to-pink-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-sm font-bold tabular-nums text-foreground">{done}</span>
              <span className="text-xs text-muted-foreground">/ {total} done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guidance */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 mb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Guidance</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{pb.guidance}</p>
      </div>

      {/* Checklist */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">Checklist &amp; Templates</p>
          <span className="text-[11px] font-semibold text-muted-foreground">{done}/{total} completed</span>
        </div>
        <div className="space-y-2">
          {pb.checklist.map((item, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border transition-all duration-200",
                checked.has(i)
                  ? "border-emerald-500/30 bg-emerald-500/6"
                  : "border-border/60 bg-card/40 hover:bg-card/80"
              )}
            >
              <div className="flex items-center gap-3 px-3 sm:px-4 py-3 min-h-[52px]">
                <button
                  className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-full p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  onClick={() => toggleChecked(i)}
                  aria-label={checked.has(i) ? "Mark incomplete" : "Mark complete"}
                >
                  <CheckCircle className={cn("w-5 h-5 transition-all duration-200", checked.has(i) ? "text-emerald-500 scale-110" : "text-muted-foreground/30 hover:text-muted-foreground/60")} />
                </button>
                <span
                  className={cn("flex-1 text-sm leading-snug transition-colors cursor-pointer select-none", checked.has(i) ? "line-through text-muted-foreground/40" : "text-foreground")}
                  onClick={() => toggleChecked(i)}
                >
                  {item.item}
                </span>
                {item.sections.length > 0 && (
                  <button
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 border transition-all duration-150 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                      expanded.has(i)
                        ? "bg-violet-500 border-violet-500 text-white shadow-sm"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-violet-500/40 hover:bg-violet-500/8"
                    )}
                    onClick={() => toggleExpanded(i)}
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

      {/* Related playbooks */}
      {related.length > 0 && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">More from {phase.label}</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rPb) => (
              <Link
                key={rPb.title}
                href={`/consulting-toolkit/${slugify(rPb.title)}`}
                className="glass-card rounded-xl p-4 hover:border-violet-500/40 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <Badge variant={levelColor[rPb.level] ?? "blue"} className="text-[10px] mb-2">{rPb.level}</Badge>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{rPb.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rPb.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
