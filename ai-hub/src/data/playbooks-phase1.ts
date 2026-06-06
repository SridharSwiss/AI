import type { Phase } from "./playbooks-types";

export const phase1: Phase = {
  phase: "assess",
  label: "Phase 1: Assess",
  color: "from-blue-500 to-cyan-500",
  bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50",
  description: "Evaluate your organisation's AI readiness and identify opportunities.",
  playbooks: [
    {
      title: "AI Readiness Assessment",
      level: "manager",
      desc: "Score your org's data maturity, talent, and infrastructure.",
      guidance: "Benchmark your organisation across five dimensions: data infrastructure, talent, leadership, use cases, and governance. Score each 1–5 and build a gap analysis before any AI spend.",
      checklist: [
        {
          item: "Document current data infrastructure and quality",
          templateTitle: "Data Infrastructure Audit Survey",
          templateType: "survey",
          instructions: "Complete with your data engineering and IT leads. Score 1 (very poor) to 5 (excellent). Use results to identify critical gaps before any AI initiative.",
          sections: [
            {
              heading: "Storage & Architecture",
              items: [
                "Primary data storage: ☐ Cloud (AWS/Azure/GCP)  ☐ On-premises  ☐ Hybrid  ☐ Legacy/Mainframe",
                "% data structured vs unstructured: Structured ___% | Unstructured ___% | Semi-structured ___%",
                "Centralised data warehouse or lake: ☐ Yes – fully operational  ☐ Partially  ☐ No – siloed databases",
                "Clean labelled data volume for ML: ☐ <1 GB  ☐ 1–100 GB  ☐ 100 GB–1 TB  ☐ >1 TB",
                "Real-time streaming available: ☐ Yes  ☐ No  ☐ Planned within 12 months",
              ],
            },
            {
              heading: "Data Quality Scorecard (Rate 1–5)",
              items: [
                "Completeness – all expected fields populated: ___ / 5",
                "Accuracy – data reflects real-world values correctly: ___ / 5",
                "Consistency – uniform across systems/sources: ___ / 5",
                "Timeliness – data is current and refreshed appropriately: ___ / 5",
                "Uniqueness – duplicates are identified and managed: ___ / 5",
                "Overall Score: ___ / 25   Key issues: ___________________________",
              ],
            },
            {
              heading: "Data Governance & Access",
              items: [
                "Data catalog in place: ☐ Yes  ☐ No  ☐ In progress - Tool: ___________",
                "Data lineage tracked end-to-end: ☐ Yes  ☐ Partially  ☐ No",
                "Documented data governance policy: ☐ Yes  ☐ Draft only  ☐ No",
                "Data quality accountability owner: ☐ Dedicated team  ☐ IT  ☐ Business units  ☐ Nobody",
                "Can data scientists self-serve data without IT tickets: ☐ Yes  ☐ Partial  ☐ No",
                "Top 3 known data quality issues: 1) ___ 2) ___ 3) ___",
              ],
            },
          ],
        },
        {
          item: "Assess team AI/ML skill levels via survey",
          templateTitle: "Team AI Skills Assessment Survey",
          templateType: "survey",
          instructions: "Distribute to all staff involved in or adjacent to AI initiatives. Keep responses anonymous to get honest answers. Use results to plan training and hiring.",
          sections: [
            {
              heading: "Respondent Profile",
              items: [
                "Department / Business Unit: ___________________________",
                "Role / Job Title: ___________________________",
                "Years in current role: ☐ <1 yr  ☐ 1–3 yrs  ☐ 3–7 yrs  ☐ 7+ yrs",
                "Primary function: ☐ Technical  ☐ Data/Analytics  ☐ Product  ☐ Operations  ☐ Management  ☐ Strategy",
              ],
            },
            {
              heading: "Technical Skills (Rate 1 = None → 5 = Expert)",
              items: [
                "Python / R programming: ___ / 5",
                "SQL and database querying: ___ / 5",
                "Machine learning concepts (supervised, unsupervised, RL): ___ / 5",
                "Deep learning / neural networks: ___ / 5",
                "Cloud platforms (AWS / Azure / GCP): ___ / 5",
                "MLOps and model deployment: ___ / 5",
                "Prompt engineering and LLM usage: ___ / 5",
              ],
            },
            {
              heading: "AI Usage & Readiness",
              items: [
                "AI tools currently used: ☐ ChatGPT  ☐ Copilot  ☐ Claude  ☐ Gemini  ☐ GitHub Copilot  ☐ None  ☐ Other: ___",
                "Frequency of AI tool use: ☐ Daily  ☐ Weekly  ☐ Occasionally  ☐ Never",
                "AI/ML training courses completed: ☐ Yes – list: ___________  ☐ No",
                "Comfort working alongside AI systems (1=Very uncomfortable, 5=Very comfortable): ___ / 5",
                "Biggest barrier to using AI more: ☐ No access  ☐ No training  ☐ Unclear policy  ☐ Privacy concerns  ☐ Don't see the need",
                "Most valuable AI topic to learn: ___________________________",
              ],
            },
          ],
        },
        {
          item: "Identify top 5 candidate AI use cases",
          templateTitle: "AI Use Case Nomination Form",
          templateType: "template",
          instructions: "Complete one form per use case. Collect from department heads - aim for 15–20 nominations before prioritisation. Use the feasibility section to filter obvious non-starters early.",
          sections: [
            {
              heading: "Use Case Overview",
              items: [
                "Use Case Name: ___________________________",
                "Nominating Department / Team: ___________________________",
                "Business Process to Improve: ___________________________",
                "AI Capability Required: ☐ NLP/Text  ☐ Computer vision  ☐ Predictive analytics  ☐ Recommendation  ☐ Process automation  ☐ Generative AI  ☐ Other: ___",
                "How often does this process occur: ☐ Continuously  ☐ Daily  ☐ Weekly  ☐ Monthly",
              ],
            },
            {
              heading: "Expected Business Value",
              items: [
                "Time savings: ___ hrs/week × ___ staff = ___ total hrs/week",
                "Estimated annual cost reduction: £/$ ___________________________",
                "Quality improvement expected: ___________________________",
                "Revenue impact (if applicable): ___________________________",
                "Strategic alignment: ☐ Core business  ☐ Customer experience  ☐ Compliance  ☐ Innovation  ☐ Cost efficiency",
              ],
            },
            {
              heading: "Feasibility Indicators",
              items: [
                "Historical data available for training: ☐ Yes  ☐ Partial  ☐ No",
                "Volume of available labelled examples: ___________________________",
                "Regulatory / compliance constraints: ☐ None  ☐ Minor  ☐ Significant - describe: ___",
                "Business champion identified: ☐ Yes – Name: ___________  ☐ No",
                "Estimated implementation effort: ☐ <3 months  ☐ 3–6 months  ☐ 6–12 months  ☐ Unknown",
              ],
            },
          ],
        },
        {
          item: "Evaluate data privacy and security posture",
          templateTitle: "AI Data Privacy & Security Assessment",
          templateType: "questionnaire",
          instructions: "Complete with your CISO, DPO, and Legal team. Any 'No' answer should trigger a remediation action before AI processing of that data begins.",
          sections: [
            {
              heading: "Regulatory Scope",
              items: [
                "Applicable regulations: ☐ GDPR  ☐ UK GDPR  ☐ CCPA/CPRA  ☐ HIPAA  ☐ PDPA  ☐ PIPL  ☐ Other: ___",
                "Designated Data Protection Officer (DPO): ☐ Yes  ☐ No  ☐ Shared/Outsourced",
                "Record of Processing Activities (ROPA) maintained: ☐ Yes  ☐ Partially  ☐ No",
                "AI-specific DPIAs conducted: ☐ Yes  ☐ No  ☐ In progress",
              ],
            },
            {
              heading: "Data Classification & Handling",
              items: [
                "Data classification policy in place: ☐ Yes  ☐ No",
                "PII/sensitive categories processed: ☐ Name/contact  ☐ Financial  ☐ Health  ☐ Biometric  ☐ Location  ☐ Children's data",
                "Training data can be anonymised / pseudonymised: ☐ Yes  ☐ Partial  ☐ No",
                "Cross-border data transfer restrictions: ☐ Yes – describe: ___  ☐ No",
              ],
            },
            {
              heading: "Technical Controls & AI-Specific Risks",
              items: [
                "Encryption at rest: ☐ Yes – all  ☐ Partial  ☐ No | In transit: ☐ Yes  ☐ Partial  ☐ No",
                "Access to training data role-based and logged: ☐ Yes  ☐ Partial  ☐ No",
                "AI vendor data processing agreements (DPAs) signed: ☐ Yes  ☐ Pending  ☐ No",
                "Data breach response plan exists and tested: ☐ Yes – tested  ☐ Yes – untested  ☐ No",
                "Model memorisation / training data leakage risk (1–5): ___ / 5",
                "Third-party AI vendor data retention risk (1–5): ___ / 5",
                "Overall Privacy Maturity Self-Score: ___ / 5   Key gaps: ___",
              ],
            },
          ],
        },
        {
          item: "Review leadership alignment on AI strategy",
          templateTitle: "Leadership AI Alignment Questionnaire",
          templateType: "questionnaire",
          instructions: "Administer individually to C-suite before any AI strategy workshop. Collate responses to identify disagreements. Use gaps to structure workshop agenda.",
          sections: [
            {
              heading: "Strategic Vision",
              items: [
                "In one sentence, what is the primary purpose of AI for our organisation? ___",
                "Where do you see AI playing the most important role in 3 years? ___",
                "Which business function should benefit from AI first? ___",
                "How do you define 'success' for our AI programme in year one? ___",
              ],
            },
            {
              heading: "Investment & Risk Appetite",
              items: [
                "% of tech budget to allocate to AI: ☐ <5%  ☐ 5–10%  ☐ 10–20%  ☐ >20%",
                "Tolerance for AI pilot failure (1=Zero, 5=Very tolerant): ___ / 5",
                "Speed-to-market vs safety in AI deployment (1=Speed, 5=Safety first): ___ / 5",
                "Would you support pausing a process short-term to implement AI: ☐ Yes  ☐ No  ☐ Depends",
              ],
            },
            {
              heading: "Concerns & Governance",
              items: [
                "Biggest concern about AI adoption: ___________________________",
                "Stakeholder group most likely to resist AI: ___________________________",
                "What would make you recommend pausing an AI initiative: ___________________________",
                "Non-negotiable governance guardrails: ___________________________",
              ],
            },
          ],
        },
        {
          item: "Benchmark against industry AI maturity models",
          templateTitle: "AI Maturity Model Benchmarking Scorecard",
          templateType: "scorecard",
          instructions: "Score your organisation across five dimensions (1=Initial/Ad-hoc → 5=AI-native). Compare against industry benchmarks. Use gaps to prioritise investments.",
          sections: [
            {
              heading: "Dimension 1–3 Scores",
              items: [
                "DATA & INFRASTRUCTURE: 1=Siloed/manual | 2=Central warehouse, some pipelines | 3=Data lake, ML-ready datasets | 4=Feature store, automated quality monitoring | 5=Self-healing pipelines, unified data mesh",
                "Your Score: ___ / 5   Industry Benchmark (your sector): ___ / 5",
                "AI/ML TALENT & CULTURE: 1=No dedicated ML talent | 2=1–2 data scientists, ad hoc | 3=Dedicated ML team, AI literacy training | 4=Embedded ML in business units | 5=AI-native culture, internal ML platform",
                "Your Score: ___ / 5   Industry Benchmark: ___ / 5",
                "AI IN PRODUCTION: 1=No models in production | 2=1–2 models, manual deploy | 3=5–10 models, semi-automated | 4=10+ models, CI/CD, full monitoring | 5=100s of models, self-optimising systems",
                "Your Score: ___ / 5   Industry Benchmark: ___ / 5",
              ],
            },
            {
              heading: "Dimension 4–5 Scores & Summary",
              items: [
                "AI STRATEGY & LEADERSHIP: 1=No strategy | 2=Mentioned in strategy, no budget | 3=Dedicated strategy, sponsor, budget | 4=Board-level agenda, CDO/CAIO | 5=AI is the business strategy",
                "Your Score: ___ / 5   Industry Benchmark: ___ / 5",
                "AI GOVERNANCE & ETHICS: 1=No governance | 2=Ad hoc reviews | 3=AI policy, ethics reviews, GDPR-compliant | 4=Governance committee, model risk mgmt | 5=External audits, published ethics framework",
                "Your Score: ___ / 5   Industry Benchmark: ___ / 5",
                "TOTAL SCORE: ___ / 25   Interpretation: 5–10=Not ready | 11–17=Pilot ready | 18–22=Scale ready | 23–25=AI-native",
                "Priority gap areas (top 3): 1) ___ 2) ___ 3) ___",
              ],
            },
          ],
        },
        {
          item: "Identify key AI talent gaps and training needs",
          templateTitle: "AI Talent Gap Analysis Worksheet",
          templateType: "worksheet",
          instructions: "Map current team capabilities against roles needed for your target AI programme. For each gap decide: Hire / Train / Partner / Automate.",
          sections: [
            {
              heading: "Role Inventory",
              items: [
                "ML Engineer - Current: ___ | Required: ___ | Gap: ___ | Action: ☐ Hire  ☐ Train  ☐ Partner",
                "Data Scientist - Current: ___ | Required: ___ | Gap: ___ | Action: ☐ Hire  ☐ Train  ☐ Partner",
                "Data Engineer - Current: ___ | Required: ___ | Gap: ___ | Action: ☐ Hire  ☐ Train  ☐ Partner",
                "AI Product Manager - Current: ___ | Required: ___ | Gap: ___ | Action: ☐ Hire  ☐ Train  ☐ Partner",
                "MLOps Engineer - Current: ___ | Required: ___ | Gap: ___ | Action: ☐ Hire  ☐ Train  ☐ Partner",
                "Responsible AI / Ethics Lead - Current: ___ | Required: ___ | Gap: ___ | Action: ☐ Hire  ☐ Train  ☐ Partner",
              ],
            },
            {
              heading: "Critical Skill Gaps (Severity 1–5)",
              items: [
                "LLM fine-tuning and prompt engineering: ___ / 5",
                "MLOps and model deployment automation: ___ / 5",
                "AI product management and roadmapping: ___ / 5",
                "AI ethics, bias testing, responsible AI: ___ / 5",
                "Data engineering and pipeline management: ___ / 5",
              ],
            },
            {
              heading: "Training Plan",
              items: [
                "All-staff training: ___________________ | Timeline: ___ | Budget: £/$ ___",
                "Data team training: ___________________ | Timeline: ___ | Budget: £/$ ___",
                "Manager training: ___________________ | Timeline: ___ | Budget: £/$ ___",
                "External hiring budget approved: ☐ Yes – Amount: ___  ☐ No  ☐ TBD",
                "Preferred learning format: ☐ Online self-paced  ☐ Instructor-led  ☐ Bootcamp  ☐ Certification programme",
              ],
            },
          ],
        },
        {
          item: "Assess integration capabilities of existing systems",
          templateTitle: "Systems Integration Readiness Assessment",
          templateType: "questionnaire",
          instructions: "Complete with IT architecture and engineering leads. Focus on which systems AI outputs need to feed into and what integration work is required.",
          sections: [
            {
              heading: "Core Systems Inventory",
              items: [
                "5 most critical business systems: 1) ___ 2) ___ 3) ___ 4) ___ 5) ___",
                "Systems with REST APIs: ☐ All  ☐ Most  ☐ Some  ☐ None",
                "API documentation and sandboxes available: ☐ Yes  ☐ Partial  ☐ No",
                "Any systems end-of-life or in decommission plan: ☐ Yes – list: ___  ☐ No",
              ],
            },
            {
              heading: "Integration Complexity (Rate 1–5, 5 = hardest)",
              items: [
                "ERP / Finance system: ___ / 5 - System name: ___",
                "CRM: ___ / 5 - System name: ___",
                "Data warehouse / BI tool: ___ / 5 - System name: ___",
                "Customer-facing platform: ___ / 5 - System name: ___",
                "HR / People systems: ___ / 5 - System name: ___",
              ],
            },
            {
              heading: "Technical Constraints",
              items: [
                "Legacy mainframe systems that cannot be easily integrated: ☐ Yes  ☐ No",
                "Enterprise Service Bus (ESB) or integration middleware: ☐ Yes - Tool: ___  ☐ No",
                "Maximum acceptable API response latency for AI features: ___ ms",
                "Event-driven architecture (Kafka / SNS / EventBridge) in use: ☐ Yes  ☐ No  ☐ Planned",
                "Network segmentation constraints affecting AI service comms: ☐ Yes  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Review cloud infrastructure readiness",
          templateTitle: "Cloud AI Infrastructure Readiness Checklist",
          templateType: "template",
          instructions: "Complete with DevOps/cloud engineering team. Assess current cloud maturity and gaps for AI workloads - GPU access, model serving, vector databases, security.",
          sections: [
            {
              heading: "Cloud Platform Status",
              items: [
                "Primary cloud provider: ☐ AWS  ☐ Azure  ☐ GCP  ☐ On-premises  ☐ Multi-cloud  ☐ None",
                "Cloud strategy: ☐ Cloud-first  ☐ Cloud-hybrid  ☐ Cloud-averse",
                "AI/ML platform provisioned: ☐ SageMaker  ☐ Azure ML  ☐ Vertex AI  ☐ None  ☐ Other: ___",
                "Infrastructure-as-code (Terraform/Pulumi) used: ☐ Yes  ☐ Partial  ☐ No",
              ],
            },
            {
              heading: "Compute & Storage for AI",
              items: [
                "GPU or TPU instances available and budgeted: ☐ Yes  ☐ Need to provision  ☐ No budget",
                "Managed vector database for embeddings: ☐ Yes – Tool: ___  ☐ No",
                "Object storage (S3/Blob/GCS) configured for large ML datasets: ☐ Yes  ☐ No",
                "Container orchestration (Kubernetes/ECS) for model serving: ☐ Yes  ☐ No",
                "Estimated monthly cloud budget for AI workloads: £/$ ___________________________",
              ],
            },
            {
              heading: "Security & Compliance",
              items: [
                "Cloud data residency meets regulatory requirements: ☐ Yes  ☐ No",
                "VPC / private networking for sensitive AI data: ☐ Yes  ☐ No",
                "Cloud security posture management (CSPM) active: ☐ Yes  ☐ No",
                "IAM with least-privilege for all AI services: ☐ Yes  ☐ Partial  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Evaluate change management capacity",
          templateTitle: "Change Management Capacity Survey",
          templateType: "survey",
          instructions: "Assess your organisation's track record and capability for managing large-scale technology change. AI transformations require robust change management - this sets your baseline.",
          sections: [
            {
              heading: "Change History",
              items: [
                "Major technology transformations in last 5 years: ☐ 0  ☐ 1–2  ☐ 3–5  ☐ 5+",
                "Success rate of most recent major change (1=Failed, 5=Very successful): ___ / 5",
                "Primary reason for any past change failures: ___________________________",
                "Formal change management function exists: ☐ Yes  ☐ No  ☐ Outsourced",
              ],
            },
            {
              heading: "Organisational Readiness (Rate 1–5)",
              items: [
                "Leadership commitment to this AI change: ___ / 5",
                "Middle management buy-in and capability: ___ / 5",
                "Frontline staff openness to AI-driven change: ___ / 5",
                "Availability of internal change champions: ___ / 5",
                "Communication infrastructure to reach all staff: ___ / 5",
              ],
            },
            {
              heading: "Competing Demands",
              items: [
                "Other major changes being implemented simultaneously: ___________________________",
                "Sufficient bandwidth to absorb this change: ☐ Yes  ☐ Borderline  ☐ No",
                "Change impact assessment completed: ☐ Yes  ☐ No",
                "Union or works council considerations: ☐ Yes – describe: ___  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Document AI governance requirements",
          templateTitle: "AI Governance Requirements Capture Template",
          templateType: "template",
          instructions: "Capture governance requirements from Legal, Compliance, Risk, and IT Security. This becomes the basis for your AI governance framework design.",
          sections: [
            {
              heading: "Regulatory Requirements",
              items: [
                "Applicable AI regulations: ☐ EU AI Act  ☐ UK AI Framework  ☐ NIST AI RMF  ☐ SEC AI rules  ☐ FDA AI/ML guidance  ☐ Other: ___",
                "High-risk AI use cases requiring conformity assessment: ___________________________",
                "Mandatory human oversight requirements for your sector: ___________________________",
                "Explainability / transparency obligations: ___________________________",
                "Documentation and audit trail requirements: ___________________________",
              ],
            },
            {
              heading: "Internal Policy Gaps",
              items: [
                "AI acceptable use policy: ☐ Exists  ☐ Needs drafting  ☐ Not required",
                "Model risk management policy: ☐ Exists  ☐ Needs drafting  ☐ Not required",
                "AI vendor procurement policy: ☐ Exists  ☐ Needs drafting  ☐ Not required",
                "Employee AI use guidelines: ☐ Exists  ☐ Needs drafting  ☐ Not required",
                "IP ownership of AI outputs policy: ☐ Exists  ☐ Needs drafting  ☐ Not required",
              ],
            },
            {
              heading: "Governance Structure Decisions",
              items: [
                "AI governance committee chair role: ___________________________",
                "Required functions: ☐ Legal  ☐ Risk  ☐ IT  ☐ HR  ☐ Business units  ☐ Ethics/Compliance",
                "Meeting cadence: ☐ Monthly  ☐ Quarterly  ☐ Ad-hoc",
                "Escalation path for AI incidents: ___________________________",
                "External audit requirement: ☐ Annual  ☐ Biannual  ☐ None required",
              ],
            },
          ],
        },
        {
          item: "Create AI readiness scorecard and gap analysis",
          templateTitle: "AI Readiness Scorecard & Gap Analysis Report",
          templateType: "scorecard",
          instructions: "Compile results from all previous assessments. Present to leadership as the baseline before any AI investment. Use gap analysis to define your 90-day improvement roadmap.",
          sections: [
            {
              heading: "Consolidated Readiness Scores",
              items: [
                "Data Infrastructure & Quality: ___ / 5",
                "AI/ML Talent & Skills: ___ / 5",
                "Technology & Cloud Infrastructure: ___ / 5",
                "Leadership Alignment & Strategy: ___ / 5",
                "Governance & Compliance Readiness: ___ / 5",
                "Change Management Capacity: ___ / 5",
                "TOTAL: ___ / 30   Interpretation: 6–12=Not ready | 13–20=Pilot ready | 21–26=Scale ready | 27–30=AI-native",
              ],
            },
            {
              heading: "Top 5 Priority Gaps",
              items: [
                "Gap 1: ___________________ | Impact: High/Med/Low | Owner: ___ | 90-day action: ___",
                "Gap 2: ___________________ | Impact: High/Med/Low | Owner: ___ | 90-day action: ___",
                "Gap 3: ___________________ | Impact: High/Med/Low | Owner: ___ | 90-day action: ___",
                "Gap 4: ___________________ | Impact: High/Med/Low | Owner: ___ | 90-day action: ___",
                "Gap 5: ___________________ | Impact: High/Med/Low | Owner: ___ | 90-day action: ___",
              ],
            },
            {
              heading: "Investment Roadmap",
              items: [
                "Immediate (0–30 days): ___________________________",
                "Short-term (30–90 days): ___________________________",
                "Medium-term (3–6 months): ___________________________",
                "Estimated investment for readiness: £/$ ___________________________",
                "Recommended first AI pilot use case: ___________________________",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Use Case Prioritization Matrix",
      level: "manager",
      desc: "Rank AI opportunities by impact vs. feasibility.",
      guidance: "Score each use case on a 2×2 matrix: business impact vs. technical feasibility. Prioritise high-impact, high-feasibility use cases as pilots. Never fund a use case that scores below 3 on both dimensions.",
      checklist: [
        {
          item: "List all candidate AI use cases from stakeholders",
          templateTitle: "Use Case Collection Workshop Facilitation Guide",
          templateType: "template",
          instructions: "Run a 90-minute session with department heads. Individual ideation first, then share and cluster. Aim for 15–20 raw nominations before filtering.",
          sections: [
            {
              heading: "Workshop Agenda (90 min)",
              items: [
                "0:00–0:10 - Introduction: AI possibilities overview and session rules",
                "0:10–0:25 - Individual ideation (silent): each participant writes use cases on sticky notes",
                "0:25–0:45 - Round-robin sharing: each person presents their top 3 ideas",
                "0:45–1:00 - Clustering: group similar ideas, eliminate duplicates",
                "1:00–1:15 - Dot voting: each participant places 5 votes on their favourite ideas",
                "1:15–1:30 - Capture output and assign owners for each use case to nominate formally",
              ],
            },
            {
              heading: "Facilitation Prompts",
              items: [
                "Where do you spend the most time on repetitive, rules-based tasks?",
                "What decisions would you make better with more data or faster insights?",
                "What do your customers complain about most that could be helped by automation?",
                "What quality issues or errors occur repeatedly that AI could catch?",
                "Where do you wish you had 10× the capacity you currently have?",
                "What manual process would you eliminate if you had unlimited engineers?",
              ],
            },
            {
              heading: "Use Case Long-list Table",
              items: [
                "Use Case Name | Department | Problem Statement | Estimated Benefit | Data Available? | Champion",
                "Example: Invoice processing automation | Finance | 2 FTE spend 3 days/month on manual matching | £80k/yr savings | Yes – 3 yrs of invoice data | CFO",
                "Example: Customer churn prediction | Customer Success | 15% monthly churn, reactive not proactive | £500k ARR at risk | Partial – 18 months CRM data | CCO",
                "Example: Technical support ticket triage | IT | Tier 1 resolution takes 2 days avg, could be hours | 4 FTE partial reclaim | Yes – 2 yrs ticket data | CTO",
                "→ Add rows for each use case nominated in the workshop",
              ],
            },
          ],
        },
        {
          item: "Score each use case on business impact (1-5)",
          templateTitle: "Business Impact Scoring Rubric",
          templateType: "scorecard",
          instructions: "Score each use case across four impact dimensions using the rubrics below. Total score out of 20 becomes the vertical axis of your prioritisation matrix.",
          sections: [
            {
              heading: "Scoring Rubric",
              items: [
                "REVENUE IMPACT: 5 = Direct £1M+/yr new revenue or protected revenue | 4 = £500k–£1M | 3 = £100k–£500k | 2 = £10k–£100k | 1 = Minimal or indirect",
                "COST REDUCTION: 5 = Save >£1M/yr or eliminate >10 FTE | 4 = Save £500k–£1M | 3 = Save £100k–£500k | 2 = Save £10k–£100k | 1 = Minimal",
                "RISK REDUCTION: 5 = Mitigates critical regulatory/compliance risk | 4 = Significant operational risk | 3 = Moderate risk reduction | 2 = Minor improvement | 1 = No measurable risk reduction",
                "STRATEGIC VALUE: 5 = Core competitive differentiator, board priority | 4 = Strongly aligned to strategic goals | 3 = Moderate strategic alignment | 2 = Loosely related | 1 = Not in strategy",
              ],
            },
            {
              heading: "Scoring Worksheet",
              items: [
                "Use Case | Revenue (1–5) | Cost (1–5) | Risk (1–5) | Strategic (1–5) | TOTAL /20",
                "Use Case 1: ___ | ___ | ___ | ___ | ___ | ___",
                "Use Case 2: ___ | ___ | ___ | ___ | ___ | ___",
                "Use Case 3: ___ | ___ | ___ | ___ | ___ | ___",
                "Use Case 4: ___ | ___ | ___ | ___ | ___ | ___",
                "Use Case 5: ___ | ___ | ___ | ___ | ___ | ___",
              ],
            },
          ],
        },
        {
          item: "Score each use case on technical feasibility (1-5)",
          templateTitle: "Technical Feasibility Scoring Rubric",
          templateType: "scorecard",
          instructions: "Score feasibility across four dimensions. Total out of 20 is the horizontal axis of your prioritisation matrix. Automatic disqualifiers listed below override the score.",
          sections: [
            {
              heading: "Feasibility Rubric",
              items: [
                "DATA AVAILABILITY: 5 = Clean labelled data >100k examples, owned by us | 4 = Good data >10k examples, minor cleaning needed | 3 = Partial data, significant prep needed | 2 = Limited data, external procurement needed | 1 = No usable data",
                "TECHNICAL COMPLEXITY: 5 = Proven off-the-shelf solution (e.g. GPT API) | 4 = Minor customisation of existing solution | 3 = Significant ML development needed | 2 = Novel research problem | 1 = Unsolved AI problem",
                "TIMELINE TO VALUE: 5 = <3 months to first value | 4 = 3–6 months | 3 = 6–12 months | 2 = 12–18 months | 1 = >18 months",
                "TEAM CAPABILITY: 5 = Team has delivered identical projects before | 4 = Similar experience | 3 = Adjacent skills, training needed | 2 = Significant skill gap | 1 = No internal capability",
              ],
            },
            {
              heading: "Automatic Disqualifiers",
              items: [
                "☐ Training data is prohibited from processing under GDPR Article 9 without explicit consent - DISQUALIFY",
                "☐ No identified data owner willing to provide access - DISQUALIFY",
                "☐ Use case would require >24 months to production - DEFER",
                "☐ Active legal dispute about data ownership - PAUSE pending resolution",
                "☐ Use case requires AI capability that doesn't exist yet - MOVE TO RESEARCH BACKLOG",
              ],
            },
          ],
        },
        {
          item: "Estimate rough implementation timeline and cost",
          templateTitle: "AI Project Estimation Worksheet",
          templateType: "worksheet",
          instructions: "Build a phase-by-phase estimate. Always add 30% contingency for data issues and 20% for integration surprises. This is a rough order of magnitude (ROM) estimate ±50%.",
          sections: [
            {
              heading: "Phase-by-Phase Estimates",
              items: [
                "Discovery & scoping: ___ weeks | £/$ ___ | Who: ___",
                "Data collection & preparation: ___ weeks | £/$ ___ | Who: ___",
                "Model development & initial testing: ___ weeks | £/$ ___ | Who: ___",
                "Integration with existing systems: ___ weeks | £/$ ___ | Who: ___",
                "User testing, validation & refinement: ___ weeks | £/$ ___ | Who: ___",
                "Deployment & go-live: ___ weeks | £/$ ___ | Who: ___",
                "Monitoring setup & handover: ___ weeks | £/$ ___ | Who: ___",
              ],
            },
            {
              heading: "Cost Components",
              items: [
                "Cloud compute (GPU training + serving): £/$ ___ /month × ___ months = £/$ ___",
                "Tooling & licences (MLflow, vector DB, etc): £/$ ___ /month",
                "External vendor / consulting fees: £/$ ___",
                "Internal FTE time (× hourly rate): £/$ ___",
                "Change management & training: £/$ ___",
                "Sub-total: £/$ ___ | + 30% contingency: £/$ ___ | TOTAL ROM: £/$ ___",
              ],
            },
          ],
        },
        {
          item: "Identify data requirements per use case",
          templateTitle: "Data Requirements Assessment per Use Case",
          templateType: "template",
          instructions: "Complete one section per candidate use case. Share with data engineering to validate feasibility before committing to a pilot.",
          sections: [
            {
              heading: "Data Inputs Required",
              items: [
                "Source systems: ___________________________",
                "Data types needed: ☐ Structured/tabular  ☐ Unstructured text  ☐ Images  ☐ Audio  ☐ Time series  ☐ Graph",
                "Volume required: ___ rows/records minimum for training",
                "Freshness/latency requirement: ☐ Real-time (<1s)  ☐ Near real-time (<1min)  ☐ Batch (daily/weekly)",
                "Historical depth required: ___ months/years of history",
              ],
            },
            {
              heading: "Data Access & Permissions",
              items: [
                "Data owner / steward name: ___________________________",
                "Current access level: ☐ Already accessible  ☐ Requires approval  ☐ No access pathway",
                "Legal basis for processing (GDPR): ☐ Consent  ☐ Contract  ☐ Legitimate interest  ☐ Legal obligation",
                "Time to obtain full access: ___ weeks",
              ],
            },
            {
              heading: "Data Gaps & Mitigations",
              items: [
                "Gap 1: ___________________ | Mitigation: ☐ Collect new data  ☐ Buy/license  ☐ Synthetic data  ☐ Reduce scope",
                "Gap 2: ___________________ | Mitigation: ☐ Collect new data  ☐ Buy/license  ☐ Synthetic data  ☐ Reduce scope",
                "Labelling requirements: ___ examples to label | Estimated effort: ___ person-hours",
                "Overall data readiness: ☐ Ready now  ☐ Ready in ___ weeks  ☐ Blocker - escalate",
              ],
            },
          ],
        },
        {
          item: "Assess regulatory/compliance constraints",
          templateTitle: "Regulatory Constraint Screening Checklist",
          templateType: "questionnaire",
          instructions: "Screen each use case for regulatory constraints before committing resources. High-risk AI under EU AI Act requires conformity assessment - identify early to plan accordingly.",
          sections: [
            {
              heading: "High-Risk AI Screening (EU AI Act Annex III)",
              items: [
                "Does use case involve employment/worker management decisions: ☐ Yes - HIGH RISK  ☐ No",
                "Does use case affect credit scoring or insurance pricing: ☐ Yes - HIGH RISK  ☐ No",
                "Does use case involve healthcare diagnosis or treatment decisions: ☐ Yes - HIGH RISK  ☐ No",
                "Does use case involve law enforcement or border control: ☐ Yes - HIGH RISK  ☐ No",
                "Does use case affect access to education or essential services: ☐ Yes - HIGH RISK  ☐ No",
                "Does use case use biometric identification in public spaces: ☐ Yes - PROHIBITED in EU  ☐ No",
              ],
            },
            {
              heading: "Required Controls by Risk Level",
              items: [
                "HIGH RISK: Conformity assessment, human oversight mechanism, bias testing, full audit trail, registration in EU database",
                "MEDIUM RISK: Transparency notice to users, opt-out mechanism, regular bias monitoring",
                "LOW RISK: Standard GDPR obligations, internal ethics review",
                "Sector-specific rules: ☐ FDA AI/ML SaMD (healthcare)  ☐ FCA AI principles (UK finance)  ☐ SR 11-7 (US banking model risk)  ☐ Other: ___",
              ],
            },
          ],
        },
        {
          item: "Map use cases to organizational strategic goals",
          templateTitle: "Strategic Alignment Matrix",
          templateType: "matrix",
          instructions: "List your organisation's top 5 strategic priorities for this year, then rate how strongly each use case supports each goal (0=None, 1=Weak, 2=Moderate, 3=Strong).",
          sections: [
            {
              heading: "Strategic Priorities & Alignment Grid",
              items: [
                "Strategic Priority 1: ___________________________ (weight: ___)",
                "Strategic Priority 2: ___________________________ (weight: ___)",
                "Strategic Priority 3: ___________________________ (weight: ___)",
                "Strategic Priority 4: ___________________________ (weight: ___)",
                "Strategic Priority 5: ___________________________ (weight: ___)",
                "Use Case | P1 | P2 | P3 | P4 | P5 | Weighted Total | Strategic Sponsor",
              ],
            },
            {
              heading: "Final Recommendation",
              items: [
                "Top use case by combined impact + feasibility + strategic alignment: ___",
                "Recommended Pilot 1: ___________________ | Owner: ___ | Timeline: ___ | Budget: £/$ ___",
                "Recommended Pilot 2: ___________________ | Owner: ___ | Timeline: ___ | Budget: £/$ ___",
                "Strategic bets (high impact, harder): ___________________ - revisit in 12 months",
                "Rejected / deferred use cases and reasons: ___________________________",
              ],
            },
          ],
        },
        {
          item: "Produce prioritized use case ranking and recommendation",
          templateTitle: "AI Use Case Prioritisation Report Template",
          templateType: "template",
          instructions: "Compile the prioritisation output into this one-pager for executive sign-off. Keep it concise - executives read the summary; details are in appendices.",
          sections: [
            {
              heading: "Executive Summary",
              items: [
                "We evaluated ___ AI use cases across ___ business units.",
                "Recommended for immediate pilot: ___ (Impact: ___, Feasibility: ___, Est. ROI: ___)",
                "Total estimated investment for recommended pilots: £/$ ___ over ___ months",
                "Expected aggregate annual value at scale: £/$ ___",
                "Decision requested: Approve pilot portfolio and release budget by [date]",
              ],
            },
            {
              heading: "Prioritisation Matrix Summary",
              items: [
                "QUICK WINS (High feasibility, High impact) - pilot immediately: ___________________________",
                "STRATEGIC BETS (Lower feasibility, High impact) - invest in capability first: ___________________________",
                "FILL-INS (High feasibility, Lower impact) - backlog for later: ___________________________",
                "NOT RECOMMENDED (Low feasibility, Low impact) - archived: ___________________________",
              ],
            },
            {
              heading: "Approved Pilot Record",
              items: [
                "Pilot 1: Name | Owner | Start date | End date | KPIs | Budget | Approved by:",
                "Pilot 2: Name | Owner | Start date | End date | KPIs | Budget | Approved by:",
                "Next review date: ___ | Criteria to advance to scale: ___",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Stakeholder Alignment Workshop",
      level: "executive",
      desc: "Templates for getting leadership buy-in.",
      guidance: "Run a half-day workshop with C-suite and senior leadership to align on AI vision, address concerns, establish governance principles, and secure sponsorship for the first pilot project.",
      checklist: [
        {
          item: "Prepare executive AI briefing deck (current capabilities)",
          templateTitle: "Executive AI State-of-the-Art Briefing Template",
          templateType: "template",
          instructions: "Build a 15-slide briefing tailored to your industry. Lead with business outcomes, not technology. Use competitor examples and verified ROI data to build urgency.",
          sections: [
            {
              heading: "Briefing Structure (15 slides)",
              items: [
                "Slide 1–2: The AI moment - why now matters (market context, adoption inflection point)",
                "Slide 3–4: What AI can do today - concrete capability examples with business outcomes",
                "Slide 5–6: What AI cannot do - managing expectations, common myths debunked",
                "Slide 7–8: Your industry's AI landscape - who is ahead, case studies with ROI data",
                "Slide 9–10: Our AI position today - honest readiness assessment results",
                "Slide 11–12: The opportunity - top 3 use cases and projected value",
                "Slide 13–14: Investment required and governance needed",
                "Slide 15: Recommendation and decision needed today",
              ],
            },
            {
              heading: "Evidence & Data Sources",
              items: [
                "McKinsey Global AI Survey (annual) - sector-specific AI adoption rates",
                "Stanford AI Index Report - capability benchmarks and investment trends",
                "Competitor AI announcements - public earnings calls, press releases, LinkedIn",
                "Industry analyst reports (Gartner, IDC, Forrester) on AI ROI in your sector",
                "3–5 named case studies from your industry with quantified outcomes",
              ],
            },
          ],
        },
        {
          item: "Define 3-year AI vision statement with leadership",
          templateTitle: "AI Vision Statement Workshop Kit",
          templateType: "template",
          instructions: "Use the formula below to draft a vision statement. Allow 30 minutes for individual drafts, then converge on a combined statement. Test with the validation questions before finalising.",
          sections: [
            {
              heading: "Vision Statement Formula",
              items: [
                "Formula: 'By [year], [organisation] will use AI to [specific capability] enabling [measurable outcome] for [key stakeholder].'",
                "Example (Retail): 'By 2027, Acme Retail will use AI to personalise every customer interaction, enabling a 20% increase in repeat purchase rate and reducing returns by 15%.'",
                "Example (Healthcare): 'By 2027, City Hospital will use AI to augment clinical decision-making, enabling 30% faster diagnosis and reducing diagnostic errors by 25%.'",
                "Example (Financial Services): 'By 2027, First Bank will use AI to automate credit risk assessment, enabling instant lending decisions for 80% of applications while reducing default rates by 10%.'",
              ],
            },
            {
              heading: "Vision Validation Questions",
              items: [
                "Is it ambitious but achievable within the timeframe: ☐ Yes  ☐ No - revise",
                "Does it align with company values and ethical commitments: ☐ Yes  ☐ No - revise",
                "Can every employee understand it in plain language: ☐ Yes  ☐ No - simplify",
                "Does it guide resource allocation decisions: ☐ Yes  ☐ No - make more specific",
                "Is there a measurable outcome embedded: ☐ Yes  ☐ No - add metrics",
                "Final agreed vision statement: ___________________________",
                "Approved by (names & roles): ___ | Date: ___",
              ],
            },
          ],
        },
        {
          item: "Identify and address executive concerns and fears",
          templateTitle: "Executive AI Concern Mapping & Response Framework",
          templateType: "worksheet",
          instructions: "Collect concerns anonymously before the workshop. Categorise and respond with evidence. Don't dismiss concerns - they often surface real risks that need mitigation plans.",
          sections: [
            {
              heading: "Common Executive Concerns - Pre-populated Responses",
              items: [
                "CONCERN: 'AI will eliminate jobs and damage morale' - RESPONSE: AI typically augments rather than eliminates; share specific examples of role evolution, commit to retraining programme",
                "CONCERN: 'We'll spend millions and get nothing' - RESPONSE: Start with small, scoped pilots with clear kill criteria; share comparable ROI case studies",
                "CONCERN: 'AI decisions can't be explained or trusted' - RESPONSE: Explainable AI techniques + human oversight requirements; show examples of explainability in practice",
                "CONCERN: 'We'll break privacy regulations and get fined' - RESPONSE: Governance framework + DPO involvement + privacy-by-design; reference sector-specific compliance approach",
                "CONCERN: 'Our data isn't good enough' - RESPONSE: This is usually true; data quality programme must precede AI; show phased approach",
              ],
            },
            {
              heading: "Concern Response Template",
              items: [
                "Concern: ___________________ | Raised by: ___ | Category: Job loss / Cost / Regulation / Trust / Data / Other",
                "Is this concern validated by evidence: ☐ Yes  ☐ Partially  ☐ No",
                "Response / mitigation: ___________________________",
                "Owner of mitigation: ___ | Timeline: ___ | Review date: ___",
                "How will we communicate this mitigation to the organisation: ___",
              ],
            },
          ],
        },
        {
          item: "Establish AI steering committee membership",
          templateTitle: "AI Steering Committee Charter Template",
          templateType: "template",
          instructions: "Adopt this charter template as the founding document of your AI governance committee. Agree membership before the first meeting - include both technology and business leaders.",
          sections: [
            {
              heading: "Charter: Purpose & Mandate",
              items: [
                "Purpose: The AI Steering Committee provides strategic direction and oversight for all AI initiatives at [Organisation].",
                "Authority: Approves AI investments >£[threshold], AI policies, and high-risk AI use case deployments.",
                "Reports to: [Board / CEO / ExCo] - quarterly written updates, annual in-person review.",
                "Relationship to other bodies: Works alongside [Risk Committee / Tech Council / Ethics Board] - describe handoffs.",
              ],
            },
            {
              heading: "Membership & Governance",
              items: [
                "Chair: [CTO / CDO / COO / CEO] - name: ___",
                "Standing members: CISO, CFO, CHRO, Chief Data Officer, Legal Counsel, 2 × Business Unit heads",
                "Invited (non-standing): External AI advisor, Regulator liaison (if applicable), DPO",
                "Quorum: Chair + 4 standing members required for binding decisions",
                "Meeting frequency: Monthly (30 min) + Quarterly (90 min deep-dive) + Ad-hoc for incidents",
                "Decision protocol: Consensus preferred; Chair has casting vote on tie; veto requires written rationale",
              ],
            },
            {
              heading: "Standing Agenda Items",
              items: [
                "1. AI portfolio status - RAG against KPIs (15 min)",
                "2. New use case approval requests (10 min)",
                "3. Incident and risk review (10 min)",
                "4. Regulatory and policy updates (5 min)",
                "5. Budget and resource decisions (10 min)",
                "6. AOB and next steps (5 min)",
              ],
            },
          ],
        },
        {
          item: "Agree on pilot project selection criteria",
          templateTitle: "Pilot Selection Criteria Agreement Template",
          templateType: "template",
          instructions: "Agree and document selection criteria before evaluating candidates - not after. This prevents post-hoc rationalisation and ensures consistent decisions.",
          sections: [
            {
              heading: "Must-Have Criteria (all must be met)",
              items: [
                "☐ Sufficient clean data exists or can be obtained within 4 weeks",
                "☐ Clear measurable success metric defined and baseline captured",
                "☐ Named executive sponsor committed to attend monthly reviews",
                "☐ Pilot can deliver first results within 90 days",
                "☐ Dedicated team capacity available (not reliant on 'spare time')",
                "☐ Regulatory/legal review completed and no blockers identified",
              ],
            },
            {
              heading: "Scoring Criteria & Weights",
              items: [
                "Business impact potential (40%): score ___ / 5 × 40% = ___",
                "Technical feasibility (30%): score ___ / 5 × 30% = ___",
                "Strategic fit (20%): score ___ / 5 × 20% = ___",
                "Learning / knowledge value (10%): score ___ / 5 × 10% = ___",
                "TOTAL weighted score: ___ / 5   Minimum to proceed: 3.0",
              ],
            },
            {
              heading: "Approved Pilot Record",
              items: [
                "Pilot Name: ___________________ | Score: ___ / 5",
                "Owner: ___ | Executive Sponsor: ___ | Start: ___ | End: ___",
                "Success Criteria: 1) ___ 2) ___ 3) ___",
                "Budget approved: £/$ ___ | Approved by: ___ | Date: ___",
                "Kill criteria (conditions that trigger early termination): ___________________________",
              ],
            },
          ],
        },
        {
          item: "Secure executive sponsorship and budget approval",
          templateTitle: "AI Programme Business Case Template",
          templateType: "template",
          instructions: "Build this one-page business case for CFO and board approval. Attach detailed financial model as appendix. Focus on risk-adjusted ROI and strategic alignment.",
          sections: [
            {
              heading: "Financial Summary",
              items: [
                "Year 1 investment: £/$ ___ (build: ___ + run: ___ + change mgmt: ___)",
                "Year 2 investment: £/$ ___ (primarily run + optimise)",
                "Year 3 investment: £/$ ___ (scale + new use cases)",
                "Year 1 expected benefit: £/$ ___ | Year 2: £/$ ___ | Year 3: £/$ ___",
                "Net 3-year NPV (at ___% discount rate): £/$ ___",
                "Payback period: ___ months | IRR: ___% | Confidence: ☐ High  ☐ Medium  ☐ Low",
              ],
            },
            {
              heading: "Top 5 Risks",
              items: [
                "Risk 1: ___________________ | Likelihood: H/M/L | Impact: H/M/L | Mitigation: ___",
                "Risk 2: ___________________ | Likelihood: H/M/L | Impact: H/M/L | Mitigation: ___",
                "Risk 3: ___________________ | Likelihood: H/M/L | Impact: H/M/L | Mitigation: ___",
                "Risk 4: ___________________ | Likelihood: H/M/L | Impact: H/M/L | Mitigation: ___",
                "Risk 5: ___________________ | Likelihood: H/M/L | Impact: H/M/L | Mitigation: ___",
              ],
            },
            {
              heading: "Approval Sign-off",
              items: [
                "Recommended by: [AI Lead] ___________________ Date: ___",
                "Technical approval: [CTO] ___________________ Date: ___",
                "Financial approval: [CFO] ___________________ Date: ___",
                "Final approval: [CEO/Board] ___________________ Date: ___",
                "Budget code: ___ | Finance system reference: ___",
              ],
            },
          ],
        },
      ],
    },
  ],
};
