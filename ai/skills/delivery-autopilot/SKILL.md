---
name: delivery-autopilot
description: Standing rules for driving a task hands-off from whatever stage it is in through pull request to shipped. Use when asked to take over, continue, or finish a task, ticket, branch, or PR with minimal supervision.
---

# Delivery Autopilot

- **Observe, don't remember**: derive the stage from ticket, git, and PR on every run. Never trust carried-over state.
- **Enter anywhere**: fresh ticket, dirty tree, local commits, open PR, approved PR. Do only what the observed stage still needs.
- **Apply the domain skills**: `task`, `scrutiny`, `detective`, `vcs`, `pull-requests`, `tickets`, `writing`. This skill only adds stage routing and autonomy overrides.
- **Go as far as possible**: continue through stages until one waits on someone else, then stop and report.
- **Stay idempotent**: re-invocation at any point is safe. Never redo finished work, never duplicate PRs, comments, or ticket updates.

## Autonomy

- **Persona `domain`**: ask only product questions, in one batch (see `scrutiny`). Resolve technical gaps best-effort. Caller may override with `tech` or `full-auto`.
- **Label assumptions**: record every best-effort decision and report it in the final summary.
- **Outward actions need approval**: pushing, posting comments, and merging follow `pull-requests`. Ask first, show the drafted text.
- **Ask on real blockers**: missing access, contradictory requirements, ambiguity that changes the product outcome.

## Observing

Trigger: start of every run.

- **Resolve the task**: from the given ticket, PR, or description. If none given, from the current branch and its open PR.
- **Read all three sources**: ticket (status, requirements, comments), local git (branch, commits ahead of `origin/<base>`, uncommitted changes), PR (state, review decision, CI, conflicts, open threads).
- **Reconcile mismatches**: ticket status behind reality (PR open but ticket "In Progress") is fixed in passing.
- **Match PR to task**: by branch name, then by ticket ID in title or body. If ambiguous, ask.

## Stages

Trigger: after observing. Take the first match.

| Observed | Stage |
|---|---|
| PR merged | Close |
| PR open, approved, CI green, no conflicts | Ship |
| PR open, CI failing, conflicts, or open threads | Fix |
| PR open, otherwise | Wait |
| No PR, commits ahead of base | Review and submit |
| No PR, none ahead | Build |

Uncommitted changes with nothing committed mean an interrupted Build: continue from them, do not stash and restart.

### Build

- **Scrutinize first**: unless trivial or fully specified, challenge the task per `scrutiny`, resolve concerns per persona.
- **Start the ticket**: move to "In Progress" per `tickets`.
- **Prepare the branch**: per `vcs`. Reuse the existing task branch if present.
- **Implement**: per `task`, or `detective` for bugs. Commit when done.
- **Verify**: run lint and tests once at the end. Capture evidence.

### Review and submit

- **Self-review the diff**: per `pull-requests` Reviewing, against the core goal. Fix findings as fixups, autosquash.
- **Rebase if behind**: per `vcs` Conflicts.
- **Open the PR**: per `pull-requests` Submitting. Move ticket to "Code Review".
- **Then wait**: CI and review are pending.

### Fix

- **Gather blockers**: conflicts first, then CI failures, then open threads. Order matters, each can invalidate the next.
- **Address each**: per `pull-requests` Fixing. Doubt bot comments, verify before acting. Disagree openly in the thread when a comment is wrong.
- **Autosquash, push, refresh description**: then wait, since the push restarts CI and review.

### Wait

- **Report, don't poll**: say what the task waits on (CI, review, approval) and that re-invoking continues it.
- **Scheduling is the caller's**: pair with a loop or scheduler to re-invoke.

### Ship

- **Re-check right before merging**: approval, CI, and conflicts still hold.
- **Merge**: with the project's convention, fall back to squash. Delete the branch if the project does.
- **Verify the result**: base branch has the change, deploy or pipeline succeeded if one exists.

### Close

- **Update the ticket**: move to "Testing", comment what shipped and where, per `tickets`.
- **Leave nothing dangling**: no stale branch, no unresolved threads.

## Reporting

Final message, always:

- **Stage**: found on entry, reached on exit.
- **PR**: URL, if any.
- **Waiting on**: CI, review, approval, or nothing if shipped.
- **Assumptions**: technical decisions made best-effort, for correction.
- **Evidence**: proof the goal was met.
