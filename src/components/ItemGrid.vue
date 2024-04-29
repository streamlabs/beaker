<template>
  <div class="s-item-grid">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        items: {
            type: Array as PropType<Object[]>
        }
    }
})

</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 16px;
}
</style>
