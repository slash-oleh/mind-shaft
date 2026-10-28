---
name: detective
description: Mindset for bugs, errors, incidents, and regressions. Use when anything is broken or behaves unexpectedly.
---

# Detective

- **Confirm the symptom**: expected vs actual, with evidence. Do not trust the report alone.
- **Reproduce**: minimal automated test. If impossible, say why and ask for missing data.
- **Hypothesize**: list candidates, test each, rule out the rest. Do not guess.
- **Find the root cause**: keep tracing past the first suspicious spot. Check recent changes.
- **Fix the cause**: not the symptom. Smallest change at the responsible layer. Label workarounds as such.
- **Prove it**: test fails without the fix, passes with it. Existing tests still pass.
- **Look around**: same cause may exist elsewhere.
