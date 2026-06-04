import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Compliance & Governance",
  description: "Regulatory frameworks, compliance guidance, and governance for AI systems.",
};

const frameworks = [
  {
    name: "EU AI Act",
    jurisdiction: "European Union",
    status: "In Force",
    statusColor: "green",
    summary: "World's first comprehensive AI regulation. Risk-based approach categorizing AI systems by potential harm (unacceptable, high, limited, minimal risk).",
    applies: ["Any org deploying AI in the EU", "AI system providers to EU users", "Importers of AI systems"],
    keyDate: "August 2024 — In Force",
    href: "/compliance/eu-ai-act",
    tags: ["Enterprise", "Consumer", "Government"],
  },
  {
    name: "NIST AI RMF",
    jurisdiction: "United States",
    status: "Published",
    statusColor: "blue",
    summary: "NIST AI Risk Management Framework. Voluntary guidance for trustworthy AI. Organized around GOVERN, MAP, MEASURE, MANAGE functions.",
    applies: ["US federal agencies", "Organizations doing business with government", "Voluntary adoption recommended for all"],
    keyDate: "January 2023 — Published",
    href: "/compliance/nist-ai-rmf",
    tags: ["Voluntary", "Enterprise", "Government"],
  },
  {
    name: "ISO/IEC 42001",
    jurisdiction: "International",
    status: "Published",
    statusColor: "blue",
    summary: "First international standard for AI management systems. Provides certifiable framework for responsible AI development and deployment.",
    applies: ["Organizations developing AI", "Organizations deploying AI products", "AI service providers seeking certification"],
    keyDate: "December 2023 — Published",
    href: "/compliance/iso-42001",
    tags: ["Certification", "Enterprise", "International"],
  },
  {
    name: "GDPR & AI",
    jurisdiction: "European Union",
    status: "In Force",
    statusColor: "green",
    summary: "GDPR applies fully to AI systems processing personal data. Automated decision-making restrictions, data minimization, and right to explanation.",
    applies: ["Any org processing EU personal data", "AI systems making automated decisions", "Profiling and recommendation systems"],
    keyDate: "2018 — In Force (expanded AI guidance 2023)",
    href: "/compliance/gdpr",
    tags: ["Privacy", "Consumer", "Enterprise"],
  },
  {
    name: "UK AI Safety Framework",
    jurisdiction: "United Kingdom",
    status: "Active",
    statusColor: "blue",
    summary: "DSIT voluntary code and AI Safety Institute evaluations. Focus on frontier AI safety and sector-specific guidance.",
    applies: ["Frontier AI developers", "UK public sector", "Organizations with significant AI deployment"],
    keyDate: "2023 — Active, evolving",
    href: "/compliance/uk-ai-safety",
    tags: ["Voluntary", "Frontier AI", "Government"],
  },
  {
    name: "Executive Order on AI (US)",
    jurisdiction: "United States",
    status: "Active",
    statusColor: "amber",
    summary: "Biden EO 14110 on Safe, Secure, and Trustworthy AI. Requires safety reporting for frontier AI, establishes federal AI governance.",
    applies: ["Frontier AI developers (>10^26 FLOPs)", "US federal contractors using AI", "Critical infrastructure operators"],
    keyDate: "October 2023 — Active",
    href: "/compliance/us-executive-order",
    tags: ["Government", "Frontier AI", "Enterprise"],
  },
];

const statusColor: Record<string, "green" | "blue" | "amber"> = { "In Force": "green", Published: "blue", Active: "blue", Pending: "amber" };

export default function CompliancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Compliance & Governance"
        title="AI Regulatory Landscape"
        description="Navigate AI regulations, governance frameworks, and compliance requirements. Explained for every audience level."
      >
        <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-sm text-amber-800 dark:text-amber-300 max-w-2xl">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          This is educational guidance. Always consult legal counsel for compliance decisions.
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {frameworks.map((f) => (
            <Link key={f.name} href={f.href}>
              <Card className="h-full group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant={statusColor[f.status] ?? "blue"}>{f.status}</Badge>
                    <span className="text-xs text-muted-foreground">{f.jurisdiction}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{f.name}</CardTitle>
                  </div>
                  <CardDescription className="text-xs font-medium">{f.keyDate}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{f.summary}</p>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Who it applies to</p>
                    <ul className="space-y-1">
                      {f.applies.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {f.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
