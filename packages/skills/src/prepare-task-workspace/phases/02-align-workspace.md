# Phase 2: Align Workspace

## Goal

Ensure dirty state is stashed and update local repository to latest main.

## Steps

### Step 1: Stash Local Changes

Stash staged or unstaged changes if dirty (ignore untracked files). Use a descriptive message:

```bash
git stash push -m "WIP: before switching to <ticket_id>"
```

### Step 2: Update Main Branch

Fetch origin and pull latest main:

```bash
git fetch origin
git checkout main
git pull origin main
```

## Output

JSON format:

```jsonc
{
  "stashed": "boolean", // True if changes stashed.
}
```
