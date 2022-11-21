<template>
  <div>
    <div class="section">
      <h1>Accordions</h1>

      <pre><code>Import { Accordion } from 'streamlabs-beaker';

components: {
  Accordion
}</code></pre>
    </div>

    <!-- Default Settings -->
    <div class="section">
      <h3>Default Settings</h3>
      <DemoSection title="Default Settings" :code="demoCode">
        <template #components>
          <div @click="openAccordion(true)">Open Accordion</div>
          <div @click="openAccordion(false)">Close Accordion</div>

          <Accordion
            opened-title="Hide Content"
            closed-title="Show Content"
            v-model="isOpened"
          >
            <div slot="content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>
          </Accordion>
        </template>
      </DemoSection>
    </div>

    <!-- Set to be open -->
    <div class="section">
      <h3>Set to be open</h3>
      <DemoSection title="Set to be open" :code="demoCode">
        <template #components>
          <Accordion
            opened-title="Hide Content"
            closed-title="Show Content"
            :isOpened="true"
          >
            <div slot="content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>
          </Accordion>
        </template>
      </DemoSection>
    </div>

    <!-- Alternative - No Border -->
    <div class="section">
      <h3>Alternative - No Border</h3>
      <DemoSection title="Alternative - No Border" :code="demoCode">
        <template #components>
          <Accordion
            opened-title="Hide Content"
            closed-title="Show Content"
            :noBorder="true"
          >
            <div slot="content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>
          </Accordion>
        </template>
      </DemoSection>
    </div>

    <!-- Accordion within an Accordion -->
    <div class="section">
      <h3>Accordion within an Accordion</h3>
      <DemoSection title="Accordion within an Accordion" :code="demoCode">
        <template #components>
          <Accordion
            opened-title="Hide Inner Accordion"
            closed-title="Show Inner Accordion"
          >
            <div slot="content">
              <div class="section">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>

              <Accordion
                opened-title="Hide Content"
                closed-title="Show Content"
                v-model="isOpened"
              >
                <div slot="content">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </div>
              </Accordion>
            </div>
          </Accordion>
        </template>
      </DemoSection>
    </div>

    <!-- Variant - Left Navigation -->
    <div class="section">
      <h3>Variant - Left Navigation</h3>
      <DemoSection title="Left Navigation" :code="demoCode">
        <template #components>
          <Accordion :leftNav="true">
            <div slot="title">Left Navigation</div>
            <div slot="content">
              <div class="fake-nav">
                <a href="#" class="fake-nav-item">
                  <div class="fake-nav-icon">
                    <i class="icon-community"></i>
                  </div>
                  <div class="fake-nav-title">Nav Item</div>
                </a>
                <a href="#" class="fake-nav-item">
                  <div class="fake-nav-icon">
                    <i class="icon-dashboard"></i>
                  </div>
                  <div class="fake-nav-title">Styling Handled By</div>
                </a>
                <a href="#" class="fake-nav-item">
                  <div class="fake-nav-icon">
                    <i class="icon-earnings"></i>
                  </div>
                  <div class="fake-nav-title">Slot and navigation.less</div>
                </a>
              </div>
            </div>
          </Accordion>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h3>Open/Close Icon</h3>
      <DemoSection title="Open/Close Settings" :code="demoCode">
        <template #components>
          <Accordion opened-title="Hide Content" closed-title="Show Content">
            <template #open-close-icon="{isOpen}">
              <transition name="fadeFast" mode="out-in">
                <i v-if="!isOpen" key="open" class="icon-down" />
                <i v-else key="close" class="icon-back" />
              </transition>
            </template>
            <div slot="content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>
          </Accordion>
        </template>
      </DemoSection>
    </div>

    <div class="section">
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
            <td>v-model</td>
            <td>boolean</td>
            <td>null</td>
            <td>Use to sync accordion being open/closed</td>
          </tr>
          <tr>
            <td>openedTitle</td>
            <td>string</td>
            <td>null</td>
            <td>Title to display when accordion is open</td>
          </tr>
          <tr>
            <td>closedTitle</td>
            <td>string</td>
            <td>null</td>
            <td>Title to display when accordion is closed</td>
          </tr>
          <tr>
            <td>title</td>
            <td>string</td>
            <td>null</td>
            <td>(Optional) Overrides both open and closed titles</td>
          </tr>
          <tr>
            <td>isOpened</td>
            <td>boolean</td>
            <td>false</td>
            <td>Have the accordion open by default</td>
          </tr>
          <tr>
            <td>noBorder</td>
            <td>boolean</td>
            <td>false</td>
            <td>Alternative style with no border or padding</td>
          </tr>
          <tr>
            <td>leftNav</td>
            <td>boolean</td>
            <td>false</td>
            <td>Alternative style for use in Left Navigation</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Accordion from "./../components/Accordion.vue";
import AccordionCode from "./Accordions.vue?raw";
import DemoSection from "./../components/DemoSection.vue";

@Component({
  components: {
    Accordion,
    DemoSection
  }
})
export default class Accordions extends Vue {
  demoCode = AccordionCode;
  isOpened: boolean | null = true;

  openAccordion(bool) {
    this.isOpened = bool;
  }
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.fake-nav {
  width: 300px;
  display: flex;
  flex-direction: column;

  &-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 32px;
    text-decoration: none;
  }

  &-icon {
    color: @dark-2;
    .margin-right(1);
  }

  &-title {
    color: @dark-2;
    font-weight: @medium;
    font-size: 14px;
  }
}

.night {
  .fake-nav {
    &-icon,
    &-title {
      color: @white;
    }
  }
}
</style>
