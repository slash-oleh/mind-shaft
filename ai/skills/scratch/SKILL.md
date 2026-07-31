---
name: scratch
description: Hand off large data between skills or subagents via a scratch file path instead of inlining it in prompts or return values. Write mode reserves a path and writes the data; read mode validates the path and reads the data. Invoke as a unit (Skill tool) - never read or run its scripts directly.
---

# Scratch

Hand off large data between skills/subagents via a file path, not inline content. Never paste big data into prompts, args, or return values.

## Write mode - producer side

1. Reserve a path:

   ```bash
   bash "$SKILL_DIR/scripts/write.sh" <hint> <ext>
   ```

   - `hint`, `ext`: optional labels, default to `data`, `tmp`.
   - Prints the reserved path. File is created empty, atomically (via `mktemp`), under the system temp dir.

2. Write the data: `Write(file_path: "<path>", content: "...")`.

3. Pass the consumer the path plus a one-line description of its shape (not the content).

## Read mode - consumer side

1. Validate the handed-off path before consuming it:

   ```bash
   bash "$SKILL_DIR/scripts/read.sh" <path>
   ```

   - Exits non-zero and prints an error if the file is missing or empty; prints the path otherwise.

2. Read it directly: `Read(file_path: "<path>")`.

3. Return a summary and the path - never the full content.
