# Jira: comment

Call `addCommentToJiraIssue` with `cloudId`, `issueIdOrKey: TICKET_ID`, `contentFormat: "markdown"`, and `commentBody` set to the contents of `BODY_FILE`.

The comment's URL is its permalink from the response, or `<Base URL>/browse/<KEY>?focusedCommentId=<id>` built from the returned comment id, with **Base URL** resolved per the mapping.
