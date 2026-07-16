# Phase 4: Apply Fixes

## Goal

- All resolved action items are individually implemented.
- Quality tools checks pass.
- All changes committed as separate git fixup commits.

## Steps

If anything appears unclear, in particular due to conflict resolving during Phase 3, go back to Phase 2.

For each action item from `action_items` in Phase 2 in order:

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

- If an unpushed fixup for the same target commit already exists (e.g. iterating on a fix before push), amend it instead of creating a second fixup:

  ```bash
  git add <files>
  git commit --amend --no-edit
  ```

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

JSON format:

```jsonc
{
  "fixes": [
    {
      "action_item_id": "number", // Action item ID from Phase 2.
      "fixup_commit": "string", // Hash of the created fixup commit (if any) or null.
      "reply": "string", // Text drafted for the thread (if Comment type) or null.
    },
  ], // List of applied actions from Phase 2 with results.
}
```
