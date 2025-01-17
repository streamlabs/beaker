<template>
  <div id="app-component" :class="[isNightTheme ? nightClasses : '', appClass]">
    <div id="nav">
      <div class="logo">
        <img :src="logo" />
      </div>
      <Toggle v-model="theme" :values="themes" />
    </div>

    <Documentation />

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
import { computed, ref, watch } from "vue";
import Toggle from "./components/Toggle.vue";
import Documentation from "./views/Documentation.vue";
import DayLogo from "./assets/imgs/beaker-full.svg";
import NightLogo from "./assets/imgs/beaker-full-night.svg";
import { ModalsContainer } from "vue-final-modal";

const appClass = ref("app-wrapper");
const nightClasses = ref(["night", "night-theme"]);
const theme = ref("night");

const themes = ref({
  day: "Day",
  night: "Night",
});

const isNightTheme = computed(() => theme.value === "night");

watch(
  isNightTheme,
  (isNight) => {
    const app = document.querySelector("#app");

    if (isNight) {
      nightClasses.value.forEach((item) => {
        app?.classList.add(item);
      });
    } else {
      nightClasses.value.forEach((item) => {
        app?.classList.remove(item);
      });
    }
  },
  { immediate: true }
);

const logo = computed(() => (isNightTheme.value ? NightLogo : DayLogo));
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
  #nav {
    border-bottom-color: @night-border;
  }
}
</style>
