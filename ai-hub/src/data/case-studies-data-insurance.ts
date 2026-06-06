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
    title: "Automated Treaty Pricing: AI Underwriting at Global Scale",
    problem:
      "Swiss Re's treaty reinsurance underwriters manually priced 8,000+ renewal contracts annually using spreadsheet-based models. Each pricing exercise took 3–5 days, relied on individual underwriter judgment with high variability, and could not incorporate the full breadth of available external risk data at quote time.",
    solution:
      "Built an AI-assisted treaty underwriting platform - 'Magnum AI' - combining predictive loss models trained on Swiss Re's 170-year proprietary loss database with real-time external data enrichment (climate, economic, cat model outputs) and an LLM-powered contract analysis layer that extracts key terms from cedant submissions automatically.",
    outcome:
      "Treaty pricing time cut from 3–5 days to under 4 hours for standard treaties. Pricing consistency across the underwriting portfolio improved significantly. Loss ratio prediction accuracy improved by 8 percentage points versus benchmark models, directly improving profitability.",
    metrics: [
      "Pricing cycle: 3–5 days → under 4 hours for standard treaties",
      "Loss ratio prediction accuracy +8pp vs. benchmark actuarial models",
      "Underwriter capacity increased 3x (can evaluate 3x more renewals per person)",
      "Pricing consistency variance reduced 60% across the portfolio",
      "$300M+ improvement in annual underwriting profit attributed to better risk selection",
    ],
    tags: ["Reinsurance", "Underwriting", "Actuarial", "NLP", "Predictive Modelling", "Treaty", "P&C"],
    featured: true,
    businessContext:
      "Swiss Re is the world's second-largest reinsurer with $44B+ in premiums written. Treaty underwriting is the core of its P&C business - pricing accuracy directly determines whether the company makes or loses hundreds of millions per year. Increasing climate volatility and data availability made traditional spreadsheet-based pricing inadequate and created a strategic opportunity for data-driven differentiation.",
    strategicDrivers: [
      "Climate change increasing frequency and severity of natural catastrophe losses, breaking historical pricing assumptions",
      "Cedants (primary insurers) submitting richer data than underwriters could analyse manually",
      "Bermuda-based competitors and ILS funds deploying algorithmic pricing, eroding Swiss Re's pricing edge",
      "Need to scale renewal processing without proportional headcount increase",
      "Investor pressure to demonstrate loss ratio improvement in a hardening market",
    ],
    techStack: [
      "Python (PyTorch, XGBoost, LightGBM)",
      "Azure OpenAI Service (GPT-4 Turbo) for contract term extraction",
      "Databricks (Delta Lake, MLflow)",
      "Snowflake for unified risk data warehouse",
      "Swiss Re's proprietary global natural hazard database (Sigma)",
      "RMS RiskLink and AIR Touchstone cat model API integrations",
      "FastAPI microservices",
      "React (underwriter portal)",
      "Power BI Embedded for pricing dashboards",
    ],
    architecture:
      "Cedant submissions (PDFs, spreadsheets, loss run data) are ingested via a secure portal. An LLM extraction layer (GPT-4 Turbo, private deployment) parses contract terms, coverage structure, and cedant exposure data into structured fields. These feed a gradient-boosted loss prediction model trained on Swiss Re's historical treaty performance, enriched with external data (cat model outputs, climate indices, macroeconomic indicators). Output is a risk-adjusted premium indication with confidence interval and a breakdown of key pricing drivers for the underwriter to review and override.",
    dataRequirements:
      "170 years of Swiss Re proprietary claims and treaty data (digitised back-catalogue from 1863). 25 years of global cat model outputs correlated with actual losses. External datasets: ERA5 climate reanalysis, NOAA event database, sovereign credit ratings, GDP indices. All training data within Swiss Re's private Databricks tenant.",
    investmentEstimate: "$60–80M over 4 years (platform, data infrastructure, model development, actuarial validation)",
    annualReturn: "$300M+ attributable improvement in underwriting profit",
    paybackPeriod: "~8 months post full deployment",
    roiMultiple: "10–12x over 5 years",
    roiBreakdown: [
      {
        category: "Loss ratio improvement (better risk selection)",
        value: "$200M/year",
        note: "8pp improvement in loss ratio on ~$25B P&C premium base at 10% margin",
      },
      {
        category: "Underwriter capacity (renewals handled without headcount increase)",
        value: "$60M/year",
        note: "3x capacity increase avoided 150 senior underwriter hires at $400K+ total cost each",
      },
      {
        category: "Retrocession optimisation",
        value: "$40M/year",
        note: "Better risk stratification enabled more precise retrocession purchasing",
      },
    ],
    implementationTimeline: "42 months from pilot to full global rollout",
    implementationPhases: [
      {
        phase: "Data Foundation",
        duration: "12 months",
        description:
          "Digitised and unified Swiss Re's 170-year proprietary loss archive. Built Snowflake-based risk data warehouse integrating internal and third-party data sources. Established data governance and quality frameworks.",
        keyOutputs: ["Unified risk data warehouse", "170-year digitised loss database", "External data integration layer"],
      },
      {
        phase: "Predictive Model Development",
        duration: "12 months",
        description:
          "Actuarial and data science teams co-developed loss prediction models across 8 major treaty lines. Shadow underwriting: AI model ran in parallel with human underwriters on 2022 renewal season without influencing decisions.",
        keyOutputs: ["8 line-of-business loss prediction models", "Shadow underwriting accuracy report", "Actuarial validation sign-off"],
      },
      {
        phase: "LLM Submission Extraction Layer",
        duration: "8 months",
        description:
          "Deployed private GPT-4 Turbo instance for contract term extraction. Trained on Swiss Re's reinsurance contract taxonomy. Achieved 94% accuracy on structured term extraction vs. manual underwriter coding.",
        keyOutputs: ["LLM extraction engine (94% accuracy)", "Reinsurance contract ontology", "Submission portal"],
      },
      {
        phase: "Underwriter Platform & Rollout",
        duration: "10 months",
        description:
          "Built the pricing portal with AI indication, confidence intervals, and driver attribution. Rolled out to European treaties first, then Americas and Asia-Pacific. All underwriters trained with 40-hour certification programme.",
        keyOutputs: ["Magnum AI pricing portal", "Global rollout across 4 hubs", "Underwriter certification programme"],
      },
    ],
    teamSize: "70 engineers, 25 data scientists, 15 actuaries, 10 senior underwriters (domain experts), 6 ML ops, 4 compliance officers",
    challenges: [
      "Actuarial credibility: Senior actuaries required the AI model to meet the same statistical rigour standards as internal actuarial methods - a 12-month validation process",
      "Regulatory capital treatment: In some jurisdictions, AI-driven pricing required regulatory disclosure under Solvency II internal model rules",
      "Underwriter adoption: Experienced underwriters with 20+ year track records were reluctant to follow AI indications that contradicted their intuition",
      "Data heterogeneity: Cedant loss run formats varied enormously - the LLM extraction layer required 400+ prompt examples to handle the range of submission formats",
      "Model performance in tail events: Standard loss models underperformed during catastrophe clustering scenarios (back-to-back events), requiring separate cat pricing modules",
    ],
    governanceFramework: [
      "AI pricing indications are advisory - underwriters retain final pricing authority on all treaties",
      "Mandatory override documentation: underwriters must record reason when deviating >10% from AI indication",
      "Quarterly actuarial model performance review against actual loss emergence",
      "Annual independent model validation by external actuarial firm",
      "Concentration risk monitoring: AI must flag when portfolio accumulation exceeds predefined geographic or peril limits",
    ],
    dataPrivacy: [
      "Cedant submission data processed exclusively within Swiss Re's private Azure/Databricks environment",
      "No cedant data used in model training without explicit data sharing agreement",
      "Anonymised and aggregated industry loss data only for external benchmarking",
      "GDPR-compliant data retention and deletion protocols for cedant PII",
    ],
    humanOversight:
      "All treaty pricing decisions are made by a qualified underwriter. AI provides the indication and key driver attribution; the underwriter decides. Treaties above €50M premium require a second underwriter review regardless of AI confidence score. The Chief Underwriting Officer reviews monthly AI adherence rates and loss emergence vs. model predictions.",
    regulatoryConsiderations: [
      "Solvency II internal model governance (if AI is incorporated into SCR calculations)",
      "IAIS Insurance Core Principles on risk management",
      "BaFin guidance on AI in insurance underwriting (Germany)",
      "FINMA regulatory guidance on model risk (Switzerland)",
      "Lloyd's of London market bulletin on AI in underwriting",
    ],
    lessonsLearned: [
      "Actuarial partnership from day one is non-negotiable - models that bypass actuarial validation never make it to production in reinsurance",
      "Shadow underwriting for a full renewal season before go-live built the empirical track record needed for underwriter buy-in",
      "LLM-based contract extraction reduced the single biggest manual bottleneck (submission data entry) and was faster to build than a traditional NLP pipeline",
      "Confidence intervals alongside point estimates dramatically improved underwriter trust - knowing when the model is uncertain is as valuable as the prediction itself",
      "Retrocession and ILS desks need to be involved from the start - AI risk stratification changes what they want to cede and buy",
    ],
    whatWorkedWell: [
      "The proprietary 170-year loss database gave Swiss Re a data moat that external competitors cannot replicate",
      "Gradient boosting (LightGBM) outperformed deep learning for structured actuarial data with limited samples in niche peril classes",
      "The override documentation requirement generated a gold-standard dataset for ongoing model improvement",
    ],
    references: [
      {
        label: "Swiss Re Institute: AI in Reinsurance",
        url: "https://www.swissre.com/institute/research/topics-and-risk-dialogues/digitalisation/ai-in-insurance.html",
      },
      {
        label: "Swiss Re Annual Report: Technology and Innovation",
        url: "https://www.swissre.com/investors/annual-reporting.html",
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
    title: "Natural Catastrophe Pricing with AI: Improving Cat Loss Models",
    problem:
      "Traditional natural catastrophe (nat cat) pricing relies on vendor models (RMS, AIR, Verisk) that are updated infrequently, use historical loss data that may not reflect forward-looking climate risk, and cannot incorporate the full range of real-time earth observation and climate data now available. Munich Re's underwriters had limited ability to challenge or supplement vendor model outputs.",
    solution:
      "Munich Re's Digital Partners and NatCat teams built a proprietary AI-enhanced catastrophe pricing layer - 'geo:unison' - that ingests satellite imagery, climate model outputs, real-time weather data, and Munich Re's proprietary 50-year nat cat loss experience to produce location-level risk scores that supplement and challenge vendor cat model outputs.",
    outcome:
      "Location-level flood and wildfire risk scores now available for 1 billion+ properties globally. Underwriters can price individual risk locations that vendor models cannot resolve at sufficient granularity. Portfolio aggregation losses improved, contributing to a combined ratio improvement of 3–4 percentage points on nat cat-exposed books.",
    metrics: [
      "Risk scores available for 1B+ properties globally",
      "Combined ratio improvement of 3–4pp on nat cat books",
      "Wildfire risk score outperforms vendor models by 15% on out-of-sample loss prediction",
      "Flood model validated against 50 years of Munich Re's proprietary loss data",
      "Pricing cycle for complex nat cat layers reduced from 5 days to same day",
    ],
    tags: ["Reinsurance", "Natural Catastrophe", "Climate Risk", "Satellite Imagery", "Geospatial AI", "Actuarial"],
    featured: false,
    businessContext:
      "Natural catastrophe losses have more than tripled in the past 30 years, driven by climate change and rapid urbanisation into hazard-exposed areas. Munich Re, as the world's largest reinsurer ($50B+ premiums written), bears enormous nat cat risk concentration. Improving pricing accuracy by even 1pp across its nat cat portfolio translates to hundreds of millions in underwriting profit.",
    strategicDrivers: [
      "Climate change making historical vendor cat model assumptions increasingly unreliable",
      "Primary insurers withdrawing from high-risk markets (California wildfire, Florida hurricane) creating reinsurance market opportunity for those who can price it",
      "Satellite imagery and climate data now available at resolutions unimaginable when vendor models were built",
      "Munich Re's $50B premium base means 1pp combined ratio improvement = $500M in profit",
      "ILS and capital markets pricing discipline requiring Munich Re to demonstrate proprietary data edge",
    ],
    techStack: [
      "Python (PyTorch, TensorFlow, GeoPandas)",
      "Google Earth Engine for satellite imagery processing",
      "Sentinel-2 and Landsat satellite data (ESA/NASA)",
      "CMIP6 climate model outputs",
      "ERA5 reanalysis data (ECMWF)",
      "NOAA NEXRAD radar data",
      "PostGIS spatial database",
      "Databricks for large-scale geospatial ML",
      "Azure for infrastructure",
      "Munich Re's proprietary Sigma loss database",
    ],
    architecture:
      "A geospatial data pipeline ingests satellite imagery (Sentinel-2, 10m resolution globally, updated every 5 days), climate model projections, and elevation/topology data for every 30m grid cell globally. A convolutional neural network extracts hazard-relevant features (vegetation index, impervious surface, slope, proximity to water). These features feed into peril-specific gradient boosting models (wildfire, flood, wind) trained on Munich Re's 50-year loss history. Output is a location-level annual expected loss (AEL) and return-period loss curve that underwriters use alongside vendor cat model outputs.",
    dataRequirements:
      "50 years of Munich Re proprietary nat cat loss data (global, peril-specific). 5 years of Sentinel-2 satellite imagery (petabyte scale - processed via Google Earth Engine). CMIP6 climate projections to 2100. Third-party property exposure databases (CoreLogic, Verisk). All proprietary data processed within Munich Re's private cloud.",
    investmentEstimate: "$50–70M over 4 years (data infrastructure, model development, satellite data licensing, actuarial validation)",
    annualReturn: "$400–500M attributable combined ratio improvement on nat cat portfolio",
    paybackPeriod: "~12 months post full integration into underwriting",
    roiMultiple: "15–20x over 5 years",
    roiBreakdown: [
      {
        category: "Nat cat underwriting profit improvement",
        value: "$400M+/year",
        note: "3–4pp combined ratio on $10B+ nat cat premium book",
      },
      {
        category: "Retrocession cost optimisation",
        value: "$60M/year",
        note: "Better risk stratification allows more efficient retrocession purchasing and ILS structuring",
      },
      {
        category: "Market opportunity capture",
        value: "$40M/year",
        note: "Ability to selectively write risks in markets competitors have exited (CA wildfire) at adequate pricing",
      },
    ],
    implementationTimeline: "48 months from research project to production underwriting integration",
    implementationPhases: [
      {
        phase: "Research and Proof of Concept",
        duration: "12 months",
        description:
          "Munich Re's research team validated that satellite-derived features could predict nat cat losses better than terrain data alone. Proof of concept on California wildfire using 2017–2020 fire seasons.",
        keyOutputs: ["PoC wildfire model (outperforms RMS WildFire on CA)", "Satellite feature engineering framework", "Research paper published"],
      },
      {
        phase: "Global Data Infrastructure",
        duration: "12 months",
        description:
          "Built petabyte-scale satellite data pipeline on Google Earth Engine and Databricks. Ingested and normalised 50-year proprietary loss database. Built PostGIS spatial database for global property exposure.",
        keyOutputs: ["Global satellite processing pipeline", "Unified geospatial data warehouse", "50-year loss data digitised and geocoded"],
      },
      {
        phase: "Peril Model Development",
        duration: "12 months",
        description:
          "Developed and validated models for wildfire, riverine flood, coastal flood, and wind. Each model validated against held-out historical loss events and reviewed by Munich Re's actuarial council.",
        keyOutputs: ["4 peril-specific production models", "Actuarial council validation", "Backtesting report vs. major historical events"],
      },
      {
        phase: "Underwriting Integration & Rollout",
        duration: "12 months",
        description:
          "Integrated geo:unison outputs into Munich Re's treaty and facultative underwriting platforms. Underwriter training on interpreting AI risk scores alongside vendor models. Rollout to European, US, and Asia-Pacific books.",
        keyOutputs: ["Underwriting platform integration", "Global rollout", "Underwriter training programme"],
      },
    ],
    teamSize: "45 engineers, 20 data scientists, 12 geospatial specialists, 15 actuaries, 8 NatCat underwriting domain experts",
    challenges: [
      "Petabyte-scale satellite data processing: Processing global Sentinel-2 imagery required significant investment in Google Earth Engine and Databricks infrastructure",
      "Actuarial validation rigour: Munich Re's actuarial council required the model to meet the same standards as Solvency II internal models, requiring 12 months of backtesting",
      "Vendor model comparison: Demonstrating proprietary model outperformance required agreed-upon methodology - contentious as vendor models are black boxes",
      "Underwriter workflow integration: Underwriters were accustomed to vendor model outputs and needed guidance on how to use and weight an additional proprietary score",
      "Climate model uncertainty: CMIP6 scenarios have wide uncertainty ranges for 2050+ projections, requiring the model to express uncertainty rather than point estimates",
    ],
    governanceFramework: [
      "Proprietary model used as supplementary tool - vendor cat models still required for all treaty pricing",
      "Annual actuarial council review of model performance vs. actual loss emergence",
      "Independent external validation every 3 years",
      "Underwriter override documentation when deviating from AI-indicated pricing",
      "Catastrophe event post-mortems: every major event triggers model performance review and recalibration",
    ],
    dataPrivacy: [
      "No individual policyholder data used in model training - only aggregate loss event data",
      "Satellite imagery is public domain (Sentinel-2, Landsat) or licensed without privacy constraints",
      "Property database data licensed from CoreLogic/Verisk under enterprise agreements with data security provisions",
      "GDPR-compliant for any European property data",
    ],
    humanOversight:
      "All underwriting decisions are made by qualified cat underwriters. geo:unison provides an additional data point for underwriter judgement, not a replacement. Treaty pricing above €100M requires Head of NatCat Underwriting review regardless of model output. All model outputs reviewed by actuarial team before any pricing authority limits are adjusted.",
    regulatoryConsiderations: [
      "Solvency II internal model governance if geo:unison outputs are used in SCR calculations",
      "IAIS standards on climate risk in insurance supervision",
      "TCFD-aligned climate risk disclosure requirements",
      "EU Taxonomy Regulation on sustainable finance (for climate risk reporting)",
      "Lloyd's Market Oversight on cat model usage requirements",
    ],
    lessonsLearned: [
      "Publishing research findings externally (academic papers) accelerated credibility with regulators and internal actuarial teams",
      "Petabyte-scale geospatial ML requires a dedicated platform team - this cannot be done with standard data science infrastructure",
      "The model's value is highest at the sub-grid level where vendor models are weakest - target integration to those use cases first",
      "Climate model uncertainty must be expressed explicitly in outputs, not hidden - underwriters need to understand the forward-looking uncertainty range",
      "Validating against individual historical events (Hurricane Harvey, 2018 California wildfires) was more persuasive than aggregate statistics for underwriter adoption",
    ],
    whatWorkedWell: [
      "Google Earth Engine handled the global satellite processing workload without requiring Munich Re to build custom distributed computing infrastructure",
      "Publishing wildfire PoC as a research paper generated external credibility and attracted top geospatial ML talent",
      "Integrating proprietary data as a supplement to (not replacement for) vendor models reduced underwriter resistance significantly",
    ],
    references: [
      {
        label: "Munich Re: NatCat Knowledge and Data",
        url: "https://www.munichre.com/en/solutions/for-industry-clients/natcat-knowledge-and-data.html",
      },
      {
        label: "Munich Re: Digital and Data Strategy",
        url: "https://www.munichre.com/en/company/digital-and-data.html",
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
