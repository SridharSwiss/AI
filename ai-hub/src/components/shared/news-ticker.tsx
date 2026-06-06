"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const FALLBACK = [
  "EU AI Act enforcement begins · June 2026",
  "NIST AI RMF — risk management framework published",
  "ISO/IEC 42001 AI management standard now certifiable",
];

const REFRESH_INTERVAL = 5 * 60 * 1000;

export function NewsTicker() {
  const [items, setItems] = useState<string[]>(FALLBACK);
  const [key, setKey] = useState(0);

  const fetchItems = useCallback(() => {
    fetch("/api/news", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { title?: string }[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const parsed = data.slice(0, 12).filter((a) => a.title).map((a) => a.title as string);
        if (parsed.length > 0) {
          setItems(parsed);
          setKey((k) => k + 1);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchItems]);

  const content = [...items, ...items, ...items];

  return (
    <Link
      href="/news"
      className="fixed top-0 left-0 right-0 z-[150] overflow-hidden bg-zinc-950 dark:bg-zinc-900 text-zinc-300 text-xs font-medium h-8 flex items-center border-b border-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors"
    >
      <div className="absolute left-0 z-10 px-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-[0.1em] h-full flex items-center shrink-0 shadow-[4px_0_8px_rgba(0,0,0,0.4)]">
        LIVE
      </div>
      <div key={key} className="ticker-track flex gap-12 whitespace-nowrap" style={{ paddingLeft: "72px" }}>
        {content.map((label, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-red-500/60 inline-block shrink-0" />
            {label}
          </span>
        ))}
      </div>
    </Link>
  );
}
