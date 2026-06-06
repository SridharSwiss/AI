"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb, Code2, BarChart3, Crown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Persona } from "@/types";

const personas = [
  {
    id: "beginner" as Persona,
    icon: Lightbulb,
    label: "Curious Beginner",
    tagline: "New to AI",
    description: "I want to understand what AI is, what it can do, and where to start learning.",
    gradient: "from-amber-500 to-orange-500",
    ring: "ring-amber-400/60",
    activeBg: "bg-amber-50 dark:bg-amber-950/30",
    activeBorder: "border-amber-400 dark:border-amber-500",
    iconBg: "bg-amber-500/10",
    accent: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    cta: "/learn?level=beginner",
    features: ["Plain-English explainers", "Curated starter resources", "No jargon guides"],
  },
  {
    id: "practitioner" as Persona,
    icon: Code2,
    label: "Builder / Practitioner",
    tagline: "Developer or data scientist",
    description: "I build with AI - give me tools, APIs, code examples, and integration guides.",
    gradient: "from-violet-500 to-blue-500",
    ring: "ring-violet-400/60",
    activeBg: "bg-violet-50 dark:bg-violet-950/30",
    activeBorder: "border-violet-400 dark:border-violet-500",
    iconBg: "bg-violet-500/10",
    accent: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
    cta: "/tools",
    features: ["Tool comparisons & APIs", "Code repos & tutorials", "Integration guides"],
  },
  {
    id: "manager" as Persona,
    icon: BarChart3,
    label: "Manager / Decision-Maker",
    tagline: "Evaluating AI for your team",
    description: "I need ROI data, vendor comparisons, case studies, and implementation roadmaps.",
    gradient: "from-emerald-500 to-teal-500",
    ring: "ring-emerald-400/60",
    activeBg: "bg-emerald-50 dark:bg-emerald-950/30",
    activeBorder: "border-emerald-400 dark:border-emerald-500",
    iconBg: "bg-emerald-500/10",
    accent: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    cta: "/case-studies",
    features: ["ROI metrics & benchmarks", "Vendor comparison tables", "Implementation playbooks"],
  },
  {
    id: "executive" as Persona,
    icon: Crown,
    label: "Executive / CEO",
    tagline: "Setting AI strategy",
    description: "I need governance frameworks, risk assessments, compliance guidance, and strategic insights.",
    gradient: "from-pink-500 to-rose-500",
    ring: "ring-pink-400/60",
    activeBg: "bg-pink-50 dark:bg-pink-950/30",
    activeBorder: "border-pink-400 dark:border-pink-500",
    iconBg: "bg-pink-500/10",
    accent: "text-pink-600 dark:text-pink-400",
    dot: "bg-pink-500",
    cta: "/compliance",
    features: ["AI governance & risk", "Regulatory compliance", "Strategic frameworks"],
  },
];

export function PersonaSelector() {
  const [selected, setSelected] = useState<Persona | null>(null);
  const router = useRouter();
  const selectedPersona = personas.find((p) => p.id === selected);

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Personalized for you</p>
        <h2 className="text-headline mb-3">Who are you exploring AI as?</h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">Select your role to get a tailored view of the platform.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {personas.map((persona) => {
          const isSelected = selected === persona.id;
          return (
            <button
              key={persona.id}
              onClick={() => setSelected(isSelected ? null : persona.id)}
              className={cn(
                "group relative text-left p-5 rounded-2xl border-2 outline-none",
                "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "focus-visible:ring-2 focus-visible:ring-offset-2",
                persona.ring,
                isSelected
                  ? cn(persona.activeBg, persona.activeBorder, "shadow-md")
                  : "border-border/60 bg-card hover:border-border hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]",
                "active:scale-[0.98]"
              )}
            >
              <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-sm", "transition-transform duration-200", "group-hover:scale-105", persona.gradient)}>
                <persona.icon className="w-5 h-5 text-white" />
              </div>
              <div className={cn("text-xs font-semibold mb-1", persona.accent)}>{persona.tagline}</div>
              <h3 className="font-semibold text-sm mb-2 text-foreground">{persona.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{persona.description}</p>
              <div className={cn("mt-4 space-y-1.5 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]", isSelected ? "max-h-32 opacity-100" : "max-h-0 opacity-0")}>
                {persona.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", persona.dot)} />
                    {f}
                  </div>
                ))}
              </div>
              {isSelected && (
                <div className={cn("absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center", "bg-gradient-to-br", persona.gradient)}>
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className={cn("flex flex-col sm:flex-row items-center justify-center gap-3", "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]", selected ? "max-h-24 opacity-100" : "max-h-0 opacity-0")}>
        {selected && selectedPersona && (
          <>
            <Button variant="gradient" size="lg" onClick={() => router.push(selectedPersona.cta)} className="gap-2.5 shadow-primary">
              Start my {selectedPersona.label} journey
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/")} className="gap-2">Explore everything</Button>
          </>
        )}
      </div>
    </div>
  );
}
