"use client";

import { useState, useEffect, useCallback } from "react";
import { Newspaper, RefreshCw, ExternalLink, Clock, Rss } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/shared/filter-bar";
import { newsCategories, type NewsSource } from "@/data/news-sources";
import { cn } from "@/lib/utils";
import { DailySummary } from "@/components/news/daily-summary";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  sourceName: string;
  sourceCategory: NewsSource["category"];
}

interface CacheData {
  data: Article[];
  timestamp: number;
}

const CACHE_KEY = "ai-hub-news-v2";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function getCategoryVariant(
  category: NewsSource["category"]
): "purple" | "blue" | "green" | "amber" | "pink" | "secondary" | "outline" {
  const map: Record<NewsSource["category"], "purple" | "blue" | "green" | "amber" | "pink" | "secondary" | "outline"> = {
    Tech: "blue",
    Research: "purple",
    Government: "amber",
    Medical: "green",
    Financial: "secondary",
    Quantum: "pink",
    General: "outline",
  };
  return map[category] ?? "outline";
}

function ArticleSkeleton() {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 space-y-3 animate-pulse shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-2">
        <div className="h-3 w-24 bg-muted rounded-full" />
        <div className="h-5 w-16 bg-muted rounded-full" />
      </div>
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-4/5 bg-muted rounded" />
      <div className="h-3 w-full bg-muted rounded" />
      <div className="h-3 w-2/3 bg-muted rounded" />
      <div className="pt-2 border-t border-border/40">
        <div className="h-3 w-20 bg-muted rounded" />
      </div>
    </div>
  );
}

function EmptyState({ category }: { category: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
        <Newspaper className="w-7 h-7 text-muted-foreground/50" />
      </div>
      <div>
        <p className="font-semibold mb-1">No articles found</p>
        <p className="text-sm text-muted-foreground">
          {category !== "All"
            ? `No ${category} articles in the current feed - try a different category or hit Refresh.`
            : "Try hitting Refresh to pull the latest feeds."}
        </p>
      </div>
    </div>
  );
}

export function NewsClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveToCache = (data: Article[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() } satisfies CacheData));
    } catch { /* ignore */ }
  };

  const loadFromCache = (): CacheData | null => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const cached: CacheData = JSON.parse(raw);
      if (Date.now() - cached.timestamp > CACHE_TTL_MS) return null;
      return cached;
    } catch { return null; }
  };

  const fetchArticles = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const json = await res.json();
      setArticles(json.articles ?? []);
      setLastUpdated(new Date());
      saveToCache(json.articles ?? []);
    } catch {
      setError("Could not load feeds. Showing cached data if available.");
      const cached = loadFromCache();
      if (cached) {
        setArticles(cached.data);
        setLastUpdated(new Date(cached.timestamp));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const cached = loadFromCache();
    if (cached && cached.data.length > 0) {
      setArticles(cached.data);
      setLastUpdated(new Date(cached.timestamp));
      setLoading(false);
      if (Date.now() - cached.timestamp > 60 * 60 * 1000) fetchArticles(true);
    } else {
      fetchArticles(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.sourceCategory === activeCategory);

  return (
    <div className="space-y-10">

      {/* Daily AI Briefing */}
      <DailySummary articles={articles} loading={loading} />

      {/* Section divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border/60" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-2">
          Live Feed
        </span>
        <div className="flex-1 h-px bg-border/60" />
      </div>

      {/* Feed header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Rss className="w-4 h-4 text-sky-500" />
          <span>
            {loading
              ? "Loading feeds…"
              : <><span className="font-semibold text-foreground">{articles.length}</span> articles from 20+ sources</>
            }
          </span>
          {lastUpdated && !loading && (
            <span className="text-muted-foreground/50">
              · Updated {getRelativeTime(lastUpdated.toISOString())}
            </span>
          )}
        </div>

        <button
          onClick={() => fetchArticles(true)}
          disabled={loading || refreshing}
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-sm font-medium",
            "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "active:scale-[0.97]",
            loading || refreshing
              ? "opacity-50 cursor-not-allowed border-border/40 text-muted-foreground"
              : "border-border/60 text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border"
          )}
        >
          <RefreshCw className={cn("w-3.5 h-3.5", (loading || refreshing) && "animate-spin")} />
          Refresh
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-sm text-amber-800 dark:text-amber-300">
          <span className="w-4 h-4 mt-0.5 flex-shrink-0">⚠</span>
          {error}
        </div>
      )}

      {/* Filters */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">
          Category
        </p>
        <FilterBar
          options={newsCategories as unknown as string[]}
          active={activeCategory}
          onChange={setActiveCategory}
          size="sm"
        />
        {!loading && (
          <p className="text-xs text-muted-foreground mt-2">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> articles
            {activeCategory !== "All" && <> in <span className="font-medium text-foreground">{activeCategory}</span></>}
          </p>
        )}
      </div>

      {/* Articles grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => <ArticleSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState category={activeCategory} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, idx) => (
            <article
              key={`${article.link}-${idx}`}
              className={cn(
                "group flex flex-col gap-3 p-5 rounded-xl",
                "border border-border/60 bg-card",
                "shadow-[var(--shadow-sm)]",
                "transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                "hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-border/80"
              )}
            >
              {/* Source + category */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground font-medium truncate max-w-[140px]">
                  {article.sourceName}
                </span>
                <Badge variant={getCategoryVariant(article.sourceCategory)}>
                  {article.sourceCategory}
                </Badge>
              </div>

              {/* Title */}
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-1 group/link"
              >
                <h2 className="text-sm font-semibold leading-snug group-hover/link:text-primary transition-colors duration-150 line-clamp-3 flex-1">
                  {article.title}
                </h2>
                <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0 text-muted-foreground opacity-0 group-hover/link:opacity-60 transition-opacity duration-150" />
              </a>

              {/* Description */}
              {article.description && (
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {article.description}
                </p>
              )}

              {/* Timestamp */}
              {article.pubDate && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto pt-2.5 border-t border-border/40">
                  <Clock className="w-3 h-3" />
                  <time>{getRelativeTime(article.pubDate)}</time>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
