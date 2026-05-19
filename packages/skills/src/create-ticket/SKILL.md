---
name: create-ticket
description: Generic ticket creation workflow. Defines data gathering, output format, and update pattern for creating issues in any project management system.
---

# Create Ticket

## Goal

- Ticket is created in issue tracker system.

## Before creating

Gather target project required fields. Common fields:

1. **Summary** - concise, imperative title.
2. **Description** - formatted according to guidelines below.
3. **Type** - Story, Task, Bug, Sub-task, or system equivalent.
4. **Parent** - Epic or grouping context; ask if required by target project.
5. **Assignee** - assign to self, user, or project default.
6. **Sprint** - none (backlog), current, or future.
7. **Priority** - Low, Medium, High, or system equivalent.
8. **Metadata** - project or system dependent custom fields like Team, Labels.

If details already provided, proceed without asking.

### Description Guidelines

Write structured, developer-friendly descriptions:

- **Tone**: Professional, objective, direct.
- **Details**: Sufficient for immediate implementation without extra clarification.
- **Structure**:
  - Paragraphs for logical context.
  - Lists for requirements, tasks, or options.
  - Code blocks for logs, code snippets, configs, or command outputs.
  - References or links to files, pull requests, docs, or other tickets.

### Bug Description Template

If type is **Bug**, description MUST include:

- **Pre-conditions**: Required system state, environment, user account, or configuration.
- **Steps to Reproduce (STR)**: Numbered actions triggering the bug.
- **Actual Result (AR)**: Incorrect behavior with error logs or messages.
- **Expected Result (ER)**: Correct expected behavior.

## After creating

Report created ticket URL.

If creation failed, explain reason and retry with corrected fields.
