import type { CaseStudyData } from "./case-studies-types";

export const caseStudiesData7: CaseStudyData[] = [
  {
    id: "openai-chatgpt-enterprise",
    slug: "openai-chatgpt-enterprise",
    company: "OpenAI",
    industry: "Technology",
    title: "ChatGPT Enterprise: How OpenAI Captured 92% of Fortune 500 Companies in 18 Months",
    problem:
      "Enterprise customers needed the productivity benefits of large language models but faced critical blockers: data privacy (inputs used for training), lack of admin controls, no SSO/SAML integration, usage analytics, and compliance gaps. Consumer ChatGPT was unsuitable for enterprise deployment — legal, HR, finance, and engineering teams could not use it for sensitive work. Companies were operating piecemeal, unofficial 'shadow AI' usage with no governance.",
    solution:
      "OpenAI launched ChatGPT Enterprise in August 2023, providing enterprise-grade data privacy (inputs not used for training), SOC 2 Type II certification, SSO, admin console, unlimited GPT-4 access, extended 128K context windows, and advanced data analysis. The offering was complemented by the GPT Store, custom GPTs for internal tools, and the ChatGPT Edu tier for universities. API access and fine-tuning capabilities enabled bespoke enterprise models.",
    outcome:
      "By early 2025, ChatGPT Enterprise and ChatGPT Team had been adopted by over 92% of Fortune 500 companies. Over 1 million business users were active. Enterprise customers reported 40%+ productivity gains in knowledge work tasks. OpenAI's annualised revenue reached $3.4B by end of 2024, with enterprise plans as the largest revenue driver. The product established OpenAI as the default enterprise AI platform ahead of Microsoft Copilot and Google Gemini for Business.",
    metrics: [
      "92% of Fortune 500 companies using ChatGPT Enterprise or Team by Q1 2025",
      "1M+ active enterprise users across enterprise and team plans",
      "40%+ reported productivity improvement in knowledge work (OpenAI customer survey 2024)",
      "$3.4B annualised revenue by end of 2024 — enterprise plans primary driver",
      "100+ enterprise use cases deployed: legal contract review, code generation, customer support, financial analysis",
      "SOC 2 Type II certification achieved within 6 months of launch",
    ],
    tags: ["Enterprise AI", "LLM Platform", "SaaS", "Productivity", "AI Adoption"],
    featured: true,
    businessContext:
      "OpenAI was founded in 2015 as a non-profit and transitioned to a 'capped profit' model in 2019. The launch of ChatGPT in November 2022 triggered an unprecedented wave of enterprise AI interest, with 100 million users in 60 days — the fastest consumer product adoption in history. ChatGPT Enterprise was the deliberate pivot to capture enterprise value from this attention, competing directly with Microsoft (its largest investor and Azure partner), Google, and Anthropic.",
    strategicDrivers: [
      "Enterprise data privacy: Fortune 500 legal and compliance teams blocked consumer ChatGPT; Enterprise removed the key blocker",
      "Microsoft competition paradox: Microsoft's Azure OpenAI partnership and Copilot product both competed with and distributed OpenAI's models",
      "Revenue imperative: OpenAI's compute costs were estimated at $700K/day in late 2023 — enterprise pricing was critical to sustainability",
      "Moat building: early enterprise relationships with admins, workflows, and custom GPTs create switching costs that purely API relationships do not",
    ],
    lessonsLearned: [
      "Privacy as the enterprise unlock: the single biggest barrier to enterprise AI adoption was data privacy, not capability or pricing",
      "Admin console before product: enterprise procurement requires centralised control — building admin tools accelerated sales cycles",
      "GPT Store for stickiness: allowing companies to build internal GPTs created a proprietary ecosystem within the ChatGPT platform",
      "SOC 2 certification as table stakes: enterprise security certifications are non-negotiable in regulated industries — invest early",
    ],
    implementationTimeline: "18 months from consumer product to 92% Fortune 500 enterprise penetration (August 2023 – Q1 2025)",
    implementationPhases: [
      { phase: "Phase 1 — Consumer to Enterprise", duration: "6 months", description: "Added enterprise privacy controls and SOC 2 certification to ChatGPT infrastructure" },
      { phase: "Phase 2 — Launch and Expansion", duration: "6 months", description: "ChatGPT Enterprise launched August 2023; rapid Fortune 500 adoption across legal, finance, engineering" },
      { phase: "Phase 3 — Platform Deepening", duration: "6 months", description: "GPT Store, custom GPTs, advanced data analysis, and 128K context windows added to enterprise tier" },
    ],
  },
  {
    id: "meta-llama-open-source-ai",
    slug: "meta-llama-open-source-ai",
    company: "Meta",
    industry: "Technology",
    title: "Meta's Llama Strategy: How Open-Source AI Became Meta's Most Powerful Competitive Weapon",
    problem:
      "Meta faced an existential competitive threat from OpenAI's GPT-4, Google's Gemini, and Anthropic's Claude. Paying for API access to competitor models was strategically untenable. Meta's core business — advertising on Facebook and Instagram — required powerful AI for recommendation systems, content moderation, ad ranking, and new product development. Building proprietary closed models would cost billions and lag behind specialised AI labs.",
    solution:
      "Meta released the Llama family of open-weight language models under a permissive research licence starting in February 2023 (Llama 1), then commercially (Llama 2, July 2023), and with Llama 3 in April 2024. The open-source strategy served multiple goals: it commoditised the foundation model layer (hurting OpenAI and Google's API revenue), built a global developer ecosystem around Meta's model architecture, accelerated Meta's own AI research through public scrutiny and contribution, and positioned Meta as an AI infrastructure leader.",
    outcome:
      "Llama 2 was downloaded over 30 million times within a year of release. Llama 3 became the leading open-weight model by benchmark performance, surpassing competing open models. Meta's AI infrastructure — used across Facebook, Instagram, WhatsApp, and Threads — processes over 1 trillion AI inference requests daily. Meta AI assistant reached 500M monthly active users by mid-2024. The strategy forced the entire industry to compete on a two-tier basis: open vs. closed models.",
    metrics: [
      "Llama 2: 30M+ downloads in first year; Llama 3 exceeded this within months",
      "Meta AI assistant: 500M monthly active users by mid-2024 — largest AI assistant by user count",
      "1 trillion+ daily AI inference requests across Meta's product family",
      "Llama 3 70B and 405B models: outperformed GPT-3.5 on key benchmarks; competitive with GPT-4 on several tasks",
      "Meta AI R&D spend: $35B+ capex in 2024, with AI infrastructure the primary investment",
      "Ecosystem: 100,000+ Llama-based applications and fine-tuned variants in production globally",
    ],
    tags: ["Open Source AI", "LLM", "Foundation Models", "AI Strategy", "Meta"],
    featured: false,
    businessContext:
      "Meta Platforms operates the world's largest social network with 3.3 billion daily active people across Facebook, Instagram, WhatsApp, and Threads (Q1 2025). Advertising drives 98% of revenue ($135B in 2023). AI is foundational to Meta's ad ranking and feed algorithms — and generative AI is Meta's bet for the next decade of growth through AR/VR, AI assistants, and creative tools. CEO Mark Zuckerberg made AI the company's top priority in 2023, publicly committing to open-source foundation model leadership.",
    strategicDrivers: [
      "Commoditisation strategy: open-source Llama makes foundation models a commodity, reducing OpenAI and Google's pricing power in the API market",
      "Talent magnet: open-source leadership attracts top AI researchers who want their work to have broad impact",
      "Regulatory positioning: open-source framing helps Meta argue against heavy AI regulation (harder to regulate distributed models)",
      "Meta AI product acceleration: open Llama ecosystem means thousands of external researchers improve the base model Meta also uses",
    ],
    lessonsLearned: [
      "Open source as competitive strategy: giving away foundation models created a massive ecosystem advantage that more than offset the cost of releasing IP",
      "Community acceleration: external fine-tuning and alignment contributions from the Llama community improved Meta's own production models",
      "Two-speed AI market: Meta's strategy created a bifurcated market — open models for cost-sensitive deployments, closed models for frontier capability",
      "Inference at scale: operating 1T+ daily inference requests forced Meta to develop world-class AI infrastructure that is itself a competitive moat",
    ],
    implementationTimeline: "February 2023 (Llama 1) through July 2024 (Llama 3 405B) — 18 months from research release to frontier open model",
    implementationPhases: [
      { phase: "Phase 1 — Llama 1 (Research)", duration: "2 months", description: "Released Llama 1 (7B–65B) under research licence, February 2023; leaked to public within days, accelerating open ecosystem" },
      { phase: "Phase 2 — Llama 2 (Commercial)", duration: "5 months", description: "Llama 2 released commercially in July 2023 with Microsoft partnership; immediate enterprise and developer adoption" },
      { phase: "Phase 3 — Llama 3 (Frontier)", duration: "9 months", description: "Llama 3 (8B, 70B, 405B) released April–July 2024; 405B competitive with GPT-4 on several benchmarks" },
    ],
  },
  {
    id: "anthropic-claude-enterprise-safety",
    slug: "anthropic-claude-enterprise-safety",
    company: "Anthropic",
    industry: "Technology",
    title: "Anthropic Claude for Enterprise: How Safety-First AI Won $500M ARR in Regulated Industries",
    problem:
      "Financial services, legal, healthcare, and government organisations needed enterprise AI with stronger safety and reliability guarantees than general-purpose models offered. Hallucination rates, policy violations, and unpredictable model behaviour posed unacceptable compliance risks in regulated environments. Existing models lacked Constitutional AI alignment, enterprise audit trails, and the robustness needed for high-stakes decisions in banking, law, and clinical settings.",
    solution:
      "Anthropic developed Claude for Enterprise with Constitutional AI (CAI) training, system prompt customisation, enterprise-grade API, Amazon Bedrock and Google Cloud Vertex AI integration, and the Claude.ai Teams platform. The Responsible Scaling Policy (RSP) and model cards provided enterprise buyers with documented safety standards. Prompt caching, 200K context windows, and tool use capabilities addressed specific enterprise workflow needs. Partnerships with Slack, Notion, and Salesforce embedded Claude in existing enterprise workflows.",
    outcome:
      "Anthropic reached $500M+ ARR by early 2025, growing 7x year-over-year, driven primarily by enterprise API revenue. Claude 3 Opus and Claude 3.5 Sonnet were rated the top-performing models on multiple enterprise benchmarks including coding (SWE-bench), legal reasoning, and long-document analysis. Major customers included Bridgewater Associates, Lonely Planet, and GitLab. AWS partnership (Amazon's $4B investment) made Claude available to thousands of enterprises via Bedrock.",
    metrics: [
      "$500M+ ARR by early 2025 — 7x year-over-year growth",
      "Claude 3.5 Sonnet: #1 on SWE-bench coding benchmark (49% solve rate) at launch",
      "200K context window: enabled analysis of 500-page legal contracts and financial reports in a single prompt",
      "Amazon Bedrock integration: available to 300,000+ AWS enterprise customers",
      "Hallucination reduction: Claude 3 Opus showed 2x lower hallucination rate vs. GPT-4 on TruthfulQA benchmark",
      "Claude.ai Teams: 10x growth in team plan adoption in H1 2024",
    ],
    tags: ["Enterprise AI", "AI Safety", "Constitutional AI", "LLM", "Regulated Industries"],
    featured: false,
    businessContext:
      "Anthropic was founded in 2021 by former OpenAI researchers including Dario Amodei and Daniela Amodei, with an explicit mission of AI safety research. The company has raised $7.3B+ from Amazon ($4B), Google ($500M), and Spark Capital. Unlike OpenAI, Anthropic operates as a Public Benefit Corporation with its safety mission legally embedded. This positioning has proven commercially valuable: enterprise buyers in regulated industries view Anthropic's safety-first approach as a differentiator, not just a marketing claim.",
    strategicDrivers: [
      "Regulated industry demand: banks, law firms, and hospitals needed safety documentation that Anthropic's RSP and Constitutional AI framework provided",
      "AWS partnership: Amazon's $4B investment and Bedrock integration gave Anthropic distribution to hundreds of thousands of enterprise AWS customers",
      "Context window leadership: 200K context window enabled legal and financial document analysis use cases that were impossible on shorter-context models",
      "Safety as enterprise sales: Anthropic's public safety commitments (RSP, model cards, third-party evaluations) became enterprise procurement checkboxes",
    ],
    lessonsLearned: [
      "Safety documentation sells: enterprise procurement teams increasingly require documented AI safety policies — Anthropic's RSP became a competitive asset",
      "Context length unlocks verticals: 200K context window specifically unlocked legal (contract review), financial (earnings analysis), and healthcare (clinical notes) enterprise segments",
      "Cloud partnership as distribution: AWS Bedrock provided enterprise distribution that would have taken years to build organically through direct sales",
      "Research credibility matters: Anthropic's publication of alignment research gave enterprise CISOs and legal teams the academic validation they required before deployment",
    ],
    implementationTimeline: "2022–2024: from research lab to $500M ARR enterprise AI platform in under 3 years",
    implementationPhases: [
      { phase: "Phase 1 — API Launch", duration: "12 months", description: "Claude 1 and Claude 2 launched via API; established enterprise safety positioning and 100K context window" },
      { phase: "Phase 2 — Claude 3 Family", duration: "6 months", description: "Claude 3 Haiku/Sonnet/Opus released March 2024; Opus became top-rated model on MMLU and coding benchmarks" },
      { phase: "Phase 3 — Enterprise Integrations", duration: "6 months", description: "Claude 3.5 Sonnet, AWS Bedrock expansion, Slack/Notion integrations, and Claude.ai Teams drove enterprise adoption surge" },
    ],
  },
  {
    id: "nvidia-ai-enterprise-platform",
    slug: "nvidia-ai-enterprise-platform",
    company: "NVIDIA",
    industry: "Technology",
    title: "NVIDIA AI Enterprise: How GPU Architecture Leadership Became the Engine of the AI Boom",
    problem:
      "As generative AI demand exploded in 2023–2024, enterprises and cloud providers needed massively scalable AI training and inference infrastructure. Existing CPU-based architectures were 100–1000x too slow for large language model training. Software fragmentation — dozens of ML frameworks, libraries, and deployment tools — created enormous complexity for enterprise AI teams. NVIDIA needed to translate GPU hardware leadership into a full-stack enterprise software and services business.",
    solution:
      "NVIDIA built a full-stack AI platform: CUDA GPU computing, NIM (NVIDIA Inference Microservices) containerised model deployment, NEMO for enterprise LLM customisation, DGX Cloud for managed AI supercomputing, and the AI Enterprise software suite. The H100 and H200 GPUs — with 80GB HBM3 memory and NVLink — became the de facto standard for LLM training. NVIDIA also developed inference-optimised architectures (Grace Hopper Superchip) and established partnerships with every major cloud provider for dedicated GPU clusters.",
    outcome:
      "NVIDIA's data centre revenue reached $47.5B in FY2024 (ending January 2024), up 217% year-over-year, driven almost entirely by AI GPU demand. The H100 GPU commanded a $25,000–$40,000 per-unit price with 12-month lead times at peak. NVIDIA's market capitalisation exceeded $3 trillion in June 2024, making it briefly the most valuable company in the world. Over 40,000 companies use NVIDIA AI Enterprise software. Every major LLM — GPT-4, Gemini, Claude, Llama — was trained on NVIDIA hardware.",
    metrics: [
      "Data centre revenue: $47.5B in FY2024 — up 217% YoY",
      "Market cap: exceeded $3 trillion June 2024 — most valuable company in the world at peak",
      "H100 GPU: 6x performance improvement over A100 for LLM training; 30x for inference",
      "CUDA ecosystem: 4 million+ developers, 3,000+ GPU-accelerated applications",
      "AI Enterprise software: 40,000+ enterprise customers",
      "DGX Cloud: partnerships with AWS, Google Cloud, Microsoft Azure, Oracle for dedicated GPU clusters",
    ],
    tags: ["AI Infrastructure", "GPU", "Enterprise AI", "Cloud Computing", "Semiconductors"],
    featured: true,
    businessContext:
      "NVIDIA was founded in 1993 as a graphics chip company for video games. CEO Jensen Huang's bet on CUDA (2006) — making GPUs programmable for general computation — was the foundation of modern AI hardware. NVIDIA's GPU architecture became the mandatory infrastructure for deep learning after AlexNet's 2012 ImageNet breakthrough, and the company spent a decade in relative obscurity as the pick-and-shovel provider for AI research. The generative AI boom of 2022–2024 transformed NVIDIA from a $300B company to a $3T company in 18 months.",
    strategicDrivers: [
      "CUDA lock-in: 18 years of CUDA ecosystem development means most ML frameworks, libraries, and developer workflows are GPU-vendor-specific",
      "Memory bandwidth advantage: LLM inference is memory-bandwidth-bound — NVIDIA's HBM3 architecture (3.35 TB/s on H100) is 5x faster than competing solutions",
      "Full-stack strategy: NIM, NEMO, and AI Enterprise created software revenue on top of hardware — improving margins and reducing commoditisation risk",
      "Supply chain control: TSMC advanced packaging and SK Hynix HBM supply relationships gave NVIDIA 12-month lead times that competitors could not replicate",
    ],
    lessonsLearned: [
      "Platform beats product: CUDA's ecosystem lock-in created a moat that competitors with faster chips (Cerebras, Groq) could not overcome in enterprise",
      "Memory is the bottleneck: NVIDIA's early recognition that LLM inference is memory-bound, not compute-bound, drove HBM investment that proved decisive",
      "Software unlocks hardware margins: NIM and AI Enterprise converted a hardware business into a platform business with recurring software revenue",
      "Inference as the next frontier: as training becomes commoditised, inference efficiency (tokens per second per dollar) became the primary competitive metric",
    ],
    implementationTimeline: "2022–2024: from A100 training standard to $3T market cap full-stack AI platform in 24 months",
    implementationPhases: [
      { phase: "Phase 1 — A100 Era (Training)", duration: "24 months", description: "A100 GPU became the LLM training standard; GPT-3, PaLM, and early ChatGPT trained on A100 clusters" },
      { phase: "Phase 2 — H100 Supercycle", duration: "18 months", description: "H100 launched March 2022; demand explosion post-ChatGPT created multi-billion dollar backlog; $25K+ per-unit pricing" },
      { phase: "Phase 3 — Full Stack Platform", duration: "12 months", description: "NIM, DGX Cloud, and AI Enterprise launched; NVIDIA evolved from chip vendor to AI infrastructure platform" },
    ],
  },
];
