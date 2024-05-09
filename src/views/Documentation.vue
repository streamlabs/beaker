<template>
  <div class="documentation">
    <left-navigation
      @update-section="changeSection"
      :active-section="activeSection"
    />

    <div class="content">
      <router-view />
    </div>
    <copy-notification />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CopyNotification from "../components/CopyNotification.vue";
import LeftNavigation from "../demos/LeftNavigation.vue";

const activeSection = ref("installation");

function changeSection(newSection: string) {
  activeSection.value = newSection;
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.documentation {
  display: grid;
  grid-template-columns: 180px auto;
  grid-gap: 80px;

  code {
    background-color: @light-3;
    color: @dark-2;
    padding: 0 4px;
    margin: 0 2px;
  }

  pre {
    code {
      background-color: transparent;
      color: inherit;
      padding: 0;
      margin: 0;
    }
  }
}

.s-accordion {
  pre {
    .margin-bottom(@0);
  }
}

.docs-table {
  font-family: "Courier New", Courier, monospace;

  th {
    font-family: "Roboto";
  }

  tr {
    td {
      &:last-child {
        font-family: "Roboto";
      }
    }
  }
}

.night,
.night-theme {
  code {
    background-color: @dark-5;
    color: @light-1;
  }
}
</style>
