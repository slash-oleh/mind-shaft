---
name: media-evidence
description: Load before taking screenshots or screen recordings as evidence for a PR or ticket, including the evidence that pull request and ticket work asks for. Use when asked to "add a screenshot", "include a screen recording", or "show before/after" of a UI change.
---

# Media Evidence

- **Pick the lightest medium**: a screenshot for a static state, a video only for what needs time or interaction to see (hover, animation, multi-step flow).
- **Pair fixes**: a fix or visual change gets "before" and "after" from the same script. A new feature needs only "after".
- **Script, don't click**: capture with a temporary E2E spec that reuses existing fixtures, mocks and page objects, so data is deterministic and repeatable.
- **Use the project's E2E tool**: capture with the browser testing tool the project already uses. Fall back to Playwright when none is set up.
- **Fix the frame**: use a fixed viewport (1280x720), so captures compare one to one.
- **Show the subject only**: trim loading screens and unrelated lead-in by default. Setup steps the demo needs may stay.
- **Look before handing over**: view frames from the segment where before and after actually differ. "Before" must show the problem, "after" the fix.
- **Leave no trace**: delete the temporary spec and its test output, and keep source files unchanged.
- **Attaching is the user's step**: PR media and ticket attachments (GitHub, Jira) upload only through the web UI, so say so up front. Hand over absolute paths, what each file shows, and where to drop it. Offer to insert the links once the user pastes them back.
- **Leave placeholders**: in the PR or ticket text, put an explicit placeholder at each spot where media must be inserted manually (e.g. `[TODO: insert after.png - fixed dropdown]`). Keep it visible when rendered, so nothing is missed or misplaced.

## Adjacent domains

Trigger: any step below. This skill does not cover it, and being active does not replace loading the skill that does.

- **Writing the capture spec**: structure, fixtures, page objects. Load the skill for E2E specs.
- **Placing evidence in a PR or ticket**: description layout and wording. Load the skills for pull requests and for tickets.

## Screenshots

- **Crop by default**: capture only the component or region under change.
- **Keep context when it matters**: when location or surroundings are the point (where a control sits, what it overlaps), keep the wider view and mark the subject instead.
- **Mark sparingly**: one or two highlight rectangles or arrows in a single contrasting color. No marks covering the subject itself.
- **Mark from the DOM**: draw marks as a page overlay positioned from the target's bounding box before capturing, not by hand-placed coordinates, so recaptures stay aligned.
- **Wait for the state**: assert it is reached before capturing, so a transition or loader is not caught mid-way.

## Videos

- **Make interaction visible**: browser test recordings usually have no cursor, so draw one. Move slowly and pause on each target long enough to read (about 2 s).
- **Use a playable format**: MP4 (H.264), which GitHub and Jira play inline.
- **Keep it short**: one behavior per video, under about 20 s after trimming.

## Before-state captures

- **Take "before" from the base branch**: check out the changed files from it, capture, then restore them from `HEAD`. Do not use a stash, which captures nothing once the fix is committed.
- **Confirm the restore**: the working tree must match `HEAD` again before anything else runs.
