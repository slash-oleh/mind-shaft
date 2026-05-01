---
description: "General: Git: Mainly applicable to VCS in general but focusing on Git as de-facto standard."
---

- **Avoid force push to shared branches**: Force pushing to your own PRs is acceptable for history cleanup though.
- **Follow common commit message format**: Standardize commit messages. Use imperative mood and include task ID.
- **Follow established branching flow**: Follow repo Git flow and naming format. Start branches with ticket number. Use lowercase and hyphens.
- **Keep history clean**: Squash intermediate commits and rebase onto target branch before merging to maintain linear history.
- **Make atomic commits**: Ensure each commit represents a single, logical change that leaves the project in a working state.
- **Upstream dependency fixes**: Contribute 3rd-party dependency fixes to original repositories instead of maintaining local patches.
