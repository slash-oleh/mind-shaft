---
title: Home
---

# Skills

Agent skills for common tasks.

## Declarative skills

Group `declarative`. Standing rules and mindset for a domain (tasks, VCS, PRs, tickets, ...), loaded as context while doing varied work, not a fixed sequence to execute. They are intended to replace the step-by-step `sdlc` and `workflows` groups, which are legacy and to be removed once covered. Create new ones with the `declarative-skill` skill.

Unlike the roles below, a declarative skill has no fork or orchestration role: it is simply invoked inline wherever its guidance applies.

## Invocation (legacy groups)

Each skill has one fixed role, set by its group:

- **Workflows** orchestrate. They always run inline in their caller, and spawn every sdlc skill they use with `Agent(subagent_type: "fork", ...)`, so each step's work stays out of the orchestrating context. Other workflows and tools skills they invoke with plain `Skill(skill: "<name>", args: "...")`.
- **SDLC skills** do the work. A workflow forks them; anything they invoke themselves (tools skills, or another sdlc skill) runs with a plain `Skill(...)` call inside that fork.
- **Tools skills** are invoked with a plain `Skill(...)` call from any role, and declare `context: fork` themselves.

The two fork mechanisms differ inside a forked worker, which is what makes the roles above safe:

- `Agent(subagent_type: "fork", ...)` is refused outright (`subagent_recursive_fork`: "Fork is not available inside a forked worker").
- `context: fork` frontmatter degrades: the skill body loads inline in the existing worker instead of spawning a nested fork.

So only workflows spawn forks, and workflows never run inside one - every fork sits at depth one, chains stay legal at any length, and each forked skill still inherits context. A tools skill forks when its caller is inline and runs inline when its caller is already forked, without either caller having to know which.

Consequence: forking is decided by the caller's role, not by depth. A skill that needs its own steps isolated in separate forks belongs in workflows; a skill that does its work in one context belongs in sdlc, and calls whatever it needs inline.
