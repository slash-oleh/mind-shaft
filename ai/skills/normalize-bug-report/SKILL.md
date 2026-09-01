---
name: normalize-bug-report
description: Structure a freeform bug report into sections. Use in `prescribe` before `investigate`, or standalone whenever a raw bug report needs structuring.
claudecode:
  context: fork
  background: true
  argument-hint: "[raw_bug_report]"
  arguments:
    - "raw_bug_report"
---

# Normalize Bug Report

## Goal

- Bug report structured as sections, with no initial information lost.

## Input

- Raw bug report: freeform description, error log, or structured text. May be a single report, or an itemized batch (each with its own `id`) - keep `id` attached throughout.

## Steps

### Step 1: Structure Bug Report

Structure the input as sections:

- **Title**: Issue statement. Focus on the issue, not the fix - declare the current, incorrect behavior (e.g. "User cannot log in")
- **Pre-conditions**: Prerequisites for reproducing the bug (e.g. system state, environment, user account, or configuration).
- **Steps to Reproduce (STR)**: Sequential actions triggering the bug.
- **Actual Result (AR)**: Incorrect behavior description (e.g. error message).
- **Expected Result (ER)**: Correct expected behavior (e.g. notification shown).
- **Evidence**: Assets with symptoms (e.g. logs, screenshots).
- **Severity**: Level of impact (e.g., critical, high, medium, low).

## Output

Markdown format:

- Bug Report
  - Title
  - Pre-conditions
  - Steps to Reproduce (STR)
  - Actual Result (AR)
  - Expected Result (ER)
  - Evidence
  - Severity
