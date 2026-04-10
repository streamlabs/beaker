<template>
  <div>
    <div class="section">
      <h1>Progress Bars</h1>

      <pre><code>import { ProgressBar } from "streamlabs-beaker"

components: {
  ProgressBar
}</code></pre>

      <DemoSection title="Default" :code="demoCode">
        <template #components>
          <ProgressBar :progressComplete="50" />
        </template>
      </DemoSection>
    </div>

    <table class="docs-table">
      <thead>
        <tr>
          <th>Props</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>progressComplete</td>
          <td>Number</td>
          <td>null</td>
          <td>Progress complete in percentage</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProgressBar from "./../components/ProgressBar.vue";
import ProgressBarsCode from "./ProgressBars.vue?raw";
import DemoSection from "./../components/DemoSection.vue";

const demoCode = ProgressBarsCode;
const value = ref(50);
</script>
