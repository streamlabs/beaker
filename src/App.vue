<template>
  <div class="app-wrapper">
    <header class="app-header">
      <div class="logo">
        <img :src="isDark ? nightLogo : dayLogo" alt="Beaker Logo" />
      </div>
    </header>

    <Documentation />

    <div class="floating-links">
      <a
        class="floating-link"
        target="_blank"
        href="https://github.com/streamlabs/beaker"
      >
        <img src="./assets/imgs/github.png" alt="Github Logo" />
      </a>
      <a
        class="floating-link"
        target="_blank"
        href="https://www.npmjs.com/package/streamlabs-beaker"
      >
        <img src="./assets/imgs/npm.svg" alt="NPM Logo" />
      </a>
    </div>
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal';
import Documentation from './views/Documentation.vue';
import { useDark } from '@vueuse/core';

import dayLogo from './assets/imgs/beaker-full.svg';
import nightLogo from './assets/imgs/beaker-full-night.svg';

const isDark = useDark();
</script>

<style lang="less">
@import './styles/App';
@import './styles/Imports';

.app-header {
  position: relative;
  .margin-bottom(3);
  .padding-bottom();
  border-bottom: 1px solid @day-border;
}

.app-wrapper {
  .padding(3);
  overflow-y: auto;
  height: 100%;
}

.logo {
  width: 120px;
}

.floating-links {
  position: fixed;
  bottom: 40px;
  right: 40px;
}

.floating-link {
  width: 48px;
  height: 48px;
  .radius(10);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: @dark-2;
  .padding();
  .margin-top();
}

.night,
.night-theme {
  .app-header {
    border-bottom-color: @night-border;
  }
}
</style>
