# Phase 2: Analyze

## Goal

- Task critically examined against the codebase.
- Gaps, reuse opportunities and risks identified.

## Steps

### Step 1: Invoke confront

Invoke the `confront` skill, passing along Phase 1's output as input:

```
Skill(skill: "confront", args: "<phase_1_output>")
```

Treat `confront` as a single unit - do not read or invoke its internal files directly.

## Output

The Markdown returned by `confront`:

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
