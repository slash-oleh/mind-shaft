---
title: SKILL.md
name: fix-pull-request
description: Address pull request review comments, conflicts, and CI failures. Use when a PR needs unblocking.
---

# Unblock Pull Request

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
- `investigate` skill available
- `plan-implementation` skill available
- `implement` skill available
- `process-feedback` skill available
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

Capture `url`, `source_branch`, and `target_branch` from its output, and reuse these values for the rest of this skill instead of re-deriving them.

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

For each item in `ci_failures`:

1. Invoke the `investigate` skill with a single composed report blob (its Input is freeform, not positional args):

```
Skill(skill: "investigate", args: "CI check '<name>' failed with status '<status>'. Logs: <log_file_path>")
```

Treat `investigate` as a single unit - do not read or invoke its internal files directly.

2. Invoke the `plan-implementation` skill:

```
Skill(skill: "plan-implementation", args: "fixup mode. <investigate-report>")
```

Treat `plan-implementation` as a single unit - do not read or invoke its internal files directly.

3. Invoke the `implement` skill:

```
Skill(skill: "implement", args: "fixup mode. <plan-implementation-report>")
```

Treat `implement` as a single unit - do not read or invoke its internal files directly.

### Step 5: Address Threads

1. Map `threads` and `reviews` (from `gather-merge-blockers`) into `process-feedback`'s generic item shape, then invoke it:

- Threads: `id` = `thread_id`, `body` = `location` folded in, then comments concatenated in order (`author`: `body` per comment).
- Reviews: `id` = synthesized (e.g. `review-<index>`), `body` = the review's `body` (no `location` - not anchored to a file/line).

```
Skill(skill: "process-feedback", args: "<items>")
```

Treat `process-feedback` as a single unit - do not read or invoke its internal files directly.

2. Invoke the `plan-implementation` skill:

```
Skill(skill: "plan-implementation", args: "fixup mode. <process-feedback-report>")
```

Treat `plan-implementation` as a single unit - do not read or invoke its internal files directly.

3. Invoke the `implement` skill:

```
Skill(skill: "implement", args: "fixup mode. <plan-implementation-report>")
```

Treat `implement` as a single unit - do not read or invoke its internal files directly.

### Step 6: Confirmation gate

Ask human for proceed confirmation on the fixes applied in Steps 4 and 5 (yes) or adjustments (free text).

On adjustments, the human either makes the change manually or asks for a
followup fix. Either way, amend the result into the existing relevant fixup
commit from Step 4/5 - unless the human asks for a new/separate commit
instead. Re-ask for confirmation after.

Assess the followup's size first. If small (fits the existing fixup as an
amend), do that. If it's big enough to need its own plan (new scope, touches
areas outside the existing fixup), say so and propose running a separate
`plan-implementation` + `implement` cycle for it.

### Step 7: Autosquash fixups

Squash all fixup commits into their originating commits non-interactively, using `target_branch` captured in Step 2:

```bash
GIT_SEQUENCE_EDITOR=true git rebase --autosquash -i $(git merge-base HEAD "<target_branch>")
```

### Step 8: Push to remote

```bash
git push origin $(git branch --show-current) --force-with-lease
```

### Step 9: Post replies

For each thread from `gather-merge-blockers` addressed in `process-feedback`, prepare a reply comment:

Tone: Brief and factual. No fluff, apologies, or fillers.

- **Per `resolution`** (`process-feedback`'s output):
  - **Implement**: Describe the `implement` result. Example: `"Fixed. Added missing X."` (for fixes) / `"Done. Replaced X with Y."` (for improvements).
  - **Decline**: Explain without confrontational words. `"Existing convention is relative imports throughout this package"`.
  - **Defer**: `"Will address in a future PR"` or `"Created <Ticket URL>"`
  - **Explain**: Provide the requested clarification.

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
