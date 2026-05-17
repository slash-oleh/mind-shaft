# Phase 6: Generate Metadata

## Goal

Create a professional and concise PR title and description.

## Steps

### Step 1: Create Title

- Template: `TASK_ID`: <TITLE>`
- Imperative mood
- Aligned with branch

### Step 2: Create Description

- Keep it short: no boilerplate, no fluff, no repetitions.
- 1-3 sentence intro, not duplicating title (explain implementation, approach or root cause)
- 2-4 bullets starting with Action Verbs for loose changes (Add X, Fix Y, Refactor Z)
- If multiple commits, add: "It's better to review commits separately:" with a bulleted list of commits: "- [commit-hash-link] Add user auth"
- Mention changes worth extra attention (if any - complex logic)
- Mention changes can be skipped (indentation changes, generated files, moved code)
- If dependent on PR A, add note at the top of the description:
  ```markdown
  > Dependent on #<PR_NUMBER>
  ```

### Step 3: Add Attachments and References

- Add attachments (screenshots or recordings) for UI changes.
- Link related PRs/tickets (PRs dependent on, PRs introducing issue fixed here).

## Output

Persist to JSON:

- `title`: The formatted PR title.
- `description`: The generated markdown body.
- `attachments`: list of local file paths (if any).
