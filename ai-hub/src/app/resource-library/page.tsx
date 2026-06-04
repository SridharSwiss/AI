import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, ExternalLink, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Resource Library",
  description: "Curated whitepapers, research reports, and public documents on AI.",
};

const resources = [
  { title: "Attention Is All You Need", source: "Google Brain / Arxiv", year: 2017, category: "Research Paper", description: "The landmark Transformer architecture paper. Foundation for all modern LLMs.", link: "https://arxiv.org/abs/1706.03762", tags: ["Transformers", "NLP", "Architecture"] },
  { title: "Artificial Intelligence Index Report 2024", source: "Stanford HAI", year: 2024, category: "Annual Report", description: "Comprehensive annual report on AI development, adoption, and policy trends.", link: "https://aiindex.stanford.edu/report/", tags: ["State of AI", "Policy", "Research"] },
  { title: "State of AI Report 2024", source: "Air Street Capital", year: 2024, category: "Industry Report", description: "Annual deep-dive into research, industry, politics, and safety of AI.", link: "https://www.stateof.ai", tags: ["Industry", "Research", "Safety"] },
  { title: "NIST AI Risk Management Framework", source: "NIST", year: 2023, category: "Government Document", description: "Voluntary framework for managing AI-related risks in organizations.", link: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf", tags: ["Governance", "Risk", "Policy"] },
  { title: "EU AI Act Full Text", source: "European Union", year: 2024, category: "Regulation", description: "Official consolidated text of the EU Artificial Intelligence Act.", link: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689", tags: ["Regulation", "Compliance", "EU"] },
  { title: "Sparks of Artificial General Intelligence", source: "Microsoft Research", year: 2023, category: "Research Paper", description: "Microsoft's analysis of GPT-4 capabilities and AGI benchmarking.", link: "https://arxiv.org/abs/2303.12528", tags: ["AGI", "GPT-4", "Research"] },
  { title: "Constitutional AI: Harmlessness from AI Feedback", source: "Anthropic", year: 2022, category: "Research Paper", description: "Anthropic's method for training safer AI systems using AI feedback.", link: "https://arxiv.org/abs/2212.08073", tags: ["Safety", "RLHF", "Research"] },
  { title: "The Economic Potential of Generative AI", source: "McKinsey", year: 2023, category: "Industry Report", description: "Analysis of $4.4 trillion potential economic impact of generative AI.", link: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai", tags: ["Economics", "Business Impact", "Strategy"] },
];

const categoryColor: Record<string, "blue" | "green" | "purple" | "amber" | "pink"> = {
  "Research Paper": "purple",
  "Annual Report": "blue",
  "Industry Report": "blue",
  "Government Document": "green",
  Regulation: "amber",
};

export default function ResourceLibraryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resource Library"
        title="Whitepapers & Public Documents"
        description="Curated collection of research papers, reports, and official documents. All publicly available with attribution."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Research Papers", "Industry Reports", "Government Docs", "Regulations", "Annual Reports"].map((f) => (
            <button key={f} className="px-4 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-accent transition-colors first:bg-primary first:text-primary-foreground first:border-transparent">
              {f}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {resources.length} curated documents · <span className="text-amber-600 dark:text-amber-400">⚠ Sample — Phase 5 adds full library with MDX summaries</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {resources.map((r) => (
            <Card key={r.title} className="group hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant={categoryColor[r.category] ?? "blue"}>{r.category}</Badge>
                  <span className="text-xs text-muted-foreground">{r.year}</span>
                </div>
                <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">{r.title}</CardTitle>
                <CardDescription>{r.source}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{r.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {r.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                  ))}
                </div>
                <a href={r.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                  <ExternalLink className="w-3 h-3" /> Access document
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
