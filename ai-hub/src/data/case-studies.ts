export type { CaseStudyData, OpenSourceRepo, Reference, ImplementationPhase, ROIBreakdownItem } from "./case-studies-types";
import type { CaseStudyData } from "./case-studies-types";
import { caseStudiesData1 } from "./case-studies-data-1";
import { caseStudiesData2 } from "./case-studies-data-2";
import { caseStudiesDataInsurance } from "./case-studies-data-insurance";
import { caseStudiesData3 } from "./case-studies-data-3";
import { caseStudiesData4 } from "./case-studies-data-4";
import { caseStudiesData5 } from "./case-studies-data-5";
import { caseStudiesData6 } from "./case-studies-data-6";
import { caseStudiesData7 } from "./case-studies-data-7";
import { caseStudiesData8 } from "./case-studies-data-8";
import { caseStudiesData9 } from "./case-studies-data-9";
import { caseStudiesData10 } from "./case-studies-data-10";

export const caseStudies: CaseStudyData[] = [...caseStudiesData1, ...caseStudiesData2, ...caseStudiesDataInsurance, ...caseStudiesData3, ...caseStudiesData4, ...caseStudiesData5, ...caseStudiesData6, ...caseStudiesData7, ...caseStudiesData8, ...caseStudiesData9, ...caseStudiesData10];

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
