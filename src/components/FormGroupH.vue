<template>
  <div class="s-form-group-h">
    <!-- title -->
    <div class="s-form-group-h__title">
      <label>{{ title }}</label>
      <i
        v-if="tooltip"
        v-tooltip.auto="tooltip"
        class="s-tooltip icon-question"
      />
    </div>

    <div class="s-form-group-h__input-wrapper">
      <slot name="input"></slot>

      <div class="s-form-group-h__help-text" v-if="helpText">
        {{ helpText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  helpText: string;
  tooltip: string;
  title: string;
}
defineProps<Props>();
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-form-group-h {
  .margin-bottom(2);
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-column-gap: 16px;
  grid-row-gap: @spacing;

  .s-tooltip {
    .margin-left();
  }
}

.s-form-group-h__title {
  grid-column: col-start / span 12;
}

.s-form-group-h__input-wrapper {
  grid-column: col-start / span 12;
}

@media (min-width: 980px) {
  .s-form-group-h__title {
    grid-column: col-start / span 3;
  }

  .s-form-group-h__input-wrapper {
    grid-column: col-start 4 / span 9;
  }
}

.s-form-group-h__help-text {
  color: @label;
  font-size: 13px;
  .margin-top();
}
</style>
