---
name: create-ticket
description: Create a structured ticket in the project management system. Use when user requests ticket or issue creation.
---

# Create Ticket

## Goal

- Ticket is created in issue tracker system.

## Before creating

Gather target project required fields. Common fields:

1. **Title** - see guidelines below.
2. **Description** - see guidelines below.
3. **Type** - Story, Task, Bug, Sub-task, or system equivalent.
4. **Parent** - Epic or grouping context; ask if required by target project.
5. **Assignee** - assign to self, user, or project default.
6. **Sprint** - none (backlog), current, or future.
7. **Priority** - Low, Medium, High, or system equivalent.
8. **Metadata** - project or system dependent custom fields like Team, Labels.

If details already provided, proceed without asking.

### Title Guidelines

- Concise
- Must focus on the goal, not the solution.
- For features/tasks: imperative mood.
- For bugs: describe the current state (the issue), not the desired behavior or proposed fix.

### Description Guidelines

Write structured, developer-friendly descriptions:

- **Tone**: Professional, objective, direct.

- **Focus**: Focus on the problem and the goal, not the proposed solution. For bugs, describe the issue, not the fix.

- **Details**: Sufficient for immediate implementation without extra clarification.

- **Structure**:
  - Paragraphs for logical context.
  - Lists for requirements, tasks, or options.
  - Code blocks for logs, code snippets, configs, or command outputs.
  - References or links to files, pull requests, docs, or other tickets.

### Bug Description Template

If type is **Bug**, description MUST include:

- **Pre-conditions**: Required system state, environment, user account, or configuration.
- **Steps to Reproduce (STR)**: Numbered actions triggering the bug.
- **Actual Result (AR)**: Incorrect behavior with error logs or messages.
- **Expected Result (ER)**: Correct expected behavior.

## After creating

Report created ticket URL.

If creation failed, explain reason and retry with corrected fields.


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
