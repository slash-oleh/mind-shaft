# Phase 2: Analyze

Diagnose all items from Phase 1 one by one and produce a concrete action item list.

Process:

1. Analyze and verify
2. Classify by severity
3. Reach conclusion
4. Output as action item

Severities:

- Major
- Medium
- Minor

Conclusions:

- Fix
- Defer
- Decline
- Explain

## Priority Order

Process input items from Phase 1 in this order:

1. Merge conflicts
2. CI failures
3. Comments

Resulting action items should be ordered by severity (major first), but merge conflicts always come first.

## CI failures

1. Identify root cause from logs.
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

## Comments

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

## Deferred Items

Defer explicitly via one of:

- If explicitly asked, create a task tracker ticket
- If the change is a part of a known future work, note "Will address in a future PR"
- Otherwise, add a `TODO` comment at the relevant code location

## Output

A prioritized action item list. Each item specifies:

- What: Severity + Conclusion (for example "Major fix")
- Where: File and location
- Why: CI run ID / thread or comment ID / conflict
