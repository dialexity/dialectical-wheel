---
description: Bump package version (patch/minor/major), commit, tag, and push — or re-point the current tag to HEAD
argument-hint: patch | minor | major | retag
allowed-tools: [Read, Bash]
---

# Version Bump, Tag & Push

Bump the project version, commit, tag, and push in one step. Argument: `$ARGUMENTS`
(defaults to `patch` if empty). Execute every step without asking for confirmation.

Accepted arguments:
- `patch` | `minor` | `major` — increment that part of the version (default `patch`)
- `retag` | `push-tag` — do NOT bump; re-point the CURRENT version's tag to HEAD and push it

## Instructions

1. **Detect the manifest and current state**:
   - This project is npm (`package.json`). If instead you find `Cargo.toml`,
     `pyproject.toml`, or another manifest, adapt the bump command to that
     ecosystem (e.g. `cargo`/`uv`) but keep the same commit + tag convention.
   - Read the current version: `node -p "require('./package.json').version"`.
   - Current branch: `git rev-parse --abbrev-ref HEAD`.
   - Confirm a remote exists: `git remote -v` (usually `origin`).

2. **If the argument is `patch` / `minor` / `major` (or empty → `patch`)**:
   - The working tree must be clean of TRACKED changes (`git status --porcelain`
     ignoring untracked). `npm version` refuses to run with uncommitted tracked
     changes — if any exist, STOP and report them; do not commit them yourself
     (that's `/md-commit-push`'s job).
   - Bump, commit, and tag in one step, matching this repo's convention
     (`chore(release): vX.Y.Z` message, `v` tag prefix):
     ```
     npm version <patch|minor|major> -m "chore(release): v%s"
     ```
     This updates `package.json` + `package-lock.json`, creates the commit, and
     creates the `vX.Y.Z` tag.
   - Push the commit and the new tag together:
     ```
     git push origin <branch> --follow-tags
     ```

3. **If the argument is `retag` / `push-tag`** (move the existing tag to the tip):
   - Read the current version `V` from the manifest; the tag is `vV`.
   - Force-update the tag to point at HEAD and push it:
     ```
     git tag -f "vV" && git push origin "vV" --force
     ```
   - Do NOT bump the version or create a new commit in this mode.

4. **Report the outcome**: the old → new version, the tag name, the pushed
   branch, and the tag. If no remote is configured, do the local bump/tag and
   report "Tagged locally (no remote configured)".
