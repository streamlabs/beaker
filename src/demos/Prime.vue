<template>
  <div>
    <div class="section">
      <h1>Prime Components</h1>
    </div>

    <div class="section">
      <h2>Standard Badges & Alt Badges</h2>
      <pre><code>import { Badge } from "streamlabs-beaker"

@Component({
  components: {
    Badge
  }
})</code></pre>

      <DemoSection title="Badges" :code="demoCode">
        <template #components>
          <Badge variant="prime" />
          <Badge variant="prime-alt" />
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Prime Feature Overlay</h2>
      <pre><code>import { PrimeSection } from "streamlabs-beaker"

@Component({
  components: {
    PrimeSection
  }
})</code></pre>

      <DemoSection title="Prime Lock Overlay" :code="demoCode">
        <template #components>
          <div class="cs-section">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisi
            magna, venenatis quis lobortis vel, mollis eu diam. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Pellentesque aliquet
            egestas tellus quis pretium. Fusce sit amet sem sapien. Vestibulum
            congue euismod enim non venenatis. Sed sed varius neque. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Nullam nisi magna,
            venenatis quis lobortis vel, mollis eu diam. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Pellentesque aliquet egestas
            tellus quis pretium. Fusce sit amet sem sapien. Vestibulum congue
            euismod enim non venenatis. Sed sed varius neque.
            <PrimeSection
              subtitle="77% trust custom email addresses over regular."
              @click="testClick"
            />
          </div>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Prime Call to Action</h2>
      <pre><code>import { NavCallToAction } from "streamlabs-beaker"

@Component({
  components: {
    NavCallToAction
  }
})</code></pre>

      <DemoSection title="Prime Call to Action" :code="demoCode">
        <template #components>
          <NavCallToAction
            description="Forward email from your custom domain name to your current mailbox.
            "
            buttonTitle="Join Prime"
            buttonVariation="prime"
            @click="testNavClick"
          >
            <template #title>
              <div>
                Unlock unlimited themes with
                <Badge variant="prime-alt" />
              </div>
            </template>
            <template #extras>
              <div>
                <div>Prime also includes:</div>
                <div>Custom Domain Name</div>
                <div>30+ Professional Themes</div>
                <div>Advanced SEO & Analytics</div>
              </div>
            </template>
          </NavCallToAction>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Modal Welcome Prime</h2>
      <pre><code>import { ModalComp } from "streamlabs-beaker"

@Component({
  components: {
    ModalComp
  }
})</code></pre>

      <DemoSection title="Welcome Prime Modal" :code="demoCode">
        <template #components>
          <ModalComp
            modalId="modal-welcome-prime"
            type="welcome-prime"
            :width="600"
            @onClickPrime="testWelcomePrime"
            :hasPrimeCloseButton="true"
          />

          <div class="button-container button-container--left">
            <Button
              variation="default"
              title="modal welcome prime"
              @click="open('modal-welcome-prime')"
            />
          </div>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Welcome Prime</h2>
      <pre><code>import { WelcomePrime } from "streamlabs-beaker"

@Component({
  components: {
    WelcomePrime
  }
})</code></pre>

      <DemoSection title="Welcome Prime" :code="demoCode">
        <template #components>
          <WelcomePrime class="welcome-prime" @onClickPrime="testClick" />
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Modal Prime Intro</h2>
      <pre><code>import { ModalComp } from "streamlabs-beaker"

@Component({
  components: {
    ModalComp
  }
})</code></pre>

      <DemoSection title="Prime Intro Modal" :code="demoCode">
        <template #components>
          <ModalComp
            modalId="modal-prime-intro"
            type="prime-intro"
            :width="680"
            @onClickPrime="testPrimeIntro"
            :hasPrimeCloseButton="true"
          />

          <div class="button-container button-container--left">
            <Button
              variation="default"
              title="Modal Prime Intro"
              @click="open('modal-prime-intro')"
            />
          </div>
        </template>
      </DemoSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVfm } from "vue-final-modal";
import Badge from "./../components/Badge.vue";
import Button from "./../components/Button.vue";
import DemoSection from "./../components/DemoSection.vue";
import ModalComp from "./../components/ModalComp.vue";
import NavCallToAction from "./../components/NavCallToAction.vue";
import PrimeCode from "./Prime.vue?raw";
import PrimeSection from "./../components/PrimeSection.vue";
import WelcomePrime from "./../components/WelcomePrime.vue";

const demoCode = PrimeCode;
const { open } = useVfm();

function testClick() {
  console.log("test prime section click");
}

function testNavClick() {
  console.log("test prime nav click");
}

function testWelcomePrime() {
  console.log("test welcome prime click");
}

function testPrimeIntro() {
  console.log("test prime info click");
}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";

.cs-section {
  position: relative;
  width: 260px;
}

.welcome-prime {
  width: 600px;
}
</style>
