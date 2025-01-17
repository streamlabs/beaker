<template>
  <div class="prime-section">
    <empty-section
      :variation="'prime'"
      :titleSlot="true"
      :subtitle="subtitle"
      :hasLink="true"
    >
      <template #title>
        <div>
          <Badge :align-left="true" :variant="'prime-alt'"></Badge>Feature
        </div>
      </template>
      <template #link>
        <div>
          <Button
            @click="$emit('click')"
            :tag="'a'"
            :variation="'link'"
            :href="href"
            :title="'Try Prime Now'"
          ></Button>
        </div>
      </template>
    </empty-section>
  </div>
</template>

<script setup lang="ts">
import Badge from "./Badge.vue";
import Button from "./Button.vue";
import EmptySection from "./EmptySection.vue";

interface Props {
  subtitle: string;
  href?: string;
  onClick?: () => any;
}

defineEmits(["click"]);
defineProps<Props>();
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.prime-section {
  background: rgba(255, 255, 255, 0.88);
  .padding(3);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;

  .s-empty-section {
    .padding(@0);
  }

  .s-badge--prime-alt {
    margin-right: 5px;
    vertical-align: baseline;
  }
}

.night,
.night-theme {
  .prime-section {
    background: rgba(23, 36, 45, 0.88);
  }
}
</style>
