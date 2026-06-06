"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/home/aurora-background";

const words = ["clarity", "precision", "authority", "purpose"];

function CountUp({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        setCount(start);
        if (start >= target) clearInterval(timer);
      }, 30);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "88vh" }}>
      <AuroraBackground />

      <div className="container-site py-24 text-center">
        <div className="animate-fade-up delay-75 w-full flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
            </span>
            EU AI Act in force · Are you compliant? Read the guide →
          </div>
        </div>

        <div className="animate-fade-up delay-100 flex items-center justify-center gap-3 mb-6">
          <hr className="flex-1 max-w-[80px] border-border/50" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The AI Reference Layer</span>
          <hr className="flex-1 max-w-[80px] border-border/50" />
        </div>

        <h1 className="animate-fade-up delay-150 max-w-4xl mx-auto mb-6 text-foreground">
          <span className="text-display-serif block">Navigate AI with</span>
          <span
            className={`text-display-serif gradient-text inline-block transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            {words[wordIndex]}
          </span>
        </h1>

        <p className="animate-fade-up delay-300 text-sm font-semibold uppercase tracking-wider text-muted-foreground max-w-2xl mx-auto mb-4">
          82 tools. 33 companies. 31 case studies. 16 compliance frameworks.
        </p>

        <div className="animate-fade-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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

        <div className="animate-fade-up delay-500 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { target: 82, label: "AI Tools" },
            { target: 33, label: "Companies" },
            { target: 31, label: "Case Studies" },
            { target: 16, label: "Frameworks" },
          ].map(({ target, label }) => (
            <div key={label} className="flex flex-col items-center p-4 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm">
              <div className="text-2xl font-bold gradient-text">
                <CountUp target={target} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none -z-10" />
    </section>
  );
}
