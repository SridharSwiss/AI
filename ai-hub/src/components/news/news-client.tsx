"use client";

import { useState, useEffect, useCallback } from "react";
import { Newspaper, RefreshCw, ExternalLink, Clock, Rss } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/shared/filter-bar";
import { newsSources, newsCategories, NewsSource } from "@/data/news-sources";
import { cn } from "@/lib/utils";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  sourceName: string;
  sourceCategory: NewsSource["category"];
  thumbnail?: string;
}

interface CacheData {
  data: Article[];
  timestamp: number;
}

const CACHE_KEY = "ai-hub-news-cache";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

function getLastUpdatedText(date: Date | null): string {
  if (!date) return "";
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  const diffHours = Math.floor(diffMins / 60);
  return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

function truncate(text: string, maxLen: number): string {
  const clean = stripHtml(text);
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).trimEnd() + "…";
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
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-4 w-16 bg-muted rounded" />
      </div>
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-4/5 bg-muted rounded" />
      <div className="h-3 w-3/5 bg-muted rounded" />
      <div className="h-3 w-full bg-muted rounded" />
      <div className="h-3 w-2/3 bg-muted rounded" />
    </div>
  );
}

async function fetchSourceArticles(source: NewsSource): Promise<Article[]> {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.rssUrl)}&count=5`;
  const res = await fetch(apiUrl, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message || "RSS feed error");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (json.items ?? []).map((item: any): Article => ({
    title: item.title ?? "Untitled",
    link: item.link ?? "#",
    pubDate: item.pubDate ?? "",
    description: truncate(item.description ?? item.content ?? "", 150),
    sourceName: source.name,
    sourceCategory: source.category,
    thumbnail: item.thumbnail && item.thumbnail !== "self" ? item.thumbnail : undefined,
  }));
}

export function NewsClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [refreshing, setRefreshing] = useState(false);

  const loadFromCache = (): Article[] | null => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const cached: CacheData = JSON.parse(raw);
      if (Date.now() - cached.timestamp > CACHE_TTL_MS) return null;
      return cached.data;
    } catch {
      return null;
    }
  };

  const saveToCache = (data: Article[]) => {
    try {
      const payload: CacheData = { data, timestamp: Date.now() };
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
  };

  const fetchAllArticles = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    else setLoading(true);

    const results = await Promise.allSettled(
      newsSources.map((source) => fetchSourceArticles(source))
    );

    const allArticles: Article[] = [];
    for (const result of results) {
      if (result.status === "fulfilled") {
        allArticles.push(...result.value);
      }
    }

    // Sort by pubDate descending
    allArticles.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });

    setArticles(allArticles);
    setLastUpdated(new Date());
    saveToCache(allArticles);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const cached = loadFromCache();
    if (cached && cached.length > 0) {
      setArticles(cached);
      setLastUpdated(new Date());
      setLoading(false);
      // Still refresh if cache is older than 1 hour
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const parsed: CacheData = JSON.parse(raw);
          if (Date.now() - parsed.timestamp > 60 * 60 * 1000) {
            fetchAllArticles(true);
          }
        }
      } catch {
        // ignore
      }
    } else {
      fetchAllArticles(false);
    }
  }, [fetchAllArticles]);

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.sourceCategory === activeCategory);

  const countForCategory = (cat: string) =>
    cat === "All"
      ? articles.length
      : articles.filter((a) => a.sourceCategory === cat).length;

  const filterOptions = (newsCategories as readonly string[]).map((cat) => cat);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Rss className="w-4 h-4" />
          <span>
            {loading
              ? "Loading feeds…"
              : `${articles.length} articles from ${newsSources.length} sources`}
          </span>
          {lastUpdated && !loading && (
            <>
              <span className="mx-1 text-border">·</span>
              <Clock className="w-3.5 h-3.5" />
              <span>Updated {getLastUpdatedText(lastUpdated)}</span>
            </>
          )}
        </div>
        <button
          onClick={() => fetchAllArticles(true)}
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

      {/* Filter pills */}
      <div className="space-y-2">
        <FilterBar
          options={filterOptions}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        {!loading && (
          <p className="text-xs text-muted-foreground">
            Showing {filteredArticles.length} of {countForCategory(activeCategory)} articles
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
        )}
      </div>

      {/* Articles grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ArticleSkeleton key={i} />
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <Newspaper className="w-12 h-12 text-muted-foreground/40" />
          <div>
            <p className="font-medium text-foreground">No articles found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try selecting a different category or refreshing the feeds.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article, idx) => (
            <article
              key={`${article.link}-${idx}`}
              className="group rounded-xl border border-border bg-card hover:border-border/80 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
            >
              {article.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.thumbnail}
                  alt=""
                  className="w-full h-40 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Source & category */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-medium text-muted-foreground">
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
                  className="group/link flex items-start gap-1"
                >
                  <h2 className="text-sm font-semibold leading-snug text-foreground group-hover/link:text-primary transition-colors line-clamp-3">
                    {article.title}
                  </h2>
                  <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0 text-muted-foreground opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>

                {/* Description */}
                {article.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {article.description}
                  </p>
                )}

                {/* Date */}
                {article.pubDate && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto pt-2 border-t border-border/50">
                    <Clock className="w-3 h-3" />
                    <time dateTime={article.pubDate}>{getRelativeTime(article.pubDate)}</time>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
