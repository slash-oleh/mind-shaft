---
name: formalize-skill
description: Unify skill structure to match templates for multi-stage processes with clear steps, inputs, outputs, approval gates, goals, rules. Use when skill needs unification or "refine skill" requested.
---

# Formalize Skill

## Goal

Make target `SKILL.md` to match templates and have stages defined.

## Steps

### Step 1: Analyze target skill

Find target skill folder. Read `SKILL.md` and docs. Understand workflow, constraints, inputs, outputs.

### Step 2: Design phases

Refactor skill into multi-phase flow (e.g., Gather Info, Analyze, Implement, Verify). One goal per phase. Define JSON state data exchange between phases.

### Step 3: Generate SKILL.md

Rewrite target `SKILL.md` to match `templates/skill-template.md`. Fill frontmatter, intent, prerequisites. List phases under `## Phases`.

Variables:

- `[SKILL NAME]`: Frontmatter name.
- `[ACTIVATION DESCRIPTION]`: Frontmatter trigger description.
- `[TITLE]`: Main header.
- `[GENERAL INTENT]`: High-level goal.
- `[TOOLS]`: Prerequisites/tools.
- `[STEPS]`: Phases overview.
- `[PROTOCOL INJECTED]`: Keep verbatim. Build injects protocol.

### Step 4: Generate phase files

Create `phases/` folder. For each phase, write markdown matching `templates/stage-template.md`:

- `## Goal`: Single verifiable sentence or checklist stating the completed end-state.
- `## Skip Conditions`: Omit if none.
- `## Steps`: Format steps with `### Step [ORDER]: [ACTION]`.
- `## Output`: Define JSON schema fields to persist.

Variables:

- `[ORDER]`: Phase or step number (1, 2, 3, ...).
- `[NAME]`: Phase title.
- `[GOAL DESCRIPTION]`: Goal or step details.
- `[CRITERIA]`: Skip conditions (Omit section if none).
- `[STEP DESCRIPTION]`: Step description.
- `[FIELD]`: JSON output key.
- `[VALUE DESCRIPTION]`: Value type and details.

Filename: `<ORDER>-<name>.md` where `ORDER` padded to 2 digits.

## Rules

- Do NOT inject `protocol.md`. Keep `[PROTOCOL INJECTED]`. Build script injects it.
