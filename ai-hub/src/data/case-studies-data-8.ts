import type { CaseStudyData } from "./case-studies-types";

export const caseStudiesData8: CaseStudyData[] = [
  {
    id: "morgan-stanley-gpt4-advisor",
    slug: "morgan-stanley-gpt4-advisor",
    company: "Morgan Stanley",
    industry: "Finance",
    title: "Morgan Stanley AI @ Morgan Stanley Assistant: How GPT-4 Unlocked 100,000 Research Documents for 16,000 Advisors",
    problem:
      "Morgan Stanley Wealth Management sits on a proprietary knowledge base of over 100,000 research reports, investment strategy notes, market commentary, and internal analyses. Financial advisors could not efficiently search or synthesize this content during live client conversations — finding the right insight required keyword search across fragmented systems, deep institutional knowledge, and time advisors did not have. The intellectual capital of the firm was effectively locked away from the people who needed it most.",
    solution:
      "Morgan Stanley partnered with OpenAI to build the 'AI @ Morgan Stanley Assistant' — a GPT-4 powered retrieval system trained and evaluated exclusively on the firm's internal content. The assistant uses retrieval-augmented generation (RAG) over the vetted knowledge base so answers are grounded in Morgan Stanley's own research rather than the open internet. Rigorous evaluation, prompt engineering, and human expert review by the firm's research and knowledge management teams ensured accuracy and compliance before rollout. A second product, AI @ Morgan Stanley Debrief, was later added to summarize and take notes on client meetings.",
    outcome:
      "By late 2024, the assistant was adopted by 98% of advisor teams, with over 16,000 financial advisors gaining instant access to the collective intelligence of the firm. Advisors reported dramatically faster answers to complex client questions and more time spent on relationship-building rather than document search. Morgan Stanley became the flagship enterprise reference case for OpenAI, demonstrating that a large regulated financial institution could deploy generative AI at scale with governance controls intact.",
    metrics: [
      "98% of advisor teams actively using the AI @ Morgan Stanley Assistant by 2024",
      "16,000+ financial advisors with instant access to 100,000+ research documents",
      "100,000+ internal research and strategy documents made queryable via natural language",
      "Advisor document-retrieval time reduced from minutes to seconds per query",
      "AI @ Morgan Stanley Debrief added meeting summarization, saving advisors ~30 minutes per client meeting",
      "Zero-open-internet architecture: answers grounded only in vetted internal content for compliance",
    ],
    tags: ["Wealth Management", "RAG", "GPT-4", "Enterprise AI", "Financial Services"],
    featured: true,
    businessContext:
      "Morgan Stanley Wealth Management manages approximately $5 trillion in client assets and employs tens of thousands of financial advisors. In regulated wealth management, the accuracy and provenance of investment advice is legally and reputationally critical — advisors cannot cite ungrounded or hallucinated information. Morgan Stanley was one of the first large financial institutions to sign an enterprise partnership with OpenAI, beginning development in 2022 and rolling out broadly in 2023–2024.",
    strategicDrivers: [
      "Knowledge activation: unlocking $100K+ documents of proprietary research that was previously underutilized due to search friction",
      "Advisor productivity: freeing advisors from document search to focus on high-value client relationships",
      "Compliance-first AI: a grounded, closed-corpus architecture that satisfies financial regulators and internal risk teams",
      "Competitive differentiation: being first among major wealth managers to deploy frontier generative AI at scale",
    ],
    lessonsLearned: [
      "Grounding beats generality: restricting the model to vetted internal content eliminated hallucination risk that would be unacceptable in regulated advice",
      "Human expert evaluation is non-negotiable: research and knowledge teams reviewed outputs extensively before rollout, building institutional trust",
      "Adoption follows utility: 98% adoption was achieved not by mandate but because the tool solved a real, daily advisor pain point",
      "Start narrow, expand deliberately: beginning with document retrieval before adding meeting summarization (Debrief) let governance mature with usage",
    ],
    implementationTimeline: "2022–2024: from OpenAI partnership and internal evaluation to 98% advisor-team adoption across the wealth management division",
    implementationPhases: [
      { phase: "Phase 1 — Partnership & Evaluation", duration: "12 months", description: "Signed OpenAI enterprise partnership; built RAG pipeline over 100K internal documents; ran extensive accuracy and compliance evaluations with human experts" },
      { phase: "Phase 2 — Assistant Rollout", duration: "9 months", description: "Deployed AI @ Morgan Stanley Assistant to financial advisors; iterated on prompts, retrieval quality, and advisor feedback" },
      { phase: "Phase 3 — Debrief & Expansion", duration: "6 months", description: "Launched AI @ Morgan Stanley Debrief for meeting summarization and note-taking; reached 98% advisor-team adoption" },
    ],
  },
  {
    id: "bloomberg-gpt-finance-llm",
    slug: "bloomberg-gpt-finance-llm",
    company: "Bloomberg",
    industry: "Finance",
    title: "BloombergGPT: How a 50-Billion-Parameter Domain LLM Redefined Financial NLP",
    problem:
      "General-purpose large language models struggle with the specialized vocabulary, numerical reasoning, and structured data of finance — ticker symbols, earnings sentiment, regulatory filings, and market jargon. Bloomberg needed AI that could power financial NLP tasks (sentiment analysis, named entity recognition, news classification, question answering) at professional accuracy, while leveraging four decades of proprietary financial data that no public model had ever seen.",
    solution:
      "Bloomberg built BloombergGPT, a 50-billion-parameter large language model trained on a 363-billion-token financial corpus drawn from Bloomberg's proprietary data archives (FinPile), augmented with 345 billion tokens of general-purpose text — one of the largest domain-specific training efforts in finance. The mixed-domain training approach preserved general language ability while achieving best-in-class performance on finance-specific benchmarks. The model was designed to power downstream Bloomberg Terminal capabilities including sentiment scoring, automated headline generation, and natural-language financial queries.",
    outcome:
      "BloombergGPT outperformed comparably sized open models (GPT-NeoX, OPT, BLOOM) on financial NLP benchmarks while remaining competitive on general benchmarks — demonstrating that domain-specialized LLMs can beat larger general models on vertical tasks. The 2023 research paper became one of the most cited enterprise LLM case studies and validated the domain-LLM thesis that reshaped enterprise AI strategy across regulated industries. It positioned Bloomberg at the frontier of financial AI and informed the design of subsequent financial models industry-wide.",
    metrics: [
      "50 billion parameters — one of the largest purpose-built financial LLMs at release",
      "700+ billion token training set: 363B tokens of proprietary financial data + 345B general tokens",
      "Best-in-class results on financial NLP benchmarks (sentiment, NER, classification) vs. similarly sized open models",
      "40+ years of Bloomberg proprietary financial data leveraged in the FinPile corpus",
      "Competitive general-benchmark performance retained despite heavy domain specialization",
      "Landmark 2023 paper cited across enterprise AI and quantitative finance research",
    ],
    tags: ["Domain LLM", "Financial NLP", "Foundation Models", "Finance", "Proprietary Data"],
    featured: false,
    businessContext:
      "Bloomberg L.P. operates the Bloomberg Terminal, used by more than 325,000 finance professionals worldwide, and has accumulated one of the deepest proprietary financial datasets in existence. Bloomberg's AI and ML engineering group had been advancing financial NLP for years before generative AI; BloombergGPT, announced in March 2023, was the culmination of that work and a strategic bet that the firm's data moat could be converted into an AI moat that generic models could never replicate.",
    strategicDrivers: [
      "Data moat to AI moat: converting 40+ years of exclusive financial data into a defensible model advantage",
      "Vertical accuracy: financial professionals require domain-precise outputs that general models cannot reliably deliver",
      "Terminal enhancement: powering next-generation natural-language and sentiment features inside the Bloomberg Terminal",
      "Thought leadership: establishing Bloomberg as an AI research leader in quantitative and financial machine learning",
    ],
    lessonsLearned: [
      "Domain data is the differentiator: proprietary, high-quality financial data drove performance that raw parameter count alone could not",
      "Mixed-domain training preserves generality: blending finance and general text avoided catastrophic loss of broad language ability",
      "Specialized beats bigger for verticals: a 50B domain model outperformed larger general models on the tasks that mattered to the business",
      "Publish to lead: releasing detailed methodology built credibility and shaped the broader enterprise domain-LLM movement",
    ],
    implementationTimeline: "2022–2023: from FinPile corpus assembly and model training to the March 2023 BloombergGPT research release",
    implementationPhases: [
      { phase: "Phase 1 — Corpus & Infrastructure", duration: "9 months", description: "Assembled the 363B-token FinPile financial corpus and combined it with 345B general tokens; provisioned large-scale GPU training infrastructure" },
      { phase: "Phase 2 — Model Training", duration: "6 months", description: "Trained the 50B-parameter model with mixed-domain data; tuned for financial NLP tasks while preserving general capability" },
      { phase: "Phase 3 — Benchmarking & Release", duration: "3 months", description: "Evaluated against open models on financial and general benchmarks; published methodology and integrated learnings into Terminal AI roadmap" },
    ],
  },
  {
    id: "john-deere-see-and-spray",
    slug: "john-deere-see-and-spray",
    company: "John Deere",
    industry: "Industrial",
    title: "John Deere See & Spray: How Computer Vision Cut Herbicide Use by Two-Thirds in Real Time",
    problem:
      "Conventional broadcast spraying applies herbicide across an entire field indiscriminately, wasting chemicals on bare soil and crops that do not need treatment. This inflates input costs for farmers, drives excess chemical runoff into ecosystems, and accelerates herbicide-resistant weeds. Distinguishing a weed from a crop plant at 12 miles per hour across a 120-foot boom, in variable lighting and dust, is a computer-vision problem that had never been solved at agricultural production scale.",
    solution:
      "John Deere developed See & Spray, an embedded computer-vision system that uses banks of cameras and onboard GPUs running deep-learning models to distinguish weeds from crops in real time as the sprayer moves through the field. Each of dozens of nozzles is individually actuated within milliseconds to spray only the weeds it detects. The technology, accelerated by Deere's 2017 acquisition of AI startup Blue River Technology, processes imagery on the machine itself — edge AI — because cloud latency is impossible at field speed. See & Spray Ultimate was released commercially for row crops such as corn, soybeans, and cotton.",
    outcome:
      "See & Spray demonstrated herbicide reductions of more than two-thirds on non-residual herbicides in field trials — averaging around 60%+ savings — cutting one of a farmer's largest variable costs while sharply reducing chemical load on the environment. It became a cornerstone of John Deere's transformation from an equipment manufacturer into a precision-agriculture technology company, with AI and autonomy positioned as central to future revenue. The system processes millions of plant classifications per acre in real time at commercial field speeds.",
    metrics: [
      "60%+ average reduction in non-residual herbicide use in commercial field trials",
      "Up to two-thirds herbicide savings demonstrated on eligible crops",
      "Real-time weed-vs-crop classification at ~12 mph across a 120-foot spray boom",
      "Millisecond-latency edge AI: onboard GPUs process imagery with no cloud dependency",
      "36+ cameras and individually actuated nozzles enabling plant-level targeting",
      "Blue River Technology acquired for ~$305M (2017) to accelerate the AI capability",
    ],
    tags: ["Computer Vision", "Edge AI", "Precision Agriculture", "Deep Learning", "Sustainability"],
    featured: true,
    businessContext:
      "Deere & Company, founded in 1837, is the world's largest agricultural machinery manufacturer. Facing rising input costs for farmers, labor shortages, and sustainability pressure, John Deere made a strategic pivot toward precision agriculture and autonomy, publicly targeting a large share of revenue from software and technology-enabled services. The 2017 acquisition of Blue River Technology brought deep computer-vision talent in-house and became the foundation of See & Spray and Deere's broader autonomous-machine roadmap, including its fully autonomous tractor unveiled at CES 2022.",
    strategicDrivers: [
      "Input-cost economics: herbicide is a major variable cost — cutting it two-thirds delivers immediate ROI to farmers",
      "Sustainability mandate: reducing chemical runoff addresses regulatory and environmental pressure on agriculture",
      "Business model shift: moving Deere from one-time equipment sales toward recurring technology and data revenue",
      "Edge necessity: field-speed decisions demand on-machine AI because cloud round-trips are far too slow",
    ],
    lessonsLearned: [
      "Edge AI where latency is physical: spraying decisions at 12 mph forced fully onboard inference — a defining constraint of agricultural AI",
      "Acquire capability to move fast: buying Blue River Technology gave Deere world-class vision talent years ahead of building it internally",
      "Tie AI to hard ROI: adoption was driven by measurable chemical savings, not novelty — the value proposition was a spreadsheet, not a demo",
      "Robustness over benchmark accuracy: models had to work through dust, glare, and crop-stage variation, not just clean test images",
    ],
    implementationTimeline: "2017–2022: from the Blue River Technology acquisition to commercial See & Spray Ultimate deployment on production sprayers",
    implementationPhases: [
      { phase: "Phase 1 — Acquisition & R&D", duration: "24 months", description: "Acquired Blue River Technology (2017); integrated computer-vision team; built and trained weed-vs-crop classification models on field imagery" },
      { phase: "Phase 2 — Field Validation", duration: "24 months", description: "Ran multi-season field trials across crops and geographies; hardened models against dust, lighting, and growth-stage variation" },
      { phase: "Phase 3 — Commercial Launch", duration: "12 months", description: "Released See & Spray Ultimate for row crops; demonstrated 60%+ herbicide savings at commercial field speed with millisecond edge inference" },
    ],
  },
  {
    id: "instacart-ml-fulfillment",
    slug: "instacart-ml-fulfillment",
    company: "Instacart",
    industry: "Retail",
    title: "Instacart: How Machine Learning Powers Availability, ETAs, and a Generative AI Shopping Assistant",
    problem:
      "Online grocery is uniquely hard: Instacart does not own the inventory it sells, so item availability changes minute-to-minute across hundreds of thousands of items in tens of thousands of stores. Customers abandon carts when items are out of stock, delivery estimates are wrong, or search fails to surface what they want. Predicting whether an item is actually on the shelf, how long shopping will take, and what a shopper truly means by an ambiguous search query are all machine-learning problems at massive scale.",
    solution:
      "Instacart built a broad ML platform underpinning its marketplace: availability models that predict the real-time probability an item is in stock in a given store, ETA and batching models that estimate shopping and delivery time and optimally group orders for shoppers, and search and recommendation models that rank catalog results and personalize suggestions. In 2023 Instacart added Ask Instacart, a generative-AI shopping assistant built with OpenAI's models to answer natural-language questions like 'what do I need for a gluten-free taco night' and translate them into shoppable carts. These systems run across hundreds of thousands of catalog items and are continuously retrained.",
    outcome:
      "Machine learning became core infrastructure for Instacart's marketplace, improving in-stock accuracy, delivery-time reliability, and search relevance — directly affecting conversion, basket size, and customer retention. The generative AI assistant Ask Instacart extended the platform from transactional search to conversational discovery, and Instacart's ML-driven advertising business grew into a high-margin revenue stream that was central to its 2023 IPO narrative. ML availability prediction alone materially reduced the out-of-stock replacements and refunds that erode grocery-delivery economics.",
    metrics: [
      "Real-time availability prediction across hundreds of thousands of catalog items in tens of thousands of stores",
      "ML-driven order batching and ETA models optimizing shopper routes and delivery-time accuracy",
      "Ask Instacart generative AI assistant launched 2023, built on OpenAI models for natural-language shopping",
      "Personalized search and recommendation ranking across the full grocery catalog",
      "High-margin ML-powered advertising business central to the 2023 IPO",
      "Continuous retraining pipelines keeping availability and demand models current with shifting inventory",
    ],
    tags: ["Machine Learning", "Recommendation Systems", "Generative AI", "E-commerce", "Demand Prediction"],
    featured: false,
    businessContext:
      "Instacart (Maplebear Inc.) is North America's leading online grocery marketplace, partnering with more than 1,400 retail banners across tens of thousands of stores. Because Instacart does not hold inventory, its entire value proposition depends on accurately modeling a physical world it does not control. The company went public in September 2023, and its machine-learning capabilities — spanning fulfillment, personalization, and its advertising platform — were positioned as core competitive and financial differentiators.",
    strategicDrivers: [
      "No-inventory marketplace: availability must be predicted, not looked up, making ML existential rather than optional",
      "Unit economics: accurate availability and ETAs reduce refunds, replacements, and shopper idle time that erode margins",
      "Advertising monetization: ML-powered ad targeting became a high-margin revenue engine underpinning profitability",
      "Discovery expansion: generative AI moves Instacart from keyword search to conversational, intent-based shopping",
    ],
    lessonsLearned: [
      "Model the physical world you don't own: predicting shelf availability is the defining ML challenge of grocery delivery",
      "ML compounds across the funnel: gains in availability, search, and ETAs reinforce each other in conversion and retention",
      "Ads fund the platform: an ML-driven advertising business turned a thin-margin logistics operation into a viable public company",
      "Generative AI layers on top: Ask Instacart extended, rather than replaced, the mature ranking and prediction stack beneath it",
    ],
    implementationTimeline: "2016–2023: from early availability and search models to a full ML platform and the 2023 launch of the Ask Instacart generative AI assistant",
    implementationPhases: [
      { phase: "Phase 1 — Fulfillment ML", duration: "24 months", description: "Built availability prediction, ETA, and order-batching models to make the no-inventory marketplace reliable at scale" },
      { phase: "Phase 2 — Personalization & Ads", duration: "24 months", description: "Developed search ranking, recommendations, and an ML-powered advertising platform that became a core revenue driver" },
      { phase: "Phase 3 — Generative AI", duration: "12 months", description: "Launched Ask Instacart on OpenAI models for conversational shopping ahead of the September 2023 IPO" },
    ],
  },
];
