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
import { computed, watch } from 'vue';
import { useNotification } from './../composables/useNotification';

// Consumers that previously used EventBus.$emit("copy-success", text) or
// EventBus.$emit("copy-error") should now call useNotification().success(text)
// or useNotification().error() directly.
const { messages, remove } = useNotification();

const visibleMessages = computed(() => messages.value.slice(0, 5));

watch(
  messages,
  (msgs) => {
    msgs.forEach((msg) => {
      if (!msg.timerStarted) {
        msg.timerStarted = true;
        setTimeout(() => remove(msg.id), 5000);
      }
    });
  },
  { deep: true, immediate: true },
);
</script>

<style lang="less" scoped>
@import (reference) './../styles/Imports';

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
</style>

<style lang="less">
@import (reference) './../styles/Imports';

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
