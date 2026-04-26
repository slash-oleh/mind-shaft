---
description: "General: Git"
---

- **Avoid long-lived branches**: Keep feature and bug-fix branches short-lived by merging small, incremental changes back into the main development line as frequently as possible.
- **Contribute back to Open Source dependencies**: Contribute fixes and improvements back to the original repositories of open-source libraries instead of maintaining local patches.
- **Create consistent pull requests**: Use a standardized format for Pull Request (PR) titles and descriptions, following the imperative mood and including associated ticket numbers.
- **Create meaningful and consistent branch names**: Use a standardized naming convention for Git branches to ensure they are easily identifiable and linked to project tasks.
- **Don't force push to shared remote branches**: Avoid using `git push --force` on branches that are shared with other developers.
- **Don't overcomplicate branching flow**: Start with the simplest branching model that meets the project's needs and evolve as complexity increases.
- **Follow the established branching flow**: Adhere to the established Git branching model to ensure a predictable and manageable development process.
- **Make atomic commits**: Ensure each commit represents a single, logical change that leaves the project in a working state.
- **Prefer squash and rebase for a clean history**: Squash intermediate commits and rebase feature branches before merging to maintain a clean and linear Git history.
- **Use pull requests for all changes to main branches**: Use Pull Requests (PRs) or Merge Requests to integrate all changes into main branches, even when working alone.
- **Use rebase instead of merge for git pull**: Rebase local changes on top of the remote branch when pulling updates to maintain a clean, linear history.
- **Use semantic versioning**: Adhere to the Semantic Versioning (SemVer) specification for all project releases and shared packages to ensure compatibility.
- **Write meaningful and consistent commit messages**: Follow a standardized, imperative format for Git commit messages to ensure a readable and searchable project history.
