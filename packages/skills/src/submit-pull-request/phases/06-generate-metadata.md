# Phase 6: Generate Metadata

## Goal

PR title and markdown description are generated.

## Steps

### Step 1: Create Title

- Template: `[ticketId]: <TITLE>` (where `ticketId` is from Phase 1, e.g., `#1234` or `PROJ-123`).
- Imperative mood.
- Aligned with branch name.

### Step 2: Create Description

- Keep it short: no boilerplate, no fluff, no repetitions.
- 1-3 sentence intro, not duplicating title (explain implementation, approach, or root cause).
- 2-4 bullets starting with Action Verbs for changes (Add X, Fix Y, Refactor Z).
- If multiple commits exist (based on `hashes` from Phase 5), add: "It's better to review commits separately:" with a bulleted list of commits: `- [commit-hash-link] Add user auth`.
- Mention what worth extra attention (e.g., complex logic).
- Mention what can be skipped (e.g., indentation, generated files, moved code).
- If `dependentPr` from Phase 1 exists, add a blockquote note at the top of the description:
  ```markdown
  > Dependent on <dependentPr>
  ```

### Step 3: Add Attachments and References

- Add attachments (screenshots or recordings) for UI changes.
- Link related PRs/tickets (PRs dependent on, PRs introducing issue fixed here).

## Output

JSON format:

```jsonc
{
  "title": "string", // The formatted PR title.
  "description": "string", // The generated markdown body.
  "attachments": "string[]", // List of local file paths for attachments (if any).
}
```
