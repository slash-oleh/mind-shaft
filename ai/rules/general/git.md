---
description: "General: Git: Mainly applicable to VCS in general but focusing on Git as de-facto standard."
---

- **Atomic commits**: Always ensure each commit represents single logical change. Avoid bundling unrelated changes or intermediate changes leaving build in broken state. Good: `Commit 1: "Add auth backend", Commit 2: "Add auth frontend"`. Bad: `Commit 1: "Add auth frontend, fix FAQ typos", Commit 2: "Add auth backend so frontend works"`.
- **Branch naming**: Always follow repo Git flow and naming format. Avoid non-standard branch names. Good: `42-add-alerts-feature`. Bad: `fix_bug_42`.
- **Clean history**: Always squash intermediate commits and rebase before merging. Avoid cluttered history or merge noise. Good: `Commit 1: "#42: Add alerts"; Commit 2: "Merge main"; Commit 3: "fix alert position"`. Bad: `Commit 1: "#42: Add alerts" (squashed in fixup commit and rebased onto main)`.
- **Commit messages**: Always standardize commit messages. Use imperative mood, short sentences and include task ID. Good: `Resolve #42: Add user sign up`. Bad: `fixed bug`.
- **Force push**: Always use force push with caution. Avoid overwriting shared remote history, unless cleanup of own PR. Good: `git push --force wip-branch`. Bad: `git push --force main`.
