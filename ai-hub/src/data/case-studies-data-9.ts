import type { CaseStudyData } from "./case-studies-types";

export const caseStudiesData9: CaseStudyData[] = [
  {
    id: "waymo-autonomous-driving",
    slug: "waymo-autonomous-driving",
    company: "Waymo",
    industry: "Automotive",
    title: "Waymo: How a Decade of AI Turned Self-Driving From Research Demo to Paid Robotaxi Service",
    problem:
      "Autonomous driving is one of the hardest applied AI problems ever attempted: a vehicle must perceive a chaotic, unstructured world at highway speed, predict the intentions of pedestrians, cyclists, and other drivers, and plan safe actions in real time — with zero tolerance for the kinds of errors that are acceptable in most machine-learning products. For years, self-driving was stuck as an impressive demo that could not handle the long tail of rare, dangerous, real-world edge cases at production reliability.",
    solution:
      "Waymo, spun out of the Google Self-Driving Car Project, built the Waymo Driver: a full-stack autonomy system combining lidar, radar, and camera sensor fusion with deep-learning perception, behavior-prediction models, and machine-learned planning. The system is trained on tens of millions of real-world autonomous miles plus tens of billions of simulated miles in Waymo's Carcraft/Simulation City environment, where rare scenarios are replayed and perturbed thousands of times to harden the models. Waymo removed safety drivers and launched Waymo One, a fully driverless commercial robotaxi service.",
    outcome:
      "Waymo became the first company to operate a scaled, fully driverless, paid ride-hailing service to the public — in Phoenix, San Francisco, Los Angeles, and Austin — surpassing millions of paid rider-only trips and, by 2024, delivering over 150,000 paid autonomous rides per week. Waymo's published safety research showed its driverless vehicles involved in substantially fewer injury-causing crashes per mile than human drivers over tens of millions of rider-only miles, making it the leading real-world proof that AI-driven autonomy can operate safely at commercial scale.",
    metrics: [
      "150,000+ paid fully driverless rides per week by late 2024",
      "Tens of millions of rider-only (no safety driver) miles driven on public roads",
      "20+ billion miles driven in simulation to train and validate the Waymo Driver",
      "Published safety data showing significantly fewer injury-causing crashes per mile than human benchmarks",
      "Fully driverless commercial operation across Phoenix, San Francisco, Los Angeles, and Austin",
      "Sensor fusion across lidar, radar, and cameras for 360-degree real-time perception",
    ],
    tags: ["Autonomous Vehicles", "Computer Vision", "Deep Learning", "Sensor Fusion", "Robotics"],
    featured: true,
    businessContext:
      "Waymo LLC, a subsidiary of Alphabet, traces its origins to the Google Self-Driving Car Project launched in 2009. After more than a decade of R&D, Waymo transitioned from experimental testing to a revenue-generating robotaxi operator, positioning autonomy as a transformational transportation business. It competes in a capital-intensive field where safety validation, regulatory approval, and public trust are as decisive as raw AI capability.",
    strategicDrivers: [
      "Safety-first proof: demonstrating measurably safer-than-human driving is the prerequisite for regulatory and public acceptance",
      "Simulation scale: validating the long tail of rare events requires billions of simulated miles that physical driving cannot provide",
      "Commercial viability: moving from demos to paid rider-only service proves autonomy can be a real business, not just research",
      "Full-stack integration: combining sensing, perception, prediction, and planning into one continuously improving AI system",
    ],
    lessonsLearned: [
      "The long tail is the product: solving rare edge cases, not the common case, is what separates a demo from a deployable driver",
      "Simulation is a force multiplier: replaying and perturbing real incidents billions of times hardens models faster than road miles alone",
      "Remove the safety driver deliberately: rider-only operation is the true test — and Waymo expanded it city by city, not all at once",
      "Publish safety evidence: transparent, peer-reviewable crash-rate data built the regulatory and public trust the business depends on",
    ],
    implementationTimeline: "2009–2024: from the Google Self-Driving Car Project to a scaled, fully driverless commercial robotaxi service across four US cities",
    implementationPhases: [
      { phase: "Phase 1 — Research & Testing", duration: "8 years", description: "Built the full-stack Waymo Driver; accumulated millions of test miles with safety drivers and developed large-scale simulation infrastructure" },
      { phase: "Phase 2 — Driverless Pilot", duration: "3 years", description: "Removed safety drivers in Phoenix; launched Waymo One rider-only service and validated safety over millions of driverless miles" },
      { phase: "Phase 3 — Multi-City Scaling", duration: "2 years", description: "Expanded fully driverless paid service to San Francisco, Los Angeles, and Austin, reaching 150,000+ paid rides per week" },
    ],
  },
  {
    id: "stitch-fix-styling-ai",
    slug: "stitch-fix-styling-ai",
    company: "Stitch Fix",
    industry: "Retail",
    title: "Stitch Fix: How Human-in-the-Loop AI Powers Personalized Styling at Scale",
    problem:
      "Personal styling is deeply subjective, yet Stitch Fix's business model depends on shipping a curated box of clothing that a customer will actually keep — without the customer browsing or selecting items themselves. Doing this profitably across millions of clients, tens of thousands of SKUs, and constantly shifting fashion trends is impossible with human stylists alone: they cannot hold that much data in their heads, and pure algorithms cannot capture the nuance of taste, fit, and occasion.",
    solution:
      "Stitch Fix built a data-science-first operating model where machine learning and human stylists work together. Recommendation algorithms score which items best match each client's style profile, size, price preferences, and feedback history, then present a ranked shortlist to a human stylist who applies judgment and personal context before finalizing the box. The company applies ML across the business: demand forecasting, inventory allocation, warehouse assignment, and even algorithmically-assisted apparel design (Hybrid Designs) that creates new garments to fill gaps in style-attribute space identified by data.",
    outcome:
      "Stitch Fix turned personalization into its core competitive moat, serving millions of active clients with a recommendation-plus-stylist model that neither pure automation nor pure human curation could match. Its data platform became a widely cited example of applied ML in retail, with the company employing over a hundred data scientists and publishing its algorithms-tour and MultiThreaded engineering content. The human-in-the-loop approach improved keep rates and client satisfaction while allowing stylists to serve far more clients than manual curation would allow.",
    metrics: [
      "Millions of active clients styled through combined algorithmic + human curation",
      "Recommendation models scoring tens of thousands of SKUs against each client's style profile",
      "Human-in-the-loop workflow: algorithms shortlist, expert stylists finalize every box",
      "ML applied across demand forecasting, inventory allocation, and warehouse routing",
      "Hybrid Designs: algorithmically-assisted apparel created to fill gaps in style-attribute space",
      "100+ data scientists building a personalization engine as the company's core moat",
    ],
    tags: ["Recommendation Systems", "Personalization", "Human-in-the-Loop", "Machine Learning", "E-commerce"],
    featured: false,
    businessContext:
      "Stitch Fix, founded in 2011 and public since 2017, pioneered the algorithmic personal-styling subscription model in apparel retail. Unlike traditional e-commerce where customers self-select, Stitch Fix owns the curation decision, making the accuracy of its recommendations directly tied to revenue, returns, and retention. The company built one of the most-referenced data-science organizations in consumer retail, treating machine learning as a first-class business function rather than a support tool.",
    strategicDrivers: [
      "Curation as the product: because clients don't browse, recommendation accuracy directly determines keep rates and revenue",
      "Blend judgment with scale: pairing algorithms with human stylists captures taste nuance no model can fully encode",
      "Inventory efficiency: ML forecasting and allocation reduce the cost of holding and shipping the wrong stock",
      "Design from data: identifying unmet style gaps lets Stitch Fix create products the market is under-serving",
    ],
    lessonsLearned: [
      "Humans and models are complements, not competitors: the stylist-plus-algorithm loop beat either approach alone",
      "Personalization compounds with feedback: every kept or returned item sharpens the next recommendation",
      "ML belongs across the value chain: the biggest gains came from forecasting and logistics, not just the styling recommendation",
      "Data can drive creation: attribute-gap analysis turned recommendation data into a product-design capability",
    ],
    implementationTimeline: "2011–2023: from a styling startup to a data-science-driven retailer applying ML across curation, logistics, and design",
    implementationPhases: [
      { phase: "Phase 1 — Recommendation Core", duration: "24 months", description: "Built client style profiles and recommendation models scoring inventory against preferences, size, and feedback" },
      { phase: "Phase 2 — Human-in-the-Loop Scale", duration: "24 months", description: "Integrated algorithms into the stylist workflow so experts finalize algorithmically-shortlisted boxes at scale" },
      { phase: "Phase 3 — Full-Stack ML", duration: "ongoing", description: "Extended ML to demand forecasting, inventory allocation, warehouse routing, and algorithmically-assisted Hybrid Designs" },
    ],
  },
  {
    id: "dbs-bank-ai-transformation",
    slug: "dbs-bank-ai-transformation",
    company: "DBS Bank",
    industry: "Finance",
    title: "DBS Bank: How Asia's Digital Bank Scaled AI to Hundreds of Use Cases and Measured Its Economic Impact",
    problem:
      "Traditional banks struggle to move AI beyond isolated pilots into measurable, enterprise-wide value. DBS, Southeast Asia's largest bank, wanted to embed AI and machine learning across customer engagement, risk, and operations — but faced the challenge of doing so responsibly in a heavily regulated industry, while proving that AI actually generated economic returns rather than just experimentation costs.",
    solution:
      "DBS built an industrialized AI and data operating model, deploying machine learning across hyper-personalized customer nudges, credit and risk decisioning, fraud and anti-money-laundering surveillance, and internal productivity tools. The bank standardized its data platform, established a responsible-AI governance framework (its PURE framework: Purposeful, Unsurprising, Respectful, Explainable), and scaled from dozens to hundreds of AI/ML use cases in production. It later introduced generative-AI assistants for employees to accelerate coding, customer service, and knowledge work.",
    outcome:
      "DBS grew to over 800 AI/ML models across 350+ use cases and publicly quantified the economic impact of AI at roughly S$370 million in 2023, with guidance that the figure would rise materially in following years. Personalized 'nudges' driven by ML measurably improved customer financial outcomes and engagement, while AI-driven risk and surveillance strengthened compliance. DBS became one of the most-cited examples globally of a traditional bank achieving scaled, governed, and financially measurable AI adoption.",
    metrics: [
      "800+ AI/ML models deployed across 350+ use cases in production",
      "~S$370 million in measured economic impact from AI in 2023, projected to grow materially",
      "Hyper-personalized ML 'nudges' improving customer engagement and financial decisions",
      "PURE responsible-AI governance framework (Purposeful, Unsurprising, Respectful, Explainable)",
      "AI-driven fraud, AML, and risk surveillance across the bank's operations",
      "Generative-AI assistants rolled out to employees for coding, service, and knowledge work",
    ],
    tags: ["Machine Learning", "Responsible AI", "Financial Services", "Personalization", "Enterprise AI"],
    featured: true,
    businessContext:
      "DBS Bank, headquartered in Singapore, is the largest bank in Southeast Asia and has been repeatedly named the world's best digital bank. Its multi-year transformation from a traditional bank into a technology-driven institution made data and AI central to strategy. Operating across multiple Asian markets under strict financial regulation, DBS treated governed, explainable AI as a competitive advantage and a board-level priority rather than a technical experiment.",
    strategicDrivers: [
      "Prove the economics: DBS insisted on quantifying AI's dollar impact to justify continued enterprise investment",
      "Responsible AI as a license to operate: a regulated bank needs governed, explainable models to deploy AI at scale",
      "Personalization at scale: ML nudges let the bank serve millions of customers with individually relevant guidance",
      "Industrialize, don't pilot: standardized data and MLOps platforms turned scattered experiments into hundreds of production use cases",
    ],
    lessonsLearned: [
      "Measure the money: attaching a hard economic figure to AI shifted it from cost center to strategic investment",
      "Governance enables scale: the PURE framework let DBS deploy widely without breaching regulatory or ethical limits",
      "Platform before proliferation: a standardized data and model platform was the precondition for reaching 350+ use cases",
      "Personalization must help the customer: nudges succeeded because they improved customer outcomes, not just bank metrics",
    ],
    implementationTimeline: "2014–2024: from digital-transformation foundations to 800+ AI/ML models with quantified, board-reported economic impact",
    implementationPhases: [
      { phase: "Phase 1 — Digital & Data Foundation", duration: "36 months", description: "Rebuilt technology stack and data platform; established a data-driven culture and initial ML use cases" },
      { phase: "Phase 2 — Governed Scaling", duration: "36 months", description: "Adopted the PURE responsible-AI framework and industrialized MLOps to scale into hundreds of production use cases" },
      { phase: "Phase 3 — Impact & Generative AI", duration: "24 months", description: "Quantified ~S$370M economic impact and rolled out generative-AI assistants to employees across the bank" },
    ],
  },
  {
    id: "shell-ai-predictive-maintenance",
    slug: "shell-ai-predictive-maintenance",
    company: "Shell",
    industry: "Industrial",
    title: "Shell: How AI-Driven Predictive Maintenance Monitors Thousands of Pieces of Equipment in Real Time",
    problem:
      "Energy operations run on tens of thousands of pieces of rotating and safety-critical equipment — compressors, valves, pumps, and turbines — spread across refineries, offshore platforms, and processing plants. Unplanned equipment failure is enormously expensive and potentially dangerous, while traditional time-based maintenance either services equipment too early (wasting cost) or too late (risking catastrophic failure). Predicting failures before they happen, across a global asset base, is a massive-scale machine-learning and IoT challenge.",
    solution:
      "Shell built an AI-driven predictive-maintenance program, partnering with C3 AI and Baker Hughes and using cloud platforms to ingest sensor data from equipment worldwide. Machine-learning models analyze real-time telemetry to detect anomalies and forecast the remaining useful life of critical assets, alerting engineers days or weeks before a likely failure. Shell scaled the program to monitor thousands of pieces of equipment and millions of sensor-driven predictions, and extended its AI investment into reservoir modeling, exploration, and a broad internal generative-AI and data-science upskilling effort.",
    outcome:
      "Shell's predictive-maintenance AI grew to monitor thousands of pieces of equipment and generate millions of predictions per day, helping avoid unplanned downtime, reduce maintenance costs, and improve safety by catching failures before they occurred. The program became a flagship industrial-AI case study, demonstrating that heavy-asset industries can operationalize machine learning at global scale. Shell reported that AI-enabled monitoring reduced unnecessary maintenance and prevented significant unplanned outages across its asset base.",
    metrics: [
      "Thousands of pieces of equipment monitored by ML models in real time",
      "Millions of machine-learning predictions generated per day from sensor telemetry",
      "Anomaly detection and remaining-useful-life forecasting days to weeks ahead of failure",
      "Partnerships with C3 AI and Baker Hughes to industrialize predictive maintenance",
      "Reduced unplanned downtime and avoided unnecessary time-based maintenance interventions",
      "AI extended into reservoir modeling, exploration, and enterprise-wide data-science upskilling",
    ],
    tags: ["Predictive Maintenance", "IoT", "Machine Learning", "Industrial AI", "Anomaly Detection"],
    featured: false,
    businessContext:
      "Shell plc is one of the world's largest energy companies, operating a vast global network of refineries, offshore platforms, chemical plants, and pipelines. In an industry where equipment reliability directly affects safety, cost, and environmental impact, Shell made AI and digitalization a core part of its operational strategy, investing in cloud data platforms, IoT sensing, and machine learning to shift from reactive and scheduled maintenance toward condition-based, predictive operations.",
    strategicDrivers: [
      "Avoid catastrophic failure: predicting equipment breakdown before it happens protects both safety and margins",
      "Optimize maintenance spend: condition-based servicing replaces wasteful time-based schedules across a huge asset base",
      "Operationalize at global scale: the value comes from monitoring thousands of assets continuously, not a single pilot site",
      "Build durable AI capability: partnerships plus internal upskilling created a lasting industrial-AI competence",
    ],
    lessonsLearned: [
      "Data plumbing is the hard part: ingesting reliable real-time sensor telemetry at global scale is the foundation of predictive maintenance",
      "Predict remaining life, not just failure: forecasting how long an asset will last is what makes maintenance planning actionable",
      "Partner to industrialize: working with C3 AI and Baker Hughes accelerated scaling beyond what internal teams could build alone",
      "Scale is the value: monitoring one compressor is a demo — monitoring thousands continuously is the business case",
    ],
    implementationTimeline: "2018–2024: from initial predictive-maintenance pilots to global-scale AI monitoring of thousands of equipment assets",
    implementationPhases: [
      { phase: "Phase 1 — Platform & Pilots", duration: "18 months", description: "Built cloud data ingestion for sensor telemetry and piloted anomaly-detection models on critical rotating equipment" },
      { phase: "Phase 2 — Industrial Scaling", duration: "24 months", description: "Partnered with C3 AI and Baker Hughes to scale predictive maintenance to thousands of assets and millions of daily predictions" },
      { phase: "Phase 3 — Enterprise AI Expansion", duration: "ongoing", description: "Extended AI into reservoir modeling and exploration and launched broad internal data-science and generative-AI upskilling" },
    ],
  },
];
