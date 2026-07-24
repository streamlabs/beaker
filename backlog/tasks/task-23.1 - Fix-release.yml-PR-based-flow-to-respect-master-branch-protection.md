---
id: TASK-23.1
title: 'Fix release.yml: PR-based flow to respect master branch protection'
status: Done
assignee: []
created_date: '2026-07-24 22:58'
updated_date: '2026-07-24 23:02'
labels:
  - ci-cd
  - bugfix
dependencies: []
parent_task_id: TASK-23
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The "Release" button workflow (release.yml) added in TASK-23 fails: it tries to git push a version-bump commit + tag directly to master, but master has branch protection requiring all changes go through a pull request with a passing "ci" status check (required_approving_review_count is 0, but direct pushes are still hard-blocked — confirmed via a real failed run, GH006 "Protected branch update failed", error: "Changes must be made through a pull request"). No bypass list is configured for this rule, and the user chose the PR-based redesign over provisioning a bypass credential (discussed tradeoffs: a dedicated bypass-capable token needs to be created/rotated and only used in this one workflow, vs. no new credential but one extra manual "merge PR" click per release).

Confirmed no tag protection rules or rulesets exist on the repo (only the one classic branch protection rule on master), so pushing a tag directly (not a branch commit) is NOT blocked — only pushes to refs/heads/master itself are blocked.

Redesign:
1. Modify .github/workflows/release.yml: instead of committing+tagging+pushing directly to master, create a branch (e.g. release/v<version>), commit the version bump there, push that branch, and open a PR into master via `gh pr create` (needs `pull-requests: write` permission added). Do NOT create/push a tag in this workflow anymore.
2. Add a new workflow (e.g. .github/workflows/tag-release.yml) triggered on push to master: checks whether package.json's version changed vs the previous commit (fetch-depth: 2 diff, same pattern originally considered during TASK-23 planning before the button design was chosen), and if so, creates and pushes just an annotated tag `v<version>` to that already-merged commit. This is a tag push only, not a branch push, so it isn't blocked by the "required pull request" rule.
3. No changes needed to the existing publish.yml (tag-triggered) or deploy-pages.yml (master-push-triggered) — both continue to work unchanged once the tag lands / the PR merges.

New end-to-end flow: click "Release" → bot opens a PR with the version bump → user reviews and merges it (satisfying branch protection + required ci check) → merge triggers both the new tag-creation workflow (which triggers publish.yml) and the existing deploy-pages.yml, automatically.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 release.yml no longer pushes directly to master; it creates a release branch, commits the version bump there, and opens a PR into master
- [x] #2 release.yml has pull-requests: write permission for the gh pr create step
- [x] #3 A new workflow detects a version change on push to master and pushes only a tag (no commit) for that version, triggering the existing publish.yml
- [x] #4 Existing publish.yml and deploy-pages.yml are unmodified
- [x] #5 Both workflow YAML files parse successfully
- [x] #6 README.md's release documentation is updated to describe the new PR-based flow (click Release -> review/merge the generated PR -> publish + deploy happen automatically)
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Rewrote release.yml to open a PR (branch release/vX.Y.Z) instead of pushing the version bump directly to master, since master's branch protection hard-blocks direct pushes regardless of permissions. Added pull-requests: write permission and a `gh pr create` step. Added a new tag-release.yml that triggers on push to master (path-filtered to package.json), diffs the version against the previous commit via jq, and — only if it changed — pushes just a tag (not a branch commit) for that version; tag pushes aren't covered by the "required pull request" rule since they're a different ref namespace (refs/tags/* vs refs/heads/master), confirmed via the GitHub API that no tag protection rules or rulesets exist on this repo. That tag continues to trigger the existing, unmodified publish.yml. Updated README's release section to describe the new flow: click Release -> review/merge the generated PR -> publish + Pages deploy happen automatically from the merge. Verified both workflow files parse via js-yaml and sanity-checked the jq version-diff logic locally. Not yet tested end-to-end on GitHub (requires an actual workflow_dispatch run + PR merge) since that can only be verified after this PR merges.
<!-- SECTION:FINAL_SUMMARY:END -->
