# Phase 5: Push

## Goal

Clean up commit history by autosquashing fixups and push changes to the remote branch.

## Steps

1. **Autosquash fixups**:
   Squash all fixup commits into their originating commits non-interactively:

   ```bash
   GIT_SEQUENCE_EDITOR=true git rebase --autosquash -i <PARENT-OF-EARLIEST-CHANGED-COMMIT>^
   ```

2. **Push to remote**:
   ```bash
   git push origin $(git branch --show-current) --force-with-lease
   ```

## Output

Persist to JSON:

- `last_commit_hash`: Hash of the pushed head.
