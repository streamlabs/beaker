<template>
  <VueFinalModal
    :modal-id="name"
    :content-style="{ width, minWidth }"
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
import Spinner from "@/components/Spinner.vue";
import { VueFinalModal } from "vue-final-modal";

interface Props {
  name: string;
  width?: string;
  minWidth?: string;
  title: string;
  text: string;
}

const { width = "600px", minWidth = "600px" } = defineProps<Props>();
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
