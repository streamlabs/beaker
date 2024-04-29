<template>
  <div class="s-onboarding">
    <div class="s-onboarding-main" :class="location">
      <div
        class="s-onboarding-progress s-onboarding__top s-step__cont"
        v-if="namedSteps"
      >
        <div v-for="(step, idx) in steps" :key="idx" class="s-step-name__cont">
          <div class="s-name-caret" v-if="idx > 0">
            <i class="icon-back"></i>
          </div>
          <div
            class="s-name-step"
            :class="{ 'current-step': currentStepStyle(idx) }"
          >
            {{ step.name }}
          </div>
        </div>
      </div>
      <div class="s-onboarding-progress" :class="location" v-else>
        <div class="s-onboarding-progress__line" :class="location"></div>
        <div
          v-for="(key, index) in steps"
          :key="index"
          class="s-bullet"
          :class="{ 'current-step': currentStepStyle(index) }"
        >
          <i :class="{ 'icon-check-mark': checkmarkStyle(index) }"></i>
        </div>
      </div>
      <div class="s-onboarding-body">
        <slot :name="currentStep"></slot>
      </div>
    </div>
    <div
      class="s-onboarding-footer"
      v-if="!hideButton || !hideSkip || !hideBack"
    >
      <div class="s-previousStep">
        <p v-show="currentStep !== 1 && !hideBack" @click="prevHandler">Back</p>
      </div>
      <div class="s-nextStep">
        <p v-if="skippable && !hideSkip" @click="skipHandler">
          Skip
        </p>

        <div
          v-if="skippable && currentStep === steps && !isCompleted"
          class="s-onboarding-skip__warning"
        >
          You skipped a step
        </div>
        <Button
          v-if="!hideButton"
          :variation="'action'"
          :title="currentStep === steps.length ? 'Complete' : 'Continue'"
          @click="
            currentStep === steps.length ? completeHandler() : continueHandler()
          "
          :state="
            disableControls || (currentStep === steps.length && !isCompleted)
              ? 'disabled'
              : null
          "
        ></Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import OnboardingStep from "./../components/OnboardingStep.vue";
import Button from "./../components/Button.vue";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: {
    OnboardingStep,
    Button
  },
    computed: {
        location() {
            if (this.stepLocation === "left") return "s-onboarding__left";
            if (this.stepLocation === "top") return "s-onboarding__top";
        },
        namedSteps() {
            return this.steps.every(step => !!step.name);
        },
        isCompleted() {
            return this.steps.every(step => step.complete);
        }
    },
    methods: {
        currentStepStyle(index) {
            return index + 1 === this.currentStep;
        },
        checkmarkStyle(index) {
            return this.steps[index].complete;
        }
    },
    props: {
        steps: {
            type: Array as PropType<{ name?: string; complete: boolean }[]>
        },
        stepLocation: { default: "left",
            type: String
        },
        currentStep: {
            type: Number
        },
        completeHandler: {
            type: Object as PropType<Function>
        },
        continueHandler: {
            type: Object as PropType<Function>
        },
        skipHandler: {
            type: Object as PropType<Function>
        },
        prevHandler: {
            type: Object as PropType<Function>
        },
        skippable: {
            type: Boolean
        },
        disableControls: { default: false,
            type: Boolean
        },
        hideSkip: { default: false,
            type: Boolean
        },
        hideBack: { default: false,
            type: Boolean
        },
        hideButton: { default: false,
            type: Boolean
        }
    }
})

</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-onboarding {
  display: flex;
  flex-direction: column;
  z-index: 10;
  width: 800px;

  .s-onboarding-main {
    display: flex;

    &.s-onboarding__top {
      flex-direction: column;
    }

    &.s-onboarding__left {
      flex-direction: row;
    }
  }

  .s-onboarding-progress {
    display: flex;
    position: relative;
    justify-content: space-between;
    overflow: hidden;

    &.s-onboarding__left {
      flex-direction: column;
      min-width: 24px;
      .margin-right(6);
      .padding-top(7);
      height: 400px;
    }

    &.s-onboarding__top {
      flex-direction: row;
      width: 60%;
      min-height: 24px;
    }
  }

  .s-onboarding-skip__warning {
    .margin-right();
  }

  .s-onboarding-progress__line {
    background: @light-3;
    z-index: 1;
    position: absolute;

    &.s-onboarding__left {
      width: 4px;
      height: 100%;
      left: 10px;
    }

    &.s-onboarding__top {
      width: 100%;
      height: 4px;
      top: 10px;
    }
  }

  .s-step__cont {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .s-step-name__cont:first-child {
      width: auto;
    }
  }

  .s-step-name__cont {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-around;
  }

  .s-name-caret {
    color: @dark-5;
    font-size: 10px;
    display: flex;
    justify-content: center;
    > i {
      display: block;
      transform: rotate(180deg);
    }
  }

  .s-name-step {
    display: flex;
    justify-content: space-around;
    word-wrap: none;
    white-space: nowrap;
    color: @day-paragraph;

    &.current-step {
      color: @day-title;
      font-weight: @medium;
    }
  }

  .s-bullet {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: @light-3;
    border-radius: 50%;
    z-index: 10;
    .transition();

    > i {
      font-size: 12px;
      color: @light-1;
    }

    &.s-onboarding__top {
      .margin-bottom(5);
    }
  }

  .s-bullet.current-step {
    background-color: @teal;
  }

  .s-onboarding-body {
    .transition();
  }

  .s-onboarding-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid @light-3;
    .padding-top(3);
    .margin-top(5);
    p {
      text-decoration: underline;
      .margin(0);
      cursor: pointer;
    }
    button {
      cursor: pointer;
    }
  }

  .s-nextStep {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      .margin-right(2);
    }
  }
}

.night,
.night-theme {
  .s-onboarding {
    display: flex;
    flex-direction: column;
    z-index: 10;
    width: 800px;

    .s-onboarding-progress__line {
      background: @dark-2;
    }

    .s-name-caret {
      color: @dark-5;
    }

    .s-name-step {
      color: @night-paragraph;

      &.current-step {
        color: @night-title;
      }
    }

    .s-bullet {
      background-color: @dark-2;

      > i {
        color: @light-5;
      }
    }

    .s-bullet.current-step {
      background-color: @light-2;
    }

    .s-onboarding-footer {
      border-top: 1px solid @dark-4;
    }
  }
}
</style>
