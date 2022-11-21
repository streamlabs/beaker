<template>
  <div>
    <div class="section">
      <h1>Color Picker</h1>
      <p>This color picker uses a chrome style picker</p>

      <pre><code>import { ColorPicker } from "streamlabs-beaker"

components: {
  ColorPicker
}</code></pre>
    </div>

    <div class="section">
      <h2>Default Color Picker</h2>

      <div class="section">
        <DemoSection title="Default" :code="demoCode">
          <template #components>
            <ColorPicker v-model="color" />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>With Alpha</h3>
        <DemoSection title="Alpha" :code="demoCode">
          <template #components>
            <ColorPicker v-model="alphaColor" :hasAlpha="true" />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>Mini, with hex code selector</h3>
        <DemoSection title="Mini" :code="demoCode">
          <template #components>
            <ColorPicker :isMini="true" v-model="miniColor" />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>Mini, with icon (optional)</h3>
        <DemoSection title="MiniIcon" :code="demoCode">
          <template #components>
            <ColorPicker
              icon="icon-text"
              :isMini="true"
              v-model="miniIconColor"
            />
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
            <td>value</td>
            <td>String</td>
            <td>#31c3a2</td>
            <td>Color to show up on a fresh color picker</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>String</td>
            <td>null</td>
            <td>It shows as a placeholder in case of blank</td>
          </tr>
          <tr>
            <td>hasAlpha</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Option to add alpha setting for the color picker</td>
          </tr>
          <tr>
            <td>input events</td>
            <td>event</td>
            <td>-</td>
            <td>
              Use any standard input field event and it will be tracked to the
              input field
            </td>
          </tr>
          <tr>
            <td>isMini</td>
            <td>Boolean</td>
            <td>false</td>
            <td>
              Mini colorpicker, as just a square. Includes hex code in color
              picker dropdown.
            </td>
          </tr>
          <tr>
            <td>icon</td>
            <td>String</td>
            <td>null</td>
            <td>
              Icon to use with mini colorpicker.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ColorPicker from "./../components/ColorPicker.vue";
import ColorPickersCode from "./ColorPickers.vue?raw";
import DemoSection from "./../components/DemoSection.vue";

@Component({
  components: {
    ColorPicker,
    DemoSection
  }
})
export default class ColorPickers extends Vue {
  demoCode = ColorPickersCode;
  color = "#5E3BEC";
  alphaColor = "#EB7777";
  miniColor = "#5E3BEC";
  miniIconColor = "#5E3BEC";
}
</script>
