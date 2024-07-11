<template>
  <div class="s-loader" :swapMode="swapMode">
    <div
      :class="{
        's-loader__bg--semi': semiOpaque,
        's-loader--modeswap': swapMode,
        's-loader--fixed': fixedBackground,
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
import Spinner from "./../components/Spinner.vue";
import Button from "./../components/Button.vue";
import { onMounted, ref } from "vue";

interface Props {
  loadingStrs?: string[];
  semiOpaque?: boolean;
  isRandom?: boolean;
  swapMode?: boolean;
  fixedBackground?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loadingStrs: () => [""],
  semiOpaque: false,
  isRandom: false,
  swapMode: false,
  fixedBackground: true,
});

const index = ref(0);
const loaderText = ref("");

function loopText() {
  loaderText.value = props.loadingStrs[index.value];
  index.value++;
  if (index.value === props.loadingStrs.length) {
    index.value = 0;
  }
  setTimeout(loopText, 4000);
}

function loopRandomText() {
  const randomIndex = Math.floor(Math.random() * props.loadingStrs.length);
  if (loaderText.value === props.loadingStrs[randomIndex]) {
    loopRandomText();
  } else {
    loaderText.value = props.loadingStrs[randomIndex];
    setTimeout(loopRandomText, 4000);
  }
}

function distinguishNumberOfArrays() {
  if (props.loadingStrs.length > 1) {
    if (props.isRandom) {
      loopRandomText();
    } else {
      loopText();
    }
  } else {
    loaderText.value = props.loadingStrs?.[0];
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
