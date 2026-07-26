# Jira: create

Every call below needs a `cloudId` - resolve once via `getAccessibleAtlassianResources` (or reuse a value already known this session), never ask the user for it.

Call `createJiraIssue` with:

- `cloudId`
- `projectKey` - `PROJECT_KEY` argument.
- `issueTypeName` - `TYPE` argument (defaults to `Task`).
- `summary` - `TITLE` argument.
- `description` - contents of `DESCRIPTION_FILE`.
- `parent` - `PARENT` argument, if given (subtasks only).

If `FIELDS_JSON` is given, split it before the call:

- `assignee` key - resolve to an account ID via `lookupJiraAccountId` (unless already an ID), pass as `assignee_account_id`.
- everything else (sprint, priority, labels, custom fields, ...) - pass through verbatim as `additional_fields`, e.g. `{"priority": {"name": "High"}, "labels": ["bug"]}`.

Report the created issue's URL (`https://<site>.atlassian.net/browse/<KEY>`) from the response.
