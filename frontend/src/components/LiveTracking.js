import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBusById } from '../services/api';
import Map from './Map';

const LiveTracking = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [busData, setBusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBusData();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchBusData, 5000);
    return () => clearInterval(interval);
  }, [busId]);

  const fetchBusData = async () => {
    try {
      const response = await getBusById(busId);
      if (response.success) {
        setBusData(response.data);
        setError(null);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load bus data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p>Loading bus information...</p>
      </div>
    );
  }

  if (error || !busData) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#f44336' }}>{error || 'Bus not found'}</p>
        <button className="primary-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  const nextStop = busData.upcomingStops?.find(stop => stop.eta > 0);
  const nearestETA = nextStop ? nextStop.eta : 'Arrived';

  return (
    <div className="tracking-container">
      <div className="tracking-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h2>Live Tracking</h2>
      </div>

      <div className="tracking-map">
        <Map
          buses={[]}
          selectedBus={busData}
          route={busData.route}
          height="calc(100vh - 280px)"
          center={[busData.currentLocation.lat, busData.currentLocation.lon]}
        />
      </div>

      <div className="bus-info-card">
        <div className="bus-header">
          <div className="bus-title">
            <span 
              className="bus-number-badge" 
              style={{ backgroundColor: busData.route.color }}
            >
              {busData.route.number}
            </span>
            <div>
              <h3>{busData.route.name}</h3>
              <p className="current-stop">
                {nextStop ? `Next: ${nextStop.name}` : 'At terminal'}
              </p>
            </div>
          </div>
          <div className={`status-badge ${busData.status === 'In Service' ? 'active' : 'inactive'}`}>
            {busData.status}
          </div>
        </div>

        <div className="eta-display">
          <div className="eta-label">ETA to Next Stop</div>
          <div className="eta-time">
            {typeof nearestETA === 'number' ? `${nearestETA} minutes` : nearestETA}
          </div>
        </div>

        <div className="upcoming-stops">
          <h4>Upcoming Stops</h4>
          <div className="stops-list">
            {busData.upcomingStops?.slice(0, 5).map((stop, index) => (
              <div key={stop.id} className="stop-item">
                <div className="stop-number">{index + 1}</div>
                <div className="stop-details">
                  <strong>{stop.name}</strong>
                  <span className="stop-eta">
                    {stop.eta > 0 ? `${stop.eta} min` : 'Arrived'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="route-info">
          <div className="info-item">
            <span className="label">Route:</span>
            <span className="value">{busData.route.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Total Stops:</span>
            <span className="value">{busData.route.stops.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
