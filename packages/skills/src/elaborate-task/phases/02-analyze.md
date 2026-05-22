# Phase 2: Analyze

Critically examine the task against the codebase and identify gaps, reuse opportunities and potential risks.

## Goal

- Initial requirements structured as sections.
- No initial information is lost in restrucutring.
- Identified codebase alignment.
- Each challenging question answered.
- List of concerns covers all answers.

## Steps

### Step 1: Review Requirements

Structure the input as sections:

- **Core goal**: Identify essential problem to be solved besides directly proposed solution.
- **Description**: What is currently specified about the task (freeform).
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
3. **Unnecessary complications**: Is the solution over-engineered, implying unneccessary complexity?
4. **Alternative solution**: Is there a simpler alternative solution to achieve the same business goal?
5. **Pitfalls**: Are there hidden implementation implications, dependencies, constraints or edge cases not explicitly mentioned but important?
6. **Missing details**: Are there missing, unclear or ambiguous items or context?
7. **Scope creep**: Is the task trying to cover too many unrelated things?
8. **Vague**: Are acceptance criteria unmeasurable or untestable?
9. **Contradictory statements**: Are there contradictory statements?
10. **Business logic conflicts**: Does it misuse existing architecture or patterns?

### Step 4: Formulate Concerns

Each positive answer can raise multiple concerns. For each concern outline:

- ID: Ordered number.
- Summary: One sentence of what is wrong.
- Description: All details.
- Suggestion: Possible solutions.

If relevant, come up with additional concerns besides those coming from questions.

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
    - Suggestion
      {Suggestion X}
