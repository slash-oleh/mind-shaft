# Skill Execution Protocol

## Execution Loop

For each phase/step in order:

1. Announce **Phase N/X: [Name]**.
2. Read instructions (from file or section).
3. Execute instructions.
4. Log phase data (see below).
5. Report **Phase N complete**.

## Data Logging

Save inputs/outputs for every phase:

- Path: `.skills/runs/<run_id>/<phase_id>.json`
- Content: `{ "input": ..., "output": ..., "status": ... }`
- Log _as you go_, not at the end.

## Human Approval

Require explicit approval before transition to phases marked as `[APPROVAL REQUIRED]`.

Ask: **"Ready for Phase N: [Name]. Confirm?"**

The user will review previous output. If they request changes, go back to the relevant phase.

## Common Rules

- **Follow instructions precisely**. Deviate only when user explicitly requests different approach.
- **Expected skips**: When phase states optional activation and the condition is met, announce it and skip.
- **Phases order**: Always maintain sequential order. Don't mix actions from different phases.
- **Tools**: When a specific pre-built script or command is mentioned - use exactly that. Do not improvise or make up new ones.
- **Ask, don't guess**: Resolve ambiguity and errors by asking and fixing systematically, not by ad-hoc assuming.
