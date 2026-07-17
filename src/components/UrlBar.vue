<template>
  <div class="s-cs-simulator__web-bar">
    <div class="s-cs-simulator__web-bar-dots">
      <div class="s-cs-simulator__web-bar-dot"></div>
      <div class="s-cs-simulator__web-bar-dot"></div>
      <div class="s-cs-simulator__web-bar-dot"></div>
    </div>
    <div class="s-cs-simulator__url-container">{{ domain }}</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ domain?: string }>(), {
  domain: "https://awkwardraccoon.com",
});
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-cs-simulator__web-bar {
  height: 40px;
  display: grid;
  background-color: @day-section;
  align-items: center;
  position: relative;
  .padding-h-sides();
  .radius-top(2);
}

.s-cs-simulator__web-bar-dots {
  display: flex;
}

.s-cs-simulator__web-bar-dot {
  width: 12px;
  height: 12px;
  .radius(10);
  .margin-right();
  background-color: @light-3;
}

.s-cs-simulator__url-container {
  height: 24px;
  max-width: 400px;
  .padding-h-sides();
  background-color: @white;
  color: @day-paragraph;
  text-align: center;
  .radius();
  position: absolute;
  right: 16%;
  left: 16%;
  margin: 0 auto;
  top: 8px;
  line-height: 24px;
  text-transform: lowercase;
  .weight(@medium);
}

.night,
.night-theme {
  .s-cs-simulator__web-bar {
    background-color: @night-section;
  }

  .s-cs-simulator__web-bar-dots {
    display: flex;
  }

  .s-cs-simulator__web-bar-dot {
    background-color: @dark-4;
  }

  .s-cs-simulator__url-container {
    background-color: @night-bg;
    color: @night-paragraph;
  }
}
</style>
