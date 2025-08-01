import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Alert,
  LinearProgress,
  Badge
} from '@mui/material';
import {
  Store as StoreIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  LocalShipping as DeliveryIcon,
  TrendingUp as TrendIcon,
  AttachMoney as MoneyIcon,
  Warning as WarningIcon,
  CheckCircle as SuccessIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Schedule as ScheduleIcon,
  Inventory as InventoryIcon,
  Person as PersonIcon
} from '@mui/icons-material';

interface Wholesaler {
  id: string;
  name: string;
  code: string;
  status: 'Active' | 'Inactive' | 'Warning' | 'Critical';
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
  };
  contact: {
    primaryContact: string;
    phone: string;
    email: string;
    backupContact?: string;
    backupPhone?: string;
  };
  businessMetrics: {
    averageOrderValue: number;
    monthlyVolume: number;
    servingRadius: number;
    customerCount: number;
    salesRep: string;
  };
  operationalInfo: {
    deliverySchedule: string[];
    preferredDeliveryWindow: { start: string; end: string };
    warehouseCapacity: number;
    currentStock: number;
    lastDelivery: Date;
    nextScheduledDelivery: Date;
  };
  performance: {
    onTimeDeliveryRate: number;
    orderAccuracy: number;
    customerSatisfaction: number;
    stockoutFrequency: number;
  };
  recentActivity: ActivityLog[];
}

interface ActivityLog {
  id: string;
  timestamp: Date;
  type: 'Order' | 'Delivery' | 'Stockout' | 'Complaint' | 'Payment' | 'Contact';
  description: string;
  status: 'Success' | 'Warning' | 'Error' | 'Info';
  amount?: number;
}

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
      id={`wholesaler-tabpanel-${index}`}
      aria-labelledby={`wholesaler-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Wholesalers: React.FC = () => {
  const [wholesalers, setWholesalers] = useState<Wholesaler[]>([]);
  const [selectedWholesaler, setSelectedWholesaler] = useState<Wholesaler | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadWholesalersData();
  }, []);

  const loadWholesalersData = () => {
    // Mock comprehensive wholesaler data
    const mockWholesalers: Wholesaler[] = [
      {
        id: 'WS001',
        name: 'Metro Beverage Distributors',
        code: 'MBD-001',
        status: 'Active',
        location: {
          address: '123 Commerce Ave',
          city: 'Milwaukee',
          state: 'WI',
          zipCode: '53202',
          coordinates: { lat: 43.0389, lng: -87.9065 }
        },
        contact: {
          primaryContact: 'John Smith',
          phone: '(414) 555-0123',
          email: 'john.smith@metrobev.com',
          backupContact: 'Mary Johnson',
          backupPhone: '(414) 555-0124'
        },
        businessMetrics: {
          averageOrderValue: 15000,
          monthlyVolume: 180000,
          servingRadius: 50,
          customerCount: 125,
          salesRep: 'Sarah Wilson'
        },
        operationalInfo: {
          deliverySchedule: ['Monday', 'Wednesday', 'Friday'],
          preferredDeliveryWindow: { start: '08:00', end: '16:00' },
          warehouseCapacity: 5000,
          currentStock: 3200,
          lastDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          nextScheduledDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        },
        performance: {
          onTimeDeliveryRate: 96.5,
          orderAccuracy: 98.2,
          customerSatisfaction: 4.7,
          stockoutFrequency: 2.1
        },
        recentActivity: [
          {
            id: 'ACT001',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
            type: 'Order',
            description: 'Placed order for Budweiser 12oz - 144 cases',
            status: 'Success',
            amount: 14400
          },
          {
            id: 'ACT002',
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
            type: 'Delivery',
            description: 'Received delivery - Route #R-1247',
            status: 'Success'
          }
        ]
      },
      {
        id: 'WS002',
        name: 'Southeast Beverage Co',
        code: 'SBC-002',
        status: 'Warning',
        location: {
          address: '456 Distribution Way',
          city: 'Birmingham',
          state: 'AL',
          zipCode: '35203',
          coordinates: { lat: 33.5186, lng: -86.8104 }
        },
        contact: {
          primaryContact: 'Sarah Johnson',
          phone: '(205) 555-0456',
          email: 'sarah.j@sebev.com'
        },
        businessMetrics: {
          averageOrderValue: 22000,
          monthlyVolume: 264000,
          servingRadius: 75,
          customerCount: 185,
          salesRep: 'Mike Rodriguez'
        },
        operationalInfo: {
          deliverySchedule: ['Tuesday', 'Thursday', 'Saturday'],
          preferredDeliveryWindow: { start: '07:00', end: '15:00' },
          warehouseCapacity: 7500,
          currentStock: 1200,
          lastDelivery: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          nextScheduledDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        },
        performance: {
          onTimeDeliveryRate: 89.2,
          orderAccuracy: 94.8,
          customerSatisfaction: 4.2,
          stockoutFrequency: 8.7
        },
        recentActivity: [
          {
            id: 'ACT003',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            type: 'Stockout',
            description: 'Stella Artois 12oz bottles - Out of stock',
            status: 'Warning'
          },
          {
            id: 'ACT004',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            type: 'Contact',
            description: 'Called regarding delivery delay',
            status: 'Info'
          }
        ]
      },
      {
        id: 'WS003',
        name: 'Lone Star Distributors',
        code: 'LSD-003',
        status: 'Active',
        location: {
          address: '321 Market St',
          city: 'Fort Worth',
          state: 'TX',
          zipCode: '76102',
          coordinates: { lat: 32.7555, lng: -97.3308 }
        },
        contact: {
          primaryContact: 'Mike Rodriguez',
          phone: '(817) 555-0789',
          email: 'mike.r@lonestar.com'
        },
        businessMetrics: {
          averageOrderValue: 18500,
          monthlyVolume: 222000,
          servingRadius: 60,
          customerCount: 145,
          salesRep: 'Jennifer Lee'
        },
        operationalInfo: {
          deliverySchedule: ['Monday', 'Thursday'],
          preferredDeliveryWindow: { start: '09:00', end: '17:00' },
          warehouseCapacity: 6000,
          currentStock: 4200,
          lastDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          nextScheduledDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        },
        performance: {
          onTimeDeliveryRate: 94.8,
          orderAccuracy: 97.1,
          customerSatisfaction: 4.5,
          stockoutFrequency: 3.4
        },
        recentActivity: [
          {
            id: 'ACT005',
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            type: 'Payment',
            description: 'Payment received - Invoice #INV-2024-0892',
            status: 'Success',
            amount: 18500
          }
        ]
      },
      {
        id: 'WS004',
        name: 'Great Lakes Beverage',
        code: 'GLB-004',
        status: 'Critical',
        location: {
          address: '789 Lake Shore Dr',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44114',
          coordinates: { lat: 41.4993, lng: -81.6944 }
        },
        contact: {
          primaryContact: 'Lisa Chen',
          phone: '(216) 555-0234',
          email: 'lisa.chen@glbev.com'
        },
        businessMetrics: {
          averageOrderValue: 13500,
          monthlyVolume: 162000,
          servingRadius: 45,
          customerCount: 95,
          salesRep: 'David Park'
        },
        operationalInfo: {
          deliverySchedule: ['Tuesday', 'Friday'],
          preferredDeliveryWindow: { start: '10:00', end: '18:00' },
          warehouseCapacity: 4000,
          currentStock: 350,
          lastDelivery: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          nextScheduledDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        },
        performance: {
          onTimeDeliveryRate: 76.3,
          orderAccuracy: 89.5,
          customerSatisfaction: 3.8,
          stockoutFrequency: 15.2
        },
        recentActivity: [
          {
            id: 'ACT006',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            type: 'Complaint',
            description: 'Customer complaint regarding delayed delivery',
            status: 'Error'
          },
          {
            id: 'ACT007',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            type: 'Stockout',
            description: 'Multiple SKUs out of stock - Emergency order needed',
            status: 'Error'
          }
        ]
      }
    ];

    setWholesalers(mockWholesalers);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Warning': return 'warning';
      case 'Critical': return 'error';
      case 'Inactive': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <SuccessIcon color="success" />;
      case 'Warning': return <WarningIcon color="warning" />;
      case 'Critical': return <WarningIcon color="error" />;
      default: return <StoreIcon />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Order': return <InventoryIcon />;
      case 'Delivery': return <DeliveryIcon />;
      case 'Stockout': return <WarningIcon />;
      case 'Complaint': return <WarningIcon />;
      case 'Payment': return <MoneyIcon />;
      case 'Contact': return <PhoneIcon />;
      default: return <StoreIcon />;
    }
  };

  const getFilteredWholesalers = () => {
    if (filterStatus === 'all') return wholesalers;
    return wholesalers.filter(w => w.status.toLowerCase() === filterStatus.toLowerCase());
  };

  const handleViewDetails = (wholesaler: Wholesaler) => {
    setSelectedWholesaler(wholesaler);
    setDetailsDialog(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderWholesalerCard = (wholesaler: Wholesaler) => (
    <Card key={wholesaler.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {getStatusIcon(wholesaler.status)}
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" component="div">
                {wholesaler.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {wholesaler.code} • {wholesaler.location.city}, {wholesaler.location.state}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={wholesaler.status}
            color={getStatusColor(wholesaler.status) as any}
            size="small"
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Monthly Volume
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              ${wholesaler.businessMetrics.monthlyVolume.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Stock Level
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {Math.round((wholesaler.operationalInfo.currentStock / wholesaler.operationalInfo.warehouseCapacity) * 100)}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              On-Time Delivery
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {wholesaler.performance.onTimeDeliveryRate}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Satisfaction
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {wholesaler.performance.customerSatisfaction}/5.0
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Stock Level
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(wholesaler.operationalInfo.currentStock / wholesaler.operationalInfo.warehouseCapacity) * 100}
            color={wholesaler.operationalInfo.currentStock / wholesaler.operationalInfo.warehouseCapacity < 0.3 ? 'error' : 'primary'}
            sx={{ mt: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {wholesaler.contact.primaryContact}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ScheduleIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Next delivery: {wholesaler.operationalInfo.nextScheduledDelivery.toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => handleViewDetails(wholesaler)}>
          View Details
        </Button>
        <Button size="small" color="primary">
          Contact
        </Button>
        <Button size="small" color="secondary">
          Schedule Delivery
        </Button>
      </CardActions>
    </Card>
  );

  const renderWholesalerTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Wholesaler</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell align="right">Monthly Volume</TableCell>
            <TableCell align="center">Stock Level</TableCell>
            <TableCell align="center">Performance</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getFilteredWholesalers().map((wholesaler) => (
            <TableRow key={wholesaler.id} hover>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {wholesaler.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {wholesaler.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {wholesaler.code}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                {wholesaler.location.city}, {wholesaler.location.state}
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2">
                    {wholesaler.contact.primaryContact}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {wholesaler.contact.phone}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                ${wholesaler.businessMetrics.monthlyVolume.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                <Box sx={{ width: 100, mx: 'auto' }}>
                  <LinearProgress
                    variant="determinate"
                    value={(wholesaler.operationalInfo.currentStock / wholesaler.operationalInfo.warehouseCapacity) * 100}
                    color={wholesaler.operationalInfo.currentStock / wholesaler.operationalInfo.warehouseCapacity < 0.3 ? 'error' : 'primary'}
                  />
                  <Typography variant="caption">
                    {Math.round((wholesaler.operationalInfo.currentStock / wholesaler.operationalInfo.warehouseCapacity) * 100)}%
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={`${wholesaler.performance.onTimeDeliveryRate}%`}
                  color={wholesaler.performance.onTimeDeliveryRate > 90 ? 'success' : wholesaler.performance.onTimeDeliveryRate > 80 ? 'warning' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={wholesaler.status}
                  color={getStatusColor(wholesaler.status) as any}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <IconButton size="small" onClick={() => handleViewDetails(wholesaler)}>
                  <ViewIcon />
                </IconButton>
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
                <IconButton size="small">
                  <PhoneIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Wholesaler Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive wholesaler relationship and performance management
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Wholesaler
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Wholesalers
                  </Typography>
                  <Typography variant="h4">
                    {wholesalers.length}
                  </Typography>
                </Box>
                <StoreIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Active Partners
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {wholesalers.filter(w => w.status === 'Active').length}
                  </Typography>
                </Box>
                <SuccessIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Monthly Volume
                  </Typography>
                  <Typography variant="h4">
                    ${(wholesalers.reduce((sum, w) => sum + w.businessMetrics.monthlyVolume, 0) / 1000).toFixed(0)}K
                  </Typography>
                </Box>
                <TrendIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Needs Attention
                  </Typography>
                  <Typography variant="h4" color="error.main">
                    {wholesalers.filter(w => w.status === 'Critical' || w.status === 'Warning').length}
                  </Typography>
                </Box>
                <WarningIcon color="error" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alerts */}
      {wholesalers.some(w => w.status === 'Critical') && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <strong>Critical Alert:</strong> {wholesalers.filter(w => w.status === 'Critical').length} wholesaler(s) require immediate attention.
        </Alert>
      )}

      {/* Main Content */}
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Card View" />
            <Tab label="Table View" />
          </Tabs>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Filter Status</InputLabel>
            <Select
              value={filterStatus}
              label="Filter Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {getFilteredWholesalers().map((wholesaler) => (
              <Grid item xs={12} md={6} lg={4} key={wholesaler.id}>
                {renderWholesalerCard(wholesaler)}
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {renderWholesalerTable()}
        </TabPanel>
      </Paper>

      {/* Details Dialog */}
      <Dialog
        open={detailsDialog}
        onClose={() => setDetailsDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {selectedWholesaler?.name} - Detailed Information
        </DialogTitle>
        <DialogContent>
          {selectedWholesaler && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Contact Information</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText 
                      primary={selectedWholesaler.contact.primaryContact}
                      secondary="Primary Contact"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><PhoneIcon /></ListItemIcon>
                    <ListItemText 
                      primary={selectedWholesaler.contact.phone}
                      secondary="Phone"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><EmailIcon /></ListItemIcon>
                    <ListItemText 
                      primary={selectedWholesaler.contact.email}
                      secondary="Email"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><LocationIcon /></ListItemIcon>
                    <ListItemText 
                      primary={`${selectedWholesaler.location.address}, ${selectedWholesaler.location.city}, ${selectedWholesaler.location.state} ${selectedWholesaler.location.zipCode}`}
                      secondary="Address"
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                <List>
                  {selectedWholesaler.recentActivity.map((activity) => (
                    <ListItem key={activity.id}>
                      <ListItemIcon>
                        {getActivityIcon(activity.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.description}
                        secondary={activity.timestamp.toLocaleString()}
                      />
                      <Chip
                        label={activity.status}
                        size="small"
                        color={activity.status === 'Success' ? 'success' : activity.status === 'Warning' ? 'warning' : activity.status === 'Error' ? 'error' : 'default'}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog(false)}>Close</Button>
          <Button variant="contained">Edit Wholesaler</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Wholesalers;
