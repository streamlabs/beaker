<template>
  <div>
    <div class="section">
      <h1>Buttons</h1>
      <p>
        Our button component is super flexible. It can act as type
        <code>button</code>, <code>a</code> tag or <code>router-link</code>.
        Please note that you may need to use 'ButtonInput' rather than 'Button'
        to avoid issues.
      </p>

      <pre><code>import { Button } from 'streamlabs-beaker';

components: {
  Button
}</code></pre>
    </div>

    <div class="section">
      <h2>Standard Buttons</h2>
      <p>Used throughout website Dashboard.</p>
      <div class="section">
        <h3>Active</h3>
        <DemoSection title="Active" :code="demoCode">
          <template #components>
            <div class="s-button-container s-button-container--left">
              <Button
                variation="default"
                title="Default"
                tag="a"
                href="https://laravel.com/docs/5.8/routing"
              />

              <Button
                variation="action"
                title="Action"
                @click="buttonClick('Action')"
              />

              <Button
                variation="warning"
                title="Warning"
                @click="buttonClick('Warning')"
              />

              <Button
                variation="default"
                title="With icon"
                icon="add-circle"
                @click="buttonClick('With icon')"
              />

              <Button
                variation="default"
                title="Custom Colors"
                bg-color="pink"
                text-color="red"
                @click="buttonClick('Custom Colors')"
              />

              <Button
                variation="prime"
                title="Join Prime"
                icon="prime"
                @click="buttonClick('Join Prime')"
              />

              <Button
                variation="prime-white"
                title="Join Prime"
                icon="prime"
                @click="buttonClick('Join Prime')"
              />

               <Button
                variation="ultra"
                title="Join Ultra"
                icon="ultra"
                @click="buttonClick('Join Ultra')"
              />

              <Button variation="action" @click="buttonClick('Custom Slot')">
                <div slot="custom" class="custom-html">
                  <i class="icon-add-circle"></i>
                  <span>Custom Slot</span>
                </div>
              </Button>
            </div>
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>Disabled</h3>
        <DemoSection title="Disabled" :code="demoCode">
          <template #components>
            <div class="s-button-container s-button-container--left">
              <Button
                :variation="'default'"
                :state="'disabled'"
                :title="'Default'"
              />

              <Button
                :variation="'action'"
                :state="'disabled'"
                :title="'Action'"
              />

              <Button
                :variation="'warning'"
                :state="'disabled'"
                :title="'Warning'"
              />

              <Button
                :variation="'default'"
                :state="'disabled'"
                :title="'with icon'"
                :icon="'edit'"
              />
            </div>
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>Focus</h3>
        <DemoSection title="Focus" :code="demoCode">
          <template #components>
            <div class="s-button-container s-button-container--left">
              <Button
                :variation="'default'"
                :state="'focused'"
                :title="'Default'"
              />

              <Button
                :variation="'action'"
                :state="'focused'"
                :title="'Action'"
              />

              <Button
                :variation="'warning'"
                :state="'focused'"
                :title="'Warning'"
              />

              <Button
                :variation="'default'"
                :state="'focused'"
                :title="'with icon'"
                :icon="'edit'"
              />
            </div>
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>Loading</h3>
        <DemoSection title="Loading" :code="demoCode">
          <template #components>
            <div class="s-button-container s-button-container--left">
              <Button
                :variation="'default'"
                :state="'loading'"
                :title="'Default'"
              />

              <Button
                :variation="'action'"
                :state="'loading'"
                :title="'Action'"
              />

              <Button
                :variation="'warning'"
                :state="'loading'"
                :title="'Warning'"
              />

              <Button
                :variation="'default'"
                :state="'loading'"
                :title="'with icon'"
                :icon="'recent-events'"
              />
            </div>
          </template>
        </DemoSection>

        <p>
          Click
          <a @click="isLoadingExample = !isLoadingExample">here</a> to test.
        </p>

        <Button
          :class="{ 'is-loading': isLoadingExample }"
          :type="'button'"
          :variation="'default'"
          :title="'with icon'"
          :icon="'pop-out-1'"
        />
      </div>
    </div>

    <div class="section">
      <h2>Small Buttons</h2>
      <p>
        Small is the size used on Streamlabs OBS. It is slightly smaller than
        our standard button.
      </p>

      <DemoSection title="Small Buttons" :code="demoCode">
        <template #components>
          <div class="s-button-container s-button-container--left">
            <Button
              :type="'button'"
              :size="'small'"
              :variation="'default'"
              :title="'Default'"
            />

            <Button
              :type="'button'"
              :size="'small'"
              :variation="'action'"
              :title="'Action'"
            />

            <Button
              :type="'button'"
              :size="'small'"
              :variation="'warning'"
              :title="'Warning'"
            />

            <Button
              :type="'button'"
              :size="'small'"
              :variation="'default'"
              :title="'With Icon'"
              :icon="'image'"
            />

            <Button
              :variation="'rewards-standard'"
              :size="'small'"
              :title="'Rewards'"
            />
          </div>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Large Buttons</h2>
      <p>
        Used on website marketing pages and for the Donate button on the tip
        page.
      </p>
      <DemoSection title="Large Buttons" :code="demoCode">
        <template #components>
          <div class="s-button-container s-button-container--left">
            <Button
              :type="'button'"
              :size="'large'"
              :variation="'default'"
              :title="'Default'"
            />

            <Button
              :type="'button'"
              :size="'large'"
              :variation="'action'"
              :title="'Action'"
            />

            <Button
              :type="'button'"
              :size="'large'"
              :variation="'warning'"
              :title="'Warning'"
            />

            <Button
              :type="'button'"
              :size="'large'"
              :variation="'default'"
              :title="'With Icon'"
              :icon="'image'"
            />

            <Button
              :size="'large'"
              :variation="'prime'"
              :title="'Join Prime'"
              :icon="'prime'"
            />
            <Button
              :size="'large'"
              :variation="'prime-white'"
              :title="'Join Prime'"
              :icon="'prime'"
            />
            <Button
              :size="'large'"
              :variation="'ultra'"
              :title="'Join Ultra'"
              :icon="'ultra'"
            />
          </div>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Fixed Width Buttons</h2>
      <p>Used throughout website Dashboard. Width is fixed at 96px.</p>

      <DemoSection title="Fixed Width Buttons" :code="demoCode">
        <template #components>
          <div class="s-button-container s-button-container--left">
            <Button
              type="button"
              size="fixed-width"
              variation="default"
              title="Default"
            />

            <Button
              type="button"
              size="fixed-width"
              variation="action"
              title="Action"
            />

            <Button
              type="button"
              size="fixed-width"
              variation="warning"
              title="Warning"
            />

            <Button
              type="button"
              size="fixed-width"
              variation="default"
              title="'WithIcon"
              icon="image"
            />
          </div>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Full-Width Buttons</h2>
      <div class="section">
        <h3>Default</h3>
        <p>Used within cards and panels in the Dashboard.</p>
        <DemoSection title="Default" :code="demoCode">
          <template #components>
            <Button
              size="full-width"
              variation="default"
              title="Start Giveaway"
            />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>Subscribe</h3>
        <p>Used on the App Platform for Subscribing to Apps.</p>
        <DemoSection title="Subscribe" :code="demoCode">
          <template #components>
            <Button variation="subscribe" title="Subscribe" price="$4.99" />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>Paypal</h3>
        <p>Used on the Tip Page for Subscribing to Pro.</p>
        <DemoSection title="Paypal" :code="demoCode">
          <template #components>
            <Button
              variation="paypal"
              title="Subscribe with PayPal"
              price="$4.99"
            />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>Download</h3>
        <p>Used for Download Streamlabs OBS buttons.</p>
        <DemoSection title="Download" :code="demoCode">
          <template #components>
            <div class="s-button-container s-button-container--left">
              <Button
                variation="slobs-download"
                title="Download Streamlabs OBS"
              />
              <Button
                variation="slobs-download-landing"
                osType="windows"
              ></Button>
              <Button variation="slobs-download-landing" osType="mac"></Button>
            </div>
          </template>
        </DemoSection>
      </div>
    </div>
    <div class="section">
      <h2>Square Buttons</h2>
      <p>Used for add and subtract number inputs as well as login buttons.</p>
      <DemoSection title="Square Buttons" :code="demoCode">
        <template #components>
          <div class="s-button-container s-button-container--left">
            <Button
              type="button"
              size="square"
              variation="default"
              icon="add"
            />

            <Button
              type="button"
              size="square"
              variation="default"
              icon="subtract"
            />

            <Button
              type="button"
              variation="facebook"
              size="square"
              icon="facebook"
            />

            <Button
              type="button"
              variation="periscope"
              size="square"
              icon="periscope"
            />

            <Button
              type="button"
              variation="mixer"
              size="square"
              icon="mixer"
            />

            <Button
              type="button"
              variation="picarto"
              size="square"
              icon="picarto"
            />

                <Button
              type="button"
              variation="ultra"
              size="square"
              icon="ultra"
            />
          </div>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Navigation Buttons</h2>
      <p>Used to bring you between different page states.</p>

      <DemoSection title="Navigation Buttons" :code="demoCode">
        <template #components>
          <Button
            variation="navigation"
            icon="back-alt"
            title="Back to Listings"
          />
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Prime Button Text</h2>
      <p>Used for prime button with text.</p>

      <DemoSection title="Prime Button Text" :code="demoCode">
        <template #components>
          <div class="s-button-container s-button-container--left">
            <Button variation="prime-simple" />
            <Button variation="prime-simple" primeTitle="test" />
          </div>
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
          <td>@click</td>
          <td>Function</td>
          <td>null</td>
          <td>
            Emits a click function. If you are using an event modifier such as
            <code>prevent</code>, use <code>native</code>. For example
            <code>@click.native.prevent</code>.
          </td>
        </tr>
        <tr>
          <td>bgColor</td>
          <td>String</td>
          <td>null</td>
          <td>Used for background color.</td>
        </tr>
        <tr>
          <td>textColor</td>
          <td>String</td>
          <td>null</td>
          <td>Used for text color.</td>
        </tr>
        <tr>
          <td>icon</td>
          <td>String</td>
          <td>null</td>
          <td>
            Use the endings of our custom icons. For example 'icon-settings'
            would be 'settings'. See icons page of the design system for a full
            list.
          </td>
        </tr>
        <tr>
          <td>iconPosition</td>
          <td>String</td>
          <td>left</td>
          <td>
            Positions the icon left or right. If positioned right, the icon will
            have a left margin of 24px.
          </td>
        </tr>
        <tr>
          <td>iconImg</td>
          <td>String</td>
          <td>null</td>
          <td>
            Takes image source string to use an image as an icon. Icon image
            will have a 14px width.
          </td>
        </tr>
        <tr>
          <td>title</td>
          <td>String</td>
          <td>null</td>
          <td>Main button text.</td>
        </tr>
        <tr>
          <td>price</td>
          <td>String</td>
          <td>null</td>
          <td>Used for subscribe buttons in the App Store.</td>
        </tr>
        <tr>
          <td>description</td>
          <td>String</td>
          <td>null</td>
          <td>
            Used for Streamlabs OBS download buttons to describe the version,
            size and compatibility.
          </td>
        </tr>
        <tr>
          <td>href</td>
          <td>String</td>
          <td>null</td>
          <td>
            Used if the the
            <code>type</code> is an <code>a</code> element (links).
          </td>
        </tr>
        <tr>
          <td>size</td>
          <td>String</td>
          <td>standard</td>
          <td>
            Size of the button. Options are
            <code>small</code>, <code>large</code>, <code>square</code>,
            <code>fixed-width</code>, and
            <code>full-width</code>
          </td>
        </tr>
        <tr>
          <td>state</td>
          <td>String</td>
          <td>null</td>
          <td>
            State of the button. Options are
            <code>hover</code>, <code>focus</code>, <code>loading</code> and
            <code>disabled</code>.
          </td>
        </tr>
        <tr>
          <td>type</td>
          <td>String</td>
          <td>null</td>
          <td>Set to string 'submit'.</td>
        </tr>
        <tr>
          <td>to</td>
          <td>String</td>
          <td>null</td>
          <td>
            Used if the the
            <code>type</code> is a <code>router-link</code>. Define the path.
          </td>
        </tr>
        <tr>
          <td>tag</td>
          <td>String</td>
          <td>button</td>
          <td>
            What type of element the component is. Options are
            <code>button</code>, <code>a</code>,
            <code>router-link</code>
          </td>
        </tr>
        <tr>
          <td>target</td>
          <td>String</td>
          <td>_self</td>
          <td>
            Used to set different targets for
            <code>a</code>
            links,
            <code>_self</code>, <code>_blank</code>, <code>_parent</code>,
            <code>_top</code>
          </td>
        </tr>
        <tr>
          <td>primeBgColor</td>
          <td>String</td>
          <td>null</td>
          <td>
            You can use this prop when you set variation as
            <code>prime</code>. Option is only <code>white</code>.
          </td>
        </tr>
        <tr>
          <td>primeTitle</td>
          <td>String</td>
          <td>null</td>
          <td>
            Used for prime button text. You can use this prop when you set
            variation as
            <code>prime-simple</code>
          </td>
        </tr>
        <tr>
          <td>variation</td>
          <td>String</td>
          <td>default</td>
          <td>
            The variation style of a button. Primary options are
            <code>default</code>, <code>action</code>, <code>prime</code> and
            <code>warning</code>. Other options are <code>subscribe</code>,
            <code>paypal</code>, <code>download</code>, and
            <code>navigation</code>. Reward options are
            <code>rewards-standard</code>, <code>rewards-silver</code>,
            <code>rewards-gold</code>, <code>rewards-platinum</code>,
            <code>rewards-diamond</code>, and <code>rewards-legend</code>.
            Platform options are <code>facebook</code>, <code>mixer</code>,
            <code>twitch</code>, <code>youtube</code>, <code>periscope</code>,
            <code>picarto</code>and <code>paypal-blue</code>.
          </td>
        </tr>
        <tr>
          <td>slobsDownloadTitle</td>
          <td>String</td>
          <td>Download Streamlabs</td>
          <td>Used for slobs download landing button title.</td>
        </tr>
        <tr>
          <td>osType</td>
          <td>String</td>
          <td>windows</td>
          <td>
            Used for slobs download landing button icon. Options are
            <code>windows</code> and <code>mac</code>.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Accordion from "./../components/Accordion.vue";
import Button from "./../components/Button.vue";
import DemoSection from "./../components/DemoSection.vue";
import ButtonCode from "./Buttons.vue?raw";
import { EventBus } from "./../plugins/event-bus";

@Component({
  components: {
    Accordion,
    Button,
    DemoSection
  }
})
export default class Forms extends Vue {
  isLoading = true;
  isLoadingExample = false;
  demoCode = ButtonCode;

  buttonClick(buttonType) {
    EventBus.$emit("copy-success", `"${buttonType}" button clicked`);
  }
}
</script>

<style lang="less" scoped>
.custom-html {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
}
</style>
