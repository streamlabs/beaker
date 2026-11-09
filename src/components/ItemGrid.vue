<template>
  <div class="s-item-grid">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{ items?: object[] }>();
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 16px;
}
</style>
