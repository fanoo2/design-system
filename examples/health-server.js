#!/usr/bin/env node

/**
 * Simple Health Check Example
 * 
 * This is an example of how to implement a health check endpoint
 * for services using the design system.
 */

const http = require('http');

const PORT = process.env.PORT || 3000;
const VERSION = require('../package.json').version;

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/health' && req.method === 'GET') {
    // Health check endpoint
    const healthResponse = {
      status: 'healthy',
      service: 'design-system',
      version: VERSION,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage()
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(healthResponse, null, 2));
    return;
  }

  if (req.url === '/' && req.method === 'GET') {
    // Root health check (simple)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Design System v${VERSION} - Healthy`);
    return;
  }

  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`🏥 Health check server running on port ${PORT}`);
  console.log(`📊 Health endpoint: http://localhost:${PORT}/health`);
  console.log(`🌐 Root check: http://localhost:${PORT}/`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});