<template>
  <div>
    <div class="section">
      <h1>Badges</h1>
      <p>
        By default, our Badges are designed to be on the right side of elements
        with 8px of margin on the left. If you would like to use a Badge on the
        left side of an element, set prop
        <code>align-left="true"</code> and it will switch the margin to be on
        the right side.
      </p>

      <pre><code>import { Badge } from 'streamlabs-beaker';

components: {
  Badge
}</code></pre>

      <div class="section">
        <h2>Standard Badges</h2>
        <DemoSection title="Standard Badges" :code="demoCode">
          <template #components>
            <Badge variant="beta" :align-left="true">Beta</Badge>
            <Badge variant="new" :align-left="true">New</Badge>
            <Badge variant="warning" :align-left="true">Error</Badge>
            <Badge variant="tag" :align-left="true">Tag</Badge>
            <Badge variant="pro" :align-left="true">Pro</Badge>
            <Badge
              :align-left="true"
              background-color="pink"
              text-color="#ffffff"
              >Custom</Badge
            >
            <Badge variant="prime" :align-left="true" />
            <Badge variant="ultra" :align-left="true" />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h2>Alt Badges</h2>
        <DemoSection title="Alt Badges" :code="demoCode">
          <template #components>
            <Badge variant="beta-alt" :align-left="true">Beta</Badge>
            <Badge variant="new-alt" :align-left="true">New</Badge>
            <Badge variant="warning-alt" :align-left="true">Error</Badge>
            <Badge variant="tag-alt" :align-left="true">Tag</Badge>
            <Badge variant="pro-alt" :align-left="true">Pro</Badge>
            <Badge variant="prime-alt" :align-left="true"></Badge>
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h2>Small Badges</h2>
        <DemoSection title="Small Badges" :code="demoCode">
          <template #components>
            <Badge :small="true" variant="beta" :align-left="true">Beta</Badge>
            <Badge :small="true" variant="new" :align-left="true">New</Badge>
            <Badge :small="true" variant="warning" :align-left="true">
              Error
            </Badge>
            <Badge :small="true" variant="tag" :align-left="true">Tag</Badge>
            <Badge :small="true" variant="pro" :align-left="true">Pro</Badge>
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h2>Progress Badge</h2>
        <p>Used to show amount of items sold in merch.</p>
        <DemoSection title="Progress Badge" :code="demoCode">
          <template #components>
            <Badge
              :align-left="true"
              variant="progress"
              backgroundColor="#8736e0"
              :current="17"
              :total="25"
              suffix="Sold"
            />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h2>Count Badge</h2>
        <p>Used to show amount of items sold in merch.</p>
        <DemoSection title="Count Badge" :code="demoCode">
          <template #components>
            <Badge variant="count">3</Badge>
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h2>Mod Badge</h2>
        <p>Used in an info callout.</p>
        <DemoSection title="Mod Badge" :code="demoCode">
          <template #components>
            <Callout variation="info">
              Remember to
              <Badge variant="mod">/mod Streamlabs</Badge>
              to initiate Cloudbot.
            </Callout>
          </template>
        </DemoSection>
      </div>
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
          <td>variant</td>
          <td>string</td>
          <td>"success"</td>
          <td>
            How the Badge will look or funciton. Variants:
            <code>success</code>, <code>tag</code>*, <code>new</code>*,
            <code>beta</code>*, <code>warning</code>*, <code>pro</code>*,
            <code>progress</code>, <code>mod</code>, and <code>count</code>.
            <br />
            <small>
              *Alternate style available by adding
              <code>-alt</code> to variant string.
            </small>
          </td>
        </tr>
        <tr>
          <td>alignLeft</td>
          <td>boolean</td>
          <td>false</td>
          <td>Moves 8px of margin from the left to the right.</td>
        </tr>
        <tr>
          <td>noMargin</td>
          <td>boolean</td>
          <td>false</td>
          <td>Removes margin from left and right.</td>
        </tr>
        <tr>
          <td>backgroundColor</td>
          <td>string</td>
          <td>"#31c3a2"</td>
          <td>
            Use this prop to change the background color only if you need an
            option that's not one of the provided variants.
          </td>
        </tr>
        <tr>
          <td>textColor</td>
          <td>string</td>
          <td>"#ffffff"</td>
          <td>
            Use this prop to change the text color only if you need an option
            that's not one of the provided variants.
          </td>
        </tr>
        <tr>
          <td>current</td>
          <td>number</td>
          <td>null</td>
          <td>
            Current progress amount.
            <code>variant</code> prop must be set to <code>progress</code>.
          </td>
        </tr>
        <tr>
          <td>total</td>
          <td>number</td>
          <td>null</td>
          <td>
            Total progross amount.
            <code>variant</code> prop must be set to <code>progress</code>.
          </td>
        </tr>
        <tr>
          <td>separator</td>
          <td>string</td>
          <td>"/"</td>
          <td>
            Separator between current and total amounts is displayed.
            <code>variant</code> prop must be set to <code>progress</code>.
          </td>
        </tr>
        <tr>
          <td>suffix</td>
          <td>string</td>
          <td>null</td>
          <td>
            String to the right of the total amount.
            <code>variant</code> prop must be set to <code>progress</code>.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Accordion from "./../components/Accordion.vue";
import Badge from "./../components/Badge.vue";
import BadgesCode from "./Badges.vue?raw";
import Callout from "./../components/Callout.vue";
import DemoSection from "./../components/DemoSection.vue";

@Component({
  components: {
    Accordion,
    Badge,
    Callout,
    DemoSection
  }
})
export default class Badges extends Vue {
  demoCode = BadgesCode;
}
</script>

<style lang="less" scoped>
.section__components {
  display: flex;
  align-items: center;
}
</style>
