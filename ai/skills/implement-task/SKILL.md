---
name: implement-task
description: Execute task implementation from a specification through to a verified code change. Use when user provides ticket or description to implement.
---

# Implement Task

## Goal

- Code changes are successfully implemented and committed.
- Implementation passes all quality checks and project success criteria.

## Prerequisites

- Project management MCP server (e.g., Jira, GitHub Issues)
- Design MCP server (e.g., Figma)
- Documentation MCP server (e.g., Confluence)

## Phases

1. [Gather Info](phases/01-gather-info.md)
2. [Plan](phases/02-plan.md)
3. [Implement](phases/03-implement.md) (APPROVAL REQUIRED)
4. [Verify](phases/04-verify.md)

## Execution

Follow the **Skill Execution Protocol** (see below).

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

