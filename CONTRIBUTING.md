# Contributing to Dev Handbook

Monorepo with multiple npm workspace packages.
Each package represents documentation section.

## Used tools

- [Markdown](https://en.wikipedia.org/wiki/Markdown) - source text
- [Zensical](https://zensical.org/) - bundling everything together
- [Remark](https://remark.js.org/) - linting and structure validation

## Getting Started

Pre-requisites: [Node.js](https://nodejs.org/), [Docker](https://www.docker.com/).

### Installation

```bash
npm install
```

Install 3rd-party skills:

```bash
npx --yes skills add \
  JuliusBrussee/caveman \
  --agent universal \
  --agent antigravity
```

Install repo's skills:

```bash
npx --yes skills add \
  ./agents/skills/ \
  --skill merge-article \
  --skill refine-article \
  --skill rephrase \
  --skill resolve-todo \
  --agent universal \
  --agent antigravity \
  --agent claude-code
```

Install packages' skills:

```bash
npm run generate
npx --yes skills add \
  ./ai/skills/ \
  --skill extract-skill \
  --skill formalize-skill \
  --agent universal \
  --agent antigravity \
  --agent claude-code
```

### Local Documentation

The documentation site is powered by [Zensical](https://zensical.org/) and aggregates content from all packages.

```bash
docker compose up
```

Go to [http://127.0.0.1:8005](http://127.0.0.1:8005).

## Adding a new package

1. Create a new directory in `packages/`.
2. Initialize with `package.json`.
3. Add content to `packages/<name>/src`.
4. Symlink the content to `docs/<name>` for Zensical aggregation.

## Scripts

- `npm run rules:lint` - Lint rules markdown files.
- `npm run rules:generate:toc` - Generate Table of Contents for rules.
- `npm run rules:generate:ai-rules` - Generate AI rules for IDEs.

## Package-specific guidelines

- [Rules Contribution Guidelines](packages/rules/CONTRIBUTING.md)
