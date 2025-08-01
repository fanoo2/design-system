#!/usr/bin/env node

/**
 * Minimal test runner for design system components
 * Tests that all exports can be imported and components can be rendered without crashing
 */

const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Simple test runner
let testsRun = 0;
let testsPassed = 0;

function test(name, fn) {
  testsRun++;
  try {
    fn();
    testsPassed++;
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
  }
}

// Import the built library
try {
  const designSystem = require('../../dist/index.js');
  
  // Test 1: Check that main exports exist
  test('Main exports exist', () => {
    if (!designSystem.Button) {
      throw new Error('Button component not exported');
    }
    if (!designSystem.colors) {
      throw new Error('colors tokens not exported');
    }
  });

  // Test 2: Button component can be imported and rendered
  test('Button component renders without crashing', () => {
    const button = React.createElement(designSystem.Button, { children: 'Test Button' });
    const html = ReactDOMServer.renderToString(button);
    if (!html.includes('Test Button')) {
      throw new Error('Button did not render children correctly');
    }
    if (!html.includes('<button')) {
      throw new Error('Button did not render as button element');
    }
  });

  // Test 3: Button accepts different variants
  test('Button accepts variant props', () => {
    const primaryButton = React.createElement(designSystem.Button, { 
      variant: 'primary', 
      children: 'Primary' 
    });
    const secondaryButton = React.createElement(designSystem.Button, { 
      variant: 'secondary', 
      children: 'Secondary' 
    });
    const outlineButton = React.createElement(designSystem.Button, { 
      variant: 'outline', 
      children: 'Outline' 
    });
    
    ReactDOMServer.renderToString(primaryButton);
    ReactDOMServer.renderToString(secondaryButton);
    ReactDOMServer.renderToString(outlineButton);
  });

  // Test 4: Colors tokens exist and have expected structure
  test('Colors tokens have expected structure', () => {
    if (!designSystem.colors.primary) {
      throw new Error('Primary colors not found');
    }
    if (!designSystem.colors.neutral) {
      throw new Error('Neutral colors not found');
    }
    if (typeof designSystem.colors.primary[500] !== 'string') {
      throw new Error('Primary 500 color should be a string');
    }
  });

} catch (error) {
  console.error('Failed to import design system:', error.message);
  process.exit(1);
}

// Results
console.log(`\nTest Results: ${testsPassed}/${testsRun} tests passed`);

if (testsPassed === testsRun) {
  console.log('✓ All tests passed!');
  process.exit(0);
} else {
  console.log('✗ Some tests failed!');
  process.exit(1);
}