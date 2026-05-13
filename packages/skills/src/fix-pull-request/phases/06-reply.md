# Phase 8: Reply

Reply in every acted-on thread.

## Tone

Be brief and factual. State what changed, not why it was right. Match the tone of a code review - no fluff, apologies, fillers.

## Reply Examples

- **Fixed**: `"Fixed. Added missing X."` (for fixes) / `"Done. Replaced X with Y."` (for improvements)
- **Declined**: `"Existing convention is relative imports throughout this package"`
- **Deferred**: `"Will address in a future PR"` / `"Added TODO at <file>:<line>"` / `"Created <Ticket URL>"`

## Post a Reply

```bash
bash "$SKILL_DIR/scripts/post-reply.sh" <PR_NUMBER> <COMMENT_ID> "<reply>" "<summary>"
```

## Output

Run the script for each acted-on thread. Paste all output blocks combined as the response.

For each thread, in "summary" put a few words indicating thread topic.

Format per thread:

```markdown
Thread **"<summary>"** by _@author_
├── _@author_: last-but-one comment (first line, max 80 chars)
├── _@author_: last comment (first line, max 80 chars)
└── _me_: **<reply>**
```

At most 2 prior comments shown per thread. Every acted-on thread must appear.
