<template>
  <div class="left-navigation">
    <Toggle
      :values="themes"
      :model-value="theme"
      @update:model-value="onThemeChange"
    />
    <div class="left-navigation-section">
      <h4>Essentials</h4>
      <RouterLink to="installation">Installation</RouterLink>
      <RouterLink to="assets">Assets</RouterLink>
      <RouterLink to="colors">Colors</RouterLink>
      <RouterLink to="icons">Icons</RouterLink>
      <RouterLink to="typography">Typography</RouterLink>
    </div>
    <div class="left-navigation-section">
      <h4>Components</h4>
      <template v-for="{ name, label } in componentDemos" :key="name">
        <RouterLink :to="name">{{ label }}</RouterLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import demos from '../demos';
import { computed } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import Toggle from '../components/Toggle.vue';

const EXCLUDED_DEMO_PAGES = [
  'assets',
  'colors',
  'installation',
  'left-navigation',
  'navigations',
  'icons',
  'typography',
];

const componentDemos = demos.filter(
  ({ name }) => !EXCLUDED_DEMO_PAGES.includes(name),
);

const isDark = useDark({
  valueDark: 'night night-theme',
  valueLight: 'day',
});

const toggleDark = useToggle(isDark);

const theme = computed(() => (isDark.value ? 'night' : 'day'));
const themes = { day: 'Day', night: 'Night' } as const;

function onThemeChange(value: string) {
  toggleDark(value === 'night');
}
</script>

<style lang="less" scoped>
@import (reference) './../styles/Imports';

.left-navigation {
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    .weight(@medium);
    .padding-v-sides();
    display: block;

    &.router-link-exact-active {
      color: @day-primary;
    }
  }

  .s-toggle {
    .margin-bottom(3);
  }
}

.left-navigation-section {
  .margin-bottom(2);

  h4 {
    .margin-bottom();
  }
}

.night,
.night-theme {
  .left-navigation {
    .router-link-exact-active {
      color: @primary;
    }
  }
}
</style>
