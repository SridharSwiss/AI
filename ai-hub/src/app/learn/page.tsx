import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen, Play, Award, Clock, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Learn AI",
  description: "Courses, guides, YouTube playlists, and certifications for all levels.",
};

const resources = [
  { title: "AI For Everyone", type: "course", provider: "DeepLearning.AI / Coursera", level: "beginner", free: true, description: "Andrew Ng's non-technical intro to AI for business leaders and curious minds.", link: "https://coursera.org/learn/ai-for-everyone", readTime: 8 },
  { title: "Machine Learning Specialization", type: "course", provider: "Stanford / Coursera", level: "intermediate", free: false, description: "The definitive ML course from Andrew Ng. Covers regression, classification, neural nets.", link: "https://coursera.org/specializations/machine-learning-introduction", readTime: 100 },
  { title: "Practical Deep Learning for Coders", type: "course", provider: "fast.ai", level: "intermediate", free: true, description: "Top-down, practical approach to deep learning. Highly recommended for developers.", link: "https://course.fast.ai", readTime: 50 },
  { title: "3Blue1Brown — Neural Networks", type: "youtube", provider: "3Blue1Brown", level: "beginner", free: true, description: "Beautiful visual explainer of neural networks. The best intuition builder available.", link: "https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", readTime: 3 },
  { title: "Andrej Karpathy — Zero to Hero", type: "youtube", provider: "Andrej Karpathy", level: "intermediate", free: true, description: "Build neural nets from scratch in Python. From micrograd to GPT-2.", link: "https://karpathy.ai/zero-to-hero.html", readTime: 20 },
  { title: "AWS Certified AI Practitioner", type: "certification", provider: "Amazon Web Services", level: "beginner", free: false, description: "Foundation-level AI/ML certification from AWS. Great for cloud practitioners.", link: "https://aws.amazon.com/certification/certified-ai-practitioner/", readTime: 20 },
  { title: "Google Professional ML Engineer", type: "certification", provider: "Google Cloud", level: "advanced", free: false, description: "Professional certification for ML engineers working on GCP.", link: "https://cloud.google.com/learn/certification/machine-learning-engineer", readTime: 40 },
  { title: "Prompt Engineering Guide", type: "course", provider: "DAIR.AI", level: "beginner", free: true, description: "Comprehensive guide to prompt engineering techniques for LLMs.", link: "https://promptingguide.ai", readTime: 4 },
  { title: "Hugging Face NLP Course", type: "course", provider: "Hugging Face", level: "intermediate", free: true, description: "Hands-on NLP with Transformers library. Build and fine-tune models.", link: "https://huggingface.co/learn/nlp-course", readTime: 30 },
];

const typeIcon = { course: BookOpen, youtube: Play, certification: Award };
const typeColor = { course: "blue", youtube: "pink", certification: "amber", book: "purple", tutorial: "green" } as const;
const levelColor = { beginner: "green", intermediate: "blue", advanced: "purple" } as const;

export default function LearnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learn AI"
        title="Learning Resources for Every Level"
        description="Curated courses, YouTube playlists, and certifications — from total beginner to ML engineer."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Courses", "YouTube", "Certifications", "Beginner", "Intermediate", "Advanced", "Free Only"].map((f) => (
            <button key={f} className="px-4 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-accent transition-colors first:bg-primary first:text-primary-foreground first:border-transparent">
              {f}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {resources.length} resources · <span className="text-amber-600 dark:text-amber-400">⚠ Sample data — Phase 2 adds full MDX content and filtering</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((r) => {
            const TypeIcon = typeIcon[r.type as keyof typeof typeIcon] ?? BookOpen;
            return (
              <Card key={r.title} className="group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={typeColor[r.type as keyof typeof typeColor] ?? "blue"}>{r.type}</Badge>
                      <Badge variant={levelColor[r.level as keyof typeof levelColor] ?? "blue"}>{r.level}</Badge>
                    </div>
                    {r.free && <Badge variant="green">Free</Badge>}
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors leading-snug">{r.title}</CardTitle>
                  <CardDescription>{r.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{r.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      ~{r.readTime}h
                    </div>
                    <a href={r.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                      <ExternalLink className="w-3 h-3" /> Open resource
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
