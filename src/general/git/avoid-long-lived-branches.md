# Avoid long-lived branches

Keep feature and bug-fix branches short-lived to minimize integration pain, reduce merge conflicts, and ensure a steady flow of verified changes into the main codebase.

## Problem

Branches that remain unmerged for weeks or months (long-lived branches) rapidly diverge from the main development line. The longer a branch lives, the higher the risk of "merge hell" - complex, multi-file conflicts that are difficult to resolve and prone to introducing regressions. Furthermore, long-lived branches delay the integration of new features, obscure the project's current state, and make code reviews overwhelmingly large and difficult to process.

## Good solution

Aim to merge branches back into the main development line as frequently as possible, ideally within a few days. Break large features into smaller, independent sub-tasks that can be implemented and merged incrementally.

**Best Practices:**

- **Merge Frequently**: Pull changes from the main branch into your feature branch daily.
- **Rebase Frequently**: Use `git rebase` to keep your feature branch history clean and aligned with the latest main branch.
- **Small PRs**: Focus each Pull Request on a single, atomic change that can be reviewed quickly.
- **Feature Toggles**: If a feature is incomplete but needs to be merged, use feature toggles to keep it hidden in production while allowing it to be integrated and tested in staging.

```bash
# Good: Keeping a branch updated with main
git checkout feature/42-short-task
git fetch origin
git rebase origin/main
# Resolve any minor conflicts early and often
```

## Bad solution

Working on a massive "feature branch" for several weeks without any integration, or creating a chain of **dependent (stacked) Pull Requests** where each builds on the previous unmerged one. This often creates a complex dependency graph of unmerged code that becomes increasingly difficult to manage and test as the chain grows.

```bash
# Bad: Integration nightmare after 3 weeks of diversion
git checkout main
git merge feature/massive-overhaul
# Result: 57 files conflicted, local build broken, team frustrated
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Frequent integration keeps the codebase healthy and reduces the risk of massive, breaking changes.
- **[Reliability](../../home/impact/positive/reliability.md)**: Small, incremental changes are easier to test, verify, and revert if something goes wrong.
- **[Nesting](../../home/impact/negative/nesting.md)**: Avoids structural "nesting" of logic in long-lived forks that becomes harder to untangle over time.

## Exceptions

- Research or "spike" branches used for experimentation that are intended to be discarded rather than merged.
- Long-term maintenance branches for legacy versions (though these should still receive security updates frequently).

## References

- [Martin Fowler: Feature Branching vs. Continuous Integration](https://martinfowler.com/articles/branching-patterns.html#feature-branching)
- [Atlassian: Branching strategies for CI/CD](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)
