<template>
  <div
    class="s-colorpicker-container"
    ref="colorpicker"
    :class="{
      's-colorpicker-container__mini': isMini,
      's-colorpicker-container__mini-icon': isMini && icon
    }"
  >
    <input
      v-if="!isMini"
      type="text"
      :value="value"
      :placeholder="placeholder"
      @click="showPicker()"
      @input="updateFromInput"
      :class="{ 's-colorpicker__input--error': error }"
    />

    <div
      class="s-colorpicker__mini-wrapper"
      v-if="isMini"
      @click="showPicker()"
      :class="{ 's-colorpicker__input--error': error }"
    >
      <i :class="icon"></i>
    </div>

    <div v-if="error" class="s-colorpicker__input-error">
      <i class="icon-error"></i>
      {{ error }}
    </div>

    <div
      class="s-colorpicker__preview"
      :style="{ backgroundColor: value }"
      @click="showPicker()"
    ></div>
    <div class="s-colorpicker__preview--alpha"></div>

    <transition name="fade">
      <div v-if="displayPicker" class="s-colorpicker__picker-wrapper">
        <picker
          ref="chrome-color-picker"
          class="s-colorpicker"
          :class="alphaClass"
          :value="colors"
          :disable-alpha="!hasAlpha"
          :disable-fields="!hasAlpha"
          @input="updateFromPicker"
        />
        <input
          v-if="isMini"
          type="text"
          :value="value"
          :placeholder="placeholder"
          @input="updateFromInput"
          v-on="listeners"
          class="s-colorpicker__input--mini"
          :class="{ 's-colorpicker__input--error': error }"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Chrome } from "vue-color";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  inheritAttrs: false,
  components: {
    picker: Chrome
  },
    data() {
      const colors: object = {};
      const backgroundColor: String = "";
      const displayPicker: Boolean = false;
      const $refs: {
              colorpicker: HTMLElement;
            } = undefined;

        return {
            $refs,
            displayPicker,
            backgroundColor,
            colors
        };
    },
    computed: {
        alphaClass() {
            return this.hasAlpha
            ? this.colors["a"] === 1
            ? "nonAlpha"
            : "alpha"
            : false;
        }
    },
    created() {
        this.colors = Object.assign({}, this.colors, {
          hex: this.value
        });
    },
    methods: {
        updateFromPicker(value: any) {
            this.colors = value;
            if (this.alphaClass === "alpha") {
              this.$emit("input", value.hex8);
            } else {
              this.$emit("input", value.hex);
            }
        },
        updateFromInput(event: any) {
            this.colors = event.target.value;
            this.$emit("input", event.target.value);
        },
        hidePicker() {
            document.removeEventListener("click", this.documentClick);
            this.displayPicker = false;
        },
        showPicker() {
            document.addEventListener("click", this.documentClick);
            this.displayPicker = true;
        },
        documentClick(e: any) {
            let el = this.$refs.colorpicker;
            let target = e.target;
            if (el && el !== target && !el.contains(target)) {
              this.hidePicker();
            }
        }
    },
    props: {
        value: {
            type: Object as PropType<any>
        },
        placeholder: { default: "#31c3a2",
            type: String
        },
        hasAlpha: { default: false,
            type: Boolean
        },
        isMini: { default: false,
            type: Boolean
        },
        icon: {
            type: String
        },
        error: {
            type: String
        }
    }
})

</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-colorpicker {
  &-container {
    position: relative;
    display: inline-block;
    width: 225px;
    &__mini {
      width: 38px;
    }
    &__mini-icon {
      width: 70px;
    }
  }

  &__picker-wrapper {
    display: block;
  }

  &__input {
    &--mini {
      width: 225px !important;
    }
  }

  &__mini-wrapper {
    border: 1px solid black;
    border-color: #4f5e65;
    background: transparent;
    color: #ffffff;
    height: 40px;
    border-radius: 4px;
    font-family: "Roboto";
    font-size: 14px;
    i {
      position: absolute;
      top: 12px;
      left: 10px;
      z-index: 1;
    }
  }

  &__preview {
    box-sizing: border-box;
    position: absolute;
    top: 10px;
    right: 8px;
    width: 20px;
    height: 20px;
    border: 1px solid fade(@dark-2, 12%);
    .radius(0.5);
    z-index: 1;

    &--alpha {
      position: absolute;
      top: 11px;
      right: 9px;
      z-index: 0;
      width: 18px;
      height: 18px;
      .radius(0.5);
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMElEQVQ4T2N89uzZfwY8QFJSEp80A+OoAcMiDP7//483HTx//hx/Ohg1gIFx6IcBALl+VXknOCvFAAAAAElFTkSuQmCC");
    }
  }

  &.vc-chrome {
    position: relative;
    left: 0;
    top: 0;
    border-radius: 4px 4px 5px 5px;
    .day-shadow();
  }

  .vc-chrome-active-color {
    border: 1px solid fade(@dark-2, 12%);
    .radius();
  }

  .vc-chrome-body {
    padding: 12px;
    border-radius: 0 0 4px 4px;
  }

  .vc-chrome-toggle-btn,
  .vc-chrome-fields-wrap {
    display: none;
  }

  &.alpha {
    .vc-chrome-fields:not(:nth-child(2)) {
      display: none;
    }

    .vc-chrome-fields:nth-child(2) {
      display: flex;
    }

    .vc-alpha-checkboard-wrap {
      border-radius: 2px 4px 4px 2px;
    }
  }

  &.alpha,
  &.nonAlpha {
    .vc-chrome-color-wrap {
      width: 42px;

      .vc-checkerboard {
        .radius();
      }
    }
  }
}

.night {
  .s-colorpicker {
    &__preview {
      border-color: fade(@white, 16%);
    }

    .vc-chrome-body {
      background-color: @dark-4;
    }

    .vc-chrome-active-color {
      border-color: fade(@white, 16%);
    }
  }
}
</style>
