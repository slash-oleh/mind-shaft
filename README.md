# Documentation

### [📺 Live version]()

### [✍️ Edit Sources (TBD)]()

This repository contains development best practices.

## Disclaimer

This [README](README.md) describes how documentation is being
structured, written and built. It does not include any project specifics, and
it's not being included into compiled version documents. Correspondingly,
everything under the [src directory](src/README.md) doesn't describe how docs
are created, but include the project specifics only.

## Contribution

See [CONTRIBUTION.md](CONTRIBUTING.md).

## Used tools

- [Markdown](https://en.wikipedia.org/wiki/Markdown) - source text
- [Zensical](https://zensical.org/) - bundling everything together
- [Remark](https://remark.js.org/) - linting and structure validation

## Serve docs in Docker (for a quick read-only)

Use this option if you want just to view docs, and the hosted version isn't
available for some reason.

Pre-requisites: [Docker](https://www.docker.com/).

```bash
docker compose up
```

Go to [http://127.0.0.1:8005](http://127.0.0.1:8005).

## Lint Markdown files

```bash
docker compose run --rm lint
```

## Generate TOC

```bash
docker compose run --rm generate-toc
```

## Using AI

See [DPE](./dpe) for AI rules, workflow and tasks.
