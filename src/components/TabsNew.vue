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
        <template #title>More</template>
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

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import { cloneDeep } from "lodash-es";
import whatInput from "what-input";
import PaneDropdown from "./PaneDropdown.vue";

interface ITab {
  name: string;
  value: string;
  icon?: string;
}

interface IModifiedTab extends ITab {
  active: boolean;
  hidden: boolean;
  width: number;
}

const props = withDefaults(
  defineProps<{
    tabs: ITab[];
    size?: string;
    selected?: string;
    className?: string;
    hideContent?: boolean;
    updateRoute?: boolean;
  }>(),
  {
    updateRoute: true,
  }
);

const emit = defineEmits<{ "tab-selected": [tab: string] }>();

const tabsNav = useTemplateRef<HTMLDivElement>("tabsNav");
const tabsWrapper = useTemplateRef<HTMLDivElement>("tabsWrapper");
const hiddenTabsDropdown = useTemplateRef<InstanceType<typeof PaneDropdown>>("hiddenTabsDropdown");

const isMounted = ref(false);
const hasHiddenTabs = ref(true);
const hiddenTabFocused = ref(false);
const modifiedTabs = ref<IModifiedTab[]>([]);
const dropdownIsActive = ref(false);
const prevWidth = ref(0);
const tabWidthsSet = ref(false);

const tabLinkTag = computed(() => (props.updateRoute ? "router-link" : "button"));

const tabSize = computed(() => (props.size === "large" ? "16px" : "14px"));

const selectTabSize = computed(() => ({ fontSize: tabSize.value }));

const hiddenTabs = computed(() => modifiedTabs.value.filter((tab) => tab.hidden));

const activeTab = computed(() => {
  if (modifiedTabs.value.every((tab) => !tab.active)) {
    return props.selected || modifiedTabs.value[0]?.value;
  }
  return modifiedTabs.value.find((tab) => tab.active);
});

const hiddenActiveTab = computed(() => hiddenTabs.value.find((tab) => tab.active));

function loadTabProperties() {
  modifiedTabs.value = cloneDeep(props.tabs).map((tab) => ({
    ...tab,
    active: false,
    hidden: false,
    width: 0,
  }));
}

function setTabWidths() {
  Array.from(tabsNav.value!.querySelectorAll(".s-tabs__tab")).forEach((tab, idx) => {
    nextTick(() => {
      const tabLink = tab.querySelector(".s-tabs__link") as HTMLDivElement;
      modifiedTabs.value[idx].width =
        idx !== modifiedTabs.value.length - 1
          ? tabLink.offsetWidth + 16
          : tabLink.offsetWidth;
    });
  });
}

function loadResizeObserver() {
  const ro = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const { width } = entry.contentRect;
      if (prevWidth.value !== width) {
        nextTick(() => setHiddenTabs());
        prevWidth.value = width;
      }
    });
  });
  ro.observe(tabsNav.value!);
}

function setHiddenTabs() {
  if (!isMounted.value) return;
  hasHiddenTabs.value = true;

  nextTick(() => {
    const moreTab = Array.from(tabsNav.value!.children).pop() as HTMLDivElement;
    let totalTabsWidth = moreTab.offsetWidth;
    const tabsNavWidth = tabsNav.value!.offsetWidth;
    hasHiddenTabs.value = false;

    modifiedTabs.value.forEach((tab, index) => {
      tab.hidden = false;

      if (tabsNavWidth >= totalTabsWidth + tab.width && !hasHiddenTabs.value) {
        totalTabsWidth += tab.width;
      } else {
        modifiedTabs.value[index].hidden = true;
        if (!hasHiddenTabs.value) hasHiddenTabs.value = true;
      }
    });

    if (modifiedTabs.value.some((tab) => tab.hidden)) hasHiddenTabs.value = true;
  });
}

function setTabOnKeyDown(event: KeyboardEvent, current: string, direction = "RIGHT") {
  const currentIndex = modifiedTabs.value.findIndex((tab) => current === tab.value);
  let newIndex = 0;

  if (direction === "LEFT") {
    newIndex = currentIndex === 0 ? modifiedTabs.value.length - 1 : currentIndex - 1;
  } else {
    newIndex = currentIndex === modifiedTabs.value.length - 1 ? 0 : currentIndex + 1;
  }

  togglePaneDropdown(
    modifiedTabs.value[currentIndex].hidden,
    modifiedTabs.value[newIndex].hidden
  );

  let newTab: HTMLSpanElement | HTMLAnchorElement | null = null;

  if (modifiedTabs.value[newIndex].hidden) {
    const newHiddenIndex = hiddenTabs.value.findIndex(
      (tab) => modifiedTabs.value[newIndex].value === tab.value
    );

    nextTick(() => {
      const newHiddenList = hiddenTabsDropdown.value!.$el.querySelectorAll<HTMLAnchorElement>(
        ".s-pane-dropdown__list .s-tabs__link"
      );
      newTab = newHiddenList[newHiddenIndex];
    });
  } else {
    const allTabElements = tabsNav.value!.querySelectorAll<HTMLDivElement>(".s-tabs__tab");
    newTab = allTabElements[newIndex].querySelector(".s-tabs__link") as
      | HTMLSpanElement
      | HTMLAnchorElement;
  }

  nextTick(() => {
    newTab?.focus();
    showTab(modifiedTabs.value[newIndex]);
  });
}

function togglePaneDropdown(currentHidden: boolean, newHidden: boolean) {
  if (newHidden && dropdownIsActive.value) return;
  if (newHidden) {
    hiddenTabsDropdown.value!.show();
    openPaneDropdown();
  } else {
    closePaneDropdown();
  }
}

function openPaneDropdown() {
  dropdownIsActive.value = true;
}

function closePaneDropdown() {
  hiddenTabsDropdown.value!.hide();
  dropdownIsActive.value = false;
}

function tabLinkOptions(tabValue: string) {
  return {
    to: props.updateRoute ? `#/${tabValue}` : undefined,
  };
}

function blurPaneDropDown() {
  nextTick(() => {
    const currentHiddenList = hiddenTabsDropdown.value!.$el.querySelectorAll(
      ".s-pane-dropdown__list .s-tabs__link"
    );
    if ([...currentHiddenList].some((tabEl) => document.activeElement === tabEl)) {
      return;
    }
    hiddenTabFocused.value = false;
    closePaneDropdown();
  });
}

function focusActiveTab() {
  openPaneDropdown();
  if (whatInput.ask("intent") === "keyboard") {
    const activeTabIndex = hiddenTabs.value.findIndex((tab) => tab.active);

    nextTick(() => {
      const currentHiddenList =
        hiddenTabsDropdown.value!.$el.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>(
          ".s-pane-dropdown__list .s-tabs__link"
        );
      currentHiddenList[activeTabIndex]?.focus();
    });
  }
}

function showTab(tab: IModifiedTab) {
  modifiedTabs.value.forEach((t) => (t.active = false));
  tab.active = true;
  emit("tab-selected", tab.value);
}

onMounted(() => {
  hiddenTabsDropdown.value!.$el.addEventListener("focus", focusActiveTab);
  loadTabProperties();
  isMounted.value = true;

  nextTick(() => {
    if (props.selected) {
      const activeTab =
        modifiedTabs.value.find((tab) => props.selected === tab.value) ||
        modifiedTabs.value[0];
      activeTab.active = true;
    }
    setTabWidths();
  });

  nextTick(() => {
    setTabWidths();
    loadResizeObserver();
  });
});

onBeforeUnmount(() => {
  hiddenTabsDropdown.value!.$el.removeEventListener("focus", focusActiveTab);
});
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
