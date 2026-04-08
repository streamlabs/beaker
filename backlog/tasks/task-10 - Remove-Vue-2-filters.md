---
id: TASK-10
title: Remove Vue 2 filters
status: To Do
assignee: []
created_date: '2026-04-07 23:56'
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
