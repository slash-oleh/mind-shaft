---
name: project-memo
description: Maintain root AGENTS.md project cheatsheet with concise repo-specific facts (product, structure, git, stack, tracker, code quality, tests, setup). Use to write it from scratch, append missing sections, or update it when a covered fact changes.
---

# Project Memo

## Goal

- Root `AGENTS.md` exists and matches current repo facts.
- Content is limited to repo-specific facts, not skills, rules, or how-to guides.

## Scope

Include only stable, repo-specific facts.

Exclude:

- Coding conventions or style guides - those belong in rules.
- Step-by-step workflows - those belong in skills.
- Anything trivially derivable by reading code each time.

## Sections

Write or update root `AGENTS.md` to this structure, in order. Any section may hold extra info before its subsections. If a section does not apply (e.g. no tests), state "None" rather than omitting it.

```markdown
# AGENTS.md

## Product

- Brief: 1-3 sentences on business purpose
- References: links to full docs if present (README, docs folder, wiki, Confluence)

## Structure

- Breakdown: high-level map - monorepo packages, modules, libraries
- Dependencies: main logical relation between them (e.g. `packages/backend` depends on `libs/auth`, `packages/frontend` communicates with `packages/backend` via REST API)

## Git

- Platform: GitHub/GitLab/other
- Base branch: main branch to use as the base for features
- Branch naming: conventions
- Commit messages: conventions
- Worktree: post-create/destroy commands
- Hooks: pre-commit command

## Stack

- Hosting: cloud providers, CI, deployment
- Languages: TypeScript, JavaScript, Python
- Tools: main framework/libs, database, API contracts
- Runtime: specific platform versions (Node.js, Python)
- Globals: external dependencies (CLIs, OS, VPN, etc.)

## Ticket tracker

- Platform: Jira/GitHub Issues/GitLab Issues/other
- Ticket ID: format regexp and examples
- Statuses: list of possible ticket statuses (with ID mapping if necessary)
- Fields: required fields and their fill-in instructions (with ID mapping if necessary)

## Code quality

- Guidelines: docs references
- Linter: tool and config
- Formatter: tool and config
- Run: command(s) to run linters and formatters

## Tests

- Strategy: what's tested, what's not
- Types: unit, e2e, integration
- Tools: test runner, assertion library
- Mocks: what should and should not be mocked
- Run: command(s) to run tests (all, and particular)

## Environment setup

- Dependencies: install commands
- Variables: file example if fixed
- Artifacts: databases, file storage, etc.
- Isolation: Docker, Docker Compose, Virtual Environment, virtualenv, nvm, bare host system, etc.
- Run: command(s) to build and run the app (e.g. `docker-compose up`)
```

## Steps

1. Check whether root `AGENTS.md` exists.
2. If missing, create it using the structure above.
3. If it exists, compare each section against current repo facts. Update only sections that are missing or stale. Preserve unrelated manual content.
4. Gather facts from: manifests and lockfiles, `.git/config`, CI configs, Dockerfiles/compose, README, linter/formatter configs, `.nvmrc`/`.tool-versions`, existing rule and skill files (to exclude their content, not duplicate it).
5. Write in project text style: concise, short, ASCII only, no fluff.
6. Do not restate content owned by a rule or skill file - reference it by path instead.

## After writing

Report file path and which sections were created, updated, or left unchanged.
