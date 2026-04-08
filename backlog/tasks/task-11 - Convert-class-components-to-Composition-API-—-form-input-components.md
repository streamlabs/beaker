---
id: TASK-11
title: Convert class components to Composition API — form & input components
status: To Do
assignee: []
created_date: '2026-04-07 23:56'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-7
  - TASK-8
  - TASK-9
  - TASK-10
priority: high
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert all form and input-related class components from `vue-class-component` + `vue-property-decorator` to `<script setup>` with Composition API.

**Components to convert (check src/components/ for full list):**
- `TextInput.vue`
- `TextArea.vue`
- `TaggingInput.vue`
- `NumberInput.vue` (if exists)
- `Toggle.vue`
- `Checkbox.vue` (if exists)
- `RadioButton.vue` (if exists)
- `Selector.vue`
- `ColorInput.vue` (if exists)

**Pattern change:**
```ts
// Before
@Component
export default class MyComp extends Vue {
  @Prop() value!: string
  @Watch('value') onValueChange() {}
}

// After
<script setup lang="ts">
const props = defineProps<{ value: string }>()
watch(() => props.value, () => {})
</script>
```

**Key conversions:**
- `@Prop` → `defineProps<{}>()`
- `@Watch` → `watch()`
- `@Emit` → `defineEmits<{}>()`  
- `data()` properties → `ref()` / `reactive()`
- `computed` getters → `computed()`
- Methods → plain functions
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No @Component, @Prop, @Watch decorators in any form component
- [ ] #2 All form components use script setup
- [ ] #3 Props and emits are typed with TypeScript generics
- [ ] #4 All form components render and function correctly
<!-- AC:END -->
