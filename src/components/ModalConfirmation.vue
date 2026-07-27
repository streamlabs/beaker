<template>
  <VueFinalModal
    v-model="show"
    content-class="s-modal-wrapper"
    :content-style="{ maxWidth: width + 'px', minWidth: minWidth + 'px' }"
    v-bind="$attrs"
  >
    <div class="s-modal-container">
      <div class="s-confirmation">
        <h2 class="s-modal-sub-title">{{ subTitle }}</h2>
        <p class="s-modal-text">{{ text }}</p>
        <div class="s-button-container">
          <Button
            :variation="'default'"
            :title="'Cancel'"
            :size="'fixed-width'"
            @click="show = false"
          ></Button>
          <Button
            @click="onConfirmHandler"
            :variation="buttonVariation"
            :title="confirmButtonText"
            :size="'fixed-width'"
          ></Button>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import Button from "./../components/Button.vue";

defineOptions({ compatConfig: { MODE: 3 } });

const show = defineModel<boolean>({ default: false });

withDefaults(
  defineProps<{
    width?: number;
    minWidth?: number;
    subTitle?: string;
    text?: string;
    confirmButtonText?: string;
    buttonVariation?: string;
  }>(),
  {
    width: 600,
    minWidth: 600,
    confirmButtonText: "Confirm",
    buttonVariation: "warning",
  }
);

const emit = defineEmits<{ confirm: [] }>();

function onConfirmHandler() {
  emit("confirm");
  show.value = false;
}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";
@import "./../styles/components/Modals";

.s-modal-container {
  .padding(3);
}

.s-confirmation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.s-button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .s-button {
    &:first-child {
      margin-left: 0;
    }
  }
}

.s-modal-sub-title {
  .margin-bottom(0);
}

.s-modal-text {
  text-align: center;
  .margin-top(2);
  .margin-bottom(2);
}

.s-modal-default-button {
  float: right;
}
</style>
