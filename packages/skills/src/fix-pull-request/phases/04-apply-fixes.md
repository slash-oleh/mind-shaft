# Phase 4: Apply Fixes

## Goal

Apply and verify the action items from Phase 2 in order. Create individual fixup commits for each action item.

## Steps

If anything appears unclear, in particular due to conflict resolving during Phase 3, go back to Phase 2.

For each action item from Phase 2 in order:

### Step 1: Apply solution

- Make code changes or whatever needed to resolve the action item. For deferred action items it can be ticket creation.
- Commit as fixup commit. Identify originating commits using:
  ```bash
  git log --oneline <file>
  ```
- After each action item is applied and verified, stage relevant files and create a fixup commit targeting the originating commit:
  ```bash
  git add <files>
  git commit --fixup <HASH>
  ```
  One fixup commit per action item. Do not bundle unrelated fixes into the same fixup.

### Step 2: Verify changes

Run pre-commit hooks on modified files and fix any introduced errors.

```bash
MODIFIED_FILES=$(git status --porcelain | awk '{print $2}')
pre-commit run --files $MODIFIED_FILES
```

### Step 3: Prepare reply

Draft prepared reply for relevant thread (if input type was Comment):

- **Tone**: Brief and factual. No fluff, apologies, or fillers.
- **Examples**: Style per conclusion:
  - **Fixed**: `"Fixed. Added missing X."` (for fixes) / `"Done. Replaced X with Y."` (for improvements).
  - **Declined**: Explain without confrontational words. `"Existing convention is relative imports throughout this package"`.
  - **Deferred**: `"Will address in a future PR"` or `"Created <Ticket URL>"`
  - **Explain**: Provide the requested clarification.

## Output

Persist to JSON:

- `fixes`: List of applied actions from Phase 2 with results:
  - `action_item_id`: Action item ID from Phase 2.
  - `fixup_commit`: Hash of the created fixup commit (if any).
  - `reply`: Text drafted for the thread (if Comment type).
