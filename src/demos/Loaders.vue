<template>
  <div>
    <div class="section">
      <h1>Loaders</h1>
      <p>
        These are animated with pure SVG, they will not be animated in Microsoft
        Edge, or Opera, and will look different in firefox.
      </p>

      <div class="section">
        <h2>Full Page Loading</h2>

        <pre><code>import { Loading } from 'streamlabs-beaker';

components: {
  Loading
}</code></pre>

        <div class="section">
          <h2>Standard</h2>

          <div class="section">
            <DemoSection title="Standard" :code="demoCode">
              <template #components>
                <Loading
                  v-if="isLoading"
                  :loadingStrs="string"
                  @closeLoading="isLoading = false"
                />
              </template>
            </DemoSection>
          </div>

          <div class="s-button-container s-button-container--left">
            <Button
              variation="default"
              title="loading default"
              @click="isLoading = true"
            />
          </div>
        </div>

        <div class="section">
          <h2>Semi-Opaque Background</h2>

          <div class="section">
            <DemoSection title="Semi-Opaque Background" :code="demoCode">
              <template #components>
                <Loading
                  v-if="isLoadingSemi"
                  :semiOpaque="true"
                  :loadingStrs="array"
                  :isRandom="true"
                  @closeLoading="isLoadingSemi = false"
                />
              </template>
            </DemoSection>
          </div>

          <div class="s-button-container s-button-container--left">
            <Button
              variation="default"
              title="loading semi opaque"
              @click="isLoadingSemi = true"
            />
          </div>
        </div>

        <div class="section">
          <h2>Full Page Loading - Swapped</h2>

          <div class="section">
            <DemoSection title="Full Page Loading - Swapped" :code="demoCode">
              <template #components>
                <Loading
                  v-if="isLoadingSwapped"
                  :loadingStrs="array"
                  :isRandom="true"
                  :swapMode="true"
                  @closeLoading="isLoadingSwapped = false"
                />
              </template>
            </DemoSection>
          </div>

          <div class="s-button-container s-button-container--left">
            <Button
              variation="default"
              title="loading swapped option"
              @click="isLoadingSwapped = true"
            />
          </div>
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
              <td>loadingStrs</td>
              <td>any[] | string</td>
              <td>-</td>
              <td>
                Pass an array of stings into the loader. We recommend 3-4. Each
                shows for 4 seconds before it rotates.
              </td>
            </tr>
            <tr>
              <td>isRandom</td>
              <td>boolean</td>
              <td>false</td>
              <td>
                Randomize the strings if you set
                <code>loadingStrs</code>as an array
              </td>
            </tr>
            <tr>
              <td>semiOpaque</td>
              <td>boolean</td>
              <td>false</td>
              <td>
                Sets the background overlay to semi-opacity rather than full
                opacity.
              </td>
            </tr>
            <tr>
              <td>swapMode</td>
              <td>boolean</td>
              <td>false</td>
              <td>
                In case you need to swap day/night mode - used for Creator
                Sites.
              </td>
            </tr>
            <tr>
              <td>fixedBackground</td>
              <td>boolean</td>
              <td>true</td>
              <td>
                Allows loader to take dimensions of parent if set to
                <code>false</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <h2>Section Loading Spinners</h2>

      <pre><code>import { Spinner } from 'streamlabs-beaker';

components: {
  Spinner
}</code></pre>

      <h3>Loading Spinner</h3>
      <p>This is the standard size for sections within a page layout.</p>

      <div class="section">
        <DemoSection title="Loading Spinner" :code="demoCode">
          <template #components>
            <Spinner size="small" />
          </template>
        </DemoSection>
      </div>

      <h3>Loading Spinner Large</h3>
      <p>
        This is the large size spinner. It should only be used in large sections
        or full page transitions.
      </p>

      <div class="section">
        <DemoSection title="Loading Spinner Large" :code="demoCode">
          <template #components>
            <Spinner size="large" />
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
            <td>size</td>
            <td>String</td>
            <td>'small'</td>
            <td>'small', 'large'</td>
          </tr>
          <tr>
            <td>swap</td>
            <td>Boolean</td>
            <td>false</td>
            <td>
              If you need to swap day/night mode [ true ], default: [ false ]
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Accordion from "./../components/Accordion.vue";
import Button from "./../components/Button.vue";
import LoadersCode from "./Loaders.vue?raw";
import DemoSection from "./../components/DemoSection.vue";
import Loading from "./../components/Loading.vue";
import Spinner from "./../components/Spinner.vue";

@Component({
  components: {
    Accordion,
    Button,
    DemoSection,
    Loading,
    Spinner
  }
})
export default class Loaders extends Vue {
  demoCode = LoadersCode;
  isLoading = false;
  isLoadingSemi = false;
  isLoadingSwapped = false;

  array = [
    "This loader is using an array of strings...",
    "Syncing all files to our cloud...",
    "Lorem ipsum dolor sit amet, consectetur...",
    "Sed do eiusmod tempor incididunt ut labore..."
  ];
  string = "This loader is using a single string...";
}
</script>
