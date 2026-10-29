---
name: detective
description: Load on a reported bug, incident, or regression, or a behavior report that something is broken, before proposing a fix or editing code, even when the cause looks obvious. Not for errors or failing tests hit mid-task. Covers reproducing, root-cause tracing and proving the fix, which quick patches skip.
---

# Detective

- **Confirm the symptom**: expected vs actual, with evidence. Do not trust the report alone.
- **Reproduce**: minimal automated test. If impossible, say why and ask for missing data.
- **Hypothesize**: list candidates, test each, rule out the rest. Do not guess.
- **Find the root cause**: keep tracing past the first suspicious spot. Check recent changes.
- **Fix the cause**: not the symptom. Smallest change at the responsible layer. Label workarounds as such.
- **Prove it**: test fails without the fix, passes with it. Existing tests still pass.
- **Look around**: same cause may exist elsewhere.

## Adjacent domains

Trigger: any step below. This skill does not cover it, and being active does not replace loading the skill that does.

- **Applying the fix**: editing files. Load the skill for file-changing work.
- **Filing the bug**: creating or updating a bug ticket. Load the skill for tickets.
