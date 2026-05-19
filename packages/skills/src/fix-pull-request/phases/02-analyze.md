# Phase 2: Analyze

## Goal

- All PR checks and comments are processed
- A prioritized, categorized action item list is compiled.

## Steps

### Step 1: Prioritize input items

Classify and sort input items (`merge_state`, `ci_failures`, and `threads`) from Phase 1 by type for processing:

1. Conflicts: `merge_state` (if `CONFLICTING`)
2. CI: `ci_failures`
3. Comments: `threads`

### Step 2: Convert input items to action items

For each input item one by one, do A-D sub-steps:

#### Item sub-step A: Analyze

Verify the item is relevant and actionable.

Use analysis directions below for each type of items:

- [Analysis of CI failures](#analysis-of-ci-failures)
- [Analysis of Comments](#analysis-of-comments)

#### Item sub-step B: Classify by severity

Severities:

- Major
- Medium
- Minor

#### Item sub-step C: Reach conclusion

Conclusions:

- Fix
- Defer
- Decline
- Explain

#### Item sub-step D: Create action item

- Input item reference
- Severity
- Conclusion
- Solution
  - Fix
  - Defer
    - If explicitly asked, create a task tracker ticket
    - If the change is a part of a known future work, note "Will address in a future PR"
    - Otherwise, add a `TODO` comment at the relevant code location
  - Decline
  - Explain

### Step 3: Prioritize action items

- Merge conflicts always first.
- Rest ordered by severity (major first).
- After sorting, assign a unique artificial ID to each action item (1, 2, 3, ...).

---

## Analysis of CI failures

1. Identify root cause from `logs` in `ci_failures`.
2. If the root cause is unclear, look into CI configuration as well.
3. Translate to file and required change.

Some failures may be unrelated to PR changes but still block merging - suggest rebase in those cases.

Classification by severity with typical causes:

- Minor: lint, formatting issues
- Medium: failed tests
- Major: build, packaging, environment, versioning, infrastructure failures

Classification by conclusion with examples:

- Fix: merge-blocking failures
- Defer: informational checks, flaky tests, test environment deployments
- Decline: unrelated to PR changes failures

## Analysis of Comments

Verify against actual codebase that comment/suggestion is relevant.

Pay extra attention to bot comments: they often miss wide context and flag false positives.

Skip already-addressed issues: the problem is resolved but thread is not yet closed by author.

Classification by severity with typical reasons:

- Major: architectural changes, bugs, correctness issues
- Medium: code reuse, readability, UX
- Minor: nitpicks, code style, renaming, minor improvements

Classification by conclusion with typical reasons:

- Decline: factually incorrect, missing full context, or not worth the effort
- Defer: valid but out of scope for this PR - a separate issue or would expand the diff significantly
- Explain: only a question is asked, no code change required
- Fix: everything else

## Output

JSON format:

```jsonc
{
  "action_items": [
    {
      "id": "number", // Action item ID.
      "type": "string", // Type of input item (Conflict, CI, Comment).
      "reference": "string", // CI run ID, thread/comment ID, or conflict.
      "severity": "string", // Major, Medium, or Minor.
      "conclusion": "string", // Fix, Defer, Decline, or Explain.
      "solution": "string", // Detailed plan for the conclusion (e.g., specific code change, TODO comment text, or ticket details).
    },
  ], // List of prioritized action items.
}
```
