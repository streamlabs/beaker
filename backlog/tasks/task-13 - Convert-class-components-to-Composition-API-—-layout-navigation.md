---
id: TASK-13
title: Convert class components to Composition API — layout & navigation
status: To Do
assignee: []
created_date: '2026-04-07 23:56'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-4
  - TASK-8
  - TASK-9
priority: high
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert layout and navigation components to `<script setup>`.

**Components to convert:**
- `Tabs.vue`
- `TabsNew.vue`
- `ScrollNav.vue`
- `PaneDropdown.vue`
- Any sidebar, header, or navigation wrapper components

These components tend to have more complex logic (scroll tracking, active state, router-link integration). Pay attention to:
- `Tabs.vue` and `TabsNew.vue` use `router-link` — verify Vue Router 4 compatibility
- `ScrollNav.vue` has ResizeObserver cleanup in lifecycle hooks
- `PaneDropdown.vue` has dynamic `v-on` and `$listeners` usage (covered in TASK-8)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No decorator syntax in layout/nav components
- [ ] #2 All components use script setup
- [ ] #3 Tab navigation and router-link work correctly
- [ ] #4 ScrollNav scroll tracking works
- [ ] #5 Dropdowns open/close correctly
<!-- AC:END -->
