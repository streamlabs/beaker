<template>
  <div>
    <transition-group name="fadeX-from-right" tag="div" class="notifications">
      <div
        v-for="{ id, msg, status } in visibleMessages"
        :key="`msg-${id}`"
        class="notification-msg"
        :class="{ 'notification-msg--error': status === 'error' }"
      >
        {{ msg }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useCopyNotification } from "../composables/index";

const { visibleMessages } = useCopyNotification();
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";

.notifications {
  position: absolute;
  top: 24px;
  right: 32px;
  display: flex;
  flex-direction: column;
  min-width: 182px;
}

.notification-msg {
  .margin-bottom();
  padding: 4px 8px;
  .radius();
  font-size: 12px;
  font-weight: 500;
  background-color: @dark-teal;
  color: @white;
  &--error {
    background-color: @dark-red;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
}

.night {
  .notification-msg {
    background-color: @teal;
    color: @dark-2;

    &--error {
      background-color: @red;
    }
  }
}
</style>
