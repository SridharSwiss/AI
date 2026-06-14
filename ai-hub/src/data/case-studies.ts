export type { CaseStudyData, OpenSourceRepo, Reference, ImplementationPhase, ROIBreakdownItem } from "./case-studies-types";
import type { CaseStudyData } from "./case-studies-types";
import { caseStudiesData1 } from "./case-studies-data-1";
import { caseStudiesData2 } from "./case-studies-data-2";
import { caseStudiesDataInsurance } from "./case-studies-data-insurance";
import { caseStudiesData3 } from "./case-studies-data-3";

export const caseStudies: CaseStudyData[] = [...caseStudiesData1, ...caseStudiesData2, ...caseStudiesDataInsurance, ...caseStudiesData3];

export const caseStudyIndustries = [
  "All",
  "Finance",
  "Healthcare",
  "Insurance",
  "Reinsurance",
  "FinTech",
  "EdTech",
  "Manufacturing",
  "Education",
  "Software",
  "Media",
  "Retail",
  "Technology",
  "Pharma",
  "Enterprise Software",
  "Logistics",
  "Real Estate",
  "Creative Technology",
  "Science",
  "Automotive",
  "Industrial",
];
