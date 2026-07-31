---
title: SKILL.md
name: resolve-conflicts
description: Rebase a local branch onto a target branch and resolve any conflicts, regenerating lockfiles where possible and escalating ambiguous cases. Use for local conflicts on any branch, or invoke from fix-pull-request.
---

# Resolve Conflicts

## Goal

- Branch is rebased onto the target branch with zero conflicts.
- Working tree is clean (no rebase left mid-conflict).

## Input

- `target_branch` (optional): branch to rebase onto. Defaults to the repository's default branch (e.g. `main`).

## Steps

### Step 1: Fetch and rebase

```bash
git fetch origin <target_branch>
git rebase origin/<target_branch>
```

### Step 2: Resolve conflicts

- For **generated files** (e.g., `uv.lock`), regenerate instead of resolving manually:

  ```bash
  git checkout --theirs uv.lock
  uv lock
  git add uv.lock
  ```

- For **other files**: Resolve trivial ones directly. Ask the user if resolution is ambiguous.

### Step 3: Continue rebase

```bash
GIT_EDITOR=true git rebase --continue
```

## Output

JSON format:

```jsonc
{
  "status": "string", // "resolved", "no_conflicts", or "aborted".
  "files_resolved": ["string"], // Paths touched to resolve conflicts.
  "explanation": "string", // How conflicts were resolved.
}
```

## Notes

- Does not push. Rewrites commit hashes on the rebased branch - callers that reference commits by hash (e.g. for fixup targeting) must re-derive them after this skill completes.
- Rebase rewrites history - confirm with the user before running this skill on a branch they didn't explicitly ask to have rebased.
