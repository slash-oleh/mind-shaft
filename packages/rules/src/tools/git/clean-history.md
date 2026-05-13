# Clean history

## TLDR

Always squash intermediate commits and rebase before merging. Avoid cluttered history or merge noise. Good: `Commit 1: "#42: Add alerts"; Commit 2: "Merge main"; Commit 3: "fix alert position"`. Bad: `Commit 1: "#42: Add alerts" (squashed in fixup commit and rebased onto main)`.

## Problem

A commit history cluttered with "WIP", "typo fix" messages or repetitive merge noise (e.g., "Merge branch 'main' of ...") obscures logical progression. Non-linear history with "train tracks" makes debugging with `git bisect` difficult and automated changelog generation impossible.

## Good solution

Use interactive rebase (`git rebase -i`) to group small commits into logical units. Use `git pull --rebase` to integrate remote changes without creating unnecessary merge commits.

**Recommended Workflow:**

1. **Interactive Rebase**: Combine related commits locally.
2. **Pull with Rebase**: `git pull --rebase` to re-apply local work on top of remote updates.
3. **Linear Merge**: Rebase feature branch onto the target branch before merging.

```bash
# Good: Rebase local changes on top of remote
git pull --rebase origin main
```

## Bad solution

Merging feature branches with messy commits or relying on default `git pull` which creates merge noise.

```bash
# Bad: Cluttered log with merge commits
git pull origin main
# Results in: "Merge branch 'main' of github.com:repo"
```

Bad Commit History showing a sequence of fragmented, non-atomic commits:

> Feature logic implementation
>
> Fix typo in logic
>
> Add tests for the new logic
>
> Merge branch 'main' into feature/42
>
> Final fix for the service

## Impact

- **Readability**: Linear history with meaningful commits is easy to audit.
- **Maintainability**: Simplifies reverts and `git bisect`.
- **Consistency**: Standardizes version control history across the team.

## Exceptions

- Large features that deserve multiple high-quality commits for distinct sub-milestones.

## References

- [Atlassian: Merging vs. Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
- [GitHub: About merge methods](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github)
