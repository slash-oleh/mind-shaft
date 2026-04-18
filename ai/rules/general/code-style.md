---
description: "General: Code style"
---

# General: Code style

## Apply modern language features
Adopt modern syntax and language features like optional chaining and async/await.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/apply-modern-language-features.md)

## Avoid magic values
Replace raw values (numbers, strings, flags) with named constants.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/avoid-magic-values.md)

## Avoid nested conditions
Use guard clauses and early returns to flatten logic and avoid deeply nested conditional blocks.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/avoid-nested-conditions.md)

## Avoid one-line coding
Break down complex operations and long method chains into multiple lines.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/avoid-one-line-coding.md)

## Avoid redundant if branches for returning statements
Remove unnecessary `else` blocks and avoid redundant `if` statements when using `return` or `throw`.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/avoid-redundant-if-branches-for-returning-statements.md)

## Comment unclear or non-obvious code
Write self-explanatory code by default, and use comments only to explain the reasoning behind inherently complex or non-obvious logic.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/comment-unclear-or-non-obvious-code.md)

## Don't extrapolate object properties as args
Pass entire objects or dedicated interfaces instead of extracting individual properties as separate function arguments.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/don-t-extrapolate-object-properties-as-args.md)

## Don't fail silently
Handle errors explicitly or report them to a logging/monitoring system instead of silently ignoring them.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/don-t-fail-silently.md)

## Don't overuse DRY
Avoid premature deduplication and only create abstractions when code represents the same underlying concept, not just the same visual shape.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/don-t-overuse-dry.md)

## Don't overuse environment variables
Use environment variables only for infrastructure configuration instead of business logic or feature flags.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/don-t-overuse-environment-variables.md)

## Follow code conventions
Adhere to the standard naming, formatting, and structural conventions of the programming language being used.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/follow-code-conventions.md)

## Follow established project code style
Match the existing codebase's style and apply improvements systematically as separate tasks.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/follow-established-project-code-style.md)

## Leave optimization for compilers and pre-processors
Write clear, readable code instead of performing manual micro-optimizations handled by compilers and JIT engines.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/leave-optimization-for-compilers-and-pre-processors.md)

## Use boolean logic for boolean results
Use boolean operators instead of ternary operators or conditional statements when the desired outcome is a boolean value.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/use-boolean-logic-for-boolean-results.md)

## Use exceptions for errors
Throw exceptions instead of returning error codes or status objects to signal unexpected failures.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/use-exceptions-for-errors.md)

## Use robust range checks for edge cases
Use inclusive range checks (`>=` or `<=`) instead of exact equality (`==`) for progress monitoring, counters, and loop terminations.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/use-robust-range-checks-for-edge-cases.md)

## Use translation templates instead of concatenation
Use placeholders within translation strings instead of concatenating partial keys with dynamic values.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/use-translation-templates-instead-of-concatenation.md)

## Use translation tools for all user-facing text
Internalize all user-facing strings into translation files (i18n).
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/code-style/use-translation-tools-for-all-user-facing-text.md)
