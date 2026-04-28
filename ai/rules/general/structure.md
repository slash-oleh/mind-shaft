---
description: "General: Structure"
---

- **Avoid helpers modules**: Avoid stockpiling non-cohesive code into generic modules (`core`, `utils`, `helpers`). Use corresponding domain modules instead and fallback to helpers only as a last resort.
- **Encapsulate implementation details**: Export only the public API. Keep internal logic of files and modules private to enforce encapsulation and prevent coupling.
- **Group by feature**: On top-level, group code by feature first (`auth`, `billing`), not technical role (`ui`, `api`, `models`). Keep feature-related logic together and group by role inside feature.
- **Mirror components in translations**: Organize translation keys to reflect modules structure in the codebase.
- **One component per file**: Keep one primary component per file. Internal one-time use helpers are allowed.
- **Separate logic and UI**: Decouple business logic and state management from presentation layer. Use headless patterns or services.
- **Use appropriate domain module**: Place code within its logical feature or domain module. Ensure components reside in their relevant business scope.
- **Use module entrypoints**: Expose and use the public API of a module and avoid reaching into its internal file structure directly.
- **Use src folder**: When possible put files into `src` directory instead of root directory.
