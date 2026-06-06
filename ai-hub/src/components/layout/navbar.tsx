"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Wrench,
  BookOpen,
  Building2,
  BarChart3,
  Shield,
  Briefcase,
  Library,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const navItems = [
  { label: "AI Tools",         href: "/tools",             icon: Wrench,    description: "Discover and compare AI tools" },
  { label: "Companies",        href: "/companies",         icon: Building2, description: "AI company profiles & products" },
  { label: "Learn",            href: "/learn",             icon: BookOpen,  description: "Courses, guides & certifications" },
  { label: "Case Studies",     href: "/case-studies",      icon: BarChart3, description: "Real-world AI implementations" },
  { label: "Compliance",       href: "/compliance",        icon: Shield,    description: "Regulatory guidance & frameworks" },
  { label: "Toolkit",          href: "/consulting-toolkit",icon: Briefcase, description: "Playbooks & implementation guides" },
  { label: "Resources",        href: "/resource-library",  icon: Library,   description: "Whitepapers & public documents" },
  { label: "News",             href: "/news",              icon: Newspaper, description: "Live AI news from 20+ sources" },
];

export function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 16);
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* Close mobile menu on route change */
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-[background-color,border-color,box-shadow,backdrop-filter]",
        "duration-300 ease-out",
        scrolled
          ? "glass border-b border-border/40 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-md group-hover:shadow-violet-500/40 transition-shadow duration-300">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-background">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight">
              AI<span className="gradient-text">Hub</span>
            </span>
          </Link>

          {/* ── Desktop nav ───────────────────────────── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium",
                    "transition-colors duration-200",
                    active
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/70"
                  )}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                  {/* Active indicator */}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right actions ─────────────────────────── */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/search"
              className={cn(
                "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg",
                "border border-border/60 bg-muted/40 text-muted-foreground text-sm",
                "hover:bg-accent hover:text-foreground hover:border-border",
                "transition-all duration-200"
              )}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline-flex h-5 select-none items-center rounded border border-border/60 bg-muted/60 px-1.5 font-mono text-[10px] opacity-70">
                ⌘K
              </kbd>
            </Link>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="h-8 w-8 btn-press"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8 btn-press"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span className={cn("transition-all duration-200", isOpen ? "opacity-0 scale-90 absolute" : "opacity-100 scale-100")}>
                <Menu className="w-4 h-4" />
              </span>
              <span className={cn("transition-all duration-200", isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 absolute")}>
                <X className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>

        {/* ── Mobile menu ───────────────────────────── */}
        <div
          className={cn(
            "lg:hidden overflow-hidden",
            "transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-3 border-t border-border/50">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                      "transition-all duration-200",
                      /* Stagger entrance via CSS delay when menu opens */
                      "opacity-0 translate-y-2",
                      isOpen && "opacity-100 translate-y-0",
                      active
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/70"
                    )}
                    style={{
                      transitionDelay: isOpen ? `${i * 40}ms` : "0ms",
                    }}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                      active ? "bg-primary/10" : "bg-muted"
                    )}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile search */}
            <div className="mt-3 px-2 pb-1">
              <Link
                href="/search"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border border-border/60 bg-muted/50 text-muted-foreground text-sm hover:bg-accent transition-colors"
              >
                <Search className="w-4 h-4" />
                Search everything...
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
