<template>
  <div>
    <div class="section">
      <h1>Callouts</h1>
      <p>
        You can use our callout component if you need to display a message to
        users.
      </p>
      <h4>Rules</h4>
      <ul></ul>

      <pre><code>import { Callout } from 'streamlabs-beaker';

components: {
  Callout
}</code></pre>
    </div>

    <div class="section">
      <h2>Default Callouts</h2>
      <p>
        There are 3 basic callout variations: success, warning, and info. These
        can be used whenever necessary but please limit to 1 callout per page
        and limit the text to 1 line. You can link to more info in a modal or
        another page if needed.
      </p>

      <DemoSection title="Default Callouts" :code="demoCode">
        <template #components>
          <Callout variation="success">
            Success callout. <a href="#0">Link</a>
          </Callout>

          <Callout variation="warning">
            Warning callout. <a href="#0">Link</a>
          </Callout>

          <Callout variation="info">
            Info callout. <a href="#0">Link</a>
          </Callout>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Strong Callouts</h2>
      <p>
        These should be used
        <strong>very sparingly</strong>. These should be used in cases when
        something is going to be completed removed or something could become
        broken/lost if action is not taken.
      </p>

      <p>There are 3 strong callout variations: success, warning, and info.</p>

      <DemoSection title="Strong Callouts" :code="demoCode">
        <template #components>
          <Callout variation="success strong">
            Success callout. <a href="#0">Link</a>
          </Callout>

          <Callout variation="warning strong" icon="warning">
            Warning callout. <a href="#0">Link</a>
          </Callout>

          <Callout variation="info strong">
            Info callout. <a href="#0">Link</a>
          </Callout>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Cookies Callout</h2>
      <p>
        Used on landing page to warn users about use of cookies on our site.
      </p>

      <DemoSection title="Cookies Callouts" :code="demoCode">
        <template #components>
          <Callout
            variation="cookies"
            icon="info"
            :closeable="true"
            :onClose="cookieCalloutClosed"
          >
            Cookies callout. <a href="#0">Link</a>
          </Callout>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Prime Callout</h2>
      <p>
        Prime Callout.
      </p>

      <DemoSection title="Prime Callouts" :code="demoCode">
        <template #components>
          <Callout
            variation="prime"
            :closeable="true"
            @onClick="cookieCalloutClosed"
            :onClose="cookieCalloutClosed"
          >
            Themes, apps, website, merch and more. All included with Prime.
          </Callout>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Callout Options</h2>

      <div class="section">
        <h3>Closable</h3>
        <p>
          Use the <strong>closeable</strong> prop to give the callout the
          ability to close.
        </p>

        <DemoSection title="Closable Callouts" :code="demoCode">
          <template #components>
            <Callout variation="success" :closeable="true">
              Success callout. <a href="#0">Link</a>
            </Callout>
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>With Icon</h3>
        <p>
          You can use the
          <code>icon</code> prop to set it to 'success', 'warning', or 'info'
          for most common cases. If you need a different icon you can simply use
          it inline.
        </p>

        <DemoSection title="Icon Callouts" :code="demoCode">
          <template #components>
            <Callout icon="success" variation="success" :closeable="true">
              Success callout. <a href="#0">Link</a>
            </Callout>

            <Callout icon="warning" variation="warning" :closeable="true">
              Warning callout. <a href="#0">Link</a>
            </Callout>

            <Callout icon="info" variation="info" :closeable="true">
              Info callout. <a href="#0">Link</a>
            </Callout>

            <Callout variation="info" :closeable="true">
              <i class="icon-settings"></i> Settings have moved. Visit them
              <a href="#0">here</a>.
            </Callout>
          </template>
        </DemoSection>
      </div>
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
            <td>variation</td>
            <td>string</td>
            <td>'success'</td>
            <td>
              Use
              <code>'success'</code>, <code>'warning'</code>,
              <code>'info'</code>, <code>'cookies'</code> or
              <code>'prime'</code>. Add <code>'strong'</code> when necessary.
            </td>
          </tr>
          <tr>
            <td>closeable</td>
            <td>boolean</td>
            <td>false</td>
            <td>Added an icon with a function that closes the callout.</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>boolean</td>
            <td>true</td>
            <td>
              Set to false if you don't want an icon before the callout content.
            </td>
          </tr>
          <tr>
            <td>onClose</td>
            <td>Function</td>
            <td>-</td>
            <td>on close callback</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Callout from "./../components/Callout.vue";
import CalloutsCode from "./Callouts.vue?raw";
import DemoSection from "./../components/DemoSection.vue";

@Component({
  components: {
    Callout,
    DemoSection
  }
})
export default class Callouts extends Vue {
  demoCode = CalloutsCode;
  cookieCalloutClosed() {
    console.log("cookie callout closed");
  }
}
</script>

<style lang="less" scoped></style>
