---
name: adr
description: Draft an Architecture Decision Record - outline options with pros/cons, make a concise decision given context, and structure the document. Use when user requests an ADR, architecture/design decision, or comparing technical options.
---

# ADR

## Goal

- ADR document produced: problem stated, real options weighed, one decision made.

## Before writing

Gather:

1. **Problem** - what needs deciding and why now. Include current pain if replacing something.
2. **Constraints** - hard requirements, prior decisions, vendor/stack limits that bound the choice.
3. **Candidate options** - collect all reasonable ones, not just the favorite. Two is a minimum; a single "option" is not a decision.

If problem or constraints are unclear, ask before drafting. Don't invent constraints not given.

## Options

For each option:

- Short label (`A`, `B`, `C`...) plus a name.
- One-line description of what it is.
- Pros/cons as terse one-line bullets, prefixed `` `+` `` / `` `-` ``.

Give unfavored options real pros too. An option with no upside listed reads as a strawman, not a fair comparison.

Order options by whatever's natural (maturity, complexity, familiarity) - not by preference.

## Decision

- State the winner first line: `Option X: Name`.
- Justify with reasoning tied to the stated problem/constraints - don't just restate its pros.
- Explicitly name trade-offs accepted, if any.
- If ruling out close alternatives, say why they lost, not just why the winner won.
- If no decision can be made yet, write `TBD` plus exactly what's blocking it.

## Document structure

```markdown
# NN - Title

## Problem

<what and why, current pain if replacing something>

## Options

### A. Name

<one-line description>

- `+` pro
- `-` con

### B. Name

...

## Decision

Option X: Name

<reasoning, tied to problem/constraints>

## Action items

1. <concrete next step>

## Open questions

1. <unresolved item>
```

Rules:

- Omit `Open questions`, `Action items`, or a sub-decisions/links section entirely if empty. Don't pad with "none".
- A decision that spawns its own sub-decision gets a separate linked doc, not a nested one.
- Number files sequentially (`01-`, `02-`...) if the ADR is part of a series; skip numbering for a standalone doc.

## After writing

Report file path. Flag any open questions surfaced while drafting.
