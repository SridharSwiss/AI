import type { CaseStudyData } from "./case-studies-types";

export const caseStudiesDataInsurance: CaseStudyData[] = [
  {
    id: "zurich-claims-ai",
    slug: "zurich-claims-ai",
    company: "Zurich Insurance Group",
    industry: "Insurance",
    title: "AI-Powered Claims Triage: Cutting Settlement Time by 40%",
    problem:
      "Zurich processed 6M+ property and casualty claims annually across 30+ countries. Manual triage meant complex claims sat in queues alongside simple ones, causing average settlement times of 17 days and customer satisfaction scores well below industry benchmarks.",
    solution:
      "Deployed an AI claims triage and automation platform using NLP to classify incoming claims by complexity, a computer vision model to assess vehicle and property damage from photos, and a rules-based automation engine to straight-through process low-complexity claims without human intervention.",
    outcome:
      "Simple claims now settle in under 24 hours through straight-through processing. Average settlement time dropped 40% across all claim types. Adjuster capacity freed up for complex cases improved quality scores. Annual savings of $250M+ in operational costs.",
    metrics: [
      "Settlement time reduced 40% (17 days → ~10 days average)",
      "30% of claims processed straight-through with no human touch",
      "$250M+ annual operational savings",
      "Customer NPS improved +18 points",
      "Adjuster productivity up 35%",
    ],
    tags: ["Insurance", "Claims", "Computer Vision", "NLP", "Automation", "P&C"],
    featured: true,
    businessContext:
      "Zurich's $5B+ claims operation was facing a talent shortage in skilled adjusters while claim volume grew 8% annually. The manual-heavy process was unscalable and a key driver of customer churn. Zurich's 'Zurich Edge' digital strategy identified claims automation as the highest-ROI AI initiative.",
    strategicDrivers: [
      "Adjuster headcount costs growing 12% YoY with no productivity offset",
      "Customer churn directly correlated with settlement speed in P&C",
      "Competitor insurtech startups (Lemonade, Hippo) settling simple claims in minutes",
      "Reinsurance treaties increasingly pricing for claims handling efficiency",
      "Solvency II requirements demanding more granular claims data for capital modeling",
    ],
    techStack: [
      "Python (FastAPI, scikit-learn, PyTorch)",
      "Azure AI Vision for damage assessment",
      "Azure OpenAI Service (GPT-4 Turbo) for claim narrative analysis",
      "Guidewire ClaimCenter integration",
      "Apache Kafka for real-time event streaming",
      "Databricks for model training and feature engineering",
      "Power BI for adjuster dashboards",
      "Azure DevOps CI/CD",
    ],
    architecture:
      "Claims enter via FNOL (First Notice of Loss) through web, mobile app, or call centre transcription. An NLP classifier reads the claim narrative and assigns a complexity score (1–5). Score 1–2 claims enter the straight-through processing lane: computer vision validates submitted photos, automated payment rules engine releases settlement within 24 hours. Score 3–5 claims are triaged to adjuster queues ranked by urgency, with AI pre-populating coverage checks and reserve estimates.",
    dataRequirements:
      "5 years of historical closed claims (12M records) with final settlement amounts, complexity labels, and adjuster notes used for model training. Photo assessment model trained on 2M+ damage images labeled by senior adjusters. All training data remained within Zurich's private Azure tenant.",
    investmentEstimate: "$40–55M over 3 years (platform build, model development, Guidewire integration, change management)",
    annualReturn: "$250M+",
    paybackPeriod: "Under 6 months post full deployment",
    roiMultiple: "12–15x over 5 years",
    roiBreakdown: [
      {
        category: "Adjuster headcount avoidance",
        value: "$130M/year",
        note: "Straight-through processing eliminated need for 400+ adjuster FTEs at blended $325K total cost",
      },
      {
        category: "Litigation reduction",
        value: "$70M/year",
        note: "Faster settlement reduces attorney involvement in personal injury claims",
      },
      {
        category: "Fraud detection uplift",
        value: "$35M/year",
        note: "AI anomaly detection on claim patterns flagged 12% more fraudulent claims",
      },
      {
        category: "Reinsurance recoveries",
        value: "$15M/year",
        note: "Faster and more accurate reserve setting improved reinsurance treaty recoveries",
      },
    ],
    implementationTimeline: "30 months from business case approval to full rollout",
    implementationPhases: [
      {
        phase: "Foundation & Data Preparation",
        duration: "6 months",
        description:
          "Ingested and cleaned 5 years of claims data from 12 legacy systems across markets. Built unified claims data lake on Databricks. Senior adjusters labeled 200,000 claims for complexity and 500,000 damage photos.",
        keyOutputs: ["Unified claims data lake", "Complexity taxonomy (5-tier)", "Labeled training corpus"],
      },
      {
        phase: "Model Development & Validation",
        duration: "9 months",
        description:
          "Trained NLP classifier, damage severity model, and fraud anomaly detector. Parallel-ran AI triage alongside human adjusters for 3 months to validate accuracy before any autonomous decisions.",
        keyOutputs: ["NLP triage classifier (92% accuracy vs. adjuster benchmark)", "Vision damage model (89% agreement with senior adjuster)", "Fraud anomaly detector"],
      },
      {
        phase: "Straight-Through Processing Engine",
        duration: "6 months",
        description:
          "Built and tested the automated payment rules engine for score 1–2 claims. Integrated with Guidewire ClaimCenter and Zurich's payment rails. Legal and compliance review of autonomous settlement authority.",
        keyOutputs: ["STP payment engine", "Guidewire ClaimCenter integration", "Regulatory sign-off in 12 markets"],
      },
      {
        phase: "Phased Market Rollout",
        duration: "9 months",
        description:
          "Rolled out starting with UK motor claims (highest volume, most standardized), then extended to Germany, Switzerland, and North America. Claims handlers trained on AI-assisted queue interface.",
        keyOutputs: ["Full rollout across 20 markets", "Adjuster training programme", "Live monitoring dashboards"],
      },
    ],
    teamSize: "55 engineers, 18 data scientists, 8 ML ops, 20 claims domain experts, 5 compliance officers, 3 actuaries",
    challenges: [
      "Legacy system heterogeneity: Claims data existed in 12 different systems across markets with no common schema, requiring 18 months of data engineering before models could be trained",
      "Regulatory fragmentation: Autonomous settlement authority required separate regulatory approval in each jurisdiction - EU, UK FCA, and US state-by-state",
      "Adjuster trust: Senior adjusters were skeptical of AI handling 'their' cases, requiring extensive accuracy proof-points and change management",
      "Edge cases in damage assessment: Weather-related total loss claims and catastrophe events required manual override protocols",
      "Fraud model calibration: Initial fraud model had high false positive rates flagging legitimate claims, eroding customer trust in pilot markets",
    ],
    governanceFramework: [
      "Autonomous settlement capped at £5,000 / €6,000 / $7,500 per claim - above threshold always requires human adjuster",
      "Monthly model performance review by claims leadership and actuarial team",
      "Full audit trail for every AI decision stored for 10 years per FCA/BaFin requirements",
      "Explainability report generated for any claim where AI recommendation is overridden by adjuster",
      "Quarterly bias audit checking settlement equity across demographic proxies",
    ],
    dataPrivacy: [
      "All PII processed within Zurich's private Azure tenant - no claims data sent to external APIs",
      "GDPR-compliant right-to-explanation implemented: customers can request AI decision rationale",
      "Data minimisation: AI models use only claim-relevant fields, not lifestyle or social data",
      "Third-party photo uploads scanned and stripped of EXIF metadata before storage",
    ],
    humanOversight:
      "All claims above the autonomous settlement threshold require a qualified adjuster decision. All AI-flagged fraud cases are reviewed by the Special Investigations Unit before any claim is denied. A claims director reviews weekly STP approval rate trends for anomaly detection.",
    regulatoryConsiderations: [
      "FCA Consumer Duty (UK) - fair outcomes for customers in automated claims",
      "EU AI Act Article 6 - high-risk AI system classification for automated insurance decisions",
      "BaFin circular on AI in financial services (Germany)",
      "US NAIC model bulletin on AI in insurance (adopted in 29 states)",
      "Solvency II model governance requirements",
    ],
    lessonsLearned: [
      "Parallel running for 3 months before any autonomous decisions was essential - it built adjuster trust and produced the statistical evidence needed for regulatory approval",
      "The fraud model needed 6 months of post-deployment tuning; launch accuracy is not production accuracy",
      "Starting with motor claims (standardised, high volume) rather than commercial lines (complex, low volume) was the right sequencing decision",
      "Invest in adjuster UI as much as in AI models - adoption speed depended almost entirely on queue interface quality",
      "Reinsurance treaty notification requirements were underestimated - Munich Re required formal notification before deployment affecting reinsured portfolios",
    ],
    whatWorkedWell: [
      "Computer vision for vehicle damage assessment outperformed initial accuracy targets because mobile photo quality had improved significantly since the training data era",
      "The 5-tier complexity taxonomy created by senior adjusters proved durable - it needed only minor refinement after 18 months in production",
      "Kafka-based event streaming allowed real-time triage with sub-second latency even at 50,000 daily claim volume",
    ],
    references: [
      {
        label: "Zurich Insurance: AI and Digital Innovation",
        url: "https://www.zurichinsurancegroup.com/en/topics/innovation",
      },
      {
        label: "Guidewire: Zurich Insurance Partner Case Study",
        url: "https://www.guidewire.com/customers",
      },
    ],
  },

  {
    id: "swiss-re-underwriting-ai",
    slug: "swiss-re-underwriting-ai",
    company: "Swiss Re",
    industry: "Reinsurance",
    title: "Magnum: Automated Life & Health Underwriting at the Point of Sale",
    problem:
      "For individual life and health insurance, underwriting has traditionally been a manual, days-to-weeks process: an underwriter reviews the application, medical disclosures, and questionnaire answers before issuing a decision. This creates friction and drop-off at the point of sale, inconsistent decisions between underwriters, and high per-policy processing cost - especially for primary insurers writing large volumes of standard risks.",
    solution:
      "Swiss Re offers Magnum, an automated underwriting rules engine that its life & health cedants (primary insurers) embed in their new-business and point-of-sale workflows. Magnum applies Swiss Re's underwriting philosophy and risk-assessment rules to an applicant's answers and disclosures to return an underwriting decision - often straight-through - or route more complex cases to a human underwriter. Variants such as Magnum Go and Magnum Pure target different distribution and product needs.",
    outcome:
      "Insurers using Magnum can automate a large share of their standard life & health underwriting decisions, delivering instant or near-instant point-of-sale outcomes for many applicants, more consistent application of underwriting rules across the book, and lower manual-underwriting workload. Swiss Re positions Magnum as a way to increase straight-through processing while keeping underwriting quality aligned to its risk standards.",
    metrics: [
      "Automates a large share of standard life & health underwriting decisions",
      "Instant / near-instant decisions at the point of sale for many applicants",
      "More consistent application of underwriting rules across the book",
      "Reduced manual-underwriting workload for cedants",
    ],
    tags: ["Insurance", "Life & Health", "Underwriting", "Automation", "Rules Engine", "Digital"],
    featured: true,
    businessContext:
      "Swiss Re is one of the world's largest reinsurers, founded in 1863. Beyond taking on risk, it provides technology and tools to its cedants; Magnum is its automated underwriting solution for the life & health market. By helping primary insurers digitise and automate new-business underwriting, Swiss Re deepens client relationships, encodes its own underwriting expertise into the sales journey, and helps insurers reduce friction and cost in acquiring standard risks.",
    strategicDrivers: [
      "Primary insurers seeking faster, digital point-of-sale journeys to reduce application drop-off",
      "Pressure to lower per-policy underwriting cost on high-volume standard business",
      "Demand for consistent, auditable underwriting decisions rather than underwriter-to-underwriter variability",
      "Swiss Re's strategy of embedding its underwriting expertise into client-facing tools",
    ],
    techStack: [
      "Magnum automated underwriting rules engine",
      "Configurable underwriting rules and reflexive questionnaires",
      "Integration APIs into insurer new-business / policy admin systems",
      "Swiss Re underwriting manuals and risk-assessment models (e.g. Life Guide)",
    ],
    architecture:
      "Magnum sits within the insurer's application journey. As an applicant answers questions, the engine drives reflexive questioning and evaluates responses and disclosures against configured underwriting rules that encode Swiss Re's risk philosophy. For clear-cut standard risks it returns an automated decision (accept / rate / decline) for straight-through processing; cases that fall outside automated rules or raise complexity are referred to a human underwriter with the collected information. Insurers configure the rule set to their products and risk appetite.",
    dataRequirements:
      "Applicant-disclosed information (application answers, medical and lifestyle disclosures) and the insurer's product and underwriting-rule configuration, informed by Swiss Re's underwriting manuals and risk models. Personal data is processed within the insurer's regulated environment under applicable data-protection law.",
    investmentEstimate: "Not publicly disclosed - Magnum is licensed to cedants as part of Swiss Re's L&H solutions",
    annualReturn: "Not publicly disclosed - value accrues to cedants as lower underwriting cost and higher point-of-sale conversion",
    paybackPeriod: "Not publicly disclosed",
    roiMultiple: "Not publicly disclosed",
    roiBreakdown: [
      {
        category: "Underwriting automation",
        value: "Not publicly disclosed",
        note: "Automating standard decisions reduces manual-underwriting workload and per-policy cost for cedants",
      },
      {
        category: "Point-of-sale conversion",
        value: "Not publicly disclosed",
        note: "Instant decisions reduce application drop-off in the sales journey",
      },
    ],
    implementationTimeline: "Deployed with each cedant as a configuration and integration project into their new-business systems",
    implementationPhases: [
      {
        phase: "Rule Configuration",
        duration: "Project-dependent",
        description:
          "Swiss Re and the cedant configure Magnum's underwriting rules, reflexive questionnaires, and decision thresholds to the insurer's products and risk appetite, drawing on Swiss Re's underwriting guidance.",
        keyOutputs: ["Configured underwriting rule set", "Reflexive questionnaire design", "Decision thresholds"],
      },
      {
        phase: "Integration",
        duration: "Project-dependent",
        description:
          "Magnum is integrated into the insurer's new-business, e-application, or policy-administration systems via APIs so decisions are returned within the sales journey.",
        keyOutputs: ["System integration", "Point-of-sale decisioning", "Referral routing to human underwriters"],
      },
      {
        phase: "Go-Live & Optimisation",
        duration: "Ongoing",
        description:
          "The insurer runs live automated underwriting, monitors straight-through-processing rates and decision quality, and tunes rules over time.",
        keyOutputs: ["Live automated underwriting", "STP monitoring", "Ongoing rule refinement"],
      },
    ],
    teamSize: "Swiss Re L&H underwriting, product, and integration specialists working with the cedant's underwriting and IT teams",
    challenges: [
      "Encoding an insurer's underwriting philosophy into consistent, maintainable rules",
      "Balancing straight-through-processing rates against risk-selection quality",
      "Integrating decisioning into diverse legacy new-business and policy-admin systems",
      "Governing changes to underwriting rules so decisions remain compliant and auditable",
    ],
    governanceFramework: [
      "Automated decisions apply configured, documented underwriting rules; complex cases refer to human underwriters",
      "Underwriting-rule changes managed under change-control and review",
      "Decisions logged for audit and quality review",
    ],
    dataPrivacy: [
      "Applicant personal and health data processed within the insurer's regulated environment",
      "Handling subject to applicable data-protection law (e.g. GDPR) and insurance regulation",
      "Sensitive health disclosures used for the underwriting decision within the insurer's consent and privacy framework",
    ],
    humanOversight:
      "Magnum automates clear standard-risk decisions and refers non-standard or complex cases to human underwriters. Insurers configure which decisions may be automated versus referred, and retain accountability for underwriting outcomes and for reviewing and maintaining the rules.",
    regulatoryConsiderations: [
      "Insurance regulation and fair-treatment requirements in each market",
      "Data-protection law (e.g. GDPR) for processing health and personal data",
      "Governance expectations for automated decisioning in insurance",
    ],
    lessonsLearned: [
      "Automated underwriting works best when standard risks are clearly separated from cases that need a human underwriter",
      "The value comes from consistent, well-governed rules as much as from automation itself",
      "Point-of-sale decisioning reduces drop-off, but rule quality determines whether risk selection holds up",
    ],
    whatWorkedWell: [
      "Encoding Swiss Re's underwriting expertise into a configurable engine let cedants adopt proven risk rules",
      "Reflexive questionnaires keep applicants answering only relevant follow-up questions",
      "Clear referral paths preserve underwriting quality on complex cases while automating the standard majority",
    ],
    references: [
      {
        label: "Swiss Re: Magnum automated underwriting",
        url: "https://www.swissre.com/reinsurance/life-and-health/solutions/magnum.html",
      },
      {
        label: "Swiss Re: Life & Health solutions",
        url: "https://www.swissre.com/reinsurance/life-and-health.html",
      },
    ],
  },

  {
    id: "lemonade-ai-claims",
    slug: "lemonade-ai-claims",
    company: "Lemonade",
    industry: "Insurance",
    title: "AI Claims Bot: Settling Claims in 3 Seconds",
    problem:
      "Traditional insurance claims processes take days or weeks, involve adversarial dynamics between insurers and customers, and cost $80–$120 per claim to administer. Lemonade was founded on the premise that AI could eliminate this friction entirely for straightforward personal lines claims.",
    solution:
      "Built 'AI Jim', an end-to-end AI claims handler for homeowners, renters, pet, and life insurance. Customers submit claims via the Lemonade app, AI Jim reviews the claim, runs 18 anti-fraud algorithms, cross-references the policy, and for eligible simple claims authorises payment instantly - in as little as 3 seconds.",
    outcome:
      "Record claim settled in 3 seconds without human involvement. 30%+ of claims paid instantly. Claims handling cost reduced to under $10 per claim. Customer satisfaction (NPS) scores 2x industry average. Fraud loss ratio materially below industry benchmark.",
    metrics: [
      "Fastest claim settled: 3 seconds (world record)",
      "30%+ of claims resolved with zero human involvement",
      "Claims cost under $10 per claim vs. $80–120 industry average",
      "Customer NPS 2x+ insurance industry average",
      "Fraud loss ratio below industry benchmark",
    ],
    tags: ["Insurance", "InsurTech", "AI Claims", "Fraud Detection", "Personal Lines", "Automation"],
    businessContext:
      "Lemonade's entire business model is built around AI-first insurance. Unlike incumbents adapting legacy processes, Lemonade built from scratch with AI as the core product. The company operates on a flat fee model (takes 25% of premium, donates remainder to charity via Giveback), aligning incentives to pay legitimate claims quickly rather than fight them.",
    strategicDrivers: [
      "Business model requires AI claims efficiency to achieve unit economics at scale",
      "Brand differentiation: 'instant everything' is the core customer promise",
      "Millennial/Gen Z customer segment expects mobile-native, instant experiences",
      "Flat-fee model removes profit motive for claim denial, enabling more aggressive automation",
      "Regulatory approval for AI claims handling required demonstrating fair outcomes across demographics",
    ],
    techStack: [
      "Python (TensorFlow, scikit-learn)",
      "Custom-built fraud detection ensemble (18 algorithms)",
      "AWS infrastructure",
      "React Native (customer mobile app)",
      "Stripe for instant payment disbursement",
      "Behavioural analysis models (video, typing patterns)",
      "Third-party public records APIs (for fraud cross-referencing)",
      "Internal graph database for fraud network detection",
    ],
    architecture:
      "Customer submits claim via app with text description and optional photos/video. AI Jim parses the claim narrative, validates against policy coverage, and simultaneously runs 18 fraud detection algorithms including cross-referencing prior claims, social signals, and behavioural metadata from the submission session. If all signals are clear and claim value is within the autonomous authority threshold, payment is authorised and transferred via Stripe. Claims above threshold or flagged by fraud models route to human adjusters.",
    dataRequirements:
      "Lemonade's proprietary claims corpus (growing annually since 2016). Fraud model trained on flagged and confirmed fraudulent claims. External public records for address, identity, and event cross-referencing. Behavioural data (submission patterns, video metadata) used only for fraud detection, not claim valuation.",
    investmentEstimate: "Core claims AI built as part of Lemonade's founding engineering team - estimated $15–20M in cumulative development cost through IPO",
    annualReturn: "Claims cost reduction of $70–100M/year at scale vs. traditional handling",
    paybackPeriod: "Embedded in product from launch - no legacy migration cost",
    roiMultiple: "Enables entire business model - not separable from product",
    roiBreakdown: [
      {
        category: "Claims handling cost reduction",
        value: "$70–100M/year at scale",
        note: "Sub-$10 vs. $80–120 industry average per claim across millions of policies",
      },
      {
        category: "Fraud detection savings",
        value: "$30M+/year estimated",
        note: "18-algorithm fraud stack catches patterns human adjusters miss",
      },
    ],
    implementationTimeline: "Launched with the product in 2016; continuously evolved since",
    teamSize: "Core AI team of 30–40 engineers and data scientists (as reported in S-1 filing)",
    challenges: [
      "Regulatory approval: Several US states initially required human review of all claims - Lemonade worked with regulators state-by-state to demonstrate AI fairness",
      "Fraud adversarial dynamics: As AI Jim's patterns became known, fraudsters adapted, requiring continuous model evolution",
      "Edge case coverage explosions: AI handling works for standard claims but catastrophe events (Hurricane Ida) required rapid fallback to human adjusters at scale",
      "Trust building: Early customers were sceptical that a claim submitted to an app would actually be paid - social proof and transparency were critical",
      "Behavioural data ethics: Use of video and typing pattern analysis for fraud detection attracted regulatory scrutiny on privacy grounds",
    ],
    governanceFramework: [
      "All claim denials by AI require human review before final denial is communicated to customer",
      "Autonomous payment authority threshold reviewed quarterly by claims leadership",
      "Annual independent audit of claim outcome fairness across demographic groups",
      "Fraud algorithm decisions are logged with full feature attribution for regulatory review",
      "Customer can always request human review of any AI claim decision",
    ],
    dataPrivacy: [
      "Behavioural metadata (video, typing) used only for fraud detection - deleted after claim resolution",
      "State-by-state data privacy compliance (CCPA, NY DFS)",
      "No third-party data sharing of individual claim details",
      "GDPR-compliant for European operations",
    ],
    humanOversight:
      "All claim denials require human adjuster confirmation before customer communication. Claims above autonomous threshold are handled by licensed human adjusters. A Claims Director monitors daily automation rates and reviews anomalies. Catastrophe events trigger automatic escalation to human-first handling.",
    regulatoryConsiderations: [
      "NAIC model bulletin on AI in insurance (US, state-by-state adoption)",
      "NY DFS guidance on automated claims systems",
      "EU AI Act Article 6 applicability to automated insurance decisions",
      "GDPR for EU/UK customers",
      "State fair claims settlement practices acts (US)",
    ],
    lessonsLearned: [
      "Designing for AI-first from day one is fundamentally different from retrofitting AI into legacy processes - the two approaches are not equivalent",
      "Transparency with customers about AI involvement increased rather than decreased trust",
      "Fraud detection requires continuous adversarial retraining - fraudsters learn the system faster than expected",
      "Regulatory engagement early and proactively is far less costly than reactive compliance after launch",
      "The 'Giveback' model (donating unclaimed premiums to charity) meaningfully reduces fraudulent claims - behavioural economics at scale",
    ],
    whatWorkedWell: [
      "Mobile-first submission UI with video option created richer fraud signals than traditional paper forms",
      "Stripe instant payment rails were critical - speed of payment is itself a trust signal to customers",
      "Building the fraud graph database in-house rather than using third-party solutions gave Lemonade proprietary detection patterns",
    ],
    references: [
      {
        label: "Lemonade S-1 Filing: AI and Technology",
        url: "https://www.sec.gov/Archives/edgar/data/1691421/000119312520185109/d923096ds1.htm",
      },
      {
        label: "Lemonade: Instant Everything",
        url: "https://www.lemonade.com/blog/lemonade-sets-new-world-record",
      },
    ],
  },

  {
    id: "munich-re-nat-cat-ai",
    slug: "munich-re-nat-cat-ai",
    company: "Munich Re",
    industry: "Reinsurance",
    title: "NATHAN & Location Risk Intelligence: Data-Driven Natural Hazard Assessment",
    problem:
      "Assessing natural-hazard exposure - flood, storm, wildfire, earthquake, hail - at a specific location is hard. Historical loss data may not reflect forward-looking climate risk, and underwriters and clients need consistent, location-level hazard information to price and manage catastrophe risk. Munich Re, as one of the world's largest reinsurers, needed to turn its long accumulation of natural-hazard knowledge into usable, location-specific risk information.",
    solution:
      "Munich Re provides natural-hazard risk assessment through its NATHAN (Natural Hazards Assessment Network) Risk Suite and Location Risk Intelligence platform. These tools draw on Munich Re's decades of catastrophe research, its NatCatSERVICE loss database, hazard maps, and geospatial and climate data to score the natural-hazard exposure of individual locations and portfolios, combining physical hazard data with analytics to support underwriting and risk management.",
    outcome:
      "Munich Re and its clients can assess natural-hazard exposure at the level of individual addresses and whole portfolios across multiple perils, using consistent hazard scores and maps rather than ad-hoc judgement. This supports more informed catastrophe underwriting, accumulation control, and client risk-management advice, and reflects forward-looking climate considerations alongside historical experience.",
    metrics: [
      "Location- and portfolio-level scoring across multiple perils (flood, storm, wildfire, quake, hail)",
      "Built on Munich Re's NatCatSERVICE loss database and decades of hazard research",
      "Consistent hazard maps and scores for underwriting and accumulation control",
      "Incorporates climate-change considerations into hazard assessment",
    ],
    tags: ["Reinsurance", "Natural Catastrophe", "Climate Risk", "Geospatial", "Risk Assessment", "Actuarial"],
    featured: false,
    businessContext:
      "Natural catastrophe losses have risen substantially over recent decades, driven by climate change and growing exposure in hazard-prone areas. Munich Re, one of the world's largest reinsurers, carries significant nat cat risk and has long maintained catastrophe research and the NatCatSERVICE loss database. Turning that knowledge into location-level hazard tools (NATHAN, Location Risk Intelligence) supports its own underwriting and gives clients risk-assessment capabilities.",
    strategicDrivers: [
      "Climate change making purely historical hazard assumptions less reliable",
      "Growing exposure and values concentrated in hazard-prone regions",
      "Client demand for consistent, location-level natural-hazard information",
      "Availability of richer geospatial, hazard, and climate datasets",
      "Munich Re's strategy of productising its catastrophe research for clients",
    ],
    techStack: [
      "NATHAN Risk Suite (natural hazard scores and maps)",
      "Location Risk Intelligence platform and APIs",
      "Munich Re NatCatSERVICE loss database",
      "Geospatial / GIS hazard datasets",
      "Hazard models across flood, storm, wildfire, earthquake, hail",
      "Climate-change hazard considerations",
    ],
    architecture:
      "Munich Re combines physical hazard data (flood zones, storm and hail exposure, seismic and wildfire hazard) with its catastrophe research and NatCatSERVICE loss experience to produce location-level natural-hazard scores. Through NATHAN and the Location Risk Intelligence platform, a location or an entire portfolio can be geocoded and scored across perils, with hazard maps and consistent risk indicators exposed via interfaces and APIs for underwriters and clients.",
    dataRequirements:
      "Munich Re's catastrophe research and NatCatSERVICE loss database, physical hazard datasets (flood, storm, seismic, wildfire, hail), geospatial/elevation data, and climate-change information. Assessment operates on location and exposure data rather than individual policyholder personal data.",
    investmentEstimate: "Not publicly disclosed - part of Munich Re's long-standing catastrophe research and risk-solutions investment",
    annualReturn: "Not publicly disclosed - value accrues through better catastrophe underwriting, accumulation control, and client solutions",
    paybackPeriod: "Not publicly disclosed",
    roiMultiple: "Not publicly disclosed",
    roiBreakdown: [
      {
        category: "Underwriting & accumulation control",
        value: "Not publicly disclosed",
        note: "Consistent location-level hazard scoring supports catastrophe pricing and accumulation management",
      },
      {
        category: "Client risk solutions",
        value: "Not publicly disclosed",
        note: "NATHAN / Location Risk Intelligence are offered to clients as risk-assessment tools",
      },
    ],
    implementationTimeline: "Built on decades of Munich Re catastrophe research; NATHAN and Location Risk Intelligence are established, continually updated products",
    implementationPhases: [
      {
        phase: "Catastrophe Research & Loss Data",
        duration: "Long-standing",
        description:
          "Munich Re accumulated catastrophe research and built the NatCatSERVICE loss database, cataloguing natural-hazard events and losses worldwide.",
        keyOutputs: ["NatCatSERVICE loss database", "Peril research", "Hazard knowledge base"],
      },
      {
        phase: "Hazard Maps & Scoring",
        duration: "Ongoing",
        description:
          "Combined physical hazard data with loss experience to produce consistent location-level hazard maps and scores across multiple perils.",
        keyOutputs: ["Multi-peril hazard maps", "Location-level hazard scores", "Climate-change considerations"],
      },
      {
        phase: "Productisation (NATHAN / Location Risk Intelligence)",
        duration: "Ongoing",
        description:
          "Packaged the hazard assessment into the NATHAN Risk Suite and Location Risk Intelligence platform with interfaces and APIs for underwriters and clients.",
        keyOutputs: ["NATHAN Risk Suite", "Location Risk Intelligence platform", "APIs for portfolio scoring"],
      },
    ],
    teamSize: "Munich Re catastrophe research, geospatial, and risk-solutions specialists",
    challenges: [
      "Reflecting forward-looking climate change in hazard assessment rather than relying only on history",
      "Providing consistent multi-peril scoring across very different hazards and regions",
      "Keeping hazard data and models current as exposure and climate evolve",
      "Integrating hazard scores into underwriting and client workflows",
    ],
    governanceFramework: [
      "Hazard assessment supports, rather than replaces, underwriting and actuarial judgement",
      "Models and hazard data reviewed and updated by catastrophe research teams",
      "Assessment used alongside established catastrophe pricing practice",
    ],
    dataPrivacy: [
      "Assessment operates on location, hazard, and exposure data rather than individual personal data",
      "Third-party and licensed datasets handled under their respective agreements",
      "Applicable data-protection law observed for any personal data involved",
    ],
    humanOversight:
      "Natural-hazard scores from NATHAN and Location Risk Intelligence inform underwriters and clients; catastrophe underwriters and actuaries retain responsibility for pricing and portfolio decisions, using the hazard information as one input alongside models and judgement.",
    regulatoryConsiderations: [
      "Solvency II governance for catastrophe risk in capital models",
      "IAIS standards on climate risk in insurance supervision",
      "TCFD-aligned climate risk disclosure expectations",
      "Market requirements on catastrophe model usage",
    ],
    lessonsLearned: [
      "A well-maintained loss database (NatCatSERVICE) is the foundation for credible hazard assessment",
      "Consistent, location-level hazard scoring is more useful to underwriters than ad-hoc assessment",
      "Forward-looking climate considerations must be reflected explicitly, not hidden in historical averages",
      "Productising internal research (NATHAN / Location Risk Intelligence) extends its value to clients",
    ],
    whatWorkedWell: [
      "Decades of catastrophe research and the NatCatSERVICE database gave Munich Re a strong hazard-data foundation",
      "Packaging hazard assessment as NATHAN and Location Risk Intelligence made it usable for underwriting and clients",
      "Multi-peril, location-level scoring supports both individual risks and portfolio accumulation control",
    ],
    references: [
      {
        label: "Munich Re: NATHAN Risk Suite",
        url: "https://www.munichre.com/en/solutions/for-industry-clients/nathan.html",
      },
      {
        label: "Munich Re: Location Risk Intelligence",
        url: "https://www.munichre.com/en/solutions/for-industry-clients/location-risk-intelligence.html",
      },
    ],
  },

  {
    id: "axa-fraud-detection",
    slug: "axa-fraud-detection",
    company: "AXA",
    industry: "Insurance",
    title: "AI Fraud Detection: €500M+ in Detected Fraud Annually",
    problem:
      "Insurance fraud costs the industry an estimated €20B per year in Europe alone. AXA's traditional rules-based fraud detection caught only the most obvious patterns, generating high false positive rates that burdened legitimate customers while missing sophisticated organised fraud rings. Claims fraud, application fraud, and broker fraud all required separate, siloed detection approaches.",
    solution:
      "Built 'AXA Fraud Intelligence Network' - a unified AI fraud detection platform combining graph neural networks to detect fraud rings and collusion, unsupervised anomaly detection on claim patterns, NLP on claim narratives to detect inconsistencies, and application fraud models that score new policies at point of sale.",
    outcome:
      "€500M+ in fraud detected and recovered annually across AXA's European operations. False positive rate reduced by 55% vs. rules-based predecessor. Fraud ring detection capability introduced for the first time. SIU (Special Investigations Unit) investigator productivity tripled through AI-prioritised work queues.",
    metrics: [
      "€500M+ fraud detected annually across European operations",
      "False positive rate reduced 55%",
      "Fraud ring detection: first capability of its kind at AXA",
      "SIU investigator productivity tripled",
      "Application fraud detection rate improved 40%",
    ],
    tags: ["Insurance", "Fraud Detection", "Graph Neural Networks", "NLP", "Anomaly Detection", "P&C"],
    businessContext:
      "AXA's €100B+ premium base and 95M customers make it the world's largest insurance group and a prime target for organised fraud. The shift from opportunistic individual fraud to professional fraud rings (coordinating false claims, staged accidents, and claims farming operations) required a fundamentally new detection approach that could identify network-level patterns invisible to claim-level analysis.",
    strategicDrivers: [
      "Organised fraud rings increasingly sophisticated, evading rules-based detection",
      "Regulatory pressure from FCA and ACPR to demonstrate fraud controls",
      "Combined ratio pressure in competitive markets requiring loss ratio improvement",
      "GDPR constraints limiting what signals could be used in fraud detection",
      "Digital-first customer journey creating new application fraud vectors",
    ],
    techStack: [
      "Python (PyTorch Geometric for graph neural networks, scikit-learn)",
      "Neo4j graph database for fraud network mapping",
      "Azure Databricks for model training and feature engineering",
      "Azure OpenAI for claim narrative analysis",
      "Apache Kafka for real-time claim event streaming",
      "Elastic Search for case management",
      "Internal SIU case management platform",
      "Power BI for fraud analytics dashboards",
    ],
    architecture:
      "Claim events stream into Kafka in real time. A feature engineering layer builds claim-level, customer-level, and network-level features (graph features from Neo4j: connected parties, shared attributes with known fraud cases). A gradient boosting model scores each claim for multiple fraud types. A graph neural network separately scores the fraud ring risk of the network around the claimant. High-scoring claims are routed to SIU queues ranked by expected fraud value. Claim narrative NLP runs asynchronously and can escalate scores based on inconsistency flags.",
    dataRequirements:
      "10 years of AXA claims history (50M+ claims) with confirmed fraud labels. Graph database seeded with known fraud ring members and their network connections. Third-party data: DVLA vehicle records, Companies House, credit bureau signals (with GDPR-compliant consent). Behavioural data from digital claims submission (device fingerprinting, submission timing).",
    investmentEstimate: "€35–45M over 3 years across AXA's European operations",
    annualReturn: "€500M+ in fraud recovered",
    paybackPeriod: "Under 3 months post deployment",
    roiMultiple: "30x+ over 5 years",
    roiBreakdown: [
      {
        category: "Claims fraud recovery",
        value: "€380M/year",
        note: "P&C and health claims fraud detected and referred for recovery or claim denial",
      },
      {
        category: "Application fraud prevention",
        value: "€80M/year",
        note: "Fraudulent policies rejected at point of sale before losses occur",
      },
      {
        category: "SIU efficiency",
        value: "€40M/year",
        note: "Investigator productivity tripled - same team handles 3x the caseload",
      },
    ],
    implementationTimeline: "28 months from business case to full European deployment",
    implementationPhases: [
      {
        phase: "Data Foundation & Label Engineering",
        duration: "8 months",
        description:
          "Built unified claims data lake integrating 12 country systems. SIU experts reviewed 5 years of historical claims to create confirmed fraud labels. Graph database seeded with known fraud networks.",
        keyOutputs: ["Unified claims data lake", "500,000+ labeled fraud cases", "Fraud network graph (Neo4j)"],
      },
      {
        phase: "Model Development",
        duration: "10 months",
        description:
          "Developed claim-level fraud scoring, graph neural network for ring detection, NLP narrative analysis, and application fraud models. Backtested on known fraud cases to validate detection rates.",
        keyOutputs: ["4 production fraud models", "Graph neural network for ring detection", "Backtesting validation report"],
      },
      {
        phase: "SIU Integration & Workflow",
        duration: "6 months",
        description:
          "Built AI-prioritised work queue for SIU investigators. Case management integration. SIU team training. Established KPIs for model performance monitoring.",
        keyOutputs: ["AI-prioritised SIU queue", "Case management integration", "SIU training programme"],
      },
      {
        phase: "European Rollout",
        duration: "4 months",
        description:
          "Phased rollout: France first (largest book), then UK, Germany, Belgium, and other markets. Country-specific regulatory compliance checks for each jurisdiction.",
        keyOutputs: ["Full European deployment", "Country compliance sign-off", "Live fraud analytics dashboard"],
      },
    ],
    teamSize: "40 engineers, 15 data scientists, 5 graph ML specialists, 10 SIU domain experts, 4 compliance officers",
    challenges: [
      "GDPR constraints: Several data signals that would improve fraud detection could not be used without explicit consent under GDPR, requiring model redesign",
      "Label quality: Confirmed fraud labels are sparse (fraud is rare) and noisy (some fraud is never detected and enters as 'legitimate' in training data)",
      "Graph database scale: Neo4j graph with 50M+ nodes and 200M+ edges required significant infrastructure tuning for real-time query performance",
      "Cross-border fraud rings: Fraud rings operating across multiple AXA country subsidiaries required pan-European data sharing within GDPR constraints",
      "False positive management: Reducing false positives was as important as increasing detection - wrongly accusing a legitimate customer of fraud causes significant brand and legal damage",
    ],
    governanceFramework: [
      "AI fraud scores are always reviewed by a qualified SIU investigator before any claim denial or legal referral",
      "Fraud model bias audit quarterly - checking detection rates are equitable across demographic proxies",
      "All denied claims based on fraud scoring require documented SIU investigator sign-off",
      "Model performance reviewed monthly by Head of Fraud and Group Chief Risk Officer",
      "Customer can appeal any fraud-based claim denial through an independent review panel",
    ],
    dataPrivacy: [
      "GDPR-compliant consent framework for third-party data enrichment signals",
      "Behavioural/device data used for fraud detection only - deleted after claim resolution",
      "Data sharing between AXA country entities governed by intra-group data transfer agreements",
      "Right to explanation: customers can request why their claim was referred for fraud investigation",
    ],
    humanOversight:
      "No claim is denied for fraud based solely on AI scoring. Every fraud-flagged claim requires a qualified SIU investigator to review the evidence and make the final determination. Claim denials above €10,000 require SIU supervisor sign-off. Legal referrals for prosecution require SIU Director approval.",
    regulatoryConsiderations: [
      "GDPR Article 22 - automated individual decision-making restrictions",
      "EU AI Act - potential high-risk AI classification for automated fraud determination",
      "FCA Insurance Conduct of Business Sourcebook (UK)",
      "ACPR guidance on AI in insurance (France)",
      "IFB (Insurance Fraud Bureau) data sharing protocols",
    ],
    lessonsLearned: [
      "Graph neural networks for ring detection were the single highest-value model - organised fraud was 4x more impactful than opportunistic fraud",
      "GDPR is a genuine constraint on fraud detection, not just a compliance checkbox - model design must account for it from day one",
      "SIU investigator buy-in was critical - they knew the fraud patterns and their domain expertise was essential for label quality and model validation",
      "False positive rate is a primary KPI alongside detection rate - the cost of a wrongly accused customer is not just financial",
      "Starting with France (AXA's largest European market) gave the model the most training data and the most impactful pilot",
    ],
    whatWorkedWell: [
      "Graph neural network approach identified fraud rings that claim-level models were completely blind to",
      "AI-prioritised SIU queues improved investigator job satisfaction - they spent time on high-value complex cases instead of obvious low-value ones",
      "Real-time Kafka streaming enabled fraud scoring at FNOL, not just post-settlement, significantly improving recovery rates",
    ],
    references: [
      {
        label: "AXA: AI and Data Strategy",
        url: "https://www.axa.com/en/press/press-releases/axa-artificial-intelligence",
      },
      {
        label: "AXA XL: Fraud Detection Innovation",
        url: "https://axaxl.com/insurance/articles/fighting-insurance-fraud-with-ai",
      },
    ],
  },
];
