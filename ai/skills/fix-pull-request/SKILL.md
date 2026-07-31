---
name: fix-pull-request
description: Address pull request review comments, conflicts, and CI failures. Use when a PR needs unblocking.
---

# Unblock Pull Request

## Goal

- CI failures fixed.
- Conflicts resolved.
- Comment suggestions addressed (fixed/replied).
- Remote branch is up-to-date.
- PR description is up-to-date.

## Prerequisites

- `vcs-tools` skill available (`gh` CLI for GitHub repos, `glab` CLI for GitLab repos)
- `gather-merge-blockers` skill available
- `resolve-conflicts` skill available

## Steps

### Step 1: Gather merge blockers

Invoke the `gather-merge-blockers` skill:

```
Skill(skill: "gather-merge-blockers")
```

Treat `gather-merge-blockers` as a single unit - do not read or invoke its internal files directly.

Capture `source_branch` and `target_branch` from its output - reuse these values for the rest of this skill, do not re-derive them.

### Step 2: Resolve conflicts

If `merge_state` from is not `CONFLICTING`, skip this step.

Invoke the `resolve-conflicts` skill:

```
Skill(skill: "resolve-conflicts", args: "<target_branch>")
```

Treat `resolve-conflicts` as a single unit - do not read or invoke its internal files directly.

### Step 3: Resolve CI failures

For each item in `ci_failures`:

1. Invoke the `/investigate` skill:

```
Skill(skill: "investigate", args: "<name>", "<status>", "<logs>")
```

Treat `investigate` as a single unit - do not read or invoke its internal files directly.

2. Invoke the `/plan-implementation` skill:

```
Skill(skill: "plan-implementation", args: "fixup mode", "<investigate-report>")
```

Treat `plan-implementation` as a single unit - do not read or invoke its internal files directly.

3. Invoke the `/implement` skill:

```
Skill(skill: "implement", args: "fixup mode", "<plan-implementation-report>")
```

Treat `implement` as a single unit - do not read or invoke its internal files directly.

### Step 4: Address Threads

1. Invoke the `/process-feedback` skill:

```
Skill(skill: "process-feedback", args: "<threads>", "<reviews>")
```

Treat `process-feedback` as a single unit - do not read or invoke its internal files directly.

Where `<threads>` and `<reviews>` come from `gather-merge-blockers`.

2. Invoke the `/plan-implementation` skill:

```
Skill(skill: "plan-implementation", args: "<process-feedback-report>")
```

Treat `plan-implementation` as a single unit - do not read or invoke its internal files directly.

3. Invoke the `/implement` skill:

```
Skill(skill: "implement", args: "fixup mode", "<plan-implementation-report>")
```

Treat `implement` as a single unit - do not read or invoke its internal files directly.

4. Prepare thread replies

For each thread from `gather-merge-blockers` addressed in `process-feedback`, draft a reply comment:

Tone: Brief and factual. No fluff, apologies, or fillers.

- **Per conclusion**:
  - **Fixed**: Describe the `implement` result. Example: `"Fixed. Added missing X."` (for fixes) / `"Done. Replaced X with Y."` (for improvements).
  - **Declined**: Explain without confrontational words. `"Existing convention is relative imports throughout this package"`.
  - **Deferred**: `"Will address in a future PR"` or `"Created <Ticket URL>"`
  - **Explain**: Provide the requested clarification.

### Step 5: Confirmation gate

Ask human for proceed confirmation (yes) or adjustments (free text).

### Step 6: Autosquash fixups

Squash all fixup commits into their originating commits non-interactively, using `target_branch` captured in Step 1:

```bash
GIT_SEQUENCE_EDITOR=true git rebase --autosquash -i $(git merge-base HEAD "$target_branch")
```

### Step 7: Push to remote

```bash
git push origin $(git branch --show-current) --force-with-lease
```

### Step 8: Post replies

Post thread replies receieved from `process-feedback`. Post concurrently in batches.

Use the **Shell Markdown Bodies** pattern from the `vcs-tools` skill's `SKILL.md`:

```
Skill(skill: "vcs-tools", args: "post-reply <pr_number> <comment_id> $TMP <summary>")
```

Treat `vcs-tools` as a single unit - do not read or invoke its internal files directly.

Where `<pr_number>`, `<thread_id>`, and `<summary>` (the corresponding thread `summary`) come from the `gather-merge-blockers` skill's output

### Step 9: Update PR description

- Summarize the fixes and improvements applied in this iteration.
- Reflect the final state of the PR compared to the previous version.
- Do not include intermediate technical fixes (e.g., squashed fixups).

Use the **Shell Markdown Bodies** pattern from the `vcs-tools` skill's `SKILL.md`:

```
Skill(skill: "vcs-tools", args: "update-pr-description <pr_number> $TMP")
```

Treat `vcs-tools` as a single unit - do not read or invoke its internal files directly.
