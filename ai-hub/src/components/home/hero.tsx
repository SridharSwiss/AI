"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Search, Zap, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "AI Tools", value: "82+" },
  { label: "Companies", value: "33+" },
  { label: "Case Studies", value: "26+" },
  { label: "Frameworks", value: "17+" },
  { label: "Resources", value: "72+" },
];

const highlights = [
  { icon: Zap, text: "Instant filtered search" },
  { icon: TrendingUp, text: "Curated & updated regularly" },
  { icon: Shield, text: "Compliance & governance" },
];

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden noise">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/60 via-background to-background dark:from-violet-950/25 dark:via-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-violet-400/8 dark:bg-violet-500/10 rounded-full blur-[120px] -translate-y-1/3" />
        <div className="absolute top-1/4 left-[15%]  w-[400px] h-[400px] bg-violet-300/10 dark:bg-violet-600/8 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-[15%] w-[350px] h-[350px] bg-pink-300/8  dark:bg-pink-500/8  rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-1/3   w-[500px] h-[300px] bg-blue-300/6   dark:bg-blue-500/6  rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="container-site py-24 text-center">
        <div className="animate-fade-up delay-75 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/12 to-pink-500/12 border border-violet-500/25 text-sm font-medium text-violet-600 dark:text-violet-400 mb-10 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          The AI landscape, organized for you
        </div>

        <h1 className="animate-fade-up delay-150 text-display max-w-4xl mx-auto mb-6">
          Navigate AI with{" "}
          <span className="gradient-text-animated">clarity &amp; confidence</span>
        </h1>

        <p className="animate-fade-up delay-300 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Tools, companies, learning paths, case studies, compliance frameworks, and implementation playbooks - all in one curated, searchable platform.
        </p>

        <div className="animate-fade-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/search">
            <Button variant="gradient" size="xl" className="gap-2.5 w-full sm:w-auto btn-press shadow-primary">
              <Search className="w-4 h-4" />
              Search the AI landscape
            </Button>
          </Link>
          <Link href="/tools">
            <Button variant="outline" size="xl" className="gap-2.5 w-full sm:w-auto btn-press bg-background/60 backdrop-blur">
              Browse AI Tools
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="animate-fade-up delay-500">
          <div className="inline-grid grid-cols-3 sm:grid-cols-5 gap-px rounded-2xl overflow-hidden border border-border/50 bg-border/30 shadow-card mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center px-6 py-5 bg-background/90 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-0.5 tracking-tight">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium text-center leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up delay-600 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-muted-foreground">
          {highlights.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none -z-10" />
    </section>
  );
}
