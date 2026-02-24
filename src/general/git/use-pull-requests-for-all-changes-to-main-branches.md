# Use pull requests for all changes to main branches

## TLDR

Always use Pull Requests (PRs) or Merge Requests to integrate changes into main branches (e.g., `main`, `master`, `develop`), even when working alone.

## Problem

Pushing directly to main branches removes the opportunity for code review and often bypasses automated CI checks that are triggered by Pull Request events. This practice makes it easier to accidentally introduce breaking changes, "broken" builds, or architectural inconsistencies into the stable line of the project. For teams, direct pushes can lead to unexpected merge conflicts for others. For solo developers, it eliminates the "final check" phase and can obscure the history of why specific changes were made.

## Good solution

Create a dedicated branch for every task, whether it's a new feature, a bug fix, or a refactor. Once the work is complete and tested locally, push the branch to the remote repository and open a Pull Request to merge it into the main development branch.

**Workflow:**

1. Create a feature branch (e.g., `42-user-auth`).
2. Implement and test changes.
3. Push to remote and open a PR.
4. Review the diff one last time (and get team approval if applicable).
5. Merge via the PR interface.

```bash
# Good: Working in a branch even for a small fix
git checkout -b 404-fix-header-link
# ... fix typo ...
git commit -m "Fix #404: Correct typo in header navigation"
git push origin 404-fix-header-link
# Open PR on GitHub/GitLab
```

## Bad solution

Pushing directly to protected or main branches, bypassing the documentation and verification steps provided by a PR.

```bash
# Bad: Standardizing 'cowboy coding'
git checkout main
# ... work ...
git commit -m "Fixed everything"
git push origin main
```

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: PRs provide a checkpoint to ensure that only stable, tested, and reviewed code reaches the main branches.
- **[Readability](../../home/impact/positive/readability.md)**: PR titles and descriptions provide an invaluable historical record of project evolution that is more searchable than raw commit logs.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Encourages a disciplined approach to development that reduces the likelihood of introducing technical debt.

## Exceptions

- Emergency hotfixes performed in a "break-glass" scenario where the standard PR flow is physically blocked or too slow to prevent critical data loss (very rare).

## References

- [GitHub: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [Atlassian: Pull requests](https://www.atlassian.com/git/tutorials/making-a-pull-request)
