import { phase1 } from "./playbooks-phase1";
import { phase2 } from "./playbooks-phase2";
import { phase3 } from "./playbooks-phase3";
import { phase4 } from "./playbooks-phase4";

export const phases = [phase1, phase2, phase3, phase4];
export type { Phase, Playbook, ChecklistItem, TemplateSection } from "./playbooks-types";
