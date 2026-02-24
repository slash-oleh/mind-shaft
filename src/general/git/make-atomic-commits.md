# Make atomic commits

## TLDR

Ensure each commit represents a single, logical change that leaves the project in a working state.

## Problem

Commits that combine multiple unrelated changes (e.g., a feature implementation, a minor bug fix in an unrelated module, and a formatting cleanup) are difficult to review, describe, and revert. Such "blob" commits obscure the project's history and make it nearly impossible to use tools like `git bisect` to identify the specific change that introduced a regression. Furthermore, commits that leave the system in a broken state disrupt the workflow for team members who might branch off or pull those intermediate commits.

## Good solution

Keep commits focused on a single task or concept. Each commit should leave the codebase in a stable, working state. If a feature is large, break it down into a series of smaller, independent, and logically complete steps.

**Atomic Commit Examples:**

- "Resolve #42: Add user authentication service" (Logic and core service)
- "Test #42: Add unit tests for user authentication" (Testing)
- "Refactor: Move UI constants to a separate file" (Cleanup)

```bash
# Good: Staging and committing only the relevant parts
git add src/auth-service.ts
git commit -m "Resolve #42: Add user authentication service"

git add src/auth-service.test.ts
git commit -m "Test #42: Add unit tests for user authentication"
```

## Bad solution

Bundling multiple unrelated changes into a single commit or committing intermediate, broken code.

```bash
# Bad: Committing everything at once with a vague message
git add .
git commit -m "Updated auth, fixed header link, and fixed some typos"
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Clear, focused commits make the project's evolution easy to follow and audit.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Smaller commits are easier to review, revert, and cherry-pick if necessary.
- **[Reliability](../../home/impact/positive/reliability.md)**: Ensuring every commit is "green" (passes tests) allows for efficient use of `git bisect` and stable development.

## Exceptions

- Local, temporary "checkpoint" commits that will be squashed or rebased before being merged into the main development line.

## References

- [Wikipedia: Atomic commit](https://en.wikipedia.org/wiki/Atomic_commit)
- [Git Documentation: git-bisect](https://git-scm.com/docs/git-bisect)
