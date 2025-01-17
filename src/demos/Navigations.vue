<template>
  <div>
    <div class="section">
      <h2>Horizintal Scroll</h2>
      <p>
        Our slider component is extended from
        <a
          target="_blank"
          href="https://github.com/NightCatSama/vue-slider-component"
          >Vue Slider Component</a
        >
      </p>
      <accordion :openedTitle="'Hide Code'" :closedTitle="'Show Code'">
        <div slot="content">
          <pre>
<code>&lt;slider
  :min=&quot;0&quot;
  :max=&quot;100&quot;
  :interval=&quot;1&quot;
  :value=&quot;50&quot;&gt;
&lt;/slider&gt;</code></pre>
        </div>
      </accordion>

      <div class="row">
        <scroll-nav></scroll-nav>
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
            <td>interval</td>
            <td>Number</td>
            <td>1</td>
            <td>The steps between the values</td>
          </tr>
          <tr>
            <td>max</td>
            <td>Number</td>
            <td>null</td>
            <td>The maximum numerical value that can be selected</td>
          </tr>
          <tr>
            <td>min</td>
            <td>Number</td>
            <td>null</td>
            <td>The minimum numerical value that can be selected</td>
          </tr>
          <tr>
            <td>suffix</td>
            <td>String</td>
            <td>px</td>
            <td>
              Suffix label that will be displayed next to the value in the
              tooltip
            </td>
          </tr>
          <tr>
            <td>tooltip</td>
            <td>String</td>
            <td>always</td>
            <td>Show the tooltip or not. Options are 'always' or 'false'</td>
          </tr>
          <tr>
            <td>value</td>
            <td>Number, String, Array, Object</td>
            <td>1</td>
            <td>Initial value of the slider.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Accordion from "@/components/Accordion.vue";
import ScrollNav from "@/components/ScrollNav.vue";
</script>
