# TODO

## Multi-skill workflows

Settle on Multi-stage skills vs Multi-skill workflows balance.

## General

- Skill's README.md should define why it exists

## Drafts

Ideas for new skills:

- `task-autopilot` (formelly `sdlc`, `task-to-pull-request`): Compound hands-off workflow with the following skills chain. Humam approval gates mostly skipped. Questions limited to product semi-technical ones, with rest accepted at best effort decisions. Since `submit-pull-request` (or existing PR from `identified-pr`) gates 2-3 passing implies asyncronous wait / periodic check and potentially iterative loop of `fix-pull-request` to get to `ship-task`.
  - `gather-task`
  - `identify-pr`
  - Gate 1: No PR exists
    - `prepare-workspace`
    - `elaborate`
    - `implement`
    - `code-review`
    - `submit-pull-request`
  - Gate 2: PR CI failed or has requested changes
    - `fix-pull-request`
  - Gate 3: PR approved
    - `ship-task`

  - Consider
    - Ralph loop
    - Claude's /goal
    - Remote execution
    - Durable compute (restate, temporal.io)

- `estimate-prd`: Analyze, breakdown, estimate
  - `business-analysis` as a subskill for separate tasks
  - Aspects: summarize, classify, challenge, gaps, risks, stack, data model, use cases, critical path, mvp, milestones, timeline, team, components, services.

- `adr`: Write, assess and resolve ADRs.
  - Collect options
  - Assess
  - Make decision

- `breakdown`: Convert PRD/System Design into tasks, milestones, roadmap ready to be created in ticket tracker.

- `fix-feedback`: Make a followup fix based on ticket comments / chat message. Decide on ticket creation, create branch, implement, submit PR. Sort of `fix-pull-request` but when changes are already merged (consider a split from that skill).

- `why-ci-failed`: Part of `fix-pull-request` already but would still prove useful being ad-hoc.

- `investigate`: Detective job on incidents, (heisen)bugs, performance, etc.

- `reflect` / `reflect-mistakes` / `reflect-skill`: Review errors (including self-fixed) to improve initial instructions or update memory.

- `security-assessment`: Run whitebox static checks against OWASP top 10. Consider other aspects like dependencies. Consider external knowledgebase source for OWASP but outline the flow, parallelization opportunities, etc.

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
