<template>
  <div
    class="s-accordion"
    :class="[accordionClasses]"
    tabindex="0"
    @keydown.space.self.prevent="openContent"
  >
    <div
      class="s-accordion__head"
      :class="{ 'is-open': isOpen }"
      @click="openContent"
    >
      <div class="s-accordion__button">
        <slot name="open-close-icon" :is-open="isOpen">
          <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px">
            <path
              class="s-accordion__svg--back"
              d="M13 14H1a1 1 0 0 1-1-1V1c0-.6.5-1 1-1h12c.6 0 1 .5 1 1v12c0 .6-.4 1-1 1z"
              fill="#e3e8eb"
            />
            <transition name="twist-h">
              <g v-if="!isOpen">
                <path
                  class="s-accordion__svg--line"
                  d="M10 8H4a1 1 0 0 1-1-1c0-.6.5-1 1-1h6c.6 0 1 .5 1 1s-.4 1-1 1z"
                />
                <path
                  class="s-accordion__svg--line"
                  d="M8 4v6c0 .6-.5 1-1 1a1 1 0 0 1-1-1V4c0-.6.5-1 1-1s1 .5 1 1z"
                />
              </g>
            </transition>
            <transition name="twist-v">
              <path
                class="s-accordion__svg--line"
                d="M10 8H4a1 1 0 0 1-1-1c0-.6.5-1 1-1h6c.6 0 1 .5 1 1s-.4 1-1 1z"
                v-if="isOpen"
              />
            </transition>
          </svg>
        </slot>
      </div>
      <div class="s-accordion--title" v-if="hasTitleSlot">
        <slot name="title" />
      </div>
      <div class="s-accordion--title" v-else>{{ accordionTitle }}</div>
    </div>
    <transition
      name="expand"
      @enter="(el) => open(el as HTMLElement)"
      @after-enter="(el) => afterOpen(el as HTMLElement)"
      @leave="(el) => close(el as HTMLElement)"
    >
      <div
        class="s-accordion__content"
        :class="[{ 'is-open': isOpen }, { 'left-nav': leftNav }]"
        v-if="isOpen"
      >
        <slot name="content" :is-open="isOpen" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, useSlots } from 'vue';

const props = defineProps<{
  openedTitle?: string;
  closedTitle?: string;
  title?: string;
  isOpened?: boolean;
  noBorder?: boolean;
  leftNav?: boolean;
  modelValue?: boolean | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [val: boolean];
  'content-opened': [payload: { isOpen: boolean; event: Event }];
}>();

const slots = useSlots();
const isOpen = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    isOpen.value = !!val;
  },
);
watch(isOpen, (val) => {
  emit('update:modelValue', val);
});

const accordionTitle = computed(() => {
  if (props.title !== undefined) return props.title;
  return isOpen.value ? props.openedTitle : props.closedTitle;
});

const hasTitleSlot = computed(() => !!slots.title);

const accordionClasses = computed(() => {
  const classes: string[] = [];
  if (props.noBorder) classes.push('no-border');
  if (props.leftNav) classes.push('left-nav');
  return classes.join(' ');
});

function openContent(event: Event) {
  const target = event.target as HTMLElement;
  const blockedNodes = ['INPUT', 'BUTTON', 'LABEL'];
  if (
    blockedNodes.includes(target.nodeName) ||
    blockedNodes.includes(
      (target.parentNode?.parentNode as HTMLElement)?.nodeName,
    )
  )
    return;
  isOpen.value = !isOpen.value;
  emit('content-opened', { isOpen: isOpen.value, event });
}

function afterOpen(element: HTMLElement) {
  element.style.height = 'auto';
}

function open(element: HTMLElement) {
  const width = getComputedStyle(element).width;
  element.style.width = width;
  element.style.position = 'absolute';
  element.style.visibility = 'hidden';
  element.style.height = 'auto';
  const height = getComputedStyle(element).height;
  element.style.width = '';
  element.style.position = '';
  element.style.visibility = '';
  element.style.height = '0';
  void getComputedStyle(element).height;
  setTimeout(() => {
    element.style.height = height;
  });
}

function close(element: HTMLElement) {
  const height = getComputedStyle(element).height;
  element.style.height = height;
  void getComputedStyle(element).height;
  setTimeout(() => {
    element.style.height = '0';
  });
}

onMounted(() => {
  if (props.modelValue) isOpen.value = props.modelValue;
});
</script>

<style lang="less">
@import (reference) './../styles/Imports';

.s-accordion {
  .margin-bottom(3);
  .padding(2);
  border: 1px solid @day-input-border;
  .radius();
  text-align: left;
  background-color: @day-bg;
  .transition(border);
  outline: none;

  &.no-border {
    border: 1px solid transparent;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.left-nav {
    border: none;
    .padding(0);
    .margin-bottom(0);

    .s-accordion__content {
      .padding-left(0);
    }

    .s-accordion__head {
      &.is-open {
        .margin-bottom(0);
      }
    }

    .s-accordion__button {
      .margin-right(1.5);
    }
  }

  &__head {
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

    &.is-open {
      .margin-bottom(2);
    }

    .s-accordion--title {
      width: 100%;
      color: @day-title;
      transform: translateY(1px); // for better visual alignment;
    }

    &:hover {
      cursor: default;
    }
  }

  &__button {
    display: inline-flex;
    .margin-right(2);
  }

  svg,
  g,
  path {
    transform-origin: 7px 7px;
  }

  &__svg--back {
    fill: @light-3;
  }

  &__svg--line {
    fill: @light-5;
    transform-origin: 7px 7px;
  }

  &--title {
    font-weight: @medium;
    font-size: 14px;
  }
}

.night,
.night-theme {
  .s-accordion {
    border-color: @night-input-border;
    background-color: @night-bg;

    &:focus > .s-accordion {
      border-color: @white;
    }

    &.no-border {
      border: 1px solid transparent;
    }

    &__head {
      .s-accordion--title {
        color: @night-title;
      }
    }

    &__svg--back {
      fill: @dark-5;
    }

    &__svg--line {
      fill: @light-4;
    }
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  height: 0;
  opacity: 0;
}

.twist-h-enter-active,
.twist-h-leave-active {
  transition: all 0.25s ease-in-out;
  transform: rotate(-90deg);
  opacity: 1;
}
.twist-h-enter-from,
.twist-h-leave-to {
  transition: all 0.25s ease-in-out;
  transform: rotate(-90deg);
  opacity: 0;
}

.twist-v-enter-active,
.twist-v-leave-active {
  transition: all 0.25s ease-in-out;
  transform: rotate(-180deg);
  opacity: 1;
}
.twist-v-enter-from,
.twist-v-leave-to {
  transition: all 0.25s ease-in-out;
  transform: rotate(-180deg);
  opacity: 0;
}
</style>
