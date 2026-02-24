# Use `rebase` instead of `merge` for `git pull`

## TLDR

Prefer rebasing your local changes on top of the remote branch when pulling updates to maintain a clean, linear, and easily readable project history.

## Problem

By default, `git pull` often performs a merge when your local branch and the remote branch have diverged. This creates an unnecessary "merge commit" that merely links the two histories without adding any logical value. These repetitive merge commits (e.g., "Merge branch 'main' of ...") clutter the Git log, making it difficult for developers to trace the actual feature progression and complicates debugging or auditing.

## Good solution

Use the `--rebase` flag when pulling to take your local, unpushed commits and "re-apply" them on top of the latest changes from the remote server. This results in a straight, linear history without merge noise.

**Recommended Workflow:**

```bash
# Good: Rebase local changes on top of remote
git pull --rebase origin main
```

**Pro-tip: Set rebase as default**
You can configure Git to always use rebase for pulls globally:

```bash
git config --global pull.rebase true
```

## Bad solution

Using the default merge behavior for pulls, leading to a fragmented history filled with automated merge commits.

```bash
# Bad: Creating merge commits for simple updates
git pull
# Resulting log: "Merge branch 'main' of github.com:org/repo"
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: A linear history is significantly easier to audit and follow than one filled with merge noise.
- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures the entire team maintains a uniform standard for how local and remote histories are integrated.

## Exceptions

- When you have a complex local branching structure that you explicitly intended to preserve (very rare in standard feature-branch workflows).

## References

- [Git: git-pull --rebase Documentation](https://git-scm.com/docs/git-pull#_options)
- [Coderwall: Rebase by default when doing git pull](https://coderwall.com/p/tnoiug/rebase-by-default-when-doing-git-pull)
