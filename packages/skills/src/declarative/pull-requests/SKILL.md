---
title: SKILL.md
name: pull-requests
description: Standing rules for pull requests - submitting, fixing, reviewing. Use when opening a PR, addressing review comments, conflicts or CI failures, or reviewing someone's PR.
---

# Pull Requests

- **Never push fixups**: autosquash before every push.
- **Ask before outward actions**: pushing (with squash if fixups exist), and posting comments or reviews. Show the drafted text first.
- **Follow project convention**: for PR title, description, and review style. Fall back to the rules below.

## Submitting

Trigger: opening a PR.

- **Provide evidence**: screenshots, recordings, or logs, when applicable.

Title:

- **Convention**: check the project's documented format, fall back to `<ticket_id>: <summary>`.
- **Short**: imperative mood, one sentence, includes the ticket ID, no boilerplate or repetition.

Description, always:

- **Intro**: 1-3 sentences on the implementation, approach, or root cause.
- **Changes**: 2-4 bullets starting with an action verb (Add X, Fix Y, Refactor Z).
- **Commits**: if several, suggest reviewing them separately. List them as `- [12abfe42](https://...) Add user auth`.

Description, when relevant:

- **Needs attention**: complex or risky logic.
- **Can be skipped**: indentation, generated files, code moved unchanged.
- **Verification**: attached screenshots, recordings, logs.
- **Related work**: other PRs and tickets, if any, not the main ticket from the title.

## Fixing

Trigger: review comments, conflicts, or CI failures on an open PR.

- **One fixup per change**: each change is its own local fixup commit, so the follow-up diff stays traceable until squashed.
- **Reply in thread**: once a comment is addressed, say what was done.
- **Doubt bot comments**: be extra skeptical of automated reviewers (CodeRabbit, Copilot). Verify before acting.
- **Rebase separately**: force-push rebases and conflict resolutions apart from actual changes.
- **Approve, then push**: show the changes and drafted replies. After approval, autosquash and force-push.
- **Refresh the description**: keep it current, and describe the net result (base..current), not the intermediate steps (prev..current).

## Reviewing

Trigger: reviewing a PR.

- **Warn first**: before starting, flag a draft PR, failing CI, conflicts, or over 300 added lines.
- **Ask before publishing**: show the review before posting it.

### First pass: high-level

Read the diff and any given context. Judge overall architecture and logic only, not details.

- **Task fit**: does the change solve the task?
- **Approach**: does it make sense architecturally?
- **Reuse**: is there missed code or pattern reuse?
- **Structure**: are there logic flaws or design issues that need structural changes?

### Second pass: lines

- **Skip automated style**: rely on formatters and linters. Comment on style only when no tool covers it.
- **Boy Scout Rule**: code must be left no worse than found. Flag "fix it later" shortcuts.
- **Group repeats**: explain the first occurrence in detail, link to it from the others.
- **Link guidelines**: point to project guidelines and docs instead of explaining them.
