---
name: implement-task
description: Implement a task end-to-end from a ticket, external link, or plain description. Use this skill whenever the user provides a ticket ID, a task URL, or a description and says "implement", "build", "work on", "do this task", or "add this feature".
---

# Implement Task

Structured workflow for implementing a task from a ticket or description through to a verified code change.

## Prerequisites

- Project management MCP server, CLI available (if applicable)

## Phases

1. [Gather Info](phases/01-gather-info.md)
2. [Analyze](phases/02-analyze.md)
3. [Acceptance Criteria](phases/03-acceptance-criteria.md)
4. [Plan](phases/04-plan.md)
5. [Implement](phases/05-implement.md)
6. [Verify](phases/06-verify.md)

## Execution

For each phase in order:

1. Announce **Phase N/6: [Name]**
2. Read the phase file instructions
3. Execute instructions from it
4. Report **Phase N complete**

## Rules

- **Follow phase instructions precisely.** Only drift when the user explicitly requests a different approach.
- If a phase does not apply (e.g. no related assets exist), announce it, note the skip, and move on.
- Maintain the order of phases - do not mix them.
- When a pre-built script or command is mentioned - use it, not make up new ones.

## Human approval

**Require explicit human approval before proceeding to certain phases:**

- Phase 3 (Acceptance Criteria) - user reviews gathered info and analysis
- Phase 5 (Implement) - user reviews acceptance criteria and plan

Ask: **"Ready for Phase N: [Name]. Confirm?"**

The user will review the previous phase output and provide an answer.

If the user requests changes, go back to the relevant phase before continuing.
