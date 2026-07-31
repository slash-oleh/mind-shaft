---
name: ticket-tools
description: Ticket operations (create, update description, change status, comment) for the project's issue tracker, autodetected where possible. Jira via the Atlassian MCP only for now. Use directly when the user asks to create/update/transition/comment on a ticket, or invoke as a unit (Skill tool) from another skill's phase - never call tracker-specific tools (e.g. `*JiraIssue`) directly.
---

# Ticket Tools

## Prerequisites

- A supported tracker backend configured. Only Jira (via the Atlassian MCP) is supported for now.

## Commands

Invoked with an args string of `<command> [...args]`. Resolve the platform first, then follow the matching backend recipe under `scripts/<platform>/`.

### Step 1: Resolve platform

Only `jira` exists today, so this step is a no-op - skip straight to Step 2. Once a second backend exists, add real detection here (likely infer from context/memory).

### Step 2: Run the command

Follow the recipe at `scripts/<platform>/<command>.md`, e.g. `scripts/jira/create.md`. Command shapes below are backend-agnostic; each recipe fills in the actual tool calls.

#### `create <PROJECT_KEY> <TITLE> <DESCRIPTION_FILE> [TYPE] [PARENT] [FIELDS_JSON]`

Pure mechanical create - field/content guidance (title conventions, description structure, bug template) lives in whichever skill calls this one (e.g. `create-ticket`), not here.

`DESCRIPTION_FILE` is a path to a plain text file containing the description. `TYPE` defaults to the backend's default task type if unspecified. `FIELDS_JSON` is an optional JSON object for backend-specific extras (assignee, sprint, priority, labels, custom fields) - forwarded to the recipe as-is; omit keys that don't apply.

Report the created ticket URL. If creation failed, explain the reason and retry with corrected fields.

#### `update-description <TICKET_ID> <DESCRIPTION_FILE>`

Same `DESCRIPTION_FILE` convention as `create`.

#### `change-status <TICKET_ID> <ABSTRACT_STATUS>`

`ABSTRACT_STATUS` is one of the Abstract Statuses below. The recipe maps this to the project's actual workflow status name, matching against that table - infer that mapping lazily, only when this command runs. Some workflows skip `acceptance` and go straight from `code-review` to `done` - that is expected, not an error.

#### `comment <TICKET_ID> <BODY_FILE>`

`BODY_FILE` is a path to a plain text file containing the comment.

## Shared Patterns

### Abstract Statuses

Ticket workflows use different status names per project/tracker, but callers of `change-status` should not need to know them. Use one of these abstract statuses instead:

| Abstract status | Common workflow status names |
| --- | --- |
| `to-do` | To Do, New, Backlog, Ready for Development |
| `in-progress` | In Progress, In Development |
| `code-review` | Code Review, Review, In Review, Ready for Review |
| `acceptance` | Acceptance, Testing, Test, In Testing, Ready to Test, Product Review |
| `done` | Done, Closed, Resolved |

### Markdown bodies

Descriptions go in as Markdown with `contentFormat: "markdown"` (`##` headings, `-`/`1.` lists) - Jira converts to ADF. Avoid wiki markup (`h2.`, `#`).
