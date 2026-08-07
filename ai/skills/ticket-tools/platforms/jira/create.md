# Jira: create

Call `createJiraIssue` with `cloudId`, `projectKey`, `summary`, `issueTypeName`, `description`, `contentFormat: "markdown"`, and `assignee_account_id`. PRIORITY, PARENT and the resolved CUSTOM_FIELDS_JSON entries go in `additional_fields`. Omit PRIORITY when it is `default`, and PARENT when it is `none`.

Leave `transition` out. Its IDs are resolvable only for an existing issue, so a non-default STATUS needs a second step: run the `change-status` recipe on the created issue.

The issue's URL is an absolute browse link from the response when it carries one, otherwise `<Base URL>/browse/<KEY>` with **Base URL** resolved per the mapping.
