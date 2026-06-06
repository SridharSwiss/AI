import React from "react";

const items = [
  "EU AI Act enforcement begins · June 2026",
  "OpenAI o3 sets new reasoning benchmarks",
  "Anthropic raises $4B Series E",
  "NIST AI RMF 1.1 published",
  "Google Gemini 2.0 Ultra released",
  "Meta LLaMA 4 open-sourced",
  "ISO/IEC 42001 now certifiable in 40+ countries",
  "Microsoft Copilot+ PCs ship with on-device AI",
];

export function NewsTicker() {
  const content = [...items, ...items];
  return (
    <div className="fixed top-0 left-0 right-0 z-[150] relative overflow-hidden bg-zinc-950 dark:bg-zinc-900 text-zinc-300 text-xs font-medium h-8 flex items-center border-b border-zinc-800">
      <div className="absolute left-0 z-10 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest h-full flex items-center shrink-0">
        LIVE
      </div>
      <div className="ticker-track ml-14 flex gap-12 whitespace-nowrap">
        {content.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary/60 inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
