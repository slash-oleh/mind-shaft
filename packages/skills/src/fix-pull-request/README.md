# fix-pull-request

For skill itself see [SKILL.md](./SKILL.md).

## Meta info

Single iteration of addressing PR feedback.

Supports only GitHub for now.

## TODO

- Delegate VCS/Git platform specifics to a separate skill
- Teach how to deal with dependent PRs
- Fix thread owner recognition
- Concurrent thread replies
- Prevent "Declined" in replies for politeness
- Ensure PR description is up-do-date after changes pushed (make sure to not include intermediate fixes (often in squashed fixups) that are not visible in final diff, which agent often likes to do)
