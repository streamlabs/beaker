<template>
  <div class="s-modal-welcome-prime">
    <div class="modal-prime">
      <div v-if="!isUserAgentEdge">
        <video loop muted autoplay class="modal-prime__video">
          <source
            src="https://cdn.streamlabs.com/videos/Welcome_Confetti_Gold_1.webm"
            type="video/webm"
          />
        </video>
      </div>
      <div class="modal-prime__heading">
        Welcome to
        <span>Prime</span>
        !
      </div>
      <p class="modal-prime__desc">You just unlocked a TON of benefits</p>
      <div class="modal-prime__images"></div>
      <div class="modal-prime__features">
        <p>Just a few of your exclusive features and services:</p>
        <ul>
          <li v-for="(feature, index) in primeFeatureListDefault" :key="index">
            {{ feature }}
          </li>
        </ul>
      </div>
      <div class="modal-prime__button">
        <slot v-if="hasSlot"></slot>
        <Button
          v-else
          size="large"
          variation="prime"
          icon="prime"
          :title="primeButtonText"
          @click="onPrimeButtonHandler"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, useSlots } from 'vue';
import Button from './../components/Button.vue';

withDefaults(defineProps<{ primeButtonText?: string }>(), {
  primeButtonText: 'Continue',
});

const emit = defineEmits<{ onClickPrime: [] }>();
const slots = useSlots();

const primeFeatureListDefault = [
  '100s of Stunning Themes',
  'Every App is FREE',
  'Merch Store with Wholesale Pricing',
  'Custom Web Domain and Email Address',
  'Automatic Gold All-Star Status',
];

const isUserAgentEdge = ref(false);
const hasSlot = computed(() => !!slots.default);

function onPrimeButtonHandler() {
  emit('onClickPrime');
}

onMounted(() => {
  isUserAgentEdge.value = navigator.userAgent.indexOf('Edge') !== -1;
});
</script>

<style lang="less" scoped>
@import './../styles/Imports';
@import './../styles/components/Modals';

.s-modal-welcome-prime {
  position: relative;
  overflow: hidden;
}

.modal-prime__close {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 100;

  .icon-close {
    cursor: pointer;
    color: @light-5;
  }
}

.modal-prime {
  .padding-v-sides(5);
  .padding-h-sides(2);

  .modal-prime__video {
    display: none;

    @media (min-width: 768px) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .modal-prime__heading {
    font-family: 'Barlow', sans-serif;
    font-size: 32px !important;
    font-weight: 800;
    text-align: center;
    color: @dark-2;
    line-height: 40px;

    span {
      color: @prime;
    }
  }

  .modal-prime__desc {
    color: @dark-2;
    font-size: 20px;
    font-weight: 800;
    .margin-top(4);
    text-align: center;
    line-height: 24px;
  }

  .modal-prime__images {
    display: none;

    @media (min-width: 768px) {
      width: 516px;
      margin: 0 auto;
      display: block;
      background:
        url('https://cdn.streamlabs.com/static/imgs/compressed/streamer-4.png'),
        url('https://cdn.streamlabs.com/static/imgs/landing/streamer-2.png');
      height: 238px;
      background-repeat: no-repeat;
      background-size: 48%, 39%;
      background-position:
        229px -25px,
        103px 0;
    }
  }

  .modal-prime__features {
    background: @light-2;
    border-radius: 8px;
    .margin-bottom(3);
    width: 100%;
    .padding(2);
    .margin-top(2.5);

    @media (min-width: 768px) {
      width: 516px;
      margin: 0 auto;
      .margin-bottom(3);
      .margin-top(0);
      .padding-v-sides(3);
      .padding-h-sides(4);
    }

    p {
      color: @dark-2;
      font-size: 18px;
      font-weight: 500;
      text-align: left;
      line-height: 21px;
    }

    ul {
      color: @dark-5;
      font-size: 16px;
      font-weight: normal;
      line-height: 30px;
      .padding-left(2);
      .margin(0);
    }
  }

  .modal-prime__button {
    text-align: center;

    .s-button {
      font-weight: bold;
    }
  }
}
</style>

<style lang="less">
@import './../styles/Imports';

.night,
.night-theme {
  .modal-prime__close {
    .icon-close {
      color: @light-4;
    }
  }

  .modal-prime {
    .modal-prime__heading {
      color: @white;
    }

    .modal-prime__desc {
      color: @white;
    }

    .modal-prime__features {
      background: rgba(43, 56, 63, 0.7);
      p {
        color: @white;
      }
      ul {
        color: @light-4;
      }
    }
  }
}
</style>
