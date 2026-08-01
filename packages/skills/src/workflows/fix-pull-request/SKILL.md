---
title: SKILL.md
name: fix-pull-request
description: Address pull request review comments, conflicts, and CI failures. Use when a PR needs unblocking.
---

# Fix Pull Request

## Goal

- CI failures addressed.
- Conflicts resolved.
- Comment suggestions addressed (fixed/replied).
- Branch published.
- PR description updated (if needed).

## Input

- PR identifier (optional): PR number, PR URL, or ticket ID. Passed through to `vcs-tools`' `identify-pr` command; falls back to the current branch's open PR if omitted.

## Prerequisites

- `vcs-tools` skill available (`gh` CLI for GitHub repos, `glab` CLI for GitLab repos)
- `gather-merge-blockers` skill available
- `resolve-conflicts` skill available
- `perform-task` skill available
- `fix-feedback` skill available
- `scratch` skill available

## Steps

### Step 1: Identify PR

Invoke the `vcs-tools` skill:

```
Skill(skill: "vcs-tools", args: "identify-pr <input>")
```

Treat `vcs-tools` as a single unit - do not read or invoke its internal files directly.

Capture `pr_number` from its output, and reuse this value for the rest of this skill.

### Step 2: Gather merge blockers

Invoke the `gather-merge-blockers` skill:

```
Skill(skill: "gather-merge-blockers", args: "<pr_number>")
```

Treat `gather-merge-blockers` as a single unit - do not read or invoke its internal files directly.

Capture `url`, `source_branch`, `target_branch`, `merge_state`, `ci_failures`, `reviews`, and `threads` from its output, and reuse these values for the rest of this skill instead of re-deriving them.

### Step 3: Resolve conflicts

If `merge_state` (captured in Step 2) is not `CONFLICTING`, skip this step.

Invoke the `resolve-conflicts` skill:

```
Skill(skill: "resolve-conflicts", args: "<target_branch>")
```

Treat `resolve-conflicts` as a single unit - do not read or invoke its internal files directly.

This may force-push without Step 6's gate - intentional, since
`resolve-conflicts` is mechanical and escalates ambiguity itself. Step 6
gates only the judgment-call fixes from Steps 4-5.

### Step 4: Resolve CI failures

If `ci_failures` is empty, skip this step.

1. From each item in `ci_failures`, form a single task: "fixup mode. CI check '<name>' failed with status '<status>'. Logs: <log_file_path>".

2. Consolidate them into ordered list with IDs.

3. Invoke `perform-task` with this tasks list and PR commits:

```
Skill(skill: "perform-task", args: "<ci_fix_tasks>")
```

Treat `perform-task` as a single unit - do not read or invoke its internal files directly.

### Step 5: Address Threads

If `threads` and `reviews` are both empty, skip this step.

Map `threads` and `reviews` (from `gather-merge-blockers`) into `fix-feedback`'s item shape (`{id, body}`), then invoke it in one call:

- Threads: `id` = `thread_id`, `body` = `location` folded in, then comments concatenated in order (`author`: `body` per comment).
- Reviews: skip entries with `state: APPROVED` or an empty `body` - not actionable feedback. For the rest: `id` = synthesized (e.g. `review-<index>`), `body` = the review's `body` (no `location` - not anchored to a file/line).

```
Skill(skill: "fix-feedback", args: "fixup mode. <items>")
```

Treat `fix-feedback` as a single unit - do not read or invoke its internal files directly.

### Step 6: Confirmation gate

Ask human for proceed confirmation on the fixes applied in Steps 4 and 5 (yes) or adjustments (free text).

On adjustments, the human either makes the change manually or asks for a
followup fix. Either way, amend the result into the existing relevant fixup
commit from Step 4/5 - unless the human asks for a new/separate commit
instead. Re-ask for confirmation after.

Assess the followup's size first. If small (fits the existing fixup as an
amend), do that. If it's big enough to need its own plan (new scope, touches
areas outside the existing fixup), say so and propose running a separate
`perform-task` cycle for it.

### Step 7: Autosquash fixups

If Steps 4 and 5 made no changes and Step 3 was skipped, skip this step.

Squash all fixup commits into their originating commits non-interactively, using `target_branch` captured in Step 2:

```bash
GIT_SEQUENCE_EDITOR=true git rebase --autosquash -i $(git merge-base HEAD "<target_branch>")
```

### Step 8: Push to remote

If Steps 4 and 5 made no changes and Step 3 was skipped, skip this step.

```bash
git push origin $(git branch --show-current) --force-with-lease
```

### Step 9: Post replies

For each thread from `gather-merge-blockers` addressed in Step 5, prepare a reply comment, keyed by thread `id` to `fix-feedback`'s output (`status`/`description` per original input `id`):

Tone: Brief and factual. No fluff, apologies, or fillers.

- **Per `status`** (`fix-feedback`'s output; use its `description` as the source text):
  - **implemented**: Describe the fix. Example: `"Fixed. Added missing X."` (for fixes) / `"Done. Replaced X with Y."` (for improvements).
  - **declined**: Explain without confrontational words. `"Existing convention is relative imports throughout this package"`.
  - **deferred**: `"Will address in a future PR"` or `"Created <Ticket URL>"`.
  - **explained**: Provide the requested clarification.

Post concurrently in batches.

Write each reply body to a scratch file via `scratch`:

```
Skill(skill: "scratch", args: "write pr-reply-<id> md")
```

Treat `scratch` as a single unit - do not read or invoke its internal files directly.

Pass the returned path as `<reply_file_path>` to `vcs-tools`:

```
Skill(skill: "vcs-tools", args: "post-reply <pr_number> <thread_id> <reply_file_path>")
```

Treat `vcs-tools` as a single unit - do not read or invoke its internal files directly.

`<pr_number>` comes from Step 1; `<thread_id>` comes from the `gather-merge-blockers` skill's output.

### Step 10: Update PR description

If Steps 4 and 5 made no changes, skip this step.

- Summarize the fixes and improvements applied in this iteration.
- Reflect the final state of the PR compared to the previous version.
- Do not include intermediate technical fixes (e.g., squashed fixups).

Write the description to a scratch file via `scratch`:

```
Skill(skill: "scratch", args: "write pr-description md")
```

Treat `scratch` as a single unit - do not read or invoke its internal files directly.

Pass the returned path as `<pr_description_file_path>` to `vcs-tools`:

```
Skill(skill: "vcs-tools", args: "update-pr-description <pr_number> <pr_description_file_path>")
```

Treat `vcs-tools` as a single unit - do not read or invoke its internal files directly.

## Output

`url` (captured in Step 2), then a short plain-text summary of what was fixed.
