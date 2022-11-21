<template>
  <div
    class="s-guard"
    :class="{ 's-guard--hidden': !visible }"
    @click="showText"
  >
    <div class="s-guard__placeholder">
      <i class="icon-lock"></i>
      {{ placeholder }}
    </div>

    <div class="s-guard__text">
      <TextInput
        readonly
        type="text"
        v-model="value"
        @focus="checkSelectedText"
        @keydown.space.prevent="showText"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TextInput from "./TextInput.vue";

@Component({
  components: {
    TextInput
  }
})
export default class GuardNew extends Vue {
  @Prop()
  value?: string;

  @Prop({ default: "Click to show" })
  placeholder!: string;

  visible = false;

  showText(e) {
    if (!this.visible) {
      this.visible = true;
    } else {
      this.$emit("click");
    }

    if (e.type === "keydown") {
      setTimeout(() => e.target.select(), 200);
    }
  }

  checkSelectedText(e) {
    const target = e.target;

    if (!this.visible) target.setSelectionRange(0, 0);

    target.focus();
  }
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-guard {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: 150px;
  height: 40px;
  border: 1px solid @light-4;
  .radius();
  overflow: hidden;
  cursor: unset;

  &__placeholder {
    position: absolute;
    z-index: 0;
    display: flex;
    width: 100%;
    justify-content: center;
    text-align: center;
    color: @dark-2;
    opacity: 0;
    user-select: none;
    transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);

    .icon-lock {
      margin-right: 4px;
    }
  }

  &__text {
    position: relative;

    &::before {
      content: unset;
      position: absolute;
      top: 2px;
      left: 2px;
      z-index: 1;
      width: ~"calc(100% - 4px)";
      height: ~"calc(100% - 4px)";
      backdrop-filter: blur(0);
      transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
        backdrop-filter 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .s-form-field__input {
      pointer-events: initial;
    }
  }

  &--hidden {
    cursor: pointer;
    .s-guard {
      &__placeholder {
        opacity: 1;
        z-index: 2;
      }

      &__text {
        &::before {
          content: "";
          backdrop-filter: blur(4px);
        }

        .s-form-field__input {
          pointer-events: none;
          user-select: none;
        }
      }
    }
  }
}

.night {
  .s-guard {
    border-color: @dark-5;

    &__placeholder {
      color: @white;
    }
  }
}
</style>
