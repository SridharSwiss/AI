---
description: Daily routine — add mandatory items across the five list screens, update counts, validate, then commit (no push) and ask for approval to push.
---

# Daily Mandatory-Items Routine

ROLE
You are running as a daily routine on the SridharSwiss/AI repo, which powers
sridhar-ai.ch. Use your research and writing skills. Work deterministically through
the build steps — there is no human to approve steps MID-run. The ONLY human
checkpoint is at the very end: you will commit but NOT push, and ask the user to
approve the push.

STEP 0 — BRANCH
Check out branch `claude/upbeat-feynman-HrqTF`; create it from the default branch if
it doesn't exist. All work and the final commit go ONLY to this branch. Never commit
or push to the default branch, never push at all in this run, and never open a pull
request.

STEP 1 — DISCOVER & MAP (do this before touching anything)
Map the real codebase and write the map into a scratch note you keep for the run:
  - Locate the five list screens: Tools, Companies, Case Studies, Toolkits,
    Compliance. Record each screen's route/page file, the component(s) that render
    its list, and the data source backing it (e.g. JSON/MD/MDX/CMS/DB file or
    fetcher).
  - For each screen, record the exact data model of an existing item: every field,
    type, and which fields are required vs optional. This is your "shape" contract.
  - Locate every place a count is shown (home/main screen and each individual
    screen). Record file + variable, and whether each count is hardcoded or derived.
  - Identify the build, lint, and test commands from package.json / config.
If any of the five screens cannot be located, DO NOT invent it — note it as
"Not found" in the final summary and continue with the ones you did find.

STEP 2 — PER SCREEN (run a→e fully for one screen before starting the next)
  a. INVENTORY: list the items currently on the screen.
  b. MANDATORY SET: infer which items are mandatory from the criteria the existing
     items already satisfy and the design conventions on that screen. Do not invent
     new categories or criteria.
  c. GAP: identify missing mandatory items; for each, gather the full detail the
     screen's data shape (from Step 1) requires.
  d. IMPLEMENT: add missing items using the EXACT data shape, component structure,
     formatting, and styling of existing entries. Additive only — do not delete,
     reorder, or restyle existing items.
  e. VERIFY: confirm the screen renders and stays 100% compliant with the current
     design (same structure, no schema drift, no layout break).

STEP 3 — COUNTS
Using the count locations mapped in Step 1, update every count (main screen and each
individual screen) to the new totals. Re-grep the codebase to confirm no count was
missed.

STEP 4 — DEPENDENCIES
For every file touched, trace and update dependencies: shared data files, indexes,
type/interface definitions, filters, search/sort logic, sitemaps, snapshots, and any
generated output.

STEP 5 — VALIDATE, COMMIT (NO PUSH), THEN ASK
  1. Run the build, lint, and tests found in Step 1. Fix anything you broke. They
     must pass before committing. If something is genuinely red and out of scope to
     fix, STOP, leave it uncommitted, and report it in the FINAL SUMMARY instead of
     committing broken work.
  2. Stage and COMMIT to `claude/upbeat-feynman-HrqTF` with a clear message
     summarizing additions per screen and count updates.
  3. DO NOT push. DO NOT open a pull request. Leave the commit local on the branch.
  4. End the run by printing the FINAL SUMMARY (below) and explicitly asking the
     user: "Changes are committed locally on claude/upbeat-feynman-HrqTF but NOT
     pushed. Reply to approve the push." Then stop and wait.

GUARDRAILS
  - Additive changes only; never delete/restyle existing compliant content.
  - If a "mandatory" item is genuinely ambiguous, or required data can't be verified,
    DO NOT guess — skip it and list it under "Deferred" with the reason.
  - If an item would need a large refactor or change the design system, STOP that
    item, leave it unimplemented, and document why.
  - Keep all item data faithful to verifiable sources; never fabricate details.
  - Never push and never open a PR in this routine — pushing is a separate,
    human-approved step.

FINAL SUMMARY (always output, even if nothing changed)
  - The Step 1 map (screens → files → data source).
  - Per screen: items added (count), counts before → after.
  - Every count location updated.
  - Dependencies touched.
  - Deferred / skipped items, each with a reason.
  - Any screen marked "Not found".
  - The commit SHA created (or "no commit — nothing changed" / "no commit — build
    failed").
  - The approval ask: committed locally, not pushed, awaiting go-ahead to push.
