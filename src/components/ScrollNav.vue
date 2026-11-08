<template>
  <div>
    <div class="s-apps-nav">
      <div
        v-if="hasPrev"
        @click="scrollLeft"
        class="s-apps-nav-control flex s-has-prev"
      >
        <i class="icon-down icon-left"></i>
        <span>...</span>
      </div>
      <div
        ref="scrollable_nav"
        @scroll="calculateScrolls"
        class="s-apps-tab__container"
        :class="{
          's-has-next': hasNext,
          's-has-prev': hasPrev
        }"
      >
        <span
          v-for="item in items"
          :key="item.value"
          @click="navigateItem(item.value)"
          class="s-app-tab"
          :class="{ 's-is-active': item.value === modelValue }"
        >
          <span>{{ item.name }}</span>
        </span>
      </div>
      <div
        v-if="hasNext"
        @click="scrollRight"
        class="s-apps-nav-control flex s-has-next"
      >
        <span>...</span>
        <i class="icon-down icon-right"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, useTemplateRef } from "vue";

interface INavItem {
  name: string;
  value: string;
}

defineProps<{
  items: INavItem[];
  modelValue?: string;
}>();

const emit = defineEmits<{ 'update:modelValue': [item: string] }>();

const scrollableNav = useTemplateRef<HTMLDivElement>("scrollable_nav");

const canScroll = ref(false);
const hasNext = ref(false);
const hasPrev = ref(false);
const scrollIncrement = 100;

function scrollLeft() {
  scrollableNav.value!.scrollLeft -= scrollIncrement;
}

function scrollRight() {
  scrollableNav.value!.scrollLeft += scrollIncrement;
}

function calculateScrolls() {
  const el = scrollableNav.value;
  if (!el) return;
  canScroll.value = el.scrollWidth > el.clientWidth;
  hasPrev.value = el.scrollLeft > 0;
  hasNext.value = el.scrollWidth - (el.scrollLeft + el.clientWidth) > 0;
}

function navigateItem(item: string) {
  emit("update:modelValue", item);
}

onMounted(() => {
  calculateScrolls();
  window.addEventListener("resize", calculateScrolls);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateScrolls);
});
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-apps-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  .padding-h-sides();
  position: relative;
  max-width: none;
  background-color: @day-section;
  border-bottom: 1px solid @day-border;
  flex: 0 0 35px;
  height: 35px;
  z-index: 1;
}

.s-apps-tab__container {
  display: inline-block;
  overflow-x: auto;
  white-space: nowrap;
  overflow-y: hidden;

  &.s-has-prev {
    .margin-left(2);
  }
  &.s-has-next {
    .margin-right(2);
  }
}

.s-apps-nav-control {
  cursor: pointer;

  &.s-has-prev {
    margin-left: 8px;
    i {
      margin-right: 5px;
    }
  }
  &.s-has-next {
    margin-right: 8px;
    i {
      margin-left: 5px;
    }
  }
}

.s-apps-tab__container::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.s-app-tab {
  .padding();
  color: @day-paragraph;
  .weight(@medium);
  cursor: pointer;

  &.s-is-active {
    color: @day-title;
  }
}

.s-app-tab-icon {
  margin-left: 4px;
}

.night-theme {
  .s-apps-nav {
    background-color: @night-bg;
    border-color: @night-border;
  }
  .s-app-tab {
    color: @night-paragraph;

    &.s-is-active {
      color: @night-title;
    }
  }
}
</style>
