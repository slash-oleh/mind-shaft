# Phase 6: Verify

Self-check the implementation against the acceptance criteria from Phase 3.

## Acceptance criteria check

Go through each criterion from Phase 3 one by one:

- Mark as **Pass** or **Fail**
- For Fail: describe what is missing and fix it before proceeding

Do not mark a criterion as Pass without evidence (code trace, test output, or visual confirmation).

## Definition of done checklist

- [ ] All acceptance criteria pass
- [ ] Linting and type checks pass on modified files
- [ ] Existing tests in affected areas pass
- [ ] New tests added for new behavior (if applicable)
- [ ] No regressions introduced in related features

Run checks:

```bash
pre-commit run --files <all-modified-files>
```

For frontend changes - confirm the UI renders correctly and the golden path works as expected.

## Regression check

Review the list of affected files from Phase 1. For each shared or high-risk area flagged in Phase 2:

- Confirm existing behavior is preserved
- If tests exist for that area, confirm they still pass

## Output

- Acceptance criteria status (Pass / Fail per criterion)
- Definition of done checklist (checked or not)
- Regression check results
- Any remaining issues and their resolution (or explicit deferral with justification)
