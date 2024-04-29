<template>
  <div class="s-tooltip-notice" :style="{ width: width + 'px' }">
    <div class="s-tooltip-notice-content">
      <i
        :class="arrowClasses"
        class="icon-dropdown s-tooltip-notice__arrow"
      ></i>
      <h3>{{ title }}</h3>
      <p>{{ desc }}</p>
      <Button
        v-if="hasButton"
        @click="clickHandler"
        :title="buttonTitle"
        :variation="'action'"
        :size="'small'"
      ></Button>

      <Button
        class="s-tooltip-notice__secondary-action"
        v-if="hasSecondaryAction"
        @click="secondaryClickHandler"
        :title="secondaryActionTitle"
        :variation="'link'"
        :size="'small'"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "./Button.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Button
  },
    computed: {
        arrowClasses() {
            let classes: string[] = [];

                if (this.arrowPosition) {
                  classes.push(`s-tooltip-notice__arrow--${this.arrowPosition}`);
                }

                return classes;
        }
    },
    methods: {
        clickHandler() {
            this.$emit("handle-tooltip");
        },
        secondaryClickHandler() {
            this.$emit("handle-tooltip-secondary");
        }
    },
    props: {
        title: { required: true,
            type: String
        },
        buttonTitle: { default: "Got it",
            type: String
        },
        secondaryActionTitle: { default: "Learn More",
            type: String
        },
        desc: { required: true,
            type: String
        },
        arrowPosition: { default: "left",
            type: String
        },
        hasButton: { default: true,
            type: Boolean
        },
        hasSecondaryAction: { default: false,
            type: Boolean
        },
        width: { default: 200,
            type: Number
        }
    }
})

</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-tooltip-notice {
  .day-shadow();
  background-color: @white;
  .padding(2);
  width: 200px;
  .radius();
  z-index: 100;
  position: absolute;

  .s-button {
    .margin-top(2);
  }

  p {
    .margin-bottom(0);
  }

  h3 {
    font-size: 16px;
    .margin-bottom();
    .weight(@medium);
    color: @day-title;
  }
}

.s-tooltip-notice-content {
  position: relative;
}

.s-tooltip-notice__arrow {
  transform: rotate(90deg);
  font-size: 40px;
  position: absolute;
  top: 8px;
  left: -36px;
  color: @white;
}

.s-tooltip-notice__arrow--top {
  top: -38px;
  left: 126px;
  transform: rotate(180deg);
}

.s-tooltip-notice__arrow--bottom {
  top: 8px;
  left: -36px;
  transform: rotate(0deg);
}

.s-tooltip-notice__arrow--right {
  top: 8px;
  left: -36px;
  transform: rotate(-90deg);
}

.s-tooltip-notice__secondary-action {
  .margin-left(2);
}

.night,
.night-theme {
  .s-tooltip-notice {
    background-color: @night-section-alt;

    h3 {
      color: @night-title;
    }
  }

  .s-tooltip-notice__arrow {
    color: @night-section-alt;
  }
}
</style>
