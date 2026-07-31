---
name: undraft-text
description: Turn a rough draft, outline, or terse notes into finished prose while preserving its structure and intent. Use when asked to "refine", "un-draft", "clean up", "polish", "finish", or "fix grammar" on a document, outline, README, or spec.
---
# Undraft Text

## Goal

- Draft is rewritten into finished, readable prose.
- The intent is preserved.
- Output conforms to the repo's docs conventions and passes linting.
- Output is at requested destination.

## Input

- Path to the draft file, or the draft text inline.

## Rules

- **Preserve, not expand**: Do not add information the draft does not imply, and do not drop key details.
- **Ask, don't guess**: When a bullet is genuinely unclear and context does not resolve it, clarify.
- **Smallest change**: Prefer the smallest change that makes the text finished and correct.
- **Concise**: Don't unnecessarily inflate text.

## Execution

### Step 1: Read the draft

Read the whole file. Understand the intent. Note its shape: outline vs. prose, nesting depth,
fragments, placeholder phrases, missing title/intro, and any TODO markers.

### Step 2: Detect conventions

Check for a governing docs rule before rewriting - for example, an ASCII-only rule for hyphens, ellipses, and quotes. Match the project's formatting conventions enforced by tools such as markdownlint, remark, or cspell, including list markers, heading levels, and code fences.

### Step 3: Rewrite

- Complete fragments into full sentences.
- Resolve ambiguous phrases using context already in the draft.
- Add a title and a one-line intro when the draft lacks them.
- Group loose bullets into logical sections with headings.
- Convert rule/guideline notes to imperative mood.
- Split long sentences into shorter ones.
- Convert long comma enumerations into bullets.
- Rephrase rude and personalized statements to be either respectful or non-personalized.
- Fix grammar, spelling, and typos.
- Reduce nesting where possible.
- Align with domain terms - use the repo's knowledge when they differ.

### Step 4: Write back

Depending on the input and the user's request, overwrite the source file or print the result.
A formatter hook may reformat the file afterward - that is expected.

### Step 5: Report changes

Summarize what changed: structural edits, completed fragments (before -> after
for the notable ones), and any typos or term-spelling fixes. Flag anything left
ambiguous that needs the author's input.

## Output

A rewritten text.
If a file was provided, write in-place. If given inline, reply inline unless asked otherwise.
