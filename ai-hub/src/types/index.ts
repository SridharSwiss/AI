export type Persona = "beginner" | "practitioner" | "manager" | "executive";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export interface Tool {
  slug: string;
  name: string;
  category: string;
  subcategory?: string;
  vendor: string;
  pricingModel: "free" | "freemium" | "paid" | "enterprise" | "open-source";
  useCases: string[];
  integrations: string[];
  description: string;
  website: string;
  tags: string[];
  featured?: boolean;
}

export interface Company {
  slug: string;
  name: string;
  focusArea: string;
  products: string[];
  founded: number;
  website: string;
  notableModels?: string[];
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  company: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics?: string[];
  source?: string;
  tags: string[];
  level: "beginner" | "practitioner" | "manager" | "executive";
}

export interface Article {
  slug: string;
  title: string;
  level: "beginner" | "practitioner" | "manager" | "executive";
  topicTags: string[];
  readTime: number;
  source?: string;
  description: string;
  url?: string;
}

export interface Training {
  slug: string;
  title: string;
  type: "course" | "youtube" | "certification" | "book" | "tutorial";
  provider: string;
  level: "beginner" | "intermediate" | "advanced";
  free: boolean;
  link: string;
  description: string;
  tags: string[];
}

export interface ComplianceItem {
  slug: string;
  framework: string;
  jurisdiction: string;
  summary: string;
  whoItAppliesTo: string[];
  officialSource: string;
  tags: string[];
  level: "beginner" | "practitioner" | "manager" | "executive";
}

export interface Playbook {
  slug: string;
  title: string;
  phase: "assess" | "pilot" | "scale" | "govern";
  description: string;
  checklist: string[];
  tags: string[];
  level: "manager" | "executive" | "practitioner";
}

export interface ResourceDocument {
  slug: string;
  title: string;
  source: string;
  category: string;
  description: string;
  link: string;
  tags: string[];
  year?: number;
}
