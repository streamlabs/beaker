---
id: TASK-4
title: Update router.ts to Vue Router 4
status: Done
assignee:
  - claude
created_date: '2026-04-07 23:55'
updated_date: '2026-04-08 13:03'
labels: []
milestone: m-0
dependencies:
  - TASK-1
priority: high
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Migrate `src/router.ts` from Vue Router 3 to Vue Router 4.

**Changes required:**
- Replace `import Router from 'vue-router'` with named imports: `import { createRouter, createWebHistory } from 'vue-router'`
- Remove `Vue.use(Router)` (handled via `app.use(router)` in main.ts)
- Remove `Vue.use(VeeValidate)` — vee-validate v4 no longer uses Vue.use()
- Replace `export default new Router({...})` with `export default createRouter({ history: createWebHistory(), routes: [...] })`
- Update wildcard catch-all route: `path: '*'` → `path: '/:pathMatch(.*)*'`
- Verify dynamic route generation from `demos.map()` still works
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 createRouter() and createWebHistory() used
- [x] #2 No Vue.use() calls in router.ts
- [x] #3 Wildcard route updated to Vue Router 4 syntax
- [ ] #4 All demo routes resolve correctly
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Key findings
- `import.meta.glob` in demos/index.ts already returns lazy-loading functions — Vue Router 5 compatible, no changes needed
- `createWebHistory(import.meta.env.BASE_URL)` reads the `/beaker/` base from Vite config automatically
- Only two removals: `Vue.use(Router)` (moved to main.ts in TASK-3) and `Vue.use(VeeValidate)` (vee-validate v4 needs no registration)
- Single file change — no subtasks needed

### Rewrite src/router.ts
- Replace `import Vue from "vue"` and `import Router from "vue-router"` with `import { createRouter, createWebHistory } from "vue-router"`
- Remove `import VeeValidate from "vee-validate"` and both `Vue.use()` calls
- Replace `new Router({...})` with `createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes: [...] })`
- Update wildcard route: `path: "*"` → `path: "/:pathMatch(.*)*"`
- Simplify `demos.map()` using shorthand object syntax

### Verification Plan
- Manual: confirm `pnpm build` runs without errors
- No unit tests needed — router config is verified by the build and app mount
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
router.ts rewritten for Vue Router 5. Single file change.

**Changes:**
- `import Router from "vue-router"` → `import { createRouter, createWebHistory } from "vue-router"`
- Removed `import Vue`, `import VeeValidate`, both `Vue.use()` calls
- `new Router({...})` → `createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes: [...] })`
- Wildcard route: `path: "*"` → `path: "/:pathMatch(.*)*"`
- `demos.map()` simplified to shorthand object syntax — unchanged in behaviour

**Build failure:** `pnpm build` fails due to `vite-plugin-vue2` requiring `vue-template-compiler@2.6.x` which was removed when upgrading to Vue 3. This is the expected state — build will pass after TASK-19 (Vite 8 + @vitejs/plugin-vue swap). DoD item #1 deferred to TASK-19.

**AC #4** (all demo routes resolve correctly) deferred — verifiable only after component migration and TASK-19 are complete.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
