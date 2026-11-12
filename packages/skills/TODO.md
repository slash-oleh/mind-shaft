# TODO

## General

- Standardize cross-skill document shapes and move into shared knowledge (Requirements, Incident, Commits)

- Unify itemized input processing (carried IDs)

- Define terms
  - Document types and shapes
    - Requirements - what to do
    - Spec - how to do
    - Implementation Plan - where to do

  - Ticket - task tracker entity

  - Issue - bug or error

  - Task - requirement, feature

## Subagent ideas

- `errand-boy`: Run "tools" skills
  Simple deterministic tasks, often scripts-heavy one-time command with clear i/o, no semantic analysis, focus on format and syntax.
  Suggested cheap model / low effort.

- `it-depends-dev`+`self-contained-dev`: Resolve concerns raised per `scrutiny`
  Two sides/modes:
  - `it-depends-dev`: default mode where it asks technical questions about the code
  - `self-contained-dev`: makes best-effort tech decisions and only asks about product

## Draft skills

### SLDC

- `regroup-commits`: Split big ones into smaller cohesive ones. Squash non-cohesive ones. Keep commits non-breaking in between.
- `inspect-codebase`: Split from `scrutiny` and `detective`
- `why-ci-failed`: Diagnose CI failures ad-hoc.

### System Design

- `estimate-prd`: Analyze, breakdown, estimate workflow
  - `normalize-prd`: Structure raw input. Outputs PRD (Requirements counterpart).

  - `business-analysis` (`scrutiny` counterpart). Summarize, classify, challenge, gaps, risks, stack, data model, use cases, critical path, mvp, milestones, timeline, team, components, services. Outputs System Design (Spec counterpart).
    - `breakdown`: Breakdown PRD into smaller, more manageable pieces. Outputs Breakdown.

    - For each breakdown item:
      - Challenge per `scrutiny`
      - `adr`: Collect options, Assess, Make decision, Write ADR. Outputs ADR.

  - `roadmap`: Convert System Design into ordered roadmap: milestones, epics, tasks - ready to be created in ticket tracker. Outputs Roadmap.

  - `estimate`: Combine System Design and Roadmap to estimate. Outputs Estimation.

  - `proposal`: Combines System Design, Roadmap and Estimation. Outputs Proposal.

### Tools

- `confluence-md-bridge`: Abstract away Confluence pain, write docs in local pretty Markdown, have it bi-directionally synced.

### Generic/Meta

- `reflect` / `reflect-mistakes` / `reflect-skill`: Review errors (including self-fixed) to improve initial instructions or update memory.
- `security-assessment`: Run whitebox static checks against OWASP top 10. Consider other aspects like dependencies. Consider external knowledgebase source for OWASP but outline the flow, parallelization opportunities, etc.
- `personalize-text`: Re-draft text for specific audience/personality: developer, QA, product, client, support, etc.
- `reduce`: _Boil down_: Trim anything (code, text) to it's core: drop edge cases, comments, optional paths.
- `inline-review`: Kinda `TODO` resolver: Use special marks (like `> REVIEW: ...`) to comment md/code inline, then use skill to apply change requests in-place.
- `choice`: Kinda brainstorm: Output ideas, collect feedback, repeat. Used to generate ideas (e.g. names), rate/sort them, choose from existing options, or everything simultaneously.

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
  - `heroku`
  - `aws`
  - `gcloud`
  - `k9s`
  - `twg`
