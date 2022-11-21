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

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EventBus } from "./../plugins/event-bus";

interface INotificationMsg {
  id: number;
  status: string;
  msg: string;
  timerStarted: boolean;
}

@Component({})
export default class Icons extends Vue {
  messages: INotificationMsg[] = [];

  get visibleMessages() {
    const msgs = this.messages.filter((msg, idx) => idx < 5);

    msgs.forEach(msg => {
      if (!msg.timerStarted) {
        msg.timerStarted = true;
        setTimeout(() => {
          const idx = this.messages.findIndex(message => msg.id === message.id);
          this.messages.splice(idx, 1);
        }, 5000);
      }
    });

    return msgs;
  }

  created() {
    EventBus.$on("copy-success", this.onCopySuccess);
    EventBus.$on("copy-error", this.onCopyError);
  }

  destroyed() {
    EventBus.$off("copy-success");
    EventBus.$off("copy-error");
  }

  onCopySuccess(e) {
    let msg: string = typeof e === 'string' ? e : e.text;

    this.setCopyMsg({
      id: this.setCopyMsgId(),
      msg,
      status: "success",
      timerStarted: false
    });
  }

  onCopyError(e) {
    this.setCopyMsg({
      id: this.setCopyMsgId(),
      msg: "Failed to copy to clipboard",
      status: "error",
      timerStarted: false
    });
  }

  setCopyMsgId() {
    return Math.ceil(Math.random() * 10000);
  }

  setCopyMsg({ id, msg, status, timerStarted }) {
    const message: INotificationMsg = { id, msg, status, timerStarted };
    this.messages.push(message);
  }
}
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
