"use client";

import { cn } from "@/lib/utils";

interface FilterBarProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
  size?: "sm" | "md";
}

export function FilterBar({
  options,
  active,
  onChange,
  className,
  size = "md",
}: FilterBarProps) {
  return (
    <div
      role="group"
      aria-label="Filter options"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((option) => {
        const isActive = active === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            className={cn(
              "relative rounded-full border font-medium",
              "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              "active:scale-[0.97]",
              size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm",
              isActive
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "border-border/60 bg-transparent text-muted-foreground hover:text-foreground hover:border-border hover:bg-accent/50"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

/* ── Toggle chip - replaces the freeOnly button pattern ─ */
interface ToggleChipProps {
  label: string;
  active: boolean;
  onChange: (v: boolean) => void;
  className?: string;
}

export function ToggleChip({ label, active, onChange, className }: ToggleChipProps) {
  return (
    <button
      onClick={() => onChange(!active)}
      aria-pressed={active}
      className={cn(
        "relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-medium",
        "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "active:scale-[0.97]",
        active
          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
          : "border-border/60 bg-transparent text-muted-foreground hover:text-foreground hover:border-border hover:bg-accent/50",
        className
      )}
    >
      {/* Indicator dot */}
      <span className={cn(
        "w-1.5 h-1.5 rounded-full transition-colors",
        active ? "bg-white" : "bg-muted-foreground/40"
      )} />
      {label}
    </button>
  );
}
