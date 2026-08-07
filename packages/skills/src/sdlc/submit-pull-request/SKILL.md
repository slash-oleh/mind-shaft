---
title: SKILL.md
name: submit-pull-request
description: Push a branch and open it as a pull request, drafting its title and description from context. Use when a task is ready to present for integration.
---

# Submit Pull Request

## Goal

- Pull request is published.

## Prerequisites

- `vcs-tools` skill available
- `scratch` skill available
- `ticket-tools` skill available

## Input

- `branch` (optional): branch to merge. If omitted, resolve to the current branch
  (`git branch --show-current`).
- `target_branch` (optional): branch to merge into. If omitted, resolve it from the
  project's documented convention (e.g. the "Base branch" fact in its `AGENTS.md`),
  falling back to `main` if undocumented.
- `draft` (optional): whether to create the PR in draft status. Defaults to `false`.

## Steps

### Step 1: Resolve branches

Resolve `branch` and `target_branch` per the defaults above if not supplied as input.

### Step 2: Check for existing PR

```
Skill(skill: "vcs-tools", args: "identify-pr")
```

If one is found for `branch`, stop and ask the user how to proceed (e.g. update the
existing PR instead, or abort) - do not create a duplicate.

### Step 3: Assert size

```bash
git diff --stat <target_branch>..<branch>
```

- Verify diff does not exceed 300 added lines (ideally < 200).
- If it exceeds 300, warn user and suggest splitting the PR.

### Step 4: Push branch

```bash
git push origin <branch>
```

### Step 5: Get commits

```bash
git log --no-decorate --oneline <target_branch>..<branch>
```

Capture as `commits`.

### Step 6: Resolve Ticket ID

Infer in priority order from: input, branch name, commit messages, context.

Capture as `ticket_id`.

### Step 7: Form Description

Summarize the changes into a PR description.

Rules:

- Check the project's documented convention.
- Keep it short: no boilerplate, no fluff, no repetitions.

Core details:

- 1-3 sentence intro (explain implementation, approach, or root cause).
- 2-4 bullets starting with Action Verbs for changes (Add X, Fix Y, Refactor Z).
- If multiple commits exist, suggest reviewing commits separately with a bulleted list of commits (`- [12abfe42](https://...) Add user auth`).

Additional details (all situational):

- Mention what is worth extra attention (e.g., complex logic).
- Mention what can be skipped (e.g., indentation, generated files, code moved without actual changes).
- Verification attachments (e.g., screenshots, recordings, logs).
- Mention related PRs/tickets via IDs/URLs (e.g., PRs dependent on, PRs introducing issue fixed here).

Write the description to a scratch file via `scratch`:

```
Skill(skill: "scratch", args: "write pr-description md")
```

Capture the returned path as `<pr_description_file_path>`.

### Step 8: Resolve Title

Summarize the description into a PR title.

Rules:

- Check the project's documented convention. Fallback to `<ticket_id>: <summary>`.
- Keep it short: no boilerplate, no fluff, no repetitions.
- Imperative mood.
- Single sentence.
- Contains ticket ID.

Capture as `title`

### Step 9: Create PR

Invoke:

```
Skill(skill: "vcs-tools", args: "create-pr <title> <pr_description_file_path> <target_branch> <branch> [DRAFT_FLAG]")
```

`DRAFT_FLAG` is `--draft` if input `draft` is `true`, omitted otherwise.

### Step 10: Update Ticket Status

If `ticket_id` from Step 6 exists:

```
Skill(skill: "ticket-tools", args: "change-status <ticket_id> code-review")
```

## Output

JSON format:

```jsonc
{
  "prUrl": "string", // The URL of the created Pull Request.
}
```
