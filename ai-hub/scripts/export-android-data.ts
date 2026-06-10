/**
 * Exports all static data as JSON files for the Android native app.
 * Run: npx tsx scripts/export-android-data.ts
 */
import fs from "fs";
import path from "path";

import { tools } from "../src/data/tools";
import { companies } from "../src/data/companies";
import { caseStudies } from "../src/data/case-studies";
import { complianceFrameworks } from "../src/data/compliance";
import { learnResources } from "../src/data/learn";
import { phases } from "../src/data/playbooks";

const OUT_DIR = path.resolve(__dirname, "../../android-native/app/src/main/assets");
fs.mkdirSync(OUT_DIR, { recursive: true });

const write = (name: string, data: unknown) => {
  const file = path.join(OUT_DIR, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`✓ ${name}.json  (${(fs.statSync(file).size / 1024).toFixed(1)} KB)`);
};

write("tools",       tools);
write("companies",   companies);
write("case_studies", caseStudies);
write("compliance",  complianceFrameworks);
write("learn",       learnResources);
write("playbooks",   phases);

console.log("\nAll data exported to android-native/app/src/main/assets/");
