<template>
  <div class="s-tabs" ref="tabsWrapper">
    <div class="s-tabs__nav" ref="tabsNav" :class="className">
      <div
        v-for="tab in modifiedTabs"
        :key="tab.value"
        class="s-tabs__tab"
        :class="{
          'is-active': tab.active,
          'is-hidden': tab.hidden
        }"
        :style="selectTabSize"
        @click="showTab(tab)"
        :aria-controls="`${tab.value}-tab`"
        @keydown.left.prevent="setTabOnKeyDown($event, tab.value, 'LEFT')"
        @keydown.up.prevent="setTabOnKeyDown($event, tab.value, 'LEFT')"
        @keydown.right.prevent="setTabOnKeyDown($event, tab.value)"
        @keydown.down.prevent="setTabOnKeyDown($event, tab.value)"
      >
        <component
          :is="tabLinkTag"
          :to="`#/${tab.value}`"
          tag="button"
          v-bind="tabLinkOptions(tab.value)"
          class="s-tabs__link"
          :tabindex="!tab.active ? '-1' : undefined"
        >
          <i v-if="tab.icon" :class="`icon-${tab.icon}`"></i>
          <span class="s-tabs__title">{{ tab.name }}</span>
        </component>
      </div>

      <PaneDropdown
        v-show="hasHiddenTabs"
        ref="hiddenTabsDropdown"
        menuAlign="right"
        :tabindex="hiddenActiveTab && !hiddenTabFocused ? 0 : -1"
      >
        <template slot="title"
          >More</template
        >
        <div
          v-for="tab in hiddenTabs"
          :key="`hidden-${tab.value}`"
          @click="showTab(tab)"
          :class="{ 'is-active': tab.active }"
          @blur="blurPaneDropDown"
          @focus="hiddenTabFocused = true"
          @keydown.left.prevent="setTabOnKeyDown($event, tab.value, 'LEFT')"
          @keydown.up.prevent="setTabOnKeyDown($event, tab.value, 'LEFT')"
          @keydown.right.prevent="setTabOnKeyDown($event, tab.value)"
          @keydown.down.prevent="setTabOnKeyDown($event, tab.value)"
        >
          <component
            :is="tabLinkTag"
            :to="`#/${tab.value}`"
            tag="button"
            :tabindex="!tab.active ? '-1' : undefined"
            class="s-tabs__link"
            >{{ tab.name }}</component
          >
        </div>
      </PaneDropdown>
    </div>

    <div class="s-tab-content" v-if="!hideContent">
      <div
        v-for="(tab, index) in modifiedTabs"
        :key="index"
        v-show="tab.active"
      >
        <slot :name="tab.value" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import ResizeObserver from "resize-observer-polyfill";
import { debounce, cloneDeep } from "lodash-es";
import PaneDropdown from "./PaneDropdown.vue";
interface ITab {
  name: string;
  value: string;
  icon: string;
}
interface IModifiedTab extends ITab {
  active: boolean;
  hidden: boolean;
  width: number;
}
@Component({
  components: {
    PaneDropdown
  }
})
export default class TabsNew extends Vue {
  @Prop()
  tabs!: ITab[];

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
    tabsNav: HTMLDivElement;
    tabsWrapper: HTMLDivElement;
    hiddenTabsDropdown: PaneDropdown;
  };

  isMounted = false;
  hasHiddenTabs = true;
  hiddenTabFocused = false;
  modifiedTabs: IModifiedTab[] = [];
  dropdownIsActive = false;
  selectTabSize = { fontSize: this.tabSize };
  prevWidth = 0;
  tabWidthsSet = false;
  tabsNav: HTMLDivElement = null as any;
  allTabElements: NodeListOf<HTMLDivElement> = null as any;

  get tabLinkTag() {
    return this.updateRoute ? "router-link" : "button";
  }

  get tabSize() {
    return this.size === "large" ? "16px" : "14px";
  }

  get hiddenTabs() {
    return this.modifiedTabs.filter(tab => tab.hidden);
  }

  get activeTab() {
    if (this.modifiedTabs.every(tab => !tab.active)) {
      return this.selected || this.modifiedTabs[0].value;
    }
    return this.modifiedTabs.find(tab => tab.active);
  }

  get hiddenActiveTab() {
    return this.hiddenTabs.find(tab => tab.active);
  }

  mounted() {
    this.$refs.hiddenTabsDropdown.$el.addEventListener(
      "focus",
      this.focusActiveTab
    );
    this.loadTabProperties();
    this.isMounted = true;
    this.tabsNav = this.$refs.tabsNav;

    this.$nextTick(() => {
      if (this.selected) {
        const activeTab =
          this.modifiedTabs.find(tab => this.selected === tab.value) ||
          this.modifiedTabs[0];
        activeTab.active = true;
      }

      this.allTabElements = this.tabsNav.querySelectorAll(".s-tabs__tab");
      this.setTabWidths();
    });

    this.$nextTick(() => {
      this.setTabWidths();
      this.loadResizeObserver();
    });
  }

  unmounted() {
    this.$refs.hiddenTabsDropdown.$el.removeEventListener(
      "focus",
      this.focusActiveTab
    );
  }

  loadTabProperties() {
    this.modifiedTabs = cloneDeep(this.tabs).map(tab => {
      return {
        ...tab,
        active: false,
        hidden: false,
        width: 0
      };
    });
  }

  setTabWidths() {
    Array.from(this.tabsNav.querySelectorAll(".s-tabs__tab")).forEach(
      (tab, idx) => {
        this.$nextTick(() => {
          let tabLink = tab.querySelector(".s-tabs__link") as HTMLDivElement;
          this.modifiedTabs[idx].width =
            idx !== this.modifiedTabs.length - 1
              ? tabLink.offsetWidth + 16
              : tabLink.offsetWidth;
        });
      }
    );
  }

  loadResizeObserver() {
    const ro = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        if (this.prevWidth !== width) {
          this.$nextTick(() => this.setHiddenTabs());
          this.prevWidth = width;
        }
      });
    });
    ro.observe(this.tabsNav);
  }

  setHiddenTabs() {
    if (!this.isMounted) return false;
    this.hasHiddenTabs = true;

    this.$nextTick(() => {
      const moreTab = Array.from(this.tabsNav.children).pop() as HTMLDivElement;
      let totalTabsWidth = moreTab.offsetWidth;
      const tabsNavWidth = this.tabsNav.offsetWidth;
      this.hasHiddenTabs = false;

      this.modifiedTabs.forEach((tab, index) => {
        tab.hidden = false;

        if (tabsNavWidth >= totalTabsWidth + tab.width && !this.hasHiddenTabs) {
          totalTabsWidth += tab.width;
        } else {
          this.modifiedTabs[index].hidden = true;
          if (!this.hasHiddenTabs) this.hasHiddenTabs = true;
        }
      });

      if (this.modifiedTabs.some(tab => tab.hidden)) this.hasHiddenTabs = true;
    });
  }

  setTabOnKeyDown(event, current, direction = "RIGHT") {
    const paneDropdown = this.$refs.hiddenTabsDropdown;
    const currentIndex = this.modifiedTabs.findIndex(
      tab => current === tab.value
    );
    let newIndex = 0;

    if (direction === "LEFT") {
      newIndex =
        currentIndex === 0 ? this.modifiedTabs.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === this.modifiedTabs.length - 1 ? 0 : currentIndex + 1;
    }

    this.togglePaneDropdown(
      this.modifiedTabs[currentIndex].hidden,
      this.modifiedTabs[newIndex].hidden
    );

    let newTab: HTMLSpanElement | HTMLAnchorElement = null as any;

    if (this.modifiedTabs[newIndex].hidden) {
      const newHiddenIndex = this.hiddenTabs.findIndex(
        tab => this.modifiedTabs[newIndex].value === tab.value
      );
      let newHiddenList: NodeListOf<HTMLAnchorElement> = null as any;

      this.$nextTick(() => {
        newHiddenList = paneDropdown.$el.querySelectorAll(
          ".s-pane-dropdown__list .s-tabs__link"
        );
        newTab = newHiddenList[newHiddenIndex];
      });

      const newHiddenTab = this.hiddenTabs[newHiddenIndex];
    } else {
      newTab = this.allTabElements[newIndex].querySelector(".s-tabs__link") as
        | HTMLSpanElement
        | HTMLAnchorElement;
    }

    this.$nextTick(() => {
      newTab.focus();
      this.showTab(this.modifiedTabs[newIndex]);
    });
  }

  togglePaneDropdown(currentHidden, newHidden) {
    const paneDropdown = this.$refs.hiddenTabsDropdown;

    if (newHidden && this.dropdownIsActive) return;
    if (newHidden) {
      this.$refs.hiddenTabsDropdown.show();
      this.openPaneDropdown();
    } else {
      this.closePaneDropdown();
    }
  }

  openPaneDropdown() {
    this.dropdownIsActive = true;
  }

  closePaneDropdown() {
    this.$refs.hiddenTabsDropdown.hide();
    this.dropdownIsActive = false;
  }

  showHiddenTabs(val: boolean) {
    this.dropdownIsActive = val;
  }

  tabLinkOptions(tabValue) {
    return {
      to: this.updateRoute ? `#/${tabValue}` : undefined
    };
  }

  blurPaneDropDown() {
    this.$nextTick(() => {
      const paneDropdown = this.$refs.hiddenTabsDropdown;
      const currnetHiddenList = paneDropdown.$el.querySelectorAll(
        ".s-pane-dropdown__list .s-tabs__link"
      );
      if (
        [...currnetHiddenList].some(
          tabElement => document.activeElement === tabElement
        )
      ) {
        return;
      }
      this.hiddenTabFocused = false;
      this.closePaneDropdown();
    });
  }

  focusActiveTab() {
    this.openPaneDropdown();
    // Only use activeTabIndex when whatInput.ask() === "keyboard".
    if (this.$whatInput.ask("intent") === "keyboard") {
      const activeTabIndex = this.hiddenTabs.findIndex(tab => tab.active);
      const paneDropdown = this.$refs.hiddenTabsDropdown;

      this.$nextTick(() => {
        const currnetHiddenList: NodeListOf<
          HTMLButtonElement | HTMLAnchorElement
        > = paneDropdown.$el.querySelectorAll(
          ".s-pane-dropdown__list .s-tabs__link"
        );
        const activeTab = currnetHiddenList[activeTabIndex];
        activeTab.focus();
      });
    }
  }

  showTab(tab: IModifiedTab) {
    this.modifiedTabs.forEach(tab => (tab.active = false));
    tab.active = true;
    this.$emit("tab-selected", tab.value);
  }
}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";
.s-tabs {
  height: 100%;

  a {
    cursor: pointer;
    .transition(color);
  }

  .is-active {
    color: @day-title;
  }

  .is-hidden {
    display: none;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    background: transparent;
    position: relative;
    border-bottom: 1px solid @day-border;
  }

  &__tab {
    position: relative;
    display: inline-block;
    .margin-right(2);
    padding-top: 4px;
    padding-bottom: 12px;
    .weight(@medium);
    color: @day-paragraph;
    cursor: pointer;
    .transition(color);

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      color: @day-title;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -1px;
      background-color: transparent;
      height: 2px;
      width: 100%;
      .transition(background-color);
    }

    &.is-active {
      border-color: @dark-2;

      &::after {
        background-color: @dark-2;
      }
    }

    i {
      .margin-right();
    }
  }

  &__link {
    padding: 0;
    border: none;
    font-size: 14px;
    .weight(@medium);
    background-color: transparent;
    color: inherit;
    cursor: pointer;
  }

  ::v-deep .s-pane-dropdown {
    padding-top: 4px;
    padding-bottom: 12px;

    &__list > div {
      .margin-bottom();

      &:last-child {
        margin-bottom: 0;
      }
    }

    .s-tabs__link {
      width: 100%;
      font-family: "Roboto", sans-serif;
      .weight(@medium);
      text-align: left;
      .transition(color);

      &:hover {
        color: @dark-2;
      }
    }
  }
}

.s-tab-content {
  position: relative;
  overflow-y: auto;
  .padding-v-sides(3);
}

.night,
.night-theme {
  .s-tabs {
    .is-active {
      color: @night-title;
    }

    &__nav {
      border-color: @night-border;
    }

    &__tab {
      color: @night-paragraph;

      &:hover {
        color: @night-title;
      }

      &.is-active {
        border-color: @light-1;

        &::after {
          background-color: @white;
        }
      }
    }

    ::v-deep .s-pane-dropdown {
      .s-tabs__link {
        &:hover {
          color: @white;
        }
      }
    }
  }
}
</style>
