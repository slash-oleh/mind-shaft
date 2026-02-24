# Create meaningful and consistent branch names

## TLDR

Use a standardized naming convention for Git branches to ensure they are easily identifiable, searchable, and logically linked to project tasks.

## Problem

Inconsistent or vague branch names (e.g., `fix-bug`, `test-123`, `updates`) make it difficult for team members to understand the context of a change without deep investigation. This lack of structure hinders automation (like CI/CD triggers based on branch patterns), complicates repository cleanup, and makes it hard to trace code changes back to their original requirements or bug reports.

## Good solution

Follow a strict lowercase pattern starting with a ticket number, using hyphens as separators, and keeping the description concise (1-3 words).

```regexp
\d+(-[a-z0-9]+)+
```

**Naming Rules:**

- **Ticket Prefix**: Always start with the ticket number (e.g., `42-fix-bug`).
- **Hyphens Only**: Use `-` instead of `_` or spaces.
- **Lowercase**: Use only lowercase letters and numbers.
- **No Special Characters**: Avoid punctuation like commas or periods.
- **Concise**: Stick to 1-5 descriptive words.
- **No Type Prefixes**: Avoid `feature/` or `bugfix/` unless explicitly required by your workflow (e.g., `bug/42-fix-bug` is discouraged).

In most cases it can be simply named after ticket title, prefixed with a verb. If it's a single-commit branch, commit message can be also used.

```bash
# Good examples:
git checkout -b 101-user-auth
git checkout -b 404-fix-header-link
```

## Bad solution

Using mixed case, underscores, special characters, type prefixes, or omitting the ticket number entirely.

```bash
# Bad examples:
git checkout -b fix_bug_42
git checkout -b 101-Fix-UserAuth-!
git checkout -b feature/new-login-flow
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: A uniform naming scheme makes the repository history predictable and easier to navigate.
- **[Readability](../../home/impact/positive/readability.md)**: Developers can immediately identify the purpose of a branch and its associated task.

## Exceptions

- Very short-lived local experimentation branches that will never be pushed to a remote repository.
- System branches like `main`, `master`, `develop`, or `staging`.

## References

- [Atlassian: Git branch naming conventions](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Wikipedia: Branching (version control)](https://en.wikipedia.org/wiki/Branching_%28version_control%29)
