# Follow the established branching flow

## TLDR

Adhere to the established Git branching model to ensure a predictable and manageable development process.

## Problem

Inconsistent branching practices such as branching off the wrong source, merging directly into protected branches, or ignoring the staging/production flow leads to "merge hell," broken builds on shared branches, and accidental deployment of untested or incomplete code. When team members use different workflows, it becomes impossible to determine which branch represents the current stable state or where to find the latest changes.

## Good solution

Understand and strictly follow the project's documented branching model. Whether the project uses a simple "master + Tags" flow or a more complex GitFlow, always ensure you branch from the correct base and merge back through the appropriate pull request channels. If you are unsure about the current flow, consult the project's README or ask the team before creating a new branch.

```bash
# Example: Following a 'master + develop' flow
git checkout develop
git pull origin develop
git checkout -b 42-add-feature
# ... work ...
# Merge back to develop via PR, never directly to master
```

## Bad solution

Ignoring the established flow in favor of personal preference or "shortcutting" the process by merging into branches that should remain protected.

```bash
# Bad: Merging directly to master in a project that uses a develop branch
git checkout master
git merge feature/42
git push origin master
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: A uniform workflow makes the development lifecycle predictable for everyone on the team.
- **[Reliability](../../home/impact/positive/reliability.md)**: Predictable merging patterns reduce the chance of introducing regressions or deploying unfinished code to production.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Automated CI/CD pipelines are built around specific branching structures; deviating from them can break the deployment process.

## Exceptions

- None. If the current branching flow is inefficient, propose a team-wide change instead of deviating individually.

## References

- [Atlassian: Git branching workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)
