import type { CaseStudyData } from "./case-studies-types";

export const caseStudiesData14: CaseStudyData[] = [
  {
    id: "wells-fargo-fargo-assistant",
    slug: "wells-fargo-fargo-assistant",
    company: "Wells Fargo",
    industry: "Finance",
    title: "Wells Fargo: How the Fargo AI Assistant Scaled Conversational Banking to Millions",
    problem:
      "Wells Fargo serves tens of millions of customers who increasingly expect instant, self-service answers to everyday banking questions — checking balances, tracking spending, disputing charges, and paying bills — around the clock. Routing these routine interactions through call centers and branches is slow and costly, and older rules-based chatbots handled only narrow, scripted requests, leaving customers frustrated and support staff overloaded.",
    solution:
      "Wells Fargo built Fargo, a generative-AI-powered virtual assistant embedded in its mobile app that lets customers ask questions in natural language by voice or text. The bank designed the system around a privacy-conscious architecture that uses large language models for language understanding while keeping sensitive account data within its own secure environment, deliberately avoiding sending personal financial data to external model providers. Fargo helps customers with everyday tasks like transaction lookups, spending insights, bill pay, and card management.",
    outcome:
      "Fargo scaled rapidly to become one of the most heavily used generative-AI assistants in consumer banking, handling well over a hundred million interactions and growing quickly as adoption spread. It gave Wells Fargo a scalable, always-on service channel that resolves routine requests instantly, reduced pressure on call centers, and demonstrated a privacy-first blueprint for deploying LLMs in a highly regulated industry.",
    metrics: [
      "Generative-AI assistant embedded in the Wells Fargo mobile app",
      "Over a hundred million customer interactions handled",
      "Natural-language voice and text banking for everyday tasks",
      "Privacy-first architecture keeping account data in-house",
      "Transaction lookups, spending insights, and bill pay automated",
      "Reduced load on call centers and branch staff",
    ],
    tags: ["AI", "Conversational AI", "Finance", "Virtual Assistant", "Banking"],
    featured: true,
    businessContext:
      "Wells Fargo is one of the largest banks in the United States, serving tens of millions of retail customers across mobile, branch, and phone channels. As digital banking became the primary point of contact and generative AI matured, Wells Fargo invested in conversational AI to modernize customer service while navigating strict regulatory and data-privacy requirements, treating a trusted, privacy-preserving assistant as central to its digital strategy.",
    strategicDrivers: [
      "Self-service at scale: instant answers for millions without human agents",
      "Cost efficiency: automating routine requests reduces call-center volume",
      "Privacy and compliance: keeping sensitive data in-house meets regulatory demands",
      "Digital engagement: a capable assistant deepens mobile-app usage and loyalty",
    ],
    lessonsLearned: [
      "Privacy architecture matters: isolating account data from external models enables safe LLM use",
      "Start with everyday tasks: high-frequency routine requests deliver the fastest value",
      "Natural language lowers friction: voice and text access widen adoption",
      "Regulated industries can ship generative AI with the right guardrails",
    ],
    implementationTimeline: "2023–2025: from launching Fargo to scaling past a hundred million interactions with a privacy-first design",
    implementationPhases: [
      { phase: "Phase 1 — Assistant Launch", duration: "several months", description: "Introduced Fargo in the mobile app with natural-language support for common banking tasks" },
      { phase: "Phase 2 — Privacy-First Scaling", duration: "several months", description: "Refined an architecture that keeps sensitive account data in-house while using LLMs for language understanding" },
      { phase: "Phase 3 — Expansion", duration: "ongoing", description: "Grew interaction volume past a hundred million and broadened Fargo's capabilities across everyday banking" },
    ],
  },
  {
    id: "vodafone-tobi-chatbot",
    slug: "vodafone-tobi-chatbot",
    company: "Vodafone",
    industry: "Technology",
    title: "Vodafone: How the TOBi AI Chatbot Transformed Telecom Customer Service at Scale",
    problem:
      "Vodafone serves hundreds of millions of customers across dozens of markets, fielding enormous volumes of support contacts about billing, plans, device setup, and troubleshooting. Handling these through call centers is expensive, inconsistent across countries, and slow at peak times, while customers increasingly expect instant, always-available help in their own language across chat, app, and web channels.",
    solution:
      "Vodafone deployed TOBi, an AI-powered virtual assistant and chatbot that handles customer inquiries across web, app, and messaging channels in many markets and languages. TOBi uses natural-language understanding to resolve common requests — bill queries, plan changes, SIM and device help, and troubleshooting — automatically, escalating complex cases to human agents with context. Vodafone continued enhancing it with generative-AI capabilities to improve comprehension and handle a wider range of conversations.",
    outcome:
      "TOBi became one of the largest telecom deployments of conversational AI, handling a very large share of customer contacts automatically, deflecting routine inquiries from call centers, and cutting average handling and response times. It gave Vodafone consistent, always-on, multilingual service across markets, improved customer satisfaction for simple requests, and freed human agents to focus on complex, high-value interactions.",
    metrics: [
      "AI chatbot deployed across dozens of markets and many languages",
      "Large share of customer contacts handled automatically",
      "Web, app, and messaging-channel support with natural language",
      "Automated billing, plan-change, and device-troubleshooting resolution",
      "Reduced average handling time and call-center deflection",
      "Generative-AI enhancements to broaden conversation coverage",
    ],
    tags: ["AI", "Conversational AI", "Telecom", "Customer Service", "Chatbot"],
    featured: false,
    businessContext:
      "Vodafone is one of the world's largest telecommunications companies, operating across Europe, Africa, and beyond with hundreds of millions of customers. Facing high customer-service costs and rising expectations for instant digital support, Vodafone invested early in conversational AI to standardize and scale service across its diverse markets, treating an AI assistant as a core channel for efficient, multilingual customer engagement.",
    strategicDrivers: [
      "Volume deflection: automating routine contacts cuts call-center cost and load",
      "Consistency across markets: one AI assistant standardizes service in many countries",
      "Always-on multilingual support: instant help in customers' own languages",
      "Agent focus: routing complex cases to humans improves resolution quality",
    ],
    lessonsLearned: [
      "Multilingual scale is a differentiator: consistent service across markets compounds value",
      "Escalate with context: passing conversation history to agents preserves trust",
      "Generative AI extends coverage: LLMs handle conversations rules-based bots cannot",
      "Telecom support is high-frequency: automation delivers large aggregate savings",
    ],
    implementationTimeline: "2017–2025: from launching TOBi to scaling across markets and adding generative-AI capabilities",
    implementationPhases: [
      { phase: "Phase 1 — Chatbot Launch", duration: "several months", description: "Introduced TOBi for automated handling of common billing, plan, and device inquiries" },
      { phase: "Phase 2 — Multi-Market Rollout", duration: "several years", description: "Scaled the assistant across dozens of markets and languages with human escalation" },
      { phase: "Phase 3 — Generative AI", duration: "ongoing", description: "Enhanced comprehension and conversation coverage with generative-AI capabilities" },
    ],
  },
  {
    id: "hm-ai-fashion-supply-chain",
    slug: "hm-ai-fashion-supply-chain",
    company: "H&M",
    industry: "Retail",
    title: "H&M: How AI Optimized Fashion Demand Forecasting, Inventory, and Personalization",
    problem:
      "Fast fashion lives and dies on getting the right products, in the right sizes, to the right stores at the right time. H&M operates thousands of stores across many countries with fast-changing trends and short product lifecycles, where overstocking leads to costly markdowns and waste while understocking means lost sales. Predicting demand and allocating inventory manually across this scale is slow, imprecise, and increasingly unsustainable.",
    solution:
      "H&M built advanced analytics and AI capabilities to forecast demand, optimize inventory allocation, and personalize the shopping experience. It uses machine-learning models on sales, search, returns, and trend data to anticipate what will sell where, guiding buying and store- and market-level allocation. H&M applies AI to personalize product recommendations online, and invested in data science to reduce markdowns, cut excess inventory, and align assortments more tightly with local demand.",
    outcome:
      "H&M became a widely cited example of AI-driven retail operations, using demand forecasting and inventory optimization to reduce markdowns and overstock, improve product availability, and better match assortments to local tastes. AI-powered personalization lifted online engagement and conversion, while data-driven buying and allocation made the supply chain more responsive — helping H&M defend margins in a highly competitive, fast-moving fashion market.",
    metrics: [
      "Machine-learning demand forecasting across thousands of stores",
      "AI-driven inventory allocation by store and market",
      "Reduced markdowns and excess-inventory waste",
      "Personalized product recommendations for online shoppers",
      "Trend, search, and returns data feeding buying decisions",
      "Assortments better matched to local demand",
    ],
    tags: ["AI", "Machine Learning", "Retail", "Supply Chain", "Personalization"],
    featured: false,
    businessContext:
      "H&M is one of the world's largest fashion retailers, operating thousands of stores globally alongside a growing e-commerce business. In an industry defined by fast-changing trends, thin margins, and heavy markdown risk, H&M invested in data science and AI to modernize forecasting, inventory, and personalization — treating advanced analytics as essential to reducing waste and staying competitive against fast-fashion and online rivals.",
    strategicDrivers: [
      "Margin protection: better forecasting reduces costly markdowns and overstock",
      "Availability: AI allocation puts the right products where demand is",
      "Localization: data-driven assortments match regional tastes",
      "Personalization: AI recommendations lift online engagement and conversion",
    ],
    lessonsLearned: [
      "Forecasting is the lever: demand accuracy drives markdown and waste reduction",
      "Allocation beats aggregate buying: store- and market-level precision matters",
      "Fashion data is rich: search, returns, and trends improve predictions",
      "Sustainability and profit align: cutting overstock reduces both waste and cost",
    ],
    implementationTimeline: "2018–2024: from building data-science capability to scaling AI forecasting, allocation, and personalization",
    implementationPhases: [
      { phase: "Phase 1 — Data & Analytics Foundation", duration: "several years", description: "Built data-science teams and infrastructure to unify sales, trend, and returns data" },
      { phase: "Phase 2 — Forecasting & Allocation", duration: "several years", description: "Deployed ML demand forecasting and AI-driven inventory allocation across stores and markets" },
      { phase: "Phase 3 — Personalization", duration: "ongoing", description: "Expanded AI-powered recommendations and personalization across the online experience" },
    ],
  },
  {
    id: "kaiser-permanente-ai-clinical-deterioration",
    slug: "kaiser-permanente-ai-clinical-deterioration",
    company: "Kaiser Permanente",
    industry: "Healthcare",
    title: "Kaiser Permanente: How AI Early-Warning Models Detected Patient Deterioration and Saved Lives",
    problem:
      "In hospitals, patients on general wards can deteriorate suddenly — from sepsis, respiratory failure, or other complications — and warning signs are often subtle, scattered across vital signs and lab values, and easy to miss amid heavy clinical workloads. Late detection leads to emergency ICU transfers, worse outcomes, and preventable deaths. Clinicians need earlier, reliable signals to intervene before a patient crashes.",
    solution:
      "Kaiser Permanente developed and deployed an AI-based early-warning system, the Advance Alert Monitor, that continuously analyzes electronic health record data — vital signs, lab results, and other clinical variables — to predict which hospitalized patients are at high risk of deterioration within the next several hours. Alerts are routed to a remote team of monitoring nurses who review flagged patients and coordinate rapid intervention with bedside clinicians, embedding the model into a clear clinical workflow.",
    outcome:
      "The system was deployed across Kaiser Permanente Northern California hospitals and studied in large research covering hundreds of thousands of hospitalizations, with analyses associating the program with fewer deaths, reduced ICU admissions, and lives saved. It became one of the most rigorously validated real-world deployments of predictive AI in healthcare, showing that early-warning models paired with a human response workflow can measurably improve patient outcomes at scale.",
    metrics: [
      "AI early-warning model predicting deterioration hours in advance",
      "Deployed across Kaiser Permanente Northern California hospitals",
      "Studied across hundreds of thousands of hospitalizations",
      "Associated with reduced mortality and ICU admissions",
      "Alerts routed to a remote monitoring-nurse response team",
      "Continuous analysis of EHR vitals, labs, and clinical variables",
    ],
    tags: ["AI", "Machine Learning", "Healthcare", "Predictive Analytics", "Patient Safety"],
    featured: true,
    businessContext:
      "Kaiser Permanente is one of the largest integrated healthcare systems in the United States, combining hospitals, clinics, and health-plan coverage with a rich electronic health record spanning millions of members. Its integrated data and delivery model made it well suited to develop, validate, and operationalize predictive AI, treating early-warning systems and a coordinated clinical response as a way to improve patient safety and outcomes at scale.",
    strategicDrivers: [
      "Patient safety: earlier detection prevents avoidable deterioration and deaths",
      "Workflow integration: alerts paired with a response team drive real action",
      "Data advantage: an integrated EHR enables robust model development",
      "Outcome measurement: rigorous study validates real-world clinical impact",
    ],
    lessonsLearned: [
      "Models need a response workflow: predictions only help when someone acts on them",
      "Human-in-the-loop builds trust: monitoring nurses translate alerts into care",
      "Rigorous validation matters: large studies prove clinical benefit, not just accuracy",
      "Integrated data enables AI: unified EHRs are a foundation for predictive medicine",
    ],
    implementationTimeline: "2016–2024: from developing the Advance Alert Monitor to hospital-wide deployment and large-scale outcome studies",
    implementationPhases: [
      { phase: "Phase 1 — Model Development", duration: "several years", description: "Built and validated a predictive deterioration model on integrated electronic health record data" },
      { phase: "Phase 2 — Workflow Deployment", duration: "several years", description: "Deployed alerts to a remote monitoring-nurse team coordinating rapid bedside intervention" },
      { phase: "Phase 3 — Outcome Validation", duration: "ongoing", description: "Studied impact across hundreds of thousands of hospitalizations, showing reduced mortality and ICU use" },
    ],
  },
];
