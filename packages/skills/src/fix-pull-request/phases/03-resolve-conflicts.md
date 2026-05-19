# Phase 3: Resolve Merge Conflicts

## Goal

The branch has no merge conflicts with the target branch (usually `main`) and is pushed.

## Skip Conditions

- `merge_state` from Phase 1 was not `CONFLICTING`.

## Steps

### Step 1: Fetch and rebase

```bash
git fetch origin main
git rebase origin/main
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

### Step 4: Push to remote

```bash
git push origin $(git branch --show-current) --force-with-lease
```

## Output

JSON format:

```jsonc
{
  "status": "string", // "resolved" or "skipped".
  "explanation": "string", // How conflicts were resolved.
}
```
