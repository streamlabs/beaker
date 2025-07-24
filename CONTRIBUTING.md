# Contributing Guide

## Development Workflow

1. **Fork and clone** the repository
2. **Create feature branch** from appropriate base:
   - For new features: branch from `master` | Vue 3
   - For legacy fixes: branch from `v0.x` | Vue 2
3. **Make changes** and test locally
4. **Create PR** to the appropriate branch
5. **Wait for review** and address feedback

## Branch Guidelines

- **master**: New features and breaking changes (v1.x.x)
- **v0.x**: Bug fixes and patches for legacy version (v0.x.x)

## Commit Message Format

Use conventional commits:
```bash
feat: add new component
fix: resolve component bug
docs: update documentation
