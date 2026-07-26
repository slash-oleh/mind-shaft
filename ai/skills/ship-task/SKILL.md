---
name: ship-task
description: Merge, release, verify, prepare presentational info, announce
---

# Ship Task

## Goal

- PR merged.
- Presentational info (comment text, links, screenshots) prepared.
- Ticket updated with report and status change.

## Prerequisites

- `vcs-tools` skill available (`gh` CLI for GitHub repos, `glab` CLI for GitLab repos)
- `ticket-tools` skill available

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

Comment on the ticket:

```
# ... create $TMP with the report text (see ticket-tools' Shell Markdown Bodies pattern) ...
Skill(skill: "ticket-tools", args: "comment <ticketId> $TMP")
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
