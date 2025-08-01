# Testing Guide

This design system includes comprehensive testing to ensure reliability and maintainability.

## Test Structure

### Unit Tests
- **Location**: `design-system/src/**/__tests__/*.test.(ts|tsx)`
- **Framework**: Jest + React Testing Library
- **Coverage**: 100% code coverage for all components and tokens

### Test Types

#### Component Tests (`Button.test.tsx`)
- **Rendering Tests**: Verify components render correctly with various props
- **Interaction Tests**: Test user interactions (clicks, keyboard navigation)
- **Accessibility Tests**: Ensure proper ARIA attributes and keyboard support
- **Style Tests**: Verify correct styling based on props
- **Edge Cases**: Handle invalid props and edge conditions gracefully

#### Token Tests (`colors.test.ts`)
- **Structure Tests**: Verify token object structure and consistency
- **Format Tests**: Ensure color values are valid hex strings
- **Type Safety**: Test TypeScript type definitions
- **Accessibility**: Check for proper semantic color categories

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run legacy smoke tests
npm run test:legacy
```

### Coverage Thresholds

The project maintains high code coverage standards:
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### Writing New Tests

When adding new components or tokens:

1. Create test files in the appropriate `__tests__` directory
2. Follow the existing test patterns and naming conventions
3. Ensure comprehensive coverage of all functionality
4. Include accessibility and edge case testing
5. Update this documentation if adding new test patterns

### CI Integration

Tests are automatically run in the CI pipeline:
- **PR Checks**: All tests must pass before merging
- **Coverage Reporting**: Coverage reports are uploaded to Codecov
- **Multiple Test Types**: Both Jest unit tests and legacy smoke tests run