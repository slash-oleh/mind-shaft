# Phase 7: Push

**Only proceed after explicit user approval from Phase 6.**

## Autosquash fixups

Squash all fixup commits into their originating commits non-interactively:

```bash
GIT_SEQUENCE_EDITOR=true git rebase --autosquash -i <PARENT-OF-EARLIEST-CHANGED-COMMIT>^
```

Stash unrelated uncommitted changes before rebasing if needed:

```bash
git stash push -m "WIP: description" -- <unrelated-files>
git stash pop  # after rebase
```

## Push

```bash
git push origin $(git branch --show-current) --force-with-lease
```

## Output

Clean history pushed to the remote branch.
