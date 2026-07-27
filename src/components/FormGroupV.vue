<template>
  <div class="s-form-group-v">
    <!-- title -->
    <div :style="titleLayoutStyle" class="s-form-group-v__title">
      <template v-if="!$slots.header">
        <label v-if="title">{{ title }}</label>
        <i
          v-if="tooltip"
          v-tooltip.auto="tooltip"
          class="tooltip icon-question"
        ></i>
      </template>
      <slot name="header"></slot>
    </div>

    <div class="s-form-group-v__input-wrapper">
      <slot name="input"></slot>

      <div class="s-form-group-v__help-text" v-if="helpText">
        {{ helpText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({ compatConfig: { MODE: 3 } });

const props = withDefaults(
  defineProps<{
    helpText?: string;
    title?: string;
    tooltip?: string;
    titleLayout?: string;
  }>(),
  { tooltip: "", titleLayout: "space-between" }
);

const titleLayoutStyle = computed(() => ({ "justify-content": props.titleLayout }));
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-form-group-v {
  .margin-bottom(2);

  .s-tooltip {
    .margin-left();
  }
}

.s-form-group-v__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .margin-bottom();
  font-size: 12px;

  &--hidden {
    margin-bottom: 0;
  }

  label {
    .margin-right();
  }
}

.s-form-group-v__input-wrapper {
  grid-column: col-start / span 12;
}

.s-form-group-v__help-text {
  color: @label;
  font-size: 13px;
  .margin-top();
}
</style>
