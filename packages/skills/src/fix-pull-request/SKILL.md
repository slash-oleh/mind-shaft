---
name: fix-pull-request
description: Address all PR blockers - review comments (human, CodeRabbit, Copilot), CI failures, and formatting issues - then push a clean fix back to GitHub. Use this skill whenever the user says "fix PR", "fix review comments", "address comments", "CI is failing", "fix CI", "PR feedback", or needs to get a pull request unblocked.
---

# Fix Pull Request

Systematic workflow for resolving all blockers on a GitHub Pull Request: review comments, CI failures, merge conflicts, and bot suggestions.

## Prerequisites

- `gh` CLI installed and authenticated

## Phases

1. [Gather Info](phases/01-gather-info.md)
2. [Analyze](phases/02-analyze.md)
3. [Resolve Merge Conflicts](phases/03-resolve-conflicts.md)
4. [Apply Fixes](phases/04-apply-fixes.md)
5. [Push](phases/05-push.md)
6. [Reply](phases/06-reply.md)

## Execution

For each phase in order:

1. Announce **Phase N/X: [Name]**
2. Read the phase file instructions
3. Execute instructions from it
4. Report **Phase N complete**

## Rules

- **Follow phase instructions precisely**. Only drift when specific approach is requested explicitly.
- If a phase does not apply, announce it, note skip, move on.
- Maintain the order of steps and distinction - don't mix them together.
- When the pre-built script or command is mentioned - use it, not make up new ones. Adopt if needed.
- Save phase outputs as temporary files for retrospective analysis.

## Human approval

**Require explicit human approval before proceeding to certain phases:**

- Phase 3 (Resolve Merge Conflicts)
- Phase 6 (Push)

Ask: **"Ready to phase X. Confirm?"**

User will review an output of previous phase and provide answer.

If the user requests changes, get back to relevant phase.
