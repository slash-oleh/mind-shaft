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

- `{{SKILL_NAME}}`: Frontmatter name.
- `{{ACTIVATION_DESCRIPTION}}`: Frontmatter trigger description.
- `{{TITLE}}`: Main header.
- `{{GENERAL_INTENT}}`: High-level description of actions (optional).
- `{{GOAL_DESCRIPTION}}`: Single verifiable sentence or checklist stating the completed end-state.
- `{{TOOLS}}`: Prerequisites/tools.
- `{{STEPS}}`: Phases overview.
- `# Skill Execution Protocol

## Execution Loop

For each phase in order:

1. Announce **Phase N/X: <Name>**.

2. Read instructions (from file or section).

3. Execute instructions.
   - Follow phase steps exactly as defined, in order.

4. Verify phase goals are met:
   - For each item in `## Goal`, explicitly verify and state how it was satisfied.
   - Do not skip, merge, or adopt goals during verification.

5. Persist phase output (see below).

6. Report **Phase N complete**.

## Data Exchange

Pass data between phases using persistent files:

- **Path**: `.cache/skills/<skill_name>/runs/<run_id>/<phase_id>.<ext>`
  - `<skill_name>`: Hyphenated name of the skill.
  - `<run_id>`: Ticket ID (e.g. `PROJ-123`) or unique, short hyphenated task summary (e.g. `fix-user-auth`).
  - `<phase_id>`: Matching phase filename.
  - `<ext>`: JSON or MD.

- **Format**: JSON for structured data, Markdown for text.

- **Output**: Phase must save results to file before completion.

  Create parent directories first:

  ```bash
  mkdir -p .cache/skills/<skill_name>/runs/<run_id>
  ```

  JSON example:

  ```bash
  cat << 'EOF' > .cache/skills/<skill_name>/runs/<run_id>/<phase_id>.json
  {
    "key": "value"
  }
  EOF
  ```

- **Read Input**: Subsequent phases MUST read previous data files for context. Previous phases output is an input for next phases.

  ```bash
  cat .cache/skills/<skill_name>/runs/<run_id>/<phase_id>.json 2>/dev/null || echo "{}"
  ```

## Human Approval

Require explicit approval before starting phases marked `(APPROVAL REQUIRED)`.

Ask: **"Ready for Phase N: <Name>. Confirm?"**

If user requests changes, return to the relevant phase.

## Common Rules

- **Follow instructions precisely**: Deviate only on explicit user request.
- **Expected skips**: If phase "Skip Conditions" are defined and met, announce and skip the phase.
- **Phase sequence**: Maintain sequential order. Do not mix phase actions.
- **Strict tool usage**: When specific script or command is mentioned - use exactly that. Do not improvise.
- **Ask, don't guess**: Clarify ambiguity and fix systematically instead of making silent assumptions.
- **Strict goal verification**: Verification of phase goals is mandatory. Go through every single goal item in `## Goal` section, and verify before completing a phase. Do not omit, rewrite, or generalize goals.
`: Keep verbatim. Build injects protocol.

### Step 4: Generate phase files

Create `phases/` folder. For each phase, write markdown matching `templates/stage-template.md`:

- `## Goal`: Single verifiable sentence or checklist stating the completed end-state.
- `## Skip Conditions`: Omit if none.
- `## Steps`: Format steps with `### Step {{ORDER}}: {{ACTION}}`.
- `## Output`: Define JSON schema fields to persist.

Variables:

- `{{ORDER}}`: Phase or step number (1, 2, 3, ...).
- `{{NAME}}`: Phase title.
- `{{GOAL_DESCRIPTION}}`: Goal or step details.
- `{{CRITERIA}}`: Skip conditions (Omit section if none).
- `{{STEP_DESCRIPTION}}`: Step description.
- `{{FIELD}}`: JSON output key.
- `{{VALUE_DESCRIPTION}}`: Value type and details.

Filename: `<ORDER>-<name>.md` where `ORDER` padded to 2 digits.

## Rules

- Do NOT inject `protocol.md`. Keep `{{PROTOCOL_INJECTED}}`. Build script injects it.
