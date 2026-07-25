---
title: SKILL.md
name: detect-vcs-platform
description: Detects whether the current repo's Git remote is GitHub or GitLab. Invoke as a unit (Skill tool, no args) from another skill's phase - never by running its scripts directly.
---

# Detect VCS Platform

## Prerequisites

- `gh` or `glab` CLI installed and authenticated (used as a fallback when the remote URL itself doesn't reveal the platform)

## Commands

No args needed. Run the script with `$SKILL_DIR` (this skill's own directory) and return its output verbatim.

```bash
bash "$SKILL_DIR/scripts/detect-platform.sh"
```

Prints `github` or `gitlab` based on the origin remote. Exits non-zero with an error on stderr if neither could be detected.
