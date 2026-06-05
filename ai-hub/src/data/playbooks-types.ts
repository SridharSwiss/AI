export interface TemplateSection {
  heading: string;
  items: string[];
}

export interface ChecklistItem {
  item: string;
  templateTitle: string;
  templateType: "survey" | "questionnaire" | "template" | "scorecard" | "matrix" | "worksheet" | "framework";
  instructions: string;
  sections: TemplateSection[];
}

export interface Playbook {
  title: string;
  level: "beginner" | "practitioner" | "manager" | "executive";
  desc: string;
  guidance: string;
  checklist: ChecklistItem[];
}

export interface Phase {
  phase: string;
  label: string;
  color: string;
  bg: string;
  description: string;
  playbooks: Playbook[];
}
