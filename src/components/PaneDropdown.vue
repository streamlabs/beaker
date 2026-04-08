<template>
  <div
    ref="paneMenu"
    class="s-pane-dropdown"
    @blur.stop.prevent="close"
    v-on="hoverOption ? { mouseleave: hide } : {}"
  >
    <div
      ref="paneToggle"
      class="s-pane-dropdown__toggle"
      :class="{ 's-pane-dropdown__toggle--active': paneMenuOpen }"
      @click="paneMenuOpen = !paneMenuOpen"
      v-on="hoverOption ? { mouseover: show } : {}"
      :tabindex="0"
      @keydown.space.prevent="paneMenuOpen = !paneMenuOpen"
      @keydown.enter.prevent="paneMenuOpen = !paneMenuOpen"
      @keydown.esc.prevent="hide"
      @keydown.tab.shift="hide"
    >
      <span>
        <slot name="title"></slot>
        <i v-if="dropdownIcon" class="icon-dropdown"></i>
      </span>
    </div>

    <transition
      name="expand-dropdown"
      @enter="open"
      @after-enter="afterOpen"
      @leave="close"
    >
      <div
        v-show="paneMenuOpen"
        :class="menuClasses"
        class="s-pane-dropdown__menu"
      >
        <slot v-if="custom"></slot>
        <div
          ref="paneList"
          v-else
          @mouseup="onMenuClick"
          @keydown.esc.prevent="hide"
          class="s-pane-dropdown__list"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { mixin as vFocus } from "vue-focus";

@Component({
  name: "PaneDropdown",
  mixins: [vFocus]
})
export default class PaneDropdown extends Vue {
  $refs!: {
    paneMenu: HTMLDivElement;
    paneList: HTMLDivElement;
  };

  @Prop({ default: true })
  dropdownIcon!: boolean;

  @Prop({ default: null })
  menuAlign!: string;

  @Prop({ default: false })
  openAbove!: boolean;

  @Prop({ default: false })
  autoHeight!: boolean;

  @Prop({ default: true })
  closeOnSelect!: boolean;

  @Prop({ default: false })
  custom!: boolean;

  @Prop({ default: false })
  relativeMenu!: boolean;

  @Prop({ default: false })
  simpleMenu!: boolean;

  @Prop({ default: false })
  hoverOption!: boolean;

  @Prop({ default: false })
  nested!: boolean;

  paneMenuOpen = false;

  created() {
    document.addEventListener("click", this.documentClick);
  }

  unmounted() {
    document.removeEventListener("click", this.documentClick);
  }

  get menuClasses() {
    let classes: string[] = [];

    if (this.menuAlign) {
      classes.push(`s-pane-dropdown__menu--${this.menuAlign}`);
    }

    if (this.openAbove) {
      classes.push("s-pane-dropdown__menu--top");
    }

    if (this.autoHeight) {
      classes.push("s-pane-dropdown__menu--auto-height");
    }

    if (this.relativeMenu) {
      classes.push("s-pane-dropdown__menu--relative");
    }

    if (this.simpleMenu) {
      classes.push("s-pane-dropdown__menu--simple");
    }

    return classes;
  }

  @Watch("paneMenuOpen")
  watchPaneMenuOpen(newVal) {
    if (newVal && !this.custom) {
      this.$nextTick(() => {
        const list = this.$refs.paneList;
        const lastSlotItem = list.lastElementChild as HTMLElement;
        const onTab = e => {
          if (e.keyCode === 9 && !e.shiftKey) this.hide();
        };

        lastSlotItem.addEventListener("keydown", onTab);
      });
    }
  }

  afterOpen(element) {
    element.style.height = "auto";
  }

  open(element) {
    let width = getComputedStyle(element).width;
    element.style.width = width;
    let maxWidth = getComputedStyle(element).width;
    element.style.maxWidth = maxWidth;
    element.style.position = `absolute`;
    element.style.visibility = `hidden`;
    element.style.height = `auto`;
    let height = getComputedStyle(element).height;
    element.style.width = null;
    element.style.position = null;
    element.style.visibility = null;
    element.style.height = 0;
    getComputedStyle(element).height;
    setTimeout(() => {
      element.style.height = height;
    });
  }

  close(element) {
    if ("target" in element) return;

    let height = getComputedStyle(element).height;
    element.style.height = height;
    getComputedStyle(element).height;
    setTimeout(() => {
      element.style.height = 0;
    });
  }

  documentClick(e: Event) {
    let el: any = this.$refs.paneMenu;
    let target = e.target;
    if (el !== target && !el.contains(target)) {
      this.paneMenuOpen = false;
    }
  }

  onMenuClick() {
    this.closeOnSelect ? (this.paneMenuOpen = !this.paneMenuOpen) : null;
  }

  hide() {
    this.paneMenuOpen = false;
  }

  show() {
    this.paneMenuOpen = true;
  }
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-pane-dropdown {
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  padding: 3px 0;

  &__slot-list {
    display: none;
  }

  &__menu {
    position: absolute;
    top: 24px;
    z-index: 100;
    width: auto;
    max-height: 300px;
    margin: 0;
    padding: 0;
    .radius();
    text-align: left;
    list-style-type: none;
    background-color: @white;
    box-shadow: 0 6px 14px rgba(55, 71, 79, 0.1);
    overflow-y: auto;

    &--auto-height {
      max-height: initial;
    }
  }

  &__menu--right {
    right: 0;
  }

  &__menu--center {
    left: 50%;
    transform: translateX(-50%);
  }

  &__menu--top {
    bottom: calc(100% + 8px);
    top: unset;
  }

  &__menu--relative {
    position: relative;
    top: 0;
  }

  &__menu--simple {
    background-color: transparent;
    box-shadow: none;

    .s-pane-dropdown__list {
      .margin(0);
    }
  }

  &__icon {
    .margin-right();
  }

  &__list {
    .margin(2);
    padding: 0;
    list-style-type: none;

    .s-pane-dropdown {
      &__toggle {
        margin-bottom: 0;
      }

      &__menu {
        position: relative;
        top: 4px;
        box-shadow: none;
      }

      &__list {
        margin: 8px 8px 0;
      }
    }

    hr {
      width: 100%;
      margin: 12px 0 16px;
      border: none;
      border-bottom: 1px solid @light-3;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      white-space: nowrap;
      .margin-bottom();

      &:last-of-type {
        margin-bottom: 4px;
      }
    }

    i {
      .margin-right();
    }
  }

  &__toggle {
    display: flex;
    .weight(@medium);
    .transition();
    text-decoration: none;
    cursor: pointer;

    & span {
      display: flex;
      align-items: center;
      white-space: nowrap;
    }

    i {
      color: @icon;
      .margin-left();
      margin-top: -2px;
    }
  }

  &__toggle--active {
    color: @dark-2;

    i {
      color: @dark-2;
    }
  }
}

.night {
  .s-pane-dropdown {
    &__toggle {
      &:hover {
        color: @white;
      }
    }

    &__toggle--active {
      color: white;

      i {
        color: white;
      }
    }

    &__menu {
      background-color: @dark-4;
    }

    &__menu--simple {
      background-color: transparent;
    }

    &__list {
      hr {
        border-bottom-color: @dark-5;
      }
    }

    a {
      &:hover {
        color: @night-title;
      }
    }
  }
}

.expand-dropdown-enter-active {
  animation: dropdown-fadein 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes dropdown-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
