---
name: submit-pull-request
description: Submit Pull Request for review when work on a task is completed. Use this skill whenever the user says "submit PR", "open pull request", "create PR", or when you have finished a task and need to get it reviewed.
---

# Submit Pull Request

## Execution

Follow the **Skill Execution Protocol** (injected below).

## Phase 1: Pre-Submission Checks

### 1. Diff Size Audit

- Check diff size: `git diff --stat origin/main..HEAD`.
- Diff MUST not exceed 300 added lines (ideally < 200).
- If it exceeds 300, warn the user and suggest splitting the PR.

### 2. Automated Quality

- Execute the linting suite: `npm run lint`.
- If changes are made by auto-formatters, verify they are staged and committed (`git status`).
- Pre-existing lint errors in unrelated files do NOT block submission. Verify errors are only in changed files:
  ```bash
  npm run lint 2>&1 | grep -E "<changed_file_pattern>"
  ```
- Only block if errors are introduced by this PR's changes.

## Phase 2: Git Preparation

### 1. Ticket ID Detection

- Extract the Ticket ID (e.g., `#1234`) from the current branch name (`git branch --show-current`).
- If not found in the branch, look for it in the latest commit message or ask the user directly.

### 2. Commit Cleanup

Ensure all pull requests meet team standards for code quality, commit structure, and description format.

- Verify commit count: `git rev-list --count origin/main..HEAD`.
- Target is 1-3 atomic commits.
- Ensure commit messages follow: `<TASK_ID>: <MESSAGE>` (e.g., `#1234: Add user authentication`).
- Use `git commit --amend` or `git rebase` if cleanup is needed.

## Phase 3: Metadata Generation

### 1. Title Formatting

- Format: `<TASK_ID>: <TITLE>`.
- `TITLE` MUST be in the imperative mood (e.g., `Fix search results filter`).
- **Standard**: The PR title must align with the branch name.

### 2. Description Template

ALWAYS structure the description prioritizing extreme conciseness and organic, developer-centric communication. Do NOT use boilerplate headers like `### Description`, `### Summary`, or `**Review Guide**`.
Keep it short — in most cases a single-sentence intro + 2-4 bullets is the target. Do not enumerate every implementation detail.

1. **Context & Motivation (Optional)**:
   - Start with 1-2 bare sentences of context _only_ if the "why" isn't fully obvious from the title.
   - Examples of organic intros: "As a preparation for [feature]:", "Context: The dialog appears when [action]. That triggers [issue], which is a bad UX.", "To manage [issue] more efficiently, upgrade [dependency] first."
   - If related to a ticket explicitly, just use: "As per the ticket."

2. **Core Changes (Bulleted List)**:
   - Proceed directly into a bulleted list using the `- ` format.
   - Every bullet MUST start with a Direct Action Verb (e.g., `Add`, `Extract`, `Introduce`, `Use`, `Fix`, `Remove`, `Migrate`, `Support`).
   - Bullets must be highly technical and functional.
   - Example:
     - Add deletion API, dialog and trigger button, similar to bulk user creation
     - Extract common parts with user creation
     - Exclude white-label assets from large files checks

3. **Visuals (For UI/UX changes)**:
   - Provide visual proof directly below the bulleted list.
   - Use raw HTML `<img>` tags (e.g., `<img width="..." height="..." alt="image" src="..." />`).
   - If providing multiple images/states, separate them organically with a line break and `---`.

4. **Review Guides & Gotchas (Organic integration)**:
   - Instead of explicit headers like "Gotchas", explain non-obvious behavior naturally either in the intro context paragraph or as a detailed bullet point.
   - Instead of explicit headers like "Review Guide", provide an organic list if the PR is complex. Example format:
     "It's better to review commits separately:
     - [commit-hash-link] Remove backend filters
     - [commit-hash-link] Add frontend filters"
       OR
       "Files to review:
     - `package.json`
     - `nx.json`"

5. **Cross-References**:
   - Freely link related PRs (e.g., "Use new API added in #26734", "Revert a recent revert: #26351") or PR chains.

## Phase 4: Submission

1. **Push**: `git push origin [branch-name]`.
2. **Create PR** via `gh pr create`:
   ```bash
   gh pr create --title "<TASK_ID>: <TITLE>" --body "$(cat <<'EOF'
   <description>
   EOF
   )" --base main --head [branch-name]
   ```
3. **Report**: Output the PR URL returned by `gh pr create`.
