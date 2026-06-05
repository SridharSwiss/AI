import type { Phase } from "./playbooks-types";

export const phase4: Phase = {
  phase: "govern",
  label: "Phase 4: Govern",
  color: "from-rose-500 to-pink-500",
  bg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50",
  description: "Establish ongoing oversight, compliance, and continuous improvement.",
  playbooks: [
    {
      title: "AI Governance Framework",
      level: "executive",
      desc: "Policies, accountability structures, and review processes.",
      guidance: "Start with lightweight governance and add rigor where risk is highest. An AI governance framework defines who can build and deploy AI, what standards they must meet, how AI systems are reviewed, and how incidents are handled.",
      checklist: [
        {
          item: "Define AI governance principles and values statement",
          templateTitle: "AI Principles & Values Statement Template",
          templateType: "template",
          instructions: "Draft 5–7 principles that will guide all AI decisions. They must be specific enough to resolve real tradeoffs — not so vague that everything qualifies. Review with ethics lead, legal, and senior leadership before publishing.",
          sections: [
            {
              heading: "AI Principles Template",
              items: [
                "1. HUMAN-CENTRED: AI augments human decision-making; it never removes human accountability for significant decisions affecting people.",
                "2. TRANSPARENT: We explain how our AI systems work to those they affect, in plain language. We do not deploy black-box AI in high-stakes domains.",
                "3. FAIR: We test AI systems for bias before deployment and monitor continuously. We refuse to deploy AI that creates unfair disparate outcomes.",
                "4. SAFE: We apply a risk-proportionate approach — the higher the stakes, the more rigorous our review. We deploy AI where benefits clearly outweigh risks.",
                "5. PRIVATE: We process only the personal data necessary for the AI's purpose. We never use data in ways people would not reasonably expect.",
                "6. ACCOUNTABLE: Every AI system has a named owner. Our AI governance committee provides independent oversight. We publish summary information about our material AI systems.",
                "7. CONTINUOUSLY IMPROVED: We treat AI governance as an ongoing practice. We learn from incidents, share lessons, and raise our standards as the field advances.",
              ],
            },
            {
              heading: "Principles Adoption Process",
              items: [
                "Draft principles reviewed by: Legal ☐ | Ethics/Risk ☐ | Employee representatives ☐ | Senior leadership ☐",
                "Principles approved by: AI Steering Committee on ___ | Board sign-off: ___",
                "Published internally: ☐ Intranet  ☐ Company handbook  ☐ All-staff email",
                "Published externally: ☐ Company website  ☐ Annual report  ☐ Not yet",
                "Annual review date: ___ | Owner of principles review: ___",
              ],
            },
          ],
        },
        {
          item: "Establish AI governance committee with clear mandate",
          templateTitle: "AI Governance Committee Charter",
          templateType: "template",
          instructions: "The governance committee must have real authority — not be a rubber stamp. Define veto powers, escalation rights, and decision-making authority in the charter.",
          sections: [
            {
              heading: "Committee Mandate",
              items: [
                "Purpose: Provide strategic oversight and risk governance for all AI initiatives at [Organisation].",
                "Authority: Veto power over high-risk AI deployments | Approve AI policy | Set AI risk thresholds | Mandate audits",
                "Reporting line: Reports to: ☐ Board  ☐ CEO  ☐ ExCo  — quarterly written report required",
                "Annual deliverables: AI risk assessment, AI governance report, AI policy review, external audit commissioning (if required)",
              ],
            },
            {
              heading: "Membership",
              items: [
                "Chair: ___________________ (must be C-suite or board level for credibility)",
                "Standing members: CTO, CISO, Chief Data Officer, Legal/Compliance, CHRO, 2 × Business Unit heads",
                "Independent member(s): External AI advisor / ethicist (strongly recommended for high-risk AI)",
                "Observer roles: DPO (non-voting), Regulator liaison (where applicable)",
                "Quorum: Chair + minimum ___ standing members | Decision: Simple majority, Chair has casting vote",
                "Meeting frequency: Monthly 45 min + Quarterly 2-hour deep dive + Ad-hoc for incidents/approvals",
              ],
            },
          ],
        },
        {
          item: "Create AI risk taxonomy for your organization",
          templateTitle: "AI Risk Taxonomy Template",
          templateType: "framework",
          instructions: "Create a shared language for AI risk across your organisation. Consistent categorisation enables consistent treatment. Adapt this taxonomy to your sector and regulatory context.",
          sections: [
            {
              heading: "Risk Categories",
              items: [
                "CATEGORY 1 — MODEL RISK: Performance degradation, training data bias, overfitting, concept drift, adversarial attacks",
                "CATEGORY 2 — DATA RISK: Data quality failures, privacy breaches, data poisoning, training-serving skew, retention violations",
                "CATEGORY 3 — OPERATIONAL RISK: Model downtime, serving failures, integration failures, vendor failure, on-call gaps",
                "CATEGORY 4 — COMPLIANCE RISK: Regulatory breach (EU AI Act, GDPR), audit findings, inadequate documentation, unexplainable decisions",
                "CATEGORY 5 — ETHICAL RISK: Unfair outcomes, discrimination, manipulation, erosion of human oversight, opacity",
                "CATEGORY 6 — STRATEGIC RISK: Vendor lock-in, reputational damage from AI incident, competitor AI advantage, talent risk",
              ],
            },
            {
              heading: "Risk Rating Matrix",
              items: [
                "Rate each risk: Likelihood (1–5) × Impact (1–5) = Risk Score (1–25)",
                "CRITICAL (20–25): Immediate action required, escalate to CEO/Board",
                "HIGH (15–19): Steering committee decision required, mitigation plan within 2 weeks",
                "MEDIUM (10–14): Management attention, mitigation plan within 30 days",
                "LOW (1–9): Monitor, review quarterly",
                "Risk register review frequency: Monthly (all CRITICAL/HIGH) | Quarterly (all risks)",
              ],
            },
          ],
        },
        {
          item: "Define AI use case approval process",
          templateTitle: "AI Use Case Approval Workflow",
          templateType: "framework",
          instructions: "Proportionate approval — low-risk use cases don't need board-level approval. High-risk use cases do. Define the thresholds clearly so teams know when to escalate.",
          sections: [
            {
              heading: "Approval Tiers by Risk Level",
              items: [
                "TIER 1 — LOW RISK (internal process automation, internal tools): Self-approval by department head + AI lead review | Timeline: 5 business days",
                "TIER 2 — MEDIUM RISK (customer-facing, uses personal data, consequential decisions): AI Steering Committee review | Full ethics checklist required | Timeline: 15 business days",
                "TIER 3 — HIGH RISK (EU AI Act Annex III, safety-critical, affects employment/credit/health): External review + Steering Committee vote | DPIA required | Timeline: 30 business days",
                "PROHIBITED: Real-time biometric surveillance in public, social scoring, AI exploiting vulnerabilities | No approval process — prohibited per policy",
              ],
            },
            {
              heading: "Approval Submission Checklist",
              items: [
                "Use case description and business justification: ☐",
                "Risk tier self-assessment completed: ☐",
                "Data privacy assessment / DPIA (if required): ☐",
                "Ethics checklist completed: ☐",
                "Bias testing plan: ☐",
                "Human oversight mechanism defined: ☐",
                "Rollback plan: ☐",
                "Success metrics and monitoring plan: ☐",
                "Submission form: ___________________ | Approver email: ___________________ | SLA: ___",
              ],
            },
          ],
        },
        {
          item: "Establish model risk management policy",
          templateTitle: "Model Risk Management Policy Template",
          templateType: "template",
          instructions: "Adapt SR 11-7 (Federal Reserve model risk management guidance) for your context. Even non-regulated industries benefit from this framework. The key is validation before deployment and ongoing monitoring after.",
          sections: [
            {
              heading: "Policy Scope & Definitions",
              items: [
                "Covered models: All models that produce outputs used in business decisions, including third-party AI models accessed via API",
                "Model risk definition: Potential for adverse consequences from decisions based on incorrect or misused model outputs",
                "Model tiers: HIGH (decisions affecting individuals, regulatory compliance, financial material) | MEDIUM | LOW (internal, non-consequential)",
                "Policy owner: ___________________ | Review cycle: Annual | Board approval required: ☐ Yes  ☐ No",
              ],
            },
            {
              heading: "Validation Requirements by Tier",
              items: [
                "HIGH TIER: Independent validation by team not involved in development | External validation if risk score >20 | Full model card required | Steering Committee sign-off",
                "MEDIUM TIER: Peer review by another ML engineer | Standard model card | AI Lead sign-off",
                "LOW TIER: Self-review with checklist | Abbreviated model card | Department head sign-off",
                "ALL TIERS: Performance monitoring post-deployment | Annual model review | Incident reporting",
              ],
            },
          ],
        },
        {
          item: "Create AI acceptable use policy",
          templateTitle: "AI Acceptable Use Policy Template",
          templateType: "template",
          instructions: "Publish this policy to all employees before deploying any AI tools. Update whenever a new AI tool or significant capability is introduced. Keep it readable — legal language that nobody reads protects nobody.",
          sections: [
            {
              heading: "Permitted Uses",
              items: [
                "☐ Using approved AI tools for business tasks (list approved tools: ___________________________)",
                "☐ Generating first drafts of content that a human reviews and takes responsibility for",
                "☐ Analysing data to surface insights that a human validates",
                "☐ Automating repetitive tasks within approved processes",
                "☐ Using AI coding assistants for software development (with human code review)",
              ],
            },
            {
              heading: "Prohibited Uses",
              items: [
                "☒ Inputting unpublished financial results, M&A information, or material non-public information into any AI system",
                "☒ Inputting customer PII or employee personal data into non-approved AI tools",
                "☒ Presenting AI-generated content as entirely your own work without disclosure (where context requires disclosure)",
                "☒ Using AI to make final employment, termination, lending, or legal decisions without human review",
                "☒ Using AI tools not on the approved list without prior IT security and legal review",
                "☒ Attempting to circumvent AI safety controls or prompt injection attacks",
              ],
            },
            {
              heading: "Policy Administration",
              items: [
                "Employees must confirm reading this policy: ☐ Annual digital sign-off  ☐ Training completion",
                "Breach reporting: Report suspected policy breaches to: ___________________________",
                "Consequences of breach: Managed under standard disciplinary policy | Serious breaches may result in dismissal",
                "Policy owner: ___ | Review date: ___",
              ],
            },
          ],
        },
        {
          item: "Define roles: AI owner, model owner, data steward",
          templateTitle: "AI Role Definitions & Accountability Framework",
          templateType: "framework",
          instructions: "Clear role definitions prevent accountability gaps. Every AI system in production must have a named individual for each of these roles. 'The team' is not accountable — a named person is.",
          sections: [
            {
              heading: "Role Definitions",
              items: [
                "AI PROGRAMME OWNER (C-suite): Accountable for AI strategy, investment, and governance. Signs off on AI principles, governance framework, and high-risk use cases.",
                "USE CASE OWNER (Business leader): Accountable for the business outcomes of a specific AI use case. Owns the success metrics, user adoption, and escalation decisions.",
                "MODEL OWNER (ML Lead): Accountable for model performance, monitoring, retraining, and model card accuracy. On-call for model incidents.",
                "DATA STEWARD (Data/IT): Accountable for data quality, access controls, privacy compliance of training data. Approves data access requests.",
                "AI ETHICS LEAD (Risk/Compliance): Accountable for ethics reviews, bias testing oversight, fairness monitoring, and regulatory compliance.",
              ],
            },
            {
              heading: "Role Assignment Register",
              items: [
                "AI System: ___________________ | Use Case Owner: ___ | Model Owner: ___ | Data Steward: ___ | Ethics Lead: ___",
                "AI System: ___________________ | Use Case Owner: ___ | Model Owner: ___ | Data Steward: ___ | Ethics Lead: ___",
                "AI System: ___________________ | Use Case Owner: ___ | Model Owner: ___ | Data Steward: ___ | Ethics Lead: ___",
                "Register location: ___________________ | Owner: ___ | Review: quarterly",
              ],
            },
          ],
        },
        {
          item: "Create AI inventory and registry requirement",
          templateTitle: "AI System Inventory Template",
          templateType: "template",
          instructions: "You can't govern what you don't know about. Every production AI system must be registered. This is also a requirement under EU AI Act Article 49 for high-risk AI systems.",
          sections: [
            {
              heading: "AI Inventory Fields (one row per system)",
              items: [
                "System name | Version | Risk tier (High/Med/Low) | Status (Pilot/Production/Retired)",
                "Use case description | Business function | Users affected | Deployment date",
                "Use Case Owner | Model Owner | Data Steward | Last review date",
                "EU AI Act category (if applicable) | Regulatory notifications made | Audit trail location",
                "Vendor / build (in-house) | Third-party sub-processors | Contract renewal date",
              ],
            },
            {
              heading: "Inventory Maintenance",
              items: [
                "New system registration: Any new AI system must be registered within ___ days of go-live decision",
                "Quarterly review: All owners confirm system status, review date, and any material changes",
                "Annual audit: Full inventory audit against production systems to catch unregistered 'shadow AI'",
                "Inventory location: ___________________ | Owner: ___________________ | Access: ___",
              ],
            },
          ],
        },
        {
          item: "Establish third-party AI vendor governance process",
          templateTitle: "Third-Party AI Vendor Governance Framework",
          templateType: "framework",
          instructions: "Your AI governance obligations extend to your AI vendors. You cannot outsource accountability. Third-party AI risks are your risks — especially under GDPR and EU AI Act.",
          sections: [
            {
              heading: "Vendor Onboarding Requirements",
              items: [
                "Security assessment: SOC 2 Type II review, pen test review | Required before any contract",
                "Data processing agreement (DPA): Signed before any personal data shared | GDPR-compliant | DPO review required",
                "AI-specific due diligence: Model training data practices, bias testing, explainability capabilities, model update policy",
                "Contract requirements: Data deletion on termination, SLA with credits, price cap, exit assistance, audit rights",
                "Tier classification: CRITICAL (business-critical, high data sensitivity) | IMPORTANT | STANDARD",
              ],
            },
            {
              heading: "Ongoing Vendor Monitoring",
              items: [
                "CRITICAL vendors: Quarterly review of security posture, quarterly business review with CSM",
                "IMPORTANT vendors: Annual security review, annual business review",
                "All vendors: Annual DPA review, sub-processor change notifications tracked, incident notifications monitored",
                "Vendor risk register: Updated quarterly | Owner: Procurement + Legal | Review: AI Steering Committee",
                "Vendor exit plan: Maintained for all CRITICAL vendors | Tested annually",
              ],
            },
          ],
        },
        {
          item: "Define AI incident classification and response SLAs",
          templateTitle: "AI Incident Classification Guide",
          templateType: "template",
          instructions: "AI incidents are different from IT incidents — they can be subtle, widespread, and hard to diagnose. Define classification criteria clearly so the first responder can act without waiting for expert diagnosis.",
          sections: [
            {
              heading: "Incident Severity Classification",
              items: [
                "SEV-1 CRITICAL: AI system causing incorrect decisions at scale, data breach via AI, AI system fully down | Response: 15 min | Notify: CTO + CISO + CEO immediately",
                "SEV-2 HIGH: Significant bias/discrimination detected, major performance degradation (>20% accuracy drop), AI vendor incident with data exposure | Response: 1 hr | Notify: CTO + AI Lead",
                "SEV-3 MEDIUM: Model drift above threshold, elevated error rate, individual user complaint about AI fairness | Response: 4 hrs | Notify: AI Lead + Model Owner",
                "SEV-4 LOW: Minor performance degradation, monitoring alert requiring investigation, feature request related to safety | Response: Next business day | Notify: Model Owner",
              ],
            },
            {
              heading: "Regulatory Notification Requirements",
              items: [
                "GDPR Article 33: Data breach via AI system → notify DPA within 72 hours (mandatory)",
                "EU AI Act: Serious incidents involving high-risk AI → notify market surveillance authority | Timeline: check sector-specific guidance",
                "Financial sector (FCA/SEC): Material AI model failures → check firm-specific regulatory obligations",
                "Notification owner: DPO + Legal | Template: stored at ___________________ | Drill frequency: annual",
              ],
            },
          ],
        },
        {
          item: "Create AI audit schedule and methodology",
          templateTitle: "AI Audit Programme Template",
          templateType: "template",
          instructions: "Scheduled AI audits catch problems before regulators or incidents do. For high-risk AI, external independent audits provide credibility that internal audits cannot.",
          sections: [
            {
              heading: "Audit Cadence by System Tier",
              items: [
                "HIGH-RISK AI: Full audit annually | Continuous monitoring | External audit every 2 years | Board report required",
                "MEDIUM-RISK AI: Audit every 18 months | Quarterly metric review | Internal audit team",
                "LOW-RISK AI: Audit every 3 years | Annual metric review | Model owner self-assessment",
                "All tiers: Audit trigger if incident occurs, significant model change, or material regulatory change",
              ],
            },
            {
              heading: "AI Audit Scope & Methodology",
              items: [
                "GOVERNANCE: Does the system have a registered owner, model card, and audit trail? Are policies being followed?",
                "PERFORMANCE: Is the model performing within defined thresholds? Are metrics being measured correctly?",
                "FAIRNESS: Have bias tests been run? Are production bias metrics within thresholds? Are protected groups treated equitably?",
                "COMPLIANCE: Does the system meet all applicable regulatory requirements? Is documentation audit-ready?",
                "SECURITY: Are access controls appropriate? Is data handling compliant? Are vendor DPAs current?",
                "Audit report template: Executive summary | Findings (Critical/High/Medium/Low) | Management responses | Remediation timeline",
              ],
            },
          ],
        },
        {
          item: "Establish employee AI training requirements",
          templateTitle: "AI Training Compliance Requirements",
          templateType: "template",
          instructions: "Define mandatory training requirements by role. Training completion should be tracked and tied to system access for high-risk AI. EU AI Act Article 4 requires AI literacy for all staff deploying AI.",
          sections: [
            {
              heading: "Mandatory Training by Role",
              items: [
                "ALL EMPLOYEES (annual, 1 hr): AI literacy basics, acceptable use policy, how to report AI concerns",
                "AI USERS (on deployment + annual refresh, 3 hrs): Tool-specific training, safe use, feedback mechanisms, override procedures",
                "AI MANAGERS (on appointment, 8 hrs): AI governance, bias awareness, change management, ROI measurement",
                "AI BUILDERS (on team join + annual, 24 hrs): Responsible AI engineering, bias testing, model cards, MLOps standards",
                "AI GOVERNANCE (on appointment, 16 hrs): AI law and regulation, ethics frameworks, audit methodology, incident response",
              ],
            },
            {
              heading: "Training Compliance Tracking",
              items: [
                "Completion tracking system: ☐ LMS  ☐ HR system  ☐ Spreadsheet (not recommended)",
                "Minimum completion rate target: ___% annually (recommended: 100% for mandatory content)",
                "Consequence of non-completion: ☐ Restricted system access  ☐ Escalation to manager  ☐ Recorded in HR file",
                "Training effectiveness measure: Pre/post knowledge test score improvement target: ≥___% | Application survey 4 weeks post-training",
                "Training records retained for: ___ years (for regulatory evidence)",
              ],
            },
          ],
        },
        {
          item: "Define cross-functional AI review board process",
          templateTitle: "AI Review Board Process Design",
          templateType: "template",
          instructions: "The AI review board is distinct from the governance committee — it is an operational body that reviews specific AI systems or decisions, not strategy. It should include technical, ethical, legal, and business perspectives.",
          sections: [
            {
              heading: "Review Board Composition",
              items: [
                "AI Technical Lead: Reviews model performance, monitoring, and technical risk",
                "Legal / Compliance: Reviews regulatory requirements, contractual obligations",
                "Ethics / Risk: Reviews fairness, transparency, societal impact",
                "Business Owner: Reviews business value, user impact, operational readiness",
                "DPO (when personal data involved): Reviews data privacy compliance",
                "External advisor (for high-risk AI): Independent perspective, regulatory expertise",
              ],
            },
            {
              heading: "Review Process",
              items: [
                "WHAT GOES TO REVIEW: All Tier 2 and Tier 3 use cases | All model updates classified as major | All post-incident re-deployments",
                "SUBMISSION: Standard review package: business case, model card, ethics checklist, bias test results, monitoring plan",
                "REVIEW MEETING: 60-min structured review | Each board member reviews independently first | Structured discussion | Decision: Approve / Approve with conditions / Reject",
                "DECISION RECORD: Written record of decision, reasoning, and conditions | Signed by board chair | Filed with AI inventory",
                "APPEALS: Use case owner can appeal rejection to AI Steering Committee within ___ days",
              ],
            },
          ],
        },
        {
          item: "Create AI regulatory compliance checklist",
          templateTitle: "AI Regulatory Compliance Self-Assessment",
          templateType: "questionnaire",
          instructions: "Complete annually and when regulations change. For each applicable regulation, assess current compliance level and identify gaps. This is your legal risk radar.",
          sections: [
            {
              heading: "EU AI Act (if operating in EU/EEA)",
              items: [
                "Prohibited AI practices banned from deployment: ☐ Confirmed",
                "High-risk AI systems identified and registered in EU database: ☐ Yes  ☐ No  ☐ Not applicable",
                "Conformity assessments completed for high-risk systems: ☐ Yes  ☐ In progress  ☐ Not yet",
                "Technical documentation and audit logs maintained: ☐ Yes  ☐ Partial  ☐ No",
                "AI literacy training in place (Art. 4): ☐ Yes  ☐ Partial  ☐ No",
                "Post-market monitoring system operational: ☐ Yes  ☐ No",
              ],
            },
            {
              heading: "GDPR / UK GDPR (if processing EU/UK personal data)",
              items: [
                "Automated decision-making subject to Art. 22 safeguards: ☐ Yes  ☐ No  ☐ Not applicable",
                "DPIAs completed for high-risk AI processing: ☐ Yes  ☐ Partial  ☐ No",
                "Data subject rights implemented (explanation, human review, objection): ☐ Yes  ☐ Partial  ☐ No",
                "AI vendor DPAs current and reviewed annually: ☐ Yes  ☐ No",
                "Privacy notice includes AI processing disclosures: ☐ Yes  ☐ No",
              ],
            },
            {
              heading: "Sector-Specific Obligations",
              items: [
                "SR 11-7 / model risk management (banking): Compliance level: ___% | Gaps: ___",
                "FDA AI/ML SaMD guidance (healthcare): Compliance level: ___% | Gaps: ___",
                "FCA AI principles (UK financial services): Compliance level: ___% | Gaps: ___",
                "Other applicable sector rules: ___________________ | Compliance level: ___% | Gaps: ___",
                "Overall compliance gap risk: ☐ High  ☐ Medium  ☐ Low | External legal review needed: ☐ Yes  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Establish AI budget approval thresholds",
          templateTitle: "AI Investment Approval Authority Matrix",
          templateType: "matrix",
          instructions: "Define who can approve AI spending without escalation. Clarity here prevents both under-investment (everyone waits for approval) and over-spending (no one checks).",
          sections: [
            {
              heading: "Approval Authority by Amount",
              items: [
                "Up to £/$ ___ : AI Lead approval (operational tool subscriptions, minor experiments)",
                "£/$ ___ to £/$ ___: CTO approval (substantial tooling, pilot projects, small vendor contracts)",
                "£/$ ___ to £/$ ___: CFO + CTO joint approval (major AI investments, annual vendor contracts)",
                "Above £/$ ___: Board approval required (strategic AI programmes, major vendor relationships)",
                "All AI investments >£/$ ___ require AI Steering Committee awareness (not approval — awareness)",
              ],
            },
            {
              heading: "Budget Categories",
              items: [
                "AI TOOLS & LICENCES: Standard procurement process with AI Lead technical sign-off | Acceptable use policy must be confirmed",
                "AI DEVELOPMENT PROJECTS: Business case required >£/$ ___ | ROI projection required >£/$ ___",
                "AI VENDOR CONTRACTS: Legal review required | DPA review required | Minimum 12-month commitment needs CFO sign-off",
                "AI RESEARCH / EXPERIMENTS: Annual discretionary budget: £/$ ___ | Managed by AI Lead | Monthly reporting to CTO",
              ],
            },
          ],
        },
        {
          item: "Define intellectual property policy for AI outputs",
          templateTitle: "AI Intellectual Property Policy Template",
          templateType: "template",
          instructions: "AI IP law is rapidly evolving. This policy provides a practical framework given current legal uncertainty. Review with external legal counsel at least annually.",
          sections: [
            {
              heading: "IP Ownership Positions",
              items: [
                "AI-ASSISTED HUMAN WORK: Where a human significantly directs, edits, and takes responsibility for AI-generated content → company IP applies as normal",
                "PURE AI OUTPUT (minimal human input): Legal status uncertain in most jurisdictions → treat as unprotected; focus on trade secret protection of prompts and workflows",
                "VENDOR-GENERATED AI CONTENT: Review vendor's IP ownership clause in contract — many AI APIs grant you licence to outputs, not ownership",
                "FINE-TUNED MODEL WEIGHTS: Your IP if fine-tuned on your proprietary data with your compute → confirm in vendor contract",
                "CODE GENERATED BY AI COPILOT: Company owns as work-for-hire; developer responsible for ensuring no copyright-encumbered code is introduced",
              ],
            },
            {
              heading: "Practical Guidelines",
              items: [
                "Employees must disclose use of AI in creating materials where disclosure is required by client contracts or professional standards",
                "Do not enter proprietary business information into AI tools that may use inputs for training — check each vendor's policy",
                "AI-generated code must undergo standard code review with specific attention to licence encumbrance",
                "Patent applications: Disclose AI involvement to patent attorney — laws vary by jurisdiction on AI inventor status",
                "Policy review: Annual | Owner: Legal | Last reviewed: ___ | Next review: ___",
              ],
            },
          ],
        },
        {
          item: "Create AI communication guidelines (internal/external)",
          templateTitle: "AI Communication Guidelines Template",
          templateType: "template",
          instructions: "Define what can and cannot be said about your AI publicly and internally. Inconsistent messaging creates legal, regulatory, and reputational risk.",
          sections: [
            {
              heading: "Internal Communication Guidelines",
              items: [
                "What to communicate proactively: AI strategy, launch announcements, policy changes, training opportunities, success stories",
                "Who can communicate about AI internally: AI Lead for technical comms | HR for people impact | CEO/CTO for strategy",
                "What requires legal/compliance review before internal comms: Any communication about AI and jobs | Regulatory compliance claims | Incident communications",
              ],
            },
            {
              heading: "External Communication Guidelines",
              items: [
                "Marketing claims about AI: Must be technically accurate | No absolute claims (e.g. '100% accurate') | Legal sign-off required for all AI capability claims",
                "Press/media inquiries about AI: Route to PR + Legal | No individual spokespeople except approved | Approved Q&A list maintained by PR",
                "Social media: Employee personal social media — may discuss publicly available AI information; must not disclose unreleased AI plans or confidential data",
                "Regulatory disclosures: All mandatory disclosures to regulators reviewed by Legal + DPO before submission",
                "Customer disclosure of AI use: Required when AI makes automated decisions affecting them (GDPR Art. 13/22) | Template: ___",
              ],
            },
          ],
        },
        {
          item: "Establish AI sunset and decommission process",
          templateTitle: "AI System Decommission Checklist",
          templateType: "template",
          instructions: "Retiring AI systems safely is as important as deploying them. Ungoverned decommissions leave data risks, stranded contracts, and confused users.",
          sections: [
            {
              heading: "Decommission Decision Criteria",
              items: [
                "Trigger: ☐ Business need ceased  ☐ Better replacement available  ☐ Performance below minimum threshold  ☐ Regulatory non-compliance  ☐ Vendor contract end  ☐ Cost no longer justified",
                "Decision authority: Tier 1 (low-risk): Use Case Owner | Tier 2: AI Lead | Tier 3: AI Steering Committee",
                "Minimum notice to users: ___ weeks | Communication required: ☐ Yes — template: ___  ☐ No",
                "Transition plan required (if users need to move to alternative): ___________________________",
              ],
            },
            {
              heading: "Decommission Steps",
              items: [
                "Step 1: Decision documented and approved per authority matrix",
                "Step 2: Communication sent to affected users ___ weeks before shutdown",
                "Step 3: Training data deleted per data retention policy — certificate of deletion obtained",
                "Step 4: Model artefacts archived (if needed for audit) or deleted — documented in model registry",
                "Step 5: System access removed from all users and service accounts",
                "Step 6: Vendor contract terminated / not renewed — confirm data deletion from vendor",
                "Step 7: AI inventory updated to 'Retired' status | Audit trail archived for ___ years",
                "Step 8: Lessons learned documented for future AI procurement decisions",
              ],
            },
          ],
        },
        {
          item: "Define metrics for AI governance effectiveness",
          templateTitle: "AI Governance Effectiveness Scorecard",
          templateType: "scorecard",
          instructions: "Measure your governance programme — not just your AI systems. Weak governance metrics indicate where the governance framework itself needs strengthening.",
          sections: [
            {
              heading: "Governance Metrics",
              items: [
                "AI inventory coverage: % of production AI systems registered | Target: 100%  | Current: ___%",
                "Policy compliance: % of new AI use cases going through approval process | Target: 100% | Current: ___%",
                "Training completion: % of employees completing mandatory AI training annually | Target: 95% | Current: ___%",
                "Incident response: % of incidents responded to within defined SLA | Target: 100% | Current: ___%",
                "Bias monitoring: % of production AI systems with active bias monitoring | Target: 100% of Tier 2+ | Current: ___%",
                "Audit completion: % of scheduled audits completed on time | Target: 100% | Current: ___%",
              ],
            },
            {
              heading: "Governance Health Indicators",
              items: [
                "Number of 'shadow AI' systems discovered outside governance process this year: ___ (target: 0)",
                "Number of regulatory inquiries / enforcement actions: ___ (target: 0)",
                "Governance committee meeting attendance rate: ___% (target: >80% quorum at all meetings)",
                "Time from incident report to containment: ___ hours average (target: within SEV-1 SLA 100% of time)",
                "Overall governance effectiveness score: ___ / 100 | Presented to board: ☐ Yes  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Schedule annual governance framework review",
          templateTitle: "Annual AI Governance Review Agenda",
          templateType: "template",
          instructions: "AI law, technology, and best practices evolve rapidly. An annual governance review ensures your framework stays current. Book this as a standing board/ExCo agenda item.",
          sections: [
            {
              heading: "Annual Review Agenda (Half-day session)",
              items: [
                "09:00–09:30 — Year in review: AI portfolio performance, incidents, governance metrics vs targets",
                "09:30–10:30 — Regulatory landscape update: New laws/guidance, enforcement trends, peer organisation benchmarking",
                "10:30–11:30 — Framework gap assessment: What worked, what didn't, stakeholder feedback from employees/users",
                "11:30–12:30 — Update decisions: Policy revisions needed, new governance requirements, training updates",
                "12:30–13:00 — Year ahead: Planned AI initiatives, emerging risks, resource and capability needs",
              ],
            },
            {
              heading: "Review Output Requirements",
              items: [
                "Updated AI principles (if changed): Board approval required",
                "Revised policies: Legal review + Steering Committee approval",
                "Updated training requirements: HR implementation plan",
                "Governance metrics for the year: Published in annual report (if applicable)",
                "Board sign-off on updated framework: ☐ Yes — date: ___  ☐ No update needed",
                "Next review date set: ___",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Model Risk Management Policy",
      level: "practitioner",
      desc: "Monitor, audit, and manage deployed AI systems.",
      guidance: "Apply SR 11-7 principles as a baseline even outside banking. Key activities: model validation before deployment, ongoing performance monitoring, regular model audits. Risk tier determines rigor.",
      checklist: [
        {
          item: "Classify all models by risk tier (high/medium/low)",
          templateTitle: "Model Risk Tier Classification Framework",
          templateType: "framework",
          instructions: "Classify every production model before applying governance controls. The tier determines the validation, monitoring, and audit requirements. When in doubt, classify higher.",
          sections: [
            {
              heading: "Tier Classification Criteria",
              items: [
                "HIGH RISK: Affects individual rights or significant life decisions (employment, lending, healthcare, law enforcement) | Material financial impact >£/$ ___ per decision | Regulatory high-risk classification | No meaningful human override in practice",
                "MEDIUM RISK: Consequential business decisions but not individual rights | Customer-facing with potential for individual bias | Significant financial impact at aggregate level | Human review recommended but not always feasible",
                "LOW RISK: Internal process automation | Decisions easily reversible | No personal data involved | Human review straightforward and always available",
                "Classification owner: ___ | Classification must be reviewed: annually + on any material change",
              ],
            },
            {
              heading: "Classification Decision Aid",
              items: [
                "Q1: Does this model make or inform decisions that significantly affect individuals? YES → HIGH | Maybe → MEDIUM | No → continue",
                "Q2: Are decisions difficult or impossible to reverse once made? YES → HIGH | Occasionally → MEDIUM | No → continue",
                "Q3: Could errors cause significant financial, physical, or psychological harm? YES → HIGH | Minor harm → MEDIUM | No → LOW",
                "Q4: Is personal data of protected characteristics involved? YES → at minimum MEDIUM, likely HIGH",
                "Classification output: Model ___ classified as ☐ HIGH  ☐ MEDIUM  ☐ LOW | Rationale: ___ | Reviewed by: ___",
              ],
            },
          ],
        },
        {
          item: "Define validation requirements by risk tier",
          templateTitle: "Model Validation Requirements Matrix",
          templateType: "matrix",
          instructions: "Validation requirements are proportionate to risk. High-risk models require independent validation — the development team validating their own model is not independent.",
          sections: [
            {
              heading: "Validation Requirements by Tier",
              items: [
                "HIGH TIER: Independent validation team (not development team) | External validation if risk score >20 | Full conceptual soundness review | Benchmark against alternative approaches | Outcome testing on diverse datasets | Bias testing across all relevant groups | Full model card | Steering Committee sign-off",
                "MEDIUM TIER: Peer review by ML engineer not on development team | Benchmark on holdout test set | Basic bias testing | Standard model card | AI Lead sign-off",
                "LOW TIER: Self-review by development team | Checklist completion | Abbreviated model card | Department head awareness",
              ],
            },
            {
              heading: "Validation Evidence Requirements",
              items: [
                "HIGH TIER documentation: Validation report, bias test results, benchmark comparison, sensitivity analysis, model limitations statement",
                "MEDIUM TIER documentation: Review sign-off, test metrics, bias test summary",
                "LOW TIER documentation: Checklist completion confirmation",
                "All tiers: Model card in registry | Deployment approval record | Data source documentation",
              ],
            },
          ],
        },
        {
          item: "Establish pre-deployment validation checklist",
          templateTitle: "Pre-Deployment Model Validation Checklist",
          templateType: "template",
          instructions: "Every model must pass this checklist before production deployment. No exceptions. The checklist is the minimum — high-risk models require additional validation per tier requirements.",
          sections: [
            {
              heading: "Technical Validation",
              items: [
                "☐ Performance metrics meet all defined KPI thresholds on held-out test set (not training or validation set)",
                "☐ Model performance tested on data from the same distribution as production (not just benchmark data)",
                "☐ Model behaviour on edge cases and out-of-distribution inputs documented",
                "☐ Latency and throughput tested at expected production load",
                "☐ No data leakage from training set into test set (temporal and entity-based leakage checks)",
                "☐ Model card completed and reviewed",
              ],
            },
            {
              heading: "Safety & Compliance Validation",
              items: [
                "☐ Bias testing completed — results within acceptable thresholds for all required protected attributes",
                "☐ Privacy review completed — no PII used in violation of policy or regulation",
                "☐ Security review completed — no critical or high vulnerabilities in model serving code",
                "☐ Explainability mechanism in place (for applicable use cases)",
                "☐ Human oversight mechanism tested and working",
                "☐ Rollback plan documented and tested",
                "☐ Monitoring and alerting configured (performance, drift, bias, cost)",
                "☐ Deployment approval obtained at correct authority level per tier",
              ],
            },
          ],
        },
        {
          item: "Create model performance baselines and SLAs",
          templateTitle: "Model Performance Baseline & SLA Template",
          templateType: "template",
          instructions: "Record the performance baseline at deployment. All future monitoring compares to this baseline. SLAs define the minimum acceptable performance — breaching them triggers the escalation process.",
          sections: [
            {
              heading: "Performance Baseline at Deployment",
              items: [
                "Model: ___________________ | Version: ___ | Deployment date: ___",
                "Accuracy: ___ | Precision: ___ | Recall: ___ | F1: ___ | AUC-ROC: ___",
                "Latency: p50: ___ ms | p95: ___ ms | p99: ___ ms",
                "Throughput: ___ requests/second at baseline load",
                "Business KPI at deployment: ___________________ value: ___",
                "Baseline data: ___ test examples | Date range: ___ to ___",
              ],
            },
            {
              heading: "Performance SLAs (Monitoring Triggers)",
              items: [
                "Accuracy drops below ___% (vs baseline ___%) → AMBER alert",
                "Accuracy drops below ___% → RED alert + automated rollback consideration",
                "Latency p99 exceeds ___ ms for ___ consecutive minutes → AMBER alert",
                "Error rate exceeds ___% of requests → RED alert",
                "Data drift (PSI) exceeds 0.2 on ≥___ features → MEDIUM alert (investigate retraining)",
                "Bias metric (demographic parity ratio) exceeds ___ → HIGH alert (human review + potential suspension)",
              ],
            },
          ],
        },
        {
          item: "Implement automated monitoring for model drift",
          templateTitle: "Model Drift Monitoring Configuration",
          templateType: "template",
          instructions: "Configure drift detection before go-live. Data drift (input distribution change) precedes performance degradation — catching drift early enables proactive retraining before model quality degrades.",
          sections: [
            {
              heading: "Drift Detection Setup",
              items: [
                "Tool: ☐ Evidently AI  ☐ NannyML  ☐ WhyLogs  ☐ Arize  ☐ Fiddler  ☐ Custom",
                "Reference distribution: Training data statistics | Updated on every retrain",
                "Statistical tests: PSI for categorical features | KS test or Wasserstein for continuous features | Chi-squared for label drift",
                "Monitoring frequency: Hourly drift check for HIGH tier | Daily for MEDIUM | Weekly for LOW",
              ],
            },
            {
              heading: "Feature-Level Monitoring",
              items: [
                "Features monitored (list top 10 most important): ___________________ ___________________",
                "PSI thresholds: No drift (0–0.1) | Minor drift (0.1–0.2) → log | Significant drift (>0.2) → alert",
                "Priority features (model highly sensitive to these): ___________________ — monitor at higher frequency",
                "Drift dashboard: Available at: ___________________ | Owner: ___________________ | Review: weekly",
              ],
            },
          ],
        },
        {
          item: "Define model performance degradation thresholds",
          templateTitle: "Performance Degradation Alert Thresholds",
          templateType: "template",
          instructions: "Set thresholds before deployment — not after. Post-hoc threshold setting is subject to bias towards explaining away problems. These thresholds should be agreed by the business owner, not just the ML team.",
          sections: [
            {
              heading: "Threshold Setting Guidelines",
              items: [
                "Approach: Start with minimum business-acceptable performance (e.g. what accuracy makes this worthwhile) | Set AMBER at 80% of baseline | Set RED at 60% of baseline",
                "AMBER (investigate, possible retrain): Accuracy: ___ | Precision: ___ | Recall: ___ | Business KPI drop: ___%",
                "RED (escalate, possible rollback): Accuracy: ___ | Precision: ___ | Recall: ___ | Business KPI drop: ___%",
                "Hysteresis rule: Don't alert on a single data point — require ___ consecutive measurement periods above threshold",
              ],
            },
            {
              heading: "Business KPI Correlation",
              items: [
                "Primary business KPI monitored: ___________________ | Baseline: ___ | AMBER threshold: ___ | RED threshold: ___",
                "Correlation between model performance and business KPI: ___ (measure monthly)",
                "Leading indicator: ___________________ (which ML metric most predicts business KPI change)",
                "Thresholds agreed by: ML Lead ___ | Business Owner ___ | Steering Committee (for HIGH tier) ___",
              ],
            },
          ],
        },
        {
          item: "Create model audit schedule and methodology",
          templateTitle: "Model Audit Methodology & Schedule",
          templateType: "template",
          instructions: "Scheduled model audits are distinct from real-time monitoring. Audits are periodic deep-dives that review governance, performance history, and compliance — not just current metrics.",
          sections: [
            {
              heading: "Audit Schedule",
              items: [
                "HIGH TIER: Annual formal audit | Semi-annual bias review | Quarterly performance deep-dive",
                "MEDIUM TIER: 18-month formal audit | Annual bias review | Semi-annual performance review",
                "LOW TIER: 3-year formal audit | Annual performance self-assessment",
                "Trigger audits: On any SEV-1 or SEV-2 incident | On major model update | On material regulatory change",
                "Audit calendar: ___________________ | Owner: ___________________ | Approved by: ___",
              ],
            },
            {
              heading: "Audit Methodology",
              items: [
                "GOVERNANCE REVIEW: Is the model card current? Are roles assigned? Is the model in the inventory? Are policies being followed?",
                "PERFORMANCE REVIEW: 12-month performance trend | Comparison to baseline | Explanation of any degradation periods",
                "FAIRNESS REVIEW: Bias test results vs thresholds | Protected group performance trends | Override rate by group",
                "COMPLIANCE REVIEW: Applicable regulatory requirements | Evidence of compliance | Any regulatory developments affecting this model",
                "AUDIT OUTPUT: Written report with findings (Critical/High/Medium/Low) | Management responses | Remediation plan with dates",
              ],
            },
          ],
        },
        {
          item: "Document model limitations and known failure modes",
          templateTitle: "Model Limitations & Failure Mode Documentation",
          templateType: "template",
          instructions: "Document limitations before deployment — not after your first incident. Users and decision-makers need to know where not to trust the model. Honest limitation documentation is a legal protection, not a liability.",
          sections: [
            {
              heading: "Limitations Documentation",
              items: [
                "Performance limitations: The model performs significantly worse on: ___________________________",
                "Data limitations: Training data does not represent: ___________________ | Impact: ___",
                "Temporal limitations: Model trained on data from ___ to ___. Performance may degrade after ___.",
                "Geographic/cultural limitations: Validated only for: ___________________ | Not validated for: ___",
                "Language limitations (if NLP): Languages supported: ___ | Unsupported: ___",
              ],
            },
            {
              heading: "Known Failure Modes",
              items: [
                "Failure mode 1: When ___________________ occurs, model tends to ___________________ | Frequency: ___ | Mitigation: ___",
                "Failure mode 2: When ___________________ occurs, model tends to ___________________ | Frequency: ___ | Mitigation: ___",
                "Failure mode 3: When ___________________ occurs, model tends to ___________________ | Frequency: ___ | Mitigation: ___",
                "Adversarial inputs: Is the model vulnerable to adversarial attacks? ☐ Yes — describe: ___  ☐ Tested, not vulnerable",
                "Limitations communicated to users: ☐ In product documentation  ☐ In user training  ☐ Not yet",
              ],
            },
          ],
        },
        {
          item: "Establish model remediation process",
          templateTitle: "Model Remediation Playbook",
          templateType: "template",
          instructions: "Define the remediation process for when a model underperforms — before you need it. A clear process ensures systematic improvement rather than ad-hoc firefighting.",
          sections: [
            {
              heading: "Remediation Decision Tree",
              items: [
                "PERFORMANCE DEGRADATION: Check data drift first (most common cause) → if drift detected: retrain | if no drift: investigate model/label issues",
                "BIAS DETECTED: Identify affected group + root cause (data? model? post-processing?) → apply fairness constraint or resampling → retest before re-deploying",
                "DATA QUALITY ISSUE: Identify source → fix upstream data pipeline → re-validate model on clean data → monitor closely after fix",
                "VENDOR MODEL ISSUE: Raise with vendor P1 ticket → implement shadow mode with alternative → if not fixed in ___ hours: invoke rollback",
              ],
            },
            {
              heading: "Remediation Execution Steps",
              items: [
                "Step 1: Contain — suspend model or implement human review for affected cases",
                "Step 2: Communicate — notify affected business owners and (if applicable) users",
                "Step 3: Diagnose — root cause analysis using monitoring data, model explainability, and data analysis",
                "Step 4: Fix — implement fix (retrain, data fix, post-processing, or model change)",
                "Step 5: Validate — run full pre-deployment checklist before re-deploying fixed model",
                "Step 6: Monitor — enhanced monitoring for ___ weeks post-remediation",
                "Step 7: Document — update model card, incident log, and lessons learned registry",
              ],
            },
          ],
        },
        {
          item: "Create model retirement criteria and process",
          templateTitle: "Model Retirement Criteria & Checklist",
          templateType: "template",
          instructions: "Models that should be retired but aren't become technical debt and governance risk. Define retirement criteria clearly so decisions are objective.",
          sections: [
            {
              heading: "Retirement Triggers",
              items: [
                "Performance trigger: Model cannot be remediated to meet minimum KPI thresholds after ___ retraining attempts",
                "Cost trigger: Cost per prediction exceeds £/$ ___ or serving cost exceeds ___% of delivered value",
                "Compliance trigger: Model cannot be made compliant with current regulations within ___ months",
                "Replacement trigger: Superior replacement available and migration path validated",
                "Business trigger: Underlying use case no longer relevant (process changed, business model change)",
              ],
            },
            {
              heading: "Retirement Checklist",
              items: [
                "☐ Retirement decision documented and approved at appropriate authority level",
                "☐ Users notified ___ weeks in advance with transition plan",
                "☐ Replacement or alternative process in place before shutdown",
                "☐ Training data deleted per retention policy — deletion certificate obtained",
                "☐ Model artefacts archived (for audit trail) or deleted",
                "☐ All access removed (API keys, user access, service accounts)",
                "☐ Vendor contract terminated (if applicable) — confirm vendor data deletion",
                "☐ AI inventory updated to 'Retired' | Audit trail archived for ___ years",
              ],
            },
          ],
        },
        {
          item: "Define override and human-in-the-loop requirements",
          templateTitle: "Human Override Requirements Specification",
          templateType: "template",
          instructions: "Human override requirements must be specified at design time — retrofitting meaningful override into a deployed system is very difficult. Regulatory requirements in this area are increasing.",
          sections: [
            {
              heading: "Override Design Specification",
              items: [
                "Override mechanism type: ☐ User can override any AI output  ☐ User can flag for human review  ☐ Automatic escalation on low confidence  ☐ All high-stakes decisions require human sign-off",
                "Override accessibility: Available within ___ clicks | Available to: ☐ All users  ☐ Supervisors only  ☐ Named reviewers",
                "Override UI design: [Describe override button/flow] ___________________________",
                "Override reason required: ☐ Yes — options: ___ / ___  ☐ Free text  ☐ No reason required",
              ],
            },
            {
              heading: "Override Monitoring & Governance",
              items: [
                "Override rate baseline: ___% of AI outputs are overridden (capture in first month of deployment)",
                "Override rate alert: If override rate exceeds ___% (possible model issue) or drops below ___% (possible rubber-stamping)",
                "Override reason analysis: Monthly review of override reasons to identify systematic patterns",
                "Rubber-stamping risk: If override rate is very low, investigate whether users are genuinely reviewing AI outputs",
                "Regulatory evidence: Override logs maintained as evidence of human oversight for ___ years",
              ],
            },
          ],
        },
        {
          item: "Establish model performance reporting to governance",
          templateTitle: "Model Performance Governance Report Template",
          templateType: "template",
          instructions: "Governance committees need model performance presented in business terms, not ML metrics. Translate technical metrics into business impact for executive audiences.",
          sections: [
            {
              heading: "Monthly Model Performance Report (for AI Steering Committee)",
              items: [
                "Models in scope: ___ production models | ___ in pilot | ___ in remediation",
                "Overall portfolio health: ☐ Green (all models within SLA)  ☐ Amber (___ models at risk)  ☐ Red (___ models breaching SLA)",
                "Incidents this month: ___ total | SEV-1: ___ | SEV-2: ___ | Fully resolved: ___",
                "Business value delivered by AI portfolio this month: £/$ ___",
                "Decisions needed from committee: ___________________________",
              ],
            },
            {
              heading: "Individual Model Status Summary",
              items: [
                "Model | Tier | Performance Status | Drift Status | Bias Status | Business KPI | Last Audit | Next Action",
                "Model 1: ___ | H/M/L | ☐ Green ☐ Amber ☐ Red | ___ | ___ | ___ | ___ | ___",
                "Model 2: ___ | H/M/L | ☐ Green ☐ Amber ☐ Red | ___ | ___ | ___ | ___ | ___",
                "Exception items requiring committee attention: ___________________________",
              ],
            },
          ],
        },
        {
          item: "Create model risk register and tracking",
          templateTitle: "Model Risk Register Template",
          templateType: "template",
          instructions: "Maintain a live risk register for all production models. Review monthly for HIGH tier, quarterly for MEDIUM. Escalate any new CRITICAL risks to the steering committee immediately.",
          sections: [
            {
              heading: "Risk Register Fields",
              items: [
                "Risk ID | Model affected | Risk description | Risk category | Likelihood (1–5) | Impact (1–5) | Risk score | Status | Mitigation | Owner | Review date",
                "MR-001 | [Model name] | Data drift causing accuracy degradation | Model risk | 3 | 4 | 12 | OPEN | Automated retraining trigger set | ML Lead | Monthly",
                "MR-002 | [Model name] | Vendor model update breaks production performance | Operational risk | 2 | 5 | 10 | MITIGATED | Version locking + shadow mode | AI Lead | Quarterly",
                "MR-003 | [Model name] | Bias detected in underrepresented demographic group | Ethical risk | 2 | 5 | 10 | MONITORING | Bias monitoring active, retraining plan ready | Ethics Lead | Monthly",
              ],
            },
            {
              heading: "Risk Register Governance",
              items: [
                "New risks identified by: Any team member — report to Model Owner | Owner: Model Owner logs in register",
                "Review cadence: CRITICAL risks: weekly | HIGH: monthly | MEDIUM: quarterly | LOW: annually",
                "Risk register shared with: AI Steering Committee (HIGH+ only) | Model owners (all)",
                "Register location: ___________________ | Owner: ___________________ | Tool: ☐ Spreadsheet  ☐ GRC tool  ☐ JIRA",
              ],
            },
          ],
        },
        {
          item: "Define escalation path for model risk issues",
          templateTitle: "Model Risk Escalation Framework",
          templateType: "framework",
          instructions: "Clear escalation paths reduce decision delay in model risk events. Ambiguity about who decides leads to either over-escalation (everyone escalates everything) or under-escalation (serious risks not surfaced).",
          sections: [
            {
              heading: "Escalation Triggers by Severity",
              items: [
                "CRITICAL (risk score 20–25): Escalate immediately to CTO + AI Steering Committee | Maximum response time: 1 hour | CEO notification for any public-facing impact",
                "HIGH (15–19): Escalate to AI Lead + Model Owner within 4 hours | Steering Committee informed at next monthly meeting | Mitigation plan within 48 hours",
                "MEDIUM (10–14): Model Owner manages with support | AI Lead informed | 30-day mitigation plan",
                "LOW (1–9): Model Owner manages | Logged in risk register | Reviewed at quarterly risk review",
              ],
            },
            {
              heading: "Escalation Contacts",
              items: [
                "Model Owner: ___________________ | Phone: ___ | Backup: ___",
                "AI Lead: ___________________ | Phone: ___ | Backup: ___",
                "CTO: ___________________ | Phone: ___ | Backup: ___",
                "DPO (for data/privacy risk): ___________________ | Phone: ___",
                "Legal (for regulatory risk): ___________________ | Phone: ___",
                "Out-of-hours escalation: ☐ PagerDuty  ☐ Phone tree  ☐ On-call rota — details: ___",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "AI Incident Response Playbook",
      level: "manager",
      desc: "Handle AI failures, bias incidents, and compliance breaches.",
      guidance: "AI incidents range from model performance degradation (often silent and gradual) to bias incidents to regulatory breaches. Your response plan must account for the unique nature of AI failures — they can be subtle, widespread, and hard to diagnose.",
      checklist: [
        {
          item: "Define AI incident classification criteria and severity levels",
          templateTitle: "AI Incident Severity Classification Guide",
          templateType: "template",
          instructions: "The first responder needs to classify an incident in under 5 minutes — during which time they may be under pressure. Make classification criteria unambiguous. When in doubt, classify higher.",
          sections: [
            {
              heading: "Severity Levels",
              items: [
                "SEV-1 CRITICAL: AI system making systemically incorrect decisions affecting customers | Data breach via AI | AI system completely down affecting operations | Confirmed bias incident with regulatory implications",
                "SEV-2 HIGH: Significant accuracy degradation >20% | Elevated user error reports | Single user data exposure | Unconfirmed bias alert requiring immediate investigation",
                "SEV-3 MEDIUM: Drift alert above threshold | Performance approaching SLA limit | Individual AI complaint requiring investigation | Model serving latency degradation",
                "SEV-4 LOW: Monitoring alert within acceptable range | Documentation gap | Non-urgent user feedback requiring model improvement",
              ],
            },
            {
              heading: "Classification Decision Aid",
              items: [
                "Q1: Are users or customers currently being harmed or misled by AI RIGHT NOW? YES → SEV-1",
                "Q2: Is there evidence of data exposure or regulatory breach? YES → SEV-1",
                "Q3: Is model performance significantly degraded and users affected? YES → SEV-2",
                "Q4: Is drift or degradation detected but not yet causing user impact? YES → SEV-3",
                "Q5: Is this a future risk, documentation issue, or improvement request? YES → SEV-4",
                "When in doubt about SEV-1 vs SEV-2: ESCALATE to SEV-1. You can downgrade; you can't undo a slow response to SEV-1.",
              ],
            },
          ],
        },
        {
          item: "Create AI incident detection and reporting channels",
          templateTitle: "AI Incident Detection & Reporting System Design",
          templateType: "template",
          instructions: "Automated detection is your first line — monitoring alerts should catch most incidents before users report them. User reporting channels are your second line for issues monitoring misses.",
          sections: [
            {
              heading: "Automated Detection",
              items: [
                "Performance monitoring alerts: Configured in ___ | Owner: ___ | Alert channel: ___",
                "Drift monitoring alerts: Configured in ___ | Threshold: PSI >0.2 | Alert channel: ___",
                "Error rate monitoring: Threshold: >___% errors in ___ minute window | Alert: PagerDuty/Slack",
                "Bias monitoring alerts: ___ | Owner: ___ | Alert channel: ___",
                "System health (latency, availability): ___ | Alert channel: ___",
              ],
            },
            {
              heading: "Human Reporting Channels",
              items: [
                "Internal team: #ai-incidents Slack channel | PagerDuty for on-call | ai-incidents@[company].com",
                "Internal users (employees): ai-feedback@[company].com | AI champion in their department",
                "External users/customers: [In-product 'Report a problem'] | Support ticket tagged 'AI-issue' | ai-concerns@[company].com",
                "Regulatory / legal reporting: DPO notified immediately for any data breach | Legal for regulatory issues",
                "Escalation to CEO/Board: CTO judgement call for SEV-1 with reputational risk | DPO for mandatory regulatory notifications",
              ],
            },
          ],
        },
        {
          item: "Establish incident response team roles and contacts",
          templateTitle: "AI Incident Response Team Roster",
          templateType: "template",
          instructions: "Designate roles before an incident. During an incident is not the time to decide who does what. Review and update this roster quarterly and whenever personnel change.",
          sections: [
            {
              heading: "Incident Response Team",
              items: [
                "INCIDENT COMMANDER (IC): Coordinates response, owns communication decisions | Primary: ___ | Backup: ___",
                "TECHNICAL LEAD: Diagnoses root cause, executes containment and fix | Primary: ___ | Backup: ___",
                "COMMUNICATIONS LEAD: Manages internal and external comms | Primary: ___ | Backup: ___",
                "LEGAL / COMPLIANCE: Regulatory notification decisions, contractual obligations | Primary: ___ | Backup: ___",
                "DPO: Data breach assessment and notification | Primary: ___ | Backup: ___",
                "BUSINESS OWNER: Impact assessment, user communication, decision authority | Primary: ___ | Backup: ___",
              ],
            },
            {
              heading: "Contact Information",
              items: [
                "IC: ___________________ | Mobile: ___ | Email: ___ | Available: 24/7 / Business hours",
                "Technical Lead: ___________________ | Mobile: ___ | Email: ___ | Available: ___",
                "Communications Lead: ___________________ | Mobile: ___ | Email: ___ | Available: ___",
                "Legal: ___________________ | Mobile: ___ | Out-of-hours: ___",
                "DPO: ___________________ | Mobile: ___ | Out-of-hours: ___",
                "War room / bridge: ___ (phone bridge) | Slack channel: #ai-incident-[date] | Video: ___",
              ],
            },
          ],
        },
        {
          item: "Define containment procedures (disable, rollback, throttle)",
          templateTitle: "AI Incident Containment Runbook",
          templateType: "template",
          instructions: "Containment stops the bleeding. It must be executable in minutes by any on-call engineer without expert knowledge. Speed of containment matters more than diagnosing root cause in the first 30 minutes.",
          sections: [
            {
              heading: "Containment Options (in order of preference)",
              items: [
                "OPTION 1 — ROLLBACK (fastest if previous version available): Revert to last known good version in model registry | Time to execute: ≤15 min | Command: [specific command]",
                "OPTION 2 — DISABLE AI FEATURE (if rollback not available): Toggle feature flag to disable AI component | Route all traffic to manual/rule-based fallback | Time: ≤5 min | Command/location: ___",
                "OPTION 3 — THROTTLE (if partial containment needed): Reduce AI traffic to ___% | Route remainder to fallback | Time: ≤10 min | Command: ___",
                "OPTION 4 — SUSPEND FOR AFFECTED GROUP ONLY (if bias/fairness incident): Block AI for affected demographic group | Route to human review | Time: ___",
              ],
            },
            {
              heading: "Containment Execution Steps",
              items: [
                "Step 1 (T+0): IC declares incident | Sets severity | Opens war room / Slack incident channel",
                "Step 2 (T+5): Technical Lead assesses fastest containment option | IC approves",
                "Step 3 (T+10): Containment action executed | IC verifies reduction in impact via monitoring",
                "Step 4 (T+15): IC posts status update in #ai-incidents: 'Incident [ID] — Containment complete/in progress — [brief status]'",
                "Step 5 (T+20): Business Owner notified of impact scope | Legal/DPO notified if data or regulatory implications",
                "Step 6 (T+30): External communication decision made (if customer-facing impact)",
              ],
            },
          ],
        },
        {
          item: "Create communication templates for different incident types",
          templateTitle: "AI Incident Communication Templates",
          templateType: "template",
          instructions: "Pre-drafted templates allow rapid, accurate communication without the risk of off-the-cuff statements during a crisis. Fill in the [BLANKS] — don't write from scratch during an incident.",
          sections: [
            {
              heading: "Internal Communication Templates",
              items: [
                "INITIAL ALERT (send within 30 min): 'AI INCIDENT ALERT: [Model/Feature] is experiencing [issue]. Severity: SEV-[X]. Impact: [who/what affected]. Status: Containment in progress. IC: [Name]. Updates every 30 min in #ai-incident-[date].'",
                "STATUS UPDATE (every 30 min for SEV-1): 'UPDATE T+[X]min: [Model] incident. Status: [Contained/Investigating/Resolving]. Current impact: [N] users affected. Root cause: [known/under investigation]. ETA to resolve: [time/unknown]. Next update: T+[Y]min.'",
                "RESOLUTION NOTICE: 'RESOLVED T+[X]min: [Model] incident resolved. Root cause: [summary]. Users affected: [N]. Actions taken: [summary]. Post-mortem: [date]. Monitoring: enhanced for [period].'",
              ],
            },
            {
              heading: "External Communication Templates",
              items: [
                "CUSTOMER NOTICE (if customer-facing impact): 'We are aware that some customers experienced [issue] with [feature] between [time] and [time]. We have resolved the issue. [If decision affected]: If you believe this affected a decision made about you, please contact us at [email] for a human review.'",
                "REGULATOR NOTIFICATION (GDPR Article 33 — adapt per jurisdiction): 'We are notifying you of an incident involving [brief description] that occurred on [date]. [N] individuals may be affected. We became aware at [time]. Steps taken: [summary]. Further information to follow.'",
                "PRESS STATEMENT (if media inquiry): '[Company] is aware of an issue with our AI system affecting [brief description]. We have taken immediate steps to [action]. We are investigating and will provide updates. Customer safety and privacy are our priority. Contact: [PR].'",
              ],
            },
          ],
        },
        {
          item: "Establish regulatory notification procedures and timelines",
          templateTitle: "Regulatory Notification Decision Framework",
          templateType: "framework",
          instructions: "Regulatory notification timelines are strict and non-negotiable. GDPR Article 33 requires DPA notification within 72 hours of becoming aware of a data breach. EU AI Act has additional requirements for high-risk AI incidents.",
          sections: [
            {
              heading: "Notification Decision Tree",
              items: [
                "GDPR DATA BREACH (personal data accessed/lost/exposed via AI): Notify DPA within 72 hours | Notify affected individuals 'without undue delay' if high risk | DPO leads notification | Template at: ___",
                "EU AI ACT SERIOUS INCIDENT (high-risk AI causing harm): Notify market surveillance authority | Timeline: check sector guidance | AI Lead + Legal lead | Contact: ___",
                "FINANCIAL SECTOR (material model failure): Check FCA/SEC/EBA requirements | Legal + Compliance lead | Timeline: varies by jurisdiction and severity",
                "NO MANDATORY NOTIFICATION: Document decision and rationale | Review at post-mortem | DPO sign-off on no-notification decision",
              ],
            },
            {
              heading: "Notification Execution",
              items: [
                "DPO assessment of notification requirement: Within 24 hours of incident (must be able to decide in time for 72-hour GDPR deadline)",
                "Notification approved by: DPO + Legal Counsel (no CEO approval needed — speed is critical)",
                "Notification tracking: Log notification date/time, regulator, contact, reference number received",
                "Follow-up required: Most regulators require follow-up report within 30 days — schedule immediately",
                "Legal privilege: Incident communications and RCA should be conducted under legal privilege advice — consult Legal within first hour of SEV-1",
              ],
            },
          ],
        },
        {
          item: "Define root cause analysis methodology for AI incidents",
          templateTitle: "AI Incident Root Cause Analysis Template",
          templateType: "template",
          instructions: "AI root cause analysis requires a structured approach — AI failures often have multiple contributing causes. The 5-Why method works well. Complete within 5 business days of incident closure.",
          sections: [
            {
              heading: "Incident Timeline",
              items: [
                "When did the issue start (estimated): ___________________________",
                "When was it detected: ___________________ | How: ☐ Monitoring alert  ☐ User report  ☐ Manual review  ☐ Other: ___",
                "How long between start and detection: ___ | Time to containment: ___ | Time to resolution: ___",
                "Incident timeline (key events): T0: ___ | T+Xmin: ___ | T+Ymin: ___ | T+Zmin: resolved",
              ],
            },
            {
              heading: "5-Why Root Cause Analysis",
              items: [
                "SYMPTOM: What happened? ___________________________",
                "WHY 1: Why did this happen? ___________________________",
                "WHY 2: Why did [WHY 1] happen? ___________________________",
                "WHY 3: Why did [WHY 2] happen? ___________________________",
                "WHY 4: Why did [WHY 3] happen? ___________________________",
                "WHY 5 (ROOT CAUSE): Why did [WHY 4] happen? ___________________________",
                "ROOT CAUSE CATEGORY: ☐ Model issue  ☐ Data issue  ☐ Infrastructure  ☐ Process gap  ☐ Human error  ☐ Vendor issue  ☐ External",
              ],
            },
            {
              heading: "Contributing Factors",
              items: [
                "Was detection delayed? If yes, why? ___________________________",
                "Were there warning signs that were missed? ___________________________",
                "Did existing safeguards fail? Which ones and why? ___________________________",
                "Was this incident predictable / preventable? ___________________________",
              ],
            },
          ],
        },
        {
          item: "Create post-incident review and lessons-learned process",
          templateTitle: "AI Post-Incident Review Template",
          templateType: "template",
          instructions: "Conduct the post-incident review within 5 business days while details are fresh. The goal is systemic improvement — not blame. Assign every action to a named owner with a due date.",
          sections: [
            {
              heading: "Post-Incident Review Agenda (90 min)",
              items: [
                "0:00–0:10 — Ground rules: No blame, focus on systems not people, all voices equally valid, no hierarchy in this room",
                "0:10–0:30 — Incident timeline: Walk through what happened, when, and who did what (factual, no judgement)",
                "0:30–0:50 — Root cause analysis: Work through the 5-Why together, identify contributing factors",
                "0:50–1:10 — What went well: What helped us respond effectively? What would we keep?",
                "1:10–1:30 — Action items: What changes would have prevented this? What would improve our response next time? Assign owners + due dates",
              ],
            },
            {
              heading: "Action Item Template",
              items: [
                "Action: ___________________ | Type: ☐ Prevention  ☐ Detection  ☐ Response  ☐ Documentation",
                "Owner: ___________________ | Due date: ___ | Priority: High/Med/Low",
                "Success measure: How will we know this action is complete and effective? ___",
                "Review at: ___ (date to check completion) | Verified by: ___",
              ],
            },
            {
              heading: "Post-Incident Report",
              items: [
                "Incident summary (1 paragraph): ___________________________",
                "Impact: ___ users affected | Duration: ___ hours | Business impact: £/$ ___",
                "Root cause: ___________________________",
                "What we did well: ___________________________",
                "What we will change: ___________________________",
                "Distribution: AI Steering Committee + all incident responders + AI inventory record | Published: ___",
              ],
            },
          ],
        },
      ],
    },
  ],
};
