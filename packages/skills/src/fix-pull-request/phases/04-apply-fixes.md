# Phase 4: Apply Fixes

## Goal

Apply and verify the action items from Phase 2 in order. Create individual fixup commits for each action item.

## Steps

If anything appears unclear, in particular due to conflict resolving during Phase 3, go back to Phase 2.

1. **Apply action items** from Phase 2 in order:
   - Apply code corrections using `Edit`.
   - For deferred items: add `TODO` comments or create tickets as decided.

2. **Verify changes**:
   Run pre-commit hooks on modified files and fix any introduced errors.

   ```bash
   pre-commit run --files <MODIFIED_FILES>
   ```

3. **Create fixup commits**:
   After each action item is applied and verified, stage relevant files and create a fixup commit targeting the originating commit.

   ```bash
   git add <files>
   git commit --fixup <HASH>
   ```

   Identify originating commits using:

   ```bash
   git log --oneline <file>
   ```

   One fixup commit per action item. Do not bundle unrelated fixes into the same fixup.

## Output

Persist to JSON:

- `ci_fixes`: List of addressed CI failures.
- `comment_fixes`: List of addressed comment threads.
- `deferred_items`: List of TODOs, tickets, or future work notes.
- `files_modified`: List of files with change rationale.
