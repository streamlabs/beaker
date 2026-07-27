<template>
  <div :class="['s-toggle', toggleClass]">
    <button
      type="button"
      v-for="(val, key) in values"
      :key="key"
      :title="capitalize(key)"
      @click="$emit('update:modelValue', key)"
      :class="[
        's-toggle__option',
        { 's-toggle__option--active': modelValue === key },
      ]"
      v-html="val"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ compatConfig: { MODE: 3 } });

const props = defineProps<{
  values: Record<string | number, string>;
  modelValue: string;
  variation?: string;
}>();

defineEmits<{
  'update:modelValue': [key: string];
}>();

const toggleClass = computed(() =>
  props.variation ? `s-toggle--${props.variation}` : undefined,
);

function capitalize(value: string): string {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}
</script>

<style lang="less">
@import (reference) './../styles/Imports';

.s-toggle {
  display: inline-flex;
  .transition();
  .weight(@medium);

  &__option {
    .padding();
    border: none;
    font-size: 14px;
    background-color: @day-section;
    color: @icon;
    .transition();
    outline: none;
    display: flex;
    font-family: 'Roboto', sans-serif;

    &--active {
      background-color: @dark-2;
      color: @white;
    }

    &:first-of-type {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-of-type {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  &--text {
    .s-toggle__option {
      padding: 8px 6px;
      line-height: 1.2;
      font-weight: 400;

      &:first-child {
        padding-left: 8px;
      }

      &:last-child {
        padding-right: 8px;
      }

      &--active {
        background-color: @day-section;
        color: @dark-2;
        font-weight: 500;
      }
    }
  }
}

.night,
.night-theme {
  .s-toggle {
    &__option {
      background-color: @dark-4;

      &--active {
        background-color: @dark-2;
      }
    }

    &--text {
      .s-toggle__option {
        &--active {
          background-color: @dark-4;
          color: @white;
        }
      }
    }
  }
}
</style>
