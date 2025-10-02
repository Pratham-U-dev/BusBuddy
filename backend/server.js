const express = require('express');
const cors = require('cors');
const BusSimulator = require('./services/busSimulator');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize bus simulator
const simulator = new BusSimulator();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', apiRoutes(simulator));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║              🚌 BusBeacon API Server 🚌          ║
║                                                   ║
║  Server running on: http://localhost:${PORT}        ║
║  Environment: ${process.env.NODE_ENV || 'development'}                      ║
║                                                   ║
║  API Endpoints:                                   ║
║  • GET  /api/routes                               ║
║  • GET  /api/buses                                ║
║  • GET  /api/buses/:id                            ║
║  • GET  /api/stops/nearby?lat=...&lon=...         ║
║  • GET  /api/stops                                ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
  `);
  
  // Start bus simulation
  simulator.start();
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down gracefully...');
  simulator.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Shutting down gracefully...');
  simulator.stop();
  process.exit(0);
});
