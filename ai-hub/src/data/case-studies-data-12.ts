import type { CaseStudyData } from "./case-studies-types";

export const caseStudiesData12: CaseStudyData[] = [
  {
    id: "coca-cola-generative-ai-marketing",
    slug: "coca-cola-generative-ai-marketing",
    company: "Coca-Cola",
    industry: "Retail",
    title: "Coca-Cola: How Generative AI Reinvented Marketing, Creative, and Consumer Engagement at Global Scale",
    problem:
      "As one of the world's most recognizable brands, Coca-Cola must produce enormous volumes of localized marketing content across hundreds of markets while keeping a consistent, iconic brand identity. Traditional creative production is slow and expensive, personalization at scale is hard, and staying culturally relevant to younger, digital-native consumers demands constant experimentation that legacy agency workflows struggle to sustain.",
    solution:
      "Coca-Cola embraced generative AI across marketing and creative operations, partnering with OpenAI and Bain & Company and launching initiatives like 'Create Real Magic' — a platform letting consumers generate branded artwork using GPT-4 and DALL-E from Coca-Cola's iconic creative assets. The company applied generative AI to ad concepting, image and video generation, campaign personalization, and consumer co-creation, while building internal capabilities to embed AI into everyday marketing, R&D, and operational workflows.",
    outcome:
      "Coca-Cola became a flagship example of a legacy consumer brand adopting generative AI at scale, using it to accelerate creative production, engage consumers as co-creators, and experiment with AI-generated advertising. The 'Create Real Magic' campaign drew global attention and user-generated branded content, and AI-assisted production shortened creative timelines — positioning Coca-Cola as a leader in applying generative AI to brand marketing while sparking industry debate about AI's role in advertising creativity.",
    metrics: [
      "GPT-4 and DALL-E integrated into the 'Create Real Magic' consumer creative platform",
      "Consumers able to generate branded artwork from Coca-Cola's iconic assets",
      "Generative AI applied to ad concepting, imagery, and video production",
      "Strategic partnerships with OpenAI and Bain & Company to scale AI adoption",
      "AI-assisted workflows accelerating global, localized creative production",
      "AI embedded across marketing, R&D, and operational functions",
    ],
    tags: ["Generative AI", "Marketing", "Creative AI", "Consumer Goods", "Brand"],
    featured: true,
    businessContext:
      "Coca-Cola is one of the largest and most valuable consumer brands in the world, operating across more than 200 markets. Its competitive advantage depends on brand strength, cultural relevance, and marketing at massive scale. As generative AI matured, Coca-Cola moved early to test and adopt it, treating AI as a way to modernize creative production and deepen consumer engagement rather than a peripheral experiment.",
    strategicDrivers: [
      "Scale and speed: generative AI compresses the cost and time of producing localized creative",
      "Cultural relevance: AI-driven experimentation helps the brand stay current with younger audiences",
      "Consumer co-creation: letting fans generate branded art turns marketing into participation",
      "First-mover positioning: early AI adoption reinforces Coca-Cola's image as an innovative brand",
    ],
    lessonsLearned: [
      "Brand guardrails matter: generative AI must be constrained to protect an iconic, consistent identity",
      "Co-creation drives engagement: inviting consumers to generate content deepens brand connection",
      "AI accelerates, humans direct: creative quality still depends on human strategy and taste",
      "Public experimentation invites scrutiny: AI in advertising sparks debate that brands must navigate",
    ],
    implementationTimeline: "2023–2024: from partnering with OpenAI and Bain to launching Create Real Magic and scaling generative AI across marketing",
    implementationPhases: [
      { phase: "Phase 1 — AI Partnerships", duration: "several months", description: "Partnered with OpenAI and Bain & Company to build generative-AI capabilities for marketing and operations" },
      { phase: "Phase 2 — Create Real Magic", duration: "several months", description: "Launched a consumer platform using GPT-4 and DALL-E to generate branded artwork from iconic assets" },
      { phase: "Phase 3 — Scaled Adoption", duration: "ongoing", description: "Expanded generative AI across creative production, campaigns, R&D, and operational workflows" },
    ],
  },
  {
    id: "expedia-ai-trip-planning",
    slug: "expedia-ai-trip-planning",
    company: "Expedia",
    industry: "Technology",
    title: "Expedia: How Generative AI Turned Trip Planning Into a Conversational Travel Assistant",
    problem:
      "Planning travel is fragmented and overwhelming: travelers juggle flights, hotels, activities, and budgets across countless options, often abandoning searches out of decision fatigue. Traditional search-and-filter interfaces force users to know exactly what they want, offer little contextual guidance, and struggle to turn open-ended inspiration ('a relaxing beach trip in December') into a concrete, bookable itinerary.",
    solution:
      "Expedia integrated generative AI into its platform, launching a ChatGPT-powered conversational trip-planning experience and later its own AI assistant 'Romie' to help travelers plan, organize, and book trips through natural conversation. Built on large language models and Expedia's vast travel data, the assistant answers open-ended questions, recommends destinations and hotels, saves discussed properties to trips, and synthesizes group chats and email confirmations into organized itineraries — moving travel planning from rigid search toward guided, personalized dialogue.",
    outcome:
      "Expedia became an early mover in applying generative AI to travel, launching one of the first ChatGPT plugin integrations and building conversational planning into its apps. The AI assistant made trip planning more intuitive and personalized, helping travelers move from inspiration to booking with less friction, and reinforced Expedia's positioning as a technology-led travel company — demonstrating how LLMs grounded in proprietary travel data can reshape a complex consumer journey.",
    metrics: [
      "ChatGPT integrated into the Expedia app as an early plugin partner",
      "Proprietary AI travel assistant 'Romie' for conversational planning",
      "Natural-language recommendations for destinations, hotels, and activities",
      "Discussed hotels automatically saved to a traveler's trip",
      "AI synthesis of group chats and email confirmations into itineraries",
      "LLM capabilities grounded in Expedia's large-scale travel data",
    ],
    tags: ["Generative AI", "Conversational AI", "Travel", "Large Language Models", "Personalization"],
    featured: false,
    businessContext:
      "Expedia Group is one of the world's largest online travel companies, connecting travelers with flights, lodging, and experiences across a vast global marketplace. Because discovery and decision-making are central to its business, Expedia has invested heavily in machine learning and, more recently, generative AI to reduce planning friction, increase conversion, and differentiate its consumer experience in a competitive travel market.",
    strategicDrivers: [
      "Reduce friction: conversational planning turns overwhelming search into guided decisions",
      "Data advantage: grounding LLMs in Expedia's travel data improves relevance and trust",
      "Inspiration to booking: AI helps convert open-ended intent into concrete itineraries",
      "Technology leadership: early generative-AI adoption differentiates Expedia in online travel",
    ],
    lessonsLearned: [
      "Grounding beats generic: an assistant tied to real inventory and data outperforms a bare chatbot",
      "Conversation fits travel: open-ended planning maps naturally onto a dialogue interface",
      "Organize, don't just recommend: synthesizing itineraries adds value beyond suggestions",
      "Own the assistant: building a proprietary AI (Romie) offers more control than third-party plugins alone",
    ],
    implementationTimeline: "2023–2024: from an early ChatGPT plugin integration to launching the Romie AI travel assistant",
    implementationPhases: [
      { phase: "Phase 1 — ChatGPT Integration", duration: "several months", description: "Launched an early ChatGPT-powered conversational trip-planning experience within the Expedia app" },
      { phase: "Phase 2 — Romie Assistant", duration: "several months", description: "Introduced the proprietary Romie AI travel assistant for planning, organizing, and booking trips" },
      { phase: "Phase 3 — Platform Expansion", duration: "ongoing", description: "Expanded AI-driven planning and personalization across Expedia's apps and travel workflows" },
    ],
  },
  {
    id: "linkedin-ai-hiring-recruiter",
    slug: "linkedin-ai-hiring-recruiter",
    company: "LinkedIn",
    industry: "Software",
    title: "LinkedIn: How Generative AI Reinvented Recruiting, Job Search, and Professional Networking",
    problem:
      "Recruiting and job searching are slow, high-effort processes: recruiters manually craft searches and outreach across hundreds of millions of profiles, while job seekers struggle to identify fit, tailor applications, and stand out. LinkedIn needed to make its enormous professional graph more actionable — turning raw data about people, skills, and jobs into faster, more relevant matches for both hiring teams and members.",
    solution:
      "LinkedIn embedded generative AI across its platform, including AI-assisted messaging and profile writing, collaborative AI-generated article prompts, and 'LinkedIn Hiring Assistant' — an AI agent that helps recruiters source and engage candidates by taking a role description and returning qualified matches, drafting outreach, and handling routine recruiting tasks. Built on large language models and LinkedIn's economic graph, these tools let recruiters work conversationally and give members AI help with job search, skills, and content creation.",
    outcome:
      "LinkedIn brought generative AI to a professional network of over a billion members, applying it to recruiting, job search, learning, and content. AI features helped recruiters cut time on sourcing and outreach and gave members AI-assisted tools for profiles, applications, and skills — reinforcing LinkedIn's position as the central platform for professional opportunity and showcasing how an AI agent can automate meaningful parts of the hiring workflow at massive scale.",
    metrics: [
      "Generative AI deployed across a network of over one billion members",
      "LinkedIn Hiring Assistant AI agent for sourcing and candidate engagement",
      "AI-assisted recruiter outreach and role-to-candidate matching",
      "AI help for member profiles, job applications, and skills",
      "Collaborative AI-generated article and content prompts",
      "LLM capabilities grounded in LinkedIn's economic and professional graph",
    ],
    tags: ["Generative AI", "AI Agents", "Recruiting", "SaaS", "Large Language Models"],
    featured: true,
    businessContext:
      "LinkedIn, part of Microsoft, is the world's largest professional network, connecting over a billion members with jobs, learning, and each other. Its business spans recruiting solutions, advertising, and subscriptions, all powered by a vast 'economic graph' of people, companies, skills, and jobs. With deep access to Microsoft's AI capabilities, LinkedIn has moved aggressively to embed generative AI where it can most improve hiring and member outcomes.",
    strategicDrivers: [
      "Actionable graph: generative AI turns LinkedIn's vast professional data into faster matches",
      "Recruiter productivity: AI agents automate sourcing and outreach, the core of the hiring product",
      "Member value: AI tools for profiles, applications, and skills deepen engagement",
      "Microsoft synergy: access to frontier models accelerates LinkedIn's AI roadmap",
    ],
    lessonsLearned: [
      "Agents fit workflows: recruiting's repetitive sourcing and outreach suit an AI agent well",
      "Graph grounding is the moat: AI value comes from LinkedIn's proprietary professional data",
      "Assist both sides: serving recruiters and job seekers compounds the network's value",
      "Trust is essential: AI in hiring must be transparent and fair to avoid bias and member distrust",
    ],
    implementationTimeline: "2023–2024: from AI-assisted messaging and profiles to launching the LinkedIn Hiring Assistant agent",
    implementationPhases: [
      { phase: "Phase 1 — AI Writing & Content", duration: "several months", description: "Introduced AI-assisted messaging, profile writing, and collaborative content prompts for members" },
      { phase: "Phase 2 — Hiring Assistant", duration: "several months", description: "Launched an AI agent that sources candidates, drafts outreach, and automates routine recruiting tasks" },
      { phase: "Phase 3 — Platform-Wide AI", duration: "ongoing", description: "Expanded generative AI across recruiting, job search, learning, and member experiences" },
    ],
  },
  {
    id: "maersk-ai-supply-chain-logistics",
    slug: "maersk-ai-supply-chain-logistics",
    company: "Maersk",
    industry: "Logistics",
    title: "Maersk: How AI Optimizes Global Shipping, Container Flows, and Supply-Chain Resilience",
    problem:
      "Global container shipping is staggeringly complex: Maersk moves millions of containers across ocean networks where weather, port congestion, demand swings, and disruptions ripple worldwide. Manually planning vessel routes, container repositioning, and stowage — and giving customers reliable arrival estimates — is nearly impossible at this scale, and inefficiency means wasted capacity, delays, emissions, and unhappy customers.",
    solution:
      "Maersk applied AI and machine learning across its logistics operations to optimize vessel routing, predict estimated times of arrival, forecast demand, reposition empty containers, and improve stowage planning. It built AI into its digital platform to give customers better visibility and predictive insight, used advanced analytics to reduce fuel consumption and emissions, and explored generative AI and AI agents for customer service and supply-chain decision support — turning a vast physical network into a data-driven, continuously optimized system.",
    outcome:
      "Maersk used AI to make one of the world's largest shipping and logistics networks more efficient, predictable, and resilient, improving arrival-time accuracy, container utilization, and fuel efficiency while giving customers greater end-to-end visibility. AI-driven optimization helped the company navigate volatile demand and disruptions, reduce costs and emissions, and reposition itself as an integrated, technology-enabled logistics provider rather than a pure ocean carrier.",
    metrics: [
      "AI optimization applied across millions of containers moving globally",
      "Machine-learning ETA prediction improving arrival-time accuracy",
      "Demand forecasting and empty-container repositioning optimization",
      "AI-assisted stowage and vessel-routing planning",
      "Analytics-driven fuel and emissions reduction",
      "Generative AI and agents explored for customer service and decision support",
    ],
    tags: ["Machine Learning", "Supply Chain", "Optimization", "Logistics", "Predictive Analytics"],
    featured: false,
    businessContext:
      "A.P. Moller-Maersk is one of the world's largest container shipping and integrated logistics companies, operating a global network of vessels, ports, and inland transport. As the company transforms from an ocean carrier into an end-to-end logistics integrator, data and AI have become central to optimizing its physical network, improving customer visibility, and building resilience against the disruptions that define modern global trade.",
    strategicDrivers: [
      "Optimize a vast network: only AI can plan routing, capacity, and repositioning at global scale",
      "Predictability: accurate ETAs and forecasts are core to customer trust and supply-chain planning",
      "Efficiency and emissions: AI-driven optimization cuts fuel use, cost, and carbon",
      "Integrator strategy: AI supports Maersk's shift to end-to-end, technology-enabled logistics",
    ],
    lessonsLearned: [
      "Physical networks need data: optimizing ships and containers depends on high-quality real-time data",
      "Prediction drives resilience: forecasting demand and delays helps absorb global disruptions",
      "Efficiency and sustainability align: AI that saves fuel also cuts emissions and cost",
      "Visibility is a product: customers value AI-driven end-to-end tracking as much as the shipping itself",
    ],
    implementationTimeline: "2018–2024: from ML-based ETA and demand forecasting to platform-wide AI optimization and generative-AI pilots",
    implementationPhases: [
      { phase: "Phase 1 — Predictive Analytics", duration: "several years", description: "Deployed machine learning for ETA prediction, demand forecasting, and container repositioning" },
      { phase: "Phase 2 — Network Optimization", duration: "several years", description: "Applied AI to vessel routing, stowage, capacity, and fuel and emissions reduction across the network" },
      { phase: "Phase 3 — Generative AI & Agents", duration: "ongoing", description: "Explored generative AI and agents for customer service, visibility, and supply-chain decision support" },
    ],
  },
];
