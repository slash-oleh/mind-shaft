# Mind Shaft

My agentic engineering setup powered by software engineering guidelines.

_Dig here. Bring a hard hat._ 👷

[![Last commit](https://img.shields.io/github/last-commit/slash-oleh/mind-shaft)](https://github.com/slash-oleh/mind-shaft/commits/main)
[![Pages](https://img.shields.io/badge/docs-Pages-blue)](https://slash-oleh.github.io/mind-shaft/)
[![Pages build](https://github.com/slash-oleh/mind-shaft/actions/workflows/pages.yml/badge.svg)](https://github.com/slash-oleh/mind-shaft/actions/workflows/pages.yml)

## What's in here 🔍

### Skills (routine, automated away): 🤖

SDLC (declarative - standing rules and mindset, loaded as context, not run as steps):

- [`/task`](ai/skills/task/SKILL.md): changing files to deliver a goal - minimal change, evidence, commits.
- [`/scrutiny`](ai/skills/scrutiny/SKILL.md): challenge a task before acting - vague goals, scope creep, prescribed solutions.
- [`/detective`](ai/skills/detective/SKILL.md): bugs, errors, regressions - reproduce, find root cause, prove the fix.
- [`/vcs`](ai/skills/vcs/SKILL.md): branching, conflicts, commit history.
- [`/pull-requests`](ai/skills/pull-requests/SKILL.md): submitting, fixing, reviewing PRs.
- [`/tickets`](ai/skills/tickets/SKILL.md): ticket status, comments, feature and bug shapes.
- [`/writing`](ai/skills/writing/SKILL.md): text for readers outside the session.
- [`/delivery-autopilot`](ai/skills/delivery-autopilot/SKILL.md): drive a task from any stage through PR to shipped.

Tools (external integrations):

- [`/vcs-tools`](ai/skills/vcs-tools/SKILL.md): PR/MR data/operations for the detected platform (GitHub `gh`, GitLab `glab`).
- [`/ticket-tools`](ai/skills/ticket-tools/SKILL.md): ticket create/update/status/comment operations (Jira via Atlassian MCP for now).
- [`/scratch`](ai/skills/scratch/SKILL.md): hand off large data between skills/subagents via a file path, not inline content.

Meta (skills for skills):

- [`/declarative-skill`](ai/skills/declarative-skill/SKILL.md): create a declarative skill - standing rules for a domain instead of a workflow.
- [`/extract-skill`](ai/skills/extract-skill/SKILL.md): turn a completed task's process into a reusable skill.
- [`/review-skill`](ai/skills/review-skill/SKILL.md): review a skill, find flaws, suggest fixes.
- [`/create-dispatcher-skill`](ai/skills/create-dispatcher-skill/SKILL.md): merge a detect skill plus per-backend skills into one dispatcher skill.

Generic (junk drawer):

- [`/adr`](ai/skills/adr/SKILL.md): draft an Architecture Decision Record - weigh options, make a decision.
- [`/project-memo`](ai/skills/project-memo/SKILL.md): maintain root `AGENTS.md` repo cheatsheet.
- [`/refine-text`](ai/skills/refine-text/SKILL.md): turn a rough draft into finished prose.

### Rules (best practices, enforced not suggested): ⚖️

- [`general`](ai/rules/general): cross-cutting, e.g. [`principles`](ai/rules/general/principles.md), [`code-style`](ai/rules/general/code-style.md), [`security`](ai/rules/general/security.md), [`tests`](ai/rules/general/tests.md), [`naming`](ai/rules/general/naming.md), ...
- [`domains`](ai/rules/domains): per product area, e.g. [`frontend`](ai/rules/domains/frontend.md), [`backend`](ai/rules/domains/backend.md), [`web`](ai/rules/domains/web.md), [`ux`](ai/rules/domains/ux.md), [`design`](ai/rules/domains/design.md), `mobile`.
- [`languages`](ai/rules/languages): per language, e.g. [`typescript`](ai/rules/languages/typescript.md), [`javascript`](ai/rules/languages/javascript.md), [`css`](ai/rules/languages/css.md), [`html`](ai/rules/languages/html.md), [`sql`](ai/rules/languages/sql.md).
- [`tools`](ai/rules/tools): per tool/library, e.g. [`react`](ai/rules/tools/react.md), [`git`](ai/rules/tools/git.md), [`mui`](ai/rules/tools/mui.md), `node-js`.

Learn more on [web version](https://slash-oleh.github.io/mind-shaft/).

## Installation 📦

For AI agents.

### All-in-one, via single special command (recommended)

Skills and rules, straight from GitHub.

```bash
npx --yes --allow-git=all slash-oleh/mind-shaft install -t claudecode
```

Replace `claudecode` with your agent if needed. See [rulesync docs](https://rulesync.dyoshikawa.com/reference/supported-tools.html) for all supported `--targets`.

### Skills only, via vercel-labs's [skills](https://www.npmjs.com/package/skills)

Most common tool but only supports skills.

Also note that agent-specific frontmatters are not supported this way (Claude Code's `context: fork` directions in particular, so workflow skill runs might be messier).

```bash
npx skills add slash-oleh/mind-shaft/ai/skills
```

### Skills only, via [rulesync](https://www.npmjs.com/package/rulesync)

Best if you're already maintaining `rulesync` infrastructure.

Add to your `rulesync.jsonc`:

```jsonc
{ "sources": [{ "source": "slash-oleh/mind-shaft:ai/skills" }] }
```

then:

```bash
npx rulesync install && npx rulesync generate
```

## Background 👋

Hey, I'm Oleh.
This is my software engineering brain, dumped into files.
It started as a best practices knowledge base.
Used it to share knowledge with teammates, as project guidelines and during code reviews.
Later evolved into a system of rules, skills and other tools focused on AI agents.
Now it feeds AI agents directly so they act more like me and instead of me.

Mostly evidence-based, occasionally opinionated - flagged as such where it matters.
Never a final version, always getting fixed.
Fork it and you're forking a snapshot of me as a developer, bugs included.

## Values 📜

No direct impact on the code, but sets expectations for these docs:

- **Concise**: No fluff, formality, long intros, duplications, or polite fillers.
- **Clear**: Public issue better than silent solution.
- **Direct**: If it's bad - it's bad, not "not so good".
- **Consistent**: No double standards.
- **Documented**: Written, not spoken.
- **Pragmatic**: Actions matter. Words - not so much.
- **Scientific**: Rely on facts, not feelings.
- **Precise**: Measure, not estimate.
- **Accurate**: _Make simple, not simpler_.
- **Intentional**: Focus on goal, not plan.
- **Systematic**: Fix process, not symptom.
- **Harmless**: _Primum non nocere_ (first, do no harm).

## Repository structure 🕸️

Monorepo. Each `packages/*` is a workspace holding content source, docs/config generated from it.

- `packages/rules` - best practices (source of `ai/rules`).
- `packages/skills` - processes/workflows (source of `ai/skills`).
- `packages/stack` - toolset docs.
- `packages/cli` - installer script, run via `npx slash-oleh/mind-shaft` (root `package.json` `bin` routes here).
- `docs/` - Zensical doc site, aggregates content from packages via symlinks.
- `.rulesync/` - rulesync config/cache, generates `.claude/`, `.cursor/`, `.agents/` targets.
- `ai/` - built rules/skills output from packages, published. Supposed to be used by npx skills and rulesync commands by the end user. Also pulled back in as rulesync source in this repo.
- `site/` - built docs site assets.

## Contribution 🤝

See [CONTRIBUTING.md](CONTRIBUTING.md).
Package-specific guidelines are in their respective directories.
