---
description: "General: Structure"
---

- Import only from the public API (entry point) of a submodule and avoid reaching into its internal file structure.
- Avoid using generic catch-all modules like `core`, `utils`, or `helpers` for logic that has a definitive domain home. These modules should be reserved for truly foundational, non-business logic.
- Export only essential components and functions through a root index file to keep internal implementation details hidden.
- Export only one primary component per file.
- Organize your codebase around features or domain concepts rather than technical roles like "components", "data", or "hooks". Group everything related to a single feature in one place.
- Place all application source code and assets within a dedicated `src` directory to keep the project root clean.
- Decouple business logic and state management from the presentation layer using 'headless' patterns or service layers.
- Organize translation keys to mirror the directory and file structure of the codebase.
- Place code within the feature or domain module that it logically belongs to. Ensure that components, hooks, and services reside in the module that defines their business role or scope.
- Organize feature modules into subdirectories by technical role (e.g., `components/`, `hooks/`) when they contain multiple files of the same type.
