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

<script lang="ts">
import Spinner from "./../components/Spinner.vue";
import Button from "./../components/Button.vue";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: { Spinner, Button },
    data() {
        const index: number = 0;
        const loaderText: string = "";

        return {
            loaderText,
            index
        };
    },
    mounted() {
        if (typeof this.loadingStrs === "string") {
          this.loaderText = this.loadingStrs;
        } else {
          this.distinguishNumberOfArrays();
        }
    },
    methods: {
        distinguishNumberOfArrays() {
            if (this.loadingStrs.length > 1) {
              if (this.isRandom) {
                this.loopRandomText();
              } else {
                this.loopText();
              }
            } else {
              this.loaderText = this.loadingStrs[0];
            }
        },
        loopText() {
            this.loaderText = this.loadingStrs[this.index];
            this.index++;
            if (this.index === this.loadingStrs.length) {
              this.index = 0;
            }
            setTimeout(this.loopText, 4000);
        },
        loopRandomText() {
            const randomIndex = Math.floor(Math.random() * this.loadingStrs.length);
            if (this.loaderText === this.loadingStrs[randomIndex]) {
              this.loopRandomText();
            } else {
              this.loaderText = this.loadingStrs[randomIndex];
              setTimeout(this.loopRandomText, 4000);
            }
        }
    },
    props: {
        loadingStrs: { default: [],
            type: Object as PropType<any[] | string>
        },
        semiOpaque: { default: false,
            type: Boolean
        },
        isRandom: { default: false,
            type: Boolean
        },
        swapMode: { default: false,
            type: Object as PropType<Boolean>
        },
        fixedBackground: { default: true,
            type: Boolean
        }
    }
})

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
