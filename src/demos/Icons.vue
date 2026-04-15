<template>
  <div class="icons">
    <div class="section">
      <h1>Icons</h1>

      <p>
        In order to gain access to the icons add the following link tag to your
        main HTML file:
        <code>
          &lt;link href=&quot;https://cdn.streamlabs.com/icons/style.css&quot;
          rel=&quot;stylesheet&quot; /&gt;
        </code>
      </p>

      <p>
        Click on an icon to copy the icon class name to the clipboard. Hover
        over an icon to display the full icon name and icon code.
      </p>
    </div>

    <div
      v-if="iconList.length"
      class="icon__grid"
      @click="handleCopy(selectedIcon)"
    >
      <div
        v-for="icon in iconList"
        :key="icon"
        class="icon"
        :title="icon"
        @click="selectIconData(`${icon}`)"
      >
        <i class="icon__glyph" :class="icon">
          <i class="icon-copy"></i>
        </i>
        <span class="icon__label">{{ icon }}</span>
      </div>
    </div>

    <h1 class="icon__error" v-else>
      <i class="icon-error" />
      There was an error loading the icons
    </h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNotification } from './../composables/useNotification';
import { useClipboard } from '@vueuse/core';

const ICON_STYLESHEET_URL = 'https://cdn.streamlabs.com/icons/style.css';

const { copy } = useClipboard();
const { success, error } = useNotification();
const iconList = ref<string[]>([]);
const selectedIcon = ref('');

onMounted(() => {
  const styleSheetsList = Array.from(document.styleSheets);
  const link = Array.from(
    styleSheetsList.find((ss) => ss.href === ICON_STYLESHEET_URL)?.cssRules ||
      [],
  );
  iconList.value = link
    ?.filter((rule) => rule.cssText.startsWith('.icon'))
    .map((rule) => rule.cssText.match(/([a-zA-Z0-9-])*(?=::before)/)?.[0] || '')
    .sort();
});

function selectIconData(icon: string) {
  selectedIcon.value = icon;
}

async function handleCopy(text: string) {
  try {
    await copy(text);
    success(`Copied: '${text}'`);
  } catch (e: unknown) {
    error(String(e));
  }
}

function emitCopySuccess(e: { text: string }) {
  success(`Copied "${e.text}" to clipboard`);
}

function emitCopyError(e: unknown) {
  error(String(e));
}
</script>

<style lang="less" scoped>
@import (reference) './../styles/Imports';

.icons {
  position: relative;
  max-width: 1200px;
}

.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    grid-column-gap: 24px;
    grid-row-gap: 48px;
    color: @icon;
  }

  &__glyph {
    position: relative;
    .margin-bottom();
    font-size: 32px;
    color: @dark-2;

    .icon-copy {
      position: absolute;
      top: -18px;
      right: -18px;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  &__label {
    width: 100%;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: @light-5;
    overflow: hidden;
  }

  &:hover {
    .icon__glyph {
      .icon-copy {
        opacity: 1;
      }
    }
  }

  &__liga {
    font-size: 10px;
  }

  &__error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30vh;

    & > i {
      font-size: 80px;
      margin-bottom: 24px;
    }
  }
}

.night,
.night-theme {
  .icon {
    &__glyph {
      color: @white;
    }

    &__label {
      color: @light-4;
    }

    &__liga {
      color: @dark-5;
    }
  }
}
</style>
