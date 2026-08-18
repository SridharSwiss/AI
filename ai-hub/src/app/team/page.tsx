import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Compass, HeartHandshake } from "lucide-react";
import { LinkedInIcon } from "@/components/shared/linkedin-icon";

const BASE_URL = "https://ai-hub.host";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the team behind AIHub Switzerland — the founder and directors bringing together researchers, technology experts, entrepreneurs, and policymakers on a single platform.",
  alternates: { canonical: `${BASE_URL}/team` },
  openGraph: {
    title: "Our Team — AIHub Switzerland",
    description: "Meet the founder and directors behind AIHub Switzerland.",
    url: `${BASE_URL}/team`,
    type: "website",
  },
};

const team = [
  { name: "Sridhar Gande",        role: "Founder & President",           icon: Crown,         initials: "SG", accent: "from-violet-500 to-pink-600", linkedin: "https://www.linkedin.com/in/ch-sgande/" },
  { name: "Thirupathi Pathipaka", role: "Director, AI Advisory",         icon: Compass,       initials: "TP", accent: "from-blue-500 to-cyan-500",  linkedin: "https://www.linkedin.com/in/thirupathi-pattipaka/" },
  { name: "Amar Kavi",            role: "Director, Consumer Relations",  icon: HeartHandshake,initials: "AK", accent: "from-emerald-500 to-teal-500", linkedin: "https://www.linkedin.com/in/amarkavi/" },
];

export default function TeamPage() {
  return (
    <>
      <PageHeader
        accent="violet"
        eyebrow="Our Team"
        title="The people behind AIHub Switzerland"
        description="A team dedicated to bringing together researchers, technology experts, entrepreneurs, and policymakers from across the world on a single platform."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((member) => (
            <Card key={member.name} className="h-full text-center">
              <CardContent className="p-8 flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.accent} flex items-center justify-center mb-5 shadow-lg`}>
                  <span className="text-2xl font-black text-white tracking-tight">{member.initials}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                  <member.icon className="w-3.5 h-3.5 text-violet-500" />
                  {member.role}
                </div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border/60 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
