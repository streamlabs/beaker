<template>
  <div :class="['s-toggle', toggleClass]">
    <button
      type="button"
      v-for="(val, key) in values"
      :key="val.id"
      :title="key | capitalize"
      @click="$emit('input', key)"
      :class="[
        's-toggle__option',
        { 's-toggle__option--active': value === key }
      ]"
      v-html="val"
    >
      {{ val }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  filters: {
    capitalize(value: string) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
    computed: {
        toggleClass() {
            if (this.variation) {
              return `s-toggle--${this.variation}`;
            }
        }
    },
    props: {
        values: {
            type: Object as PropType<object>
        },
        value: {
            type: String
        },
        variation: {
            type: String
        }
    }
})

</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-toggle {
  display: inline-flex;
  .radius();
  .transition();
  overflow: hidden;
  .weight(@medium);

  &__option {
    .padding();
    border: none;
    font-size: 14px;
    background-color: @day-section;
    color: @icon;
    .transition();
    outline: none;
    display: flex;
    font-family: "Roboto", sans-serif;

    &--active {
      background-color: @dark-2;
      color: @white;
    }
  }

  &--text {
    .s-toggle__option {
      padding: 8px 6px;
      line-height: 1.2;
      font-weight: 400;

      &:first-child {
        padding-left: 8px;
      }

      &:last-child {
        padding-right: 8px;
      }

      &--active {
        background-color: @day-section;
        color: @dark-2;
        font-weight: 500;
      }
    }
  }
}

.night,
.night-theme {
  .s-toggle {
    &__option {
      background-color: @dark-4;

      &--active {
        background-color: @dark-2;
      }
    }

    &--text {
      .s-toggle__option {
        &--active {
          background-color: @dark-4;
          color: @white;
        }
      }
    }
  }
}
</style>
