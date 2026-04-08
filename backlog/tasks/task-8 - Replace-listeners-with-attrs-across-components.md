---
id: TASK-8
title: Replace $listeners with $attrs across components
status: In Progress
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:55'
updated_date: '2026-04-08 13:59'
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

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Key findings
- 14 files affected (task originally listed 7 — additional files found: VirtualItem, Selector, ModalComp, ModalPrimeIntro, ModalPrime, ModalSubscribe, Pagination, BannerDiscord)
- Three distinct patterns to migrate

### Migration rules
| Vue 2 | Vue 3 |
|---|---|
| `v-on="$listeners"` | `v-bind="$attrs"` |
| `omit(this.$listeners, ["input"])` | `omit(this.$attrs, ["onInput"])` |
| `this.$listeners.click` | `this.$attrs.onClick` |

### Subtask 1: Fix filteredListeners and conditional check (TextInput, TextArea, VirtualItem)
- `TextInput.vue`: change `omit(this.$listeners, ["input"])` → `omit(this.$attrs, ["onInput"])` in `filteredListeners` computed; add `inheritAttrs: false` to `@Component({})` options
- `TextArea.vue`: same as TextInput — change `omit(this.$listeners, ["input"])` → `omit(this.$attrs, ["onInput"])`; add `inheritAttrs: false` to `@Component({})`
- `VirtualItem.vue`: change `if (this.$listeners.click)` → `if (this.$attrs.onClick)`
- Note: `inheritAttrs: false` is critical for TextInput and TextArea — they forward attrs to an inner `<input>` element, not the root, so without it attrs would be applied twice

### Subtask 2: Replace v-on="$listeners" with v-bind="$attrs" (11 files)
- `ModalBasic.vue` — 1 instance
- `ModalConfirmation.vue` — 1 instance
- `ModalRedirect.vue` — 1 instance
- `ModalComp.vue` — 6 instances
- `ModalPrimeIntro.vue` — 2 instances
- `ModalPrime.vue` — 2 instances
- `ModalSubscribe.vue` — 1 instance
- `Slider.vue` — 1 instance
- `Selector.vue` — 1 instance
- `Pagination.vue` — 1 instance
- `BannerDiscord.vue` — 1 instance
- These components forward to child Vue components (not DOM elements) — full inheritAttrs evaluation deferred to TASK-11-15 rewrites

### Verification Plan
- Run `grep -r "\$listeners" src/` to confirm zero references remain
- Code review: `filteredListeners` in TextInput and TextArea returns `omit(this.$attrs, ["onInput"])` and both have `inheritAttrs: false`
- Code review: VirtualItem uses `this.$attrs.onClick` for conditional check
- Full functional verification deferred to TASK-11-15 when components are converted to Composition API
<!-- SECTION:PLAN:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
