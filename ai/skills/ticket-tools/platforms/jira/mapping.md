# Jira: mapping

Maps abstract ticket fields to Jira arguments, and lists how to resolve their values through the Atlassian MCP.

## Prerequisites

Atlassian MCP connected and authenticated - its Jira tools available. If not, stop and report it.

## Core

Every call requires Site, and nearly every call requires Project.

### Site

`cloudId`. ID (usually a UUID), or the site hostname (`<site>.atlassian.net`).

For options, call `getAccessibleAtlassianResources`, which takes no arguments. Each entry carries both `id` (the cloud ID) and `url` (the site base URL).

### Base URL

Not a call argument - the same **Site** in hostname form (`https://<site>.atlassian.net`), needed only to build browse links for output. A UUID cloud ID does not yield it, so resolve from the first that applies:

1. The host of an absolute link already in the tool response (`self`, or any browse link).
2. `url` of the **Site** entry in `getAccessibleAtlassianResources`.

### Project

`projectKey` on `createJiraIssue`, `projectIdOrKey` on metadata calls. Plain text.

For options, call `getVisibleJiraProjects` with `searchString` as a filter.

## Fields

### ID

`issueIdOrKey`. Plain text or number.

### Title

`summary`. Plain text.

### Description

`description`. Rich text.

### Status

`transition.id`, a transition ID rather than a status ID. It is a top-level argument of `transitionJiraIssue` and `createJiraIssue`, not a field. `editJiraIssue` cannot set it.

For options, call `getTransitionsForJiraIssue` with **ID** as `issueIdOrKey`. Match by the target status name (`to.name`), not the transition name.

### Type

`issueTypeName`. Plain text.

For options, call `getJiraProjectIssueTypesMetadata` with **Project** as `projectIdOrKey`.

### Assignee

`assignee_account_id`. ID.

For options, call `lookupJiraAccountId` with **Assignee** as `searchString`.

### Priority

`priority`. Object, either `{ "name": "High" }` or `{ "id": "<id>" }`.

For options, call `getJiraIssueTypeMetaWithFields` with **Project** as `projectIdOrKey`, the issue type ID as `issueTypeId`, and `requiredFieldsOnly: false`, then read `allowedValues` of the `priority` field.

### Parent

`parent` inside the field container. Object, either `{ "key": "<KEY>" }` or `{ "id": "<id>" }`.

## Other

### Field container

Fields without their own argument (Priority, custom fields, labels, components) go in a container that differs per call: `additional_fields` on `createJiraIssue`, `fields` on `editJiraIssue` and `transitionJiraIssue`.

### Custom fields

`customfield_xxxxx` inside the field container. Values are passed through verbatim - Jira takes them as-is.

A key that is already a native field ID (`customfield_xxxxx`, or a system field name such as `labels`) is used as-is. Otherwise resolve it: call `getJiraIssueTypeMetaWithFields` with **Project** as `projectIdOrKey`, the issue type ID as `issueTypeId`, and `requiredFieldsOnly: false`, then match the key against each field's `name` case-insensitively and use that field's ID. If no field matches, drop the key and report it as unset rather than failing the whole call.

### Rich text

Rich text goes in as Markdown with `contentFormat: "markdown"` - `##` headings, `-`/`1.` lists. Jira converts it to ADF. Avoid wiki markup (`h2.`, `#`).
