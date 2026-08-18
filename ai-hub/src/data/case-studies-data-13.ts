import type { CaseStudyData } from "./case-studies-types";

export const caseStudiesData13: CaseStudyData[] = [
  {
    id: "mcdonalds-ai-drive-thru",
    slug: "mcdonalds-ai-drive-thru",
    company: "McDonald's",
    industry: "Retail",
    title: "McDonald's: How AI Personalized Menus and Automated the Drive-Thru at Global Scale",
    problem:
      "McDonald's serves tens of millions of customers a day across tens of thousands of restaurants, where even small improvements in ordering speed, accuracy, and upselling compound into enormous impact. Static menu boards cannot adapt to weather, time of day, or demand, drive-thru order-taking is labor-intensive and error-prone at peak hours, and personalizing suggestions across a massive, fast-moving customer base is impossible with manual processes.",
    solution:
      "McDonald's invested heavily in AI, acquiring personalization company Dynamic Yield to power decision-logic on digital menu boards and kiosks that adapt suggestions based on time of day, weather, current demand, and trending items. It acquired voice-technology firm Apprente to pilot automated voice ordering at the drive-thru, deployed AI-driven personalization across its mobile app and self-order kiosks, and later partnered with technology providers including Google Cloud and IBM to advance restaurant automation and AI-powered ordering.",
    outcome:
      "McDonald's became a leading example of AI applied to quick-service restaurants at massive scale, using dynamic personalization to increase average order value through smarter upsells and cross-sells, and testing automated voice ordering to speed service and free staff for other tasks. Its Dynamic Yield technology was rolled out to thousands of drive-thrus, and the company established digital, delivery, and drive-thru — powered by data and AI — as central pillars of its long-term growth strategy.",
    metrics: [
      "Dynamic Yield personalization deployed across thousands of drive-thru menu boards",
      "AI suggestions adapted to time of day, weather, and real-time demand",
      "Automated voice-ordering piloted via the Apprente acquisition",
      "AI-driven personalization across mobile app and self-order kiosks",
      "Upsell and cross-sell recommendations increasing average order value",
      "Partnerships with Google Cloud and IBM to advance restaurant AI",
    ],
    tags: ["Personalization", "AI", "Retail", "Voice AI", "Quick-Service Restaurants"],
    featured: true,
    businessContext:
      "McDonald's is the world's largest restaurant company by revenue, operating tens of thousands of locations globally with the drive-thru accounting for a large share of sales. As competition and labor costs rose, McDonald's pursued a data-and-technology strategy — branded around digital, delivery, and drive-thru — treating AI-driven personalization and automation as core levers for speed, accuracy, and higher order values at enormous scale.",
    strategicDrivers: [
      "Scale economics: tiny per-order gains compound across tens of millions of daily transactions",
      "Speed and throughput: faster, more accurate drive-thru service directly drives sales",
      "Personalization: adaptive menus increase average order value through smarter suggestions",
      "Labor efficiency: automating order-taking frees staff for food prep and service",
    ],
    lessonsLearned: [
      "Context beats static menus: adapting to weather, time, and demand lifts order value",
      "Acquire to accelerate: buying Dynamic Yield and Apprente brought AI capability in-house fast",
      "Voice at the drive-thru is hard: accents, noise, and edge cases make full automation challenging",
      "Personalization needs scale data: value comes from McDonald's massive transaction footprint",
    ],
    implementationTimeline: "2019–2024: from acquiring Dynamic Yield and Apprente to scaling AI personalization and partnering with Google Cloud and IBM",
    implementationPhases: [
      { phase: "Phase 1 — AI Acquisitions", duration: "several months", description: "Acquired Dynamic Yield for personalization and Apprente for automated voice-ordering technology" },
      { phase: "Phase 2 — Menu & Kiosk Rollout", duration: "several years", description: "Deployed adaptive drive-thru menu boards, kiosks, and app personalization across thousands of restaurants" },
      { phase: "Phase 3 — Restaurant Automation", duration: "ongoing", description: "Partnered with Google Cloud and IBM to advance AI-powered ordering and restaurant automation" },
    ],
  },
  {
    id: "unilever-ai-hiring",
    slug: "unilever-ai-hiring",
    company: "Unilever",
    industry: "Retail",
    title: "Unilever: How AI Transformed Early-Career Recruiting and Talent Screening at Scale",
    problem:
      "Unilever receives an enormous volume of applications for its early-career and graduate programs across dozens of countries, far more than human recruiters can review fairly and quickly. Traditional screening relied heavily on CVs and university pedigree, was slow and costly, risked inconsistent evaluation, and narrowed the candidate pool — making it hard to find the best talent efficiently while widening access and reducing bias.",
    solution:
      "Unilever reengineered its early-career hiring around AI and digital assessment, using online gamified neuroscience-based games to assess candidate aptitudes and traits, followed by AI-analyzed asynchronous video interviews that evaluated responses before a final in-person or virtual assessment center. This pipeline let candidates apply and be screened remotely from anywhere, standardized early-stage evaluation, and shifted emphasis from CV credentials toward demonstrated potential and behavioral signals.",
    outcome:
      "Unilever built one of the most widely cited examples of AI in recruiting, dramatically shortening time-to-hire, saving substantial recruiter hours, and expanding the diversity and geographic reach of its candidate pipeline by making early screening remote and standardized. The approach helped Unilever process far more applicants efficiently while reframing hiring around potential — though it also drew scrutiny about fairness and transparency that pushed the company to keep refining and humanizing the process.",
    metrics: [
      "Gamified neuroscience-based assessments used for early-stage screening",
      "AI-analyzed asynchronous video interviews before final assessment centers",
      "Significant reduction in time-to-hire for early-career roles",
      "Substantial recruiter hours saved through automated screening",
      "Broader geographic and demographic reach in the candidate pipeline",
      "Emphasis shifted from CV credentials toward demonstrated potential",
    ],
    tags: ["AI", "HR Tech", "Recruiting", "Assessment", "Consumer Goods"],
    featured: false,
    businessContext:
      "Unilever is one of the world's largest consumer-goods companies, operating in most countries and competing intensely for early-career talent to fuel its leadership pipeline. Facing huge application volumes and pressure to hire faster, more cheaply, and more inclusively, Unilever became an early corporate adopter of AI-driven assessment for graduate and entry-level recruiting, treating talent acquisition as a process to be modernized with data and automation.",
    strategicDrivers: [
      "Volume at scale: AI screening handles application volumes humans cannot review fairly",
      "Speed and cost: automated early stages cut time-to-hire and recruiting spend",
      "Access and diversity: remote, standardized assessment widens the candidate pool",
      "Potential over pedigree: game and video signals shift focus from CVs to capability",
    ],
    lessonsLearned: [
      "Standardization can widen access: remote assessment reaches candidates traditional funnels miss",
      "Automate early, keep humans late: final human assessment centers preserve judgment and trust",
      "Fairness needs vigilance: AI hiring invites scrutiny and requires ongoing bias monitoring",
      "Candidate experience matters: gamified, mobile-first assessment improves engagement",
    ],
    implementationTimeline: "2017–2023: from piloting gamified and video AI assessment to scaling the pipeline globally and refining fairness",
    implementationPhases: [
      { phase: "Phase 1 — Digital Assessment Pilot", duration: "several months", description: "Introduced online neuroscience-based games and AI-analyzed video interviews for early-career hiring" },
      { phase: "Phase 2 — Global Rollout", duration: "several years", description: "Scaled the remote, AI-driven screening pipeline across dozens of countries and thousands of applicants" },
      { phase: "Phase 3 — Refinement & Fairness", duration: "ongoing", description: "Continued tuning assessments, transparency, and human oversight to address bias and candidate concerns" },
    ],
  },
  {
    id: "ikea-ai-interior-design",
    slug: "ikea-ai-interior-design",
    company: "IKEA",
    industry: "Retail",
    title: "IKEA: How AI and Computer Vision Reinvented Home Design and Customer Experience",
    problem:
      "Shopping for furniture is hard to visualize: customers struggle to imagine how products will look and fit in their own homes, leading to hesitation, returns, and lost sales. IKEA also fields enormous volumes of customer questions and must help millions of shoppers plan rooms and choose products across a vast catalog — tasks that are difficult to personalize and scale through stores and call centers alone.",
    solution:
      "IKEA applied AI and computer vision across its customer experience, launching IKEA Kreativ — an AI-powered design tool that lets customers scan a room, erase existing furniture, and visualize IKEA products in a photorealistic 3D scene on their own space. It deployed AR-based placement in the IKEA app, used the 'Billie' AI assistant to handle a large share of routine customer-service inquiries so human agents could focus on complex needs, and later experimented with generative-AI assistants (including a GPT-based tool) for inspiration and planning.",
    outcome:
      "IKEA became a retail leader in spatial and generative AI for customer experience, using IKEA Kreativ and AR visualization to help shoppers design rooms and buy with more confidence, reducing uncertainty and supporting online conversion. The Billie assistant automated a large portion of routine customer-service contacts, freeing thousands of co-workers to be redeployed toward interior-design advisory roles — showing how AI can both scale service and shift human work toward higher-value engagement.",
    metrics: [
      "IKEA Kreativ AI design tool for scanning rooms and visualizing products in 3D",
      "AR-based product placement in the IKEA mobile app",
      "'Billie' AI assistant handling a large share of routine customer inquiries",
      "Thousands of customer-service co-workers redeployed to design advisory roles",
      "Computer vision to erase existing furniture and stage photorealistic rooms",
      "Generative-AI assistants explored for inspiration and room planning",
    ],
    tags: ["Computer Vision", "AI", "Augmented Reality", "Retail", "Customer Experience"],
    featured: true,
    businessContext:
      "IKEA is the world's largest furniture retailer, serving hundreds of millions of customers a year through stores, apps, and e-commerce. As shopping shifted online and customer expectations rose, IKEA invested in AI, computer vision, and AR to close the visualization gap, scale customer service, and deepen personalization — treating digital design tools and AI assistants as central to how people discover, plan, and buy for their homes.",
    strategicDrivers: [
      "Reduce uncertainty: visualization tools help customers buy furniture with confidence",
      "Scale service: AI assistants handle routine inquiries across a massive customer base",
      "Shift human work upward: automation frees staff for higher-value design advisory roles",
      "Omnichannel confidence: AR and 3D design support online conversion and fewer returns",
    ],
    lessonsLearned: [
      "See it to buy it: photorealistic visualization directly addresses furniture-buying hesitation",
      "Automation can create better jobs: routing routine contacts to AI freed staff for design advice",
      "Spatial AI fits retail: computer vision and AR map naturally onto home planning",
      "Blend tools and taste: AI accelerates design but human interior expertise still adds value",
    ],
    implementationTimeline: "2017–2024: from AR placement and the Billie assistant to launching IKEA Kreativ and generative-AI experiments",
    implementationPhases: [
      { phase: "Phase 1 — AR & Assistants", duration: "several years", description: "Introduced AR product placement in the app and deployed the Billie AI customer-service assistant" },
      { phase: "Phase 2 — IKEA Kreativ", duration: "several months", description: "Launched an AI and computer-vision design tool to scan rooms and visualize products in photorealistic 3D" },
      { phase: "Phase 3 — Generative AI", duration: "ongoing", description: "Experimented with generative-AI assistants for inspiration, planning, and deeper personalization" },
    ],
  },
];
