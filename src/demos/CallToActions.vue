<template>
  <div>
    <div class="section">
      <h1>Call To Action</h1>
      <p>
        You can use our callout component if you need to display an important
        message.
      </p>

      <pre><code>import { CallToAction } from 'streamlabs-beaker';

components: {
  CallToAction
}</code></pre>
    </div>
    <div class="section">
      <h2>Default Call to Action</h2>
      <DemoSection title="Default" :code="demoCode">
        <template #components>
          <CallToAction :buttonClick="test" />
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Custom Call to Action</h2>

      <div class="section">
        <DemoSection title="Custom" :code="demoCode">
          <template #components>
            <CallToAction
              bgColor="#31c3a2"
              titleColor="#ffffff"
              subTitleColor="#ffffff"
              :thumbnail="logo"
              :thumbnailWidth="120"
              :thumbnailHeight="80"
              thumbnailBg="#ffffff"
              title="This is a Custom Call To Action"
              description="A Custom Description"
              buttonVariation="default"
              buttonTitle="Click Me"
              buttonDescription
              buttonTag="a"
              buttonHref="https://google.com"
              buttonBg="#ffffff"
              buttonTextColor="#000000"
            />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <CallToAction
          :bgColor="'#31c3a2'"
          :titleColor="'#fff'"
          :subTitleColor="'#fff'"
          :title="'This is a Custom Call To Action'"
          :description="'A Custom Description'"
          :hasThumbnail="false"
          :customButtonSlot="true"
        >
          <div class="s-button-container">
            <Button :title="'Using slot'"></Button>
            <Button :title="'Using slot'"></Button>
          </div>
        </CallToAction>
      </div>

      <div class="section">
        <CallToAction
          :bgColor="'#CAA368'"
          :titleColor="'#fff'"
          :subTitleColor="'#fff'"
          :hasThumbnail="false"
          :title="'Join Prime today!'"
          :description="
            'Our premium tool-set for professional content creators.'
          "
          :buttonVariation="'prime-white'"
          :buttonTitle="'Sign Up'"
          :buttonDescription="''"
          :buttonIcon="'prime'"
          :bgPrime="true"
        />
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
            <td>bgColor</td>
            <td>String</td>
            <td>#f5f8fa</td>
            <td>Background color, default color is @day-section (#f5f8fa)</td>
          </tr>

          <tr>
            <td>titleColor</td>
            <td>String</td>
            <td>#09161d</td>
            <td>Title color, default color is @day-title (#09161d)</td>
          </tr>

          <tr>
            <td>subTitleColor</td>
            <td>String</td>
            <td>#4f5e65</td>
            <td>Sub title color, default color is @day-paragraph (#4f5e65)</td>
          </tr>

          <tr>
            <td>thumbnail</td>
            <td>String</td>
            <td>'https://cdn.streamlabs.com/static/kevin-standard.svg'</td>
            <td>A Thumbnail image</td>
          </tr>
          <tr>
            <td>thumbnailBg</td>
            <td>String</td>
            <td>#31C3A2</td>
            <td>
              A Thumbnail background color, default color is @teal (#31C3A2)
            </td>
          </tr>

          <tr>
            <td>thumbnailWidth</td>
            <td>Number</td>
            <td>80</td>
            <td>A Thumbnail width</td>
          </tr>

          <tr>
            <td>thumbnailHeight</td>
            <td>Number</td>
            <td>80</td>
            <td>A Thumbnail height</td>
          </tr>

          <tr>
            <td>thumbnailAlt</td>
            <td>String</td>
            <td>Get started by downloading Streamlabs OBS</td>
            <td>A Thumbnail alt</td>
          </tr>

          <tr>
            <td>title</td>
            <td>String</td>
            <td>Get started by downloading Streamlabs OBS</td>
            <td>Title for the call to action component</td>
          </tr>
          <tr>
            <td>description</td>
            <td>String</td>
            <td>
              Over 800k creators use Streamlabs OBS daily, delivering
              entertainment.
            </td>
            <td>A short description for the call the action component</td>
          </tr>
          <tr>
            <td>buttonVariation</td>
            <td>String</td>
            <td>slobs-download</td>
            <td>Takes any button variation, but 'action' is recomended</td>
          </tr>
          <tr>
            <td>buttonTitle</td>
            <td>String</td>
            <td>Download Streamlabs OBS</td>
            <td>The title for the button</td>
          </tr>
          <tr>
            <td>buttonDescription</td>
            <td>String</td>
            <td>Windows 7+ 245.8MB</td>
            <td>
              Description for 'slobs-download' button variation only, recomended
              left blank otherwise ( :buttonDescription="'" )
            </td>
          </tr>
          <tr>
            <td>buttonBg</td>
            <td>String</td>
            <td>null</td>
            <td>Button background is forced to be changed</td>
          </tr>
          <tr>
            <td>buttonTextColor</td>
            <td>String</td>
            <td>null</td>
            <td>Button text color is forced to be changed</td>
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
            <td>null</td>
            <td>
              What type of element the component is. Options are
              <code>button</code>, <code>a</code>,
              <code>router-link</code>
            </td>
          </tr>
          <tr>
            <td>buttonClick</td>
            <td>Function</td>
            <td>null</td>
            <td>Emits a click function.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Button from "./../components/Button.vue";
import CallToAction from "./../components/CallToAction.vue";
import CallToActionCode from "./CallToActions.vue?raw";
import DemoSection from "./../components/DemoSection.vue";
import logo from './../assets/imgs/logo.svg';

@Component({
  components: {
    Button,
    CallToAction,
    DemoSection
  }
})
export default class CallToActions extends Vue {
  demoCode = CallToActionCode;

  logo = logo;

  test() {
    alert("test");
  }
}
</script>
