---
id: TASK-10
title: Remove Vue 2 filters
status: Done
assignee: []
created_date: '2026-04-07 23:56'
updated_date: '2026-04-08 14:56'
labels: []
milestone: m-0
dependencies:
  - TASK-1
priority: low
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Filters are removed in Vue 3. One filter exists in the codebase.

**File:** `src/components/Toggle.vue`

**Current pattern:**
```ts
@Component({
  filters: {
    capitalize(value: string) { ... }
  }
})
```
Template: `:title="key | capitalize"`

**Migration:** Convert to a plain method or computed property inside the component. Since it's only used in one place, a local method is simplest — no need for a global utility.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No filters: {} defined in any component
- [ ] #2 No pipe syntax used in templates
- [ ] #3 Toggle.vue capitalize functionality still works
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Folded into TASK-11. Toggle.vue filter removal will happen naturally as part of the Composition API conversion since the entire script block is being rewritten.
<!-- SECTION:FINAL_SUMMARY:END -->
