"use client";

import React, { useEffect, useState } from "react";

interface TickerItem {
  label: string;
  href: string;
}

const FALLBACK: TickerItem[] = [
  { label: "EU AI Act enforcement begins · June 2026", href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" },
  { label: "NIST AI RMF — risk management framework", href: "https://www.nist.gov/artificial-intelligence/ai-risk-management-framework" },
  { label: "ISO/IEC 42001 AI management standard", href: "https://www.iso.org/standard/81230.html" },
];

export function NewsTicker() {
  const [items, setItems] = useState<TickerItem[]>(FALLBACK);

  useEffect(() => {
    fetch("/api/news", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { title?: string; link?: string }[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const parsed = data
          .slice(0, 12)
          .filter((a) => a.title && a.link)
          .map((a) => ({ label: a.title as string, href: a.link as string }));
        if (parsed.length > 0) setItems(parsed);
      })
      .catch(() => {});
  }, []);

  const content = [...items, ...items];

  return (
    <div className="fixed top-0 left-0 right-0 z-[150] overflow-hidden bg-zinc-950 dark:bg-zinc-900 text-zinc-300 text-xs font-medium h-8 flex items-center border-b border-zinc-800">
      <div className="absolute left-0 z-10 px-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest h-full flex items-center shrink-0 shadow-[4px_0_8px_rgba(0,0,0,0.4)]">
        LIVE
      </div>
      <div className="ticker-track pl-2 flex gap-12 whitespace-nowrap" style={{ paddingLeft: "72px" }}>
        {content.map((item, i) => (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors duration-150 cursor-pointer"
          >
            <span className="w-1 h-1 rounded-full bg-primary/60 inline-block shrink-0" />
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
