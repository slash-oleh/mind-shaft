# Component files

## TLDR

For components, always use flat files in shared directories. Avoid dedicated folders for single components, unless complex enough to split into helper files. Good: `Button.tsx`. Bad: `Button/index.tsx`.

## Problem

The "folder-per-component" pattern (where every component has its own directory with an `index.ts`) often leads to a bloated and shallow file structure. It forces developers to navigate through extra layers of directories just to reach a single file of interest. Furthermore, it results in "index.ts pollution" in IDEs, where multiple open tabs carry the same name, making it difficult to switch between files efficiently.

## Good solution

Keep simple components as single files within a shared directory. Only promote a component to its own folder when it truly grows to include private sub-components, complex tests, or dedicated assets.

```text
// Good: Clear, scannable flat structure
src/components/
  ├── Button.tsx
  ├── Input.tsx
  ├── Checkbox.tsx
  └── ComplexTable/       <-- Only this one needs a folder
      ├── ComplexTable.tsx
      ├── TableHeader.tsx
      └── TableRow.tsx
```

## Bad solution

Wrapping every tiny, single-file component in its own directory "just in case" or for the sake of a perceived symmetry.

```text
// Bad: Bloated structure with redundant "index.ts" files
src/components/
  ├── Button/
  │   └── index.tsx      <-- Redundant nesting
  ├── Input/
  │   └── index.tsx      <-- Redundant nesting
  └── Checkbox/
      └── index.tsx      <-- Redundant nesting
```

## Impact

- **[KISS](../../home/impact/positive/kiss.md)**: A flatter structure is easier to manage, scan, and refactor.
- **[Readability](../../home/impact/positive/readability.md)**: Descriptive filenames (e.g., `Button.tsx`) are much more readable in IDE tabs than generic `index.tsx` files.

## Exceptions

- **Strict Framework Requirements**: When using frameworks or tools that automatically resolve routes or logic based on a specific folder-per-item structure.
- **Library Components**: When building a library where each component _must_ be an entry point for tree-shaking or packaging reasons.
