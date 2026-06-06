import React from "react";

const items = [
  { label: "EU AI Act enforcement begins · June 2026", href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" },
  { label: "OpenAI o3 sets new reasoning benchmarks", href: "https://openai.com/research/o3" },
  { label: "Anthropic raises $4B Series E", href: "https://www.anthropic.com/news" },
  { label: "NIST AI RMF 1.1 published", href: "https://www.nist.gov/artificial-intelligence/ai-risk-management-framework" },
  { label: "Google Gemini 2.0 Ultra released", href: "https://deepmind.google/technologies/gemini/" },
  { label: "Meta LLaMA 4 open-sourced", href: "https://ai.meta.com/llama/" },
  { label: "ISO/IEC 42001 now certifiable in 40+ countries", href: "https://www.iso.org/standard/81230.html" },
  { label: "Microsoft Copilot+ PCs ship with on-device AI", href: "https://blogs.microsoft.com/blog/2024/05/20/introducing-copilot-pcs/" },
];

export function NewsTicker() {
  const content = [...items, ...items];
  return (
    <div className="fixed top-0 left-0 right-0 z-[150] overflow-hidden bg-zinc-950 dark:bg-zinc-900 text-zinc-300 text-xs font-medium h-8 flex items-center border-b border-zinc-800">
      <div className="absolute left-0 z-10 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest h-full flex items-center shrink-0">
        LIVE
      </div>
      <div className="ticker-track ml-14 flex gap-12 whitespace-nowrap">
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
