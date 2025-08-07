#!/usr/bin/env node

/**
 * Smoke Test Script for Design System
 * 
 * This script performs end-to-end smoke testing by:
 * 1. Building the project
 * 2. Starting Storybook server
 * 3. Making HTTP health checks
 * 4. Validating that the system is healthy
 */

const { spawn, exec } = require('child_process');
const http = require('http');
const path = require('path');

const STORYBOOK_PORT = 6006;
const HEALTH_CHECK_URL = `http://localhost:${STORYBOOK_PORT}`;
const BUILD_TIMEOUT = 120000; // 2 minutes
const SERVER_STARTUP_TIMEOUT = 30000; // 30 seconds
const HEALTH_CHECK_TIMEOUT = 10000; // 10 seconds

console.log('🧪 Starting Design System Smoke Tests...\n');

/**
 * Execute a command and return a promise
 */
function executeCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`📦 Running: ${command}`);
    exec(command, { 
      cwd: path.join(__dirname, '../..'), 
      ...options 
    }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Command failed: ${command}`);
        console.error(`Error: ${error.message}`);
        if (stderr) console.error(`Stderr: ${stderr}`);
        reject(error);
      } else {
        console.log(`✅ Command succeeded: ${command}`);
        if (stdout) console.log(`Output: ${stdout.trim()}`);
        resolve(stdout);
      }
    });
  });
}

/**
 * Start Storybook server and return process
 */
function startStorybookServer() {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Starting Storybook server on port ${STORYBOOK_PORT}...`);
    
    const storybookProcess = spawn('npm', ['run', 'storybook'], {
      cwd: path.join(__dirname, '../..'),
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let serverReady = false;
    const timeout = setTimeout(() => {
      if (!serverReady) {
        storybookProcess.kill();
        reject(new Error('Storybook server startup timeout'));
      }
    }, SERVER_STARTUP_TIMEOUT);

    storybookProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`Storybook: ${output.trim()}`);
      
      // Look for indicators that Storybook is ready
      if (output.includes('Local:') || output.includes('webpack compiled') || output.includes('ready')) {
        if (!serverReady) {
          serverReady = true;
          clearTimeout(timeout);
          console.log('✅ Storybook server is ready!');
          resolve(storybookProcess);
        }
      }
    });

    storybookProcess.stderr.on('data', (data) => {
      console.error(`Storybook Error: ${data.toString().trim()}`);
    });

    storybookProcess.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });

    storybookProcess.on('exit', (code) => {
      clearTimeout(timeout);
      if (code !== 0 && !serverReady) {
        reject(new Error(`Storybook process exited with code ${code}`));
      }
    });
  });
}

/**
 * Perform health check on the running server
 */
function performHealthCheck() {
  return new Promise((resolve, reject) => {
    console.log(`🏥 Performing health check on ${HEALTH_CHECK_URL}...`);
    
    const timeout = setTimeout(() => {
      reject(new Error('Health check timeout'));
    }, HEALTH_CHECK_TIMEOUT);

    const req = http.get(HEALTH_CHECK_URL, (res) => {
      clearTimeout(timeout);
      
      console.log(`📊 Health check response: ${res.statusCode} ${res.statusMessage}`);
      
      if (res.statusCode === 200) {
        console.log('✅ Health check passed! Server is healthy.');
        resolve({ status: 'healthy', statusCode: res.statusCode });
      } else {
        reject(new Error(`Health check failed with status ${res.statusCode}`));
      }
    });

    req.on('error', (error) => {
      clearTimeout(timeout);
      console.error(`❌ Health check failed: ${error.message}`);
      reject(error);
    });
  });
}

/**
 * Wait for a specified amount of time
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main smoke test execution
 */
async function runSmokeTests() {
  let storybookProcess = null;
  
  try {
    // Step 1: Build the project
    console.log('='.repeat(50));
    console.log('1️⃣  Building the project...');
    console.log('='.repeat(50));
    await executeCommand('npm run build');
    
    // Step 2: Build Storybook
    console.log('\n' + '='.repeat(50));
    console.log('2️⃣  Building Storybook...');
    console.log('='.repeat(50));
    await executeCommand('npm run build-storybook');
    
    // Step 3: Start Storybook server
    console.log('\n' + '='.repeat(50));
    console.log('3️⃣  Starting Storybook server...');
    console.log('='.repeat(50));
    storybookProcess = await startStorybookServer();
    
    // Step 4: Wait a moment for server to fully initialize
    console.log('\n⏳ Waiting for server to fully initialize...');
    await wait(3000);
    
    // Step 5: Perform health check
    console.log('\n' + '='.repeat(50));
    console.log('4️⃣  Performing health checks...');
    console.log('='.repeat(50));
    await performHealthCheck();
    
    // Success!
    console.log('\n' + '🎉'.repeat(20));
    console.log('🎉 ALL SMOKE TESTS PASSED! 🎉');
    console.log('🎉 Design System is ready for production! 🎉');
    console.log('🎉'.repeat(20));
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n' + '💥'.repeat(20));
    console.error('💥 SMOKE TESTS FAILED! 💥');
    console.error(`💥 Error: ${error.message} 💥`);
    console.error('💥'.repeat(20));
    
    process.exit(1);
    
  } finally {
    // Clean up: Kill Storybook process if it's running
    if (storybookProcess) {
      console.log('\n🧹 Cleaning up: Stopping Storybook server...');
      storybookProcess.kill();
    }
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Smoke tests interrupted by user');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Smoke tests terminated');
  process.exit(1);
});

// Run the smoke tests
runSmokeTests().catch((error) => {
  console.error('\n💥 Unhandled error in smoke tests:', error);
  process.exit(1);
});