// Bus simulation service - updates bus positions in real-time

const { routes, buses } = require('../data/mockData');

class BusSimulator {
  constructor() {
    this.buses = buses;
    this.routes = routes;
    this.simulationInterval = null;
  }

  start() {
    console.log('🚌 Starting bus simulation...');
    this.simulationInterval = setInterval(() => {
      this.updateBusPositions();
    }, 5000); // Update every 5 seconds
  }

  stop() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      console.log('🛑 Bus simulation stopped');
    }
  }

  updateBusPositions() {
    this.buses.forEach(bus => {
      if (bus.status !== 'In Service') return;

      const route = this.routes.find(r => r.id === bus.routeId);
      if (!route) return;

      const stops = route.stops;
      const nextStopIndex = (bus.currentStopIndex + 1) % stops.length;
      const nextStop = stops[nextStopIndex];

      // Calculate direction to next stop
      const latDiff = nextStop.lat - bus.currentLat;
      const lonDiff = nextStop.lon - bus.currentLon;
      const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);

      // If close enough to next stop, move to it
      if (distance < bus.speed) {
        bus.currentLat = nextStop.lat;
        bus.currentLon = nextStop.lon;
        bus.currentStopIndex = nextStopIndex;
      } else {
        // Move towards next stop
        const ratio = bus.speed / distance;
        bus.currentLat += latDiff * ratio;
        bus.currentLon += lonDiff * ratio;
      }
    });
  }

  getBuses() {
    return this.buses;
  }

  getBusById(id) {
    return this.buses.find(bus => bus.id === id);
  }

  getRoutes() {
    return this.routes;
  }

  getRouteById(id) {
    return this.routes.find(route => route.id === id);
  }

  calculateETA(bus, stopId) {
    const route = this.routes.find(r => r.id === bus.routeId);
    if (!route) return null;

    const stops = route.stops;
    const targetStopIndex = stops.findIndex(s => s.id === stopId);
    
    if (targetStopIndex === -1) return null;

    // Calculate distance to target stop
    let totalDistance = 0;
    let currentIndex = bus.currentStopIndex;
    
    // Distance from current position to next stop
    const nextStop = stops[(currentIndex + 1) % stops.length];
    const latDiff = nextStop.lat - bus.currentLat;
    const lonDiff = nextStop.lon - bus.currentLon;
    totalDistance += Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);

    // Add distances between subsequent stops
    currentIndex = (currentIndex + 1) % stops.length;
    while (currentIndex !== targetStopIndex) {
      const currentStop = stops[currentIndex];
      const nextStopInRoute = stops[(currentIndex + 1) % stops.length];
      const lat = nextStopInRoute.lat - currentStop.lat;
      const lon = nextStopInRoute.lon - currentStop.lon;
      totalDistance += Math.sqrt(lat * lat + lon * lon);
      currentIndex = (currentIndex + 1) % stops.length;
    }

    // Convert distance to time (approximate)
    // Assuming speed is in degrees per 5 seconds, calculate minutes
    const timeInCycles = totalDistance / bus.speed;
    const timeInMinutes = Math.ceil((timeInCycles * 5) / 60);

    return timeInMinutes;
  }

  getNearestStop(lat, lon) {
    let nearestStop = null;
    let minDistance = Infinity;

    this.routes.forEach(route => {
      route.stops.forEach(stop => {
        const latDiff = stop.lat - lat;
        const lonDiff = stop.lon - lon;
        const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);

        if (distance < minDistance) {
          minDistance = distance;
          nearestStop = { ...stop, routeId: route.id, routeName: route.name, routeNumber: route.number };
        }
      });
    });

    return nearestStop;
  }

  getBusesAtStop(stopId) {
    const busETAs = [];

    this.buses.forEach(bus => {
      if (bus.status !== 'In Service') return;

      const route = this.routes.find(r => r.id === bus.routeId);
      if (!route) return;

      const hasStop = route.stops.some(s => s.id === stopId);
      if (!hasStop) return;

      const eta = this.calculateETA(bus, stopId);
      if (eta !== null) {
        busETAs.push({
          busId: bus.id,
          routeNumber: route.number,
          routeName: route.name,
          eta: eta,
          color: route.color
        });
      }
    });

    return busETAs.sort((a, b) => a.eta - b.eta);
  }
}

module.exports = BusSimulator;
