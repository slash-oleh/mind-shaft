# Mind Shaft

Comprehensive software engineering handbook: knowledge base, AI agent rules and skills.

## Shortcuts

### Live Web Version

[Read online](). <!-- TODO: Add github pages link when available -->

### AI Agent

Rules and skills, straight from GitHub - installs into `.claude/` by default (`-t cursor` for Cursor):

```bash
npx slash-oleh/mind-shaft
```

## Installation

### Skills only

Via [skills](https://www.npmjs.com/package/skills):

```bash
npx skills add slash-oleh/mind-shaft/ai/skills
```

Via [rulesync](https://www.npmjs.com/package/rulesync) - add to your `rulesync.jsonc`:

```jsonc
{ "sources": [{ "source": "slash-oleh/mind-shaft:ai/skills" }] }
```

then:

```bash
npx rulesync install && npx rulesync generate
```

## Background

Hey, I'm Oleh.
This is an attempt to create my software engineering brain dump.
It started as best practices knowledge base.
Used to share knowledge with teammates, as project guidelines and during code reviews.
Later evolved into system of rules, skills and other tools focused on AI agents.
Now it can be fed to AI agents to guide their work.

Mainly, statements are meant to be evidentary but sometimes may be opinionated.
It's never a final version and is meant to be improved and fixed over time.
In other words, by copying it you copy myself as a developer at this moment.

## Values

These have no direct impact, but to let you know what to expect from these docs:

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

## Repository structure

Monorepo. Each `packages/*` is a workspace holding content source, docs/config generated from it.

- `packages/rules` - best practices (source of `ai/rules`).
- `packages/skills` - processes/workflows (source of `ai/skills`).
- `packages/stack` - toolset docs.
- `packages/cli` - installer script, run via `npx slash-oleh/mind-shaft` (root `package.json` `bin` routes here).
- `docs/` - Zensical doc site, aggregates content from packages via symlinks.
- `.rulesync/` - rulesync config/cache, generates `.claude/`, `.cursor/`, `.agents/` targets.
- `ai/` - built rules/skills output from packages, published. Supposed to be used by npx skills and rulesync commands by the end user. Also pulled back in as rulesync source in this repo.
- `site/` - built docs site assets.

## Contribution

See [CONTRIBUTING.md](CONTRIBUTING.md).
Package-specific guidelines are in their respective directories.
