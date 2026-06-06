import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  className?: string;
  accent?: "violet" | "blue" | "emerald" | "amber" | "rose" | "pink" | "sky";
}

const accentConfig = {
  violet:  { eyebrow: "text-violet-600 dark:text-violet-400",  dot: "bg-violet-500",  bar: "from-violet-500 to-purple-500",  glow: "bg-violet-500/6 dark:bg-violet-500/10" },
  blue:    { eyebrow: "text-blue-600 dark:text-blue-400",      dot: "bg-blue-500",    bar: "from-blue-500 to-cyan-500",      glow: "bg-blue-500/6 dark:bg-blue-500/10" },
  emerald: { eyebrow: "text-emerald-600 dark:text-emerald-400",dot: "bg-emerald-500", bar: "from-emerald-500 to-teal-500",   glow: "bg-emerald-500/6 dark:bg-emerald-500/10" },
  amber:   { eyebrow: "text-amber-600 dark:text-amber-400",    dot: "bg-amber-500",   bar: "from-amber-500 to-orange-500",   glow: "bg-amber-500/6 dark:bg-amber-500/10" },
  rose:    { eyebrow: "text-rose-600 dark:text-rose-400",      dot: "bg-rose-500",    bar: "from-rose-500 to-pink-500",      glow: "bg-rose-500/6 dark:bg-rose-500/10" },
  pink:    { eyebrow: "text-pink-600 dark:text-pink-400",      dot: "bg-pink-500",    bar: "from-pink-500 to-rose-400",      glow: "bg-pink-500/6 dark:bg-pink-500/10" },
  sky:     { eyebrow: "text-sky-600 dark:text-sky-400",        dot: "bg-sky-500",     bar: "from-sky-500 to-blue-400",       glow: "bg-sky-500/6 dark:bg-sky-500/10" },
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
      {/* Clean layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/20 to-background pointer-events-none" />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018] dark:opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      {/* Accent color wash - very subtle */}
      <div className={cn("absolute inset-0 pointer-events-none", cfg.glow, "opacity-60")} />
      {/* Gradient top line (accent color) */}
      <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", cfg.bar, "to-transparent opacity-70")} />

      <div className="container-site relative py-10 sm:py-12">
        {eyebrow && (
          <div className={cn("flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest", cfg.eyebrow)}>
            <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-3 max-w-3xl">{title}</h1>
        {description && (
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </div>
  );
}
