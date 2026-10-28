---
title: Home
---

# delivery-autopilot

For skill itself see [SKILL.md](./SKILL.md).

## Meta info

Hands-off driver from any task stage to shipped, replacing `implement-ticket` for the `domain` persona. Stage is observed, not stored, so re-invoking continues the task. Practices live in sibling declarative skills, this one only routes stages and sets the persona. Waits end the run, scheduling is up to the caller.

## TODO

- Pre-commit stages (Q&A, spec, plan) are not durable, an interrupted run restarts them. Consider persisting spec/plan.
- Consider Ralph loop, `/goal`, remote execution, durable compute (restate, temporal.io).
- Decide where "ship" (merge, verify) rules belong long term, maybe `pull-requests`.
