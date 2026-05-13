---
name: create-ticket
description: Generic ticket creation workflow. Defines data gathering, output format, and update pattern for creating issues in any project management system.
---

# Create Ticket

## Before creating

Gather these fields:

1. **Summary** - concise, imperative title
2. **Type** - Story, Task, Bug, Sub-task, or system equivalent
3. **Parent / Epic** - required grouping context; ask if not provided
4. **Description** - optional but encouraged; plain text
5. **Assignee** - optional; use project default if unspecified
6. **Team / Label** - optional; use project default if unspecified
7. **Sprint** - optional; use project default if unspecified

If the user has already provided all of this, proceed without asking.

## After creating

Report result as URL of created ticket.

If creation failed, explain why and retry with corrected fields.
