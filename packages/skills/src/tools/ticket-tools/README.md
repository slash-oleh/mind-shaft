---
title: Home
---

# ticket-tools

For skill itself see [SKILL.md](./SKILL.md).

## Meta info

Provider layer for ticket operations - the counterpart to `vcs-tools` on the PR/MR side. Logical-layer skills (e.g. `file-ticket`) decide what/why; this skill decides how, against whichever tracker platform is configured.

## Adding a Platform

If a second tracker is needed (e.g. Linear), add real detection to `SKILL.md`'s Step 1 (env var, config file, whichever MCP is connected) per the `create-dispatcher-skill` pattern, and add a `platforms/<platform>/mapping.md` plus `platforms/<platform>/<command>.md` recipes alongside `platforms/jira/`. Keep the command list in `SKILL.md` unchanged. Never name a platform file `README.md` - the `build:ai` step strips those at every depth, so it would not ship.
