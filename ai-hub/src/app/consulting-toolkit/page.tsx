import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckSquare, ArrowRight, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Consulting Toolkit",
  description: "Implementation playbooks, assessment frameworks, and templates for AI projects.",
};

const phases = [
  {
    phase: "assess",
    label: "Phase 1: Assess",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50",
    description: "Evaluate your organization's AI readiness and identify opportunities.",
    playbooks: [
      { title: "AI Readiness Assessment", items: 12, level: "manager", desc: "Score your org's data maturity, talent, and infrastructure." },
      { title: "Use Case Prioritization Matrix", items: 8, level: "manager", desc: "Rank AI opportunities by impact vs. feasibility." },
      { title: "Stakeholder Alignment Workshop", items: 6, level: "executive", desc: "Templates for getting leadership buy-in." },
    ],
  },
  {
    phase: "pilot",
    label: "Phase 2: Pilot",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/50",
    description: "Run a contained proof-of-concept to validate and learn.",
    playbooks: [
      { title: "Pilot Project Charter Template", items: 10, level: "manager", desc: "Define scope, success metrics, and risk controls." },
      { title: "Vendor Evaluation Scorecard", items: 15, level: "manager", desc: "Compare AI vendors across 15 dimensions." },
      { title: "AI Ethics Checklist", items: 9, level: "practitioner", desc: "Ensure fairness, transparency, and accountability." },
    ],
  },
  {
    phase: "scale",
    label: "Phase 3: Scale",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50",
    description: "Expand from pilot to production with governance and change management.",
    playbooks: [
      { title: "MLOps Maturity Roadmap", items: 18, level: "practitioner", desc: "From manual deployments to automated ML pipelines." },
      { title: "Change Management Playbook", items: 12, level: "manager", desc: "Drive adoption with training and communication plans." },
      { title: "AI ROI Measurement Framework", items: 7, level: "executive", desc: "Track and report business value of AI investments." },
    ],
  },
  {
    phase: "govern",
    label: "Phase 4: Govern",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50",
    description: "Establish ongoing oversight, compliance, and continuous improvement.",
    playbooks: [
      { title: "AI Governance Framework", items: 20, level: "executive", desc: "Policies, accountability structures, and review processes." },
      { title: "Model Risk Management Policy", items: 14, level: "practitioner", desc: "Monitor, audit, and manage deployed AI systems." },
      { title: "AI Incident Response Playbook", items: 8, level: "manager", desc: "Handle AI failures, bias incidents, and compliance breaches." },
    ],
  },
];

const levelColor: Record<string, "blue" | "green" | "purple" | "amber"> = {
  beginner: "green", practitioner: "blue", manager: "purple", executive: "amber",
};

export default function ConsultingToolkitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Consulting Toolkit"
        title="AI Implementation Playbooks"
        description="Practical frameworks, checklists, and templates for every stage of the AI project lifecycle."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Phase overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {phases.map((p) => (
            <div key={p.phase} className={`p-4 rounded-xl border ${p.bg}`}>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center mb-2`}>
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <p className="font-semibold text-sm">{p.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Playbooks by phase */}
        {phases.map((p) => (
          <div key={p.phase}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className={`w-6 h-6 rounded bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
              {p.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {p.playbooks.map((pb) => (
                <Card key={pb.title} className="group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                  <CardHeader className="pb-3">
                    <Badge variant={levelColor[pb.level] ?? "blue"} className="w-fit mb-2">{pb.level}</Badge>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">{pb.title}</CardTitle>
                    <CardDescription>{pb.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckSquare className="w-4 h-4 text-primary" />
                      {pb.items} checklist items
                    </div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-3">⚠ Full content in Phase 5</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
