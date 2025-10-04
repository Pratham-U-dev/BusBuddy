import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBuses, getNearbyStop } from '../services/api';
import Map from './Map';

const Home = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [nearestStop, setNearestStop] = useState(null);
  const [nextBus, setNextBus] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated user location (KIOCL Quarters area)
  const defaultLocation = { lat: 40.7580, lon: -73.9855 };

  useEffect(() => {
    // Set simulated user location
    setUserLocation(defaultLocation);
    fetchData();

    // Auto-refresh data every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const busesData = await getBuses();
      setBuses(busesData.data || []);

      // Fetch nearest stop
      const nearbyData = await getNearbyStop(defaultLocation.lat, defaultLocation.lon);
      if (nearbyData.success) {
        setNearestStop(nearbyData.data.stop);
        if (nearbyData.data.buses && nearbyData.data.buses.length > 0) {
          setNextBus(nearbyData.data.buses[0]);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = buses.filter(bus =>
      bus.routeNumber.toLowerCase().includes(query.toLowerCase()) ||
      bus.routeName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleBusClick = (bus) => {
    navigate(`/track/${bus.id}`);
  };

  const useCurrentLocation = () => {
    alert('Using your current location...');
    // In a real app, you would use geolocation API here
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo-container">
          <div className="bus-icon">🚌</div>
        </div>
        <div className="location-selector">
          <span>Bengaluru</span>
          <span className="dropdown-arrow">▼</span>
        </div>
      </header>

      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Find and track your bus"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map(bus => (
              <div 
                key={bus.id} 
                className="search-result-item"
                onClick={() => handleBusClick(bus)}
              >
                <div className="bus-number" style={{ backgroundColor: bus.color }}>
                  {bus.routeNumber}
                </div>
                <div className="bus-info">
                  <strong>{bus.routeName}</strong>
                  <span className="status">{bus.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="location-btn" onClick={useCurrentLocation}>
          📍 Use current location
        </button>
      </div>

      {nearestStop && (
        <div className="nearest-stop-card">
          <h3>Nearest Stop: {nearestStop.name}</h3>
          {nextBus ? (
            <div className="next-bus-info">
              <p className="eta">Next bus in <strong>{nextBus.eta} mins</strong></p>
              <div className="bus-badge" style={{ backgroundColor: nextBus.color }}>
                Bus {nextBus.routeNumber} - {nextBus.routeName}
              </div>
            </div>
          ) : (
            <p className="no-buses">No buses currently approaching</p>
          )}
          <button className="secondary-btn" onClick={() => navigate('/stops')}>
            See all stops
          </button>
        </div>
      )}

      <div className="map-section">
        <h4>Buses Around You</h4>
        <Map
          buses={buses.filter(b => b.status === 'In Service')}
          userLocation={userLocation ? [userLocation.lat, userLocation.lon] : null}
          onBusClick={handleBusClick}
          height="300px"
        />
      </div>

      <div className="quick-info">
        <div className="info-card">
          <div className="info-icon">🚍</div>
          <div className="info-text">
            <strong>{buses.filter(b => b.status === 'In Service').length}</strong>
            <span>Buses Active</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon">📍</div>
          <div className="info-text">
            <strong>50+</strong>
            <span>Bus Stops</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
