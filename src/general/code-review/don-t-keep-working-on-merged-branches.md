# Don't keep working on merged branches

Once a branch has been merged into the main development line, it should be considered finalized. Stop pushing new commits to a merged branch and instead create a new branch for any subsequent work or bug fixes.

## Problem

Continuing to work on or push to a branch that has already been merged creates several issues:

- **Git History Pollution**: Merging a branch multiple times or having a branch that "lives on" after merge makes the project history difficult to follow.
- **Review Confusion**: Reviewers may lose track of what was actually approved versus what was added after the fact.
- **CI/CD Flakiness**: Pushing to a merged branch might trigger redundant or conflicting build/deployment pipelines.
- **Deployment Risks**: Changes pushed to a merged branch might be accidentally included in a release without proper re-review.

## Good solution

Delete the local and remote branch after a successful merge and create a new, appropriately named branch for any follow-up tasks.

```bash
# Good: Delete the branch and start fresh
git checkout main
git pull
git branch -d feature/user-auth
git push origin --delete feature/user-auth

# Start new work on a new branch
git checkout -b feature/refine-user-auth
```

## Bad solution

Continuing to push commits to a branch that has already been merged into `main`.

```bash
# Bad: Pushing to a stale, already merged branch
git commit -m "Small fix after merge"
git push origin feature/user-auth
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Keeps the Git history clean and scanable.
- **[Reliability](../../home/impact/positive/reliability.md)**: Prevents accidental deployment of unapproved changes.

## Exceptions

- **Emergency Rollbacks**: In very rare scenarios where a direct fix on the stale branch is the fastest way to unblock a broken pipeline, but even then, a new branch is generally safer.
