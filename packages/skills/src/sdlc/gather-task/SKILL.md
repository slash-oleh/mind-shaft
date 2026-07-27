---
title: SKILL.md
name: gather-task
description: Collect raw info about a task - ticket details, linked design/docs, and relevant codebase context. Use as the first step before preparing a workspace, elaborating, or implementing a task.
---

# Gather Task

## Goal

- Ticket ID (if any) is resolved, and its title, description, and linked issues fetched.
- Linked design, documentation, and other resources are retrieved and summarized.
- Relevant high-level codebase location is identified.

## Prerequisites

- Project management MCP server (e.g., Jira, GitHub Issues)
- Design MCP server (e.g., Figma)
- Documentation MCP server (e.g., Confluence)

## Steps

### Step 1: Identify Task Source

- If input is a ticket ID, URL, or branch name (`<ticket_id>-<description>` convention), extract the ticket ID.
- If ticket ID resolved, use project management tools to fetch title, description, and linked issues.
- If plain description provided (no ticket ID resolved), treat it as the task title/description directly.

### Step 2: Retrieve Related Assets

- For design links: extract details (layout, components) via MCP (Figma, Miro, etc.).
- For documentation: read content via MCP (Confluence, Notion, GitHub, etc.).
- For other URLs: fetch and summarize content.

### Step 3: Establish Codebase Context

- Identify high-level codebase location: app, library, module (do not investigate the task itself).

## Output

Markdown format:

- Ticket: ID, if resolved.
- Task: Title and description.
- Linked Resources: List of URLs/IDs and summaries.
- Affected Modules: List of directories/files likely affected.
- Existing Patterns: List of similar/reusable code locations.
