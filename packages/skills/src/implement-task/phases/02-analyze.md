# Phase 2: Analyze

Critically examine the task against the codebase and identify risks, reuse opportunities, and potential requirement challenges, fill unclear or missing items.

## Goal

- Core task goal is identified.
- Task scope is fully bounded.
- Codebase checked for alignment.
- Requirements challenged for gaps, conflicts, unnecessary complications.
- Prioritized task list is compiled.

## Steps

### Step 1: Review Requirements

- **Core goal**: Identify essential problem to be solved besides directly proposed solution.
- **Scope**: Identify bounds of the task. What's included and what is implied to be implemented separately (already done, in parallel or later).
- **Acceptance criteria**: Definition of Done for the task.
- **Risks**: Identify hidden dependencies or constraints.
- **Conflicts**: Identify possible misuse of existing architecture or patterns.

### Step 2: Review Codebase

- Inspect existing implementation for related functionality.
- Deep-dive into `Affected Modules` (Phase 1) and existing patterns.
- Identify specific reuse opportunities (models, components, utilities).
- Spot regression risks in shared code or core paths.

### Step 3: Challenge Requirements

- **Core goal**
  - Can we avoid implementing this task in the first place?
  - Does the task state solution, goal or both?
  - Is the solution over-engineered, implying unneccessary complexity?
  - Is there a simpler alternative to achieve the same business goal?
- **Scope**
  - Is the scope explicitly defined and complete?
  - Are there hidden implementation implications not explicitly mentioned but required?
  - Is the task trying to cover too many unrelated things?
- **Acceptance criteria**
  - Are they measurable or testable?
  - Do they align with the core goal?
- **Risks**
  - Is it worth it?
  - Can we avoid risks by changing the implementation?
- **Conflicts**
  - Does it imply misuse of existing architecture or patterns?
  - Does it have contradicting requirements?

### Step 4: Fill Gaps

- Do we still have unclear or missing items, such as system context, scope or acceptance criteria?
- Ask clarifying questions if so.

### Step 5: Summarize

- Classify sub-tasks by complexity and risk.

## Output

Markdown format:

- Requirements: Core goal, scope bounds, initial criteria, identified risks, and conflicts.
- Codebase: Related functionality, patterns, reuse opportunities (models, components, utilities), and regression risks.
- Challenges: Results of challenging goal, scope, criteria, risks, and conflicts.
- Gaps: Unclear or missing items and clarifying questions.
- Task Assessment: Sub-tasks with complexity (low/med/high) and risk (low/med/high).
