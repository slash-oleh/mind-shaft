# Phase 3: Clarify

## Goal

- All concerns are addressed.
- Updated requirements are established.

## Steps

### Step 1: Invoke clarify

Invoke the `clarify` skill, passing along Phase 2's Requirements and Concerns as input:

```
Skill(skill: "clarify", args: "<phase_2_requirements_and_concerns>")
```

Treat `clarify` as a single unit - do not read or invoke its internal files directly.

## Output

The Markdown returned by `clarify`:

- Updated Requirements: Same structure as in Phase 2.
- Addressed Concerns
  - {ID X}. {Summary X}
    {Resolution X}
