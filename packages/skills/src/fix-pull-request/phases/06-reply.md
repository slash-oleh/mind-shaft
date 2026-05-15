# Phase 6: Reply

## Goal

Post replies to all processed review threads.

## Steps

1. **Draft replies** for every thread addressed in Phase 4:
   - **Tone**: Brief and factual. No fluff, apologies, or fillers.
   - **Examples**: Per-type style:
     - **Fixed**: `"Fixed. Added missing X."` (for fixes) / `"Done. Replaced X with Y."` (for improvements).
     - **Declined**: Explain without confrontational words. `"Existing convention is relative imports throughout this package"`.
     - **Deferred**: `"Will address in a future PR"` or `"Created <Ticket URL>"`
     - **Explain**: Provide the requested clarification.

2. **Post replies**:
   Use the **Shell Markdown Bodies** pattern from `SKILL.md`:
   ```bash
   # ... create $TMP with reply ...
   bash "$SKILL_DIR/scripts/post-reply.sh" <PR_NUMBER> <COMMENT_ID> "$TMP" "<summary>"
   ```
   Repeat for each thread.

## Output

Persist to JSON:

- `replies_posted`: List of threads replied to.
  - `thread_id`: ID of the thread.
  - `summary`: Short topic summary.
  - `reply`: The posted text.
  - `author`: Original comment author.
