<template>
  <div>
    <div class="section">
      <h1>Onboarding</h1>
      <p>Onboarding component - now with all logic outside of component!</p>

      <pre><code>import { Onboarding, OnboardingStep } from "streamlabs-beaker"

@Component({
  components: {
    Onboarding,
    OnboardingStep,
  }
})</code></pre>
    </div>

    <div class="section">
      <h2>Onboarding - Named Steps</h2>
      <DemoSection title="Onboarding - Named Steps" :code="demoCode">
        <template #components>
          <Onboarding
            :steps="steps"
            :skippable="true"
            :currentStep="currentStep"
            :stepLocation="'top'"
            :skipHandler="skipFunc"
            :prevHandler="previousFunc"
            :continueHandler="continueFunc"
            :completeHandler="completeFunc"
          >
            <OnboardingStep slot="1">
              <span slot="title">Getting Started</span>
              <span slot="desc">Slot 1</span>
              <SSProSimulator :username="username" :domain="domain" :icon="icon"/>
            </OnboardingStep>
            <OnboardingStep slot="2">
              <span slot="title">A Few More Things</span>
              <span slot="desc">Slot 2</span>
              <SSProSimulator :username="username" :domain="domain" :icon="icon"/>
            </OnboardingStep>
            <OnboardingStep slot="3">
              <span slot="title">Almost There</span>
              <span slot="desc">Slot 3</span>
              <SSProSimulator :username="username" :domain="domain" :icon="icon"/>
            </OnboardingStep>
            <OnboardingStep slot="4">
              <span slot="title">Getting Started</span>
              <span slot="desc">Slot 4</span>
              <SSProSimulator :username="username" :domain="domain" :icon="icon"/>
            </OnboardingStep>
          </Onboarding>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <DemoSection title="Default" :code="demoCode">
        <template #components>
          <Onboarding
            :steps="stepsTest"
            :skippable="true"
            :currentStep="currentStep"
            :stepLocation="'top'"
            :skipHandler="skipFunc"
            :prevHandler="previousFunc"
            :continueHandler="continueFunc"
            :completeHandler="completeFunc"
          >
            <OnboardingStep slot="1">
              <span slot="title">Getting Started</span>
              <span slot="desc">Slot 1</span>
              <SSProSimulator :username="username" :domain="domain" :icon="icon"/>
            </OnboardingStep>
            <OnboardingStep slot="2">
              <span slot="title">A Few More Things</span>
              <span slot="desc">Slot 2</span>
              <SSProSimulator :username="username" :domain="domain" :icon="icon"/>
            </OnboardingStep>
            <OnboardingStep slot="3">
              <span slot="title">Almost There</span>
              <span slot="desc">Slot 3</span>
              <SSProSimulator :username="username" :domain="domain" :icon="icon"/>
            </OnboardingStep>
            <OnboardingStep slot="4">
              <span slot="title">Getting Started</span>
              <span slot="desc">Slot 4</span>
              <SSProSimulator :username="username" :domain="domain" :icon="icon"/>
            </OnboardingStep>
          </Onboarding>
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
          <td>steps</td>
          <td>Object</td>
          <td>null</td>
          <td><code>[{name: "Step Name", complete: Boolean}]</code></td>
        </tr>
        <tr>
          <td>stepLocation</td>
          <td>string</td>
          <td>'left'</td>
          <td>
            Location of Progress Bar: <code>left</code> or <code>top</code>
          </td>
        </tr>
        <tr>
          <td>currentStep</td>
          <td>number</td>
          <td>null</td>
          <td>The number of the step you are on</td>
        </tr>
        <tr>
          <td>completeHandler</td>
          <td>Function</td>
          <td>null</td>
          <td>
            Function to perform when <code>complete</code> button is clicked
          </td>
        </tr>
        <tr>
          <td>continueHandler</td>
          <td>Function</td>
          <td>null</td>
          <td>
            Function to perform when <code>continue</code> button is clicked
          </td>
        </tr>
        <tr>
          <td>skipHandler</td>
          <td>Function</td>
          <td>null</td>
          <td>Function to perform when <code>skip</code> is clicked</td>
        </tr>
        <tr>
          <td>previousHandler</td>
          <td>Function</td>
          <td>null</td>
          <td>
            Function to perform when <code>previous</code> button is clicked
          </td>
        </tr>
        <tr>
          <td>skippable</td>
          <td>boolean</td>
          <td>null</td>
          <td>make steps skippable</td>
        </tr>
        <tr>
          <td>disableControls</td>
          <td>boolean</td>
          <td>false</td>
          <td>to disable controls</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DemoSection from "./../components/DemoSection.vue";
import Onboarding from "./../components/Onboarding.vue";
import OnboardingStep from "./../components/OnboardingStep.vue";
import OnboardingsCode from "./Onboardings.vue?raw";
import SSProSimulator from "./../components/SSProSimulator.vue";

@Component({
  components: {
    DemoSection,
    Onboarding,
    OnboardingStep,
    OnboardingsCode,
    SSProSimulator
  }
})
export default class Onboardings extends Vue {
  demoCode = OnboardingsCode;
  currentStep: number = 1;

  steps: Object = [
    { name: "Donations", complete: false },
    { name: "Cloudbot", complete: false },
    { name: "Streamlabs OBS", complete: false },
    { name: "Alert Box", complete: false }
  ];

  stepsTest: Object = [
    { complete: false },
    { complete: false },
    { complete: false },
    { complete: false }
  ];

  continueFunc() {
    this.stepsTest[this.currentStep - 1].complete = true;
    this.currentStep++;
  }

  skipFunc() {
    this.currentStep++;
  }

  previousFunc() {
    this.currentStep--;
  }

  completeFunc() {
    console.log("complete clicked");
  }

  username = "morganleee";
  icon =
    "https://static-cdn.jtvnw.net/jtv_user_pictures/9dfce03d-25cc-4737-96d2-2ecf6924bebe-profile_image-70x70.jpg";

  domain = "morganleeeeeeeeeee.com";
}
</script>
