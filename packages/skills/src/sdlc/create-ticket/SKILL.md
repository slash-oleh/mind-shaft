---
title: SKILL.md
name: create-ticket
description: Create a structured ticket in the project management system. Use when user requests ticket or issue creation.
---

# Create Ticket

## Goal

- Ticket is created in issue tracker system.

## Before creating

Gather target project required fields. Common fields:

1. **Title** - see guidelines below.
2. **Description** - see guidelines below.
3. **Type** - Story, Task, Bug, Sub-task, or system equivalent.
4. **Parent** - Epic or grouping context; ask if required by target project.
5. **Assignee** - assign to self, user, or project default.
6. **Sprint** - none (backlog), current, or future.
7. **Priority** - Low, Medium, High, or system equivalent.
8. **Metadata** - project or system dependent custom fields like Team, Labels.

If details already provided, proceed without asking.

### Title Guidelines

- Concise
- Must focus on the goal, not the solution.
- For features/tasks: imperative mood.
- For bugs: describe the current state (the issue), not the desired behavior or proposed fix.

### Description Guidelines

Write structured, developer-friendly descriptions:

- **Tone**: Professional, objective, direct.

- **Focus**: Focus on the problem and the goal, not the proposed solution. For bugs, describe the issue, not the fix.

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
