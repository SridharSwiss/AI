"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
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
    <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "92vh" }}>
      <AuroraBackground />

      <div className="container-site py-28 text-center relative z-10">
        {/* Eyebrow badge — glassmorphism pill */}
        <div className="animate-fade-up delay-75 w-full flex justify-center mb-10">
          <Link
            href="/compliance/eu-ai-act"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card ring-gradient text-xs font-semibold text-amber-300 dark:text-amber-300 hover:scale-105 transition-transform duration-200 glow-primary-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            EU AI Act in force · Are you compliant? Read the guide
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Eyebrow label */}
        <div className="animate-fade-up delay-100 flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-eyebrow text-muted-foreground tracking-[0.18em]">The AI Reference Layer</span>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-up delay-150 max-w-5xl mx-auto mb-8">
          <span className="text-display-serif block text-foreground">Navigate AI with</span>
          <span
            className={`text-display-serif gradient-text-vivid inline-block transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            {words[wordIndex]}
          </span>
        </h1>

        {/* Subline */}
        <p className="animate-fade-up delay-200 text-sm font-medium uppercase tracking-widest text-muted-foreground max-w-2xl mx-auto mb-12">
          82 tools · 33 companies · 31 case studies · 16 compliance frameworks
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/search">
            <Button
              variant="gradient"
              size="xl"
              className="gap-2.5 w-full sm:w-auto btn-press shadow-primary glow-primary hover:glow-primary ring-gradient"
            >
              <Search className="w-4 h-4" />
              Search the AI landscape
            </Button>
          </Link>
          <Link href="/tools">
            <Button
              variant="outline"
              size="xl"
              className="gap-2.5 w-full sm:w-auto btn-press glass-card border-white/20 text-foreground hover:border-primary/50 hover:bg-primary/10"
            >
              Browse AI Tools
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Stats grid — glass cards */}
        <div className="animate-fade-up delay-500 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {[
            { target: 82, label: "AI Tools",      href: "/tools" },
            { target: 33, label: "Companies",      href: "/companies" },
            { target: 31, label: "Case Studies",   href: "/case-studies" },
            { target: 16, label: "Frameworks",     href: "/compliance" },
          ].map(({ target, label, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col items-center p-5 rounded-2xl glass-card hover:border-primary/40 hover:bg-primary/10 hover:-translate-y-1.5 hover:glow-primary-sm transition-all duration-200"
            >
              <div className="text-3xl font-black gradient-text-vivid tabular-nums leading-none mb-1">
                <CountUp target={target} />
              </div>
              <div className="text-xs font-semibold text-muted-foreground group-hover:text-primary/80 transition-colors tracking-wide">{label}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
