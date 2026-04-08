<template>
  <div class="s-checkbox" tabindex="0" @keydown.space.prevent="toggleCheck">
    <input
      type="checkbox"
      :id="id"
      :name="name"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
      tabindex="-1"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  id: string;
  name?: string;
  value: boolean;
}>();

const emit = defineEmits<{
  input: [checked: boolean];
}>();

function toggleCheck() {
  emit("input", !props.value);
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-checkbox {
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 16px;
  min-height: 16px;
  font-style: normal;
  line-height: 16px;
  vertical-align: baseline;
  backface-visibility: hidden;
  pointer-events: none;
  outline: none;

  label {
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    width: auto;
    min-height: 16px;
    margin: 0;
    .padding-left(3);
    .weight(@normal);
    line-height: 16px;
    color: @day-paragraph;
    cursor: default;
    .transition(border, background-color);
    pointer-events: all;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 16px;
      height: 16px;
      content: "";
      background: transparent;
      .radius();
      -webkit-transition: border 0.1s ease, opacity 0.1s ease,
        box-shadow 0.1s ease, -webkit-transform 0.1s ease;
      transition: border 0.1s ease, opacity 0.1s ease, box-shadow 0.1s ease,
        -webkit-transform 0.1s ease;
      transition: border 0.1s ease, opacity 0.1s ease, transform 0.1s ease,
        box-shadow 0.1s ease;
      transition: border 0.1s ease, opacity 0.1s ease, transform 0.1s ease,
        box-shadow 0.1s ease, -webkit-transform 0.1s ease;
      border: 1px solid @light-4;
      box-sizing: border-box;
    }
  }

  input[type="checkbox"],
  input[type="radio"] {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0 !important;
    z-index: 3;
    width: 16px;
    height: 16px;
    margin: 0;
    pointer-events: all;
  }

  input:checked ~ label {
    color: @day-title;

    &:before {
      border-color: @dark-teal;
      background-color: @dark-teal;
    }
  }

  input:checked ~ label:after {
    position: absolute;
    left: 3px;
    top: 0px;
    opacity: 1;
    color: @white;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f00c";
    font-size: 10px;
  }
}

.s-radio.checkbox {
  label:before {
    content: "";
    transform: none;
    width: 16px;
    height: 16px;
    border-radius: 500rem;
    top: 0;
    left: 0;
  }

  input:checked ~ label:after {
    content: "";
    width: 8px;
    height: 8px;
    background-color: @white;
    border-radius: 20px;
    left: 4px;
    top: 4px;
  }
}

.s-radio-button-group,
.s-checkbox-group {
  .s-checkbox,
  .s-radio-button {
    .margin-bottom();

    &:last-child {
      .margin-bottom(@0);
    }
  }
}

.night {
  .s-checkbox {
    label {
      color: @night-paragraph;

      &:before {
        border-color: @night-input-border;
      }
    }

    input:checked ~ label:after {
      color: @dark-2;
    }

    input:checked ~ label {
      color: @night-title;

      &:before {
        border-color: @teal;
        background-color: @teal;
      }
    }
  }
}
</style>
