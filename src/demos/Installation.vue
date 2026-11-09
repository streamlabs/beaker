<template>
  <div class="section">
    <h1>Welcome to Beaker</h1>
    <p>A design system built for Streamlabs related products.</p>
    <h3>To install Beaker, run:</h3>
    <pre><code>pnpm add streamlabs-beaker@next</code></pre>
    <p>or</p>
    <pre><code>pnpm add streamlabs-beaker@{version}</code></pre>
    <p>Beaker requires Vue 3.</p>
    <br />
    <h3>Install the peer dependencies</h3>
    <p>
      Beaker declares these as peer dependencies, so your app installs them.
    </p>
    <ul>
      <li><code>fuse.js</code></li>
      <li><code>vue-final-modal</code></li>
      <li><code>vue-multiselect</code></li>
      <li><code>vue-router</code></li>
      <li><code>vue-slider-component</code></li>
    </ul>
    <p>
      <code>vue-final-modal</code> also needs <code>@vueuse/core</code>,
      <code>@vueuse/integrations</code>, and <code>focus-trap</code>.
    </p>
    <h3>Set up your app</h3>
    <p>
      Import the Beaker styles, and install the <code>vue-final-modal</code>
      plugin that the modal components use. If you use the
      <code>tooltip</code> prop on <code>FormGroupH</code> or
      <code>FormGroupV</code>, also install the <code>floating-vue</code>
      plugin that provides <code>v-tooltip</code>.
    </p>
    <pre><code>import { createApp } from 'vue';
import { createVfm } from 'vue-final-modal';
import FloatingVue from 'floating-vue';
import App from './App.vue';

import 'streamlabs-beaker/style.css';
import 'vue-final-modal/style.css';
import 'floating-vue/dist/style.css';

createApp(App)
  .use(createVfm())
  .use(FloatingVue)
  .mount('#app');</code></pre>
    <h3>To use a component, add:</h3>
    <pre><code>&lt;script setup lang="ts"&gt;
import { Accordion, Button, ProgressBar } from 'streamlabs-beaker';
&lt;/script&gt;</code></pre>

    <h3>Recommended tooling</h3>
    <ul>
      <li>
        <a href="https://vite.dev" target="_blank" rel="noopener">Vite</a>
      </li>
      <li>
        <a
          href="https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue"
          target="_blank"
          rel="noopener"
          >@vitejs/plugin-vue</a
        >
      </li>
      <li>
        <a href="https://www.typescriptlang.org" target="_blank" rel="noopener"
          >TypeScript</a
        >
      </li>
      <li>
        <a href="https://eslint.vuejs.org" target="_blank" rel="noopener"
          >eslint-plugin-vue</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener"
          >Vue Core Docs</a
        >
      </li>
      <li>
        <a href="https://getbem.com" target="_blank" rel="noopener"
          >BEM documentation</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
</script>
