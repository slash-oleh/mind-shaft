---
name: vcs
description: Load before running `git checkout -b`, `git commit`, `git commit --amend`, `git rebase`, or `git push`, including one-line commits. Project branch names, commit message format, branching base and rebase rules differ from git defaults.
---

# VCS

- **Follow project convention**: branch naming, base branch, commit messages. Fall back to `main` and short imperative messages.
- **Cohesive commits**: one logical change each, nothing obviously broken in between.

## Branching

- **Branch from remote base**: fetch, then branch off `origin/<base>`. Never move the local base ref, another worktree may have it checked out.
- **No tracking**: use `--no-track`, so the first `git push -u` targets the feature branch.
- **Stash dirty tree**: with a descriptive message, before switching. Leave untracked files alone.

## Conflicts

- **Rebase onto remote base**: fetch first.
- **Regenerate generated files**: lockfiles (e.g. `package-lock.json`) are regenerated, not resolved manually.
- **Ask on ambiguous**: resolve trivial conflicts directly. If asking is impossible, abort the rebase.
- **Force-push separately**: keep the follow-up diff free of unrelated base changes.

## Reorganizing commits

- **Rebuild messy history**: squash all, reapply in logical order.
- **Split big commits**: into smaller cohesive ones.
- **Squash non-cohesive commits**: merge ones meaningless alone.
- **Refresh hashes**: rebases change them.
