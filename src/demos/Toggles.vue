<template>
  <div>
    <div class="section">
      <h1>Toggles</h1>
      <p>Toggle between multiple custom options such as show and hide.</p>

      <pre><code>import { Toggle } from 'streamlabs-beaker';

components: {
  Toggle
}</code></pre>
    </div>

    <div class="section">
      <h2>Icon Toggles</h2>
      <DemoSection title="Icon Toggles" :code="demoCode">
        <template #components>
          <Toggle
            :values="{
              show: `<i class='icon-view'></i>`,
              hide: `<i class='icon-hide'></i>`
            }"
            v-model="selectedOption"
          />
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Text Toggles</h2>
      <DemoSection title="Text Toggles" :code="demoCode">
        <template #components>
          <Toggle
            :values="{
              revenue: 'Revenue',
              growth: 'Growth'
            }"
            v-model="selectedTextOption"
            :variation="'text'"
          />
        </template>
      </DemoSection>
    </div>

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
          <td>values</td>
          <td>object</td>
          <td>null</td>
          <td>
            Set toggle options with strings for the keys and HTML for the
            values. Keys will also be displayed as toggle title attributes.
          </td>
        </tr>
        <tr>
          <td>v-model</td>
          <td>string</td>
          <td>null</td>
          <td>Use as a bind to the currently selected toggle option.</td>
        </tr>
        <tr>
          <td>variation</td>
          <td>string</td>
          <td>null</td>
          <td>
            Add a toggle variation for a subtle style change. Options are
            <code>text</code>.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DemoSection from "./../components/DemoSection.vue";
import Toggle from "./../components/Toggle.vue";
import TogglesCode from "./Toggles.vue?raw";

@Component({
  components: {
    DemoSection,
    Toggle
  }
})
export default class Toggles extends Vue {
  demoCode = TogglesCode;
  selectedOption = "show";
  selectedTextOption = "revenue";
}
</script>
