# TODO

## General

- Standardize cross-skill document shapes and move into shared knowledge (Requirements, Incident, Commits)
- Unify itemized input processing (carried IDs)

## Subagent ideas

- `errand-boy`: Run "tools" skills and some of "sdlc" skills (`prepare-workspace`, `create-ticket`, `gather-task`, `gather-merge-blockers`)
  Simple deterministic tasks, often scripts-heavy one-time command with clear i/o, no semantic analysis, focus on format and syntax.
  Suggested cheap model / low effort.
- `effective-manager`: Run "workflow" skills
  High-level orchestration tasks, mostly multiple skills invoking with carrying i/o in between. Not diving into details and not micro-managing sub-skills with redundant instructions.
  Suggested cheap model / low effort.
- `it-depends-dev`+`self-contained-dev`: Run `clarify` skill
  Two sides/modes:
  - `it-depends-dev`: default mode where it asks technical questions about the code
  - `self-contained-dev`: makes best-effort tech decisions and only asks about product

## Draft skills

### SLDC

- `task-autopilot` (formelly `sdlc`, `task-to-pull-request`): Compound hands-off workflow with the following skills chain. Humam approval gates mostly skipped. Questions limited to product semi-technical ones, with rest accepted at best effort decisions. Since `submit-pull-request` (or existing PR from `identified-pr`) gates 2-3 passing implies asyncronous wait / periodic check and potentially iterative loop of `fix-pull-request` to get to `ship-task`.
  - `gather-task`
  - `identify-pr`
  - Gate 1: No PR exists
    - `prepare-workspace`
    - `elaborate` or `investigate`
    - `plan-implementation`
    - `implement`
    - `review-code`
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

- `regroup-commits`: Split big ones into smaller cohesive ones. Squash non-cohesive ones. Keep commits non-breaking in between.

- `normalize-requirements`: Split from `confront`

- `normalize-bug-report`: Split from `investigate`

- `inspect-codebase`: Split from `elaborate` and `investigate`

- `why-ci-failed`: Part of `fix-pull-request` already but would still prove useful being ad-hoc.

### System Design

- `estimate-prd`: Analyze, breakdown, estimate workflow
  - `normalize-prd` (`normalize-requirements` counterpart). Outputs PRD (Requirements counterpart).
  - `business-analysis` (`elaborate` counterpart). Summarize, classify, challenge, gaps, risks, stack, data model, use cases, critical path, mvp, milestones, timeline, team, components, services. Outputs System Design (Spec counterpart).
    - `breakdown`: Breakdown PRD into smaller, more manageable pieces. Outputs Breakdown.
    - For each breakdown item:
      - `confront`
      - `clarify`
      - `spec`?
      - `adr`: Collect options, Assess, Make decision, Write ADR. Outputs ADR.
  - `roadmap` (`plan-implementation` counterpart): Convert System Design into ordered roadmap: milestones, epics, tasks - ready to be created in ticket tracker. Outputs Roadmap (Stages counterpart).
  - `estimate` (`implement` counterpart). Combine System Design and Roadmap to estimate. Outputs Estimation.
  - `proposal` (`submit-pull-request` counterpart). Combines System Design, Roadmap and Estimation. Outputs Proposal.

### Generic/Meta

- `reflect` / `reflect-mistakes` / `reflect-skill`: Review errors (including self-fixed) to improve initial instructions or update memory.

- `security-assessment`: Run whitebox static checks against OWASP top 10. Consider other aspects like dependencies. Consider external knowledgebase source for OWASP but outline the flow, parallelization opportunities, etc.

## 3rd-party skills

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

- CLI
  - `git`
  - `gh`
  - `glab`
