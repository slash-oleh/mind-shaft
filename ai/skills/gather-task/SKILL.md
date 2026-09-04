---
name: gather-task
description: Collect raw info about a task - ticket details, linked design/docs, and relevant codebase context. Use as the first step before preparing a workspace, elaborating, or implementing a task.
claudecode:
  background: true
  effort: low
  argument-hint: "[source]"
  arguments:
    - "source"
---

# Gather Task

## Goal

- Task info is resolved (fetched if needed).
- Linked assets are retrieved.

## Prerequisites

- `ticket-tools` skill available
- Design MCP server (e.g., Figma)
- Documentation MCP server (e.g., Confluence)

## Input

- Source: Ticket ID, Ticket URL, or plain task description.

## Steps

### Step 1: Identify Task Source

If the input is a ticket, extract the ticket ID and capture it as `ticket_id`.

If no ticket ID is resolved, treat the input as the task info directly and skip ticket fetching.

Invoke the `ticket-tools` skill:

```
Skill(skill: "ticket-tools", args: "get <ticket_id>")
```

### Step 2: Retrieve Related Assets

- For design links: extract details (layout, components) via MCP (Figma, Miro, etc.).
- For documentation: read content via MCP (Confluence, Notion, GitHub, etc.).
- For other URLs: fetch content.

Save each fetched asset as a file via the `scratch` skill:

```
Skill(skill: "scratch", args: "write <asset> <format>")
```

Capture the returned paths.

## Output

Markdown format:

- Ticket (if resolved)
  - ID
  - Title
- Task: the ticket's Description if resolved, otherwise the raw input.
- Linked Resources: references and file paths for content fetched in Step 2.
