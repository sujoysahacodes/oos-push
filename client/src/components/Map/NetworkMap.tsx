import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Warehouse as WarehouseIcon,
  Store as StoreIcon,
  MyLocation as LocationIcon,
  Visibility as ViewIcon,
  VisibilityOff as HideIcon,
  Route as RouteIcon,
  Info as InfoIcon
} from '@mui/icons-material';

interface Location {
  id: string;
  name: string;
  type: 'warehouse' | 'wholesaler';
  coordinates: { lat: number; lng: number };
  address: string;
  city: string;
  state: string;
  details: any;
}

interface NetworkConnection {
  from: string;
  to: string;
  distance: number;
  cost: number;
  type: 'primary' | 'secondary' | 'emergency';
}

const NetworkMap: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [connections, setConnections] = useState<NetworkConnection[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showConnections, setShowConnections] = useState(true);
  const [mapFilter, setMapFilter] = useState<'all' | 'warehouses' | 'wholesalers'>('all');
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 }); // Center of US

  useEffect(() => {
    loadNetworkData();
  }, []);

  const loadNetworkData = () => {
    // Mock network data - in real app, this would come from your configuration
    const mockLocations: Location[] = [
      {
        id: 'WH001',
        name: 'Chicago Distribution Center',
        type: 'warehouse',
        coordinates: { lat: 41.8781, lng: -87.6298 },
        address: '1234 Industrial Blvd',
        city: 'Chicago',
        state: 'IL',
        details: {
          capacity: 10000,
          currentUtilization: 7500,
          servingRadius: 150,
          operationalCosts: { storage: 2.50, handling: 15.00, utilities: 1200 }
        }
      },
      {
        id: 'WH002',
        name: 'Atlanta Regional Hub',
        type: 'warehouse',
        coordinates: { lat: 33.7490, lng: -84.3880 },
        address: '5678 Commerce St',
        city: 'Atlanta',
        state: 'GA',
        details: {
          capacity: 8000,
          currentUtilization: 5200,
          servingRadius: 175,
          operationalCosts: { storage: 2.25, handling: 14.00, utilities: 980 }
        }
      },
      {
        id: 'WH003',
        name: 'Dallas Logistics Center',
        type: 'warehouse',
        coordinates: { lat: 32.7767, lng: -96.7970 },
        address: '789 Freight Way',
        city: 'Dallas',
        state: 'TX',
        details: {
          capacity: 12000,
          currentUtilization: 8500,
          servingRadius: 200,
          operationalCosts: { storage: 2.10, handling: 13.50, utilities: 1100 }
        }
      },
      {
        id: 'WS001',
        name: 'Metro Beverage Distributors',
        type: 'wholesaler',
        coordinates: { lat: 43.0389, lng: -87.9065 },
        address: '123 Commerce Ave',
        city: 'Milwaukee',
        state: 'WI',
        details: {
          servingRadius: 50,
          averageOrderValue: 15000,
          deliverySchedule: ['Monday', 'Wednesday', 'Friday'],
          contact: { name: 'John Smith', phone: '(414) 555-0123' }
        }
      },
      {
        id: 'WS002',
        name: 'Southeast Beverage Co',
        type: 'wholesaler',
        coordinates: { lat: 33.5186, lng: -86.8104 },
        address: '456 Distribution Way',
        city: 'Birmingham',
        state: 'AL',
        details: {
          servingRadius: 75,
          averageOrderValue: 22000,
          deliverySchedule: ['Tuesday', 'Thursday', 'Saturday'],
          contact: { name: 'Sarah Johnson', phone: '(205) 555-0456' }
        }
      },
      {
        id: 'WS003',
        name: 'Lone Star Distributors',
        type: 'wholesaler',
        coordinates: { lat: 32.7555, lng: -97.3308 },
        address: '321 Market St',
        city: 'Fort Worth',
        state: 'TX',
        details: {
          servingRadius: 60,
          averageOrderValue: 18500,
          deliverySchedule: ['Monday', 'Thursday'],
          contact: { name: 'Mike Rodriguez', phone: '(817) 555-0789' }
        }
      },
      {
        id: 'WS004',
        name: 'Great Lakes Beverage',
        type: 'wholesaler',
        coordinates: { lat: 41.4993, lng: -81.6944 },
        address: '789 Lake Shore Dr',
        city: 'Cleveland',
        state: 'OH',
        details: {
          servingRadius: 45,
          averageOrderValue: 13500,
          deliverySchedule: ['Tuesday', 'Friday'],
          contact: { name: 'Lisa Chen', phone: '(216) 555-0234' }
        }
      }
    ];

    // Calculate connections based on proximity and serving radius
    const mockConnections: NetworkConnection[] = [
      { from: 'WH001', to: 'WS001', distance: 92, cost: 850, type: 'primary' },
      { from: 'WH001', to: 'WS004', distance: 345, cost: 1200, type: 'secondary' },
      { from: 'WH002', to: 'WS002', distance: 148, cost: 950, type: 'primary' },
      { from: 'WH003', to: 'WS003', distance: 32, cost: 450, type: 'primary' },
      { from: 'WH002', to: 'WS003', distance: 925, cost: 2100, type: 'emergency' },
      { from: 'WH001', to: 'WS003', distance: 925, cost: 2250, type: 'emergency' }
    ];

    setLocations(mockLocations);
    setConnections(mockConnections);
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 3959; // Radius of Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  const getFilteredLocations = () => {
    switch (mapFilter) {
      case 'warehouses':
        return locations.filter(loc => loc.type === 'warehouse');
      case 'wholesalers':
        return locations.filter(loc => loc.type === 'wholesaler');
      default:
        return locations;
    }
  };

  const getLocationIcon = (type: string) => {
    return type === 'warehouse' ? <WarehouseIcon /> : <StoreIcon />;
  };

  const getLocationColor = (type: string) => {
    return type === 'warehouse' ? '#1976d2' : '#dc004e';
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'primary': return '#4caf50';
      case 'secondary': return '#ff9800';
      case 'emergency': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  // Simple SVG-based map visualization
  const MapVisualization = () => {
    const filteredLocations = getFilteredLocations();
    const svgWidth = 800;
    const svgHeight = 500;
    
    // Convert lat/lng to SVG coordinates (simplified projection)
    const latRange = { min: 25, max: 50 };
    const lngRange = { min: -125, max: -65 };
    
    const convertToSVG = (lat: number, lng: number) => ({
      x: ((lng - lngRange.min) / (lngRange.max - lngRange.min)) * svgWidth,
      y: svgHeight - ((lat - latRange.min) / (latRange.max - latRange.min)) * svgHeight
    });

    return (
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
        <svg width={svgWidth} height={svgHeight} style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}>
          {/* Background */}
          <rect width={svgWidth} height={svgHeight} fill="#f5f5f5" />
          
          {/* State boundaries (simplified) */}
          <g stroke="#d0d0d0" strokeWidth="1" fill="none">
            <path d="M100,100 L700,100 L700,400 L100,400 Z" opacity="0.3" />
          </g>
          
          {/* Connections */}
          {showConnections && connections.map((conn, index) => {
            const fromLoc = locations.find(loc => loc.id === conn.from);
            const toLoc = locations.find(loc => loc.id === conn.to);
            if (!fromLoc || !toLoc) return null;
            
            const fromPos = convertToSVG(fromLoc.coordinates.lat, fromLoc.coordinates.lng);
            const toPos = convertToSVG(toLoc.coordinates.lat, toLoc.coordinates.lng);
            
            return (
              <g key={index}>
                <line
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={getConnectionColor(conn.type)}
                  strokeWidth={conn.type === 'primary' ? 3 : conn.type === 'secondary' ? 2 : 1}
                  strokeDasharray={conn.type === 'emergency' ? '5,5' : 'none'}
                  opacity={0.7}
                />
                {/* Distance label */}
                <text
                  x={(fromPos.x + toPos.x) / 2}
                  y={(fromPos.y + toPos.y) / 2}
                  fill="#666"
                  fontSize="10"
                  textAnchor="middle"
                  dy="3"
                >
                  {conn.distance}mi
                </text>
              </g>
            );
          })}
          
          {/* Location markers */}
          {filteredLocations.map((location) => {
            const pos = convertToSVG(location.coordinates.lat, location.coordinates.lng);
            const isSelected = selectedLocation?.id === location.id;
            
            return (
              <g key={location.id}>
                {/* Serving radius circle (for warehouses) */}
                {location.type === 'warehouse' && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={location.details.servingRadius / 5} // Scaled down for display
                    fill={getLocationColor(location.type)}
                    opacity="0.1"
                    stroke={getLocationColor(location.type)}
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                )}
                
                {/* Location marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 12 : 8}
                  fill={getLocationColor(location.type)}
                  stroke="white"
                  strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedLocation(location)}
                />
                
                {/* Location label */}
                <text
                  x={pos.x}
                  y={pos.y - 15}
                  fill="#333"
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedLocation(location)}
                >
                  {location.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Network Planning Map
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Interactive visualization of warehouse and wholesaler locations with delivery routes
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Show</InputLabel>
            <Select
              value={mapFilter}
              label="Show"
              onChange={(e) => setMapFilter(e.target.value as any)}
            >
              <MenuItem value="all">All Locations</MenuItem>
              <MenuItem value="warehouses">Warehouses Only</MenuItem>
              <MenuItem value="wholesalers">Wholesalers Only</MenuItem>
            </Select>
          </FormControl>
          
          <FormControlLabel
            control={
              <Switch
                checked={showConnections}
                onChange={(e) => setShowConnections(e.target.checked)}
              />
            }
            label="Show Routes"
          />
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, backgroundColor: '#1976d2', borderRadius: '50%' }} />
              <Typography variant="caption">Warehouses</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, backgroundColor: '#dc004e', borderRadius: '50%' }} />
              <Typography variant="caption">Wholesalers</Typography>
            </Box>
          </Box>
        </Box>

        <MapVisualization />
      </Paper>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Location Details */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Location Details
            </Typography>
            {selectedLocation ? (
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getLocationIcon(selectedLocation.type)}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6">{selectedLocation.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedLocation.address}, {selectedLocation.city}, {selectedLocation.state}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Chip
                    label={selectedLocation.type === 'warehouse' ? 'Warehouse' : 'Wholesaler'}
                    color={selectedLocation.type === 'warehouse' ? 'primary' : 'secondary'}
                    sx={{ mb: 2 }}
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    {selectedLocation.type === 'warehouse' ? (
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Capacity"
                            secondary={`${selectedLocation.details.capacity.toLocaleString()} pallets`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Current Utilization"
                            secondary={`${selectedLocation.details.currentUtilization.toLocaleString()} pallets (${Math.round((selectedLocation.details.currentUtilization / selectedLocation.details.capacity) * 100)}%)`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Serving Radius"
                            secondary={`${selectedLocation.details.servingRadius} miles`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Operating Costs"
                            secondary={`Storage: $${selectedLocation.details.operationalCosts.storage}/pallet/day, Handling: $${selectedLocation.details.operationalCosts.handling}/pallet`}
                          />
                        </ListItem>
                      </List>
                    ) : (
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Contact"
                            secondary={`${selectedLocation.details.contact.name} - ${selectedLocation.details.contact.phone}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Serving Radius"
                            secondary={`${selectedLocation.details.servingRadius} miles`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Average Order Value"
                            secondary={`$${selectedLocation.details.averageOrderValue.toLocaleString()}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Delivery Schedule"
                            secondary={selectedLocation.details.deliverySchedule.join(', ')}
                          />
                        </ListItem>
                      </List>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                <LocationIcon sx={{ fontSize: 48, mb: 2 }} />
                <Typography>Select a location on the map to view details</Typography>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Network Statistics */}
        <Box sx={{ width: 300 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Network Statistics
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <WarehouseIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Warehouses"
                  secondary={`${locations.filter(l => l.type === 'warehouse').length} facilities`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Wholesalers"
                  secondary={`${locations.filter(l => l.type === 'wholesaler').length} partners`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RouteIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Active Routes"
                  secondary={`${connections.length} connections`}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Route Legend
            </Typography>
            <List dense>
              <ListItem>
                <Box sx={{ width: 20, height: 3, backgroundColor: '#4caf50', mr: 2 }} />
                <ListItemText primary="Primary Routes" secondary="Regular delivery routes" />
              </ListItem>
              <ListItem>
                <Box sx={{ width: 20, height: 2, backgroundColor: '#ff9800', mr: 2 }} />
                <ListItemText primary="Secondary Routes" secondary="Alternative routes" />
              </ListItem>
              <ListItem>
                <Box sx={{ 
                  width: 20, 
                  height: 1, 
                  backgroundColor: '#f44336', 
                  mr: 2,
                  borderTop: '1px dashed #f44336',
                  borderBottom: '1px dashed #f44336'
                }} />
                <ListItemText primary="Emergency Routes" secondary="Crisis response only" />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default NetworkMap;
