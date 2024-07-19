<template>
  <div class="s-tagging-input">
    <div class="s-tagging-input__container">
      <text-input
        v-model="input"
        v-validate="inputValidation"
        slot="input"
        :name="name"
        :label="label"
        :placeholder="placeholder"
        type="text"
        :error="errors.first(name)"
        @input="$emit('update:text', $event)"
        @keydown.enter.prevent="onAdd"
      />
      <Button
        :title="buttonText"
        type="button"
        :variation="buttonVariation"
        :disabled="value.length >= maxItems"
        @click="onAdd"
      />
    </div>

    <div class="s-tagging-input__tags">
      <div
        v-for="(tag, index) in value"
        :key="index"
        class="s-tagging-input-tag"
        :class="[`s-tagging-input-tag--${tagVariation}`]"
      >
        <div class="s-tagging-input-tag__text">{{ tag }}</div>
        <i
          class="s-tagging-input-tag__icon icon-close"
          @click="onRemove(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextInput from "./TextInput.vue";
import Button from "./Button.vue";
import { watch, ref, reactive } from "vue";
import { useVeeValidate } from "../plugins/injects";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  buttonVariation?: string;
  value?: string[];
  text?: string;
  inputValidation: string;
  prefix?: string;
  tagVariation?: string;
  maxItems?: number;
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: "Add Tag",
  buttonVariation: "default",
  value: () => [],
  text: "",
  tagVariation: "default",
  maxItems: 25,
});

const tags = ref<string[]>([]);
const input = ref("");

const emit = defineEmits([
  "error",
  "input",
  "change",
  "update:value",
  "update:text",
  "remove",
  "add",
]);

const $validator = reactive(useVeeValidate());

function onAdd() {
  if ($validator.errors.items.length !== 0) {
    emit("error", $validator.errors.items, false);
    return;
  }

  if (tags.value.length >= props.maxItems) {
    emit("error", ["Max items reached"], true);
    return;
  }

  let inputValue = input.value.trim();

  const found = tags.value.find((v) => {
    if (props.prefix && !inputValue.startsWith(props.prefix)) {
      return v.toLowerCase() === props.prefix + inputValue.trim().toLowerCase();
    } else {
      return v.toLowerCase() === inputValue.trim().toLowerCase();
    }
  });

  if (!found && inputValue.length !== 0) {
    if (props.prefix && !inputValue.startsWith(props.prefix)) {
      inputValue = props.prefix + inputValue;
    }
    tags.value.push(inputValue);
    input.value = "";
    emitTagEvents("add");
  }
}

function onRemove(index: number) {
  tags.value.splice(index, 1);
  emitTagEvents("remove");
}

function emitTagEvents(...events) {
  ["input", "change", "update:value", ...events].forEach((event) =>
    emit(event, tags.value)
  );
}

function watchValue(newValue) {
  tags.value = newValue;
}

function watchText(newValue) {
  input.value = newValue;
}

watch(() => props.value, watchValue, { immediate: true });
watch(() => props.text, watchText, { immediate: true });
</script>
<style lang="less">
@import (reference) "./../styles/Imports";

.s-tagging-input {
  .s-tagging-input__container {
    display: flex;
    .s-form-field {
      flex: 1;
      .margin-right(2);
    }
  }

  .s-tagging-input {
    &__tags {
      display: flex;
      flex-wrap: wrap;
      .margin-top();
      max-height: 300px;
      overflow-y: auto;
    }

    &-tag {
      display: flex;
      align-items: center;
      height: 24px;
      .margin-right();
      .margin-top();
      padding: 0 4px;
      border-radius: 2px;
      font-size: 14px;
      line-height: 1.14;
      color: white;

      &:last-of-type {
        .margin-right(0);
      }

      &--default {
        color: @day-title;
        border-color: @day-button;
        background: @day-button;
      }

      &--action {
        background-color: @teal;
      }

      &--warning {
        background-color: @warning;
      }

      &__icon {
        margin-left: 4px;
        font-size: 10px;
        color: @light-5;
        cursor: pointer;
      }

      &__text {
        font-weight: 500;
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
      }
    }
  }
}
.night,
.night-theme {
  .s-tagging-input {
    &-tag {
      &--default {
        color: @night-title;
        border-color: @night-button;
        background: @night-button;
      }

      &--action {
        background-color: @teal;
      }

      &--warning {
        background-color: @warning;
      }
    }
  }
}
</style>
