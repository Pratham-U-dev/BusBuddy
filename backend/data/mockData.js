// Mock data for Maple Creek city bus system

const routes = [
  {
    id: 'route_101',
    number: '101',
    name: 'Downtown Express',
    color: '#4CAF50',
    stops: [
      { id: 'stop_1', name: 'Central Square', lat: 40.7580, lon: -73.9855 },
      { id: 'stop_2', name: 'City Library', lat: 40.7590, lon: -73.9845 },
      { id: 'stop_3', name: 'Maple Park', lat: 40.7600, lon: -73.9835 },
      { id: 'stop_4', name: 'Shopping Plaza', lat: 40.7610, lon: -73.9825 },
      { id: 'stop_5', name: 'Tech District', lat: 40.7620, lon: -73.9815 },
      { id: 'stop_6', name: 'Convention Center', lat: 40.7630, lon: -73.9805 },
      { id: 'stop_7', name: 'Financial Plaza', lat: 40.7640, lon: -73.9795 },
      { id: 'stop_8', name: 'Riverside Walk', lat: 40.7650, lon: -73.9785 },
      { id: 'stop_9', name: 'City Hall', lat: 40.7660, lon: -73.9775 },
      { id: 'stop_10', name: 'Museum District', lat: 40.7670, lon: -73.9765 },
      { id: 'stop_11', name: 'Arts Center', lat: 40.7680, lon: -73.9755 },
      { id: 'stop_12', name: 'Central Square', lat: 40.7580, lon: -73.9855 }
    ]
  },
  {
    id: 'route_102',
    number: '102',
    name: 'University Loop',
    color: '#2196F3',
    stops: [
      { id: 'stop_13', name: 'University Gate', lat: 40.7500, lon: -73.9900 },
      { id: 'stop_14', name: 'Student Union', lat: 40.7510, lon: -73.9910 },
      { id: 'stop_15', name: 'Science Building', lat: 40.7520, lon: -73.9920 },
      { id: 'stop_16', name: 'Sports Complex', lat: 40.7530, lon: -73.9930 },
      { id: 'stop_17', name: 'Medical Campus', lat: 40.7540, lon: -73.9940 },
      { id: 'stop_18', name: 'Engineering Quad', lat: 40.7550, lon: -73.9950 },
      { id: 'stop_19', name: 'Library Square', lat: 40.7560, lon: -73.9960 },
      { id: 'stop_20', name: 'Dormitory Circle', lat: 40.7570, lon: -73.9970 },
      { id: 'stop_21', name: 'Campus Market', lat: 40.7560, lon: -73.9980 },
      { id: 'stop_22', name: 'University Gate', lat: 40.7500, lon: -73.9900 }
    ]
  },
  {
    id: 'route_7B',
    number: '7B',
    name: 'Mall Shuttle',
    color: '#FF9800',
    stops: [
      { id: 'stop_23', name: 'Westfield Mall', lat: 40.7400, lon: -74.0000 },
      { id: 'stop_24', name: 'Retail Park', lat: 40.7410, lon: -74.0010 },
      { id: 'stop_25', name: 'Food Court Plaza', lat: 40.7420, lon: -74.0020 },
      { id: 'stop_26', name: 'Cinema Complex', lat: 40.7430, lon: -74.0030 },
      { id: 'stop_27', name: 'Home Depot Stop', lat: 40.7440, lon: -74.0040 },
      { id: 'stop_28', name: 'IKEA Junction', lat: 40.7450, lon: -74.0050 },
      { id: 'stop_29', name: 'Electronics Store', lat: 40.7460, lon: -74.0060 },
      { id: 'stop_30', name: 'Fashion District', lat: 40.7470, lon: -74.0070 },
      { id: 'stop_31', name: 'Grocery Hub', lat: 40.7480, lon: -74.0080 },
      { id: 'stop_32', name: 'Westfield Mall', lat: 40.7400, lon: -74.0000 }
    ]
  },
  {
    id: 'route_45',
    number: '45',
    name: 'Hospital Line',
    color: '#E91E63',
    stops: [
      { id: 'stop_33', name: 'General Hospital', lat: 40.7700, lon: -73.9700 },
      { id: 'stop_34', name: "Children's Medical", lat: 40.7710, lon: -73.9710 },
      { id: 'stop_35', name: 'Health Center', lat: 40.7720, lon: -73.9720 },
      { id: 'stop_36', name: 'Urgent Care', lat: 40.7730, lon: -73.9730 },
      { id: 'stop_37', name: 'Pharmacy Plaza', lat: 40.7740, lon: -73.9740 },
      { id: 'stop_38', name: 'Medical Labs', lat: 40.7750, lon: -73.9750 },
      { id: 'stop_39', name: 'Wellness Center', lat: 40.7760, lon: -73.9760 },
      { id: 'stop_40', name: 'Dental Clinic', lat: 40.7770, lon: -73.9770 },
      { id: 'stop_41', name: 'Eye Care Center', lat: 40.7780, lon: -73.9780 },
      { id: 'stop_42', name: 'Rehabilitation Hub', lat: 40.7790, lon: -73.9790 },
      { id: 'stop_43', name: 'Senior Care', lat: 40.7800, lon: -73.9800 },
      { id: 'stop_44', name: 'General Hospital', lat: 40.7700, lon: -73.9700 }
    ]
  }
];

const buses = [
  {
    id: 'bus_001',
    routeId: 'route_101',
    status: 'In Service',
    currentStopIndex: 0,
    currentLat: 40.7580,
    currentLon: -73.9855,
    speed: 0.0002 // degrees per update cycle
  },
  {
    id: 'bus_002',
    routeId: 'route_101',
    status: 'In Service',
    currentStopIndex: 6,
    currentLat: 40.7640,
    currentLon: -73.9795,
    speed: 0.0002
  },
  {
    id: 'bus_003',
    routeId: 'route_102',
    status: 'In Service',
    currentStopIndex: 0,
    currentLat: 40.7500,
    currentLon: -73.9900,
    speed: 0.00025
  },
  {
    id: 'bus_004',
    routeId: 'route_102',
    status: 'In Service',
    currentStopIndex: 5,
    currentLat: 40.7550,
    currentLon: -73.9950,
    speed: 0.00025
  },
  {
    id: 'bus_005',
    routeId: 'route_7B',
    status: 'In Service',
    currentStopIndex: 0,
    currentLat: 40.7400,
    currentLon: -74.0000,
    speed: 0.0003
  },
  {
    id: 'bus_006',
    routeId: 'route_45',
    status: 'Not In Service',
    currentStopIndex: 0,
    currentLat: 40.7700,
    currentLon: -73.9700,
    speed: 0
  }
];

module.exports = { routes, buses };
