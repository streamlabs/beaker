<template>
  <div>
    <div class="section">
      <h1>Guards</h1>

      <pre><code>import { Guard } from 'streamlabs-beaker';

components: {
  Guard
}</code></pre>
    </div>

    <div class="section">
      <h2>Text Guard</h2>

      <DemoSection title="Text Guard" :code="demoCode">
        <template #components>
          <Guard class="guard-margin" type="alt" value="Text" />
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Input Guard</h2>

      <DemoSection title="Input Guard" :code="demoCode">
        <template #components>
          <Guard type="input">
            <div slot="content">
              <TextInput
                slot="input"
                label="Text input"
                type="text"
                :placeholder="textInputPlaceholder"
                v-model="textInputValue"
                name="textExample"
              />
            </div>
          </Guard>
        </template>
      </DemoSection>
    </div>

    <!-- <div class="section">
      <h2>Text Guard</h2>

      <DemoSection title="Text Guard" :code="demoCode">
        <template #components>
          <GuardNew :value="textInputValue" />
        </template>
      </DemoSection>
    </div>-->

    <table class="docs-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>value</td>
          <td>string</td>
          <td>null</td>
          <td>Text Value</td>
        </tr>
        <tr>
          <td>type</td>
          <td>string</td>
          <td>text</td>
          <td>
            This can be either text or input (supply content slot for input)
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DemoSection from "./../components/DemoSection.vue";
import Guard from "./../components/Guard.vue";
import GuardNew from "./../components/GuardNew.vue";
import GuardsCode from "./Guards.vue?raw";
import TextInput from "./../components/TextInput.vue";

@Component({
  components: {
    DemoSection,
    Guard,
    GuardNew,
    TextInput
  }
})
export default class Accordions extends Vue {
  demoCode = GuardsCode;
  textInputPlaceholder = "placeholder";
  textInputValue = "This is something super secret...";
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.guard-margin {
  margin-bottom: 10px;
}
</style>
