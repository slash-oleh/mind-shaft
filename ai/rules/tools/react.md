---
description: "Tools: React"
---

# Tools: React

## Avoid async useEffect callbacks
Define async functions inside `useEffect` instead of making the callback `async`.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/avoid-async-useeffect-callbacks.md)

## Avoid generic component name suffixes
Avoid using vague, meaningless suffixes like `Block`, `Container`, `Box`, `Screen`, `Section`, or `Area` in component names. Use descriptive names that reflect the component's semantic purpose or content.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/avoid-generic-component-name-suffixes.md)

## Avoid global variables for application state
Avoid using plain variables in the module scope to store data that affects the UI. Use **local component state** for isolated data or **React Context** (or a state management library) for shared data.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/avoid-global-variables-for-application-state.md)

## Avoid nested component definitions
Do not define a component inside the body of another component or wrap a component definition in `useCallback`. Define all components at the top level.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/avoid-nested-component-definitions.md)

## Avoid over-nesting component folders
Avoid creating a dedicated folder for every single component. Only use folders when a component is complex enough to require multiple related files.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/avoid-over-nesting-component-folders.md)

## Avoid redundant executions of useEffect
Distinguish between reactive dependencies that trigger an effect and non-reactive values that are merely read to avoid over-reactive effects.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/avoid-redundant-executions-of-useeffect.md)

## Avoid Redux for state management
Do not use Redux as the default state management solution. Favor modern, specialized tools like React Query for server state and Zustand or Context for global UI state.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/avoid-redux-for-state-management.md)

## Avoid storing derived state
Calculate derived values on-the-fly during rendering instead of storing them in state to maintain a single source of truth.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/avoid-storing-derived-state.md)

## Avoid the Container/Presentational pattern
Use Hooks to keep logic and UI cohesive within a single component instead of splitting them into "Container" and "Presentational" pairs by default.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/avoid-the-container-presentational-pattern.md)

## Avoid useRef for state management
Favor declarative state (`useState`) over imperative refs and use `useRef` only for direct DOM access or non-UI bookkeeping.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/avoid-useref-for-state-management.md)

## Export component props
Export the TypeScript interface or type for component props to enable easy reuse, extension, and wrapping.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/export-component-props.md)

## Forward remaining props to the underlying element
Forward unhandled properties (`...restProps`) to the primary child when building wrapper components to preserve the full API of the encapsulated element.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/forward-remaining-props-to-the-underlying-element.md)

## Import assets directly in code
Import images, SVGs, and other static assets directly in component files rather than using raw string paths from public directories.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/import-assets-directly-in-code.md)

## Keep state serializable
Only store serializable data like primitives, plain objects, and arrays in state or global stores to ensure compatibility with hydration and debugging tools.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/keep-state-serializable.md)

## Lift state to the nearest common ancestor
Position your state at the lowest possible level that still allows all components that need the data to access it.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/lift-state-to-the-nearest-common-ancestor.md)

## Merge internal and incoming props
Merge incoming properties like `className`, `style`, and event handlers with internal ones to ensure components remain extensible and composable.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/merge-internal-and-incoming-props.md)

## One component per file
Export only one primary React component per file.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/one-component-per-file.md)

## Prefer controlled components over mirrored state
Use controlled components where the parent remains the single source of truth instead of mirroring props in local state.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/prefer-controlled-components-over-mirrored-state.md)

## Store normalized data in state
Store only unique identifiers (IDs) in selection state instead of copying entire objects to maintain a single source of truth.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/store-normalized-data-in-state.md)

## Structure pages as wrappers around features
Organize the pages layer as a thin compositional wrapper around domain-based feature modules to separate routing from business logic.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/structure-pages-as-wrappers-around-features.md)

## Use a data request management library
Use specialized libraries like TanStack Query or SWR to manage asynchronous data fetching and state instead of manual `useEffect` routines.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-a-data-request-management-library.md)

## Use a form management library
Use specialized libraries like React Hook Form or Formik to handle form state, validation, and submission instead of managing complex state manually.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-a-form-management-library.md)

## Use a table management library
Use a headless library like TanStack Table to manage complex table logic, ensuring full control over UI and styling while delegating state and calculations.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-a-table-management-library.md)

## Use functional components with Hooks
Develop all new components as functional components using React Hooks.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-functional-components-with-hooks.md)

## Use functional updates for state transitions
Use the functional update pattern when transitioning state based on its previous value to ensure you are always working with the most recent data.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-functional-updates-for-state-transitions.md)

## Use Hooks instead of Higher-Order Components (HOCs)
Use custom Hooks instead of Higher-Order Components (HOCs) to share logic between components for better composability and flatter component trees.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-hooks-instead-of-higher-order-components-hocs.md)

## Use lazy initialization for expensive state
Use the initializer function pattern (`useState(() => createInitialState())`) when the initial value of a state requires an expensive computation.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-lazy-initialization-for-expensive-state.md)

## Use memo by default
Wrap functional components in `React.memo`.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-memo-by-default.md)

## Use stable, unique keys in lists
Use unique and stable identifiers for the `key` prop in lists, favoring data IDs over array indices for dynamic collections.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-stable-unique-keys-in-lists.md)

## Use useCallback to stabilize references
Use the `useCallback` hook to maintain stable function references when passing them to memoized child components or using them as hook dependencies.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-usecallback-to-stabilize-references.md)

## Use useMemo for stability and expensive logic
Use `useMemo` to cache results of expensive calculations and maintain referential stability for complex objects and arrays passed to downstream components.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/react/use-usememo-for-stability-and-expensive-logic.md)
