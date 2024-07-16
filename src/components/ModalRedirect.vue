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
      <div class="s-redirect">
        <div class="s-spinner">
          <Spinner :variation="'bars'" />
        </div>
        <h1 class="s-modal-title">{{ title }}</h1>
        <p class="s-modal-text">{{ text }}</p>
      </div>
    </div>
  </modal>
</template>

<script setup lang="ts">
import Spinner from "./../components/Spinner.vue";

interface Props {
  name: string;
  width?: number;
  minWidth?: number;
  title: string;
  text: string;
}

withDefaults(defineProps<Props>(), {
  width: 600,
  minWidth: 600,
});
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
