<template>
  <div class="s-colors">
    <div class="section">
      <h1>Colors</h1>
      <p>
        Colors used on Streamlabs platforms. Click on a color to copy its
        variable code to the clipboard.
      </p>
    </div>

    <div
      class="section"
      v-for="(colorGroup, index) in colors"
      :key="`color-group-${index}`"
    >
      <div
        v-for="color in colorGroup"
        :key="color.color"
        class="side-by-side"
      >
        <div class="nospace-flex">
          <div
            class="color-square"
            :style="'background-color:' + color.hex + ';'"
          ></div>
          <div class="subtitle">
            {{ color.color }}
            <!-- <i class="icon-copy"></i> -->
          </div>
        </div>
        <div>
          <span
            class="name color-code"
            v-clipboard:copy="color.name"
            v-clipboard:success="emitCopySuccess"
            v-clipboard:error="emitCopyError"
          >{{ color.name }}</span>
          <span
            class="hex color-code"
            v-clipboard:copy="color.hex"
            v-clipboard:success="emitCopySuccess"
            v-clipboard:error="emitCopyError"
          >{{ color.hex }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { EventBus } from "./../plugins/event-bus";

interface INotificationMsg {
  id: number;
  status: string;
  msg: string;
  timerStarted: boolean;
}

@Component({})
export default class Colors extends Vue {
  messages: INotificationMsg[] = [];

  private colors = [
    [
      { color: "Teal (Night primary)", hex: "#31C3A2", name: "@teal" },
      { color: "Dark Teal (Day primary)", hex: "#128079", name: "@teal-dark" },
      {
        color: "Red (Count Badges, Warnings, Errors)",
        hex: "#F85640",
        name: "@red"
      },
      {
        color: "Dark Red (Day Count Badges, Warnings, Errors)",
        hex: "#B14334",
        name: "@red-dark"
      },
      { color: "Yellow (Night Info)", hex: "#E3973E", name: "@yellow" },
      { color: "Dark Yellow (Day Info)", hex: "#A96311", name: "@yellow-dark" }
    ],
    [
      { color: "Dark 1 (App Store Icons BG)", hex: "#000000", name: "@dark-1" },
      {
        color: "Dark 2 (Day Title, Subtitle, Selected)",
        hex: "#09161D",
        name: "@dark-2"
      },
      { color: "Dark 3 (Night BG)", hex: "#17242D", name: "@dark-3" },
      {
        color: "Dark 4 (Night Cards/Sections BG)",
        hex: "#2B383F",
        name: "@dark-4"
      },
      {
        color: "Dark 5 (Day P, Night Button, Night Cards)",
        hex: "#4F5E65",
        name: "@dark-5"
      }
    ],
    [
      { color: "Light 1 (Day Title + BG)", hex: "#FFFFFF", name: "@light-1" },
      {
        color: "Light 2 (Day Tip Page BG, Cards)",
        hex: "#F5F8FA",
        name: "@light-2"
      },
      { color: "Light 3 (Day Button)", hex: "#E3E8EB", name: "@light-3" },
      { color: "Light 4 (Night P)", hex: "#BDC2C4", name: "@light-4" },
      {
        color: "Light 5 (Day + Night Icons, Captions)",
        hex: "#91979A",
        name: "@light-5"
      }
    ],
    [
      { color: "Blue", hex: "#36ADE0", name: "@blue" },
      { color: "Dark Blue (Day", hex: "#2B5BD7", name: "@blue-dark" },
      { color: "Pink", hex: "#EB7777", name: "@pink" },
      { color: "Dark Pink (Day", hex: "#C22571", name: "@pink-dark" },
      { color: "Purple", hex: "#C57BFF", name: "@purple" },
      { color: "Dark Purple (Day", hex: "#5E3BEC", name: "@purple-dark" },
      { color: "Navy", hex: "#233A4A", name: "@navy" }
    ],
    [
      { color: "Prime", hex: "#CAA368", name: "@prime" },
      { color: "Dark Prime", hex: "#8F6F3F", name: "@prime-dark" }
    ]
  ];

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

  emitCopySuccess(e) {
    EventBus.$emit("copy-success", `${e.text} copied`);
  }

  emitCopyError(e) {
    EventBus.$emit("copy-copy", e);
  }
}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";
.s-colors {
  max-width: 500px;

  .section {
    .margin-bottom(2);
  }
}

.side-by-side {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  .radius();
  font-size: 12px;

  &:hover {
    .icon-copy {
      opacity: 1;
    }
  }
}

.subtitle {
  width: 100%;
  min-width: 0;
  white-space: nowrap;
  font-weight: 500;
  color: @dark-2;
  overflow: hidden;
}

.hex {
  .margin-left(2);
}

.nospace-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.color-square {
  width: 16px;
  min-width: 16px;
  height: 16px;
  min-height: 16px;
  .margin-right();
  border: 1px solid fade(@day-input-border, 12%);
  .radius();
}

.icon-copy {
  margin-left: 6px;
  opacity: 0;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.color-code {
    cursor: pointer;
    color: @light-5;
    transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      color: @dark-2;
    }
  }

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
  .subtitle {
    color: @white;
  }

  .color-code {
    color: @light-4;

    &:hover {
      color: @light-2;
    }
  }

  .notification-msg {
    background-color: @teal;

    &--error {
      background-color: @red;
    }
  }
}
</style>
