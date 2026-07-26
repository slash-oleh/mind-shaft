---
name: clarify
description: Resolve open concerns about a task through a Q&A session with the user, updating requirements as answers come in. Use after concerns/gaps on a spec have been raised (e.g. by `confront`) and before committing to a plan.
---

# Clarify

## Goal

Complete task understanding:

- All concerns are addressed.
- Updated requirements are established.

## Input

- Requirements (e.g. `confront`'s Initial Requirements).
- Concerns list (e.g. `confront`'s Concerns), each with ID, summary, description, suggestion.

## Steps

### Step 1: Resolve Concerns

Perform Q&A session.

For each concern one by one, ask user clarifying questions to:

- Fill gaps
- Resolve conflicts
- Mitigate risks

Reiterate until all concerns resolved or user prefers moving on.

## Output

Markdown format:

- Updated Requirements: Same structure as input Requirements.
- Addressed Concerns
  - {ID X}. {Summary X}
    {Resolution X}
