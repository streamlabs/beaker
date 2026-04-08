---
id: TASK-19
title: Upgrade Vite to v8 and swap Vue plugin
status: To Do
assignee: []
created_date: '2026-04-07 23:57'
labels: []
milestone: m-0
dependencies:
  - TASK-17
  - TASK-18
priority: high
ordinal: 19000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Final infrastructure step — upgrade Vite and swap the Vue plugin once all components are on Vue 3.

**Changes:**
- `vite` ^4.5.2 → ^8.0.0
- Remove `vite-plugin-vue2`
- Install `@vitejs/plugin-vue`
- Update both config files:
  - `vite.config.js`: `createVuePlugin()` → `vue()`
  - `vite-publish.config.js`: same swap
- Update pnpm-lock.yaml

**This task is the final gate** — do not do this until all components are on Vue 3 (`vite-plugin-vue2` does not support Vite 8).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 vite@8.x installed
- [ ] #2 @vitejs/plugin-vue installed
- [ ] #3 vite-plugin-vue2 removed
- [ ] #4 pnpm dev starts without errors
- [ ] #5 pnpm build succeeds
- [ ] #6 pnpm build:publish produces dist/ output
<!-- AC:END -->
