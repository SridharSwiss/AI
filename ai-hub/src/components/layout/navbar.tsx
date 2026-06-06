"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain, Menu, X, Search, Sun, Moon,
  Wrench, BookOpen, Building2, BarChart3, Shield, Briefcase,
  Library, Newspaper, ChevronDown, ArrowRight,
  Zap, GraduationCap, BookMarked, PlayCircle,
  Scale, FileCheck, Globe, AlertTriangle,
  TrendingUp, FlaskConical, Layers, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

/* ── Mega-menu data ─────────────────────────────────────── */
const megaMenus = {
  explore: {
    label: "Explore",
    items: [
      { icon: Wrench,    label: "AI Tools",    desc: "82+ tools, compared",        href: "/tools",        color: "text-violet-500", bg: "bg-violet-500/8" },
      { icon: Building2, label: "Companies",   desc: "Vendors & AI startups",      href: "/companies",    color: "text-blue-500",   bg: "bg-blue-500/8" },
      { icon: BarChart3, label: "Case Studies",desc: "Real-world outcomes",        href: "/case-studies", color: "text-amber-500",  bg: "bg-amber-500/8" },
      { icon: Newspaper, label: "News",        desc: "Live feed from 20+ sources", href: "/news",         color: "text-sky-500",    bg: "bg-sky-500/8" },
    ],
    featured: {
      label: "Just added",
      title: "EU AI Act Compliance Guide",
      desc: "Understand what the world's first AI law means for your organization.",
      href: "/compliance/eu-ai-act",
    },
  },
  learn: {
    label: "Learn",
    items: [
      { icon: GraduationCap, label: "Courses & Certifications", desc: "Structured learning paths",   href: "/learn#certifications", color: "text-emerald-500", bg: "bg-emerald-500/8" },
      { icon: PlayCircle,    label: "Video Guides",             desc: "YouTube & free tutorials",    href: "/learn#youtube",        color: "text-red-500",     bg: "bg-red-500/8" },
      { icon: BookMarked,    label: "Books & Reading",          desc: "Essential AI reading list",   href: "/learn#books",          color: "text-purple-500",  bg: "bg-purple-500/8" },
      { icon: Library,       label: "Resource Library",         desc: "Whitepapers & reports",      href: "/resource-library",    color: "text-indigo-500",  bg: "bg-indigo-500/8" },
    ],
    featured: null,
  },
  governance: {
    label: "Governance",
    items: [
      { icon: Scale,     label: "Compliance Frameworks", desc: "EU AI Act, GDPR, NIST & more",      href: "/compliance",                     color: "text-rose-500",   bg: "bg-rose-500/8" },
      { icon: Briefcase, label: "Consulting Toolkit",    desc: "Playbooks & templates",              href: "/consulting-toolkit",             color: "text-pink-500",   bg: "bg-pink-500/8" },
      { icon: FileCheck, label: "Risk Assessment",       desc: "Evaluate AI risk systematically",   href: "/consulting-toolkit#assessment",  color: "text-orange-500", bg: "bg-orange-500/8" },
      { icon: Globe,     label: "Global Regulations",    desc: "Multi-jurisdiction coverage",       href: "/compliance#jurisdictions",       color: "text-teal-500",   bg: "bg-teal-500/8" },
    ],
    featured: null,
  },
};

type MenuKey = keyof typeof megaMenus;

function DropdownPanel({ menuKey, isOpen }: { menuKey: MenuKey; isOpen: boolean }) {
  const menu = megaMenus[menuKey];
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px]",
        "glass rounded-2xl border border-border/60",
        "shadow-[var(--shadow-xl)] overflow-hidden",
        "origin-top transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isOpen
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-[0.97] -translate-y-2 pointer-events-none"
      )}
    >
      <div className="p-5 grid grid-cols-2 gap-1">
        <div className="col-span-2 grid grid-cols-2 gap-1">
          {menu.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-accent/60 transition-colors duration-150"
            >
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", item.bg)}>
                <item.icon className={cn("w-4.5 h-4.5", item.color)} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
        {menu.featured && (
          <div className="col-span-2 mt-1 pt-3 border-t border-border/50">
            <Link
              href={menu.featured.href}
              className="flex items-center justify-between gap-4 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/10 transition-colors group"
            >
              <div>
                <p className="text-xs font-semibold text-primary mb-0.5">{menu.featured.label}</p>
                <p className="text-sm font-semibold text-foreground">{menu.featured.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{menu.featured.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 16), []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => { setMobileOpen(false); setOpenMenu(null); }, [pathname]);

  const openDropdown = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const isGroupActive = (key: MenuKey) => {
    const hrefs = megaMenus[key].items.map((i) => i.href);
    return hrefs.some((h) => pathname === h || pathname.startsWith(h.split("#")[0] + "/"));
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled ? "glass border-b border-border/40 shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-md group-hover:shadow-violet-500/40 transition-shadow duration-300">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-background">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </span>
            </div>
            <span className="font-bold text-lg tracking-tight">AIHub</span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 relative">
            {(Object.keys(megaMenus) as MenuKey[]).map((key) => (
              <div key={key} className="relative" onMouseEnter={() => openDropdown(key)} onMouseLeave={closeDropdown}>
                <button
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium",
                    "transition-colors duration-150 outline-none",
                    "focus-visible:ring-2 focus-visible:ring-ring",
                    isGroupActive(key) || openMenu === key
                      ? "text-foreground bg-accent/70"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {megaMenus[key].label}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openMenu === key ? "rotate-180" : "")} />
                </button>
                <DropdownPanel menuKey={key} isOpen={openMenu === key} />
              </div>
            ))}
            {[{ label: "News", href: "/news" }, { label: "About", href: "/about" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  pathname === item.href ? "text-foreground bg-accent/70" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href="/search"
              className={cn(
                "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg",
                "border border-border/60 bg-background/60 text-muted-foreground text-sm",
                "hover:bg-accent hover:text-foreground hover:border-border",
                "transition-all duration-150 backdrop-blur-sm"
              )}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-muted-foreground/80">Search…</span>
              <kbd className="hidden md:inline-flex h-5 select-none items-center rounded border border-border/50 bg-muted/60 px-1.5 font-mono text-[10px] opacity-60">⌘K</kbd>
            </Link>
            {mounted && (
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme" className="h-8 w-8 btn-press">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 btn-press" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
              <div className="relative w-4 h-4">
                <span className={cn("absolute inset-0 flex items-center justify-center transition-all duration-200", mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100")}><Menu className="w-4 h-4" /></span>
                <span className={cn("absolute inset-0 flex items-center justify-center transition-all duration-200", mobileOpen ? "opacity-100" : "opacity-0 -rotate-90 scale-75")}><X className="w-4 h-4" /></span>
              </div>
            </Button>
          </div>
        </div>

        <div className={cn("lg:hidden overflow-hidden", "transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]", mobileOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0")}>
          <div className="py-3 border-t border-border/40 space-y-4">
            {(Object.entries(megaMenus) as [MenuKey, typeof megaMenus[MenuKey]][]).map(([key, menu], groupIdx) => (
              <div key={key}>
                <p className="px-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1">{menu.label}</p>
                <div className="space-y-0.5">
                  {menu.items.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium",
                        "transition-all duration-200",
                        "opacity-0 translate-x-2",
                        mobileOpen && "opacity-100 translate-x-0",
                        pathname === item.href || pathname.startsWith(item.href.split("#")[0] + "/")
                          ? "text-primary bg-primary/8"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                      )}
                      style={{ transitionDelay: mobileOpen ? `${(groupIdx * 4 + i) * 35}ms` : "0ms" }}
                    >
                      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", item.bg)}>
                        <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                      </div>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="px-3 pt-1 pb-2">
              <Link href="/search" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border border-border/60 bg-muted/40 text-muted-foreground text-sm hover:bg-accent transition-colors">
                <Search className="w-4 h-4" />
                Search everything…
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
