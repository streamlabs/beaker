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
import { EventBus } from "./../plugins/event-bus";
import { computed, ref, onBeforeMount, onUnmounted } from "vue";

interface INotificationMsg {
  id: number;
  status: string;
  msg: string;
  timerStarted: boolean;
}

const messages = ref<INotificationMsg[]>([]);

const visibleMessages = computed(() => {
  const msgs = messages.value.filter((msg, idx) => idx < 5);

  msgs.forEach((msg) => {
    if (!msg.timerStarted) {
      msg.timerStarted = true;
      setTimeout(() => {
        const idx = messages.value.findIndex(
          (message) => msg.id === message.id
        );
        messages.value.splice(idx, 1);
      }, 5000);
    }
  });

  return msgs;
});

function setCopyMsgId() {
  return Math.ceil(Math.random() * 10000);
}
function setCopyMsg({ id, msg, status, timerStarted }) {
  const message: INotificationMsg = { id, msg, status, timerStarted };
  messages.value.push(message);
}

function onCopySuccess(e) {
  let msg: string = typeof e === "string" ? e : e.text;

  setCopyMsg({
    id: setCopyMsgId(),
    msg,
    status: "success",
    timerStarted: false,
  });
}

function onCopyError(e) {
  setCopyMsg({
    id: setCopyMsgId(),
    msg: "Failed to copy to clipboard",
    status: "error",
    timerStarted: false,
  });
}

onBeforeMount(() => {
  EventBus.$on("copy-success", onCopySuccess);
  EventBus.$on("copy-error", onCopyError);
});

onUnmounted(() => {
  EventBus.$off("copy-success");
  EventBus.$off("copy-error");
});
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
