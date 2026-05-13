# Phase 5: Implement

**Only proceed after explicit human approval (from Phase 4 plan review).**

Execute the implementation plan step by step.

## Execution order

Follow the plan from Phase 4 exactly. Do not skip or reorder steps unless a dependency forces a change - in that case, note it explicitly.

## Per step

1. Apply the code change using Edit or Write
2. Run pre-commit hooks on modified files:
   ```bash
   pre-commit run --files <modified-files>
   ```
3. Fix any lint or format errors before moving to the next step
4. Commit the step:
   ```bash
   git add <files-for-this-step>
   git commit -m "<conventional-commit message>"
   ```

One commit per plan step. Do not bundle unrelated changes.

## Commit messages

Follow Conventional Commits format: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `refactor`, `test`, `chore`

Subject: imperative mood, <=50 chars, no period.

## Deviations

If a step turns out to be different from the plan (unexpected dependency, existing code conflict, etc.):

- Stop and describe the deviation
- Adjust the remaining plan steps if needed
- Continue only after the adjusted path is clear

## Output

- All plan steps applied as individual commits
- List of commits with their messages
- Any deviations from the plan and how they were resolved
