import type { CaseStudyData } from "./case-studies-types";

export const caseStudiesData11: CaseStudyData[] = [
  {
    id: "mastercard-ai-fraud-decision-intelligence",
    slug: "mastercard-ai-fraud-decision-intelligence",
    company: "Mastercard",
    industry: "Finance",
    title: "Mastercard: How AI Decision Intelligence Scores Billions of Transactions to Stop Fraud in Real Time",
    problem:
      "Payment fraud is a moving target: fraudsters adapt constantly, transaction volumes run into the tens of billions per year, and every authorization decision must happen in milliseconds. Rule-based systems generate too many false declines — blocking legitimate customers and costing merchants billions in lost sales — while still missing sophisticated, fast-evolving fraud patterns across a global network of banks, merchants, and cardholders.",
    solution:
      "Mastercard built AI into the core of its network with Decision Intelligence, an artificial-intelligence platform that scores each transaction in real time by analyzing hundreds of data points and behavioral patterns to distinguish genuine activity from fraud. It layered on generative-AI models (Decision Intelligence Pro) trained on the network's vast transaction data to better predict suspicious activity, and extended AI across products — including its acquisitions of Brighterion (AI) and Ekata and Recorded Future (identity and threat intelligence) — to fight scams, account takeover, and card-not-present fraud across the ecosystem.",
    outcome:
      "Mastercard's AI became a decisive layer of the global payments system, scoring billions of transactions and improving fraud-detection rates while reducing false declines that frustrate customers and cost merchants revenue. The company reported that its latest generative-AI models can boost fraud-detection rates significantly, helping banks catch more fraud and approve more legitimate transactions — positioning AI-driven risk scoring as central to trust in digital payments at planetary scale.",
    metrics: [
      "Tens of billions of transactions per year scored for fraud risk",
      "Real-time authorization decisions rendered in milliseconds",
      "Hundreds of data points analyzed per transaction by Decision Intelligence",
      "Generative-AI models (Decision Intelligence Pro) to raise fraud-detection rates",
      "AI capabilities strengthened via Brighterion, Ekata, and Recorded Future acquisitions",
      "Reduced false declines, recovering legitimate sales for merchants and banks",
    ],
    tags: ["Fraud Detection", "Machine Learning", "Generative AI", "Financial Services", "Real-Time Scoring"],
    featured: true,
    businessContext:
      "Mastercard operates one of the world's largest payment networks, connecting billions of cards, thousands of financial institutions, and tens of millions of merchants. Because trust and low friction are the product, the company has invested heavily in AI and in a series of acquisitions to make fraud prevention, identity verification, and cyber-threat intelligence core network services rather than optional add-ons.",
    strategicDrivers: [
      "Trust as infrastructure: the network's value depends on stopping fraud without blocking good transactions",
      "Speed at scale: only AI can score tens of billions of transactions in real time within millisecond limits",
      "False-decline economics: cutting wrongful declines directly recovers merchant and issuer revenue",
      "Build and buy: acquisitions in AI, identity, and threat intelligence compound the network's data advantage",
    ],
    lessonsLearned: [
      "False positives are a real cost: optimizing only for catching fraud damages the customer experience and merchant revenue",
      "Network data is the moat: scoring quality comes from patterns across the whole ecosystem, not a single issuer",
      "Generative AI extends detection: newer models find subtle, fast-evolving fraud that older systems miss",
      "Fraud is an arms race: continuous model updates and acquired capabilities are needed to keep pace with attackers",
    ],
    implementationTimeline: "2016–2024: from launching Decision Intelligence to deploying generative-AI fraud models across the global network",
    implementationPhases: [
      { phase: "Phase 1 — Decision Intelligence", duration: "several years", description: "Launched AI-based real-time transaction scoring across the network to cut fraud and false declines" },
      { phase: "Phase 2 — AI Acquisitions & Expansion", duration: "several years", description: "Integrated Brighterion, Ekata, and Recorded Future to broaden AI, identity, and threat-intelligence capabilities" },
      { phase: "Phase 3 — Generative-AI Fraud Models", duration: "ongoing", description: "Deployed generative-AI models (Decision Intelligence Pro) to further raise fraud-detection rates network-wide" },
    ],
  },
  {
    id: "mercedes-benz-mbux-ai-assistant",
    slug: "mercedes-benz-mbux-ai-assistant",
    company: "Mercedes-Benz",
    industry: "Automotive",
    title: "Mercedes-Benz: How Generative AI Turned the MBUX In-Car Assistant Into a Conversational Copilot",
    problem:
      "In-car voice control has long been rigid and frustrating: drivers had to learn exact command phrases, systems misunderstood natural speech, and interactions broke concentration rather than aiding it. As cars became software-defined and infotainment grew more complex, Mercedes-Benz needed an assistant that understood conversational, context-aware requests safely and hands-free, without pulling the driver's attention from the road.",
    solution:
      "Mercedes-Benz evolved its MBUX (Mercedes-Benz User Experience) system into an AI-powered virtual assistant, integrating large-language-model capabilities — including a collaboration adding ChatGPT via Microsoft Azure to its voice assistant — so drivers can ask open-ended questions and give natural conversational commands. The assistant uses natural-language understanding for navigation, climate, entertainment, and vehicle functions, adopts a more empathetic and proactive persona, and connects to cloud AI while keeping safety, privacy, and data-protection controls central to the in-car experience.",
    outcome:
      "Mercedes-Benz became one of the first automakers to bring generative conversational AI into production vehicles at scale, beginning with a large US beta of ChatGPT-enhanced voice control and expanding AI-driven assistance across its lineup and next-generation MB.OS operating system. The upgraded assistant made in-car interaction more natural and proactive, strengthened Mercedes' positioning in the software-defined-vehicle era, and demonstrated how LLMs can be deployed responsibly in a safety-critical, real-time environment.",
    metrics: [
      "ChatGPT integrated into the MBUX Voice Assistant via Microsoft Azure OpenAI Service",
      "Large-scale US beta program across hundreds of thousands of vehicles",
      "Natural-language, conversational control of navigation, climate, and infotainment",
      "Hands-free, context-aware interaction designed to reduce driver distraction",
      "More empathetic, proactive assistant persona powered by generative AI",
      "Cloud AI paired with in-car privacy and data-protection controls",
    ],
    tags: ["Generative AI", "Conversational AI", "Natural Language Processing", "Automotive", "Edge & Cloud"],
    featured: false,
    businessContext:
      "Mercedes-Benz, one of the world's leading premium automakers, is transforming into a software-driven company built around its MB.OS operating system. As differentiation shifts from mechanical engineering to digital experience, the in-car AI assistant has become a strategic surface for brand, customer loyalty, and recurring software value — making conversational AI central to the luxury driving experience.",
    strategicDrivers: [
      "Experience differentiation: a natural, intelligent assistant elevates the premium in-car experience",
      "Software-defined vehicles: AI is core to the MB.OS platform and future recurring digital revenue",
      "Safety and focus: conversational, hands-free interaction aims to keep drivers' attention on the road",
      "Responsible deployment: privacy and data protection are prerequisites for putting cloud AI in the cabin",
    ],
    lessonsLearned: [
      "Natural beats memorized: conversational AI removes the burden of learning exact voice commands",
      "Safety context changes design: an in-car LLM must be tuned for brevity, focus, and driver attention",
      "Persona matters: an empathetic, proactive assistant improves how drivers perceive and trust the system",
      "Cloud plus guardrails: generative features require pairing cloud AI with strict privacy and data controls",
    ],
    implementationTimeline: "2018–2024: from launching MBUX voice control to integrating generative AI and building it into MB.OS",
    implementationPhases: [
      { phase: "Phase 1 — MBUX Voice Control", duration: "several years", description: "Introduced the MBUX natural-language voice assistant for navigation, climate, and infotainment" },
      { phase: "Phase 2 — Generative-AI Beta", duration: "12 months", description: "Launched a large US beta integrating ChatGPT via Azure to enable open-ended conversational interaction" },
      { phase: "Phase 3 — MB.OS Rollout", duration: "ongoing", description: "Expanded AI-driven assistance across the lineup as part of the next-generation MB.OS operating system" },
    ],
  },
  {
    id: "shopify-ai-sidekick-magic-commerce",
    slug: "shopify-ai-sidekick-magic-commerce",
    company: "Shopify",
    industry: "Software",
    title: "Shopify: How Generative AI (Sidekick and Magic) Put an AI Commerce Assistant in Every Merchant's Store",
    problem:
      "Running an online store demands skills most entrepreneurs lack time or budget for: writing product descriptions, designing storefronts, analyzing sales data, editing images, and answering operational questions. For millions of small and medium merchants, these tasks are a constant drag on growth, and hiring specialists or agencies is expensive — leaving a large gap between what merchants want to do and what they can execute alone.",
    solution:
      "Shopify embedded generative AI across its commerce platform through Shopify Magic — AI features for writing product descriptions, generating and editing store imagery, drafting emails, and more — and Sidekick, an AI-powered commerce assistant that merchants can converse with to set up their store, analyze performance, take actions, and get guidance in plain language. Built on large language models and integrated directly into the admin, these tools let merchants generate content, query their business data conversationally, and automate routine store operations without technical or design expertise.",
    outcome:
      "Shopify made generative AI a native part of running a store for millions of merchants across its platform, lowering the skill and time barrier to launching and operating an online business. Merchants used Magic to produce product copy and imagery instantly and Sidekick to get conversational answers and actions on their own store data — reinforcing Shopify's position as an all-in-one commerce operating system and showcasing generative AI applied broadly across a real SMB user base rather than as a standalone chatbot.",
    metrics: [
      "AI features (Shopify Magic) available to millions of merchants across the platform",
      "Generative product descriptions, emails, and marketing copy created in seconds",
      "AI image generation and editing for storefronts and product photos",
      "Sidekick conversational assistant for store setup, analytics, and actions",
      "Natural-language querying of a merchant's own business and sales data",
      "AI embedded natively in the Shopify admin rather than as a separate tool",
    ],
    tags: ["Generative AI", "Conversational AI", "E-Commerce", "SaaS", "Large Language Models"],
    featured: true,
    businessContext:
      "Shopify is one of the world's largest commerce platforms, powering millions of businesses from solo entrepreneurs to large brands. Its strategy is to be the all-in-one operating system for commerce, continuously removing friction for merchants. Generative AI fits that mission directly: by building AI assistance into the core admin, Shopify aims to make sophisticated store operations accessible to merchants of any size and skill level.",
    strategicDrivers: [
      "Lower the barrier: AI lets non-experts produce professional content and run stores without specialists",
      "Platform stickiness: native AI tools deepen merchant reliance on Shopify as their commerce OS",
      "Speed to launch: generative content and setup assistance shorten the path from idea to selling",
      "Data-aware assistance: Sidekick's value comes from acting on each merchant's own store data",
    ],
    lessonsLearned: [
      "Embed, don't bolt on: AI delivers most value integrated into the admin merchants already use daily",
      "Context is the advantage: an assistant grounded in a merchant's own data beats a generic chatbot",
      "Generative content lowers the skill floor: copy and imagery generation unlocks growth for time-poor merchants",
      "Assist and act: usefulness grows when the assistant can take actions, not just answer questions",
    ],
    implementationTimeline: "2023–2024: from launching Shopify Magic AI features to rolling out the Sidekick commerce assistant",
    implementationPhases: [
      { phase: "Phase 1 — Shopify Magic", duration: "several months", description: "Introduced generative-AI features for product descriptions, marketing copy, and store imagery across the platform" },
      { phase: "Phase 2 — Sidekick Assistant", duration: "ongoing", description: "Launched the conversational AI commerce assistant for store setup, analytics, and in-admin actions" },
      { phase: "Phase 3 — Platform-Wide AI", duration: "ongoing", description: "Expanded AI across the admin and merchant workflows as a native capability of the commerce operating system" },
    ],
  },
  {
    id: "pinterest-visual-search-recommendations-ai",
    slug: "pinterest-visual-search-recommendations-ai",
    company: "Pinterest",
    industry: "Technology",
    title: "Pinterest: How Computer Vision and Deep Learning Power Visual Search and Recommendations at Scale",
    problem:
      "Pinterest is fundamentally a visual platform where users discover ideas through images, but text search alone cannot capture what people actually want — the specific style of a chair, the pattern on a dress, or a product spotted in a photo. Serving relevant recommendations and enabling search by image across billions of pins and hundreds of millions of users is a hard computer-vision, representation-learning, and large-scale recommendation problem.",
    solution:
      "Pinterest built deep-learning computer-vision systems at the core of its product, including visual search tools like Pinterest Lens that let users search using their camera or parts of an image, and a unified visual-embedding system (often referred to as its 'PinSage'-style graph-neural-network and image-embedding work) that represents pins and products in a shared space. These embeddings power visual and multimodal search, related-pin recommendations, shopping and product tagging, and ad relevance — trained on massive image and engagement data and served in real time across the platform.",
    outcome:
      "Pinterest turned computer vision into a central driver of discovery and commerce, letting hundreds of millions of users search visually, find shoppable products from images, and receive highly relevant recommendations. Its visual-embedding and graph-neural-network techniques became widely cited in the recommender-systems field, and AI-driven visual search and recommendations improved engagement and shopping outcomes — establishing Pinterest as a leading real-world example of large-scale applied computer vision and recommendation AI.",
    metrics: [
      "Billions of pins represented as visual embeddings for search and recommendations",
      "Hundreds of millions of monthly users served AI-driven visual discovery",
      "Pinterest Lens visual search using the camera or regions of an image",
      "Graph-neural-network and image-embedding systems powering related-pin recommendations",
      "Visual product tagging and shoppable recommendations from images",
      "Real-time serving of visual and multimodal search at platform scale",
    ],
    tags: ["Computer Vision", "Deep Learning", "Recommendation Systems", "Visual Search", "Graph Neural Networks"],
    featured: false,
    businessContext:
      "Pinterest is a visual discovery platform where people find ideas for shopping, home, fashion, food, and more. Because discovery and monetization both hinge on matching people to relevant images and products, computer vision and recommendation AI are not features but the core engine of the business — driving engagement, shopping, and advertising relevance across a massive catalog of visual content.",
    strategicDrivers: [
      "Visual-first product: text search cannot capture the visual intent central to Pinterest's use cases",
      "Discovery to commerce: linking images to shoppable products turns inspiration into transactions",
      "Relevance drives engagement: better recommendations increase time spent and repeat use",
      "Ad monetization: the same visual-relevance models improve advertising performance",
    ],
    lessonsLearned: [
      "Embeddings unify the product: a shared visual representation powers search, recommendations, and shopping at once",
      "Graph structure helps: modeling pins and boards as a graph improved recommendation quality at scale",
      "Visual intent is distinct: search-by-image serves needs that keyword search fundamentally cannot",
      "Serving at scale is the challenge: real-time visual retrieval across billions of items is an engineering problem as much as a modeling one",
    ],
    implementationTimeline: "2015–2024: from launching visual search to unified visual-embedding systems powering discovery and commerce",
    implementationPhases: [
      { phase: "Phase 1 — Visual Search & Lens", duration: "several years", description: "Built computer-vision search including Pinterest Lens to let users search with images and their camera" },
      { phase: "Phase 2 — Unified Embeddings", duration: "several years", description: "Developed graph-neural-network and image-embedding systems powering recommendations and related pins" },
      { phase: "Phase 3 — Visual Commerce", duration: "ongoing", description: "Extended visual AI to product tagging, shoppable recommendations, and ad relevance across the platform" },
    ],
  },
];
