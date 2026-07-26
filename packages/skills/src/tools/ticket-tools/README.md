---
title: Home
---

# ticket-tools

For skill itself see [SKILL.md](./SKILL.md).

## Meta info

Provider layer for ticket operations - the counterpart to `vcs-tools` on the PR/MR side. Logical-layer skills (e.g. `create-ticket`) decide what/why; this skill decides how, against whichever tracker backend is configured.

## Adding a Backend

If a second tracker is needed (e.g. Linear), add real detection to `SKILL.md`'s Step 1 (env var, config file, whichever MCP is connected) per the `create-dispatcher-skill` pattern, and add `scripts/<backend>/<command>.md` recipes alongside `scripts/jira/`. Keep the command list in `SKILL.md` unchanged.
