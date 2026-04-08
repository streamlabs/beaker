<template>
  <div class="s-tabs-wrapper">
    <div class="s-tabs-nav-wrapper">
      <div class="s-tabs-nav" :class="className">
        <div
          v-if="hasPrev"
          @click="scrollLeft"
          class="s-tabs-nav__control s-has-prev"
        >
          <i class="icon-back"></i>
        </div>

        <div
          ref="scrollable_tabs"
          @scroll="calculateScrolls"
          class="s-tabs"
          :class="{
            's-has-next': hasNext,
            's-has-prev': hasPrev
          }"
        >
          <div
            v-for="tab in tabs"
            :key="tab.value"
            class="s-tab"
            :class="{ 'is-active': tab.value === selectedTab }"
            :style="selectTabSize"
            @click="showTab(tab.value)"
          >
            <router-link
              v-if="updateRoute"
              :to="`#/${tab.value}`"
              class="s-tab-link"
            >
              <i v-if="tab.icon" :class="`icon-${tab.icon}`"></i>
              {{ tab.name }}
            </router-link>
            <div v-else class="s-tab-link">
              <i v-if="tab.icon" :class="`icon-${tab.icon}`"></i>
              {{ tab.name }}
            </div>
          </div>
        </div>

        <div
          v-if="hasNext"
          @click="scrollRight"
          class="s-tabs-nav__control s-has-next"
        >
          <i class="icon-back"></i>
        </div>
      </div>
    </div>

    <div class="s-tab-content" v-if="!hideContent">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="tab.value === selectedTab"
      >
        <slot :name="tab.value" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class Tabs extends Vue {
  @Prop()
  tabs!: [
    {
      name: string;
      value: string;
      icon: string;
    }
  ];

  @Watch("tabs", { deep: true })
  onTabsChange() {
    this.$nextTick(() => this.calculateScrolls());
  }

  @Prop()
  size!: string;

  @Prop()
  selected!: string;

  @Prop()
  className!: string;

  @Prop()
  hideContent!: boolean;

  @Prop({ default: true })
  updateRoute!: boolean;

  $refs!: {
    scrollable_tabs: HTMLDivElement;
  };

  isMounted = false;
  tabsContainer: HTMLDivElement = null as any;
  canScroll = false;
  hasNext = false;
  hasPrev = false;
  private scrollIncrement = 100;
  selectedTab: string = "";
  selectTabSize = {
    fontSize: this.tabSize
  };

  get tabSize() {
    if (this.size === "small") {
      return "14px";
    } else if (this.size === "large") {
      return "16px";
    } else {
      return "14px";
    }
  }

  created() {
    window.addEventListener("resize", this.calculateScrolls);
  }

  unmounted() {
    window.removeEventListener("resize", this.calculateScrolls);
  }

  mounted() {
    this.isMounted = true;
    this.tabsContainer = this.$refs.scrollable_tabs;
    this.calculateScrolls();
    if (this.selected) {
      this.selectedTab = this.selected;
    } else {
      this.selectedTab = this.tabs[0].value;
    }
  }

  scrollLeft() {
    this.tabsContainer.scrollLeft =
      this.tabsContainer.scrollLeft - this.scrollIncrement;
  }

  scrollRight() {
    this.tabsContainer.scrollLeft =
      this.tabsContainer.scrollLeft + this.scrollIncrement;
  }

  calculateScrolls() {
    if (!this.isMounted) return false;
    this.canScroll =
      this.tabsContainer.scrollWidth > this.tabsContainer.clientWidth;
    this.hasPrev = this.tabsContainer.scrollLeft > 0;
    const scrollRight =
      this.tabsContainer.scrollWidth -
      (this.tabsContainer.scrollLeft + this.tabsContainer.clientWidth);
    this.hasNext = scrollRight > 0;
  }

  showTab(tab: string) {
    this.selectedTab = tab;
    this.$emit("tab-selected", tab);
  }
}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";

a {
  text-decoration: none;
}

.s-tabs-wrapper {
  height: 100%;
}

.s-tabs-nav-wrapper {
  position: relative;
  height: 34px;
}

.s-tabs-nav {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-start;
  background: transparent;
  box-sizing: border-box;
  position: relative;
  max-width: none;
  background: transparent;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.s-tabs-nav__control {
  height: calc(~"2 * " @spacing);
  display: flex;
  align-items: flex-end;
  .margin-bottom(2);
  position: relative;

  &.s-has-next,
  &.s-has-prev {
    &:before {
      content: "";
      width: 40px;
      height: 16px;
      position: absolute;
    }
  }

  &.s-has-next {
    .icon-back {
      transform: rotate(180deg);
    }

    &:before {
      right: 16px;
      background: -moz-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      ); /* FF3.6-15 */
      background: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      ); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }
  }

  &.s-has-prev {
    &:before {
      left: 16px;
      background: -moz-linear-gradient(
        left,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      ); /* FF3.6-15 */
      background: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      ); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }
  }
}

.s-tabs {
  display: inline-block;
  overflow-x: hidden;
  white-space: nowrap;
  overflow-y: hidden;
  width: 100%;

  &.s-has-prev {
    .margin-left(2);
  }

  &.s-has-next {
    .margin-right(2);
  }

  &:before {
    content: "";
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: @day-border;
  }
}

.s-tab {
  color: @day-paragraph;
  border-bottom: 2px solid transparent;
  .margin-right(2.5);
  cursor: pointer;
  display: inline-block;
  position: relative;
  .transition();
  .weight(@medium);

  &.is-active {
    border-color: @dark-2;
    .s-tab-link {
      color: @day-title;
    }
  }

  i {
    .margin-right();
  }
}

.s-tab-link {
  .padding-bottom(1.375);
  display: flex;
  text-decoration: none;
}

.s-tab-content {
  position: relative;
  overflow-y: auto;
  .padding-v-sides(3);
}

.night,
.night-theme {
  .s-tabs {
    &:before {
      background-color: @night-border;
    }
  }

  .s-tab {
    color: @night-paragraph;
    &.is-active {
      border-color: @light-1;
      .s-tab-link {
        color: @night-title;
      }
    }
  }

  .s-tabs-nav__control {
    &.s-has-next {
      &:before {
        background: -moz-linear-gradient(
          left,
          rgba(23, 36, 45, 0) 0%,
          rgba(23, 36, 45, 1) 100%
        ); /* FF3.6-15 */
        background: -webkit-linear-gradient(
          left,
          rgba(23, 36, 45, 0) 0%,
          rgba(23, 36, 45, 1) 100%
        ); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(
          to right,
          rgba(23, 36, 45, 0) 0%,
          rgba(23, 36, 45, 1) 100%
        ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      }
    }

    &.s-has-prev {
      &:before {
        background: -moz-linear-gradient(
          left,
          rgba(23, 36, 45, 1) 0%,
          rgba(23, 36, 45, 0) 100%
        ); /* FF3.6-15 */
        background: -webkit-linear-gradient(
          left,
          rgba(23, 36, 45, 1) 0%,
          rgba(23, 36, 45, 0) 100%
        ); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(
          to right,
          rgba(23, 36, 45, 1) 0%,
          rgba(23, 36, 45, 0) 100%
        ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      }
    }
  }
}
</style>
