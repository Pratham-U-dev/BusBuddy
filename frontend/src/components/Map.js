import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjNENBRjUwIj48cGF0aCBkPSJNNCw2QzIuODksNiAyLDYuODkgMiw4VjE1SDR2NEg2VjE3SDkuMDdMMTAsOEM4LjksOCA4LjAzLDcuMSA4LDZINFpNMTguOTMsNkMxOC45Nyw3LjEgMTguMSw4IDE3LDhMMTgsMTdIMjF2Mkg5di00SDJ2LTVjMC0xLjExIDAuODktMiAyLTJIMjBjMS4xLDAgMiwwLjg5IDIsMnY1aDAuMDFWOGMwLTEuMS0wLjktMi0yLjAxLTJIMThaTTYsOS41QTEuNSwxLjUgMCAwLDEgNy41LDExQTEuNSwxLjUgMCAwLDEgNiwxMi41QTEuNSwxLjUgMCAwLDEgNC41LDExQTEuNSwxLjUgMCAwLDEgNiw5LjVaTTE4LDkuNUExLjUsMS41IDAgMCwxIDE5LjUsMTFBMS41LDEuNSAwIDAsMSAxOCwxMi41QTEuNSwxLjUgMCAwLDEgMTYuNSwxMUExLjUsMS41IDAgMCwxIDE4LDkuNVoiLz48L3N2Zz4=',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// User location icon
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMjE5NkYzIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4IiBmaWxsPSIjMjE5NkYzIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPjwvc3ZnPg==',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Stop icon
const stopIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjRkY1NzIyIj48cGF0aCBkPSJNMTIsMkE3LDcgMCAwLDAgNSw5QzUsMTQuMjUgMTIsMjIgMTIsMjJDMTIsMjIgMTksMTQuMjUgMTksOUExOSw3IDcgMCAwLDAgMTIsMk0xMiwxMS41QTIuNSwyLjUgMCAwLDEgOS41LDlBMi41LDIuNSAwIDAsMSAxMiw2LjVBMi41LDIuNSAwIDAsMSAxNC41LDlBMi41LDIuNSAwIDAsMSAxMiwxMS41WiIvPjwvc3ZnPg==',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28]
});

// Component to handle map centering
function MapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

const Map = ({ 
  buses = [], 
  userLocation = null, 
  selectedBus = null, 
  route = null,
  onBusClick = () => {},
  height = '400px',
  center = null
}) => {
  const defaultCenter = center || userLocation || [40.7580, -73.9855];
  const defaultZoom = selectedBus ? 14 : 13;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height, width: '100%', borderRadius: '12px' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {center && <MapCenter center={center} />}
      
      {/* User location marker */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      )}
      
      {/* Route polyline */}
      {route && route.stops && (
        <>
          <Polyline
            positions={route.stops.map(stop => [stop.lat, stop.lon])}
            color={route.color || '#4CAF50'}
            weight={4}
            opacity={0.7}
          />
          
          {/* Stop markers */}
          {route.stops.map((stop, index) => (
            <Marker key={stop.id} position={[stop.lat, stop.lon]} icon={stopIcon}>
              <Popup>
                <strong>{stop.name}</strong>
                {stop.eta !== undefined && <div>ETA: {stop.eta} min</div>}
              </Popup>
            </Marker>
          ))}
        </>
      )}
      
      {/* Bus markers */}
      {buses.map(bus => (
        <Marker
          key={bus.id}
          position={[bus.currentLocation.lat, bus.currentLocation.lon]}
          icon={busIcon}
          eventHandlers={{
            click: () => onBusClick(bus)
          }}
        >
          <Popup>
            <strong>Bus {bus.routeNumber}</strong><br />
            {bus.routeName}<br />
            Status: {bus.status}
          </Popup>
        </Marker>
      ))}
      
      {/* Selected bus marker with different styling */}
      {selectedBus && (
        <Marker
          position={[selectedBus.currentLocation.lat, selectedBus.currentLocation.lon]}
          icon={new L.Icon({
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjRkY1NzIyIj48cGF0aCBkPSJNNCw2QzIuODksNiAyLDYuODkgMiw4VjE1SDR2NEg2VjE3SDkuMDdMMTAsOEM4LjksOCA4LjAzLDcuMSA4LDZINFpNMTguOTMsNkMxOC45Nyw3LjEgMTguMSw4IDE3LDhMMTgsMTdIMjF2Mkg5di00SDJ2LTVjMC0xLjExIDAuODktMiAyLTJIMjBjMS4xLDAgMiwwLjg5IDIsMnY1aDAuMDFWOGMwLTEuMS0wLjktMi0yLjAxLTJIMThaTTYsOS41QTEuNSwxLjUgMCAwLDEgNy41LDExQTEuNSwxLjUgMCAwLDEgNiwxMi41QTEuNSwxLjUgMCAwLDEgNC41LDExQTEuNSwxLjUgMCAwLDEgNiw5LjVaTTE4LDkuNUExLjUsMS41IDAgMCwxIDE5LjUsMTFBMS41LDEuNSAwIDAsMSAxOCwxMi41QTEuNSwxLjUgMCAwLDEgMTYuNSwxMUExLjUsMS41IDAgMCwxIDE4LDkuNVoiLz48L3N2Zz4=',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
          })}
        >
          <Popup>
            <strong>Bus {selectedBus.route?.number}</strong><br />
            {selectedBus.route?.name}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
