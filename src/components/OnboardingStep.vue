<template>
  <div class="s-onboarding-step">
    <h1>
      <slot name="title" />
    </h1>
    <p>
      <slot name="desc" />
    </p>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  desc?: string;
}>();
</script>

<style lang="less">
@import (reference) "./../styles/Imports";
.s-onboarding-step {
  .margin-top(4);
}
</style>
