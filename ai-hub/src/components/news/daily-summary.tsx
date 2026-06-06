"use client";

import { useMemo } from "react";
import { Calendar, TrendingUp, Newspaper, Tag, ExternalLink, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { NewsSource } from "@/data/news-sources";

export interface SummaryArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  sourceName: string;
  sourceCategory: NewsSource["category"];
}

function formatFullDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const STOP_WORDS = new Set([
  "the","a","an","and","or","but","in","on","at","to","for","of","with","by",
  "from","is","are","was","were","be","been","as","it","its","this","that",
  "have","has","had","will","can","could","how","what","why","when","which",
  "says","said","report","reports","after","over","more","first","into","up",
  "than","their","they","about","its","not","use","used","using","just","now",
  "new","gets","get","set","see","all","one","two","three","four","five",
]);

function extractKeywords(articles: SummaryArticle[]): string[] {
  const freq: Record<string, number> = {};
  for (const a of articles) {
    const words = a.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP_WORDS.has(w));
    for (const w of words) {
      freq[w] = (freq[w] ?? 0) + 1;
    }
  }
  return Object.entries(freq)
    .filter(([, n]) => n >= 2)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 14)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
}

const CATEGORY_VARIANTS: Record<string, "blue" | "purple" | "amber" | "green" | "pink" | "secondary" | "outline"> = {
  Tech: "blue",
  Research: "purple",
  Government: "amber",
  Medical: "green",
  Quantum: "pink",
  Financial: "secondary",
  General: "outline",
};

function SummarySkeleton() {
  return (
    <div className={cn(
      "rounded-2xl border border-violet-200/60 dark:border-violet-800/40 overflow-hidden",
      "bg-gradient-to-br from-violet-50/60 via-background to-pink-50/40",
      "dark:from-violet-950/20 dark:via-background dark:to-pink-950/10",
      "shadow-[var(--shadow-md)] animate-pulse"
    )}>
      <div className="px-6 pt-5 pb-4 border-b border-border/50 space-y-3">
        <div className="h-3 w-32 bg-muted rounded-full" />
        <div className="flex items-center justify-between gap-4">
          <div className="h-7 w-64 bg-muted rounded" />
          <div className="h-8 w-36 bg-muted rounded-lg" />
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-3">
            <div className="h-3 w-24 bg-muted rounded-full" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-muted rounded-full flex-shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-3 w-2/5 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-3 w-28 bg-muted rounded-full" />
            <div className="flex flex-wrap gap-2">
              {[1,2,3,4,5,6].map((i) => <div key={i} className="h-7 w-16 bg-muted rounded-full" />)}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 w-24 bg-muted rounded-full" />
          {[1,2,3,4].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-5 w-20 bg-muted rounded-full" />
                <div className="h-3 w-6 bg-muted rounded" />
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Props {
  articles: SummaryArticle[];
  loading: boolean;
}

export function DailySummary({ articles, loading }: Props) {
  const today = useMemo(() => new Date(), []);

  const { displayArticles, byCategory, topStories, keywords, windowLabel } =
    useMemo(() => {
      const cutoff24 = Date.now() - 24 * 60 * 60 * 1000;
      const cutoff48 = Date.now() - 48 * 60 * 60 * 1000;

      const window24h = articles.filter((a) => {
        const t = new Date(a.pubDate).getTime();
        return !isNaN(t) && t >= cutoff24;
      });

      const use48h = window24h.length < 5;
      const displayArticles = use48h
        ? articles.filter((a) => {
            const t = new Date(a.pubDate).getTime();
            return !isNaN(t) && t >= cutoff48;
          })
        : window24h;

      const windowLabel = use48h && displayArticles.length > 0 ? "last 48 hours" : "last 24 hours";

      const byCategory: Record<string, number> = {};
      for (const a of displayArticles) {
        byCategory[a.sourceCategory] = (byCategory[a.sourceCategory] ?? 0) + 1;
      }

      const topStories = [...displayArticles]
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, 5);

      const keywords = extractKeywords(displayArticles);

      return { displayArticles, byCategory, topStories, keywords, windowLabel };
    }, [articles]);

  if (loading) return <SummarySkeleton />;

  const articleCount = displayArticles.length;

  return (
    <div className={cn(
      "rounded-2xl border border-violet-200/60 dark:border-violet-800/40 overflow-hidden",
      "bg-gradient-to-br from-violet-50/60 via-background to-pink-50/40",
      "dark:from-violet-950/20 dark:via-background dark:to-pink-950/10",
      "shadow-[var(--shadow-md)]"
    )}>

      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          Daily AI Briefing
        </div>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{formatFullDate(today)}</h2>
          </div>
          <div className={cn(
            "inline-flex items-center gap-2 text-sm rounded-lg px-3 py-1.5 border font-medium",
            articleCount > 0
              ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300"
              : "bg-muted/50 border-border text-muted-foreground"
          )}>
            <Radio className="w-3.5 h-3.5" />
            <span>
              <strong>{articleCount}</strong> {articleCount === 1 ? "article" : "articles"} · {windowLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {articleCount === 0 ? (
          <div className="flex flex-col items-center py-10 gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground">
              No recent articles found. Hit Refresh to pull the latest feeds.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left: top stories + keywords */}
            <div className="lg:col-span-2 space-y-6">

              {/* Top headlines */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    Top Headlines
                  </p>
                </div>
                <ol className="space-y-3">
                  {topStories.map((article, i) => (
                    <li key={article.link} className="flex items-start gap-3 group">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-1 text-sm font-medium leading-snug hover:text-primary transition-colors duration-150"
                        >
                          <span className="line-clamp-2 flex-1">{article.title}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-50 transition-opacity duration-150" />
                        </a>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{article.sourceName}</span>
                          <Badge variant={CATEGORY_VARIANTS[article.sourceCategory] ?? "outline"}>
                            {article.sourceCategory}
                          </Badge>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Trending topics */}
              {keywords.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Tag className="w-4 h-4 text-primary" />
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      Trending Topics
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {keywords.map((kw) => (
                      <span
                        key={kw}
                        className={cn(
                          "text-xs px-2.5 py-1 rounded-full font-medium cursor-default",
                          "bg-muted/80 text-muted-foreground",
                          "hover:bg-accent hover:text-foreground transition-colors duration-150"
                        )}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: category breakdown */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Newspaper className="w-4 h-4 text-primary" />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  By Category
                </p>
              </div>
              <div className="space-y-2.5">
                {Object.entries(byCategory)
                  .sort(([, a], [, b]) => b - a)
                  .map(([cat, count]) => {
                    const pct = Math.round((count / articleCount) * 100);
                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Badge variant={CATEGORY_VARIANTS[cat] ?? "outline"}>{cat}</Badge>
                          <span className="text-xs text-muted-foreground font-medium tabular-nums">{count}</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted/60 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary/40 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                {articleCount} total · {Object.keys(byCategory).length} categories
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
