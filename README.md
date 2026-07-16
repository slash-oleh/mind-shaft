# Mind Shaft

My agentic engineering setup powered by software engineering guidelines.

_Dig here. Bring a hard hat._ 👷

[![Pages build](https://github.com/slash-oleh/mind-shaft/actions/workflows/pages.yml/badge.svg)](https://github.com/slash-oleh/mind-shaft/actions/workflows/pages.yml)
[![Last commit](https://img.shields.io/github/last-commit/slash-oleh/mind-shaft)](https://github.com/slash-oleh/mind-shaft/commits/main)

## What's in here 🔍

### Skills (routine, automated away): 🤖

SDLC:

- [`/create-ticket`](ai/skills/create-ticket/SKILL.md): draft a structured ticket from stream of consciousness.
- [`/prepare-task-workspace`](ai/skills/prepare-task-workspace/SKILL.md): set up branch and git state for a ticket.
- [`/elaborate-task`](ai/skills/elaborate-task/SKILL.md): assess scope, risks, done criteria before starting.
- [`/implement-task`](ai/skills/implement-task/SKILL.md): plan and implement from spec through verified change.
- [`/code-review`](ai/skills/code-review/SKILL.md): review a pull request against project rules.
- [`/submit-pull-request`](ai/skills/submit-pull-request/SKILL.md): clean, polish, submit for review.
- [`/fix-pull-request`](ai/skills/fix-pull-request/SKILL.md): address review comments, conflicts, CI failures.
- [`/ship-task`](ai/skills/ship-task/SKILL.md): merge, release, verify, announce.

Meta:

- [`/extract-skill`](ai/skills/extract-skill/SKILL.md): turn a completed task's process into a reusable skill.
- [`/formalize-skill`](ai/skills/formalize-skill/SKILL.md): refactor a skill file to the standard template.

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
npx slash-oleh/mind-shaft -t claudecode
```

Replace `claudecode` with your agent if needed. See [rulesync docs](https://rulesync.dyoshikawa.com/reference/supported-tools.html) for all supported `--targets`.

### Skills only, via vercel-labs's [skills](https://www.npmjs.com/package/skills)

Most common tool but only supports skills.

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
