---
title: SKILL.md
name: create-dispatcher-skill
description: Create a single dispatcher skill that merges backend detection and per-backend routing into one skill, instead of a detect skill plus N near-duplicate provider skills. Use when 2+ skills expose an identical command surface over different backends (platform CLI, cloud provider, package manager) and callers must pick one at runtime.
claudecode:
  context: fork
  background: false
  argument-hint: "[skill_name] [description]"
  arguments:
    - "skill_name"
    - "description"
---

# Create Dispatcher Skill

## When to apply

- N skills exist with near-identical `SKILL.md` command lists, differing only in the underlying CLI/tool they shell out to (e.g. `gh` vs `glab`).
- A separate "detect" skill exists whose only job is picking one of the N, and every caller redoes the same two-step dance: detect, then invoke the matching skill.
- Symptom: the N `SKILL.md` files are near copies of each other - duplicated command docs, violates single source of truth.

## Structure

- One skill directory, one `SKILL.md` documenting the command surface once.
- `scripts/detect.sh` - resolves which backend applies (env var, config file, remote URL, whatever signal exists). Prints the backend id, exits non-zero if undetectable.
- `scripts/<backend-a>/<command>.sh`, `scripts/<backend-b>/<command>.sh` - one script per command, per backend, same filename across backends.
- `SKILL.md` documents commands once as `<command> [...args]`. Routing: run `detect.sh` to get `<backend>`, then run `scripts/<backend>/<command>.sh`.

## Rules

- Dispatch by file path inside the skill's own `scripts/` dir. Do not invoke another skill via the Skill tool just to route - that spends a full skill load on a decision a bash check can make in milliseconds. Keeps to the skill-isolation rule: scripts stay internal to one skill dir, none reach into a sibling skill.
- Command list, argument shapes, and shared patterns (e.g. temp-file bodies) get documented exactly once, in the merged `SKILL.md` - never duplicated per backend.
- If a caller needs to force a backend (bypass detection), add an explicit override - e.g. a `--platform=<backend>` prefix on args - rather than keeping backends as separate directly-invocable skills for that reason alone.
- Detection must be cheap (local file/remote check). Re-running it per command call is fine; it should never itself be an expensive or user-facing step.

## Anti-pattern

A thin proxy skill that Skill()-invokes the still-separate per-backend skills. Adds an indirection layer without removing the doc duplication, and costs an extra full Skill-invocation round-trip for a decision that's cheap to make inline.
