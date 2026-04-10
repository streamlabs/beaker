<template>
  <div class="s-loader" :swapMode="swapMode">
    <div
      :class="{
        's-loader__bg--semi': semiOpaque,
        's-loader--modeswap': swapMode,
        's-loader--fixed': fixedBackground
      }"
      class="s-loader__bg"
    >
      <div class="s-loader__inner">
        <Spinner :swap="swapMode" class="s-spinner__overlay" :size="'large'" />
        <div class="s-loader__text">{{ loaderText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Spinner from "./../components/Spinner.vue";

const props = withDefaults(
  defineProps<{
    loadingStrs?: any[] | string;
    semiOpaque?: boolean;
    isRandom?: boolean;
    swapMode?: boolean;
    fixedBackground?: boolean;
  }>(),
  {
    loadingStrs: () => [],
    semiOpaque: false,
    isRandom: false,
    swapMode: false,
    fixedBackground: true,
  }
);

const loaderText = ref("");
const index = ref(0);

function loopText() {
  const strs = props.loadingStrs as any[];
  loaderText.value = strs[index.value];
  index.value++;
  if (index.value === strs.length) index.value = 0;
  setTimeout(loopText, 4000);
}

function loopRandomText() {
  const strs = props.loadingStrs as any[];
  const randomIndex = Math.floor(Math.random() * strs.length);
  if (loaderText.value === strs[randomIndex]) {
    loopRandomText();
  } else {
    loaderText.value = strs[randomIndex];
    setTimeout(loopRandomText, 4000);
  }
}

function distinguishNumberOfArrays() {
  const strs = props.loadingStrs as any[];
  if (strs.length > 1) {
    props.isRandom ? loopRandomText() : loopText();
  } else {
    loaderText.value = strs[0];
  }
}

onMounted(() => {
  if (typeof props.loadingStrs === "string") {
    loaderText.value = props.loadingStrs;
  } else {
    distinguishNumberOfArrays();
  }
});
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-loader__bg {
  position: relative;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: @white;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.s-loader--fixed {
    position: fixed;
  }
}

.s-loader__bg--semi {
  background: @day-overlay;
}

.s-loader__inner {
  width: 100%;
  height: auto;
}

.s-loader__text {
  text-align: center;
  color: @dark-2;
  .weight(@medium);
  .margin-top(3);
  .margin-bottom(0);
}

.s-spinner__overlay {
  .padding-top(0);
}

// in case day/night mode needs to be switched
.s-loader--modeswap {
  background: @dark-3;

  .s-loader__text {
    color: @white;
  }
}

.night,
.night-theme {
  .s-loader__bg {
    background: @dark-3;
  }

  .s-loader__bg--semi {
    background: @night-overlay;
  }

  .s-loader__text {
    color: @white;
  }

  // in case day/night mode needs to be switched
  .s-loader--modeswap {
    background: @white;

    .s-loader__text {
      color: @dark-2;
    }
  }
}
</style>
