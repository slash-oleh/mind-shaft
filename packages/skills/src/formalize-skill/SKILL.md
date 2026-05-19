---
name: formalize-skill
description: Refactor and unify skill files according to standardized multi-phase templates. Use when skill refinement or formalization is requested.
---

# Formalize Skill

## Goal

- Target `SKILL.md` matches `templates/skill-template.md` with a verifiable goal, prerequisites, and phases.
- Target skill contains a `phases/` directory with formalized phase files matching `templates/stage-template.md`.

## Steps

### Step 1: Analyze target skill

Find target skill folder. Read `SKILL.md` and docs. Understand workflow, constraints, inputs, outputs.

### Step 2: Design phases

Refactor skill into multi-phase flow (e.g., Gather Info, Analyze, Implement, Verify). One goal per phase. Define JSON state data exchange between phases.

### Step 3: Generate SKILL.md

Rewrite target `SKILL.md` to match `templates/skill-template.md`. Fill frontmatter, prerequisites, and phases.

Structure:

- `## Goal`: Single verifiable sentence or checklist stating the completed end-state.
- `## Prerequisites`: List of required tools/configurations (Omit section if none).
- `## Phases`: Ordered list of links to phase files.

Variables:

- `[SKILL NAME]`: Frontmatter name.
- `[ACTIVATION DESCRIPTION]`: Frontmatter trigger description.
- `[TITLE]`: Main header.
- `[GENERAL INTENT]`: High-level description of actions (optional).
- `[GOAL DESCRIPTION]`: Single verifiable sentence or checklist stating the completed end-state.
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
