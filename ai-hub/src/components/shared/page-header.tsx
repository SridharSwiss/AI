import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, eyebrow, children, className }: PageHeaderProps) {
  return (
    <div className={cn("border-b border-border/50 bg-muted/30 py-12 px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-7xl mx-auto">
        {eyebrow && (
          <p className="text-sm font-medium text-primary mb-2">{eyebrow}</p>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
