<template>
  <div>
    <h1>Sliders</h1>
    <!-- General / Intro -->
    <div class="section">
      <div class="row">
        <p>
          Our slider component is extended from
          <a
            target="_blank"
            href="https://github.com/NightCatSama/vue-slider-component"
            >Vue Slider Component</a
          >
          and makes use of
          <a
            target="_blank"
            href="https://github.com/que-etc/resize-observer-polyfill"
            >Resize Observer Polyfill</a
          >.
        </p>
      </div>
      <pre><code>import { Slider } from 'streamlabs-beaker';

components: {
  Slider
}</code></pre>
    </div>

    <!-- Custom Data -->
    <div class="section">
      <h2>Default Slider</h2>
      <DemoSection title="Default Slider" :code="demoCode">
        <template #components>
          <slider
            :value="value"
            @input="value => updateValue(value)"
            :max="100"
            :min="1"
            :interval="1"
            tooltip="always"
            suffix="%"
          />
        </template>
      </DemoSection>
    </div>

    <!-- Simple Theme -->
    <div class="section">
      <h2>Simple Theme</h2>
      <p>
        Use in more compact places when you don't want the bright teal present.
      </p>
      <DemoSection title="Simple Theme" :code="demoCode">
        <template #components>
          <slider
            :value="value"
            @input="value => updateValue(value)"
            :max="100"
            :min="1"
            :interval="1"
            tooltip="always"
            suffix="%"
            :simpleTheme="true"
          />
        </template>
      </DemoSection>
    </div>

    <!-- Props Table -->
    <div class="section">
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
            <td>width</td>
            <td>Number, String</td>
            <td>auto</td>
            <td>The width of the component.</td>
          </tr>
          <tr>
            <td>value</td>
            <td>Number, String, Array</td>
            <td>1</td>
            <td>Initial value of the slider.</td>
          </tr>
          <tr>
            <td>min</td>
            <td>Number</td>
            <td>0</td>
            <td>The minimum numerical value that can be selected</td>
          </tr>
          <tr>
            <td>max</td>
            <td>Number</td>
            <td>100</td>
            <td>The maximum numerical value that can be selected</td>
          </tr>
          <tr>
            <td>interval</td>
            <td>Number</td>
            <td>1</td>
            <td>The steps between the values</td>
          </tr>
          <tr>
            <td>tooltip</td>
            <td>String</td>
            <td>always</td>
            <td>Show the tooltip or not. Options are 'always' or 'false'</td>
          </tr>
          <tr>
            <td>prefix</td>
            <td>String</td>
            <td>""</td>
            <td>
              Prefix label that will be displayed next to the value in the
              tooltip
            </td>
          </tr>
          <tr>
            <td>suffix</td>
            <td>String</td>
            <td>""</td>
            <td>
              Suffix label that will be displayed next to the value in the
              tooltip
            </td>
          </tr>
          <tr>
            <td>data</td>
            <td>Array</td>
            <td>null</td>
            <td>Custom data.</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Whether to disable the component.</td>
          </tr>
          <tr>
            <td>simpleTheme</td>
            <td>Boolean</td>
            <td>false</td>
            <td>
              Use for toned down colors to avoid bright teal in small areas.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="section">
      <div class="row">
        <h1>NEW SLIDER</h1>
        <p>Dont use this yet.</p>
        <div class="flex-row">
          <slider-two
            :value="localValue"
            @input="value => updateLocalValue(value)"
            :min="0"
            :max="100"
            :dataIndexing="false"
            :suffix="'%'"
          />
          <div class="icon-holder"><i class="fas fa-question-circle"></i></div>
        </div>
      </div>
    </div>

    <slider-two
      :value="localValueTwo"
      @input="value => updateLocalValueTwo(value)"
      :data="data"
      :marks="true"
    /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slider from "./../components/Slider.vue";
import SliderTwo from "./../components/SliderTwo.vue";
import Accordion from "./../components/Accordion.vue";
import SlidersCode from "./Sliders.vue?raw";
import DemoSection from "./../components/DemoSection.vue";
@Component({
  components: {
    Accordion,
    DemoSection,
    Slider,
    SliderTwo
  }
})
export default class Sliders extends Vue {
  demoCode = SlidersCode;
  localValue: number | string = 15;

  updateLocalValue(value) {
    this.localValue = value;
  }

  localValueTwo: number | string = 15;

  updateLocalValueTwo(value) {
    this.localValueTwo = value;
  }

  value = 50;
  data = ["one", "two", "three", "four", "five", "six"];
  updateValue(value) {
    console.log(value); // this function is required, it doesn't have to do anything, it just needs to exist.
  }
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.flex-row {
  display: flex;
  flex-direction: row;
}

.icon-holder {
  .margin-left(2);
}
</style>
