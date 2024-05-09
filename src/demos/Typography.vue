<template>
  <div class="s-typography">
    <h1>Typography</h1>

    <div class="row section">
      <h4 class="s-typography__header">FONTS</h4>
      <h1>Barlow</h1>
      <div class="font-style barlow">Barlow</div>
      <div class="side-by-side">
        <div class="subtitle">Marketing Headings</div>
        <p>Bold, ExtraBold</p>
      </div>
      <div class="font-style roboto">Roboto</div>
      <div class="side-by-side">
        <div class="subtitle">UI &amp; Content</div>
        <p>Regular, Medium, Bold</p>
      </div>
    </div>

    <div class="row section">
      <h4 class="s-typography__header">TYPOGRAPHY</h4>
      <div class="side-by-side">
        <div class="subtitle">Letter Spacing</div>
        <p>0%</p>
      </div>
      <div class="side-by-side">
        <div class="subtitle">Line Height</div>
        <p>110% (H1, H2), 150% (Everything Else)</p>
      </div>
      <div class="side-by-side">
        <div class="subtitle">Paragraph Spacing</div>
        <p>8px</p>
      </div>
    </div>

    <h4 class="s-typography__header">TYPE SCALE</h4>
    <span class="subtitle">Marketing</span>
    <FormGroup>
      <div slot="input" class="section">
        <div class="type-scale barlow extrabold s48">
          H1: Barlow ExtraBold 48px
        </div>
        <div class="type-scale barlow bold s32">
          H2: Barlow Bold 32px
        </div>
      </div>

      <span slot="input" class="subtitle">Dashboard and Marketing</span>
      <div slot="input" class="type-scale bold s22">
        Marketing Title: Roboto Bold 22px
      </div>
      <div slot="input" class="type-scale bold s20">
        Title: Roboto Bold 20px
      </div>
      <div slot="input" class="type-scale medium s18">
        Marketing Subtitle: Roboto Medium 18px
      </div>
      <div slot="input" class="type-scale medium s16">
        Subtitle: Roboto Medium 16px
      </div>
      <div slot="input" class="type-scale gray s16">
        Marketing Paragraph: Roboto Regular 16px
      </div>
      <div slot="input" class="type-scale gray s14">
        Subtitle: Roboto Regular 14px
      </div>
      <div slot="input" class="type-scale gray medium underline s16">
        Marketing Link: Roboto Medium 16px
      </div>
      <div slot="input" class="type-scale gray medium underline s14">
        Link: Roboto Medium 14px
      </div>
      <div slot="input" class="type-scale teal medium s16">
        Marketing Label: Roboto Medium 16px
      </div>
      <div slot="input" class="type-scale teal medium s14">
        Label: Roboto Medium 14px
      </div>
      <div slot="input" class="type-scale gray s14">
        Marketing Caption: Roboto Regular 14px
      </div>
      <div slot="input" class="type-scale gray s12">
        Caption: Roboto Regular 12px
      </div>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormGroup from "./../components/FormGroup.vue";
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.row {
  width: 700px;

  &.bottom-space {
    .margin-bottom(8);
  }
}

.side-by-side {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.type-scale {
  color: @dark-1;
  line-height: 150%;
}

.gray {
  color: @dark-4;
}

.teal {
  color: @teal;
}

.underline {
  text-decoration: underline;
}

.font-style {
  color: @dark-1;
  font-size: 28px;
  font-weight: @medium;
  line-height: 150%;
}

.subtitle {
  color: @dark-1;
}

.s48 {
  font-size: 48px;
}

.s32 {
  font-size: 32px;
}

.s22 {
  font-size: 22px;
}

.s20 {
  font-size: 20px;
}

.s18 {
  font-size: 18px;
}

.s16 {
  font-size: 16px;
}

.s14 {
  font-size: 14px;
}

.s12 {
  font-size: 12px;
}

.extra-bold {
  font-weight: 800;
}

.bold {
  font-weight: 700;
}

.medium {
  font-weight: 500;
}

.barlow {
  font-family: "Barlow";
}

.roboto {
  font-family: "Roboto";
}

.night,
.night-theme {
  .type-scale {
    color: @light-1;
  }

  .gray {
    color: @light-4;
  }

  .font-style {
    color: @light-1;
  }

  .subtitle {
    color: @light-1;
  }
}
</style>
