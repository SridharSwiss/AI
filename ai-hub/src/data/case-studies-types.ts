export interface OpenSourceRepo {
  name: string;
  url: string;
  description: string;
  stars?: string;
}

export interface Reference {
  label: string;
  url: string;
}

export interface ImplementationPhase {
  phase: string;
  duration: string;
  description: string;
  keyOutputs?: string[];
}

export interface ROIBreakdownItem {
  category: string;
  value: string;
  note?: string;
}

export interface CaseStudyData {
  id: string;
  slug: string;
  company: string;
  industry: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: string[];
  tags: string[];
  featured?: boolean;

  // Business context
  businessContext?: string;
  strategicDrivers?: string[];

  // Technical depth
  techStack?: string[];
  architecture?: string;
  dataRequirements?: string;

  // Financials / ROI
  investmentEstimate?: string;
  annualReturn?: string;
  paybackPeriod?: string;
  roiMultiple?: string;
  roiBreakdown?: ROIBreakdownItem[];

  // Implementation
  implementationTimeline?: string;
  implementationPhases?: ImplementationPhase[];
  teamSize?: string;
  challenges?: string[];

  // Governance
  governanceFramework?: string[];
  dataPrivacy?: string[];
  humanOversight?: string;
  regulatoryConsiderations?: string[];

  // Lessons
  lessonsLearned?: string[];
  whatWorkedWell?: string[];

  // Resources
  openSourceRepos?: OpenSourceRepo[];
  references?: Reference[];
}
