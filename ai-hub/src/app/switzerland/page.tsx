import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthGate } from "@/components/shared/auth-gate";
import {
  FlaskConical, Cpu, Rocket, Landmark, Globe, Sparkles, ArrowRight,
  Network, Users, Handshake, Scale, TrendingUp, Calendar, MapPin,
  BookOpen, Building2, Lightbulb,
} from "lucide-react";

const BASE_URL = "https://ai-hub.host";

export const metadata: Metadata = {
  title: "AI Hub Switzerland: Global Network for Responsible AI",
  description:
    "AI Hub Switzerland connects researchers, technology experts, entrepreneurs, and policymakers worldwide to advance responsible, trustworthy AI from the heart of Europe.",
  alternates: { canonical: `${BASE_URL}/switzerland` },
  openGraph: {
    title: "AI Hub Switzerland: Global Network for Responsible AI",
    description:
      "A global platform uniting researchers, technology experts, entrepreneurs, and policymakers to advance responsible AI.",
    url: `${BASE_URL}/switzerland`,
    type: "website",
  },
};

const pillars = [
  { icon: Network, title: "Connect", desc: "Bring together the people shaping AI — across research, industry, and government — in one trusted network.", accent: "from-rose-500 to-pink-600" },
  { icon: Handshake, title: "Collaborate", desc: "Turn conversations into projects: joint research, pilots, and cross-border partnerships.", accent: "from-violet-500 to-purple-600" },
  { icon: Scale, title: "Govern", desc: "Shape responsible AI through shared standards, ethics, and evidence-based policy dialogue.", accent: "from-blue-500 to-cyan-600" },
  { icon: TrendingUp, title: "Grow", desc: "Help ideas, talent, and ventures scale — from lab and classroom to global impact.", accent: "from-emerald-500 to-teal-600" },
];

const audiences = [
  { icon: FlaskConical, title: "Researchers", desc: "Share breakthroughs, find collaborators, and connect academic AI research with real-world impact." },
  { icon: Cpu, title: "Technology Experts", desc: "Exchange technical expertise, shape best practices, and advance the state of applied AI." },
  { icon: Rocket, title: "Entrepreneurs", desc: "Discover opportunities, find partners, and build the next generation of AI-driven companies." },
  { icon: Landmark, title: "Policymakers", desc: "Engage on governance, standards, and regulation to guide AI toward a trustworthy future." },
];

const ecosystem = [
  { stat: "2", label: "World-top-20 tech universities (ETH Zürich · EPFL)" },
  { stat: "#1", label: "Global Innovation Index — years running" },
  { stat: "1,100+", label: "AI & deep-tech companies across Switzerland" },
  { stat: "CERN", label: "Home to landmark open science & computing" },
];

const workingGroups = [
  { icon: Scale, title: "AI Governance & the EU AI Act", desc: "Translating regulation into practice for organizations operating in and beyond the EU." },
  { icon: FlaskConical, title: "Frontier Research", desc: "Foundation models, safety, interpretability, and multimodal systems." },
  { icon: Building2, title: "Enterprise Adoption", desc: "Real-world deployment patterns, ROI, and change management." },
  { icon: BookOpen, title: "AI Literacy & Talent", desc: "Education, upskilling, and building the next generation of AI practitioners." },
];

const events = [
  { month: "SEP", day: "18", title: "Responsible AI Roundtable", place: "Zürich · Hybrid", tag: "Roundtable" },
  { month: "OCT", day: "07", title: "EU AI Act: Practitioner Workshop", place: "Online", tag: "Workshop" },
  { month: "NOV", day: "12", title: "Swiss AI Founders Night", place: "Lausanne", tag: "Networking" },
];

export default function SwitzerlandPage() {
  return (
    <>
      <PageHeader
        accent="rose"
        eyebrow="AI Hub Switzerland"
        title="A global network for responsible AI"
        description="AI Hub Switzerland brings together researchers, technology experts, entrepreneurs, and policymakers from across the world — connecting people, ideas, and institutions to advance trustworthy AI from the heart of Europe."
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/login?redirect=/switzerland">
            <Button variant="gradient" size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" /> Join the network
            </Button>
          </Link>
          <Link href="#network">
            <Button variant="outline" size="lg" className="gap-2">
              Explore the network <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">

        {/* Mission */}
        <section className="animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Why AI Hub Switzerland</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <p className="lg:col-span-2 text-lg text-muted-foreground leading-relaxed">
              Artificial intelligence is being built faster than the world can organize around it. AI Hub
              Switzerland exists to close that gap — a neutral, global platform where the people who
              research, build, fund, and regulate AI meet on common ground. Rooted in Switzerland&apos;s
              tradition of neutrality, precision, and world-class science, we help turn fragmented
              expertise into shared progress and responsible outcomes.
            </p>
            <Card className="glass-card">
              <CardContent className="p-6">
                <Lightbulb className="w-6 h-6 text-rose-500 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Our objective:</span> unite researchers,
                  technology experts, entrepreneurs, and policymakers from across the world on a single
                  platform — and channel that collective intelligence toward AI that is safe, useful, and
                  trusted.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pillars */}
        <section className="animate-fade-up">
          <h2 className="text-2xl font-bold mb-8">What we do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p) => (
              <Card key={p.title} className="glass-card h-full hover:-translate-y-1.5 transition-transform duration-200">
                <CardContent className="p-6">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center mb-4`}>
                    <p.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1.5">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Swiss AI ecosystem */}
        <section className="animate-fade-up">
          <div className="rounded-3xl border border-rose-500/15 bg-gradient-to-br from-rose-500/8 via-violet-500/5 to-transparent p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-5 h-5 text-rose-500" />
              <h2 className="text-2xl font-bold">Anchored in a world-leading AI ecosystem</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {ecosystem.map((e) => (
                <div key={e.label} className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-black gradient-text-vivid mb-2">{e.stat}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{e.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="animate-fade-up">
          <h2 className="text-2xl font-bold mb-8">Who it&apos;s for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {audiences.map((a) => (
              <Card key={a.title} className="h-full">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500/10 to-violet-500/10 border border-rose-500/15 flex items-center justify-center flex-shrink-0">
                    <a.icon className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{a.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Gated: The Network ─────────────────────────────── */}
        <section id="network" className="animate-fade-up scroll-mt-28">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-rose-500" />
            <h2 className="text-2xl font-bold">The Network</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            Working groups, member events, and the community directory are open to signed-in members.
          </p>

          <AuthGate
            title="Join AI Hub Switzerland"
            description="Sign in or create a free account to access working groups, upcoming events, and the member network."
            redirect="/switzerland"
          >
            <div className="space-y-12">
              {/* Working groups */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-500" /> Working groups
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {workingGroups.map((g) => (
                    <Card key={g.title} className="glass-card h-full">
                      <CardContent className="p-5 flex gap-3">
                        <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                          <g.icon className="w-4 h-4 text-rose-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-0.5">{g.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Events */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-500" /> Upcoming events
                </h3>
                <div className="space-y-3">
                  {events.map((ev) => (
                    <Card key={ev.title} className="glass-card">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex-shrink-0">
                          <span className="text-[10px] font-bold tracking-widest">{ev.month}</span>
                          <span className="text-xl font-black leading-none">{ev.day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{ev.title}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" /> {ev.place}
                          </p>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-rose-500 bg-rose-500/10 rounded-full px-2.5 py-1 flex-shrink-0">
                          {ev.tag}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Join CTA */}
              <div className="rounded-3xl border border-rose-500/15 bg-gradient-to-br from-rose-500/10 via-violet-500/5 to-transparent p-8 sm:p-10 text-center">
                <h3 className="text-2xl font-bold mb-2">You&apos;re in. Let&apos;s build.</h3>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
                  Introduce yourself, join a working group, and help shape the agenda for responsible AI.
                  Reach the team to get involved.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="mailto:info@ai-hub.host?subject=Joining%20AI%20Hub%20Switzerland">
                    <Button variant="gradient" size="lg" className="gap-2">
                      <Handshake className="w-4 h-4" /> Get involved
                    </Button>
                  </a>
                  <Link href="/team">
                    <Button variant="outline" size="lg" className="gap-2">
                      Meet the team <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AuthGate>
        </section>
      </div>
    </>
  );
}
