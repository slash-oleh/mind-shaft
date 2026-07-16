# Contributing

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

Install skills (3rd-party and repo's own, declared as `sources` in `rulesync.jsonc`) and sync agent configs:

```bash
npm run agents:sync
```

### Local Documentation

The documentation site is powered by [Zensical](https://zensical.org/) and aggregates content from all packages.

```bash
docker compose up
```

Go to [http://127.0.0.1:8005](http://127.0.0.1:8005).

## Releasing changes

Generate into `ai/skills` folder that is publicly used by `skills` and `rulesync`:

```bash
npm run generate
```

Commit and push.

## Adding a new package

1. Create a new directory in `packages/`.
2. Initialize with `package.json`.
3. Add content to `packages/<name>/src`.
4. Symlink the content to `docs/<name>` for Zensical aggregation.

## Package-specific guidelines

- [Rules Contribution Guidelines](packages/rules/CONTRIBUTING.md)
