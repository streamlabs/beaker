<template>
  <div>
    <h1>Banners</h1>
    <div class="section">
      <h2>Marketing Banner</h2>
      <DemoSection title="Marketing Banner" :code="demoCode">
        <template #components>
          <banner-marketing
            bg-image="
                https://cdn.streamlabs.com/static/imgs/pretzel_dashboard_banner_bg.png
              "
            bg-image-night="
                http://cdn.backgroundhost.com/backgrounds/subtlepatterns/cartographer.png
              "
            icon-name="themes"
            label="Introducing Streamlabs OBS"
            title="Largest library of free themes in the world."
            desc="
                To access over 700+ themes for free, download Streamlabs OBS.
              "
            link-desc="Win 7+  245.8 MB"
            :onToggle="test"
          >
            <Button
              slot="link"
              type="a"
              variation="action"
              size="standard"
              href="#"
              title="Download"
              icon="overview"
            />
          </banner-marketing>
        </template>
      </DemoSection>

      <banner-marketing
        bg-image="
            https://cdn.streamlabs.com/static/imgs/pretzel_dashboard_banner_bg.png
          "
        :icon-image="pretzelIcon"
        label="New Streamlabs OBS App"
        title="Introducing Pretzel Rocks Music Player"
        desc="
            Stream-safe music for broadcasters with an ever-growing catalog of music. Currently 5k+ tracks.
          "
        link-desc="$4.99/mo"
        :banner-closed="bannerClosed"
      >
        <Button
          slot="link"
          type="a"
          variation="action"
          size="standard"
          href="#"
          title="Try It Now"
        />
      </banner-marketing>

      <table class="docs-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Required</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bgImage</td>
            <td>string</td>
            <td>true</td>
            <td>null</td>
            <td>Background image that will display in day mode.</td>
          </tr>
          <tr>
            <td>bgImageNight</td>
            <td>string</td>
            <td>false</td>
            <td>null</td>
            <td>Background image that will display in night mode.</td>
          </tr>
          <tr>
            <td>label</td>
            <td>string</td>
            <td>true</td>
            <td>null</td>
            <td>Label text in the upper left of the banner.</td>
          </tr>
          <tr>
            <td>iconImage</td>
            <td>string</td>
            <td>false</td>
            <td>null</td>
            <td>
              Icon image next to title. Use a url path. If using iconName - do
              not use iconImg. We will improve functionality in near future.
            </td>
          </tr>
          <tr>
            <td>iconName</td>
            <td>string</td>
            <td>false</td>
            <td>null</td>
            <td>
              Icon next to title. Use icon name from icon list. If using iconImg
              - do not use iconName. We will improve functionality in near
              future.
            </td>
          </tr>
          <tr>
            <td>title</td>
            <td>string</td>
            <td>true</td>
            <td>null</td>
            <td>Main banner title.</td>
          </tr>
          <tr>
            <td>desc</td>
            <td>string</td>
            <td>true</td>
            <td>null</td>
            <td>Description text below banner title.</td>
          </tr>
          <tr>
            <td>linkDesc</td>
            <td>string</td>
            <td>false</td>
            <td>null</td>
            <td>Description text below link.</td>
          </tr>
          <tr>
            <td>bannerClosed</td>
            <td>boolean</td>
            <td>false</td>
            <td>false</td>
            <td>Default state the banner is. Open by default.</td>
          </tr>
          <tr>
            <td>onToggle</td>
            <td>function</td>
            <td>null</td>
            <td>false</td>
            <td>Function which is called when you toggle the icon close.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Sale Banner</h2>
      <DemoSection title="Sale Banner" :code="demoCode">
        <template #components>
          <banner-sale
            title="Flash Sale! 25% off everything!"
            desc="All items are automatically discounted."
            days="00"
            hours="00"
            minutes="00"
            :seconds="secs"
            time-desc="Until flash sale ends. Hurry!"
          />
        </template>
      </DemoSection>

      <table class="docs-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Required</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>string</td>
            <td>true</td>
            <td>null</td>
            <td>Banner main title.</td>
          </tr>
          <tr>
            <td>desc</td>
            <td>string</td>
            <td>true</td>
            <td>null</td>
            <td>Banner description text below main title.</td>
          </tr>
          <tr>
            <td>days</td>
            <td>string</td>
            <td>true</td>
            <td>"00"</td>
            <td>Days remaining value for countdown timer</td>
          </tr>
          <tr>
            <td>hours</td>
            <td>string</td>
            <td>true</td>
            <td>"00"</td>
            <td>Hours remaining value for countdown timer</td>
          </tr>
          <tr>
            <td>minutes</td>
            <td>string</td>
            <td>true</td>
            <td>"00"</td>
            <td>Minutes remaining value for countdown timer</td>
          </tr>
          <tr>
            <td>seconds</td>
            <td>string</td>
            <td>true</td>
            <td>"00"</td>
            <td>Seconds remaining value for countdown timer</td>
          </tr>
          <tr>
            <td>timeDesc</td>
            <td>string</td>
            <td>false</td>
            <td>null</td>
            <td>Description text below countdown timer.</td>
          </tr>
          <tr>
            <td>borderColor</td>
            <td>string</td>
            <td>false</td>
            <td>"rgba(248, 86, 64, 0.33)"</td>
            <td>Banner border color.</td>
          </tr>
          <tr>
            <td>backgroundColor</td>
            <td>boolean</td>
            <td>false</td>
            <td>"rgba(248, 86, 64, 0.08)"</td>
            <td>Banner background color.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Notice Banner</h2>
      <DemoSection title="Notice Banner" :code="demoCode">
        <template #components>
          <Notice
            title="
                Join affiliates and earn $1 for each Streamlabs OBS referral
              "
            desc="
                Share your unique referral link with friends and get paid directly into your PayPal each month.
              "
            icon="information"
          >
            <Button
              slot="button"
              type="button"
              size="fixed-width"
              variation="action"
              title="Join"
            />
          </Notice>
        </template>
      </DemoSection>

      <br />
      <br />

      <Notice
        variation="warning"
        title="Your donation link has expired"
        desc="Copy your new donation link and replace all instances containing twitchalerts.com."
      >
        <Button
          slot="button"
          type="button"
          size="fixed-width"
          variation="default"
          title="Copy Link"
        />
      </Notice>

      <table class="docs-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Required</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>variation</td>
            <td>string</td>
            <td>true</td>
            <td>default</td>
            <td>
              Variation style that will be displayed. Options are "default" and
              "warning".
            </td>
          </tr>
          <tr>
            <td>title</td>
            <td>string</td>
            <td>true</td>
            <td>null</td>
            <td>Banner title</td>
          </tr>
          <tr>
            <td>desc</td>
            <td>string</td>
            <td>true</td>
            <td>null</td>
            <td>Description text below banner title</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>string</td>
            <td>true</td>
            <td>null</td>
            <td>
              Icon next to title and in background. Will override selected
              variation icon. Use icon name from icon list.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Discord Banner</h2>
      <DemoSection title="Discord Banner" :code="demoCode">
        <template #components>
          <BannerDiscord />
        </template>
      </DemoSection>

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
            <td>title</td>
            <td>string</td>
            <td>
              Join the Streamlabs OBS Discussion on
              &lt;span&gt;Discord&lt;/span&gt;
            </td>
            <td>
              Set the title of the banner. You can wrap text in
              <code>&lt;span&gt;</code> tags to give them medium font weight.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Introduction Banner</h2>
      <DemoSection title="Introduction Banner" :code="demoCode">
        <template #components>
          <BannerIntroduction bgColor="#5e3bec">
            <img
              slot="bgImage"
              src="https://cdn.streamlabs.com/static/alert-box-sounds-banner-bg.png"
              alt=""
              class="banner-introduction-bgImage"
            />
            <template #title
              >Introducing<span class="banner-introduction-title"
                >Prime Alert Box Sounds</span
              ></template
            >
            <template #description
              >Modern, hype sounds you can add to your live alerts. All included
              with Prime.</template
            >
            <Button
              slot="button"
              title="Browse Sounds"
              :bgColor="'#000'"
              :textColor="'#fff'"
            ></Button>
          </BannerIntroduction>
        </template>
      </DemoSection>

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
            <td>bgColor</td>
            <td>string</td>
            <td>Null</td>
            <td>Set the background color of the banner.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BannersCode from "./Banners.vue?raw";
import BannerDiscord from "./../components/BannerDiscord.vue";
import BannerIntroduction from "./../components/BannerIntroduction.vue";
import BannerMarketing from "./../components/BannerMarketing.vue";
import BannerSale from "./../components/BannerSale.vue";
import Button from "./../components/Button.vue";
import DemoSection from "./../components/DemoSection.vue";
import Notice from "./../components/Notice.vue";
import pretzelIcon from '../assets/imgs/pretzel-icon.png';

@Component({
  components: {
    BannerDiscord,
    BannerIntroduction,
    BannerMarketing,
    BannerSale,
    Button,
    DemoSection,
    Notice
  }
})
export default class Banners extends Vue {
  demoCode = BannersCode;
  pretzelIcon = pretzelIcon;
  remainingSecs = 10;

  bannerClosed = false;

  mounted() {
    setInterval(() => {
      this.remainingSecs--;
      if (this.remainingSecs < 0) {
        this.remainingSecs = 10;
      }
    }, 1000);
  }

  get secs() {
    return this.remainingSecs < 10
      ? `0${this.remainingSecs}`
      : `${this.remainingSecs}`;
  }

  test() {
    console.log("test");
  }
}
</script>

<style lang="less" scoped>
.banner-introduction-title {
  font-weight: 500;
  padding: 0 8px;
}

.banner-introduction-bgImage {
  position: absolute;
  width: auto;
  height: 100%;
  right: 0px;
  border-radius: 8px;
}
</style>
