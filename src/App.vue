<template>
  <div id="app" :class="[isNightTheme ? nightClasses : '', appClass]">
    <div id="nav">
      <div class="logo">
        <img v-if="isNightTheme" src="./assets/imgs/beaker-full-night.svg" />
        <img v-else src="./assets/imgs/beaker-full.svg" />
      </div>
      <toggle :values="themes" :value="theme" @input="theme = $event"></toggle>
    </div>

    <documentation></documentation>

    <div class="floating-links">
      <a
        class="floating-link"
        target="_blank"
        href="https://github.com/mbiemiller/beaker"
      >
        <img src="./assets/imgs/github.png" />
      </a>
      <a
        class="floating-link"
        target="_blank"
        href="https://www.npmjs.com/package/streamlabs-beaker"
      >
        <img src="./assets/imgs/npm.svg" />
      </a>
    </div>
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ModalsContainer, useVfm } from "vue-final-modal";
import { useRouter } from "vue-router";
import Toggle from "./components/Toggle.vue";
import Documentation from "./views/Documentation.vue";

const appClass = "app-wrapper";
const nightClasses = ["night", "night-theme"];
const theme = ref("night");
const themes = { day: "Day", night: "Night" };

const isNightTheme = computed(() => theme.value === "night");

const vfm = useVfm();
const router = useRouter();
router.beforeEach(() => { vfm.closeAll(); });
</script>

<style lang="less">
@import "./styles/App";
@import "./styles/Imports";

#nav {
  border-bottom: 1px solid @day-border;
  .margin-bottom(3);
  position: relative;
  .padding-bottom();

  a {
    .weight(@medium);
    color: @day-paragraph;

    &.router-link-exact-active {
      color: @teal;
    }
  }

  .s-toggle {
    position: absolute;
    left: 0;
    bottom: -54px;
  }
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
  position: absolute;
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
  #nav {
    border-bottom-color: @night-border;
  }
}
</style>
