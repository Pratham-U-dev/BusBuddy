import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [busesResponse, routesResponse] = await Promise.all([
        axios.get(`${API_URL}/buses`),
        axios.get(`${API_URL}/routes`)
      ]);

      setBuses(busesResponse.data.data || []);
      setRoutes(routesResponse.data.data || []);
      setLastUpdate(new Date());
      setError(null);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data from server');
      setLoading(false);
    }
  };

  const getRouteById = (routeId) => {
    return routes.find(r => r.id === routeId);
  };

  const activeBuses = buses.filter(b => b.status === 'In Service');
  const inactiveBuses = buses.filter(b => b.status !== 'In Service');

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-app">
      <header className="admin-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="admin-icon">🚌</div>
            <div>
              <h1>BusBeacon Admin</h1>
              <p>Transport Authority Dashboard</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-value">{activeBuses.length}</span>
              <span className="stat-label">Active Buses</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{routes.length}</span>
              <span className="stat-label">Routes</span>
            </div>
          </div>
        </div>
      </header>

      <main className="admin-content">
        <div className="dashboard-header">
          <h2>Fleet Overview</h2>
          <div className="update-info">
            <span className="status-dot"></span>
            Last updated: {lastUpdate.toLocaleTimeString()}
