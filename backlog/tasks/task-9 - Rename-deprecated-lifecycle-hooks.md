---
id: TASK-9
title: Rename deprecated lifecycle hooks
status: Done
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:56'
updated_date: '2026-04-08 14:45'
labels: []
milestone: m-0
dependencies:
  - TASK-1
priority: low
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Simple rename of Vue 2 lifecycle hooks that were renamed in Vue 3. Affects 9 components.

**Renames:**
- `beforeDestroy()` → `beforeUnmount()`
- `destroyed()` → `unmounted()`

**Files affected:**
- `src/components/Slider.vue`
- `src/components/SliderTwo.vue`
- `src/components/ScrollNav.vue`
- `src/components/Tabs.vue`
- `src/components/TabsNew.vue`
- `src/components/PaneDropdown.vue`
- `src/components/Selector.vue`
- `src/components/SSProSimulator.vue`
- `src/components/CopyNotification.vue`

Note: `created()`, `mounted()`, `updated()` are unchanged in Vue 3 — do not rename those.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 No beforeDestroy or destroyed hooks remain
- [x] #2 All 9 files updated
- [ ] #3 Cleanup logic in affected components still runs correctly
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Key findings
- 9 files confirmed, matching task description
- beforeDestroy only: SliderTwo.vue, SSProSimulator.vue
- destroyed only: ScrollNav.vue, TabsNew.vue, PaneDropdown.vue, Tabs.vue, Selector.vue, CopyNotification.vue
- Both hooks: Slider.vue
- Pure find-and-replace — no logic changes, no subtasks needed

### Rename deprecated lifecycle hooks across 9 files
- Rename `beforeDestroy()` → `beforeUnmount()` in: Slider.vue, SliderTwo.vue, SSProSimulator.vue
- Rename `destroyed()` → `unmounted()` in: Slider.vue, ScrollNav.vue, TabsNew.vue, PaneDropdown.vue, Tabs.vue, Selector.vue, CopyNotification.vue
- Do NOT rename `created()`, `mounted()`, `updated()` — unchanged in Vue 3

### Verification Plan
- `grep -rn "beforeDestroy\|destroyed()" src/` returns zero results
- Code review: confirm only the hook names changed, no surrounding logic altered
- Build verification deferred to TASK-19
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
All deprecated lifecycle hooks renamed across 9 files in a single pass.

**beforeDestroy → beforeUnmount:** Slider.vue, SliderTwo.vue, SSProSimulator.vue
**destroyed → unmounted:** Slider.vue, ScrollNav.vue, TabsNew.vue, PaneDropdown.vue, Tabs.vue, Selector.vue, CopyNotification.vue

**Verification:** grep returns zero results for both hook names ✓

**Deviations:** None.

**AC #3** (cleanup logic still runs correctly) deferred to TASK-11-15 functional verification.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
