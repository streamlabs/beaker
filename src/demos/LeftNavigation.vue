<template>
  <div class="left-navigation">
    <div class="left-navigation-section">
      <h4>Essentials</h4>
      <router-link to="installation">Installation</router-link>
      <router-link to="assets">Assets</router-link>
      <router-link to="colors">Colors</router-link>
      <router-link to="icons">Icons</router-link>
      <router-link to="typography">Typography</router-link>
    </div>
    <div class="left-navigation-section">
      <h4>Components</h4>
      <template v-for="{ name, label } in componentDemos">
        <router-link :to="name" :key="name">{{ label }}</router-link>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import demos from "../demos";

const excludeFromComponentDemos = [
  "assets",
  "colors",
  "installation",
  "left-navigation",
  "navigations",
  "icons",
  "typography"
];

const componentDemos = demos.filter(
  ({ name }) => !excludeFromComponentDemos.includes(name)
);

defineProps<{ activeSection: string }>();

const emit = defineEmits<{ "update-section": [activeSection: string] }>();

function changeSection(activeSection: string) {
  emit("update-section", activeSection);
}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";

.left-navigation {
  display: flex;
  flex-direction: column;
  .margin-top(7);

  a {
    text-decoration: none;
    .weight(@medium);
    .padding-v-sides();
    display: block;

    &.router-link-active {
      color: @primary;
    }
  }
}

.left-navigation-section {
  .margin-bottom(2);

  h4 {
    .margin-bottom();
  }
}
</style>
