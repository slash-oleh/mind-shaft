---
description: "General: Git"
---

# General: Git

## Avoid long-lived branches
Keep feature and bug-fix branches short-lived by merging small, incremental changes back into the main development line as frequently as possible.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/avoid-long-lived-branches.md)

## Contribute back to Open Source dependencies
Contribute fixes and improvements back to the original repositories of open-source libraries instead of maintaining local patches.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/contribute-back-to-open-source-dependencies.md)

## Create consistent pull requests
Use a standardized format for Pull Request (PR) titles and descriptions, following the imperative mood and including associated ticket numbers.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/create-consistent-pull-requests.md)

## Create meaningful and consistent branch names
Use a standardized naming convention for Git branches to ensure they are easily identifiable and linked to project tasks.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/create-meaningful-and-consistent-branch-names.md)

## Don't force push to shared remote branches
Avoid using `git push --force` on branches that are shared with other developers.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/don-t-force-push-to-shared-remote-branches.md)

## Don't overcomplicate branching flow
Start with the simplest branching model that meets the project's needs and evolve as complexity increases.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/don-t-overcomplicate-branching-flow.md)

## Follow the established branching flow
Adhere to the established Git branching model to ensure a predictable and manageable development process.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/follow-the-established-branching-flow.md)

## Make atomic commits
Ensure each commit represents a single, logical change that leaves the project in a working state.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/make-atomic-commits.md)

## Prefer squash and rebase for a clean history
Squash intermediate commits and rebase feature branches before merging to maintain a clean and linear Git history.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/prefer-squash-and-rebase-for-a-clean-history.md)

## Use pull requests for all changes to main branches
Use Pull Requests (PRs) or Merge Requests to integrate all changes into main branches, even when working alone.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/use-pull-requests-for-all-changes-to-main-branches.md)

## Use rebase instead of merge for git pull
Rebase local changes on top of the remote branch when pulling updates to maintain a clean, linear history.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/use-rebase-instead-of-merge-for-git-pull.md)

## Use semantic versioning
Adhere to the Semantic Versioning (SemVer) specification for all project releases and shared packages to ensure compatibility.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/use-semantic-versioning.md)

## Write meaningful and consistent commit messages
Follow a standardized, imperative format for Git commit messages to ensure a readable and searchable project history.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/git/write-meaningful-and-consistent-commit-messages.md)
