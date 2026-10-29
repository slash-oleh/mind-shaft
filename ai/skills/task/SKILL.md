---
name: task
description: Load before the first Edit or Write in any change that delivers a feature, fix or refactor, even when a more specific skill also applies. It covers scope, verification and file-change rules that specific skills don't repeat.
---

# Task

- **Check the ticket**: look for a relevant ticket before starting.
- **Identify the core goal**: state it up front, validate the result against it at the end.
- **Minimal required change**: touch only what the goal needs.
- **Provide evidence**: end-to-end proof, e.g. a screenshot for a feature, a command result for a purely technical change.

## Adjacent domains

Trigger: any step below. This skill does not cover it, and being active does not replace loading the skill that does.

- **Challenging the spec**: before planning. Load the skill for scrutinizing a task spec.
- **Fixing a bug**: broken behavior or regression. Load the skill for bugs and incidents.
- **Git operations**: branching, committing, fixups. Load the skill for git commands.
- **Ticket updates**: status changes, comments. Load the skill for tickets.
- **Drafting text**: commit messages, code comments, docs. Load the skill for text other people read.

## Starting

- **Branch from latest base**: create the branch from an up-to-date base branch.
- **Clean the tree**: stash staged and unstaged changes if dirty. Ignore untracked files.

## Designing

- **Announce the approach**: unless the change is trivial or directly dictated, state the high-level approach before implementing.
- **Elaborate with Q&A**: unless the task is trivial or fully specified, run an elaboration session. Question gaps, assumptions and risks, and get answers before implementing.

## Implementing

- **Follow the fundamental coding rules**:
  - Less code: prefer deleting or reusing over adding.
  - Unified pattern: follow the pattern already used in the codebase.
  - Separation of concerns: keep unrelated concerns in separate units.
  - Single responsibility: one reason to change per unit.
- **Don't lint in between**: run lint once at the end.
- **Commit when done**: commit the finished changes.

## Feedback

- **Use fixup commits**: target the commit that introduced the original change.
