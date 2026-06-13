"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { tools } from "@/data/tools";
import { PageHeader } from "@/components/shared/page-header";
import {
  ArrowRight, Scale, Search, TrendingUp,
  MessageSquare, Code2, Image, Video, Mic2, SearchCheck,
  Server, Layers, LayoutGrid, Zap, Rocket, Pen, BarChart2, Headphones, Bot,
  Shuffle, ChevronDown, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Language Models":   MessageSquare,
  "Code Assistance":   Code2,
  "Image Generation":  Image,
  "Video Generation":  Video,
  "Voice & Audio":     Mic2,
  "Search & Research": SearchCheck,
  "Infrastructure":    Server,
  "Frameworks":        Layers,
  "Platforms":         LayoutGrid,
  "APIs":              Zap,
  "Productivity":      Rocket,
  "Design":            Pen,
  "Data & Analytics":  BarChart2,
  "Customer Service":  Headphones,
  "Autonomous Agents": Bot,
};

const CATEGORY_COLORS: Record<string, { pill: string; icon: string; bg: string }> = {
  "Language Models":   { pill: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",  icon: "text-violet-500",  bg: "bg-violet-500/10" },
  "Code Assistance":   { pill: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",          icon: "text-blue-500",    bg: "bg-blue-500/10" },
  "Image Generation":  { pill: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",          icon: "text-pink-500",    bg: "bg-pink-500/10" },
  "Video Generation":  { pill: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",  icon: "text-orange-500",  bg: "bg-orange-500/10" },
  "Voice & Audio":     { pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300", icon: "text-emerald-500", bg: "bg-emerald-500/10" },
  "Search & Research": { pill: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",              icon: "text-sky-500",     bg: "bg-sky-500/10" },
  "Productivity":      { pill: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",          icon: "text-cyan-500",    bg: "bg-cyan-500/10" },
  "Design":            { pill: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300", icon: "text-fuchsia-500", bg: "bg-fuchsia-500/10" },
  "Data & Analytics":  { pill: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",      icon: "text-amber-500",   bg: "bg-amber-500/10" },
  "Customer Service":  { pill: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",      icon: "text-green-500",   bg: "bg-green-500/10" },
  "Autonomous Agents": { pill: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",          icon: "text-rose-500",    bg: "bg-rose-500/10" },
};

function getComparisonPairs() {
  const pairs: { slug: string; nameA: string; nameB: string; slugA: string; slugB: string; category: string }[] = [];
  const seen = new Set<string>();
  for (const tool of tools) {
    if (!tool.alternatives) continue;
    for (const altSlug of tool.alternatives) {
      const alt = tools.find((t) => t.slug === altSlug);
      if (!alt) continue;
      const [a, b] = [tool.slug, alt.slug].sort();
      const key = `${a}-vs-${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const toolA = tools.find((t) => t.slug === a)!;
      const toolB = tools.find((t) => t.slug === b)!;
      pairs.push({ slug: key, nameA: toolA.name, nameB: toolB.name, slugA: a, slugB: b, category: toolA.category });
    }
  }
  return pairs;
}

const allPairs = getComparisonPairs();
const allCategories = ["All", ...Array.from(new Set(allPairs.map((p) => p.category))).sort()];
const allToolNames = tools.map((t) => ({ slug: t.slug, name: t.name })).sort((a, b) => a.name.localeCompare(b.name));

/* ── Custom searchable tool picker ──────────────────────── */
function ToolPicker({
  label, value, exclude, onChange,
}: { label: string; value: string; exclude: string; onChange: (slug: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const options = useMemo(() =>
    allToolNames.filter((t) => t.slug !== exclude && t.name.toLowerCase().includes(q.toLowerCase())),
    [exclude, q]
  );

  const selected = allToolNames.find((t) => t.slug === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pick = (slug: string) => { onChange(slug); setOpen(false); setQ(""); };
  const clear = (e: React.MouseEvent) => { e.stopPropagation(); onChange(""); setQ(""); };

  return (
    <div ref={ref} className="relative">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1.5">{label}</p>
      <button
        type="button"
        onClick={() => { setOpen(!open); setTimeout(() => inputRef.current?.focus(), 10); }}
        className={cn(
          "w-full h-11 px-3 rounded-xl flex items-center gap-2 text-sm transition-all border",
          "bg-background focus:outline-none",
          open ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/40"
        )}
      >
        <span className={cn("flex-1 text-left truncate", selected ? "text-foreground font-medium" : "text-muted-foreground/60")}>
          {selected ? selected.name : "Select a tool…"}
        </span>
        {selected
          ? <X className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 hover:text-foreground" onClick={clear} />
          : <ChevronDown className={cn("w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform", open && "rotate-180")} />}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl bg-white dark:bg-zinc-900 border border-border shadow-xl overflow-hidden">
          <div className="p-2 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tools…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-xs rounded-lg bg-muted/50 placeholder:text-muted-foreground/50 focus:outline-none"
              />
            </div>
          </div>
          <div className="max-h-52 overflow-y-auto overscroll-contain">
            {options.length === 0 ? (
              <p className="px-3 py-4 text-xs text-muted-foreground text-center">No tools found</p>
            ) : options.map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => pick(t.slug)}
                className={cn(
                  "w-full text-left px-3 py-2.5 text-sm transition-colors",
                  t.slug === value
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted/60"
                )}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [toolA, setToolA] = useState("");
  const [toolB, setToolB] = useState("");

  const filtered = useMemo(() => {
    let list = allPairs;
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.nameA.toLowerCase().includes(q) || p.nameB.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeCategory]);

  const byCategory = useMemo(() => {
    const map: Record<string, typeof allPairs> = {};
    for (const p of filtered) {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    }
    return map;
  }, [filtered]);

  const customCompareHref = useMemo(() => {
    if (!toolA || !toolB || toolA === toolB) return null;
    const [a, b] = [toolA, toolB].sort();
    return `/compare/${a}-vs-${b}`;
  }, [toolA, toolB]);

  const randomPair = useMemo(() => {
    const i = Math.floor(Math.random() * allPairs.length);
    return allPairs[i];
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Tool Comparisons"
        title="AI Tool Head-to-Head Comparisons"
        description={`${allPairs.length} side-by-side comparisons across pricing, features, integrations, and use cases.`}
        accent="violet"
      />

      <div className="container-site py-8 space-y-10">

        {/* ── Build-your-own comparison picker ─────────────────── */}
        <div className="glass-card rounded-2xl p-5 sm:p-7 border-primary/20 shadow-[0_8px_40px_hsl(var(--primary)/0.08)]">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">Build Your Own Comparison</p>
              <p className="text-xs text-muted-foreground">Pick any two AI tools to compare head-to-head</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto] gap-3 items-end">
            <ToolPicker label="Tool A" value={toolA} exclude={toolB} onChange={setToolA} />
            <div className="flex items-center justify-center pb-1 sm:pb-2.5">
              <span className="text-base font-black text-muted-foreground/30">vs</span>
            </div>
            <ToolPicker label="Tool B" value={toolB} exclude={toolA} onChange={setToolB} />
            <div className="flex gap-2">
              <Link
                href={customCompareHref ?? "#"}
                onClick={(e) => { if (!customCompareHref) e.preventDefault(); }}
                className={cn(
                  "h-10 px-5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-150",
                  customCompareHref
                    ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_4px_16px_hsl(var(--primary)/0.35)]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                Compare <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/compare/${randomPair.slug}`}
                title="Random comparison"
                className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <Shuffle className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Comparisons", value: allPairs.length, icon: Scale },
            { label: "Tools Covered", value: tools.length, icon: TrendingUp },
            { label: "Categories", value: allCategories.length - 1, icon: LayoutGrid },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass-card rounded-xl p-4 text-center">
              <Icon className="w-4 h-4 text-primary mx-auto mb-1.5 opacity-70" />
              <p className="text-xl font-black text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Search + category filter ──────────────────────────── */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Search comparisons… e.g. ChatGPT, Claude"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {allCategories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === "All" ? allPairs.length : allPairs.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 transition-all duration-150",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_4px_12px_hsl(var(--primary)/0.3)]"
                      : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {cat !== "All" && CATEGORY_ICONS[cat] && (() => { const Icon = CATEGORY_ICONS[cat]; return <Icon className="w-3 h-3" />; })()}
                  {cat}
                  <span className={cn("text-[10px] font-bold px-1 py-0.5 rounded", isActive ? "bg-white/20" : "bg-background/60")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Results ──────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Scale className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-semibold text-foreground mb-1">No comparisons found</p>
            <p className="text-sm text-muted-foreground">Try a different search term or category.</p>
          </div>
        ) : activeCategory !== "All" ? (
          /* Flat grid when filtered to one category */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((pair) => <CompareCard key={pair.slug} pair={pair} />)}
          </div>
        ) : (
          /* Grouped by category */
          <div className="space-y-10">
            {Object.entries(byCategory).map(([category, catPairs]) => {
              const Icon = CATEGORY_ICONS[category] ?? Scale;
              const colors = CATEGORY_COLORS[category] ?? { pill: "bg-muted text-foreground", icon: "text-primary", bg: "bg-primary/10" };
              return (
                <section key={category}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colors.bg)}>
                      <Icon className={cn("w-4 h-4", colors.icon)} />
                    </div>
                    <h2 className="text-sm font-bold text-foreground">{category}</h2>
                    <span className="text-xs text-muted-foreground ml-auto">{catPairs.length} comparison{catPairs.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {catPairs.map((pair) => <CompareCard key={pair.slug} pair={pair} />)}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function CompareCard({ pair }: { pair: { slug: string; nameA: string; nameB: string; slugA: string; slugB: string; category: string } }) {
  const colors = CATEGORY_COLORS[pair.category] ?? { pill: "bg-muted text-foreground", icon: "text-primary", bg: "bg-primary/10" };
  const Icon = CATEGORY_ICONS[pair.category] ?? Scale;
  return (
    <Link
      href={`/compare/${pair.slug}`}
      className="group flex flex-col p-4 rounded-xl glass-card hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.12)] transition-all duration-150"
    >
      {/* Tool icons row */}
      <div className="flex items-center gap-2 mb-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", colors.bg)}>
          <Icon className={cn("w-4 h-4", colors.icon)} />
        </div>
        <span className="text-[10px] font-black text-muted-foreground/40 tracking-widest">VS</span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", colors.bg)}>
          <Icon className={cn("w-4 h-4", colors.icon)} />
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
      </div>
      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
        {pair.nameA} <span className="text-muted-foreground/50 font-normal">vs</span> {pair.nameB}
      </p>
      <p className="text-xs text-muted-foreground mt-1">Pricing · Features · Verdict</p>
    </Link>
  );
}
