import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  className?: string;
  /** Controls the accent color and glow. Defaults to "violet". */
  accent?: "violet" | "blue" | "emerald" | "amber" | "rose" | "pink" | "sky";
}

const accentConfig = {
  violet: {
    eyebrow: "text-violet-600 dark:text-violet-400",
    glow: "bg-violet-400/10 dark:bg-violet-500/15",
    dot: "bg-violet-500",
    border: "from-violet-500/20 via-transparent",
  },
  blue: {
    eyebrow: "text-blue-600 dark:text-blue-400",
    glow: "bg-blue-400/10 dark:bg-blue-500/15",
    dot: "bg-blue-500",
    border: "from-blue-500/20 via-transparent",
  },
  emerald: {
    eyebrow: "text-emerald-600 dark:text-emerald-400",
    glow: "bg-emerald-400/10 dark:bg-emerald-500/15",
    dot: "bg-emerald-500",
    border: "from-emerald-500/20 via-transparent",
  },
  amber: {
    eyebrow: "text-amber-600 dark:text-amber-400",
    glow: "bg-amber-400/10 dark:bg-amber-500/15",
    dot: "bg-amber-500",
    border: "from-amber-500/20 via-transparent",
  },
  rose: {
    eyebrow: "text-rose-600 dark:text-rose-400",
    glow: "bg-rose-400/10 dark:bg-rose-500/15",
    dot: "bg-rose-500",
    border: "from-rose-500/20 via-transparent",
  },
  pink: {
    eyebrow: "text-pink-600 dark:text-pink-400",
    glow: "bg-pink-400/10 dark:bg-pink-500/15",
    dot: "bg-pink-500",
    border: "from-pink-500/20 via-transparent",
  },
  sky: {
    eyebrow: "text-sky-600 dark:text-sky-400",
    glow: "bg-sky-400/10 dark:bg-sky-500/15",
    dot: "bg-sky-500",
    border: "from-sky-500/20 via-transparent",
  },
};

export function PageHeader({
  title,
  description,
  eyebrow,
  children,
  className,
  accent = "violet",
}: PageHeaderProps) {
  const cfg = accentConfig[accent];

  return (
    <div className={cn("relative overflow-hidden border-b border-border/40", className)}>
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 to-background pointer-events-none" />
      <div className={cn("absolute top-0 left-1/4 w-[600px] h-[200px] rounded-full blur-3xl opacity-60 pointer-events-none", cfg.glow)} />
      {/* Accent gradient line at top */}
      <div className={cn("absolute top-0 left-0 right-0 h-px bg-gradient-to-r", cfg.border, "to-transparent")} />

      <div className="container-site relative py-12 sm:py-16">
        {eyebrow && (
          <div className={cn("flex items-center gap-2 mb-3 text-sm font-semibold", cfg.eyebrow)}>
            <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
            {eyebrow}
          </div>
        )}
        <h1 className="text-headline mb-3 max-w-3xl">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
