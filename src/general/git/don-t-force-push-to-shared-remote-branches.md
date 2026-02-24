# Don't force push to shared remote branches

Avoid using `git push --force` on branches that are shared with other developers to prevent disrupting their work and corrupting the project history.

## Problem

Force pushing (`--force` or `--force-with-lease`) overwrites the remote branch's history with your local history. If other developers have already pulled the branch and based their work on it, their local history will diverge from the remote. This forces them to manually rebase or hard-reset their local branches, leading to lost time, potential code loss, and significant frustration.

## Good solution

If you need to update a shared branch with changes from the main line, use `git merge` or, if the branch is not yet shared, `git rebase` locally before pushing for the first time. If you must update a branch that others might be using, communicate with the team first or use a new branch.

```bash
# Good: Pulling latest changes and merging to your feature branch
git checkout feature/42-new-api
git pull origin main
git merge main
git push origin feature/42-new-api
```

## Bad solution

Force pushing to a feature branch that multiple people are working on, or worse, to protected branches like `main` or `develop`.

```bash
# Bad: Overwriting history on a shared branch
git push --force origin feature/shared-task
```

## Why

- **[Consistency](../../home/quality-attributes/positive/consistency.md)**: Ensures the remote repository remains the single, reliable source of truth for the project history.
- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Prevents accidental code loss and reduces the risk of "broken" local environments for other team members.
- **[Fragility](../../home/quality-attributes/negative/fragility.md)**: Force pushing makes the collaboration process fragile, as a single command can break the workflow for the entire team.

## Exceptions

- When you are the **only** person working on a feature branch and you know for certain that no one else has pulled it. Even then, `--force-with-lease` is a safer alternative.
- When explicitly repairing a corrupted remote branch after team-wide coordination.

## References

- [Git Documentation: git-push --force](https://git-scm.com/docs/git-push#_description)
