# Phase 2: Merge

## Goal

- PR merged into the main branch.

## Skip Conditions

`is_merged` is true.

## Steps

### Step 1: Merge PR

Merge the pull request and clean up the branch. `<platform>` is the `platform` field from Phase 1's output:

```
Skill(skill: "<platform>-tools", args: "merge-pr <pr_number>")
```

## Output

JSON format:

```jsonc
{
  "merged": "boolean", // Whether merge was successful
  "merge_commit": "string", // The updated HEAD of main branch
}
```
