---
title: SKILL.md
name: tickets
description: Load before creating, updating, commenting on, or changing the status of a ticket (Jira or similar), and when reading a ticket to decide whether it is ready to implement. Project field layout, status flow and audience rules differ from default habits.
---

# Tickets

- **Keep status current**: move to "In Progress" when work starts, to "Code Review" when the PR is submitted, and to "Testing" when shipped (merged or deployed). Use the project's own status names if they differ.
- **Comment when shipped**: say what shipped and where.
- **Attach evidence**: logs, screenshots, recordings.
- **Be skeptical of the definition**: challenge tickets that are too vague (no clear goal or criteria) or too specific (prescribe a solution instead of a problem).
- **Match the audience**: ticket readers are often semi-technical, so use higher-level language than in PRs and avoid implementation detail unless it is needed.

## Adjacent domains

Trigger: any step below. This skill does not cover it, and being active does not replace loading the skill that does.

- **Drafting text**: ticket title, description, comments. Load the skill for text other people read.
- **Judging readiness**: challenging a ticket before work starts. Load the skill for scrutinizing a task spec.

## Creating

- **Choose the shape by type**: features use the feature fields, bugs use the bug fields. Add other sections only when they carry information.

### Features

- **Title**: imperative mood, concise, one sentence.
- **Core goal**: the essential problem to solve, beyond the proposed solution. Focus on the problem, not the solution.
- **Description**: what is currently specified, as a short narrative.
- **Items**: one entry per discrete input item, keeping its ID. Do not collapse items into the description. If the input is not itemized, use a single entry without an ID.
- **Scope**: what is included, and what is handled separately (already done, in parallel, or later).
- **Criteria**: acceptance criteria and Definition of Done.
- **Risks**: immediate gaps in correctness, completeness, or consistency.

### Bugs

- **Title**: issue statement. Focus on the issue, not the fix - declare the current, incorrect behavior (e.g. "User cannot log in").
- **Pre-conditions**: what is needed to reproduce (system state, environment, account, configuration).
- **Steps to Reproduce (STR)**: sequential actions that trigger the bug.
- **Actual Result (AR)**: the incorrect behavior (e.g. error message).
- **Expected Result (ER)**: the correct behavior.
- **Evidence**: logs, screenshots, or other assets showing the symptoms.
- **Severity**: critical, high, medium, or low.
