<template>
  <div
    class="s-banner-sale"
    :style="{
      'background-color': backgroundColor,
      'border-color': borderColor,
    }"
  >
    <div class="s-banner-sale__wrapper s-header">
      <h1>{{ title }}</h1>
      <p>{{ desc }}</p>
    </div>
    <div class="s-banner-sale__wrapper s-header">
      <h1 class="s-banner-sale__time">
        <span :class="{ 's-banner-sale__time--done': daysDone }">{{
          `${days}d`
        }}</span>
        <span :class="{ 's-banner-sale__time--done': hoursDone }">{{
          `${hours}h`
        }}</span>
        <span :class="{ 's-banner-sale__time--done': minutesDone }">{{
          `${minutes}m`
        }}</span>
        <span :class="{ 's-banner-sale__time--done': secondsDone }">{{
          `${seconds}s`
        }}</span>
      </h1>
      <p>{{ timeDesc }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  title: string;
  desc: string;
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
  timeDesc?: string;
  borderColor?: string;
  backgroundColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
  borderColor: "rgba(248, 86, 64, 0.33)",
  backgroundColor: "rgba(248, 86, 64, 0.08)",
});

const daysDone = computed(() => props.days === "00");
const hoursDone = computed(() => daysDone.value && props.hours === "00");
const minutesDone = computed(() => hoursDone.value && props.minutes === "00");
const secondsDone = computed(() => minutesDone.value && props.seconds === "00");
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-banner-sale {
  display: flex;
  justify-content: space-between;
  .margin-bottom(3);
  .padding(2);
  border-width: 1px;
  border-style: solid;
  .radius();

  h1,
  p {
    margin-bottom: 0;
  }

  p {
    .margin-top();
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__time {
    text-align: right;
    color: @warning;

    &--done {
      opacity: 0.4;
    }

    span {
      .margin-right();
      .transition();

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
