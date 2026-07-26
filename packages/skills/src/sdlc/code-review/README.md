---
title: Home
---

# code-review

For skill itself see [SKILL.md](./SKILL.md).

## Meta info

This overrides Claude Code's `/code-review` for no obvious reason. It focuses on a specific set of things and their order. It's intended to be less line-nitpicking and more architecture-addressing.

## TODO

- Revise "Step 1: High-level review" to include:
  - Actual problem from ticket is solved, do we need a PR in the first place
  - Particular file sizes, separation
  - Duplications and missed re-use opportunities
  - Match with existing patterns
  - Breaking changes, externally affected parts
