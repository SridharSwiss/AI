import { NextResponse } from "next/server";
import { newsSources } from "@/data/news-sources";

export const runtime = "nodejs";
export const revalidate = 3600; // cache for 1 hour

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  sourceName: string;
  sourceCategory: string;
}

function extractTag(xml: string, tag: string): string {
  const patterns = [
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i"),
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"),
  ];
  for (const re of patterns) {
    const m = xml.match(re);
    if (m?.[1]) return m[1].trim();
  }
  return "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  return xml.match(re)?.[1] ?? "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max: number): string {
  const clean = stripHtml(text);
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trimEnd() + "…";
}

async function fetchFeed(source: (typeof newsSources)[number]): Promise<Article[]> {
  const res = await fetch(source.rssUrl, {
    headers: { "User-Agent": "Mozilla/5.0 AIHub/1.0" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();

  // Split into items (RSS) or entries (Atom)
  const itemPattern = /<item[\s>]([\s\S]*?)<\/item>/gi;
  const entryPattern = /<entry[\s>]([\s\S]*?)<\/entry>/gi;

  const segments: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = itemPattern.exec(xml)) !== null) segments.push(m[1]);
  while ((m = entryPattern.exec(xml)) !== null) segments.push(m[1]);

  return segments.slice(0, 6).map((seg): Article => {
    const title = stripHtml(extractTag(seg, "title") || "Untitled");

    // Link: RSS uses <link>, Atom uses <link href="..."> or <id>
    const link =
      extractTag(seg, "link") ||
      extractAttr(seg, "link", "href") ||
      extractTag(seg, "id") ||
      "#";

    const pubDate =
      extractTag(seg, "pubDate") ||
      extractTag(seg, "published") ||
      extractTag(seg, "updated") ||
      "";

    const description = truncate(
      extractTag(seg, "description") ||
        extractTag(seg, "summary") ||
        extractTag(seg, "content") ||
        "",
      180
    );

    return { title, link: link.trim(), pubDate, description, sourceName: source.name, sourceCategory: source.category };
  });
}

export async function GET() {
  const results = await Promise.allSettled(newsSources.map(fetchFeed));

  const articles: Article[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") articles.push(...r.value);
  }

  articles.sort((a, b) => {
    const da = new Date(a.pubDate).getTime() || 0;
    const db = new Date(b.pubDate).getTime() || 0;
    return db - da;
  });

  return NextResponse.json({ articles, fetchedAt: new Date().toISOString() }, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
