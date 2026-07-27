<template>
  <div class="s-form-group">
    <slot name="input"></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({ compatConfig: { MODE: 3 } });

defineProps<{ helpText?: string; tooltip?: string; title?: string }>();
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-form-group {
  .margin-bottom(3);
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 16px;
}
</style>
