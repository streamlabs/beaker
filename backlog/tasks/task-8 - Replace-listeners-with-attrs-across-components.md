---
id: TASK-8
title: Replace $listeners with $attrs across components
status: To Do
assignee: []
created_date: '2026-04-07 23:55'
labels: []
milestone: m-0
dependencies:
  - TASK-1
priority: medium
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
In Vue 3, `$listeners` is removed and merged into `$attrs`. Update all 10 affected components.

**Files affected:**
- `src/components/TextInput.vue` — computed `filteredListeners` uses `this.$listeners`, template uses `v-on="filteredListeners"`
- `src/components/TextArea.vue` — similar pattern to TextInput
- `src/components/ModalBasic.vue` — `v-on="$listeners"`
- `src/components/ModalConfirmation.vue` — `v-on="$listeners"`
- `src/components/ModalRedirect.vue` — `v-on="$listeners"`
- `src/components/Slider.vue` — `v-on="$listeners"`
- `src/components/PaneDropdown.vue` — dynamic v-on pattern

**Migration:**
- `v-on="$listeners"` → `v-on="$attrs"` or `v-bind="$attrs"` (Vue 3 merges both)
- Computed `filteredListeners` using `omit(this.$listeners, [...])` → `omit(this.$attrs, [...])`
- May need to add `inheritAttrs: false` where attribute fallthrough needs controlling
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No $listeners references remain in any component
- [ ] #2 Event forwarding still works in TextInput and TextArea
- [ ] #3 Modal components still forward events correctly
<!-- AC:END -->
