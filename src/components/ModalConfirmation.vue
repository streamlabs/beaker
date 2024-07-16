<template>
  <modal
    :name="name"
    :classes="'s-modal-wrapper'"
    :maxWidth="width"
    :minWidth="minWidth"
    height="auto"
    :adaptive="true"
    v-on="$listeners"
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
            @click="$modal.hide(name)"
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
  </modal>
</template>

<script setup lang="ts">
import { useVModal } from "./../plugins/injects";
import Button from "./../components/Button.vue";

const emit = defineEmits(["confirm"]);
const $modal = useVModal();

function onConfirmHandler() {
  emit("confirm");
  $modal.hide(props.name);
}

interface Props {
  name?: string;
  width?: number;
  minWidth?: number;
  subTitle: string;
  text: string;
  confirmButtonText?: string;
  buttonVariation?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: "modal-confirmation",
  width: 600,
  minWidth: 600,
  confirmButtonText: "Confirm",
  buttonVariation: "warning",
});
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
