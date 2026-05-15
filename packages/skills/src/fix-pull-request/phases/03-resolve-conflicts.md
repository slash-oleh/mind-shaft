# Phase 3: Resolve Merge Conflicts

## Goal

The branch has no merge conflicts with target branch (usually `main`) and pushed.

## Steps

1. **Skip** this phase if `mergeable` from Phase 1 was not `CONFLICTING`.

2. **Fetch and rebase**:

   ```bash
   git fetch origin main
   git rebase origin/main
   ```

3. **Resolve conflicts**:
   - For **generated files** (e.g., `uv.lock`), regenerate instead of resolving manually:
     ```bash
     git checkout --theirs uv.lock
     uv lock
     git add uv.lock
     ```
   - For **other files**: Resolve trivial ones directly. Ask the user if resolution is ambiguous.

4. **Continue rebase**:

   ```bash
   GIT_EDITOR=true git rebase --continue
   ```

5. **Push to remote**:
   ```bash
   git push origin $(git branch --show-current) --force-with-lease
   ```

## Output

Persist to JSON:

- `status`: `resolved` or `skipped`.
- `explanation`: how conflicts were resolved.
