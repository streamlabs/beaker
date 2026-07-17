---
id: TASK-2
title: Audit and replace Vue 2-only third-party packages
status: Done
assignee:
  - claude
created_date: '2026-04-07 23:54'
updated_date: '2026-04-08 03:05'
labels: []
milestone: m-0
dependencies: []
priority: high
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Evaluate each Vue 2-only package and migrate to Vue 3 compatible alternatives.

**Packages needing replacement:**
- `v-tooltip` v2 → `floating-vue` (same author, Vue 3 successor)
- `vue-js-modal` → `vue-final-modal` or `@headlessui/vue`
- `vuejs-paginate` → not maintained for Vue 3, find alternative (e.g. `vue-awesome-paginate` or build a simple component)
- `vue-focus` → implement as a custom Vue 3 directive (trivial, no package needed)
- `vue-click-outside` → use `@vueuse/core` `onClickOutside` composable
- `vue-clipboard2` → use browser Clipboard API directly or `useClipboard` from `@vueuse/core`

**Packages to verify Vue 3 support and upgrade:**
- `vue-multiselect` → check v3.x branch (`@vueform/multiselect` is the maintained Vue 3 fork)
- `vue-color` → check for Vue 3 compatible fork
- `vue-mq` → check for Vue 3 version or replace with a composable
- `vue-slider-component` → check Vue 3 support
- `vue-a11y-utils` → verify Vue 3 compatibility
- `fuse.js` → not Vue-specific, just verify version is current

**Recommendation:** Add `@vueuse/core` as it can replace several of these packages with composables (`onClickOutside`, `useClipboard`, etc.)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 All Vue 2-only packages are replaced or upgraded
- [x] #2 No package in dependencies requires Vue 2 as a peer dependency
- [x] #3 @vueuse/core added if used for replacements
- [x] #4 floating-vue replaces v-tooltip
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Package decisions

| Action | Package | Replacement/Notes |
|---|---|---|
| Replace | `v-tooltip` v2 | `floating-vue` v5.x |
| Replace | `vue-js-modal` | `vue-final-modal` v4.x |
| Replace | `vue-multiselect` | `@vueform/multiselect` (Vue 3 maintained fork) |
| Replace | `vue-mq` | `vue3-mq` |
| Replace | `vue-slider-component` | `@vueform/slider` |
| Replace | `vuejs-paginate` | `vue-awesome-paginate` |
| Replace | `vue-click-outside` | `@vueuse/core` onClickOutside |
| Replace | `vue-clipboard2` | `@vueuse/core` useClipboard |
| Replace | `vue-a11y-utils` | `@vueuse/core` (repo explicitly deprecated in favour of VueUse) |
| Replace | `vue-focus` | Custom v-focus directive in main.ts (no package needed) |
| Upgrade | `vue-color` | v3.3.3 — peer `vue >=2.7.0 <4.0.0`, Vue 3 compatible |
| Upgrade | `fuse.js` | v6.4.3 → v7.3.0 (not Vue-specific) |

### Step 1 — Add new packages to package.json
- `floating-vue` to dependencies
- `vue-final-modal` to dependencies
- `@vueform/multiselect` to dependencies
- `vue3-mq` to dependencies
- `@vueform/slider` to dependencies
- `vue-awesome-paginate` to dependencies
- `@vueuse/core` to dependencies

### Step 2 — Upgrade in place
- `vue-color`: `^2.7.0` → `^3.3.3`
- `fuse.js`: `^6.4.3` → `^7.3.0` (in both devDependencies and peerDependencies)

### Step 3 — Remove Vue 2-only packages
From `dependencies`: `v-tooltip`, `vue-focus`, `vue-a11y-utils`
From `devDependencies`: `vue-js-modal`, `vue-mq`, `vue-multiselect`, `vue-click-outside`, `vue-clipboard2`, `vue-slider-component`, `vuejs-paginate`, `vue-color` (move to dependencies)
From `peerDependencies`: `vue-js-modal`, `vue-mq`, `vue-multiselect`, `vue-click-outside`, `vue-color`, `vue-slider-component`, `vuejs-paginate`

### Step 4 — Run pnpm install and verify peer dep warnings are resolved

### Notes
- Actual component code changes (switching from old to new API) happen in TASK-3 and component conversion tasks (TASK-11 to TASK-17)
- `vue-focus` custom directive implementation happens in TASK-3 when main.ts is updated
- `floating-vue` plugin registration happens in TASK-3
- `vue-final-modal` plugin registration happens in TASK-3
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
All Vue 2-only packages replaced and pnpm install completed in 6.2s with no Vue 2 peer dependency errors.

**Added:**
- `@vueform/multiselect` 2.6.11
- `@vueform/slider` 2.1.10
- `@vueuse/core` 14.2.1
- `floating-vue` 5.2.2
- `fuse.js` 7.3.0 (moved from devDeps to deps, upgraded from 6.x)
- `vue-awesome-paginate` 1.2.0
- `vue-color` 3.3.3 (moved from devDeps to deps, upgraded from 2.x)
- `vue-final-modal` 4.5.5
- `vue3-mq` 3.2.0 (note: 4.1.0 is available — can upgrade separately if needed)

**Removed:**
- `v-tooltip`, `vue-a11y-utils`, `vue-focus` (from dependencies)
- `vue-click-outside`, `vue-clipboard2`, `vue-js-modal`, `vue-mq`, `vue-multiselect`, `vue-slider-component`, `vuejs-paginate` (from devDependencies)

**Remaining warnings:**
- `eslint@8.57.1` deprecated — addressed in TASK-18
- 15 deprecated subdependencies from legacy eslint ecosystem — also resolved in TASK-18
<!-- SECTION:FINAL_SUMMARY:END -->
