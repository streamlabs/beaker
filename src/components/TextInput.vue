<template>
  <div
    class="s-form-field"
    :class="{
      's-form-field--with-label': label,
      's-form-field--disabled': disabled
    }"
  >
    <div v-if="type === 'number'" class="s-arrows">
      <div
        :class="{
          's-arrow arrow-up': true,
          's-arrow--disabled': isMaxReached
        }"
        @click="increment"
      >
        <i class="fas fa-caret-up"></i>
      </div>
      <div
        :class="{
          's-arrow arrow-down': true,
          's-arrow--disabled': isMinReached
        }"
        @click="decrement"
      >
        <i class="fas fa-caret-down"></i>
      </div>
    </div>
    <input
      ref="input"
      :type="type"
      :placeholder="placeholder"
      @input="handleInput"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      @blur="$emit('blur')"
      @focus="onFocus"
      @click="onClick"
      @keyup="onKeyUp"
      :autocomplete="autoComplete"
      :autofocus="autofocus"
      v-model="content"
      :class="{
        's-form-field__input': true,
        's-form-field__input--error': !!error,
        's-form-field__input--disabled': disabled
      }"
      v-on="filteredListeners"
      @mousewheel="mouseWheel"
    />
    <label
      :class="{
        's-form-field__label--top': value !== '' && !disabled
      }"
      class="s-form-field__label"
      v-if="label"
      >{{ label }}</label
    >

    <div v-show="error" class="s-form-field__input-error">
      <i class="icon-error"></i>
      {{ error }}
    </div>

    <p v-show="helpText" class="s-form-field__help-text">{{ helpText }}</p>
  </div>
</template>

<script lang="ts">
import { omit, isNil } from "lodash-es";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        const content: string = "";
        const $refs: {
                input: HTMLInputElement;
              } = undefined;

        return {
            $refs,
            content
        };
    },
    computed: {
        filteredListeners() {
            return omit(this.$listeners, ["input"]);
        },
        isMaxReached() {
            return (
              this.type === "number" &&
              !isNil(this.max) &&
              Number(this.value) >= this.max
            );
        },
        isMinReached() {
            return (
              this.type === "number" &&
              !isNil(this.min) &&
              Number(this.value) <= this.min
            );
        }
    },
    created() {
        this.content =
          this.value !== undefined && this.value !== null
            ? this.value.toString()
            : "";
        this.$parent.$on("update", this.updateValue);
    },
    methods: {
        focus() {
            this.$refs.input.focus();
        },
        handleInput(event: { target: HTMLInputElement }) {
            this.update(
              this.type === "number" ? Number(event.target.value) : event.target.value
            );
        },
        updateValue(val) {
            this.$refs.input.value = val;
        },
        onKeyUp(event: { target: HTMLTextAreaElement }) {
            this.$emit("keyup", event);
        },
        onFocus(event: { target: HTMLTextAreaElement }) {
            this.$emit("focus", event);
        },
        onClick(event: { target: HTMLTextAreaElement }) {
            this.$emit("click", event);
        },
        increment() {
            if (this.isMaxReached) return;

                this.update(Number(this.content) + this.step);
        },
        decrement() {
            if (this.isMinReached) return;

                this.update(Number(this.content) - this.step);
        },
        mouseWheel(event: WheelEvent) {
            if (this.type === "number") {
                  if (event.deltaY > 0) this.decrement();
                  else this.increment();

                  event.preventDefault();
                }
        },
        update(value) {
            this.$emit("input", value);
        },
        valueChanged(newValue: string) {
            this.content = newValue.toString();
            this.$emit("onChange", newValue);
        }
    },
    props: {
        name: { type: String },
        value: { type: [String, Number] },
        error: { type: String },
        min: { type: Number },
        max: { type: Number },
        step: { type: Number, default: 1 },
        helpText: { type: String },
        type: { type: String, default: "text" },
        placeholder: { type: String },
        disabled: { type: Boolean },
        label: { type: String },
        readonly: { type: Boolean },
        autoComplete: { type: String, default: "off" },
        autofocus: { type: Boolean }
    },
    watch: {
        "value": [{
            handler: "valueChanged"
        }]
    }
})

</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-form-field {
  position: relative;

  &--disabled {
    user-select: none;
    cursor: not-allowed;

    & + label {
      border-color: @light-3;
      background-color: @light-3;
    }
  }

  .s-form-field__input {
    &--disabled {
      & + label {
        background-color: @light-3;
        color: @light-5;
      }
    }
  }

  .s-form-field__input::-webkit-outer-spin-button,
  .s-form-field__input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
    padding-right: 30px;
  }

  .s-arrows {
    height: 40px;
    .absolute(0, 8px, 0, auto);
    .transition();
    z-index: 2;
    width: 30px;
    opacity: 0.7;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }

    .s-arrow {
      display: flex !important;
      .fas {
        position: relative;
        font-size: 12px;
      }
      &:active {
        color: black;
      }
      &.arrow-up {
        .absolute(6px, 3px, auto, auto);
      }
      &.arrow-down {
        .absolute(auto, 3px, 6px, auto);
      }
    }
  }

  .s-arrow--disabled {
    color: @light-3;
    cursor: default;
  }
}

.s-form-field__label {
  position: absolute;
  color: @dark-5;
  left: 8px;
  top: 12px;
  .radius();
}

.s-form-field__error-text,
.s-form-field__help-text {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  .margin-bottom(0);
  .margin-top(0);

  .icon-error {
    .margin-left();
  }
}

.s-form-field--with-label {
  position: relative;

  label {
    order: -1;
    .transition();
    transform: translateY(0px);
    pointer-events: none;
    background-color: @white;
    padding: 0 4px;
    line-height: 130%;
  }

  .s-form-field__input:focus + label,
  .s-form-field__label--top {
    transform: translateY(-20px);
    font-size: 12px;
    font-weight: 500;
  }

  .s-form-field__input:not(".s-form-field__input--error"):focus + label {
    color: @day-title;
  }

  .s-form-field--top {
    color: @day-paragraph;
  }

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: transparent;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: transparent;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: transparent;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: transparent;
  }
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: @dark-5;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: @dark-5;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: @dark-5;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: @dark-5;
}

.night,
.night-theme {
  .s-form-field {
    .s-form-field__input {
      &--disabled {
        & + label {
          background-color: @dark-4;
        }
      }
    }
  }

  .s-form-field--with-label {
    position: relative;

    .s-form-field__input:not("[class*=__input--error]"):focus + label {
      color: @night-title;
    }
  }

  .s-form-field__label {
    background-color: @night-bg;
    color: @night-paragraph;
  }

  .s-form-field__label--error,
  .s-form-field__error-text {
    color: @red;
  }

  .s-arrow--disabled {
    color: @dark-4;
  }
}
</style>
