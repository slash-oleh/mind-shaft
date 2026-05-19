# Skill Execution Protocol

## Execution Loop

For each phase/step in order:

1. Announce **Phase N/X: [Name]**.
2. Read instructions (from file or section).
3. Execute instructions.
4. Verify phase goal is met.
5. Persist phase output (see below).
6. Report **Phase N complete**.

## Data Exchange

Pass data between phases using persistent files:

- **Path**: `.cache/skills/<skill_name>/runs/<run_id>/<phase_id>.<ext>`
  - `<skill_name>`: Hyphenated name of the executing skill.
  - `<run_id>`: Explicit task/issue ID (e.g. `PROJ-123` from Jira/GitHub). If no ID exists, use a unique, short hyphenated summary of the task or conversation (e.g. `fix-user-auth`).
  - `<phase_id>`: Identical to phase filename in `/phases` directory.
  - `<ext>`: Depends on Format (see below).
- **Format**: JSON for structured data (preferred), Markdown for unstructured text.
- **Output**: Phase MUST save results to its data file before phase completion.

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

Require explicit approval before transition to phases marked as `[APPROVAL REQUIRED]`.

Ask: **"Ready for Phase N: [Name]. Confirm?"**

The user will review previous output. If they request changes, go back to the relevant phase.

## Common Rules

- **Follow instructions precisely**. Deviate only when user explicitly requests different approach.
- **Expected skips**: When phase states optional activation in "Skip Conditions" section and the condition is met, announce it and skip.
- **Phases order**: Always maintain sequential order. Don't mix actions from different phases.
- **Tools**: When a specific pre-built script or command is mentioned - use exactly that. Do not improvise or make up new ones.
- **Ask, don't guess**: Resolve ambiguity and errors by asking and fixing systematically, not by ad-hoc assuming.
