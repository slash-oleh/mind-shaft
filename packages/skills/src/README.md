---
title: Home
---

# Skills

Agent skills for common tasks.

## SDLC skills

Group `sdlc`. Declarative skills: standing rules and mindset for a development domain (tasks, VCS, PRs, tickets, ...), loaded as context while doing varied work, not a fixed sequence to execute. Each is invoked inline wherever its guidance applies. Create new ones with the `declarative-skill` skill.

## Tools skills

Group `tools`. External integrations, invoked with a plain `Skill(...)` call. They declare `context: fork` themselves; inside an already forked worker, `context: fork` degrades and the skill body loads inline instead of spawning a nested fork.
