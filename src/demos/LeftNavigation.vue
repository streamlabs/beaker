<template>
  <div class="left-navigation">
    <div class="left-navigation-section">
      <h4>Essentials</h4>
      <router-link to="installation">Installation</router-link>
      <router-link to="colors">Colors</router-link>
      <router-link to="icons">Icons</router-link>
      <router-link to="typography">Typography</router-link>
    </div>
    <div class="left-navigation-section">
      <h4>Components</h4>
      <template v-for="{ name, label } in componentDemos" :key="name">
        <router-link :to="name">{{ label }}</router-link>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import demos from "../demos";

const EXCLUDE_FROM_COMPONENT_DEMOS = [
  "assets",
  "colors",
  "installation",
  "left-navigation",
  "navigations",
  "icons",
  "typography",
];

const componentDemos = ref(
  demos.filter(({ name }) => !EXCLUDE_FROM_COMPONENT_DEMOS.includes(name))
);

const props = defineProps<{ activeSection: string }>();
const emit = defineEmits(["update-section"]);

function changeSection(selectedSection: string) {
  emit("update-section", selectedSection);
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
