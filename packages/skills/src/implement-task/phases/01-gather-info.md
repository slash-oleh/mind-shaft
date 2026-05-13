# Phase 1: Gather Info

Collect all information needed to understand the task before any analysis or coding.

## Task source

Resolve the task from the first matching source:

1. **Ticket or URL** - if the user provided a ticket ID, a project management URL, or a task link, fetch it:
   - Read title, description, acceptance criteria, and linked issues
   - Download any attached assets (images, diagrams, specs)
   - Identify linked design or documentation resources

2. **Plain description** - if the user described the task in plain text, treat that as the spec.

Do not ask the user to repeat information already provided.

## Related assets

For each linked resource found in the source (or mentioned in the description), retrieve it:

- **Design links** - use appropriate MCP (Figma, Miro, etc.) to extract details (layout, component structure)
- **Documentation pages** - use appropriate MCP (Jira, Confluence, GitHub, Notion, etc.) to read content
- **Other URLs** - fetch and summarize the content

## Codebase context

Identify relevant parts of the codebase without deep analysis yet:

- Locate files and modules likely affected by this task
- Find existing patterns related to the feature area (similar components, services, hooks)
- Note the tech stack layers involved (frontend, backend, infra, etc.)

## Output

- Task title and description
- Acceptance criteria from the ticket (if any)
- List of related assets and their key content
- List of likely affected files and modules
