---
name: resolve-todo
description: Resolve a single TODO item from TODO.md or README.md. Pick one task, implement it, and mark it complete.
---

# Resolve TODO

Pick and implement one task from TODO list.

## Steps

1. Identify the task from user prompt (exact line or description).
2. Find corresponding item in `TODO.md` or `README.md`.
3. Announce selected task.
4. Implement task.
5. Verify implementation.
6. Update source file by removing the resolved item.
7. Report completion.

## Rules

- One task per run.
- Verify before marking done.
- Follow project style.
