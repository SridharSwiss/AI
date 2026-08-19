import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MemberGate } from "@/components/switzerland/member-gate";
import {
  Scale, FlaskConical, Building2, BookOpen, Calendar, MapPin, Sparkles,
  Handshake, ArrowRight, ArrowLeft,
} from "lucide-react";

const BASE_URL = "https://ai-hub.host";

export const metadata: Metadata = {
  title: "The Network — AI Hub Switzerland Working Groups & Events",
  description:
    "Working groups and member events for the AI Hub Switzerland community — AI governance, frontier research, enterprise adoption, and AI literacy.",
  alternates: { canonical: `${BASE_URL}/switzerland/network` },
};

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

export default function NetworkPage() {
  return (
    <>
      <PageHeader
        accent="rose"
        eyebrow="AI Hub Switzerland"
        title="The Network"
        description="Working groups, member events, and the community — for members of AI Hub Switzerland."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/switzerland" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to AI Hub Switzerland
        </Link>

        <MemberGate>
          <div className="space-y-14">
            {/* Working groups */}
            <section>
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-500" /> Working groups
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workingGroups.map((g) => (
                  <Card key={g.title} className="glass-card h-full">
                    <CardContent className="p-5 flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                        <g.icon className="w-4 h-4 text-rose-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-0.5">{g.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Events */}
            <section>
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-500" /> Upcoming events
              </h2>
              <div className="space-y-3">
                {events.map((ev) => (
                  <Card key={ev.title} className="glass-card">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest">{ev.month}</span>
                        <span className="text-xl font-black leading-none">{ev.day}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{ev.title}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {ev.place}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-rose-500 bg-rose-500/10 rounded-full px-2.5 py-1 flex-shrink-0">{ev.tag}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-3xl border border-rose-500/15 bg-gradient-to-br from-rose-500/10 via-violet-500/5 to-transparent p-8 sm:p-10 text-center">
              <h2 className="text-2xl font-bold mb-2">Not a member yet?</h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
                Apply for free membership to join a working group, attend events, and help shape the agenda for responsible AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/switzerland/join">
                  <Button variant="gradient" size="lg" className="gap-2"><Handshake className="w-4 h-4" /> Apply for membership</Button>
                </Link>
                <Link href="/team">
                  <Button variant="outline" size="lg" className="gap-2">Meet the team <ArrowRight className="w-4 h-4" /></Button>
                </Link>
              </div>
            </section>
          </div>
        </MemberGate>
      </div>
    </>
  );
}
