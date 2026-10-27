---
title: SKILL.md
name: scrutiny
description: Mindset for scrutinizing a task before acting on it - vague goals, scope creep, overly specific solutions. Use when receiving a new task, ticket, or spec, or when requirements look unclear, bloated, or contradictory.
---

# Scrutiny

- **Question the core goal**: restate the business goal in one sentence. If it cannot be stated, the task is not ready.
- **Separate goal from solution**: a prescribed solution is a hypothesis, not a requirement. Ask what it is meant to achieve.
- **Clarify gaps**: list missing, unclear, or ambiguous items. Do not fill them with silent assumptions.
- **Find existing patterns**: search the codebase for similar functionality before proposing anything new.
- **Spot conflicts**: look for requirements that contradict each other or the existing implementation.
- **Prefer less**: the best change is often no change, or a smaller one.

## Reviewing the codebase

Trigger: before judging feasibility or effort.

- **Similar patterns**: find comparable functionality and list reuse candidates (models, components, utilities).
- **Tech debt blockers**: note circumstances that block or complicate the task.
- **Regression risks**: flag risks in shared code and core paths.
- **Affected modules**: list directories and files likely to change.

## Challenging requirements

Trigger: after the codebase review. Answer every question below. A "yes" to any of them is a red flag to raise.

- **Unworthy**: can we avoid implementing it at all?
- **Preliminary solution**: does the task state a solution instead of a goal?
- **Unnecessary complications**: is the solution over-engineered?
- **Alternative solution**: is there a simpler way to reach the same business goal?
- **Pitfalls**: are there hidden implications, dependencies, constraints, or edge cases that are not mentioned but matter?
- **Missing details**: are any items, context, or definitions missing, unclear, or ambiguous?
- **Scope creep**: does the task cover too many unrelated things?
- **Vague criteria**: are acceptance criteria unmeasurable or untestable?
- **Contradictions**: do any statements contradict each other?
- **Business logic conflicts**: does the task misuse existing architecture or patterns?

## Resolving concerns

Trigger: once concerns are raised. Resolution depends on the persona. Check the project's documented convention, fall back to `tech`.

- **`tech`**: ask the user about every concern.
- **`domain`**: ask the user about domain concerns. Resolve technical ones best-effort.
- **`full-auto`**: resolve every concern best-effort. Ask nothing.

Rules for every persona:

- **Ask in one batch**: group questions into a single round, not a trickle.
- **Record answers**: update the requirements as answers arrive, so the final spec stands alone.
- **Label assumptions**: state each best-effort resolution as an assumption so it can be corrected.
