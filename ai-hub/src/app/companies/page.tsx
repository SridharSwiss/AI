import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Companies",
  description: "Profiles of the leading AI companies shaping the industry.",
};

const companies = [
  { name: "OpenAI", founded: 2015, focus: "Foundation Models", products: ["GPT-4o", "ChatGPT", "DALL-E", "Sora", "Whisper"], description: "Developer of GPT series and ChatGPT. Leading research lab and consumer AI products.", website: "https://openai.com", tags: ["LLM", "Research", "Consumer"] },
  { name: "Anthropic", founded: 2021, focus: "AI Safety", products: ["Claude 3.5", "Claude API"], description: "Safety-focused AI research company building reliable, interpretable AI systems.", website: "https://anthropic.com", tags: ["Safety", "LLM", "Research"] },
  { name: "Google DeepMind", founded: 2010, focus: "AI Research", products: ["Gemini", "AlphaFold", "Gemma", "Imagen"], description: "Google's unified AI research division. Pioneers in reinforcement learning and scientific AI.", website: "https://deepmind.google", tags: ["Research", "Multimodal", "Science"] },
  { name: "Meta AI", founded: 2013, focus: "Open-Source AI", products: ["Llama 3", "SAM", "Seamless", "FAIR Research"], description: "Meta's AI division. Champions open-source LLMs and computer vision research.", website: "https://ai.meta.com", tags: ["Open-Source", "LLM", "Vision"] },
  { name: "Microsoft", founded: 1975, focus: "AI Integration", products: ["Copilot", "Azure OpenAI", "Phi-3", "Bing AI"], description: "Massive AI investment in Azure, Office 365 Copilot, and OpenAI partnership.", website: "https://microsoft.com/ai", tags: ["Enterprise", "Cloud", "Productivity"] },
  { name: "Hugging Face", founded: 2016, focus: "AI Community Platform", products: ["Transformers", "Hub", "Spaces", "Inference API"], description: "The GitHub of machine learning. Hosts 500k+ models and datasets.", website: "https://huggingface.co", tags: ["Open-Source", "Platform", "Community"] },
  { name: "Mistral AI", founded: 2023, focus: "Efficient LLMs", products: ["Mistral 7B", "Mixtral", "Mistral Large"], description: "European AI startup building highly efficient open and commercial language models.", website: "https://mistral.ai", tags: ["LLM", "Open-Source", "European"] },
  { name: "Stability AI", founded: 2020, focus: "Generative Media", products: ["Stable Diffusion", "Stable Audio", "StableCode"], description: "Open-source generative AI for images, audio, video, and code.", website: "https://stability.ai", tags: ["Image", "Open-Source", "Generative"] },
  { name: "Cohere", founded: 2019, focus: "Enterprise NLP", products: ["Command", "Embed", "Rerank", "Aya"], description: "Enterprise-focused NLP platform. Strong in search, classification, and generation.", website: "https://cohere.com", tags: ["Enterprise", "NLP", "Search"] },
];

export default function CompaniesPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Companies"
        title="Who's Building AI?"
        description="Profiles of the companies, research labs, and startups shaping the AI landscape."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-muted-foreground mb-8">
          Showing {companies.length} companies · <span className="text-amber-600 dark:text-amber-400">⚠ Sample data — Phase 2 adds full profiles and filtering</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies.map((company) => (
            <Card key={company.name} className="group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{company.name}</CardTitle>
                    <CardDescription>{company.focus} · Founded {company.founded}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{company.description}</p>
                <div>
                  <p className="text-xs font-medium mb-1.5 text-muted-foreground uppercase tracking-wide">Key Products</p>
                  <div className="flex flex-wrap gap-1">
                    {company.products.map((p) => (
                      <span key={p} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{p}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {company.tags.map((tag) => (
                    <Badge key={tag} variant="purple" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                  <ExternalLink className="w-3 h-3" /> {company.website.replace("https://", "")}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
