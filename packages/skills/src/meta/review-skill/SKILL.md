---
title: SKILL.md
name: review-skill
description: Review a skill to identify flaws and suggest fixes. Use when auditing an existing skill for gaps, drift, or convention violations.
---

# Review Skill

## Goal

- Skill's flaws are identified, each paired with a suggested fix.
- Findings are written to `TODO.md` inside the skill's directory.

## Input

- Skill name or path to the skill's directory (or its `SKILL.md`).

## Steps

### Step 1: Undraft

Run `/refine-text` on the skill's `SKILL.md` first.

### Step 2: Review

Check the skill for:

- Outdated frontmatter
- Frontmatter `description` not following convention (see below)
- Missing input description
- Missing output description
- Missing execution steps (for execution-kind skills)
- Duplicate or redundant content (instructions, examples, descriptions)
- Input/output schema mismatches with external skills, commands, etc.
- Missing details or gaps
- Ambiguous instructions
- Inconsistencies with other similar skills
- Reference mismatches: variables, names, scripts, paths, etc.

Classify each concern's severity on an absolute scale, not relative to what else was found - do not inflate a minor, unclear flaw into a major one just because the skill is otherwise clean. Do not invent issues that are not there.

#### Frontmatter description convention

A `description` has two clauses, in order:

1. **Function** - imperative verb, states what the skill does. One sentence, no fluff.
2. **Trigger** - starts with "Use when/for/as/before/after ...", states the situation that should invoke it. Every skill needs this clause; a description without one is a flaw (e.g. "Merge, release, verify, prepare presentational info, announce" - lists actions, gives no trigger).

Add a third clause only to disambiguate from an adjacent/similarly-named skill: "invoke from `x`", "standalone, or via `y`", "in place of `z` (which is for ...)". Backtick any referenced skill/command name.

Keep the whole thing to 1-3 sentences.

### Step 3: Report

For every concern found, suggest a solution. Write results to `TODO.md` inside the skill's directory.

## Output

`TODO.md` in the skill's directory, listing each concern with its suggested fix.
