# Phase 4: Apply Fixes

Execute the action items from Phase 2 in order. If anything is unclear, go back to Phase 2.

- Apply code corrections using Edit
- For deferred items: add the `TODO` or create the ticket decided in Phase 2

Run pre-commit hooks on modified files. Fix introduced errors before proceeding.

```bash
pre-commit run --files <MODIFIED_FILES>
```

After each action item is applied, stage the relevant files and create a fixup commit targeting the originating commit:

```bash
git add <files-for-this-item>
git commit --fixup <HASH-OF-ORIGINATING-COMMIT>
```

Identify the originating commit per file with:

```bash
git log --oneline <file>
git show --name-only <HASH>
```

One fixup commit per action item. Do not bundle unrelated fixes into the same fixup.

## Output

All code corrections applied as individual fixup commits.

1. **Conflicts resolved**: yes/no, how
2. **CI fixes**: what failed, what changed
3. **Comment fixes**: per thread, what changed and why
4. **Deferred items**: TODO / ticket / future PR
5. **Files modified**: list with one-line rationale
