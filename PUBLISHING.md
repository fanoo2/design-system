# Publishing Guide

This design system uses semantic versioning and automated publishing.

## Creating a Release

### 1. Using npm version (Recommended)

For patch releases (bug fixes):
```bash
npm version patch  # 0.1.0 -> 0.1.1
git push --follow-tags
```

For minor releases (new features):
```bash
npm version minor  # 0.1.0 -> 0.2.0
git push --follow-tags
```

For major releases (breaking changes):
```bash
npm version major  # 0.1.0 -> 1.0.0
git push --follow-tags
```

### 2. Manual tag creation

```bash
git tag v0.1.1
git push origin v0.1.1
```

## Workflow

1. The GitHub Action in `.github/workflows/publish.yml` triggers on version tags (v*.*.*)
2. It runs linting, tests, and builds the package
3. Updates the package.json version to match the tag
4. Publishes to npm with public access

## Testing Before Release

Always test your changes before creating a release:

```bash
npm run lint    # Check code style
npm test        # Run component tests
npm run build   # Ensure it builds successfully
```