"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Search, Zap, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "AI Tools",    value: "82+" },
  { label: "Companies",   value: "33+" },
  { label: "Case Studies",value: "31+" },
  { label: "Frameworks",  value: "16+" },
  { label: "Resources",   value: "72+" },
];

const highlights = [
  { icon: Zap,       text: "Hand-verified weekly" },
  { icon: TrendingUp,text: "ROI data on every case study" },
  { icon: Shield,    text: "16 compliance frameworks" },
];

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "88vh" }}>
      {/* Minimal background — one centered radial, no blobs, no noise */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/40 via-background to-background dark:from-violet-950/15 dark:via-background" />
      </div>

      <div className="container-site py-24 text-center">
        {/* Eyebrow — specific, not fluffy */}
        <div className="animate-fade-up delay-75 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background/80 text-xs font-semibold text-muted-foreground mb-10 shadow-[var(--shadow-xs)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Hand-verified · Updated weekly
        </div>

        {/* Headline — bold, plain, no shimmer */}
        <h1 className="animate-fade-up delay-150 text-display max-w-3xl mx-auto mb-4 text-foreground">
          The reference layer<br />for the AI landscape.
        </h1>

        {/* Sub — specific numbers, not adjectives */}
        <p className="animate-fade-up delay-300 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
          82 tools. 33 companies. 31 case studies. 16 compliance frameworks.
        </p>

        <div className="animate-fade-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/search">
            <Button variant="gradient" size="xl" className="gap-2.5 w-full sm:w-auto btn-press shadow-primary">
              <Search className="w-4 h-4" />
              Search the directory
            </Button>
          </Link>
          <Link href="/tools">
            <Button variant="outline" size="xl" className="gap-2.5 w-full sm:w-auto btn-press bg-background/60 backdrop-blur">
              Browse AI tools
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Stats strip */}
        <div className="animate-fade-up delay-500">
          <div className="inline-grid grid-cols-3 sm:grid-cols-5 gap-px rounded-2xl overflow-hidden border border-border bg-border shadow-[var(--shadow-sm)] mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center px-6 py-5 bg-background">
                <div className="text-2xl sm:text-3xl font-black text-foreground mb-0.5 tracking-tight tabular-nums">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium text-center leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="animate-fade-up delay-600 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-muted-foreground">
          {highlights.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-foreground/60" />
              </div>
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none -z-10" />
    </section>
  );
}
