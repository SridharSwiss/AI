import type { Phase } from "./playbooks-types";

export const phase2: Phase = {
  phase: "pilot",
  label: "Phase 2: Pilot",
  color: "from-violet-500 to-purple-500",
  bg: "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/50",
  description: "Run a contained proof-of-concept to validate and learn.",
  playbooks: [
    {
      title: "Pilot Project Charter Template",
      level: "manager",
      desc: "Define scope, success metrics, and risk controls.",
      guidance: "A strong pilot charter limits scope, defines measurable success criteria before you start, and includes explicit risk mitigation plans. Keep pilots under 90 days with a defined end state: scale, learn, or kill.",
      checklist: [
        {
          item: "Define pilot scope and explicit boundaries",
          templateTitle: "Pilot Scope Definition Worksheet",
          templateType: "worksheet",
          instructions: "Explicitly define what is IN and OUT of scope. Ambiguity in scope leads to scope creep, which kills pilots. Get sign-off from sponsor and team before kickoff.",
          sections: [
            {
              heading: "In-Scope Declaration",
              items: [
                "Business process(es) included: ___________________________",
                "User groups included: ___________________________",
                "Data sources included: ___________________________",
                "Geographies / markets included: ___________________________",
                "Time period for pilot: From ___ to ___ (max 90 days)",
                "System(s) in scope: ___________________________",
              ],
            },
            {
              heading: "Out-of-Scope Declaration",
              items: [
                "Explicitly excluded processes: ___________________________",
                "Excluded user groups: ___________________________",
                "Excluded data sources: ___________________________",
                "What happens to scope requests outside this boundary: ☐ Log and defer  ☐ Escalate to sponsor  ☐ Add to Phase 2 backlog",
              ],
            },
            {
              heading: "Scope Change Control",
              items: [
                "Scope change request process: All requests submitted to Project Manager in writing",
                "Who approves scope changes: Executive Sponsor + Project Manager joint sign-off",
                "Scope freeze date (after which no changes): ___________________________",
                "Scope sign-off: PM ___ | Sponsor ___ | Data Lead ___ | Date ___",
              ],
            },
          ],
        },
        {
          item: "Set 3-5 measurable success criteria (KPIs)",
          templateTitle: "Pilot KPI Definition & Baseline Template",
          templateType: "template",
          instructions: "Define every KPI before the pilot starts — not after. Capture the baseline today. Agree on minimum acceptable performance (not just target) so go/no-go decisions are objective.",
          sections: [
            {
              heading: "KPI Definition Table",
              items: [
                "KPI 1: Name ___ | Definition ___ | Measurement method ___ | Baseline ___ | Target ___ | Min acceptable ___ | Owner ___",
                "KPI 2: Name ___ | Definition ___ | Measurement method ___ | Baseline ___ | Target ___ | Min acceptable ___ | Owner ___",
                "KPI 3: Name ___ | Definition ___ | Measurement method ___ | Baseline ___ | Target ___ | Min acceptable ___ | Owner ___",
                "KPI 4 (optional): Name ___ | Baseline ___ | Target ___ | Min acceptable ___",
                "KPI 5 (optional): Name ___ | Baseline ___ | Target ___ | Min acceptable ___",
              ],
            },
            {
              heading: "KPI Examples by AI Type",
              items: [
                "NLP / Document processing: Accuracy ≥85%, Processing time reduction ≥50%, User satisfaction ≥4.0/5",
                "Predictive model: Precision ≥80%, Recall ≥75%, False positive rate ≤10%, AUC-ROC ≥0.80",
                "Recommendation engine: Click-through rate lift ≥15%, Conversion rate lift ≥10%, Revenue per user lift ≥5%",
                "Computer vision / QA: Defect detection rate ≥95%, False alarm rate ≤5%, Inspection throughput +200%",
                "Generative AI / Content: Human evaluation score ≥4/5, Time saved ≥60%, Revision rate ≤20%",
              ],
            },
            {
              heading: "Success / Fail / Redesign Criteria",
              items: [
                "SCALE (all KPIs met): All 3 primary KPIs at or above target → recommend production rollout",
                "ITERATE (partial success): ≥2 primary KPIs met, remainder within 20% of target → 4-week extension with specific fix",
                "KILL (<2 KPIs met): Return to use case selection; document lessons learned thoroughly",
                "Sign-off that these criteria are agreed: Sponsor ___ | PM ___ | Tech Lead ___ | Date ___",
              ],
            },
          ],
        },
        {
          item: "Identify pilot team and executive sponsor",
          templateTitle: "Pilot Team RACI Matrix",
          templateType: "matrix",
          instructions: "Complete the RACI for all key pilot decisions and deliverables. Every row must have exactly one Accountable (A). Share with the whole team at kickoff.",
          sections: [
            {
              heading: "Core Team Roles & Time Commitment",
              items: [
                "Executive Sponsor: ___ | Responsibilities: Budget, escalations, go/no-go | Commitment: 2 hrs/week",
                "Project Manager: ___ | Responsibilities: Plan, status, risk, stakeholders | Commitment: 100%",
                "ML / AI Engineer: ___ | Responsibilities: Model development, training, evaluation | Commitment: 100%",
                "Data Engineer: ___ | Responsibilities: Pipelines, data prep, feature engineering | Commitment: 75%",
                "Domain Expert / Business Analyst: ___ | Responsibilities: Requirements, validation, feedback | Commitment: 50%",
                "IT / Security Reviewer: ___ | Responsibilities: Security review, infrastructure | Commitment: 20%",
              ],
            },
            {
              heading: "RACI for Key Decisions",
              items: [
                "Decision: Project charter approval | R: PM | A: Sponsor | C: Tech Lead, Legal | I: Team",
                "Decision: Model architecture choice | R: ML Engineer | A: Tech Lead | C: PM, Domain Expert | I: Sponsor",
                "Decision: Go / No-go at midpoint | R: PM | A: Sponsor | C: All team | I: Stakeholders",
                "Decision: Vendor / tool selection | R: Tech Lead | A: PM | C: Security, Finance | I: Sponsor",
                "Decision: Scale / kill recommendation | R: PM | A: Sponsor | C: All | I: Board",
              ],
            },
          ],
        },
        {
          item: "Document data sources and access requirements",
          templateTitle: "Pilot Data Access & Preparation Plan",
          templateType: "template",
          instructions: "Confirm all data access BEFORE the pilot start date — data delays are the #1 cause of pilot overruns. If access isn't confirmed 2 weeks before start, escalate to sponsor immediately.",
          sections: [
            {
              heading: "Data Sources Required",
              items: [
                "Source 1: System ___ | Data type ___ | Volume ___ | Owner ___ | Current access level ___ | Access needed by ___",
                "Source 2: System ___ | Data type ___ | Volume ___ | Owner ___ | Current access level ___ | Access needed by ___",
                "Source 3: System ___ | Data type ___ | Volume ___ | Owner ___ | Current access level ___ | Access needed by ___",
                "Access confirmed: ☐ All sources confirmed  ☐ Pending: ___  ☐ Blocked: ___",
              ],
            },
            {
              heading: "Data Preparation Tasks",
              items: [
                "Cleaning tasks: ___________________ | Owner: ___ | Hours: ___ | Due: ___",
                "Labelling requirements: ___ examples to label | Tool: ___ | Owner: ___ | Due: ___",
                "Feature engineering: ___________________ | Owner: ___ | Hours: ___ | Due: ___",
                "Train/Val/Test split: ___% / ___% / ___% | Stratified: ☐ Yes  ☐ No",
                "Data ready date: ___ (must be ≥1 week before model development starts)",
              ],
            },
            {
              heading: "Data Governance for Pilot",
              items: [
                "Data handling agreement signed: ☐ Yes  ☐ Pending  ☐ Not required",
                "PII handling approach: ☐ Anonymised  ☐ Pseudonymised  ☐ Synthetic only  ☐ Not applicable",
                "Data deletion schedule post-pilot: Delete all training data by ___",
                "Access removal plan: Remove all pilot team access by ___ (within 5 days of pilot end)",
              ],
            },
          ],
        },
        {
          item: "Create 90-day pilot timeline with milestones",
          templateTitle: "90-Day Pilot Milestone Plan",
          templateType: "template",
          instructions: "Use this as your master timeline. Review progress weekly. Any milestone delayed >1 week should trigger a risk flag to the sponsor.",
          sections: [
            {
              heading: "Week 1–4: Foundations & Build",
              items: [
                "Week 1: Kickoff meeting, data access confirmed, tools provisioned, baseline metrics captured",
                "Week 2: Data exploration, quality assessment, data prep plan agreed",
                "Week 3: Data cleaning and feature engineering complete, model architecture selected",
                "Week 4: Initial model trained, first internal evaluation, Stakeholder Demo #1",
                "Milestone: 'Model v0.1 ready' — Target date: ___ | Owner: ___ | Status: ___",
              ],
            },
            {
              heading: "Week 5–8: Iterate & Test",
              items: [
                "Week 5–6: Model refinement based on Demo #1 feedback, hyperparameter tuning",
                "Week 7: Integration testing with target system, user acceptance testing (UAT) group 1",
                "Week 8: UAT group 2, Stakeholder Demo #2, mid-pilot KPI check",
                "Milestone: 'UAT complete, KPIs on track' — Target date: ___ | Owner: ___ | Status: ___",
              ],
            },
            {
              heading: "Week 9–12: Evaluate & Decide",
              items: [
                "Week 9–10: Final model training on full dataset, final validation metrics captured",
                "Week 11: Final KPI measurement, user satisfaction survey, cost capture",
                "Week 12: Lessons learned session, Scale/Kill recommendation document, Steering presentation",
                "Milestone: 'Scale/Kill decision made' — Target date: ___ | Owner: ___ | Status: ___",
              ],
            },
          ],
        },
        {
          item: "Define risk mitigation and rollback plan",
          templateTitle: "Pilot Risk Register & Rollback Plan",
          templateType: "template",
          instructions: "Identify risks before the pilot starts — not when they materialise. Pre-define rollback triggers so the team can act without delay if something goes wrong.",
          sections: [
            {
              heading: "Risk Register (Top Pilot Risks Pre-filled)",
              items: [
                "Risk: Data quality worse than expected | Likelihood: H | Impact: H | Mitigation: Allocate 2 extra weeks for data prep; trigger: if data score <3/5 after week 2",
                "Risk: Key team member unavailable | Likelihood: M | Impact: H | Mitigation: Cross-train backup; document all decisions; trigger: unavailability >1 week",
                "Risk: Scope creep | Likelihood: H | Impact: M | Mitigation: Change control process; weekly scope review | trigger: any unscoped request",
                "Risk: User adoption failure | Likelihood: M | Impact: H | Mitigation: Involve users in design; early champions; trigger: satisfaction score <3/5 at week 8",
                "Risk: Model performance below minimum threshold | Likelihood: M | Impact: H | Mitigation: Define minimum performance bar; have alternative model approach ready",
              ],
            },
            {
              heading: "Rollback Triggers",
              items: [
                "IMMEDIATE rollback: Model accuracy drops >20% in production, data breach detected, severe bias incident identified",
                "PLANNED rollback: All 3 primary KPIs below minimum acceptable at week 8 evaluation",
                "SPONSOR-DISCRETION rollback: Budget exceeded by >25%, key dependency lost, strategic priority change",
              ],
            },
            {
              heading: "Rollback Procedure",
              items: [
                "Step 1: PM notifies Sponsor and Tech Lead immediately upon trigger",
                "Step 2: Disable AI feature / revert to manual process within ___ hours",
                "Step 3: Communicate to affected users: template — 'We are temporarily pausing [feature] while we investigate [issue]. [Manual process] is restored.'",
                "Step 4: Conduct root cause analysis within 5 business days",
                "Step 5: Lessons learned session within 2 weeks; recommendation to re-try or close",
              ],
            },
          ],
        },
        {
          item: "Establish user testing and feedback mechanisms",
          templateTitle: "Pilot User Testing & Feedback Plan",
          templateType: "template",
          instructions: "Involve real users in testing from week 4 onwards — not just at the end. Early feedback catches UX issues that don't show up in technical metrics.",
          sections: [
            {
              heading: "User Testing Groups",
              items: [
                "Group 1 (internal champions, week 4): ___ participants | Selection: volunteers who are pro-AI | Purpose: initial UX feedback",
                "Group 2 (representative sample, week 7): ___ participants | Selection: random stratified sample | Purpose: real-world accuracy + UX",
                "Group 3 (edge cases, week 9): ___ participants | Selection: users with most complex/unusual cases | Purpose: stress test",
                "Observer guidelines: Observe without helping; note hesitation points; record with permission",
              ],
            },
            {
              heading: "User Satisfaction Survey (Post-Testing)",
              items: [
                "Q1: The AI feature helped me complete my task more efficiently. (1=Strongly disagree → 5=Strongly agree): ___",
                "Q2: The AI output was accurate and trustworthy. (1=Strongly disagree → 5=Strongly agree): ___",
                "Q3: I understood why the AI gave the result it did. (1=Strongly disagree → 5=Strongly agree): ___",
                "Q4: I would recommend this AI feature to a colleague. (1=Strongly disagree → 5=Strongly agree): ___",
                "Q5: The AI feature is easy to use. (1=Strongly disagree → 5=Strongly agree): ___",
                "Open text: What would you most like to see improved? ___________________________",
                "Open text: Describe the most frustrating moment using this feature: ___________________________",
              ],
            },
            {
              heading: "Feedback-to-Action Loop",
              items: [
                "Feedback collection frequency: Weekly during UAT | Owner: PM",
                "Review process: PM + Tech Lead triage within 48 hrs; categorise as Fix Now / Next Sprint / Backlog / Won't Fix",
                "Communication back to users: Weekly update email — what we heard, what we changed",
                "Satisfaction target: Average ≥4.0/5 across all questions at final evaluation",
              ],
            },
          ],
        },
        {
          item: "Set weekly check-in cadence and reporting",
          templateTitle: "Pilot Status Report Template",
          templateType: "template",
          instructions: "Send weekly status reports every Friday. Keep them to one page. Traffic light (RAG) status forces honest assessment. Escalate anything Red immediately — don't wait for the report.",
          sections: [
            {
              heading: "Weekly Status Report Structure",
              items: [
                "Report date: ___ | Pilot name: ___ | Week: ___ of 12",
                "OVERALL STATUS: ☐ Green (on track)  ☐ Amber (at risk, mitigation in place)  ☐ Red (off track, action needed)",
                "KPI Dashboard: KPI 1: ___ (target: ___) | KPI 2: ___ (target: ___) | KPI 3: ___ (target: ___)",
                "Milestones this week — Completed: ___ | Missed: ___ (reason: ___)",
                "Milestones next week: ___________________________",
                "Issues & blockers (if Red/Amber): ___________________ | Action: ___ | Owner: ___ | Due: ___",
                "Budget: Spent to date £/$ ___ of £/$ ___ budget (___%) | Forecast to complete: £/$ ___",
                "Decisions needed from Sponsor: ___________________________",
              ],
            },
            {
              heading: "Monthly Steering Committee Report",
              items: [
                "Executive summary (3 bullets): 1) ___ 2) ___ 3) ___",
                "KPIs vs target (table): KPI | Baseline | Current | Target | Status",
                "Financial: Budget spent ___ | Forecast at completion ___ | Variance ___",
                "Top risks: Risk | Likelihood | Impact | Mitigation status",
                "Decisions requested: ___________________________",
                "Recommendation (at week 8 and 12): ☐ Scale  ☐ Extend/iterate  ☐ Kill",
              ],
            },
          ],
        },
        {
          item: "Document lessons learned process",
          templateTitle: "Pilot Lessons Learned Capture Template",
          templateType: "template",
          instructions: "Run lessons learned in final 2 weeks, not after the pilot closes. Use this as a blame-free session. The output feeds directly into the next pilot's planning documents.",
          sections: [
            {
              heading: "Lessons Learned Session Agenda (90 min)",
              items: [
                "0:00–0:10 — Facilitator intro: ground rules (no blame, focus on systems not people, all voices equal)",
                "0:10–0:30 — Round 1: What went well? (each person 2 sticky notes, read out, cluster)",
                "0:30–0:50 — Round 2: What didn't go well? What surprised us? (2 sticky notes each)",
                "0:50–1:10 — Round 3: What would we do differently? (prioritise top 5 by dot vote)",
                "1:10–1:30 — Action owners: for each top lesson, assign owner and next-pilot action",
              ],
            },
            {
              heading: "Lessons Capture Table",
              items: [
                "Lesson: ___________________ | Category: ☐ Technical  ☐ Process  ☐ People  ☐ Data  ☐ Stakeholder",
                "What happened: ___________________________",
                "Why it happened: ___________________________",
                "Recommendation for next pilot: ___________________________",
                "Owner of implementing change: ___ | Priority: High/Med/Low",
              ],
            },
            {
              heading: "Universal AI Pilot Lessons (Pre-filled)",
              items: [
                "Data quality always takes 2–3× longer than estimated — build in buffer from day 1",
                "Involve end users in design from week 1, not week 8 — UX surprises sink technically-good models",
                "Define the success criteria before starting, not when results look ambiguous",
                "Human-in-the-loop requirements are discovered late — ask regulatory/legal questions in week 1",
                "Model accuracy in development ≠ model accuracy in production — test on real production data early",
                "Change management effort should equal technical effort — it is not an afterthought",
              ],
            },
          ],
        },
        {
          item: "Define scale/kill decision criteria",
          templateTitle: "Pilot Scale / Kill Decision Framework",
          templateType: "framework",
          instructions: "Complete the scoring table at week 8 and week 12. Share with steering committee. Decision should be made in the committee meeting — not by any individual.",
          sections: [
            {
              heading: "Decision Scoring (Complete at Week 8 & 12)",
              items: [
                "Technical KPIs met (all ≥ minimum acceptable): ☐ Yes (3pts)  ☐ Partial (1pt)  ☐ No (0pts) → ___",
                "User satisfaction ≥4.0/5: ☐ Yes (2pts)  ☐ 3.5–3.9 (1pt)  ☐ <3.5 (0pts) → ___",
                "ROI positive within 12 months: ☐ Yes (3pts)  ☐ Break-even (1pt)  ☐ Negative (0pts) → ___",
                "No material compliance / ethics risks: ☐ Cleared (2pts)  ☐ Minor issue resolvable (1pt)  ☐ Blocker (0pts) → ___",
                "Infrastructure can scale 10×: ☐ Yes (2pts)  ☐ With investment (1pt)  ☐ No (0pts) → ___",
                "TOTAL: ___ / 12",
              ],
            },
            {
              heading: "Decision Thresholds & Post-Decision Actions",
              items: [
                "SCALE (≥9/12): Initiate production rollout planning; request scale budget; expand team",
                "ITERATE (6–8/12): 4-week extension; fix specific gaps; re-evaluate at end of extension",
                "KILL (<6/12): Conduct thorough lessons-learned; return to use case selection; do not re-try same approach",
                "SCALE path next steps: Technical handover plan, MLOps readiness review, change management ramp-up, budget request",
                "KILL path next steps: Data deletion, access removal, retrospective report to board, recognition of team's learnings",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Vendor Evaluation Scorecard",
      level: "manager",
      desc: "Compare AI vendors across 15 dimensions.",
      guidance: "Evaluate vendors across technical, commercial, and strategic dimensions. Weight criteria by your priorities. Never rely solely on demos — require proof-of-concept on your own data.",
      checklist: [
        {
          item: "Define must-have vs. nice-to-have requirements",
          templateTitle: "AI Vendor Requirements Definition Workshop",
          templateType: "template",
          instructions: "Run a 60-minute internal session before engaging any vendor. Define requirements first — never let a vendor demo define your requirements for you.",
          sections: [
            {
              heading: "Must-Have Requirements (deal-breakers if absent)",
              items: [
                "Functional: ___________________ | ___________________ | ___________________",
                "Security / compliance: SOC 2 Type II, GDPR data processing agreement, data deletion on request",
                "SLA: Uptime ≥___%, API response p95 ≤___ ms, support response ≤___ hrs",
                "Commercial: No vendor training on customer data by default, price cap in contract, exit clause",
                "Integration: REST API with full documentation, webhook support, sandbox environment",
              ],
            },
            {
              heading: "Automatic Disqualifiers",
              items: [
                "☐ No SOC 2 Type II report — DISQUALIFY",
                "☐ Refuses to sign a GDPR/UK GDPR data processing agreement — DISQUALIFY",
                "☐ No data deletion capability on request — DISQUALIFY",
                "☐ Data centres only in jurisdiction incompatible with our regulatory requirements — DISQUALIFY",
                "☐ No contractual SLA uptime guarantee — DISQUALIFY",
                "☐ Training data uses customer inputs without opt-out — DISQUALIFY",
              ],
            },
            {
              heading: "Nice-to-Have (weighted extras)",
              items: [
                "Fine-tuning / custom model training capability: weight ___",
                "On-premises or private cloud deployment option: weight ___",
                "Native integration with our existing stack (___): weight ___",
                "Dedicated customer success manager: weight ___",
                "Published model cards and bias testing reports: weight ___",
                "ISO 42001 AI management system certification: weight ___",
              ],
            },
          ],
        },
        {
          item: "Request security and compliance documentation (SOC2, ISO 27001)",
          templateTitle: "Vendor Security Documentation Request Template",
          templateType: "template",
          instructions: "Send this request to every shortlisted vendor within 48 hours of RFP. Give them 2 weeks to respond. Any vendor that cannot provide these documents within that window is a significant risk signal.",
          sections: [
            {
              heading: "Documents to Request",
              items: [
                "☐ SOC 2 Type II audit report (within last 12 months) — issued by accredited auditor",
                "☐ ISO 27001 / ISO 42001 certificate (current, in-scope for AI services)",
                "☐ Most recent penetration test executive summary (within last 12 months)",
                "☐ GDPR Data Processing Agreement (your jurisdiction's template, or vendor's DPA)",
                "☐ Full sub-processor list (name, location, purpose, security controls)",
                "☐ Data retention, deletion, and portability policy",
                "☐ Breach notification procedure (timeline and contacts)",
                "☐ Business continuity and disaster recovery plan summary",
              ],
            },
            {
              heading: "Review Checklist",
              items: [
                "SOC 2: Scope covers the services we will use? ☐ Yes  ☐ No | Qualified opinion? ☐ Clean  ☐ Qualified (review exceptions)",
                "Pen test: Conducted by reputable third party? ☐ Yes  ☐ No | Critical/High findings remediated? ☐ Yes  ☐ Open issues: ___",
                "Sub-processors: All in acceptable jurisdictions? ☐ Yes  ☐ No — flag: ___ | Can we restrict sub-processors? ☐ Yes  ☐ No",
                "Breach notification: <72 hours to notify us? ☐ Yes  ☐ No | Named contact provided? ☐ Yes  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Evaluate data privacy and model training practices",
          templateTitle: "Vendor Data Privacy Questionnaire",
          templateType: "questionnaire",
          instructions: "Send to vendor's security/privacy team. Require written responses — verbal assurances in a sales call are not contractually binding.",
          sections: [
            {
              heading: "Model Training & Data Use",
              items: [
                "Does the vendor train or fine-tune models using customer data by default? ☐ Yes  ☐ No  ☐ Opt-out available",
                "Is customer data used to improve shared/foundation models? ☐ Yes  ☐ No  ☐ With consent only",
                "Is customer data isolated from other customers at rest and in compute? ☐ Yes  ☐ No — explain: ___",
                "What is the vendor's data retention period for our inputs/outputs? ___________________________",
                "Can we request deletion of all our data? ☐ Yes — SLA: ___ days  ☐ No",
              ],
            },
            {
              heading: "Rights & Portability",
              items: [
                "Do we own all outputs generated using our data? ☐ Yes  ☐ Shared  ☐ No",
                "If we fine-tune a model, who owns the fine-tuned weights? ☐ Us  ☐ Vendor  ☐ Shared",
                "Can we export our fine-tuned model weights on contract termination? ☐ Yes  ☐ No",
                "Is there an exit assistance period (data export, knowledge transfer)? ☐ Yes — ___ months  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Assess API quality, documentation, and SLAs",
          templateTitle: "API & SLA Evaluation Scorecard",
          templateType: "scorecard",
          instructions: "Test the API in the vendor's sandbox before committing. Poor documentation and unexpected rate limits are major integration risks that appear after contract signature.",
          sections: [
            {
              heading: "API Quality (Rate 1–5)",
              items: [
                "Documentation completeness and clarity: ___ / 5",
                "SDK quality (Python/JS/other languages needed): ___ / 5",
                "API versioning and deprecation notice period (target: ≥6 months): ___ / 5",
                "Sandbox environment quality and data available: ___ / 5",
                "Error messages and debugging support: ___ / 5",
                "Webhook / event streaming support: ___ / 5",
              ],
            },
            {
              heading: "SLA Requirements vs Vendor Offer",
              items: [
                "Uptime SLA: We need ___% | Vendor offers ___% | Gap: ___",
                "API latency p50: We need ≤___ ms | Vendor offers ___ ms | Gap: ___",
                "API latency p99: We need ≤___ ms | Vendor offers ___ ms | Gap: ___",
                "Rate limit (requests/minute): We need ___ | Vendor offers ___ | Gap: ___",
                "Support response SLA (P1 critical): We need ≤___ hrs | Vendor offers ___ hrs | Gap: ___",
                "SLA credits / penalties if breached: ☐ Yes — ___% credit  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Compare pricing models and cost at scale",
          templateTitle: "AI Vendor Total Cost of Ownership Calculator",
          templateType: "worksheet",
          instructions: "Model costs at current usage, 10×, and 100× scale. AI costs can surprise — token-based pricing in particular grows super-linearly with usage. Always get a pricing cap in the contract.",
          sections: [
            {
              heading: "Pricing Model Comparison",
              items: [
                "Vendor A pricing model: ☐ Per API call  ☐ Per token  ☐ Per user/seat  ☐ Compute hours  ☐ Flat fee  ☐ Hybrid",
                "Vendor A cost at current usage: £/$ ___ /month",
                "Vendor A cost at 10× usage: £/$ ___ /month",
                "Vendor A cost at 100× usage: £/$ ___ /month",
                "Vendor B cost at current / 10× / 100× usage: £/$ ___ / ___ / ___",
                "Vendor C cost at current / 10× / 100× usage: £/$ ___ / ___ / ___",
              ],
            },
            {
              heading: "Total Cost of Ownership (Annual)",
              items: [
                "API/usage costs: £/$ ___",
                "Platform/subscription fees: £/$ ___",
                "Storage costs: £/$ ___",
                "Egress / data transfer costs: £/$ ___",
                "Support tier upgrade: £/$ ___",
                "Professional services / onboarding: £/$ ___",
                "Internal integration engineering time (FTE cost): £/$ ___",
                "TOTAL YEAR 1 TCO: £/$ ___ | YEAR 2 (est.): £/$ ___ | YEAR 3 (est.): £/$ ___",
              ],
            },
          ],
        },
        {
          item: "Check reference customers in your industry",
          templateTitle: "Vendor Reference Check Script",
          templateType: "template",
          instructions: "Request 3 references in your industry or at similar scale. Call them — don't accept written testimonials. 30-minute call with structured questions yields far more than a case study PDF.",
          sections: [
            {
              heading: "Reference Check Questions",
              items: [
                "How long have you been using [vendor] and what is your primary use case?",
                "What was the biggest challenge during implementation — and how did the vendor respond?",
                "How accurate/reliable is the model in production vs. what was promised in the demo?",
                "How is their support team? Can you give me an example of an incident and how it was handled?",
                "Has pricing changed since you signed? Any surprises in invoicing?",
                "If you could change one thing about the vendor, what would it be?",
                "On a scale of 1–10, how likely are you to renew? What would make you switch?",
              ],
            },
            {
              heading: "Reference Summary Scoring",
              items: [
                "Reference 1 — Company: ___ | Contact: ___ | Overall score: ___ / 10 | Key insight: ___",
                "Reference 2 — Company: ___ | Contact: ___ | Overall score: ___ / 10 | Key insight: ___",
                "Reference 3 — Company: ___ | Contact: ___ | Overall score: ___ / 10 | Key insight: ___",
                "Common themes (positive): ___________________________",
                "Common concerns raised: ___________________________",
                "Reference check recommendation: ☐ Proceed  ☐ Proceed with caution  ☐ Do not proceed",
              ],
            },
          ],
        },
        {
          item: "Evaluate vendor financial stability and roadmap",
          templateTitle: "Vendor Viability Assessment",
          templateType: "template",
          instructions: "For startups especially, assess runway and dependency risk. Vendor failure mid-project is a serious operational risk. Build contractual protections regardless of vendor size.",
          sections: [
            {
              heading: "Financial Health Indicators",
              items: [
                "Company type: ☐ Public (ticker: ___)  ☐ Private VC-backed  ☐ Private bootstrapped  ☐ Subsidiary of ___",
                "For startups: Total funding raised: £/$ ___ | Last round: Series ___ | Estimated runway: ___ months",
                "Approximate ARR (if available): £/$ ___ | Customer count: ___ | Growth rate: ___%/yr",
                "Key person / founder dependency: ☐ High risk  ☐ Medium  ☐ Low — explain: ___",
                "Acquisition rumours or strategic review: ☐ Yes — concern: ___  ☐ No",
              ],
            },
            {
              heading: "Roadmap Assessment",
              items: [
                "12-month product roadmap shared: ☐ Yes  ☐ High-level only  ☐ No",
                "Roadmap addresses our key needs: ☐ Fully  ☐ Partially  ☐ No",
                "Release cadence (past 12 months): ___ major releases | ___ minor releases",
                "Our feature requests go through: ☐ Named contact  ☐ Public tracker  ☐ No clear process",
              ],
            },
            {
              heading: "Contractual Protections",
              items: [
                "Source code escrow: ☐ Offered  ☐ Not offered  ☐ Negotiating",
                "Continuity of service on acquisition: ☐ Contractually guaranteed  ☐ Not guaranteed",
                "Data export on vendor closure: ☐ Guaranteed  ☐ Not specified",
                "Price lock period: ___ years at current pricing with ≤___% annual increase",
              ],
            },
          ],
        },
        {
          item: "Test performance on sample of your actual data",
          templateTitle: "Vendor Proof-of-Concept Evaluation Protocol",
          templateType: "template",
          instructions: "Run a blind POC on a representative sample of your real data — not the vendor's curated demo data. Score objectively using pre-defined rubric. Share rubric with vendor before POC starts.",
          sections: [
            {
              heading: "POC Setup",
              items: [
                "Data sample: ___ examples, representative of production distribution (not cherry-picked)",
                "Evaluation metrics (pre-defined): Accuracy ___ | Precision ___ | Recall ___ | Latency ___ | Other: ___",
                "Test scenarios: Typical case ___ | Edge case ___ | Adversarial case ___ | Out-of-distribution case ___",
                "Blind evaluation: Evaluators should not know which vendor produced which output — randomise output IDs",
                "Duration: ___ days of POC access per vendor",
              ],
            },
            {
              heading: "POC Results Table",
              items: [
                "Metric | Target | Vendor A | Vendor B | Vendor C",
                "Accuracy: ___ | ___ | ___ | ___",
                "Latency p50 (ms): ___ | ___ | ___ | ___",
                "Failure mode description (what breaks and how): Vendor A: ___ | Vendor B: ___ | Vendor C: ___",
                "Qualitative quality (human evaluator score 1–5): Vendor A: ___ | Vendor B: ___ | Vendor C: ___",
                "POC Recommendation: ☐ Vendor A  ☐ Vendor B  ☐ Vendor C  ☐ None — restart selection",
              ],
            },
          ],
        },
        {
          item: "Assess integration complexity with existing systems",
          templateTitle: "Vendor Integration Complexity Assessment",
          templateType: "questionnaire",
          instructions: "Complete with your integration/platform engineering team. Integration complexity is consistently underestimated — get engineering input before commercial negotiations.",
          sections: [
            {
              heading: "Integration Options Available",
              items: [
                "REST API: ☐ Yes  ☐ No | Auth method: ☐ API key  ☐ OAuth 2.0  ☐ SAML SSO",
                "Native connector for our stack: ☐ Yes — for: ___  ☐ No",
                "iPaaS connector (Zapier / Make / MuleSoft): ☐ Yes  ☐ No",
                "Webhook / event-driven: ☐ Yes  ☐ No",
                "Batch file / SFTP: ☐ Yes  ☐ No",
                "On-premises or private cloud deployment: ☐ Yes  ☐ No",
              ],
            },
            {
              heading: "Integration Effort Estimates",
              items: [
                "Estimated days to integrate with [CRM]: ___ days | Risk: H/M/L",
                "Estimated days to integrate with [ERP]: ___ days | Risk: H/M/L",
                "Estimated days to integrate with [data warehouse]: ___ days | Risk: H/M/L",
                "Estimated days to integrate with [customer-facing app]: ___ days | Risk: H/M/L",
                "Total integration estimate: ___ engineering-days | Cost: £/$ ___",
                "Integration complexity rating: ☐ Simple (<2 weeks)  ☐ Moderate (2–6 weeks)  ☐ Complex (>6 weeks)",
              ],
            },
          ],
        },
        {
          item: "Review support model (enterprise vs. self-serve)",
          templateTitle: "Vendor Support Model Evaluation",
          templateType: "scorecard",
          instructions: "Support quality matters most when something goes wrong at 2am. Test support responsiveness during the POC — open a non-urgent ticket and measure actual response time.",
          sections: [
            {
              heading: "Support Tier Assessment",
              items: [
                "Support tier we would purchase: ☐ Community  ☐ Business  ☐ Enterprise  ☐ Dedicated",
                "Dedicated Customer Success Manager (CSM): ☐ Yes — min response time: ___  ☐ No",
                "P1 critical incident response time (contractual): ___ hours",
                "P2 high severity response time: ___ hours",
                "P3/P4 response time: ___ hours / ___ days",
                "24/7 support: ☐ Yes  ☐ Business hours only (timezone: ___)",
              ],
            },
            {
              heading: "Self-Service Resources (Rate 1–5)",
              items: [
                "Documentation quality and searchability: ___ / 5",
                "Community forum activity: ___ / 5",
                "Tutorial videos and worked examples: ___ / 5",
                "Status page with incident history: ___ / 5",
                "Changelog / release notes quality: ___ / 5",
              ],
            },
            {
              heading: "Support Test Results (During POC)",
              items: [
                "Ticket opened: ___ (non-urgent) | Response received: ___ | Time taken: ___ hours",
                "Quality of response (1=Useless, 5=Excellent): ___ / 5",
                "Was issue resolved on first contact: ☐ Yes  ☐ No — ___ contacts needed",
                "Support test overall verdict: ☐ Meets expectations  ☐ Concern  ☐ Disqualifying",
              ],
            },
          ],
        },
        {
          item: "Evaluate explainability and bias mitigation features",
          templateTitle: "AI Fairness & Explainability Assessment",
          templateType: "questionnaire",
          instructions: "For any AI system making decisions that affect people, explainability and fairness are non-negotiable. For EU AI Act high-risk systems, these requirements are legally mandated.",
          sections: [
            {
              heading: "Explainability Capabilities",
              items: [
                "Feature importance available (global): ☐ Yes  ☐ No  ☐ Via third-party (LIME/SHAP)",
                "Local explanations per decision: ☐ Yes  ☐ No",
                "Natural language explanations for end users: ☐ Yes  ☐ No",
                "Audit trail of decisions (tamper-evident log): ☐ Yes  ☐ No",
                "Explainability method: ☐ SHAP  ☐ LIME  ☐ Integrated Gradients  ☐ Attention weights  ☐ Proprietary  ☐ None",
              ],
            },
            {
              heading: "Bias Detection & Monitoring",
              items: [
                "Pre-deployment bias testing on protected attributes: ☐ Offered  ☐ Customer responsibility  ☐ Not available",
                "Disparate impact measurement: ☐ Built-in  ☐ API endpoint  ☐ Not available",
                "Production bias monitoring / drift detection: ☐ Yes  ☐ No",
                "Published model card with evaluation on diverse datasets: ☐ Yes  ☐ No",
                "Responsible AI team or published policy: ☐ Yes — link: ___  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Check model update/versioning policies",
          templateTitle: "Model Stability & Versioning Assessment",
          templateType: "questionnaire",
          instructions: "Unexpected model updates can break production applications. Understand the vendor's update policy before signing — version locking is a non-negotiable for production workloads.",
          sections: [
            {
              heading: "Model Update Policy",
              items: [
                "How often are models updated in the API: ☐ Continuous  ☐ Monthly  ☐ Quarterly  ☐ Explicit versioning only",
                "Advance notice period before breaking changes: ___ days (target: ≥90 days)",
                "Version locking available (pin to specific model version): ☐ Yes  ☐ No",
                "How long are older model versions supported after new release: ___ months",
                "Are updates automatic or opt-in: ☐ Automatic  ☐ Opt-in  ☐ Optional migration period",
              ],
            },
            {
              heading: "Regression Risk",
              items: [
                "Does vendor run regression testing before updates: ☐ Yes — benchmark shared  ☐ Yes — not shared  ☐ Unknown",
                "Performance deltas disclosed in changelogs: ☐ Yes  ☐ No",
                "Can we request rollback to previous version if update breaks our system: ☐ Yes  ☐ No",
                "Model update notification channel: ☐ Email  ☐ Slack/Teams  ☐ Status page  ☐ No proactive notification",
              ],
            },
          ],
        },
        {
          item: "Assess vendor lock-in risks and exit clauses",
          templateTitle: "Vendor Lock-in Risk Assessment",
          templateType: "template",
          instructions: "Assess exit costs before signing. Vendor lock-in is the biggest long-term commercial risk in AI procurement. Negotiate exit protections into the contract — they are much harder to add later.",
          sections: [
            {
              heading: "Data & Model Portability",
              items: [
                "Can we export all our data on demand: ☐ Yes — format: ___ — time: ___ days  ☐ No",
                "Can we export fine-tuned model weights: ☐ Yes  ☐ No — who owns them: ___",
                "Are outputs in open, portable formats: ☐ Yes  ☐ Proprietary format",
                "Estimated switching cost to alternative vendor: ___ engineering-days | £/$ ___",
              ],
            },
            {
              heading: "Contract Protections to Negotiate",
              items: [
                "Termination for convenience clause (exit without cause): ☐ Standard  ☐ Negotiated  ☐ Refused",
                "Data deletion certification within ___ days of termination: ☐ Agreed  ☐ Pending",
                "Transition assistance period (vendor helps us migrate): ___ months | Cost: £/$ ___",
                "Price cap / annual increase limit: ≤___% per year contractually guaranteed",
                "Survival of data rights post-termination: ☐ Agreed  ☐ Not specified",
              ],
            },
          ],
        },
        {
          item: "Evaluate geographic data residency options",
          templateTitle: "Data Residency Requirements Matrix",
          templateType: "matrix",
          instructions: "Map your regulatory data residency requirements against each vendor's available options. For GDPR, data must remain in EEA or countries with adequacy decisions unless SCCs are in place.",
          sections: [
            {
              heading: "Your Residency Requirements",
              items: [
                "Data category 1: ___________________ | Must reside in: ___ | Regulatory basis: ___",
                "Data category 2: ___________________ | Must reside in: ___ | Regulatory basis: ___",
                "Data category 3: ___________________ | Must reside in: ___ | Regulatory basis: ___",
                "Cross-border transfer mechanism needed (if applicable): ☐ SCCs  ☐ Adequacy decision  ☐ BCRs  ☐ Not needed",
              ],
            },
            {
              heading: "Vendor Residency Options vs Requirements",
              items: [
                "EU (Germany / Ireland / Netherlands): ☐ Available  ☐ Not available — impact: ___",
                "UK: ☐ Available  ☐ Not available — impact: ___",
                "US (AWS us-east, us-west): ☐ Available  ☐ Not available — impact: ___",
                "APAC (Singapore / Tokyo / Sydney): ☐ Available  ☐ Not available — impact: ___",
                "Private cloud / on-premises in our data centre: ☐ Available  ☐ Not available",
                "Overall residency compliance: ☐ Fully compliant  ☐ Partially — workaround: ___  ☐ Not compliant — DISQUALIFY",
              ],
            },
          ],
        },
        {
          item: "Score and rank vendors; select top 2 for POC",
          templateTitle: "Vendor Final Scoring & Selection Worksheet",
          templateType: "scorecard",
          instructions: "Complete after all evaluations. Weight each criterion by your priorities. Share the weighted scoring with your steering committee — the score should inform, not replace, the decision.",
          sections: [
            {
              heading: "Weighted Scoring Matrix",
              items: [
                "Criterion | Weight | Vendor A | Vendor B | Vendor C",
                "Security & compliance (25%): ___ | ___ × 25% = ___ | ___ × 25% = ___ | ___ × 25% = ___",
                "Technical performance / POC results (20%): ___ | ___ | ___ | ___",
                "Total cost of ownership (15%): ___ | ___ | ___ | ___",
                "API quality & integration complexity (15%): ___ | ___ | ___ | ___",
                "Support & vendor viability (10%): ___ | ___ | ___ | ___",
                "Data privacy & lock-in risk (10%): ___ | ___ | ___ | ___",
                "Explainability & fairness (5%): ___ | ___ | ___ | ___",
                "TOTAL WEIGHTED SCORE: ___ | ___ | ___",
              ],
            },
            {
              heading: "Selection Decision Record",
              items: [
                "Selected for POC: Vendor ___ (score: ___) and Vendor ___ (score: ___)",
                "Rationale for selection: ___________________________",
                "Rationale for not selecting Vendor ___: ___________________________",
                "POC start date: ___ | POC duration: ___ weeks | Success criteria for POC winner selection: ___",
                "Approved by: ___ (PM) | ___ (Sponsor) | ___ (Tech Lead) | Date: ___",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "AI Ethics Checklist",
      level: "practitioner",
      desc: "Ensure fairness, transparency, and accountability.",
      guidance: "Ethics review is risk management, not a compliance checkbox. Engage affected stakeholders early. For high-stakes decisions (hiring, lending, healthcare), require bias testing before any user-facing deployment.",
      checklist: [
        {
          item: "Identify all groups affected by the AI system",
          templateTitle: "Stakeholder Impact Mapping Exercise",
          templateType: "worksheet",
          instructions: "Map all parties who could be helped or harmed by this AI system — including indirect parties and future users. This is the foundation of all subsequent ethics work.",
          sections: [
            {
              heading: "Affected Party Categories",
              items: [
                "Direct users (who interacts with the AI): ___________________ | Estimated count: ___",
                "Decision subjects (who AI decisions affect): ___________________ | Estimated count: ___",
                "Indirect parties (affected without interaction): ___________________ | Estimated count: ___",
                "Vulnerable groups (children, elderly, disabled, minority groups): ___________________ | Special protections needed: ___",
                "Third parties whose data is used: ___________________ | Consent obtained: ☐ Yes  ☐ No",
              ],
            },
            {
              heading: "Impact Severity Matrix",
              items: [
                "Group: ___ | Impact type: ☐ Financial  ☐ Employment  ☐ Freedom  ☐ Health  ☐ Dignity  ☐ Privacy | Severity: H/M/L",
                "Group: ___ | Impact type: ☐ Financial  ☐ Employment  ☐ Freedom  ☐ Health  ☐ Dignity  ☐ Privacy | Severity: H/M/L",
                "Group: ___ | Impact type: ☐ Financial  ☐ Employment  ☐ Freedom  ☐ Health  ☐ Dignity  ☐ Privacy | Severity: H/M/L",
                "Highest-risk group identified: ___________________ | Mitigation planned: ___",
                "Consultation with affected groups planned: ☐ Yes — method: ___  ☐ Not needed — rationale: ___",
              ],
            },
          ],
        },
        {
          item: "Test for bias across protected characteristics",
          templateTitle: "AI Bias Testing Protocol",
          templateType: "template",
          instructions: "Run bias tests before any user-facing deployment. Document results and set acceptance thresholds in advance — changing thresholds after seeing results invalidates the test.",
          sections: [
            {
              heading: "Bias Test Design",
              items: [
                "Protected characteristics to test: ☐ Age  ☐ Gender  ☐ Race/ethnicity  ☐ Disability  ☐ Religion  ☐ Nationality  ☐ Other: ___",
                "Test dataset requirements: balanced representation per group, minimum ___ examples per group",
                "Metrics to compute: Demographic parity | Equalised odds | Individual fairness | Calibration",
                "Acceptable disparity threshold (e.g. 80% rule): Maximum ___ ratio between best and worst group",
              ],
            },
            {
              heading: "Bias Test Results Template",
              items: [
                "Metric: Demographic Parity | Group A result: ___ | Group B result: ___ | Ratio: ___ | Pass/Fail: ___",
                "Metric: Equalised Odds (TPR) | Group A: ___ | Group B: ___ | Ratio: ___ | Pass/Fail: ___",
                "Metric: False Positive Rate | Group A: ___ | Group B: ___ | Ratio: ___ | Pass/Fail: ___",
                "Overall bias assessment: ☐ No significant bias detected  ☐ Bias detected — remediation required before deployment",
                "Remediation approach (if bias detected): ☐ Re-sample training data  ☐ Fairness constraints  ☐ Post-processing calibration  ☐ Redesign use case",
              ],
            },
          ],
        },
        {
          item: "Define human oversight and override mechanisms",
          templateTitle: "Human-in-the-Loop Design Template",
          templateType: "template",
          instructions: "Design human oversight proportional to risk. For high-stakes decisions, human review is mandatory under EU AI Act. Document the oversight mechanism clearly — vague commitments to 'human review' are not sufficient.",
          sections: [
            {
              heading: "Oversight Level Selection",
              items: [
                "LEVEL 5 — Human decides, AI advises only (mandatory for: criminal justice, medical diagnosis, significant financial decisions)",
                "LEVEL 4 — Human reviews all AI decisions before action (recommended for: employment, lending, insurance)",
                "LEVEL 3 — Human reviews sampled decisions + all flagged cases (suitable for: content moderation, customer segmentation)",
                "LEVEL 2 — Fully automated, human reviews metrics (suitable for: recommendations, personalisation, internal automation)",
                "Selected oversight level for this system: LEVEL ___ | Justification: ___",
              ],
            },
            {
              heading: "Override Mechanism Design",
              items: [
                "How does a human override an AI decision: ___________________________",
                "Override is logged: ☐ Yes — where: ___  ☐ No — not acceptable for high-risk systems",
                "Override reason is captured (mandatory for audit): ☐ Yes — free text / dropdown  ☐ No",
                "Override data fed back to improve model: ☐ Yes  ☐ No",
                "Override rate monitoring: ☐ Yes — alert if rate exceeds ___% | Owner: ___  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Document model decision factors for explainability",
          templateTitle: "Model Explainability Documentation Template",
          templateType: "template",
          instructions: "Complete for every model deployed to production. For EU AI Act high-risk systems, this documentation is legally required. Store in version control alongside the model.",
          sections: [
            {
              heading: "Model Card",
              items: [
                "Model name & version: ___________________________",
                "Model purpose (one sentence): ___________________________",
                "Intended users: ___________________ | Out-of-scope uses: ___________________",
                "Training data summary: ___ examples | Date range: ___ to ___ | Sources: ___",
                "Evaluation results: Accuracy ___ | Precision ___ | Recall ___ | F1 ___ | Test set size ___",
                "Known limitations: ___________________________",
                "Ethical considerations: ___________________________",
              ],
            },
            {
              heading: "Explanation Documentation",
              items: [
                "Global explanation — top 5 features driving model decisions: 1) ___ 2) ___ 3) ___ 4) ___ 5) ___",
                "User-facing explanation template: 'Our AI suggested [outcome] primarily because [top 2 factors in plain language].'",
                "Technical explanation method used: ☐ SHAP  ☐ LIME  ☐ Integrated Gradients  ☐ Attention  ☐ Other: ___",
                "Explanation available in UI: ☐ Yes — where: ___  ☐ On request  ☐ Not available",
                "Regulatory-grade explanation package available: ☐ Yes  ☐ No — build plan: ___",
              ],
            },
          ],
        },
        {
          item: "Review training data for representation and bias",
          templateTitle: "Training Data Audit Checklist",
          templateType: "template",
          instructions: "Garbage in, biased out. Audit training data before model development. Addressing data bias post-training is expensive — catching it pre-training is cheap.",
          sections: [
            {
              heading: "Data Source Audit",
              items: [
                "Source 1: ___ | Collection date: ___ | Collection method: ___ | Known biases: ___",
                "Source 2: ___ | Collection date: ___ | Collection method: ___ | Known biases: ___",
                "Overall representation of minority groups vs population baseline: Adequate ☐ / Underrepresented ☐ — groups: ___",
                "Historical bias risk (does data reflect past discriminatory practices): ☐ Yes — mitigate: ___  ☐ No",
              ],
            },
            {
              heading: "Label Quality & Remediation",
              items: [
                "Labelling team composition (are labellers representative of affected population): ___________________________",
                "Inter-annotator agreement score: ___ (target: ≥0.8 Cohen's Kappa)",
                "Labelling guidelines reviewed for implicit bias: ☐ Yes  ☐ No — review required",
                "Underrepresented groups — remediation plan: ☐ Oversample  ☐ Collect more data  ☐ Synthetic augmentation  ☐ Accept limitation and document",
              ],
            },
          ],
        },
        {
          item: "Establish user consent and data transparency practices",
          templateTitle: "User Consent & AI Transparency Framework",
          templateType: "framework",
          instructions: "Define what users must be told before, during, and after AI interaction. This is both an ethical requirement and a legal requirement under GDPR Article 13/14 and EU AI Act Article 52.",
          sections: [
            {
              heading: "Transparency Notice Template",
              items: [
                "Before AI interaction: 'This service uses artificial intelligence to [purpose]. Your [data types] will be processed to provide this service.'",
                "During AI interaction (if automated decision): 'This recommendation/decision was made by an AI system. [How to get human review].'",
                "After AI decision (right to explanation): 'The main factors in this decision were [top 2–3 factors]. To request a human review, [action].'",
                "Opt-out mechanism: ☐ Users can opt out of AI processing — describe: ___  ☐ Opt-out not applicable — rationale: ___",
              ],
            },
            {
              heading: "User Rights Implementation",
              items: [
                "Right to explanation (GDPR Art 22, EU AI Act): Implemented ☐ / In progress ☐ / Not yet ☐ | Method: ___",
                "Right to human review of automated decisions: Implemented ☐ / In progress ☐ / Not yet ☐ | Process: ___",
                "Right to object to AI processing: Implemented ☐ / In progress ☐ / Not yet ☐ | Channel: ___",
                "Response SLA for user rights requests: ___ business days | Owner: ___",
              ],
            },
          ],
        },
        {
          item: "Create feedback mechanism for impacted users",
          templateTitle: "AI User Feedback & Complaints System Design",
          templateType: "template",
          instructions: "Users need a clear, accessible way to report AI errors and unfair treatment. This is legally required for EU AI Act high-risk systems and ethically required for all AI systems.",
          sections: [
            {
              heading: "Feedback Channels",
              items: [
                "In-product feedback button: ☐ Yes — placement: ___  ☐ No",
                "Email/web form for AI complaints: ☐ Yes — address: ___  ☐ No",
                "Phone escalation for formal complaints: ☐ Yes — number: ___  ☐ No",
                "Accessible formats (for users with disabilities): ☐ Yes  ☐ No — plan: ___",
              ],
            },
            {
              heading: "Response SLAs & Process",
              items: [
                "Acknowledgement SLA: ___ hours (target: ≤24 hours)",
                "Investigation SLA: ___ business days (target: ≤5 days)",
                "Resolution SLA: ___ business days (target: ≤10 days)",
                "Escalation to ethics committee: Any complaint alleging systemic bias or discrimination",
                "Monthly feedback analysis: PM reviews trends, reports to steering committee",
              ],
            },
          ],
        },
        {
          item: "Define accountability chain for AI decisions",
          templateTitle: "AI Accountability Matrix",
          templateType: "matrix",
          instructions: "Every AI decision must have a named human accountable for it — 'the algorithm decided' is not an acceptable answer. This matrix makes accountability explicit.",
          sections: [
            {
              heading: "Accountability by Decision Type",
              items: [
                "Model design decisions → Accountable: ML Lead (___)  | Escalate to: CTO",
                "Deployment decisions → Accountable: Product Owner (___) | Escalate to: AI Steering Committee",
                "Individual AI-generated decisions affecting users → Accountable: Business Unit Owner (___) | Escalate to: COO",
                "System failures / incidents → Accountable: On-call Engineer (___) | Escalate to: CISO, CTO",
                "Regulatory compliance → Accountable: DPO (___) | Escalate to: Legal Counsel, CEO",
              ],
            },
            {
              heading: "Accountability Documentation",
              items: [
                "Accountability register updated: ☐ Yes — location: ___  ☐ No",
                "Accountability communicated to all named individuals: ☐ Yes  ☐ No",
                "Board accountability statement published: ☐ Yes  ☐ No (required for EU AI Act high-risk systems)",
                "Annual accountability review scheduled: ☐ Yes — date: ___  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Schedule periodic ethics reviews post-deployment",
          templateTitle: "AI Ethics Review Calendar & Agenda",
          templateType: "template",
          instructions: "Ethics is not a one-time pre-deployment review — it is ongoing. Schedule reviews in advance and treat them like financial audits. Unscheduled ethics reviews only happen after incidents.",
          sections: [
            {
              heading: "Review Cadence",
              items: [
                "Monthly: Metrics review (bias indicators, override rates, complaints), flagged cases review — 30 min",
                "Quarterly: Full bias testing re-run, complaints analysis, regulatory updates briefing, model performance vs baseline — 90 min",
                "Annually: Comprehensive ethics audit, external review (if high-risk AI), policy review, affected stakeholder consultation — half day",
                "Trigger-based: Any bias incident, regulatory change affecting this system, model update, significant scope change",
              ],
            },
            {
              heading: "Quarterly Ethics Review Agenda",
              items: [
                "1. Bias metrics dashboard (15 min): Are all metrics within thresholds? Trends?",
                "2. User complaints review (10 min): Volume, categories, themes, resolved vs open",
                "3. Override rate analysis (10 min): Rate trend, systematic patterns?",
                "4. Regulatory updates (10 min): New guidance, enforcement actions in sector",
                "5. Model changes since last review (5 min): Any updates that require re-testing?",
                "6. Action items from last review: Status update",
                "7. New action items and owners: Agree before close",
              ],
            },
          ],
        },
      ],
    },
  ],
};
