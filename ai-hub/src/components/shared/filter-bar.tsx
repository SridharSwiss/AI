"use client";

import { cn } from "@/lib/utils";

interface FilterBarProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterBar({ options, active, onChange, className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "px-4 py-1.5 rounded-full border text-sm font-medium transition-colors capitalize",
            active === option
              ? "bg-primary text-primary-foreground border-transparent"
              : "border-border text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border/80"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

