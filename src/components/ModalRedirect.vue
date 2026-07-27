<template>
  <VueFinalModal
    v-model="show"
    content-class="s-modal-wrapper"
    :content-style="{ maxWidth: width + 'px', minWidth: minWidth + 'px' }"
    v-bind="$attrs"
  >
    <div class="s-modal-container">
      <div class="s-redirect">
        <div class="s-spinner">
          <Spinner :variation="'bars'" />
        </div>
        <h1 class="s-modal-title">{{ title }}</h1>
        <p class="s-modal-text">{{ text }}</p>
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import Spinner from "./../components/Spinner.vue";

defineOptions({ compatConfig: { MODE: 3 } });

const show = defineModel<boolean>({ default: false });

withDefaults(
  defineProps<{
    width?: number;
    minWidth?: number;
    title?: string;
    text?: string;
  }>(),
  {
    width: 600,
    minWidth: 600,
  }
);
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";
@import "./../styles/components/Modals";

.s-redirect {
  text-align: center;
  .padding(3);
}

.s-modal-text {
  .padding-h-sides(8);
}

.s-spinner {
  .padding-bottom(1.8);
}
</style>
