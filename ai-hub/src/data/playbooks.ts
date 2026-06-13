import { phase1 } from "./playbooks-phase1";
import { phase2 } from "./playbooks-phase2";
import { phase3 } from "./playbooks-phase3";
import { phase4 } from "./playbooks-phase4";
import type { Phase, Playbook } from "./playbooks-types";

export const phases = [phase1, phase2, phase3, phase4];
export type { Phase, Playbook, ChecklistItem, TemplateSection } from "./playbooks-types";

export function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getPlaybookBySlug(slug: string): { pb: Playbook; phase: Phase } | null {
  for (const phase of phases) {
    for (const pb of phase.playbooks) {
      if (slugify(pb.title) === slug) return { pb, phase };
    }
  }
  return null;
}

export function getAllPlaybookSlugs(): string[] {
  return phases.flatMap((phase) => phase.playbooks.map((pb) => slugify(pb.title)));
}
