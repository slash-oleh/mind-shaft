---
description: "General: Structure"
---

# General: Structure

## Don't import directly from inside a submodule
Import only from the public API (entry point) of a submodule and avoid reaching into its internal file structure.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/structure/don-t-import-directly-from-inside-a-submodule.md)

## Don't overuse core/utils/helpers modules
Avoid using generic catch-all modules like `core`, `utils`, or `helpers` for logic that has a definitive domain home. These modules should be reserved for truly foundational, non-business logic.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/structure/don-t-overuse-core-utils-helpers-modules.md)

## Explicitly define the public API of a module
Export only essential components and functions through a root index file to keep internal implementation details hidden.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/structure/explicitly-define-the-public-api-of-a-module.md)

## File should export only one component
Export only one primary component per file.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/structure/file-should-export-only-one-component.md)

## Prefer feature-based structure over technical role-based one
Organize your codebase around features or domain concepts rather than technical roles like "components", "data", or "hooks". Group everything related to a single feature in one place.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/structure/prefer-feature-based-structure-over-technical-role-based-one.md)

## Prefer src folder over project root folder
Place all application source code and assets within a dedicated `src` directory to keep the project root clean.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/structure/prefer-src-folder-over-project-root-folder.md)

## Separate the business-logic part and the user interface
Decouple business logic and state management from the presentation layer using 'headless' patterns or service layers.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/structure/separate-the-business-logic-part-and-the-user-interface.md)

## Structure translations to represent the modules structure
Organize translation keys to mirror the directory and file structure of the codebase.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/structure/structure-translations-to-represent-the-modules-structure.md)

## Use corresponding module for the code
Place code within the feature or domain module that it logically belongs to. Ensure that components, hooks, and services reside in the module that defines their business role or scope.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/structure/use-corresponding-module-for-the-code.md)

## Use technical role separation inside feature module
Organize feature modules into subdirectories by technical role (e.g., `components/`, `hooks/`) when they contain multiple files of the same type.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/structure/use-technical-role-separation-inside-feature-module.md)
