---
name: extract-skill
description: Extract process knowledge from conversation actions and outcomes into a reusable skill. Use when asked to create a skill based on recently performed work.
---

# Extract Skill

## Goal

Summarize work done in the conversation actions and outcomes to extract reusable process knowledge as a skill. Abstract from data or other case-specific details and focus on algorithm.

## Prerequisites

- Access to recent conversation history and actions.

## Execution

### Step 1: Analyze actions and outcomes

Review the recent conversation history. Identify the sequence of actions, commands used, and tools applied that led to the successful outcome. Rely on the actual procedure that worked rather than reinventing the sequence.

### Step 2: Generalize and abstract

Abstract the extracted sequence from specific data or case-specific details. Focus on the algorithm and the general process.

### Step 3: Identify skill components

Identify the goal, execution steps, prerequisites, and activation conditions for the new skill based on the generalized process.

### Step 4: Create skill directory

Create a new directory for the skill.

### Step 5: Write SKILL.md

Write the `SKILL.md` file. Populate the frontmatter (name, description based on activation conditions), goal, prerequisites, and execution instructions. Do not reinvent tools or sequences - prefer what worked.

### Step 6: Formalize skill structure

Follow the corresponding skill structure pattern. Utilize available skill builder skills to format and formalize it.


---

# Skill Execution Protocol

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
