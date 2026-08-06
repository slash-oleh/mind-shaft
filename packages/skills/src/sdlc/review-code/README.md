---
title: Home
---

# review-code

For skill itself see [SKILL.md](./SKILL.md).

## Meta info

It focuses on a specific set of things and their order. It's intended to be less line-nitpicking and more architecture-addressing. Named to avoid colliding with Claude Code's built-in `/code-review` but also to follow naming convetion.

## TODO

- Revise "Step 1: High-level review" to include:
  - Actual problem from ticket is solved, do we need a PR in the first place
  - Particular file sizes, separation
  - Duplications and missed re-use opportunities
  - Match with existing patterns
  - Breaking changes, externally affected parts
