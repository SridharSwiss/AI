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
  TrendingUp, FlaskConical, Layers, Users, GitCompare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

/* ── Mega-menu data ─────────────────────────────────────── */
const megaMenus = {
  explore: {
    label: "Explore",
    items: [
      { icon: Wrench,      label: "AI Tools",    desc: "82+ tools, compared",        href: "/tools",        color: "text-violet-500", bg: "bg-violet-500/10 dark:bg-violet-500/[0.18]" },
      { icon: GitCompare,  label: "Compare",     desc: "Head-to-head tool matchups", href: "/compare",      color: "text-fuchsia-500",bg: "bg-fuchsia-500/10 dark:bg-fuchsia-500/[0.18]" },
      { icon: Building2,   label: "Companies",   desc: "Vendors & AI startups",      href: "/companies",    color: "text-blue-500",   bg: "bg-blue-500/10 dark:bg-blue-500/[0.18]" },
      { icon: BarChart3,   label: "Case Studies",desc: "Real-world outcomes",        href: "/case-studies", color: "text-amber-500",  bg: "bg-amber-500/10 dark:bg-amber-500/[0.18]" },
      { icon: Newspaper,   label: "News",        desc: "Live feed from 20+ sources", href: "/news",         color: "text-sky-500",    bg: "bg-sky-500/10 dark:bg-sky-500/[0.18]" },
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
      { icon: GraduationCap, label: "Courses & Certifications", desc: "Structured learning paths",  href: "/learn#certifications", color: "text-emerald-500", bg: "bg-emerald-500/10 dark:bg-emerald-500/[0.18]" },
      { icon: PlayCircle,    label: "Video Guides",             desc: "YouTube & free tutorials",   href: "/learn#youtube",        color: "text-red-500",     bg: "bg-red-500/10 dark:bg-red-500/[0.18]" },
      { icon: BookMarked,    label: "Books & Reading",          desc: "Essential AI reading list",  href: "/learn#books",          color: "text-purple-500",  bg: "bg-purple-500/10 dark:bg-purple-500/[0.18]" },
      { icon: Library,       label: "Resource Library",         desc: "Whitepapers & reports",     href: "/resource-library",     color: "text-indigo-500",  bg: "bg-indigo-500/10 dark:bg-indigo-500/[0.18]" },
    ],
    featured: null,
  },
  governance: {
    label: "Governance",
    items: [
      { icon: Scale,     label: "Compliance Frameworks", desc: "EU AI Act, GDPR, NIST & more",    href: "/compliance",                    color: "text-rose-500",   bg: "bg-rose-500/10 dark:bg-rose-500/[0.18]", gold: true },
      { icon: Briefcase, label: "Consulting Toolkit",    desc: "Playbooks & templates",            href: "/consulting-toolkit",            color: "text-pink-500",   bg: "bg-pink-500/10 dark:bg-pink-500/[0.18]" },
      { icon: FileCheck, label: "Risk Assessment",       desc: "Evaluate AI risk systematically",  href: "/consulting-toolkit?tab=assess", color: "text-orange-500", bg: "bg-orange-500/10 dark:bg-orange-500/[0.18]" },
      { icon: Globe,     label: "Global Regulations",    desc: "Multi-jurisdiction coverage",      href: "/compliance#jurisdictions",      color: "text-teal-500",   bg: "bg-teal-500/10 dark:bg-teal-500/[0.18]" },
    ],
    featured: null,
  },
};

type MenuKey = keyof typeof megaMenus;

/* ── Desktop dropdown panel ───────────────────────────────── */
function DropdownPanel({ menuKey, isOpen }: { menuKey: MenuKey; isOpen: boolean }) {
  const menu = megaMenus[menuKey];
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] z-[200]",
        "bg-background/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl overflow-hidden isolate",
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
                <item.icon className={cn("w-4 h-4", item.color)} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  {item.label}
                  {"gold" in item && item.gold && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 ring-2 ring-amber-400/30 animate-pulse" />
                  )}
                </div>
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

/* ── Mobile accordion section ─────────────────────────────── */
function MobileSection({
  menuKey,
  menu,
  pathname,
  onClose,
  animateIn,
  startDelay,
}: {
  menuKey: MenuKey;
  menu: (typeof megaMenus)[MenuKey];
  pathname: string;
  onClose: () => void;
  animateIn: boolean;
  startDelay: number;
}) {
  const [open, setOpen] = useState(true);
  const isGroupActive = menu.items.some(
    (i) => pathname === i.href || pathname.startsWith(i.href.split("#")[0] + "/")
  );

  return (
    <div className="border-b border-border/30 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors",
          isGroupActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {menu.label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open ? "rotate-180" : "")} />
      </button>

      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open ? "max-h-[400px] pb-2" : "max-h-0"
      )}>
        {menu.items.map((item, i) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href.split("#")[0] + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium",
                "transition-all duration-200",
                isActive
                  ? "text-primary bg-primary/8 dark:bg-primary/12"
                  : "text-foreground/80 hover:text-foreground hover:bg-accent/60"
              )}
              style={{
                transitionDelay: animateIn ? `${(startDelay + i) * 30}ms` : "0ms",
                opacity: animateIn ? 1 : 0,
                transform: animateIn ? "translateX(0)" : "translateX(8px)",
              }}
            >
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", item.bg)}>
                <item.icon className={cn("w-3.5 h-3.5", item.color)} />
              </div>
              <span className="flex-1">{item.label}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main Navbar ──────────────────────────────────────────── */
export function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 16), []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => { setMobileOpen(false); setOpenMenu(null); }, [pathname]);

  // Delay entrance animation so items slide in after panel opens
  useEffect(() => {
    if (mobileOpen) {
      const t = setTimeout(() => setAnimateIn(true), 30);
      return () => clearTimeout(t);
    } else {
      setAnimateIn(false);
    }
  }, [mobileOpen]);

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

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-8 left-0 right-0 z-[100]",
          "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
          scrolled || mobileOpen
            ? "bg-background/92 backdrop-blur-xl border-b border-border/60 shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-md group-hover:shadow-violet-500/50 group-hover:scale-105 transition-all duration-300 ring-1 ring-white/20">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-background">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </span>
              </div>
              <span className="font-bold text-lg tracking-tight">AIHub</span>
            </Link>

            {/* Desktop nav */}
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

            {/* Right actions */}
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
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9 btn-press rounded-lg"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <div className="relative w-4 h-4">
                  <span className={cn("absolute inset-0 flex items-center justify-center transition-all duration-200", mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100")}><Menu className="w-4 h-4" /></span>
                  <span className={cn("absolute inset-0 flex items-center justify-center transition-all duration-200", mobileOpen ? "opacity-100" : "opacity-0 -rotate-90 scale-75")}><X className="w-4 h-4" /></span>
                </div>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu — must be z-[200] to sit above news ticker (z-150) and navbar (z-100) */}
      <div
        style={{ zIndex: 200 }}
        className={cn(
          "fixed inset-0 lg:hidden flex flex-col",
          /* Fully opaque — no alpha, no backdrop-filter, no bleed-through */
          "bg-white dark:bg-zinc-950",
          "transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mobileOpen
            ? "opacity-100 visible translate-y-0 pointer-events-auto"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
      >
          {/* Top bar with logo + close */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 h-16 border-b border-border/40">
            <Link href="/" onClick={closeMobile} className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-base tracking-tight">AIHub</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="py-2">
              {(Object.entries(megaMenus) as [MenuKey, (typeof megaMenus)[MenuKey]][]).map(([key, menu], groupIdx) => (
                <MobileSection
                  key={key}
                  menuKey={key}
                  menu={menu}
                  pathname={pathname}
                  onClose={closeMobile}
                  animateIn={animateIn}
                  startDelay={groupIdx * 5}
                />
              ))}

              {/* Extra top-level links */}
              <div className="border-b border-border/30 pb-2">
                <p className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">More</p>
                {[
                  { label: "About", href: "/about", icon: Users, color: "text-slate-500", bg: "bg-slate-500/10 dark:bg-slate-500/[0.18]" },
                  { label: "Contribute", href: "/contribute", icon: Zap, color: "text-violet-500", bg: "bg-violet-500/10 dark:bg-violet-500/[0.18]" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className={cn(
                      "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium",
                      "transition-colors duration-150",
                      pathname === item.href
                        ? "text-primary bg-primary/8 dark:bg-primary/12"
                        : "text-foreground/80 hover:text-foreground hover:bg-accent/60"
                    )}
                  >
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", item.bg)}>
                      <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                    </div>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        {/* Pinned footer */}
        <div className="flex-shrink-0 p-3 border-t border-border/40 space-y-2">
            <Link
              href="/search"
              onClick={closeMobile}
              className="flex items-center gap-2.5 w-full px-4 py-3.5 rounded-xl bg-muted/80 border border-border text-muted-foreground text-sm font-medium hover:bg-accent hover:text-foreground transition-colors"
            >
              <Search className="w-4 h-4 flex-shrink-0" />
              Search everything…
            </Link>
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-xs text-muted-foreground">© 2026 AIHub</span>
              {mounted && (
                <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme" className="h-8 gap-1.5 text-xs">
                  {theme === "dark" ? <><Sun className="w-3.5 h-3.5" />Light</> : <><Moon className="w-3.5 h-3.5" />Dark</>}
                </Button>
              )}
            </div>
          </div>
        </div>
    </>
  );
}


