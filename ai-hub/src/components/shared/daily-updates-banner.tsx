"use client";

import { useState, useEffect, useRef } from "react";
import {
  BarChart2, Shield, BookOpen, Wrench, Newspaper,
  Sparkles, X, ChevronRight, RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import updatesData from "@/data/daily-updates.json";

const STORAGE_KEY = "aihub_updates_seen";
const SHOW_DURATION = 10_000; // 10 seconds

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  chart: BarChart2,
  shield: Shield,
  book: BookOpen,
  tools: Wrench,
  news: Newspaper,
};

const CATEGORY_COLORS: Record<string, string> = {
  chart: "text-amber-400",
  shield: "text-rose-400",
  book: "text-emerald-400",
  tools: "text-pink-400",
  news: "text-sky-400",
};

export function DailyUpdatesBanner() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Only show once per day per browser
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen === updatesData.date) return;

    // Small delay so it doesn't clash with page paint
    const showTimer = setTimeout(() => {
      setVisible(true);
      startCountdown();
    }, 1200);

    return () => clearTimeout(showTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startCountdown() {
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / SHOW_DURATION) * 100);
      setProgress(pct);
      if (pct === 0) stopAndDismiss();
    }, 80);

    timerRef.current = setTimeout(() => stopAndDismiss(), SHOW_DURATION);
  }

  function stopAndDismiss() {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    sessionStorage.setItem(STORAGE_KEY, updatesData.date);
    setVisible(false);
  }

  function handleExpand() {
    // Pause auto-dismiss when user is reading
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
    setExpanded(true);
  }

  if (!visible) return null;

  const totalItems = updatesData.changes.reduce((n, c) => n + c.items.length, 0);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-5 right-5 z-[9999] max-w-sm w-[calc(100vw-2.5rem)]",
        "animate-in slide-in-from-bottom-4 fade-in duration-300"
      )}
    >
      <div className="relative rounded-2xl overflow-hidden bg-zinc-900/95 dark:bg-zinc-950/95 border border-white/10 shadow-2xl backdrop-blur-xl">

        {/* Progress bar */}
        {!expanded && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Updated today</div>
              <div className="text-[10px] text-zinc-400 leading-tight">
                {new Date(updatesData.date).toLocaleDateString("en-GB", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </div>
            </div>
          </div>
          <button
            onClick={stopAndDismiss}
            className="w-6 h-6 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 mt-0.5"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Summary */}
        <div className="px-4 pb-3">
          <p className="text-xs text-zinc-300 leading-relaxed">{updatesData.summary}</p>
        </div>

        {/* Category pills (collapsed view) */}
        {!expanded && (
          <div className="px-4 pb-3 flex flex-wrap gap-1.5">
            {updatesData.changes.map((c) => {
              const Icon = CATEGORY_ICONS[c.icon] ?? Sparkles;
              const col = CATEGORY_COLORS[c.icon] ?? "text-zinc-400";
              return (
                <span
                  key={c.category}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-zinc-300"
                >
                  <Icon className={cn("w-2.5 h-2.5", col)} />
                  {c.category}
                  <span className="text-zinc-500 ml-0.5">+{c.items.length}</span>
                </span>
              );
            })}
          </div>
        )}

        {/* Expanded detail list */}
        {expanded && (
          <div className="px-4 pb-3 space-y-3 max-h-72 overflow-y-auto">
            {updatesData.changes.map((c) => {
              const Icon = CATEGORY_ICONS[c.icon] ?? Sparkles;
              const col = CATEGORY_COLORS[c.icon] ?? "text-zinc-400";
              return (
                <div key={c.category}>
                  <div className={cn("flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider mb-1.5", col)}>
                    <Icon className="w-3 h-3" />
                    {c.category}
                  </div>
                  <ul className="space-y-1">
                    {c.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-300 leading-relaxed">
                        <span className="text-zinc-600 mt-0.5 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer CTA */}
        <div className="flex items-center justify-between px-4 pb-3.5 pt-1 border-t border-white/5">
          <div className="flex items-center gap-1 text-[10px] text-zinc-500">
            <RefreshCw className="w-2.5 h-2.5" />
            Updated daily at 06:00 CET
          </div>
          {!expanded ? (
            <button
              onClick={handleExpand}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              See details
              <ChevronRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={stopAndDismiss}
              className="text-[11px] font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Got it
            </button>
          )}
        </div>

        {/* Total badge */}
        <div className="absolute top-4 right-10 text-[10px] font-bold text-zinc-600 hidden">
          {totalItems}
        </div>
      </div>
    </div>
  );
}
