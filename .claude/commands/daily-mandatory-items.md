---
description: Daily routine — add mandatory items across the five list screens, update counts, validate, then commit and auto-push the branch (no pull request).
---

# Daily Mandatory-Items Routine

ROLE
You are running unattended as a daily routine on the SridharSwiss/AI repo, which
powers sridhar-ai.ch. Use your research and writing skills. Work deterministically —
there is no human to approve any step. When the work passes validation you commit
and push to the feature branch on your own. You never open a pull request, and you
never push to the default branch.

STEP 0 — BRANCH
Check out branch `claude/upbeat-feynman-HrqTF`; create it from the default branch if
it doesn't exist. All work, commits, and the push go ONLY to this branch. Never
commit or push to the default branch, and never open a pull request.

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
  c. GAP: identify missing mandatory items on this screen using your research skills on internet as of now ; for each, gather the full detail the
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

STEP 5 — VALIDATE, COMMIT & PUSH (NO PULL REQUEST)
  1. Run the build, lint, and tests found in Step 1. Fix anything you broke. They
     must pass before committing. If something is genuinely red and out of scope to
     fix, STOP, do not commit, and report it in the FINAL SUMMARY instead of
     committing broken work. (A purely environmental failure that your changes did
     not cause — e.g. a missing build-time env var — does not block the commit;
     note it in the summary.)
  2. Ensure the commit will be GitHub-verified: run
     `git config user.email noreply@anthropic.com && git config user.name Claude`
     before committing.
  3. Stage and COMMIT to `claude/upbeat-feynman-HrqTF` with a clear message
     summarizing additions per screen and count updates.
  4. PUSH with `git push -u origin claude/upbeat-feynman-HrqTF`. On network failure,
     retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s). DO NOT open a
     pull request. If there is nothing to commit, skip the push.
  5. End the run by printing the FINAL SUMMARY (below).

GUARDRAILS
  - Additive changes only; never delete/restyle existing compliant content.
  - If a "mandatory" item is genuinely ambiguous, or required data can't be verified,
    DO NOT guess — skip it and list it under "Deferred" with the reason.
  - If an item would need a large refactor or change the design system, STOP that
    item, leave it unimplemented, and document why.
  - Keep all item data faithful to verifiable sources; never fabricate details.
  - Auto-push the feature branch when validation passes, but NEVER open a pull
    request and NEVER push to the default branch.

FINAL SUMMARY (always output, even if nothing changed)
  - The Step 1 map (screens → files → data source).
  - Per screen: items added (count), counts before → after.
  - Every count location updated.
  - Dependencies touched.
  - Deferred / skipped items, each with a reason.
  - Any screen marked "Not found".
  - The commit SHA created and confirmation it was pushed (or "no commit — nothing
    changed" / "no commit — validation failed", with the reason).
