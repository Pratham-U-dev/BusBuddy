const express = require('express');
const router = express.Router();

module.exports = (simulator) => {
  // GET /api/routes - Get all bus routes
  router.get('/routes', (req, res) => {
    try {
      const routes = simulator.getRoutes();
      res.json({
        success: true,
        count: routes.length,
        data: routes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server error retrieving routes'
      });
    }
  });

  // GET /api/buses - Get all buses with current locations
  router.get('/buses', (req, res) => {
    try {
      const buses = simulator.getBuses();
      const busesWithDetails = buses.map(bus => {
        const route = simulator.getRouteById(bus.routeId);
        return {
          id: bus.id,
          routeId: bus.routeId,
          routeNumber: route ? route.number : 'N/A',
          routeName: route ? route.name : 'N/A',
          status: bus.status,
          currentLocation: {
            lat: bus.currentLat,
            lon: bus.currentLon
          },
          currentStopIndex: bus.currentStopIndex,
          color: route ? route.color : '#000000'
        };
      });

      res.json({
        success: true,
        count: busesWithDetails.length,
        data: busesWithDetails
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server error retrieving buses'
      });
    }
  });

  // GET /api/buses/:id - Get specific bus details with ETAs
  router.get('/buses/:id', (req, res) => {
    try {
      const bus = simulator.getBusById(req.params.id);
      
      if (!bus) {
        return res.status(404).json({
          success: false,
          error: 'Bus not found'
        });
      }

      const route = simulator.getRouteById(bus.routeId);
      
      if (!route) {
        return res.status(404).json({
          success: false,
          error: 'Route not found for this bus'
        });
      }

      // Calculate ETAs for all upcoming stops
      const upcomingStops = route.stops.map(stop => {
        const eta = simulator.calculateETA(bus, stop.id);
        return {
          ...stop,
          eta: eta
        };
      });

      res.json({
        success: true,
        data: {
          id: bus.id,
          status: bus.status,
          currentLocation: {
            lat: bus.currentLat,
            lon: bus.currentLon
          },
          route: {
            id: route.id,
            number: route.number,
            name: route.name,
            color: route.color,
            stops: route.stops
          },
          upcomingStops: upcomingStops
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server error retrieving bus details'
      });
    }
  });

  // GET /api/stops/nearby - Get nearest stop and ETAs
  router.get('/stops/nearby', (req, res) => {
    try {
      const lat = parseFloat(req.query.lat);
      const lon = parseFloat(req.query.lon);

      if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid latitude or longitude'
        });
      }

      const nearestStop = simulator.getNearestStop(lat, lon);
      
      if (!nearestStop) {
        return res.status(404).json({
          success: false,
          error: 'No stops found nearby'
        });
      }

      const busETAs = simulator.getBusesAtStop(nearestStop.id);

      res.json({
        success: true,
        data: {
          stop: nearestStop,
          buses: busETAs
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server error retrieving nearby stops'
      });
    }
  });

  // GET /api/stops - Get all stops (useful for stops page)
  router.get('/stops', (req, res) => {
    try {
      const routes = simulator.getRoutes();
      const allStops = [];
      const stopIds = new Set();

      routes.forEach(route => {
        route.stops.forEach(stop => {
          if (!stopIds.has(stop.id)) {
            stopIds.add(stop.id);
            allStops.push({
              ...stop,
              routes: [{ number: route.number, name: route.name, color: route.color }]
            });
          } else {
            const existingStop = allStops.find(s => s.id === stop.id);
            if (existingStop) {
              existingStop.routes.push({ number: route.number, name: route.name, color: route.color });
            }
          }
        });
      });

      res.json({
        success: true,
        count: allStops.length,
        data: allStops
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server error retrieving stops'
      });
    }
  });

  return router;
};
