# Branch naming

## TLDR

Always follow repo Git flow and naming format. Avoid non-standard branch names. Good: `42-add-alerts-feature`. Bad: `fix_bug_42`.

## Problem

Inconsistent branching and naming lead to "merge hell" and lost context. Deviating from the established flow makes it impossible to trace changes to tasks or maintain stable deployments.

## Good solution

Strictly follow the project's Git flow and naming pattern. Branch from the correct base and use lowercase names starting with the task ID.

```regexp
\d+(-[a-z0-9]+)+
```

**Naming Rules:**

- **Ticket Prefix**: Start with ticket number (e.g., `42-fix-bug`).
- **Hyphens Only**: Use `-` instead of `_` or spaces.
- **Lowercase**: Use only lowercase letters and numbers.
- **Concise**: Stick to 1-5 descriptive words.
- **No Type Prefixes**: Avoid `feature/` or `bugfix/` unless explicitly required.

```bash
# Example: Following a 'master + develop' flow
git checkout develop
git pull origin develop
git checkout -b 42-add-feature
# Merge via PR, never directly to protected branches
```

## Bad solution

Ignoring the Git flow or using vague, non-standard branch names.

```bash
# Bad: Non-standard naming and direct merging
git checkout master
git checkout -b fix_bug_42
git merge 42-fix-bug
git push origin master
```

## Impact

- **Consistency**: Predictable workflow and naming across the team.
- **Reliability**: Stable deployment pipelines and fewer regressions.
- **Traceability**: Changes are easily linked to original tasks.

## Exceptions

- None. Propose team-wide changes if the current flow is inefficient.

## References

- [Atlassian: Git branching workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Atlassian: Git branch naming conventions](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
