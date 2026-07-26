# Phase 1: Gather Info

## Goal

- PR number and approval status collected.

## Steps

### Step 1: Resolve PR number

Invoke the `vcs-tools` skill:

```
Skill(skill: "vcs-tools", args: "identify-pr")
```

### Step 2: Fetch PR status

```
Skill(skill: "vcs-tools", args: "get-pr-status <PR_NUMBER>")
```

Prints `reviewDecision` and `state`. Verify `reviewDecision` is `APPROVED`. If not - stop the skill and announce.

## Output

JSON format:

```jsonc
{
  "pr_number": "string", // PR identifier
  "is_approved": "boolean", // Whether PR is approved
  "is_merged": "boolean", // Whether PR is already merged
}
```
