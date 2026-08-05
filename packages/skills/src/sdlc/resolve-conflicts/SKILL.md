---
title: SKILL.md
name: resolve-conflicts
description: Rebase a local branch onto a target branch and resolve any conflicts, regenerating lockfiles where possible and escalating ambiguous cases. Use for local conflicts on any branch, or invoke from fix-pull-request.
---

# Resolve Conflicts

## Goal

- Branch is rebased onto the target branch with zero conflicts.
- Working tree is clean (no rebase left mid-conflict).

## Prerequisites

- `git` CLI installed

## Input

- `target_branch` (optional): branch to rebase onto. If omitted, resolve it
  from the project's documented convention (e.g. the "Base branch" fact in
  its `AGENTS.md`), falling back to `main` if undocumented.

## Steps

### Step 1: Fetch and rebase

```bash
git fetch origin <target_branch>
git rebase origin/<target_branch>
```

### Step 2: List conflicting files

```bash
git diff --name-only --diff-filter=U
```

Triage each file from this list in Step 3, recording each resolved path for
the Output's `files_resolved`.

### Step 3: Resolve conflicts

- For **generated files** (e.g., `uv.lock`), regenerate instead of resolving manually:

  ```bash
  git checkout --theirs uv.lock
  uv lock
  git add uv.lock
  ```

- For **other files**: Resolve trivial ones directly, then stage each:

  ```bash
  git add <file>
  ```

  If resolution is ambiguous, stop and ask the user how to proceed. If asking
  the user is not possible (e.g. no interactive access in the current
  context), abort instead:

  ```bash
  git rebase --abort
  ```

### Step 4: Continue rebase

```bash
GIT_EDITOR=true git rebase --continue
```

### Step 5: Push

If the rebase was not aborted, force-push the rebased branch:

```bash
git push origin $(git branch --show-current) --force-with-lease
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

- Rewrites commit hashes on the rebased branch - callers that reference commits by hash (e.g. for fixup targeting) must re-derive them after this skill completes.
