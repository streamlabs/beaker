<template>
  <div>
    <div class="section">
      <h1>Content Row</h1>
      <pre><code>import { ContentRow } from 'streamlabs-beaker';

components: {
  ContentRow
}</code></pre>
    </div>

    <div class="section">
      <h2>Content Row</h2>
      <p>Used for content row.</p>

      <DemoSection title="Content Row" :code="demoCode">
        <template #components>
          <ContentRow
            :icon="'desktop'"
            :btnVariation="'default'"
            :btnTitle="'Default'"
          >
            <span slot="title">Tiltify</span>
            <span slot="text">
              Link your account and visit Alert Box to configure your Tiltify
              Events.
            </span>
          </ContentRow>
        </template>
      </DemoSection>

      <ContentRow
        :icon="'education'"
        :btnVariation="'action'"
        :btnTitle="'Action'"
      >
        <template slot="title"
          >Tiltify</template
        >
        <template slot="text"
          >Link your account and visit Alert Box to configure your Tiltify
          Events.</template
        >
      </ContentRow>
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
          <td>icon</td>
          <td>string</td>
          <td>null</td>
          <td>icon to display. Options are listed in Icons page.</td>
        </tr>

        <tr>
          <td>btnVariation</td>
          <td>string</td>
          <td>default</td>
          <td>
            The variation style of a button. Primary options are
            <code>default</code>, <code>action</code> and <code>warning</code>.
            Other options are <code>subscribe</code>, <code>paypal</code>,
            <code>download</code> and <code>navigation</code>. Platform options
            are <code>facebook</code>, <code>mixer</code>, <code>twitch</code>,
            <code>yt</code>, <code>periscope</code> and <code>picarto</code>.
          </td>
        </tr>

        <tr>
          <td>btnTitle</td>
          <td>string</td>
          <td>null</td>
          <td>button title to display</td>
        </tr>

        <tr>
          <td>buttonHref</td>
          <td>String</td>
          <td>null</td>
          <td>
            Used if the the
            <code>type</code> is an <code>a</code> element (links).
          </td>
        </tr>
        <tr>
          <td>buttonTo</td>
          <td>String</td>
          <td>null</td>
          <td>
            Used if the the
            <code>type</code> is a <code>router-link</code>. Define the path.
          </td>
        </tr>
        <tr>
          <td>buttonTag</td>
          <td>String</td>
          <td>button</td>
          <td>
            What type of element the component is. Options are
            <code>button</code>, <code>a</code>,
            <code>router-link</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContentRow from "./../components/ContentRow.vue";
import DemoSection from "./../components/DemoSection.vue";
import LayoutsCode from "./Layouts.vue?raw";

@Component({
  components: {
    ContentRow,
    DemoSection
  }
})
export default class Layouts extends Vue {
  demoCode = LayoutsCode;
}
</script>
