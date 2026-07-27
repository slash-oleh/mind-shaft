---
title: SKILL.md
name: fix-pull-request
description: Address pull request review comments, conflicts, and CI failures. Use when a PR needs unblocking.
---

# Fix Pull Request

## Goal

- CI failures fixed.
- Conflicts resolved.
- Comment suggestions addressed (fixed/replied).
- Remote branch is up-to-date.
- PR description is up-to-date.

## Prerequisites

- `vcs-tools` skill available (`gh` CLI for GitHub repos, `glab` CLI for GitLab repos)
- `resolve-conflicts` skill available

## Phases

1. [Gather Info](phases/01-gather-info.md)
2. [Analyze](phases/02-analyze.md)
3. [Apply Fixes](phases/03-apply-fixes.md)
4. [Publish](phases/04-publish.md) (APPROVAL REQUIRED)
5. [Update Description](phases/05-update-description.md)

## Execution

Follow the **Skill Execution Protocol** (see below).

---

{{PROTOCOL_INJECTED}}
