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
- `feedback-loop` skill available
- `scratch` skill available

## Steps

### Step 1: Identify PR

Invoke:

```
Skill(skill: "vcs-tools", args: "identify-pr <input>")
```

Capture `pr_number` from its output, and reuse this value for the rest of this skill.

### Step 2: Gather merge blockers

Invoke:

```
Skill(skill: "gather-merge-blockers", args: "<pr_number>")
```

Capture `url`, `source_branch`, `target_branch`, `merge_state`, `ci_failures`, `reviews`, and `threads` from its output, and reuse these values for the rest of this skill instead of re-deriving them.

### Step 3: Resolve conflicts

If `merge_state` (captured in Step 2) is not `CONFLICTING`, skip this step.

Invoke:

```
Skill(skill: "resolve-conflicts", args: "<target_branch>")
```

This may force-push without Step 6's gate - intentional, since
`resolve-conflicts` is mechanical and escalates ambiguity itself. Step 6
gates only the judgment-call fixes from Steps 4-5.

Check its output `status`. If `aborted`, stop here and report to the user
that conflicts could not be resolved - do not proceed to Step 4.

### Step 4: Resolve CI failures

If `ci_failures` is empty, skip this step.

Form `ci_tasks` list:

From each item in `ci_failures`, form a single task in `perform-task`'s item shape (`{id, body}`):

- id: synthesized as `ci-<index>`
- body: "fixup mode. CI check '<name>' failed with status '<status>'. Logs: <log_file_path>".

Invoke:

```
Skill(skill: "perform-task", args: "<ci_tasks>")
```

### Step 5: Address Threads

If `threads` and `reviews` are both empty, skip this step.

Map `threads` and `reviews` (from `gather-merge-blockers`) into `fix-feedback`'s item shape (`{id, body}`), then invoke it in one call:

- Threads: `id` = `thread_id`, `body` = `location` folded in, then comments concatenated in order (`author`: `body` per comment).
- Reviews: skip entries with `state: APPROVED` or an empty `body` - not actionable feedback. For the rest: `id` = synthesized (e.g. `review-<index>`), `body` = the review's `body` (no `location` - not anchored to a file/line).

Invoke:

```
Skill(skill: "fix-feedback", args: "fixup mode. <items>")
```

### Step 6: Confirm and squash fixups

If Steps 4 and 5 made no changes and Step 3 was skipped, skip this step.

Invoke:

```
Skill(skill: "feedback-loop", args: "<target_branch>")
```

### Step 7: Push to remote

If Steps 4 and 5 made no changes and Step 3 was skipped, skip this step.

```bash
git push origin $(git branch --show-current) --force-with-lease
```

### Step 8: Post replies

For each thread and review addressed in Step 5, prepare a reply comment,
keyed by its `id` to `fix-feedback`'s output (`status`/`description` per
original input `id`):

Tone: Brief and factual. No fluff, apologies, or fillers.

- **Per `status`** (`fix-feedback`'s output; use its `description` as the source text):
  - **implemented**: Describe the fix. Example: `"Fixed. Added missing X."` (for fixes) / `"Done. Replaced X with Y."` (for improvements).
  - **declined**: Explain without confrontational words. `"Existing convention is relative imports throughout this package"`.
  - **deferred**: `"Will address in a future PR"` or `"Created <Ticket URL>"`.
  - **explained**: Provide the requested clarification.

Post all replies concurrently.

- **Threads**: write the reply body to a scratch file via `scratch`:

  ```
  Skill(skill: "scratch", args: "write pr-reply-<id> md")
  ```

  Pass the returned path as `<reply_file_path>` to `vcs-tools`:

  ```
  Skill(skill: "vcs-tools", args: "post-reply <pr_number> <thread_id> <reply_file_path>")
  ```

  `<pr_number>` comes from Step 1; `<thread_id>` comes from the `gather-merge-blockers` skill's output.

- **Reviews**: no `thread_id` to anchor to - write a payload file instead
  (`{body: "<reply text>", event: "COMMENT", comments: []}`) via `scratch`:

  ```
  Skill(skill: "scratch", args: "write pr-review-reply-<id> json")
  ```

  Pass the returned path as `<payload_file_path>` to `vcs-tools`:

  ```
  Skill(skill: "vcs-tools", args: "submit-review <pr_number> <payload_file_path>")
  ```

  `event: "COMMENT"` posts the reply as a top-level note without approving or requesting changes.

### Step 9: Update PR description

If Steps 4 and 5 made no changes, skip this step.

- Summarize the fixes and improvements applied in this iteration.
- Reflect the final state of the PR compared to the previous version.
- Do not include intermediate technical fixes (e.g., squashed fixups).

Write the description to a scratch file via `scratch`:

```
Skill(skill: "scratch", args: "write pr-description md")
```

Pass the returned path as `<pr_description_file_path>` to `vcs-tools`:

```
Skill(skill: "vcs-tools", args: "update-pr-description <pr_number> <pr_description_file_path>")
```

## Output

PR URL: `url` (captured in Step 2).
Summary: Short report of what was implemented (from Step 9's PR description)
