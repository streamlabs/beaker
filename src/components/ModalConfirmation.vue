<template>
  <VueFinalModal
    :modal-id="name"
    :content-style="{ width, minWidth }"
    v-bind="$attrs"
  >
    <template #default="{close}">
      <div class="s-modal-container">
        <div class="s-confirmation">
          <h2 class="s-modal-sub-title">{{ subTitle }}</h2>
          <p class="s-modal-text">{{ text }}</p>
          <div class="s-button-container">
            <Button
              variation="default"
              title="Cancel"
              size="fixed-width"
              @click="close"
            />
            <Button
              @click="onConfirmHandler"
              :variation="buttonVariation"
              :title="confirmButtonText"
              size="fixed-width"
            />
          </div>
        </div>
      </div>
    </template>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { useVfm, VueFinalModal } from "vue-final-modal";
import Button from "@/components/Button.vue";

interface Props {
  name?: string;
  width?: string;
  minWidth?: string;
  subTitle: string;
  text: string;
  confirmButtonText?: string;
  buttonVariation?: string;
}

const {
  name = "modal-confirmation",
  width = "600px",
  minWidth = "600px",
  confirmButtonText = "Confirm",
  buttonVariation = "warning",
} = defineProps<Props>();

const emit = defineEmits(["confirm"]);
const vfm = useVfm();

function onConfirmHandler() {
  emit("confirm");
  vfm.close(name);
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
