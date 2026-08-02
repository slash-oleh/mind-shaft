---
title: SKILL.md
name: review-skill
description: Review a skill to identify flaws and suggest fixes.
---

# Review Skill

## Goal

- Skill's flaws are identified, each paired with a suggested fix.
- Findings are written to `TODO.md` inside the skill's directory.

## Input

- Skill name or path to the skill's directory (or its `SKILL.md`).

## Steps

### Step 1: Undraft

Run `/undraft-text` on the skill's `SKILL.md` first.

### Step 2: Review

Check the skill for:

- Outdated frontmatter
- Missing input description
- Missing output description
- Missing execution steps (for execution-kind skills)
- Duplicate or redundant content (instructions, examples, descriptions)
- Input/output schema mismatches with external skills, commands, etc.
- Missing details or gaps
- Ambiguous instructions
- Inconsistencies with other similar skills
- Reference mismatches: variables, names, scripts, paths, etc.

### Step 3: Report

For every concern found, suggest a solution. Write results to `TODO.md` inside the skill's directory.

## Output

`TODO.md` in the skill's directory, listing each concern with its suggested fix.
