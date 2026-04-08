---
id: TASK-7
title: Migrate vee-validate from v2 to v4
status: In Progress
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:55'
updated_date: '2026-04-08 13:40'
labels: []
milestone: m-0
dependencies:
  - TASK-1
priority: high
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Migrate vee-validate from v2 (directive-based) to v4 (composition-based).

**Install:** `vee-validate@4` + `@vee-validate/rules`

**Files affected:**
- `src/components/TaggingInput.vue` — uses `v-validate` directive and `this.$validator.errors`
- `src/demos/Inputs.vue` — uses `v-validate` directive and `errors.first()`

**v2 → v4 pattern change:**
```html
<!-- v2 -->
<input v-validate="'required|between:0,100'" />
<span>{{ errors.first('field') }}</span>

<!-- v4 -->
<Field name="field" rules="required" v-slot="{ field, errors }">
  <input v-bind="field" />
  <span>{{ errors[0] }}</span>
</Field>
```

**Additional changes:**
- Remove `Vue.use(VeeValidate)` from router.ts (handled in TASK-4)
- `this.$validator.errors.items` → use `useForm()` or `useField()` composables
- Register rules explicitly with `defineRule()` instead of global install
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 vee-validate@4 installed
- [ ] #2 No v-validate directives remain
- [ ] #3 No this.$validator references remain
- [ ] #4 Validation still works in TaggingInput
- [ ] #5 Validation demo in Inputs.vue works
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Key findings
- vee-validate was removed entirely in TASK-1 — needs reinstalling as v4 (latest: 4.15.1)
- Both consuming files (TaggingInput.vue, Inputs.vue) are class-component files being converted in TASK-11 and TASK-16 — partial vee-validate changes to class-component files would create messy half-converted code
- This task installs the package and creates validation infrastructure only; actual component updates happen in TASK-11 and TASK-16

### Subtask 1: Install vee-validate@4 and @vee-validate/rules
- Add `vee-validate@^4.15.1` to dependencies in package.json
- Add `@vee-validate/rules` to dependencies in package.json
- Run pnpm install and verify no errors

### Subtask 2: Create src/composables/useValidation.ts
- Import `defineRule`, `useField`, `useForm` from `vee-validate`
- Import rules `required`, `between`, `min`, `max`, `email` from `@vee-validate/rules`
- Register each rule with `defineRule()` at module level (runs once on first import)
- Re-export `useField` and `useForm` for component convenience — components import from this file rather than directly from vee-validate

### Pattern for TASK-11 (TaggingInput.vue)
```ts
import { useField } from '../composables/useValidation'

const { errorMessage, validate } = useField(
  () => props.name,
  () => props.inputValidation
)
// In onAdd(): await validate(); if (errorMessage.value) emit('error', ...)
```

### Pattern for TASK-16 (Inputs.vue)
```ts
import { useField } from '../composables/useValidation'

const { value: numberInputValue, errorMessage: numberInputError } =
  useField('numberinputExample', 'required|between:0,100')
```
Template: remove `v-validate` directive and `errors.first()`, use `:error="numberInputError"` directly.

### Verification Plan
- Confirm pnpm install succeeds with no peer dep errors
- Code review: useValidation.ts registers all rules correctly and re-exports useField/useForm
- Full functional verification (validation fires on bad input, error messages display) deferred to TASK-11 and TASK-16
<!-- SECTION:PLAN:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
