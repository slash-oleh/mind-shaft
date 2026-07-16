---
name: code-review
description: Perform a comprehensive code review of a pull request according to project rules.
---

# Code Review

## Goal

- Review comments are posted.

## Prerequisites

- `gh` CLI installed and authenticated

## Phases

1. [Gather Info](phases/01-gather-info.md)
2. [Analyze](phases/02-analyze.md)
3. [Submit](phases/03-submit.md)

## Shared Patterns

### Shell Markdown Bodies

When a script or CLI command requires a markdown body, always use a temp file with a quoted heredoc to avoid shell escaping issues (especially backticks):

```bash
TMP=$(mktemp)
cat > "$TMP" <<'EOF'
...markdown content...
EOF
# Pass "$TMP" to gh or script
```

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

