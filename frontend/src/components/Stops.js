import React, { useState, useEffect } from 'react';
import { getAllStops } from '../services/api';

const Stops = () => {
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStops();
  }, []);

  const fetchStops = async () => {
    try {
      const response = await getAllStops();
      if (response.success) {
        setStops(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stops:', error);
      setLoading(false);
    }
  };

  const filteredStops = stops.filter(stop =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p>Loading stops...</p>
      </div>
    );
  }

  return (
    <div className="stops-container">
      <header className="page-header">
        <h2>All Bus Stops</h2>
        <p>Find stops across Maple Creek</p>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a stop..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="stops-list">
        {filteredStops.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            No stops found matching your search
          </p>
        ) : (
          filteredStops.map(stop => (
            <div key={stop.id} className="stop-card">
              <div className="stop-icon">📍</div>
              <div className="stop-info">
                <h3>{stop.name}</h3>
                <div className="routes-served">
                  {stop.routes && stop.routes.map((route, index) => (
                    <span 
                      key={index} 
                      className="route-badge"
                      style={{ backgroundColor: route.color }}
                    >
                      {route.number}
                    </span>
                  ))}
                </div>
                <p className="stop-location">
                  {stop.lat.toFixed(4)}, {stop.lon.toFixed(4)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="stops-summary">
        <p>Showing {filteredStops.length} of {stops.length} stops</p>
      </div>
    </div>
  );
};

export default Stops;
