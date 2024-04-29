<template>
  <div
    class="s-step"
    :class="{ 's-step--completed': isCompleted, checked: hasCheckmark }"
  >
    <div class="s-step__title">
      <span class="s-step__icon" :class="icon" v-if="icon"></span>
      <span class="s-step__icon icon-check-mark" v-if="hasCheckmark"></span>
      <p class="s-step__title-text">{{ title }}</p>
      <Badge
        class="s-step__badge"
        v-if="hasPrime"
        :variant="'prime-alt'"
        :align-left="true"
      ></Badge>
    </div>
    <slot v-if="!isCompleted"></slot>
    <div v-if="isCompleted">{{ completedText }}</div>
  </div>
</template>

<script lang="ts">
import Badge from "./../components/Badge.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Badge
  },
    props: {
        title: {
            type: String
        },
        icon: {
            type: String
        },
        isCompleted: { default: false,
            type: Boolean
        },
        completedText: {
            type: String
        },
        hasCheckmark: { default: false,
            type: Boolean
        },
        hasPrime: { default: false,
            type: Boolean
        }
    }
})

</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";

.s-step {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: @dark-5;
  .radius();
  .padding(1.5);
  .padding-h-sides(1.5);
}

.s-step__title {
  color: @white;
  line-height: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-step__title-text {
  .margin(0);
  color: @night-title;
  .weight(@medium);
}

.s-step__icon {
  margin-right: 8px;
}

.s-step__badge {
  margin-left: 8px;
}

.s-step--completed {
  color: @dark-5;
  background: @dark-4;
  .s-step__icon,
  .s-step__title-text,
  .s-step__badge {
    color: @dark-5;
  }
}

.checked {
  .s-step__title-text {
    text-decoration: line-through;
  }
}

.night,
.night-theme {
  .s-step__title-text {
    color: @night-title;
  }

  .s-step--completed {
    color: @dark-5;

    .s-step__icon,
    .s-step__title-text,
    .s-step__badge {
      color: @dark-5;
    }
  }
}
</style>
