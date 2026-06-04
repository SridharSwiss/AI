"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Wrench, Building2, BookOpen, TrendingUp, Shield, Library } from "lucide-react";
import { tools } from "@/data/tools";
import { companies } from "@/data/companies";
import { caseStudies } from "@/data/case-studies";
import { learnResources } from "@/data/learn";
import { complianceFrameworks } from "@/data/compliance";
import { resources } from "@/data/resources";

interface SearchItem {
  type: "tool" | "company" | "case-study" | "learn" | "compliance" | "resource";
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string;
}

const typeIcon: Record<string, React.ElementType> = {
  tool: Wrench,
  company: Building2,
  "case-study": TrendingUp,
  learn: BookOpen,
  compliance: Shield,
  resource: Library,
};

const typeBadge: Record<string, "blue" | "purple" | "green" | "amber" | "pink" | "default"> = {
  tool: "blue",
  company: "purple",
  "case-study": "green",
  learn: "amber",
  compliance: "pink",
  resource: "default",
};

const typeLabels: Record<string, string> = {
  tool: "Tool",
  company: "Company",
  "case-study": "Case Study",
  learn: "Resource",
  compliance: "Compliance",
  resource: "Document",
};

// Build a flat search corpus
const corpus: SearchItem[] = [
  ...tools.map((t) => ({
    type: "tool" as const,
    slug: t.slug,
    title: t.name,
    subtitle: `${t.vendor} · ${t.category}`,
    description: t.tagline,
    tags: t.tags,
    href: `/tools/${t.slug}`,
  })),
  ...companies.map((c) => ({
    type: "company" as const,
    slug: c.slug,
    title: c.name,
    subtitle: `${c.focus} · ${c.hq}`,
    description: c.description.slice(0, 120),
    tags: c.tags,
    href: `/companies/${c.slug}`,
  })),
  ...caseStudies.map((cs) => ({
    type: "case-study" as const,
    slug: cs.slug,
    title: cs.company,
    subtitle: cs.industry,
    description: cs.title,
    tags: cs.tags,
    href: `/case-studies/${cs.slug}`,
  })),
  ...learnResources.map((r) => ({
    type: "learn" as const,
    slug: r.slug,
    title: r.title,
    subtitle: `${r.provider} · ${r.level}`,
    description: r.description,
    tags: r.tags,
    href: r.link,
  })),
  ...complianceFrameworks.map((f) => ({
    type: "compliance" as const,
    slug: f.slug,
    title: f.name,
    subtitle: `${f.jurisdiction} · ${f.status}`,
    description: f.description.slice(0, 120),
    tags: f.tags,
    href: `/compliance/${f.slug}`,
  })),
  ...resources.map((r) => ({
    type: "resource" as const,
    slug: r.slug,
    title: r.title,
    subtitle: `${r.source} · ${r.year}`,
    description: r.description,
    tags: r.tags,
    href: r.link,
  })),
];

const fuse = new Fuse(corpus, {
  keys: ["title", "subtitle", "description", "tags"],
  threshold: 0.35,
  includeScore: true,
});

const typeFilters = ["All", "tool", "company", "case-study", "learn", "compliance", "resource"];

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("All");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const fuseResults = fuse.search(query).map((r) => r.item);
    if (activeType === "All") return fuseResults;
    return fuseResults.filter((r) => r.type === activeType);
  }, [query, activeType]);

  const totalCount = corpus.length;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Search input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${totalCount} tools, companies, resources...`}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-base"
          autoFocus
        />
      </div>

      {/* Type filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {typeFilters.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors capitalize ${
              activeType === type
                ? "bg-primary text-primary-foreground border-transparent"
                : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {type === "All" ? "All" : typeLabels[type]}
          </button>
        ))}
      </div>

      {/* Results */}
      {query.trim() ? (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <div className="space-y-3">
            {results.map((item) => {
              const Icon = typeIcon[item.type];
              const isExternal = item.href.startsWith("http");
              const linkProps = isExternal
                ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                : { href: item.href };

              return (
                <Link key={`${item.type}-${item.slug}`} {...linkProps}>
                  <Card className="group hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-medium text-sm group-hover:text-primary transition-colors">{item.title}</span>
                          <Badge variant={typeBadge[item.type]}>{typeLabels[item.type]}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{item.subtitle}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-muted-foreground mt-2">Try different keywords or remove filters.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Start typing to search across {totalCount} items</p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground mt-4">
            <span className="px-3 py-1 rounded-full bg-muted">Tools</span>
            <span className="px-3 py-1 rounded-full bg-muted">Companies</span>
            <span className="px-3 py-1 rounded-full bg-muted">Case Studies</span>
            <span className="px-3 py-1 rounded-full bg-muted">Learning</span>
            <span className="px-3 py-1 rounded-full bg-muted">Compliance</span>
            <span className="px-3 py-1 rounded-full bg-muted">Documents</span>
          </div>
        </div>
      )}
    </div>
  );
}

