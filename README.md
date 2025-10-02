# BusBuddy
A full-stack web application for tracking public buses in real-time, designed for small cities.

# BusBeacon - Real-Time Public Transport Tracking System

A full-stack web application for tracking public buses in real-time, designed for small cities.

## Project Structure

```
busbeacon/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── api.js
│   ├── data/
│   │   └── mockData.js
│   ├── services/
│   │   └── busSimulator.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── LiveTracking.js
│   │   │   ├── Stops.js
│   │   │   ├── Settings.js
│   │   │   ├── Navigation.js
│   │   │   └── Map.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   └── services/
│   │       └── api.js
│   └── package.json
├── admin/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   │       └── App.css
│   └── package.json
└── README.md
```

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, Leaflet (maps), Axios
- **Admin Panel**: React.js
- **Data**: Simulated mock data (no database required for demo)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Admin Panel Setup

1. Navigate to the admin directory:
```bash
cd admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the admin panel:
```bash
npm start
```

The admin panel will run on `http://localhost:3001`

## Features

### User App
- Real-time bus tracking on interactive map
- Nearest stop detection with live ETAs
- Bus route visualization
- Search functionality for buses and routes
- Responsive design for mobile and desktop

### Admin Panel
- View all buses and their status
- Monitor bus locations in real-time
- Track which buses are in service

## API Endpoints

- `GET /api/routes` - Get all bus routes
- `GET /api/buses` - Get all buses with current locations
- `GET /api/buses/:id` - Get specific bus details
- `GET /api/stops/nearby?lat=...&lon=...` - Get nearest stop and ETAs

## Mock Data

The application simulates a fictional city called "Maple Creek" with:
- 4 bus routes (Downtown Express, University Loop, Mall Shuttle, Hospital Line)
- 6 buses in operation
- 50+ bus stops across the city
- Real-time position updates every 5 seconds

## Video Demo Tips

1. Start all three applications (backend, frontend, admin)
2. Open the frontend in your browser
3. The map will show buses moving in real-time
4. Click on a bus to see detailed tracking
5. Use the search bar to find specific routes
6. Open the admin panel in a separate window to show the authority view

## Notes

- The simulation runs automatically when the backend starts
- Bus positions update every 5 seconds
- ETAs are calculated based on distance and average speed
- All data is stored in memory (resets on server restart)
- No actual GPS data or database required

## License

This is a demonstration prototype for educational purposes.
