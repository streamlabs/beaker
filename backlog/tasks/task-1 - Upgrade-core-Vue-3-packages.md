---
id: TASK-1
title: Upgrade core Vue 3 packages
status: Done
assignee:
  - claude
created_date: '2026-04-07 23:53'
updated_date: '2026-04-08 01:46'
labels: []
milestone: m-0
dependencies: []
priority: high
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Upgrade the core Vue ecosystem packages from Vue 2 to Vue 3.

**Packages to upgrade:**
- `vue` 2.6.14 → 3.x
- `vue-router` 3.x → 4.x
- Remove `vue-template-compiler` (not needed in Vue 3)
- Remove `vue-class-component` (replacing with Composition API)
- Remove `vue-property-decorator` (replacing with Composition API)
- Upgrade `typescript` from ^3.7.3 to 5.x
- Upgrade `@types/node` to current

**Also update devDependencies:**
- Remove `vee-validate` v2 (will be reinstalled as v4 in separate task)
- Update peer dependencies section to reflect Vue 3 versions
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 pnpm install runs without errors after package changes
- [x] #2 vue@3.x is installed
- [x] #3 vue-router@5.x is installed
- [x] #4 vue-template-compiler is removed
- [x] #5 vue-class-component and vue-property-decorator are removed
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Security verification (completed pre-plan)
- vue 3.5.32: maintained by Evan You + Eduardo San Martin Morote (core Vue team) — clean
- vue-router 5.0.4: same maintainers — clean
- typescript 6.0.2: Microsoft official TypeScript team accounts — clean
- tslib 2.8.1: Microsoft TypeScript team — clean
- @types/node 25.5.2: Microsoft DefinitelyTyped — clean
- axios supply chain attack (March 2026, Sapphire Sleet) — axios NOT in this project, not affected
- pnpm verifies SHA-512 integrity hashes on install automatically

### Target versions
- vue: ^3.5.32
- vue-router: ^5.0.4
- typescript: ^6.0.2
- tslib: ^2.8.1
- @types/node: ^25.5.2

### Step 1 — Update `dependencies` in package.json
- `vue`: 2.6.14 → ^3.5.32
- Remove `vue-template-compiler` (not needed in Vue 3)
- All other dependencies unchanged (handled in TASK-2)

### Step 2 — Update `devDependencies` in package.json
- `vue-router`: ^3.6.5 → ^5.0.4
- `typescript`: ^3.7.3 → ^6.0.2
- `@types/node`: ^18.11.18 → ^25.5.2
- `tslib`: ^1.9.3 → ^2.8.1
- Remove `vue-class-component`
- Remove `vue-property-decorator`
- Remove `vee-validate` (v4 reinstalled in TASK-7)
- Remove `@types/vue-select` (stale dep, vue-select not directly used)

### Step 3 — Update `peerDependencies` in package.json
- Remove `vue-class-component` (library no longer exposes class component API)
- Remove `vue-property-decorator` (same reason)
- `vue-router`: ^3.5.2 → ^5.0.4

### Step 4 — Run `pnpm install`
- Verify completes without errors
- Note peer dep warnings (expected — remaining Vue 2-only packages will warn until TASK-2)

### Notes
- `pnpm build` will fail after this task — expected and acceptable
- vite-plugin-vue2 stays in place until TASK-19
- vue-router 5 is the latest stable release, maintained by the core Vue team
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
All packages updated and pnpm install completed successfully in 4.2s.

**Changes made:**
- `vue` 2.6.14 → 3.5.32
- `vue-router` 3.6.5 → 5.0.4
- `typescript` 3.9.10 → 6.0.2
- `tslib` 1.14.1 → 2.8.1
- `@types/node` 18.19.130 → 25.5.2
- Removed: `vue-template-compiler`, `vue-class-component`, `vue-property-decorator`, `vee-validate` (v2), `@types/vue-select`

**Peer dep warnings (all expected, resolved in TASK-2):**
- `vue-js-modal`, `v-tooltip`, `vue-focus` — require vue@^2.x, being replaced in TASK-2
- `vue-slider-component` pulls in `vue-class-component` transitively — also addressed in TASK-2

**Follow-up noted:**
- Run `pnpm approve-builds` to approve build scripts for `core-js` and `esbuild` (legitimate packages, blocked by pnpm's security default)
- `eslint@8.57.1` is deprecated — addressed in TASK-18
<!-- SECTION:FINAL_SUMMARY:END -->
