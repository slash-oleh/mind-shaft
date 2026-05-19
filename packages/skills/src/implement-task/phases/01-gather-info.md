# Phase 1: Gather Info

## Goal

Collect all information needed to understand the task before any analysis or coding.

## Steps

### Step 1: Identify Task Source

- If ticket ID or URL provided: fetch title, description, and linked issues.
- If plain description provided: treat as the spec.

### Step 2: Retrieve Related Assets

- For design links: extract details (layout, components) via MCP (Figma, Miro, etc.).
- For documentation: read content via MCP (Confluence, Notion, GitHub, etc.).
- For other URLs: fetch and summarize content.

### Step 3: Establish Codebase Context

- Locate files and modules likely affected.
- Find existing patterns (similar components, services, hooks).

## Output

Markdown format:

- Task: Title and description.
- Linked Resources: List of URLs/IDs and summaries.
- Affected Modules: List of directories/files likely affected.
