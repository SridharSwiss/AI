import type { CaseStudyData } from "./case-studies-types";

export const caseStudiesData10: CaseStudyData[] = [
  {
    id: "ocado-ai-fulfillment-robotics",
    slug: "ocado-ai-fulfillment-robotics",
    company: "Ocado",
    industry: "Retail",
    title: "Ocado: How AI and Swarm Robotics Turned Online Grocery Fulfillment Into a Licensable Platform",
    problem:
      "Online grocery is one of the hardest fulfillment problems in retail: orders contain dozens of items across ambient, chilled, and frozen temperature zones, margins are razor-thin, and demand is volatile. Traditional store-picking and conventional warehouses cannot economically assemble thousands of multi-item grocery orders per hour with the accuracy, speed, and freshness customers expect, especially at national scale.",
    solution:
      "Ocado built the Ocado Smart Platform (OSP): highly automated Customer Fulfillment Centres where thousands of wheeled robots move across a giant aluminium grid (the 'Hive'), retrieving stock bins and delivering them to pick stations in seconds. AI orchestrates the whole system — machine-learning models drive demand forecasting, inventory placement, real-time robot routing and air-traffic-control-style collision avoidance (with robots communicating over a 4G network many times per second), and route optimization for last-mile delivery. Ocado also applies computer vision and machine learning to robotic picking arms that grasp varied grocery items, and to reducing food waste through more accurate forecasting.",
    outcome:
      "Ocado transformed from a UK online grocer into a global technology and robotics licensor, signing partnerships with major retailers worldwide — including Kroger in the US, Casino in France, Aeon in Japan, and others — to build automated fulfillment centres powered by its AI platform. Its grids coordinate thousands of robots simultaneously with sub-second decision-making, achieving order-assembly speeds and accuracy that manual operations cannot match, and turning the company's software and robotics into its primary long-term value driver.",
    metrics: [
      "Thousands of robots per fulfillment centre coordinated in real time on a single grid",
      "Robots communicate over a wireless network many times per second for collision-free routing",
      "Multi-item grocery orders assembled in minutes rather than manual-picking hours",
      "AI demand forecasting across tens of thousands of SKUs and three temperature zones",
      "Global platform deals with Kroger (US), Casino (France), Aeon (Japan), and other retailers",
      "Machine-learning robotic picking arms handling varied, deformable grocery items",
    ],
    tags: ["Robotics", "Machine Learning", "Supply Chain", "Computer Vision", "Optimization"],
    featured: true,
    businessContext:
      "Ocado Group, founded in 2000 in the UK, began as a pure-play online supermarket and evolved into a technology company that licenses its automated fulfillment and AI software to grocers worldwide through Ocado Solutions. Because it never operated physical stores, Ocado was forced to solve online grocery economics from first principles, making automation and AI the core of its business model rather than an add-on to a retail estate.",
    strategicDrivers: [
      "Fulfillment economics: only heavy automation makes multi-item online grocery profitable at scale",
      "Platform leverage: packaging its robotics and AI as a licensable platform multiplies returns beyond its own grocery sales",
      "Real-time orchestration: coordinating thousands of robots safely requires AI-driven routing no human dispatcher could match",
      "Freshness and waste: accurate ML forecasting reduces spoilage in a low-margin, perishable-heavy category",
    ],
    lessonsLearned: [
      "Automation is the product: Ocado's durable value came from its software and robotics, not from selling groceries",
      "Coordination beats raw speed: the hard AI problem is routing thousands of robots collision-free, not making one robot fast",
      "Forecasting drives everything downstream: better demand prediction improves inventory, picking efficiency, and waste at once",
      "Solve it for yourself, then license it: proving the platform in its own operations made it credible to global retail partners",
    ],
    implementationTimeline: "2000–2024: from a pure-play UK online grocer to a global licensor of AI-driven fulfillment robotics",
    implementationPhases: [
      { phase: "Phase 1 — In-House Automation", duration: "12 years", description: "Built and iterated automated warehouses to make its own online grocery operation economically viable" },
      { phase: "Phase 2 — The Grid & Swarm Robotics", duration: "5 years", description: "Developed the Hive grid with thousands of coordinated robots and AI-driven real-time routing and forecasting" },
      { phase: "Phase 3 — Global Platform Licensing", duration: "ongoing", description: "Packaged the Ocado Smart Platform and signed CFC deals with Kroger, Casino, Aeon, and other international retailers" },
    ],
  },
  {
    id: "recursion-ai-drug-discovery",
    slug: "recursion-ai-drug-discovery",
    company: "Recursion Pharmaceuticals",
    industry: "Pharma",
    title: "Recursion: How an Industrial-Scale AI and Automated Biology Platform Reinvents Early Drug Discovery",
    problem:
      "Traditional drug discovery is slow, expensive, and failure-prone: identifying which biological targets and compounds are worth pursuing relies on painstaking, hypothesis-by-hypothesis experiments, and the overwhelming majority of candidates fail before ever reaching patients. The industry needed a way to explore biological and chemical space at a scale and speed that human-led wet-lab science cannot achieve.",
    solution:
      "Recursion built a 'techbio' platform that fuses massive automated wet-lab biology with machine learning. Robotic systems run millions of experiments, perturbing human cells with genes and compounds and capturing high-content microscopy images, which computer-vision and deep-learning models convert into high-dimensional 'phenomic' fingerprints. Machine learning maps relationships across these fingerprints to reveal disease biology and predict which compounds are likely to work — building one of the largest proprietary biological and chemical datasets in the world (petabytes of data). Recursion later partnered with NVIDIA to accelerate its foundation models and merged with Exscientia to combine phenomics with AI-driven molecule design.",
    outcome:
      "Recursion turned drug discovery into a data-and-compute-driven, industrialized process, generating a proprietary dataset measured in petabytes and running millions of experiments per week across its automated labs. The platform produced a pipeline of AI-discovered drug candidates advancing into clinical trials and attracted major pharma partnerships (including Roche/Genentech, Bayer, and Sanofi) worth billions in potential milestones, making Recursion one of the most-cited examples of AI-native drug discovery at scale.",
    metrics: [
      "Millions of automated biology experiments run per week across robotic labs",
      "Petabyte-scale proprietary phenomics dataset linking cellular images to biology",
      "Deep-learning computer vision converting cell images into high-dimensional fingerprints",
      "AI-discovered candidates advanced into clinical-stage trials",
      "Multi-billion-dollar partnerships with Roche/Genentech, Bayer, and Sanofi",
      "NVIDIA collaboration to train biological foundation models on GPU supercomputing",
    ],
    tags: ["Drug Discovery", "Deep Learning", "Computer Vision", "Automation", "Foundation Models"],
    featured: true,
    businessContext:
      "Recursion Pharmaceuticals, founded in 2013 and headquartered in Salt Lake City, pioneered the 'techbio' model — treating drug discovery as an engineering and data problem rather than a purely biological one. Public since 2021, it competes at the intersection of automated laboratory science, high-performance computing, and machine learning, betting that owning a vast, consistent, proprietary biological dataset is the decisive advantage in discovering new medicines.",
    strategicDrivers: [
      "Scale over intuition: running millions of standardized experiments explores biology far beyond hypothesis-led science",
      "Proprietary data moat: a massive, internally consistent dataset is the fuel that makes the AI models valuable",
      "Reduce late-stage failure: better early prediction of what works aims to cut the industry's costly attrition rate",
      "Compute as a discovery engine: partnering for GPU supercomputing lets biology foundation models scale",
    ],
    lessonsLearned: [
      "Data consistency is the moat: value comes from a huge dataset generated under uniform automated conditions, not scattered public data",
      "Marry the wet lab and the model: automated biology and machine learning have to be built as one closed loop",
      "Phenotype-first can reveal biology: reading cellular images at scale surfaces relationships that target-by-target work misses",
      "Partnerships validate the platform: big-pharma deals and a merger with Exscientia proved the approach beyond internal pipelines",
    ],
    implementationTimeline: "2013–2024: from a phenomics startup to an industrial-scale AI drug-discovery platform with a clinical pipeline",
    implementationPhases: [
      { phase: "Phase 1 — Automated Phenomics", duration: "5 years", description: "Built robotic labs and computer-vision models to turn millions of cell-perturbation images into biological fingerprints" },
      { phase: "Phase 2 — Platform & Pipeline", duration: "4 years", description: "Scaled the dataset to petabytes, advanced AI-discovered candidates toward the clinic, and signed major pharma partnerships" },
      { phase: "Phase 3 — Foundation Models & Consolidation", duration: "ongoing", description: "Partnered with NVIDIA for biological foundation models and merged with Exscientia to add AI-driven molecule design" },
    ],
  },
  {
    id: "bank-of-america-erica-virtual-assistant",
    slug: "bank-of-america-erica-virtual-assistant",
    company: "Bank of America",
    industry: "Finance",
    title: "Bank of America: How the Erica Virtual Assistant Scaled AI Banking to Billions of Client Interactions",
    problem:
      "Serving tens of millions of retail banking clients with fast, personalized help is enormously expensive through call centers and branches alone, and customers increasingly expect instant, 24/7 answers inside their mobile app. Bank of America needed a way to handle routine banking questions, surface proactive financial insights, and reduce servicing costs — while operating within the strict security, privacy, and compliance constraints of a heavily regulated bank.",
    solution:
      "Bank of America built Erica, an AI-powered virtual financial assistant embedded in its mobile app, using natural-language understanding to interpret client requests by voice, text, or tap. Erica handles everyday banking — checking balances, finding transactions, paying bills, monitoring subscriptions — and proactively delivers personalized insights such as unusual-spending alerts, upcoming bills, and recurring-charge increases. The bank continuously retrained its NLU models on real client interactions to improve intent recognition, and later extended the same AI capabilities internally to help employees serve clients and to power search across other business lines.",
    outcome:
      "Erica became one of the most widely used financial AI assistants in the world, surpassing over 2 billion client interactions since its 2018 launch and serving tens of millions of active users. It reduced pressure on call centers by resolving routine requests instantly, improved digital engagement and client satisfaction, and delivered proactive insights that helped customers manage their money — establishing Bank of America as a leading example of conversational AI deployed responsibly at massive scale in a regulated industry.",
    metrics: [
      "2 billion+ client interactions handled since the 2018 launch",
      "Tens of millions of active users engaging with Erica in the mobile app",
      "Natural-language understanding across voice, text, and tap inputs",
      "Proactive personalized insights: spending alerts, bill reminders, recurring-charge changes",
      "Continuous NLU retraining on real interactions to sharpen intent recognition",
      "Reduced call-center load by resolving routine servicing requests instantly, 24/7",
    ],
    tags: ["Conversational AI", "Natural Language Processing", "Financial Services", "Personalization", "Virtual Assistant"],
    featured: false,
    businessContext:
      "Bank of America is one of the largest US banks, serving tens of millions of consumer and small-business clients. As part of a multi-billion-dollar technology and digital-transformation investment, the bank treated conversational AI as central to its client experience strategy, building Erica in-house to keep control of data, security, and the customer relationship rather than relying on third-party assistants.",
    strategicDrivers: [
      "Cost-to-serve: automating routine servicing reduces expensive call-center and branch interactions",
      "Always-on engagement: an in-app assistant meets clients' expectation of instant 24/7 help",
      "Proactive value: surfacing insights before clients ask deepens trust and daily app engagement",
      "Own the AI in-house: building Erica internally keeps sensitive financial data and the client relationship under the bank's control",
    ],
    lessonsLearned: [
      "Narrow and reliable beats broad and flaky: focusing Erica on core banking tasks built trust before expanding scope",
      "Proactive insights drive stickiness: unprompted, personalized nudges engaged clients more than reactive Q&A alone",
      "Continuous retraining is essential: intent recognition improved only by learning from real client language over time",
      "Regulated AI needs guardrails first: security, privacy, and compliance shaped the design from the outset, not as an afterthought",
    ],
    implementationTimeline: "2016–2024: from concept to a virtual assistant surpassing 2 billion client interactions and expanding across the bank",
    implementationPhases: [
      { phase: "Phase 1 — Build & Launch", duration: "24 months", description: "Developed Erica's NLU engine in-house and launched the virtual assistant inside the mobile banking app" },
      { phase: "Phase 2 — Scale & Proactive Insights", duration: "36 months", description: "Grew to tens of millions of users and added proactive spending, bill, and subscription insights driven by ML" },
      { phase: "Phase 3 — Enterprise Expansion", duration: "ongoing", description: "Extended Erica's AI capabilities to employee-facing tools and other business lines, surpassing 2 billion interactions" },
    ],
  },
  {
    id: "grammarly-ai-writing-assistant",
    slug: "grammarly-ai-writing-assistant",
    company: "Grammarly",
    industry: "Software",
    title: "Grammarly: How NLP and Generative AI Built a Writing Assistant Used by Tens of Millions Daily",
    problem:
      "Writing clearly and correctly is a universal need, but grammar checkers of the past were shallow rule-based tools that missed context, produced awkward suggestions, and could not help with tone, clarity, or full-sentence rewriting. Delivering real-time, context-aware writing help across every app a person uses — email, documents, browsers, messaging — at massive scale and low latency is a hard natural-language-processing and systems problem.",
    solution:
      "Grammarly built a writing-assistance platform powered by natural-language processing and deep learning that goes far beyond spelling and grammar to address clarity, conciseness, tone, and engagement in real time. Its models analyze text as users type across the web and desktop apps, offering context-aware suggestions and explanations. With the rise of large language models, Grammarly added generative AI (GrammarlyGO) for drafting, rewriting, and tone adjustment, while investing heavily in responsible-AI practices, privacy safeguards, and enterprise-grade security to deploy generative features to businesses.",
    outcome:
      "Grammarly grew into one of the most widely used AI writing tools in the world, serving tens of millions of daily active users and thousands of enterprise and institutional customers. Its real-time assistant became a default layer across email, documents, and browsers, and its move into generative AI extended it from correcting writing to helping people produce it — making Grammarly a leading consumer-and-enterprise example of applied NLP and responsibly deployed generative AI.",
    metrics: [
      "Tens of millions of daily active users writing with real-time assistance",
      "Context-aware suggestions across grammar, clarity, conciseness, and tone",
      "Works in real time across web, desktop, browsers, email, and documents",
      "GrammarlyGO generative-AI features for drafting, rewriting, and tone adjustment",
      "Thousands of enterprise and institutional customers using team and security features",
      "Responsible-AI, privacy, and enterprise-security investment to deploy generative AI at scale",
    ],
    tags: ["Natural Language Processing", "Generative AI", "Deep Learning", "SaaS", "Responsible AI"],
    featured: false,
    businessContext:
      "Grammarly, founded in 2009, pioneered AI-powered writing assistance and grew into a widely used productivity platform spanning consumers, professionals, and enterprises. Its strategy centers on being an ambient, cross-application layer that improves communication wherever people write, using machine learning as its core product engine and expanding from correction into generative assistance as LLM technology matured.",
    strategicDrivers: [
      "Ubiquity as strategy: value comes from working everywhere a person writes, not inside a single editor",
      "From correction to creation: adding generative AI expands the product from fixing writing to helping produce it",
      "Trust and privacy: handling users' text responsibly is a prerequisite for consumer and enterprise adoption",
      "Enterprise expansion: security, admin controls, and responsible-AI practices unlock high-value business customers",
    ],
    lessonsLearned: [
      "Context beats rules: deep-learning NLP delivered writing help that rigid rule-based checkers never could",
      "Distribution is a moat: being embedded across every app made Grammarly a default, hard-to-displace layer",
      "Generative AI is an extension, not a pivot: LLM features built on an existing trusted writing surface and user base",
      "Trust is the product for text AI: privacy safeguards and responsible-AI practices were essential to keep users and win enterprises",
    ],
    implementationTimeline: "2009–2024: from an online grammar checker to an NLP-and-generative-AI writing platform used by tens of millions daily",
    implementationPhases: [
      { phase: "Phase 1 — NLP Writing Engine", duration: "several years", description: "Built deep-learning NLP models delivering real-time grammar, clarity, and tone suggestions across apps" },
      { phase: "Phase 2 — Cross-Platform Scale", duration: "several years", description: "Expanded to browsers, desktop, and mobile, reaching tens of millions of daily users and launching enterprise offerings" },
      { phase: "Phase 3 — Generative AI", duration: "ongoing", description: "Launched GrammarlyGO for drafting and rewriting, backed by responsible-AI, privacy, and enterprise-security investment" },
    ],
  },
];
