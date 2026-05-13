# Phase 3: Resolve Merge Conflicts

Skip if `mergeable` was not `CONFLICTING`.

1. Fetch and rebase:

   ```bash
   git fetch origin main
   git rebase origin/main
   ```

2. For generated file conflicts, regenerate instead of resolving manually, for example:

   ```bash
   git checkout --theirs uv.lock
   uv lock
   git add uv.lock
   ```

3. For other conflicts: resolve trivial ones directly; ask the user when resolution is ambiguous.

4. Continue:

   ```bash
   GIT_EDITOR=true git rebase --continue
   ```

5. Push:
   ```bash
   git push origin $(git branch --show-current) --force-with-lease
   ```

## Output

Branch rebased on `main` and pushed.
