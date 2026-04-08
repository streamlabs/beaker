---
id: TASK-9
title: Rename deprecated lifecycle hooks
status: To Do
assignee: []
created_date: '2026-04-07 23:56'
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
- [ ] #1 No beforeDestroy or destroyed hooks remain
- [ ] #2 All 9 files updated
- [ ] #3 Cleanup logic in affected components still runs correctly
<!-- AC:END -->
