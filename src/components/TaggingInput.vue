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

<script lang="ts">
import TextInput from "./TextInput.vue";
import TextArea from "./TextArea.vue";
import Button from "./Button.vue";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: {
    TextInput,
    TextArea,
    Button,
  },
    data() {
        const tags: string[] = [];
        const input: string = "";

        return {
            input,
            tags
        };
    },
    methods: {
        onAdd() {
            if (this.$validator.errors.items.length !== 0) {
                  this.$emit("error", this.$validator.errors.items, false);
                  return;
                }

                if (this.tags.length >= this.maxItems) {
                  this.$emit("error", ["Max items reached"], true);
                  return;
                }

                let inputValue = this.input.trim();

                const found = this.tags.find((v) => {
                  if (this.prefix && !inputValue.startsWith(this.prefix)) {
                    return (
                      v.toLowerCase() === this.prefix + inputValue.trim().toLowerCase()
                    );
                  } else {
                    return v.toLowerCase() === inputValue.trim().toLowerCase();
                  }
                });

                if (!found && inputValue.length !== 0) {
                  if (this.prefix && !inputValue.startsWith(this.prefix)) {
                    inputValue = this.prefix + inputValue;
                  }
                  this.tags.push(inputValue);
                  this.input = "";
                  this.emitTagEvents("add");
                }
        },
        onRemove(index: number) {
            this.tags.splice(index, 1);
            this.emitTagEvents("remove");
        },
        emitTagEvents(...events) {
            ["input", "change", "update:value", ...events].forEach((event) =>
              this.$emit(event, this.tags)
            );
        },
        watchValue(newValue) {
            this.tags = newValue;
        },
        watchText(newValue) {
            this.input = newValue;
        }
    },
    props: {
        name: {
            type: String
        },
        label: {
            type: String
        },
        placeholder: {
            type: String
        },
        buttonText: { default: "Add Tag",
            type: String
        },
        buttonVariation: { default: "default",
            type: String
        },
        value: { default: () => [],
            type: Array as PropType<string[]>
        },
        text: { default: "",
            type: String
        },
        inputValidation: {
            type: String
        },
        prefix: {
            type: String
        },
        tagVariation: { default: "default",
            type: String
        },
        maxItems: { default: 25,
            type: Number
        }
    },
    watch: {
        "value": [{ immediate: true,
            handler: "watchValue"
        }],
        "text": [{ immediate: true,
            handler: "watchText"
        }]
    }
})

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
