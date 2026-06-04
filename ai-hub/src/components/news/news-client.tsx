"use client";

import { useState, useEffect, useCallback } from "react";
import { Newspaper, RefreshCw, ExternalLink, Clock, Rss } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/shared/filter-bar";
import { newsCategories, type NewsSource } from "@/data/news-sources";
import { cn } from "@/lib/utils";

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
    <div className="rounded-xl border border-border bg-card p-5 space-y-3 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-3 w-24 bg-muted rounded" />
        <div className="h-5 w-16 bg-muted rounded-full" />
      </div>
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-4/5 bg-muted rounded" />
      <div className="h-3 w-full bg-muted rounded" />
      <div className="h-3 w-2/3 bg-muted rounded" />
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
    } catch (e) {
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
      // Silently refresh if older than 1 hour
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Rss className="w-4 h-4" />
          <span>
            {loading ? "Loading feeds…" : `${articles.length} articles from 20+ sources`}
          </span>
          {lastUpdated && !loading && (
            <span className="text-muted-foreground/60">
              · Updated {getRelativeTime(lastUpdated.toISOString())}
            </span>
          )}
        </div>
        <button
          onClick={() => fetchArticles(true)}
          disabled={loading || refreshing}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-sm font-medium transition-colors",
            loading || refreshing
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-accent text-muted-foreground hover:text-foreground"
          )}
        >
          <RefreshCw className={cn("w-3.5 h-3.5", (loading || refreshing) && "animate-spin")} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-sm text-amber-800 dark:text-amber-300">
          {error}
        </div>
      )}

      {/* Filters */}
      <div>
        <FilterBar options={newsCategories as unknown as string[]} active={activeCategory} onChange={setActiveCategory} />
        {!loading && (
          <p className="text-xs text-muted-foreground mt-2">
            Showing {filtered.length} articles{activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>
        )}
      </div>

      {/* Articles */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => <ArticleSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <Newspaper className="w-12 h-12 text-muted-foreground/40" />
          <div>
            <p className="font-medium">No articles found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different category or hit Refresh.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, idx) => (
            <article
              key={`${article.link}-${idx}`}
              className="group rounded-xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col p-5 gap-3"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground font-medium">{article.sourceName}</span>
                <Badge variant={getCategoryVariant(article.sourceCategory)}>{article.sourceCategory}</Badge>
              </div>

              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-1 group/link"
              >
                <h2 className="text-sm font-semibold leading-snug group-hover/link:text-primary transition-colors line-clamp-3 flex-1">
                  {article.title}
                </h2>
                <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0 text-muted-foreground opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </a>

              {article.description && (
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {article.description}
                </p>
              )}

              {article.pubDate && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto pt-2 border-t border-border/50">
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
