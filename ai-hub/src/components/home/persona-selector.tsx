"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lightbulb,
  Code2,
  BarChart3,
  Crown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Persona } from "@/types";

const personas = [
  {
    id: "beginner" as Persona,
    icon: Lightbulb,
    label: "Curious Beginner",
    tagline: "New to AI",
    description:
      "I want to understand what AI is, what it can do, and where to start learning.",
    color: "from-amber-500 to-orange-500",
    bg: "hover:bg-amber-50 dark:hover:bg-amber-950/30 border-amber-200/50 dark:border-amber-800/30",
    active: "bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-600",
    highlight: "text-amber-600 dark:text-amber-400",
    cta: "/learn?level=beginner",
    features: ["Plain-English explainers", "Curated starter resources", "No jargon guides"],
  },
  {
    id: "practitioner" as Persona,
    icon: Code2,
    label: "Builder / Practitioner",
    tagline: "Developer or data scientist",
    description:
      "I build with AI — give me tools, APIs, code examples, and integration guides.",
    color: "from-violet-500 to-blue-500",
    bg: "hover:bg-violet-50 dark:hover:bg-violet-950/30 border-violet-200/50 dark:border-violet-800/30",
    active: "bg-violet-50 dark:bg-violet-950/30 border-violet-400 dark:border-violet-600",
    highlight: "text-violet-600 dark:text-violet-400",
    cta: "/tools",
    features: ["Tool comparisons & APIs", "Code repos & tutorials", "Integration guides"],
  },
  {
    id: "manager" as Persona,
    icon: BarChart3,
    label: "Manager / Decision-Maker",
    tagline: "Evaluating AI for your team",
    description:
      "I need ROI data, vendor comparisons, case studies, and implementation roadmaps.",
    color: "from-emerald-500 to-teal-500",
    bg: "hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border-emerald-200/50 dark:border-emerald-800/30",
    active: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-600",
    highlight: "text-emerald-600 dark:text-emerald-400",
    cta: "/case-studies",
    features: ["ROI metrics & benchmarks", "Vendor comparison tables", "Implementation playbooks"],
  },
  {
    id: "executive" as Persona,
    icon: Crown,
    label: "Executive / CEO",
    tagline: "Setting AI strategy",
    description:
      "I need governance frameworks, risk assessments, compliance guidance, and strategic insights.",
    color: "from-pink-500 to-rose-500",
    bg: "hover:bg-pink-50 dark:hover:bg-pink-950/30 border-pink-200/50 dark:border-pink-800/30",
    active: "bg-pink-50 dark:bg-pink-950/30 border-pink-400 dark:border-pink-600",
    highlight: "text-pink-600 dark:text-pink-400",
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
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Personalized for you
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Who are you exploring AI as?
        </h2>
        <p className="text-muted-foreground">
          Select your role to get a tailored view of the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => setSelected(persona.id)}
            className={cn(
              "relative group text-left p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer",
              selected === persona.id
                ? persona.active
                : cn("border-border/60 bg-card", persona.bg)
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center mb-3 shadow-sm",
                persona.color
              )}
            >
              <persona.icon className="w-5 h-5 text-white" />
            </div>
            <div className={cn("text-xs font-medium mb-1", persona.highlight)}>
              {persona.tagline}
            </div>
            <h3 className="font-semibold text-sm mb-2">{persona.label}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {persona.description}
            </p>

            {selected === persona.id && (
              <ul className="mt-3 space-y-1">
                {persona.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className={cn("w-1 h-1 rounded-full bg-current flex-shrink-0", persona.highlight)} />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </button>
        ))}
      </div>

      {selected && selectedPersona && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="gradient"
            size="lg"
            onClick={() => router.push(selectedPersona.cta)}
            className="gap-2"
          >
            Start my {selectedPersona.label} journey
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.push("/")}>
            Explore everything
          </Button>
        </div>
      )}
    </div>
  );
}
