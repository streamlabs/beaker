<template>
  <div class="section">
    <h1>Assets</h1>
    <div class="logo-demos logo-demos--icons">
      <div class="logo-demo">
        <a href="/img/kevin-standard.svg" download>
          <img src="./../assets/imgs/kevin-standard.svg" />
        </a>
      </div>
    </div>
    <div class="logo-demos">
      <div class="logo-demo logo-demo--day">
        <a href="/img/kevin-day.svg" download>
          <img src="./../assets/imgs/kevin-day.svg" />
        </a>

        <a href="/img/logo.svg" download>
          <img src="./../assets/imgs/logo.svg" />
        </a>
        <a href="/img/logo-slobs.svg" download>
          <img src="./../assets/imgs/logo-slobs.svg" />
        </a>
        <a href="/img/logo-merch.svg" download>
          <img src="./../assets/imgs/logo-merch.svg" />
        </a>
        <a href="/img/logo-platform.svg" download>
          <img src="./../assets/imgs/logo-platform.svg" />
        </a>
        <a href="/img/logo-mobile.svg" download>
          <img src="./../assets/imgs/logo-mobile.svg" />
        </a>
      </div>
      <div class="logo-demo logo-demo--night">
        <a href="/img/kevin-night.svg" download>
          <img src="./../assets/imgs/kevin-night.svg" />
        </a>
        <a href="/img/logo-night.svg" download>
          <img src="./../assets/imgs/logo-night.svg" />
        </a>
        <a href="/img/logo-slobs-night.svg" download>
          <img src="./../assets/imgs/logo-slobs-night.svg" />
        </a>
        <a href="/img/logo-merch-night.svg" download>
          <img src="./../assets/imgs/logo-merch-night.svg" />
        </a>
        <a href="/img/logo-platform-night.svg" download>
          <img src="./../assets/imgs/logo-platform-night.svg" />
        </a>
        <a href="/img/logo-mobile-night.svg" download>
          <img src="./../assets/imgs/logo-mobile-night.svg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Assets extends Vue {}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";

.logo-demos {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 24px;
}

.logo-demos--icons {
  .margin-bottom(3);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  .logo-demo {
    img {
      width: 200px;
      height: auto;
    }
  }
}

.logo-demo {
  width: auto;
  display: grid;
  grid-gap: 16px;
  .radius();
  .padding(2);

  img {
    height: 40px;
    width: auto;
  }
}

.logo-demo--day {
  background-color: @day-section;
}

.logo-demo--night {
  background-color: @night-bg;
}
</style>
