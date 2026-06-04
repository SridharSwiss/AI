import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Wrench, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "Discover and compare 500+ AI tools across every category.",
};

const tools = [
  { name: "ChatGPT", vendor: "OpenAI", category: "Language Models", pricing: "freemium", description: "Conversational AI for writing, analysis, coding, and problem-solving.", tags: ["NLP", "Productivity", "Coding"], website: "https://chat.openai.com" },
  { name: "Claude", vendor: "Anthropic", category: "Language Models", pricing: "freemium", description: "Safety-focused AI assistant with strong reasoning and document analysis.", tags: ["NLP", "Safety", "Analysis"], website: "https://claude.ai" },
  { name: "Gemini", vendor: "Google", category: "Language Models", pricing: "freemium", description: "Multimodal AI from Google with deep integration into Workspace.", tags: ["Multimodal", "Search", "Productivity"], website: "https://gemini.google.com" },
  { name: "GitHub Copilot", vendor: "GitHub / OpenAI", category: "Code Assistance", pricing: "paid", description: "AI pair programmer that suggests code completions in your IDE.", tags: ["Coding", "IDE", "Productivity"], website: "https://github.com/features/copilot" },
  { name: "Cursor", vendor: "Anysphere", category: "Code Assistance", pricing: "freemium", description: "AI-first code editor built for pair programming with LLMs.", tags: ["Coding", "IDE", "Editor"], website: "https://cursor.sh" },
  { name: "Midjourney", vendor: "Midjourney", category: "Image Generation", pricing: "paid", description: "High-quality AI image generation from text prompts via Discord.", tags: ["Image", "Creative", "Design"], website: "https://midjourney.com" },
  { name: "DALL-E 3", vendor: "OpenAI", category: "Image Generation", pricing: "freemium", description: "Generate and edit images from natural language descriptions.", tags: ["Image", "Creative"], website: "https://openai.com/dall-e-3" },
  { name: "Runway", vendor: "Runway ML", category: "Video Generation", pricing: "freemium", description: "AI-powered video generation, editing, and effects tools.", tags: ["Video", "Creative", "Media"], website: "https://runwayml.com" },
  { name: "ElevenLabs", vendor: "ElevenLabs", category: "Voice & Audio", pricing: "freemium", description: "Realistic text-to-speech and voice cloning technology.", tags: ["Audio", "Voice", "TTS"], website: "https://elevenlabs.io" },
  { name: "Perplexity", vendor: "Perplexity AI", category: "Search & Research", pricing: "freemium", description: "AI-powered answer engine with cited, real-time web search.", tags: ["Search", "Research", "Citations"], website: "https://perplexity.ai" },
  { name: "Pinecone", vendor: "Pinecone", category: "Vector Databases", pricing: "freemium", description: "Managed vector database for building AI applications.", tags: ["Vector DB", "Infrastructure", "RAG"], website: "https://pinecone.io" },
  { name: "LangChain", vendor: "LangChain", category: "Frameworks", pricing: "open-source", description: "Framework for building LLM-powered applications and agents.", tags: ["Framework", "Python", "LLM"], website: "https://langchain.com" },
];

const categories = ["All", "Language Models", "Code Assistance", "Image Generation", "Video Generation", "Voice & Audio", "Search & Research", "Vector Databases", "Frameworks"];

const pricingBadge: Record<string, "green" | "blue" | "amber" | "purple"> = {
  free: "green",
  freemium: "blue",
  paid: "amber",
  enterprise: "purple",
  "open-source": "green",
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Tools Directory"
        title="Discover & Compare AI Tools"
        description="500+ AI tools curated across every category. Filter by use case, pricing, and integration to find the right tool for your needs."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-accent hover:border-border/80 transition-colors first:bg-primary first:text-primary-foreground first:border-transparent"
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {tools.length} tools · Phase 2 will add full filtering, search, and 500+ entries.{" "}
          <span className="text-amber-600 dark:text-amber-400">⚠ Sample data — needs ongoing curation</span>
        </p>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <Card key={tool.name} className="group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20 flex items-center justify-center font-bold text-violet-600">
                    {tool.name[0]}
                  </div>
                  <Badge variant={pricingBadge[tool.pricing]}>{tool.pricing}</Badge>
                </div>
                <CardTitle className="text-base group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                <CardDescription className="text-xs">{tool.vendor} · {tool.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                  ))}
                </div>
                <a href={tool.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                  <ExternalLink className="w-3 h-3" /> Visit website
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
