---
description: "General: Code Style: Everything that affects readability and maintainability but not behavior.
Includes formatting, linting but not the rules that can be defined in automated tools like Prettier, ESLint, etc."
---

- **Apply modern language features**: Adopt modern syntax and language features like optional chaining and async/await.
- **Avoid imperative assignment**: When possible, use ternary operators to initialize `const` variables instead of using `let` with `if/else` blocks.
- **Avoid magic values**: Replace raw values (numbers, strings, flags) with named constants.
- **Avoid one-line coding**: Break down complex operations and long method chains into multiple lines.
- **Avoid redundant else**: Remove unnecessary `else` blocks after `if` when using `return` or `throw`.
- **Avoid switch statement**: Use `if/else` statements or lookup maps instead of `switch/case` structures. Consider polymorphism as well.
- **Comment complex logic**: Prioritize self-explanatory code but comment complex or non-obvious logic.
- **Don't extrapolate object properties as args**: Pass entire objects or dedicated interfaces instead of extracting individual properties as separate function arguments.
- **Don't fail silently**: Handle errors explicitly or report them to a logging/monitoring system instead of silently ignoring them.
- **Don't overuse DRY**: Avoid premature deduplication and only create abstractions when code represents the same underlying concept, not just the same visual shape.
- **Follow code conventions**: Follow the standard naming, formatting, and structural conventions of the programming language.
- **Follow project code style**: Match the existing codebase's style and apply improvements systematically as separate tasks.
- **Forward properties**: Follow Open/Closed Principle. Wrappers should forward properties to underlying layers. Preserves composed interface and avoids manual re-mapping.
- **Shorten boolean expressions**: Use boolean operators instead of ternary expressions or conditional statements when the desired outcome is a boolean value.
- **Use bulletproof range checks**: Use inclusive range checks (`>=` or `<=`) instead of exact equality (`==`) for progress monitoring, counters, and loop terminations to prevent infinite loops in case counter change logic is bugged.
- **Use exceptions for errors**: Throw exceptions instead of returning error codes or status objects to signal unexpected failures.
- **Use guard clauses**: Flatten logic by using early returns for prerequisites. Avoid if-statement nesting.
- **Use text templates**: Use placeholders within translation strings instead of concatenating partial tokens with dynamic values.
- **Use lookup maps**: Use objects or Maps for multi-branch logic instead of if/else or switch.
