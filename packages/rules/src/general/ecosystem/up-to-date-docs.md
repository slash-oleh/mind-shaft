# Up-to-date docs

## TLDR

Always maintain README as accurate project entry point. Avoid letting docs rot while project evolves. Good: Up-to-date setup steps. Bad: Tribal knowledge reliance.

## Problem

An outdated README is often worse than no README at all. It misleads newcomers with broken build instructions, points to deprecated services, and reflects a project state that no longer exists. This leads to wasted time, frustration during onboarding, and a general lack of confidence in the project's documentation.

## Good solution

Treat the README as a living document. Update it immediately when local setup steps change, new dependencies are added, or deployment processes are modified. Ensure it contains essential information like build instructions, tech stack overview, and links to other critical documentation (e.g., contribution guides, architecture decisions).

```markdown
# Project Name

## Getting Started

### Prerequisites

- Node.js v20+
- Docker

### Local Setup

1. Clone the repo
2. Run `npm install`
3. Run `docker-compose up`

## Tech Stack

- React, Vite, CSS Modules
- NestJS, PostgreSQL
```

## Bad solution

Letting the README rot while the project evolves. Relying on "tribal knowledge" to fill the gaps left by inaccurate or missing documentation.

```markdown
# Project X

(Last updated: 3 years ago)
To run: just type `make` (Note: 'make' was replaced by 'npm' a year ago)
```

## Impact

- **Maintainability**: Accurate documentation reduces the cost of context switching and long-term support.
- **Onboarding**: Enables newcomers or returning developers to become productive quickly without external help.
- **Consistency**: Ensures that everyone is following the same, up-to-date procedures for development and deployment.

## Exceptions

- None. Even for small internal tools, a basic, accurate README is essential.

## References

- [Wikipedia: README](https://en.wikipedia.org/wiki/README)
- [Make a README: A guide to better documentation by Danny Direct](https://www.makeareadme.com/)
