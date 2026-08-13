import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Cpu, Rocket, Landmark, Globe, Sparkles, ArrowRight } from "lucide-react";

const BASE_URL = "https://sridhar-ai.ch";

export const metadata: Metadata = {
  title: "AI Hub Switzerland — Coming Soon",
  description: "AI Hub Switzerland is a digital platform bringing together researchers, technology experts, entrepreneurs, and policymakers from across the world on a single platform. Launching soon.",
  alternates: { canonical: `${BASE_URL}/switzerland` },
  openGraph: {
    title: "AI Hub Switzerland — Coming Soon",
    description: "A single global platform uniting researchers, technology experts, entrepreneurs, and policymakers. Launching soon.",
    url: `${BASE_URL}/switzerland`,
    type: "website",
  },
};

const audiences = [
  { icon: FlaskConical, title: "Researchers",        description: "Share breakthroughs, collaborate across borders, and connect academic AI research with real-world impact." },
  { icon: Cpu,          title: "Technology Experts", description: "Exchange technical expertise, shape best practices, and advance the state of applied artificial intelligence." },
  { icon: Rocket,       title: "Entrepreneurs",      description: "Discover opportunities, find partners, and build the next generation of AI-driven companies." },
  { icon: Landmark,     title: "Policymakers",       description: "Engage on governance, standards, and regulation to guide AI toward a responsible, trustworthy future." },
];

export default function SwitzerlandPage() {
  return (
    <>
      <PageHeader
        accent="rose"
        eyebrow="AI Hub Switzerland"
        title="A single global platform for the AI community"
        description="AI Hub Switzerland brings together researchers, technology experts, entrepreneurs, and policymakers from across the world — connecting people, ideas, and institutions on one platform."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Coming soon banner */}
        <section className="animate-fade-up">
          <div className="relative overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 via-violet-500/5 to-transparent p-10 sm:p-14 text-center">
            <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full blur-[90px] opacity-40 pointer-events-none bg-gradient-to-br from-rose-500 to-pink-500" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-rose-500 dark:text-rose-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                Officially launched — platform coming soon
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-4 gradient-text">Coming Soon</h2>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                The AI Hub Switzerland digital platform has been officially launched. We are building the
                experience that will bring the global AI community together in one place. Stay tuned —
                the full platform is on its way.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/">
                  <Button variant="gradient" size="lg" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Explore AIHub in the meantime
                  </Button>
                </Link>
                <Link href="/contribute">
                  <Button variant="outline" size="lg" className="gap-2">
                    Get involved
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Bringing the world together</h2>
          </div>
          <p className="text-body text-muted-foreground max-w-3xl leading-relaxed mb-8">
            AI Hub Switzerland was created with the objective of uniting the people who shape the future
            of artificial intelligence — on a single platform, across every discipline and every border.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {audiences.map((a) => (
              <Card key={a.title} className="h-full">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500/10 to-violet-500/10 border border-rose-500/15 flex items-center justify-center mb-4">
                    <a.icon className="w-5 h-5 text-rose-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1.5">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
