export interface NewsSource {
  id: string;
  name: string;
  category: "Tech" | "Research" | "Government" | "Medical" | "Financial" | "Quantum" | "General";
  rssUrl: string;
  website: string;
  description: string;
}

export const newsSources: NewsSource[] = [
  // Tech
  {
    id: "techcrunch-ai",
    name: "TechCrunch AI",
    category: "Tech",
    rssUrl: "https://techcrunch.com/category/artificial-intelligence/feed/",
    website: "https://techcrunch.com",
    description: "AI news from TechCrunch covering startups, products, and industry trends.",
  },
  {
    id: "theverge-ai",
    name: "The Verge AI",
    category: "Tech",
    rssUrl: "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml",
    website: "https://www.theverge.com",
    description: "AI coverage from The Verge including consumer tech and policy.",
  },
  {
    id: "venturebeat-ai",
    name: "VentureBeat AI",
    category: "Tech",
    rssUrl: "https://venturebeat.com/category/ai/feed/",
    website: "https://venturebeat.com",
    description: "Enterprise AI news and analysis from VentureBeat.",
  },
  {
    id: "wired-ai",
    name: "Wired AI",
    category: "Tech",
    rssUrl: "https://www.wired.com/feed/tag/ai/latest/rss",
    website: "https://www.wired.com",
    description: "In-depth AI reporting from Wired magazine.",
  },
  {
    id: "mit-tech-review",
    name: "MIT Technology Review",
    category: "Tech",
    rssUrl: "https://www.technologyreview.com/feed/",
    website: "https://www.technologyreview.com",
    description: "Technology insights and AI coverage from MIT.",
  },
  {
    id: "ars-technica-ai",
    name: "Ars Technica AI",
    category: "Tech",
    rssUrl: "https://feeds.arstechnica.com/arstechnica/technology-lab",
    website: "https://arstechnica.com",
    description: "Technical AI news and analysis from Ars Technica.",
  },
  // Research
  {
    id: "deepmind-blog",
    name: "Google DeepMind Blog",
    category: "Research",
    rssUrl: "https://deepmind.google/blog/rss.xml",
    website: "https://deepmind.google",
    description: "Research updates and announcements from Google DeepMind.",
  },
  {
    id: "openai-blog",
    name: "OpenAI Blog",
    category: "Research",
    rssUrl: "https://openai.com/blog/rss.xml",
    website: "https://openai.com",
    description: "Research papers and product news from OpenAI.",
  },
  {
    id: "anthropic-news",
    name: "Anthropic News",
    category: "Research",
    rssUrl: "https://www.anthropic.com/news.rss",
    website: "https://www.anthropic.com",
    description: "AI safety research and news from Anthropic.",
  },
  {
    id: "arxiv-ai",
    name: "ArXiv CS.AI",
    category: "Research",
    rssUrl: "http://arxiv.org/rss/cs.AI",
    website: "https://arxiv.org",
    description: "Latest AI research preprints from ArXiv.",
  },
  {
    id: "huggingface-blog",
    name: "Hugging Face Blog",
    category: "Research",
    rssUrl: "https://huggingface.co/blog/feed.xml",
    website: "https://huggingface.co",
    description: "Open-source AI research and model releases from Hugging Face.",
  },
  // Government
  {
    id: "nist-ai",
    name: "NIST AI",
    category: "Government",
    rssUrl: "https://www.nist.gov/topics/artificial-intelligence/rss.xml",
    website: "https://www.nist.gov",
    description: "AI standards and policy updates from NIST.",
  },
  {
    id: "politico-eu-tech",
    name: "Politico EU Tech",
    category: "Government",
    rssUrl: "https://rss.politico.eu/tech.xml",
    website: "https://www.politico.eu",
    description: "EU AI regulation and policy news from Politico.",
  },
  // Medical
  {
    id: "stat-news",
    name: "STAT News",
    category: "Medical",
    rssUrl: "https://www.statnews.com/feed/",
    website: "https://www.statnews.com",
    description: "Health and life sciences AI coverage from STAT News.",
  },
  {
    id: "nature-ml",
    name: "Nature Machine Learning",
    category: "Medical",
    rssUrl: "https://www.nature.com/subjects/machine-learning.rss",
    website: "https://www.nature.com",
    description: "Machine learning research in the natural sciences from Nature.",
  },
  {
    id: "health-ai",
    name: "Healthcare IT News",
    category: "Medical",
    rssUrl: "https://www.healthcareitnews.com/rss.xml",
    website: "https://www.healthcareitnews.com",
    description: "AI in healthcare IT and digital health news.",
  },
  // Financial
  {
    id: "reuters-tech",
    name: "Reuters Technology",
    category: "Financial",
    rssUrl: "https://feeds.reuters.com/reuters/technologyNews",
    website: "https://www.reuters.com",
    description: "Technology and AI financial news from Reuters.",
  },
  {
    id: "ft-tech",
    name: "Financial Times Tech",
    category: "Financial",
    rssUrl: "https://www.ft.com/technology?format=rss",
    website: "https://www.ft.com",
    description: "Technology and AI business news from the Financial Times.",
  },
  // Quantum
  {
    id: "quantum-computing-report",
    name: "Quantum Computing Report",
    category: "Quantum",
    rssUrl: "https://quantumcomputingreport.com/feed/",
    website: "https://quantumcomputingreport.com",
    description: "In-depth quantum computing news and analysis.",
  },
  {
    id: "ieee-spectrum-quantum",
    name: "IEEE Spectrum Quantum",
    category: "Quantum",
    rssUrl: "https://spectrum.ieee.org/feeds/topic/quantum-computing.rss",
    website: "https://spectrum.ieee.org",
    description: "Quantum computing engineering news from IEEE Spectrum.",
  },
  // General
  {
    id: "ai-news",
    name: "AI News",
    category: "General",
    rssUrl: "https://artificialintelligence-news.com/feed/",
    website: "https://artificialintelligence-news.com",
    description: "Broad AI industry news and analysis.",
  },
  {
    id: "import-ai",
    name: "Import AI",
    category: "General",
    rssUrl: "https://importai.substack.com/feed",
    website: "https://importai.substack.com",
    description: "Weekly AI newsletter curated by Jack Clark.",
  },
  {
    id: "the-decoder",
    name: "The Decoder",
    category: "General",
    rssUrl: "https://the-decoder.com/feed/",
    website: "https://the-decoder.com",
    description: "AI news and research coverage from The Decoder.",
  },
];

export const newsCategories = [
  "All",
  "Tech",
  "Research",
  "Government",
  "Medical",
  "Financial",
  "Quantum",
  "General",
] as const;
