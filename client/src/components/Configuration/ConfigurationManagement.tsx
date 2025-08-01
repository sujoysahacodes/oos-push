import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warehouse as WarehouseIcon,
  Store as StoreIcon,
  Inventory as ProductIcon,
  Map as MapIcon
} from '@mui/icons-material';
import NetworkMap from '../Map/NetworkMap';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`config-tabpanel-${index}`}
      aria-labelledby={`config-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface Warehouse {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
  };
  capacity: number;
  currentUtilization: number;
  operationalCosts: {
    storage: number; // per pallet per day
    handling: number; // per pallet
    utilities: number; // daily
  };
  servingRadius: number; // miles
  operatingHours: {
    start: string;
    end: string;
  };
}

interface Wholesaler {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
  };
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  servingRadius: number;
  deliverySchedule: string[];
  averageOrderValue: number;
  preferredDeliveryWindow: {
    start: string;
    end: string;
  };
}

interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  specifications: {
    weight: number; // lbs
    dimensions: { length: number; width: number; height: number };
    unitsPerCase: number;
    casesPerPallet: number;
  };
  costs: {
    unitCost: number;
    shippingCostPerMile: number;
    holdingCostPerDay: number;
  };
  demandPattern: {
    seasonal: boolean;
    peakMonths: string[];
    averageDailyDemand: number;
  };
}

const ConfigurationManagement: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [wholesalers, setWholesalers] = useState<Wholesaler[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Dialog states
  const [warehouseDialog, setWarehouseDialog] = useState(false);
  const [wholesalerDialog, setWholesalerDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock warehouses
    setWarehouses([
      {
        id: 'WH001',
        name: 'Chicago Distribution Center',
        location: {
          address: '1234 Industrial Blvd',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60607',
          coordinates: { lat: 41.8781, lng: -87.6298 }
        },
        capacity: 10000,
        currentUtilization: 7500,
        operationalCosts: {
          storage: 2.50,
          handling: 15.00,
          utilities: 1200
        },
        servingRadius: 150,
        operatingHours: { start: '06:00', end: '22:00' }
      },
      {
        id: 'WH002',
        name: 'Atlanta Regional Hub',
        location: {
          address: '5678 Commerce St',
          city: 'Atlanta',
          state: 'GA',
          zipCode: '30309',
          coordinates: { lat: 33.7490, lng: -84.3880 }
        },
        capacity: 8000,
        currentUtilization: 5200,
        operationalCosts: {
          storage: 2.25,
          handling: 14.00,
          utilities: 980
        },
        servingRadius: 175,
        operatingHours: { start: '05:30', end: '21:30' }
      }
    ]);

    // Mock wholesalers
    setWholesalers([
      {
        id: 'WS001',
        name: 'Metro Beverage Distributors',
        location: {
          address: '123 Commerce Ave',
          city: 'Milwaukee',
          state: 'WI',
          zipCode: '53202',
          coordinates: { lat: 43.0389, lng: -87.9065 }
        },
        contact: {
          name: 'John Smith',
          phone: '(414) 555-0123',
          email: 'john.smith@metrobev.com'
        },
        servingRadius: 50,
        deliverySchedule: ['Monday', 'Wednesday', 'Friday'],
        averageOrderValue: 15000,
        preferredDeliveryWindow: { start: '08:00', end: '16:00' }
      },
      {
        id: 'WS002',
        name: 'Southeast Beverage Co',
        location: {
          address: '456 Distribution Way',
          city: 'Birmingham',
          state: 'AL',
          zipCode: '35203',
          coordinates: { lat: 33.5186, lng: -86.8104 }
        },
        contact: {
          name: 'Sarah Johnson',
          phone: '(205) 555-0456',
          email: 'sarah.j@sebev.com'
        },
        servingRadius: 75,
        deliverySchedule: ['Tuesday', 'Thursday', 'Saturday'],
        averageOrderValue: 22000,
        preferredDeliveryWindow: { start: '07:00', end: '15:00' }
      }
    ]);

    // Mock products
    setProducts([
      {
        id: 'P001',
        sku: 'BUD-12OZ-24',
        name: 'Budweiser 12oz Bottles - 24 Pack',
        brand: 'Budweiser',
        category: 'Beer',
        specifications: {
          weight: 18.5,
          dimensions: { length: 16, width: 12, height: 9 },
          unitsPerCase: 24,
          casesPerPallet: 72
        },
        costs: {
          unitCost: 15.99,
          shippingCostPerMile: 0.15,
          holdingCostPerDay: 0.08
        },
        demandPattern: {
          seasonal: true,
          peakMonths: ['May', 'June', 'July', 'August'],
          averageDailyDemand: 150
        }
      },
      {
        id: 'P002',
        sku: 'STELLA-12OZ-12',
        name: 'Stella Artois 12oz Bottles - 12 Pack',
        brand: 'Stella Artois',
        category: 'Beer',
        specifications: {
          weight: 9.2,
          dimensions: { length: 12, width: 8, height: 9 },
          unitsPerCase: 12,
          casesPerPallet: 96
        },
        costs: {
          unitCost: 13.49,
          shippingCostPerMile: 0.12,
          holdingCostPerDay: 0.09
        },
        demandPattern: {
          seasonal: false,
          peakMonths: [],
          averageDailyDemand: 85
        }
      }
    ]);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddNew = (type: 'warehouse' | 'wholesaler' | 'product') => {
    setEditingItem(null);
    switch (type) {
      case 'warehouse':
        setWarehouseDialog(true);
        break;
      case 'wholesaler':
        setWholesalerDialog(true);
        break;
      case 'product':
        setProductDialog(true);
        break;
    }
  };

  const renderWarehouseTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Utilization</TableCell>
            <TableCell>Serving Radius</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {warehouses.map((warehouse) => (
            <TableRow key={warehouse.id}>
              <TableCell>{warehouse.name}</TableCell>
              <TableCell>{`${warehouse.location.city}, ${warehouse.location.state}`}</TableCell>
              <TableCell>{warehouse.capacity.toLocaleString()} pallets</TableCell>
              <TableCell>
                <Chip 
                  label={`${Math.round((warehouse.currentUtilization / warehouse.capacity) * 100)}%`}
                  color={(warehouse.currentUtilization / warehouse.capacity) > 0.8 ? 'error' : 'success'}
                />
              </TableCell>
              <TableCell>{warehouse.servingRadius} miles</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => handleEdit(warehouse, 'warehouse')}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(warehouse.id, 'warehouse')}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderWholesalerTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Serving Radius</TableCell>
            <TableCell>Avg Order Value</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wholesalers.map((wholesaler) => (
            <TableRow key={wholesaler.id}>
              <TableCell>{wholesaler.name}</TableCell>
              <TableCell>{`${wholesaler.location.city}, ${wholesaler.location.state}`}</TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2">{wholesaler.contact.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {wholesaler.contact.phone}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{wholesaler.servingRadius} miles</TableCell>
              <TableCell>${wholesaler.averageOrderValue.toLocaleString()}</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => handleEdit(wholesaler, 'wholesaler')}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(wholesaler.id, 'wholesaler')}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderProductTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Unit Cost</TableCell>
            <TableCell>Daily Demand</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.costs.unitCost}</TableCell>
              <TableCell>{product.demandPattern.averageDailyDemand} units</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => handleEdit(product, 'product')}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(product.id, 'product')}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const handleEdit = (item: any, type: string) => {
    setEditingItem(item);
    switch (type) {
      case 'warehouse':
        setWarehouseDialog(true);
        break;
      case 'wholesaler':
        setWholesalerDialog(true);
        break;
      case 'product':
        setProductDialog(true);
        break;
    }
  };

  const handleDelete = (id: string, type: string) => {
    // Implementation for delete functionality
    console.log(`Delete ${type} with id: ${id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Configuration Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Configure warehouses, wholesalers, and products for network optimization
      </Typography>

      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Warehouses" icon={<WarehouseIcon />} />
          <Tab label="Wholesalers" icon={<StoreIcon />} />
          <Tab label="Products" icon={<ProductIcon />} />
          <Tab label="Network Map" icon={<MapIcon />} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Warehouse Configuration</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleAddNew('warehouse')}
            >
              Add Warehouse
            </Button>
          </Box>
          {renderWarehouseTable()}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Wholesaler Configuration</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleAddNew('wholesaler')}
            >
              Add Wholesaler
            </Button>
          </Box>
          {renderWholesalerTable()}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Product Configuration</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleAddNew('product')}
            >
              Add Product
            </Button>
          </Box>
          {renderProductTable()}
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <NetworkMap />
        </TabPanel>
      </Paper>

      {/* Dialogs would go here - simplified for brevity */}
    </Box>
  );
};

export default ConfigurationManagement;
