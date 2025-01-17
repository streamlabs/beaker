<template>
  <div class="documentation">
    <LeftNavigation />
    <!-- @update-section="changeSection"
    :active-section="activeSection" -->

    <div class="content">
      <RouterView />
    </div>
    <CopyNotification />
  </div>
</template>

<script setup lang="ts">
import CopyNotification from "../components/CopyNotification.vue";
import LeftNavigation from "../demos/LeftNavigation.vue";
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.documentation {
  display: grid;
  grid-template-columns: 180px auto;
  column-gap: 80px;

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

.content {
  height: calc(100vh - 116px);
  overflow-y: auto;
  padding-right: 16px;
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
