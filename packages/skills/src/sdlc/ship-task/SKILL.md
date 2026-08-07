---
title: SKILL.md
name: ship-task
description: Merge an approved PR, verify the shipped result, and report it back to the ticket. Use when a task's pull request is approved and ready to ship.
claudecode:
  context: fork
  background: false
  argument-hint: ""
  arguments: []
---

# Ship Task

## Goal

- PR merged.
- Presentational info (comment text, links, screenshots) prepared.
- Ticket updated with report and status change.

## Prerequisites

- `vcs-tools` skill available
- `ticket-tools` skill available
- `scratch` skill available

## Steps

### Step 1: Resolve PR Status

- Identify PR: `Skill(skill: "vcs-tools", args: "identify-pr")`
- Fetch status: `Skill(skill: "vcs-tools", args: "get-pr-status <PR_NUMBER>")`
- Verify `reviewDecision` is `APPROVED`. If not and approval is required, ask what to do.

### Step 2: Merge PR

Skip if PR already merged.

Merge and clean up the branch:

```
Skill(skill: "vcs-tools", args: "merge-pr <pr_number>")
```

### Step 3: Generate Report

- Draft the announcement text to be posted on the ticket.
- Gather relevant deployed environment URLs, PR links, or artifact links if applicable.
- Take visual proof (screenshots) of the working feature if applicable.

### Step 4: Announce

Comment on the ticket. Write the report text to a scratch file via `scratch`:

```
Skill(skill: "scratch", args: "write ticket-comment md")
```

Pass the returned path as `<comment_file_path>` to `ticket-tools`:

```
Skill(skill: "ticket-tools", args: "comment <ticketId> <comment_file_path>")
```

Change status:

```
Skill(skill: "ticket-tools", args: "change-status <ticketId> acceptance")
```

## Output

Markdown format:

- PR: Number, merge commit.
- Report: Drafted comment text, links (PR, deploy).
- Ticket: Posted comment URL.
