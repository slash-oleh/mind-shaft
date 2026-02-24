# Prefer squash and rebase for a clean history

Maintain a clean, linear, and readable Git history by squashing intermediate commits and rebasing feature branches before merging.

## Problem

A commit history cluttered with "WIP", "typo fix", or "re-test" messages makes it difficult for reviewers and future developers to understand the logical progression of a feature. Non-linear history with frequent merge commits creates "train tracks" in the Git log, which complicates debugging (e.g., using `git bisect`), obscures the context of changes, and makes automated changelog generation nearly impossible.

## Good solution

Use interactive rebase (`git rebase -i`) to group smaller commits into logical units before finalizing a Pull Request. Rebase your feature branch on top of the main branch to ensure a linear history upon merging.

**Recommended Workflow:**

1. **Interactive Rebase**: Combine related commits into a single, meaningful commit.
2. **Catch-up Rebase**: Pull the latest changes from the main branch and rebase your feature branch on top of them.
3. **Squash and Merge**: As a last resort, use the "Squash and Merge" option in your PR platform to ensure the entire feature is represented as a single, clean commit in the main branch history.

Good Commit Strategy:

> Resolve #42: Implement user authentication service

(Previously 5 commits: "start auth", "fix type", "add tests", "typo in test", "final auth")

## Bad solution

Merging feature branches with messy, unorganized commits directly into the main branch without any cleanup.

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

- **[Readability](../../home/impact/positive/readability.md)**: A linear history with meaningful commits is significantly easier to audit and follow.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Simplifies repository maintenance, reverts, and the use of tools like `git bisect`.
- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures the entire project follows a single, clean standard for version control history.

## Exceptions

- When a feature is so large that it truly deserves several independent, high-quality commits to represent distinct sub-milestones (though even then, they should be cleaned up and rebased).

## References

- [GitHub: About merge methods](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github)
- [Atlassian: Merging vs. Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
