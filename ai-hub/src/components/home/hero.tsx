"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "88vh" }}>
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/60 via-background to-background dark:from-violet-950/20 dark:via-background" />
      </div>

      <div className="container-site py-24 text-center">
        <div className="animate-fade-up delay-75 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 text-xs font-semibold text-violet-600 dark:text-violet-400 mb-10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500" />
          </span>
          The AI landscape, organized for you
        </div>

        <h1 className="animate-fade-up delay-150 text-display max-w-4xl mx-auto mb-6 text-foreground">
          Navigate AI with<br />
          <span className="gradient-text">clarity &amp; confidence</span>
        </h1>

        <p className="animate-fade-up delay-300 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Tools, companies, learning paths, case studies, compliance frameworks,
          and implementation playbooks - all in one curated, searchable platform.
        </p>

        <div className="animate-fade-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none -z-10" />
    </section>
  );
}
