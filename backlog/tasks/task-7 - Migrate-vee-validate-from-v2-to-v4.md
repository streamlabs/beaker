---
id: TASK-7
title: Migrate vee-validate from v2 to v4
status: To Do
assignee: []
created_date: '2026-04-07 23:55'
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
