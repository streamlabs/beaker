# Streamlabs Beaker

[![npm version](https://badge.fury.io/js/%5Blibrary%20name%5D.svg)](https://badge.fury.io/js/%5Blibrary%20name%5D)
[![Vue 2](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://v2.vuejs.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive design system built for Streamlabs related products, providing a consistent and reusable component library for Vue applications.

## 📦 Installation

### Prerequisites
- Node.js 20+
- Vue 2.x or Vue 3.x

### Install the Package
```bash
npm install streamlabs-beaker
```

### Version Compatibility
- **v1.x.x** - Vue 3 support (latest)
- **v0.x.x** - Vue 2 support (legacy maintenance)

```bash
# For Vue 3 projects
npm install streamlabs-beaker@latest

# For Vue 2 projects  
npm install streamlabs-beaker@legacy
```

### Peer Dependencies
Install required peer dependencies based on your Vue version:

```bash
# Vue 3 projects
npm install vue-final-modal moment fuse.js

# Vue 2 projects
npm install vue-js-modal moment fuse.js
```

## 🛠️ Setup

### 1. Import Styles
Add the CSS import to your main application file:

```javascript
// main.js or App.vue
import 'streamlabs-beaker/dist/style.css';
```

### 2. Import Components
Import components as needed in your Vue components:

```vue
<template>
  <div>
    <Button variation="default" @click="handleClick">
      Show Modal
    </Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MyButton, MyModal } from 'streamlabs-beaker';

const showModal = ref(false);

function handleClick() {
  showModal.value = true;
}
</script>
```


## 🤝 Contributing

We welcome contributions from the community! Please follow our guidelines below.

### Development Workflow

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/beaker.git
   cd beaker
   npm install
   ```

2. **Create Feature Branch**
   ```bash
   # For new features (Vue 3)
   git checkout -b feature/your-feature-name

   # For Vue 2 legacy fixes
   git checkout v0.x
   git checkout -b hotfix/your-fix-name
   ```

3. **Make Changes**
   - Write your code
   - Update documentation if needed

4. **Create Pull Request**
   - **New features**: Create PR to `master` branch
   - **Legacy fixes**: Create PR to `v0.x` branch

### Commit Message Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for automated changelog generation:

```bash
# Features
feat: add new DatePicker component
feat(button): add loading state prop

# Bug fixes
fix: resolve component reactivity issue
fix(modal): prevent body scroll on mobile

# Documentation
docs: update installation instructions
docs(forms): add validation examples

# Other types
refactor: simplify prop validation logic
test: add unit tests for Button component
chore: update dependencies
perf: optimize table rendering performance
```

### Branch Guidelines

- **master** - New features and breaking changes (v1.x.x for Vue 3)
- **v0.x** - Bug fixes and patches for legacy version (v0.x.x for Vue 2)

### Code Standards

- Follow existing code style and conventions
- Add TypeScript types for new components
- Include JSDoc comments for public APIs
- Ensure all tests pass before submitting PR

## 📋 Version Support

### Current Versions
- **v1.x** (Vue 3) - Active development with new features
- **v0.x** (Vue 2) - Maintenance mode with critical bug fixes

### Installation by Version
```bash
npm install [library name]@latest  # Vue 3 (v1.x)
npm install [library name]@legacy  # Vue 2 (v0.x)
```

## 🐛 Issues & Support

- **Bug Reports**: [Create an Issue](https://github.com/streamlabs/beaker/issues)
- **Feature Requests**: [Create an Issue](https://github.com/streamlabs/beaker/issues)
- **Documentation**: [View Docs](https://streamlabs.github.io/beaker/#/installation)

When reporting issues, please include:
- Vue version
- Library version
- Browser and version
- Minimal reproduction example

## 📖 Documentation

Complete documentation with examples and API references:
**[https://streamlabs.github.io/beaker/#/installation](https://streamlabs.github.io/beaker/#/installation)**

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Generate documentation
npm run changelog
```

## 📜 License

MIT License

Copyright (c) 2019 Streamlabs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

**Built with ❤️ by Streamlabs**
