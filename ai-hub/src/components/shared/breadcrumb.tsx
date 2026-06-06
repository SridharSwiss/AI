import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-1 text-sm text-muted-foreground",
        className
      )}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors duration-150 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors duration-150 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
