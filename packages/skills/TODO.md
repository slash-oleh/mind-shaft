# TODO

## Multi-skill workflows

Settle on Multi-stage skills vs Multi-skill workflows balance.

## Drafts

Ideas for new skills:

- `project-memo`: Maintain project cheatsheet for high-level project info. Something like Claude Code's `/init` but much more trimmed to really high-level details. Exclude anything that is rather a skill or a rule - only repo-specific factual statements. Used to write the initial root `AGENTS.md` from scratch, append to existing, as well as keed it updated when relevant facts change (model decision). Should define document structure. The text style must be really concise.
  - product brief: short basic business logic description and references to full docs
  - structure: monorepo projects map, main modules and dependencies (e.g. `packages/backend`, `libs/auth`)
  - git:
    - platform: github/gitlab, submodules if any, relevant neighbour/dependency repos
    - flow: base branch, branching/release process, commit message guidelines
    - worktree: init, cleanup commands/instructions
  - stack: cloud deployment/hosting, language, main framework/lib/platform/db/API/etc., specific runtime versions (e.g. via nvm, virtualenv), external/global deps (e.g. CLI commands)
  - ticket tracker: jira/github/gitlab, ticket number format
  - code quality: guidelines reference (agent rules or regular docs), linter, formatter, pre-commit commands
  - tests: yes/no, commands
  - environment setup: fresh local run (deps install, docker/docker-compose/bare platform)

- `estimate-prd`: Analyze, breakdown, estimate
  - `business-analysis` as a subskill for separate tasks
  - Aspects: summarize, classify, challenge, gaps, risks, stack, data model, use cases, critical path, mvp, milestones, timeline, team, components, services.

- `adr`: Write, assess and resolve ADRs.
  - Collect options
  - Assess
  - Make decision

- `breakdown`: Convert PRD/System Design into tasks, milestones, roadmap ready to be created in ticket tracker.

- `fix-feedback`: Make a followup fix based on ticket comments / chat message. Decide on ticket creation, create branch, implement, submit PR. Sort of `fix-pull-request` but when changes are already merged.

- `why-ci-failed`: Part of `fix-pull-request` already but would still prove useful being ad-hoc.

- `investigate`: Detective job on incidents, (heisen)bugs, performance, etc.

- `reflect` / `reflect-mistakes` / `reflect-skill`: Review errors (including self-fixed) to improve initial instructions or update memory.

- `security-assessment`: Run whitebox static checks against OWASP top 10. Consider other aspects like dependencies. Consider external knowledgebase source for OWASP but outline the flow, parallelization opportunities, etc.

- `sdlc`: Combining other skills in iterative for PRD/task to make the way to Done in iterative approach.
  - Rough flow from existing (or planned) skills
    - estimate-prd
    - create-ticket
    - prepare-task-workspace
    - elaborate-task
    - implement-task
    - submit-pull-request
    - ! code-review
    - fix-pull-request
    - ship-task
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
