# TODO

## Multi-skill workflows

Settle on Multi-stage skills vs Multi-skill workflows balance.

## Drafts

Ideas for new skills:

- `estimate-prd`: Analyze, breakdown, estimate
  - `business-analysis` as a subskill for separate tasks
  - Aspects: summarize, classify, challenge, gaps, risks, stack, data model, use cases, critical path, mvp, milestones, timeline, team, components, services.

- `analyze-task`: Extracted from current `implement-task` as a separate skill. Somewhat like `estimate-prd` too but for just one task.

- `code-review`: Take all relevant rules into account. Utilize reply wording rules, tools, etc. from `fix-pull-request`.

- `fix-feedback`: Make a followup fix based on ticket comments / chat message. Decide on ticket creation, create branch, implement, submit PR. Sort of `fix-pull-request` but when changes are already merged.

- `why-ci-failed`: Part of `fix-pull-request` already but would still prove useful being ad-hoc.

- `investigate`: Detective job on incidents, (heisen)bugs, performance, etc.

- `reflect` / `reflect-skill`: Review errors (including self-fixed) to improve initial instructions or update memory.

- `ship`: Merge, release, verify, prepare presentational info (links, screenshots), announce: comment in ticket, send messages.

- `sdlc`: Combining other skills in iterative for PRD/task to make the way to Done in iterative approach.
  - Rough flow from existing (or planned) skills
    - estimate-prd
    - create-ticket
    - prepare-task-workspace
    - ! analyze-task
    - implement-task
    - submit-pull-request
    - ! code-review
    - fix-pull-request
    - ! ship
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
