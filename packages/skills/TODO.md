# TODO

## Common structure

Unify structure and common instructions across skills

- Prerequisites
- Tools (or delegations to other skills)
- Phases (separate files, execution, announces)
- Phases inputs/outputs, logged as data files (as we go, not retrospectively)
- Rules (precise following, ask when unclear)
- Human review
- Execution (steps)
- Add examples

## Multi-skill workflows

Settle on Multi-stage skills vs Multi-skill workflows balance.

## Drafts

Ideas for new skills:

- `estimate-prd`: Analyze, challenge, breakdown, fill gaps, find risks, suggest stack, data model, milestones, estimate.
- `fix-feedback`: Make a followup fix based on ticket comments / chat message. Decide on ticket creation, create branch, implement, submit PR. Sort of `fix-pull-request` but when changes are already merged.
- `why-ci-failed`: Part of `fix-pull-request` already but would still prove useful being ad-hoc.
- `sdlc`: Combining other skills in iterative for PRD/task to make the way to Done in iterative approach.
  - Rough flow from existing (or planned) skills
    - estimate-prd
    - create-ticket
    - prepare-workspace
    - implement-task
    - fix-pull-request
    - fix-feedback
  - Consider
    - Ralph loop
    - Claude's /goal
    - Remote execution
    - Durable compute (restate, temporal.io)

## 3rd-party

Suggest pairing with specific skills, MCPs, CLIs, agent plugins (might end up being part of `stack` package):

- Meta
  - `skill-creator`
  - `self-improvement`
  - `claude-reflect`
  - `autoresearch`
- Generic
  - `caveman`
- Services
  - `jira`
  - `figma`
  - `gh` CLI
