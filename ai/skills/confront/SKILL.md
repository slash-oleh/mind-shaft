---
name: confront
description: Critically examine a task specification against the codebase - structure requirements, identify gaps, reuse opportunities and risks, then challenge it with pointed questions and concerns. Use before planning or implementing a task, or whenever a specification needs scrutiny.
---

# Confront

## Goal

- Requirements structured as sections, with no initial information lost.
- Codebase alignment identified.
- Each challenging question answered.
- List of concerns covers all answers, and, if input was itemized, all items.

## Input

- Task requirements (raw description, ticket, or `gather-task`'s output).

## Steps

### Step 1: Review Requirements

Structure the input as sections:

- **Core goal**: Identify essential problem to be solved besides directly proposed solution.
- **Description**: What is currently specified about the task (freeform). If the input is itemized (multiple discrete entries, each with its own ID), keep every entry enumerated here - do not collapse them into one narrative.
- **Scope**: Identify bounds of the task. What's included and what is implied to be implemented separately (already done, in parallel or later).
- **Criteria**: Acceptance criteria and Definition of Done for the task.

### Step 2: Review Codebase

Inspect existing implementation for related functionality to outline:

- **Similar patterns**: Identify similar functionality, extract candidates, reuse opportunities (models, components, utilities)
- **Tech debt blockers**: Identify circumstances that block or complicate the task.
- **Regression risks**: Spot regression risks in shared code or core paths.
- **Affected modules**: Identify directories/files likely affected.

### Step 3: Challenge Requirements

Answer each topic question, where positive answer is a red flag.

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

### Step 4: Formulate Concerns

Each positive answer can raise multiple concerns. For each concern outline:

- ID: the originating item's ID, if the input was itemized (Step 1). Otherwise an ordered number.

- Summary: One sentence of what is wrong.

- Description: All details.

- Severity:
  - Major: architectural changes, bugs, correctness issues.
  - Medium: code reuse, readability, UX.
  - Minor: nitpicks, code style, renaming, minor improvements.

- Verdict:
  - Decline: Factually incorrect, missing full context, or not worth the effort. Explain.
  - Defer: Valid but out of scope right now - a separate issue, or would expand the diff significantly. Suggest ticket creation or code `TODO`.
  - Explain: Only a question is raised, no change required. Answer directly, or proxy to `clarify` if not clear.
  - Implement: Everything else. Proceed as usual.

- Suggestion: Possible solutions (for Implement verdict).

If relevant, come up with additional concerns besides those coming from questions.

If the input was itemized (Step 1), coverage must be complete: emit exactly one Concern per input item. An item with no red flags still gets a Concern - Severity/Description reduced to "None", Verdict `Implement`, Suggestion is the item's own proposal as-is.

## Output

Markdown format:

- Initial Requirements
  - Core goal
  - Description
  - Scope
  - Risks
  - Criteria
- Codebase
  - Similar patterns
  - Tech debt blockers
  - Regression risks
  - Affected modules
- Questions
  - {Topic X}

    > {Question X}

    {Answer X}

- Concerns
  - {ID X}. {Summary X}
    {Description X}
    - Severity: {Severity X}
    - Verdict: {Verdict X}
    - Suggestion
      {Suggestion X}
