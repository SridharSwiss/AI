"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckSquare, ArrowRight, Briefcase, X, CheckCircle } from "lucide-react";

interface Playbook {
  title: string;
  items: number;
  level: string;
  desc: string;
  checklist: string[];
  guidance: string;
}

interface Phase {
  phase: string;
  label: string;
  color: string;
  bg: string;
  description: string;
  playbooks: Playbook[];
}

const levelColor: Record<string, "blue" | "green" | "purple" | "amber"> = {
  beginner: "green",
  practitioner: "blue",
  manager: "purple",
  executive: "amber",
};

interface PlaybookModalProps {
  playbook: Playbook;
  onClose: () => void;
}

function PlaybookModal({ playbook, onClose }: PlaybookModalProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    const next = new Set(checked);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setChecked(next);
  };

  const progress = Math.round((checked.size / playbook.checklist.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-background rounded-2xl border border-border w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-start justify-between gap-4 rounded-t-2xl">
          <div>
            <Badge variant={levelColor[playbook.level] ?? "blue"} className="mb-2">{playbook.level}</Badge>
            <h2 className="text-xl font-bold">{playbook.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{playbook.desc}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent transition-colors flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Guidance */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">{playbook.guidance}</p>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Progress</p>
              <p className="text-sm text-muted-foreground">{checked.size} / {playbook.checklist.length} ({progress}%)</p>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Checklist */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Checklist</p>
            <ul className="space-y-2">
              {playbook.checklist.map((item, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    checked.has(i)
                      ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50"
                      : "border-border hover:bg-accent"
                  }`}
                  onClick={() => toggle(i)}
                >
                  <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors ${checked.has(i) ? "text-emerald-500" : "text-muted-foreground/30"}`} />
                  <span className={`text-sm transition-colors ${checked.has(i) ? "line-through text-muted-foreground" : ""}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const phases: Phase[] = [
  {
    phase: "assess",
    label: "Phase 1: Assess",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50",
    description: "Evaluate your organization's AI readiness and identify opportunities.",
    playbooks: [
      {
        title: "AI Readiness Assessment",
        items: 12,
        level: "manager",
        desc: "Score your org's data maturity, talent, and infrastructure.",
        guidance: "Use this assessment to benchmark your organization's current AI maturity across five dimensions: data infrastructure, talent and skills, leadership commitment, use case clarity, and governance readiness. Score each dimension 1-5 and identify your biggest gaps.",
        checklist: [
          "Document current data infrastructure and quality",
          "Assess team AI/ML skill levels via survey",
          "Identify top 5 candidate AI use cases",
          "Evaluate data privacy and security posture",
          "Review leadership alignment on AI strategy",
          "Benchmark against industry AI maturity models",
          "Identify key AI talent gaps and training needs",
          "Assess integration capabilities of existing systems",
          "Review cloud infrastructure readiness",
          "Evaluate change management capacity",
          "Document AI governance requirements",
          "Create AI readiness scorecard and gap analysis",
        ],
      },
      {
        title: "Use Case Prioritization Matrix",
        items: 8,
        level: "manager",
        desc: "Rank AI opportunities by impact vs. feasibility.",
        guidance: "Score each identified AI use case on a 2x2 matrix: business impact (revenue/cost/risk) vs. technical feasibility (data availability, complexity, timeline). Prioritize high-impact, high-feasibility use cases as your first pilots.",
        checklist: [
          "List all candidate AI use cases from stakeholders",
          "Score each use case on business impact (1-5)",
          "Score each use case on technical feasibility (1-5)",
          "Estimate rough implementation timeline and cost",
          "Identify data requirements per use case",
          "Assess regulatory/compliance constraints",
          "Map use cases to organizational strategic goals",
          "Produce prioritized use case ranking and recommendation",
        ],
      },
      {
        title: "Stakeholder Alignment Workshop",
        items: 6,
        level: "executive",
        desc: "Templates for getting leadership buy-in.",
        guidance: "Run a half-day workshop with C-suite and senior leadership to align on AI vision, address concerns, establish governance principles, and secure sponsorship for the first pilot project.",
        checklist: [
          "Prepare executive AI briefing deck (current capabilities)",
          "Define 3-year AI vision statement with leadership",
          "Identify and address executive concerns and fears",
          "Establish AI steering committee membership",
          "Agree on pilot project selection criteria",
          "Secure executive sponsorship and budget approval",
        ],
      },
    ],
  },
  {
    phase: "pilot",
    label: "Phase 2: Pilot",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/50",
    description: "Run a contained proof-of-concept to validate and learn.",
    playbooks: [
      {
        title: "Pilot Project Charter Template",
        items: 10,
        level: "manager",
        desc: "Define scope, success metrics, and risk controls.",
        guidance: "A strong pilot charter limits scope, defines measurable success criteria before you start, and includes explicit risk mitigation plans. Keep pilots under 90 days and ensure you have a defined 'end state' — either scale, learn, or kill.",
        checklist: [
          "Define pilot scope and explicit boundaries",
          "Set 3-5 measurable success criteria (KPIs)",
          "Identify pilot team and executive sponsor",
          "Document data sources and access requirements",
          "Create 90-day pilot timeline with milestones",
          "Define risk mitigation and rollback plan",
          "Establish user testing and feedback mechanisms",
          "Set weekly check-in cadence and reporting",
          "Document lessons learned process",
          "Define scale/kill decision criteria",
        ],
      },
      {
        title: "Vendor Evaluation Scorecard",
        items: 15,
        level: "manager",
        desc: "Compare AI vendors across 15 dimensions.",
        guidance: "Evaluate AI vendors across technical, commercial, and strategic dimensions. Weight criteria by your organizational priorities. Never rely solely on demos — require proof-of-concept on your own data.",
        checklist: [
          "Define must-have vs. nice-to-have requirements",
          "Request security and compliance documentation (SOC2, ISO 27001)",
          "Evaluate data privacy and model training practices",
          "Assess API quality, documentation, and SLAs",
          "Compare pricing models and cost at scale",
          "Check reference customers in your industry",
          "Evaluate vendor financial stability and roadmap",
          "Test performance on sample of your actual data",
          "Assess integration complexity with existing systems",
          "Review support model (enterprise vs. self-serve)",
          "Evaluate explainability and bias mitigation features",
          "Check model update/versioning policies",
          "Assess vendor lock-in risks and exit clauses",
          "Evaluate geographic data residency options",
          "Score and rank vendors; select top 2 for POC",
        ],
      },
      {
        title: "AI Ethics Checklist",
        items: 9,
        level: "practitioner",
        desc: "Ensure fairness, transparency, and accountability.",
        guidance: "Ethics review is not a compliance checkbox — it's risk management. Engage affected stakeholders early. For high-stakes decisions (hiring, lending, healthcare), require bias testing across protected attributes before any user-facing deployment.",
        checklist: [
          "Identify all groups affected by the AI system",
          "Test for bias across protected characteristics",
          "Define human oversight and override mechanisms",
          "Document model decision factors for explainability",
          "Review training data for representation and bias",
          "Establish user consent and data transparency practices",
          "Create feedback mechanism for impacted users",
          "Define accountability chain for AI decisions",
          "Schedule periodic ethics reviews post-deployment",
        ],
      },
    ],
  },
  {
    phase: "scale",
    label: "Phase 3: Scale",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50",
    description: "Expand from pilot to production with governance and change management.",
    playbooks: [
      {
        title: "MLOps Maturity Roadmap",
        items: 18,
        level: "practitioner",
        desc: "From manual deployments to automated ML pipelines.",
        guidance: "MLOps maturity progresses through four levels: Level 0 (manual), Level 1 (ML pipeline automation), Level 2 (CI/CD for ML), Level 3 (full automation with monitoring). Most organizations should target Level 1-2 as their first goal.",
        checklist: [
          "Audit current model deployment process (manual vs. automated)",
          "Establish model registry and versioning",
          "Implement feature store for consistent training/serving features",
          "Create automated training pipelines",
          "Set up CI/CD for model deployment",
          "Implement A/B testing infrastructure",
          "Deploy model performance monitoring (data drift, concept drift)",
          "Establish data quality monitoring and alerting",
          "Create automated model retraining triggers",
          "Set up model serving infrastructure with SLAs",
          "Implement shadow mode deployment capability",
          "Document model cards for all production models",
          "Create rollback procedures and runbooks",
          "Establish on-call rotation for model incidents",
          "Implement cost monitoring for model serving",
          "Create model audit trails for compliance",
          "Set up automated bias monitoring",
          "Document MLOps runbooks and playbooks",
        ],
      },
      {
        title: "Change Management Playbook",
        items: 12,
        level: "manager",
        desc: "Drive adoption with training and communication plans.",
        guidance: "AI deployments fail more often due to people and process issues than technical issues. Invest proportionally in change management. Use the ADKAR model (Awareness, Desire, Knowledge, Ability, Reinforcement) as your framework.",
        checklist: [
          "Conduct stakeholder impact analysis for AI change",
          "Create AI adoption communication plan",
          "Develop role-specific AI training curriculum",
          "Launch AI champion network in each department",
          "Create feedback channels for frontline users",
          "Develop FAQ and myth-busting resources",
          "Run pre-launch readiness assessment",
          "Create incentive structure for AI adoption",
          "Measure and report adoption metrics weekly",
          "Develop escalation path for user concerns",
          "Create success story repository for internal sharing",
          "Run 30/60/90 day adoption review process",
        ],
      },
      {
        title: "AI ROI Measurement Framework",
        items: 7,
        level: "executive",
        desc: "Track and report business value of AI investments.",
        guidance: "Establish your ROI baseline before deployment — you can't measure what you didn't measure before. Mix hard metrics (revenue, cost, time) with soft metrics (quality, satisfaction). Track total cost of ownership not just build cost.",
        checklist: [
          "Define ROI baseline metrics before deployment",
          "Identify direct cost savings and efficiency gains",
          "Quantify revenue impact and new value creation",
          "Track total cost of ownership (build + run + maintain)",
          "Create executive AI value dashboard",
          "Define ROI reporting cadence to leadership",
          "Establish comparison methodology (A/B or before/after)",
        ],
      },
    ],
  },
  {
    phase: "govern",
    label: "Phase 4: Govern",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50",
    description: "Establish ongoing oversight, compliance, and continuous improvement.",
    playbooks: [
      {
        title: "AI Governance Framework",
        items: 20,
        level: "executive",
        desc: "Policies, accountability structures, and review processes.",
        guidance: "An AI governance framework defines who can build and deploy AI, what standards they must meet, how AI systems are reviewed and audited, and how incidents are handled. Start with lightweight governance and add rigor where risk is highest.",
        checklist: [
          "Define AI governance principles and values statement",
          "Establish AI governance committee with clear mandate",
          "Create AI risk taxonomy for your organization",
          "Define AI use case approval process",
          "Establish model risk management policy",
          "Create AI acceptable use policy",
          "Define roles: AI owner, model owner, data steward",
          "Create AI inventory and registry requirement",
          "Establish third-party AI vendor governance process",
          "Define AI incident classification and response SLAs",
          "Create AI audit schedule and methodology",
          "Establish employee AI training requirements",
          "Define cross-functional AI review board process",
          "Create AI regulatory compliance checklist",
          "Establish AI budget approval thresholds",
          "Define intellectual property policy for AI outputs",
          "Create AI communication guidelines (internal/external)",
          "Establish AI sunset and decommission process",
          "Define metrics for AI governance effectiveness",
          "Schedule annual governance framework review",
        ],
      },
      {
        title: "Model Risk Management Policy",
        items: 14,
        level: "practitioner",
        desc: "Monitor, audit, and manage deployed AI systems.",
        guidance: "Model risk management is especially critical in regulated industries (finance, healthcare). Apply SR 11-7 principles as a baseline even outside banking. Key activities: model validation before deployment, ongoing performance monitoring, regular model audits.",
        checklist: [
          "Classify all models by risk tier (high/medium/low)",
          "Define validation requirements by risk tier",
          "Establish pre-deployment validation checklist",
          "Create model performance baselines and SLAs",
          "Implement automated monitoring for model drift",
          "Define model performance degradation thresholds",
          "Create model audit schedule and methodology",
          "Document model limitations and known failure modes",
          "Establish model remediation process",
          "Create model retirement criteria and process",
          "Define override and human-in-the-loop requirements",
          "Establish model performance reporting to governance",
          "Create model risk register and tracking",
          "Define escalation path for model risk issues",
        ],
      },
      {
        title: "AI Incident Response Playbook",
        items: 8,
        level: "manager",
        desc: "Handle AI failures, bias incidents, and compliance breaches.",
        guidance: "AI incidents range from model performance degradation (often silent and gradual) to bias incidents to regulatory breaches to adversarial attacks. Your response plan needs to account for the unique nature of AI failures — they may be subtle, widespread, and hard to diagnose.",
        checklist: [
          "Define AI incident classification criteria and severity levels",
          "Create AI incident detection and reporting channels",
          "Establish incident response team roles and contacts",
          "Define containment procedures (disable, rollback, throttle)",
          "Create communication templates for different incident types",
          "Establish regulatory notification procedures and timelines",
          "Define root cause analysis methodology for AI incidents",
          "Create post-incident review and lessons-learned process",
        ],
      },
    ],
  },
];

export function ConsultingToolkitClient() {
  const [activePlaybook, setActivePlaybook] = useState<Playbook | null>(null);

  return (
    <>
      {activePlaybook && (
        <PlaybookModal playbook={activePlaybook} onClose={() => setActivePlaybook(null)} />
      )}

      {/* Phase overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
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
      <div className="space-y-12">
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
                <Card
                  key={pb.title}
                  className="group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  onClick={() => setActivePlaybook(pb)}
                >
                  <CardHeader className="pb-3">
                    <Badge variant={levelColor[pb.level] ?? "blue"} className="w-fit mb-2">{pb.level}</Badge>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">{pb.title}</CardTitle>
                    <CardDescription>{pb.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <CheckSquare className="w-4 h-4 text-primary" />
                      {pb.items} checklist items
                    </div>
                    <span className="text-xs text-primary font-medium group-hover:underline">Open playbook →</span>
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

