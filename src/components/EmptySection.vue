<template>
  <div class="s-empty-section">
    <i class="icon-search" v-if="variation === 'search'"></i>
    <i class="icon-empty" v-if="variation === 'text'"></i>
    <i class="icon-lock" v-if="variation === 'prime'"></i>
    <i class="icon-error" v-if="variation === 'warning'"></i>

    <div v-if="titleSlot" class="s-empty-section__title">
      <slot name="title"></slot>
    </div>
    <div v-else class="s-empty-section__title">{{ title }}</div>
    <div class="s-empty-section__subtitle">{{ subtitle }}</div>
    <slot></slot>

    <div v-if="hasLink">
      <slot name="link"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variation?: string;
    title?: string;
    subtitle?: string;
    titleSlot?: boolean;
    hasLink?: boolean;
  }>(),
  {
    variation: "text",
    title: "Streamlabs.com",
    subtitle: "",
    titleSlot: false,
    hasLink: false,
  }
);
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-empty-section {
  width: 100%;
  height: 100%;
  .padding();
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;

  > i {
    font-size: 40px;
    color: @light-4;
    .margin-bottom(4);
  }
}

.s-empty-section__title {
  color: @day-title;
  font-size: 16px;
  font-weight: @medium;
  .margin-bottom(2);
}

.s-empty-section__subtitle {
  color: @day-paragraph;
  font-size: 14px;
  .margin-bottom(2);
}

.s-spinner__bar {
  fill: @dark-2;
  opacity: 0.24;
}

.night,
.night-theme {
  > i {
    color: @dark-5;
  }
  .s-spinner__bar {
    fill: @light-2;
  }
  .s-empty-section__title {
    color: @night-title;
  }
  .s-empty-section__subtitle {
    color: @night-paragraph;
  }
}
</style>
