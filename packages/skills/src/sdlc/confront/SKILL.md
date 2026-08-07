---
title: SKILL.md
name: confront
description: Critically examine a task specification against the codebase - structure requirements, identify gaps, reuse opportunities and risks, then challenge it with pointed questions and concerns. Use before planning or implementing a task, or whenever a specification needs scrutiny.
claudecode:
  context: fork
  background: false
  argument-hint: "[requirements]"
  arguments:
    - "requirements"
---

# Confront

## Goal

- Codebase alignment identified.
- Each challenging question answered.
- Concerns list covers every red-flag answer.

## Input

- Requirements: Structured document, should be itemized with `id` attached to each item.

## Steps

If the input is itemized, repeat Steps 1-2 per item, keyed by `id`.

### Step 1: Review Codebase

Inspect the existing implementation for related functionality to outline:

- **Similar patterns**: Identify similar functionality and extract reuse candidates (models, components, utilities).
- **Tech debt blockers**: Identify circumstances that block or complicate the task.
- **Regression risks**: Spot regression risks in shared code or core paths.
- **Affected modules**: Identify directories/files likely affected.

### Step 2: Challenge Requirements

Answer each topic's question below - a positive answer is a red flag.

```markdown
1. **Topic**: Question
```

1. **Unworthy**: Can we avoid implementing it in the first place?
2. **Preliminary solution**: Does the task state preliminary solution instead of goal?
3. **Unnecessary complications**: Is the solution over-engineered, implying unnecessary complexity?
4. **Alternative solution**: Is there a simpler alternative solution to achieve the same business goal?
5. **Pitfalls**: Are there hidden implementation implications, dependencies, constraints or edge cases not explicitly mentioned but important?
6. **Missing details**: Are there missing, unclear or ambiguous items or context?
7. **Scope creep**: Is the task trying to cover too many unrelated things?
8. **Vague**: Are acceptance criteria unmeasurable or untestable?
9. **Contradictory statements**: Are there contradictory statements?
10. **Business logic conflicts**: Does it misuse existing architecture or patterns?

### Step 3: Formulate Concerns

Each positive answer from the previous step can raise multiple concerns, against one or several Items. For each concern outline:

- ID: the concern's own identity - an ordered number, unique per concern.
- Item: the originating entry's ID, from Items. One entry MAY raise several concerns, each a distinct concern ID sharing the same Item.
- Summary: One sentence of what is unresolved.
- Description: All details.
- Suggestion: Filled for every verdict, verdict-specific - ticket creation or code `TODO` for Defer, possible solution for Implement, direct answer or `clarify` proxy for Explain, blank for Decline (Description already covers the rationale).
- Severity:
  - Major: architectural changes, bugs, correctness issues.
  - Medium: code reuse, readability, UX.
  - Minor: nitpicks, code style, renaming, minor improvements.
- Verdict:
  - Decline: Factually incorrect, missing full context, or not worth the effort. Rationalize why it shouldn't or can't be done the way it's defined.
  - Defer: Valid but out of scope right now - a separate issue, or would expand the diff significantly.
  - Explain: Only a question is raised, no change required.
  - Implement: Everything else. Proceed as usual.

If relevant, come up with additional concerns besides those coming from questions.

## Output

Markdown format, one top-level structure, entries tagged `- Item: {Item X}`. When input was itemized, `Codebase` and `Challenge` each list one entry per item; `Concerns` lists one entry per concern (an item may raise several, or none).

- Codebase
  - Item: {Item X}
  - Similar patterns
  - Tech debt blockers
  - Regression risks
  - Affected modules
- Challenge
  - Item: {Item X}
  - Topic
  - Question
  - Answer

- Concerns
  - Item: {Item X}
  - Summary
  - Description
  - Suggestion
  - Severity
  - Verdict
