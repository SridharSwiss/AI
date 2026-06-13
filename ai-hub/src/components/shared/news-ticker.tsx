"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const FALLBACK = [
  "EU AI Act enforcement begins · June 2026",
  "NIST AI RMF — risk management framework published",
  "ISO/IEC 42001 AI management standard now certifiable",
  "OpenAI o3 sets new reasoning benchmarks",
  "Anthropic raises $4B Series E",
];

const REFRESH_INTERVAL = 5 * 60 * 1000;

function getTop5(data: { title?: string; pubDate?: string }[]): string[] {
  return [...data]
    .filter((a) => a.title && a.pubDate)
    .sort((a, b) => new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime())
    .slice(0, 5)
    .map((a) => a.title as string);
}

export function NewsTicker() {
  const [items, setItems] = useState<string[]>(FALLBACK);
  const [key, setKey] = useState(0);

  const fetchItems = useCallback(() => {
    fetch("/api/news", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { articles?: { title?: string; pubDate?: string }[] }) => {
        const articles = data.articles;
        if (!Array.isArray(articles) || articles.length === 0) return;
        const cutoff24 = Date.now() - 24 * 60 * 60 * 1000;
        const cutoff48 = Date.now() - 48 * 60 * 60 * 1000;
        const window24 = articles.filter((a) => a.pubDate && new Date(a.pubDate).getTime() >= cutoff24);
        const pool = window24.length >= 5 ? window24 : articles.filter((a) => a.pubDate && new Date(a.pubDate).getTime() >= cutoff48);
        const top5 = [...pool]
          .filter((a) => a.title && a.pubDate)
          .sort((a, b) => new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime())
          .slice(0, 5)
          .map((a) => a.title as string);
        if (top5.length > 0) {
          setItems(top5);
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
      className="fixed top-0 left-0 right-0 z-[150] overflow-hidden bg-[hsl(252_55%_4%/0.85)] backdrop-blur-xl text-zinc-300 text-xs font-medium h-8 flex items-center border-b border-white/[0.06] hover:bg-[hsl(252_55%_6%/0.9)] transition-colors"
    >
      <div className="absolute left-0 z-10 px-3 bg-gradient-to-r from-red-600 to-rose-500 text-white text-[10px] font-bold uppercase tracking-[0.1em] h-full flex items-center shrink-0 shadow-[4px_0_12px_rgba(225,29,72,0.4)]">
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
